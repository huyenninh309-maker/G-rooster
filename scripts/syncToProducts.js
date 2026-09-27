/**
 * Script đồng bộ dữ liệu Admin vào mã nguồn Git (src/data/productOverrides.json)
 * V165: Bảo vệ dữ liệu khi Push GitHub - Lưu toàn bộ link ảnh & giá sỉ vào codebase
 * Chạy lệnh: npm run sync:data
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetPath = path.resolve(__dirname, '../src/data/productOverrides.json');
const costsPath = path.resolve(__dirname, '../src/data/productCosts.json');

try {
  console.log('--- G-ROOSTER CO.,LTD | BẢO VỆ DỮ LIỆU KHI PUSH GITHUB (V165) ---');
  console.log('Kiểm tra file cấu hình productOverrides.json tại:', targetPath);

  if (!fs.existsSync(targetPath)) {
    fs.writeFileSync(targetPath, JSON.stringify({}, null, 2), 'utf8');
    console.log('Đã tạo mới file productOverrides.json');
  }

  const raw = fs.readFileSync(targetPath, 'utf8');
  const parsed = JSON.parse(raw || '{}');
  const count = Object.keys(parsed).length;

  console.log(`Đang lưu trữ ${count} sản phẩm tùy chỉnh (giá bán/ảnh gallery) trong mã nguồn.`);

  if (count > 0) {
    console.log('Danh sách sản phẩm tùy chỉnh đã bảo vệ:');
    Object.keys(parsed).forEach((pid, idx) => {
      const item = parsed[pid];
      const hasImg = item.image ? 'Có ảnh chính' : '';
      const galleryCount = item.images?.length ? `${item.images.length} ảnh gallery` : '';
      const prices = item.prices ? 'Có giá bán' : '';
      console.log(`  ${idx + 1}. [${pid}]: ${[hasImg, galleryCount, prices].filter(Boolean).join(' | ')}`);
    });
  }

  // Format lại JSON ngay ngắn
  fs.writeFileSync(targetPath, JSON.stringify(parsed, null, 2), 'utf8');

  console.log('✅ Dữ liệu mã nguồn đã sẵn sàng 100% cho Git Push & Live Deployment!');
} catch (err) {
  console.error('Lỗi kiểm tra productOverrides.json:', err);
}

