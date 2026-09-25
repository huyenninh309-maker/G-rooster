import { Product } from '../types';

export const PRODUCTS_VIET_THAO_NHIEN: Product[] = [
  // ==========================================
  // 1. DÒNG BỘT MATCHA NHẬP KHẨU CHÍNH HÃNG (3 SP)
  // ==========================================
  {
    id: 'vtn-matcha-laka-ceremonial',
    partnerId: 'matcha-laka',
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi G-ROOSTER CO.,LTD',
    name: 'Bột Matcha Ceremonial Grade (Loại 1 - Nghi Thức)',
    variant: 'Ceremonial Grade - Nghi thức cao cấp chuẩn Nhật | Túi zip 100g',
    category: 'Matcha & Trà Cà Phê',
    subCategory: 'Bột Matcha',
    image: 'https://i.postimg.cc/3WZpfsbL/matcha-ceremonial.jpg',
    images: [
      'https://i.postimg.cc/3WZpfsbL/matcha-ceremonial.jpg',
    ],
    unit: 'Túi 100g',
    retailUnit: 'Túi 100g',
    wholesaleUnit: 'KG',
    wholesaleUnitLabel: '1 KG (10 túi 100g)',
    unitsPerWholesale: 10,
    packaging: 'Túi zip nhôm 100g (10 túi / kg, đóng thùng 10kg)',
    moq: 1,
    prices: {
      retail: 300000,
      wholesale1: 232500, // Chiết khấu theo 2.325.000 đ/kg
      wholesale2: 217500, // Chiết khấu theo 2.175.000 đ/kg
      wholesale3: 202500, // Chiết khấu theo 2.025.000 đ/kg
    },
    wholesalePrices: {
      wholesale1: 2325000, // Sỉ 1: 2.325k/kg
      wholesale2: 2175000, // Sỉ 2: 2.175k/kg
      wholesale3: 2025000, // Sỉ 3: 2.025k/kg
    },
    tierRules: [
      { tier: 'retail', minQty: 1, label: 'Lẻ (1-9 túi)' },
      { tier: 'wholesale1', minQty: 10, label: 'Sỉ 1 (Từ 1 KG - 10 túi)' },
      { tier: 'wholesale2', minQty: 30, label: 'Sỉ 2 (Từ 3 KG - 30 túi)' },
      { tier: 'wholesale3', minQty: 100, label: 'Sỉ 3 (Từ 10 KG - 100 túi)' },
    ],
    origin: 'Nhật Bản (Vụ xuân thu hoạch thủ công, phủ râm bạt đen theo nghi thức trà đạo hoàng gia)',
    specs: {
      'Cấp độ': 'Ceremonial Grade (Loại 1 - Nghi thức cao cấp)',
      'Độ mịn': '5 - 8 micron (Xay cối đá Granite tốc độ chậm)',
      'Màu sắc': 'Xanh ngọc lục bảo tươi sáng (Bright Jade Green)',
      'Hương vị': 'Umami đậm đà, hậu ngọt sâu, hoàn toàn không đắng chát',
      'Tiêu chuẩn': 'JAS Organic Nhật Bản, ISO 22000, HACCP Codex',
    },
    highlights: [
      'Phủ râm bạt đen 25 ngày tích tụ L-theanine và diệp lục tối đa',
      'Độ hòa tan mịn màng tuyệt đối, thích hợp cho Dirty Matcha Latte và trà đạo',
      'Màu xanh ngọc lục bảo giữ tươi nguyên tới 45 phút trên quầy bar',
    ],
    certifications: ['JAS Organic (Nhật Bản)', 'HACCP Codex 2020', 'ISO 22000', 'VietGAP'],
    description: 'Dòng bột trà xanh Matcha cao cấp nhất phân phối bởi G-ROOSTER dành cho các nhà hàng Omakase, quán cà phê Specialty và khách hàng sành điệu. Độ ngọt tự nhiên umami đậm nét, lưu lại hậu vị thanh khiết kéo dài.',
    shelfLife: '12 tháng (Bảo quản 4-8°C sau khi mở túi)',
    barcode: '8936081290011',
    exportPricing: {
      fclNoOem: 2400000,
      fclOem: 2650000,
      unitLabel: '1 kg',
      usdEstimate: '~91.87 USD/kg',
    },
  },
  {
    id: 'vtn-matcha-laka-premium',
    partnerId: 'matcha-laka',
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi G-ROOSTER CO.,LTD',
    name: 'Bột Matcha Premium Grade (Loại 2 - Thượng Hạng)',
    variant: 'Premium Grade - Thượng hạng pha chế & làm bánh | Túi zip 100g',
    category: 'Matcha & Trà Cà Phê',
    subCategory: 'Bột Matcha',
    image: 'https://i.postimg.cc/fkvXqGgF/matcha-premium.jpg',
    images: [
      'https://i.postimg.cc/fkvXqGgF/matcha-premium.jpg',
    ],
    unit: 'Túi 100g',
    retailUnit: 'Túi 100g',
    wholesaleUnit: 'KG',
    wholesaleUnitLabel: '1 KG (10 túi 100g)',
    unitsPerWholesale: 10,
    packaging: 'Túi zip nhôm 100g (10 túi / kg, đóng thùng 10kg)',
    moq: 1,
    prices: {
      retail: 150000,
      wholesale1: 116250, // Chiết khấu theo 1.162.500 đ/kg
      wholesale2: 108750, // Chiết khấu theo 1.087.500 đ/kg
      wholesale3: 101250, // Chiết khấu theo 1.012.500 đ/kg
    },
    wholesalePrices: {
      wholesale1: 1162500, // Sỉ 1: 1.162.500 đ/kg
      wholesale2: 1087500, // Sỉ 2: 1.087.500 đ/kg
      wholesale3: 1012500, // Sỉ 3: 1.012.500 đ/kg
    },
    tierRules: [
      { tier: 'retail', minQty: 1, label: 'Lẻ (1-9 túi)' },
      { tier: 'wholesale1', minQty: 10, label: 'Sỉ 1 (Từ 1 KG - 10 túi)' },
      { tier: 'wholesale2', minQty: 30, label: 'Sỉ 2 (Từ 3 KG - 30 túi)' },
      { tier: 'wholesale3', minQty: 100, label: 'Sỉ 3 (Từ 10 KG - 100 túi)' },
    ],
    origin: 'Nhật Bản (Vụ hè thu hoạch máy chuyên dụng, công nghệ sấy lạnh Tencha)',
    specs: {
      'Cấp độ': 'Premium Grade (Loại 2 - Thượng hạng)',
      'Độ mịn': '10 - 15 micron',
      'Màu sắc': 'Xanh mạ tươi sáng, độ bám kem tuyệt vời',
      'Hương vị': 'Thơm cốm non thoảng hương rong biển, chát dịu thanh nhã',
      'Tiêu chuẩn': 'JAS Organic, ISO 22000, HACCP',
    },
    highlights: [
      'Lựa chọn số 1 cho các chuỗi trà sữa cao cấp và quán cafe phong cách Nhật',
      'Hương thơm dậy mùi khi kết hợp sữa tươi thanh trùng và kem béo',
      'Biên lợi nhuận F&B lên tới 75% cho mỗi ly đồ uống',
    ],
    certifications: ['JAS Organic', 'HACCP', 'ISO 22000'],
    description: 'Matcha Premium phân phối bởi G-ROOSTER là lựa chọn lý tưởng cho các chuỗi đồ uống, bánh kem moka, nama chocolate và kem gelato thủ công. Vị đắng nhẹ thanh thoát nâng tầm vị béo ngọt của sữa tươi.',
    shelfLife: '12 tháng',
    barcode: '8936081290028',
    exportPricing: {
      fclNoOem: 1200000,
      fclOem: 1350000,
      unitLabel: '1 kg',
      usdEstimate: '~45.93 USD/kg',
    },
  },
  {
    id: 'vtn-matcha-laka-culinary',
    partnerId: 'matcha-laka',
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi G-ROOSTER CO.,LTD',
    name: 'Bột Matcha Culinary Grade (Loại 3 - Ẩm Thực)',
    variant: 'Culinary Grade - Dòng công nghiệp & F&B phổ thông | Túi zip 100g',
    category: 'Matcha & Trà Cà Phê',
    subCategory: 'Bột Matcha',
    image: 'https://i.postimg.cc/bdRbV7F5/matcha-culinary.jpg',
    images: [
      'https://i.postimg.cc/bdRbV7F5/matcha-culinary.jpg',
    ],
    unit: 'Túi 100g',
    retailUnit: 'Túi 100g',
    wholesaleUnit: 'KG',
    wholesaleUnitLabel: '1 KG (10 túi 100g)',
    unitsPerWholesale: 10,
    packaging: 'Túi zip nhôm 100g (Bao tải giấy Kraft 25kg hoặc túi 100g)',
    moq: 1,
    prices: {
      retail: 60000,
      wholesale1: 46500, // Chiết khấu theo 465.000 đ/kg
      wholesale2: 43500, // Chiết khấu theo 435.000 đ/kg
      wholesale3: 40500, // Chiết khấu theo 405.000 đ/kg
    },
    wholesalePrices: {
      wholesale1: 465000, // Sỉ 1: 465.000 đ/kg
      wholesale2: 435000, // Sỉ 2: 435.000 đ/kg
      wholesale3: 405000, // Sỉ 3: 405.000 đ/kg
    },
    tierRules: [
      { tier: 'retail', minQty: 1, label: 'Lẻ (1-9 túi)' },
      { tier: 'wholesale1', minQty: 10, label: 'Sỉ 1 (Từ 1 KG - 10 túi)' },
      { tier: 'wholesale2', minQty: 30, label: 'Sỉ 2 (Từ 3 KG - 30 túi)' },
      { tier: 'wholesale3', minQty: 100, label: 'Sỉ 3 (Từ 10 KG - 100 túi)' },
    ],
    origin: 'Nhật Bản (Công nghệ sấy Tencha công nghiệp)',
    specs: {
      'Cấp độ': 'Culinary Grade (Loại 3 - Công nghiệp & Ẩm thực)',
      'Độ mịn': '15 - 20 micron',
      'Màu sắc': 'Xanh rêu đầm ấm, chịu nhiệt độ cao khi nướng',
      'Hương vị': 'Đậm vị trà xanh, hương thơm mộc mạc lưu hương bền bỉ',
      'Ứng dụng': 'Bánh mì, bánh quy, thạch rau câu, kem cây, kẹo mềm',
    },
    highlights: [
      'Mùi hương matcha vẫn nổi bật rõ sau khi nướng bánh ở nhiệt độ 180°C',
      'Độ tan đồng nhất, không vón cục trong hỗn hợp bột và kem béo',
      'Giải pháp nguyên liệu chuẩn B2B tối ưu chi phí cho xưởng bánh công nghiệp',
    ],
    certifications: ['HACCP', 'ISO 22000', 'ATVSTP'],
    description: 'Chuyên biệt cho các xưởng bánh, tiệm bánh Âu cao cấp, xưởng làm kem và chuỗi F&B cần vị trà xanh mạnh mẽ không bị át bởi bơ sữa hay nhiệt độ nướng lò. Phân phối bởi G-ROOSTER.',
    shelfLife: '12 tháng',
    barcode: '8936081290035',
    exportPricing: {
      fclNoOem: 500000,
      fclOem: 550000,
      unitLabel: '1 kg',
      usdEstimate: '~19.14 USD/kg',
    },
  },

  // ==========================================
  // 2. DÒNG TRÀ CASCARA TÚI LỌC & TRÀ XẠ ĐEN (5 SP)
  // Quy cách: Hộp 70g (hoặc 35g đối với Xạ Đen) - Thùng 24 Hộp
  // ==========================================
  {
    id: 'vtn-cascara-truyen-thong',
    partnerId: 'tra-cascara-thao-moc',
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi G-ROOSTER CO.,LTD',
    name: 'Trà Cascara Cầu Đất - Vị Truyền Thống',
    variant: 'Vị nguyên bản đậm đà | Hộp 24 gói túi lọc tiện dụng (70g)',
    category: 'Trà Cascara & Thảo Mộc',
    subCategory: 'Trà Cascara & Xạ Đen',
    image: '/images/cascara/cascara-truyen-thong-real.jpg',
    images: [
      '/images/cascara/cascara-truyen-thong-real.jpg',
    ],
    unit: 'Hộp 70g',
    retailUnit: 'Hộp',
    wholesaleUnit: 'THÙNG',
    wholesaleUnitLabel: 'Thùng 24 hộp',
    unitsPerWholesale: 24,
    packaging: 'Hộp 70g màng co cao cấp (Thùng 24 hộp)',
    moq: 1,
    prices: {
      retail: 82000,
      wholesale1: 63541, // 1.525.000 / 24
      wholesale2: 59375, // 1.425.000 / 24
      wholesale3: 55333, // 1.328.000 / 24
    },
    wholesalePrices: {
      wholesale1: 1525000, // Sỉ 1: 1.525k/thùng
      wholesale2: 1425000, // Sỉ 2: 1.425k/thùng
      wholesale3: 1328000, // Sỉ 3: 1.328k/thùng
    },
    tierRules: [
      { tier: 'retail', minQty: 1, label: 'Lẻ (1-23 hộp)' },
      { tier: 'wholesale1', minQty: 24, label: 'Sỉ 1 (Từ 1 thùng - 24 hộp)' },
      { tier: 'wholesale2', minQty: 72, label: 'Sỉ 2 (Từ 3 thùng - 72 hộp)' },
      { tier: 'wholesale3', minQty: 240, label: 'Sỉ 3 (Từ 10 thùng - 240 hộp)' },
    ],
    origin: 'Cầu Đất, Đà Lạt (100% vỏ quả cà phê Arabica chín mọng thu hái hữu cơ)',
    specs: {
      'Thành phần': '100% vỏ thịt quả cà phê Arabica Cầu Đất phơi nhà màng',
      'Độ ẩm': '< 7.5%',
      'Chỉ số ORAC': 'Chống oxy hóa cao gấp 8 lần việt quất',
      'Hương vị': 'Chua thanh mận chín, ngọt hậu mật hoa và hương hoa cà phê',
    },
    highlights: [
      'Sấy nhà màng năng lượng mặt trời công nghệ khép kín vệ sinh 100%',
      'Hoàn hảo pha Cold Brew ủ lạnh, kết hợp Tonic hoặc thưởng trà nóng',
      'Giàu polyphenol tự nhiên giúp thanh lọc cơ thể và sáng da',
    ],
    certifications: ['SCA Specialty Verified', 'VietGAP', 'HACCP'],
    description: 'Trà Cascara làm từ vỏ quả cà phê chín mọng hữu cơ vùng cao nguyên Cầu Đất. Vị nguyên bản đậm đà, vị chua ngọt tự nhiên của quả chín mọng mang phong cách thưởng trà châu Âu hiện đại. Sản phẩm phân phối bởi G-ROOSTER.',
    shelfLife: '18 tháng',
    barcode: '8936081290042',
    exportPricing: {
      fclNoOem: 1850000,
      fclOem: 2000000,
      unitLabel: 'Thùng 24 hộp',
      usdEstimate: '~70.81 USD/thùng',
    },
  },
  {
    id: 'vtn-cascara-dao',
    partnerId: 'tra-cascara-thao-moc',
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi G-ROOSTER CO.,LTD',
    name: 'Trà Cascara Cầu Đất - Vị Đào',
    variant: 'Hương đào thanh mát, dễ uống | Hộp 24 gói túi lọc tiện dụng (70g)',
    category: 'Trà Cascara & Thảo Mộc',
    subCategory: 'Trà Cascara & Xạ Đen',
    image: '/images/cascara/cascara-dao-real.jpg',
    images: [
      '/images/cascara/cascara-dao-real.jpg',
    ],
    unit: 'Hộp 70g',
    retailUnit: 'Hộp',
    wholesaleUnit: 'THÙNG',
    wholesaleUnitLabel: 'Thùng 24 hộp',
    unitsPerWholesale: 24,
    packaging: 'Hộp 70g màng co cao cấp (Thùng 24 hộp)',
    moq: 1,
    prices: {
      retail: 82000,
      wholesale1: 63541,
      wholesale2: 59375,
      wholesale3: 55333,
    },
    wholesalePrices: {
      wholesale1: 1525000,
      wholesale2: 1425000,
      wholesale3: 1328000,
    },
    tierRules: [
      { tier: 'retail', minQty: 1, label: 'Lẻ (1-23 hộp)' },
      { tier: 'wholesale1', minQty: 24, label: 'Sỉ 1 (Từ 1 thùng - 24 hộp)' },
      { tier: 'wholesale2', minQty: 72, label: 'Sỉ 2 (Từ 3 thùng - 72 hộp)' },
      { tier: 'wholesale3', minQty: 240, label: 'Sỉ 3 (Từ 10 thùng - 240 hộp)' },
    ],
    origin: 'Cầu Đất, Lâm Đồng',
    specs: {
      'Thành phần': 'Vỏ quả cà phê Arabica Cầu Đất, hương đào tự nhiên',
      'Độ ẩm': '< 7.5%',
      'Hương vị': 'Hương đào thơm nức, vị chua ngọt dễ chịu, sảng khoái',
    },
    highlights: [
      'Món giải khát tuyệt đỉnh cho giới trẻ khi ủ lạnh cùng đá và lát đào tươi',
      'Không chứa calo đường tinh luyện, giàu vitamin C và chất chống lão hóa',
    ],
    certifications: ['VietGAP', 'HACCP Codex'],
    description: 'Sự hòa quyện tuyệt hảo giữa trà vỏ quả cà phê Cầu Đất và hương đào ngọt mát. Rất được ưa chuộng tại các chuỗi trà hoa quả và quán cà phê hiện đại. Sản phẩm phân phối bởi G-ROOSTER.',
    shelfLife: '18 tháng',
    barcode: '8936081290059',
    exportPricing: {
      fclNoOem: 1850000,
      fclOem: 2000000,
      unitLabel: 'Thùng 24 hộp',
      usdEstimate: '~70.81 USD/thùng',
    },
  },
  {
    id: 'vtn-cascara-cam-que',
    partnerId: 'tra-cascara-thao-moc',
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi G-ROOSTER CO.,LTD',
    name: 'Trà Cascara Cầu Đất - Vị Cam Quế',
    variant: 'Hương cam quế ấm áp, thư giãn | Hộp 24 gói túi lọc tiện dụng (70g)',
    category: 'Trà Cascara & Thảo Mộc',
    subCategory: 'Trà Cascara & Xạ Đen',
    image: '/images/cascara/cascara-cam-que-real.jpg',
    images: [
      '/images/cascara/cascara-cam-que-real.jpg',
    ],
    unit: 'Hộp 70g',
    retailUnit: 'Hộp',
    wholesaleUnit: 'THÙNG',
    wholesaleUnitLabel: 'Thùng 24 hộp',
    unitsPerWholesale: 24,
    packaging: 'Hộp 70g màng co cao cấp (Thùng 24 hộp)',
    moq: 1,
    prices: {
      retail: 82000,
      wholesale1: 63541,
      wholesale2: 59375,
      wholesale3: 55333,
    },
    wholesalePrices: {
      wholesale1: 1525000,
      wholesale2: 1425000,
      wholesale3: 1328000,
    },
    tierRules: [
      { tier: 'retail', minQty: 1, label: 'Lẻ (1-23 hộp)' },
      { tier: 'wholesale1', minQty: 24, label: 'Sỉ 1 (Từ 1 thùng - 24 hộp)' },
      { tier: 'wholesale2', minQty: 72, label: 'Sỉ 2 (Từ 3 thùng - 72 hộp)' },
      { tier: 'wholesale3', minQty: 240, label: 'Sỉ 3 (Từ 10 thùng - 240 hộp)' },
    ],
    origin: 'Cầu Đất & Yên Bái (Vỏ quả cà phê kết hợp vỏ quế rừng tự nhiên)',
    specs: {
      'Thành phần': 'Vỏ quả cà phê Arabica Cầu Đất, vỏ cam sấy, quế rừng Trà Bồng',
      'Hương vị': 'Nồng ấm, thơm mùi tinh dầu vỏ cam và quế khô, ấm bụng',
    },
    highlights: [
      'Công thức độc quyền cho món Cascara Mulled Tea mùa lạnh',
      'Giúp thư giãn tinh thần, hỗ trợ tiêu hóa và giữ ấm cơ thể',
    ],
    certifications: ['VietGAP', 'HACCP Codex'],
    description: 'Trà Cascara Cam Quế mang đậm phong cách thảo mộc ấm cúng. Thích hợp uống nóng vào buổi tối hoặc những ngày mưa se lạnh, xua tan căng thẳng mệt mỏi. Sản phẩm phân phối bởi G-ROOSTER.',
    shelfLife: '18 tháng',
    barcode: '8936081290066',
    exportPricing: {
      fclNoOem: 1850000,
      fclOem: 2000000,
      unitLabel: 'Thùng 24 hộp',
      usdEstimate: '~70.81 USD/thùng',
    },
  },
  {
    id: 'vtn-cascara-gung',
    partnerId: 'tra-cascara-thao-moc',
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi G-ROOSTER CO.,LTD',
    name: 'Trà Cascara Cầu Đất - Vị Gừng',
    variant: 'Hương gừng cay nhẹ, ấm bụng | Hộp 24 gói túi lọc tiện dụng (70g)',
    category: 'Trà Cascara & Thảo Mộc',
    subCategory: 'Trà Cascara & Xạ Đen',
    image: '/images/cascara/cascara-gung-real.jpg',
    images: [
      '/images/cascara/cascara-gung-real.jpg',
    ],
    unit: 'Hộp 70g',
    retailUnit: 'Hộp',
    wholesaleUnit: 'THÙNG',
    wholesaleUnitLabel: 'Thùng 24 hộp',
    unitsPerWholesale: 24,
    packaging: 'Hộp 70g màng co cao cấp (Thùng 24 hộp)',
    moq: 1,
    prices: {
      retail: 82000,
      wholesale1: 63541,
      wholesale2: 59375,
      wholesale3: 55333,
    },
    wholesalePrices: {
      wholesale1: 1525000,
      wholesale2: 1425000,
      wholesale3: 1328000,
    },
    tierRules: [
      { tier: 'retail', minQty: 1, label: 'Lẻ (1-23 hộp)' },
      { tier: 'wholesale1', minQty: 24, label: 'Sỉ 1 (Từ 1 thùng - 24 hộp)' },
      { tier: 'wholesale2', minQty: 72, label: 'Sỉ 2 (Từ 3 thùng - 72 hộp)' },
      { tier: 'wholesale3', minQty: 240, label: 'Sỉ 3 (Từ 10 thùng - 240 hộp)' },
    ],
    origin: 'Cầu Đất & Đắk Lắk (Vỏ quả cà phê Arabica kết hợp gừng sẻ Đắk Lắk sấy dẻo)',
    specs: {
      'Thành phần': 'Vỏ quả cà phê Arabica, gừng sẻ già Đắk Lắk thái lát',
      'Hương vị': 'Cay nhẹ ấm áp đầu lưỡi, ngọt hậu tự nhiên của thịt quả cà phê',
    },
    highlights: [
      'Gừng sẻ già nhiều tinh dầu làm ấm tỳ vị và tăng cường miễn dịch',
      'Thích hợp cho quán trà dưỡng sinh, spa và các gói quà tặng sức khỏe',
    ],
    certifications: ['VietGAP', 'HACCP'],
    description: 'Sự kết hợp giữa vỏ quả cà phê giàu chất chống oxy hóa và gừng già nồng nàn, mang lại ly trà thơm dịu giúp làm ấm cơ thể và bảo vệ hệ hô hấp. Sản phẩm phân phối bởi G-ROOSTER.',
    shelfLife: '18 tháng',
    barcode: '8936081290073',
    exportPricing: {
      fclNoOem: 1850000,
      fclOem: 2000000,
      unitLabel: 'Thùng 24 hộp',
      usdEstimate: '~70.81 USD/thùng',
    },
  },
  {
    id: 'vtn-tra-xa-den',
    partnerId: 'tra-cascara-thao-moc',
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi G-ROOSTER CO.,LTD',
    name: 'Trà Xạ Đen Túi Lọc Thảo Mộc Tự Nhiên',
    variant: 'Hộp 20 gói túi lọc (35g) chuẩn niêm yết bán lẻ | Thùng 24 hộp',
    category: 'Trà Cascara & Thảo Mộc',
    subCategory: 'Trà Cascara & Xạ Đen',
    image: '/images/cascara/tra-xa-den-real.jpg',
    images: [
      '/images/cascara/tra-xa-den-real.jpg',
    ],
    unit: 'Hộp 35g (20 gói)',
    retailUnit: 'Hộp 35g',
    wholesaleUnit: 'THÙNG',
    wholesaleUnitLabel: 'Thùng 24 hộp',
    unitsPerWholesale: 24,
    packaging: 'Hộp 20 gói x ~1.8g (Thùng 24 hộp)',
    moq: 1,
    prices: {
      retail: 82000,
      wholesale1: 63541,
      wholesale2: 59375,
      wholesale3: 55333,
    },
    wholesalePrices: {
      wholesale1: 1525000,
      wholesale2: 1425000,
      wholesale3: 1328000,
    },
    tierRules: [
      { tier: 'retail', minQty: 1, label: 'Lẻ (1-23 hộp)' },
      { tier: 'wholesale1', minQty: 24, label: 'Sỉ 1 (Từ 1 thùng - 24 hộp)' },
      { tier: 'wholesale2', minQty: 72, label: 'Sỉ 2 (Từ 3 thùng - 72 hộp)' },
      { tier: 'wholesale3', minQty: 240, label: 'Sỉ 3 (Từ 10 thùng - 240 hộp)' },
    ],
    origin: 'Hòa Bình, Việt Nam (100% thân và lá cây xạ đen nguyên chất thu hoạch tự nhiên)',
    specs: {
      'Thành phần': '100% lá và thân cây xạ đen sao vàng hạ thổ',
      'Quy cách': '20 túi lọc tiện lợi, dễ hãm tại văn phòng hoặc gia đình',
      'Hương vị': 'Thơm thảo mộc đặc trưng, vị đắng dịu thanh mát sau họng',
    },
    highlights: [
      'Dược liệu quý của vùng núi Hòa Bình giúp thanh nhiệt, giải độc gan',
      'Hỗ trợ ổn định huyết áp, nâng cao sức đề kháng cơ thể',
      'Đóng gói túi lọc màng bắp sinh học tự hủy an toàn thực phẩm',
    ],
    certifications: ['OCOP 3 Sao', 'HACCP Codex 2020', 'ATVSTP'],
    description: 'Trà Xạ Đen túi lọc thượng hạng được sao vàng hạ thổ theo bí quyết cổ truyền, giữ trọn vẹn dược tính quý giúp thanh nhiệt, giải độc cơ thể và tăng cường đề kháng. Sản phẩm phân phối bởi G-ROOSTER.',
    shelfLife: '24 tháng',
    barcode: '8936081290080',
    exportPricing: {
      fclNoOem: 1850000,
      fclOem: 2000000,
      unitLabel: 'Thùng 24 hộp',
      usdEstimate: '~70.81 USD/thùng',
    },
  },

  // ==========================================
  // 3. DÒNG NƯỚC CỐT QUẢ CÀ PHÊ - SYRUP CASCARA (2 SP)
  // ==========================================
  {
    id: 'vtn-syrup-cascara-700ml',
    partnerId: 'tra-cascara-thao-moc',
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi G-ROOSTER CO.,LTD',
    name: 'Nước Cốt Quả Cà Phê Chín Mọng 700ml (Chai Thủy Tinh)',
    variant: 'Chai thủy tinh cao cấp quầy bar | Thùng 12 chai',
    category: 'Syrup & Nước Cốt Cà Phê',
    subCategory: 'Syrup Cascara',
    image: '/images/cascara/syrup-cascara-700ml-real.jpg',
    images: [
      '/images/cascara/syrup-cascara-700ml-real.jpg',
    ],
    unit: 'Chai 700ml',
    retailUnit: 'Chai 700ml',
    wholesaleUnit: 'THÙNG',
    wholesaleUnitLabel: 'Thùng 12 chai',
    unitsPerWholesale: 12,
    packaging: 'Chai thủy tinh 700ml nắp vặn kim loại (Thùng 12 chai)',
    moq: 1,
    prices: {
      retail: 150000,
      wholesale1: 116250, // 1.395.000 / 12
      wholesale2: 108750, // 1.305.000 / 12
      wholesale3: 101250, // 1.215.000 / 12
    },
    wholesalePrices: {
      wholesale1: 1395000, // Sỉ 1: 1.395.000 đ/thùng (12 chai)
      wholesale2: 1305000, // Sỉ 2: 1.305.000 đ/thùng (12 chai)
      wholesale3: 1215000, // Sỉ 3: 1.215.000 đ/thùng (12 chai)
    },
    tierRules: [
      { tier: 'retail', minQty: 1, label: 'Lẻ (1-11 chai)' },
      { tier: 'wholesale1', minQty: 12, label: 'Sỉ 1 (Từ 1 thùng - 12 chai)' },
      { tier: 'wholesale2', minQty: 36, label: 'Sỉ 2 (Từ 3 thùng - 36 chai)' },
      { tier: 'wholesale3', minQty: 120, label: 'Sỉ 3 (Từ 10 thùng - 120 chai)' },
    ],
    origin: 'Cầu Đất, Đà Lạt (Cô đặc từ 100% vỏ và thịt quả cà phê Arabica chín mọng)',
    specs: {
      'Thể tích': '700ml',
      'Độ Brix': '65° Brix (Độ sánh đậm đặc chuẩn pha chế)',
      'Thành phần': 'Chiết xuất vỏ quả cà phê Arabica, đường mía thô tự nhiên',
      'Màu sắc': 'Nâu cánh gián ánh hổ phách',
    },
    highlights: [
      'Nguyên liệu độc quyền sáng tạo món Cascara Soda, Coffee Mocktail và trà trái cây',
      'Chai thủy tinh sang trọng đặt quầy pha chế quầy bar Specialty',
      'Độ sánh cao giúp định lượng chuẩn xác từng ml, tiết kiệm chi phí ly đồ uống',
    ],
    certifications: ['HACCP', 'ISO 22000', 'VietGAP'],
    description: 'Nước cốt cô đặc từ vỏ thịt quả cà phê Cầu Đất nguyên chất. Hương vị độc đáo hòa quyện giữa quả mọng chua nhẹ và mật mía ngọt thanh, tạo nên các món mocktail đẳng cấp. Sản phẩm phân phối bởi G-ROOSTER.',
    shelfLife: '18 tháng',
    barcode: '8936081290097',
    exportPricing: {
      fclNoOem: 1720000,
      fclOem: 1880000,
      unitLabel: 'Thùng 12 chai',
      usdEstimate: '~65.84 USD/thùng',
    },
  },
  {
    id: 'vtn-syrup-cascara-1000ml',
    partnerId: 'tra-cascara-thao-moc',
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi G-ROOSTER CO.,LTD',
    name: 'Nước Cốt Quả Cà Phê Chín Mọng 1.000ml (Túi Refill F&B)',
    variant: 'Túi refill Horeca có vòi rót tiết kiệm | Thùng 10 túi',
    category: 'Syrup & Nước Cốt Cà Phê',
    subCategory: 'Syrup Cascara',
    image: '/images/cascara/syrup-cascara-1000ml-real.jpg',
    images: [
      '/images/cascara/syrup-cascara-1000ml-real.jpg',
    ],
    unit: 'Túi refill 1.000ml',
    retailUnit: 'Túi 1.000ml',
    wholesaleUnit: 'THÙNG',
    wholesaleUnitLabel: 'Thùng 10 túi',
    unitsPerWholesale: 10,
    packaging: 'Túi nhôm màng ghép có vòi rót 1.000ml (Thùng 10 túi)',
    moq: 1,
    prices: {
      retail: 160000,
      wholesale1: 124000, // 1.240.000 / 10
      wholesale2: 116000, // 1.160.000 / 10
      wholesale3: 108000, // 1.080.000 / 10
    },
    wholesalePrices: {
      wholesale1: 1240000, // Sỉ 1: 1.240.000 đ/thùng (10 túi)
      wholesale2: 1160000, // Sỉ 2: 1.160.000 đ/thùng (10 túi)
      wholesale3: 1080000, // Sỉ 3: 1.080.000 đ/thùng (10 túi)
    },
    tierRules: [
      { tier: 'retail', minQty: 1, label: 'Lẻ (1-9 túi)' },
      { tier: 'wholesale1', minQty: 10, label: 'Sỉ 1 (Từ 1 thùng - 10 túi)' },
      { tier: 'wholesale2', minQty: 30, label: 'Sỉ 2 (Từ 3 thùng - 30 túi)' },
      { tier: 'wholesale3', minQty: 100, label: 'Sỉ 3 (Từ 10 thùng - 100 túi)' },
    ],
    origin: 'Cầu Đất, Đà Lạt',
    specs: {
      'Thể tích': '1.000ml (1 Lít)',
      'Độ Brix': '65° Brix',
      'Bao bì': 'Túi nhôm có vòi rót tiện dụng, chống oxy hóa',
      'Ứng dụng': 'Pha chế chuỗi F&B, trà sữa, cocktail, sốt bánh tráng miệng',
    },
    highlights: [
      'Dung tích lớn 1.000ml tối ưu chi phí nguyên liệu cho chuỗi nhà hàng, quán cafe',
      'Bao bì túi refill thân thiện môi trường, giảm chi phí vận chuyển',
      'Độ bền màu và hương vị ổn định trong suốt quá trình sử dụng',
    ],
    certifications: ['HACCP', 'ISO 22000'],
    description: 'Quy cách túi refill 1.000ml có vòi rót chuyên dụng cho chuỗi F&B và bếp trung tâm. Mang đến sự tối ưu chi phí tốt nhất với chất lượng nước cốt cô đặc không đổi. Sản phẩm phân phối bởi G-ROOSTER.',
    shelfLife: '18 tháng',
    barcode: '8936081290103',
    exportPricing: {
      fclNoOem: 1520000,
      fclOem: 1660000,
      unitLabel: 'Thùng 10 túi',
      usdEstimate: '~58.18 USD/thùng',
    },
  },
];
