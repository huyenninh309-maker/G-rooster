import React, { useState, useEffect, useRef } from 'react';
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
  Compass,
  ExternalLink,
  ChevronDown,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { CheckoutSummary } from './SmartCartDrawer';
import { Currency } from '../types';
import { formatPrice } from '../utils/pricing';
import {
  getProvinces,
  getDistrictsByProvince,
  getWardsByDistrict,
  getSmartAddressSuggestions,
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
  const [province, setProvince] = useState('TP. Hồ Chí Minh');

  // Districts for current province
  const currentDistricts = getDistrictsByProvince(province);
  const [district, setDistrict] = useState(currentDistricts[0] || 'Quận 1');
  const [isCustomDistrict, setIsCustomDistrict] = useState(false);
  const [customDistrict, setCustomDistrict] = useState('');

  // Wards for current province & district
  const effectiveDistrictName = isCustomDistrict ? customDistrict : district;
  const currentWards = getWardsByDistrict(province, effectiveDistrictName);
  const [ward, setWard] = useState(currentWards[0] || 'Phường Cầu Ông Lãnh');
  const [isCustomWard, setIsCustomWard] = useState(false);
  const [customWard, setCustomWard] = useState('');

  // Field 4: Street address & house number
  const [streetAddress, setStreetAddress] = useState('');

  // Google Maps Suggestions & Autocomplete
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationNotice, setLocationNotice] = useState<string | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const [notes, setNotes] = useState('');
  const [isVATRequested, setIsVATRequested] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [submittedAddress, setSubmittedAddress] = useState('');

  // Handle Province Change -> Cascades down to District & Ward
  const handleProvinceChange = (newProvince: string) => {
    setProvince(newProvince);
    setIsCustomDistrict(false);
    setCustomDistrict('');
    setIsCustomWard(false);
    setCustomWard('');

    const newDistricts = getDistrictsByProvince(newProvince);
    const firstDistrict = newDistricts[0] || '';
    setDistrict(firstDistrict);

    const newWards = getWardsByDistrict(newProvince, firstDistrict);
    setWard(newWards[0] || '');
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
      const newWards = getWardsByDistrict(province, eVal);
      setWard(newWards[0] || '');
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

  // Calculate Real-time Suggestions from Google Maps / Local Landmark Dataset
  const effectiveWardName = isCustomWard ? customWard : ward;
  const addressSuggestions = getSmartAddressSuggestions(
    streetAddress,
    province,
    effectiveDistrictName,
    effectiveWardName
  );

  // Close suggestions dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen || !summary) return null;

  // Formatted Full Delivery Address
  const fullAddress = [
    streetAddress.trim(),
    effectiveWardName.trim(),
    effectiveDistrictName.trim(),
    province.trim(),
  ]
    .filter(Boolean)
    .join(', ');

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    fullAddress || `${effectiveDistrictName}, ${province}`
  )}`;

  // Quick GPS Geolocation helper
  const handleGeoLocate = () => {
    if (!navigator.geolocation) {
      setLocationNotice('Trình duyệt không hỗ trợ GPS.');
      return;
    }
    setIsLocating(true);
    setLocationNotice('Đang kết nối GPS bản đồ...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setLocationNotice('Đã nhận tọa độ thực tế! Khách hàng có thể kiểm tra gợi ý bên dưới.');
        setShowSuggestions(true);
        setTimeout(() => setLocationNotice(null), 3500);
      },
      (err) => {
        setIsLocating(false);
        setLocationNotice('Vui lòng bật quyền vị trí hoặc chọn địa chỉ nhanh từ danh sách.');
        setTimeout(() => setLocationNotice(null), 3500);
      },
      { timeout: 8000 }
    );
  };

  const handleCopySTK = () => {
    navigator.clipboard.writeText('19039080129011');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `CC-${Date.now().toString().slice(-6)}`;
    setOrderId(generatedId);
    setSubmittedAddress(fullAddress);

    // Save order to localStorage
    try {
      const newOrder = {
        id: generatedId,
        createdAt: new Date().toISOString(),
        customerName: customerName.trim(),
        phone: phone.trim(),
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
        finalTotalVND: summary.finalTotalVND,
        items: summary.items.map((item) => ({
          product: {
            id: item.product.id,
            name: item.product.name,
            image: item.product.image,
            partnerName: item.product.partnerName,
            unit: item.product.unit,
            retailUnit: item.product.retailUnit,
            wholesaleUnit: item.wholesaleConfig.wholesaleUnit,
          },
          quantity: item.quantity,
          purchaseMode: item.purchaseMode,
          unitPriceVND: item.unitPrice,
          subtotalVND: item.subtotal,
          activeTierLabel: item.pricing?.activeTierLabel,
        })),
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

  // Official Bank QR Code from Chút Chíu & Official Brand Logo
  const OFFICIAL_LOGO_URL = 'https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png';
  const OFFICIAL_BANK_QR_URL = 'https://i.postimg.cc/BvD1NLMs/ma-qr-chuyen-khoan-nguyen-duc-trung.png';
  const BANK_ACCOUNT_NUMBER = '19039080129011';
  const BANK_ACCOUNT_NAME = 'NGUYEN DUC TRUNG';
  const BANK_NAME = 'Techcombank';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-xl px-2.5 py-1 shadow-xs shrink-0 h-10 flex items-center justify-center border border-white/90">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="CHUTCHIU CO.,LTD"
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
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Order quick overview - Compact 1-Row Bar (18px Total Price & Same Row Delivery Badge) */}
              <div className="px-3.5 py-2 bg-stone-50/90 rounded-xl border border-stone-200/90 flex items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-baseline gap-1.5 min-w-0">
                  <span className="text-xs text-stone-500 font-medium whitespace-nowrap">
                    Tổng cộng ({summary.items.length} món):
                  </span>
                  <span className="text-[18px] font-black text-emerald-950 font-heading tracking-tight whitespace-nowrap">
                    {formatPrice(summary.finalTotalVND, currency, exchangeRate)}
                  </span>
                  {summary.discountVND > 0 && (
                    <span className="text-[10px] text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded font-bold whitespace-nowrap">
                      -50k
                    </span>
                  )}
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full font-bold text-[11px] whitespace-nowrap">
                    <Zap className="w-3 h-3 text-amber-600 shrink-0" />
                    <span>Giao hàng toàn quốc</span>
                  </span>
                </div>
              </div>

              {/* Customer Contact Inputs - Compact 38px height and 14px font */}
              <div className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Họ và tên người nhận / Đại diện *
                    </label>
                    <input
                      required
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full h-[38px] px-3 py-1.5 text-[14px] rounded-xl border border-stone-300 font-medium focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Số điện thoại nhận hàng *
                    </label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full h-[38px] px-3 py-1.5 text-[14px] rounded-xl border border-stone-300 font-medium focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700/20"
                    />
                  </div>
                </div>

                {/* 4-LEVEL SMART VIETNAMESE ADDRESS FORM (Compact Form: -15% Height, 14px font, reduced padding) */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-emerald-300/70 bg-emerald-50/40 space-y-2.5 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <Truck className="w-4 h-4 text-emerald-800" />
                      Địa Chỉ Nhận Hàng (Chuẩn 4 Cấp) *
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleGeoLocate}
                        disabled={isLocating}
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-800 hover:text-emerald-950 font-bold bg-white hover:bg-emerald-100/80 px-2 py-0.5 rounded-lg border border-emerald-300 transition-colors cursor-pointer shadow-2xs"
                        title="Định vị nhanh vị trí GPS hiện tại"
                      >
                        <Compass className={`w-3.5 h-3.5 text-emerald-700 ${isLocating ? 'animate-spin' : ''}`} />
                        <span>{isLocating ? 'Đang định vị...' : 'Định vị GPS'}</span>
                      </button>
                      <span className="text-[10px] text-emerald-900 font-bold bg-emerald-200/80 px-2 py-0.5 rounded-md">
                        63 Tỉnh Thành
                      </span>
                    </div>
                  </div>

                  {locationNotice && (
                    <div className="text-[11px] text-emerald-900 bg-white p-2 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{locationNotice}</span>
                    </div>
                  )}

                  {/* 3 Cascading Administrative Dropdowns - Compact gap-2 and 38px height */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {/* Cấp 1: Tỉnh / Thành phố */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-emerald-800 text-white text-[9px] flex items-center justify-center font-bold">1</span>
                        Tỉnh / Thành phố *
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={province}
                          onChange={(e) => handleProvinceChange(e.target.value)}
                          className="w-full h-[38px] min-h-[38px] px-2.5 py-1 text-[14px] rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700/20 font-medium appearance-none pr-7 cursor-pointer"
                        >
                          {provincesList.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Cấp 2: Quận / Huyện (Tự động theo Tỉnh) */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-emerald-800 text-white text-[9px] flex items-center justify-center font-bold">2</span>
                        Quận / Huyện *
                      </label>
                      {!isCustomDistrict ? (
                        <div className="relative">
                          <select
                            required
                            value={district}
                            onChange={(e) => handleDistrictChange(e.target.value)}
                            className="w-full h-[38px] min-h-[38px] px-2.5 py-1 text-[14px] rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700/20 font-medium appearance-none pr-7 cursor-pointer"
                          >
                            {currentDistricts.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                            <option value="__custom__">+ Quận / Huyện khác (Nhập tay)...</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <input
                            required
                            type="text"
                            value={customDistrict}
                            onChange={(e) => setCustomDistrict(e.target.value)}
                            placeholder="Nhập tên Quận/Huyện..."
                            className="w-full h-[38px] min-h-[38px] px-2.5 py-1 text-[14px] rounded-xl border border-emerald-400 bg-white text-stone-900 font-medium focus:outline-none focus:border-emerald-700"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsCustomDistrict(false);
                              setDistrict(currentDistricts[0] || '');
                            }}
                            className="text-[10px] text-emerald-800 underline font-semibold"
                          >
                            ← Chọn lại từ danh sách
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Cấp 3: Phường / Xã (Tự động theo Quận/Huyện) */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-emerald-800 text-white text-[9px] flex items-center justify-center font-bold">3</span>
                        Phường / Xã *
                      </label>
                      {!isCustomWard && currentWards.length > 0 ? (
                        <div className="relative">
                          <select
                            required
                            value={ward}
                            onChange={(e) => handleWardChange(e.target.value)}
                            className="w-full h-[38px] min-h-[38px] px-2.5 py-1 text-[14px] rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700/20 font-medium appearance-none pr-7 cursor-pointer"
                          >
                            {currentWards.map((w) => (
                              <option key={w} value={w}>
                                {w}
                              </option>
                            ))}
                            <option value="__custom__">+ Phường / Xã khác (Nhập tay)...</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <input
                            required
                            type="text"
                            value={isCustomWard ? customWard : ward}
                            onChange={(e) => {
                              if (isCustomWard) setCustomWard(e.target.value);
                              else setWard(e.target.value);
                            }}
                            placeholder="Nhập tên Phường/Xã..."
                            className="w-full h-[38px] min-h-[38px] px-2.5 py-1 text-[14px] rounded-xl border border-emerald-400 bg-white text-stone-900 font-medium focus:outline-none focus:border-emerald-700"
                          />
                          {currentWards.length > 0 && isCustomWard && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsCustomWard(false);
                                setWard(currentWards[0] || '');
                              }}
                              className="text-[10px] text-emerald-800 underline font-semibold"
                            >
                              ← Chọn lại từ danh sách
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cấp 4: Số nhà, Tên đường & Map Linking Google Maps Autocomplete */}
                  <div className="relative" ref={suggestionsRef}>
                    <div className="flex items-center justify-between mb-0.5">
                      <label className="block text-[11px] font-bold text-stone-700 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-emerald-800 text-white text-[9px] flex items-center justify-center font-bold">4</span>
                        Số nhà, Tên đường (Tòa nhà / Hẻm / Căn hộ) *
                      </label>
                      <span className="text-[10px] text-emerald-800 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        Gợi ý Google Maps
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        required
                        type="text"
                        value={streetAddress}
                        onChange={(e) => {
                          setStreetAddress(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="VD: 44 Trần Đình Xu, hoặc Bitexco, Tòa nhà Vincom..."
                        className="w-full h-[38px] min-h-[38px] pl-8 pr-8 py-1 text-[14px] rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700/20 font-medium"
                      />
                      <MapPin className="w-4 h-4 text-emerald-700 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      {streetAddress && (
                        <button
                          type="button"
                          onClick={() => setStreetAddress('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Google Maps Smart Address Suggestions Dropdown */}
                    {showSuggestions && addressSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-white rounded-2xl shadow-xl border border-emerald-200 overflow-hidden animate-in fade-in-50 duration-150">
                        <div className="p-2.5 bg-emerald-950 text-white flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            <span>Gợi ý địa chỉ từ Google Maps & Dữ liệu bản đồ</span>
                          </div>
                          <span className="text-[10px] text-emerald-300">
                            {effectiveDistrictName || 'Toàn quốc'}
                          </span>
                        </div>
                        <div className="max-h-52 overflow-y-auto divide-y divide-stone-100">
                          {addressSuggestions.map((item, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setStreetAddress(item);
                                setShowSuggestions(false);
                              }}
                              className="w-full text-left px-3 py-2 hover:bg-emerald-50/80 transition-colors flex items-start gap-2 text-xs group cursor-pointer"
                            >
                              <MapPin className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0 group-hover:text-emerald-800" />
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-stone-800 group-hover:text-emerald-950 truncate text-[13px]">
                                  {item}
                                </div>
                                <div className="text-[10px] text-stone-400">
                                  {effectiveWardName}, {effectiveDistrictName}, {province}
                                </div>
                              </div>
                              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                                Chọn nhanh
                              </span>
                            </button>
                          ))}
                        </div>
                        <div className="p-2 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between text-[11px]">
                          <span className="text-stone-500 text-[10px]">
                            Gõ số nhà hoặc tên đường để lọc gợi ý tự động
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowSuggestions(false)}
                            className="text-[10px] text-stone-600 font-bold hover:text-stone-900"
                          >
                            Đóng ✕
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Live Formatted Address Preview & Google Maps Linking */}
                  {fullAddress && (
                    <div className="pt-1 text-[11px] text-stone-700 bg-white p-2.5 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-emerald-950">Địa chỉ giao hàng hoàn chỉnh: </span>
                          <span className="font-semibold text-stone-900">{fullAddress}</span>
                        </div>
                      </div>
                      <a
                        href={googleMapsSearchUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-lg border border-emerald-200 shrink-0 transition-colors"
                      >
                        <span>Xem trên Google Maps</span>
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

              {/* 3. TÁI CẤU TRÚC KHỐI THANH TOÁN CHUYỂN KHOẢN (QUAN TRỌNG) */}
              <div className="p-3.5 sm:p-4 bg-white rounded-2xl border border-emerald-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-stone-100">
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-700" />
                    Thông Tin Chuyển Khoản Ngân Hàng
                  </span>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    VietQR Tự Động
                  </span>
                </div>

                {/* Mã QR Chuyển khoản: Thu nhỏ 140px - 160px, nằm chính giữa, khung viền mờ bo góc sang trọng */}
                <div className="flex flex-col items-center justify-center py-0.5">
                  <div className="relative rounded-2xl border border-stone-200/90 bg-stone-50/70 p-2 shadow-xs flex flex-col items-center">
                    <div className="mb-1 flex items-center justify-center gap-1">
                      <img
                        src={OFFICIAL_LOGO_URL}
                        alt="Chút Chíu"
                        className="h-3.5 w-auto object-contain"
                      />
                      <span className="text-[9px] font-black text-emerald-950 uppercase tracking-wide">VietQR Chút Chíu</span>
                    </div>
                    <img
                      src={OFFICIAL_BANK_QR_URL}
                      alt="Mã QR Chuyển Khoản Techcombank - Nguyen Duc Trung"
                      referrerPolicy="no-referrer"
                      className="w-[145px] h-[145px] sm:w-[155px] sm:h-[155px] object-contain rounded-xl bg-white p-1 border border-stone-100 shadow-2xs"
                    />
                  </div>
                  <span className="text-[10px] text-stone-500 font-medium mt-1 text-center">
                    Quét mã VietQR bằng app ngân hàng để thanh toán chính xác
                  </span>
                </div>

                {/* Danh Sách Đối Xứng (Label bên trái - Value bên phải) Trên Cùng 1 Hàng - TUYỆT ĐỐI KHÔNG NGẮT DÒNG */}
                <div className="space-y-1.5 bg-stone-50/80 p-3 rounded-xl border border-stone-200/70 text-[13px] sm:text-[14px]">
                  <div className="flex items-center justify-between gap-2 border-b border-stone-200/60 pb-1.5">
                    <span className="text-stone-500 whitespace-nowrap text-[13px]">Ngân hàng:</span>
                    <strong className="text-stone-900 font-bold whitespace-nowrap text-[13px] sm:text-[14px]">{BANK_NAME}</strong>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-b border-stone-200/60 pb-1.5">
                    <span className="text-stone-500 whitespace-nowrap text-[13px]">Số tài khoản:</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <strong className="font-mono text-emerald-950 text-[13px] sm:text-[14px] font-black tracking-wide whitespace-nowrap">
                        {BANK_ACCOUNT_NUMBER}
                      </strong>
                      <button
                        type="button"
                        onClick={handleCopySTK}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 cursor-pointer transition-colors whitespace-nowrap"
                        title="Sao chép số tài khoản"
                      >
                        {copiedBank ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-700" />
                            <span>Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-emerald-700" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-b border-stone-200/60 pb-1.5">
                    <span className="text-stone-500 whitespace-nowrap text-[13px]">Chủ tài khoản:</span>
                    <strong className="text-stone-900 font-bold uppercase whitespace-nowrap text-[13px] sm:text-[14px]">
                      {BANK_ACCOUNT_NAME}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-b border-stone-200/60 pb-1.5">
                    <span className="text-stone-500 whitespace-nowrap text-[13px]">Số tiền tạm tính:</span>
                    <strong className="text-emerald-900 font-black whitespace-nowrap text-[13px] sm:text-[14px]">
                      {formatPrice(summary.finalTotalVND, currency, exchangeRate)}
                    </strong>
                  </div>

                  <div className="text-[11px] text-stone-500 pt-0.5 flex items-center justify-center sm:justify-start gap-1">
                    <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>Hệ thống tự động xác nhận & xuất kho ngay khi chuyển khoản.</span>
                  </div>
                </div>
              </div>

              {/* 4. NÚT XÁC NHẬN ĐẶT HÀNG: Sticky Bottom Bar with Active Feedback */}
              <div className="sticky bottom-0 -mx-6 -mb-6 p-3 sm:p-3.5 bg-white/95 backdrop-blur-md border-t border-stone-200 z-20 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
                <button
                  type="submit"
                  id="btn-confirm-order-submit"
                  className="w-full h-11 sm:h-12 py-2 px-4 rounded-xl bg-emerald-900 hover:bg-emerald-950 active:scale-[0.98] active:bg-emerald-950 text-white font-black text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Xác Nhận Đặt Hàng Ngay</span>
                  <Send className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </form>
          ) : (
            /* Order Success State */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-emerald-700" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase font-mono">
                  MÃ ĐƠN HÀNG: {orderId}
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 mt-2">
                  Cảm ơn Quý Khách đã đặt hàng tại Chút Chíu!
                </h3>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
                  Đơn hàng đang được điều phối xuất kho tại <strong>44 Trần Đình Xu, P. Cầu Ông Lãnh, Q.1</strong> để đóng gói và giao nhanh chóng.
                </p>
                {submittedAddress && (
                  <div className="mt-2 text-xs text-stone-700 bg-stone-100 p-2.5 rounded-xl max-w-md mx-auto border border-stone-200">
                    <span className="font-bold text-emerald-950">Địa chỉ nhận hàng: </span>
                    <span>{submittedAddress}</span>
                  </div>
                )}
              </div>

              {/* Official QR code card on Thank You Page - Redesigned for luxury mobile UX */}
              <div className="p-4 sm:p-5 bg-white rounded-[16px] border border-stone-200 shadow-md max-w-md mx-auto space-y-3.5">
                <div className="flex items-center justify-center gap-1.5 pb-1 border-b border-stone-100">
                  <img
                    src={OFFICIAL_LOGO_URL}
                    alt="Chút Chíu"
                    className="h-4.5 w-auto object-contain"
                  />
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                    Mã VietQR Thanh Toán (Techcombank)
                  </span>
                </div>

                {/* Centered QR code with optimal size (140px-160px) for mobile scanning */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="p-2 bg-stone-50 rounded-2xl border border-stone-200/90 shadow-2xs">
                    <img
                      src={OFFICIAL_BANK_QR_URL}
                      alt="Mã QR Chuyển Khoản Techcombank - NGUYEN DUC TRUNG"
                      referrerPolicy="no-referrer"
                      className="w-[145px] h-[145px] sm:w-[155px] sm:h-[155px] mx-auto rounded-xl shadow-xs border border-stone-100 bg-white p-1 object-contain"
                    />
                  </div>
                  <span className="text-[10px] text-stone-500 font-medium mt-1">
                    Mở ứng dụng ngân hàng và quét mã QR để chuyển khoản chính xác
                  </span>
                </div>

                {/* Bank Account Details - Non-wrapping values on 1 row */}
                <div className="text-[13px] sm:text-[14px] text-stone-700 space-y-1.5 bg-stone-50/80 p-3 sm:p-3.5 rounded-xl border border-stone-200/80">
                  <div className="flex justify-between items-center border-b border-stone-200/60 pb-1.5 gap-2">
                    <span className="text-stone-500 whitespace-nowrap text-[13px]">Ngân hàng:</span>
                    <strong className="text-stone-900 font-bold whitespace-nowrap text-[13px] sm:text-[14px]">{BANK_NAME}</strong>
                  </div>
                  <div className="flex justify-between items-center border-b border-stone-200/60 pb-1.5 gap-2">
                    <span className="text-stone-500 whitespace-nowrap text-[13px]">Số tài khoản:</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="font-mono text-emerald-950 font-black text-[13px] sm:text-[14px] tracking-wide whitespace-nowrap">
                        {BANK_ACCOUNT_NUMBER}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopySTK}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 cursor-pointer transition-colors whitespace-nowrap"
                        title="Sao chép số tài khoản"
                      >
                        {copiedBank ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-700" />
                            <span>Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-emerald-700" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b border-stone-200/60 pb-1.5 gap-2">
                    <span className="text-stone-500 whitespace-nowrap text-[13px]">Chủ tài khoản:</span>
                    <strong className="text-stone-900 uppercase font-bold whitespace-nowrap text-[13px] sm:text-[14px]">{BANK_ACCOUNT_NAME}</strong>
                  </div>
                  <div className="flex justify-between items-center border-b border-stone-200/60 pb-1.5 gap-2">
                    <span className="text-stone-500 whitespace-nowrap text-[13px]">Số tiền:</span>
                    <strong className="text-emerald-900 font-black whitespace-nowrap text-[13px] sm:text-[14px]">
                      {formatPrice(summary.finalTotalVND, currency, exchangeRate)}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-stone-500 whitespace-nowrap text-[13px]">Nội dung CK:</span>
                    <strong className="text-amber-900 font-mono font-black text-xs bg-amber-100 px-2 py-0.5 rounded border border-amber-300 whitespace-nowrap">
                      CHUT CHIU {orderId}
                    </strong>
                  </div>
                </div>

                {/* Large Thumb-Friendly Action Buttons (Mobile-first, touch-friendly min 44px) */}
                <div className="flex flex-col gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleCopySTK}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 active:scale-[0.99] text-emerald-950 font-black text-xs sm:text-sm border border-emerald-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    {copiedBank ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span>Đã Sao Chép Số Tài Khoản</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-emerald-700" />
                        <span>Sao Chép Số Tài Khoản (0961 525 450)</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://zalo.me/0961525450`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0068ff] hover:bg-[#0054cc] active:scale-[0.99] text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Gửi Đơn & Xác Nhận Qua Zalo</span>
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Hoàn tất & Tiếp tục xem hàng</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
