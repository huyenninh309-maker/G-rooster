import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  FileText,
  Download,
  Printer,
  X,
  CheckCircle2,
  Filter,
  Loader2,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { AdminProductFinancialItem } from '../utils/productStore';
import {
  COMPANY_INFO,
  formatThousandNumber,
  extractQuotationData,
  paginateQuotationRows,
  generatePdfFromPageElements,
} from '../utils/quotationPdfExport';
import { Language } from '../utils/i18n';
import { getTranslatedProductName } from '../utils/productTranslation';
import { SPECIFIC_PRODUCT_PACKAGING } from '../data/productTranslationsEn';

interface QuotationPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  allProducts: AdminProductFinancialItem[];
  filteredProducts: AdminProductFinancialItem[];
  unsavedEdits: Record<
    string,
    {
      retail?: number;
      wholesale1?: number;
      wholesale2?: number;
      wholesale3?: number;
    }
  >;
  currentPartnerFilter: string;
  language?: Language;
}

/**
 * V250: Helper dịch quy cách đóng gói sang tiếng Anh chuẩn thương mại
 */
function translatePackagingText(rowId: string, unitStr: string, isEn: boolean): string {
  if (!isEn) return unitStr;
  if (SPECIFIC_PRODUCT_PACKAGING[rowId]) {
    return SPECIFIC_PRODUCT_PACKAGING[rowId];
  }
  return unitStr
    .replace(/Hộp/gi, 'Box')
    .replace(/Thùng/gi, 'Carton')
    .replace(/Túi/gi, 'Bag')
    .replace(/Chai/gi, 'Bottle')
    .replace(/Lon/gi, 'Can')
    .replace(/Hũ/gi, 'Jar')
    .replace(/Gói/gi, 'Pack')
    .replace(/Cây/gi, 'Roll')
    .replace(/Viên/gi, 'Piece')
    .replace(/Kg/gi, 'kg');
}

