import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Share2, Check, ShieldCheck, Globe, ExternalLink, Edit3, CheckCircle, RotateCcw, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { drawChutChiuLogoToCanvas, OFFICIAL_LOGO_URL, LOCAL_LOGO_FALLBACK } from './ChutChiuLogo';
import {
  getProductQrUrl,
  getProductTargetRecipe,
  getPublicBaseUrl,
  setPublicBaseUrl,
  resetToCurrentOrigin,
  isCustomDomainConfigured,
  isRunningInDevSandbox,
} from '../utils/publicUrl';

interface SmartQRCodeProps {
  product: Product;
  size?: number;
  showActions?: boolean;
  compact?: boolean;
}

export const SmartQRCode: React.FC<SmartQRCodeProps> = ({
  product,
  size: userSize,
  showActions = true,
  compact = false,
}) => {
  const size = userSize ?? (compact ? 76 : 240);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [publicUrl, setPublicUrl] = useState(() => getProductQrUrl(product));
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [customDomainInput, setCustomDomainInput] = useState(() => getPublicBaseUrl());
  const [isSavedDomain, setIsSavedDomain] = useState(false);

  // Sync public URL when domain changes
  useEffect(() => {
    const handleUrlChange = () => {
      setPublicUrl(getProductQrUrl(product));
      setCustomDomainInput(getPublicBaseUrl());
    };

    window.addEventListener('chutchiu_public_url_changed', handleUrlChange);
    return () => window.removeEventListener('chutchiu_public_url_changed', handleUrlChange);
  }, [product]);

  useEffect(() => {
    setPublicUrl(getProductQrUrl(product));
  }, [product]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution canvas scale (3x) for ultra-crisp display on all devices
    const scale = 3;
    canvas.width = size * scale;
    canvas.height = size * scale;

    // Generate QR into canvas
    QRCode.toCanvas(
      canvas,
      publicUrl,
      {
        width: size * scale,
        margin: 1.5,
        errorCorrectionLevel: 'H', // High error correction (30%) allows clear center logo
        color: {
          dark: '#052e16', // Deep luxury emerald green
          light: '#ffffff',
        },
      },
      (error) => {
        if (error) {
          console.error('QR Code render error:', error);
          return;
        }

        // Draw official Chutchiu Co., Ltd Center Logo Badge
        const centerX = (size * scale) / 2;
        const centerY = (size * scale) / 2;
        const logoRadius = (size * scale) * 0.17; // ~34% diameter

        drawChutChiuLogoToCanvas(ctx, centerX, centerY, logoRadius);
      }
    );
  }, [product, size, publicUrl]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `QR-ChutChiu-${product.id}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLink = () => {
    window.open(publicUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSaveCustomDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (customDomainInput.trim()) {
      setPublicBaseUrl(customDomainInput.trim());
      setIsSavedDomain(true);
      setTimeout(() => setIsSavedDomain(false), 2500);
      setIsEditingUrl(false);
    }
  };

  const handleResetToOrigin = () => {
    resetToCurrentOrigin();
    setCustomDomainInput(window.location.origin);
    setIsEditingUrl(false);
  };

  const targetRecipe = getProductTargetRecipe(product);
  const hasCustom = isCustomDomainConfigured();

  // COMPACT LAYOUT: Exactly 3 sections in a card: Header, Middle (Split QR & Text), Footer (3 equal buttons)
  if (compact) {
    const centerLogoSize = Math.round(size * 0.32);

    return (
      <div className="w-full bg-white rounded-[12px] border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-3 sm:p-3.5 flex flex-col gap-2.5">
        {/* PHẦN ĐẦU: Tiêu đề 'MÃ QR CÔNG THỨC' (màu vàng gold) và Tên món (Matcha Thượng Hạng Dirty Latte...) nằm thoáng đãng, KHÔNG ĐƯỢC CHE CHỮ */}
        <div className="w-full flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#b48c2c] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span>MÃ QR CÔNG THỨC</span>
            <span className="inline-block px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[9px] font-semibold border border-amber-200/60 ml-auto">
              Chuẩn Barista
            </span>
          </div>

          {/* Tên món: Hiện đầy đủ, không cắt cụt (...), phông chữ đậm sang trọng */}
          <div
            onClick={handleOpenLink}
            className="text-xs sm:text-[13px] font-bold text-stone-900 leading-snug cursor-pointer hover:text-emerald-800 transition-colors break-words mt-0.5"
            title={targetRecipe.title}
          >
            {targetRecipe.title}
          </div>
        </div>

        {/* PHẦN GIỮA: Chia đôi. Bên trái là Mã QR kích thước vừa phải. Bên phải là dòng chữ hướng dẫn 'Quét camera để xem định lượng...' hiển thị đầy đủ, dễ đọc */}
        <div className="flex items-center gap-3 w-full py-0.5">
          {/* Bên trái: Mã QR với logo Chút Chíu tròn, sắc nét, không bị bóp méo, nằm chính giữa trung tâm */}
          <div
            onClick={handleOpenLink}
            className="relative p-1 bg-white rounded-[8px] border border-gray-100 shadow-2xs shrink-0 flex items-center justify-center cursor-pointer hover:border-emerald-600 transition-colors"
            title="Nhấn để xem công thức pha chế chi tiết"
          >
            <canvas
              ref={canvasRef}
              style={{ width: `${size}px`, height: `${size}px` }}
              className="rounded-[4px] block"
            />
          </div>

          {/* Bên phải: Dòng chữ hướng dẫn 'Quét camera để xem định lượng...' hiển thị đầy đủ, dễ đọc */}
          <div className="flex-1 min-w-0 flex flex-col justify-center text-stone-600">
            <p className="text-[11px] sm:text-xs leading-relaxed break-words font-medium">
              Quét camera để xem định lượng gram/ml chuẩn &amp; hướng dẫn pha chế chi tiết.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-semibold mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              <span>Dễ làm • Tối ưu cost quán cafe</span>
            </div>
          </div>
        </div>

        {/* PHẦN CUỐI: 3 nút bấm (Tải QR, Chép link, Xem thử) trên DUY NHẤT 1 HÀNG NGANG. Chia đều kích thước 33% cho mỗi nút. Viền nút mỏng, bo góc tròn 8px. */}
        {showActions && (
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-2 border-t border-gray-100 w-full">
            <button
              id={`download-qr-compact-${product.id}`}
              type="button"
              onClick={handleDownload}
              className="w-full py-1.5 sm:py-2 px-1 rounded-[8px] border border-gray-200 hover:border-emerald-800/40 bg-white hover:bg-stone-50 text-stone-800 hover:text-emerald-900 font-semibold text-[11px] sm:text-xs transition-all duration-150 shadow-2xs active:scale-[0.98] flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap min-h-[34px] sm:min-h-[36px]"
              title="Tải ảnh mã QR về máy"
            >
              <Download className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
              <span>Tải QR</span>
            </button>

            <button
              id={`copy-qr-compact-${product.id}`}
              type="button"
              onClick={handleCopyLink}
              className={`w-full py-1.5 sm:py-2 px-1 rounded-[8px] border transition-all duration-150 shadow-2xs active:scale-[0.98] flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap min-h-[34px] sm:min-h-[36px] text-[11px] sm:text-xs font-semibold ${
                copied
                  ? 'bg-emerald-900 text-white border-emerald-900'
                  : 'border-gray-200 hover:border-emerald-800/40 bg-white hover:bg-stone-50 text-stone-800 hover:text-emerald-900'
              }`}
              title="Sao chép đường dẫn công thức"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-amber-300 shrink-0 stroke-[2.5]" />
                  <span>Đã chép</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <span>Chép link</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleOpenLink}
              className="w-full py-1.5 sm:py-2 px-1 rounded-[8px] border border-gray-200 hover:border-emerald-800/40 bg-white hover:bg-stone-50 text-stone-800 hover:text-emerald-900 font-semibold text-[11px] sm:text-xs transition-all duration-150 shadow-2xs active:scale-[0.98] flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap min-h-[34px] sm:min-h-[36px]"
              title="Xem thử công thức trong tab mới"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
              <span>Xem thử</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-3.5 sm:p-4 bg-white rounded-2xl border border-stone-200 shadow-sm max-w-sm w-full">
      <div className="relative p-2 bg-white rounded-xl border border-stone-200 shadow-xs flex items-center justify-center">
        <canvas
          ref={canvasRef}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="rounded-lg block"
        />
      </div>

      <div className="mt-2.5 text-center w-full">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-950 uppercase tracking-wide">
          <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
          <span>Mã QR Công Thức Pha Chế</span>
        </div>
        <div className="mt-1 px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-200/80 rounded-md text-[11px] font-bold line-clamp-1 text-center">
          {targetRecipe.title}
        </div>
        <p className="text-[10px] text-stone-500 mt-1">
          Quét camera để xem định lượng gram/ml chuẩn quầy Barista
        </p>

        {/* Link destination display & quick edit */}
        <div className="mt-2 px-2.5 py-1.5 bg-stone-50 rounded-lg border border-stone-200/80 text-[10px] text-stone-600 flex items-center justify-between gap-1.5 text-left">
          <div className="truncate flex-1">
            <span className="text-stone-400 font-mono">Link: </span>
            <span className="font-mono text-emerald-900 font-semibold truncate select-all">
              {publicUrl}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsEditingUrl(!isEditingUrl)}
            className="text-stone-500 hover:text-emerald-800 p-1 shrink-0"
            title="Tùy chỉnh tên miền website cho mã QR"
          >
            <Edit3 className="w-3 h-3" />
          </button>
        </div>

        {/* Custom domain form if user wants to pre-set Vercel / Netlify URL */}
        {isEditingUrl && (
          <form onSubmit={handleSaveCustomDomain} className="mt-2 p-2.5 bg-amber-50/90 rounded-xl border border-amber-200 text-left">
            <label className="block text-[10px] font-bold text-amber-950 mb-1">
              Địa chỉ website công khai (Vercel / Netlify / Tên miền riêng):
            </label>
            <div className="flex gap-1">
              <input
                type="text"
                value={customDomainInput}
                onChange={(e) => setCustomDomainInput(e.target.value)}
                placeholder="https://chutchiu.vercel.app"
                className="flex-1 px-2 py-1 text-[11px] bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-700 font-mono"
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-emerald-900 text-white rounded-md text-[10px] font-bold hover:bg-emerald-950 shrink-0"
              >
                Lưu
              </button>
            </div>
            <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-amber-200/70">
              <span className="text-[9.5px] text-stone-500">
                Mặc định tự động nhận diện domain trình duyệt.
              </span>
              {hasCustom && (
                <button
                  type="button"
                  onClick={handleResetToOrigin}
                  className="text-[9.5px] text-amber-900 hover:text-amber-950 font-bold flex items-center gap-1"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  Đặt lại Origin gốc
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {showActions && (
        <div className="grid grid-cols-3 gap-2 mt-3 w-full">
          <button
            id={`download-qr-${product.id}`}
            type="button"
            onClick={handleDownload}
            className="w-full py-2 px-1 rounded-[8px] border border-stone-200 hover:border-emerald-800/40 bg-white hover:bg-stone-50 text-stone-800 hover:text-emerald-900 font-semibold text-xs transition-all shadow-2xs active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[38px]"
            title="Tải mã QR về máy"
          >
            <Download className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
            <span>Tải QR</span>
          </button>
          <button
            id={`copy-qr-${product.id}`}
            type="button"
            onClick={handleCopyLink}
            className={`w-full py-2 px-1 rounded-[8px] border transition-all shadow-2xs active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[38px] text-xs font-semibold ${
              copied
                ? 'bg-emerald-900 text-white border-emerald-900'
                : 'border-stone-200 hover:border-emerald-800/40 bg-white hover:bg-stone-50 text-stone-800 hover:text-emerald-900'
            }`}
            title="Sao chép link tra cứu"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-300 shrink-0 stroke-[2.5]" />
                <span>Đã chép</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Chép link</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleOpenLink}
            className="w-full py-2 px-1 rounded-[8px] border border-stone-200 hover:border-emerald-800/40 bg-white hover:bg-stone-50 text-stone-800 hover:text-emerald-900 font-semibold text-xs transition-all shadow-2xs active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[38px]"
            title="Mở thử công thức pha chế trong tab mới để kiểm tra"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>Xem thử</span>
          </button>
        </div>
      )}
    </div>
  );
};

