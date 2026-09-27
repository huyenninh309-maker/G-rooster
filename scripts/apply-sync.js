/**
 * Công cụ tự động áp dụng mã đồng bộ từ Admin vào mã nguồn gốc (V166 Data Persistence)
 * Cách dùng:
 * 1. Chạy với file JSON: node scripts/apply-sync.js path/to/sync-data.json
 * 2. Chạy với chuỗi JSON truyền trực tiếp: node scripts/apply-sync.js '{"overrides":{...}}'
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const inputArg = process.argv[2];

if (!inputArg) {
  console.log(`
╔════════════════════════════════════════════════════════════════════════╗
║             G-ROOSTER CO.,LTD - CÔNG CỤ ĐỒNG BỘ MÃ NGUỒN (V166)        ║
╚════════════════════════════════════════════════════════════════════════╝
HƯỚNG DẪN:
1. Đặt file xuất từ Admin vào gốc dự án: sync-data.json
2. Chạy lệnh: node scripts/apply-sync.js sync-data.json
Hoặc dán trực tiếp chuỗi JSON vào khung chat với AI Studio!
`);
  process.exit(0);
}

let rawJson = '';
if (fs.existsSync(inputArg)) {
  rawJson = fs.readFileSync(inputArg, 'utf-8');
} else {
  rawJson = inputArg;
}

try {
  const parsed = JSON.parse(rawJson);
  const overrides = parsed.overrides || (parsed.system ? {} : parsed);
  const costs = parsed.costs || {};

  const overridesPath = path.resolve(rootDir, 'src/data/productOverrides.json');
  const costsPath = path.resolve(rootDir, 'src/data/productCosts.json');

  // Ghi file productOverrides.json
  fs.writeFileSync(overridesPath, JSON.stringify(overrides, null, 2), 'utf-8');
  console.log(`✅ Đã cập nhật thành công ${Object.keys(overrides).length} sản phẩm tùy chỉnh vào:`);
  console.log(`   --> ${overridesPath}`);

  // Ghi file productCosts.json
  if (Object.keys(costs).length > 0) {
    fs.writeFileSync(costsPath, JSON.stringify(costs, null, 2), 'utf-8');
    console.log(`✅ Đã cập nhật giá vốn cho ${Object.keys(costs).length} sản phẩm vào:`);
    console.log(`   --> ${costsPath}`);
  }

  console.log(`\n🎉 TẤT CẢ DỮ LIỆU ĐÃ ĐƯỢC LƯU VĨNH VIỄN VÀO MÃ NGUỒN! BẠN CÓ THỂ PUSH GITHUB AN TOÀN.`);
} catch (err) {
  console.error('❌ Lỗi xử lý mã JSON:', err.message);
  process.exit(1);
}