export const QuotationPdfModal: React.FC<QuotationPdfModalProps> = ({
  isOpen,
  onClose,
  allProducts,
  filteredProducts,
  unsavedEdits,
  currentPartnerFilter,
  language = 'VN',
}) => {
  // V250 Requirement 4: Đồng bộ đa ngôn ngữ [VN | EN]
  const [modalLang, setModalLang] = useState<Language>(language);
  const isEn = modalLang === 'EN';

  useEffect(() => {
    if (language) {
      setModalLang(language);
    }
  }, [language]);

  // V218 & V250 Requirement 2: Logic Filter & Phạm vi xuất
  const [exportScope, setExportScope] = useState<'filtered' | 'all'>('filtered');
  const [recipientName, setRecipientName] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<{ current: number; total: number } | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);

  const pagesContainerRef = useRef<HTMLDivElement>(null);

  const now = useMemo(() => new Date(), [isOpen]);
  const formattedDate = useMemo(() => {
    return now.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }, [now]);

  const formattedDateEn = useMemo(() => {
    return now.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  }, [now]);

  const formattedDateTime = useMemo(() => {
    return now.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }, [now]);

  const formattedDateTimeEn = useMemo(() => {
    return now.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }, [now]);

  const quotationCode = useMemo(() => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `BG-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
  }, [now]);

  // Target products based on scope (Mặc định: 'filtered' là danh sách đang hiển thị trên Admin)
  const targetProducts = useMemo(() => {
    const source = exportScope === 'filtered' ? filteredProducts : allProducts;
    return extractQuotationData(source, unsavedEdits);
  }, [exportScope, allProducts, filteredProducts, unsavedEdits]);

  // Paginated chunks (15 on page 1, 20 on subsequent pages)
  const paginatedPages = useMemo(() => {
    return paginateQuotationRows(targetProducts, 15, 20);
  }, [targetProducts]);

  // V250 Requirement 2: LOGIC GHI CHÚ QUY CÁCH SỈ ĐỘNG
  // - Nếu đang lọc "Matcha & Trà": Chỉ hiện quy cách sỉ theo KG.
  // - Nếu đang lọc "Nông sản/Đặc sản": Chỉ hiện quy cách sỉ theo THÙNG.
  // - Nếu để "Tất cả (133 SP)": Hiển thị phân loại rõ rệt cho từng nhóm.
  const dynamicWholesaleNotes = useMemo(() => {
    const isMatchaFilter =
      currentPartnerFilter === 'matcha-tra-laka' ||
      (exportScope === 'filtered' &&
        targetProducts.length > 0 &&
        targetProducts.every(
          (p) =>
            p.category?.toLowerCase().includes('matcha') ||
            p.name?.toLowerCase().includes('matcha') ||
            p.name?.toLowerCase().includes('trà')
        ));

    const isNongSanDacSanFilter =
      exportScope === 'filtered' &&
      !isMatchaFilter &&
      (currentPartnerFilter === 'dac-san-snack' ||
        currentPartnerFilter === 'nuoc-mia-iqf' ||
        currentPartnerFilter === 'thao-duoc-sam' ||
        currentPartnerFilter === 'ca-phe-vien-say' ||
        currentPartnerFilter === 'socola-qua-tang' ||
        targetProducts.every((p) => p.wholesaleUnit === 'THÙNG' || p.unitsPerWholesale > 1));

    if (isMatchaFilter) {
      return {
        title: isEn ? '* WHOLESALE MOQ SPECIFICATIONS:' : '* Ghi chú quy cách mua sỉ:',
        items: [
          isEn
            ? '• Matcha & Tea: Wholesale by KG (Tier 1: 10-30kg, Tier 2: 30-100kg, Tier 3: >100kg).'
            : '• Matcha & Trà: Sỉ theo KG (Cấp 1: 10-30kg, Cấp 2: 30-100kg, Cấp 3: >100kg).',
        ],
        term5: isEn
          ? '5. Wholesale MOQ: Matcha & Tea wholesale strictly by KG (Tier 1: 10-30kg, Tier 2: 30-100kg, Tier 3: >100kg).'
          : '5. Quy cách sỉ: Matcha & Trà sỉ theo KG (Cấp 1: 10-30kg, Cấp 2: 30-100kg, Cấp 3: >100kg).',
      };
    }

    if (isNongSanDacSanFilter) {
      return {
        title: isEn ? '* WHOLESALE MOQ SPECIFICATIONS:' : '* Ghi chú quy cách mua sỉ:',
        items: [
          isEn
            ? '• Agri-Products & Specialties: Wholesale by CARTON (Tier 1: 10-30 cartons, Tier 2: 30-100 cartons, Tier 3: >100 cartons).'
            : '• Nông sản & Đặc sản: Sỉ theo THÙNG (Cấp 1: 10-30 thùng, Cấp 2: 30-100 thùng, Cấp 3: >100 thùng).',
        ],
        term5: isEn
          ? '5. Wholesale MOQ: Agri-Products, Snacks & Specialties wholesale by CARTON (Tier 1: 10-30 cartons, Tier 2: 30-100 cartons, Tier 3: >100 cartons).'
          : '5. Quy cách sỉ: Nông sản & Đặc sản sỉ theo THÙNG (Cấp 1: 10-30 thùng, Cấp 2: 30-100 thùng, Cấp 3: >100 thùng).',
      };
    }

    // Default: "Tất cả (133 SP)" - Hiển thị phân loại rõ rệt cho từng nhóm ngành hàng
    return {
      title: isEn ? '* WHOLESALE MOQ SPECIFICATIONS:' : '* Ghi chú quy cách mua sỉ:',
      items: [
        isEn
          ? '• Matcha: Wholesale by KG (Tier 1: 10-30kg, Tier 2: 30-100kg, Tier 3: >100kg).'
          : '• Matcha: Sỉ theo KG (Cấp 1: 10-30kg, Cấp 2: 30-100kg, Cấp 3: >100kg).',
        isEn
          ? '• Cascara & Celastrus Teas: Wholesale by CARTON (Tier 1: 10-30 cartons, Tier 2: 30-100 cartons, Tier 3: >100 cartons).'
          : '• Trà Cascara & Xạ Đen: Sỉ theo THÙNG (Cấp 1: 10-30 thùng, Cấp 2: 30-100 thùng, Cấp 3: >100 thùng).',
        isEn
          ? '• Agri-Products, Coffee & Specialties: Wholesale by CARTON (Tier 1: 10-30 cartons, Tier 2: 30-100 cartons, Tier 3: >100 cartons).'
          : '• Nông sản, Cà phê & Đặc sản: Sỉ theo THÙNG (Cấp 1: 10-30 thùng, Cấp 2: 30-100 thùng, Cấp 3: >100 thùng).',
      ],
      term5: isEn
        ? '5. Wholesale MOQ: Matcha wholesale by KG (Tier 1: 10-30kg, Tier 2: 30-100kg, Tier 3: >100kg); Cascara, Teas, Agri-Products & Specialties wholesale by CARTON (Tier 1: 10-30 cartons, Tier 2: 30-100 cartons, Tier 3: >100 cartons).'
        : '5. Quy cách sỉ: Matcha sỉ theo KG (Cấp 1: 10-30kg, Cấp 2: 30-100kg, Cấp 3: >100kg); Trà Cascara & Xạ Đen, Nông sản & Đặc sản sỉ theo THÙNG (Cấp 1: 10-30 thùng, Cấp 2: 30-100 thùng, Cấp 3: >100 thùng).',
    };
  }, [currentPartnerFilter, exportScope, targetProducts, isEn]);

  if (!isOpen) return null;

  // Handle direct PDF export
  const handleDownloadPdf = async () => {
    if (!pagesContainerRef.current) return;
    try {
      setIsExporting(true);
      setExportSuccess(false);

      const pageElements = Array.from(
        pagesContainerRef.current.querySelectorAll<HTMLElement>('.quotation-a4-page')
      ) as HTMLElement[];

      if (pageElements.length === 0) {
        alert(isEn ? 'No quotation page data found to export.' : 'Không tìm thấy dữ liệu trang báo giá để xuất.');
        return;
      }

      const dateSlug = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const filename = isEn ? `Quotation-G-ROOSTER-${dateSlug}.pdf` : `Bao-Gia-G-ROOSTER-${dateSlug}.pdf`;

      await generatePdfFromPageElements(pageElements, filename, (current, total) => {
        setExportProgress({ current, total });
      });

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 5000);
    } catch (err: unknown) {
      console.error('Lỗi khi xuất PDF Báo Giá:', err);
      const errMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert(isEn ? `Failed to export PDF: ${errMsg}` : `Không thể xuất file PDF: ${errMsg}`);
    } finally {
      setIsExporting(false);
      setExportProgress(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[96vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* =========================================================================
            MODAL HEADER: Controls, Scope Selector, Language Toggle, Export Button
           ========================================================================= */}
        <div className="px-5 py-4 bg-stone-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <FileText className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-heading font-bold text-white tracking-wide">
                  {isEn ? 'G-ROOSTER OFFICIAL B2B QUOTATION PDF' : 'XUẤT BÁO GIÁ PDF CHUẨN MẪU G-ROOSTER'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-mono font-black uppercase">
                  V250
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {isEn
                  ? 'G-ROOSTER CO.,LTD · TAX ID: 0319153593 · Official Catalog & Tiered Dealer Profit Structure'
                  : 'G-ROOSTER CO.,LTD · MST: 0319153593 · Cấu trúc bảng chuẩn mẫu kèm quyền lợi (+) Profit'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* V250 Language Switcher right in header */}
            <div className="flex items-center rounded-lg bg-stone-800 border border-stone-700 p-0.5 text-xs font-mono mr-1">
              <button
                type="button"
                onClick={() => setModalLang('VN')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  !isEn
                    ? 'bg-[#D4AF37] text-stone-950 shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Xuất file PDF bằng Tiếng Việt"
              >
                VN
              </button>
              <button
                type="button"
                onClick={() => setModalLang('EN')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  isEn
                    ? 'bg-[#D4AF37] text-stone-950 shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Export PDF quotation in Pure English"
              >
                EN
              </button>
            </div>

            <button
              type="button"
              disabled={isExporting}
              onClick={handleDownloadPdf}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-900/30 transition-all cursor-pointer disabled:opacity-50"
              title={isEn ? 'Export and download official PDF quotation' : 'Xuất và tải file PDF báo giá chính thức'}
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>
                    {exportProgress
                      ? isEn
                        ? `Exporting page ${exportProgress.current}/${exportProgress.total}...`
                        : `Đang xuất trang ${exportProgress.current}/${exportProgress.total}...`
                      : isEn
                      ? 'Generating PDF...'
                      : 'Đang tạo PDF...'}
                  </span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{isEn ? 'DOWNLOAD PDF QUOTE' : 'TẢI FILE BÁO GIÁ PDF'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isExporting}
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-stone-700"
              title={isEn ? 'Print directly from browser' : 'In trực tiếp từ trình duyệt'}
            >
              <Printer className="w-4 h-4 text-stone-300" />
              <span className="hidden sm:inline">{isEn ? 'Print' : 'In Báo Giá'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer ml-1"
              aria-label={isEn ? 'Close window' : 'Đóng cửa sổ'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            CONFIG BAR: Scope (Filtered vs All), Recipient, Language Indicator
           ========================================================================= */}
        <div className="px-5 py-3 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Scope Selector: Filtered (default) vs All */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-stone-700 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-stone-500" />
                {isEn ? 'Export Scope:' : 'Phạm vi xuất:'}
              </span>
              <div className="inline-flex rounded-lg border border-stone-300 bg-white p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setExportScope('filtered')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    exportScope === 'filtered'
                      ? 'bg-[#143A24] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title={isEn ? 'Export products matching screen filter' : 'Chỉ xuất các sản phẩm đang được lọc trên màn hình Admin'}
                >
                  {isEn
                    ? `Screen Filtered (${filteredProducts.length} items)`
                    : `Theo bộ lọc màn hình (${filteredProducts.length} SP)`}
                </button>
                <button
                  type="button"
                  onClick={() => setExportScope('all')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    exportScope === 'all'
                      ? 'bg-[#143A24] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title={isEn ? 'Export all 133 products in catalog' : 'Xuất toàn bộ 133 sản phẩm trong danh mục'}
                >
                  {isEn ? `All (${allProducts.length} items)` : `Tất cả (${allProducts.length} SP)`}
                </button>
              </div>
            </div>

            {/* Recipient */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-stone-700">{isEn ? 'Attention / To:' : 'Kính gửi:'}</span>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder={isEn ? 'Partner / Company name...' : 'Tên đối tác / Doanh nghiệp...'}
                className="px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#143A24] w-48 sm:w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono">
            <span>
              {isEn ? 'Quote No:' : 'Mã:'} <strong className="text-stone-700">{quotationCode}</strong>
            </span>
            <span>·</span>
            <span>
              {isEn ? 'Total:' : 'Tổng:'}{' '}
              <strong className="text-stone-700">{paginatedPages.length} {isEn ? 'A4 pages' : 'trang A4'}</strong>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <Globe className="w-3 h-3 text-emerald-600" />
              {isEn ? 'PDF Mode: Pure English' : 'Chế độ: Tiếng Việt'}
            </span>
          </div>
        </div>

        {/* Success Alert Banner */}
        {exportSuccess && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2 flex items-center justify-between text-xs text-emerald-800 animate-in slide-in-from-top-2 duration-200 shrink-0">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isEn
                  ? 'Official PDF Quotation exported and downloaded successfully! Please check your Downloads folder.'
                  : 'Đã xuất và tải xuống file Báo Giá PDF thành công! Vui lòng kiểm tra thư mục Downloads trên thiết bị.'}
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            DOCUMENT PREVIEW SCROLL AREA: Crisp, Paginated A4 Sheets (100% Inline Hex Styles)
           ========================================================================= */}
        <div className="flex-1 overflow-y-auto bg-stone-200/80 p-3 sm:p-6 flex flex-col items-center gap-6">
          <div ref={pagesContainerRef} className="flex flex-col items-center gap-6 w-full max-w-[800px]">
            {paginatedPages.map((pageRows, pageIdx) => {
              const isFirstPage = pageIdx === 0;
              const isLastPage = pageIdx === paginatedPages.length - 1;
              const pageNumber = pageIdx + 1;
              const totalPages = paginatedPages.length;

              return (
                <div
                  key={pageIdx}
                  className="quotation-a4-page shadow-xl"
                  style={{
                    width: '100%',
                    maxWidth: '794px',
                    minHeight: '1123px',
                    backgroundColor: '#FFFFFF',
                    color: '#0F172A',
                    boxSizing: 'border-box',
                    padding: '28px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid #CBD5E1',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  }}
                >
                  {/* TOP SECTION */}
                  <div>
                    {/* PAGE 1: FULL CORPORATE HEADER WITH MAGNIFIED LOGO (100px), MST, HOTLINE, WEBSITE, EMAIL */}
                    {isFirstPage ? (
                      <div style={{ paddingBottom: '14px', marginBottom: '14px', borderBottom: '2px solid #143A24' }}>
                        {/* Row 1: Company Logo + Full Business Info */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', paddingBottom: '10px' }}>
                          {/* Left: V250 Phóng đại Logo G-ROOSTER lên height khoảng 100px nổi bật, cân đối */}
                          <div
                            style={{
                              backgroundColor: '#FFFFFF',
                              width: '190px',
                              height: '100px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              padding: '2px',
                              borderRadius: '8px',
                              flexShrink: 0,
                              boxShadow: 'none',
                              border: 'none',
                            }}
                          >
                            <img
                              src="https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png"
                              alt="G-ROOSTER CO.,LTD"
                              style={{
                                height: '100px',
                                maxHeight: '100px',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                backgroundColor: 'transparent',
                                display: 'block',
                              }}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = '/logo-g-rooster-v5-3d.png';
                              }}
                            />
                          </div>

                          {/* Right: Company Legal Information - V250 Thông tin liên hệ chuẩn */}
                          <div style={{ textAlign: 'right', color: '#1E293B', fontSize: '11px', lineHeight: 1.38 }}>
                            <div style={{ fontSize: '16.5px', fontWeight: 900, color: '#143A24', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                              {isEn ? COMPANY_INFO.companyNameEn : COMPANY_INFO.companyName}
                            </div>
                            <div style={{ fontSize: '10.5px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '3px' }}>
                              {isEn ? COMPANY_INFO.companyName : COMPANY_INFO.companyNameEn}
                            </div>
                            <div>
                              <strong>{isEn ? 'Tax ID (MST):' : 'Mã số thuế (MST):'}</strong>{' '}
                              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0F172A' }}>{COMPANY_INFO.taxCode}</span>
                            </div>
                            <div>
                              <strong>{isEn ? 'Hotline & WhatsApp:' : 'Hotline & Zalo:'}</strong>{' '}
                              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#143A24' }}>
                                {COMPANY_INFO.hotlines.join(' · ')}
                              </span>
                            </div>
                            <div style={{ color: '#475569' }}>
                              {isEn ? COMPANY_INFO.addressEn : COMPANY_INFO.address}
                            </div>
                            <div style={{ color: '#475569', marginTop: '1px' }}>
                              Website: <strong style={{ color: '#143A24' }}>https://g-rooster.com/</strong> · Email: <strong style={{ color: '#143A24' }}>groostercompany@gmail.com</strong>
                            </div>
                          </div>
                        </div>

                        {/* Gold accent line */}
                        <div style={{ height: '2px', width: '100%', background: 'linear-gradient(to right, #D4AF37, #143A24, #D4AF37)', margin: '6px 0 10px 0' }} />

                        {/* Document Title Banner */}
                        <div style={{ textAlign: 'center', paddingTop: '4px', paddingBottom: '4px' }}>
                          <h2 style={{ fontSize: '19px', fontWeight: 900, color: '#143A24', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
                            {isEn ? 'OFFICIAL B2B PRICE QUOTATION & PREMIUM CATALOG' : 'BẢNG BÁO GIÁ SẢN PHẨM & NÔNG SẢN CAO CẤP'}
                          </h2>
                          <div style={{ fontSize: '10.5px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '3px' }}>
                            {isEn
                              ? 'Applicable for B2B Partners, F&B Chains, Distributors & Wholesalers Worldwide'
                              : 'Áp dụng cho Đối tác B2B, Chuỗi F&B, Đại lý & Khách sỉ toàn quốc'}
                          </div>
                        </div>

                        {/* Quotation Meta Row */}
                        <div style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                          <div>
                            <span style={{ color: '#64748B' }}>{isEn ? 'Attention / To:' : 'Kính gửi:'}</span>{' '}
                            <strong style={{ color: '#0F172A', textTransform: 'uppercase', fontWeight: 700 }}>
                              {recipientName || (isEn ? 'Valued Partner / Distributor / Client' : 'Quý Đối Tác / Đại Lý / Khách Hàng')}
                            </strong>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'monospace', color: '#475569' }}>
                            <span>
                              {isEn ? 'Issued Date:' : 'Ngày lập:'}{' '}
                              <strong style={{ color: '#0F172A' }}>{isEn ? formattedDateEn : formattedDate}</strong>
                            </span>
                            <span>·</span>
                            <span>
                              {isEn ? 'Quote No:' : 'Mã BG:'}{' '}
                              <strong style={{ color: '#143A24' }}>{quotationCode}</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* SUBSEQUENT PAGES: COMPACT MINI HEADER */
                      <div style={{ paddingBottom: '8px', marginBottom: '12px', borderBottom: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 900, color: '#143A24', textTransform: 'uppercase' }}>
                            G-ROOSTER CO.,LTD
                          </span>
                          <span style={{ color: '#94A3B8' }}>·</span>
                          <span style={{ color: '#475569' }}>
                            {isEn ? `OFFICIAL B2B PRODUCT QUOTATION (No: ${quotationCode})` : `BẢNG BÁO GIÁ SẢN PHẨM (Mã: ${quotationCode})`}
                          </span>
                        </div>
                        <div style={{ fontFamily: 'monospace', color: '#64748B', fontSize: '10px' }}>
                          Hotline: {COMPANY_INFO.hotlines[0]} · {isEn ? 'Tax ID' : 'MST'}: {COMPANY_INFO.taxCode}
                        </div>
                      </div>
                    )}

                    {/* =========================================================================
                        TABLE: CHUẨN MẪU G-ROOSTER (6 CỘT CHÍNH XÁC Y HỆT HÌNH 2 & HÌNH 3 - V251)
                        - Cột 1: STT / NO.
                        - Cột 2: SẢN PHẨM & QUY CÁCH (V251 tinh gọn, white-space: nowrap)
                        - Cột 3: GIÁ BÁN LẺ (V251 tinh gọn, white-space: nowrap, màu xanh lá)
                        - Cột 4, 5, 6: SỈ CẤP 1, CẤP 2, CẤP 3 (white-space: nowrap)
                          + Đơn giá sỉ màu đỏ
                          + Dòng lời: "(+) [Số tiền] ([%])" - MÀU XANH LÁ, NORMAL WEIGHT (font-weight: 500/400)
                          + Dòng màu xám quy đổi thùng: font-size 8.5px, padding-bottom 2px
                          + Align top toàn bộ nội dung trong hàng
                       ========================================================================= */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', border: '1px solid #CBD5E1' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#143A24', color: '#FFFFFF' }}>
                          <th style={{ width: '4.5%', padding: '7px 4px', textAlign: 'center', fontWeight: 700, border: '1px solid #0D2718', fontSize: '10.5px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                            {isEn ? 'NO.' : 'STT'}
                          </th>
                          <th style={{ width: '35.5%', padding: '7px 10px', textAlign: 'left', fontWeight: 700, border: '1px solid #0D2718', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                            {isEn ? 'PRODUCTS & PACKAGING' : 'SẢN PHẨM & QUY CÁCH'}
                          </th>
                          <th style={{ width: '15%', padding: '7px 8px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#86EFAC', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                            {isEn ? 'RETAIL PRICE' : 'GIÁ BÁN LẺ'}
                          </th>
                          <th style={{ width: '15%', padding: '7px 8px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#FECACA', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                            {isEn ? 'TIER 1 WHOLESALE' : 'SỈ CẤP 1'}
                          </th>
                          <th style={{ width: '15%', padding: '7px 8px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#FECACA', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                            {isEn ? 'TIER 2 WHOLESALE' : 'SỈ CẤP 2'}
                          </th>
                          <th style={{ width: '15%', padding: '7px 8px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#FECACA', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                            {isEn ? 'TIER 3 WHOLESALE' : 'SỈ CẤP 3'}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {pageRows.map((row, rowIdx) => {
                          const isEven = rowIdx % 2 === 0;
                          const retail = row.retailPrice;

                          // Lợi nhuận và % lời cho từng cấp sỉ:
                          // Công thức: [Số tiền lời] = [Giá bán lẻ niêm yết] - [Giá sỉ tương ứng]
                          // Tỷ lệ %: [Số tiền lời] / [Giá bán lẻ niêm yết] * 100
                          const profit1 = Math.max(0, retail - row.wholesale1Price);
                          const marginPct1 = retail > 0 ? (profit1 / retail) * 100 : 0;

                          const profit2 = Math.max(0, retail - row.wholesale2Price);
                          const marginPct2 = retail > 0 ? (profit2 / retail) * 100 : 0;

                          const profit3 = Math.max(0, retail - row.wholesale3Price);
                          const marginPct3 = retail > 0 ? (profit3 / retail) * 100 : 0;

                          // Dòng quy đổi giá trị theo thùng: (~ [Giá trị] đ/thùng)
                          const isThungProduct =
                            row.wholesaleUnit === 'THÙNG' ||
                            row.unitsPerWholesale > 1 ||
                            row.id === 'vtn-tra-xa-den' ||
                            row.id.startsWith('vtn-cascara-') ||
                            row.name.includes('Xạ Đen') ||
                            row.name.includes('Cascara');

                          const thungMultiplier =
                            row.id === 'vtn-tra-xa-den' || row.name.includes('Xạ Đen')
                              ? 30
                              : row.id.startsWith('vtn-cascara-') || row.name.includes('Cascara')
                              ? 24
                              : (row.unitsPerWholesale || 1);

                          const thungPrice1 = Math.round(row.wholesale1Price * thungMultiplier);
                          const thungPrice2 = Math.round(row.wholesale2Price * thungMultiplier);
                          const thungPrice3 = Math.round(row.wholesale3Price * thungMultiplier);

                          // Tên & Quy cách theo ngôn ngữ
                          const displayName = isEn ? getTranslatedProductName(row, 'EN') : row.name;
                          const displayUnit = translatePackagingText(row.id, row.unit, isEn);

                          return (
                            <tr
                              key={row.id}
                              style={{
                                backgroundColor: isEven ? '#FFFFFF' : '#F8FAFC',
                                borderBottom: '1px solid #E2E8F0',
                              }}
                            >
                              {/* Cột 1: STT - V251: Căn lề đỉnh (verticalAlign: top) */}
                              <td style={{ padding: '6px 4px 6px 4px', textAlign: 'center', fontFamily: 'monospace', color: '#475569', borderRight: '1px solid #E2E8F0', fontSize: '10.5px', verticalAlign: 'top' }}>
                                {row.index}
                              </td>

                              {/* Cột 2: SẢN PHẨM & QUY CÁCH - V251: Căn lề đỉnh */}
                              <td style={{ padding: '6px 8px 6px 8px', textAlign: 'left', borderRight: '1px solid #E2E8F0', verticalAlign: 'top' }}>
                                <div style={{ fontWeight: 700, fontSize: '11px', color: '#0F172A', lineHeight: 1.25 }}>
                                  {displayName}
                                </div>
                                <div style={{ fontSize: '9.5px', color: '#64748B', marginTop: '2px', lineHeight: 1.2, paddingBottom: '2px' }}>
                                  {displayUnit}
                                </div>
                              </td>

                              {/* Cột 3: GIÁ BÁN LẺ - V251: Căn lề đỉnh */}
                              <td style={{ padding: '6px 8px 6px 8px', textAlign: 'right', borderRight: '1px solid #E2E8F0', verticalAlign: 'top' }}>
                                <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#166534', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                  {formatThousandNumber(retail)} ₫
                                </div>
                              </td>

                              {/* Cột 4: Sỉ Cấp 1 - V251: (+) [Số tiền] ([%]) font-weight normal, căn lề đỉnh, padding-bottom đầy đủ */}
                              <td style={{ padding: '6px 6px 6px 6px', textAlign: 'right', borderRight: '1px solid #E2E8F0', verticalAlign: 'top' }}>
                                <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#991B1B', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                  {formatThousandNumber(row.wholesale1Price)} ₫
                                </div>
                                <div
                                  style={{
                                    fontSize: '9.5px',
                                    color: '#15803D',
                                    fontWeight: 400,
                                    marginTop: '2px',
                                    lineHeight: 1.2,
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  (+) {formatThousandNumber(profit1)} ₫ ({marginPct1.toFixed(1)}%)
                                </div>
                                {isThungProduct && (
                                  <div style={{ fontSize: '8.5px', color: '#475569', fontWeight: 400, marginTop: '2px', paddingBottom: '2px', lineHeight: 1.15, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                    (~ {formatThousandNumber(thungPrice1)} {isEn ? '₫/carton' : 'đ/thùng'})
                                  </div>
                                )}
                              </td>

                              {/* Cột 5: Sỉ Cấp 2 - V251: (+) [Số tiền] ([%]) font-weight normal, căn lề đỉnh, padding-bottom đầy đủ */}
                              <td style={{ padding: '6px 6px 6px 6px', textAlign: 'right', borderRight: '1px solid #E2E8F0', verticalAlign: 'top' }}>
                                <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#991B1B', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                  {formatThousandNumber(row.wholesale2Price)} ₫
                                </div>
                                <div
                                  style={{
                                    fontSize: '9.5px',
                                    color: '#15803D',
                                    fontWeight: 400,
                                    marginTop: '2px',
                                    lineHeight: 1.2,
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  (+) {formatThousandNumber(profit2)} ₫ ({marginPct2.toFixed(1)}%)
                                </div>
                                {isThungProduct && (
                                  <div style={{ fontSize: '8.5px', color: '#475569', fontWeight: 400, marginTop: '2px', paddingBottom: '2px', lineHeight: 1.15, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                    (~ {formatThousandNumber(thungPrice2)} {isEn ? '₫/carton' : 'đ/thùng'})
                                  </div>
                                )}
                              </td>

                              {/* Cột 6: Sỉ Cấp 3 - V251: (+) [Số tiền] ([%]) font-weight normal, căn lề đỉnh, padding-bottom đầy đủ */}
                              <td style={{ padding: '6px 6px 6px 6px', textAlign: 'right', verticalAlign: 'top' }}>
                                <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#991B1B', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                  {formatThousandNumber(row.wholesale3Price)} ₫
                                </div>
                                <div
                                  style={{
                                    fontSize: '9.5px',
                                    color: '#15803D',
                                    fontWeight: 400,
                                    marginTop: '2px',
                                    lineHeight: 1.2,
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  (+) {formatThousandNumber(profit3)} ₫ ({marginPct3.toFixed(1)}%)
                                </div>
                                {isThungProduct && (
                                  <div style={{ fontSize: '8.5px', color: '#475569', fontWeight: 400, marginTop: '2px', paddingBottom: '2px', lineHeight: 1.15, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                    (~ {formatThousandNumber(thungPrice3)} {isEn ? '₫/carton' : 'đ/thùng'})
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {/* V250: GHI CHÚ QUY CÁCH SỈ ĐỘNG THEO PHẠM VI XUẤT */}
                    <div style={{ marginTop: '8px', padding: '6px 9px', backgroundColor: '#F8FAFC', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '9px', color: '#334155', lineHeight: 1.38, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                      <strong style={{ color: '#143A24', textTransform: 'uppercase', fontSize: '9px' }}>
                        {dynamicWholesaleNotes.title}
                      </strong>
                      {dynamicWholesaleNotes.items.map((noteItem, idx) => (
                        <span key={idx} style={{ color: '#1E293B', fontWeight: 500 }}>
                          {noteItem}
                        </span>
                      ))}
                    </div>

                    {/* LAST PAGE: CLOSING TERMS & OFFICIAL SIGNATURE BLOCK */}
                    {isLastPage && (
                      <div style={{ marginTop: '14px', paddingTop: '8px', borderTop: '1px solid #CBD5E1', fontSize: '10.5px', lineHeight: 1.4 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
                          {/* Terms & Notes */}
                          <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', color: '#475569' }}>
                            <div style={{ fontWeight: 700, color: '#143A24', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.05em', marginBottom: '3px' }}>
                              📌 {isEn ? 'PARTNER POLICIES & COMMERCIAL TERMS' : 'CHÍNH SÁCH ĐỐI TÁC & ĐIỀU KHOẢN THƯƠNG MẠI'}
                            </div>
                            <div style={{ fontSize: '9.5px', lineHeight: 1.35 }}>
                              <div>
                                {isEn
                                  ? '1. Quotation prices are Ex-Works warehouse at District 1, Ho Chi Minh City, Vietnam.'
                                  : '1. Đơn giá trên là giá xuất kho tại Quận 1, TP. Hồ Chí Minh.'}
                              </div>
                              <div>
                                {isEn
                                  ? '2. Wholesale Tiers 1, 2, 3 are automatically applied based on total weight or carton quantity.'
                                  : '2. Cấp sỉ 1, 2, 3 được hệ thống tự động áp dụng theo khối lượng hoặc số lượng thùng đóng gói thực tế.'}
                              </div>
                              <div>
                                {isEn
                                  ? '3. All products comply with VSATTP, HACCP, ISO 22000 standards. Full VAT electronic invoices provided.'
                                  : '3. Toàn bộ sản phẩm đạt chuẩn VSATTP, HACCP, ISO 22000. Hỗ trợ xuất hóa đơn VAT điện tử đầy đủ.'}
                              </div>
                              <div>
                                {isEn
                                  ? '4. Quotation is valid for 30 calendar days from the issued date or until official price updates.'
                                  : '4. Báo giá có hiệu lực trong vòng 30 ngày kể từ ngày ban hành hoặc khi có văn bản cập nhật mới.'}
                              </div>
                              <div>
                                <strong>{dynamicWholesaleNotes.term5}</strong>
                              </div>
                            </div>
                          </div>

                          {/* Official Corporate Signature & Stamp Area */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center' }}>
                            <div>
                              <div style={{ fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', fontSize: '11px' }}>
                                {isEn
                                  ? 'REPRESENTATIVE OF G-ROOSTER TRADING SERVICE CO., LTD'
                                  : 'ĐẠI DIỆN CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ G-ROOSTER'}
                              </div>
                              <div style={{ fontSize: '9.5px', color: '#64748B', fontStyle: 'italic' }}>
                                {isEn ? '(Authorized Signature & Official Stamp)' : '(Ký, ghi rõ họ tên và đóng dấu)'}
                              </div>
                            </div>

                            <div style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ color: '#94A3B8', fontSize: '11px', fontStyle: 'italic' }}>
                                {isEn
                                  ? '[Electronically Signed & Approved via G-ROOSTER B2B System]'
                                  : '[Đã ký & Phê duyệt điện tử qua hệ thống B2B]'}
                              </span>
                            </div>

                            <div style={{ borderTop: '1px solid #CBD5E1', width: '200px', paddingTop: '4px' }}>
                              <div style={{ fontWeight: 700, color: '#143A24', textTransform: 'uppercase', fontSize: '11px' }}>
                                {isEn ? 'COMMERCIAL SALES DIRECTORATE' : 'BAN GIÁM ĐỐC KINH DOANH'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* =========================================================================
                      FOOTER (EVERY PAGE): Gratitude line, DateTime, Page Number
                     ========================================================================= */}
                  <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: '#64748B', fontWeight: 500 }}>
                    <div style={{ fontWeight: 600, color: '#143A24', fontStyle: 'italic' }}>
                      {isEn
                        ? 'Thank you for partnering and growing with G-ROOSTER!'
                        : 'Cảm ơn Quý đối tác đã tin tưởng và đồng hành cùng G-ROOSTER!'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span>
                        {isEn ? 'Exported at:' : 'Ngày giờ xuất:'}{' '}
                        <strong style={{ fontFamily: 'monospace', color: '#334155' }}>
                          {isEn ? formattedDateTimeEn : formattedDateTime}
                        </strong>
                      </span>
                      <span>·</span>
                      <span>
                        {isEn ? 'Page' : 'Trang'}{' '}
                        <strong style={{ fontFamily: 'monospace', color: '#0F172A' }}>{pageNumber}</strong>{' '}
                        {isEn ? 'of' : '/'}{' '}
                        <strong style={{ fontFamily: 'monospace', color: '#0F172A' }}>{totalPages}</strong>
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            MODAL FOOTER: Summary & Fast Action
           ========================================================================= */}
        <div className="px-5 py-3 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {isEn
                ? 'Quotation automatically extracted in real-time from Google Firebase & G-ROOSTER internal B2B pricing database.'
                : 'Báo giá tự động trích xuất theo thời gian thực từ kho dữ liệu Google Firebase & Bảng giá nội bộ G-ROOSTER.'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-semibold cursor-pointer active:scale-95 transition-all"
            >
              {isEn ? 'Close' : 'Đóng'}
            </button>
            <button
              type="button"
              disabled={isExporting}
              onClick={handleDownloadPdf}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold flex items-center gap-1.5 shadow-md shadow-red-900/20 cursor-pointer disabled:opacity-50 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isEn ? 'Download PDF Quote Now' : 'Tải Báo Giá PDF Ngay'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

