import { Product } from '../types';

/**
 * CHỈ THỊ V141: Trả về 100% hình ảnh bao bì & cốt sản phẩm thực tế từ website đối tác:
 * - TUYỆT ĐỐI CẤM sử dụng hình ảnh socola rời, bánh donut, burger hay hình không có bao bì nhãn mác.
 * - Mỗi sản phẩm Socola: Phải hiện đúng hình ảnh hộp giấy hoặc bao bì thực tế của Figo (giấy kraft, bao bì nón lá, danh lam thắng cảnh).
 * - Matcha Laka: Túi zip nhôm màu xanh/trắng có nhãn Laka chính hãng (vietthaonhien.vn).
 * - Nước Mía Tuyết: Gói nước mía 350ml thực tế của Vua Mía + ly thành phẩm tuyết mát lạnh.
 * - Phú Nhã: Hũ/túi chà bông thực tế.
 * - Cà Phê Nón Lá / Aodai: Hộp viên nén sấy thăng hoa và túi mộc.
 * - Thảo Dược Sâm Dato: Hũ mật ong sâm dây và túi sâm khô thực tế.
 * 
 * Logic Gallery:
 * - Ảnh 1 (Primary): Bao bì / Hộp sản phẩm chính thức có tem nhãn mác.
 * - Ảnh 2 (Secondary): Cốt sản phẩm bên trong hoặc hình chụp góc mở hộp / tem nhãn chi tiết từ web đối tác.
 */
