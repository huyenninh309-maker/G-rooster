import { Product, ProductHealthBenefit } from '../types';

export const HEALTH_BENEFITS_DATA: Record<string, ProductHealthBenefit> = {
  // ==========================================
  // 1. DÒNG MATCHA & TRÀ LAKA CHUẨN NHẬT
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
  // DÒNG TRÀ CASCARA & THẢO MỘC
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
  // 2. GIẢI PHÁP NƯỚC MÍA TUYẾT IQF
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
  // 3. DÒNG THẢO DƯỢC SÂM NGỌC LINH & MẬT ONG
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
  // 4. DÒNG CÀ PHÊ VIÊN SẤY & CÀ PHÊ HẠT
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
  // ==========================================
  // 5. ĐẶC SẢN THỰC PHẨM & SNACK CAO CẤP (9 SP)
  // ==========================================
  'phunha-dac-san': {
    headline: 'Thực Phẩm Dinh Dưỡng Giàu Đạm Sạch Cho Cả Gia Đình',
    quote: 'Chế biến theo bí quyết gia truyền 30 năm từ 100% thịt tươi mổ sớm, không chất bảo quản gây hại, chuẩn ATVSTP.',
    points: [
      {
        iconType: 'zap',
        title: 'Giàu Protein & Năng lượng',
        description: 'Cung cấp nguồn đạm chất lượng từ thịt tươi, giúp cơ thể dẻo dai.',
      },
      {
        iconType: 'sparkles',
        title: 'Tiện lợi & Tiết kiệm thời gian',
        description: 'Giải pháp hoàn hảo cho bữa sáng nhanh gọn hoặc bữa xế đầy đủ dinh dưỡng.',
      },
      {
        iconType: 'shield',
        title: 'An toàn tuyệt đối',
        description: 'Chế biến theo bí quyết gia truyền 30 năm, không chất bảo quản gây hại, chuẩn ATVSTP.',
      },
    ],
    audiences: [
      {
        audience: 'Trẻ nhỏ lười ăn',
        icon: '🧒',
        benefit: 'Sợi bông tơi xốp, thơm dịu tự nhiên, kích thích vị giác và bổ sung đạm sạch lành tính giúp bé ăn ngon miệng mau lớn.',
      },
      {
        audience: 'Người bận rộn',
        icon: '💼',
        benefit: 'Giải pháp bữa sáng hoặc bữa xế tiện lợi, chỉ cần 1 phút có ngay bữa ăn giàu dinh dưỡng cùng bánh mì, xôi, cháo.',
      },
      {
        audience: 'Người cao tuổi',
        icon: '👵',
        benefit: 'Thực phẩm mềm nhuyễn dễ tiêu hóa, hương vị đậm đà ấm cúng, hỗ trợ bồi bổ thể lực nhẹ nhàng.',
      },
    ],
    nutritionNote: 'Sản phẩm 100% thịt sạch tuyển chọn theo quy chuẩn ATVSTP, đóng gói hũ/túi màng nhôm bảo quản kín khí, không hàn the và không chất bảo quản độc hại.',
  },
};

