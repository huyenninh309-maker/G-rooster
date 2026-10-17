/**
 * G-ROOSTER CO.,LTD - QUOTATION PDF EXPORT ENGINE (V218)
 * -----------------------------------------------------------
 * Tự động hóa quy trình xuất file Báo Giá PDF chuyên nghiệp chuẩn mẫu G-ROOSTER:
 * 1. Phía trên cùng:
 *    - Logo G-ROOSTER sắc nét trên khung trắng phẳng
 *    - Tên công ty: CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ G-ROOSTER (G-ROOSTER TRADING SERVICE CO., LTD)
 *    - MST: 0319153593
 *    - Hotline & Zalo: 0961 525 450 - 0938 7979 04
 *    - Địa chỉ: Kho & Trụ sở Quận 1, TP. Hồ Chí Minh
 * 2. Cấu trúc bảng Báo Giá chuẩn mẫu:
 *    - Cột 1: STT
 *    - Cột 2: Tên sản phẩm & Quy cách (Tên in đậm ở trên, quy cách in chữ nhỏ ở dưới)
 *    - Cột 3: Giá bán lẻ niêm yết (Hiển thị MÀU XANH LÁ)
 *    - Cột 4, 5, 6: Sỉ Cấp 1, Cấp 2, Cấp 3 (Đơn giá hiển thị MÀU ĐỎ ĐẬM)
 *    - Nội dung ô Giá Sỉ: Phía dưới đơn giá sỉ có dòng chữ: "Đại lý lời: [Số tiền lời] ([%])"
 * 3. Chân trang:
 *    - Dòng chữ: "Cảm ơn Quý đối tác"
 *    - Ngày giờ xuất báo giá chính xác (dd/mm/yyyy hh:mm:ss)
 *    - Đánh số trang tự động (Trang X/Y)
 * 4. Khắc phục triệt để lỗi OKLCH:
 *    - Loại bỏ và chuyển đổi toàn bộ hàm màu oklch của Tailwind v4 trước khi html2canvas phân tích.
 */

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { AdminProductFinancialItem } from './productStore';

export interface QuotationProductRow {
  index: number;
  id: string;
  name: string;
  unit: string;
  category: string;
  partnerName: string;
  retailPrice: number;
  wholesale1Price: number;
  wholesale2Price: number;
  wholesale3Price: number;
  unitsPerWholesale: number;
  wholesaleUnit: string;
}

export interface QuotationCompanyInfo {
  companyName: string;
  companyNameEn: string;
  taxCode: string;
  hotlines: string[];
  address: string;
  addressEn: string;
  email: string;
  website: string;
  standards: string;
  standardsEn: string;
}

export const COMPANY_INFO: QuotationCompanyInfo = {
  companyName: 'CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ G-ROOSTER',
  companyNameEn: 'G-ROOSTER TRADING SERVICE CO., LTD',
  taxCode: '0319153593',
  hotlines: ['0961 525 450', '0938 7979 04'],
  address: 'Trụ sở & Tổng kho: 44 Trần Đình Xu, Phường Cầu Ông Lãnh, Quận 1, TP. Hồ Chí Minh',
  addressEn: 'Headquarters & Export Hub: 44 Tran Dinh Xu St., Cau Ong Lanh Ward, Dist. 1, Ho Chi Minh City',
  email: 'contact@g-rooster.com',
  website: 'https://g-rooster.com/',
  standards: 'Tiêu chuẩn kiểm định: VSATTP · HACCP · ISO 22000 · Chứng nhận nguồn gốc xuất xứ COA',
  standardsEn: 'Food Safety Standards: HACCP · ISO 22000 · COA Traceability Certified',
};

/**
 * Định dạng số với dấu phẩy phân cách hàng nghìn (150000 -> 150,000)
 */
export const formatThousandNumber = (val: number | undefined | null): string => {
  if (val === undefined || val === null || isNaN(val)) return '0';
  return Math.max(0, Math.round(val)).toLocaleString('en-US');
};

/**
 * Chuyển đổi chuỗi CSS chứa oklch(...) sang rgb(...) hoặc rgba(...)
 * Giải quyết triệt để lỗi "Attempting to parse an unsupported color function 'oklch'" trong html2canvas
 */
export function replaceOklchInString(cssText: string): string {
  if (!cssText || !cssText.includes('oklch')) return cssText;

  const oklchRegex = /oklch\(\s*([^/)\s]+)\s+([^/)\s]+)\s+([^/)\s]+)(?:\s*\/\s*([^/)\s]+))?\s*\)/gi;

  function toSrgb(c: number): number {
    const abs = Math.abs(c);
    const sign = c < 0 ? -1 : 1;
    const val = abs <= 0.0031308 ? 12.92 * abs : 1.055 * Math.pow(abs, 1 / 2.4) - 0.055;
    return Math.min(255, Math.max(0, Math.round(sign * val * 255)));
  }

  return cssText.replace(oklchRegex, (_match, lStr, cStr, hStr, aStr) => {
    try {
      const L = lStr.endsWith('%') ? parseFloat(lStr) / 100 : parseFloat(lStr);
      const C = parseFloat(cStr);
      const h = parseFloat(hStr);
      if (isNaN(L) || isNaN(C) || isNaN(h)) return 'rgb(0, 0, 0)';

      let alpha = 1;
      if (aStr) {
        alpha = aStr.endsWith('%') ? parseFloat(aStr) / 100 : parseFloat(aStr);
        if (isNaN(alpha)) alpha = 1;
      }

      const hRad = (h * Math.PI) / 180;
      const a_val = C * Math.cos(hRad);
      const b_val = C * Math.sin(hRad);

      const l_ = L + 0.3963377774 * a_val + 0.2158037573 * b_val;
      const m_ = L - 0.1055613458 * a_val - 0.0638541728 * b_val;
      const s_ = L - 0.0894841775 * a_val - 1.2914855480 * b_val;

      const l = l_ ** 3;
      const m = m_ ** 3;
      const s = s_ ** 3;

      const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
      const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
      const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

      const red = toSrgb(rLin);
      const green = toSrgb(gLin);
      const blue = toSrgb(bLin);

      if (alpha < 1) {
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      }
      return `rgb(${red}, ${green}, ${blue})`;
    } catch {
      return 'rgb(0, 0, 0)';
    }
  });
}