export function getProductImages(product: Product): string[] {
  // Nếu sản phẩm đã được cấu hình mảng images riêng biệt, ưu tiên sử dụng
  if (product.images && product.images.length > 0) {
    const list = [product.image, ...product.images.filter((img) => img && img !== product.image)];
    const unique = Array.from(new Set(list));
    if (unique.length > 0) return unique;
  }

  const primaryImage = product.image;
  let secondaryImage = '';

  const id = product.id.toLowerCase();
  const partnerId = product.partnerId;

  // 1. Nước Mía Tuyết IQF (Nguồn: vuamia.vn - Gói bao bì 350ml + Ly nước mía tuyết thành phẩm)
  if (partnerId === 'nuoc-mia-iqf' || partnerId === 'nuoc-mia-tuyet' || id.includes('mia')) {
    secondaryImage = 'https://vuamia.vn/uploads/531/feature_page/25/11/1764036075thumbnail.webp';
  }
  // 2. Matcha & Trà Laka (Nguồn: vietthaonhien.vn - Túi zip nhôm màu xanh/trắng Laka + Mặt sau chi tiết)
  else if (partnerId === 'matcha-tra-laka' || partnerId === 'matcha-laka' || partnerId === 'viet-thao-nhien' || id.includes('matcha') || id.includes('cascara')) {
    if (id.includes('matcha')) {
      secondaryImage = 'https://cdn.hstatic.net/products/200001001229/1_354c55427629465c8c42ffbad11f2e61_large.png';
    } else if (id.includes('cascara') || id.includes('xa-den')) {
      secondaryImage = 'https://cdn.hstatic.net/products/200001001229/cascara_nano_f2c5736c04624bac94cf29d2e93f953d_large.png';
    } else {
      secondaryImage = 'https://cdn.hstatic.net/products/200001001229/olong_ho__tan_c14c9ac7b95d47059e0c76a377b3a9ec_large.png';
    }
  }
  // 3. Thảo Dược Sâm Dato (Nguồn: dato.vn - Hũ tinh chất mật ong & Túi trà/sâm dây)
  else if (partnerId === 'thao-duoc-sam' || partnerId === 'thao-duoc-dato' || id.includes('dato') || id.includes('sam')) {
    if (id.includes('mat-ong') || id.includes('tinh-chat')) {
      secondaryImage = 'https://dato.vn/wp-content/uploads/2022/10/z5759054719586_5801040f6ec98e059ea6a754a91ac6f7-800x800.jpg';
    } else {
      secondaryImage = 'https://dato.vn/wp-content/uploads/2022/10/z5759054719572_9ad12f125140460c59246c63b201f1fa-800x800.jpg';
    }
  }
  // 4. Cà Phê Viên Sấy Nón Lá (Nguồn: nonlacoffee.com - Hộp viên nén & Banner cốt sản phẩm)
  else if (partnerId === 'ca-phe-vien-say' || partnerId === 'non-la-aodai' || id.includes('nonla') || id.includes('ca-phe') || id.includes('aodai')) {
    if (id.includes('cacao')) {
      secondaryImage = 'https://nonlacoffee.com/upload/news/banner-trang-tri-shopee-hop-sua-dua-7747.png';
    } else if (id.includes('aodai')) {
      secondaryImage = 'https://nonlacoffee.com/upload/product/anh-web-aodai-01-9570.jpg';
    } else {
      secondaryImage = 'https://nonlacoffee.com/upload/photo/banner-web-nonla-full-sp-1-2123.png';
    }
  }
  // 5. Phú Nhã Đặc Sản Chà Bông (Nguồn: Hũ/Túi Chà Bông & Khô Thực Tế từ Phú Nhã)
  else if (partnerId === 'dac-san-snack' || partnerId === 'cha-bong-kho' || partnerId === 'phu-nha' || id.includes('cha-bong') || id.includes('kho-heo') || id.includes('kho-ga')) {
    if (id.includes('khong-duong')) {
      secondaryImage = '/images/phunha/cha-bong-heo-truyen-thong.jpg';
    } else if (id.includes('ga')) {
      secondaryImage = '/images/phunha/cha-bong-ga-xe.jpg';
    } else {
      secondaryImage = '/images/phunha/cha-bong-heo-khong-duong.jpg';
    }
  }
  // 6. Socola & Quà Tặng (Nguồn: chocolatefigo.com - Bao bì giấy kraft, bao bì màu, hộp quà nón lá & danh lam thắng cảnh)
  else if (partnerId === 'socola-qua-tang' || id.includes('socola') || id.includes('chocolate') || id.includes('cacao') || id.includes('moc-an')) {
    if (id.includes('non-la') || id.includes('set-qua') || id.includes('qua-tang') || id.includes('hoi-an') || id.includes('sai-gon') || id.includes('phu-quoc') || id.includes('tay-bac')) {
      // Mở nắp hộp quà thấy các thanh socola bên trong từ chocolatefigo.com
      secondaryImage = 'https://chocolatefigo.com/uploads/noidung/thumb/set-qua-tang-chocolate-3-milk-chocolate-50g-mix-vi-figo-hop-mau-do-chocolate-gift-from-v-0-765-cp.jpg';
    } else if (id.includes('moc-an') || id.includes('bot-cacao') || id.includes('bot-')) {
      // Hũ bột cacao / bột Mộc An thực tế từ chocolatefigo.com
      secondaryImage = 'https://chocolatefigo.com/uploads/noidung/thumb/bot-cacao-nguyen-chat-khong-duong-dong-basic-150gram-figo-0-450.jpg';
    } else if (id.includes('100') || id.includes('90') || id.includes('85') || id.includes('70')) {
      // Thanh socola đen bẻ miếng bên cạnh bao bì kraft từ chocolatefigo.com
      secondaryImage = 'https://chocolatefigo.com/uploads/noidung/thumb/bar-20g-socola-den-70-cacao-it-duong-figo-0-770.jpeg';
    } else {
      // Thanh socola sữa bẻ miếng bên cạnh bao bì từ chocolatefigo.com
      secondaryImage = 'https://chocolatefigo.com/uploads/noidung/thumb/bar-50g-socola-sua-nhan-hat-cacao-nibs-ngot-vua-dong-sweet-love-50g--254-0-490.jpeg';
    }
  }

  // Nếu không có ảnh thứ 2 hoặc trùng ảnh 1, chỉ trả về 1 ảnh duy nhất để ẩn hoàn toàn Thumbnails
  if (!secondaryImage || secondaryImage === primaryImage) {
    return [primaryImage];
  }

  return [primaryImage, secondaryImage];
}
