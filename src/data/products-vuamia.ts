import { Product } from '../types';

export const PRODUCTS_VUA_MIA: Product[] = [
  // ==========================================
  // B. VUA MÍA (01 SKU)
  // Nước Mía Tuyết nguyên bản (Thùng 28 gói)
  // ==========================================
  {
    id: 'vua-mia-tuyet-350ml',
    partnerId: 'vua-mia',
    partnerName: 'VUA MÍA',
    name: 'Nước Mía Tuyết nguyên bản (Thùng 28 gói)',
    variant: 'Túi PA hút chân không 350ml (Thùng 28 gói x 350ml)',
    category: 'Nước Mía Tuyết Cấp Đông IQF',
    subCategory: 'Nước Mía Tuyết',
    image: 'https://vuamia.vn/uploads/531/25/11/1764487142thumbnail.webp',
    unit: 'Gói 350ml',
    retailUnit: 'Gói 350ml',
    wholesaleUnit: 'THÙNG',
    wholesaleUnitLabel: 'Thùng 28 gói (350ml)',
    unitsPerWholesale: 28,
    packaging: 'Thùng 28 gói x 350ml (837.200đ/thùng lẻ)',
    moq: 1,
    prices: {
      retail: 29900, // Giá bán lẻ: 29.900đ/gói (837.200đ/thùng)
      wholesale1: 17500, // Mức Sỉ 1 (Từ 3 thùng): 17.500đ/gói (490.000đ/thùng)
      wholesale2: 16000, // Mức Sỉ 2 (Từ 10 thùng): 16.000đ/gói (448.000đ/thùng)
      wholesale3: 15000, // Mức Sỉ 3 (Từ 30 thùng): 15.000đ/gói (420.000đ/thùng)
    },
    wholesalePrices: {
      wholesale1: 490000, // Sỉ 1 (Từ 3 thùng): 490.000đ/thùng (17.500đ/gói x 28)
      wholesale2: 448000, // Sỉ 2 (Từ 10 thùng): 448.000đ/thùng (16.000đ/gói x 28)
      wholesale3: 420000, // Sỉ 3 (Từ 30 thùng): 420.000đ/thùng (15.000đ/gói x 28)
    },
    tierRules: [
      { tier: 'retail', minQty: 1, label: 'Lẻ: 29.900đ/gói (837.200đ/thùng)' },
      { tier: 'wholesale1', minQty: 84, label: 'Sỉ 1 (Từ 3 thùng): 17.500đ/gói (490.000đ/thùng)' },
      { tier: 'wholesale2', minQty: 280, label: 'Sỉ 2 (Từ 10 thùng): 16.000đ/gói (448.000đ/thùng)' },
      { tier: 'wholesale3', minQty: 840, label: 'Sỉ 3 (Từ 30 thùng): 15.000đ/gói (420.000đ/thùng)' },
    ],
    origin: 'CÔNG TY TNHH MTV VUA MÍA (Nhà máy Đà Nẵng & Kho Tổng Tân Tạo TP.HCM)',
    specs: {
      'Quy cách': 'Thùng carton 5 lớp 28 gói x 350ml hút chân không (~10.5 kg/thùng)',
      'Định lượng ly': '1 gói 350ml pha chuẩn 2 ly 16oz nước mía tuyết thơm ngon (56 ly/thùng)',
      'Nhiệt độ cấp đông': '-18°C công nghệ cấp đông sâu IQF chống oxy hóa',
      'Thành phần': '100% nước mía tím nguyên chất tự nhiên ép lạnh, không thêm nước, không đường hóa học',
      'Thời gian rã đông': '10-12 phút ở nhiệt độ phòng hoặc ngâm nước mát tạo cấu trúc tuyết xốp mịn',
    },
    highlights: [
      'Giá bán lẻ niêm yết: 29.900đ/gói (837.200đ/thùng 28 gói)',
      'Giá sỉ bậc 1 (Từ 3 thùng): 17.500đ/gói (490.000đ/thùng)',
      'Giá sỉ bậc 2 (Từ 10 thùng): 16.000đ/gói (448.000đ/thùng)',
      'Giá sỉ bậc 3 (Từ 30 thùng): 15.000đ/gói (420.000đ/thùng)',
      'Biên lợi nhuận cực khủng cho quán cà phê / F&B: Lời từ 41.5% đến 49.8%',
      'Miễn phí vận chuyển nội thành TP.HCM cho đơn sỉ từ 10 thùng trở lên',
    ],
    certifications: ['QUATEST 2 & 3', 'ISO 22000', 'HACCP', 'FDA Hoa Kỳ', 'Halal'],
    description: 'Nước Mía Tuyết® Vua Mía là giải pháp đột phá cho ngành F&B hiện đại. Sử dụng mía tím tươi ngon nhất, ép lạnh và cấp đông sâu IQF ở -18°C giúp giữ trọn vẹn vitamin, khoáng chất và vị ngọt ngào thanh khiết.',
    shelfLife: '12 tháng ở nhiệt độ -18°C (Tủ đông bảo quản)',
    barcode: '8938519010014',
    exportPricing: {
      fclNoOem: 58800, // $2.25/kg ~ 58.800 đ/kg (khoảng 20.600 đ/gói 350ml)
      fclOem: 65300, // $2.50/kg ~ 65.300 đ/kg
      unitLabel: '1 kg (FCL RF -18°C)',
      usdEstimate: '$2.25 / kg (~0.84 USD/gói)',
    },
  },
];
