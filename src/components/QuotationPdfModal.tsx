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
  FileSpreadsheet,
  Percent,
  Tag,
} from 'lucide-react';
import { AdminProductFinancialItem, getPackagingUnitNoun } from '../utils/productStore';
import {
  COMPANY_INFO,
  formatThousandNumber,
  extractQuotationData,
  paginateQuotationRows,
  generatePdfFromPageElements,
  generatePdfWithAutoTable,
  generateQuotationExcel,
  generateQuotationWord,
  QuotationPriceMode,
} from '../utils/quotationPdfExport';
import { Language } from '../utils/i18n';
import { getTranslatedProductName } from '../utils/productTranslation';
import { SPECIFIC_PRODUCT_PACKAGING } from '../data/productTranslationsEn';
import { cleanProductTitle } from '../data/products';

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

  // V272 Requirement 3: Trung tâm xuất báo giá đa năng: Mức giá & Định dạng file
  const [priceMode, setPriceMode] = useState<QuotationPriceMode>('all');
  const [customDiscountPercent, setCustomDiscountPercent] = useState<number>(8);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'word'>('pdf');

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

  // Paginated chunks (13 on page 1, 17 on subsequent pages, dynamically balanced on final page)
  const paginatedPages = useMemo(() => {
    return paginateQuotationRows(targetProducts, 13, 17);
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

    const isNutsFilter =
      currentPartnerFilter === 'hat-qua-kho' ||
      currentPartnerFilter === 'hat-dinh-duong' ||
      currentPartnerFilter === 'trai-cay-say' ||
      currentPartnerFilter === 'hu-qua-tang' ||
      (exportScope === 'filtered' &&
        targetProducts.length > 0 &&
        targetProducts.every(
          (p) =>
            (p.id || '').startsWith('gr-m') ||
            p.partnerId === 'hat-qua-kho' ||
            p.category?.includes('Hạt & Quả Khô')
        ));

    const isNongSanDacSanFilter =
      exportScope === 'filtered' &&
      !isMatchaFilter &&
      !isNutsFilter &&
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

    if (isNutsFilter) {
      return {
        title: isEn ? '* WHOLESALE MOQ SPECIFICATIONS:' : '* Ghi chú quy cách mua sỉ:',
        items: [
          isEn
            ? '• Selected Premium Nuts & Dried Fruits: Wholesale by CARTON (Tier 1: From 2 cartons, Tier 2: From 6 cartons, Tier 3: From 20 cartons).'
            : '• Hạt & Quả Khô Dinh Dưỡng: Sỉ theo THÙNG (Cấp 1: Từ 2 thùng, Cấp 2: Từ 6 thùng, Cấp 3: Từ 20 thùng).',
        ],
        term5: isEn
          ? '5. Wholesale MOQ: Selected Premium Nuts & Dried Fruits wholesale strictly by CARTON (Tier 1: From 2 cartons, Tier 2: From 6 cartons, Tier 3: From 20 cartons).'
          : '5. Quy cách sỉ: Hạt & Quả Khô Dinh Dưỡng sỉ theo THÙNG (Cấp 1: Từ 2 thùng, Cấp 2: Từ 6 thùng, Cấp 3: Từ 20 thùng).',
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

    // Default: "Tất cả (264 SP)" - Hiển thị phân loại rõ rệt cho từng nhóm ngành hàng
    return {
      title: isEn ? '* WHOLESALE MOQ SPECIFICATIONS:' : '* Ghi chú quy cách mua sỉ:',
      items: [
        isEn
          ? '• Matcha: Wholesale by KG (Tier 1: 10-30kg, Tier 2: 30-100kg, Tier 3: >100kg).'
          : '• Matcha: Sỉ theo KG (Cấp 1: 10-30kg, Cấp 2: 30-100kg, Cấp 3: >100kg).',
        isEn
          ? '• Selected Premium Nuts & Dried Fruits: Wholesale by CARTON (Tier 1: From 2 cartons, Tier 2: From 6 cartons, Tier 3: From 20 cartons).'
          : '• Hạt & Quả Khô Dinh Dưỡng: Sỉ theo THÙNG (Cấp 1: Từ 2 thùng, Cấp 2: Từ 6 thùng, Cấp 3: Từ 20 thùng).',
        isEn
          ? '• Cascara Teas, Coffee & Specialties: Wholesale by CARTON (Tier 1: 10-30 cartons, Tier 2: 30-100 cartons, Tier 3: >100 cartons).'
          : '• Trà Cascara & Xạ Đen, Cà phê & Đặc sản: Sỉ theo THÙNG (Cấp 1: 10-30 thùng, Cấp 2: 30-100 thùng, Cấp 3: >100 thùng).',
      ],
      term5: isEn
        ? '5. Wholesale MOQ: Matcha wholesale by KG (Tier 1: 10-30kg, Tier 2: 30-100kg, Tier 3: >100kg); Selected Premium Nuts & Dried Fruits wholesale by CARTON (Tier 1: From 2 cartons, Tier 2: From 6 cartons, Tier 3: From 20 cartons); Cascara, Teas & Coffee wholesale by CARTON.'
        : '5. Quy cách sỉ: Matcha sỉ theo KG (Cấp 1: 10-30kg, Cấp 2: 30-100kg, Cấp 3: >100kg); Hạt & Quả Khô Dinh Dưỡng sỉ theo THÙNG (Cấp 1: Từ 2 thùng, Cấp 2: Từ 6 thùng, Cấp 3: Từ 20 thùng); Trà Cascara & Xạ Đen, Cà phê & Đặc sản sỉ theo THÙNG.',
    };
  }, [currentPartnerFilter, exportScope, targetProducts, isEn]);

  if (!isOpen) return null;

  // V272 Requirement 3: Tiêu đề động theo Mức giá xuất đã chọn
  const pageTitle = (() => {
    if (priceMode === 'retail') return isEn ? 'OFFICIAL RETAIL PRICE LIST' : 'BẢNG GIÁ BÁN LẺ NIÊM YẾT CHÍNH THỨC';
    if (priceMode === 'wholesale1') return isEn ? 'OFFICIAL WHOLESALE PRICE LIST - TIER 1' : 'BẢNG BÁO GIÁ SỈ CHÍNH THỨC - CẤP 1 (ĐẠI LÝ / KHÁCH QUÁN)';
    if (priceMode === 'wholesale2') return isEn ? 'OFFICIAL WHOLESALE PRICE LIST - TIER 2' : 'BẢNG BÁO GIÁ SỈ CHÍNH THỨC - CẤP 2 (ĐẠI LÝ / NHÀ PHÂN PHỐI)';
    if (priceMode === 'wholesale3') return isEn ? 'OFFICIAL WHOLESALE PRICE LIST - TIER 3' : 'BẢNG BÁO GIÁ SỈ CHÍNH THỨC - CẤP 3 (TỔNG KHO / ĐẠI LÝ LỚN)';
    if (priceMode === 'custom') return isEn ? `CUSTOM B2B PRICE QUOTATION (-${customDiscountPercent}% FROM RETAIL)` : `BẢNG BÁO GIÁ TÙY CHỈNH B2B (CHIẾT KHẤU -${customDiscountPercent}% TỪ GIÁ LẺ)`;
    return isEn ? 'OFFICIAL B2B PRODUCT PRICE QUOTATION' : 'BẢNG BÁO GIÁ SẢN PHẨM & NÔNG SẢN CAO CẤP';
  })();

  // V272: Trung tâm xuất báo giá đa năng: Xử lý xuất file PDF, Excel (.xls) hoặc Word (.doc)
  const handleExecuteExport = async () => {
    try {
      setIsExporting(true);
      setExportSuccess(false);

      if (!targetProducts || targetProducts.length === 0) {
        alert(isEn ? 'No quotation product data found to export.' : 'Không tìm thấy dữ liệu sản phẩm để xuất báo giá.');
        return;
      }

      const dateSlug = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const modeSlug =
        priceMode === 'all'
          ? 'Full-Tiers'
          : priceMode === 'custom'
          ? `Discount-${customDiscountPercent}Pct`
          : priceMode.toUpperCase();

      // 1. Xuất file EXCEL (.xls)
      if (exportFormat === 'excel') {
        const filename = isEn ? `Quotation-G-ROOSTER-${modeSlug}-${dateSlug}.xls` : `Bao-Gia-G-ROOSTER-${modeSlug}-${dateSlug}.xls`;
        generateQuotationExcel(targetProducts, filename, {
          isEn,
          recipientName,
          quotationCode,
          priceMode,
          customDiscountPercent,
        });
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 4000);
        return;
      }

      // 2. Xuất file WORD (.doc)
      if (exportFormat === 'word') {
        const filename = isEn ? `Quotation-G-ROOSTER-${modeSlug}-${dateSlug}.doc` : `Bao-Gia-G-ROOSTER-${modeSlug}-${dateSlug}.doc`;
        generateQuotationWord(targetProducts, filename, {
          isEn,
          recipientName,
          quotationCode,
          priceMode,
          customDiscountPercent,
        });
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 4000);
        return;
      }

      // 3. Xuất file PDF (Render qua html2canvas với font Unicode Inter/Roboto sạch sẽ 100% không bể chữ)
      const filename = isEn ? `Quotation-G-ROOSTER-${modeSlug}-${dateSlug}.pdf` : `Bao-Gia-G-ROOSTER-${modeSlug}-${dateSlug}.pdf`;
      const pageElements = Array.from(
        pagesContainerRef.current?.querySelectorAll('.quotation-a4-page') || []
      ) as HTMLElement[];

      if (pageElements.length > 0) {
        await generatePdfFromPageElements(pageElements, filename, (current, total) => {
          setExportProgress({ current, total });
        });
      } else {
        generatePdfWithAutoTable(targetProducts, filename, isEn, recipientName, quotationCode);
      }

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    } catch (err: unknown) {
      console.error('Lỗi khi xuất Báo Giá:', err);
      const errMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert(isEn ? `Failed to export quotation: ${errMsg}` : `Không thể xuất file báo giá: ${errMsg}`);
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
            MODAL HEADER: Brand Title, Language Toggle, Main Export Button & Close
           ========================================================================= */}
        <div className="px-5 py-3.5 bg-stone-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <FileText className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-heading font-bold text-white tracking-wide">
                  {isEn ? 'TRADING CENTER · B2B QUOTATION HUB' : 'TRUNG TÂM XUẤT BÁO GIÁ ĐA NĂNG'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-mono font-black uppercase">
                  V272
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {isEn
                  ? 'G-ROOSTER CO.,LTD · TAX ID: 0319153593 · Multi-Format Export (PDF, Excel, Word)'
                  : 'G-ROOSTER CO.,LTD · MST: 0319153593 · Tùy biến mức giá & Xuất đa định dạng (PDF, Excel, Word)'}
              </p>
            </div>
          </div>

          {/* Action buttons in header */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Language Switcher */}
            <div className="flex items-center rounded-lg bg-stone-800 border border-stone-700 p-0.5 text-xs font-mono mr-1">
              <button
                type="button"
                onClick={() => setModalLang('VN')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  !isEn
                    ? 'bg-[#D4AF37] text-stone-950 shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Xuất file bằng Tiếng Việt"
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
                title="Export quotation in English"
              >
                EN
              </button>
            </div>

            {/* NÚT THỰC THI XUẤT BÁO GIÁ ĐA NĂNG */}
            <button
              type="button"
              disabled={isExporting}
              onClick={handleExecuteExport}
              className={`px-4 py-2 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50 active:scale-95 ${
                exportFormat === 'excel'
                  ? 'bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-600 hover:to-green-600 shadow-emerald-900/30'
                  : exportFormat === 'word'
                  ? 'bg-gradient-to-r from-blue-700 to-sky-700 hover:from-blue-600 hover:to-sky-600 shadow-blue-900/30'
                  : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-red-900/30'
              }`}
              title={
                isEn
                  ? `Export quotation as ${exportFormat.toUpperCase()}`
                  : `Xuất file báo giá định dạng ${exportFormat.toUpperCase()}`
              }
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
                      ? 'Processing...'
                      : 'Đang khởi tạo...'}
                  </span>
                </>
              ) : (
                <>
                  {exportFormat === 'excel' ? (
                    <FileSpreadsheet className="w-4 h-4" />
                  ) : exportFormat === 'word' ? (
                    <FileText className="w-4 h-4" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>
                    {exportFormat === 'excel'
                      ? isEn
                        ? 'EXPORT EXCEL (.XLS)'
                        : 'XUẤT FILE EXCEL (.XLS)'
                      : exportFormat === 'word'
                      ? isEn
                        ? 'EXPORT WORD (.DOC)'
                        : 'XUẤT FILE WORD (.DOC)'
                      : isEn
                      ? 'DOWNLOAD PDF QUOTE'
                      : 'TẢI FILE BÁO GIÁ PDF'}
                  </span>
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
            V272: BẢNG ĐIỀU KHIỂN BÁO GIÁ ĐA NĂNG
            a. Chọn Mức Giá Xuất: [Giá Lẻ] | [Sỉ 1] | [Sỉ 2] | [Sỉ 3] hoặc [Tùy chỉnh %]
            b. Logic Tùy chỉnh %: Nếu nhập "8", hệ thống tính [Giá xuất] = [Giá lẻ] - 8%
            c. Chọn Định dạng File: [PDF] | [EXCEL] | [WORD]
           ========================================================================= */}
        <div className="px-5 py-3 bg-stone-50 border-b border-stone-200 flex flex-col gap-2.5 text-xs shrink-0">
          {/* HÀNG 1: CHỌN MỨC GIÁ XUẤT */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-stone-800 flex items-center gap-1 shrink-0">
              <Tag className="w-3.5 h-3.5 text-emerald-800" />
              <span>{isEn ? 'Export Price Tier:' : 'Mức Giá Xuất:'}</span>
            </span>

            <div className="inline-flex rounded-xl border border-stone-300 bg-white p-0.5 shadow-2xs flex-wrap gap-0.5">
              <button
                type="button"
                onClick={() => setPriceMode('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  priceMode === 'all'
                    ? 'bg-[#143A24] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
                title={isEn ? 'Show full price matrix (Retail & Wholesale 1-2-3)' : 'Hiển thị đầy đủ tất cả các mức giá (Giá Lẻ & Sỉ 1, 2, 3)'}
              >
                {isEn ? 'Full Table (All Tiers)' : 'Đầy Đủ (Lẻ & Sỉ 1-2-3)'}
              </button>

              <button
                type="button"
                onClick={() => setPriceMode('retail')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  priceMode === 'retail'
                    ? 'bg-[#143A24] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
                title={isEn ? 'Export only Retail Price list' : 'Xuất bảng giá bán lẻ niêm yết'}
              >
                {isEn ? 'Retail Price' : 'Giá Lẻ'}
              </button>

              <button
                type="button"
                onClick={() => setPriceMode('wholesale1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  priceMode === 'wholesale1'
                    ? 'bg-[#143A24] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
                title={isEn ? 'Export Tier 1 Wholesale for Cafes & Small Dealers' : 'Xuất bảng giá sỉ Cấp 1 (Đại lý nhỏ / Khách quán)'}
              >
                {isEn ? 'Tier 1 Wholesale' : 'Sỉ 1'}
              </button>

              <button
                type="button"
                onClick={() => setPriceMode('wholesale2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  priceMode === 'wholesale2'
                    ? 'bg-[#143A24] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
                title={isEn ? 'Export Tier 2 Wholesale for Sub-distributors' : 'Xuất bảng giá sỉ Cấp 2 (NPP / Đại lý Cấp 2)'}
              >
                {isEn ? 'Tier 2 Wholesale' : 'Sỉ 2'}
              </button>

              <button
                type="button"
                onClick={() => setPriceMode('wholesale3')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  priceMode === 'wholesale3'
                    ? 'bg-[#143A24] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
                title={isEn ? 'Export Tier 3 Wholesale for Master Warehouses' : 'Xuất bảng giá sỉ Cấp 3 (Tổng kho / Đại lý lớn)'}
              >
                {isEn ? 'Tier 3 Wholesale' : 'Sỉ 3'}
              </button>

              <button
                type="button"
                onClick={() => setPriceMode('custom')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  priceMode === 'custom'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
                title="Tự do đặt mức chiết khấu % giảm trực tiếp từ Giá Lẻ"
              >
                <Percent className="w-3.5 h-3.5" />
                <span>{isEn ? 'Custom %' : 'Tùy chỉnh %'}</span>
              </button>
            </div>

            {/* Ô nhập phần trăm khi chọn Tùy chỉnh % */}
            {priceMode === 'custom' && (
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-xl shadow-2xs animate-in fade-in duration-200">
                <span className="font-bold text-amber-900 text-xs">Chiết khấu:</span>
                <div className="flex items-center bg-white border border-amber-400 rounded-md px-1.5 py-0.5">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={customDiscountPercent}
                    onChange={(e) => setCustomDiscountPercent(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
                    className="w-10 text-center font-bold text-amber-950 focus:outline-none text-xs"
                  />
                  <span className="font-bold text-amber-800 ml-0.5">%</span>
                </div>
                <span className="text-[11px] text-amber-800 font-semibold">
                  → [Giá xuất] = [Giá lẻ] - {customDiscountPercent}%
                </span>
              </div>
            )}
          </div>

          {/* HÀNG 2: CHỌN ĐỊNH DẠNG FILE, PHẠM VI XUẤT, KÍNH GỬI */}
          <div className="flex items-center justify-between gap-3 flex-wrap pt-2 border-t border-stone-200/80">
            <div className="flex items-center gap-3.5 flex-wrap">
              {/* Định dạng file */}
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-stone-700">{isEn ? 'Format:' : 'Định dạng:'}</span>
                <div className="inline-flex rounded-xl border border-stone-300 bg-white p-0.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setExportFormat('pdf')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      exportFormat === 'pdf'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                    title="Xuất file PDF chuẩn A4, sắc nét, hỗ trợ in ấn"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportFormat('excel')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      exportFormat === 'excel'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                    title="Xuất file Excel (.xls) có bảng cấu trúc chuẩn y hệt bản PDF"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>EXCEL</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportFormat('word')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      exportFormat === 'word'
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                    title="Xuất file Word (.doc) chuẩn văn bản hành chính"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>WORD</span>
                  </button>
                </div>
              </div>

              {/* Phạm vi xuất */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-stone-700 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-stone-500" />
                  {isEn ? 'Scope:' : 'Phạm vi:'}
                </span>
                <div className="inline-flex rounded-lg border border-stone-300 bg-white p-0.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setExportScope('filtered')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      exportScope === 'filtered'
                        ? 'bg-[#143A24] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                    title={isEn ? 'Export products matching screen filter' : 'Chỉ xuất các sản phẩm đang được lọc trên màn hình Admin'}
                  >
                    {isEn
                      ? currentPartnerFilter === 'selective'
                        ? `Selected (${filteredProducts.length})`
                        : `Filtered (${filteredProducts.length})`
                      : currentPartnerFilter === 'selective'
                        ? `Đã chọn (${filteredProducts.length})`
                        : `Bộ lọc (${filteredProducts.length})`}
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportScope('all')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      exportScope === 'all'
                        ? 'bg-[#143A24] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                    title={isEn ? 'Export all products in catalog' : 'Xuất toàn bộ sản phẩm trong danh mục'}
                  >
                    {isEn ? `All (${allProducts.length})` : `Tất cả (${allProducts.length})`}
                  </button>
                </div>
              </div>

              {/* Kính gửi */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-stone-700">{isEn ? 'Attention / To:' : 'Kính gửi:'}</span>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder={isEn ? 'Partner / Company name...' : 'Tên đối tác / Doanh nghiệp...'}
                  className="px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#143A24] w-40 sm:w-52"
                />
              </div>
            </div>

            {/* Thông tin metadata */}
            <div className="flex items-center gap-2.5 text-[11px] text-stone-500 font-mono">
              <span>{isEn ? 'Quote:' : 'Mã:'} <strong className="text-stone-700">{quotationCode}</strong></span>
              <span>·</span>
              <span>{paginatedPages.length} {isEn ? 'pages' : 'trang A4'}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <Globe className="w-3 h-3 text-emerald-600" />
                {isEn ? 'EN' : 'Tiếng Việt'}
              </span>
            </div>
          </div>
        </div>

        {/* Success Alert Banner */}
        {exportSuccess && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2 flex items-center justify-between text-xs text-emerald-800 animate-in slide-in-from-top-2 duration-200 shrink-0">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isEn
                  ? `Quotation exported successfully in ${exportFormat.toUpperCase()} format! Please check your Downloads folder.`
                  : `Đã xuất và tải xuống file Báo Giá định dạng ${exportFormat.toUpperCase()} thành công! Vui lòng kiểm tra thư mục Downloads trên thiết bị.`}
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
                              Website: <strong style={{ color: '#143A24' }}>https://g-rooster.com/</strong> · Email: <strong style={{ color: '#143A24' }}>contact@g-rooster.com</strong>
                            </div>
                          </div>
                        </div>

                        {/* Gold accent line */}
                        <div style={{ height: '2px', width: '100%', background: 'linear-gradient(to right, #D4AF37, #143A24, #D4AF37)', margin: '6px 0 10px 0' }} />

                        {/* Document Title Banner */}
                        <div style={{ textAlign: 'center', paddingTop: '4px', paddingBottom: '4px' }}>
                          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#143A24', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
                            {pageTitle}
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
                            {isEn ? `${pageTitle} (No: ${quotationCode})` : `${pageTitle} (Mã: ${quotationCode})`}
                          </span>
                        </div>
                        <div style={{ fontFamily: 'monospace', color: '#64748B', fontSize: '10px' }}>
                          Hotline: {COMPANY_INFO.hotlines[0]} · {isEn ? 'Tax ID' : 'MST'}: {COMPANY_INFO.taxCode}
                        </div>
                      </div>
                    )}

                    {/* =========================================================================
                        TABLE: V272 CHUẨN HÓA QUY CÁCH ĐÓNG GÓI ĐỘNG & BỘ MỨC GIÁ TÙY CHỌN
                        - Ép căn giữa hàng dọc (Vertical Align Middle) cho 100% các ô
                        - Định dạng quy cách: Qty=1: [Định lượng], Qty>1: [Định lượng] | Thùng [Qty] [Định lượng]
                       ========================================================================= */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', border: '1px solid #CBD5E1' }}>
                      <thead>
                        {priceMode === 'all' ? (
                          /* 1. ĐẦY ĐỦ CẢ BẢNG GIÁ LẺ & SỈ CẤP 1, 2, 3 */
                          <tr style={{ backgroundColor: '#143A24', color: '#FFFFFF', verticalAlign: 'middle' }}>
                            <th valign="middle" style={{ width: '4.5%', padding: '8px 6px', textAlign: 'center', fontWeight: 700, border: '1px solid #0D2718', fontSize: '10.5px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'NO.' : 'STT'}
                            </th>
                            <th valign="middle" style={{ width: '35.5%', padding: '8px 12px', textAlign: 'left', fontWeight: 700, border: '1px solid #0D2718', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'PRODUCTS & PACKAGING' : 'SẢN PHẨM & QUY CÁCH'}
                            </th>
                            <th valign="middle" style={{ width: '15%', padding: '8px 10px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#86EFAC', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'RETAIL PRICE' : 'GIÁ BÁN LẺ'}
                            </th>
                            <th valign="middle" style={{ width: '15%', padding: '8px 10px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#FECACA', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'TIER 1 WHOLESALE' : 'SỈ CẤP 1'}
                            </th>
                            <th valign="middle" style={{ width: '15%', padding: '8px 10px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#FECACA', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'TIER 2 WHOLESALE' : 'SỈ CẤP 2'}
                            </th>
                            <th valign="middle" style={{ width: '15%', padding: '8px 10px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#FECACA', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'TIER 3 WHOLESALE' : 'SỈ CẤP 3'}
                            </th>
                          </tr>
                        ) : priceMode === 'retail' ? (
                          /* 2. CHỈ XUẤT GIÁ BÁN LẺ NIÊM YẾT */
                          <tr style={{ backgroundColor: '#143A24', color: '#FFFFFF', verticalAlign: 'middle' }}>
                            <th valign="middle" style={{ width: '5%', padding: '8px 6px', textAlign: 'center', fontWeight: 700, border: '1px solid #0D2718', fontSize: '10.5px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'NO.' : 'STT'}
                            </th>
                            <th valign="middle" style={{ width: '38%', padding: '8px 12px', textAlign: 'left', fontWeight: 700, border: '1px solid #0D2718', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'PRODUCTS & LINE' : 'SẢN PHẨM & DÒNG'}
                            </th>
                            <th valign="middle" style={{ width: '23%', padding: '8px 10px', textAlign: 'center', fontWeight: 700, border: '1px solid #0D2718', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'PACKAGING SPECIFICATION' : 'QUY CÁCH ĐÓNG GÓI'}
                            </th>
                            <th valign="middle" style={{ width: '17%', padding: '8px 10px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#86EFAC', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'LIST RETAIL PRICE' : 'GIÁ BÁN LẺ NIÊM YẾT'}
                            </th>
                            <th valign="middle" style={{ width: '17%', padding: '8px 10px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#E2E8F0', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'CARTON CONVERT' : 'QUY ĐỔI GIÁ THÙNG'}
                            </th>
                          </tr>
                        ) : (
                          /* 3. XUẤT SỈ 1, SỈ 2, SỈ 3 HOẶC TÙY CHỈNH % */
                          <tr style={{ backgroundColor: '#143A24', color: '#FFFFFF', verticalAlign: 'middle' }}>
                            <th valign="middle" style={{ width: '4.5%', padding: '8px 6px', textAlign: 'center', fontWeight: 700, border: '1px solid #0D2718', fontSize: '10.5px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'NO.' : 'STT'}
                            </th>
                            <th valign="middle" style={{ width: '32.5%', padding: '8px 12px', textAlign: 'left', fontWeight: 700, border: '1px solid #0D2718', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'PRODUCTS & LINE' : 'SẢN PHẨM & DÒNG'}
                            </th>
                            <th valign="middle" style={{ width: '20%', padding: '8px 8px', textAlign: 'center', fontWeight: 700, border: '1px solid #0D2718', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'PACKAGING SPEC' : 'QUY CÁCH ĐÓNG GÓI'}
                            </th>
                            <th valign="middle" style={{ width: '14%', padding: '8px 8px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#86EFAC', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {isEn ? 'LIST RETAIL' : 'GIÁ NIÊM YẾT'}
                            </th>
                            <th valign="middle" style={{ width: '15%', padding: '8px 8px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#FECACA', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {priceMode === 'wholesale1'
                                ? isEn ? 'TIER 1 QUOTE' : 'ĐƠN GIÁ SỈ 1'
                                : priceMode === 'wholesale2'
                                ? isEn ? 'TIER 2 QUOTE' : 'ĐƠN GIÁ SỈ 2'
                                : priceMode === 'wholesale3'
                                ? isEn ? 'TIER 3 QUOTE' : 'ĐƠN GIÁ SỈ 3'
                                : isEn ? `APPLIED QUOTE (-${customDiscountPercent}%)` : `GIÁ BÁO (-${customDiscountPercent}%)`}
                            </th>
                            <th valign="middle" style={{ width: '14%', padding: '8px 8px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#FDE68A', fontSize: '11px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                              {priceMode === 'custom'
                                ? isEn ? 'SAVINGS' : 'TIẾT KIỆM'
                                : isEn ? 'DEALER PROFIT' : 'MỨC LỜI ĐẠI LÝ'}
                            </th>
                          </tr>
                        )}
                      </thead>
                      <tbody>
                        {pageRows.map((row, rowIdx) => {
                          const isEven = rowIdx % 2 === 0;
                          const retail = row.retailPrice;

                          // Lợi nhuận và % lời cho từng cấp sỉ
                          const profit1 = Math.max(0, retail - row.wholesale1Price);
                          const marginPct1 = retail > 0 ? (profit1 / retail) * 100 : 0;

                          const profit2 = Math.max(0, retail - row.wholesale2Price);
                          const marginPct2 = retail > 0 ? (profit2 / retail) * 100 : 0;

                          const profit3 = Math.max(0, retail - row.wholesale3Price);
                          const marginPct3 = retail > 0 ? (profit3 / retail) * 100 : 0;

                          // V272: Chuẩn hóa logic Quy cách đóng gói động toàn hệ thống
                          const qtyPerCarton = Math.round(row.unitsPerWholesale || 1);
                          const isMultiCarton = qtyPerCarton > 1;

                          const thungPriceRetail = Math.round(retail * qtyPerCarton);
                          const thungPrice1 = Math.round(row.wholesale1Price * qtyPerCarton);
                          const thungPrice2 = Math.round(row.wholesale2Price * qtyPerCarton);
                          const thungPrice3 = Math.round(row.wholesale3Price * qtyPerCarton);

                          // Tên & Quy cách theo ngôn ngữ
                          const rawName = isEn ? getTranslatedProductName(row, 'EN') : row.name;
                          const displayName = cleanProductTitle(rawName);
                          const displayUnit = translatePackagingText(row.id, row.unit, isEn);

                          // V272: Chuẩn hóa hiển thị quy cách đóng gói:
                          // Qty = 1: [Định lượng]
                          // Qty > 1: [Định lượng] | Thùng [Qty] [Định lượng]
                          const dynamicPackagingSpec = isMultiCarton
                            ? `${displayUnit} | ${isEn ? 'Carton' : 'Thùng'} ${qtyPerCarton} ${displayUnit}`
                            : displayUnit;

                          // Tính đơn giá và chiết khấu cho mode đơn lẻ / tùy chỉnh
                          let appliedSinglePrice = retail;
                          let singleSavings = 0;
                          let singleMarginPct = 0;
                          let thungSinglePrice = thungPriceRetail;

                          if (priceMode === 'wholesale1') {
                            appliedSinglePrice = row.wholesale1Price;
                            singleSavings = profit1;
                            singleMarginPct = marginPct1;
                            thungSinglePrice = thungPrice1;
                          } else if (priceMode === 'wholesale2') {
                            appliedSinglePrice = row.wholesale2Price;
                            singleSavings = profit2;
                            singleMarginPct = marginPct2;
                            thungSinglePrice = thungPrice2;
                          } else if (priceMode === 'wholesale3') {
                            appliedSinglePrice = row.wholesale3Price;
                            singleSavings = profit3;
                            singleMarginPct = marginPct3;
                            thungSinglePrice = thungPrice3;
                          } else if (priceMode === 'custom') {
                            appliedSinglePrice = Math.round(retail * (1 - customDiscountPercent / 100));
                            singleSavings = Math.max(0, retail - appliedSinglePrice);
                            singleMarginPct = customDiscountPercent;
                            thungSinglePrice = Math.round(appliedSinglePrice * qtyPerCarton);
                          }

                          return (
                            <tr
                              key={row.id}
                              style={{
                                backgroundColor: isEven ? '#FFFFFF' : '#F8FAFC',
                                borderBottom: '1px solid #E2E8F0',
                                verticalAlign: 'middle',
                              }}
                            >
                              {/* Cột 1: STT - Luôn căn giữa hoàn hảo */}
                              <td
                                valign="middle"
                                style={{
                                  padding: '7px 6px',
                                  textAlign: 'center',
                                  fontFamily: 'monospace',
                                  color: '#475569',
                                  borderRight: '1px solid #E2E8F0',
                                  fontSize: '10.5px',
                                  verticalAlign: 'middle',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '34px', width: '100%' }}>
                                  {row.index}
                                </div>
                              </td>

                              {priceMode === 'all' ? (
                                /* Cột cho chế độ 'all' (Đầy đủ bảng 6 cột) */
                                <>
                                  {/* Cột 2: SẢN PHẨM & QUY CÁCH */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 10px',
                                      textAlign: 'left',
                                      borderRight: '1px solid #E2E8F0',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '34px' }}>
                                      <div style={{ fontWeight: 700, fontSize: '11px', color: '#0F172A', lineHeight: 1.25 }}>
                                        {displayName}
                                      </div>
                                      <div style={{ fontSize: '9.5px', color: '#64748B', marginTop: '2px', lineHeight: 1.2 }}>
                                        {dynamicPackagingSpec}
                                      </div>
                                    </div>
                                  </td>

                                  {/* Cột 3: GIÁ BÁN LẺ */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 10px',
                                      textAlign: 'right',
                                      borderRight: '1px solid #E2E8F0',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '34px' }}>
                                      <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#166534', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                        {formatThousandNumber(retail)} ₫
                                      </div>
                                      {isMultiCarton && (
                                        <div style={{ fontSize: '8.5px', color: '#475569', fontWeight: 400, marginTop: '2px', lineHeight: 1.2, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                          (~ {formatThousandNumber(thungPriceRetail)} {isEn ? '₫/carton' : 'đ/thùng'})
                                        </div>
                                      )}
                                    </div>
                                  </td>

                                  {/* Cột 4: Sỉ Cấp 1 */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 8px',
                                      textAlign: 'right',
                                      borderRight: '1px solid #E2E8F0',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '34px' }}>
                                      <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#991B1B', fontFamily: 'monospace', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                                        {formatThousandNumber(row.wholesale1Price)} ₫
                                      </div>
                                      <div style={{ fontSize: '9.5px', color: '#15803D', fontWeight: 500, marginTop: '2px', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                                        (+) {formatThousandNumber(profit1)} ₫ ({marginPct1.toFixed(1)}%)
                                      </div>
                                      {isMultiCarton && (
                                        <div style={{ fontSize: '8.5px', color: '#475569', fontWeight: 400, marginTop: '2px', lineHeight: 1.2, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                          (~ {formatThousandNumber(thungPrice1)} {isEn ? '₫/carton' : 'đ/thùng'})
                                        </div>
                                      )}
                                    </div>
                                  </td>

                                  {/* Cột 5: Sỉ Cấp 2 */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 8px',
                                      textAlign: 'right',
                                      borderRight: '1px solid #E2E8F0',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '34px' }}>
                                      <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#991B1B', fontFamily: 'monospace', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                                        {formatThousandNumber(row.wholesale2Price)} ₫
                                      </div>
                                      <div style={{ fontSize: '9.5px', color: '#15803D', fontWeight: 500, marginTop: '2px', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                                        (+) {formatThousandNumber(profit2)} ₫ ({marginPct2.toFixed(1)}%)
                                      </div>
                                      {isMultiCarton && (
                                        <div style={{ fontSize: '8.5px', color: '#475569', fontWeight: 400, marginTop: '2px', lineHeight: 1.2, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                          (~ {formatThousandNumber(thungPrice2)} {isEn ? '₫/carton' : 'đ/thùng'})
                                        </div>
                                      )}
                                    </div>
                                  </td>

                                  {/* Cột 6: Sỉ Cấp 3 */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 8px',
                                      textAlign: 'right',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '34px' }}>
                                      <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#991B1B', fontFamily: 'monospace', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                                        {formatThousandNumber(row.wholesale3Price)} ₫
                                      </div>
                                      <div style={{ fontSize: '9.5px', color: '#15803D', fontWeight: 500, marginTop: '2px', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                                        (+) {formatThousandNumber(profit3)} ₫ ({marginPct3.toFixed(1)}%)
                                      </div>
                                      {isMultiCarton && (
                                        <div style={{ fontSize: '8.5px', color: '#475569', fontWeight: 400, marginTop: '2px', lineHeight: 1.2, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                          (~ {formatThousandNumber(thungPrice3)} {isEn ? '₫/carton' : 'đ/thùng'})
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                </>
                              ) : priceMode === 'retail' ? (
                                /* Cột cho chế độ 'retail' (Giá Bán Lẻ) */
                                <>
                                  {/* Cột 2: SẢN PHẨM & DÒNG */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 12px',
                                      textAlign: 'left',
                                      borderRight: '1px solid #E2E8F0',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '34px' }}>
                                      <div style={{ fontWeight: 700, fontSize: '11px', color: '#0F172A', lineHeight: 1.25 }}>
                                        {displayName}
                                      </div>
                                      <div style={{ fontSize: '9.5px', color: '#64748B', marginTop: '2px', lineHeight: 1.2 }}>
                                        {row.partnerName || row.category}
                                      </div>
                                    </div>
                                  </td>

                                  {/* Cột 3: QUY CÁCH ĐÓNG GÓI */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 10px',
                                      textAlign: 'center',
                                      borderRight: '1px solid #E2E8F0',
                                      verticalAlign: 'middle',
                                      fontSize: '10.5px',
                                      color: '#334155',
                                      fontWeight: 600,
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '34px' }}>
                                      {dynamicPackagingSpec}
                                    </div>
                                  </td>

                                  {/* Cột 4: GIÁ BÁN LẺ NIÊM YẾT */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 10px',
                                      textAlign: 'right',
                                      borderRight: '1px solid #E2E8F0',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minHeight: '34px' }}>
                                      <span style={{ fontWeight: 700, fontSize: '12px', color: '#166534', fontFamily: 'monospace' }}>
                                        {formatThousandNumber(retail)} ₫
                                      </span>
                                    </div>
                                  </td>

                                  {/* Cột 5: QUY ĐỔI GIÁ THÙNG */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 10px',
                                      textAlign: 'right',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minHeight: '34px' }}>
                                      <span style={{ fontSize: '11px', color: '#475569', fontFamily: 'monospace' }}>
                                        {isMultiCarton ? `~ ${formatThousandNumber(thungPriceRetail)} ₫/thùng` : '-'}
                                      </span>
                                    </div>
                                  </td>
                                </>
                              ) : (
                                /* Cột cho chế độ 'wholesale1', 'wholesale2', 'wholesale3', 'custom' */
                                <>
                                  {/* Cột 2: SẢN PHẨM & DÒNG */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 12px',
                                      textAlign: 'left',
                                      borderRight: '1px solid #E2E8F0',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '34px' }}>
                                      <div style={{ fontWeight: 700, fontSize: '11px', color: '#0F172A', lineHeight: 1.25 }}>
                                        {displayName}
                                      </div>
                                      <div style={{ fontSize: '9.5px', color: '#64748B', marginTop: '2px', lineHeight: 1.2 }}>
                                        {row.partnerName || row.category}
                                      </div>
                                    </div>
                                  </td>

                                  {/* Cột 3: QUY CÁCH ĐÓNG GÓI */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 8px',
                                      textAlign: 'center',
                                      borderRight: '1px solid #E2E8F0',
                                      verticalAlign: 'middle',
                                      fontSize: '10.5px',
                                      color: '#334155',
                                      fontWeight: 600,
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '34px' }}>
                                      {dynamicPackagingSpec}
                                    </div>
                                  </td>

                                  {/* Cột 4: GIÁ NIÊM YẾT */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 8px',
                                      textAlign: 'right',
                                      borderRight: '1px solid #E2E8F0',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minHeight: '34px' }}>
                                      <span style={{ fontWeight: 600, fontSize: '11px', color: '#166534', fontFamily: 'monospace' }}>
                                        {formatThousandNumber(retail)} ₫
                                      </span>
                                    </div>
                                  </td>

                                  {/* Cột 5: ĐƠN GIÁ BÁO ÁP DỤNG */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 8px',
                                      textAlign: 'right',
                                      borderRight: '1px solid #E2E8F0',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '34px' }}>
                                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#991B1B', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                        {formatThousandNumber(appliedSinglePrice)} ₫
                                      </div>
                                      {isMultiCarton && (
                                        <div style={{ fontSize: '8.5px', color: '#475569', fontWeight: 400, marginTop: '2px', lineHeight: 1.2, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                          (~ {formatThousandNumber(thungSinglePrice)} {isEn ? '₫/carton' : 'đ/thùng'})
                                        </div>
                                      )}
                                    </div>
                                  </td>

                                  {/* Cột 6: MỨC LỜI / TIẾT KIỆM */}
                                  <td
                                    valign="middle"
                                    style={{
                                      padding: '7px 8px',
                                      textAlign: 'right',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minHeight: '34px' }}>
                                      {priceMode === 'custom' ? (
                                        <span style={{ fontSize: '10.5px', color: '#B45309', fontWeight: 700, fontFamily: 'monospace' }}>
                                          {singleSavings > 0 ? `(-) ${formatThousandNumber(singleSavings)} ₫ (-${singleMarginPct}%)` : '-'}
                                        </span>
                                      ) : (
                                        <span style={{ fontSize: '10.5px', color: '#15803D', fontWeight: 700, fontFamily: 'monospace' }}>
                                          {singleSavings > 0 ? `(+) ${formatThousandNumber(singleSavings)} ₫ (${singleMarginPct.toFixed(1)}%)` : '-'}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                </>
                              )}
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
              onClick={handleExecuteExport}
              className={`px-4 py-2 rounded-xl text-white font-bold flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50 transition-all active:scale-95 ${
                exportFormat === 'excel'
                  ? 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-900/20'
                  : exportFormat === 'word'
                  ? 'bg-blue-700 hover:bg-blue-800 shadow-blue-900/20'
                  : 'bg-red-600 hover:bg-red-700 shadow-red-900/20'
              }`}
            >
              {exportFormat === 'excel' ? (
                <FileSpreadsheet className="w-4 h-4" />
              ) : exportFormat === 'word' ? (
                <FileText className="w-4 h-4" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>
                {exportFormat === 'excel'
                  ? isEn
                    ? 'Export Excel (.XLS) Now'
                    : 'Xuất File Excel (.XLS) Ngay'
                  : exportFormat === 'word'
                  ? isEn
                    ? 'Export Word (.DOC) Now'
                    : 'Xuất File Word (.DOC) Ngay'
                  : isEn
                  ? 'Download PDF Quote Now'
                  : 'Tải Báo Giá PDF Ngay'}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

