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

    // High resolution canvas scale (3x) for crisp display: exactly 140x140px QR
    const qrSize = 140;
    const scale = 3;
    canvas.width = qrSize * scale;
    canvas.height = qrSize * scale;

    QRCode.toCanvas(
      canvas,
      publicUrl,
      {
        width: qrSize * scale,
        margin: 1,
        errorCorrectionLevel: 'H',
        color: {
          dark: '#052e16', // Luxury deep forest green
          light: '#ffffff',
        },
      },
      (error) => {
        if (error) {
          console.error('QR Code render error:', error);
          return;
        }

        // BẮT BUỘC: Khóa kích thước hiển thị trên màn hình đúng chuẩn 140px x 140px
        canvas.style.width = '140px';
        canvas.style.height = '140px';
        canvas.style.maxWidth = '140px';
        canvas.style.maxHeight = '140px';

        // Chèn duy nhất 1 ảnh logo gốc sắc nét (https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png) vào tâm mã QR
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const centerX = (qrSize * scale) / 2;
          const centerY = (qrSize * scale) / 2;
          // Kích thước logo ở tâm chỉ chiếm khoảng 20% diện tích mã QR
          const logoRadius = (qrSize * scale) * 0.16;

          ctx.save();
          // Vòng đệm trắng bảo vệ
          ctx.beginPath();
          ctx.arc(centerX, centerY, logoRadius, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.lineWidth = Math.max(1.5, 1.5 * scale);
          ctx.strokeStyle = '#e7e5e4';
          ctx.stroke();

          // Clip hình tròn để chèn logo gốc sắc nét
          ctx.beginPath();
          ctx.arc(centerX, centerY, logoRadius * 0.9, 0, Math.PI * 2);
          ctx.clip();
          const drawSize = logoRadius * 1.8;
          ctx.drawImage(img, centerX - drawSize / 2, centerY - drawSize / 2, drawSize, drawSize);
          ctx.restore();
        };
        img.onerror = () => {
          // Fallback nếu ảnh mạng bị chậm
          const centerX = (qrSize * scale) / 2;
          const centerY = (qrSize * scale) / 2;
          const logoRadius = (qrSize * scale) * 0.16;
          drawChutChiuLogoToCanvas(ctx, centerX, centerY, logoRadius);
        };
        img.src = OFFICIAL_LOGO_URL;
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* POPUP THU NHỎ TUYỆT ĐỐI: Chiều ngang chuẩn 300px trên Mobile/Tablet */}
      <div
        className="relative w-[90vw] max-w-[300px] bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200 mx-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header tinh tế, nhỏ gọn */}
        <div className="flex items-center justify-between px-3 py-2 bg-stone-900 text-white border-b border-stone-800">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="bg-white rounded px-1 py-0.5 shadow-2xs shrink-0 h-5.5 flex items-center justify-center">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="CHUTCHIU CO.,LTD"
                className="h-full w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = LOCAL_LOGO_FALLBACK;
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-300 font-heading truncate">
                <Sparkles className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                <span>MÃ QR CÔNG THỨC</span>
              </div>
              <p className="text-[8.5px] text-stone-400 font-sans truncate">Định lượng Barista &amp; Cost quán</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors shrink-0 ml-1"
            aria-label="Đóng"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Body: Khoảng trắng thanh thoát, tinh tế */}
        <div className="p-3 sm:p-3.5 flex flex-col items-center text-center">
          {/* Tên sản phẩm & công thức */}
          <div className="w-full mb-1">
            <h4 className="text-[11.5px] font-black text-stone-900 font-heading line-clamp-1">
              {product.name}
            </h4>
            <p className="text-[9.5px] text-emerald-800 font-semibold mt-0.5 truncate font-sans">
              Công thức: {targetRecipe.title}
            </p>
          </div>

          {/* Khung Canvas QR: Kích thước CHÍNH XÁC 140px x 140px, khóa cứng container không cho tràn */}
          <div
            onClick={handleOpenLink}
            className="w-[140px] h-[140px] min-w-[140px] min-h-[140px] max-w-[140px] max-h-[140px] overflow-hidden rounded-xl bg-white shadow-2xs border border-stone-200/90 mx-auto my-2 flex items-center justify-center p-0.5 cursor-pointer hover:border-emerald-700/50 transition-colors group"
            title="Nhấn để xem thử công thức"
          >
            <canvas
              ref={canvasRef}
              style={{ width: '140px', height: '140px', maxWidth: '140px', maxHeight: '140px' }}
              className="rounded-lg block w-[140px] h-[140px] max-w-[140px] max-h-[140px]"
            />
          </div>

          {/* Dòng hướng dẫn quét mã */}
          <p className="text-[9px] text-stone-500 font-medium font-sans mt-0.5">
            Quét camera điện thoại để xem công thức chuẩn
          </p>

          {/* 3 NÚT BẤM (Tải QR, Chép link, Xem thử): 1 hàng ngang duy nhất, chia đều 33% */}
          <div className="grid grid-cols-3 gap-1.5 mt-2.5 w-full">
            <button
              id={`download-qr-${product.id}`}
              type="button"
              onClick={handleDownload}
              className="h-7.5 flex items-center justify-center gap-1 px-1 rounded-lg text-[10px] font-bold border border-stone-200/90 bg-white hover:bg-stone-50 hover:border-emerald-800 text-stone-700 transition-all shadow-2xs active:scale-[0.98] cursor-pointer whitespace-nowrap"
              title="Tải ảnh QR về máy"
            >
              <Download className="w-3 h-3 text-emerald-800 shrink-0" />
              <span className="whitespace-nowrap">Tải QR</span>
            </button>

            <button
              id={`copy-qr-${product.id}`}
              type="button"
              onClick={handleCopyLink}
              className={`h-7.5 flex items-center justify-center gap-1 px-1 rounded-lg text-[10px] font-bold border transition-all shadow-2xs active:scale-[0.98] cursor-pointer whitespace-nowrap ${
                copied
                  ? 'bg-emerald-900 text-white border-emerald-900'
                  : 'border-stone-200/90 bg-white hover:bg-stone-50 hover:border-emerald-800 text-stone-700'
              }`}
              title="Sao chép đường link tra cứu"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-amber-300 shrink-0 stroke-[2.5]" />
                  <span className="whitespace-nowrap">Đã chép</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3 h-3 text-emerald-800 shrink-0" />
                  <span className="whitespace-nowrap">Chép link</span>
                </>
              )}
            </button>

            <button
              id={`preview-qr-${product.id}`}
              type="button"
              onClick={handleOpenLink}
              className="h-7.5 flex items-center justify-center gap-1 px-1 rounded-lg text-[10px] font-bold border border-stone-200/90 bg-white hover:bg-stone-50 hover:border-emerald-800 text-stone-700 transition-all shadow-2xs active:scale-[0.98] cursor-pointer whitespace-nowrap"
              title="Xem thử công thức trong tab mới"
            >
              <ExternalLink className="w-3 h-3 text-emerald-800 shrink-0" />
              <span className="whitespace-nowrap">Xem thử</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
