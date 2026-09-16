import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { X, Download, Share2, Check, ExternalLink, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { drawChutChiuLogoToCanvas, OFFICIAL_LOGO_URL, LOCAL_LOGO_FALLBACK } from './ChutChiuLogo';
import { getProductQrUrl, getProductTargetRecipe } from '../utils/publicUrl';

interface QRCodeModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ product, isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [publicUrl, setPublicUrl] = useState('');

  useEffect(() => {
    if (product) {
      setPublicUrl(getProductQrUrl(product));
      setCopied(false);
    }
  }, [product]);

  useEffect(() => {
    if (!canvasRef.current || !isOpen || !product || !publicUrl) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution canvas scale (3x) for crisp display
    const qrSize = 160;
    const scale = 3;
    canvas.width = qrSize * scale;
    canvas.height = qrSize * scale;

    QRCode.toCanvas(
      canvas,
      publicUrl,
      {
        width: qrSize * scale,
        margin: 1.5,
        errorCorrectionLevel: 'H',
        color: {
          dark: '#052e16', // Luxury deep emerald
          light: '#ffffff',
        },
      },
      (error) => {
        if (error) {
          console.error('QR Code render error:', error);
          return;
        }

        // Draw official Chút Chíu center logo badge
        const centerX = (qrSize * scale) / 2;
        const centerY = (qrSize * scale) / 2;
        const logoRadius = (qrSize * scale) * 0.17;
        drawChutChiuLogoToCanvas(ctx, centerX, centerY, logoRadius);
      }
    );
  }, [product, isOpen, publicUrl]);

  if (!isOpen || !product) return null;

  const targetRecipe = getProductTargetRecipe(product);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `QR-ChutChiu-${product.id}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleCopyLink = () => {
    if (!publicUrl) return;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLink = () => {
    if (!publicUrl) return;
    window.open(publicUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* POPUP NHỎ GỌN: Chiếm ~60% màn hình trên desktop/tablet, không to đùng che khuất giao diện */}
      <div
        className="relative w-[90vw] sm:w-[70vw] md:w-[60vw] max-w-[390px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-stone-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header tinh tế với Logo Chút Chíu trong khối trắng bo góc */}
        <div className="flex items-center justify-between px-4 py-3 bg-stone-900 text-white border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="bg-white rounded-xl px-1.5 py-1 shadow-xs shrink-0 h-8 flex items-center justify-center">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="CHUTCHIU CO.,LTD"
                className="h-full w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = LOCAL_LOGO_FALLBACK;
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 font-heading">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                <span>MÃ QR CÔNG THỨC</span>
              </div>
              <p className="text-[10px] text-stone-400 font-sans">Định lượng Barista &amp; Cost quán</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body nhỏ gọn */}
        <div className="p-4 sm:p-5 flex flex-col items-center text-center">
          {/* Tên sản phẩm & công thức */}
          <div className="w-full mb-3">
            <h4 className="text-xs sm:text-sm font-black text-stone-900 font-heading line-clamp-1">
              {product.name}
            </h4>
            <p className="text-[11px] text-emerald-800 font-semibold mt-0.5 truncate font-sans">
              Công thức: {targetRecipe.title}
            </p>
          </div>

          {/* Khung Canvas QR: Kích thước vừa vặn 160px với logo Chút Chíu đóng dấu ở giữa */}
          <div
            onClick={handleOpenLink}
            className="relative p-2 bg-white rounded-2xl border border-stone-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] cursor-pointer hover:border-emerald-700/50 transition-colors group"
            title="Nhấn để xem thử công thức"
          >
            <canvas
              ref={canvasRef}
              style={{ width: '160px', height: '160px' }}
              className="rounded-xl block"
            />
          </div>

          {/* Dòng hướng dẫn quét mã */}
          <p className="text-[11px] text-stone-500 mt-2.5 font-medium font-sans">
            Quét camera điện thoại để xem tỷ lệ gram/ml chuẩn
          </p>

          {/* 3 NÚT BẰNG NHAU TUYỆT ĐỐI (33.333% mỗi nút), DÀN TRÊN 1 HÀNG NGANG */}
          <div className="grid grid-cols-3 gap-2 mt-3.5 w-full">
            <button
              id={`download-qr-${product.id}`}
              type="button"
              onClick={handleDownload}
              className="w-full h-9 flex items-center justify-center gap-1 px-1 rounded-xl text-xs font-bold border border-stone-200/90 bg-white hover:bg-stone-50 hover:border-emerald-800 text-stone-800 transition-all shadow-2xs active:scale-[0.98] cursor-pointer whitespace-nowrap"
              title="Tải ảnh QR về máy"
            >
              <Download className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
              <span className="truncate">Tải QR</span>
            </button>

            <button
              id={`copy-qr-${product.id}`}
              type="button"
              onClick={handleCopyLink}
              className={`w-full h-9 flex items-center justify-center gap-1 px-1 rounded-xl text-xs font-bold border transition-all shadow-2xs active:scale-[0.98] cursor-pointer whitespace-nowrap ${
                copied
                  ? 'bg-emerald-900 text-white border-emerald-900'
                  : 'border-stone-200/90 bg-white hover:bg-stone-50 hover:border-emerald-800 text-stone-800'
              }`}
              title="Sao chép đường link tra cứu"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-amber-300 shrink-0 stroke-[2.5]" />
                  <span className="truncate">Đã chép</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <span className="truncate">Chép link</span>
                </>
              )}
            </button>

            <button
              id={`preview-qr-${product.id}`}
              type="button"
              onClick={handleOpenLink}
              className="w-full h-9 flex items-center justify-center gap-1 px-1 rounded-xl text-xs font-bold border border-stone-200/90 bg-white hover:bg-stone-50 hover:border-emerald-800 text-stone-800 transition-all shadow-2xs active:scale-[0.98] cursor-pointer whitespace-nowrap"
              title="Xem thử công thức trong tab mới"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
              <span className="truncate">Xem thử</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
