import React, { useState, useRef, useMemo } from 'react';
import {
  FileText,
  Download,
  Printer,
  X,
  CheckCircle2,
  Filter,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { AdminProductFinancialItem } from '../utils/productStore';
import {
  COMPANY_INFO,
  formatThousandNumber,
  extractQuotationData,
  paginateQuotationRows,
  generatePdfFromPageElements,
} from '../utils/quotationPdfExport';

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
}

export const QuotationPdfModal: React.FC<QuotationPdfModalProps> = ({
  isOpen,
  onClose,
  allProducts,
  filteredProducts,
  unsavedEdits,
  currentPartnerFilter,
}) => {
  // V218 Requirement 3: Logic Filter - Mặc định chỉ xuất các sản phẩm đang được lọc trên màn hình. Nếu chọn "Tất cả" thì xuất toàn bộ.
  const [exportScope, setExportScope] = useState<'filtered' | 'all'>('filtered');
  const [recipientName, setRecipientName] = useState('Quý Đối Tác / Đại Lý / Khách Hàng');
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
        alert('Không tìm thấy dữ liệu trang báo giá để xuất.');
        return;
      }

      const filename = `Bao-Gia-G-ROOSTER-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}.pdf`;

      await generatePdfFromPageElements(pageElements, filename, (current, total) => {
        setExportProgress({ current, total });
      });

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 5000);
    } catch (err: unknown) {
      console.error('Lỗi khi xuất PDF Báo Giá:', err);
      const errMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert(`Không thể xuất file PDF: ${errMsg}`);
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
            MODAL HEADER: Controls, Scope Selector, Export Button
           ========================================================================= */}
        <div className="px-5 py-4 bg-stone-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <FileText className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-heading font-bold text-white tracking-wide">
                  XUẤT BÁO GIÁ PDF CHUẨN MẪU G-ROOSTER
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-mono font-black uppercase">
                  V218
                </span>
              </div>
              <p className="text-xs text-stone-400">
                G-ROOSTER CO.,LTD · MST: 0319153593 · Cấu trúc bảng chuẩn mẫu kèm quyền lợi Đại lý lời
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              disabled={isExporting}
              onClick={handleDownloadPdf}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-900/30 transition-all cursor-pointer disabled:opacity-50"
              title="Xuất và tải file PDF báo giá chính thức"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>
                    {exportProgress
                      ? `Đang xuất trang ${exportProgress.current}/${exportProgress.total}...`
                      : 'Đang tạo PDF...'}
                  </span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>TẢI FILE BÁO GIÁ PDF</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isExporting}
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-stone-700"
              title="In trực tiếp từ trình duyệt"
            >
              <Printer className="w-4 h-4 text-stone-300" />
              <span className="hidden sm:inline">In Báo Giá</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer ml-1"
              aria-label="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            CONFIG BAR: Scope (Filtered vs All), Recipient
           ========================================================================= */}
        <div className="px-5 py-3 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Scope Selector: Filtered (default) vs All */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-stone-700 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-stone-500" />
                Phạm vi xuất:
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
                  title="Chỉ xuất các sản phẩm đang được lọc trên màn hình Admin"
                >
                  Theo bộ lọc màn hình ({filteredProducts.length} SP)
                </button>
                <button
                  type="button"
                  onClick={() => setExportScope('all')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    exportScope === 'all'
                      ? 'bg-[#143A24] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Xuất toàn bộ 133 sản phẩm trong danh mục"
                >
                  Tất cả ({allProducts.length} SP)
                </button>
              </div>
            </div>

            {/* Recipient */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-stone-700">Kính gửi:</span>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Tên đối tác / Doanh nghiệp..."
                className="px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#143A24] w-48 sm:w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono">
            <span>Mã: <strong className="text-stone-700">{quotationCode}</strong></span>
            <span>·</span>
            <span>Tổng: <strong className="text-stone-700">{paginatedPages.length} trang A4</strong></span>
          </div>
        </div>

        {/* Success Alert Banner */}
        {exportSuccess && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2 flex items-center justify-between text-xs text-emerald-800 animate-in slide-in-from-top-2 duration-200 shrink-0">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Đã xuất và tải xuống file Báo Giá PDF thành công! Vui lòng kiểm tra thư mục Downloads trên thiết bị.</span>
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
                    padding: '30px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid #CBD5E1',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  }}
                >
                  {/* TOP SECTION */}
                  <div>
                    {/* PAGE 1: FULL CORPORATE HEADER WITH LOGO, MST, HOTLINE, ADDRESS */}
                    {isFirstPage ? (
                      <div style={{ paddingBottom: '14px', marginBottom: '14px', borderBottom: '2px solid #143A24' }}>
                        {/* Row 1: Company Logo + Full Business Info */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', paddingBottom: '12px' }}>
                          {/* Left: G-ROOSTER Logo on Pure White Flat Box */}
                          <div
                            style={{
                              backgroundColor: '#FFFFFF',
                              width: '135px',
                              height: '75px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '5px',
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
                                maxHeight: '100%',
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

                          {/* Right: Company Legal Information */}
                          <div style={{ textAlign: 'right', color: '#1E293B', fontSize: '11px', lineHeight: 1.35 }}>
                            <div style={{ fontSize: '17px', fontWeight: 900, color: '#143A24', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                              {COMPANY_INFO.companyName}
                            </div>
                            <div style={{ fontSize: '10.5px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
                              {COMPANY_INFO.companyNameEn}
                            </div>
                            <div>
                              <strong>Mã số thuế (MST):</strong>{' '}
                              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0F172A' }}>{COMPANY_INFO.taxCode}</span>
                            </div>
                            <div>
                              <strong>Hotline &amp; Zalo:</strong>{' '}
                              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#143A24' }}>
                                {COMPANY_INFO.hotlines.join(' · ')}
                              </span>
                            </div>
                            <div style={{ color: '#475569' }}>
                              {COMPANY_INFO.address}
                            </div>
                            <div style={{ color: '#64748B' }}>
                              Website: <strong style={{ color: '#334155' }}>{COMPANY_INFO.website}</strong> · Email: {COMPANY_INFO.email}
                            </div>
                          </div>
                        </div>

                        {/* Gold accent line */}
                        <div style={{ height: '2px', width: '100%', background: 'linear-gradient(to right, #D4AF37, #143A24, #D4AF37)', margin: '6px 0 10px 0' }} />

                        {/* Document Title Banner */}
                        <div style={{ textAlign: 'center', paddingTop: '4px', paddingBottom: '4px' }}>
                          <h2 style={{ fontSize: '19px', fontWeight: 900, color: '#143A24', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
                            BẢNG BÁO GIÁ SẢN PHẨM &amp; NÔNG SẢN CAO CẤP
                          </h2>
                          <div style={{ fontSize: '10.5px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '3px' }}>
                            Áp dụng cho Đối tác B2B, Chuỗi F&amp;B, Đại lý &amp; Khách sỉ toàn quốc
                          </div>
                        </div>

                        {/* Quotation Meta Row */}
                        <div style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                          <div>
                            <span style={{ color: '#64748B' }}>Kính gửi:</span>{' '}
                            <strong style={{ color: '#0F172A', textTransform: 'uppercase', fontWeight: 700 }}>
                              {recipientName || 'Quý Khách Hàng / Đối Tác'}
                            </strong>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'monospace', color: '#475569' }}>
                            <span>
                              Ngày lập: <strong style={{ color: '#0F172A' }}>{formattedDate}</strong>
                            </span>
                            <span>·</span>
                            <span>
                              Mã BG: <strong style={{ color: '#143A24' }}>{quotationCode}</strong>
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
                          <span style={{ color: '#475569' }}>BẢNG BÁO GIÁ SẢN PHẨM (Mã: {quotationCode})</span>
                        </div>
                        <div style={{ fontFamily: 'monospace', color: '#64748B', fontSize: '10px' }}>
                          Hotline: {COMPANY_INFO.hotlines[0]} · MST: {COMPANY_INFO.taxCode}
                        </div>
                      </div>
                    )}

                    {/* =========================================================================
                        V218 TABLE: CHUẨN MẪU G-ROOSTER (6 CỘT CHÍNH XÁC Y HỆT HÌNH 2)
                        - Cột 1: STT
                        - Cột 2: Tên sản phẩm & Quy cách (Tên in đậm, quy cách in nhỏ ở dưới)
                        - Cột 3: Giá bán lẻ niêm yết (Hiển thị MÀU XANH LÁ)
                        - Cột 4, 5, 6: Sỉ Cấp 1, Cấp 2, Cấp 3 (Đơn giá MÀU ĐỎ ĐẬM + "Đại lý lời: X (Y%)")
                       ========================================================================= */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', border: '1px solid #CBD5E1' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#143A24', color: '#FFFFFF' }}>
                          <th style={{ width: '4.5%', padding: '8px 4px', textAlign: 'center', fontWeight: 700, border: '1px solid #0D2718', fontSize: '10.5px' }}>
                            STT
                          </th>
                          <th style={{ width: '35.5%', padding: '8px 10px', textAlign: 'left', fontWeight: 700, border: '1px solid #0D2718', fontSize: '11px' }}>
                            TÊN SẢN PHẨM &amp; QUY CÁCH
                          </th>
                          <th style={{ width: '15%', padding: '8px 8px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#86EFAC', fontSize: '11px' }}>
                            GIÁ BÁN LẺ NIÊM YẾT
                          </th>
                          <th style={{ width: '15%', padding: '8px 8px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#FECACA', fontSize: '11px' }}>
                            SỈ CẤP 1
                          </th>
                          <th style={{ width: '15%', padding: '8px 8px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#FECACA', fontSize: '11px' }}>
                            SỈ CẤP 2
                          </th>
                          <th style={{ width: '15%', padding: '8px 8px', textAlign: 'right', fontWeight: 700, border: '1px solid #0D2718', color: '#FECACA', fontSize: '11px' }}>
                            SỈ CẤP 3
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

                          // V219: Dòng quy đổi giá trị theo thùng: (~ [Giá trị] đ/thùng)
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

                          return (
                            <tr
                              key={row.id}
                              style={{
                                backgroundColor: isEven ? '#FFFFFF' : '#F8FAFC',
                                borderBottom: '1px solid #E2E8F0',
                              }}
                            >
                              {/* Cột 1: STT */}
                              <td style={{ padding: '5px 4px', textAlign: 'center', fontFamily: 'monospace', color: '#475569', borderRight: '1px solid #E2E8F0', fontSize: '10.5px', verticalAlign: 'middle' }}>
                                {row.index}
                              </td>

                              {/* Cột 2: Tên sản phẩm & Quy cách (In đậm tên, quy cách chữ nhỏ ở dưới y hệt Hình 2) */}
                              <td style={{ padding: '5px 8px', textAlign: 'left', borderRight: '1px solid #E2E8F0', verticalAlign: 'middle' }}>
                                <div style={{ fontWeight: 700, fontSize: '11px', color: '#0F172A', lineHeight: 1.25 }}>
                                  {row.name}
                                </div>
                                <div style={{ fontSize: '9.5px', color: '#64748B', marginTop: '2px', lineHeight: 1.2 }}>
                                  {row.unit}
                                </div>
                              </td>

                              {/* Cột 3: Giá bán lẻ niêm yết (Hiển thị MÀU XANH LÁ) */}
                              <td style={{ padding: '5px 8px', textAlign: 'right', borderRight: '1px solid #E2E8F0', verticalAlign: 'middle' }}>
                                <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#166534', fontFamily: 'monospace' }}>
                                  {formatThousandNumber(retail)} ₫
                                </div>
                              </td>

                              {/* Cột 4: Sỉ Cấp 1 (Đơn giá MÀU ĐỎ ĐẬM, phía dưới có "Đại lý lời: [Số tiền lời] ([%])" và "(~ [Giá trị] đ/thùng)") */}
                              <td style={{ padding: '5px 6px', textAlign: 'right', borderRight: '1px solid #E2E8F0', verticalAlign: 'middle' }}>
                                <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#991B1B', fontFamily: 'monospace' }}>
                                  {formatThousandNumber(row.wholesale1Price)} ₫
                                </div>
                                <div style={{ fontSize: '8.5px', color: '#15803D', fontWeight: 600, marginTop: '1px', lineHeight: 1.1 }}>
                                  Đại lý lời: {formatThousandNumber(profit1)} ₫ ({marginPct1.toFixed(1)}%)
                                </div>
                                {isThungProduct && (
                                  <div style={{ fontSize: '8.5px', color: '#475569', fontWeight: 500, marginTop: '1px', lineHeight: 1.1, fontFamily: 'monospace' }}>
                                    (~ {formatThousandNumber(thungPrice1)} đ/thùng)
                                  </div>
                                )}
                              </td>

                              {/* Cột 5: Sỉ Cấp 2 (Đơn giá MÀU ĐỎ ĐẬM, phía dưới có "Đại lý lời: [Số tiền lời] ([%])" và "(~ [Giá trị] đ/thùng)") */}
                              <td style={{ padding: '5px 6px', textAlign: 'right', borderRight: '1px solid #E2E8F0', verticalAlign: 'middle' }}>
                                <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#991B1B', fontFamily: 'monospace' }}>
                                  {formatThousandNumber(row.wholesale2Price)} ₫
                                </div>
                                <div style={{ fontSize: '8.5px', color: '#15803D', fontWeight: 600, marginTop: '1px', lineHeight: 1.1 }}>
                                  Đại lý lời: {formatThousandNumber(profit2)} ₫ ({marginPct2.toFixed(1)}%)
                                </div>
                                {isThungProduct && (
                                  <div style={{ fontSize: '8.5px', color: '#475569', fontWeight: 500, marginTop: '1px', lineHeight: 1.1, fontFamily: 'monospace' }}>
                                    (~ {formatThousandNumber(thungPrice2)} đ/thùng)
                                  </div>
                                )}
                              </td>

                              {/* Cột 6: Sỉ Cấp 3 (Đơn giá MÀU ĐỎ ĐẬM, phía dưới có "Đại lý lời: [Số tiền lời] ([%])" và "(~ [Giá trị] đ/thùng)") */}
                              <td style={{ padding: '5px 6px', textAlign: 'right', verticalAlign: 'middle' }}>
                                <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#991B1B', fontFamily: 'monospace' }}>
                                  {formatThousandNumber(row.wholesale3Price)} ₫
                                </div>
                                <div style={{ fontSize: '8.5px', color: '#15803D', fontWeight: 600, marginTop: '1px', lineHeight: 1.1 }}>
                                  Đại lý lời: {formatThousandNumber(profit3)} ₫ ({marginPct3.toFixed(1)}%)
                                </div>
                                {isThungProduct && (
                                  <div style={{ fontSize: '8.5px', color: '#475569', fontWeight: 500, marginTop: '1px', lineHeight: 1.1, fontFamily: 'monospace' }}>
                                    (~ {formatThousandNumber(thungPrice3)} đ/thùng)
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {/* V219: Ghi chú quy cách mua sỉ rõ ràng */}
                    <div style={{ marginTop: '8px', padding: '5px 8px', backgroundColor: '#F8FAFC', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '9px', color: '#334155', lineHeight: 1.35, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <strong style={{ color: '#143A24', textTransform: 'uppercase', fontSize: '9px' }}>* Ghi chú quy cách mua sỉ:</strong>
                        <span>• <strong>Matcha:</strong> Sỉ theo KG (Cấp 1: 10-30kg, Cấp 2: 30-100kg, Cấp 3: &gt;100kg).</span>
                      </div>
                      <div>
                        <span>• <strong>Trà Cascara &amp; Xạ Đen:</strong> Sỉ theo THÙNG (Cấp 1: 10-30 thùng, Cấp 2: 30-100 thùng, Cấp 3: &gt;100 thùng).</span>
                      </div>
                    </div>

                    {/* LAST PAGE: CLOSING TERMS & OFFICIAL SIGNATURE BLOCK */}
                    {isLastPage && (
                      <div style={{ marginTop: '14px', paddingTop: '8px', borderTop: '1px solid #CBD5E1', fontSize: '10.5px', lineHeight: 1.4 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
                          {/* Terms & Notes */}
                          <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', color: '#475569' }}>
                            <div style={{ fontWeight: 700, color: '#143A24', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.05em', marginBottom: '3px' }}>
                              📌 CHÍNH SÁCH ĐỐI TÁC &amp; ĐIỀU KHOẢN THƯƠNG MẠI
                            </div>
                            <div style={{ fontSize: '9.5px', lineHeight: 1.35 }}>
                              <div>1. Đơn giá trên là giá xuất kho tại Quận 1, TP. Hồ Chí Minh.</div>
                              <div>2. Cấp sỉ 1, 2, 3 được hệ thống tự động áp dụng theo khối lượng hoặc số lượng thùng đóng gói thực tế.</div>
                              <div>3. Toàn bộ sản phẩm đạt chuẩn VSATTP, HACCP, ISO 22000. Hỗ trợ xuất hóa đơn VAT điện tử đầy đủ.</div>
                              <div>4. Báo giá có hiệu lực trong vòng 30 ngày kể từ ngày ban hành hoặc khi có văn bản cập nhật mới.</div>
                              <div>5. <strong>Quy cách sỉ:</strong> Matcha sỉ theo KG (Cấp 1: 10-30kg, Cấp 2: 30-100kg, Cấp 3: &gt;100kg); Trà Cascara &amp; Xạ Đen sỉ theo THÙNG (Cấp 1: 10-30 thùng, Cấp 2: 30-100 thùng, Cấp 3: &gt;100 thùng).</div>
                            </div>
                          </div>

                          {/* Official Corporate Signature & Stamp Area */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center' }}>
                            <div>
                              <div style={{ fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', fontSize: '11px' }}>
                                ĐẠI DIỆN CÔNG TY TNHH G-ROOSTER
                              </div>
                              <div style={{ fontSize: '9.5px', color: '#64748B', fontStyle: 'italic' }}>
                                (Ký, ghi rõ họ tên và đóng dấu)
                              </div>
                            </div>

                            <div style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ color: '#94A3B8', fontSize: '11px', fontStyle: 'italic' }}>
                                [Đã ký &amp; Phê duyệt điện tử qua hệ thống B2B]
                              </span>
                            </div>

                            <div style={{ borderTop: '1px solid #CBD5E1', width: '180px', paddingTop: '4px' }}>
                              <div style={{ fontWeight: 700, color: '#143A24', textTransform: 'uppercase', fontSize: '11px' }}>
                                BAN GIÁM ĐỐC KINH DOANH
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
                      Cảm ơn Quý đối tác đã tin tưởng và đồng hành cùng G-ROOSTER!
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span>Ngày giờ xuất: <strong style={{ fontFamily: 'monospace', color: '#334155' }}>{formattedDateTime}</strong></span>
                      <span>·</span>
                      <span>
                        Trang <strong style={{ fontFamily: 'monospace', color: '#0F172A' }}>{pageNumber}</strong> / {totalPages}
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
              Báo giá tự động trích xuất theo thời gian thực từ kho dữ liệu Google Firebase &amp; Bảng giá nội bộ G-ROOSTER.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-semibold cursor-pointer active:scale-95 transition-all"
            >
              Đóng
            </button>
            <button
              type="button"
              disabled={isExporting}
              onClick={handleDownloadPdf}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold flex items-center gap-1.5 shadow-md shadow-red-900/20 cursor-pointer disabled:opacity-50 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Tải Báo Giá PDF Ngay</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
