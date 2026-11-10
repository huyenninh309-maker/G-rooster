import { Language } from '../types';

export type PolicyKey = 'privacy' | 'pricing' | 'restrictions' | 'payment' | 'shipping' | 'returns';

export interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

export interface PolicyDocument {
  key: PolicyKey;
  shortLabel: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export const LEGAL_POLICIES: Record<Language, Record<PolicyKey, PolicyDocument>> = {
  VN: {
    // 1. CHÍNH SÁCH BẢO MẬT THÔNG TIN
    privacy: {
      key: 'privacy',
      shortLabel: 'Chính sách bảo mật',
      title: 'CHÍNH SÁCH BẢO MẬT THÔNG TIN',
      subtitle: 'Quy chuẩn bảo vệ thông tin khách hàng và dữ liệu cá nhân theo quy định Bộ Công Thương',
      lastUpdated: 'Cập nhật lần cuối: Năm 2026 (Áp dụng toàn hệ thống G-ROOSTER)',
      sections: [
        {
          id: 'muc-dich-thu-thap',
          title: '1. Mục đích thu thập thông tin cá nhân',
          content: [
            'Hệ thống thương mại điện tử CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ G-ROOSTER (MST: 0319153593) thu thập thông tin khách hàng nhằm phục vụ các mục đích chính đáng sau:',
            '• Xử lý đơn hàng, điều phối giao nhận nông sản và đặc sản theo đúng địa chỉ yêu cầu.',
            '• Xuất hóa đơn điện tử VAT và hoàn tất thủ tục thanh toán kế toán doanh nghiệp.',
            '• Cung cấp báo giá sỉ B2B cá nhân hóa, biểu giá 4 bậc (Lẻ, Sỉ 1, Sỉ 2, Sỉ 3) theo quy mô đối tác.',
            '• Thông báo tiến độ vận chuyển hàng hỏa tốc, bảo hành chất lượng sản phẩm và hỗ trợ đổi trả hàng.',
            '• Gửi thông tin biến động giá vùng nguyên liệu, chính sách ưu đãi mùa vụ (khi khách hàng đăng ký nhận tin).'
          ]
        },
        {
          id: 'pham-vi-thu-thap',
          title: '2. Phạm vi thu thập thông tin',
          content: [
            'Chúng tôi chỉ thu thập các trường thông tin cần thiết tối thiểu cho giao dịch:',
            '• Thông tin người đặt và người nhận: Họ và tên, Số điện thoại liên hệ, Địa chỉ giao hàng chi tiết.',
            '• Thông tin đối tác doanh nghiệp / Hộ kinh doanh: Tên pháp nhân, Mã số thuế (MST), Địa chỉ đăng ký kinh doanh, Email nhận hóa đơn điện tử.',
            '• Thông tin đơn hàng: Mã sản phẩm, số lượng đặt, ghi chú bảo quản và yêu cầu đóng gói riêng.'
          ]
        },
        {
          id: 'thoi-gian-luu-tru',
          title: '3. Thời gian lưu trữ thông tin',
          content: [
            '• Dữ liệu thông tin cá nhân và đơn hàng được lưu trữ an toàn trên hệ thống máy chủ của G-ROOSTER trong suốt thời gian duy trì hợp tác thương mại.',
            '• Đối với chứng từ kế toán và hóa đơn VAT, thời hạn lưu trữ tuân thủ theo Luật Quản lý Thuế và Luật Kế toán Việt Nam (tối thiểu 10 năm).',
            '• Khách hàng có quyền yêu cầu hủy bỏ hoặc khóa dữ liệu tài khoản bất kỳ lúc nào thông qua văn bản hoặc email chính thức.'
          ]
        },
        {
          id: 'doi-tuong-tiep-can',
          title: '4. Những đối tượng có thể tiếp cận thông tin',
          content: [
            'G-ROOSTER cam kết không bán, không cho thuê hoặc chuyển nhượng thông tin khách hàng cho bất kỳ bên thứ ba nào vì mục đích quảng cáo thương mại. Dữ liệu chỉ được tiếp cận bởi:',
            '• Ban giám đốc và nhân viên phụ trách đơn hàng, kế toán của G-ROOSTER CO., LTD.',
            '• Các đơn vị vận chuyển đối tác ủy quyền (Viettel Post, GHTK, nhà xe vận tải liên tỉnh) chỉ tiếp cận tên, số điện thoại và địa chỉ giao nhận.',
            '• Cơ quan nhà nước có thẩm quyền tại Việt Nam khi có yêu cầu hợp pháp bằng văn bản theo quy định của pháp luật.'
          ]
        },
        {
          id: 'don-vi-quan-ly',
          title: '5. Đơn vị thu thập và quản lý thông tin',
          content: [
            '• Tên doanh nghiệp: CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ G-ROOSTER',
            '• Mã số thuế: 0319153593 - Do Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh cấp.',
            '• Trụ sở & Tổng kho: 44 Trần Đình Xu, Phường Cầu Ông Lãnh, Quận 1, TP. Hồ Chí Minh, Việt Nam.',
            '• Đường dây nóng tiếp nhận: 0961 525 450 - 0938 7979 04',
            '• Email pháp lý & Dữ liệu: contact@g-rooster.com · Website: https://g-rooster.com/'
          ]
        },
        {
          id: 'quyen-khach-hang',
          title: '6. Quyền của khách hàng đối với dữ liệu cá nhân',
          content: [
            '• Khách hàng có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc yêu cầu xóa bỏ thông tin cá nhân của mình trên hệ thống.',
            '• Để thực hiện quyền trên, quý khách vui lòng liên hệ hotline 0961 525 450 - 0938 7979 04 hoặc gửi thư điện tử đến contact@g-rooster.com. Bộ phận CSKH sẽ xác minh danh tính và xử lý trong vòng 24 giờ làm việc.'
          ]
        },
        {
          id: 'cam-ket-bao-mat',
          title: '7. Cam kết bảo mật và giải quyết khiếu nại dữ liệu',
          content: [
            '• Toàn bộ dữ liệu truyền tải trên website được mã hóa bằng giao thức bảo mật SSL 256-bit chuẩn quốc tế.',
            '• Trường hợp máy chủ lưu trữ bị tấn công mạng làm phát sinh nguy cơ rò rỉ dữ liệu, G-ROOSTER sẽ lập tức thông báo vụ việc cho cơ quan chức năng điều tra và thông báo cho khách hàng được biết trong vòng 24 giờ.'
          ]
        }
      ]
    },

    // 2. CHÍNH SÁCH GIÁ CẢ
    pricing: {
      key: 'pricing',
      shortLabel: 'Chính sách giá cả',
      title: 'CHÍNH SÁCH GIÁ CẢ',
      subtitle: 'Quy định về cơ chế định giá, niêm yết giá, thuế GTGT và biểu giá 4 bậc sỉ & lẻ minh bạch',
      lastUpdated: 'Cập nhật lần cuối: Năm 2026 (Áp dụng toàn hệ thống G-ROOSTER)',
      sections: [
        {
          id: 'nguyen-tac-dinh-gia',
          title: '1. Nguyên tắc định giá và niêm yết công khai',
          content: [
            '• Toàn bộ giá sản phẩm nông sản, matcha, thực phẩm chế biến và đặc sản tại G-ROOSTER được niêm yết công khai, minh bạch bằng Đồng Việt Nam (VNĐ).',
            '• Mức giá niêm yết trên website đã bao gồm thuế Giá trị gia tăng (VAT) theo tỷ suất thuế hiện hành, trừ trường hợp đối tác có thỏa thuận xuất khẩu riêng.',
            '• Cam kết bán đúng giá niêm yết, không phát sinh phụ phí ẩn ngoài cước vận chuyển thực tế đã được thông báo trước khi chốt đơn.'
          ]
        },
        {
          id: 'bieu-gia-4-bac',
          title: '2. Cơ cấu biểu giá 4 bậc (Lẻ & Sỉ B2B)',
          content: [
            'Hệ thống định giá G-ROOSTER được xây dựng tối ưu cho từng phân khúc khách hàng:',
            '• Giá Bán Lẻ: Dành cho người tiêu dùng cá nhân, đơn dùng thử hoặc mẫu thử nghiệm số lượng nhỏ.',
            '• Giá Sỉ Bậc 1: Tự động kích hoạt khi đạt số lượng đóng gói tối thiểu theo thùng (Carton) tiêu chuẩn.',
            '• Giá Sỉ Bậc 2: Mức chiết khấu chuyên sâu dành cho đại lý khu vực, quán trà sữa, chuỗi F&B tiêu thụ định kỳ hàng tháng.',
            '• Giá Sỉ Bậc 3 (Nhà phân phối): Biểu giá tốt nhất dành cho tổng kho, nhà phân phối độc quyền tỉnh và đối tác ký hợp đồng bao tiêu sản lượng theo quý/năm.'
          ]
        },
        {
          id: 'thue-vat-hoa-don',
          title: '3. Quy định về thuế GTGT và hóa đơn điện tử',
          content: [
            '• Mọi đơn hàng tại G-ROOSTER đều được hỗ trợ xuất hóa đơn GTGT điện tử hợp pháp theo đúng mã số thuế và tên doanh nghiệp khách hàng cung cấp.',
            '• Hóa đơn điện tử được gửi tự động qua email của khách hàng trong vòng 24-48 giờ sau khi đơn hàng được giao nhận thành công.'
          ]
        },
        {
          id: 'chiet-khau-khuyen-mai',
          title: '4. Chiết khấu sản lượng & chương trình khuyến mại',
          content: [
            '• Chính sách thưởng doanh số theo quý áp dụng cho các nhà phân phối duy trì sản lượng ổn định.',
            '• Các chương trình khuyến mãi theo mùa vụ nông sản được thông báo công khai trên trang chủ và gửi qua bản tin điện tử cho đối tác đăng ký.'
          ]
        },
        {
          id: 'bien-dong-va-dieu-chinh',
          title: '5. Cơ chế điều chỉnh giá và thông báo thị trường',
          content: [
            '• Do tính chất nông sản phụ thuộc vào mùa vụ và điều kiện khí hậu, trường hợp có biến động giá nguyên liệu đầu vào, G-ROOSTER cam kết thông báo trước bằng văn bản tối thiểu 15 ngày làm việc đối với các đối tác đã ký hợp đồng nguyên tắc.',
            '• Các đơn hàng đã được xác nhận và đặt cọc thành công sẽ giữ nguyên mức giá đã chốt mà không bị ảnh hưởng bởi biến động thị trường.'
          ]
        },
        {
          id: 'ty-gia-xuat-khau',
          title: '6. Tỷ giá quy đổi ngoại tệ (USD) xuất khẩu',
          content: [
            '• Đối với khách hàng nước ngoài hoặc hợp đồng xuất khẩu, giá quy đổi USD được tính toán minh bạch theo tỷ giá giao dịch thực tế.',
            '• Giá trị USD hiển thị trên website là giá tham chiếu hỗ trợ khách hàng quốc tế tra cứu nhanh chóng.'
          ]
        }
      ]
    },

    // 3. ĐIỀU KIỆN VÀ HẠN CHẾ CUNG CẤP HÀNG HÓA
    restrictions: {
      key: 'restrictions',
      shortLabel: 'Điều kiện & hạn chế',
      title: 'ĐIỀU KIỆN VÀ HẠN CHẾ CUNG CẤP HÀNG HÓA',
      subtitle: 'Quy định về phạm vi địa lý, đối tượng mua hàng, kiểm soát chất lượng và giới hạn cung ứng',
      lastUpdated: 'Cập nhật lần cuối: Năm 2026 (Áp dụng toàn hệ thống G-ROOSTER)',
      sections: [
        {
          id: 'pham-vi-dia-ly',
          title: '1. Phạm vi địa lý và khu vực cung cấp',
          content: [
            '• Cung cấp hàng hóa trên phạm vi toàn lãnh thổ Việt Nam thông qua mạng lưới xe chuyên dụng và các đối tác chuyển phát nhanh uy tín.',
            '• Khu vực TP. Hồ Chí Minh: Hỗ trợ giao hỏa tốc 2 giờ đối với các đơn hàng cần gấp trong giờ hành chính từ Tổng kho Quận 1.',
            '• Khu vực hải đảo và vùng sâu vùng xa: Thời gian giao hàng có thể kéo dài thêm từ 2-4 ngày tùy thuộc vào điều kiện giao thông và thời tiết thực tế.'
          ]
        },
        {
          id: 'doi-tuong-khach-hang',
          title: '2. Đối tượng khách hàng và điều kiện giao dịch',
          content: [
            '• Khách hàng cá nhân (B2C): Đủ năng lực hành vi dân sự theo quy định của pháp luật Việt Nam.',
            '• Khách hàng doanh nghiệp (B2B): Doanh nghiệp, hộ kinh doanh, hợp tác xã có mã số thuế và đăng ký kinh doanh hợp pháp.',
            '• Khách hàng cam kết cung cấp thông tin liên hệ và địa chỉ nhận hàng chính xác để phục vụ công tác giao hàng an toàn.'
          ]
        },
        {
          id: 'gioi-han-so-luong',
          title: '3. Giới hạn số lượng đặt hàng tối thiểu và tối đa',
          content: [
            '• Số lượng tối thiểu (MOQ): Đối với đơn hàng sỉ, mức MOQ áp dụng từ 1 thùng tiêu chuẩn (tùy theo từng mã sản phẩm cụ thể).',
            '• Số lượng tối đa: Đối với các đơn hàng số lượng container hoặc vượt quá 5 tấn/đợt, quý khách vui lòng liên hệ trước tối thiểu 7-10 ngày để bộ phận kho vận lên kế hoạch điều phối vùng nguyên liệu.'
          ]
        },
        {
          id: 'tieu-chuan-chat-luong',
          title: '4. Tiêu chuẩn chất lượng và an toàn thực phẩm',
          content: [
            '• 100% sản phẩm có nguồn gốc xuất xứ rõ ràng, đầy đủ giấy chứng nhận kiểm nghiệm an toàn thực phẩm (VSATTP), ISO 22000, HACCP, VietGAP.',
            '• Sản phẩm có nhãn phụ tiếng Việt ghi rõ thành phần, ngày sản xuất (NSX), hạn sử dụng (HSD), hướng dẫn bảo quản và mã số truy xuất nguồn gốc.',
            '• Hạn sử dụng xuất kho cam kết còn tối thiểu 70% tổng thời gian bảo quản tại thời điểm giao hàng.'
          ]
        },
        {
          id: 'bao-quan-chuoi-lanh',
          title: '5. Hạn chế đối với nhóm hàng bảo quản đặc thù',
          content: [
            '• Đối với các mặt hàng đông lạnh như Nước mía tuyết IQF, Matcha tươi: Chỉ cung cấp tại các khu vực đảm bảo điều kiện vận chuyển chuỗi lạnh âm sâu (-18°C) hoặc đóng thùng xốp đá gel giao hỏa tốc.',
            '• G-ROOSTER bảo lưu quyền từ chối giao các mặt hàng đông lạnh đến các địa điểm không đáp ứng điều kiện bảo quản nếu đánh giá nguy cơ suy giảm chất lượng hàng hóa.'
          ]
        },
        {
          id: 'bat-kha-khang',
          title: '6. Các trường hợp bất khả kháng',
          content: [
            '• G-ROOSTER được miễn trừ nghĩa vụ giao hàng đúng hẹn trong các trường hợp bất khả kháng theo quy định pháp luật (thiên tai, bão lũ, dịch bệnh, sự cố cấm vận đường vận chuyển quốc gia hoặc quy định giãn cách của cơ quan nhà nước).',
            '• Khi xảy ra sự kiện bất khả kháng, G-ROOSTER sẽ chủ động thông báo cho khách hàng và cùng phối hợp tìm giải pháp khắc phục nhanh nhất.'
          ]
        }
      ]
    },

    // 4. CHÍNH SÁCH THANH TOÁN
    payment: {
      key: 'payment',
      shortLabel: 'Chính sách thanh toán',
      title: 'CHÍNH SÁCH THANH TOÁN',
      subtitle: 'Quy định về các phương thức thanh toán hợp pháp, bảo mật giao dịch và quy trình đối soát',
      lastUpdated: 'Cập nhật lần cuối: Năm 2026 (Áp dụng toàn hệ thống G-ROOSTER)',
      sections: [
        {
          id: 'nguyen-tac-thanh-toan',
          title: '1. Nguyên tắc thanh toán an toàn',
          content: [
            '• G-ROOSTER áp dụng các phương thức thanh toán chuẩn hóa nhằm bảo vệ tuyệt đối an toàn tài chính cho khách hàng và đối tác.',
            '• Mọi khoản thanh toán đều có chứng từ hợp lệ, ủy nhiệm chi hoặc biên lai thu tiền theo đúng chuẩn kế toán doanh nghiệp.'
          ]
        },
        {
          id: 'tai-khoan-doanh-nghiep',
          title: '2. Phương thức chuyển khoản qua Tài khoản Doanh nghiệp',
          content: [
            'Phương thức khuyến nghị dành cho khách hàng doanh nghiệp, đại lý và đơn hàng B2B:',
            '• Tên ngân hàng: Ngân hàng TMCP Quân Đội (MB Bank)',
            '• Số tài khoản: 7834588888',
            '• Tên chủ tài khoản: CONG TY TNHH THUONG MAI DICH VU G-ROOSTER',
            '• Cú pháp chuyển khoản: [Mã đơn hàng] - [Số điện thoại khách hàng]',
            '• Lưu ý: Khách hàng chỉ chuyển tiền vào đúng số tài khoản doanh nghiệp nêu trên. G-ROOSTER không chịu trách nhiệm đối với các giao dịch chuyển tiền vào tài khoản cá nhân mạo danh.'
          ]
        },
        {
          id: 'thanh-toan-cod',
          title: '3. Phương thức thanh toán khi nhận hàng (COD)',
          content: [
            '• Áp dụng cho đơn hàng bán lẻ hoặc đơn hàng mẫu dùng thử có giá trị dưới 5.000.000 VNĐ tại khu vực nội thành TP.HCM và các tỉnh thành có dịch vụ COD của đối tác chuyển phát nhanh.',
            '• Khách hàng kiểm tra tình trạng đóng gói bên ngoài trước khi thanh toán tiền mặt cho nhân viên giao hàng.'
          ]
        },
        {
          id: 'chinh-sach-cong-no',
          title: '4. Chính sách bảo lãnh công nợ B2B',
          content: [
            '• Áp dụng cho các chuỗi đối tác F&B, khách sạn, siêu thị đã ký hợp đồng nguyên tắc cung ứng định kỳ.',
            '• Hạn mức tín dụng và thời hạn công nợ (15 ngày, 30 ngày) được phê duyệt dựa trên hồ sơ năng lực và lịch sử thanh toán của đối tác.'
          ]
        },
        {
          id: 'hoa-don-vat-quy-dinh',
          title: '5. Quy trình xuất hóa đơn GTGT điện tử',
          content: [
            '• Khách hàng vui lòng cung cấp thông tin xuất hóa đơn (Tên công ty, MST, địa chỉ, email nhận hóa đơn) ngay tại thời điểm tạo đơn hàng.',
            '• Hóa đơn điện tử được khởi tạo và gửi trực tiếp qua email của khách hàng sau khi đơn hàng được ghi nhận thanh toán hoàn tất.'
          ]
        },
        {
          id: 'xu-ly-sai-sot-hoan-tien',
          title: '6. Xử lý sai sót giao dịch & hoàn tiền thanh toán',
          content: [
            '• Trường hợp chuyển thừa, chuyển nhầm hoặc đơn hàng bị hủy hợp lệ theo thỏa thuận, G-ROOSTER sẽ hoàn lại 100% số tiền vào tài khoản người gửi trong vòng 1-2 ngày làm việc.',
            '• Mọi vướng mắc về thanh toán, đối soát công nợ vui lòng liên hệ Hotline: 0961 525 450 - 0938 7979 04 hoặc email: contact@g-rooster.com.'
          ]
        }
      ]
    },

    // 5. CHÍNH SÁCH GIAO NHẬN VÀ VẬN CHUYỂN
    shipping: {
      key: 'shipping',
      shortLabel: 'Giao nhận & vận chuyển',
      title: 'CHÍNH SÁCH GIAO NHẬN VÀ VẬN CHUYỂN',
      subtitle: 'Quy chuẩn thời gian giao hàng, biểu phí vận chuyển, đồng kiểm và đóng gói chuỗi lạnh',
      lastUpdated: 'Cập nhật lần cuối: Năm 2026 (Áp dụng toàn hệ thống G-ROOSTER)',
      sections: [
        {
          id: 'pham-vi-giao-nhan',
          title: '1. Phạm vi và hình thức giao nhận hàng hóa',
          content: [
            '• G-ROOSTER triển khai dịch vụ giao nhận nông sản và đặc sản trên toàn quốc 63 tỉnh thành và xuất khẩu quốc tế.',
            '• Hình thức vận chuyển: Xe tải chuyên dụng của công ty, đội xe máy hỏa tốc nội thành, dịch vụ chuyển phát nhanh đối tác (Viettel Post, GHTK), và các chành xe vận tải liên tỉnh uy tín.'
          ]
        },
        {
          id: 'thoi-gian-giao-hang',
          title: '2. Thời gian giao hàng cam kết',
          content: [
            '• Nội thành TP. Hồ Chí Minh: Giao hàng hỏa tốc trong 2 giờ đối với các đơn hàng cần gấp từ Tổng kho Quận 1 trong khung giờ hành chính (08h00 - 17h00).',
            '• Khu vực Đông Nam Bộ & Đồng bằng sông Cửu Long: Giao trong vòng 24 giờ kể từ thời điểm chốt đơn.',
            '• Khu vực Miền Trung & Miền Bắc: Giao trong vòng 24 - 48 giờ đối với đường bay hỏa tốc hoặc 2 - 4 ngày đối với đường bộ liên tỉnh.',
            '• Đơn hàng xuất khẩu: Thực hiện theo lịch trình tàu/bay được quy định cụ thể trong từng hợp đồng ngoại thương.'
          ]
        },
        {
          id: 'cuoc-phi-van-chuyen',
          title: '3. Quy định cước phí vận chuyển & chính sách Freeship',
          content: [
            '• Miễn phí giao hàng (Freeship): Áp dụng cho các đơn hàng sỉ B2B đạt giá trị định mức tối thiểu theo từng ngành hàng tại TP.HCM.',
            '• Đơn hàng đi tỉnh / đơn dưới định mức: Cước phí được tính theo biểu giá thực tế của đơn vị vận chuyển đối tác. G-ROOSTER luôn cam kết đàm phán mức cước ưu đãi nhất cho quý khách.'
          ]
        },
        {
          id: 'dong-goi-chuoi-lanh',
          title: '4. Quy cách đóng gói & bảo quản chuỗi lạnh',
          content: [
            '• Hàng khô, snack, bột matcha: Đóng thùng carton 3-5 lớp dán băng keo niêm phong thương hiệu G-ROOSTER, chống va đập và chống ẩm.',
            '• Hàng đông lạnh (Nước mía tuyết IQF, matcha tươi): Đóng thùng xốp chuyên dụng chèn đá gel cách nhiệt giữ nhiệt độ lạnh ổn định suốt hành trình di chuyển.'
          ]
        },
        {
          id: 'quy-trinh-dong-kiem',
          title: '5. Quy trình đồng kiểm khi nhận hàng',
          content: [
            '• Khách hàng có quyền và nghĩa vụ kiểm tra hàng hóa cùng nhân viên giao nhận trước khi ký nhận biên bản bàn giao (Đồng kiểm).',
            '• Nội dung kiểm tra: Tình trạng niêm phong bao bì thùng carton, số lượng sản phẩm, hạn sử dụng và dấu hiệu cấn móp biến dạng trong quá trình vận chuyển.',
            '• Trường hợp phát hiện sai sót: Quý khách từ chối nhận phần hàng lỗi, chụp ảnh/quay video hiện trường và liên hệ ngay Hotline 0961 525 450 - 0938 7979 04 để được xử lý khẩn cấp.'
          ]
        },
        {
          id: 'trach-nhiem-van-chuyen',
          title: '6. Trách nhiệm của bên vận chuyển và xử lý sự cố',
          content: [
            '• Đối tác vận chuyển chịu trách nhiệm bảo quản nguyên vẹn hàng hóa trong suốt thời gian trung chuyển.',
            '• Mọi tổn thất phát sinh do lỗi vận chuyển (mất hàng, vỡ bao bì, giao chậm dẫn đến suy giảm chất lượng) sẽ được G-ROOSTER và đơn vị vận chuyển bồi thường 100% cho khách hàng.'
          ]
        }
      ]
    },

    // 6. CHÍNH SÁCH ĐỔI TRẢ VÀ GIẢI QUYẾT KHIẾU NẠI
    returns: {
      key: 'returns',
      shortLabel: 'Đổi trả & khiếu nại',
      title: 'CHÍNH SÁCH ĐỔI TRẢ VÀ GIẢI QUYẾT KHIẾU NẠI',
      subtitle: 'Cam kết chất lượng 100%, bảo vệ quyền lợi tối đa cho người mua hàng B2B & B2C',
      lastUpdated: 'Cập nhật lần cuối: Năm 2026 (Áp dụng toàn hệ thống G-ROOSTER)',
      sections: [
        {
          id: 'dieu-kien-doi-tra',
          title: '1. Điều kiện áp dụng đổi trả hàng hóa',
          content: [
            'G-ROOSTER cam kết hỗ trợ đổi trả 100% không phát sinh chi phí trong các trường hợp sau:',
            '• Hàng bị hư hỏng, ẩm mốc, biến chất, rách tem niêm phong do lỗi sản xuất hoặc quá trình vận chuyển.',
            '• Hàng giao sai quy cách, sai chủng loại sản phẩm, sai số lượng so với đơn đặt hàng đã xác nhận.',
            '• Hạn sử dụng của sản phẩm xuất kho không đạt ngưỡng cam kết tối thiểu 70% thời gian bảo quản.',
            '• Hàng hóa có kết quả kiểm nghiệm không đạt chỉ số an toàn thực phẩm như công bố.'
          ]
        },
        {
          id: 'thoi-han-thong-bao',
          title: '2. Thời hạn thông báo và thực hiện đổi trả',
          content: [
            '• Nhóm hàng đông lạnh / nông sản tươi: Quý khách vui lòng thông báo cho bộ phận CSKH trong vòng 24 giờ kể từ thời điểm nhận hàng.',
            '• Nhóm hàng khô đóng gói / gia vị / matcha / snack: Quý khách vui lòng thông báo trong vòng 48 giờ kể từ thời điểm nhận hàng.',
            '• Mọi yêu cầu đổi trả cần cung cấp hình ảnh hoặc video mở kiện hàng chứng minh tình trạng hàng hóa thực tế.'
          ]
        },
        {
          id: 'hinh-thuc-xu-ly',
          title: '3. Phương thức đổi hàng hoặc hoàn tiền',
          content: [
            '• Đổi sản phẩm mới: G-ROOSTER xuất kho và giao lại sản phẩm mới đạt chuẩn 100% trong vòng 24 giờ (nội thành TP.HCM) hoặc 48 giờ (đi tỉnh). Toàn bộ chi phí vận chuyển phát sinh do G-ROOSTER chi trả 100%.',
            '• Hoàn tiền: Trường hợp không còn sản phẩm tương đương để đổi hoặc quý đối tác yêu cầu hoàn tiền, G-ROOSTER sẽ hoàn lại 100% giá trị tiền hàng vào tài khoản ngân hàng của quý khách trong vòng 1-2 ngày làm việc.'
          ]
        },
        {
          id: 'quy-trinh-khieu-nai',
          title: '4. Quy trình 4 bước tiếp nhận & giải quyết khiếu nại',
          content: [
            '• Bước 1 - Tiếp nhận: Khách hàng gửi phản ánh qua Hotline: 0961 525 450 - 0938 7979 04 hoặc Email: contact@g-rooster.com kèm hình ảnh/video chứng từ liên quan.',
            '• Bước 2 - Xác minh: Bộ phận CSKH tiếp nhận và liên hệ lại với khách hàng trong vòng 2 giờ làm việc để xác nhận tình trạng.',
            '• Bước 3 - Đề xuất phương án: Đưa ra phương án xử lý dứt điểm (đổi hàng, bù tiền hoặc hoàn tiền) trong vòng 24 giờ làm việc.',
            '• Bước 4 - Hoàn tất: Thực hiện thu hồi sản phẩm lỗi và bàn giao hàng đổi mới hoặc hoàn tiền theo thỏa thuận.'
          ]
        },
        {
          id: 'co-che-tranh-chap',
          title: '5. Cơ chế giải quyết tranh chấp & cam kết đồng hành',
          content: [
            '• G-ROOSTER luôn đề cao tinh thần hợp tác, đối thoại và thiện chí nhằm bảo vệ quyền lợi chính đáng và uy tín hợp tác lâu dài của quý đối tác.',
            '• Trường hợp phát sinh bất đồng không thể giải quyết qua thương lượng hòa giải, tranh chấp sẽ được giải quyết tại Tòa án nhân dân có thẩm quyền tại TP. Hồ Chí Minh theo luật định Việt Nam.'
          ]
        },
        {
          id: 'dau-moi-lien-he',
          title: '6. Đầu mối tiếp nhận khiếu nại chính thức',
          content: [
            '• Doanh nghiệp: CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ G-ROOSTER',
            '• Hotline hỗ trợ 24/7: 0961 525 450 - 0938 7979 04',
            '• Email tiếp nhận: contact@g-rooster.com',
            '• Trụ sở: 44 Trần Đình Xu, Phường Cầu Ông Lãnh, Quận 1, TP. Hồ Chí Minh'
          ]
        }
      ]
    }
  },

  EN: {
    // 1. PRIVACY POLICY
    privacy: {
      key: 'privacy',
      shortLabel: 'Privacy Policy',
      title: 'DATA PRIVACY & PROTECTION POLICY',
      subtitle: 'Standards for Customer Information Protection and Personal Data Security under MOIT Guidelines',
      lastUpdated: 'Last Updated: 2026 (Applies company-wide across G-ROOSTER)',
      sections: [
        {
          id: 'muc-dich-thu-thap',
          title: '1. Purpose of Personal Data Collection',
          content: [
            'G-ROOSTER TRADING SERVICE CO., LTD (Tax Code: 0319153593) collects customer information strictly for legitimate commercial and fulfillment purposes:',
            '• Processing orders and coordinating express delivery of agricultural and specialty food products to specified locations.',
            '• Issuing official electronic VAT invoices and fulfilling accounting and tax regulatory standards.',
            '• Providing personalized wholesale pricing across 4 tiers (Retail, Tier 1, Tier 2, Tier 3) tailored to partner order volumes.',
            '• Sending delivery updates, tracking numbers, quality assurances, and after-sales support.',
            '• Notifying partners about market raw-material pricing variations and seasonal promotions (upon explicit consent).'
          ]
        },
        {
          id: 'pham-vi-thu-thap',
          title: '2. Scope of Collected Information',
          content: [
            'We collect only the minimum necessary information required for fulfillment and compliance:',
            '• Buyer & Consignee Info: Full Name, Contact Telephone Number, Detailed Delivery Address.',
            '• Corporate / Business Partner Info: Legal Company Name, Tax Code, Registered Address, Billing Email.',
            '• Order Information: Product SKUs, quantity ordered, packaging requests, and specific storage instructions.'
          ]
        },
        {
          id: 'thoi-gian-luu-tru',
          title: '3. Data Retention Period',
          content: [
            '• Customer and order data are securely stored on G-ROOSTER systems throughout the commercial relationship.',
            '• Accounting documents and electronic VAT invoices are retained in full compliance with Vietnam Tax and Accounting Regulations (minimum 10 years).',
            '• Clients retain the right to request deletion or restriction of personal data at any time via written notice or official email.'
          ]
        },
        {
          id: 'doi-tuong-tiep-can',
          title: '4. Authorized Parties with Access to Information',
          content: [
            'G-ROOSTER guarantees never to sell, lease, or trade customer information to any third party for marketing purposes. Access is strictly limited to:',
            '• Authorized management, fulfillment coordinators, and accounting staff of G-ROOSTER CO., LTD.',
            '• Designated professional logistics providers (e.g., Viettel Post, GHTK, refrigerated freight lines) receiving only essential delivery details.',
            '• Competent state authorities in Vietnam upon lawful written request under statutory regulations.'
          ]
        },
        {
          id: 'don-vi-quan-ly',
          title: '5. Data Controller & Management Entity',
          content: [
            '• Legal Entity: G-ROOSTER TRADING SERVICE CO., LTD',
            '• Tax Code: 0319153593 - Issued by Dept. of Planning and Investment of Ho Chi Minh City.',
            '• Headquarters: 44 Tran Dinh Xu St., Cau Ong Lanh Ward, Dist. 1, Ho Chi Minh City, Vietnam.',
            '• Direct Support Lines: (+84) 961 525 450 - (+84) 938 7979 04',
            '• Legal & Privacy Email: contact@g-rooster.com · Website: https://g-rooster.com/'
          ]
        },
        {
          id: 'quyen-khach-hang',
          title: '6. Customer Rights Over Personal Data',
          content: [
            '• Customers possess the right to review, update, correct, or request deletion of their personal and corporate data.',
            '• To exercise these rights, please contact our helplines at (+84) 961 525 450 - (+84) 938 7979 04 or email contact@g-rooster.com. Verification and resolution will be executed within 24 business hours.'
          ]
        },
        {
          id: 'cam-ket-bao-mat',
          title: '7. Security Commitment & Data Protection',
          content: [
            '• All communications and transactions on this website are encrypted utilizing industry-standard 256-bit SSL protocols.',
            '• In the event of a security breach affecting customer data, G-ROOSTER will report the incident to cyber authorities and notify affected partners within 24 hours.'
          ]
        }
      ]
    },

    // 2. PRICING POLICY
    pricing: {
      key: 'pricing',
      shortLabel: 'Pricing Policy',
      title: 'PRICING POLICY',
      subtitle: 'Regulations on Pricing Mechanisms, Price Quotations, VAT, and 4-Tier Wholesale Structure',
      lastUpdated: 'Last Updated: 2026 (Applies company-wide across G-ROOSTER)',
      sections: [
        {
          id: 'nguyen-tac-dinh-gia',
          title: '1. Transparent Pricing Principle & Public Quotation',
          content: [
            '• All prices for agricultural goods, matcha, processed food, and specialties are quoted publicly in Vietnamese Dong (VND).',
            '• Listed prices include Value Added Tax (VAT) in accordance with applicable tax regulations, unless export arrangements apply.',
            '• G-ROOSTER commits to transparent pricing with zero hidden costs beyond agreed actual shipping fees.'
          ]
        },
        {
          id: 'bieu-gia-4-bac',
          title: '2. 4-Tier Pricing Structure (Retail & B2B Wholesale)',
          content: [
            'Our structured pricing model accommodates every customer scale:',
            '• Retail Price: Standard price for individual consumers and sample trial batches.',
            '• Tier 1 Wholesale: Automatically applied when meeting standard carton packaging quantities.',
            '• Tier 2 Wholesale: Dedicated discount tier for regional distributors, cafes, and F&B chains with monthly volume.',
            '• Tier 3 (Master Distributor): Exclusive prime pricing for contracted master distributors with annual off-take commitments.'
          ]
        },
        {
          id: 'thue-vat-hoa-don',
          title: '3. Value Added Tax (VAT) & Electronic Invoicing',
          content: [
            '• Official tax e-invoices are systematically issued for all corporate orders per Vietnam General Department of Taxation rules.',
            '• Invoices are transmitted directly to the client\'s billing email within 24-48 hours after delivery completion.'
          ]
        },
        {
          id: 'chiet-khau-khuyen-mai',
          title: '4. Volume Rebates & Seasonal Promotions',
          content: [
            '• Quarterly performance rebates are granted to distributors maintaining stable off-take commitments.',
            '• Harvest season promotions are posted publicly on our official portal and shared via partner newsletters.'
          ]
        },
        {
          id: 'bien-dong-va-dieu-chinh',
          title: '5. Price Adjustment & Market Fluctuation Notice',
          content: [
            '• Due to raw agricultural seasonal nature, if major material price shifts occur, G-ROOSTER will issue formal written notice at least 15 business days in advance to contractual partners.',
            '• Confirmed and deposited orders remain strictly locked at the contracted price regardless of market fluctuations.'
          ]
        },
        {
          id: 'ty-gia-xuat-khau',
          title: '6. Foreign Currency (USD) Export Exchange Rates',
          content: [
            '• For export partners, USD amounts are calculated based on transparent commercial foreign exchange rates.',
            '• Indicative USD pricing shown on the portal serves as a real-time reference for international buyers.'
          ]
        }
      ]
    },

    // 3. SUPPLY RESTRICTIONS & CONDITIONS
    restrictions: {
      key: 'restrictions',
      shortLabel: 'Supply Restrictions',
      title: 'TERMS & SUPPLY RESTRICTIONS',
      subtitle: 'Regulations on Geographical Scope, Customer Eligibility, Quality Standards, and Supply Limits',
      lastUpdated: 'Last Updated: 2026 (Applies company-wide across G-ROOSTER)',
      sections: [
        {
          id: 'pham-vi-dia-ly',
          title: '1. Geographical Supply Scope',
          content: [
            '• Delivery covers all 63 provinces across Vietnam and global export destinations.',
            '• Metropolitan Ho Chi Minh City: 2-Hour Express Dispatch available during business hours from District 1 Central Warehouse.',
            '• Island and remote districts: Transit lead times may extend by 2-4 days depending on regional transport and weather conditions.'
          ]
        },
        {
          id: 'doi-tuong-khach-hang',
          title: '2. Customer Eligibility & Commercial Terms',
          content: [
            '• Individual Consumers (B2C): Possessing legal capacity under applicable laws.',
            '• Corporate Partners (B2B): Registered enterprises, cooperatives, and commercial entities with valid tax codes.',
            '• Clients commit to providing accurate contact details and delivery coordinates to ensure secure fulfillment.'
          ]
        },
        {
          id: 'gioi-han-so-luong',
          title: '3. Minimum & Maximum Order Quantities (MOQ)',
          content: [
            '• Wholesale MOQ: Starting from 1 standard carton per SKU as declared in product specifications.',
            '• Maximum Capacity: Orders exceeding 5 metric tons or container loads require 7-10 business days prior notification for regional supply coordination.'
          ]
        },
        {
          id: 'tieu-chuan-chat-luong',
          title: '4. Quality Certifications & Traceability',
          content: [
            '• 100% of products have verified origins and comply with Food Safety (VSATTP), ISO 22000, HACCP, and VietGAP certifications.',
            '• Packaging includes compliance labels stating ingredients, manufacturing date, expiry date, storage guides, and traceability QR codes.',
            '• Dispatched products guarantee at least 70% remaining shelf life at the moment of shipment.'
          ]
        },
        {
          id: 'bao-quan-chuoi-lanh',
          title: '5. Restrictions on Perishable Cold-Chain Items',
          content: [
            '• Frozen items (IQF Sugarcane Juice, fresh matcha): Dispatched strictly under continuous deep cold-chain (-18°C) or insulated foam crates with gel-ice.',
            '• G-ROOSTER reserves the right to decline cold shipments to destinations lacking adequate temperature preservation conditions.'
          ]
        },
        {
          id: 'bat-kha-khang',
          title: '6. Force Majeure Events',
          content: [
            '• G-ROOSTER is exempted from timely delivery liabilities during statutory force majeure events (natural disasters, pandemics, transit embargoes, or government restrictions).',
            '• When such events occur, G-ROOSTER will promptly notify clients and cooperate closely to find optimal alternative fulfillment solutions.'
          ]
        }
      ]
    },

    // 4. PAYMENT POLICY
    payment: {
      key: 'payment',
      shortLabel: 'Payment Policy',
      title: 'PAYMENT POLICY',
      subtitle: 'Regulations on Lawful Payment Methods, Transaction Security, and Billing Reconciliation',
      lastUpdated: 'Last Updated: 2026 (Applies company-wide across G-ROOSTER)',
      sections: [
        {
          id: 'nguyen-tac-thanh-toan',
          title: '1. Safe Settlement Principle',
          content: [
            '• G-ROOSTER implements standardized corporate payment channels to guarantee complete financial safety for buyers.',
            '• Every transaction is accompanied by legitimate accounting vouchers, payment orders, or electronic receipts.'
          ]
        },
        {
          id: 'tai-khoan-doanh-nghiep',
          title: '2. Corporate Bank Transfer (MB Bank - Recommended for B2B)',
          content: [
            'Recommended payment route for corporate buyers, distributors, and wholesale orders:',
            '• Bank Name: Military Commercial Joint Stock Bank (MB Bank)',
            '• Account Number: 7834588888',
            '• Beneficiary: CONG TY TNHH THUONG MAI DICH VU G-ROOSTER',
            '• Transfer Memo: [Order ID] - [Customer Phone Number]',
            '• Caution: Please transfer exclusively to the official corporate account above. G-ROOSTER bears no liability for transfers into unauthorized personal accounts.'
          ]
        },
        {
          id: 'thanh-toan-cod',
          title: '3. Cash on Delivery (COD)',
          content: [
            '• Available for retail and sample trial orders under 5,000,000 VND within Ho Chi Minh City and supported inter-provincial carrier zones.',
            '• Buyers inspect outer packaging integrity prior to cash handover to the delivery courier.'
          ]
        },
        {
          id: 'chinh-sach-cong-no',
          title: '4. B2B Corporate Credit Facilities',
          content: [
            '• Available for qualified F&B hotel and retail chains with signed master supply agreements.',
            '• Credit lines and settlement terms (15 days, 30 days) are authorized based on financial assessment and credit track records.'
          ]
        },
        {
          id: 'hoa-don-vat-quy-dinh',
          title: '5. Electronic VAT Invoice Issuance',
          content: [
            '• Clients must provide billing details (Corporate Name, Tax Code, Address, Billing Email) at order placement.',
            '• Official tax e-invoices are generated and transmitted automatically via email upon confirmed payment.'
          ]
        },
        {
          id: 'xu-ly-sai-sot-hoan-tien',
          title: '6. Transaction Rectification & Refund Handling',
          content: [
            '• In the event of duplicate transfers or valid agreed cancellations, 100% of the funds will be refunded within 1-2 business days.',
            '• For billing inquiries, contact Hotlines: (+84) 961 525 450 - (+84) 938 7979 04 or Email: contact@g-rooster.com.'
          ]
        }
      ]
    },

    // 5. SHIPPING & DELIVERY POLICY
    shipping: {
      key: 'shipping',
      shortLabel: 'Shipping & Delivery',
      title: 'SHIPPING & DELIVERY POLICY',
      subtitle: 'Delivery Timelines, Freight Tariffs, Joint Inspection Standards, and Cold-Chain Handling',
      lastUpdated: 'Last Updated: 2026 (Applies company-wide across G-ROOSTER)',
      sections: [
        {
          id: 'pham-vi-giao-nhan',
          title: '1. Shipping Scope & Transit Modes',
          content: [
            '• G-ROOSTER coordinates nationwide shipping across all 63 provinces and international export routes.',
            '• Transport channels: Dedicated company trucks, metropolitan express dispatchers, express courier partners (Viettel Post, GHTK), and reliable inter-provincial freight depots.'
          ]
        },
        {
          id: 'thoi-gian-giao-hang',
          title: '2. Committed Delivery Timelines',
          content: [
            '• Ho Chi Minh City Metro: 2-Hour Express Dispatch from District 1 Central Warehouse during office hours (08:00 - 17:00).',
            '• Southern Regional Provinces: Delivered within 24 hours from confirmed dispatch.',
            '• Central & Northern Vietnam: 24 - 48 hours via express air freight or 2 - 4 days via ground freight lines.',
            '• International Consignments: Scheduled per air/sea freight terms agreed in bilateral supply agreements.'
          ]
        },
        {
          id: 'cuoc-phi-van-chuyen',
          title: '3. Freight Tariffs & Free Shipping Policy',
          content: [
            '• Free Shipping: Granted for wholesale bulk orders exceeding minimum category volume thresholds in Ho Chi Minh City.',
            '• Regional / Standard Orders: Calculated based on partner carrier published tariffs. G-ROOSTER actively negotiates bulk shipping rates on behalf of clients.'
          ]
        },
        {
          id: 'dong-goi-chuoi-lanh',
          title: '4. Packaging & Cold-Chain Preservation',
          content: [
            '• Dry goods & matcha powders: Sealed in 3-5 layer corrugated cartons with branded tamper-evident tape.',
            '• Perishable cold items (IQF sugarcane juice, fresh matcha): Packed in specialized insulated foam crates with gel-ice maintaining cold integrity throughout transit.'
          ]
        },
        {
          id: 'quy-trinh-dong-kiem',
          title: '5. Joint Inspection Upon Delivery',
          content: [
            '• Customers possess the right and duty to inspect shipments in the presence of the courier before signing the receipt.',
            '• Inspection Scope: Carton seals, SKU count, expiry dates, and carton exterior integrity.',
            '• Damaged Shipments: Customers may reject defective portions, capture photo/video proof, and immediately notify Hotline (+84) 961 525 450 - (+84) 938 7979 04.'
          ]
        },
        {
          id: 'trach-nhiem-van-chuyen',
          title: '6. Carrier Liability & Damage Resolution',
          content: [
            '• Carriers are responsible for preserving parcel integrity during transit.',
            '• Any loss or damage occurring during transportation will be compensated 100% by G-ROOSTER and the logistics carrier.'
          ]
        }
      ]
    },

    // 6. RETURN & COMPLAINT SETTLEMENT POLICY
    returns: {
      key: 'returns',
      shortLabel: 'Returns & Complaints',
      title: 'RETURN & COMPLAINT SETTLEMENT POLICY',
      subtitle: '100% Quality Assurance, Consumer Protection Rights, and Structured Dispute Resolution Process',
      lastUpdated: 'Last Updated: 2026 (Applies company-wide across G-ROOSTER)',
      sections: [
        {
          id: 'dieu-kien-doi-tra',
          title: '1. Conditions for Product Returns & Replacement',
          content: [
            'G-ROOSTER commits to 100% replacement or refund at zero cost in the following cases:',
            '• Products arriving damaged, expired, spoiled, or with torn safety seals due to transit or manufacturing faults.',
            '• Goods delivered in incorrect SKU variations, specifications, or weight discrepancies against the approved order.',
            '• Products nearing expiration below the agreed minimum 70% remaining shelf life.',
            '• Failure to meet declared food safety test standards.'
          ]
        },
        {
          id: 'thoi-han-thong-bao',
          title: '2. Notification Timelines & Documentation',
          content: [
            '• Fresh / Frozen perishable agricultural items: Notify within 24 hours of package receipt.',
            '• Packaged dry goods / seasoning / matcha / snacks: Notify within 48 hours of package receipt.',
            '• All return requests must be accompanied by photos or unboxing video documentation verifying the condition.'
          ]
        },
        {
          id: 'hinh-thuc-xu-ly',
          title: '3. Replacement & Refund Procedures',
          content: [
            '• 100% Fresh Replacement: Dispatched within 24 hours (intra-city) or 48 hours (regional). All associated logistics expenses are absorbed by G-ROOSTER.',
            '• Full Refund: In the event replacement stock is unavailable or the client requests a refund, 100% of the invoice amount is returned via bank transfer within 1-2 business days.'
          ]
        },
        {
          id: 'quy-trinh-khieu-nai',
          title: '4. 4-Step Complaint Settlement Procedure',
          content: [
            '• Step 1 - Receipt: Partner submits feedback via Hotlines: (+84) 961 525 450 - (+84) 938 7979 04 or Email: contact@g-rooster.com with photos/video.',
            '• Step 2 - Verification: Customer support verifies details within 2 business hours.',
            '• Step 3 - Resolution Plan: Proposes final settlement (replacement, credit, or full refund) within 24 business hours.',
            '• Step 4 - Closure: Executes recovery and handover of replacement stock or returns funds per agreement.'
          ]
        },
        {
          id: 'co-che-tranh-chap',
          title: '5. Dispute Resolution & Partnership Trust',
          content: [
            '• G-ROOSTER prioritizes long-term partnership trust, open dialogue, and goodwill in resolving issues.',
            '• Any dispute failing amicable settlement will be referred to the competent People\'s Court in Ho Chi Minh City under Vietnam Law.'
          ]
        },
        {
          id: 'dau-moi-lien-he',
          title: '6. Official Complaint Contact Channels',
          content: [
            '• Entity: G-ROOSTER TRADING SERVICE CO., LTD',
            '• 24/7 Hotlines: (+84) 961 525 450 - (+84) 938 7979 04',
            '• Official Email: contact@g-rooster.com',
            '• Headquarters: 44 Tran Dinh Xu St., Cau Ong Lanh Ward, Dist. 1, Ho Chi Minh City, Vietnam'
          ]
        }
      ]
    }
  }
};