/**
 * Trích xuất danh sách sản phẩm phục vụ xuất Báo Giá từ financialsList + unsavedEdits
 */
export const extractQuotationData = (
  items: AdminProductFinancialItem[],
  unsavedEdits: Record<string, { retail?: number; wholesale1?: number; wholesale2?: number; wholesale3?: number }> = {}
): QuotationProductRow[] => {
  return items.map((item, idx) => {
    const edit = unsavedEdits[item.id] || {};
    const retail = edit.retail !== undefined ? edit.retail : item.prices.retail;
    const ws1 = edit.wholesale1 !== undefined ? edit.wholesale1 : item.prices.wholesale1;
    const ws2 = edit.wholesale2 !== undefined ? edit.wholesale2 : item.prices.wholesale2;
    const ws3 = edit.wholesale3 !== undefined ? edit.wholesale3 : item.prices.wholesale3;

    // V272: Quản trị định lượng linh hoạt & số lượng/thùng động
    let upw = item.quantityPerCarton || item.unitsPerWholesale || 1;
    let unit = item.retailUnit?.trim() || item.unit?.trim() || 'Hộp';

    // Chỉ dùng fallback nếu sản phẩm chưa có cấu hình số lượng thùng
    if (!item.quantityPerCarton && !item.unitsPerWholesale) {
      if (item.id === 'vtn-tra-xa-den' || (item.name && item.name.includes('Xạ Đen'))) {
        upw = 30;
        if (!item.unit && !item.retailUnit) unit = 'Hộp 150g';
      } else if (item.id.startsWith('vtn-cascara-') || (item.name && item.name.includes('Cascara'))) {
        upw = 24;
        if (!item.unit && !item.retailUnit) unit = 'Hộp 70g';
      }
    }

    const cleanName = (item.name || '')
      .replace(/\b(G-ROOSTER|G-Rooster)\b/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();

    return {
      index: idx + 1,
      id: item.id,
      name: cleanName,
      unit,
      category: item.category || 'Nông sản',
      partnerName: item.partnerName || 'G-ROOSTER',
      retailPrice: retail,
      wholesale1Price: ws1,
      wholesale2Price: ws2,
      wholesale3Price: ws3,
      unitsPerWholesale: upw,
      wholesaleUnit: item.wholesaleUnit || (upw > 1 ? 'THÙNG' : 'HỘP'),
    };
  });
};

/**
 * Chia danh sách sản phẩm thành các trang A4 logic để tránh bị cắt chữ ngang dòng
 * - Trang 1 có Header công ty + Tiêu đề nên chứa ~13 dòng (mỗi dòng 3 hàng: Tên/Quy cách + Giá/Lợi nhuận + Quy đổi thùng)
 * - Các trang sau chứa ~17 dòng
 */
export const paginateQuotationRows = (
  rows: QuotationProductRow[],
  rowsFirstPage: number = 13,
  rowsPerPage: number = 17
): QuotationProductRow[][] => {
  if (rows.length === 0) return [[]];

  const pages: QuotationProductRow[][] = [];
  let currentIndex = 0;

  // Trang đầu tiên: chứa Header công ty + Thông tin Báo giá
  const firstChunk = rows.slice(0, rowsFirstPage);
  pages.push(firstChunk);
  currentIndex += rowsFirstPage;

  // Các trang tiếp theo: Tự động cân đối trang cuối để tránh tràn dòng và co chữ
  while (currentIndex < rows.length) {
    const remaining = rows.length - currentIndex;
    // Nếu sắp đến trang cuối (còn từ 18 đến 28 dòng): Chia đều để trang cuối chứa tối đa 12 dòng, đủ chỗ cho Chữ ký & Điều khoản
    if (remaining > 17 && remaining <= 28) {
      const thisPageCount = Math.ceil(remaining / 2);
      const nextChunk = rows.slice(currentIndex, currentIndex + thisPageCount);
      pages.push(nextChunk);
      currentIndex += thisPageCount;
    } else {
      const nextChunk = rows.slice(currentIndex, currentIndex + rowsPerPage);
      pages.push(nextChunk);
      currentIndex += rowsPerPage;
    }
  }

  return pages;
};

/**
 * Xuất file PDF Báo Giá từ mảng các phần tử HTML trang A4
 * Tự động vô hiệu hóa toàn bộ oklch trong clonedDoc để html2canvas chạy mượt mà 100%
 */
export const generatePdfFromPageElements = async (
  pageElements: HTMLElement[],
  filename: string,
  onProgress?: (current: number, total: number) => void
): Promise<void> => {
  if (pageElements.length === 0) {
    throw new Error('Không có dữ liệu trang để xuất PDF.');
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const totalPages = pageElements.length;

  for (let i = 0; i < totalPages; i++) {
    if (onProgress) {
      onProgress(i + 1, totalPages);
    }

    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }

    const pageEl = pageElements[i];

    const canvas = await html2canvas(pageEl, {
      scale: 2.5, // V251: 2.5x scale (approx 300+ DPI print-ready) for ultra-sharp text, razor-sharp lines and pristine logo
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#FFFFFF',
      logging: false,
      windowWidth: pageEl.scrollWidth || 794,
      windowHeight: pageEl.scrollHeight || 1123,
      onclone: (clonedDoc: Document) => {
        // V218 FIX OKLCH: Loại bỏ toàn bộ <style> từ Tailwind v4 trong cloned iframe
        // để html2canvas không bao giờ gặp hàm màu oklch()
        const oldStyleElements = Array.from(clonedDoc.querySelectorAll('style, link[rel="stylesheet"]'));
        oldStyleElements.forEach((s) => s.remove());

        // V268: Nhúng link Google Font Inter và Montserrat trực tiếp vào cloned document để html2canvas render siêu nét
        const fontLink = clonedDoc.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap';
        clonedDoc.head.appendChild(fontLink);

        // Chèn stylesheet sạch sẽ dành riêng cho PDF với font Inter/Montserrat và 100% màu chuẩn HEX
        const cleanStyle = clonedDoc.createElement('style');
        cleanStyle.id = 'grooster-clean-pdf-style';
        cleanStyle.textContent = `
          * {
            box-sizing: border-box !important;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            background-color: #FFFFFF !important;
            font-family: "Inter", "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
            text-rendering: optimizeLegibility !important;
          }
          .quotation-a4-page {
            width: 794px !important;
            min-height: 1123px !important;
            background-color: #FFFFFF !important;
            color: #0F172A !important;
            padding: 28px 28px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            box-sizing: border-box !important;
            font-family: "Inter", "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          }
          table {
            width: 100% !important;
            border-collapse: collapse !important;
          }
          tr {
            vertical-align: middle !important;
          }
          th, td {
            vertical-align: middle !important;
          }
          tbody tr {
            vertical-align: middle !important;
          }
          tbody td {
            vertical-align: middle !important;
            padding: 7px 8px !important;
          }
          tbody td > div {
            vertical-align: middle !important;
          }
        `;
        clonedDoc.head.appendChild(cleanStyle);

        // V270: Ép thuộc tính 'valign: middle' cho tất cả thẻ th, td bằng DOM an toàn
        const allTableCells = Array.from(clonedDoc.querySelectorAll('th, td'));
        allTableCells.forEach((cell) => {
          cell.setAttribute('valign', 'middle');
        });

        // Quét sạch bất kỳ thuộc tính style nào còn chứa chuỗi oklch
        const allStyledElements = Array.from(clonedDoc.querySelectorAll('[style]'));
        allStyledElements.forEach((el) => {
          const s = el.getAttribute('style');
          if (s && s.includes('oklch')) {
            el.setAttribute('style', replaceOklchInString(s));
          }
        });
      },
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  }

  pdf.save(filename);
};

/**
 * V270: Xuất Báo Giá PDF bằng trực tiếp thư viện jspdf-autotable (An toàn tuyệt đối 100%, không lo treo máy)
 * - styles: { valign: 'middle', halign: 'center', cellPadding: 3 }
 * - columnStyles: { 1: { halign: 'left' } }
 */
export const generatePdfWithAutoTable = (
  products: QuotationProductRow[],
  filename: string,
  isEn: boolean = false,
  recipientName: string = '',
  quotationCode: string = ''
): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const now = new Date();
  const dateStr = isEn
    ? now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    : now.toLocaleDateString('vi-VN');

  // Header công ty
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 58, 36);
  doc.text(
    isEn ? COMPANY_INFO.companyNameEn : COMPANY_INFO.companyName,
    14,
    14
  );

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`MST: ${COMPANY_INFO.taxCode}   |   Hotline: ${COMPANY_INFO.hotlines.join(' - ')}`, 14, 20);
  doc.text(isEn ? COMPANY_INFO.addressEn : COMPANY_INFO.address, 14, 25);
  doc.text(`Website: ${COMPANY_INFO.website}   |   Email: ${COMPANY_INFO.email}`, 14, 30);

  // Đường kẻ phân cách
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.6);
  doc.line(14, 33, 196, 33);

  // Tiêu đề văn bản
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 58, 36);
  doc.text(
    isEn ? 'OFFICIAL B2B PRODUCT PRICE QUOTATION' : 'BANG BAO GIA SAN PHAM VA NONG SAN CAO CAP',
    105,
    41,
    { align: 'center' }
  );

  // Thông tin báo giá
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const toText = `${isEn ? 'Attention / To:' : 'Kinh gui:'} ${recipientName || (isEn ? 'Valued Partner / Distributor' : 'Quy Doi Tac / Dai Ly')}`;
  doc.text(toText, 14, 48);

  const metaRight = `${isEn ? 'Date:' : 'Ngay:'} ${dateStr}   |   ${isEn ? 'Quote No:' : 'Ma BG:'} ${quotationCode}`;
  doc.text(metaRight, 196, 48, { align: 'right' });

  // Cấu hình jspdf-autotable theo chuẩn V270:
  // styles: { valign: 'middle', halign: 'center', cellPadding: 3 }
  // columnStyles: { 1: { halign: 'left' } }
  autoTable(doc, {
    startY: 52,
    head: [[
      isEn ? 'NO.' : 'STT',
      isEn ? 'PRODUCTS & PACKAGING' : 'SAN PHAM & QUY CACH',
      isEn ? 'RETAIL PRICE' : 'GIA BAN LE',
      isEn ? 'TIER 1 WHOLESALE' : 'SI CAP 1',
      isEn ? 'TIER 2 WHOLESALE' : 'SI CAP 2',
      isEn ? 'TIER 3 WHOLESALE' : 'SI CAP 3',
    ]],
    body: products.map((p) => {
      const isMultiCarton = (p.unitsPerWholesale || 1) > 1;
      const qty = p.unitsPerWholesale || 1;
      const p1 = Math.max(0, p.retailPrice - p.wholesale1Price);
      const p2 = Math.max(0, p.retailPrice - p.wholesale2Price);
      const p3 = Math.max(0, p.retailPrice - p.wholesale3Price);

      const specText = isMultiCarton
        ? `${p.name}\n(${p.unit} • ${qty} ${isEn ? 'units/carton' : 'sp/thùng'})`
        : `${p.name}\n(${p.unit})`;

      const retailText = isMultiCarton
        ? `${formatThousandNumber(p.retailPrice)} d\n(~ ${formatThousandNumber(p.retailPrice * qty)} ${isEn ? 'd/carton' : 'd/thung'})`
        : `${formatThousandNumber(p.retailPrice)} d`;

      const ws1Text = isMultiCarton
        ? `${formatThousandNumber(p.wholesale1Price)} d\n(+) ${formatThousandNumber(p1)} d\n(~ ${formatThousandNumber(p.wholesale1Price * qty)} ${isEn ? 'd/carton' : 'd/thung'})`
        : `${formatThousandNumber(p.wholesale1Price)} d\n(+) ${formatThousandNumber(p1)} d`;

      const ws2Text = isMultiCarton
        ? `${formatThousandNumber(p.wholesale2Price)} d\n(+) ${formatThousandNumber(p2)} d\n(~ ${formatThousandNumber(p.wholesale2Price * qty)} ${isEn ? 'd/carton' : 'd/thung'})`
        : `${formatThousandNumber(p.wholesale2Price)} d\n(+) ${formatThousandNumber(p2)} d`;

      const ws3Text = isMultiCarton
        ? `${formatThousandNumber(p.wholesale3Price)} d\n(+) ${formatThousandNumber(p3)} d\n(~ ${formatThousandNumber(p.wholesale3Price * qty)} ${isEn ? 'd/carton' : 'd/thung'})`
        : `${formatThousandNumber(p.wholesale3Price)} d\n(+) ${formatThousandNumber(p3)} d`;

      return [
        p.index,
        specText,
        retailText,
        ws1Text,
        ws2Text,
        ws3Text,
      ];
    }),
    styles: {
      valign: 'middle',
      halign: 'center',
      cellPadding: 5,
      fontSize: 8.5,
      overflow: 'linebreak',
    },
    headStyles: {
      fillColor: [20, 58, 36],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center',
      valign: 'middle',
      cellPadding: 5,
    },
    columnStyles: {
      0: { cellWidth: 12, halign: 'center' },
      1: { halign: 'left', cellWidth: 'auto' },
      2: { cellWidth: 26, halign: 'right' },
      3: { cellWidth: 28, halign: 'right' },
      4: { cellWidth: 28, halign: 'right' },
      5: { cellWidth: 28, halign: 'right' },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  doc.save(filename);
};

export type QuotationPriceMode = 'retail' | 'wholesale1' | 'wholesale2' | 'wholesale3' | 'custom' | 'all';

/**
 * V272: Xuất Báo Giá file EXCEL (.xls) chuẩn bảng chuyên nghiệp như bản PDF:
 * - Bộ font Unicode Inter/Roboto hiển thị tiếng Việt sắc nét 100% không bể chữ
 * - Căn giữa hàng dọc (vertical-align: middle) toàn bộ bảng
 * - Giữ nguyên cấu trúc bảng, nhận diện các mức giá: Giá Lẻ, Sỉ 1, Sỉ 2, Sỉ 3, hoặc Tùy chỉnh %
 */
export const generateQuotationExcel = (
  products: QuotationProductRow[],
  filename: string,
  options: {
    isEn: boolean;
    recipientName?: string;
    quotationCode: string;
    priceMode: QuotationPriceMode;
    customDiscountPercent?: number;
  }
): void => {
  const { isEn, recipientName, quotationCode, priceMode, customDiscountPercent = 8 } = options;
  const now = new Date();
  const dateStr = isEn
    ? now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    : now.toLocaleDateString('vi-VN');

  let priceModeLabel = isEn ? 'Official Retail Price' : 'Bảng Giá Bán Lẻ Niêm Yết';
  if (priceMode === 'wholesale1') priceModeLabel = isEn ? 'Tier 1 Wholesale Price (Distributors / Cafes)' : 'Bảng Giá Sỉ Cấp 1 (Đại lý / Khách quán)';
  else if (priceMode === 'wholesale2') priceModeLabel = isEn ? 'Tier 2 Wholesale Price (Sub-distributors)' : 'Bảng Giá Sỉ Cấp 2 (Đại lý Cấp 2 / NPP)';
  else if (priceMode === 'wholesale3') priceModeLabel = isEn ? 'Tier 3 Wholesale Price (Master Distributors)' : 'Bảng Giá Sỉ Cấp 3 (Tổng kho / Đại lý lớn)';
  else if (priceMode === 'custom') priceModeLabel = isEn ? `Custom B2B Quotation (-${customDiscountPercent}% from Retail)` : `Báo Giá Tùy Chỉnh (Chiết khấu -${customDiscountPercent}% từ Giá Lẻ)`;
  else if (priceMode === 'all') priceModeLabel = isEn ? 'Full Tiered B2B Price Matrix' : 'Bảng Giá Đầy Đủ (Giá Lẻ & Sỉ Cấp 1, 2, 3)';

  // Build rows based on priceMode
  let theadHtml = '';
  if (priceMode === 'all') {
    theadHtml = `
      <tr style="background-color: #143A24; color: #FFFFFF; font-weight: bold; text-align: center; height: 38px;">
        <th style="border: 1px solid #CBD5E1; padding: 8px 6px; vertical-align: middle; width: 45px;">${isEn ? 'NO.' : 'STT'}</th>
        <th style="border: 1px solid #CBD5E1; padding: 8px 10px; vertical-align: middle; text-align: left; width: 260px;">${isEn ? 'PRODUCTS & SPECIFICATIONS' : 'SẢN PHẨM & QUY CÁCH'}</th>
        <th style="border: 1px solid #CBD5E1; padding: 8px 8px; vertical-align: middle; width: 140px;">${isEn ? 'PACKAGING' : 'ĐỊNH LƯỢNG / THÙNG'}</th>
        <th style="border: 1px solid #CBD5E1; padding: 8px 8px; vertical-align: middle; text-align: right; width: 110px;">${isEn ? 'RETAIL (VND)' : 'GIÁ LẺ (VNĐ)'}</th>
        <th style="border: 1px solid #CBD5E1; padding: 8px 8px; vertical-align: middle; text-align: right; width: 110px;">${isEn ? 'WHOLESALE 1' : 'SỈ CẤP 1'}</th>
        <th style="border: 1px solid #CBD5E1; padding: 8px 8px; vertical-align: middle; text-align: right; width: 110px;">${isEn ? 'WHOLESALE 2' : 'SỈ CẤP 2'}</th>
        <th style="border: 1px solid #CBD5E1; padding: 8px 8px; vertical-align: middle; text-align: right; width: 110px;">${isEn ? 'WHOLESALE 3' : 'SỈ CẤP 3'}</th>
        <th style="border: 1px solid #CBD5E1; padding: 8px 8px; vertical-align: middle; text-align: right; width: 130px;">${isEn ? 'CARTON CONVERT' : 'QUY ĐỔI GIÁ THÙNG'}</th>
      </tr>
    `;
  } else {
    theadHtml = `
      <tr style="background-color: #143A24; color: #FFFFFF; font-weight: bold; text-align: center; height: 38px;">
        <th style="border: 1px solid #CBD5E1; padding: 8px 6px; vertical-align: middle; width: 45px;">${isEn ? 'NO.' : 'STT'}</th>
        <th style="border: 1px solid #CBD5E1; padding: 8px 10px; vertical-align: middle; text-align: left; width: 280px;">${isEn ? 'PRODUCTS & SPECIFICATIONS' : 'SẢN PHẨM & QUY CÁCH'}</th>
        <th style="border: 1px solid #CBD5E1; padding: 8px 8px; vertical-align: middle; width: 180px;">${isEn ? 'PACKAGING' : 'QUY CÁCH ĐÓNG GÓI'}</th>
        <th style="border: 1px solid #CBD5E1; padding: 8px 8px; vertical-align: middle; text-align: right; width: 120px;">${isEn ? 'LIST RETAIL (VND)' : 'GIÁ NIÊM YẾT (VNĐ)'}</th>
        <th style="border: 1px solid #CBD5E1; padding: 8px 8px; vertical-align: middle; text-align: right; width: 130px;">${isEn ? 'APPLIED QUOTE (VND)' : 'ĐƠN GIÁ BÁO (VNĐ)'}</th>
        <th style="border: 1px solid #CBD5E1; padding: 8px 8px; vertical-align: middle; text-align: right; width: 130px;">${isEn ? 'DISCOUNT / PROFIT' : 'MỨC LỜI / TIẾT KIỆM'}</th>
        <th style="border: 1px solid #CBD5E1; padding: 8px 8px; vertical-align: middle; text-align: right; width: 140px;">${isEn ? 'CARTON TOTAL' : 'QUY ĐỔI THÙNG'}</th>
      </tr>
    `;
  }

  const tbodyHtml = products
    .map((p, idx) => {
      const isEven = idx % 2 === 0;
      const bg = isEven ? '#FFFFFF' : '#F8FAFC';
      const qty = Math.max(1, Math.round(p.unitsPerWholesale || 1));
      const isMulti = qty > 1;

      // V272 Rule: Qty = 1: [Định lượng], Qty > 1: [Định lượng] | Thùng [Qty] [Định lượng]
      const packagingText = isMulti ? `${p.unit} | ${isEn ? 'Carton' : 'Thùng'} ${qty} ${p.unit}` : p.unit;

      if (priceMode === 'all') {
        const cartonPrice = isMulti ? Math.round(p.wholesale1Price * qty) : p.wholesale1Price;
        return `
          <tr style="background-color: ${bg}; height: 34px;">
            <td style="border: 1px solid #CBD5E1; text-align: center; vertical-align: middle; font-family: monospace;">${p.index}</td>
            <td style="border: 1px solid #CBD5E1; text-align: left; vertical-align: middle; padding: 6px 8px;">
              <strong>${p.name}</strong>
              <div style="font-size: 11px; color: #64748B;">${p.partnerName || p.category}</div>
            </td>
            <td style="border: 1px solid #CBD5E1; text-align: center; vertical-align: middle; font-size: 11px;">${packagingText}</td>
            <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #166534; font-weight: bold; font-family: monospace;">${formatThousandNumber(p.retailPrice)} ₫</td>
            <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #991B1B; font-weight: bold; font-family: monospace;">${formatThousandNumber(p.wholesale1Price)} ₫</td>
            <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #991B1B; font-weight: bold; font-family: monospace;">${formatThousandNumber(p.wholesale2Price)} ₫</td>
            <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #991B1B; font-weight: bold; font-family: monospace;">${formatThousandNumber(p.wholesale3Price)} ₫</td>
            <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #475569; font-size: 11px; font-family: monospace;">${isMulti ? `~ ${formatThousandNumber(cartonPrice)} ₫/thùng` : '-'}</td>
          </tr>
        `;
      }

      // Single tier / custom % calculation
      let appliedPrice = p.retailPrice;
      let profit = 0;
      let marginPct = 0;

      if (priceMode === 'retail') {
        appliedPrice = p.retailPrice;
        profit = 0;
        marginPct = 0;
      } else if (priceMode === 'wholesale1') {
        appliedPrice = p.wholesale1Price;
        profit = Math.max(0, p.retailPrice - p.wholesale1Price);
        marginPct = p.retailPrice > 0 ? (profit / p.retailPrice) * 100 : 0;
      } else if (priceMode === 'wholesale2') {
        appliedPrice = p.wholesale2Price;
        profit = Math.max(0, p.retailPrice - p.wholesale2Price);
        marginPct = p.retailPrice > 0 ? (profit / p.retailPrice) * 100 : 0;
      } else if (priceMode === 'wholesale3') {
        appliedPrice = p.wholesale3Price;
        profit = Math.max(0, p.retailPrice - p.wholesale3Price);
        marginPct = p.retailPrice > 0 ? (profit / p.retailPrice) * 100 : 0;
      } else if (priceMode === 'custom') {
        appliedPrice = Math.round(p.retailPrice * (1 - customDiscountPercent / 100));
        profit = Math.max(0, p.retailPrice - appliedPrice);
        marginPct = customDiscountPercent;
      }

      const thungPrice = isMulti ? Math.round(appliedPrice * qty) : appliedPrice;

      return `
        <tr style="background-color: ${bg}; height: 34px;">
          <td style="border: 1px solid #CBD5E1; text-align: center; vertical-align: middle; font-family: monospace;">${p.index}</td>
          <td style="border: 1px solid #CBD5E1; text-align: left; vertical-align: middle; padding: 6px 8px;">
            <strong>${p.name}</strong>
            <div style="font-size: 11px; color: #64748B;">${p.partnerName || p.category}</div>
          </td>
          <td style="border: 1px solid #CBD5E1; text-align: center; vertical-align: middle; font-size: 11px;">${packagingText}</td>
          <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #166534; font-weight: bold; font-family: monospace;">${formatThousandNumber(p.retailPrice)} ₫</td>
          <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #991B1B; font-weight: bold; font-family: monospace; font-size: 13px;">${formatThousandNumber(appliedPrice)} ₫</td>
          <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #15803D; font-weight: bold; font-size: 11px;">${profit > 0 ? `(+) ${formatThousandNumber(profit)} ₫ (${marginPct.toFixed(1)}%)` : '-'}</td>
          <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #475569; font-size: 11px; font-family: monospace;">${isMulti ? `~ ${formatThousandNumber(thungPrice)} ₫/thùng` : '-'}</td>
        </tr>
      `;
    })
    .join('');

  const excelContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <style>
        body { font-family: 'Inter', 'Roboto', Arial, sans-serif; font-size: 12px; color: #0F172A; }
        table { border-collapse: collapse; width: 100%; }
        th, td { vertical-align: middle !important; }
      </style>
    </head>
    <body>
      <div style="margin-bottom: 12px;">
        <h2 style="color: #143A24; margin: 0 0 4px 0; font-size: 16px;">${isEn ? COMPANY_INFO.companyNameEn : COMPANY_INFO.companyName}</h2>
        <div style="font-size: 11px; color: #475569;">
          MST: <strong>${COMPANY_INFO.taxCode}</strong> | Hotline/Zalo: <strong>${COMPANY_INFO.hotlines.join(' - ')}</strong> | Website: ${COMPANY_INFO.website}
        </div>
        <div style="font-size: 11px; color: #475569; margin-top: 2px;">
          ${isEn ? COMPANY_INFO.addressEn : COMPANY_INFO.address}
        </div>
      </div>
      <div style="border-top: 2px solid #D4AF37; padding-top: 8px; margin-bottom: 12px;">
        <h3 style="color: #143A24; margin: 0 0 4px 0; font-size: 14px; text-transform: uppercase;">
          ${isEn ? 'OFFICIAL B2B PRODUCT PRICE QUOTATION' : 'BẢNG BÁO GIÁ SẢN PHẨM & NÔNG SẢN CAO CẤP'}
        </h3>
        <div style="font-size: 11px; color: #1E293B;">
          <strong>${isEn ? 'Attention / To:' : 'Kính gửi:'}</strong> ${recipientName || (isEn ? 'Valued Partner / Distributor' : 'Quý Đối Tác / Đại Lý')}
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <strong>${isEn ? 'Quote No:' : 'Mã Báo Giá:'}</strong> ${quotationCode}
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <strong>${isEn ? 'Date:' : 'Ngày:'}</strong> ${dateStr}
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <strong style="color: #991B1B;">${priceModeLabel}</strong>
        </div>
      </div>
      <table>
        <thead>
          ${theadHtml}
        </thead>
        <tbody>
          ${tbodyHtml}
        </tbody>
      </table>
      <div style="margin-top: 14px; font-size: 11px; color: #64748B;">
        <p><em>* ${isEn ? 'Note: All products are certified under HACCP, ISO 22000, Food Safety Standards. Delivery terms & contracts strictly follow G-ROOSTER commercial policies.' : 'Ghi chú: Toàn bộ sản phẩm đạt chứng nhận VSATTP, HACCP, ISO 22000, kiểm định COA đầy đủ. Chính sách giao hàng và hợp đồng tuân thủ điều khoản G-ROOSTER.'}</em></p>
        <p><strong>CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ G-ROOSTER - TRÂN TRỌNG CẢM ƠN QUÝ KHÁCH HÀNG!</strong></p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\uFEFF' + excelContent], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.xls') ? filename : `${filename}.xls`;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * V272: Xuất Báo Giá file WORD (.doc) chuẩn mẫu văn bản công ty chuyên nghiệp:
 * - Dùng bộ font Unicode Inter/Roboto, giữ nguyên định dạng bảng và màu sắc chuẩn nhận diện
 * - Căn giữa hàng dọc (vertical-align: middle) cho toàn bộ các ô
 * - Đảm bảo mở bằng Microsoft Word giữ đúng 100% bố cục trang nhã
 */
export const generateQuotationWord = (
  products: QuotationProductRow[],
  filename: string,
  options: {
    isEn: boolean;
    recipientName?: string;
    quotationCode: string;
    priceMode: QuotationPriceMode;
    customDiscountPercent?: number;
  }
): void => {
  const { isEn, recipientName, quotationCode, priceMode, customDiscountPercent = 8 } = options;
  const now = new Date();
  const dateStr = isEn
    ? now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    : now.toLocaleDateString('vi-VN');

  let priceModeLabel = isEn ? 'Official Retail Price' : 'Bảng Giá Bán Lẻ Niêm Yết';
  if (priceMode === 'wholesale1') priceModeLabel = isEn ? 'Tier 1 Wholesale Price (Distributors / Cafes)' : 'Bảng Giá Sỉ Cấp 1 (Đại lý / Khách quán)';
  else if (priceMode === 'wholesale2') priceModeLabel = isEn ? 'Tier 2 Wholesale Price (Sub-distributors)' : 'Bảng Giá Sỉ Cấp 2 (Đại lý Cấp 2 / NPP)';
  else if (priceMode === 'wholesale3') priceModeLabel = isEn ? 'Tier 3 Wholesale Price (Master Distributors)' : 'Bảng Giá Sỉ Cấp 3 (Tổng kho / Đại lý lớn)';
  else if (priceMode === 'custom') priceModeLabel = isEn ? `Custom B2B Quotation (-${customDiscountPercent}% from Retail)` : `Báo Giá Tùy Chỉnh (Chiết khấu -${customDiscountPercent}% từ Giá Lẻ)`;
  else if (priceMode === 'all') priceModeLabel = isEn ? 'Full Tiered B2B Price Matrix' : 'Bảng Giá Đầy Đủ (Giá Lẻ & Sỉ Cấp 1, 2, 3)';

  // Build table headers
  let theadHtml = '';
  if (priceMode === 'all') {
    theadHtml = `
      <tr style="background-color: #143A24; color: #FFFFFF; font-weight: bold; text-align: center;">
        <th style="border: 1px solid #94A3B8; padding: 8px 6px; vertical-align: middle; width: 35px;">${isEn ? 'NO.' : 'STT'}</th>
        <th style="border: 1px solid #94A3B8; padding: 8px 10px; vertical-align: middle; text-align: left; width: 250px;">${isEn ? 'PRODUCTS & SPECIFICATIONS' : 'SẢN PHẨM & QUY CÁCH'}</th>
        <th style="border: 1px solid #94A3B8; padding: 8px 8px; vertical-align: middle; width: 140px;">${isEn ? 'PACKAGING' : 'ĐỊNH LƯỢNG / THÙNG'}</th>
        <th style="border: 1px solid #94A3B8; padding: 8px 8px; vertical-align: middle; text-align: right; width: 110px;">${isEn ? 'RETAIL' : 'GIÁ LẺ'}</th>
        <th style="border: 1px solid #94A3B8; padding: 8px 8px; vertical-align: middle; text-align: right; width: 110px;">${isEn ? 'WHOLESALE 1' : 'SỈ CẤP 1'}</th>
        <th style="border: 1px solid #94A3B8; padding: 8px 8px; vertical-align: middle; text-align: right; width: 110px;">${isEn ? 'WHOLESALE 2' : 'SỈ CẤP 2'}</th>
        <th style="border: 1px solid #94A3B8; padding: 8px 8px; vertical-align: middle; text-align: right; width: 110px;">${isEn ? 'WHOLESALE 3' : 'SỈ CẤP 3'}</th>
        <th style="border: 1px solid #94A3B8; padding: 8px 8px; vertical-align: middle; text-align: right; width: 130px;">${isEn ? 'CARTON' : 'GIÁ THÙNG'}</th>
      </tr>
    `;
  } else {
    theadHtml = `
      <tr style="background-color: #143A24; color: #FFFFFF; font-weight: bold; text-align: center;">
        <th style="border: 1px solid #94A3B8; padding: 8px 6px; vertical-align: middle; width: 35px;">${isEn ? 'NO.' : 'STT'}</th>
        <th style="border: 1px solid #94A3B8; padding: 8px 10px; vertical-align: middle; text-align: left; width: 280px;">${isEn ? 'PRODUCTS & SPECIFICATIONS' : 'SẢN PHẨM & QUY CÁCH'}</th>
        <th style="border: 1px solid #94A3B8; padding: 8px 8px; vertical-align: middle; width: 180px;">${isEn ? 'PACKAGING' : 'QUY CÁCH ĐÓNG GÓI'}</th>
        <th style="border: 1px solid #94A3B8; padding: 8px 8px; vertical-align: middle; text-align: right; width: 120px;">${isEn ? 'RETAIL (VND)' : 'GIÁ NIÊM YẾT'}</th>
        <th style="border: 1px solid #94A3B8; padding: 8px 8px; vertical-align: middle; text-align: right; width: 130px;">${isEn ? 'OFFICIAL QUOTE' : 'ĐƠN GIÁ BÁO'}</th>
        <th style="border: 1px solid #94A3B8; padding: 8px 8px; vertical-align: middle; text-align: right; width: 130px;">${isEn ? 'PROFIT / MARGIN' : 'MỨC LỜI / TIẾT KIỆM'}</th>
        <th style="border: 1px solid #94A3B8; padding: 8px 8px; vertical-align: middle; text-align: right; width: 140px;">${isEn ? 'CARTON' : 'QUY ĐỔI THÙNG'}</th>
      </tr>
    `;
  }

  const tbodyHtml = products
    .map((p, idx) => {
      const isEven = idx % 2 === 0;
      const bg = isEven ? '#FFFFFF' : '#F8FAFC';
      const qty = Math.max(1, Math.round(p.unitsPerWholesale || 1));
      const isMulti = qty > 1;

      // V272 Rule: Qty = 1: [Định lượng], Qty > 1: [Định lượng] | Thùng [Qty] [Định lượng]
      const packagingText = isMulti ? `${p.unit} | ${isEn ? 'Carton' : 'Thùng'} ${qty} ${p.unit}` : p.unit;

      if (priceMode === 'all') {
        const cartonPrice = isMulti ? Math.round(p.wholesale1Price * qty) : p.wholesale1Price;
        return `
          <tr style="background-color: ${bg};">
            <td style="border: 1px solid #CBD5E1; text-align: center; vertical-align: middle;">${p.index}</td>
            <td style="border: 1px solid #CBD5E1; text-align: left; vertical-align: middle; padding: 6px 8px;">
              <strong>${p.name}</strong>
              <div style="font-size: 10px; color: #64748B;">${p.partnerName || p.category}</div>
            </td>
            <td style="border: 1px solid #CBD5E1; text-align: center; vertical-align: middle; font-size: 11px;">${packagingText}</td>
            <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #166534; font-weight: bold;">${formatThousandNumber(p.retailPrice)} ₫</td>
            <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #991B1B; font-weight: bold;">${formatThousandNumber(p.wholesale1Price)} ₫</td>
            <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #991B1B; font-weight: bold;">${formatThousandNumber(p.wholesale2Price)} ₫</td>
            <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #991B1B; font-weight: bold;">${formatThousandNumber(p.wholesale3Price)} ₫</td>
            <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #475569; font-size: 11px;">${isMulti ? `~ ${formatThousandNumber(cartonPrice)} ₫` : '-'}</td>
          </tr>
        `;
      }

      let appliedPrice = p.retailPrice;
      let profit = 0;
      let marginPct = 0;

      if (priceMode === 'retail') {
        appliedPrice = p.retailPrice;
      } else if (priceMode === 'wholesale1') {
        appliedPrice = p.wholesale1Price;
        profit = Math.max(0, p.retailPrice - p.wholesale1Price);
        marginPct = p.retailPrice > 0 ? (profit / p.retailPrice) * 100 : 0;
      } else if (priceMode === 'wholesale2') {
        appliedPrice = p.wholesale2Price;
        profit = Math.max(0, p.retailPrice - p.wholesale2Price);
        marginPct = p.retailPrice > 0 ? (profit / p.retailPrice) * 100 : 0;
      } else if (priceMode === 'wholesale3') {
        appliedPrice = p.wholesale3Price;
        profit = Math.max(0, p.retailPrice - p.wholesale3Price);
        marginPct = p.retailPrice > 0 ? (profit / p.retailPrice) * 100 : 0;
      } else if (priceMode === 'custom') {
        appliedPrice = Math.round(p.retailPrice * (1 - customDiscountPercent / 100));
        profit = Math.max(0, p.retailPrice - appliedPrice);
        marginPct = customDiscountPercent;
      }

      const thungPrice = isMulti ? Math.round(appliedPrice * qty) : appliedPrice;

      return `
        <tr style="background-color: ${bg};">
          <td style="border: 1px solid #CBD5E1; text-align: center; vertical-align: middle;">${p.index}</td>
          <td style="border: 1px solid #CBD5E1; text-align: left; vertical-align: middle; padding: 6px 8px;">
            <strong>${p.name}</strong>
            <div style="font-size: 10px; color: #64748B;">${p.partnerName || p.category}</div>
          </td>
          <td style="border: 1px solid #CBD5E1; text-align: center; vertical-align: middle; font-size: 11px;">${packagingText}</td>
          <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #166534; font-weight: bold;">${formatThousandNumber(p.retailPrice)} ₫</td>
          <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #991B1B; font-weight: bold; font-size: 13px;">${formatThousandNumber(appliedPrice)} ₫</td>
          <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #15803D; font-weight: bold; font-size: 11px;">${profit > 0 ? `(+) ${formatThousandNumber(profit)} ₫ (${marginPct.toFixed(1)}%)` : '-'}</td>
          <td style="border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: #475569; font-size: 11px;">${isMulti ? `~ ${formatThousandNumber(thungPrice)} ₫/thùng` : '-'}</td>
        </tr>
      `;
    })
    .join('');

  const wordContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${filename}</title>
      <style>
        @page Section1 {
          size: 595.3pt 841.9pt;
          margin: 36pt 36pt 36pt 36pt;
          mso-header-margin: 36pt;
          mso-footer-margin: 36pt;
          mso-paper-source: 0;
        }
        div.Section1 { page: Section1; }
        body {
          font-family: 'Inter', 'Roboto', 'Segoe UI', Arial, sans-serif;
          font-size: 10.5pt;
          color: #0F172A;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12pt;
          margin-bottom: 12pt;
        }
        th, td {
          vertical-align: middle !important;
        }
        .header-box {
          border-bottom: 2pt solid #D4AF37;
          padding-bottom: 8pt;
          margin-bottom: 12pt;
        }
        .title {
          font-size: 15pt;
          font-weight: bold;
          color: #143A24;
          text-align: center;
          margin: 10pt 0 6pt 0;
          text-transform: uppercase;
        }
      </style>
    </head>
    <body>
      <div class="Section1">
        <div class="header-box">
          <table style="width: 100%; border: none; margin: 0;">
            <tr style="border: none;">
              <td style="border: none; vertical-align: top; width: 65%;">
                <div style="font-size: 13pt; font-weight: bold; color: #143A24;">${isEn ? COMPANY_INFO.companyNameEn : COMPANY_INFO.companyName}</div>
                <div style="font-size: 9.5pt; color: #475569; margin-top: 2pt;">
                  MST: <strong>${COMPANY_INFO.taxCode}</strong> | Hotline/Zalo: <strong>${COMPANY_INFO.hotlines.join(' - ')}</strong>
                </div>
                <div style="font-size: 9pt; color: #475569; margin-top: 2pt;">
                  ${isEn ? COMPANY_INFO.addressEn : COMPANY_INFO.address}
                </div>
                <div style="font-size: 9pt; color: #475569; margin-top: 2pt;">
                  Website: ${COMPANY_INFO.website} | Email: ${COMPANY_INFO.email}
                </div>
              </td>
              <td style="border: none; vertical-align: top; text-align: right; width: 35%;">
                <div style="font-size: 9.5pt; color: #475569;">
                  <strong>${isEn ? 'Date:' : 'Ngày:'}</strong> ${dateStr}<br/>
                  <strong>${isEn ? 'Quote No:' : 'Số Báo Giá:'}</strong> ${quotationCode}<br/>
                  <span style="display: inline-block; background-color: #FEF3C7; color: #92400E; padding: 2pt 6pt; border-radius: 4pt; font-size: 8.5pt; font-weight: bold; margin-top: 4pt;">
                    ${priceModeLabel}
                  </span>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div class="title">
          ${isEn ? 'OFFICIAL B2B PRODUCT PRICE QUOTATION' : 'BẢNG BÁO GIÁ SẢN PHẨM & NÔNG SẢN CAO CẤP'}
        </div>

        <div style="font-size: 10.5pt; margin-bottom: 8pt; color: #1E293B;">
          <strong>${isEn ? 'Attention / To:' : 'Kính gửi:'}</strong> ${recipientName || (isEn ? 'Valued Partner / Distributor' : 'Quý Khách Hàng / Đối Tác')}
        </div>

        <table>
          <thead>
            ${theadHtml}
          </thead>
          <tbody>
            ${tbodyHtml}
          </tbody>
        </table>

        <div style="margin-top: 14pt; font-size: 9.5pt; color: #475569; line-height: 1.5;">
          <p style="margin: 2pt 0;"><strong>${isEn ? 'COMMERCIAL TERMS:' : 'ĐIỀU KHOẢN THƯƠNG MẠI:'}</strong></p>
          <p style="margin: 2pt 0;">1. ${isEn ? 'Pricing is quoted in VND, inclusive of packaging according to standard export specifications.' : 'Đơn giá tính bằng VNĐ, đã bao gồm bao bì và quy cách chuẩn.'}</p>
          <p style="margin: 2pt 0;">2. ${isEn ? 'Certification: Full COA, Food Safety, HACCP, ISO 22000 quality test reports provided.' : 'Kiểm định: Đầy đủ giấy tờ VSATTP, HACCP, ISO 22000 và nguồn gốc xuất xứ COA.'}</p>
          <p style="margin: 2pt 0;">3. ${isEn ? 'Delivery: Ex-Warehouse Ho Chi Minh City or direct delivery according to order volume.' : 'Giao hàng: Tổng kho Quận 1, TP. HCM hoặc hỗ trợ giao chành xe / tận nơi theo thỏa thuận.'}</p>
        </div>

        <table style="width: 100%; border: none; margin-top: 24pt;">
          <tr style="border: none;">
            <td style="border: none; text-align: center; width: 50%; vertical-align: top;">
              <div style="font-weight: bold; color: #1E293B;">ĐẠI DIỆN KHÁCH HÀNG</div>
              <div style="font-size: 9pt; color: #64748B; margin-top: 2pt;">(Ký & ghi rõ họ tên)</div>
            </td>
            <td style="border: none; text-align: center; width: 50%; vertical-align: top;">
              <div style="font-weight: bold; color: #143A24;">CÔNG TY TNHH TM DV G-ROOSTER</div>
              <div style="font-size: 9pt; color: #64748B; margin-top: 2pt;">(Ký tên & Đóng dấu)</div>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\uFEFF' + wordContent], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.doc') ? filename : `${filename}.doc`;
  a.click();
  URL.revokeObjectURL(url);
};

