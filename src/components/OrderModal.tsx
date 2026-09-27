import React, { useState, useMemo } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  Truck,
  FileText,
  Send,
  Zap,
  MapPin,
  ExternalLink,
  ChevronDown,
  MessageCircle,
} from 'lucide-react';
import { CheckoutSummary } from './SmartCartDrawer';
import { Currency } from '../types';
import {
  formatPrice,
  calculateModePricing,
  getProductWholesaleConfig,
} from '../utils/pricing';
import {
  getProvinces,
  getDistrictsByProvince,
  getWardsByDistrict,
} from '../data/vietnamAdministrative';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: CheckoutSummary | null;
  currency: Currency;
  exchangeRate?: number;
  onOrderSuccess: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  summary,
  currency,
  exchangeRate,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');

  // 4-LEVEL CASCADING VIETNAM ADMINISTRATIVE ADDRESS SYSTEM
  const provincesList = getProvinces();
  const [province, setProvince] = useState('');

  // Districts for current province
  const currentDistricts = province ? getDistrictsByProvince(province) : [];
  const [district, setDistrict] = useState('');
  const [isCustomDistrict, setIsCustomDistrict] = useState(false);
  const [customDistrict, setCustomDistrict] = useState('');

  // Wards for current province & district
  const effectiveDistrictName = isCustomDistrict ? customDistrict : district;
  const currentWards = province && effectiveDistrictName ? getWardsByDistrict(province, effectiveDistrictName) : [];
  const [ward, setWard] = useState('');
  const [isCustomWard, setIsCustomWard] = useState(false);
  const [customWard, setCustomWard] = useState('');
  const effectiveWardName = isCustomWard ? customWard : ward;

  // Field 4: Street address & house number
  const [streetAddress, setStreetAddress] = useState('');

  const [notes, setNotes] = useState('');
  const [isVATRequested, setIsVATRequested] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedZalo, setCopiedZalo] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [submittedAddress, setSubmittedAddress] = useState('');
  const [submittedFinalTotal, setSubmittedFinalTotal] = useState<number | null>(null);
  const [submittedDiscount, setSubmittedDiscount] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Automated 50k First-Order Voucher Check via Phone Number
  const cleanPhoneDigits = useMemo(() => {
    return phone.replace(/\D/g, '');
  }, [phone]);

  const isValidPhone = cleanPhoneDigits.length >= 9 && cleanPhoneDigits.length <= 11;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const hasProvince = Boolean(province && province.trim().length > 0);
  const hasDistrict = Boolean(effectiveDistrictName && effectiveDistrictName.trim().length > 0);
  const hasWard = Boolean(effectiveWardName && effectiveWardName.trim().length > 0);
  const hasCustomerName = Boolean(customerName && customerName.trim().length > 0);
  const hasStreetAddress = Boolean(streetAddress && streetAddress.trim().length > 0);

  // V160/V161 Validation: Bắt buộc khách phải điền Họ tên, Số điện thoại (9-10 số), Email hợp lệ, và chọn đủ 3 cấp địa chỉ + Số nhà
  const isFormValid = hasCustomerName && isValidPhone && isValidEmail && hasProvince && hasDistrict && hasWard && hasStreetAddress;

  const phoneCheckResult = useMemo(() => {
    if (!isValidPhone) return null;
    try {
      const existingOrders: any[] = JSON.parse(
        localStorage.getItem('chutchiu_orders') || '[]'
      );
      const found = existingOrders.some((ord) => {
        const ordDigits = (ord.phone || '').replace(/\D/g, '');
        return ordDigits.length >= 9 && ordDigits === cleanPhoneDigits;
      });
      return {
        isNewCustomer: !found,
      };
    } catch {
      return { isNewCustomer: true };
    }
  }, [cleanPhoneDigits, isValidPhone]);

  // Discount: 50,000 VND if new customer
  const autoDiscount50kVND = phoneCheckResult?.isNewCustomer ? 50000 : 0;
  const currentFinalTotalVND = Math.max(
    0,
    (summary?.subtotalVND || 0) - autoDiscount50kVND
  );

  // Handle Province Change -> Cascades down to District & Ward
  const handleProvinceChange = (newProvince: string) => {
    setProvince(newProvince);
    setIsCustomDistrict(false);
    setCustomDistrict('');
    setIsCustomWard(false);
    setCustomWard('');
    setDistrict('');
    setWard('');
  };

  // Handle District Change -> Cascades down to Ward
  const handleDistrictChange = (eVal: string) => {
    if (eVal === '__custom__') {
      setIsCustomDistrict(true);
      setDistrict('');
      setIsCustomWard(true);
      setWard('');
    } else {
      setIsCustomDistrict(false);
      setDistrict(eVal);
      setCustomDistrict('');
      setIsCustomWard(false);
      setWard('');
    }
  };

  // Handle Ward Change
  const handleWardChange = (eVal: string) => {
    if (eVal === '__custom__') {
      setIsCustomWard(true);
      setWard('');
    } else {
      setIsCustomWard(false);
      setWard(eVal);
      setCustomWard('');
    }
  };

  // Sanitize street address: strictly remove any "(Tòa nhà / Ngõ / Hẻm)" or similar notes
  // and prevent duplicate ward, district, or province from being repeated in the address
  const sanitizeStreetAddress = (raw: string, wardName: string, districtName: string, provName: string) => {
    if (!raw) return '';
    let clean = raw
      .replace(/\s*\([^)]*(?:tòa nhà|ngõ|hẻm|căn hộ|khu dân cư)[^)]*\)/gi, '')
      .replace(/\s*\(\s*\)/g, '')
      .trim();

    clean = clean.replace(/,+\s*$/, '').trim();

    const stripSuffix = (text: string, suffix: string) => {
      if (!suffix) return text;
      const lowerText = text.toLowerCase();
      const lowerSuffix = suffix.toLowerCase();
      if (lowerText.endsWith(lowerSuffix)) {
        return text.slice(0, -suffix.length).replace(/,+\s*$/, '').trim();
      }
      return text;
    };

    clean = stripSuffix(clean, provName);
    clean = stripSuffix(clean, districtName);
    clean = stripSuffix(clean, wardName);

    return clean;
  };

  const cleanStreet = sanitizeStreetAddress(
    streetAddress,
    effectiveWardName,
    effectiveDistrictName,
    province
  );

  // Formatted Full Delivery Address: [Số nhà, tên đường], [Phường/Xã], [Quận/Huyện], [Tỉnh/Thành phố]
  const fullAddress = [
    cleanStreet,
    effectiveWardName.trim(),
    effectiveDistrictName.trim(),
    province.trim(),
  ]
    .filter(Boolean)
    .join(', ');

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    fullAddress || `${effectiveDistrictName}, ${province}`
  )}`;

  const handleCopySTK = () => {
    navigator.clipboard.writeText('19039080129011');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setHasAttemptedSubmit(true);
      return;
    }
    const generatedId = `CC-${Date.now().toString().slice(-6)}`;
    setOrderId(generatedId);
    setSubmittedAddress(fullAddress);
    setSubmittedFinalTotal(currentFinalTotalVND);
    setSubmittedDiscount(autoDiscount50kVND);

    // Save order to localStorage
    try {
      const newOrder = {
        id: generatedId,
        createdAt: new Date().toISOString(),
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: fullAddress,
        addressDetails: {
          province: province.trim(),
          district: effectiveDistrictName.trim(),
          ward: effectiveWardName.trim(),
          streetAddress: streetAddress.trim(),
        },
        notes: notes.trim(),
        isVATRequested,
        companyName: companyName.trim(),
        taxId: taxId.trim(),
        paymentMethod: 'vietqr',
        status: 'pending_payment',
        subtotalVND: summary.subtotalVND,
        discountVND: autoDiscount50kVND,
        finalTotalVND: currentFinalTotalVND,
        voucherCode: autoDiscount50kVND > 0 ? 'GROOSTER50K' : null,
        items: (summary.items || []).map((item) => {
          const mode = item.purchaseMode || 'retail';
          const calc = calculateModePricing(item.product, mode, item.quantity);
          const wConfig = getProductWholesaleConfig(item.product);
          return {
            product: {
              id: item.product.id,
              name: item.product.name,
              image: item.product.image,
              partnerName: item.product.partnerName,
              unit: item.product.unit,
              retailUnit: item.product.retailUnit,
              wholesaleUnit: wConfig.wholesaleUnit,
            },
            quantity: item.quantity,
            purchaseMode: mode,
            unitPriceVND: calc.unitPrice,
            subtotalVND: calc.totalPrice,
            activeTierLabel: calc.activeTierLabel,
          };
        }),
      };

      const existingOrders = JSON.parse(localStorage.getItem('chutchiu_orders') || '[]');
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('chutchiu_orders', JSON.stringify(updatedOrders));
    } catch (err) {
      console.warn('Lỗi lưu đơn hàng:', err);
    }

    setIsSubmitted(true);
    onOrderSuccess();
  };

  // Official Bank QR Code from G-ROOSTER & Official Brand Logo
  const OFFICIAL_LOGO_URL = 'https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png';
  const OFFICIAL_BANK_QR_URL = 'https://i.postimg.cc/BvD1NLMs/ma-qr-chuyen-khoan-nguyen-duc-trung.png';
  const BANK_ACCOUNT_NUMBER = '19039080129011';
  const BANK_ACCOUNT_NAME = 'NGUYEN DUC TRUNG';
  const BANK_NAME = 'Techcombank';

  // Tự động soạn sẵn toàn bộ nội dung đơn hàng chuẩn xác để gửi qua Zalo Hotline theo mẫu V104
  const getZaloOrderContent = () => {
    if (!orderId || !summary || !summary.items) return '';
    const totalVND = submittedFinalTotal ?? currentFinalTotalVND;
    const formattedTotal = `${totalVND.toLocaleString('vi-VN')}đ`;
    const customerDisplayName = customerName.trim() || 'Khách hàng';

    // Mẫu tin nhắn chốt đơn Zalo thương hiệu G-ROOSTER chuẩn V151:
    const headerNotice = `Chào G-ROOSTER CO.,LTD, tôi muốn nhận báo giá sỉ cho đơn hàng #${orderId} trị giá ${formattedTotal}. Vui lòng tư vấn thêm về chính sách đại lý!`;

    const itemsListText = (summary.items || [])
      .map((it, idx) => {
        const mode = it.purchaseMode || 'retail';
        const calc = calculateModePricing(it.product, mode, it.quantity);
        const wConfig = getProductWholesaleConfig(it.product);
        const unitName =
          mode === 'wholesale'
            ? wConfig.wholesaleUnit
            : it.product.retailUnit || it.product.unit || 'đv';
        return `${idx + 1}. ${it.product.name} [${mode === 'wholesale' ? 'SỈ' : 'LẺ'}]: ${it.quantity} ${unitName} x ${formatPrice(calc.unitPrice, 'VND')} = ${formatPrice(calc.totalPrice, 'VND')}`;
      })
      .join('\n');

    return [
      headerNotice,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 Khách hàng: ${customerDisplayName}`,
      `📍 Địa chỉ nhận hàng: ${submittedAddress || fullAddress}`,
      phone.trim() ? `📞 Số điện thoại: ${phone.trim()}` : null,
      email.trim() ? `📧 Email: ${email.trim()}` : null,
      notes.trim() ? `📝 Ghi chú: ${notes.trim()}` : null,
      isVATRequested ? `🏢 Xuất hóa đơn VAT: ${companyName.trim()} (MST: ${taxId.trim()})` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📦 DANH SÁCH SẢN PHẨM:`,
      itemsListText,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      autoDiscount50kVND > 0 ? `🎟️ Voucher khách mới: -${formatPrice(autoDiscount50kVND, 'VND')}` : null,
      `💰 TỔNG TIỀN ĐƠN HÀNG: ${formattedTotal}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `💳 THÔNG TIN CHUYỂN KHOẢN TECHCOMBANK:`,
      `• Ngân hàng: Techcombank (TCB)`,
      `• Số tài khoản: 19039080129011`,
      `• Chủ tài khoản: NGUYEN DUC TRUNG`,
      `• Cú pháp: GROOSTER ${orderId}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Kính nhờ Hotline G-ROOSTER (0961 525 450) xác nhận và điều phối xuất kho nhanh giúp tôi. Xin cảm ơn!`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const zaloOrderContent = getZaloOrderContent();

  const handleSendZaloOrder = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(zaloOrderContent);
      }
    } catch (err) {
      console.warn('Clipboard write error:', err);
    }
    setCopiedZalo(true);
    setTimeout(() => setCopiedZalo(false), 5000);
    window.open('https://zalo.me/0961525450', '_blank');
  };

  const handleCopyZaloText = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(zaloOrderContent);
        setCopiedZalo(true);
        setTimeout(() => setCopiedZalo(false), 4000);
      }
    } catch (err) {
      console.warn('Clipboard write error:', err);
    }
  };

  if (!isOpen || !summary || !summary.items || summary.items.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 sm:p-5 border-b border-stone-200 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-xl px-2.5 py-1 shadow-xs shrink-0 h-9 sm:h-10 flex items-center justify-center border border-white/90">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="G-ROOSTER CO.,LTD - Nông Sản Cao Cấp"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="sync"
                className="h-full w-auto object-contain"
              />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold tracking-tight">
                {isSubmitted ? 'ĐẶT HÀNG THÀNH CÔNG' : 'XÁC NHẬN ĐƠN HÀNG B2B/B2C'}
              </h3>
              <p className="text-xs text-emerald-300 font-medium">Hệ Thống Phân Phối Nông Sản Cao Cấp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ đặt hàng"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer ml-3 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-6 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
              {/* 1. KHỐI TỔNG CỘNG & TỰ ĐỘNG KHẤU TRỪ VOUCHER ĐƠN ĐẦU */}
              <div className="px-3.5 py-2.5 bg-stone-50/95 rounded-xl border border-stone-200/90 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Tạm tính ({summary.items.length} món):</span>
                  <span className="font-semibold text-stone-900">
                    {formatPrice(summary.subtotalVND, currency, exchangeRate)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-600 flex items-center gap-1">
                    <span>Ưu đãi đơn đầu:</span>
                  </span>
                  {autoDiscount50kVND > 0 ? (
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      - {formatPrice(autoDiscount50kVND, currency, exchangeRate)} (Hệ thống tự động xác nhận đơn đầu -50k)
                    </span>
                  ) : (
                    <span className="text-stone-400 text-[11px] font-medium">
                      {isValidPhone ? '0 ₫' : 'Chờ kiểm tra SĐT'}
                    </span>
                  )}
                </div>

                <div className="pt-1.5 border-t border-stone-200 flex items-baseline justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">
                      Tổng thanh toán:
                    </span>
                    {autoDiscount50kVND > 0 && (
                      <span className="text-[10.5px] text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded font-bold">
                        Hệ thống tự động xác nhận đơn đầu -50k
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-[20px] sm:text-[22px] font-black text-[#1a4d2e] font-heading tracking-tight block">
                      {formatPrice(currentFinalTotalVND, currency, exchangeRate)}
                    </span>
                    <span className="text-[10px] text-emerald-800 font-medium block">
                      * Giá đã bao gồm thuế GTGT / VAT 8%
                    </span>
                  </div>
                </div>
              </div>

                {/* 2. KHỐI THÔNG TIN KHÁCH HÀNG & ĐỊA CHỈ NHẬN HÀNG (V161 - CLEAN & PROFESSIONAL) */}
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Họ và tên */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                        Họ và tên người nhận / Đại diện *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className={`w-full h-[36px] px-3 py-1 text-[13.5px] rounded-lg border font-medium focus:outline-none focus:ring-1 ${
                          hasAttemptedSubmit && !hasCustomerName
                            ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20 text-stone-900'
                            : 'border-stone-300 focus:border-[#1a4d2e] focus:ring-[#1a4d2e]/20 text-stone-900'
                        }`}
                      />
                      {hasAttemptedSubmit && !hasCustomerName && (
                        <p className="mt-1 text-[10.5px] text-rose-600 font-medium">
                          ⚠️ Vui lòng nhập họ và tên người nhận
                        </p>
                      )}
                    </div>

                    {/* Số điện thoại nhận hàng (V161: đứng độc lập sạch sẽ, không có chú thích thừa khi chưa nhập) */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                        Số điện thoại nhận hàng *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="09xx xxx xxx"
                        className={`w-full h-[36px] px-3 py-1 text-[13.5px] rounded-lg border font-medium focus:outline-none focus:ring-1 ${
                          (hasAttemptedSubmit && !isValidPhone) || (!isValidPhone && phone.length > 0)
                            ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20 text-stone-900'
                            : 'border-stone-300 focus:border-[#1a4d2e] focus:ring-[#1a4d2e]/20 text-stone-900'
                        }`}
                      />
                      {/* V161: XÓA BỎ hoàn toàn dòng chữ chú thích dưới ô SĐT khi chưa nhập, chỉ hiện thông báo tinh tế */}
                      {hasAttemptedSubmit && !isValidPhone ? (
                        <p className="mt-1 text-[10.5px] text-rose-600 font-medium">
                          ⚠️ Vui lòng nhập số điện thoại nhận hàng (9-10 số)
                        </p>
                      ) : isValidPhone ? (
                        phoneCheckResult?.isNewCustomer ? (
                          <div className="mt-1 p-1.5 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 text-[11px] font-bold flex items-center gap-1.5 shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Hệ thống tự động xác nhận đơn đầu -50k</span>
                          </div>
                        ) : (
                          <div className="mt-1 p-1 bg-amber-50 border border-amber-200 rounded-lg text-[10.5px] font-medium text-amber-800 flex items-center gap-1">
                            <span>⚠️ Số điện thoại đã từng mua hàng, ưu đãi áp dụng cho đơn đầu</span>
                          </div>
                        )
                      ) : null}
                    </div>
                  </div>

                  {/* V160 / V161: Ô nhập Email (Bắt buộc) đặt ngay bên dưới ô Số điện thoại nhận hàng, đứng độc lập sạch sẽ */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                      Email * (Bắt buộc)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className={`w-full h-[36px] px-3 py-1 text-[13.5px] rounded-lg border font-medium focus:outline-none focus:ring-1 ${
                        (hasAttemptedSubmit && !isValidEmail) || (!isValidEmail && email.length > 0)
                          ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900'
                          : 'border-stone-300 focus:border-[#1a4d2e] focus:ring-[#1a4d2e]/20 text-stone-900'
                      }`}
                    />
                    {((hasAttemptedSubmit && !isValidEmail) || (!isValidEmail && email.length > 0)) && (
                      <p className="mt-1 text-[10.5px] text-rose-600 font-medium">
                        ⚠️ Vui lòng nhập đúng định dạng email (VD: hotro@g-rooster.com)
                      </p>
                    )}
                  </div>

                {/* 4-LEVEL SMART VIETNAMESE ADDRESS FORM (V161: TĂM TẮP TRÊN CÙNG MỘT KHỐI ĐỒNG NHẤT) */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-stone-200/90 bg-stone-50/40 space-y-2.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 pb-0.5 border-b border-stone-200/60">
                    <Truck className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <span className="text-[11px] font-bold text-emerald-950 uppercase tracking-wide">
                      ĐỊA CHỈ NHẬN HÀNG *
                    </span>
                  </div>

                  {/* 3 Cascading Administrative Dropdowns - Hiển thị tăm tắp, đồng bộ chiều cao và định dạng */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {/* Cấp 1: Tỉnh / Thành phố */}
                    <div>
                      <label className="block text-[10.5px] font-semibold text-stone-600 mb-1 flex items-center gap-1">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#1a4d2e] text-white text-[8px] flex items-center justify-center font-bold shrink-0">1</span>
                        Tỉnh / Thành phố *
                      </label>
                      <div className="relative">
                        <select
                          value={province}
                          onChange={(e) => handleProvinceChange(e.target.value)}
                          className={`w-full h-[36px] min-h-[36px] px-2.5 py-1 text-[12.5px] sm:text-[13px] rounded-lg border bg-white focus:outline-none font-medium appearance-none pr-7 cursor-pointer shadow-2xs ${
                            hasAttemptedSubmit && !hasProvince
                              ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500'
                              : !hasProvince
                              ? 'border-stone-300 text-stone-700 focus:border-[#1a4d2e]'
                              : 'border-emerald-600/60 bg-emerald-50/20 text-stone-900 focus:border-[#1a4d2e]'
                          }`}
                        >
                          <option value="">-- Chọn Tỉnh / Thành phố * --</option>
                          {provincesList.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {hasAttemptedSubmit && !hasProvince && (
                        <p className="mt-1 text-[10px] text-rose-600 font-medium">⚠️ Vui lòng chọn Tỉnh/Thành</p>
                      )}
                    </div>

                    {/* Cấp 2: Quận / Huyện (Tự động theo Tỉnh) */}
                    <div>
                      <label className="block text-[10.5px] font-semibold text-stone-600 mb-1 flex items-center gap-1">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#1a4d2e] text-white text-[8px] flex items-center justify-center font-bold shrink-0">2</span>
                        Quận / Huyện *
                      </label>
                      {!isCustomDistrict ? (
                        <div className="relative">
                          <select
                            disabled={!province}
                            value={district}
                            onChange={(e) => handleDistrictChange(e.target.value)}
                            className={`w-full h-[36px] min-h-[36px] px-2.5 py-1 text-[12.5px] sm:text-[13px] rounded-lg border bg-white focus:outline-none font-medium appearance-none pr-7 shadow-2xs ${
                              !province
                                ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                                : hasAttemptedSubmit && !hasDistrict
                                ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 cursor-pointer'
                                : !hasDistrict
                                ? 'border-stone-300 text-stone-700 focus:border-[#1a4d2e] cursor-pointer'
                                : 'border-emerald-600/60 bg-emerald-50/20 text-stone-900 focus:border-[#1a4d2e] cursor-pointer'
                            }`}
                          >
                            <option value="">
                              {province ? '-- Chọn Quận / Huyện * --' : '-- Chọn Tỉnh trước --'}
                            </option>
                            {currentDistricts.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                            {province && <option value="__custom__">+ Quận / Huyện khác (Nhập tay)...</option>}
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      ) : (
                        <div className="space-y-0.5">
                          <input
                            type="text"
                            value={customDistrict}
                            onChange={(e) => setCustomDistrict(e.target.value)}
                            placeholder="Nhập tên Quận/Huyện..."
                            className={`w-full h-[36px] min-h-[36px] px-2.5 py-1 text-[12.5px] sm:text-[13px] rounded-lg border bg-white text-stone-900 font-medium focus:outline-none focus:border-[#1a4d2e] shadow-2xs ${
                              hasAttemptedSubmit && !hasDistrict
                                ? 'border-rose-400 bg-rose-50/20'
                                : 'border-stone-300'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsCustomDistrict(false);
                              setDistrict(currentDistricts[0] || '');
                            }}
                            className="text-[9.5px] text-emerald-800 underline font-medium"
                          >
                            ← Chọn lại từ danh sách
                          </button>
                        </div>
                      )}
                      {hasAttemptedSubmit && !hasDistrict && (
                        <p className="mt-1 text-[10px] text-rose-600 font-medium">⚠️ Vui lòng chọn Quận/Huyện</p>
                      )}
                    </div>

                    {/* Cấp 3: Phường / Xã (Tự động theo Quận/Huyện) */}
                    <div>
                      <label className="block text-[10.5px] font-semibold text-stone-600 mb-1 flex items-center gap-1">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#1a4d2e] text-white text-[8px] flex items-center justify-center font-bold shrink-0">3</span>
                        Phường / Xã *
                      </label>
                      {!isCustomWard && currentWards.length > 0 ? (
                        <div className="relative">
                          <select
                            disabled={!effectiveDistrictName}
                            value={ward}
                            onChange={(e) => handleWardChange(e.target.value)}
                            className={`w-full h-[36px] min-h-[36px] px-2.5 py-1 text-[12.5px] sm:text-[13px] rounded-lg border bg-white focus:outline-none font-medium appearance-none pr-7 shadow-2xs ${
                              !effectiveDistrictName
                                ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                                : hasAttemptedSubmit && !hasWard
                                ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 cursor-pointer'
                                : !hasWard
                                ? 'border-stone-300 text-stone-700 focus:border-[#1a4d2e] cursor-pointer'
                                : 'border-emerald-600/60 bg-emerald-50/20 text-stone-900 focus:border-[#1a4d2e] cursor-pointer'
                            }`}
                          >
                            <option value="">
                              {effectiveDistrictName ? '-- Chọn Phường / Xã * --' : '-- Chọn Quận trước --'}
                            </option>
                            {currentWards.map((w) => (
                              <option key={w} value={w}>
                                {w}
                              </option>
                            ))}
                            {effectiveDistrictName && <option value="__custom__">+ Phường / Xã khác (Nhập tay)...</option>}
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      ) : (
                        <div className="space-y-0.5">
                          <input
                            type="text"
                            value={isCustomWard ? customWard : ward}
                            onChange={(e) => {
                              if (isCustomWard) setCustomWard(e.target.value);
                              else setWard(e.target.value);
                            }}
                            placeholder="Nhập tên Phường/Xã..."
                            className={`w-full h-[36px] min-h-[36px] px-2.5 py-1 text-[12.5px] sm:text-[13px] rounded-lg border bg-white text-stone-900 font-medium focus:outline-none focus:border-[#1a4d2e] shadow-2xs ${
                              hasAttemptedSubmit && !hasWard
                                ? 'border-rose-400 bg-rose-50/20'
                                : 'border-stone-300'
                            }`}
                          />
                          {currentWards.length > 0 && isCustomWard && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsCustomWard(false);
                                setWard(currentWards[0] || '');
                              }}
                              className="text-[9.5px] text-emerald-800 underline font-medium"
                            >
                              ← Chọn lại từ danh sách
                            </button>
                          )}
                        </div>
                      )}
                      {hasAttemptedSubmit && !hasWard && (
                        <p className="mt-1 text-[10px] text-rose-600 font-medium">⚠️ Vui lòng chọn Phường/Xã</p>
                      )}
                    </div>
                  </div>

                  {/* Cấp 4: Số nhà, Tên đường (Hiển thị tăm tắp cùng khối) */}
                  <div>
                    <label className="block text-[10.5px] font-semibold text-stone-600 flex items-center gap-1 mb-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-800 text-white text-[8px] flex items-center justify-center font-bold shrink-0">4</span>
                      Số nhà, tên đường (hoặc tòa nhà, ngõ/hẻm) *
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="Số nhà, tên đường (hoặc căn hộ, ngõ/hẻm)..."
                        className={`w-full h-[36px] min-h-[36px] px-3 pr-7 py-1 text-[12.5px] sm:text-[13px] rounded-lg border bg-white text-stone-900 focus:outline-none focus:ring-1 font-medium shadow-2xs ${
                          hasAttemptedSubmit && !hasStreetAddress
                            ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20'
                            : 'border-stone-300 hover:border-stone-400 focus:border-[#1a4d2e] focus:ring-[#1a4d2e]/20'
                        }`}
                      />
                      {streetAddress && (
                        <button
                          type="button"
                          onClick={() => setStreetAddress('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
                          title="Xóa nhanh"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {hasAttemptedSubmit && !hasStreetAddress && (
                      <p className="mt-1 text-[10.5px] text-rose-600 font-medium">
                        ⚠️ Vui lòng nhập số nhà, tên đường nhận hàng
                      </p>
                    )}
                  </div>

                  {/* Live Formatted Address Preview & Google Maps Linking */}
                  {fullAddress && (
                    <div className="pt-0.5 text-[11px] text-stone-700 bg-white p-2 rounded-lg border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 shadow-2xs">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <div className="leading-snug">
                          <span className="font-bold text-emerald-950">Địa chỉ nhận hàng: </span>
                          <span className="font-semibold text-stone-900">{fullAddress}</span>
                        </div>
                      </div>
                      <a
                        href={googleMapsSearchUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 shrink-0 transition-colors"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3 text-emerald-700" />
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Ghi chú đơn hàng (Thời gian nhận, bảo quản lạnh,...)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Giao buổi sáng, cấp đông nước mía tuyết, đóng thùng xuất khẩu..."
                    className="w-full px-3 py-2 text-[14px] rounded-xl border border-stone-300 font-medium focus:outline-none focus:border-emerald-700"
                  />
                </div>

                {/* VAT B2B Invoice option */}
                <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/60">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVATRequested}
                      onChange={(e) => setIsVATRequested(e.target.checked)}
                      className="w-4 h-4 text-emerald-800 rounded border-stone-300 focus:ring-emerald-700 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-800" />
                      Yêu cầu xuất Hóa Đơn Điện Tử VAT cho Doanh Nghiệp (B2B)
                    </span>
                  </label>

                  {isVATRequested && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2.5 pt-2.5 border-t border-stone-200">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Tên Công Ty / Doanh Nghiệp
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Công ty TNHH..."
                          className="w-full h-[38px] px-3 py-1 text-[14px] rounded-lg border border-stone-300 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Mã Số Thuế (MST)
                        </label>
                        <input
                          type="text"
                          value={taxId}
                          onChange={(e) => setTaxId(e.target.value)}
                          placeholder="VD: 0319153593"
                          className="w-full h-[38px] px-3 py-1 text-[14px] rounded-lg border border-stone-300 font-mono font-medium"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. KHỐI THANH TOÁN CHUYỂN KHOẢN (TỐI GIẢN & CAO CẤP) */}
              <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs space-y-2">
                <div className="pb-1 border-b border-stone-100 flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="text-[11.5px] font-bold text-emerald-950 uppercase tracking-wide">
                      Thông Tin Chuyển Khoản Ngân Hàng
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    VietQR 24/7
                  </span>
                </div>

                {/* Mã QR Chuyển khoản: Thu nhỏ 130px - 140px, nằm chính giữa, khung viền mờ bo góc sang trọng */}
                <div className="flex flex-col items-center justify-center py-0.5">
                  <div className="rounded-xl border border-stone-200/90 bg-stone-50/70 p-1.5 shadow-2xs flex flex-col items-center">
                    <div className="mb-0.5 flex items-center justify-center gap-1">
                      <img
                        src={OFFICIAL_LOGO_URL}
                        alt="Logo G-ROOSTER CO.,LTD"
                        referrerPolicy="no-referrer"
                        loading="eager"
                        decoding="sync"
                        className="h-3 w-auto object-contain"
                      />
                      <span className="text-[8.5px] font-black text-emerald-950 uppercase tracking-wide">VietQR G-ROOSTER</span>
                    </div>
                    <img
                      src={`https://img.vietqr.io/image/TCB-19039080129011-compact2.png?amount=${currentFinalTotalVND}&addInfo=${encodeURIComponent(`GROOSTER ${orderId || 'DON HANG'}`.trim())}&accountName=NGUYEN%20DUC%20TRUNG`}
                      alt="Mã QR Chuyển Khoản Techcombank - Nguyen Duc Trung"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      decoding="sync"
                      onError={(e) => {
                        e.currentTarget.src = OFFICIAL_BANK_QR_URL;
                      }}
                      className="w-[136px] h-[136px] object-contain rounded-lg bg-white p-1 border border-stone-100 shadow-2xs"
                    />
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[11px] font-bold text-emerald-900">
                    <span>Số tiền quét mã:</span>
                    <span className="text-[#1a4d2e] font-black font-mono text-sm">
                      {currentFinalTotalVND.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                  <span className="text-[9.5px] text-stone-500 font-medium text-center">
                    Quét mã VietQR bằng app ngân hàng để thanh toán chính xác 100% giá trị đơn hàng
                  </span>
                </div>

                {/* Danh Sách Đối Xứng Trên Cùng 1 Hàng - Cỡ chữ 13px - TUYỆT ĐỐI KHÔNG NGẮT DÒNG */}
                <div className="space-y-1.5 bg-stone-50/80 p-2.5 rounded-lg border border-stone-200/70 text-[13px]">
                  <div className="flex items-center justify-between gap-2 border-b border-stone-200/50 pb-1">
                    <span className="text-stone-500 whitespace-nowrap text-[12.5px] shrink-0">Ngân hàng:</span>
                    <strong className="text-stone-900 font-bold whitespace-nowrap text-[13px] text-right">{BANK_NAME}</strong>
                  </div>

                  {/* V161: STK và Tên chủ tài khoản nằm ngang trên 1 dòng, không ngắt quãng */}
                  <div className="flex items-center justify-between gap-2 border-b border-stone-200/50 pb-1">
                    <span className="text-stone-500 whitespace-nowrap text-[12.5px] shrink-0">STK &amp; Chủ TK:</span>
                    <div className="flex items-center gap-1.5 shrink-0 text-right whitespace-nowrap">
                      <strong className="font-mono text-emerald-950 text-[13px] font-black tracking-wide">
                        {BANK_ACCOUNT_NUMBER}
                      </strong>
                      <button
                        type="button"
                        onClick={handleCopySTK}
                        className="p-1 rounded text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100/80 bg-emerald-50 border border-emerald-300 transition-colors cursor-pointer shadow-2xs shrink-0"
                        title={copiedBank ? "Đã sao chép số tài khoản" : "Sao chép số tài khoản"}
                        aria-label="Sao chép số tài khoản"
                      >
                        {copiedBank ? (
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-emerald-700" />
                        )}
                      </button>
                      <span className="text-stone-300 font-normal">|</span>
                      <strong className="text-stone-900 font-bold uppercase text-[12px] sm:text-[12.5px]">
                        {BANK_ACCOUNT_NAME}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-b border-stone-200/50 pb-1">
                    <span className="text-stone-500 whitespace-nowrap text-[12.5px] shrink-0">Số tiền chuyển khoản:</span>
                    <strong className="text-emerald-900 font-black whitespace-nowrap text-[13px] text-right">
                      {formatPrice(currentFinalTotalVND, currency, exchangeRate)}
                    </strong>
                  </div>

                  <div className="text-[10px] text-stone-500 pt-0.5 flex items-center justify-center sm:justify-start gap-1">
                    <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>Hệ thống tự động xác nhận &amp; xuất kho ngay khi chuyển khoản.</span>
                  </div>
                </div>
              </div>

              {/* 4. NÚT XÁC NHẬN ĐẶT HÀNG & NÚT ĐÓNG (V161: XÓA KHUNG ĐỎ CỐ ĐỊNH, CẢNH BÁO THÔNG MINH INLINE) */}
              <div className="sticky bottom-0 -mx-3.5 sm:-mx-6 -mb-3.5 sm:-mb-6 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-stone-200 z-20 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex flex-col gap-2.5">
                {/* Nút Xác Nhận Đặt Hàng: Mờ (Disabled) khi chưa điền đủ, bấm vào hiện cảnh báo inline tại ô thiếu */}
                <button
                  type="submit"
                  id="btn-confirm-order-submit"
                  onClick={() => {
                    if (!isFormValid) {
                      setHasAttemptedSubmit(true);
                    }
                  }}
                  className={`w-full h-12 py-2 px-4 rounded-xl font-black text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 ${
                    isFormValid
                      ? 'bg-[#1a4d2e] hover:bg-[#143d24] active:scale-[0.98] text-white cursor-pointer shadow-emerald-900/20'
                      : 'bg-stone-200/90 hover:bg-stone-300/80 text-stone-400 cursor-pointer shadow-none opacity-60'
                  }`}
                >
                  <span>Xác Nhận Đặt Hàng Ngay</span>
                  <Send className={`w-4 h-4 ${isFormValid ? 'text-amber-400' : 'text-stone-400'}`} />
                </button>

                {/* NÚT ĐÓNG: Tăng khoảng cách an toàn với nút Xác nhận đặt hàng để tránh bấm nhầm */}
                <div className="flex items-center justify-center pt-1 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-1.5 px-4 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    ✕ Đóng cửa sổ / Quay lại giỏ hàng
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Order Success State */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-emerald-700" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase font-mono">
                  MÃ ĐƠN HÀNG: {orderId}
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 mt-2">
                  Cảm ơn Quý Khách đã đặt hàng tại G-ROOSTER!
                </h3>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
                  Đơn hàng đang được điều phối xuất kho tại <strong>44 Trần Đình Xu, P. Cầu Ông Lãnh, TP.HCM</strong> để đóng gói và giao nhanh chóng.
                </p>
                {email && (
                  <p className="text-[11px] text-emerald-800 font-medium mt-1">
                    ✉️ Thông tin xác nhận đơn hàng đã được gửi tới: <strong>{email}</strong> &amp; Ban Quản Trị (groostercompany@gmail.com).
                  </p>
                )}
                {submittedAddress && (
                  <div className="mt-2 text-xs text-stone-700 bg-stone-100 p-2.5 rounded-xl max-w-md mx-auto border border-stone-200">
                    <span className="font-bold text-emerald-950">Địa chỉ nhận hàng: </span>
                    <span>{submittedAddress}</span>
                  </div>
                )}
              </div>

              {/* TỔNG THANH TOÁN NỔI BẬT BƯỚC CUỐI CÙNG: Màu Xanh lá sẫm (#1a4d2e), Cỡ to và Đậm (Bold) */}
              <div className="p-3.5 bg-emerald-50/90 rounded-2xl border-2 border-[#1a4d2e] text-center shadow-xs max-w-md mx-auto">
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
                  Tổng thanh toán cần chuyển khoản:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#1a4d2e] tracking-tight font-heading mt-0.5">
                  {formatPrice(submittedFinalTotal ?? currentFinalTotalVND, currency, exchangeRate)}
                </div>
                {currency === 'USD' && (
                  <div className="text-xs text-stone-500 font-medium">
                    (~ {(submittedFinalTotal ?? currentFinalTotalVND).toLocaleString('vi-VN')} ₫)
                  </div>
                )}
                <div className="text-[11px] font-medium text-emerald-800 mt-1">
                  * Giá đã bao gồm thuế GTGT / VAT 8%
                </div>
              </div>

              {/* Official QR code card on Thank You Page - Redesigned for luxury mobile UX */}
              <div className="p-3 sm:p-3.5 bg-white rounded-xl border border-stone-200 shadow-sm max-w-md mx-auto space-y-2.5">
                <div className="flex items-center justify-between pb-1 border-b border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={OFFICIAL_LOGO_URL}
                      alt="Logo G-ROOSTER CO.,LTD"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      decoding="sync"
                      className="h-3.5 w-auto object-contain"
                    />
                    <span className="text-[11.5px] font-bold text-stone-800 uppercase tracking-wide">
                      Mã VietQR Thanh Toán (Techcombank)
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Sắc nét 24/7
                  </span>
                </div>

                {/* Centered QR code with optimal size 136px for mobile scanning */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="p-1.5 bg-stone-50 rounded-xl border border-stone-200/90 shadow-2xs">
                    <img
                      src={`https://img.vietqr.io/image/TCB-19039080129011-compact2.png?amount=${
                        submittedFinalTotal ?? currentFinalTotalVND
                      }&addInfo=${encodeURIComponent(`GROOSTER ${orderId || 'DON HANG'}`.trim())}&accountName=NGUYEN%20DUC%20TRUNG`}
                      alt="Mã QR Chuyển Khoản Techcombank - NGUYEN DUC TRUNG"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      decoding="sync"
                      onError={(e) => {
                        e.currentTarget.src = OFFICIAL_BANK_QR_URL;
                      }}
                      className="w-[136px] h-[136px] mx-auto rounded-lg shadow-2xs border border-stone-100 bg-white p-1 object-contain"
                    />
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[11px] font-bold text-emerald-900">
                    <span>Số tiền quét mã:</span>
                    <span className="text-[#1a4d2e] font-black font-mono text-sm">
                      {(submittedFinalTotal ?? currentFinalTotalVND).toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                  <span className="text-[9.5px] text-stone-500 font-medium mt-0.5">
                    Mở ứng dụng ngân hàng và quét mã QR để chuyển khoản chính xác 100% giá trị đơn hàng
                  </span>
                </div>

                {/* Bank Account Details - Non-wrapping values on 1 row */}
                <div className="text-[13px] text-stone-700 space-y-1 bg-stone-50/80 p-2.5 rounded-lg border border-stone-200/80">
                  <div className="flex justify-between items-center border-b border-stone-200/50 pb-1 gap-2">
                    <span className="text-stone-500 whitespace-nowrap text-[13px] shrink-0">Ngân hàng:</span>
                    <strong className="text-stone-900 font-bold whitespace-nowrap text-[13px] text-right">{BANK_NAME}</strong>
                  </div>

                  {/* STK và Tên chủ tài khoản nằm ngang trên 1 dòng, không ngắt quãng */}
                  <div className="flex justify-between items-center border-b border-stone-200/50 pb-1 gap-2">
                    <span className="text-stone-500 whitespace-nowrap text-[12.5px] shrink-0">STK &amp; Chủ TK:</span>
                    <div className="flex items-center gap-1.5 shrink-0 text-right whitespace-nowrap">
                      <span className="font-mono text-emerald-950 font-black text-[13px] tracking-wide whitespace-nowrap">
                        {BANK_ACCOUNT_NUMBER}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopySTK}
                        className="p-1 rounded text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100/80 bg-emerald-50 border border-emerald-300 transition-colors cursor-pointer shadow-2xs shrink-0"
                        title={copiedBank ? "Đã sao chép số tài khoản" : "Sao chép số tài khoản"}
                        aria-label="Sao chép số tài khoản"
                      >
                        {copiedBank ? (
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-emerald-700" />
                        )}
                      </button>
                      <span className="text-stone-300 font-normal">|</span>
                      <strong className="text-stone-900 uppercase font-bold text-[12px] sm:text-[12.5px] whitespace-nowrap">
                        {BANK_ACCOUNT_NAME}
                      </strong>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b border-stone-200/50 pb-1 gap-2 bg-emerald-50/70 -mx-2.5 px-2.5 py-1 rounded-md">
                    <span className="text-stone-800 font-bold whitespace-nowrap text-[13px] shrink-0">Tổng thanh toán:</span>
                    <strong className="text-[#1a4d2e] font-black whitespace-nowrap text-base sm:text-lg text-right font-heading">
                      {formatPrice(submittedFinalTotal ?? currentFinalTotalVND, currency, exchangeRate)}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-stone-500 whitespace-nowrap text-[13px] shrink-0">Nội dung CK:</span>
                    <strong className="text-amber-900 font-mono font-black text-xs bg-amber-100 px-2 py-0.5 rounded border border-amber-300 whitespace-nowrap">
                      GROOSTER {orderId}
                    </strong>
                  </div>
                </div>

                {/* Thông báo sao chép nội dung đơn hàng */}
                {copiedZalo && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Đã tự động soạn & sao chép nội dung đơn hàng! Quý khách chỉ cần dán (Paste) vào khung chat Zalo Hotline.</span>
                  </div>
                )}

                {/* Large Thumb-Friendly Action Buttons (Mobile-first, touch-friendly min 44px) */}
                <div className="flex flex-col gap-2.5 pt-1">
                  <a
                    id="btn-send-zalo-order"
                    href="https://zalo.me/0961525450"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleSendZaloOrder}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0068ff] hover:bg-[#0054cc] active:scale-[0.99] text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>GỬI ĐƠN QUA ZALO (HOTLINE: 0961 525 450)</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopySTK}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 active:scale-[0.99] text-emerald-950 font-bold text-xs sm:text-[13px] border border-emerald-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    {copiedBank ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span>Đã Sao Chép Số Tài Khoản ({BANK_ACCOUNT_NUMBER})</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-emerald-700" />
                        <span>Sao Chép Số Tài Khoản ({BANK_ACCOUNT_NUMBER})</span>
                      </>
                    )}
                  </button>

                  {/* Pre-drafted Zalo Order Preview with quick re-copy */}
                  <details className="group bg-stone-50 rounded-xl border border-stone-200/80 p-2.5 text-left text-xs transition-all">
                    <summary className="cursor-pointer font-bold text-stone-700 flex items-center justify-between text-[11.5px] select-none">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-emerald-800" />
                        <span>Xem trước nội dung đơn hàng gửi Hotline</span>
                      </span>
                      <span className="text-[10px] text-emerald-800 underline font-medium group-open:hidden">
                        Xem chi tiết
                      </span>
                    </summary>
                    <div className="mt-2 pt-2 border-t border-stone-200/70 space-y-2">
                      <pre className="text-[10.5px] font-mono text-stone-800 whitespace-pre-wrap bg-white p-2.5 rounded-lg border border-stone-200 max-h-40 overflow-y-auto">
                        {zaloOrderContent}
                      </pre>
                      <button
                        type="button"
                        onClick={handleCopyZaloText}
                        className="w-full py-2 px-3 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedZalo ? 'Đã Sao Chép Lại Nội Dung!' : 'Sao Chép Lại Nội Dung Này'}</span>
                      </button>
                    </div>
                  </details>

                  {/* Nút Đóng & Tiếp tục xem hàng: Tách biệt rõ ràng với khoảng cách an toàn */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 active:scale-[0.99] text-stone-600 hover:text-stone-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>✕ Hoàn tất & Tiếp tục xem hàng</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
