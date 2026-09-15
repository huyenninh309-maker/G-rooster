import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Share2, Check, ShieldCheck, Globe, ExternalLink, Edit3, CheckCircle, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { drawChutChiuLogoToCanvas } from './ChutChiuLogo';
import {
  getProductQrUrl,
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
}

export const SmartQRCode: React.FC<SmartQRCodeProps> = ({
  product,
  size = 240,
  showActions = true,
}) => {
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

    // High resolution canvas scale for crisp display
    const scale = 2;
    canvas.width = size * scale;
    canvas.height = size * scale;

    // Generate QR into canvas
    QRCode.toCanvas(
      canvas,
      publicUrl,
      {
        width: size * scale,
        margin: 2,
        errorCorrectionLevel: 'H', // High error correction level (30%) so center logo doesn't obscure readable bits
        color: {
          dark: '#082f1b', // Deep emerald green for the QR modules
          light: '#ffffff',
        },
      },
      (error) => {
        if (error) {
          console.error('QR Code render error:', error);
          return;
        }

        // Draw official Chutchiu Co., Ltd Center Logo Badge (Multi-colored swirl + text)
        const centerX = (size * scale) / 2;
        const centerY = (size * scale) / 2;
        const logoRadius = (size * scale) * 0.165; // ~33% diameter

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

  const hasCustom = isCustomDomainConfigured();

  return (
    <div className="flex flex-col items-center p-3.5 sm:p-4 bg-white rounded-2xl border border-stone-200 shadow-sm max-w-sm w-full">
      <div className="relative p-2 bg-gradient-to-b from-stone-50 to-stone-100 rounded-xl border border-stone-200/80">
        <canvas
          ref={canvasRef}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="rounded-lg shadow-inner block"
        />
      </div>

      <div className="mt-2.5 text-center w-full">
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-900 uppercase tracking-wide">
          <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
          <span>Mã QR Nông Sản Chính Hãng</span>
        </div>
        <p className="text-[11px] text-stone-500 mt-0.5">
          Logo CHUTCHIU CO.,LTD đóng dấu trung tâm
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
                Tự động dùng Origin hiện tại khi mở web.
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
        <div className="flex flex-col gap-1.5 mt-3 w-full">
          <div className="flex items-center gap-1.5 w-full">
            <button
              id={`download-qr-${product.id}`}
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              title="Tải mã QR về máy"
            >
              <Download className="w-3.5 h-3.5 text-emerald-800" />
              Tải ảnh QR
            </button>
            <button
              id={`copy-qr-${product.id}`}
              onClick={handleCopyLink}
              className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              title="Sao chép link tra cứu"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã chép</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Sao chép link</span>
                </>
              )}
            </button>
          </div>
          <button
            type="button"
            onClick={handleOpenLink}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-stone-600 hover:text-emerald-900 hover:bg-stone-50 border border-stone-200 rounded-lg transition-colors"
            title="Mở thử liên kết này trong tab mới để kiểm tra"
          >
            <ExternalLink className="w-3 h-3 text-stone-500" />
            <span>Mở thử trang sản phẩm (Tab mới)</span>
          </button>
        </div>
      )}
    </div>
  );
};

