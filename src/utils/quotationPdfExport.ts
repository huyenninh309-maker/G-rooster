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
  address: 'Kho bảo quản & Trụ sở: Quận 1, TP. Hồ Chí Minh, Việt Nam',
  addressEn: 'Headquarters & Cold Storage: District 1, Ho Chi Minh City, Vietnam',
  email: 'groostercompany@gmail.com',
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

    let upw = item.unitsPerWholesale || 1;
    let unit = item.unit || item.retailUnit || 'Gói/Hộp';

    if (item.id === 'vtn-tra-xa-den' || (item.name && item.name.includes('Xạ Đen'))) {
      upw = 30;
      unit = 'Hộp 150g';
    } else if (item.id.startsWith('vtn-cascara-') || (item.name && item.name.includes('Cascara'))) {
      upw = 24;
      unit = item.unit || 'Hộp 70g';
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

  // Trang đầu tiên
  const firstChunk = rows.slice(0, rowsFirstPage);
  pages.push(firstChunk);
  currentIndex += rowsFirstPage;

  // Các trang tiếp theo
  while (currentIndex < rows.length) {
    const nextChunk = rows.slice(currentIndex, currentIndex + rowsPerPage);
    pages.push(nextChunk);
    currentIndex += rowsPerPage;
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

        // V251: Nhúng link Google Font Inter trực tiếp vào cloned document để html2canvas render Inter hoàn hảo
        const fontLink = clonedDoc.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
        clonedDoc.head.appendChild(fontLink);

        // Chèn stylesheet sạch sẽ dành riêng cho PDF với font Inter và 100% màu chuẩn HEX
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
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
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
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          }
          table {
            width: 100% !important;
            border-collapse: collapse !important;
          }
          th, td {
            border: 1px solid #CBD5E1 !important;
            padding: 6px 8px !important;
            vertical-align: top !important;
          }
        `;
        clonedDoc.head.appendChild(cleanStyle);

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
