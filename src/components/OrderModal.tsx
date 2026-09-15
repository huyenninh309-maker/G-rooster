import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  Phone,
  Truck,
  CreditCard,
  FileText,
  Send,
  Zap,
} from 'lucide-react';
import { CheckoutSummary } from './SmartCartDrawer';
import { Currency } from '../types';
import { formatPrice } from '../utils/pricing';

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
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isVATRequested, setIsVATRequested] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen || !summary) return null;

  const handleCopySTK = () => {
    navigator.clipboard.writeText('19039080129011');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `CC-${Date.now().toString().slice(-6)}`;
    setOrderId(generatedId);
    setIsSubmitted(true);
    onOrderSuccess();
  };

  // VietQR Quick Transfer URL
  const vietQRUrl = `https://img.vietqr.io/image/970407-19039080129011-compact2.png?amount=${summary.finalTotalVND}&addInfo=CHUT%20CHIU%20${orderId || 'DON%20HANG'}&accountName=NGUYEN%20DUC%20TRUNG`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-xl p-1 shadow-xs shrink-0 h-10 flex items-center justify-center">
              <img
                src="/image.png"
                alt="CHUTCHIU CO.,LTD"
                className="h-full w-auto object-contain"
              />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold tracking-tight">
                {isSubmitted ? 'ĐẶT HÀNG THÀNH CÔNG' : 'XÁC NHẬN ĐƠN HÀNG B2B/B2C'}
              </h3>
              <p className="text-xs text-emerald-300 font-medium">Nông Sản Cao Cấp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Order quick overview */}
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/90 flex items-center justify-between">
                <div>
                  <div className="text-xs text-stone-500 font-medium">
                    Tổng cộng ({summary.items.length} món):
                  </div>
                  <div className="text-xl font-black text-emerald-950">
                    {formatPrice(summary.finalTotalVND, currency, exchangeRate)}
                  </div>
                  {summary.discountVND > 0 && (
                    <div className="text-[11px] text-amber-700 font-semibold">
                      Đã trừ voucher: -50.000₫
                    </div>
                  )}
                </div>
                <div className="text-right text-xs">
                  <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full font-bold">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    Giao hỏa tốc 2H tại HCM
                  </span>
                </div>
              </div>

              {/* Customer Inputs */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
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
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Địa chỉ giao hàng (Ưu tiên giao hỏa tốc 2H tại TP.HCM) *
                  </label>
                  <input
                    required
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/TP"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                  />
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
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                {/* VAT B2B Invoice option */}
                <div className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/60">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVATRequested}
                      onChange={(e) => setIsVATRequested(e.target.checked)}
                      className="w-4 h-4 text-emerald-800 rounded border-stone-300 focus:ring-emerald-700"
                    />
                    <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-800" />
                      Yêu cầu xuất Hóa Đơn Điện Tử VAT cho Doanh Nghiệp (B2B)
                    </span>
                  </label>

                  {isVATRequested && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-stone-200">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Tên Công Ty / Doanh Nghiệp
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Công ty TNHH..."
                          className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
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
                          className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bank Transfer Information Preview */}
              <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-700" />
                    Thông Tin Thanh Toán Chuyển Khoản
                  </span>
                  <button
                    type="button"
                    onClick={handleCopySTK}
                    className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 hover:text-emerald-950"
                  >
                    {copiedBank ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Đã chép STK
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Sao chép STK
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  <div>
                    Ngân hàng: <strong>Techcombank</strong>
                  </div>
                  <div>
                    Số tài khoản:{' '}
                    <strong className="font-mono text-emerald-950 text-sm">
                      19039080129011
                    </strong>
                  </div>
                  <div>
                    Chủ tài khoản: <strong>NGUYEN DUC TRUNG</strong>
                  </div>
                  <div>
                    Hotline hỗ trợ:{' '}
                    <strong className="text-emerald-900">0961 525 450 / 0938 7979 04</strong>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Xác Nhận Đặt Hàng Ngay</span>
                <Send className="w-4 h-4 text-amber-400" />
              </button>
            </form>
          ) : (
            /* Order Success State */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-emerald-700" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase">
                  MÃ ĐƠN HÀNG: {orderId}
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 mt-2">
                  Cảm ơn Quý Khách đã đặt hàng tại Chút Chíu!
                </h3>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
                  Đơn hàng đang được điều phối xuất kho tại <strong>44 Trần Đình Xu, P. Cầu Ông Lãnh, Q.1</strong> để giao hỏa tốc 2H.
                </p>
              </div>

              {/* VietQR code card */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 max-w-sm mx-auto">
                <div className="text-xs font-bold text-stone-800 mb-2">
                  Quét mã VietQR để thanh toán nhanh qua App Ngân Hàng:
                </div>
                <img
                  src={vietQRUrl}
                  alt="VietQR Techcombank"
                  className="w-56 h-auto mx-auto rounded-xl shadow-md border border-stone-200"
                />
                <div className="mt-3 text-xs text-stone-600 space-y-1">
                  <div>Techcombank: <strong>19039080129011</strong></div>
                  <div>Chủ TK: <strong>NGUYEN DUC TRUNG</strong></div>
                  <div>Số tiền: <strong className="text-emerald-900">{formatPrice(summary.finalTotalVND, currency, exchangeRate)}</strong></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://zalo.me/0961525450`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  Xác nhận đơn qua Zalo (0961 525 450)
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition-colors"
                >
                  Hoàn tất & Về trang chủ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