export const HEALTH_BENEFITS_DATA_EN: Record<string, ProductHealthBenefit> = {
  'matcha-ceremonial': {
    headline: 'Pristine Gift from Ancient Highland Tea Bushes',
    quote: 'Superior antioxidant potency, deep mindful alertness, and youthful glowing skin.',
    points: [
      {
        iconType: 'sparkles',
        title: 'Anti-Aging & Skin Radiance',
        description: 'Packed with EGCG 137 times higher than standard green tea, shielding skin cells against ultraviolet damage and promoting natural moisture.',
      },
      {
        iconType: 'zap',
        title: 'Calm Focus for 4–6 Hours',
        description: 'Harmonious synergy of L-Theanine and natural caffeine enhances mental clarity and sustained concentration without nervous jitters.',
      },
      {
        iconType: 'leaf',
        title: 'Natural Detox & Gut Health',
        description: 'Rich natural chlorophyll supports gentle bodily cleansing, balances gut microbiome, and promotes smooth digestive metabolism.',
      },
    ],
    audiences: [
      {
        audience: 'Working Professionals & Youth',
        icon: '💼',
        benefit: 'Calm creative concentration without stress, maintaining sustainable green energy every morning.',
      },
      {
        audience: 'Women & Beauty Connoisseurs',
        icon: '✨',
        benefit: 'Nourishes skin from within, diminishes melanin pigmentation, and delays cellular aging.',
      },
      {
        audience: 'Seniors & Elders',
        icon: '🍵',
        benefit: 'Supports healthy glycemic balance, regulates circulation, and fosters a serene, relaxed mind.',
      },
    ],
    nutritionNote: 'Best enjoyed in the morning or early afternoon 30 minutes after meals for optimal antioxidant absorption.',
  },

  'matcha-premium': {
    headline: 'Pure Green Energy for an Active Lifestyle',
    quote: 'Natural chlorophyll builds endurance, purifies the body, and safeguards cardiovascular wellness.',
    points: [
      {
        iconType: 'sparkles',
        title: 'Cellular Rejuvenation & Detox',
        description: 'Abundant natural polyphenols actively clear bodily toxins and promote a radiant, rosy complexion.',
      },
      {
        iconType: 'heart',
        title: 'Cardiovascular & Arterial Care',
        description: 'Helps lower LDL bad cholesterol and promotes wholesome blood circulation.',
      },
      {
        iconType: 'smile',
        title: 'Light Stomach & Digestive Comfort',
        description: 'Natural dietary fiber ensures soothing digestion, ideal for lattes, smoothies, and wholesome baked goods.',
      },
    ],
    audiences: [
      {
        audience: 'Office Professionals',
        icon: '💻',
        benefit: 'Banishes afternoon fatigue, serving as a wholesome replacement for high-sugar commercial beverages.',
      },
      {
        audience: 'Families & Young Adults',
        icon: '👨‍👩‍👧',
        benefit: 'Craft delicious matcha lattes and healthy smoothies that the entire family can enjoy together.',
      },
    ],
    nutritionNote: 'Whisk with warm water at 70°C–80°C to preserve active vitamins and delicate organic micronutrients.',
  },

  'matcha-culinary': {
    headline: 'Natural Green Vitality for Cozy Kitchens & Bakeries',
    quote: 'Infuses wholesome dietary fiber and rich antioxidants into artisanal pastries, ice creams, and lattes.',
    points: [
      {
        iconType: 'leaf',
        title: '100% Pure Unadulterated Tea',
        description: 'Zero artificial food colorings, delivering authentic emerald jade hues and rich green tea aroma with deep lingering sweetness.',
      },
      {
        iconType: 'zap',
        title: 'Metabolic Boost',
        description: 'Stimulates healthy digestion and assists natural weight management when paired with balanced nutrition.',
      },
      {
        iconType: 'smile',
        title: 'Gentle on Stomach & Gut',
        description: 'Mild and easily digestible, ideal for crafting matcha pastries, gelato, puddings, and plant-based milks.',
      },
    ],
    audiences: [
      {
        audience: 'Bakers & Baristas',
        icon: '🧁',
        benefit: 'Create exquisite beverages and desserts that are both aromatic and loaded with wholesome wellness nutrients.',
      },
      {
        audience: 'Children & Students',
        icon: '🧒',
        benefit: 'Absorb natural vitamins and minerals from safe, nourishing homemade treats.',
      },
    ],
  },

  'cascara-tea': {
    headline: 'Sweet Amber Elixir from Sun-Ripened Coffee Cherries',
    quote: 'Boasts 8 times more antioxidants than blueberries, with mild caffeine at just 1/4 of coffee for restful tranquility.',
    points: [
      {
        iconType: 'sparkles',
        title: 'Ultra-Concentrated Antioxidants',
        description: 'Sun-cured ripe coffee cherry husks contain abundant polyphenols and chlorogenic acids, supporting supple skin and youthful vitality.',
      },
      {
        iconType: 'heart',
        title: 'Gentle Caffeine – Zero Jitters',
        description: 'Mild, soothing caffeine level ensures refreshing daytime focus without heart palpitations or digestive unease.',
      },
      {
        iconType: 'droplet',
        title: 'Digestive Cleansing & Bowel Comfort',
        description: 'Natural soluble dietary fiber aids smooth digestion, leaving your stomach light and comfortable after hearty meals.',
      },
    ],
    audiences: [
      {
        audience: 'Women & Fitness Enthusiasts',
        icon: '🌸',
        benefit: 'Supports body contouring and radiant skin; delicious served chilled as a gourmet iced fruit tea.',
      },
      {
        audience: 'Coffee-Sensitive Professionals',
        icon: '💼',
        benefit: 'Sip all day without fear of insomnia or nervous stomach; brings gentle, uplifting clarity.',
      },
      {
        audience: 'Elders & Grandparents',
        icon: '👵',
        benefit: 'Supports blood circulation, with naturally crisp sweetness requiring zero added sugar.',
      },
    ],
    nutritionNote: 'Enjoy steaming hot on crisp mornings or cold brew with fresh citrus slices for an invigorating summer cooler.',
  },

  'cascara-xa-den': {
    headline: 'Heritage Herbal Infusion for Holistic Body Cleansing',
    quote: 'A harmonious fusion of Central Highland coffee cherry husks and Hoa Binh Black Celastrus to cleanse liver heat and fortify immunity.',
    points: [
      {
        iconType: 'shield',
        title: 'Immune System Fortification',
        description: 'Rich flavonoids and quinones in Black Celastrus promote liver detoxification and reinforce natural cellular defenses.',
      },
      {
        iconType: 'moon',
        title: 'Restful & Rejuvenating Sleep',
        description: 'Soothes the nervous system after demanding workdays, inviting deep, uninterrupted slumber with refreshed morning vitality.',
      },
      {
        iconType: 'leaf',
        title: 'Liver Cooling & Internal Cleansing',
        description: 'Helps eliminate accumulated toxins from environmental stress, alcohol, or rich foods, promoting resilient liver health.',
      },
    ],
    audiences: [
      {
        audience: 'Seniors & Grandparents',
        icon: '👴',
        benefit: 'Cools internal heat, fosters deep restorative sleep, stimulates appetite, and strengthens physical endurance.',
      },
      {
        audience: 'Active Adults & Late-Night Workers',
        icon: '🌿',
        benefit: 'Neutralizes liver heat and soothes lingering fatigue from stressful schedules.',
      },
    ],
  },

  'cascara-syrup': {
    headline: "Nature's Sweet Amber Nectar for Energy & Vitamins",
    quote: '100% natural concentrate from sun-ripened Cau Dat coffee cherries, replacing artificial synthetic syrups.',
    points: [
      {
        iconType: 'zap',
        title: 'Wholesome Natural Energy',
        description: 'Rich in natural fruit fructose from coffee cherry pulp, delivering steady energy without unwanted fat accumulation.',
      },
      {
        iconType: 'sparkles',
        title: 'Rich in Vitamin C & Micronutrients',
        description: 'Invigorating sweet-tart berry profile packed with vitamin C to strengthen immunity and nourish radiant skin.',
      },
      {
        iconType: 'smile',
        title: 'Gut-Friendly & Clean',
        description: 'Naturally fermented and 100% pure with zero artificial preservatives or chemical colors.',
      },
    ],
    audiences: [
      {
        audience: 'Families & Children',
        icon: '👨‍👩‍👧',
        benefit: 'Mix with club soda, cold milk, or nut milks for delicious and nutritious artisanal refreshments.',
      },
      {
        audience: 'Cafes & Creative Baristas',
        icon: '☕',
        benefit: 'Clean signature base for craft mocktails and artisanal specialty beverages that leave an unforgettable impression.',
      },
    ],
  },

  'vua-mia': {
    headline: 'Pure Sweet Hydration from Pristine Purple Sugarcane',
    quote: 'Instant natural electrolyte replenishment, banishing heat fatigue with clean green energy for the entire family.',
    points: [
      {
        iconType: 'droplet',
        title: 'Instant Hydration & Natural Electrolytes',
        description: 'Provides essential minerals including Potassium, Magnesium, Calcium, and Iron to rapidly restore optimal stamina.',
      },
      {
        iconType: 'zap',
        title: 'Clean Energy, Zero Sluggishness',
        description: 'Natural cane sucrose converts swiftly into clean cognitive and muscular fuel without unhealthy weight spikes.',
      },
      {
        iconType: 'shield',
        title: 'Alkalizing, Kidney & Liver Support',
        description: 'Naturally alkaline profile helps neutralize stomach acids, supporting liver detoxification and kidney health.',
      },
    ],
    audiences: [
      {
        audience: 'Children & Active Students',
        icon: '🧒',
        benefit: 'Wholesome electrolyte recovery after sports, serving as a natural alternative to sugary sodas.',
      },
      {
        audience: 'Working Professionals & Outdoor Staff',
        icon: '🚴',
        benefit: 'Quenches deep thirst and revitalizes enduring energy for productive, energized days.',
      },
      {
        audience: 'Elders & Families',
        icon: '👴',
        benefit: 'Provides essential trace minerals, cooling internal heat and promoting healthy urinary function.',
      },
    ],
    nutritionNote: 'IQF -40°C deep-freezing technology preserves 100% live enzymes and pure freshly pressed flavor for up to 12 months.',
  },

  'dato-sam-day': {
    headline: 'Treasured Mountain Tonic from Ancient Kon Tum Canopies',
    quote: 'Nourishes grandparents, strengthens children’s immunity, and restores enduring vigor for hard-working adults.',
    points: [
      {
        iconType: 'heart',
        title: 'Blood Vitality & Physical Restoration',
        description: 'Precious saponins and polysaccharides in Ngoc Linh Codonopsis boost red blood cell production, combating fatigue.',
      },
      {
        iconType: 'shield',
        title: 'Natural Immune Shield',
        description: 'Stimulates immune cell activity, forming a resilient shield to protect your household during seasonal transitions.',
      },
      {
        iconType: 'moon',
        title: 'Deep Sound Sleep & Enhanced Appetite',
        description: 'Strengthens spleen and stomach functions for smooth digestion, easing nervous tension for calm, dreamless slumber.',
      },
    ],
    audiences: [
      {
        audience: 'Elders & Grandparents',
        icon: '👴',
        benefit: 'Enhances cerebral blood flow, relieves dizziness, and promotes sound sleep and flexible joints.',
      },
      {
        audience: 'Demanding Professionals',
        icon: '💼',
        benefit: 'Swiftly recharges vital stamina, melts away fatigue, and sustains sharp daylong productivity.',
      },
      {
        audience: 'Post-Illness & Postpartum Care',
        icon: '🌿',
        benefit: 'Nourishes vital blood, swiftly restoring a radiant complexion and wholesome vigor.',
      },
    ],
    nutritionNote: 'Brew as a daily herbal tea, steam with bird’s nest, or simmer in nourishing chicken or bone broths for the entire family.',
  },

  'dato-mat-ong': {
    headline: 'Golden Forest Nectar for Throat Soothing & Stomach Care',
    quote: 'Pure antibacterial gift from wild mountain blossoms, gently coating the throat and nurturing digestive mucosa.',
    points: [
      {
        iconType: 'shield',
        title: 'Antibacterial & Respiratory Comfort',
        description: 'Wild forest honey rich in active enzymes and wild pollen swiftly soothes ticklish coughs and scratchy throats in cool weather.',
      },
      {
        iconType: 'smile',
        title: 'Mucosal Healing & Stomach Comfort',
        description: 'Blends seamlessly with turmeric or ginger to buffer stomach acid and relieve reflux discomfort.',
      },
      {
        iconType: 'sun',
        title: 'Pure Morning Vitality',
        description: 'A warm glass of honey water each morning awakens the digestive system, cleanses intestines, and sparks fresh energy.',
      },
    ],
    audiences: [
      {
        audience: 'Young Children (over 1 year)',
        icon: '🧒',
        benefit: 'Gentle natural relief for mild coughs without antibiotic overuse, supporting healthy airways.',
      },
      {
        audience: 'Those with Sensitive Stomachs',
        icon: '🥣',
        benefit: 'Coats stomach lining, aids smooth digestion, and relieves burning acidity.',
      },
      {
        audience: 'Whole Households',
        icon: '🍯',
        benefit: 'Pure wholesome sweetener to replace refined sugar in wholesome daily cooking.',
      },
    ],
    nutritionNote: 'Sip first thing in the morning with 200ml of warm water at 40°C for the gentlest digestive awakening.',
  },

  'dato-tra-lac-tien': {
    headline: 'Gentle Herbal Slumber after Long Demanding Days',
    quote: 'A serene blend of tonifying Codonopsis and soothing Wild Passionflower to bring peaceful calm to mind and spirit.',
    points: [
      {
        iconType: 'moon',
        title: 'Calming Herbal Sedative for Natural Sleep',
        description: 'Wild Passiflora alkaloids ease lingering anxieties, allowing the mind to unwind into deep, comforting slumber.',
      },
      {
        iconType: 'heart',
        title: 'Heart Rate & Blood Pressure Harmony',
        description: 'Assists in stabilizing heart rhythm, relieving restlessness caused by heavy workloads or shifting weather.',
      },
      {
        iconType: 'smile',
        title: 'Awaken Refreshed with Zero Grogginess',
        description: 'Unlike synthetic sleeping pills, gentle herbs facilitate natural circadian sleep so you wake up clear-headed and light.',
      },
    ],
    audiences: [
      {
        audience: 'Those with Insomnia & Light Sleepers',
        icon: '🌙',
        benefit: 'Elevates overall sleep quality, reducing midnight wakefulness and restless tossing.',
      },
      {
        audience: 'High-Stress Working Professionals',
        icon: '💻',
        benefit: 'Relaxes tense muscles and racing thoughts before bed, replenishing energy for tomorrow.',
      },
    ],
  },

  'dato-tra-kho-qua': {
    headline: 'Cooling Inner Heat & Balancing Healthy Blood Sugar',
    quote: 'Potent wild mountain bitter melon infused with Codonopsis root leaves the body light, refreshed, and detoxified.',
    points: [
      {
        iconType: 'heart',
        title: 'Supports Healthy Glycemic Balance',
        description: 'Charantin and Polypeptide-p in wild bitter melon aid pancreatic efficiency, maintaining balanced blood glucose levels.',
      },
      {
        iconType: 'leaf',
        title: 'Liver Cleansing & Blemish Defense',
        description: 'Clears internal heat from the roots, expelling toxins that cause internal inflammation or skin outbreaks.',
      },
      {
        iconType: 'sparkles',
        title: 'Lipid Balance & Metabolism Support',
        description: 'Encourages natural lipid metabolism, helping maintain healthy cholesterol and triglycerides.',
      },
    ],
    audiences: [
      {
        audience: 'Those Managing Blood Sugar & Pre-Diabetes',
        icon: '🩸',
        benefit: 'Safe, nourishing herbal companion to support balanced metabolic markers every day.',
      },
      {
        audience: 'Those Prone to Internal Heat & Blemishes',
        icon: '🌿',
        benefit: 'Purifies internal heat, detoxifying the liver after rich, oily meals.',
      },
    ],
  },

  'nonla-coffee-freeze-dried': {
    headline: 'Ignite Creative Focus with Pure Freeze-Dried Coffee',
    quote: '-40°C freeze-drying preserves 99% authentic freshly brewed flavor, gentle on the stomach with zero heart jitters.',
    points: [
      {
        iconType: 'zap',
        title: 'Instant Alertness & Sharp Focus',
        description: 'Clean caffeine from Cau Dat Arabica and Dak Lak Robusta sharpens concentration, unlocking creative flow in 3 seconds.',
      },
      {
        iconType: 'heart',
        title: 'Gentle on Stomach, No Heart Flutter',
        description: 'Vacuum freeze-drying removes harsh free acids and burnt oil residues, resulting in a smooth cup free of jittery spikes.',
      },
      {
        iconType: 'sparkles',
        title: 'Abundant Natural Antioxidants',
        description: 'Preserves potent chlorogenic polyphenols that support cognitive vitality and healthy metabolic function.',
      },
    ],
    audiences: [
      {
        audience: 'Busy Executives & Creative Thinkers',
        icon: '💻',
        benefit: 'Instant clean energy anywhere—simply drop 1 cube into cold water or chilled milk.',
      },
      {
        audience: 'Coffee Lovers Prone to Palpitations',
        icon: '☕',
        benefit: 'Savor authentic specialty coffee flavor without the nervousness or disrupted sleep.',
      },
      {
        audience: 'Business Travelers & Adventurers',
        icon: '✈️',
        benefit: 'Pocket-sized elegance that delivers a barista-grade specialty cup on the go.',
      },
    ],
    nutritionNote: 'Dissolves instantly in 3 seconds in cold water, iced milk, or hot water without needing a brewing machine.',
  },

  'nonla-cacao-heritage': {
    headline: 'Warm Wholesome Comfort for Heart and Mind',
    quote: 'Pure Dak Lak cacao rich in flavonoids, melting away mental fatigue and protecting cardiovascular resilience.',
    points: [
      {
        iconType: 'heart',
        title: 'Heart Wellness & Arterial Elasticity',
        description: 'Natural flavanols improve healthy blood circulation to brain and heart, maintaining supple arterial walls.',
      },
      {
        iconType: 'sparkles',
        title: 'Stimulates Natural Mood Lifters',
        description: 'Rich in natural tryptophan which sparks serotonin production, lifting worries and inspiring cheerful serenity.',
      },
      {
        iconType: 'sun',
        title: 'Rich in Essential Minerals & Clean Fuel',
        description: 'Packed with Magnesium, Iron, and Zinc to help muscles relax and encourage peaceful, restorative sleep.',
      },
    ],
    audiences: [
      {
        audience: 'Growing Teens & Young Children',
        icon: '🧒',
        benefit: 'Supplies essential brain-boosting nutrients for comforting morning energy before class.',
      },
      {
        audience: 'Fatigued & Stressed Professionals',
        icon: '💼',
        benefit: 'A warm cup of afternoon cacao melts away stress and rekindles gentle inspiration.',
      },
      {
        audience: 'Elders & Grandparents',
        icon: '👵',
        benefit: 'Enhances cerebral blood flow, supporting sharp memory and gentle, peaceful rest.',
      },
    ],
  },

  'phunha-dac-san': {
    headline: 'Wholesome Clean Protein Delicacies for the Whole Family',
    quote: 'Handcrafted via 30-year heritage recipes from 100% fresh butchered lean meat, zero harmful preservatives, food safety certified.',
    points: [
      {
        iconType: 'zap',
        title: 'Rich in Wholesome Protein & Energy',
        description: 'Provides high-grade bioavailable protein from fresh lean meat to build physical resilience and stamina.',
      },
      {
        iconType: 'sparkles',
        title: 'Ultimate Convenience & Time Saver',
        description: 'Effortless solution for wholesome breakfasts or nutritious, satisfying afternoon snacks in under a minute.',
      },
      {
        iconType: 'shield',
        title: 'Absolute Safety & Purity',
        description: 'Prepared with 30-year artisanal heritage, zero borax, zero synthetic preservatives, strict food hygiene compliance.',
      },
    ],
    audiences: [
      {
        audience: 'Young Children & Picky Eaters',
        icon: '🧒',
        benefit: 'Light fluffy strands with savory natural sweetness stimulate appetite, helping toddlers eat well and thrive.',
      },
      {
        audience: 'Busy Households',
        icon: '💼',
        benefit: 'Instant nutritious meal booster paired with crusty bread, sticky rice, or warm porridge.',
      },
      {
        audience: 'Elders & Grandparents',
        icon: '👵',
        benefit: 'Tender, easily digestible texture with comforting traditional aroma that gently restores physical strength.',
      },
    ],
    nutritionNote: '100% lean meat sourced under strict food safety standards, sealed in airtight barrier jars/pouches without synthetic preservatives.',
  },
};

