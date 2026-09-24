import { Product } from '../types';

/**
 * ĐỐI SOÁT HÌNH ẢNH CHÍNH XÁC & BẢO TOÀN TÍNH TOÀN VẸN (V144):
 * 
 * QUY TẮC HIỂN THỊ:
 * 1. Nếu một sản phẩm chỉ có 01 hình ảnh thực tế từ website đối tác, thì CHỈ ĐƯỢC HIỆN 01 HÌNH DUY NHẤT.
 * 2. XÓA BỎ TOÀN BỘ các hình ảnh thứ 2 không liên quan (như hình chén bột mượn tạm).
 * 3. YÊU CẦU TUYỆT ĐỐI: Ảnh thứ 2 (nếu có) phải là của CHÍNH SẢN PHẨM ĐÓ.
 *    - Tuyệt đối không đưa ảnh từ sản phẩm khác vào.
 * 4. Đối với 3 dòng Bột Matcha (Ceremonial, Premium, Culinary):
 *    - Sử dụng chuẩn 100% hình bao bì thực tế bóc tách trên nền trắng tinh khiết, có bóng đổ nhẹ.
 *    - Không chèn thêm ảnh bột rời mượn tạm.
 */
export function getProductImages(product: Product): string[] {
  // Nếu sản phẩm đã được khai báo mảng images chính xác từ dữ liệu
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    const list = product.images.filter((img) => img && typeof img === 'string' && img.trim() !== '');
    const unique = Array.from(new Set(list));
    if (unique.length > 0) {
      return unique;
    }
  }

  // Mặc định: Sản phẩm chỉ có 01 ảnh bao bì thực tế chính hãng
  return [product.image];
}
