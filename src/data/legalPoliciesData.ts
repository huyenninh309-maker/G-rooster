import { Language } from '../types';

export type PolicyKey = 'privacy' | 'terms' | 'shipping' | 'returns';

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
    privacy: {
      key: 'privacy',
      shortLabel: 'Chính sách bảo mật',
      title: 'CHÍNH SÁCH BẢO MẬT THÔNG TIN',
      subtitle: 'Quy chuẩn bảo vệ thông tin khách hàng và dữ liệu giao dịch thương mại điện tử',
      lastUpdated: 'Cập nhật lần cuối: Tháng 10/2024 (Áp dụng toàn hệ thống G-ROOSTER)',
      sections: [
        {
          id: 'muc-dich-thu-thap',
          title: '1. Mục đích thu thập thông tin cá nhân',
          content: [
            'Hệ thống thương mại điện tử G-ROOSTER CO., LTD (MST: 0319153593) thu thập thông tin khách hàng nhằm phục vụ các mục đích chính đáng sau:',
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
            '• Dữ liệu thông tin cá nhân và đơn hàng được lưu trữ an toàn trên máy chủ của G-ROOSTER trong suốt thời gian duy trì hợp tác thương mại.',
            '• Đối với chứng từ kế toán và hóa đơn VAT, thời hạn lưu trữ tuân thủ theo Luật Quản lý Thuế và Luật Kế toán Việt Nam (tối thiểu 10 năm).',
            '• Khách hàng có quyền yêu cầu hủy bỏ hoặc khóa dữ liệu tài khoản bất kỳ lúc nào thông qua văn bản hoặc email chính thức.'
          ]
        },
        {
          id: 'doi-tuong-tiep-can',
          title: '4. Những đối tượng có thể tiếp cận thông tin',
          content: [
            'G-ROOSTER cam kết không bán, không cho thuê hoặc chuyển nhượng thông tin khách hàng cho bất kỳ bên thứ ba nào vì mục đích quảng cáo. Dữ liệu chỉ được tiếp cận bởi:',
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
            '• Email pháp lý & Dữ liệu: contact@g-rooster.com'
          ]
        },
        {
          id: 'quyen-khach-hang',
          title: '6. Quyền của khách hàng đối với dữ liệu cá nhân',
          content: [
            '• Khách hàng có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc yêu cầu xóa bỏ thông tin cá nhân của mình.',
            '• Để thực hiện quyền trên, quý khách vui lòng liên hệ trực tiếp hotline 0961 525 450 - 0938 7979 04 hoặc gửi thư điện tử đến contact@g-rooster.com. Bộ phận CSKH sẽ xác minh danh tính và xử lý trong vòng 24 giờ làm việc.'
          ]
        },
        {
          id: 'cam-ket-bao-mat',
          title: '7. Cam kết bảo mật và giải quyết khiếu nại',
          content: [
            '• Toàn bộ dữ liệu truyền tải trên website được mã hóa bằng giao thức bảo mật SSL 256-bit chuẩn quốc tế.',
            '• Trường hợp máy chủ lưu trữ bị tấn công mạng làm phát sinh nguy cơ rò rỉ dữ liệu, G-ROOSTER sẽ lập tức thông báo vụ việc cho cơ quan chức năng điều tra và thông báo cho khách hàng được biết trong vòng 24 giờ.'
          ]
        }
      ]
    },

    terms: {
      key: 'terms',
      shortLabel: 'Điều khoản giao dịch',
      title: 'ĐIỀU KHOẢN GIAO DỊCH CHUNG',
      subtitle: 'Quy định giao dịch, chính sách định giá sỉ và điều kiện cung ứng hàng hóa B2B/B2C',
      lastUpdated: 'Cập nhật lần cuối: Tháng 10/2024 (Áp dụng toàn hệ thống G-ROOSTER)',
      sections: [
        {
          id: 'tu-cach-phap-nhan',
          title: '1. Tư cách pháp nhân và phạm vi áp dụng',
          content: [
            '• Website thương mại điện tử do CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ G-ROOSTER (MST: 0319153593) sở hữu và trực tiếp vận hành.',
            '• Trụ sở chính & Tổng kho: 44 Trần Đình Xu, Phường Cầu Ông Lãnh, Quận 1, TP. Hồ Chí Minh.',
            '• Hotlines hỗ trợ: 0961 525 450 - 0938 7979 04 · Email: contact@g-rooster.com',
            '• Điều khoản này áp dụng cho toàn bộ hoạt động tra cứu báo giá, đặt hàng sỉ/lẻ, ký kết hợp đồng cung ứng và thanh toán giữa G-ROOSTER và quý khách hàng đối tác trên toàn quốc cũng như quốc tế.'
          ]
        },
        {
          id: 'chinh-sach-gia-si',
          title: '2. Chính sách định giá & 4 Biểu giá sỉ B2B',
          content: [
            'G-ROOSTER áp dụng cơ chế định giá minh bạch theo khối lượng và quy cách đóng gói:',
            '• Giá Bán Lẻ: Áp dụng cho đơn hàng số lượng nhỏ, dùng thử hoặc mẫu thử nghiệm.',
            '• Sỉ Bậc 1: Áp dụng khi đạt số lượng đóng gói tối thiểu theo thùng (Carton) tiêu chuẩn.',
            '• Sỉ Bậc 2: Mức chiết khấu chuyên sâu dành cho đại lý khu vực, quán cà phê, chuỗi F&B tiêu thụ định kỳ.',
            '• Sỉ Bậc 3 (Nhà Phân Phối): Giá ưu đãi độc quyền dành cho nhà phân phối tỉnh, đối tác ký hợp đồng bao tiêu sản lượng theo quý/năm.',
            '• Giá niêm yết đã bao gồm thuế GTGT (VAT) theo quy định hiện hành. Đối với các đơn hàng xuất khẩu, tỷ giá USD được cập nhật tự động và có giá trị tham chiếu tại thời điểm báo giá.'
          ]
        },
        {
          id: 'dieu-kien-cung-cap',
          title: '3. Điều kiện cung cấp và tiêu chuẩn chất lượng',
          content: [
            '• Nguồn gốc xuất xứ: 100% sản phẩm có nguồn gốc từ vùng nguyên liệu sạch Việt Nam, đáp ứng tiêu chuẩn kiểm dịch và an toàn thực phẩm.',
            '• Tiêu chuẩn chất lượng: Đạt các chứng chỉ ISO 22000, HACCP, VietGAP, Halal và VSATTP.',
            '• Quy cách đóng gói: Hàng hóa được đóng thùng nguyên niêm phong, có nhãn phụ tiếng Việt đầy đủ thông tin thành phần, NSX, HSD và mã vạch truy xuất nguồn gốc.',
            '• Tuổi thọ sản phẩm: Cam kết hạn sử dụng xuất kho còn tối thiểu 70% tổng thời gian bảo quản (trừ các thỏa thuận giải cứu đặc biệt được thông báo trước).'
          ]
        },
        {
          id: 'quy-trinh-dat-hang',
          title: '4. Quy trình đặt hàng và xác nhận hợp đồng',
          content: [
            '• Bước 1: Khách hàng chọn sản phẩm, số lượng và quy cách (Hộp/Kg/Thùng) trên hệ thống website hoặc qua Hotline/Zalo.',
            '• Bước 2: Hệ thống tự động áp dụng bậc giá sỉ tối ưu và tạo đơn đặt hàng sơ bộ.',
            '• Bước 3: Chuyên viên kinh doanh G-ROOSTER liên hệ xác nhận tồn kho, thời gian giao hàng và điều kiện vận chuyển.',
            '• Bước 4: Khách hàng thực hiện thanh toán/đặt cọc theo thông tin tài khoản doanh nghiệp chính thức.',
            '• Bước 5: Kho G-ROOSTER đóng gói, kiểm tra chất lượng và bàn giao đơn vị vận chuyển hỏa tốc.'
          ]
        },
        {
          id: 'hoa-don-tai-chinh',
          title: '5. Hóa đơn tài chính điện tử (VAT e-Invoice)',
          content: [
            '• G-ROOSTER phát hành hóa đơn điện tử hợp pháp theo đúng quy định của Tổng cục Thuế cho mọi đơn hàng doanh nghiệp.',
            '• Quý đối tác vui lòng cung cấp chính xác Tên Công Ty, Mã Số Thuế, Địa Chỉ và Email nhận hóa đơn khi tạo đơn hàng. Hóa đơn được gửi qua email trong vòng 24 - 48 giờ sau khi hoàn tất giao nhận.'
          ]
        },
        {
          id: 'trach-nhiem-cac-ben',
          title: '6. Quyền và trách nhiệm của các bên',
          content: [
            '• Trách nhiệm của G-ROOSTER: Cung cấp đúng chủng loại, quy cách, số lượng và chất lượng cam kết; xuất hóa đơn tài chính hợp lệ; giải quyết khiếu nại trong thời hạn quy định.',
            '• Trách nhiệm của Khách hàng: Cung cấp thông tin nhận hàng chính xác; thanh toán đầy đủ theo thỏa thuận; kiểm tra hàng hóa khi nhận (đồng kiểm).'
          ]
        }
      ]
    },

    shipping: {
      key: 'shipping',
      shortLabel: 'Thanh toán & Giao nhận',
      title: 'CHÍNH SÁCH THANH TOÁN & GIAO NHẬN',
      subtitle: 'Phương thức thanh toán doanh nghiệp minh bạch và quy trình giao nhận hỏa tốc toàn quốc & quốc tế',
      lastUpdated: 'Cập nhật lần cuối: Tháng 10/2024 (Áp dụng toàn hệ thống G-ROOSTER)',
      sections: [
        {
          id: 'phuong-thuc-thanh-toan',
          title: '1. Phương thức thanh toán chấp nhận',
          content: [
            'Để bảo vệ an toàn giao dịch tối đa cho khách hàng, G-ROOSTER áp dụng các phương thức thanh toán chuẩn hóa sau:',
            'a) Chuyển khoản qua Tài khoản Doanh nghiệp MB Bank (Khuyến nghị B2B):',
            '• Ngân hàng: Ngân hàng TMCP Quân Đội (MB Bank)',
            '• Số tài khoản: 7834588888',
            '• Tên chủ tài khoản: CONG TY TNHH THUONG MAI DICH VU G-ROOSTER',
            '• Cú pháp chuyển khoản: [Mã đơn hàng] - [Số điện thoại khách hàng]',
            'b) Thanh toán tiền mặt khi nhận hàng (COD):',
            '• Áp dụng cho đơn hàng mẫu, đơn lẻ nội thành TP.HCM hoặc theo sự phê duyệt của bộ phận kinh doanh.',
            'c) Chính sách bảo lãnh công nợ B2B:',
            '• Áp dụng cho các chuỗi đối tác F&B, khách sạn, siêu thị đã ký hợp đồng nguyên tắc cung ứng định kỳ và hoàn tất thẩm định hạn mức tín dụng.'
          ]
        },
        {
          id: 'pham-vi-thoi-gian-giao-hang',
          title: '2. Phạm vi và thời gian giao nhận hàng hóa',
          content: [
            '• Giao hỏa tốc nội thành TP. Hồ Chí Minh: Giao hàng trong vòng 2 giờ đối với các đơn hàng cần gấp trong giờ hành chính từ Tổng kho Quận 1.',
            '• Khu vực miền Nam & Đông Nam Bộ: Giao trong vòng 24 giờ qua mạng lưới xe tải liên tỉnh hoặc chuyển phát nhanh.',
            '• Miền Trung & Miền Bắc: Giao từ 24 - 48 giờ đối với đường bay hoặc 2 - 4 ngày đối với đường bộ.',
            '• Hàng đặc thù chuỗi lạnh (Matcha tươi, Nước mía tuyết IQF): Được vận chuyển bằng thùng xốp chuyên dụng kèm đá gel cách nhiệt hoặc xe đông lạnh âm sâu (-18°C) bảo đảm trọn vẹn hương vị.',
            '• Hỗ trợ giao hàng quốc tế theo các điều kiện Incoterms (FOB, CIF...) được thỏa thuận riêng trong từng hợp đồng cung ứng.'
          ]
        },
        {
          id: 'cuoc-phi-van-chuyen',
          title: '3. Quy định cước phí vận chuyển',
          content: [
            '• Miễn phí giao hàng (Freeship): Áp dụng cho các đơn hàng sỉ đạt giá trị tối thiểu theo quy định của từng ngành hàng tại TP.HCM.',
            '• Đơn hàng đi tỉnh / đơn dưới định mức: Cước phí được tính theo biểu giá thực tế của đơn vị vận chuyển đối tác (Viettel Post, GHTK, nhà xe chành). G-ROOSTER luôn hỗ trợ đàm phán cước tốt nhất cho đối tác.'
          ]
        },
        {
          id: 'quy-trinh-dong-kiem',
          title: '4. Quy trình đồng kiểm khi nhận hàng',
          content: [
            '• Khách hàng có quyền và nghĩa vụ kiểm tra hàng hóa cùng nhân viên giao nhận trước khi ký nhận biên bản bàn giao (Đồng kiểm).',
            '• Nội dung kiểm tra: Tình trạng niêm phong bao bì thùng carton, số lượng sản phẩm, hạn sử dụng và dấu hiệu cấn móp biến dạng trong quá trình vận chuyển.',
            '• Trường hợp phát hiện sai sót: Quý khách từ chối nhận phần hàng lỗi, chụp ảnh/quay video hiện trường và liên hệ ngay Hotline 0961 525 450 - 0938 7979 04 để được xử lý khẩn cấp.'
          ]
        }
      ]
    },

    returns: {
      key: 'returns',
      shortLabel: 'Đổi trả & Khiếu nại',
      title: 'CHÍNH SÁCH ĐỔI TRẢ & GIẢI QUYẾT KHIẾU NẠI',
      subtitle: 'Cam kết chất lượng 100%, bảo vệ quyền lợi tối đa cho người mua hàng B2B & B2C',
      lastUpdated: 'Cập nhật lần cuối: Tháng 10/2024 (Áp dụng toàn hệ thống G-ROOSTER)',
      sections: [
        {
          id: 'dieu-kien-doi-tra',
          title: '1. Điều kiện áp dụng đổi trả hàng hóa',
          content: [
            'G-ROOSTER cam kết hỗ trợ đổi trả 100% trong các trường hợp sau:',
            '• Hàng bị hư hỏng, ẩm mốc, biến chất, rách tem niêm phong do lỗi sản xuất hoặc quá trình vận chuyển.',
            '• Hàng giao sai quy cách, sai chủng loại sản phẩm, sai trọng lượng so với đơn đặt hàng đã xác nhận.',
            '• Hàng cận date dưới ngưỡng cam kết thỏa thuận ban đầu.',
            '• Hàng hóa có kết quả xét nghiệm không đạt các chỉ số an toàn thực phẩm như công bố.'
          ]
        },
        {
          id: 'thoi-han-thong-bao',
          title: '2. Thời hạn thông báo và thực hiện đổi trả',
          content: [
            '• Hàng nông sản tươi / đông lạnh bảo quản ngắn hạn: Quý khách vui lòng thông báo trong vòng 24 giờ kể từ thời điểm nhận hàng.',
            '• Hàng khô đóng gói / gia vị / đồ đóng hộp: Quý khách vui lòng thông báo trong vòng 48 giờ kể từ thời điểm nhận hàng.',
            '• Mọi yêu cầu đổi trả cần kèm theo hình ảnh, video mở kiện hàng chứng minh tình trạng hàng hóa thực tế.'
          ]
        },
        {
          id: 'hinh-thuc-xu-ly',
          title: '3. Phương thức đổi hàng hoặc hoàn tiền',
          content: [
            '• Đổi sản phẩm mới: G-ROOSTER tiến hành xuất kho và giao lại sản phẩm mới đạt chuẩn 100% trong vòng 24 giờ (nội thành) hoặc 48 giờ (đi tỉnh). Mọi chi phí vận chuyển phát sinh do G-ROOSTER chi trả.',
            '• Hoàn tiền: Trường hợp không còn sản phẩm tương đương để đổi hoặc đối tác không có nhu cầu nhận tiếp, G-ROOSTER sẽ hoàn lại 100% giá trị tiền hàng vào tài khoản ngân hàng của quý khách trong vòng 1-2 ngày làm việc.'
          ]
        },
        {
          id: 'quy-trinh-khieu-nai',
          title: '4. Quy trình tiếp nhận & giải quyết khiếu nại',
          content: [
            '• Kênh tiếp nhận: Hotline 0961 525 450 - 0938 7979 04 (24/7) hoặc gửi thư điện tử qua email: contact@g-rooster.com.',
            '• Thời gian xử lý: Sau khi tiếp nhận phản hồi, chuyên viên chăm sóc khách hàng sẽ liên hệ xác minh trong vòng 2 giờ làm việc và đưa ra giải pháp xử lý dứt điểm không quá 24 giờ.',
            '• Tinh thần giải quyết: Đặt quyền lợi và uy tín hợp tác lâu dài của đối tác lên hàng đầu. Mọi bất đồng chưa thể thỏa thuận sẽ được thương lượng hòa giải trên tinh thần tôn trọng lẫn nhau trước khi áp dụng phán quyết của Tòa án có thẩm quyền tại TP.HCM.'
          ]
        }
      ]
    }
  },

  EN: {
    privacy: {
      key: 'privacy',
      shortLabel: 'Privacy Policy',
      title: 'DATA PRIVACY & PROTECTION POLICY',
      subtitle: 'Standards for Customer Information Protection and E-Commerce Transaction Security',
      lastUpdated: 'Last Updated: October 2024 (Applies company-wide across G-ROOSTER)',
      sections: [
        {
          id: 'muc-dich-thu-thap',
          title: '1. Purpose of Personal Data Collection',
          content: [
            'G-ROOSTER CO., LTD (Tax ID: 0319153593) collects customer information strictly for legitimate commercial and fulfillment purposes:',
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
            '• Corporate / Business Partner Info: Legal Company Name, Tax ID, Registered Address, Billing Email.',
            '• Order Information: Product SKUs, quantity ordered, packaging requests, and specific storage instructions.'
          ]
        },
        {
          id: 'thoi-gian-luu-tru',
          title: '3. Data Retention Period',
          content: [
            '• Customer and order data are securely stored on G-ROOSTER cloud servers throughout the duration of the commercial relationship.',
            '• Accounting documents and electronic VAT invoices are retained in full compliance with the Vietnam Law on Tax Administration and Accounting Regulations (minimum 10 years).',
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
            '• Tax Registration Number: 0319153593 - Issued by Dept. of Planning and Investment of Ho Chi Minh City.',
            '• Headquarters & Hub: 44 Tran Dinh Xu St., Cau Ong Lanh Ward, Dist. 1, Ho Chi Minh City, Vietnam.',
            '• Direct Support Lines: (+84) 961 525 450 - (+84) 938 7979 04',
            '• Legal & Privacy Email: contact@g-rooster.com'
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
          title: '7. Security Commitment & Dispute Resolution',
          content: [
            '• All communications and transactions on this website are encrypted utilizing industry-standard 256-bit SSL protocols.',
            '• In the event of a security breach affecting customer data, G-ROOSTER will report the incident to cyber authorities and notify affected partners within 24 hours.'
          ]
        }
      ]
    },

    terms: {
      key: 'terms',
      shortLabel: 'Terms of Service',
      title: 'GENERAL TERMS OF SERVICE & WHOLESALE SUPPLY',
      subtitle: 'Trading Provisions, 4-Tier Pricing Model, and B2B/B2C Quality Commitments',
      lastUpdated: 'Last Updated: October 2024 (Applies company-wide across G-ROOSTER)',
      sections: [
        {
          id: 'tu-cach-phap-nhan',
          title: '1. Legal Status & Scope of Application',
          content: [
            '• This platform is wholly owned and operated by G-ROOSTER CO., LTD (Tax ID: 0319153593).',
            '• Headquarters & Central Hub: 44 Tran Dinh Xu St., Cau Ong Lanh Ward, Dist. 1, Ho Chi Minh City, Vietnam.',
            '• Direct Support Lines: (+84) 961 525 450 - (+84) 938 7979 04 · Email: contact@g-rooster.com',
            '• These terms govern all inquiries, quotations, retail/wholesale orders, contracts, and payments between G-ROOSTER and our partners nationwide and internationally.'
          ]
        },
        {
          id: 'chinh-sach-gia-si',
          title: '2. Pricing Policy & 4 B2B Wholesale Tiers',
          content: [
            'G-ROOSTER provides transparent, volume-based tiered wholesale pricing:',
            '• Retail Price: Designed for small-quantity sampling and trial batches.',
            '• Tier 1 Wholesale: Applied automatically upon reaching standard carton packaging thresholds.',
            '• Tier 2 Wholesale: Deep discount tier dedicated to regional distributors, cafes, and F&B chains with periodic volume.',
            '• Tier 3 (Master Distributor): Exclusive prime pricing for contracted master distributors and annual off-take commitments.',
            '• Listed prices include Value Added Tax (VAT) in accordance with current statutory regulations. For export consignments, USD exchange rates are updated automatically with indicative reference value at the time of quotation.'
          ]
        },
        {
          id: 'dieu-kien-cung-cap',
          title: '3. Supply Conditions & Food Safety Certification',
          content: [
            '• Traceable Origin: 100% sourced from verified Vietnamese clean-farming regions meeting strict export standards.',
            '• Quality Certifications: Compliant with ISO 22000, HACCP, VietGAP, Halal, and Vietnam Food Safety authorities.',
            '• Packaging Standards: Shipped in sealed cartons with full bilingual compliance labels including ingredients, manufacturing date, and expiry dates.',
            '• Shelf-Life Guarantee: Products shipped with at least 70% remaining shelf life unless special discount agreements are pre-established.'
          ]
        },
        {
          id: 'quy-trinh-dat-hang',
          title: '4. Ordering & Contract Confirmation Process',
          content: [
            '• Step 1: Partner selects SKUs, quantities, and packaging units (Box/Kg/Carton) via the website catalog or direct Zalo/Hotline.',
            '• Step 2: System calculates optimal wholesale tiered pricing and produces an instant draft quotation.',
            '• Step 3: G-ROOSTER sales specialist confirms stock availability, lead time, and logistics conditions.',
            '• Step 4: Client executes payment or deposit via official corporate bank account.',
            '• Step 5: G-ROOSTER warehouse inspects, seals, and hands over to express logistics.'
          ]
        },
        {
          id: 'hoa-don-tai-chinh',
          title: '5. Electronic VAT Invoices (e-Invoice)',
          content: [
            '• Official tax e-invoices are systematically issued for all corporate procurement under General Department of Taxation regulations.',
            '• Partners must provide accurate legal name, Tax ID, address, and billing email. Invoices are transmitted within 24-48 hours post-delivery.'
          ]
        },
        {
          id: 'trach-nhiem-cac-ben',
          title: '6. Rights and Obligations of Parties',
          content: [
            '• Seller Obligations: Deliver exact specifications, quantities, and certified quality; provide legitimate invoices; handle returns promptly.',
            '• Buyer Obligations: Provide accurate dispatch coordinates; fulfill payments per agreement; execute inspection upon delivery.'
          ]
        }
      ]
    },

    shipping: {
      key: 'shipping',
      shortLabel: 'Payment & Shipping',
      title: 'PAYMENT & SHIPPING POLICIES',
      subtitle: 'Transparent Corporate Settlement Methods and Nationwide & Global Express Delivery Standards',
      lastUpdated: 'Last Updated: October 2024 (Applies company-wide across G-ROOSTER)',
      sections: [
        {
          id: 'phuong-thuc-thanh-toan',
          title: '1. Accepted Payment Methods',
          content: [
            'To ensure maximum financial safety, G-ROOSTER facilitates the following standardized settlement channels:',
            'a) Direct Corporate Bank Transfer (MB Bank - Recommended for B2B):',
            '• Bank Name: Military Commercial Joint Stock Bank (MB Bank)',
            '• Account Number: 7834588888',
            '• Beneficiary: CONG TY TNHH THUONG MAI DICH VU G-ROOSTER',
            '• Transfer Memo: [Order ID] - [Customer Phone Number]',
            'b) Cash on Delivery (COD):',
            '• Applicable for sample orders and retail deliveries in metropolitan Ho Chi Minh City as agreed.',
            'c) B2B Credit Line & Terms:',
            '• Available for verified corporate F&B partners and hotel chains with established master supply agreements.'
          ]
        },
        {
          id: 'pham-vi-thoi-gian-giao-hang',
          title: '2. Delivery Scope & Transit Timelines',
          content: [
            '• Ho Chi Minh City Express (2-Hour Dispatch): Delivered within 2 hours for urgent intra-city orders from District 1 Central Warehouse.',
            '• Southern Regional Delivery: Delivered within 24 hours via regional trucks or courier services.',
            '• Central & Northern Vietnam: 24-48 hours via air freight or 2-4 days via ground freight lines.',
            '• Cold Chain Logistics (Fresh Matcha, IQF Sugarcane Juice): Handled with insulated foam crates, ice-gel packs, or refrigerated -18°C trucks.',
            '• International delivery is fully supported under Incoterms conditions (FOB, CIF...) customized and specified in each bilateral supply contract.'
          ]
        },
        {
          id: 'cuoc-phi-van-chuyen',
          title: '3. Freight Charges & Subsidies',
          content: [
            '• Free Shipping: Granted for wholesale bulk orders exceeding minimum category volume thresholds in Ho Chi Minh City.',
            '• Inter-Provincial / Standard Orders: Calculated based on partner carrier published tariffs (Viettel Post, GHTK, freight depots). G-ROOSTER actively negotiates bulk shipping rates on behalf of clients.'
          ]
        },
        {
          id: 'quy-trinh-dong-kiem',
          title: '4. Joint Inspection Upon Delivery',
          content: [
            '• Customers possess the right and duty to inspect shipments in the presence of the courier before signing the receipt.',
            '• Inspection Scope: Carton seals, SKU count, expiry dates, and carton exterior integrity.',
            '• Damaged Shipments: Customers may reject defective portions, capture photo/video proof, and immediately notify Hotline (+84) 961 525 450 - (+84) 938 7979 04.'
          ]
        }
      ]
    },

    returns: {
      key: 'returns',
      shortLabel: 'Returns & Disputes',
      title: 'RETURNS & DISPUTE RESOLUTION POLICY',
      subtitle: '100% Quality Assurance & Comprehensive Protection for B2B and B2C Buyers',
      lastUpdated: 'Last Updated: October 2024 (Applies company-wide across G-ROOSTER)',
      sections: [
        {
          id: 'dieu-kien-doi-tra',
          title: '1. Conditions for Product Returns & Replacement',
          content: [
            'G-ROOSTER commits to 100% compensation or replacement under the following conditions:',
            '• Products arriving damaged, expired, spoiled, or with torn safety seals due to transit or manufacturing faults.',
            '• Goods delivered in incorrect SKU variations, specifications, or weight discrepancies against the approved order.',
            '• Products nearing expiration below pre-agreed shelf-life thresholds.',
            '• Failure to meet declared food safety test standards.'
          ]
        },
        {
          id: 'thoi-han-thong-bao',
          title: '2. Notification Period & Documentation',
          content: [
            '• Fresh / Frozen perishable agricultural items: Notify within 24 hours of package receipt.',
            '• Packaged dry goods / seasoning / canned goods: Notify within 48 hours of package receipt.',
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
          title: '4. Complaint Handling & Dispute Resolution',
          content: [
            '• Reception Channels: Dedicated Hotlines (+84) 961 525 450 - (+84) 938 7979 04 (24/7) or Email contact@g-rooster.com.',
            '• Resolution Response: Within 2 hours of receipt, a customer representative will verify the claim and provide final resolution within 24 business hours.',
            '• Core Philosophy: Prioritizing long-term partnership trust and mutual respect. Any unresolved dispute will be negotiated amicably before submission to the competent People\'s Court in Ho Chi Minh City.'
          ]
        }
      ]
    }
  }
};
