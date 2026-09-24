import { Product } from '../types';

/**
 * Trả về danh sách hình ảnh thực tế dạng Gallery (Bộ sưu tập) cho từng sản phẩm.
 * Mỗi sản phẩm luôn có tối thiểu 2 hình ảnh sắc nét:
 * - Ảnh 1: Ảnh đại diện sản phẩm / bao bì mặt trước
 * - Ảnh 2: Ảnh cận cảnh chất lượng, tem nhãn, mặt sau HSD hoặc phối cảnh sử dụng thực tế.
 */
export function getProductImages(product: Product): string[] {
  // Nếu sản phẩm đã khai báo mảng images riêng biệt, ưu tiên sử dụng
  if (product.images && product.images.length > 0) {
    const list = [product.image, ...product.images.filter((img) => img !== product.image)];
    return Array.from(new Set(list));
  }

  const primaryImage = product.image;
  let secondaryImage = '';

  const id = product.id.toLowerCase();
  const partnerId = product.partnerId;

  // 1. Nước Mía Tuyết IQF
  if (partnerId === 'nuoc-mia-iqf' || partnerId === 'nuoc-mia-tuyet' || id.includes('mia')) {
    secondaryImage = 'https://vuamia.vn/uploads/531/25/11/1764487142thumbnail.webp';
  }
  // 2. Matcha & Trà Laka
  else if (partnerId === 'matcha-tra-laka' || partnerId === 'viet-thao-nhien' || id.includes('matcha') || id.includes('cascara')) {
    if (id.includes('matcha')) {
      secondaryImage = 'https://cdn.hstatic.net/products/200001001229/matcha_a5400e50faa54c67a24944241319becc.png';
    } else if (id.includes('cascara') || id.includes('xa-den')) {
      secondaryImage = 'https://cdn.hstatic.net/products/200001001229/cascara_nano_f2c5736c04624bac94cf29d2e93f953d.png';
    } else {
      secondaryImage = 'https://cdn.hstatic.net/products/200001001229/olong_ho__tan_c14c9ac7b95d47059e0c76a377b3a9ec.png';
    }
  }
  // 3. Thảo Dược Sâm Dato
  else if (partnerId === 'thao-duoc-sam' || partnerId === 'thao-duoc-dato' || id.includes('dato') || id.includes('sam')) {
    if (id.includes('mat-ong')) {
      secondaryImage = 'https://dato.vn/wp-content/uploads/2022/10/z5759054719586_5801040f6ec98e059ea6a754a91ac6f7-800x800.jpg';
    } else {
      secondaryImage = 'https://dato.vn/wp-content/uploads/2022/10/z5759054719572_9ad12f125140460c59246c63b201f1fa-800x800.jpg';
    }
  }
  // 4. Cà Phê Viên Sấy Nón Lá
  else if (partnerId === 'ca-phe-vien-say' || partnerId === 'non-la-aodai' || id.includes('nonla') || id.includes('ca-phe')) {
    if (id.includes('cacao')) {
      secondaryImage = 'https://nonlacoffee.com/upload/news/banner-trang-tri-shopee-hop-sua-dua-7747.png';
    } else {
      secondaryImage = 'https://nonlacoffee.com/upload/news/banner-trang-tri-shopee-hop-cacao-1-6147.png';
    }
  }
  // 5. Phú Nhã Đặc Sản & Chà Bông
  else if (partnerId === 'dac-san-snack' || partnerId === 'phu-nha' || id.includes('cha-bong') || id.includes('kho-heo')) {
    if (id.includes('khong-duong')) {
      secondaryImage = '/images/phunha/cha-bong-heo-truyen-thong.jpg';
    } else {
      secondaryImage = '/images/phunha/cha-bong-heo-khong-duong.jpg';
    }
  }
  // 6. Socola & Cacao Figo
  else if (partnerId === 'socola-qua-tang' || id.includes('socola') || id.includes('chocolate') || id.includes('cacao') || id.includes('moc-an')) {
    if (id.includes('non-la') || id.includes('set-qua') || id.includes('qua-tang')) {
      secondaryImage = '/images/socola/set-qua-tang-chocolate-hoi-an-50g.jpg';
    } else if (id.includes('moc-an') || id.includes('bot-')) {
      secondaryImage = '/images/socola/bot-cacao-nguyen-chat-150g.jpg';
    } else if (id.includes('100') || id.includes('90') || id.includes('85') || id.includes('70')) {
      secondaryImage = '/images/socola/socola-den-70-50g.jpeg';
    } else {
      secondaryImage = '/images/socola/socola-sua-bar.jpeg';
    }
  }

  // Nếu ảnh thứ 2 trùng với ảnh 1 hoặc không tìm thấy, dùng một ảnh thực tế dự phòng cao cấp
  if (!secondaryImage || secondaryImage === primaryImage) {
    secondaryImage = '/images/socola/set-qua-tang-chocolate-non-la-ben-tre-150g.jpg';
  }

  return [primaryImage, secondaryImage];
}
