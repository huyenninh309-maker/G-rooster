import { Recipe } from '../types';

export const SOCOLA_RECIPES: Recipe[] = [
  // 1. Cacao Nóng Nguyên Bản
  {
    id: 'recipe-cacao-nong-nguyen-ban',
    title: 'Cacao Nóng Nguyên Bản (Classic Hot Artisan Cocoa)',
    partnerId: 'socola-qua-tang',
    productName: 'Bột cacao nguyên chất 100% không đường 150g',
    productIds: ['bot-cacao-nguyen-chat-150g'],
    category: 'Đồ uống bồi bổ',
    prepTime: '3 phút',
    yields: '1 ly 300ml',
    difficulty: 'Dễ',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80',
    description: 'Ly cacao nóng hổi thơm nồng đậm đà từ 100% cacao Bến Tre lên men mộc mạc, hòa cùng sữa tươi nóng tạo bọt mịn màng và mật ong hoa rừng ngọt dịu. Thức uống kinh điển mùa đông cho mọi quán cà phê.',
    costPerServing: 9500,
    recommendedMenuPrice: 42000,
    profitPerServing: 32500,
    profitMarginPercent: 77,
    shopOwnerBenefits: 'Biên lợi nhuận 77%, chi phí vốn chỉ 9.500₫/ly. Thức uống giữ chân khách mùa mưa và mùa lạnh, tỷ lệ khách gọi lại trên 80%. Tốc độ pha chế chỉ 3 phút không cần máy móc đắt tiền.',
    monthlyProfit30: 29250000,
    monthlyProfit50: 48750000,
    ingredients: [
      { name: 'Bột cacao nguyên chất 100% Chút Chíu', amount: '15g', note: 'Rây mịn', productId: 'bot-cacao-nguyen-chat-150g' },
      { name: 'Sữa tươi thanh trùng tiệt trùng nóng 75°C', amount: '180ml', note: 'Tạo bọt sữa mịn' },
      { name: 'Sữa đặc có đường hoặc mật ong tự nhiên', amount: '25ml' },
      { name: 'Nước sôi 90°C hòa tan bột', amount: '30ml' },
      { name: 'Bột cacao rắc trang trí mặt bọt', amount: '1g', productId: 'bot-cacao-nguyen-chat-150g' },
    ],
    steps: [
      'Cho 15g bột cacao nguyên chất Chút Chíu vào ly, rót 30ml nước sôi 90°C khuấy đều cho bột tan mịn thành sốt cacao sánh đặc.',
      'Thêm 25ml sữa đặc hoặc mật ong vào sốt cacao, khuấy đều.',
      'Đánh nóng 180ml sữa tươi lên nhiệt độ 70-75°C bằng vòi steam hoặc ca tạo bọt cầm tay cho đến khi bọt sữa mịn như nhung.',
      'Rót sữa tươi nóng vào ly cacao, dùng thìa giữ bọt rót sau cùng lên bề mặt.',
      'Rây nhẹ 1 lớp bột cacao Chút Chíu lên trên cùng để tạo điểm nhấn thị giác sang trọng.'
    ],
    baristaNotes: [
      'Nhiệt độ sữa không nên vượt quá 75°C để tránh làm mất enzyme tự nhiên và vị béo thơm của sữa.',
      'Bột cacao nguyên chất Chút Chíu có hàm lượng bơ cacao tự nhiên cao, hương vị đắng thanh mộc không gắt.'
    ]
  },

  // 2. Matcha Socola Tan Chảy
  {
    id: 'recipe-matcha-socola-tan-chay',
    title: 'Matcha Socola Tan Chảy (Velvet Matcha Chocolate Fusion)',
    partnerId: 'socola-qua-tang',
    productName: 'Kẹo socola đen 70% cacao 50g & Bột Matcha Laka',
    productIds: ['socola-den-70-cacao-50g', 'vtn-matcha-laka-ceremonial'],
    category: 'Trà & Giải khát',
    prepTime: '4 phút',
    yields: '1 ly 360ml',
    difficulty: 'Dễ',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    description: 'Sự giao thoa tuyệt mỹ giữa tầng sốt socola đen 70% tan chảy sóng sánh dưới đáy, tầng sữa tươi béo ngậy ướp lạnh ở giữa và lớp trà xanh Matcha Laka Ceremonial ngọc bích bồng bềnh bên trên.',
    costPerServing: 16500,
    recommendedMenuPrice: 59000,
    profitPerServing: 42500,
    profitMarginPercent: 72,
    shopOwnerBenefits: 'Biên lợi nhuận 72%, lợi nhuận 42.500₫/ly. Thức uống "triệu view" hút khách Gen Z check-in chụp ảnh, giúp quán tăng mạnh đơn hàng trên các ứng dụng giao đồ ăn.',
    monthlyProfit30: 38250000,
    monthlyProfit50: 63750000,
    ingredients: [
      { name: 'Socola đen 70% Chút Chíu đun cách thủy', amount: '25g', note: 'Nấu chảy thành sốt', productId: 'socola-den-70-cacao-50g' },
      { name: 'Bột Matcha Laka Ceremonial', amount: '3.5g', note: 'Đánh bông bằng chổi chasen', productId: 'vtn-matcha-laka-ceremonial' },
      { name: 'Sữa tươi thanh trùng ướp lạnh 2-4°C', amount: '130ml' },
      { name: 'Kem béo thực vật whipping cream', amount: '20ml' },
      { name: 'Đá viên tinh khiết', amount: '140g' },
    ],
    steps: [
      'Bẻ nhỏ 25g socola đen 70% Chút Chíu, thêm 10ml sữa nóng rồi đun cách thủy 1 phút thành sốt socola sánh mịn.',
      'Rót sốt socola nóng chảy viền quanh thành và đọng thành lớp dày dưới đáy ly thủy tinh trong suốt.',
      'Cho đá viên vào 2/3 ly, rót hỗn hợp sữa tươi thanh trùng và kem béo lạnh vào.',
      'Đánh tan 3.5g bột Matcha Laka với 40ml nước ấm 80°C cho nổi bọt ngọc bích.',
      'Rót nhẹ matcha lên trên cùng mặt đá để tạo hiệu ứng phân 3 tầng màu tuyệt đẹp: Đen Cacao - Trắng Kem - Xanh Matcha.'
    ],
    baristaNotes: [
      'Khuyên khách dùng ống hút cắm sát đáy hút ngụm đầu để cảm nhận socola nóng ấm tan chảy hòa vào sữa matcha lạnh buốt cực kỳ sảng khoái.',
      'Socola đen 70% Chút Chíu chứa bơ cacao tự nhiên giúp sốt bám thành ly mà không bị tan rã quá nhanh.'
    ]
  },

  // 3. Cafe Mocha Hạt Dẻ
  {
    id: 'recipe-cafe-mocha-hat-de',
    title: 'Cafe Mocha Hạt Dẻ (Hazelnut Mocha Latte)',
    partnerId: 'socola-qua-tang',
    productName: 'Kẹo Socola Sữa Cà phê 50g & Cà phê Arabica sấy thăng hoa',
    productIds: ['socola-sua-ca-phe-50g', 'vtn-espresso-freeze-dried'],
    category: 'Cà phê đặc sản',
    prepTime: '3 phút',
    yields: '1 ly 350ml',
    difficulty: 'Dễ',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80',
    description: 'Sự hòa quyện nồng nàn giữa viên cà phê Arabica Cầu Đất sấy thăng hoa thơm lừng cùng sốt socola sữa cà phê Chút Chíu và siro hạt dẻ bùi ngậy, phủ lớp kem tươi bồng bềnh.',
    costPerServing: 15000,
    recommendedMenuPrice: 55000,
    profitPerServing: 40000,
    profitMarginPercent: 73,
    shopOwnerBenefits: 'Biên lợi nhuận 73%, lãi 40.000₫/ly. Món cà phê signature cho phân khúc khách văn phòng sang trọng, uống sáng hoặc chiều tăng cường sự tỉnh táo sáng tạo.',
    monthlyProfit30: 36000000,
    monthlyProfit50: 60000000,
    ingredients: [
      { name: 'Socola sữa cà phê Chút Chíu', amount: '20g', note: 'Nấu chảy', productId: 'socola-sua-ca-phe-50g' },
      { name: 'Viên cà phê Arabica sấy thăng hoa Chút Chíu', amount: '1 viên (2g)', productId: 'vtn-espresso-freeze-dried' },
      { name: 'Siro hạt dẻ nướng (Hazelnut)', amount: '15ml' },
      { name: 'Sữa tươi thanh trùng nóng', amount: '150ml' },
      { name: 'Bông kem tươi whipping cream xịt bề mặt', amount: '20g' },
      { name: 'Vụn socola sữa rắc trang trí', amount: '3g', productId: 'socola-sua-ca-phe-50g' },
    ],
    steps: [
      'Hòa tan viên cà phê sấy thăng hoa với 35ml nước nóng tạo shot espresso đậm đặc.',
      'Nấu chảy 20g socola sữa cà phê Chút Chíu cùng siro hạt dẻ vào đáy ly.',
      'Rót shot espresso vào ly và khuấy đều tạo lớp nền mocha thơm ngát.',
      'Rót từ từ 150ml sữa tươi nóng tạo bọt vào ly.',
      'Xịt một bông kem tươi xoáy ốc lên trên và rắc vụn socola sữa cà phê Chút Chíu lên đỉnh chóp.'
    ],
    baristaNotes: [
      'Socola sữa cà phê Chút Chíu có sẵn thành phần cà phê nguyên chất giúp hương vị mocha đồng nhất và sâu lắng hơn sốt công nghiệp.'
    ]
  },

  // 4. Cacao Cốt Dừa Đá Tuyết
  {
    id: 'recipe-cacao-cot-dua-da-tuyet',
    title: 'Cacao Cốt Dừa Đá Tuyết (Frozen Coconut Cocoa Slush)',
    partnerId: 'socola-qua-tang',
    productName: 'Bột socola sữa Balance 150g & Socola sữa dừa',
    productIds: ['bot-socola-sua-balance-150g', 'socola-sua-dua-50g'],
    category: 'Trà & Giải khát',
    prepTime: '4 phút',
    yields: '1 ly 450ml',
    difficulty: 'Dễ',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    description: 'Thức uống giải nhiệt đỉnh cao mùa hè xứ nhiệt đới: Dòng đá tuyết cốt dừa Bến Tre xay nhuyễn mịn màng mát lạnh, hòa quyện cùng dòng sốt cacao đặc sánh đậm đà và dừa non sấy giòn.',
    costPerServing: 14000,
    recommendedMenuPrice: 52000,
    profitPerServing: 38000,
    profitMarginPercent: 73,
    shopOwnerBenefits: 'Biên lợi nhuận 73%, lợi nhuận 38.000₫/ly. Best-seller cho các quán cà phê sân vườn hoặc khu vực nắng nóng quanh năm, khách uống đã khát mà không ngán.',
    monthlyProfit30: 34200000,
    monthlyProfit50: 57000000,
    ingredients: [
      { name: 'Bột socola sữa Balance Chút Chíu', amount: '20g', productId: 'bot-socola-sua-balance-150g' },
      { name: 'Nước cốt dừa nguyên chất Bến Tre', amount: '60ml' },
      { name: 'Sữa đặc có đường', amount: '35ml' },
      { name: 'Sữa tươi không đường', amount: '40ml' },
      { name: 'Đá bi tinh khiết xay nhuyễn', amount: '200g' },
      { name: 'Socola sữa dừa Chút Chíu băm nhỏ rắc mặt', amount: '10g', productId: 'socola-sua-dua-50g' },
    ],
    steps: [
      'Khuấy tan 20g bột socola sữa Balance Chút Chíu với 30ml nước sôi thành hỗn hợp sốt cacao sền sệt, rưới 1/2 vào lòng thành ly để tạo vân cẩm thạch.',
      'Cho nước cốt dừa, sữa tươi, sữa đặc và đá bi vào cối xay sinh tố công nghiệp, xay nhuyễn mịn thành tuyết dừa xốp trắng.',
      'Đổ đá tuyết cốt dừa vào ly đã rưới sốt cacao.',
      'Rót 1/2 lượng sốt cacao còn lại lên bề mặt đá tuyết.',
      'Rắc đều vụn socola sữa dừa Chút Chíu giòn tan lên trên cùng thưởng thức ngay.'
    ],
    baristaNotes: [
      'Đá tuyết phải xay thật mịn không còn lợn cợn để khi tan trong miệng tạo cảm giác êm ái như kem gelato.'
    ]
  },

  // 5. Socola Nóng Bến Tre Nguyên Chất
  {
    id: 'recipe-socola-nong-ben-tre',
    title: 'Socola Nóng Bến Tre Thượng Hạng (Single-Origin Dark Hot Chocolate)',
    partnerId: 'socola-qua-tang',
    productName: 'Kẹo socola đen 85% cacao ít đường 100g',
    productIds: ['socola-den-85-cacao-100g'],
    category: 'Đồ uống bồi bổ',
    prepTime: '4 phút',
    yields: '1 tách 250ml',
    difficulty: 'Trung bình',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    description: 'Tách socola nóng nguyên chất theo phong cách Parisian cao cấp: Nấu tan chảy từ thanh socola đen 85% Cacao Bến Tre cùng kem béo sữa tươi, sánh đặc đậm đà với hậu vị trái cây nhiệt đới lên men độc bản.',
    costPerServing: 18500,
    recommendedMenuPrice: 65000,
    profitPerServing: 46500,
    profitMarginPercent: 72,
    shopOwnerBenefits: 'Biên lợi nhuận 72%, lợi nhuận 46.500₫/tách. Dành riêng cho phân khúc khách sành điệu, khách nước ngoài và tín đồ chocolate nghệ thuật.',
    monthlyProfit30: 41850000,
    monthlyProfit50: 69750000,
    ingredients: [
      { name: 'Socola đen 85% Cacao Chút Chíu cắt nhỏ', amount: '40g', productId: 'socola-den-85-cacao-100g' },
      { name: 'Sữa tươi nguyên kem thanh trùng', amount: '120ml' },
      { name: 'Whipping cream nguyên chất', amount: '40ml' },
      { name: 'Đường nâu hữu cơ hoặc mật hoa dừa', amount: '5g' },
      { name: 'Muối biển hồng Himalaya', amount: '1 nhúm nhỏ' },
    ],
    steps: [
      'Cho sữa tươi nguyên kem và whipping cream vào nồi nhỏ, đun lửa nhỏ liu riu tới 80°C (không để sôi bùng).',
      'Tắt bếp, cho 40g socola đen 85% Cacao Chút Chíu đã băm nhỏ vào nồi.',
      'Dùng phới lồng khuấy đều liên tục trong 1.5 phút cho tới khi socola tan hoàn toàn thành khối chất lỏng bóng mượt, sánh đặc quyến rũ.',
      'Thêm chút đường nâu và nhúm muối hồng để kích thích tối đa tầng hương bơ cacao.',
      'Rót ra tách sứ giữ nhiệt ấm nóng, phục vụ kèm bánh quy bơ giòn.'
    ],
    baristaNotes: [
      'Muối biển hồng là bí quyết của các Chocolatier Pháp giúp đánh thức vị ngọt hậu ẩn sâu trong hạt cacao 85%.'
    ]
  },

  // 6. Mocha Latte Bơ Cacao Cầu Đất
  {
    id: 'recipe-mocha-latte-bo-cacao',
    title: 'Mocha Latte Bơ Cacao Cầu Đất (Artisan Cocoa Butter Mocha)',
    partnerId: 'socola-qua-tang',
    productName: 'Kẹo socola đen 100% không đường 50g & Cà phê viên sấy',
    productIds: ['socola-den-100-khong-duong-50g', 'vtn-espresso-freeze-dried'],
    category: 'Cà phê đặc sản',
    prepTime: '3 phút',
    yields: '1 ly 350ml',
    difficulty: 'Dễ',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    description: 'Sự kết hợp tinh hoa nông sản Việt: Hạt Arabica Cầu Đất sấy thăng hoa hòa cùng bơ cacao và socola đen 100% không đường Bến Tre. Hương thơm quý phái, vị đắng dịu êm không khé cổ.',
    costPerServing: 16000,
    recommendedMenuPrice: 58000,
    profitPerServing: 42000,
    profitMarginPercent: 72,
    shopOwnerBenefits: 'Biên lợi nhuận 72%, lợi nhuận 42.000₫/ly. Thu hút nhóm khách hàng "Keto / Ăn kiêng / Tiểu đường" nhờ sử dụng 100% Cacao không đường kết hợp cà phê sạch.',
    monthlyProfit30: 37800000,
    monthlyProfit50: 63000000,
    ingredients: [
      { name: 'Socola đen 100% không đường Chút Chíu', amount: '20g', productId: 'socola-den-100-khong-duong-50g' },
      { name: 'Viên cà phê Arabica sấy thăng hoa Chút Chíu', amount: '1 viên', productId: 'vtn-espresso-freeze-dried' },
      { name: 'Sữa hạt yến mạch hoặc sữa tươi nguyên kem', amount: '160ml' },
      { name: 'Đường ăn kiêng cỏ ngọt Isomalt', amount: '3g', note: 'Tùy chọn' },
      { name: 'Bột cacao Chút Chíu rắc tạo hình latte art', amount: '1g', productId: 'bot-cacao-nguyen-chat-150g' },
    ],
    steps: [
      'Nấu tan chảy 20g socola đen 100% Chút Chíu với 20ml sữa nóng.',
      'Hòa tan viên cà phê sấy thăng hoa tạo shot espresso, đổ vào hỗn hợp socola khuấy nhuyễn.',
      'Đánh bọt sữa yến mạch nóng 65°C đạt độ mịn microfoam hoàn hảo.',
      'Rót sữa bọt vào ly tạo hình hoa tulip hoặc trái tim nghệ thuật.',
      'Rắc nhẹ chút bột cacao nguyên chất lên viền tách.'
    ],
    baristaNotes: [
      'Bơ cacao tự nhiên trong socola đen 100% Chút Chíu tạo độ sánh mượt tự nhiên mà không cần bất kỳ chất làm đặc hóa học nào.'
    ]
  },

  // 7. Cacao Trân Châu Đường Đen Kem Béo
  {
    id: 'recipe-cacao-tran-chau-duong-den',
    title: 'Cacao Trân Châu Đường Đen Kem Béo (Brown Sugar Cocoa Boba)',
    partnerId: 'socola-qua-tang',
    productName: 'Bột cacao nguyên chất 100% không đường 150g',
    productIds: ['bot-cacao-nguyen-chat-150g'],
    category: 'Trà & Giải khát',
    prepTime: '3 phút',
    yields: '1 ly 500ml',
    difficulty: 'Dễ',
    image: 'https://images.unsplash.com/photo-1558857563-b37cf05d8a58?auto=format&fit=crop&w=800&q=80',
    description: 'Phiên bản nâng cấp đỉnh cao của món trà sữa trân châu truyền thống: Trân châu dẻo thơm ngấm đường đen nóng ấm dưới đáy, sữa tươi thanh trùng mát lạnh và lớp cacao kem béo đậm đặc phủ trên mặt.',
    costPerServing: 13500,
    recommendedMenuPrice: 48000,
    profitPerServing: 34500,
    profitMarginPercent: 72,
    shopOwnerBenefits: 'Biên lợi nhuận 72%, lợi nhuận 34.500₫/ly. Món ăn vặt "quốc dân" của học sinh, sinh viên và nhân viên văn phòng, tăng doanh thu giờ tan tầm.',
    monthlyProfit30: 31050000,
    monthlyProfit50: 51750000,
    ingredients: [
      { name: 'Bột cacao nguyên chất 100% Chút Chíu', amount: '18g', productId: 'bot-cacao-nguyen-chat-150g' },
      { name: 'Trân châu đen nấu mềm ngâm mật mía', amount: '60g' },
      { name: 'Sữa tươi thanh trùng ướp lạnh', amount: '140ml' },
      { name: 'Kem béo mặn cheese foam hoặc macchiato', amount: '40ml' },
      { name: 'Đá viên tinh khiết', amount: '150g' },
    ],
    steps: [
      'Múc 60g trân châu đường đen còn ấm nóng vào đáy ly, miết đường đen men theo thành ly tạo vân hổ rực rỡ.',
      'Cho đá viên đầy 2/3 ly rồi rót 140ml sữa tươi thanh trùng lạnh vào.',
      'Khuấy tan 18g bột cacao Chút Chíu với 30ml nước ấm và 15ml sữa đặc thành sốt cacao đậm màu.',
      'Rót sốt cacao lên trên mặt đá tạo tầng màu nâu đen huyền bí.',
      'Phủ lớp kem béo macchiato lên trên cùng, rắc thêm chút cacao vụn.'
    ],
    baristaNotes: [
      'Trân châu giữ ở nhiệt độ 50-60°C trong nồi ủ để giữ trọn vẹn độ dẻo dai mềm mại suốt cả ngày bán.'
    ]
  },

  // 8. Cacao Cam Quế Nóng Mùa Đông
  {
    id: 'recipe-cacao-cam-que-nong',
    title: 'Cacao Cam Quế Nóng Mùa Đông (Spiced Winter Orange Cocoa)',
    partnerId: 'socola-qua-tang',
    productName: 'Bột cacao nguyên chất 100% không đường 150g & Socola đen 70%',
    productIds: ['bot-cacao-nguyen-chat-150g', 'socola-den-70-cacao-50g'],
    category: 'Đồ uống bồi bổ',
    prepTime: '4 phút',
    yields: '1 tách 300ml',
    difficulty: 'Dễ',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80',
    description: 'Thức uống làm ấm cơ thể và thư giãn thần kinh tuyệt đối: Vị đắng nồng của cacao Bến Tre hòa quyện cùng tinh dầu vỏ cam vàng nướng, thanh quế Trà Bồng thơm lừng và mật ong hoa rừng ngọt lành.',
    costPerServing: 12000,
    recommendedMenuPrice: 48000,
    profitPerServing: 36000,
    profitMarginPercent: 75,
    shopOwnerBenefits: 'Biên lợi nhuận 75%, lợi nhuận 36.000₫/tách. Tác dụng giữ ấm cổ họng, tăng sức đề kháng và giảm căng thẳng, rất đắt khách vào mùa thu đông và mùa mưa.',
    monthlyProfit30: 32400000,
    monthlyProfit50: 54000000,
    ingredients: [
      { name: 'Bột cacao nguyên chất 100% Chút Chíu', amount: '15g', productId: 'bot-cacao-nguyen-chat-150g' },
      { name: 'Thanh quế vỏ tự nhiên Trà Bồng', amount: '1 thanh' },
      { name: 'Cam vàng cắt lát nướng thơm', amount: '2 lát' },
      { name: 'Sữa tươi nóng 70°C', amount: '160ml' },
      { name: 'Mật ong hoa rừng tự nhiên', amount: '20ml' },
    ],
    steps: [
      'Cho lát cam vàng và thanh quế vào ly, dùng chày dầm nhẹ để tinh dầu cam quế ứa ra thơm phức.',
      'Khuấy tan 15g bột cacao Chút Chíu với 40ml nước sôi và 20ml mật ong.',
      'Rót sữa tươi nóng đã tạo bọt nhẹ vào ly.',
      'Dùng thanh quế khuấy nhẹ làm muỗng khuấy tự nhiên.',
      'Thả 1 lát cam vàng nướng nổi bồng bềnh trên lớp bọt sữa nâu nhạt.'
    ],
    baristaNotes: [
      'Hương cam quýt tự nhiên tôn vinh tầng hương trái cây lên men nguyên bản của hạt cacao Bến Tre một cách xuất sắc.'
    ]
  },

  // 9. Trà Sữa Cacao Bến Tre Kem Cheese
  {
    id: 'recipe-tra-sua-cacao-kem-cheese',
    title: 'Trà Sữa Cacao Bến Tre Kem Cheese (Artisan Cocoa Milk Tea Cheese Foam)',
    partnerId: 'socola-qua-tang',
    productName: 'Bột socola sữa Balance 150g & Bột cacao nguyên chất',
    productIds: ['bot-socola-sua-balance-150g', 'bot-cacao-nguyen-chat-150g'],
    category: 'Trà & Giải khát',
    prepTime: '3 phút',
    yields: '1 ly 500ml',
    difficulty: 'Dễ',
    image: 'https://images.unsplash.com/photo-1558857563-b37cf05d8a58?auto=format&fit=crop&w=800&q=80',
    description: 'Sự phối trộn độc đáo giữa cốt trà đen Tây Bắc đậm đà thơm ngát, bột cacao socola Balance ngọt dịu béo thơm và lớp kem phô mai cheese foam mằn mặn ngậy béo xao xuyến lòng người.',
    costPerServing: 14000,
    recommendedMenuPrice: 50000,
    profitPerServing: 36000,
    profitMarginPercent: 72,
    shopOwnerBenefits: 'Biên lợi nhuận 72%, lợi nhuận 36.000₫/ly. Thức uống cạnh tranh sòng phẳng với các chuỗi trà sữa lớn như Phúc Long, Koi Thé, The Alley.',
    monthlyProfit30: 32400000,
    monthlyProfit50: 54000000,
    ingredients: [
      { name: 'Bột socola sữa Balance Chút Chíu', amount: '25g', productId: 'bot-socola-sua-balance-150g' },
      { name: 'Cốt trà đen ủ nóng', amount: '100ml' },
      { name: 'Sữa tươi thanh trùng', amount: '80ml' },
      { name: 'Kem mặn cheese foam sánh mịn', amount: '50ml' },
      { name: 'Đá viên tinh khiết', amount: '160g' },
    ],
    steps: [
      'Ủ 5g trà đen với 100ml nước sôi 95°C trong 8 phút để lấy cốt trà đậm đà.',
      'Hòa tan 25g bột socola sữa Balance Chút Chíu trực tiếp vào nước trà nóng.',
      'Thêm sữa tươi và đá viên vào bình shaker, lắc mạnh trong 10 giây cho hòa quyện và làm lạnh sâu.',
      'Rót trà sữa cacao ra ly thủy tinh cao.',
      'Nhẹ nhàng phủ lớp kem phô mai Cheese Foam dày 2cm lên bề mặt, rắc chút bột cacao trang trí.'
    ],
    baristaNotes: [
      'Uống trực tiếp bằng miệng góc 45 độ không dùng ống hút để cảm nhận cùng lúc lớp kem phô mai mằn mặn và trà cacao mát lạnh.'
    ]
  },

  // 10. Brownie Socola từ hạt Cacao Nibs
  {
    id: 'recipe-brownie-socola-cacao-nibs',
    title: 'Bánh Brownie Socola Giòn Hạt Cacao Nibs (Fudgy Cacao Nibs Brownie)',
    partnerId: 'socola-qua-tang',
    productName: 'Kẹo Socola đen 70% cacao 100g & Socola sữa hạt Cacao Nibs',
    productIds: ['socola-den-70-cacao-100g', 'socola-sua-cacao-nibs-50g'],
    category: 'Món Ăn Nhẹ & Topping',
    prepTime: '25 phút',
    yields: 'Khay 8 miếng vuông',
    difficulty: 'Trung bình',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    description: 'Bánh Brownie nướng chuẩn vị Fudgy: Lớp vỏ ngoài nứt giòn nhẹ, phần ruột bên trong ẩm mềm đặc quánh socola 70% béo thơm, điểm xuyết hạt cacao nibs Bến Tre giòn rụm đắng nhẹ kích thích vị giác.',
    costPerServing: 11000,
    recommendedMenuPrice: 38000,
    profitPerServing: 27000,
    profitMarginPercent: 71,
    shopOwnerBenefits: 'Biên lợi nhuận 71%, lãi 27.000₫/miếng. Món bánh ngọt ăn kèm cà phê giúp tăng giá trị đơn hàng trung bình (AOV) của quán lên 40%. Bánh bảo quản tủ mát 5-7 ngày vẫn ngon.',
    monthlyProfit30: 24300000,
    monthlyProfit50: 40500000,
    ingredients: [
      { name: 'Socola đen 70% Chút Chíu', amount: '120g', productId: 'socola-den-70-cacao-100g' },
      { name: 'Bơ nhạt động vật Anchor hoặc Elle & Vire', amount: '80g' },
      { name: 'Hạt cacao nibs Chút Chíu sấy giòn', amount: '35g', productId: 'socola-sua-cacao-nibs-50g' },
      { name: 'Bột cacao nguyên chất 100% Chút Chíu', amount: '25g', productId: 'bot-cacao-nguyen-chat-150g' },
      { name: 'Bột mì đa dụng số 8 hoặc số 11', amount: '50g' },
      { name: 'Trứng gà tươi', amount: '2 quả' },
      { name: 'Đường cát vàng', amount: '70g' },
    ],
    steps: [
      'Đun cách thủy 120g socola đen 70% Chút Chíu cùng 80g bơ nhạt cho tan chảy mịn màng.',
      'Dùng phới lồng đánh tan 2 quả trứng gà cùng đường cát vàng cho bông nhẹ.',
      'Đổ hỗn hợp socola bơ vào trứng, khuấy đều nhẹ nhàng.',
      'Rây bột mì và 25g bột cacao nguyên chất Chút Chíu vào âu, trộn fold đều tay.',
      'Trộn 2/3 hạt cacao nibs vào bột bánh, đổ hỗn hợp vào khuôn vuông có lót giấy nến.',
      'Rắc 1/3 hạt cacao nibs còn lại lên mặt bánh rồi nướng ở 175°C trong 20-22 phút.',
      'Lấy ra để nguội hoàn toàn, cắt thành 8 miếng vuông xinh xắn.'
    ],
    baristaNotes: [
      'Không nướng quá lâu để giữ độ fudgy ẩm mượt quyến rũ bên trong lõi bánh.'
    ]
  },

  // 11. Bánh Mì kẹp Socola Thượng Hạng
  {
    id: 'recipe-banh-mi-socola-thuong-hang',
    title: 'Croissant / Panini Kẹp Socola Nóng Chảy (Artisan Molten Chocolate Croissant)',
    partnerId: 'socola-qua-tang',
    productName: 'Kẹo socola đen 70% cacao 50g & Socola sữa hạnh nhân 50g',
    productIds: ['socola-den-70-cacao-50g', 'socola-sua-hanh-nhan-50g'],
    category: 'Món Ăn Nhẹ & Topping',
    prepTime: '5 phút',
    yields: '1 phần bánh',
    difficulty: 'Dễ',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    description: 'Bánh sừng bò Pháp vỏ ngàn lớp vàng ươm nướng nóng giòn rụm, kẹp đầy thanh socola đen 70% và socola sữa hạnh nhân Chút Chíu tan chảy sánh dẻo thơm ngào ngạt bơ cacao.',
    costPerServing: 16000,
    recommendedMenuPrice: 52000,
    profitPerServing: 36000,
    profitMarginPercent: 69,
    shopOwnerBenefits: 'Biên lợi nhuận 69%, lãi 36.000₫/phần. Món ăn sáng và xế chiều hoàn hảo kết hợp cùng cà phê Americano hoặc Latte, tăng mạnh doanh số ca sáng cho quán.',
    monthlyProfit30: 32400000,
    monthlyProfit50: 54000000,
    ingredients: [
      { name: 'Bánh sừng bò Croissant bơ Pháp nướng sẵn', amount: '1 cái' },
      { name: 'Socola đen 70% Chút Chíu bẻ thanh', amount: '20g', productId: 'socola-den-70-cacao-50g' },
      { name: 'Socola sữa hạnh nhân Chút Chíu bẻ thanh', amount: '20g', productId: 'socola-sua-hanh-nhan-50g' },
      { name: 'Hạnh nhân lát nướng vàng', amount: '5g' },
      { name: 'Đường bột rắc mặt tuyết trang trí', amount: '2g' },
    ],
    steps: [
      'Dùng dao răng cưa rạch dọc thân bánh sừng bò một đường sâu 2/3.',
      'Xếp xen kẽ các thanh socola đen 70% và socola sữa hạnh nhân Chút Chíu vào giữa khe bánh.',
      'Cho bánh vào lò nướng hoặc nồi chiên không dầu ở nhiệt độ 170°C trong 3-4 phút cho socola vừa chảy mềm dẻo.',
      'Lấy bánh ra đĩa, rắc hạnh nhân lát nướng giòn và rây đường tuyết lên bề mặt.',
      'Phục vụ nóng hổi khi socola còn đang ứa ra thơm phức.'
    ],
    baristaNotes: [
      'Sự kết hợp giữa socola đen 70% đậm đà và socola sữa hạnh nhân tạo sự cân bằng ngọt - đắng hoàn hảo.'
    ]
  },

  // 12. Granola Ngũ Cốc Cacao Dinh Dưỡng
  {
    id: 'recipe-granola-ngu-coc-cacao',
    title: 'Granola Ngũ Cốc Cacao Dinh Dưỡng Mộc An (Artisan Cacao Crunchy Granola Bowl)',
    partnerId: 'socola-qua-tang',
    productName: 'Bột yến mạch socola Mộc An 500g & Bột cacao nguyên chất',
    productIds: ['bot-yen-mach-socola-moc-an-500g', 'bot-cacao-nguyen-chat-150g'],
    category: 'Món Ăn Nhẹ & Topping',
    prepTime: '4 phút',
    yields: '1 tô ăn sáng Healthy 350g',
    difficulty: 'Dễ',
    image: 'https://images.unsplash.com/photo-1517093157656-b9ec81640a3f?auto=format&fit=crop&w=800&q=80',
    description: 'Bát ngũ cốc ăn kiêng chuẩn Clean Eating: Sữa chua Hy Lạp sánh đặc phủ ngập bột yến mạch socola Mộc An giòn rụm, hạt macca, óc chó, hạnh nhân, chuối tiêu chín và bột cacao thơm bùi.',
    costPerServing: 15500,
    recommendedMenuPrice: 55000,
    profitPerServing: 39500,
    profitMarginPercent: 72,
    shopOwnerBenefits: 'Biên lợi nhuận 72%, lãi 39.500₫/bát. Thu hút tệp khách hàng tập gym, yoga, văn phòng theo đuổi lối sống lành mạnh, ăn sáng không lo tăng cân.',
    monthlyProfit30: 35550000,
    monthlyProfit50: 59250000,
    ingredients: [
      { name: 'Bột yến mạch socola Dưỡng Dáng Mộc An', amount: '45g', productId: 'bot-yen-mach-socola-moc-an-500g' },
      { name: 'Bột cacao nguyên chất 100% Chút Chíu', amount: '5g', productId: 'bot-cacao-nguyen-chat-150g' },
      { name: 'Sữa chua Hy Lạp không đường Greek Yogurt', amount: '120g' },
      { name: 'Hạt điều, hạnh nhân, hạt bí nướng giòn', amount: '20g', productId: 'socola-sua-hat-dieu-50g' },
      { name: 'Chuối tiêu cắt lát & quả dâu tây tươi', amount: '50g' },
      { name: 'Mật ong hoa rừng tự nhiên', amount: '10ml' },
    ],
    steps: [
      'Cho 120g sữa chua Hy Lạp lạnh vào tô sứ lòng sâu.',
      'Rải đều 45g bột ngũ cốc yến mạch socola Mộc An Chút Chíu tạo độ giòn bùi rôm rốp.',
      'Xếp chuối tiêu cắt lát và dâu tây tươi quanh mép tô.',
      'Rắc hỗn hợp hạt điều hạnh nhân nướng thơm vào giữa.',
      'Rưới một đường mật ong óng ả và rây nhẹ lớp bột cacao nguyên chất Chút Chíu lên trên cùng.'
    ],
    baristaNotes: [
      'Bột yến mạch socola Mộc An giàu chất xơ beta-glucan giúp no lâu, tràn đầy năng lượng làm việc suốt buổi sáng.'
    ]
  },

  // 13. Socola Bọc Dâu Tây Sấy Giòn Tan
  {
    id: 'recipe-socola-boc-dau-tay-say',
    title: 'Dâu Tây Sấy Giòn Bọc Socola Nghệ Thuật (Freeze-Dried Strawberry Choco Bites)',
    partnerId: 'socola-qua-tang',
    productName: 'Kẹo Socola dâu 100g & Socola đen 70% cacao 100g',
    productIds: ['socola-dau-100g', 'socola-den-70-cacao-100g'],
    category: 'Món Ăn Nhẹ & Topping',
    prepTime: '15 phút',
    yields: 'Đĩa 12 viên socola dâu',
    difficulty: 'Dễ',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    description: 'Món tráng miệng và snack ngọt ngào cao cấp: Quả dâu tây Đà Lạt sấy thăng hoa giòn xốp chua thanh, được bao bọc bởi 2 lớp socola đen 70% và socola dâu hồng ngọt ngào tinh tế.',
    costPerServing: 14000,
    recommendedMenuPrice: 48000,
    profitPerServing: 34000,
    profitMarginPercent: 71,
    shopOwnerBenefits: 'Biên lợi nhuận 71%, lãi 34.000₫/phần. Món snack ngọt bán chạy số 1 cho các cặp đôi hẹn hò tại quán, đóng túi zip hoặc hũ thủy tinh làm quà mang về cực kỳ tiện lợi.',
    monthlyProfit30: 30600000,
    monthlyProfit50: 51000000,
    ingredients: [
      { name: 'Quả dâu tây sấy thăng hoa giòn xốp', amount: '12 quả (30g)' },
      { name: 'Socola đen 70% Chút Chíu nấu chảy', amount: '60g', productId: 'socola-den-70-cacao-100g' },
      { name: 'Socola dâu Chút Chíu màu hồng pastel', amount: '40g', productId: 'socola-dau-100g' },
      { name: 'Cơm dừa sấy khô vụn', amount: '10g' },
    ],
    steps: [
      'Nấu chảy 60g socola đen 70% Chút Chíu trong chén sứ cách thủy 45°C.',
      'Dùng tăm nhọn xiên từng quả dâu tây sấy thăng hoa nhúng ngập vào socola đen, vớt ra đặt lên khay có lót giấy nến.',
      'Cho khay vào ngăn mát tủ lạnh 10 phút để lớp socola đen đông cứng.',
      'Nấu chảy 40g socola dâu Chút Chíu, cho vào túi bắt kem cắt đầu nhỏ.',
      'Bắt đường ziczac socola dâu hồng lên bề mặt viên dâu đen, rắc thêm chút vụn dừa khô thơm lừng.',
      'Để lạnh thêm 5 phút là có thể thưởng thức viên kẹo giòn tan thơm béo.'
    ],
    baristaNotes: [
      'Dâu tây sấy thăng hoa giữ nguyên hình dáng và độ chua thanh, đối nghịch tuyệt vời với vị ngọt ngào béo thơm của socola Chút Chíu.'
    ]
  },

  // 14. Panna Cotta Socola Đen Mộc An
  {
    id: 'recipe-panna-cotta-socola-moc-an',
    title: 'Panna Cotta Socola Đen Mộc An (Artisan Dark Chocolate Panna Cotta)',
    partnerId: 'socola-qua-tang',
    productName: 'Kẹo socola đen 85% cacao 100g & Bột đậu nành mè đen Mộc An',
    productIds: ['socola-den-85-cacao-100g', 'bot-dau-nanh-me-den-moc-an-500g'],
    category: 'Món Ăn Nhẹ & Topping',
    prepTime: '20 phút (ủ lạnh 2h)',
    yields: '4 hũ thủy tinh 120ml',
    difficulty: 'Trung bình',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    description: 'Món tráng miệng phong cách Ý mềm mượt núng nính: Tầng dưới là panna cotta kem sữa mè đen Mộc An béo bùi, tầng trên là thạch socola đen 85% Bến Tre đậm đà láng bóng như gương.',
    costPerServing: 12500,
    recommendedMenuPrice: 45000,
    profitPerServing: 32500,
    profitMarginPercent: 72,
    shopOwnerBenefits: 'Biên lợi nhuận 72%, lãi 32.500₫/hũ. Chuẩn bị trước hàng loạt trong tủ lạnh, khi khách gọi chỉ mất 30 giây lấy ra phục vụ. Tăng mạnh doanh số món tráng miệng sau bữa ăn.',
    monthlyProfit30: 29250000,
    monthlyProfit50: 48750000,
    ingredients: [
      { name: 'Socola đen 85% Cacao Chút Chíu', amount: '60g', productId: 'socola-den-85-cacao-100g' },
      { name: 'Bột đậu nành mè đen Mộc An', amount: '25g', productId: 'bot-dau-nanh-me-den-moc-an-500g' },
      { name: 'Kem tươi whipping cream', amount: '160ml' },
      { name: 'Sữa tươi thanh trùng', amount: '140ml' },
      { name: 'Lá gelatin ngâm mềm nước đá', amount: '6g (3 lá)' },
      { name: 'Đường cát', amount: '30g' },
    ],
    steps: [
      'Đun ấm 100ml sữa tươi với bột mè đen Mộc An và 15g đường, hòa tan 3g gelatin đã vắt ráo nước. Rót vào 4 hũ thủy tinh làm tầng 1, để tủ mát 1 giờ cho đông nhẹ.',
      'Đun 160ml whipping cream, 40ml sữa tươi và 15g đường tới 70°C.',
      'Tắt bếp, cho 60g socola đen 85% Chút Chíu và 3g gelatin còn lại vào khuấy tan mịn màng.',
      'Để hỗn hợp socola nguội bớt (khoảng 35°C), nhẹ nhàng rót lên trên bề mặt lớp panna cotta mè đen.',
      'Cho vào tủ lạnh bảo quản từ 2-3 tiếng trước khi phục vụ.'
    ],
    baristaNotes: [
      'Mè đen Mộc An mang lại vị béo bùi dưỡng sinh cực kỳ hòa hợp với độ đắng thanh lịch của socola 85%.'
    ]
  },

  // 15. Bánh Quy Cookie Socola Hạt Điều Bến Tre
  {
    id: 'recipe-cookie-socola-hat-dieu',
    title: 'Bánh Cookie Socola Hạt Điều Bến Tre (Choco Cashew Soft-Baked Cookies)',
    partnerId: 'socola-qua-tang',
    productName: 'Kẹo socola sữa hạt điều 50g & Socola đen 70% 50g',
    productIds: ['socola-sua-hat-dieu-50g', 'socola-den-70-cacao-50g'],
    category: 'Món Ăn Nhẹ & Topping',
    prepTime: '20 phút',
    yields: 'Mẻ 10 chiếc bánh quy',
    difficulty: 'Dễ',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    description: 'Bánh quy socola nướng kiểu Mỹ (Soft-Baked): Viền ngoài giòn rụm thơm bơ, lòng bánh mềm dẻo ngập tràn socola đen 70% và hạt điều Bến Tre nướng béo ngậy. Món ăn vặt hoàn hảo bên tách trà hoặc cà phê nóng.',
    costPerServing: 8500,
    recommendedMenuPrice: 32000,
    profitPerServing: 23500,
    profitMarginPercent: 73,
    shopOwnerBenefits: 'Biên lợi nhuận 73%, chi phí chỉ 8.500₫/chiếc bánh. Bánh nướng sẵn trưng bày tủ kính quầy order kích thích khách mua kèm đồ uống cực tốt (Up-selling).',
    monthlyProfit30: 21150000,
    monthlyProfit50: 35250000,
    ingredients: [
      { name: 'Socola sữa hạt điều Chút Chíu băm thô', amount: '50g', productId: 'socola-sua-hat-dieu-50g' },
      { name: 'Socola đen 70% Chút Chíu băm thô', amount: '40g', productId: 'socola-den-70-cacao-50g' },
      { name: 'Bột cacao nguyên chất 100% Chút Chíu', amount: '15g', productId: 'bot-cacao-nguyen-chat-150g' },
      { name: 'Bơ lạt để mềm ở nhiệt độ phòng', amount: '60g' },
      { name: 'Bột mì đa dụng', amount: '100g' },
      { name: 'Đường nâu tạo độ dẻo thơm caramel', amount: '45g' },
      { name: 'Trứng gà tươi', amount: '1 quả nhỏ (40g)' },
      { name: 'Baking soda & nhúm muối tinh', amount: '2g' },
    ],
    steps: [
      'Đánh bông bơ lạt với đường nâu trong 2 phút cho mịn mượt.',
      'Cho trứng gà vào đánh hòa quyện đều.',
      'Rây bột mì, 15g bột cacao Chút Chíu, baking soda và muối vào âu bơ, trộn đều thành khối dẻo.',
      'Trộn 2/3 lượng socola đen và socola sữa hạt điều băm thô vào bột bánh.',
      'Chia bột thành 10 viên tròn đặt lên khay nướng có lót giấy nến, ấn nhẹ bề mặt và gắn 1/3 lượng socola hạt điều còn lại lên trên.',
      'Nướng ở nhiệt độ 175°C trong đúng 10-11 phút (không nướng lâu để giữ độ mềm dẻo).',
      'Để bánh nguội bớt trên khay 5 phút trước khi xếp lên giá làm mát.'
    ],
    baristaNotes: [
      'Bánh cookie mới ra lò tỏa hương thơm bơ cacao nức mũi khắp quán cà phê, là cách marketing khứu giác hiệu quả nhất.'
    ]
  }
];
