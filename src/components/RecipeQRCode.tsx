import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Share2, Check, QrCode, Sparkles, ExternalLink } from 'lucide-react';
import { Recipe } from '../types';
import { drawChutChiuLogoToCanvas } from './ChutChiuLogo';
import { getRecipeQrUrl } from '../utils/publicUrl';

interface RecipeQRCodeProps {
  recipe: Recipe;
  size?: number;
  showActions?: boolean;
}

export const RecipeQRCode: React.FC<RecipeQRCodeProps> = ({
  recipe,
  size = 180,
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

    const scale = 2;
    canvas.width = size * scale;
    canvas.height = size * scale;

    QRCode.toCanvas(
      canvas,
      qrUrl,
      {
        width: size * scale,
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

        // Draw centered official CHUTCHIU CO.,LTD swirl logo badge
        const centerX = (size * scale) / 2;
        const centerY = (size * scale) / 2;
        const logoRadius = (size * scale) * 0.165;

        drawChutChiuLogoToCanvas(ctx, centerX, centerY, logoRadius);
      }
    );
  }, [recipe, size, qrUrl]);

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
    <div className="flex flex-col items-center p-3.5 bg-stone-50 rounded-2xl border border-stone-200 shadow-sm w-full max-w-[280px]">
      <div className="relative p-2 bg-white rounded-xl border border-stone-200 shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="rounded-lg block"
        />
        <div
          className="absolute inset-0 m-auto pointer-events-none rounded-full bg-white flex items-center justify-center shadow-xs border border-gray-200/90 overflow-hidden"
          style={{
            width: `${Math.round(size * 0.32)}px`,
            height: `${Math.round(size * 0.32)}px`,
          }}
        >
          <img
            src="https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png"
            alt="Logo Chút Chíu"
            className="w-full h-full object-contain rounded-full p-0.5"
            onError={(e) => {
              e.currentTarget.src = '/image.png';
            }}
          />
        </div>
      </div>

      <div className="mt-2.5 text-center w-full">
        <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-950 uppercase tracking-wide">
          <QrCode className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Mã QR Barista Quầy Pha Chế</span>
        </div>
        <p className="text-[10px] text-stone-500 mt-0.5">
          Logo CHUTCHIU CO.,LTD đóng dấu trung tâm
        </p>
        <div className="mt-1.5 px-2 py-1 bg-white rounded-lg border border-stone-200 text-[9.5px] font-mono text-stone-700 truncate w-full select-all text-left">
          <span className="text-stone-400">Link: </span>
          {qrUrl}
        </div>
      </div>

      {showActions && (
        <div className="flex flex-col gap-1.5 mt-3 w-full">
          <div className="flex items-center gap-1.5 w-full">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors"
              title="Tải ảnh QR in quầy pha chế"
            >
              <Download className="w-3 h-3 text-emerald-800" />
              Tải in quầy
            </button>
            <button
              onClick={handleCopyLink}
              className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-900 bg-emerald-100/70 hover:bg-emerald-200/70 rounded-lg transition-colors"
              title="Sao chép liên kết"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-700" />
                  <span>Đã chép</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3 h-3 text-emerald-700" />
                  <span>Chép link</span>
                </>
              )}
            </button>
          </div>
          <button
            type="button"
            onClick={handleOpenLink}
            className="w-full inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[10.5px] font-bold text-stone-700 hover:text-emerald-900 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors"
            title="Mở thử trang công thức này trong tab mới"
          >
            <ExternalLink className="w-3 h-3 text-stone-500" />
            <span>Mở xem công thức (Tab mới)</span>
          </button>
        </div>
      )}
    </div>
  );
};

