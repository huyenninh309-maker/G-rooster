import { Product } from "../types";

/**
 * 112 SẢN PHẨM MỚI V255 (G-ROOSTER)
 * Nhóm 7: Hạt & Quả Khô Dinh Dưỡng Tuyển Chọn (Gom 112 sản phẩm)
 * Ngưỡng mua sỉ tự động theo THÙNG: Sỉ 1 (2 thùng), Sỉ 2 (6 thùng), Sỉ 3 (20 thùng)
 * Đã dọn dẹp loại bỏ 3 sản phẩm (STT 87, 113, 114) theo yêu cầu V255
 */
export const PRODUCTS_PREMIUM_NUTS: Product[] = [
  {
    "id": "gr-m001",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nho khô Chile",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Vuông 230g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Chile",
    "packaging": "Hũ Thủy Tinh Vuông 230g (Thùng 30 hũ)",
    "prices": {
      "retail": 86000,
      "wholesale1": 72000,
      "wholesale2": 65000,
      "wholesale3": 60000
    },
    "wholesalePrices": {
      "wholesale1": 2160000,
      "wholesale2": 1950000,
      "wholesale3": 1800000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Vuông 230g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Chile",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nho khô Chile (Hũ Thủy Tinh Vuông 230g) tuyển chọn cao cấp. Nguồn gốc Chile minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nho khô Chile nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m002",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt Bí xanh",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Vuông 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mông Cổ",
    "packaging": "Hũ Thủy Tinh Vuông 200g (Thùng 30 hũ)",
    "prices": {
      "retail": 78000,
      "wholesale1": 65000,
      "wholesale2": 59000,
      "wholesale3": 54000
    },
    "wholesalePrices": {
      "wholesale1": 1950000,
      "wholesale2": 1770000,
      "wholesale3": 1620000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Vuông 200g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mông Cổ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt Bí xanh (Hũ Thủy Tinh Vuông 200g) tuyển chọn cao cấp. Nguồn gốc Mông Cổ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Bí xanh nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m003",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạnh nhân rang bơ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Vuông 160g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Thủy Tinh Vuông 160g (Thùng 30 hũ)",
    "prices": {
      "retail": 116000,
      "wholesale1": 97000,
      "wholesale2": 88000,
      "wholesale3": 80000
    },
    "wholesalePrices": {
      "wholesale1": 2910000,
      "wholesale2": 2640000,
      "wholesale3": 2400000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Vuông 160g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạnh nhân rang bơ (Hũ Thủy Tinh Vuông 160g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh nhân rang bơ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m004",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nhân óc chó vàng",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Vuông 130g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Thủy Tinh Vuông 130g (Thùng 30 hũ)",
    "prices": {
      "retail": 91000,
      "wholesale1": 76000,
      "wholesale2": 69000,
      "wholesale3": 63000
    },
    "wholesalePrices": {
      "wholesale1": 2280000,
      "wholesale2": 2070000,
      "wholesale3": 1890000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Vuông 130g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nhân óc chó vàng (Hũ Thủy Tinh Vuông 130g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nhân óc chó vàng nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m005",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt điều rang muối",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Vuông 170g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Thủy Tinh Vuông 170g (Thùng 30 hũ)",
    "prices": {
      "retail": 124000,
      "wholesale1": 103000,
      "wholesale2": 94000,
      "wholesale3": 86000
    },
    "wholesalePrices": {
      "wholesale1": 3090000,
      "wholesale2": 2820000,
      "wholesale3": 2580000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Vuông 170g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt điều rang muối (Hũ Thủy Tinh Vuông 170g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% điều rang muối nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m006",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Macca nức vỏ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Vuông 180g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Hũ Thủy Tinh Vuông 180g (Thùng 30 hũ)",
    "prices": {
      "retail": 99000,
      "wholesale1": 83000,
      "wholesale2": 75000,
      "wholesale3": 69000
    },
    "wholesalePrices": {
      "wholesale1": 2490000,
      "wholesale2": 2250000,
      "wholesale3": 2070000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Vuông 180g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Macca nức vỏ (Hũ Thủy Tinh Vuông 180g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Macca nức vỏ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m007",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Mix Hạt",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Vuông 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "G-ROOSTER",
    "packaging": "Hũ Thủy Tinh Vuông 200g (Thùng 30 hũ)",
    "prices": {
      "retail": 122000,
      "wholesale1": 102000,
      "wholesale2": 92000,
      "wholesale3": 85000
    },
    "wholesalePrices": {
      "wholesale1": 3060000,
      "wholesale2": 2760000,
      "wholesale3": 2550000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Vuông 200g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "G-ROOSTER",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Mix Hạt (Hũ Thủy Tinh Vuông 200g) tuyển chọn cao cấp. Nguồn gốc G-ROOSTER minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Mix Hạt nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m008",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nhân óc chó đỏ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Vuông 150g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Thủy Tinh Vuông 150g (Thùng 30 hũ)",
    "prices": {
      "retail": 119000,
      "wholesale1": 99000,
      "wholesale2": 90000,
      "wholesale3": 83000
    },
    "wholesalePrices": {
      "wholesale1": 2970000,
      "wholesale2": 2700000,
      "wholesale3": 2490000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Vuông 150g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nhân óc chó đỏ (Hũ Thủy Tinh Vuông 150g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nhân óc chó đỏ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m009",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt Hạnh nhân",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Vuông 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Thủy Tinh Vuông 200g (Thùng 30 hũ)",
    "prices": {
      "retail": 148000,
      "wholesale1": 124000,
      "wholesale2": 112000,
      "wholesale3": 103000
    },
    "wholesalePrices": {
      "wholesale1": 3720000,
      "wholesale2": 3360000,
      "wholesale3": 3090000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Vuông 200g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt Hạnh nhân (Hũ Thủy Tinh Vuông 200g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh nhân nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m010",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt dẻ cười",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Vuông 180g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Thủy Tinh Vuông 180g (Thùng 30 hũ)",
    "prices": {
      "retail": 223000,
      "wholesale1": 186000,
      "wholesale2": 169000,
      "wholesale3": 155000
    },
    "wholesalePrices": {
      "wholesale1": 5580000,
      "wholesale2": 5070000,
      "wholesale3": 4650000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Vuông 180g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt dẻ cười (Hũ Thủy Tinh Vuông 180g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% dẻ cười nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m011",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt macca - Hũ 200g",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Nắp Đen 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Hũ Nhựa Nắp Đen 200g (Thùng 30 hũ)",
    "prices": {
      "retail": 102000,
      "wholesale1": 86000,
      "wholesale2": 78000,
      "wholesale3": 71000
    },
    "wholesalePrices": {
      "wholesale1": 2580000,
      "wholesale2": 2340000,
      "wholesale3": 2130000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Nắp Đen 200g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt macca - Hũ 200g (Hũ Nhựa Nắp Đen 200g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% macca nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m012",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạnh nhân rang bơ - Hũ 170g",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Nắp Đen 170g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Nắp Đen 170g (Thùng 30 hũ)",
    "prices": {
      "retail": 116000,
      "wholesale1": 97000,
      "wholesale2": 88000,
      "wholesale3": 80000
    },
    "wholesalePrices": {
      "wholesale1": 2910000,
      "wholesale2": 2640000,
      "wholesale3": 2400000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Nắp Đen 170g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạnh nhân rang bơ - Hũ 170g (Hũ Nhựa Nắp Đen 170g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh nhân rang bơ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m013",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt điều rang muối - Hũ 200g",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Nắp Đen 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Nhựa Nắp Đen 200g (Thùng 30 hũ)",
    "prices": {
      "retail": 139000,
      "wholesale1": 116000,
      "wholesale2": 105000,
      "wholesale3": 97000
    },
    "wholesalePrices": {
      "wholesale1": 3480000,
      "wholesale2": 3150000,
      "wholesale3": 2910000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Nắp Đen 200g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt điều rang muối - Hũ 200g (Hũ Nhựa Nắp Đen 200g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% điều rang muối nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m014",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt dẻ cười - Hũ 200g",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Nắp Đen 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Nắp Đen 200g (Thùng 30 hũ)",
    "prices": {
      "retail": 254000,
      "wholesale1": 213000,
      "wholesale2": 192000,
      "wholesale3": 177000
    },
    "wholesalePrices": {
      "wholesale1": 6390000,
      "wholesale2": 5760000,
      "wholesale3": 5310000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Nắp Đen 200g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt dẻ cười - Hũ 200g (Hũ Nhựa Nắp Đen 200g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% dẻ cười nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m015",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nho khô - Hũ 210g",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Nắp Đen 210g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Ấn Độ",
    "packaging": "Hũ Nhựa Nắp Đen 210g (Thùng 30 hũ)",
    "prices": {
      "retail": 74000,
      "wholesale1": 62000,
      "wholesale2": 56000,
      "wholesale3": 52000
    },
    "wholesalePrices": {
      "wholesale1": 1860000,
      "wholesale2": 1680000,
      "wholesale3": 1560000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Nắp Đen 210g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Ấn Độ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nho khô - Hũ 210g (Hũ Nhựa Nắp Đen 210g) tuyển chọn cao cấp. Nguồn gốc Ấn Độ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nho khô nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m016",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nhân óc chó vàng - Hũ 150g",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Nắp Đen 150g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Nắp Đen 150g (Thùng 30 hũ)",
    "prices": {
      "retail": 97000,
      "wholesale1": 81000,
      "wholesale2": 74000,
      "wholesale3": 68000
    },
    "wholesalePrices": {
      "wholesale1": 2430000,
      "wholesale2": 2220000,
      "wholesale3": 2040000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Nắp Đen 150g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nhân óc chó vàng - Hũ 150g (Hũ Nhựa Nắp Đen 150g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nhân óc chó vàng nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m017",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạnh nhân lõi - Hũ 200g",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Nắp Đen 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Nắp Đen 200g (Thùng 30 hũ)",
    "prices": {
      "retail": 145000,
      "wholesale1": 121000,
      "wholesale2": 110000,
      "wholesale3": 101000
    },
    "wholesalePrices": {
      "wholesale1": 3630000,
      "wholesale2": 3300000,
      "wholesale3": 3030000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Nắp Đen 200g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạnh nhân lõi - Hũ 200g (Hũ Nhựa Nắp Đen 200g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh nhân lõi nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m018",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Mix hạt - Hũ 200g",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Nắp Đen 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "G-ROOSTER",
    "packaging": "Hũ Nhựa Nắp Đen 200g (Thùng 30 hũ)",
    "prices": {
      "retail": 117000,
      "wholesale1": 98000,
      "wholesale2": 89000,
      "wholesale3": 82000
    },
    "wholesalePrices": {
      "wholesale1": 2940000,
      "wholesale2": 2670000,
      "wholesale3": 2460000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Nắp Đen 200g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "G-ROOSTER",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Mix hạt - Hũ 200g (Hũ Nhựa Nắp Đen 200g) tuyển chọn cao cấp. Nguồn gốc G-ROOSTER minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Mix hạt nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m019",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nhân óc chó đỏ - Hũ 150g",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Nắp Đen 150g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Nắp Đen 150g (Thùng 30 hũ)",
    "prices": {
      "retail": 116000,
      "wholesale1": 97000,
      "wholesale2": 88000,
      "wholesale3": 80000
    },
    "wholesalePrices": {
      "wholesale1": 2910000,
      "wholesale2": 2640000,
      "wholesale3": 2400000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Nắp Đen 150g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nhân óc chó đỏ - Hũ 150g (Hũ Nhựa Nắp Đen 150g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nhân óc chó đỏ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m020",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt bí xanh - Hũ 250g",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Nắp Đen 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mông Cổ",
    "packaging": "Hũ Nhựa Nắp Đen 250g (Thùng 30 hũ)",
    "prices": {
      "retail": 89000,
      "wholesale1": 75000,
      "wholesale2": 68000,
      "wholesale3": 62000
    },
    "wholesalePrices": {
      "wholesale1": 2250000,
      "wholesale2": 2040000,
      "wholesale3": 1860000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Nắp Đen 250g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mông Cổ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt bí xanh - Hũ 250g (Hũ Nhựa Nắp Đen 250g) tuyển chọn cao cấp. Nguồn gốc Mông Cổ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% bí xanh nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m021",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nho khô",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Lục Giác 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hũ",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Chile",
    "packaging": "Hũ Thủy Tinh Lục Giác 250g (Thùng 24 hũ)",
    "prices": {
      "retail": 91000,
      "wholesale1": 76000,
      "wholesale2": 69000,
      "wholesale3": 63000
    },
    "wholesalePrices": {
      "wholesale1": 1824000,
      "wholesale2": 1656000,
      "wholesale3": 1512000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Lục Giác 250g",
      "Đóng thùng": "24 hũ/thùng",
      "Xuất xứ": "Chile",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nho khô (Hũ Thủy Tinh Lục Giác 250g) tuyển chọn cao cấp. Nguồn gốc Chile minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nho khô nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m022",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạnh nhân rang bơ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Lục Giác 180g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hũ",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Thủy Tinh Lục Giác 180g (Thùng 24 hũ)",
    "prices": {
      "retail": 125000,
      "wholesale1": 105000,
      "wholesale2": 95000,
      "wholesale3": 87000
    },
    "wholesalePrices": {
      "wholesale1": 2520000,
      "wholesale2": 2280000,
      "wholesale3": 2088000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Lục Giác 180g",
      "Đóng thùng": "24 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạnh nhân rang bơ (Hũ Thủy Tinh Lục Giác 180g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh nhân rang bơ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m023",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nhân óc chó vàng",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Lục Giác 170g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hũ",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Thủy Tinh Lục Giác 170g (Thùng 24 hũ)",
    "prices": {
      "retail": 112000,
      "wholesale1": 94000,
      "wholesale2": 85000,
      "wholesale3": 78000
    },
    "wholesalePrices": {
      "wholesale1": 2256000,
      "wholesale2": 2040000,
      "wholesale3": 1872000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Lục Giác 170g",
      "Đóng thùng": "24 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nhân óc chó vàng (Hũ Thủy Tinh Lục Giác 170g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nhân óc chó vàng nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m024",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt điều rang muối",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Lục Giác 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hũ",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Thủy Tinh Lục Giác 200g (Thùng 24 hũ)",
    "prices": {
      "retail": 145000,
      "wholesale1": 121000,
      "wholesale2": 110000,
      "wholesale3": 101000
    },
    "wholesalePrices": {
      "wholesale1": 2904000,
      "wholesale2": 2640000,
      "wholesale3": 2424000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Lục Giác 200g",
      "Đóng thùng": "24 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt điều rang muối (Hũ Thủy Tinh Lục Giác 200g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% điều rang muối nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m025",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Macca nức vỏ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Lục Giác 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hũ",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Hũ Thủy Tinh Lục Giác 200g (Thùng 24 hũ)",
    "prices": {
      "retail": 107000,
      "wholesale1": 90000,
      "wholesale2": 81000,
      "wholesale3": 75000
    },
    "wholesalePrices": {
      "wholesale1": 2160000,
      "wholesale2": 1944000,
      "wholesale3": 1800000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Lục Giác 200g",
      "Đóng thùng": "24 hũ/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Macca nức vỏ (Hũ Thủy Tinh Lục Giác 200g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Macca nức vỏ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m026",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Mix Hạt",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Lục Giác 210g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hũ",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Thủy Tinh Lục Giác 210g (Thùng 24 hũ)",
    "prices": {
      "retail": 129000,
      "wholesale1": 108000,
      "wholesale2": 98000,
      "wholesale3": 90000
    },
    "wholesalePrices": {
      "wholesale1": 2592000,
      "wholesale2": 2352000,
      "wholesale3": 2160000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Lục Giác 210g",
      "Đóng thùng": "24 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Mix Hạt (Hũ Thủy Tinh Lục Giác 210g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Mix Hạt nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m027",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nhân óc chó đỏ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Lục Giác 170g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hũ",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Thủy Tinh Lục Giác 170g (Thùng 24 hũ)",
    "prices": {
      "retail": 132000,
      "wholesale1": 110000,
      "wholesale2": 100000,
      "wholesale3": 92000
    },
    "wholesalePrices": {
      "wholesale1": 2640000,
      "wholesale2": 2400000,
      "wholesale3": 2208000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Lục Giác 170g",
      "Đóng thùng": "24 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nhân óc chó đỏ (Hũ Thủy Tinh Lục Giác 170g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nhân óc chó đỏ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m028",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt dẻ cười",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Lục Giác 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hũ",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Thủy Tinh Lục Giác 200g (Thùng 24 hũ)",
    "prices": {
      "retail": 244000,
      "wholesale1": 204000,
      "wholesale2": 185000,
      "wholesale3": 170000
    },
    "wholesalePrices": {
      "wholesale1": 4896000,
      "wholesale2": 4440000,
      "wholesale3": 4080000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Lục Giác 200g",
      "Đóng thùng": "24 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt dẻ cười (Hũ Thủy Tinh Lục Giác 200g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% dẻ cười nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m029",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt Hạnh nhân",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Lục Giác 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hũ",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Thủy Tinh Lục Giác 250g (Thùng 24 hũ)",
    "prices": {
      "retail": 182000,
      "wholesale1": 152000,
      "wholesale2": 138000,
      "wholesale3": 126000
    },
    "wholesalePrices": {
      "wholesale1": 3648000,
      "wholesale2": 3312000,
      "wholesale3": 3024000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Lục Giác 250g",
      "Đóng thùng": "24 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt Hạnh nhân (Hũ Thủy Tinh Lục Giác 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh nhân nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m030",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt Macca",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 500g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Hũ Nhựa Lớn 500g (Thùng 30 hũ)",
    "prices": {
      "retail": 239000,
      "wholesale1": 200000,
      "wholesale2": 181000,
      "wholesale3": 167000
    },
    "wholesalePrices": {
      "wholesale1": 6000000,
      "wholesale2": 5430000,
      "wholesale3": 5010000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 500g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt Macca (Hũ Nhựa Lớn 500g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Macca nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m031",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt Macca",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hũ",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Hũ Nhựa Lớn 250g (Thùng 60 hũ)",
    "prices": {
      "retail": 129000,
      "wholesale1": 108000,
      "wholesale2": 98000,
      "wholesale3": 90000
    },
    "wholesalePrices": {
      "wholesale1": 6480000,
      "wholesale2": 5880000,
      "wholesale3": 5400000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 250g",
      "Đóng thùng": "60 hũ/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt Macca (Hũ Nhựa Lớn 250g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Macca nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m032",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nhân Macca",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 150g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hũ",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Hũ Nhựa Lớn 150g (Thùng 60 hũ)",
    "prices": {
      "retail": 198000,
      "wholesale1": 166000,
      "wholesale2": 150000,
      "wholesale3": 138000
    },
    "wholesalePrices": {
      "wholesale1": 9960000,
      "wholesale2": 9000000,
      "wholesale3": 8280000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 150g",
      "Đóng thùng": "60 hũ/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nhân Macca (Hũ Nhựa Lớn 150g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nhân Macca nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m033",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Quả Óc Chó",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 340g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 340g (Thùng 30 hũ)",
    "prices": {
      "retail": 99000,
      "wholesale1": 83000,
      "wholesale2": 75000,
      "wholesale3": 69000
    },
    "wholesalePrices": {
      "wholesale1": 2490000,
      "wholesale2": 2250000,
      "wholesale3": 2070000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 340g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Quả Óc Chó (Hũ Nhựa Lớn 340g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Óc Chó nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m034",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Quả Óc Chó",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 45 hũ",
    "unitsPerWholesale": 45,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 200g (Thùng 45 hũ)",
    "prices": {
      "retail": 71000,
      "wholesale1": 59000,
      "wholesale2": 54000,
      "wholesale3": 49000
    },
    "wholesalePrices": {
      "wholesale1": 2655000,
      "wholesale2": 2430000,
      "wholesale3": 2205000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 200g",
      "Đóng thùng": "45 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Quả Óc Chó (Hũ Nhựa Lớn 200g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Óc Chó nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m035",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Quả Óc Chó ĐỎ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 45 hũ",
    "unitsPerWholesale": 45,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 200g (Thùng 45 hũ)",
    "prices": {
      "retail": 66000,
      "wholesale1": 55000,
      "wholesale2": 50000,
      "wholesale3": 46000
    },
    "wholesalePrices": {
      "wholesale1": 2475000,
      "wholesale2": 2250000,
      "wholesale3": 2070000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 200g",
      "Đóng thùng": "45 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Quả Óc Chó ĐỎ (Hũ Nhựa Lớn 200g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Óc Chó ĐỎ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m036",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Quả Óc Chó ĐỎ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 350g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 350g (Thùng 30 hũ)",
    "prices": {
      "retail": 106000,
      "wholesale1": 88000,
      "wholesale2": 80000,
      "wholesale3": 74000
    },
    "wholesalePrices": {
      "wholesale1": 2640000,
      "wholesale2": 2400000,
      "wholesale3": 2220000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 350g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Quả Óc Chó ĐỎ (Hũ Nhựa Lớn 350g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Óc Chó ĐỎ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m037",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nhân Óc Chó Vàng",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 150g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hũ",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 150g (Thùng 60 hũ)",
    "prices": {
      "retail": 99000,
      "wholesale1": 83000,
      "wholesale2": 75000,
      "wholesale3": 69000
    },
    "wholesalePrices": {
      "wholesale1": 4980000,
      "wholesale2": 4500000,
      "wholesale3": 4140000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 150g",
      "Đóng thùng": "60 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nhân Óc Chó Vàng (Hũ Nhựa Lớn 150g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nhân Óc Chó Vàng nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m038",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nhân Óc Chó Vàng",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 45 hũ",
    "unitsPerWholesale": 45,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 250g (Thùng 45 hũ)",
    "prices": {
      "retail": 153000,
      "wholesale1": 128000,
      "wholesale2": 116000,
      "wholesale3": 107000
    },
    "wholesalePrices": {
      "wholesale1": 5760000,
      "wholesale2": 5220000,
      "wholesale3": 4815000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 250g",
      "Đóng thùng": "45 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nhân Óc Chó Vàng (Hũ Nhựa Lớn 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nhân Óc Chó Vàng nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m039",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nhân Óc Chó ĐỎ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 45 hũ",
    "unitsPerWholesale": 45,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 250g (Thùng 45 hũ)",
    "prices": {
      "retail": 185000,
      "wholesale1": 155000,
      "wholesale2": 140000,
      "wholesale3": 129000
    },
    "wholesalePrices": {
      "wholesale1": 6975000,
      "wholesale2": 6300000,
      "wholesale3": 5805000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 250g",
      "Đóng thùng": "45 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nhân Óc Chó ĐỎ (Hũ Nhựa Lớn 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nhân Óc Chó ĐỎ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m040",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nhân Óc Chó ĐỎ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 150g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hũ",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 150g (Thùng 60 hũ)",
    "prices": {
      "retail": 119000,
      "wholesale1": 99000,
      "wholesale2": 90000,
      "wholesale3": 83000
    },
    "wholesalePrices": {
      "wholesale1": 5940000,
      "wholesale2": 5400000,
      "wholesale3": 4980000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 150g",
      "Đóng thùng": "60 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nhân Óc Chó ĐỎ (Hũ Nhựa Lớn 150g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nhân Óc Chó ĐỎ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m041",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nho Khô",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 400g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 45 hũ",
    "unitsPerWholesale": 45,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 400g (Thùng 45 hũ)",
    "prices": {
      "retail": 129000,
      "wholesale1": 108000,
      "wholesale2": 98000,
      "wholesale3": 90000
    },
    "wholesalePrices": {
      "wholesale1": 4860000,
      "wholesale2": 4410000,
      "wholesale3": 4050000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 400g",
      "Đóng thùng": "45 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nho Khô (Hũ Nhựa Lớn 400g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nho Khô nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m042",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Chia Seed",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hũ",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Hũ Nhựa Lớn 250g (Thùng 60 hũ)",
    "prices": {
      "retail": 64000,
      "wholesale1": 54000,
      "wholesale2": 49000,
      "wholesale3": 45000
    },
    "wholesalePrices": {
      "wholesale1": 3240000,
      "wholesale2": 2940000,
      "wholesale3": 2700000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 250g",
      "Đóng thùng": "60 hũ/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Chia Seed (Hũ Nhựa Lớn 250g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Chia Seed nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m043",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Chia Seed",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 500g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Hũ Nhựa Lớn 500g (Thùng 30 hũ)",
    "prices": {
      "retail": 116000,
      "wholesale1": 97000,
      "wholesale2": 88000,
      "wholesale3": 80000
    },
    "wholesalePrices": {
      "wholesale1": 2910000,
      "wholesale2": 2640000,
      "wholesale3": 2400000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 500g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Chia Seed (Hũ Nhựa Lớn 500g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Chia Seed nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m044",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạnh Nhân Tách Vỏ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 400g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 45 hũ",
    "unitsPerWholesale": 45,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 400g (Thùng 45 hũ)",
    "prices": {
      "retail": 280000,
      "wholesale1": 235000,
      "wholesale2": 212000,
      "wholesale3": 195000
    },
    "wholesalePrices": {
      "wholesale1": 10575000,
      "wholesale2": 9540000,
      "wholesale3": 8775000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 400g",
      "Đóng thùng": "45 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạnh Nhân Tách Vỏ (Hũ Nhựa Lớn 400g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh Nhân Tách Vỏ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m045",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạnh Nhân Tách Vỏ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hũ",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 250g (Thùng 60 hũ)",
    "prices": {
      "retail": 182000,
      "wholesale1": 152000,
      "wholesale2": 138000,
      "wholesale3": 126000
    },
    "wholesalePrices": {
      "wholesale1": 9120000,
      "wholesale2": 8280000,
      "wholesale3": 7560000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 250g",
      "Đóng thùng": "60 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạnh Nhân Tách Vỏ (Hũ Nhựa Lớn 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh Nhân Tách Vỏ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m046",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạnh Nhân Rang Bơ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 450g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 450g (Thùng 30 hũ)",
    "prices": {
      "retail": 264000,
      "wholesale1": 221000,
      "wholesale2": 200000,
      "wholesale3": 184000
    },
    "wholesalePrices": {
      "wholesale1": 6630000,
      "wholesale2": 6000000,
      "wholesale3": 5520000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 450g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạnh Nhân Rang Bơ (Hũ Nhựa Lớn 450g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh Nhân Rang Bơ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m047",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạnh Nhân Rang Bơ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 45 hũ",
    "unitsPerWholesale": 45,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 250g (Thùng 45 hũ)",
    "prices": {
      "retail": 165000,
      "wholesale1": 138000,
      "wholesale2": 125000,
      "wholesale3": 115000
    },
    "wholesalePrices": {
      "wholesale1": 6210000,
      "wholesale2": 5625000,
      "wholesale3": 5175000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 250g",
      "Đóng thùng": "45 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạnh Nhân Rang Bơ (Hũ Nhựa Lớn 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh Nhân Rang Bơ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m048",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Yến Mạch Úc",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 450g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Hũ Nhựa Lớn 450g (Thùng 30 hũ)",
    "prices": {
      "retail": 61000,
      "wholesale1": 51000,
      "wholesale2": 46000,
      "wholesale3": 43000
    },
    "wholesalePrices": {
      "wholesale1": 1530000,
      "wholesale2": 1380000,
      "wholesale3": 1290000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 450g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Yến Mạch Úc (Hũ Nhựa Lớn 450g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Yến Mạch Úc nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m049",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt Dẻ Cười (KHÔNG TẨY)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 500g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 500g (Thùng 30 hũ)",
    "prices": {
      "retail": 581000,
      "wholesale1": 486000,
      "wholesale2": 440000,
      "wholesale3": 405000
    },
    "wholesalePrices": {
      "wholesale1": 14580000,
      "wholesale2": 13200000,
      "wholesale3": 12150000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 500g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt Dẻ Cười (KHÔNG TẨY) (Hũ Nhựa Lớn 500g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Dẻ Cười (KHÔNG TẨY) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m050",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt Dẻ Cười (KHÔNG TẨY)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hũ",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Lớn 250g (Thùng 60 hũ)",
    "prices": {
      "retail": 300000,
      "wholesale1": 251000,
      "wholesale2": 228000,
      "wholesale3": 209000
    },
    "wholesalePrices": {
      "wholesale1": 15060000,
      "wholesale2": 13680000,
      "wholesale3": 12540000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 250g",
      "Đóng thùng": "60 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt Dẻ Cười (KHÔNG TẨY) (Hũ Nhựa Lớn 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Dẻ Cười (KHÔNG TẨY) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m051",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt Điều Bình Phước",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 500g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Nhựa Lớn 500g (Thùng 30 hũ)",
    "prices": {
      "retail": 327000,
      "wholesale1": 273000,
      "wholesale2": 248000,
      "wholesale3": 228000
    },
    "wholesalePrices": {
      "wholesale1": 8190000,
      "wholesale2": 7440000,
      "wholesale3": 6840000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 500g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt Điều Bình Phước (Hũ Nhựa Lớn 500g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Điều Bình Phước nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m052",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt Điều Bình Phước",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hũ",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Nhựa Lớn 250g (Thùng 60 hũ)",
    "prices": {
      "retail": 172000,
      "wholesale1": 144000,
      "wholesale2": 130000,
      "wholesale3": 120000
    },
    "wholesalePrices": {
      "wholesale1": 8640000,
      "wholesale2": 7800000,
      "wholesale3": 7200000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 250g",
      "Đóng thùng": "60 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt Điều Bình Phước (Hũ Nhựa Lớn 250g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Điều Bình Phước nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m053",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Mix Hạt",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hũ",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "G-ROOSTER",
    "packaging": "Hũ Nhựa Lớn 250g (Thùng 60 hũ)",
    "prices": {
      "retail": 145000,
      "wholesale1": 121000,
      "wholesale2": 110000,
      "wholesale3": 101000
    },
    "wholesalePrices": {
      "wholesale1": 7260000,
      "wholesale2": 6600000,
      "wholesale3": 6060000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 250g",
      "Đóng thùng": "60 hũ/thùng",
      "Xuất xứ": "G-ROOSTER",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Mix Hạt (Hũ Nhựa Lớn 250g) tuyển chọn cao cấp. Nguồn gốc G-ROOSTER minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Mix Hạt nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m054",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Mix hạt",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 150g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hũ",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "G-ROOSTER",
    "packaging": "Hũ Nhựa Lớn 150g (Thùng 60 hũ)",
    "prices": {
      "retail": 92000,
      "wholesale1": 77000,
      "wholesale2": 70000,
      "wholesale3": 64000
    },
    "wholesalePrices": {
      "wholesale1": 4620000,
      "wholesale2": 4200000,
      "wholesale3": 3840000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 150g",
      "Đóng thùng": "60 hũ/thùng",
      "Xuất xứ": "G-ROOSTER",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Mix hạt (Hũ Nhựa Lớn 150g) tuyển chọn cao cấp. Nguồn gốc G-ROOSTER minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Mix hạt nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m055",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt bí xanh",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 400g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 45 hũ",
    "unitsPerWholesale": 45,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mông Cổ",
    "packaging": "Hũ Nhựa Lớn 400g (Thùng 45 hũ)",
    "prices": {
      "retail": 137000,
      "wholesale1": 115000,
      "wholesale2": 104000,
      "wholesale3": 95000
    },
    "wholesalePrices": {
      "wholesale1": 5175000,
      "wholesale2": 4680000,
      "wholesale3": 4275000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 400g",
      "Đóng thùng": "45 hũ/thùng",
      "Xuất xứ": "Mông Cổ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt bí xanh (Hũ Nhựa Lớn 400g) tuyển chọn cao cấp. Nguồn gốc Mông Cổ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% bí xanh nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m056",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt Macca (Hộp)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 500g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hộp",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Hộp Giấy 500g (Thùng 30 hộp)",
    "prices": {
      "retail": 239000,
      "wholesale1": 200000,
      "wholesale2": 181000,
      "wholesale3": 167000
    },
    "wholesalePrices": {
      "wholesale1": 6000000,
      "wholesale2": 5430000,
      "wholesale3": 5010000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 500g",
      "Đóng thùng": "30 hộp/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt Macca (Hộp) (Hộp Giấy 500g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Macca (Hộp) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m057",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt Macca (Hộp)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 250g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hộp",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Hộp Giấy 250g (Thùng 60 hộp)",
    "prices": {
      "retail": 129000,
      "wholesale1": 108000,
      "wholesale2": 98000,
      "wholesale3": 90000
    },
    "wholesalePrices": {
      "wholesale1": 6480000,
      "wholesale2": 5880000,
      "wholesale3": 5400000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 250g",
      "Đóng thùng": "60 hộp/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt Macca (Hộp) (Hộp Giấy 250g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Macca (Hộp) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m058",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Quả Óc Chó (Túi Zip)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Túi Zip 500g",
    "retailUnit": "Túi",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 25 túi",
    "unitsPerWholesale": 25,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Túi Zip 500g (Thùng 25 túi)",
    "prices": {
      "retail": 129000,
      "wholesale1": 108000,
      "wholesale2": 98000,
      "wholesale3": 90000
    },
    "wholesalePrices": {
      "wholesale1": 2700000,
      "wholesale2": 2450000,
      "wholesale3": 2250000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Túi Zip 500g",
      "Đóng thùng": "25 túi/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Quả Óc Chó (Túi Zip) (Túi Zip 500g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Óc Chó (Túi Zip) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m059",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Quả Óc Chó (Hộp)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 500g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 20 hộp",
    "unitsPerWholesale": 20,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hộp Giấy 500g (Thùng 20 hộp)",
    "prices": {
      "retail": 129000,
      "wholesale1": 108000,
      "wholesale2": 98000,
      "wholesale3": 90000
    },
    "wholesalePrices": {
      "wholesale1": 2160000,
      "wholesale2": 1960000,
      "wholesale3": 1800000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 500g",
      "Đóng thùng": "20 hộp/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Quả Óc Chó (Hộp) (Hộp Giấy 500g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Óc Chó (Hộp) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m060",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Quả Óc Chó (Hộp)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 250g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 40 hộp",
    "unitsPerWholesale": 40,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hộp Giấy 250g (Thùng 40 hộp)",
    "prices": {
      "retail": 71000,
      "wholesale1": 59000,
      "wholesale2": 54000,
      "wholesale3": 49000
    },
    "wholesalePrices": {
      "wholesale1": 2360000,
      "wholesale2": 2160000,
      "wholesale3": 1960000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 250g",
      "Đóng thùng": "40 hộp/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Quả Óc Chó (Hộp) (Hộp Giấy 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Óc Chó (Hộp) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m061",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nhân Óc Chó Vàng",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 250g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 40 hộp",
    "unitsPerWholesale": 40,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hộp Giấy 250g (Thùng 40 hộp)",
    "prices": {
      "retail": 153000,
      "wholesale1": 128000,
      "wholesale2": 116000,
      "wholesale3": 107000
    },
    "wholesalePrices": {
      "wholesale1": 5120000,
      "wholesale2": 4640000,
      "wholesale3": 4280000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 250g",
      "Đóng thùng": "40 hộp/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nhân Óc Chó Vàng (Hộp Giấy 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nhân Óc Chó Vàng nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m062",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nho Khô (Hộp Vàng)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 250g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hộp",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hộp Giấy 250g (Thùng 24 hộp)",
    "prices": {
      "retail": 59000,
      "wholesale1": 50000,
      "wholesale2": 45000,
      "wholesale3": 41000
    },
    "wholesalePrices": {
      "wholesale1": 1200000,
      "wholesale2": 1080000,
      "wholesale3": 984000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 250g",
      "Đóng thùng": "24 hộp/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nho Khô (Hộp Vàng) (Hộp Giấy 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nho Khô (Hộp Vàng) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m063",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nho Khô (Hộp Đỏ)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 250g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hộp",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hộp Giấy 250g (Thùng 24 hộp)",
    "prices": {
      "retail": 59000,
      "wholesale1": 50000,
      "wholesale2": 45000,
      "wholesale3": 41000
    },
    "wholesalePrices": {
      "wholesale1": 1200000,
      "wholesale2": 1080000,
      "wholesale3": 984000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 250g",
      "Đóng thùng": "24 hộp/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nho Khô (Hộp Đỏ) (Hộp Giấy 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nho Khô (Hộp Đỏ) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m064",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nho Khô (Hộp Tím)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 150g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hộp",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hộp Giấy 150g (Thùng 24 hộp)",
    "prices": {
      "retail": 36000,
      "wholesale1": 30000,
      "wholesale2": 28000,
      "wholesale3": 25000
    },
    "wholesalePrices": {
      "wholesale1": 720000,
      "wholesale2": 672000,
      "wholesale3": 600000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 150g",
      "Đóng thùng": "24 hộp/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nho Khô (Hộp Tím) (Hộp Giấy 150g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nho Khô (Hộp Tím) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m065",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Chia Seed (Hộp)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 250g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hộp",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Ấn Độ",
    "packaging": "Hộp Giấy 250g (Thùng 60 hộp)",
    "prices": {
      "retail": 64000,
      "wholesale1": 54000,
      "wholesale2": 49000,
      "wholesale3": 45000
    },
    "wholesalePrices": {
      "wholesale1": 3240000,
      "wholesale2": 2940000,
      "wholesale3": 2700000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 250g",
      "Đóng thùng": "60 hộp/thùng",
      "Xuất xứ": "Ấn Độ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Chia Seed (Hộp) (Hộp Giấy 250g) tuyển chọn cao cấp. Nguồn gốc Ấn Độ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Chia Seed (Hộp) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m066",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Chia Seed (Túi Zip)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Túi Zip 500g",
    "retailUnit": "Túi",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 50 túi",
    "unitsPerWholesale": 50,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Ấn Độ",
    "packaging": "Túi Zip 500g (Thùng 50 túi)",
    "prices": {
      "retail": 116000,
      "wholesale1": 97000,
      "wholesale2": 88000,
      "wholesale3": 80000
    },
    "wholesalePrices": {
      "wholesale1": 4850000,
      "wholesale2": 4400000,
      "wholesale3": 4000000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Túi Zip 500g",
      "Đóng thùng": "50 túi/thùng",
      "Xuất xứ": "Ấn Độ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Chia Seed (Túi Zip) (Túi Zip 500g) tuyển chọn cao cấp. Nguồn gốc Ấn Độ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Chia Seed (Túi Zip) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m067",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Chia Seed (Túi Zip Lớn)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Túi Zip 1000g",
    "retailUnit": "Túi",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 túi",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Ấn Độ",
    "packaging": "Túi Zip 1000g (Thùng 30 túi)",
    "prices": {
      "retail": 214000,
      "wholesale1": 179000,
      "wholesale2": 162000,
      "wholesale3": 150000
    },
    "wholesalePrices": {
      "wholesale1": 5370000,
      "wholesale2": 4860000,
      "wholesale3": 4500000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Túi Zip 1000g",
      "Đóng thùng": "30 túi/thùng",
      "Xuất xứ": "Ấn Độ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Chia Seed (Túi Zip Lớn) (Túi Zip 1000g) tuyển chọn cao cấp. Nguồn gốc Ấn Độ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Chia Seed (Túi Zip Lớn) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m068",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạnh Nhân Tách Vỏ (Hộp)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 250g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hộp",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hộp Giấy 250g (Thùng 60 hộp)",
    "prices": {
      "retail": 182000,
      "wholesale1": 152000,
      "wholesale2": 138000,
      "wholesale3": 126000
    },
    "wholesalePrices": {
      "wholesale1": 9120000,
      "wholesale2": 8280000,
      "wholesale3": 7560000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 250g",
      "Đóng thùng": "60 hộp/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạnh Nhân Tách Vỏ (Hộp) (Hộp Giấy 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh Nhân Tách Vỏ (Hộp) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m069",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạnh Nhân Tách Vỏ (Hộp Lớn)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 500g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hộp",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hộp Giấy 500g (Thùng 30 hộp)",
    "prices": {
      "retail": 338000,
      "wholesale1": 283000,
      "wholesale2": 256000,
      "wholesale3": 236000
    },
    "wholesalePrices": {
      "wholesale1": 8490000,
      "wholesale2": 7680000,
      "wholesale3": 7080000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 500g",
      "Đóng thùng": "30 hộp/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạnh Nhân Tách Vỏ (Hộp Lớn) (Hộp Giấy 500g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh Nhân Tách Vỏ (Hộp Lớn) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m070",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạnh Nhân Rang Bơ (Hộp)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 500g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hộp",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hộp Giấy 500g (Thùng 30 hộp)",
    "prices": {
      "retail": 264000,
      "wholesale1": 221000,
      "wholesale2": 200000,
      "wholesale3": 184000
    },
    "wholesalePrices": {
      "wholesale1": 6630000,
      "wholesale2": 6000000,
      "wholesale3": 5520000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 500g",
      "Đóng thùng": "30 hộp/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạnh Nhân Rang Bơ (Hộp) (Hộp Giấy 500g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh Nhân Rang Bơ (Hộp) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m071",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạnh Nhân Rang Bơ (Túi Zip)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Túi Zip 500g",
    "retailUnit": "Túi",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 túi",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Túi Zip 500g (Thùng 30 túi)",
    "prices": {
      "retail": 264000,
      "wholesale1": 221000,
      "wholesale2": 200000,
      "wholesale3": 184000
    },
    "wholesalePrices": {
      "wholesale1": 6630000,
      "wholesale2": 6000000,
      "wholesale3": 5520000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Túi Zip 500g",
      "Đóng thùng": "30 túi/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạnh Nhân Rang Bơ (Túi Zip) (Túi Zip 500g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Hạnh Nhân Rang Bơ (Túi Zip) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m072",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Yến Mạch Úc (Túi Zip)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Túi Zip 500g",
    "retailUnit": "Túi",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 40 túi",
    "unitsPerWholesale": 40,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Túi Zip 500g (Thùng 40 túi)",
    "prices": {
      "retail": 54000,
      "wholesale1": 45000,
      "wholesale2": 41000,
      "wholesale3": 37000
    },
    "wholesalePrices": {
      "wholesale1": 1800000,
      "wholesale2": 1640000,
      "wholesale3": 1480000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Túi Zip 500g",
      "Đóng thùng": "40 túi/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Yến Mạch Úc (Túi Zip) (Túi Zip 500g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Yến Mạch Úc (Túi Zip) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m073",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt Dẻ Cười (KHÔNG TẨY) (Túi Zip)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Túi Zip 500g",
    "retailUnit": "Túi",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 túi",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Túi Zip 500g (Thùng 30 túi)",
    "prices": {
      "retail": 581000,
      "wholesale1": 486000,
      "wholesale2": 440000,
      "wholesale3": 405000
    },
    "wholesalePrices": {
      "wholesale1": 14580000,
      "wholesale2": 13200000,
      "wholesale3": 12150000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Túi Zip 500g",
      "Đóng thùng": "30 túi/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt Dẻ Cười (KHÔNG TẨY) (Túi Zip) (Túi Zip 500g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Dẻ Cười (KHÔNG TẨY) (Túi Zip) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m074",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt Điều Bình Phước (Túi Zip)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Túi Zip 500g",
    "retailUnit": "Túi",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 túi",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Túi Zip 500g (Thùng 30 túi)",
    "prices": {
      "retail": 327000,
      "wholesale1": 273000,
      "wholesale2": 248000,
      "wholesale3": 228000
    },
    "wholesalePrices": {
      "wholesale1": 8190000,
      "wholesale2": 7440000,
      "wholesale3": 6840000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Túi Zip 500g",
      "Đóng thùng": "30 túi/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt Điều Bình Phước (Túi Zip) (Túi Zip 500g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Điều Bình Phước (Túi Zip) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m075",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nho khô (màu đỏ)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Túi Zip 100g",
    "retailUnit": "Túi",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 túi",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Ấn Độ",
    "packaging": "Túi Zip 100g (Thùng 24 túi)",
    "prices": {
      "retail": 28000,
      "wholesale1": 23000,
      "wholesale2": 21000,
      "wholesale3": 20000
    },
    "wholesalePrices": {
      "wholesale1": 5520000,
      "wholesale2": 504000,
      "wholesale3": 480000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Túi Zip 100g",
      "Đóng thùng": "24 túi/thùng",
      "Xuất xứ": "Ấn Độ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nho khô (màu đỏ) (Túi Zip 100g) tuyển chọn cao cấp. Nguồn gốc Ấn Độ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nho khô (màu đỏ) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m076",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nho khô (màu vàng)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 100g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hộp",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Ấn Độ",
    "packaging": "Hộp Giấy 100g (Thùng 24 hộp)",
    "prices": {
      "retail": 28000,
      "wholesale1": 23000,
      "wholesale2": 21000,
      "wholesale3": 20000
    },
    "wholesalePrices": {
      "wholesale1": 5520000,
      "wholesale2": 504000,
      "wholesale3": 480000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 100g",
      "Đóng thùng": "24 hộp/thùng",
      "Xuất xứ": "Ấn Độ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nho khô (màu vàng) (Hộp Giấy 100g) tuyển chọn cao cấp. Nguồn gốc Ấn Độ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nho khô (màu vàng) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m077",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nho khô (màu xanh)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 100g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hộp",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Ấn Độ",
    "packaging": "Hộp Giấy 100g (Thùng 24 hộp)",
    "prices": {
      "retail": 28000,
      "wholesale1": 23000,
      "wholesale2": 21000,
      "wholesale3": 20000
    },
    "wholesalePrices": {
      "wholesale1": 5520000,
      "wholesale2": 504000,
      "wholesale3": 480000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 100g",
      "Đóng thùng": "24 hộp/thùng",
      "Xuất xứ": "Ấn Độ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nho khô (màu xanh) (Hộp Giấy 100g) tuyển chọn cao cấp. Nguồn gốc Ấn Độ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nho khô (màu xanh) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m078",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Bột Yến Mạch",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa 450g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "G-ROOSTER",
    "packaging": "Hũ Nhựa 450g (Thùng 30 hũ)",
    "prices": {
      "retail": 91000,
      "wholesale1": 76000,
      "wholesale2": 69000,
      "wholesale3": 63000
    },
    "wholesalePrices": {
      "wholesale1": 2280000,
      "wholesale2": 2070000,
      "wholesale3": 1890000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa 450g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "G-ROOSTER",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Bột Yến Mạch (Hũ Nhựa 450g) tuyển chọn cao cấp. Nguồn gốc G-ROOSTER minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Bột Yến Mạch nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m079",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Đỏ/Vàng - Macca nứt vỏ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Tem Đỏ/Vàng 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Hũ Nhựa Tem Đỏ/Vàng 250g (Thùng 30 hũ)",
    "prices": {
      "retail": 127000,
      "wholesale1": 106000,
      "wholesale2": 96000,
      "wholesale3": 89000
    },
    "wholesalePrices": {
      "wholesale1": 3180000,
      "wholesale2": 2880000,
      "wholesale3": 2670000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Tem Đỏ/Vàng 250g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Đỏ/Vàng - Macca nứt vỏ (Hũ Nhựa Tem Đỏ/Vàng 250g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Đỏ/Vàng nguyên chất tuyển chọn.",
    "availableVariants": [
      "ĐỎ",
      "VÀNG",
      "NGẪU NHIÊN"
    ]
  },
  {
    "id": "gr-m080",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Đỏ/Vàng - Hạnh nhân rang bơ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Tem Đỏ/Vàng 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Tem Đỏ/Vàng 250g (Thùng 30 hũ)",
    "prices": {
      "retail": 162000,
      "wholesale1": 135000,
      "wholesale2": 122000,
      "wholesale3": 113000
    },
    "wholesalePrices": {
      "wholesale1": 4050000,
      "wholesale2": 3660000,
      "wholesale3": 3390000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Tem Đỏ/Vàng 250g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Đỏ/Vàng - Hạnh nhân rang bơ (Hũ Nhựa Tem Đỏ/Vàng 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Đỏ/Vàng nguyên chất tuyển chọn.",
    "availableVariants": [
      "ĐỎ",
      "VÀNG",
      "NGẪU NHIÊN"
    ]
  },
  {
    "id": "gr-m081",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Đỏ/Vàng - Hạt điều",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Tem Đỏ/Vàng 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Nhựa Tem Đỏ/Vàng 250g (Thùng 30 hũ)",
    "prices": {
      "retail": 173000,
      "wholesale1": 145000,
      "wholesale2": 131000,
      "wholesale3": 121000
    },
    "wholesalePrices": {
      "wholesale1": 4350000,
      "wholesale2": 3930000,
      "wholesale3": 3630000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Tem Đỏ/Vàng 250g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Đỏ/Vàng - Hạt điều (Hũ Nhựa Tem Đỏ/Vàng 250g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Đỏ/Vàng nguyên chất tuyển chọn.",
    "availableVariants": [
      "ĐỎ",
      "VÀNG",
      "NGẪU NHIÊN"
    ]
  },
  {
    "id": "gr-m082",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Đỏ/Vàng - Hạt dẻ cười",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Tem Đỏ/Vàng 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Tem Đỏ/Vàng 250g (Thùng 30 hũ)",
    "prices": {
      "retail": 295000,
      "wholesale1": 247000,
      "wholesale2": 224000,
      "wholesale3": 206000
    },
    "wholesalePrices": {
      "wholesale1": 7410000,
      "wholesale2": 6720000,
      "wholesale3": 6180000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Tem Đỏ/Vàng 250g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Đỏ/Vàng - Hạt dẻ cười (Hũ Nhựa Tem Đỏ/Vàng 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Đỏ/Vàng nguyên chất tuyển chọn.",
    "availableVariants": [
      "ĐỎ",
      "VÀNG",
      "NGẪU NHIÊN"
    ]
  },
  {
    "id": "gr-m083",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Đỏ/Vàng - Nho khô",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Tem Đỏ/Vàng 320g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Ấn Độ",
    "packaging": "Hũ Nhựa Tem Đỏ/Vàng 320g (Thùng 30 hũ)",
    "prices": {
      "retail": 74000,
      "wholesale1": 62000,
      "wholesale2": 56000,
      "wholesale3": 52000
    },
    "wholesalePrices": {
      "wholesale1": 1860000,
      "wholesale2": 1680000,
      "wholesale3": 1560000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Tem Đỏ/Vàng 320g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Ấn Độ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Đỏ/Vàng - Nho khô (Hũ Nhựa Tem Đỏ/Vàng 320g) tuyển chọn cao cấp. Nguồn gốc Ấn Độ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Đỏ/Vàng nguyên chất tuyển chọn.",
    "availableVariants": [
      "ĐỎ",
      "VÀNG",
      "NGẪU NHIÊN"
    ]
  },
  {
    "id": "gr-m084",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Đỏ - Nhân óc chó vàng",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Tem Đỏ 180g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Tem Đỏ 180g (Thùng 30 hũ)",
    "prices": {
      "retail": 135000,
      "wholesale1": 113000,
      "wholesale2": 102000,
      "wholesale3": 94000
    },
    "wholesalePrices": {
      "wholesale1": 3390000,
      "wholesale2": 3060000,
      "wholesale3": 2820000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Tem Đỏ 180g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Đỏ - Nhân óc chó vàng (Hũ Nhựa Tem Đỏ 180g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Đỏ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m085",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Đỏ - Hạnh nhân lõi",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Tem Đỏ 300g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Tem Đỏ 300g (Thùng 30 hũ)",
    "prices": {
      "retail": 211000,
      "wholesale1": 177000,
      "wholesale2": 160000,
      "wholesale3": 147000
    },
    "wholesalePrices": {
      "wholesale1": 5310000,
      "wholesale2": 4800000,
      "wholesale3": 4410000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Tem Đỏ 300g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Đỏ - Hạnh nhân lõi (Hũ Nhựa Tem Đỏ 300g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Đỏ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m086",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Đỏ - Mix hạt",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Tem Đỏ 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "G-ROOSTER",
    "packaging": "Hũ Nhựa Tem Đỏ 250g (Thùng 30 hũ)",
    "prices": {
      "retail": 145000,
      "wholesale1": 121000,
      "wholesale2": 110000,
      "wholesale3": 101000
    },
    "wholesalePrices": {
      "wholesale1": 3630000,
      "wholesale2": 3300000,
      "wholesale3": 3030000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Tem Đỏ 250g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "G-ROOSTER",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Đỏ - Mix hạt (Hũ Nhựa Tem Đỏ 250g) tuyển chọn cao cấp. Nguồn gốc G-ROOSTER minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Đỏ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m088",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Vàng - Nhân óc chó đỏ",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Tem Vàng 220g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hũ Nhựa Tem Vàng 220g (Thùng 30 hũ)",
    "prices": {
      "retail": 162000,
      "wholesale1": 135000,
      "wholesale2": 122000,
      "wholesale3": 113000
    },
    "wholesalePrices": {
      "wholesale1": 4050000,
      "wholesale2": 3660000,
      "wholesale3": 3390000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Tem Vàng 220g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Vàng - Nhân óc chó đỏ (Hũ Nhựa Tem Vàng 220g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Vàng nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m089",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Quả macca nứt vỏ hũ tròn",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Nhựa Tròn Mica 250g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hộp",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Úc",
    "packaging": "Hộp Nhựa Tròn Mica 250g (Thùng 30 hộp)",
    "prices": {
      "retail": 127000,
      "wholesale1": 106000,
      "wholesale2": 96000,
      "wholesale3": 89000
    },
    "wholesalePrices": {
      "wholesale1": 3180000,
      "wholesale2": 2880000,
      "wholesale3": 2670000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Nhựa Tròn Mica 250g",
      "Đóng thùng": "30 hộp/thùng",
      "Xuất xứ": "Úc",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Quả macca nứt vỏ hũ tròn (Hộp Nhựa Tròn Mica 250g) tuyển chọn cao cấp. Nguồn gốc Úc minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% macca nứt vỏ hũ tròn nguyên chất tuyển chọn.",
    "availableVariants": [
      "XANH",
      "ĐỎ",
      "VÀNG",
      "NGẪU NHIÊN"
    ]
  },
  {
    "id": "gr-m090",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt hạnh nhân rang bơ hũ tròn",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Nhựa Tròn Mica 250g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hộp",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hộp Nhựa Tròn Mica 250g (Thùng 30 hộp)",
    "prices": {
      "retail": 162000,
      "wholesale1": 135000,
      "wholesale2": 122000,
      "wholesale3": 113000
    },
    "wholesalePrices": {
      "wholesale1": 4050000,
      "wholesale2": 3660000,
      "wholesale3": 3390000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Nhựa Tròn Mica 250g",
      "Đóng thùng": "30 hộp/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt hạnh nhân rang bơ hũ tròn (Hộp Nhựa Tròn Mica 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% hạnh nhân rang bơ hũ tròn nguyên chất tuyển chọn.",
    "availableVariants": [
      "XANH",
      "ĐỎ",
      "VÀNG",
      "NGẪU NHIÊN"
    ]
  },
  {
    "id": "gr-m091",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt dẻ cười rang muối hũ tròn",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Nhựa Tròn Mica 250g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hộp",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mỹ",
    "packaging": "Hộp Nhựa Tròn Mica 250g (Thùng 30 hộp)",
    "prices": {
      "retail": 297000,
      "wholesale1": 248000,
      "wholesale2": 225000,
      "wholesale3": 207000
    },
    "wholesalePrices": {
      "wholesale1": 7440000,
      "wholesale2": 6750000,
      "wholesale3": 6210000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Nhựa Tròn Mica 250g",
      "Đóng thùng": "30 hộp/thùng",
      "Xuất xứ": "Mỹ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt dẻ cười rang muối hũ tròn (Hộp Nhựa Tròn Mica 250g) tuyển chọn cao cấp. Nguồn gốc Mỹ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% dẻ cười rang muối hũ tròn nguyên chất tuyển chọn.",
    "availableVariants": [
      "XANH",
      "ĐỎ",
      "VÀNG",
      "NGẪU NHIÊN"
    ]
  },
  {
    "id": "gr-m092",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Hạt điều rang muối xếp hoa hũ tròn",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Nhựa Tròn Mica 250g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hộp",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hộp Nhựa Tròn Mica 250g (Thùng 30 hộp)",
    "prices": {
      "retail": 173000,
      "wholesale1": 145000,
      "wholesale2": 131000,
      "wholesale3": 121000
    },
    "wholesalePrices": {
      "wholesale1": 4350000,
      "wholesale2": 3930000,
      "wholesale3": 3630000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Nhựa Tròn Mica 250g",
      "Đóng thùng": "30 hộp/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Hạt điều rang muối xếp hoa hũ tròn (Hộp Nhựa Tròn Mica 250g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% điều rang muối xếp hoa hũ tròn nguyên chất tuyển chọn.",
    "availableVariants": [
      "XANH",
      "ĐỎ",
      "VÀNG",
      "NGẪU NHIÊN"
    ]
  },
  {
    "id": "gr-m093",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Nho khô đen Chile",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Nhựa Tròn Mica 300g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hộp",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Chile",
    "packaging": "Hộp Nhựa Tròn Mica 300g (Thùng 30 hộp)",
    "prices": {
      "retail": 97000,
      "wholesale1": 81000,
      "wholesale2": 74000,
      "wholesale3": 68000
    },
    "wholesalePrices": {
      "wholesale1": 2430000,
      "wholesale2": 2220000,
      "wholesale3": 2040000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Nhựa Tròn Mica 300g",
      "Đóng thùng": "30 hộp/thùng",
      "Xuất xứ": "Chile",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Nho khô đen Chile (Hộp Nhựa Tròn Mica 300g) tuyển chọn cao cấp. Nguồn gốc Chile minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Nho khô đen Chile nguyên chất tuyển chọn.",
    "availableVariants": [
      "XANH",
      "ĐỎ",
      "VÀNG",
      "NGẪU NHIÊN"
    ]
  },
  {
    "id": "gr-m094",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Granola Original",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Vuông 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "G-ROOSTER",
    "packaging": "Hũ Thủy Tinh Vuông 200g (Thùng 30 hũ)",
    "prices": {
      "retail": 76000,
      "wholesale1": 63000,
      "wholesale2": 58000,
      "wholesale3": 53000
    },
    "wholesalePrices": {
      "wholesale1": 1890000,
      "wholesale2": 1740000,
      "wholesale3": 1590000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Vuông 200g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "G-ROOSTER",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Granola Original (Hũ Thủy Tinh Vuông 200g) tuyển chọn cao cấp. Nguồn gốc G-ROOSTER minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Granola Original nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m095",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Xoài sấy dẻo",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Vuông 170g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Thủy Tinh Vuông 170g (Thùng 30 hũ)",
    "prices": {
      "retail": 73000,
      "wholesale1": 61000,
      "wholesale2": 55000,
      "wholesale3": 51000
    },
    "wholesalePrices": {
      "wholesale1": 1830000,
      "wholesale2": 1650000,
      "wholesale3": 1530000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Vuông 170g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Xoài sấy dẻo (Hũ Thủy Tinh Vuông 170g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Xoài sấy dẻo nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m096",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Khô gà",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Vuông 130g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Thủy Tinh Vuông 130g (Thùng 30 hũ)",
    "prices": {
      "retail": 82000,
      "wholesale1": 69000,
      "wholesale2": 62000,
      "wholesale3": 57000
    },
    "wholesalePrices": {
      "wholesale1": 2070000,
      "wholesale2": 1860000,
      "wholesale3": 1710000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Vuông 130g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Khô gà (Hũ Thủy Tinh Vuông 130g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Khô gà nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m097",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Xoài sấy dẻo - Hũ 160g",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Nắp Đen 160g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Nhựa Nắp Đen 160g (Thùng 30 hũ)",
    "prices": {
      "retail": 64000,
      "wholesale1": 54000,
      "wholesale2": 49000,
      "wholesale3": 45000
    },
    "wholesalePrices": {
      "wholesale1": 1620000,
      "wholesale2": 1470000,
      "wholesale3": 1350000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Nắp Đen 160g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Xoài sấy dẻo - Hũ 160g (Hũ Nhựa Nắp Đen 160g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Xoài sấy dẻo nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m098",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Khô gà - Hũ 100g",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Nắp Đen 100g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Nhựa Nắp Đen 100g (Thùng 30 hũ)",
    "prices": {
      "retail": 64000,
      "wholesale1": 54000,
      "wholesale2": 49000,
      "wholesale3": 45000
    },
    "wholesalePrices": {
      "wholesale1": 1620000,
      "wholesale2": 1470000,
      "wholesale3": 1350000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Nắp Đen 100g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Khô gà - Hũ 100g (Hũ Nhựa Nắp Đen 100g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Khô gà nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m099",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Xoài sấy dẻo",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Lục Giác 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hũ",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Thủy Tinh Lục Giác 200g (Thùng 24 hũ)",
    "prices": {
      "retail": 82000,
      "wholesale1": 69000,
      "wholesale2": 62000,
      "wholesale3": 57000
    },
    "wholesalePrices": {
      "wholesale1": 1656000,
      "wholesale2": 1488000,
      "wholesale3": 1368000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Lục Giác 200g",
      "Đóng thùng": "24 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Xoài sấy dẻo (Hũ Thủy Tinh Lục Giác 200g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Xoài sấy dẻo nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m100",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Granola original",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Lục Giác 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hũ",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Thủy Tinh Lục Giác 250g (Thùng 24 hũ)",
    "prices": {
      "retail": 91000,
      "wholesale1": 76000,
      "wholesale2": 69000,
      "wholesale3": 63000
    },
    "wholesalePrices": {
      "wholesale1": 1824000,
      "wholesale2": 1656000,
      "wholesale3": 1512000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Lục Giác 250g",
      "Đóng thùng": "24 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Granola original (Hũ Thủy Tinh Lục Giác 250g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Granola original nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m101",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Granola Ăn Liền",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 60 hũ",
    "unitsPerWholesale": 60,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "G-ROOSTER",
    "packaging": "Hũ Nhựa Lớn 250g (Thùng 60 hũ)",
    "prices": {
      "retail": 89000,
      "wholesale1": 75000,
      "wholesale2": 68000,
      "wholesale3": 62000
    },
    "wholesalePrices": {
      "wholesale1": 4500000,
      "wholesale2": 4080000,
      "wholesale3": 3720000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 250g",
      "Đóng thùng": "60 hũ/thùng",
      "Xuất xứ": "G-ROOSTER",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Granola Ăn Liền (Hũ Nhựa Lớn 250g) tuyển chọn cao cấp. Nguồn gốc G-ROOSTER minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Granola Ăn Liền nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m102",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Granola Ăn Liền",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 500g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "G-ROOSTER",
    "packaging": "Hũ Nhựa Lớn 500g (Thùng 30 hũ)",
    "prices": {
      "retail": 158000,
      "wholesale1": 132000,
      "wholesale2": 120000,
      "wholesale3": 110000
    },
    "wholesalePrices": {
      "wholesale1": 3960000,
      "wholesale2": 3600000,
      "wholesale3": 3300000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 500g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "G-ROOSTER",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Granola Ăn Liền (Hũ Nhựa Lớn 500g) tuyển chọn cao cấp. Nguồn gốc G-ROOSTER minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Granola Ăn Liền nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m103",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Granola socola",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 500g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "G-ROOSTER",
    "packaging": "Hũ Nhựa Lớn 500g (Thùng 30 hũ)",
    "prices": {
      "retail": 158000,
      "wholesale1": 132000,
      "wholesale2": 120000,
      "wholesale3": 110000
    },
    "wholesalePrices": {
      "wholesale1": 3960000,
      "wholesale2": 3600000,
      "wholesale3": 3300000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 500g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "G-ROOSTER",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Granola socola (Hũ Nhựa Lớn 500g) tuyển chọn cao cấp. Nguồn gốc G-ROOSTER minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Granola socola nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m104",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Xoài Sấy Dẻo",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 45 hũ",
    "unitsPerWholesale": 45,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Nhựa Lớn 250g (Thùng 45 hũ)",
    "prices": {
      "retail": 96000,
      "wholesale1": 80000,
      "wholesale2": 72000,
      "wholesale3": 67000
    },
    "wholesalePrices": {
      "wholesale1": 3600000,
      "wholesale2": 3240000,
      "wholesale3": 3015000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 250g",
      "Đóng thùng": "45 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Xoài Sấy Dẻo (Hũ Nhựa Lớn 250g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Xoài Sấy Dẻo nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m105",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Mít sấy chân không",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Nhựa Lớn 200g (Thùng 30 hũ)",
    "prices": {
      "retail": 99000,
      "wholesale1": 83000,
      "wholesale2": 75000,
      "wholesale3": 69000
    },
    "wholesalePrices": {
      "wholesale1": 2490000,
      "wholesale2": 2250000,
      "wholesale3": 2070000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 200g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Mít sấy chân không (Hũ Nhựa Lớn 200g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Mít sấy chân không nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m106",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Granola Ăn Liền (Túi Zip)",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Túi Zip 500g",
    "retailUnit": "Túi",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 túi",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "G-ROOSTER",
    "packaging": "Túi Zip 500g (Thùng 30 túi)",
    "prices": {
      "retail": 239000,
      "wholesale1": 200000,
      "wholesale2": 181000,
      "wholesale3": 167000
    },
    "wholesalePrices": {
      "wholesale1": 6000000,
      "wholesale2": 5430000,
      "wholesale3": 5010000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Túi Zip 500g",
      "Đóng thùng": "30 túi/thùng",
      "Xuất xứ": "G-ROOSTER",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Granola Ăn Liền (Túi Zip) (Túi Zip 500g) tuyển chọn cao cấp. Nguồn gốc G-ROOSTER minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Granola Ăn Liền (Túi Zip) nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m107",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Xoài Sấy Dẻo",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 100g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hộp",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hộp Giấy 100g (Thùng 24 hộp)",
    "prices": {
      "retail": 51000,
      "wholesale1": 43000,
      "wholesale2": 39000,
      "wholesale3": 36000
    },
    "wholesalePrices": {
      "wholesale1": 1032000,
      "wholesale2": 936000,
      "wholesale3": 864000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 100g",
      "Đóng thùng": "24 hộp/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Xoài Sấy Dẻo (Hộp Giấy 100g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Xoài Sấy Dẻo nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m108",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Táo đỏ sấy khô",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hộp Giấy 150g",
    "retailUnit": "Hộp",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hộp",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Tân Cương",
    "packaging": "Hộp Giấy 150g (Thùng 24 hộp)",
    "prices": {
      "retail": 38000,
      "wholesale1": 32000,
      "wholesale2": 29000,
      "wholesale3": 26000
    },
    "wholesalePrices": {
      "wholesale1": 768000,
      "wholesale2": 696000,
      "wholesale3": 624000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hộp Giấy 150g",
      "Đóng thùng": "24 hộp/thùng",
      "Xuất xứ": "Tân Cương",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Táo đỏ sấy khô (Hộp Giấy 150g) tuyển chọn cao cấp. Nguồn gốc Tân Cương minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Táo đỏ sấy khô nguyên chất tuyển chọn.",
    "availableVariants": [
      "XANH",
      "ĐỎ",
      "VÀNG",
      "NGẪU NHIÊN"
    ]
  },
  {
    "id": "gr-m109",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Đỏ - Xoài sấy",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Tem Đỏ 200g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Việt Nam",
    "packaging": "Hũ Nhựa Tem Đỏ 200g (Thùng 30 hũ)",
    "prices": {
      "retail": 79000,
      "wholesale1": 66000,
      "wholesale2": 60000,
      "wholesale3": 55000
    },
    "wholesalePrices": {
      "wholesale1": 1980000,
      "wholesale2": 1800000,
      "wholesale3": 1650000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Tem Đỏ 200g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Việt Nam",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Đỏ - Xoài sấy (Hũ Nhựa Tem Đỏ 200g) tuyển chọn cao cấp. Nguồn gốc Việt Nam minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Đỏ nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m110",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Vàng - Granola",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Tem Vàng 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "G-ROOSTER",
    "packaging": "Hũ Nhựa Tem Vàng 250g (Thùng 30 hũ)",
    "prices": {
      "retail": 89000,
      "wholesale1": 75000,
      "wholesale2": 68000,
      "wholesale3": 62000
    },
    "wholesalePrices": {
      "wholesale1": 2250000,
      "wholesale2": 2040000,
      "wholesale3": 1860000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Tem Vàng 250g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "G-ROOSTER",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Vàng - Granola (Hũ Nhựa Tem Vàng 250g) tuyển chọn cao cấp. Nguồn gốc G-ROOSTER minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Vàng nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m111",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Bí xanh",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Thủy Tinh Lục Giác 250g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 24 hũ",
    "unitsPerWholesale": 24,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mông Cổ",
    "packaging": "Hũ Thủy Tinh Lục Giác 250g (Thùng 24 hũ)",
    "prices": {
      "retail": 92000,
      "wholesale1": 77000,
      "wholesale2": 70000,
      "wholesale3": 64000
    },
    "wholesalePrices": {
      "wholesale1": 1848000,
      "wholesale2": 1680000,
      "wholesale3": 1536000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Thủy Tinh Lục Giác 250g",
      "Đóng thùng": "24 hũ/thùng",
      "Xuất xứ": "Mông Cổ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Bí xanh (Hũ Thủy Tinh Lục Giác 250g) tuyển chọn cao cấp. Nguồn gốc Mông Cổ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Bí xanh nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m112",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Mix Hat",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Lớn 500g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "G-ROOSTER",
    "packaging": "Hũ Nhựa Lớn 500g (Thùng 30 hũ)",
    "prices": {
      "retail": 277000,
      "wholesale1": 232000,
      "wholesale2": 210000,
      "wholesale3": 193000
    },
    "wholesalePrices": {
      "wholesale1": 6960000,
      "wholesale2": 6300000,
      "wholesale3": 5790000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Lớn 500g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "G-ROOSTER",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Mix Hat (Hũ Nhựa Lớn 500g) tuyển chọn cao cấp. Nguồn gốc G-ROOSTER minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Mix Hat nguyên chất tuyển chọn."
  },
  {
    "id": "gr-m115",
    "partnerId": "hat-qua-kho",
    "partnerName": "Hạt & Quả Khô Dinh Dưỡng",
    "name": "Vàng - Bí xanh",
    "category": "Hạt & Quả Khô Dinh Dưỡng",
    "sector": "dac-san",
    "unit": "Hũ Nhựa Tem Vàng 300g",
    "retailUnit": "Hũ",
    "wholesaleUnit": "THÙNG",
    "wholesaleUnitLabel": "Thùng 30 hũ",
    "unitsPerWholesale": 30,
    "moq": 1,
    "stock": 100,
    "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
    "origin": "Mông Cổ",
    "packaging": "Hũ Nhựa Tem Vàng 300g (Thùng 30 hũ)",
    "prices": {
      "retail": 104000,
      "wholesale1": 87000,
      "wholesale2": 79000,
      "wholesale3": 72000
    },
    "wholesalePrices": {
      "wholesale1": 2610000,
      "wholesale2": 2370000,
      "wholesale3": 2160000
    },
    "tierRules": [
      {
        "tier": "retail",
        "minQty": 1,
        "label": "Giá Lẻ"
      },
      {
        "tier": "wholesale1",
        "minQty": 2,
        "label": "Sỉ Cấp 1 (Từ 2 Thùng)"
      },
      {
        "tier": "wholesale2",
        "minQty": 6,
        "label": "Sỉ Cấp 2 (Từ 6 Thùng)"
      },
      {
        "tier": "wholesale3",
        "minQty": 20,
        "label": "Sỉ Cấp 3 (Từ 20 Thùng)"
      }
    ],
    "specs": {
      "Quy cách": "Hũ Nhựa Tem Vàng 300g",
      "Đóng thùng": "30 hũ/thùng",
      "Xuất xứ": "Mông Cổ",
      "Đơn vị sỉ": "THÙNG",
      "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
    },
    "description": "Sản phẩm Vàng - Bí xanh (Hũ Nhựa Tem Vàng 300g) tuyển chọn cao cấp. Nguồn gốc Mông Cổ minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
    "shelfLife": "12 tháng kể từ ngày sản xuất",
    "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
    "ingredients": "100% Vàng nguyên chất tuyển chọn."
  }
];
export const PRODUCTS_MFOOD = PRODUCTS_PREMIUM_NUTS;
