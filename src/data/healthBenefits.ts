import { Product, ProductHealthBenefit } from '../types';

export const HEALTH_BENEFITS_DATA: Record<string, ProductHealthBenefit> = {
  // ==========================================
  // 1. VIỆT THẢO NHIÊN - MATCHA LAKA (vietthaonhien.vn)
  // ==========================================
  'matcha-ceremonial': {
    headline: 'Món Quà Tinh Khôi Từ Búp Trà Non Cổ Thụ',
    quote: 'Chống oxy hóa vượt trội, thư giãn sâu trong sự tỉnh thức, nuôi dưỡng làn da tươi trẻ.',
    points: [
      {
        iconType: 'sparkles',
        title: 'Chống lão hóa & Đẹp da',
        description: 'Chứa hàm lượng EGCG dồi dào gấp 137 lần trà thông thường, bảo vệ tế bào da khỏi tia cực tím và nuôi dưỡng độ ẩm sáng mịn tự nhiên.',
      },
      {
        iconType: 'zap',
        title: 'Tỉnh táo an lành suốt 4–6 tiếng',
        description: 'Sự kết hợp hoàn hảo giữa Theanine và Caffeine tự nhiên giúp trí óc tập trung minh mẫn, không gây cồn cào hay bồn chồn tim.',
      },
      {
        iconType: 'leaf',
        title: 'Thanh lọc & Tốt cho tiêu hóa',
        description: 'Chất diệp lục dồi dào hỗ trợ đào thải độc tố tự nhiên, cân bằng hệ vi sinh đường ruột và hỗ trợ trao đổi chất nhẹ nhàng.',
      },
    ],
    audiences: [
      {
        audience: 'Người đi làm & Giới trẻ',
        icon: '💼',
        benefit: 'Tập trung sáng tạo không căng thẳng, duy trì năng lượng xanh tích cực mỗi sáng.',
      },
      {
        audience: 'Phụ nữ & Người yêu làm đẹp',
        icon: '✨',
        benefit: 'Nuôi dưỡng da khỏe từ bên trong, giảm sắc tố melanin và làm chậm tiến trình lão hóa.',
      },
      {
        audience: 'Người lớn tuổi & Ông bà',
        icon: '🍵',
        benefit: 'Hỗ trợ ổn định đường huyết, điều hòa huyết áp và giúp tinh thần thư thái, nhẹ nhõm.',
      },
    ],
    nutritionNote: 'Nên dùng vào buổi sáng hoặc đầu giờ chiều sau bữa ăn 30 phút để hấp thu tối ưu chất chống oxy hóa.',
  },

  'matcha-premium': {
    headline: 'Năng Lượng Xanh Cho Ngày Dài Năng Động',
    quote: 'Chất diệp lục tự nhiên bồi đắp sức bền, thanh lọc cơ thể và bảo vệ hệ tim mạch khỏe mạnh.',
    points: [
      {
        iconType: 'sparkles',
        title: 'Trẻ hóa tế bào & Thanh lọc',
        description: 'Chứa chất chống oxy hóa Polyphenol tự nhiên, hỗ trợ thải độc tố và giúp sắc diện tươi sáng hồng hào.',
      },
      {
        iconType: 'heart',
        title: 'Bảo vệ hệ tim mạch & Mạch máu',
        description: 'Hỗ trợ giảm cholesterol xấu LDL, thúc đẩy lưu thông tuần hoàn máu an lành.',
      },
      {
        iconType: 'smile',
        title: 'Nhẹ bụng & Dễ chịu đường ruột',
        description: 'Chất xơ hòa tan tự nhiên hỗ trợ tiêu hóa êm ái, thích hợp dùng pha thức uống hoặc làm bánh dinh dưỡng.',
      },
    ],
    audiences: [
      {
        audience: 'Người đi làm văn phòng',
        icon: '💻',
        benefit: 'Xua tan uể oải giờ xế chiều, thay thế các loại nước uống nhiều đường hóa học.',
      },
      {
        audience: 'Cả gia đình & Giới trẻ',
        icon: '👨‍👩‍👧',
        benefit: 'Làm matcha latte, sinh tố healthy thơm ngon, cả nhà cùng thưởng thức vị ngọt thảo mộc tự nhiên.',
      },
    ],
    nutritionNote: 'Pha với nước ấm 70°C–80°C để bảo toàn vẹn nguyên lượng vitamin và khoáng chất tự nhiên.',
  },

  'matcha-culinary': {
    headline: 'Hương Vị Xanh Tự Nhiên Cho Bếp Nhà Ấm Cúng',
    quote: 'Bổ sung chất xơ tự nhiên và chất chống oxy hóa vào từng món bánh ngọt, latte thanh lành.',
    points: [
      {
        iconType: 'leaf',
        title: '100% Búp trà thuần mộc',
        description: 'Không phẩm màu công nghiệp, mang màu xanh ngọc bích tự nhiên và vị chát nhẹ hậu ngọt sâu.',
      },
      {
        iconType: 'zap',
        title: 'Tăng cường chuyển hóa',
        description: 'Kích thích tiêu hóa tốt, hỗ trợ kiểm soát mỡ thừa tự nhiên khi dùng cùng chế độ ăn uống cân bằng.',
      },
      {
        iconType: 'smile',
        title: 'Tốt cho dạ dày & Tiêu hóa',
        description: 'Lành tính, dễ tiêu hóa, phù hợp chế biến kem, thạch, sữa hạt cho mọi lứa tuổi.',
      },
    ],
    audiences: [
      {
        audience: 'Người làm bếp & Pha chế',
        icon: '🧁',
        benefit: 'Tạo nên những món tráng miệng vừa thơm ngon vừa dồi dào dưỡng chất bảo vệ sức khỏe.',
      },
      {
        audience: 'Trẻ em & Tuổi học đường',
        icon: '🧒',
        benefit: 'Hấp thụ vitamin và khoáng chất tự nhiên từ các món tráng miệng nhà làm an toàn.',
      },
    ],
  },

  // ==========================================
  // VIỆT THẢO NHIÊN - TRÀ CASCARA & XẠ ĐEN (vietthaonhien.vn)
  // ==========================================
  'cascara-tea': {
    headline: 'Vị Ngọt Mật Quả Cà Phê Chín Mọng Từ Mẹ Thiên Nhiên',
    quote: 'Chứa lượng chất chống oxy hóa gấp 8 lần quả việt quất, caffeine dịu nhẹ chỉ 1/4 cà phê, vỗ về giấc ngủ.',
    points: [
      {
        iconType: 'sparkles',
        title: 'Chống oxy hóa siêu đậm đặc',
        description: 'Vỏ quả cà phê chín mọng lên men chứa polyphenol và axit chlorogenic dồi dào, giúp da dẻ mịn màng và làm chậm lão hóa.',
      },
      {
        iconType: 'heart',
        title: 'Caffeine dịu nhẹ - Không say, không ép tim',
        description: 'Hàm lượng caffeine nhẹ nhàng chỉ bằng 1/4 cà phê thông thường, giúp đầu óc tỉnh táo thư thái mà tim vẫn đập êm đềm.',
      },
      {
        iconType: 'droplet',
        title: 'Nhuận tràng & Thanh lọc cơ thể',
        description: 'Chất xơ hòa tan tự nhiên từ vỏ quả hỗ trợ hệ tiêu hóa hoạt động trơn tru, nhẹ bụng sau những bữa ăn nhiều dầu mỡ.',
      },
    ],
    audiences: [
      {
        audience: 'Chị em phụ nữ & Người giữ dáng',
        icon: '🌸',
        benefit: 'Hỗ trợ thanh lọc vóc dáng, đẹp da, uống lạnh thanh mát như trà hoa quả thượng hạng.',
      },
      {
        audience: 'Người đi làm mẫn cảm với cà phê',
        icon: '💼',
        benefit: 'Uống cả ngày không lo mất ngủ hay bồn chồn dạ dày, tinh thần sảng khoái dễ chịu.',
      },
      {
        audience: 'Người lớn tuổi',
        icon: '👵',
        benefit: 'Hỗ trợ tuần hoàn máu, an tâm thưởng thức vị ngọt thanh tự nhiên không cần thêm đường.',
      },
    ],
    nutritionNote: 'Có thể uống nóng vào sáng sớm ấm bụng hoặc ủ lạnh (Cold Brew) thêm vài lát chanh/đào giải nhiệt mùa hè.',
  },

  'cascara-xa-den': {
    headline: 'Thảo Dược Bản Địa Thanh Lọc Thân Tâm',
    quote: 'Sự giao thoa giữa vỏ cà phê Tây Nguyên và thảo dược Xạ Đen Hòa Bình giúp mát gan, tăng cường đề kháng.',
    points: [
      {
        iconType: 'shield',
        title: 'Tăng cường sức đề kháng & Miễn dịch',
        description: 'Flavonoid và Quinone trong cây Xạ đen hỗ trợ thanh nhiệt, giải độc gan và nâng cao hàng rào phòng ngự tự nhiên của cơ thể.',
      },
      {
        iconType: 'moon',
        title: 'Giúp an thần, giấc ngủ ngon và sâu',
        description: 'Vỗ về hệ thần kinh sau ngày dài áp lực, giúp giấc ngủ tự nhiên đến êm dịu, sáng dậy tinh thần nhẹ nhõm.',
      },
      {
        iconType: 'leaf',
        title: 'Mát gan, thanh lọc cơ thể',
        description: 'Hỗ trợ đào thải độc tố tích tụ do khói bụi, bia rượu hay thức ăn nhanh, cho lá gan khỏe mạnh.',
      },
    ],
    audiences: [
      {
        audience: 'Người lớn tuổi & Ông bà',
        icon: '👴',
        benefit: 'Giúp hạ hỏa, ngủ sâu giấc, ăn uống ngon miệng và bồi bổ thể trạng dẻo dai.',
      },
      {
        audience: 'Người thường xuyên thức khuya, bia rượu',
        icon: '🌿',
        benefit: 'Giải nhiệt độc gan, xoa dịu cảm giác nóng trong người và mệt mỏi kéo dài.',
      },
    ],
  },

  'cascara-syrup': {
    headline: 'Mật Ngọt Tự Nhiên Bổ Sung Năng Lượng & Vitamin',
    quote: 'Nước cốt cô đặc 100% từ vỏ quả cà phê chín mọng Cầu Đất, thay thế hoàn toàn sirô hương liệu tổng hợp.',
    points: [
      {
        iconType: 'zap',
        title: 'Bổ sung năng lượng tự nhiên',
        description: 'Giàu đường đơn fructose tự nhiên từ thịt quả cà phê, giải phóng năng lượng êm ái mà không gây tích tụ mỡ xấu.',
      },
      {
        iconType: 'sparkles',
        title: 'Giàu Vitamin C & Vi chất',
        description: 'Vị chua ngọt dịu tự nhiên, bổ sung vitamin C giúp tăng sức đề kháng và bảo vệ làn da.',
      },
      {
        iconType: 'smile',
        title: 'Thân thiện với tiêu hóa',
        description: 'Lên men tự nhiên, sạch 100% không chất bảo quản công nghiệp độc hại.',
      },
    ],
    audiences: [
      {
        audience: 'Gia đình & Trẻ nhỏ',
        icon: '👨‍👩‍👧',
        benefit: 'Pha cùng soda, sữa tươi hoặc sữa hạt cho bé món tráng miệng bổ dưỡng thơm ngọt.',
      },
      {
        audience: 'Quán cà phê & Barista',
        icon: '☕',
        benefit: 'Nguyên liệu sạch tạo nên thức uống Signature thanh mát, tạo dấu ấn bền vững với khách hàng.',
      },
    ],
  },

  // ==========================================
  // 2. VUA MÍA - NƯỚC MÍA TUYẾT CẤP ĐÔNG IQF (vuamia.vn)
  // ==========================================
  'vua-mia': {
    headline: 'Món Quà Giải Nhiệt Ngọt Lành Từ Cánh Đồng Quê Hương',
    quote: 'Bù khoáng tức thì, xua tan mệt mỏi nắng nóng, cung cấp năng lượng xanh thuần khiết cho cả gia đình.',
    points: [
      {
        iconType: 'droplet',
        title: 'Bù nước & Điện giải tự nhiên tức thì',
        description: 'Cung cấp nguồn khoáng chất quý giá như Kali, Magie, Canxi, Sắt giúp cơ thể phục hồi trạng thái sung sức sau khi chơi thể thao hoặc đi nắng về.',
      },
      {
        iconType: 'zap',
        title: 'Năng lượng sạch, giảm uể oải',
        description: 'Đường mía tự nhiên chuyển hóa nhanh thành năng lượng hoạt động não bộ, giúp xua tan cơn mệt mỏi giờ tan tầm mà không lo tăng cân.',
      },
      {
        iconType: 'shield',
        title: 'Kiềm hóa cơ thể, bổ thận mát gan',
        description: 'Nước mía tự nhiên có tính kiềm, giúp trung hòa axit dư thừa trong dạ dày, hỗ trợ giải độc gan và lợi tiểu tự nhiên.',
      },
    ],
    audiences: [
      {
        audience: 'Trẻ em & Học sinh, Sinh viên',
        icon: '🧒',
        benefit: 'Bù điện giải lành mạnh sau giờ thể dục, giải nhiệt an toàn thay thế nước ngọt có ga.',
      },
      {
        audience: 'Người đi làm & Lao động ngoài trời',
        icon: '🚴',
        benefit: 'Đập tan cơn khát cháy họng, nạp lại năng lượng bền bỉ cho ngày làm việc hanh thông.',
      },
      {
        audience: 'Người cao tuổi & Gia đình',
        icon: '👴',
        benefit: 'Cung cấp vi khoáng tự nhiên, hỗ trợ thanh nhiệt cơ thể và tốt cho chức năng đường tiết niệu.',
      },
    ],
    nutritionNote: 'Công nghệ cấp đông sâu IQF -40°C giúp giữ trọn 100% men vi sinh sống và vị ngọt tự nhiên của mía tươi suốt 12 tháng.',
  },

  // ==========================================
  // 3. THẢO DƯỢC DATO - SÂM DÂY NGỌC LINH & MẬT ONG (dato.vn)
  // ==========================================
  'dato-sam-day': {
    headline: 'Bảo Vật Đại Bổ Dưới Tán Rừng Già Kon Tum',
    quote: 'Bồi bổ cho ông bà, tăng sức đề kháng cho con trẻ, phục hồi sinh lực bền bỉ cho người lao động.',
    points: [
      {
        iconType: 'heart',
        title: 'Bồi bổ khí huyết, phục hồi thể lực',
        description: 'Saponin và Polysaccharide quý hiếm trong Sâm Dây Kon Tum giúp tăng lượng hồng cầu, chống suy nhược cơ thể, phục hồi nhanh sau khi ốm dậy.',
      },
      {
        iconType: 'shield',
        title: 'Tăng cường hệ miễn dịch tự nhiên',
        description: 'Kích thích sản sinh tế bào miễn dịch, tạo khiên chắn vững chắc bảo vệ cả nhà trước thời tiết giao mùa thất thường.',
      },
      {
        iconType: 'moon',
        title: 'Giấc ngủ ngon sâu & Ăn uống ngon miệng',
        description: 'Kiện tỳ ích khí, cải thiện chức năng dạ dày giúp tiêu hóa tốt, xoa dịu thần kinh cho giấc ngủ sâu không mộng mị.',
      },
    ],
    audiences: [
      {
        audience: 'Người cao tuổi & Ông bà',
        icon: '👴',
        benefit: 'Tăng tuần hoàn máu não, giảm hoa mắt chóng mặt, giúp giấc ngủ ngon và xương khớp dẻo dai.',
      },
      {
        audience: 'Người đi làm chịu nhiều áp lực',
        icon: '💼',
        benefit: 'Phục hồi sinh lực nhanh chóng, giảm stress mệt mỏi, duy trì phong độ làm việc bền bỉ.',
      },
      {
        audience: 'Người sau ốm & Phụ nữ sau sinh',
        icon: '🌿',
        benefit: 'Bổ máu tự nhiên, nhanh chóng lấy lại sắc vóc hồng hào và thể lực khỏe khoắn.',
      },
    ],
    nutritionNote: 'Có thể hãm trà uống hằng ngày, chưng với yến hoặc hầm canh gà, canh sườn bổ dưỡng cho cả gia đình.',
  },

  'dato-mat-ong': {
    headline: 'Giọt Vàng Mật Ngọt Dưỡng Họng, Lành Dạ Dày',
    quote: 'Kháng khuẩn tự nhiên từ hoa rừng đại ngàn, làm dịu êm cổ họng và chữa lành niêm mạc tiêu hóa.',
    points: [
      {
        iconType: 'shield',
        title: 'Kháng khuẩn & Làm dịu đường hô hấp',
        description: 'Mật ong hoa rừng tự nhiên giàu enzym và phấn hoa, làm dịu nhanh cơn ho gió, ngứa rát họng khi thời tiết trở lạnh.',
      },
      {
        iconType: 'smile',
        title: 'Chữa lành niêm mạc & Êm dạ dày',
        description: 'Kết hợp cùng tinh chất nghệ hoặc gừng giúp trung hòa axit dịch vị, xoa dịu các cơn đau tức dạ dày, trào ngược.',
      },
      {
        iconType: 'sun',
        title: 'Cung cấp năng lượng tinh khiết mỗi sáng',
        description: 'Một ly nước ấm mật ong vào sớm mai đánh thức hệ tiêu hóa, thanh lọc đường ruột và nạp năng lượng tươi mới.',
      },
    ],
    audiences: [
      {
        audience: 'Trẻ em & Con nhỏ (trên 1 tuổi)',
        icon: '🧒',
        benefit: 'Hỗ trợ trị ho tự nhiên không lạm dụng kháng sinh, tăng cường đề kháng hệ hô hấp.',
      },
      {
        audience: 'Người đau dạ dày & Tiêu hóa kém',
        icon: '🥣',
        benefit: 'Bảo vệ niêm mạc dạ dày, ăn uống dễ tiêu và giảm ợ chua, nóng rát lồng ngực.',
      },
      {
        audience: 'Cả gia đình',
        icon: '🍯',
        benefit: 'Gia vị ngọt lành tự nhiên thay thế đường tinh luyện trong các bữa ăn thường nhật.',
      },
    ],
    nutritionNote: 'Uống vào buổi sáng sớm cùng 200ml nước ấm 40°C để hệ tiêu hóa được khởi động nhẹ nhàng nhất.',
  },

  'dato-tra-lac-tien': {
    headline: 'Vỗ Về Giấc Ngủ Lành Sau Một Ngày Dài Bận Rộn',
    quote: 'Sự hòa quyện giữa Sâm Dây bổ khí và Lạc Tiên an thần đem lại sự thư thái tĩnh tại cho tâm hồn.',
    points: [
      {
        iconType: 'moon',
        title: 'An thần, giúp dễ đi vào giấc ngủ',
        description: 'Lạc tiên tự nhiên chứa alcaloid nhẹ nhàng xoa dịu âu lo, giúp đầu óc buông bỏ căng thẳng để chìm vào giấc ngủ êm ái.',
      },
      {
        iconType: 'heart',
        title: 'Ổn định nhịp tim & Huyết áp',
        description: 'Giúp điều hòa huyết áp, giảm cảm giác bồn chồn lo âu do áp lực công việc hoặc thay đổi thời tiết.',
      },
      {
        iconType: 'smile',
        title: 'Thức dậy sảng khoái, không mệt mỏi',
        description: 'Khác với thuốc an thần, thảo dược đem lại giấc ngủ sinh học tự nhiên, sáng dậy đầu óc tỉnh táo nhẹ nhõm.',
      },
    ],
    audiences: [
      {
        audience: 'Người khó ngủ & Mất ngủ kinh niên',
        icon: '🌙',
        benefit: 'Cải thiện chất lượng giấc ngủ, giảm thức giấc nửa đêm và trằn trọc khó chịu.',
      },
      {
        audience: 'Người làm việc căng thẳng, stress cao',
        icon: '💻',
        benefit: 'Thả lỏng cơ bắp và tâm trí trước khi lên giường, tái tạo năng lượng cho ngày mới.',
      },
    ],
  },

  'dato-tra-kho-qua': {
    headline: 'Thanh Nhiệt Hạ Hỏa, Ổn Định Đường Huyết',
    quote: 'Khổ qua rừng Tây Nguyên đậm đà dược tính kết hợp Sâm Dây giúp cơ thể nhẹ nhõm, thanh khiết.',
    points: [
      {
        iconType: 'heart',
        title: 'Hỗ trợ điều hòa đường huyết tự nhiên',
        description: 'Charantin và Polypeptide-p trong mướp đắng rừng giúp tuyến tụy hoạt động hiệu quả, ổn định chỉ số đường máu.',
      },
      {
        iconType: 'leaf',
        title: 'Thanh lọc gan & Tiêu độc mụn nhọt',
        description: 'Giải nhiệt từ sâu bên trong, đào thải nhiệt độc gây nóng trong người, rôm sảy hay mụn nhọt.',
      },
      {
        iconType: 'sparkles',
        title: 'Hỗ trợ vóc dáng & Mỡ máu',
        description: 'Thúc đẩy tiêu hao mỡ thừa tự nhiên, giữ cho chỉ số mỡ máu luôn ở ngưỡng an toàn.',
      },
    ],
    audiences: [
      {
        audience: 'Người có đường huyết cao & Tiền tiểu đường',
        icon: '🩸',
        benefit: 'Hỗ trợ kiểm soát chỉ số an toàn, thức uống thảo mộc lành tính đồng hành mỗi ngày.',
      },
      {
        audience: 'Người hay bị nóng trong, mụn nhọt',
        icon: '🌿',
        benefit: 'Thanh mát cơ thể, giải độc gan hiệu quả sau những bữa tiệc dầu mỡ.',
      },
    ],
  },

  // ==========================================
  // 4. NÓN LÁ & AODAI COFFEE (nonlacoffee.com)
  // ==========================================
  'nonla-coffee-freeze-dried': {
    headline: 'Đánh Thức Sáng Tạo Cùng Cà Phê Thăng Hoa Thuần Khiết',
    quote: 'Công nghệ sấy thăng hoa -40°C giữ trọn 99% hương vị nguyên bản, êm dịu dạ dày và không gây ép tim.',
    points: [
      {
        iconType: 'zap',
        title: 'Tỉnh táo bừng sáng, kích hoạt tư duy',
        description: 'Caffeine sạch từ hạt Arabica Cầu Đất và Robusta Đắk Lắk giúp não bộ tập trung cao độ, đánh thức ý tưởng sáng tạo trong 3 giây.',
      },
      {
        iconType: 'heart',
        title: 'Không gây ép tim, cồn cào ruột',
        description: 'Công nghệ sấy thăng hoa chân không tách bỏ các gốc axit tự do và cặn dầu cháy khét, giúp nước cà phê êm dịu, không bồn chồn tim.',
      },
      {
        iconType: 'sparkles',
        title: 'Giàu chất chống oxy hóa tự nhiên',
        description: 'Bảo tồn trọn vẹn hợp chất Polyphenol quý giá giúp bảo vệ tế bào não và tăng cường trao đổi chất.',
      },
    ],
    audiences: [
      {
        audience: 'Dân văn phòng & Người làm việc trí óc',
        icon: '💻',
        benefit: 'Nạp năng lượng tức thì mọi lúc mọi nơi chỉ cần 1 viên thả vào nước nguội hoặc sữa tươi.',
      },
      {
        audience: 'Người yêu cà phê nhưng sợ say tim',
        icon: '☕',
        benefit: 'Thưởng thức trọn vẹn hương vị tinh hoa mà không lo cảm giác hồi hộp, mất ngủ khó chịu.',
      },
      {
        audience: 'Người hay đi công tác & Du lịch',
        icon: '✈️',
        benefit: 'Viên nén nhỏ gọn tiện lợi trong túi áo, luôn sẵn sàng một ly Specialty chuẩn vị.',
      },
    ],
    nutritionNote: 'Hòa tan siêu tốc trong nước nguội, nước đá hoặc sữa tươi chỉ trong 3 giây mà không cần đun nước sôi.',
  },

  'nonla-cacao-heritage': {
    headline: 'Món Quà Ấm Áp Cho Trái Tim & Trí Não',
    quote: 'Cacao Đắk Lắk nguyên chất giàu Flavonoid, xoa dịu áp lực tinh thần và bảo vệ hệ tim mạch khỏe mạnh.',
    points: [
      {
        iconType: 'heart',
        title: 'Bảo vệ tim mạch & Ổn định huyết áp',
        description: 'Flavanol trong hạt cacao tự nhiên giúp cải thiện lưu lượng máu đến não và tim, duy trì thành mạch máu đàn hồi tốt.',
      },
      {
        iconType: 'sparkles',
        title: 'Kích thích sản sinh hormone hạnh phúc',
        description: 'Chứa tryptophan tự nhiên kích hoạt serotonin giúp giải tỏa âu lo, mang lại cảm giác vui vẻ, yêu đời.',
      },
      {
        iconType: 'sun',
        title: 'Bổ sung khoáng chất & Năng lượng lành mạnh',
        description: 'Cung cấp Magie, Sắt và Kẽm dồi dào, giúp cơ bắp thư giãn và cải thiện chứng mất ngủ.',
      },
    ],
    audiences: [
      {
        audience: 'Trẻ em & Con nhỏ tuổi dậy thì',
        icon: '🧒',
        benefit: 'Cung cấp dinh dưỡng phát triển não bộ, thơm ngon ấm áp mỗi buổi sáng tới trường.',
      },
      {
        audience: 'Người làm việc căng thẳng, mệt mỏi',
        icon: '💼',
        benefit: 'Một ly cacao ấm buổi chiều giúp xoa dịu stress và tiếp thêm cảm hứng ngọt ngào.',
      },
      {
        audience: 'Người lớn tuổi',
        icon: '👵',
        benefit: 'Tăng cường tuần hoàn máu não, hỗ trợ trí nhớ minh mẫn và giấc ngủ êm đềm.',
      },
    ],
  },
};

