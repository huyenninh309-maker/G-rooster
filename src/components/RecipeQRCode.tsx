import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Share2, Check, QrCode, ExternalLink } from 'lucide-react';
import { Recipe } from '../types';
import { getRecipeQrUrl } from '../utils/publicUrl';

const OFFICIAL_LOGO_URL = 'https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png';

interface RecipeQRCodeProps {
  recipe: Recipe;
  size?: number;
  showActions?: boolean;
}

export const RecipeQRCode: React.FC<RecipeQRCodeProps> = ({
  recipe,
  size = 140,
  showActions = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrUrl, setQrUrl] = useState(() => getRecipeQrUrl(recipe));

  // Sync when public domain updates or recipe changes
  useEffect(() => {
    const handleUrlChange = () => {
      setQrUrl(getRecipeQrUrl(recipe));
    };

    window.addEventListener('chutchiu_public_url_changed', handleUrlChange);
    return () => window.removeEventListener('chutchiu_public_url_changed', handleUrlChange);
  }, [recipe]);

  useEffect(() => {
    setQrUrl(getRecipeQrUrl(recipe));
  }, [recipe]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed 140px on all devices with 2x Retina scale
    const fixedSize = 140;
    const scale = 2;
    canvas.width = fixedSize * scale;
    canvas.height = fixedSize * scale;

    QRCode.toCanvas(
      canvas,
      qrUrl,
      {
        width: fixedSize * scale,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: {
          dark: '#062d1a',
          light: '#ffffff',
        },
      },
      (error) => {
        if (error) {
          console.error('Recipe QR Code render error:', error);
          return;
        }

        // Draw center authentic logo from https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png
        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        logo.src = OFFICIAL_LOGO_URL;

        const drawLogo = () => {
          const centerX = (fixedSize * scale) / 2;
          const centerY = (fixedSize * scale) / 2;
          const radius = (fixedSize * scale) * 0.16; // ~44.8px on 280x280 canvas

          ctx.save();
          // 1. Crisp white circular background badge
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          // 2. Subtle clean border
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius + 1.5, 0, Math.PI * 2);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#e2e8f0';
          ctx.stroke();

          // 3. Circular clip and draw official Chút Chíu logo
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.clip();

          const boxSize = radius * 2;
          try {
            ctx.drawImage(logo, centerX - boxSize / 2, centerY - boxSize / 2, boxSize, boxSize);
          } catch (e) {
            console.warn('Canvas drawImage notice:', e);
          }
          ctx.restore();
        };

        if (logo.complete && logo.naturalWidth > 0) {
          drawLogo();
        } else {
          logo.onload = () => drawLogo();
        }
      }
    );
  }, [recipe, qrUrl]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `QR-CongThuc-ChutChiu-${recipe.id}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLink = () => {
    window.open(qrUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col items-center p-3 bg-white rounded-2xl border border-stone-200 shadow-sm w-[275px] sm:w-[290px] mx-auto shrink-0">
      {/* Tiêu đề duy nhất: 'MÃ QR PHA CHẾ TẠI QUẦY' */}
      <div className="flex items-center justify-center gap-1 text-[11px] font-black text-emerald-950 uppercase tracking-wide mb-2 font-heading">
        <QrCode className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
        <span>MÃ QR PHA CHẾ TẠI QUẦY</span>
      </div>

      {/* Khung chứa canvas QR: Ép đúng 140px x 140px trên cả 3 giao diện */}
      <div className="relative p-1 bg-white rounded-xl border border-stone-200/80 shadow-2xs flex items-center justify-center w-[142px] h-[142px] shrink-0">
        <canvas
          ref={canvasRef}
          style={{ width: '140px', height: '140px' }}
          className="w-[140px] h-[140px] max-w-[140px] max-h-[140px] rounded-lg block shrink-0"
        />
      </div>

      {/* 3 nút bấm dàn hàng ngang duy nhất (Flex Row), không xếp chồng dọc, cỡ chữ 9px - 10px, khung tự giãn đủ chữ */}
      {showActions && (
        <div className="flex flex-row items-center justify-between gap-1 w-full mt-2.5">
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-0.5 sm:gap-1 px-1.5 py-1 text-[9px] sm:text-[10px] font-semibold text-stone-700 bg-stone-50 hover:bg-stone-100 active:scale-95 border border-stone-200 rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-2xs"
            title="Tải ảnh QR in quầy pha chế"
          >
            <Download className="w-2.5 h-2.5 text-emerald-800 shrink-0" />
            <span className="whitespace-nowrap">Tải in</span>
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 inline-flex items-center justify-center gap-0.5 sm:gap-1 px-1.5 py-1 text-[9px] sm:text-[10px] font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 active:scale-95 border border-emerald-200/80 rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-2xs"
            title="Sao chép liên kết"
          >
            {copied ? (
              <>
                <Check className="w-2.5 h-2.5 text-emerald-700 shrink-0" />
                <span className="whitespace-nowrap">Đã chép</span>
              </>
            ) : (
              <>
                <Share2 className="w-2.5 h-2.5 text-emerald-700 shrink-0" />
                <span className="whitespace-nowrap">Chép link</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleOpenLink}
            className="flex-[1.15] inline-flex items-center justify-center gap-0.5 sm:gap-1 px-1.5 py-1 text-[9px] sm:text-[10px] font-semibold text-stone-600 hover:text-emerald-950 bg-stone-50 hover:bg-stone-100 active:scale-95 border border-stone-200 rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-2xs"
            title="Mở xem công thức trong tab mới"
          >
            <ExternalLink className="w-2.5 h-2.5 text-stone-400 shrink-0" />
            <span className="whitespace-nowrap">Mở tab mới</span>
          </button>
        </div>
      )}
    </div>
  );
};

