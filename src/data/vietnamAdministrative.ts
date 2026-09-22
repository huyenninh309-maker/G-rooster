export interface AdministrativeUnit {
  name: string;
  districts: {
    name: string;
    wards: string[];
    popularStreets?: string[];
  }[];
}

// 63 Provinces & Cities of Vietnam with comprehensive Districts and Wards
export const VIETNAM_ADMINISTRATIVE_DATA: AdministrativeUnit[] = [
  {
    name: 'TP. Hồ Chí Minh',
    districts: [
      {
        name: 'Quận 1',
        wards: [
          'Phường Cầu Ông Lãnh',
          'Phường Bến Nghé',
          'Phường Bến Thành',
          'Phường Cô Giang',
          'Phường Cầu Kho',
          'Phường Đa Kao',
          'Phường Nguyễn Thái Bình',
          'Phường Nguyễn Cư Trinh',
          'Phường Phạm Ngũ Lão',
          'Phường Tân Định',
        ],
        popularStreets: [
          '44 Trần Đình Xu (Trụ sở Chút Chíu Store)',
          'Đường Trần Hưng Đạo',
          'Đường Nguyễn Huệ',
          'Đường Lê Lợi',
          'Đường Đồng Khởi',
          'Đường Pasteur',
          'Đường Hai Bà Trưng',
          'Đường Lý Tự Trọng',
          'Đường Lê Thánh Tôn',
          'Đường Nguyễn Thị Minh Khai',
          'Đường Hàm Nghi',
          'Đường Bùi Viện',
          'Đường Cống Quỳnh',
          'Đường Đinh Tiên Hoàng',
          'Tòa nhà Bitexco Financial Tower, 2 Hải Triều',
          'Tòa nhà Vincom Center, 72 Lê Thánh Tôn',
          'Tòa nhà Saigon Centre, 65 Lê Lợi',
        ],
      },
      {
        name: 'Quận 3',
        wards: [
          'Phường Võ Thị Sáu',
          'Phường 1',
          'Phường 2',
          'Phường 3',
          'Phường 4',
          'Phường 5',
          'Phường 9',
          'Phường 10',
          'Phường 11',
          'Phường 12',
          'Phường 13',
          'Phường 14',
        ],
        popularStreets: [
          'Đường Nam Kỳ Khởi Nghĩa',
          'Đường Cách Mạng Tháng Tám',
          'Đường Nguyễn Đình Chiểu',
          'Đường Võ Văn Tần',
          'Đường Điện Biên Phủ',
          'Đường Bà Huyện Thanh Quan',
          'Đường Trương Định',
          'Đường Lê Văn Sỹ',
        ],
      },
      {
        name: 'Quận 4',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 6', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 13', 'Phường 14', 'Phường 15', 'Phường 16', 'Phường 18'],
        popularStreets: ['Đường Hoàng Diệu', 'Đường Bến Vân Đồn', 'Đường Đoàn Văn Bơ', 'Đường Nguyễn Tất Thành', 'Đường Tôn Thất Thuyết'],
      },
      {
        name: 'Quận 5',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14'],
        popularStreets: ['Đường Trần Hưng Đạo', 'Đường An Dương Vương', 'Đường Nguyễn Trãi', 'Đường Hùng Vương', 'Đường Châu Văn Liêm', 'Đường Hải Thượng Lãn Ông'],
      },
      {
        name: 'Quận 7',
        wards: ['Phường Tân Phong', 'Phường Tân Phú', 'Phường Tân Quy', 'Phường Tân Kiểng', 'Phường Tân Hưng', 'Phường Bình Thuận', 'Phường Phú Mỹ', 'Phường Phú Thuận', 'Phường Tân Thuận Đông', 'Phường Tân Thuận Tây'],
        popularStreets: ['Khu đô thị Phú Mỹ Hưng, Nguyễn Văn Linh', 'Đường Nguyễn Thị Thập', 'Đường Huỳnh Tấn Phát', 'Đường Lâm Văn Bền', 'Tòa nhà Crescent Mall'],
      },
      {
        name: 'TP. Thủ Đức',
        wards: ['Phường Thảo Điền', 'Phường An Phú', 'Phường An Khánh', 'Phường Bình An', 'Phường Thủ Thiêm', 'Phường Hiệp Phú', 'Phường Linh Trung', 'Phường Linh Chiểu', 'Phường Phước Long B', 'Phường Tăng Nhơn Phú A'],
        popularStreets: ['Khu đô thị Sala, Mai Chí Thọ', 'Đường Xuân Thủy (Thảo Điền)', 'Đường Nguyễn Văn Hưởng', 'Xa Lộ Hà Nội', 'Đường Đỗ Xuân Hợp', 'Đường Võ Văn Ngân'],
      },
      {
        name: 'Quận Bình Thạnh',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14', 'Phường 15', 'Phường 17', 'Phường 19', 'Phường 21', 'Phường 22', 'Phường 24', 'Phường 25', 'Phường 26', 'Phường 27', 'Phường 28'],
        popularStreets: ['Khu đô thị Vinhomes Central Park, 208 Nguyễn Hữu Cảnh', 'Đường Điện Biên Phủ', 'Đường Bạch Đằng', 'Đường Phan Đăng Lưu', 'Đường Xô Viết Nghệ Tĩnh', 'Đường D2 (Nguyễn Gia Trí)'],
      },
      {
        name: 'Quận Phú Nhuận',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 13', 'Phường 15', 'Phường 17'],
        popularStreets: ['Đường Phan Xích Long', 'Đường Nguyễn Văn Trỗi', 'Đường Hoàng Văn Thụ', 'Đường Phan Đăng Lưu', 'Đường Lê Văn Sỹ'],
      },
      {
        name: 'Quận Tân Bình',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14', 'Phường 15'],
        popularStreets: ['Đường Trường Sơn (Sân bay Tân Sơn Nhất)', 'Đường Cộng Hòa', 'Đường Hoàng Văn Thụ', 'Đường Lý Thường Kiệt', 'Đường Trường Chinh'],
      },
      {
        name: 'Quận Tân Phú',
        wards: ['Phường Hiệp Tân', 'Phường Hòa Thạnh', 'Phường Phú Thạnh', 'Phường Phú Thọ Hòa', 'Phường Phú Trung', 'Phường Sơn Kỳ', 'Phường Tân Quý', 'Phường Tân Sơn Nhì', 'Phường Tân Thành', 'Phường Tân Thới Hòa', 'Phường Tây Thạnh'],
        popularStreets: ['Đường Lũy Bán Bích', 'Đường Tân Sơn Nhì', 'Đường Thoại Ngọc Hầu', 'Trung tâm Aeon Mall Tân Phú Celadon'],
      },
      {
        name: 'Quận Gò Vấp',
        wards: ['Phường 1', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14', 'Phường 15', 'Phường 16', 'Phường 17'],
        popularStreets: ['Đường Quang Trung', 'Đường Phan Văn Trị', 'Đường Nguyễn Oanh', 'Đường Lê Đức Thọ', 'Đường Phạm Văn Đồng'],
      },
      {
        name: 'Quận 10',
        wards: ['Phường 1', 'Phường 2', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14', 'Phường 15'],
        popularStreets: ['Đường 3 Tháng 2', 'Đường Sư Vạn Hạnh', 'Đường Tô Hiến Thành', 'Đường Thành Thái', 'Đường Lý Thường Kiệt'],
      },
      {
        name: 'Quận 11',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14', 'Phường 15', 'Phường 16'],
        popularStreets: ['Đường Lạc Long Quân', 'Đường Ông Ích Khiêm', 'Đường Bình Thới', 'Đường Hòa Bình'],
      },
      {
        name: 'Quận 6',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14'],
        popularStreets: ['Đường Hậu Giang', 'Đường Chu Văn An', 'Đường Kinh Dương Vương', 'Đường Bình Phú'],
      },
      {
        name: 'Quận 8',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14', 'Phường 15', 'Phường 16'],
        popularStreets: ['Đường Phạm Hùng', 'Đường Tạ Quang Bửu', 'Đường Dương Bá Trạc', 'Đường Phạm Thế Hiển'],
      },
      {
        name: 'Quận 12',
        wards: ['Phường Thạnh Xuân', 'Phường Thạnh Lộc', 'Phường Hiệp Thành', 'Phường Thới An', 'Phường Tân Chánh Hiệp', 'Phường An Phú Đông', 'Phường Tân Thới Hiệp', 'Phường Trung Mỹ Tây', 'Phường Tân Hưng Thuận', 'Phường Đông Hưng Thuận', 'Phường Tân Thới Nhất'],
        popularStreets: ['Đường Lê Văn Khương', 'Đường Tô Ký', 'Đường Hà Huy Giáp', 'Quốc Lộ 1A'],
      },
      {
        name: 'Quận Bình Tân',
        wards: ['Phường An Lạc', 'Phường An Lạc A', 'Phường Bình Hưng Hòa', 'Phường Bình Hưng Hòa A', 'Phường Bình Hưng Hòa B', 'Phường Bình Trị Đông', 'Phường Bình Trị Đông A', 'Phường Bình Trị Đông B', 'Phường Tân Tạo', 'Phường Tân Tạo A'],
        popularStreets: ['Đường Tên Lửa', 'Đường Kinh Dương Vương', 'Đường Mã Lò', 'Đường Số 7', 'Aeon Mall Bình Tân'],
      },
      {
        name: 'Huyện Bình Chánh',
        wards: ['Thị trấn Tân Túc', 'Xã An Phú Tây', 'Xã Bình Chánh', 'Xã Bình Hưng', 'Xã Đa Phước', 'Xã Hưng Long', 'Xã Phong Phú', 'Xã Vĩnh Lộc A', 'Xã Vĩnh Lộc B'],
        popularStreets: ['Đường Quốc Lộ 50', 'Đường Nguyễn Văn Linh', 'Đường Nguyễn Hữu Trí', 'Khu dân cư Trung Sơn'],
      },
      {
        name: 'Huyện Nhà Bè',
        wards: ['Thị trấn Nhà Bè', 'Xã Hiệp Phước', 'Xã Long Thới', 'Xã Nhơn Đức', 'Xã Phú Xuân', 'Xã Phước Kiển', 'Xã Phước Lộc'],
        popularStreets: ['Đường Lê Văn Lương', 'Đường Huỳnh Tấn Phát', 'Đường Nguyễn Hữu Thọ'],
      },
      {
        name: 'Huyện Hóc Môn',
        wards: ['Thị trấn Hóc Môn', 'Xã Bà Điểm', 'Xã Đông Thạnh', 'Xã Nhị Bình', 'Xã Tân Hiệp', 'Xã Tân Thới Nhì', 'Xã Tân Xuân', 'Xã Thới Tam Thôn', 'Xã Trung Chánh', 'Xã Xuân Thới Đông'],
        popularStreets: ['Đường Phan Văn Hớn', 'Đường Nguyễn Ánh Thủ', 'Đường Đặng Thúc Vịnh'],
      },
      {
        name: 'Huyện Củ Chi',
        wards: ['Thị trấn Củ Chi', 'Xã An Nhơn Tây', 'Xã An Phú', 'Xã Bình Mỹ', 'Xã Hòa Phú', 'Xã Nhuận Đức', 'Xã Phạm Văn Cội', 'Xã Phú Hòa Đông', 'Xã Tân An Hội', 'Xã Tân Thạnh Đông'],
        popularStreets: ['Đường Tỉnh Lộ 8', 'Đường Quốc Lộ 22', 'Đường Hương Lộ 2'],
      },
      {
        name: 'Huyện Cần Giờ',
        wards: ['Thị trấn Cần Thạnh', 'Xã An Thới Đông', 'Xã Bình Khánh', 'Xã Long Hòa', 'Xã Lý Nhơn', 'Xã Tam Thôn Hiệp', 'Xã Thạnh An'],
        popularStreets: ['Đường Rừng Sác', 'Đường Duyên Hải'],
      },
    ],
  },
  {
    name: 'Hà Nội',
    districts: [
      {
        name: 'Quận Hoàn Kiếm',
        wards: ['Phường Tràng Tiền', 'Phường Hàng Bạc', 'Phường Hàng Đào', 'Phường Hàng Bông', 'Phường Hàng Gai', 'Phường Cửa Nam', 'Phường Cửa Đông', 'Phường Lý Thái Tổ', 'Phường Phan Chu Trinh', 'Phường Trần Hưng Đạo'],
        popularStreets: ['Phố Tràng Tiền', 'Phố Đinh Tiên Hoàng', 'Phố Hàng Ngang', 'Phố Hàng Đào', 'Phố Nhà Thờ', 'Phố Bà Triệu', 'Phố Hai Bà Trưng', 'Phố Lý Thường Kiệt'],
      },
      {
        name: 'Quận Ba Đình',
        wards: ['Phường Điện Biên', 'Phường Đội Cấn', 'Phường Giảng Võ', 'Phường Kim Mã', 'Phường Liễu Giai', 'Phường Ngọc Hà', 'Phường Ngọc Khánh', 'Phường Quán Thánh', 'Phường Thành Công', 'Phường Trúc Bạch'],
        popularStreets: ['Đường Hoàng Hoa Thám', 'Đường Liễu Giai', 'Đường Kim Mã', 'Đường Giảng Võ', 'Đường Đội Cấn', 'Đường Nguyễn Chí Thanh', 'Tòa nhà Lotte Center Hà Nội, 54 Liễu Giai'],
      },
      {
        name: 'Quận Cầu Giấy',
        wards: ['Phường Dịch Vọng', 'Phường Dịch Vọng Hậu', 'Phường Mai Dịch', 'Phường Nghĩa Đô', 'Phường Nghĩa Tân', 'Phường Quan Hoa', 'Phường Trung Hòa', 'Phường Yên Hòa'],
        popularStreets: ['Đường Cầu Giấy', 'Đường Xuân Thủy', 'Đường Trần Duy Hưng', 'Đường Trung Kính', 'Đường Duy Tân', 'Đường Hoàng Quốc Việt', 'Khu đô thị Trung Hòa Nhân Chính'],
      },
      {
        name: 'Quận Đống Đa',
        wards: ['Phường Cát Linh', 'Phường Hàng Bột', 'Phường Khâm Thiên', 'Phường Láng Hạ', 'Phường Láng Thượng', 'Phường Nam Đồng', 'Phường Ô Chợ Dừa', 'Phường Phương Mai', 'Phường Quang Trung', 'Phường Quốc Tử Giám', 'Phường Thịnh Quang', 'Phường Trung Liệt', 'Phường Trung Phụng', 'Phường Trung Tự', 'Phường Văn Chương', 'Phường Văn Miếu'],
        popularStreets: ['Đường Xã Đàn', 'Đường Tây Sơn', 'Đường Tôn Đức Thắng', 'Đường Láng Hạ', 'Đường Chùa Bộc', 'Đường Thái Hà', 'Đường Nguyễn Lương Bằng'],
      },
      {
        name: 'Quận Hai Bà Trưng',
        wards: ['Phường Bách Khoa', 'Phường Bạch Đằng', 'Phường Bạch Mai', 'Phường Cầu Dền', 'Phường Đống Mác', 'Phường Đồng Nhân', 'Phường Đồng Tâm', 'Phường Lê Đại Hành', 'Phường Minh Khai', 'Phường Nguyễn Du', 'Phường Phạm Đình Hổ', 'Phường Phố Huế', 'Phường Quỳnh Lôi', 'Phường Quỳnh Mai', 'Phường Thanh Lương', 'Phường Thanh Nhàn', 'Phường Trương Định', 'Phường Vĩnh Tuy'],
        popularStreets: ['Khu đô thị Vinhomes Times City, 458 Minh Khai', 'Phố Bà Triệu', 'Phố Huế', 'Đường Đại Cồ Việt', 'Đường Trần Khát Chân', 'Đường Giải Phóng'],
      },
      {
        name: 'Quận Tây Hồ',
        wards: ['Phường Bưởi', 'Phường Nhật Tân', 'Phường Phú Thượng', 'Phường Quảng An', 'Phường Thụy Khuê', 'Phường Tứ Liên', 'Phường Xuân La', 'Phường Yên Phụ'],
        popularStreets: ['Đường Lạc Long Quân', 'Đường Xuân Diệu', 'Đường Tô Ngọc Vân', 'Đường Quảng An', 'Đường Thụy Khuê', 'Đường Hoàng Hoa Thám'],
      },
      {
        name: 'Quận Thanh Xuân',
        wards: ['Phường Hạ Đình', 'Phường Khương Đình', 'Phường Khương Mai', 'Phường Khương Trung', 'Phường Kim Giang', 'Phường Nhân Chính', 'Phường Phương Liệt', 'Phường Thanh Xuân Bắc', 'Phường Thanh Xuân Nam', 'Phường Thanh Xuân Trung', 'Phường Thượng Đình'],
        popularStreets: ['Khu đô thị Vinhomes Royal City, 72A Nguyễn Trãi', 'Đường Lê Văn Lương', 'Đường Nguyễn Trãi', 'Đường Khuất Duy Tiến', 'Đường Nguyễn Tuân'],
      },
      {
        name: 'Quận Nam Từ Liêm',
        wards: ['Phường Cầu Diễn', 'Phường Đại Mỗ', 'Phường Mễ Trì', 'Phường Mỹ Đình 1', 'Phường Mỹ Đình 2', 'Phường Phú Đô', 'Phường Tây Mỗ', 'Phường Trung Văn', 'Phường Xuân Phương'],
        popularStreets: ['Khu đô thị Vinhomes Smart City Tây Mỗ', 'Tòa nhà Keangnam Landmark 72, Phạm Hùng', 'Đường Lê Đức Thọ', 'Đường Mễ Trì', 'Đường Tố Hữu'],
      },
      {
        name: 'Quận Bắc Từ Liêm',
        wards: ['Phường Cổ Nhuế 1', 'Phường Cổ Nhuế 2', 'Phường Đông Ngạc', 'Phường Đức Thắng', 'Phường Minh Khai', 'Phường Phú Diễn', 'Phường Phúc Diễn', 'Phường Tây Tựu', 'Phường Thượng Cát', 'Phường Thụy Phương', 'Phường Xuân Đỉnh', 'Phường Xuân Tảo'],
        popularStreets: ['Khu Ngoại Giao Đoàn', 'Đường Phạm Văn Đồng', 'Đường Cổ Nhuế', 'Đường Hoàng Tăng Bí'],
      },
      {
        name: 'Quận Hà Đông',
        wards: ['Phường Biên Giang', 'Phường Đồng Mai', 'Phường Dương Nội', 'Phường Hà Cầu', 'Phường Kiến Hưng', 'Phường La Khê', 'Phường Mộ Lao', 'Phường Nguyễn Trãi', 'Phường Phú La', 'Phường Phú Lãm', 'Phường Phú Lương', 'Phường Phúc La', 'Phường Quang Trung', 'Phường Vạn Phúc', 'Phường Văn Quán', 'Phường Yên Nghĩa', 'Phường Yết Kiêu'],
        popularStreets: ['Khu đô thị Mỗ Lao', 'Khu đô thị Văn Quán', 'Đường Quang Trung', 'Đường Tố Hữu', 'Aeon Mall Hà Đông'],
      },
      {
        name: 'Quận Hoàng Mai',
        wards: ['Phường Đại Kim', 'Phường Định Công', 'Phường Giáp Bát', 'Phường Hoàng Liệt', 'Phường Hoàng Văn Thụ', 'Phường Lĩnh Nam', 'Phường Mai Động', 'Phường Tân Mai', 'Phường Thanh Trì', 'Phường Thịnh Liệt', 'Phường Trần Phú', 'Phường Tương Mai', 'Phường Vĩnh Hưng', 'Phường Yên Sở'],
        popularStreets: ['Bán đảo Linh Đàm', 'Đường Giải Phóng', 'Đường Tam Trinh', 'Đường Kim Giang'],
      },
      {
        name: 'Quận Long Biên',
        wards: ['Phường Bồ Đề', 'Phường Cự Khối', 'Phường Đức Giang', 'Phường Gia Thụy', 'Phường Giang Biên', 'Phường Long Biên', 'Phường Ngọc Lâm', 'Phường Ngọc Thụy', 'Phường Phúc Đồng', 'Phường Phúc Lợi', 'Phường Sài Đồng', 'Phường Thạch Bàn', 'Phường Thượng Thanh', 'Phường Việt Hưng'],
        popularStreets: ['Khu đô thị Vinhomes Riverside', 'Đường Nguyễn Văn Cừ', 'Đường Ngô Gia Tự', 'Aeon Mall Long Biên'],
      },
      {
        name: 'Huyện Gia Lâm',
        wards: ['Thị trấn Trâu Quỳ', 'Thị trấn Yên Viên', 'Xã Đa Tốn', 'Xã Kiêu Kỵ', 'Xã Bát Tràng', 'Xã Dương Xá', 'Xã Cổ Bi'],
        popularStreets: ['Đại đô thị Vinhomes Ocean Park 1', 'Đường Cổ Bi', 'Đường Hà Huy Tập'],
      },
      {
        name: 'Huyện Đông Anh',
        wards: ['Thị trấn Đông Anh', 'Xã Bắc Hồng', 'Xã Cổ Loa', 'Xã Hải Bối', 'Xã Kim Chung', 'Xã Tiên Dương', 'Xã Vĩnh Ngọc'],
        popularStreets: ['Đường Võ Nguyên Giáp', 'Đường Hoàng Sa', 'Đường Trường Sa'],
      },
    ],
  },
  {
    name: 'Đà Nẵng',
    districts: [
      {
        name: 'Quận Hải Châu',
        wards: ['Phường Hải Châu 1', 'Phường Hải Châu 2', 'Phường Thạch Thang', 'Phường Thanh Bình', 'Phường Thuận Phước', 'Phường Hòa Thuận Đông', 'Phường Hòa Thuận Tây', 'Phường Nam Dương', 'Phường Bình Hiên', 'Phường Bình Thuận', 'Phường Hòa Cường Bắc', 'Phường Hòa Cường Nam'],
        popularStreets: ['Đường Bạch Đằng', 'Đường Trần Phú', 'Đường Nguyễn Văn Linh', 'Đường Lê Duẩn', 'Đường Hùng Vương', 'Đường 2 Tháng 9'],
      },
      {
        name: 'Quận Sơn Trà',
        wards: ['Phường An Hải Bắc', 'Phường An Hải Đông', 'Phường An Hải Tây', 'Phường Mân Thái', 'Phường Nại Hiên Đông', 'Phường Phước Mỹ', 'Phường Thọ Quang'],
        popularStreets: ['Đường Võ Nguyên Giáp', 'Đường Phạm Văn Đồng', 'Đường Hoàng Sa', 'Đường Ngô Quyền'],
      },
      {
        name: 'Quận Ngũ Hành Sơn',
        wards: ['Phường Mỹ An', 'Phường Khuê Mỹ', 'Phường Hòa Quý', 'Phường Hòa Hải'],
        popularStreets: ['Đường Võ Nguyên Giáp', 'Đường Trường Sa', 'Đường Lê Văn Hiến', 'Phố Tây An Thượng'],
      },
      {
        name: 'Quận Thanh Khê',
        wards: ['Phường Vĩnh Trung', 'Phường Tân Chính', 'Phường Thạc Gián', 'Phường Chính Gián', 'Phường Tam Thuận', 'Phường Xuân Hà', 'Phường An Khê', 'Phường Hòa Khê', 'Phường Thanh Khê Đông', 'Phường Thanh Khê Tây'],
        popularStreets: ['Đường Điện Biên Phủ', 'Đường Nguyễn Tất Thành', 'Đường Hà Huy Tập', 'Đường Lê Duẩn'],
      },
      {
        name: 'Quận Cẩm Lệ',
        wards: ['Phường Khuê Trung', 'Phường Hòa Phát', 'Phường Hòa An', 'Phường Hòa Thọ Đông', 'Phường Hòa Thọ Tây', 'Phường Hòa Xuân'],
        popularStreets: ['Khu đô thị Hòa Xuân', 'Đường Cách Mạng Tháng 8', 'Đường Nguyễn Hữu Thọ'],
      },
      {
        name: 'Quận Liên Chiểu',
        wards: ['Phường Hòa Minh', 'Phường Hòa Khánh Bắc', 'Phường Hòa Khánh Nam', 'Phường Hòa Hiệp Bắc', 'Phường Hòa Hiệp Nam'],
        popularStreets: ['Đường Nguyễn Lương Bằng', 'Đường Tôn Đức Thắng', 'Đường Nguyễn Sinh Sắc'],
      },
    ],
  },
  {
    name: 'Bình Dương',
    districts: [
      {
        name: 'TP. Thủ Dầu Một',
        wards: ['Phường Phú Hòa', 'Phường Phú Cường', 'Phường Phú Lợi', 'Phường Hiệp Thành', 'Phường Định Hòa', 'Phường Chánh Nghĩa', 'Phường Phú Mỹ', 'Phường Tương Bình Hiệp'],
        popularStreets: ['Đại lộ Bình Dương', 'Đường Yersin', 'Đường Bạch Đằng', 'Khu dân cư Chánh Nghĩa'],
      },
      {
        name: 'TP. Thuận An',
        wards: ['Phường Lái Thiêu', 'Phường An Phú', 'Phường Thuận Giao', 'Phường Bình Hòa', 'Phường Vĩnh Phú'],
        popularStreets: ['Đại lộ Bình Dương', 'Đường DT743', 'Khu công nghiệp VSIP 1', 'Aeon Mall Canary Bình Dương'],
      },
      {
        name: 'TP. Dĩ An',
        wards: ['Phường Dĩ An', 'Phường An Bình', 'Phường Tân Đông Hiệp', 'Phường Đông Hòa', 'Phường Bình An'],
        popularStreets: ['Đường Nguyễn An Ninh', 'Đường Trần Hưng Đạo', 'Quốc Lộ 1K', 'Làng Đại học Quốc gia TP.HCM'],
      },
      {
        name: 'TP. Tân Uyên',
        wards: ['Phường Uyên Hưng', 'Phường Tân Phước Khánh', 'Phường Thái Hòa', 'Phường Khánh Bình'],
        popularStreets: ['Đường DT746', 'Đường DT747', 'KCN Nam Tân Uyên'],
      },
      {
        name: 'TP. Bến Cát',
        wards: ['Phường Mỹ Phước', 'Phường Thới Hòa', 'Phường Chánh Phú Hòa', 'Phường Tân Định'],
        popularStreets: ['Khu đô thị Mỹ Phước 1, 2, 3', 'Đường Quốc Lộ 13', 'Đại học Quốc tế Việt Đức'],
      },
    ],
  },
  {
    name: 'Đồng Nai',
    districts: [
      {
        name: 'TP. Biên Hòa',
        wards: ['Phường Trảng Dài', 'Phường Tân Phong', 'Phường Quyết Thắng', 'Phường Thống Nhất', 'Phường Trung Dũng', 'Phường Tam Hiệp', 'Phường Hố Nai', 'Phường Long Bình'],
        popularStreets: ['Đường Nguyễn Ái Quốc', 'Đường Phạm Văn Thuận', 'Đường Võ Thị Sáu', 'Đường Đồng Khởi'],
      },
      {
        name: 'Huyện Long Thành',
        wards: ['Thị trấn Long Thành', 'Xã An Phước', 'Xã Bình Sơn (Khu sân bay)', 'Xã Lộc An', 'Xã Tam An'],
        popularStreets: ['Quốc Lộ 51', 'Đường Tôn Đức Thắng', 'Khu tái định cư Lộc An - Bình Sơn'],
      },
      {
        name: 'Huyện Nhơn Trạch',
        wards: ['Thị trấn Hiệp Phước', 'Xã Phú Hội', 'Xã Phước Thiền', 'Xã Đại Phước', 'Xã Phú Thạnh'],
        popularStreets: ['Đường Lý Thái Tổ', 'Đường Tôn Đức Thắng', 'Khu đô thị SwanBay'],
      },
      {
        name: 'TP. Long Khánh',
        wards: ['Phường Xuân An', 'Phường Xuân Bình', 'Phường Xuân Hòa', 'Phường Phú Bình'],
        popularStreets: ['Đường Hùng Vương', 'Đường Cách Mạng Tháng 8', 'Đường Nguyễn Thị Minh Khai'],
      },
    ],
  },
  {
    name: 'Tây Ninh',
    districts: [
      {
        name: 'Thị xã Trảng Bàng',
        wards: ['Phường Trảng Bàng', 'Phường An Tịnh', 'Phường Gia Lộc', 'Phường Gia Bình', 'Phường An Hòa', 'Xã Đôn Thuận', 'Xã Hưng Thuận'],
        popularStreets: ['Khu Công Nghiệp Trảng Bàng (Nhà Máy Nước Mía Tuyết IQF)', 'Quốc Lộ 22', 'Đường Gia Long', 'Đường Quang Trung'],
      },
      {
        name: 'TP. Tây Ninh',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường Hiệp Ninh', 'Phường Ninh Thạnh', 'Phường Ninh Sơn'],
        popularStreets: ['Đường 30 Tháng 4', 'Đường Cách Mạng Tháng 8', 'Đường Bời Lời (Đường lên Núi Bà Đen)'],
      },
      {
        name: 'Thị xã Hòa Thành',
        wards: ['Phường Long Hoa', 'Phường Long Thành Bắc', 'Phường Long Thành Trung', 'Phường Long Thành Nam'],
        popularStreets: ['Khu vực Tòa Thánh Tây Ninh', 'Đường Hùng Vương', 'Đường Phạm Văn Đồng'],
      },
      {
        name: 'Huyện Gò Dầu',
        wards: ['Thị trấn Gò Dầu', 'Xã Phước Thạnh', 'Xã Thanh Phước', 'Xã Hiệp Thạnh'],
        popularStreets: ['Quốc Lộ 22B', 'Đường Lê Hồng Phong'],
      },
    ],
  },
  {
    name: 'Lâm Đồng',
    districts: [
      {
        name: 'TP. Đà Lạt',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 12', 'Xã Xuân Trường (Cầu Đất)', 'Xã Trạm Hành'],
        popularStreets: ['Thôn Cầu Đất (Vùng Cà Phê Specialty Cầu Đất)', 'Đường Trần Phú', 'Đường Hùng Vương', 'Đường Phan Đình Phùng', 'Đường Nguyễn Thị Minh Khai (Chợ Đà Lạt)', 'Đường Hoàng Diệu'],
      },
      {
        name: 'TP. Bảo Lộc',
        wards: ['Phường 1', 'Phường 2', 'Phường B’Lao', 'Phường Lộc Phát', 'Phường Lộc Sơn', 'Phường Lộc Tiến'],
        popularStreets: ['Đường Trần Phú (Quốc Lộ 20)', 'Đường Nguyễn Văn Cừ', 'Đường Lý Tự Trọng'],
      },
      {
        name: 'Huyện Đức Trọng',
        wards: ['Thị trấn Liên Nghĩa', 'Xã Hiệp Thạnh', 'Xã Liên Hiệp', 'Xã Phú Hội'],
        popularStreets: ['Quốc Lộ 20 (Khu vực Sân bay Liên Khương)', 'Đường Thống Nhất'],
      },
    ],
  },
  {
    name: 'Kon Tum',
    districts: [
      {
        name: 'Huyện Tu Mơ Rông',
        wards: ['Xã Măng Ri (Vùng Dược Liệu Sâm Ngọc Linh)', 'Xã Tê Xăng', 'Xã Đắk Na', 'Xã Ngọc Lây', 'Xã Đắk Hà', 'Xã Đắk Rơ Ông'],
        popularStreets: ['Thôn Đắk Viên (Vùng Sâm Ngọc Linh Tự Nhiên)', 'Tỉnh lộ 672 Tu Mơ Rông'],
      },
      {
        name: 'TP. Kon Tum',
        wards: ['Phường Quang Trung', 'Phường Quyết Thắng', 'Phường Thống Nhất', 'Phường Thắng Lợi', 'Phường Duy Tân'],
        popularStreets: ['Đường Phan Đình Phùng', 'Đường Trần Hưng Đạo', 'Đường Bà Triệu', 'Đường Nguyễn Huệ'],
      },
      {
        name: 'Huyện Kon Plông',
        wards: ['Thị trấn Măng Đen', 'Xã Đắk Long', 'Xã Măng Cành', 'Xã Hiếu'],
        popularStreets: ['Quốc Lộ 24 (Khu du lịch sinh thái Măng Đen)', 'Đường số 1 Măng Đen'],
      },
      {
        name: 'Huyện Đắk Hà',
        wards: ['Thị trấn Đắk Hà', 'Xã Đắk Mar', 'Xã Đắk Hring', 'Xã Hà Mòn'],
        popularStreets: ['Đường Hùng Vương (Quốc Lộ 14)'],
      },
    ],
  },
  {
    name: 'Cần Thơ',
    districts: [
      {
        name: 'Quận Ninh Kiều',
        wards: ['Phường Tân An', 'Phường An Cư', 'Phường An Nghiệp', 'Phường An Hòa', 'Phường Cái Khế', 'Phường Xuân Khánh', 'Phường Hưng Lợi'],
        popularStreets: ['Bến Ninh Kiều, Đường Hai Bà Trưng', 'Đường 30 Tháng 4', 'Đường Đại lộ Hòa Bình', 'Đường Mậu Thân'],
      },
      {
        name: 'Quận Cái Răng',
        wards: ['Phường Lê Bình', 'Phường Hưng Thạnh', 'Phường Hưng Phú', 'Phường Ba Láng'],
        popularStreets: ['Khu vực Chợ nổi Cái Răng', 'Đường Võ Nguyên Giáp', 'KDC Nam Long'],
      },
      {
        name: 'Quận Bình Thủy',
        wards: ['Phường Bình Thủy', 'Phường Trà An', 'Phường Trà Nóc', 'Phường An Thới'],
        popularStreets: ['Đường Lê Hồng Phong (Sân bay Cần Thơ)', 'Đường Cách Mạng Tháng 8'],
      },
    ],
  },
  {
    name: 'Hải Phòng',
    districts: [
      {
        name: 'Quận Hồng Bàng',
        wards: ['Phường Hoàng Văn Thụ', 'Phường Minh Khai', 'Phường Phan Bội Châu', 'Phường Quán Toan'],
        popularStreets: ['Đường Đinh Tiên Hoàng', 'Đường Quang Trung', 'Đường Trần Hưng Đạo'],
      },
      {
        name: 'Quận Ngô Quyền',
        wards: ['Phường Cầu Đất', 'Phường Lạc Viên', 'Phường Lương Khánh Thiện', 'Phường Máy Tơ', 'Phường Đông Khê'],
        popularStreets: ['Đường Lạch Tray', 'Đường Lê Hồng Phong', 'Đường Đà Nẵng'],
      },
      {
        name: 'Quận Lê Chân',
        wards: ['Phường An Biên', 'Phường Cát Dài', 'Phường Dư Hàng Kênh', 'Phường Vĩnh Niệm'],
        popularStreets: ['Đường Tô Hiệu', 'Đường Hồ Sen', 'Aeon Mall Lê Chân'],
      },
    ],
  },
  {
    name: 'Bà Rịa - Vũng Tàu',
    districts: [
      {
        name: 'TP. Vũng Tàu',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 7', 'Phường 8', 'Phường Thắng Tam', 'Phường Nguyễn An Ninh'],
        popularStreets: ['Đường Hạ Long (Bãi Trước)', 'Đường Thùy Vân (Bãi Sau)', 'Đường Trần Phú', 'Đường Lê Hồng Phong'],
      },
      {
        name: 'TP. Bà Rịa',
        wards: ['Phường Phước Trung', 'Phường Phước Hiệp', 'Phường Phước Hưng', 'Phường Long Toàn'],
        popularStreets: ['Đường Cách Mạng Tháng 8', 'Đường Nguyễn Tất Thành'],
      },
      {
        name: 'Thị xã Phú Mỹ',
        wards: ['Phường Phú Mỹ', 'Phường Tân Phước', 'Phường Phước Hòa'],
        popularStreets: ['Quốc Lộ 51 (Cảng Cái Mép - Thị Vải)', 'Đường Trần Hưng Đạo'],
      },
    ],
  },
  // Other 52 Vietnamese Provinces
  ...[
    { name: 'An Giang', centerDistrict: 'TP. Long Xuyên', wards: ['Phường Mỹ Bình', 'Phường Mỹ Long', 'Phường Mỹ Xuyên', 'Phường Bình Khánh'] },
    { name: 'Bắc Giang', centerDistrict: 'TP. Bắc Giang', wards: ['Phường Hoàng Văn Thụ', 'Phường Trần Phú', 'Phường Ngô Quyền', 'Phường Dĩnh Kế'] },
    { name: 'Bắc Kạn', centerDistrict: 'TP. Bắc Kạn', wards: ['Phường Đức Xuân', 'Phường Sông Cầu', 'Phường Phùng Chí Kiên'] },
    { name: 'Bạc Liêu', centerDistrict: 'TP. Bạc Liêu', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 7', 'Phường 8'] },
    { name: 'Bắc Ninh', centerDistrict: 'TP. Bắc Ninh', wards: ['Phường Suối Hoa', 'Phường Ninh Xá', 'Phường Tiền An', 'Phường Kinh Bắc'] },
    { name: 'Bến Tre', centerDistrict: 'TP. Bến Tre', wards: ['Phường An Hội', 'Phường Phú Khương', 'Phường Phú Tân'] },
    { name: 'Bình Định', centerDistrict: 'TP. Quy Nhơn', wards: ['Phường Lê Lợi', 'Phường Trần Phú', 'Phường Nguyễn Văn Cừ', 'Phường Ghềnh Ráng'] },
    { name: 'Bình Phước', centerDistrict: 'TP. Đồng Xoài', wards: ['Phường Tân Phú', 'Phường Tân Bình', 'Phường Tân Đồng'] },
    { name: 'Bình Thuận', centerDistrict: 'TP. Phan Thiết', wards: ['Phường Đức Thắng', 'Phường Phú Thủy', 'Phường Hàm Tiến (Mũi Né)'] },
    { name: 'Cà Mau', centerDistrict: 'TP. Cà Mau', wards: ['Phường 1', 'Phường 2', 'Phường 5', 'Phường 8', 'Phường 9'] },
    { name: 'Cao Bằng', centerDistrict: 'TP. Cao Bằng', wards: ['Phường Hợp Giang', 'Phường Sông Bằng', 'Phường Tân Giang'] },
    { name: 'Đắk Lắk', centerDistrict: 'TP. Buôn Ma Thuột', wards: ['Phường Thắng Lợi', 'Phường Tân Lợi', 'Phường Tân An', 'Phường Tự An'] },
    { name: 'Đắk Nông', centerDistrict: 'TP. Gia Nghĩa', wards: ['Phường Nghĩa Đức', 'Phường Nghĩa Thành', 'Phường Nghĩa Phú'] },
    { name: 'Điện Biên', centerDistrict: 'TP. Điện Biên Phủ', wards: ['Phường Mường Thanh', 'Phường Him Lam', 'Phường Tân Thanh'] },
    { name: 'Đồng Tháp', centerDistrict: 'TP. Cao Lãnh', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường Hòa Thuận'] },
    { name: 'Gia Lai', centerDistrict: 'TP. Pleiku', wards: ['Phường Tây Sơn', 'Phường Hoa Lư', 'Phường Diên Hồng', 'Phường Phù Đổng'] },
    { name: 'Hà Giang', centerDistrict: 'TP. Hà Giang', wards: ['Phường Trần Phú', 'Phường Minh Khai', 'Phường Nguyễn Trãi'] },
    { name: 'Hà Nam', centerDistrict: 'TP. Phủ Lý', wards: ['Phường Minh Khai', 'Phường Lương Khánh Thiện', 'Phường Trần Hưng Đạo'] },
    { name: 'Hà Tĩnh', centerDistrict: 'TP. Hà Tĩnh', wards: ['Phường Bắc Hà', 'Phường Nam Hà', 'Phường Trần Phú'] },
    { name: 'Hải Dương', centerDistrict: 'TP. Hải Dương', wards: ['Phường Trần Phú', 'Phường Lê Thanh Nghị', 'Phường Quang Trung'] },
    { name: 'Hậu Giang', centerDistrict: 'TP. Vị Thanh', wards: ['Phường 1', 'Phường 3', 'Phường 4', 'Phường 5'] },
    { name: 'Hòa Bình', centerDistrict: 'TP. Hòa Bình', wards: ['Phường Phương Lâm', 'Phường Đồng Tiến', 'Phường Tân Thịnh'] },
    { name: 'Hưng Yên', centerDistrict: 'TP. Hưng Yên', wards: ['Phường Lê Lợi', 'Phường Hiến Nam', 'Phường Lam Sơn'] },
    { name: 'Khánh Hòa', centerDistrict: 'TP. Nha Trang', wards: ['Phường Lộc Thọ', 'Phường Phước Hải', 'Phường Vĩnh Hải', 'Phường Tân Lập'] },
    { name: 'Kiên Giang', centerDistrict: 'TP. Rạch Giá', wards: ['Phường Vĩnh Thanh Vân', 'Phường Vĩnh Lạc', 'Phường Vĩnh Bảo', 'TP. Phú Quốc'] },
    { name: 'Lai Châu', centerDistrict: 'TP. Lai Châu', wards: ['Phường Quyết Thắng', 'Phường Tân Phong', 'Phường Đoàn Kết'] },
    { name: 'Lạng Sơn', centerDistrict: 'TP. Lạng Sơn', wards: ['Phường Hoàng Văn Thụ', 'Phường Tam Thanh', 'Phường Vĩnh Trại'] },
    { name: 'Lào Cai', centerDistrict: 'TP. Lào Cai', wards: ['Phường Kim Tân', 'Phường Bắc Cường', 'Phường Cốc Lếu', 'Thị xã Sa Pa'] },
    { name: 'Long An', centerDistrict: 'TP. Tân An', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Huyện Bến Lức'] },
    { name: 'Nam Định', centerDistrict: 'TP. Nam Định', wards: ['Phường Vị Xuyên', 'Phường Trần Hưng Đạo', 'Phường Cửa Bắc'] },
    { name: 'Nghệ An', centerDistrict: 'TP. Vinh', wards: ['Phường Quang Trung', 'Phường Trường Thi', 'Phường Lê Lợi', 'Phường Hưng Dũng'] },
    { name: 'Ninh Bình', centerDistrict: 'TP. Ninh Bình', wards: ['Phường Vân Giang', 'Phường Tân Thành', 'Phường Đông Thành'] },
    { name: 'Ninh Thuận', centerDistrict: 'TP. Phan Rang - Tháp Chàm', wards: ['Phường Kinh Dinh', 'Phường Thanh Sơn', 'Phường Phước Mỹ'] },
    { name: 'Phú Thọ', centerDistrict: 'TP. Việt Trì', wards: ['Phường Gia Cẩm', 'Phường Nông Trang', 'Phường Tiên Cát'] },
    { name: 'Phú Yên', centerDistrict: 'TP. Tuy Hòa', wards: ['Phường 1', 'Phường 2', 'Phường 5', 'Phường 7'] },
    { name: 'Quảng Bình', centerDistrict: 'TP. Đồng Hới', wards: ['Phường Đồng Mỹ', 'Phường Hải Đình', 'Phường Bắc Lý'] },
    { name: 'Quảng Nam', centerDistrict: 'TP. Tam Kỳ', wards: ['Phường An Mỹ', 'Phường Tân Thạnh', 'TP. Hội An', 'Phường Minh An'] },
    { name: 'Quảng Ngãi', centerDistrict: 'TP. Quảng Ngãi', wards: ['Phường Trần Phú', 'Phường Lê Hồng Phong', 'Phường Nghĩa Chánh'] },
    { name: 'Quảng Ninh', centerDistrict: 'TP. Hạ Long', wards: ['Phường Bạch Đằng', 'Phường Hồng Gai', 'Phường Bãi Cháy', 'TP. Cẩm Phả'] },
    { name: 'Quảng Trị', centerDistrict: 'TP. Đông Hà', wards: ['Phường 1', 'Phường 2', 'Phường 5', 'Thị xã Quảng Trị'] },
    { name: 'Sóc Trăng', centerDistrict: 'TP. Sóc Trăng', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 6'] },
    { name: 'Sơn La', centerDistrict: 'TP. Sơn La', wards: ['Phường Quyết Thắng', 'Phường Tô Hiệu', 'Phường Chiềng Lề'] },
    { name: 'Thái Bình', centerDistrict: 'TP. Thái Bình', wards: ['Phường Bồ Xuyên', 'Phường Kỳ Bá', 'Phường Đề Thám'] },
    { name: 'Thái Nguyên', centerDistrict: 'TP. Thái Nguyên', wards: ['Phường Phan Đình Phùng', 'Phường Hoàng Văn Thụ', 'Phường Quang Trung'] },
    { name: 'Thanh Hóa', centerDistrict: 'TP. Thanh Hóa', wards: ['Phường Điện Biên', 'Phường Ba Đình', 'Phường Lam Sơn', 'TP. Sầm Sơn'] },
    { name: 'Thừa Thiên Huế', centerDistrict: 'TP. Huế', wards: ['Phường Vĩnh Ninh', 'Phường Phú Hội', 'Phường Thuận Thành', 'Phường Vỹ Dạ'] },
    { name: 'Tiền Giang', centerDistrict: 'TP. Mỹ Tho', wards: ['Phường 1', 'Phường 4', 'Phường 5', 'Thị xã Gò Công'] },
    { name: 'Trà Vinh', centerDistrict: 'TP. Trà Vinh', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 7'] },
    { name: 'Tuyên Quang', centerDistrict: 'TP. Tuyên Quang', wards: ['Phường Tân Quang', 'Phường Phan Thiết', 'Phường Minh Xuân'] },
    { name: 'Vĩnh Long', centerDistrict: 'TP. Vĩnh Long', wards: ['Phường 1', 'Phường 2', 'Phường 4', 'Phường 9'] },
    { name: 'Vĩnh Phúc', centerDistrict: 'TP. Vĩnh Yên', wards: ['Phường Tích Sơn', 'Phường Liên Bảo', 'Phường Ngô Quyền'] },
    { name: 'Yên Bái', centerDistrict: 'TP. Yên Bái', wards: ['Phường Đồng Tâm', 'Phường Minh Tân', 'Phường Yên Ninh'] },
  ].map((item) => ({
    name: item.name,
    districts: [
      {
        name: item.centerDistrict,
        wards: item.wards,
        popularStreets: [
          `Đường Trung Tâm ${item.centerDistrict}`,
          `Đường Trần Hưng Đạo, ${item.centerDistrict}`,
          `Đường Lê Lợi, ${item.centerDistrict}`,
          `Đường Hùng Vương, ${item.centerDistrict}`,
        ],
      },
      {
        name: 'Khu vực Huyện / Thị xã khác',
        wards: ['Thị trấn trung tâm', 'Xã trung tâm', 'Khu vực lân cận'],
        popularStreets: [`Khu phố trung tâm, ${item.name}`, `Tuyến đường tỉnh, ${item.name}`],
      },
    ],
  })),
];

/**
 * Get all 63 province names
 */
export function getProvinces(): string[] {
  return VIETNAM_ADMINISTRATIVE_DATA.map((p) => p.name);
}

/**
 * Get districts for a given province
 */
export function getDistrictsByProvince(provinceName: string): string[] {
  const province = VIETNAM_ADMINISTRATIVE_DATA.find((p) => p.name === provinceName);
  if (!province) return [];
  return province.districts.map((d) => d.name);
}

/**
 * Get wards for a given province and district
 */
export function getWardsByDistrict(provinceName: string, districtName: string): string[] {
  const province = VIETNAM_ADMINISTRATIVE_DATA.find((p) => p.name === provinceName);
  if (!province) return [];
  const district = province.districts.find((d) => d.name === districtName);
  if (!district) return [];
  return district.wards;
}

/**
 * Generate smart address suggestions based on administrative context and user query
 */
export function getSmartAddressSuggestions(
  query: string,
  provinceName: string,
  districtName: string,
  wardName: string
): string[] {
  const province = VIETNAM_ADMINISTRATIVE_DATA.find((p) => p.name === provinceName);
  const district = province?.districts.find((d) => d.name === districtName);

  const baseStreets: string[] = [];

  if (district?.popularStreets) {
    baseStreets.push(...district.popularStreets);
  }

  // Default common street names if few are present
  const defaultPopular = [
    'Đường Nguyễn Huệ',
    'Đường Trần Hưng Đạo',
    'Đường Lê Lợi',
    'Đường Hai Bà Trưng',
    'Đường Lý Tự Trọng',
    'Đường Điện Biên Phủ',
    'Đường Cách Mạng Tháng 8',
    'Đường Phan Đình Phùng',
    'Đường Hoàng Hoa Thám',
  ];

  const candidatePool = Array.from(new Set([...baseStreets, ...defaultPopular]));

  const trimmedQuery = query.trim().toLowerCase();

  // If query is empty, return top 4 popular landmarks/streets in this district
  if (!trimmedQuery) {
    return candidatePool.slice(0, 4);
  }

  // If user typed numbers e.g. "44", suggest "44 + street"
  const numberMatch = trimmedQuery.match(/^(\d+[a-z]?(\/\d+)?)\s*(.*)/i);
  if (numberMatch && numberMatch[1]) {
    const houseNumber = numberMatch[1].toUpperCase();
    const rest = (numberMatch[3] || '').toLowerCase();

    const matched = candidatePool.filter((st) => {
      const clean = st.toLowerCase().replace(/^đường\s+|^phố\s+/i, '');
      return clean.includes(rest) || st.toLowerCase().includes(rest);
    });

    if (matched.length > 0) {
      return matched.slice(0, 4).map((st) => {
        // if st starts with a number like "44 Trần...", keep or adapt
        if (/^\d+/.test(st)) return st;
        return `Số ${houseNumber} ${st}`;
      });
    }

    return [
      `Số ${houseNumber} Đường chính (${wardName || districtName || provinceName})`,
      `Số ${houseNumber} Khu dân cư trung tâm`,
    ];
  }

  // Otherwise, fuzzy filter candidate pool
  const filtered = candidatePool.filter((st) => st.toLowerCase().includes(trimmedQuery));
  if (filtered.length > 0) {
    return filtered.slice(0, 5);
  }

  // If no direct street matches, offer clean street name
  return [
    query.trim(),
    `Số ${query.trim()}`,
  ].filter(Boolean);
}
