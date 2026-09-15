import React from 'react';
import { X, QrCode, ShieldCheck, Award } from 'lucide-react';
import { Product } from '../types';
import { SmartQRCode } from './SmartQRCode';

interface QRCodeModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#144385] via-[#0b3b24] to-[#15803d] text-white border-b border-blue-400/30">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-xl p-1 shadow-sm shrink-0 h-10 flex items-center justify-center">
              <img
                src="/image.png"
                alt="CHUTCHIU CO.,LTD"
                className="h-full w-auto object-contain"
              />
            </div>
            <div>
              <p className="text-xs text-emerald-100 font-semibold">Mã QR Công Thức Pha Chế</p>
              <p className="text-[10px] text-emerald-300">Định Lượng Quầy Barista & Giá Vốn</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-200 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-center">
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              {product.partnerName}
            </span>
          </div>

          <h4 className="text-base font-bold text-stone-900 line-clamp-2 px-2">
            {product.name}
          </h4>

          <p className="text-xs text-stone-500 mt-1">
            Mã vạch số: <span className="font-mono font-semibold text-stone-800">{product.barcode}</span>
          </p>

          <div className="my-5 flex justify-center">
            <SmartQRCode product={product} size={220} showActions={true} />
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-left text-xs text-stone-600 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Logo CHUTCHIU CO.,LTD đóng dấu trung tâm
            </div>
            <p className="text-[11px] text-stone-500">
              Khách hàng hoặc Barista dùng camera điện thoại / Zalo quét mã để mở xem ngay công thức pha chế chi tiết, tỷ lệ gram/ml và nhập sỉ nguyên liệu cho quán.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