/**
 * Resolver function to get comprehensive Health Benefits data for any of the 53 SKUs
 */
export function getProductHealthBenefits(product: Product): ProductHealthBenefit {
  // 1. If product already has inline healthBenefits, return it
  if (product.healthBenefits) {
    return product.healthBenefits;
  }

  const pid = product.id.toLowerCase();

  // 2. Exact match check
  if (pid.includes('matcha-laka-ceremonial')) {
    return HEALTH_BENEFITS_DATA['matcha-ceremonial'];
  }
  if (pid.includes('matcha-laka-premium')) {
    return HEALTH_BENEFITS_DATA['matcha-premium'];
  }
  if (pid.includes('matcha-laka-culinary')) {
    return HEALTH_BENEFITS_DATA['matcha-culinary'];
  }
  if (pid.includes('xa-den')) {
    return HEALTH_BENEFITS_DATA['cascara-xa-den'];
  }
  if (pid.includes('cascara') && (pid.includes('syrup') || pid.includes('1000ml') || pid.includes('700ml'))) {
    return HEALTH_BENEFITS_DATA['cascara-syrup'];
  }
  if (pid.includes('cascara')) {
    return HEALTH_BENEFITS_DATA['cascara-tea'];
  }

  // VUA MÍA
  if (pid.includes('vua-mia') || product.partnerId === 'vua-mia') {
    return HEALTH_BENEFITS_DATA['vua-mia'];
  }

  // DATO HERBAL
  if (pid.includes('lac-tien')) {
    return HEALTH_BENEFITS_DATA['dato-tra-lac-tien'];
  }
  if (pid.includes('kho-qua')) {
    return HEALTH_BENEFITS_DATA['dato-tra-kho-qua'];
  }
  if (pid.includes('tinh-chat') || pid.includes('mat-ong') || pid.includes('mut-sam')) {
    return HEALTH_BENEFITS_DATA['dato-mat-ong'];
  }
  if (pid.includes('sam-day') || pid.includes('nhan-sam') || product.partnerId === 'thao-duoc-dato') {
    return HEALTH_BENEFITS_DATA['dato-sam-day'];
  }

  // NÓN LÁ & AODAI COFFEE
  if (pid.includes('cacao')) {
    return HEALTH_BENEFITS_DATA['nonla-cacao-heritage'];
  }
  if (product.partnerId === 'non-la-aodai' || pid.includes('nonla') || pid.includes('aodai')) {
    return HEALTH_BENEFITS_DATA['nonla-coffee-freeze-dried'];
  }

  // Fallback graceful
  return HEALTH_BENEFITS_DATA['matcha-ceremonial'];
}