/**
 * Resolver function to get comprehensive Health Benefits data for products.
 * STRICT RULE: Only returns data when there is an exact/relevant match.
 * Returns null if data is empty or unsuitable, allowing UI to automatically hide the section.
 */
export function getProductHealthBenefits(product: Product, lang?: string): ProductHealthBenefit | null {
  if (!product) return null;

  const isEn = lang === 'EN';
  const dataStore = isEn ? HEALTH_BENEFITS_DATA_EN : HEALTH_BENEFITS_DATA;

  // 1. If product already has inline healthBenefits, return it
  if (product.healthBenefits && product.healthBenefits.points && product.healthBenefits.points.length > 0) {
    return product.healthBenefits;
  }

  const pid = (product.id || '').toLowerCase();

  // 2. ĐẶC SẢN THỰC PHẨM & SNACK CAO CẤP: Công dụng dinh dưỡng thực phẩm sạch
  if (
    product.partnerId === 'dac-san-snack' ||
    product.partnerId === 'phu-nha' ||
    pid.startsWith('phu-nha') ||
    pid.includes('cha-bong') ||
    pid.includes('kho-ga') ||
    pid.includes('kho-heo')
  ) {
    return dataStore['phunha-dac-san'];
  }

  // 3. MATCHA & TRÀ LAKA CHUẨN NHẬT
  if (pid.includes('matcha-laka-ceremonial')) {
    return dataStore['matcha-ceremonial'];
  }
  if (pid.includes('matcha-laka-premium')) {
    return dataStore['matcha-premium'];
  }
  if (pid.includes('matcha-laka-culinary')) {
    return dataStore['matcha-culinary'];
  }
  if (pid.includes('xa-den')) {
    return dataStore['cascara-xa-den'];
  }
  if (pid.includes('cascara') && (pid.includes('syrup') || pid.includes('1000ml') || pid.includes('700ml'))) {
    return dataStore['cascara-syrup'];
  }
  if (pid.includes('cascara') || ((product.partnerId === 'matcha-tra-laka' || product.partnerId === 'viet-thao-nhien') && (pid.includes('tra') || pid.includes('tea')))) {
    return dataStore['cascara-tea'];
  }
  if (product.partnerId === 'matcha-tra-laka' || product.partnerId === 'viet-thao-nhien') {
    if (pid.includes('matcha')) return dataStore['matcha-premium'];
    return dataStore['cascara-tea'];
  }

  // 4. GIẢI PHÁP NƯỚC MÍA TUYẾT IQF
  if (pid.includes('vua-mia') || product.partnerId === 'nuoc-mia-iqf' || product.partnerId === 'vua-mia') {
    return dataStore['vua-mia'];
  }

  // 5. DÒNG THẢO DƯỢC SÂM NGỌC LINH - Sâm Dây & Trà thảo mộc
  if (pid.includes('lac-tien')) {
    return dataStore['dato-tra-lac-tien'];
  }
  if (pid.includes('kho-qua')) {
    return dataStore['dato-tra-kho-qua'];
  }
  if (pid.includes('tinh-chat') || pid.includes('mat-ong') || pid.includes('mut-sam')) {
    return dataStore['dato-mat-ong'];
  }
  if (pid.includes('sam-day') || pid.includes('nhan-sam') || product.partnerId === 'thao-duoc-sam' || product.partnerId === 'thao-duoc-dato') {
    return dataStore['dato-sam-day'];
  }

  // 6. DÒNG CÀ PHÊ VIÊN SẤY & CÀ PHÊ HẠT - Cacao & Cà phê sấy thăng hoa
  if (pid.includes('cacao')) {
    return dataStore['nonla-cacao-heritage'];
  }
  if (product.partnerId === 'ca-phe-vien-say' || product.partnerId === 'non-la-aodai' || pid.includes('nonla') || pid.includes('aodai') || pid.includes('coffee') || pid.includes('ca-phe')) {
    return dataStore['nonla-coffee-freeze-dried'];
  }

  // STRICT RULE: If no valid/accurate health benefits exist, return null to automatically hide the block!
  return null;
}
