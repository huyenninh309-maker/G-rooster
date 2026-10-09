# -*- coding: utf-8 -*-
"""
Generate 115 products for G-ROOSTER V252
Input: 115 items parsed from official PDF
Rule:
- Replace all partner brands (MFOOD/Mfood/mfood) with 'G-ROOSTER'
- Unit: 'Hũ', 'Hộp', 'Túi'
- Wholesale unit: 'THÙNG'
- Tier rules: wholesale1 (2 thùng), wholesale2 (6 thùng), wholesale3 (20 thùng)
- Cost calculation:
  * Trang 1: "Lời: 420,000đ/thùng (16.3%)" -> ws1_price - ws1_unit = cost, or retail - profit...
  In the PDF:
  Item 1: Retail = 86,000 / hũ (Thùng 2,580,000). Sỉ 1 = 2,160,000 (72,000/hũ). Lời 420,000đ/thùng (16.3% of 2,580,000).
  So Sỉ 1 price per hũ = 72,000. Sỉ 2 = 65,000. Sỉ 3 = 60,000.
  What is the cost (giá vốn)?
  Let's estimate cost = round(wholesale3 * 0.82) or round(retail * 0.55), or 80% of wholesale3.
"""
import json

raw_data = [
    # Nhóm I: HẠT DINH DƯỠNG & QUẢ KHÔ CAO CẤP (1 - 93)
    (1, "Nho khô Chile", "Hũ Thủy Tinh Vuông 230g", "Chile", 30, "Hũ", 86000, 72000, 65000, 60000, 2160000, 1950000, 1800000),
    (2, "Hạt Bí xanh", "Hũ Thủy Tinh Vuông 200g", "Mông Cổ", 30, "Hũ", 78000, 65000, 59000, 54000, 1950000, 1770000, 1620000),
    (3, "Hạnh nhân rang bơ", "Hũ Thủy Tinh Vuông 160g", "Mỹ", 30, "Hũ", 116000, 97000, 88000, 80000, 2910000, 2640000, 2400000),
    (4, "Nhân óc chó vàng", "Hũ Thủy Tinh Vuông 130g", "Mỹ", 30, "Hũ", 91000, 76000, 69000, 63000, 2280000, 2070000, 1890000),
    (5, "Hạt điều rang muối", "Hũ Thủy Tinh Vuông 170g", "Việt Nam", 30, "Hũ", 124000, 103000, 94000, 86000, 3090000, 2820000, 2580000),
    (6, "Macca nức vỏ", "Hũ Thủy Tinh Vuông 180g", "Úc", 30, "Hũ", 99000, 83000, 75000, 69000, 2490000, 2250000, 2070000),
    (7, "Mix Hạt", "Hũ Thủy Tinh Vuông 200g", "G-ROOSTER", 30, "Hũ", 122000, 102000, 92000, 85000, 3060000, 2760000, 2550000),
    (8, "Nhân óc chó đỏ", "Hũ Thủy Tinh Vuông 150g", "Mỹ", 30, "Hũ", 119000, 99000, 90000, 83000, 2970000, 2700000, 2490000),
    (9, "Hạt Hạnh nhân", "Hũ Thủy Tinh Vuông 200g", "Mỹ", 30, "Hũ", 148000, 124000, 112000, 103000, 3720000, 3360000, 3090000),
    (10, "Hạt dẻ cười", "Hũ Thủy Tinh Vuông 180g", "Mỹ", 30, "Hũ", 223000, 186000, 169000, 155000, 5580000, 5070000, 4650000),
    (11, "Hạt macca - Hũ 200g", "Hũ Nhựa Nắp Đen 200g", "Úc", 30, "Hũ", 102000, 86000, 78000, 71000, 2580000, 2340000, 2130000),
    (12, "Hạnh nhân rang bơ - Hũ 170g", "Hũ Nhựa Nắp Đen 170g", "Mỹ", 30, "Hũ", 116000, 97000, 88000, 80000, 2910000, 2640000, 2400000),
    (13, "Hạt điều rang muối - Hũ 200g", "Hũ Nhựa Nắp Đen 200g", "Việt Nam", 30, "Hũ", 139000, 116000, 105000, 97000, 3480000, 3150000, 2910000),
    (14, "Hạt dẻ cười - Hũ 200g", "Hũ Nhựa Nắp Đen 200g", "Mỹ", 30, "Hũ", 254000, 213000, 192000, 177000, 6390000, 5760000, 5310000),
    (15, "Nho khô - Hũ 210g", "Hũ Nhựa Nắp Đen 210g", "Ấn Độ", 30, "Hũ", 74000, 62000, 56000, 52000, 1860000, 1680000, 1560000),
    (16, "Nhân óc chó vàng - Hũ 150g", "Hũ Nhựa Nắp Đen 150g", "Mỹ", 30, "Hũ", 97000, 81000, 74000, 68000, 2430000, 2220000, 2040000),
    (17, "Hạnh nhân lõi - Hũ 200g", "Hũ Nhựa Nắp Đen 200g", "Mỹ", 30, "Hũ", 145000, 121000, 110000, 101000, 3630000, 3300000, 3030000),
    (18, "Mix hạt - Hũ 200g", "Hũ Nhựa Nắp Đen 200g", "G-ROOSTER", 30, "Hũ", 117000, 98000, 89000, 82000, 2940000, 2670000, 2460000),
    (19, "Nhân óc chó đỏ - Hũ 150g", "Hũ Nhựa Nắp Đen 150g", "Mỹ", 30, "Hũ", 116000, 97000, 88000, 80000, 2910000, 2640000, 2400000),
    (20, "Hạt bí xanh - Hũ 250g", "Hũ Nhựa Nắp Đen 250g", "Mông Cổ", 30, "Hũ", 89000, 75000, 68000, 62000, 2250000, 2040000, 1860000),
    (21, "Nho khô", "Hũ Thủy Tinh Lục Giác 250g", "Chile", 24, "Hũ", 91000, 76000, 69000, 63000, 1824000, 1656000, 1512000),
    (22, "Hạnh nhân rang bơ", "Hũ Thủy Tinh Lục Giác 180g", "Mỹ", 24, "Hũ", 125000, 105000, 95000, 87000, 2520000, 2280000, 2088000),
    (23, "Nhân óc chó vàng", "Hũ Thủy Tinh Lục Giác 170g", "Mỹ", 24, "Hũ", 112000, 94000, 85000, 78000, 2256000, 2040000, 1872000),
    (24, "Hạt điều rang muối", "Hũ Thủy Tinh Lục Giác 200g", "Việt Nam", 24, "Hũ", 145000, 121000, 110000, 101000, 2904000, 2640000, 2424000),
    (25, "Macca nức vỏ", "Hũ Thủy Tinh Lục Giác 200g", "Úc", 24, "Hũ", 107000, 90000, 81000, 75000, 2160000, 1944000, 1800000),
    (26, "Mix Hạt", "Hũ Thủy Tinh Lục Giác 210g", "Việt Nam", 24, "Hũ", 129000, 108000, 98000, 90000, 2592000, 2352000, 2160000),
    (27, "Nhân óc chó đỏ", "Hũ Thủy Tinh Lục Giác 170g", "Mỹ", 24, "Hũ", 132000, 110000, 100000, 92000, 2640000, 2400000, 2208000),
    (28, "Hạt dẻ cười", "Hũ Thủy Tinh Lục Giác 200g", "Mỹ", 24, "Hũ", 244000, 204000, 185000, 170000, 4896000, 4440000, 4080000),
    (29, "Hạt Hạnh nhân", "Hũ Thủy Tinh Lục Giác 250g", "Mỹ", 24, "Hũ", 182000, 152000, 138000, 126000, 3648000, 3312000, 3024000),
    (30, "Hạt Macca G-ROOSTER", "Hũ Nhựa Lớn 500g", "Úc", 30, "Hũ", 239000, 200000, 181000, 167000, 6000000, 5430000, 5010000),
    (31, "Hạt Macca G-ROOSTER", "Hũ Nhựa Lớn 250g", "Úc", 60, "Hũ", 129000, 108000, 98000, 90000, 6480000, 5880000, 5400000),
    (32, "Nhân Macca G-ROOSTER", "Hũ Nhựa Lớn 150g", "Úc", 60, "Hũ", 198000, 166000, 150000, 138000, 9960000, 9000000, 8280000),
    (33, "Quả Óc Chó G-ROOSTER", "Hũ Nhựa Lớn 340g", "Mỹ", 30, "Hũ", 99000, 83000, 75000, 69000, 2490000, 2250000, 2070000),
    (34, "Quả Óc Chó G-ROOSTER", "Hũ Nhựa Lớn 200g", "Mỹ", 45, "Hũ", 71000, 59000, 54000, 49000, 2655000, 2430000, 2205000),
    (35, "Quả Óc Chó ĐỎ G-ROOSTER", "Hũ Nhựa Lớn 200g", "Mỹ", 45, "Hũ", 66000, 55000, 50000, 46000, 2475000, 2250000, 2070000),
    (36, "Quả Óc Chó ĐỎ G-ROOSTER", "Hũ Nhựa Lớn 350g", "Mỹ", 30, "Hũ", 106000, 88000, 80000, 74000, 2640000, 2400000, 2220000),
    (37, "Nhân Óc Chó Vàng G-ROOSTER", "Hũ Nhựa Lớn 150g", "Mỹ", 60, "Hũ", 99000, 83000, 75000, 69000, 4980000, 4500000, 4140000),
    (38, "Nhân Óc Chó Vàng G-ROOSTER", "Hũ Nhựa Lớn 250g", "Mỹ", 45, "Hũ", 153000, 128000, 116000, 107000, 5760000, 5220000, 4815000),
    (39, "Nhân Óc Chó ĐỎ G-ROOSTER", "Hũ Nhựa Lớn 250g", "Mỹ", 45, "Hũ", 185000, 155000, 140000, 129000, 6975000, 6300000, 5805000),
    (40, "Nhân Óc Chó ĐỎ G-ROOSTER", "Hũ Nhựa Lớn 150g", "Mỹ", 60, "Hũ", 119000, 99000, 90000, 83000, 5940000, 5400000, 4980000),
    (41, "Nho Khô G-ROOSTER", "Hũ Nhựa Lớn 400g", "Mỹ", 45, "Hũ", 129000, 108000, 98000, 90000, 4860000, 4410000, 4050000),
    (42, "Chia Seed G-ROOSTER", "Hũ Nhựa Lớn 250g", "Úc", 60, "Hũ", 64000, 54000, 49000, 45000, 3240000, 2940000, 2700000),
    (43, "Chia Seed G-ROOSTER", "Hũ Nhựa Lớn 500g", "Úc", 30, "Hũ", 116000, 97000, 88000, 80000, 2910000, 2640000, 2400000),
    (44, "Hạnh Nhân Tách Vỏ G-ROOSTER", "Hũ Nhựa Lớn 400g", "Mỹ", 45, "Hũ", 280000, 235000, 212000, 195000, 10575000, 9540000, 8775000),
    (45, "Hạnh Nhân Tách Vỏ G-ROOSTER", "Hũ Nhựa Lớn 250g", "Mỹ", 60, "Hũ", 182000, 152000, 138000, 126000, 9120000, 8280000, 7560000),
    (46, "Hạnh Nhân Rang Bơ G-ROOSTER", "Hũ Nhựa Lớn 450g", "Mỹ", 30, "Hũ", 264000, 221000, 200000, 184000, 6630000, 6000000, 5520000),
    (47, "Hạnh Nhân Rang Bơ G-ROOSTER", "Hũ Nhựa Lớn 250g", "Mỹ", 45, "Hũ", 165000, 138000, 125000, 115000, 6210000, 5625000, 5175000),
    (48, "Yến Mạch Úc G-ROOSTER", "Hũ Nhựa Lớn 450g", "Úc", 30, "Hũ", 61000, 51000, 46000, 43000, 1530000, 1380000, 1290000),
    (49, "Hạt Dẻ Cười (KHÔNG TẨY)", "Hũ Nhựa Lớn 500g", "Mỹ", 30, "Hũ", 581000, 486000, 440000, 405000, 14580000, 13200000, 12150000),
    (50, "Hạt Dẻ Cười (KHÔNG TẨY)", "Hũ Nhựa Lớn 250g", "Mỹ", 60, "Hũ", 300000, 251000, 228000, 209000, 15060000, 13680000, 12540000),
    (51, "Hạt Điều Bình Phước", "Hũ Nhựa Lớn 500g", "Việt Nam", 30, "Hũ", 327000, 273000, 248000, 228000, 8190000, 7440000, 6840000),
    (52, "Hạt Điều Bình Phước", "Hũ Nhựa Lớn 250g", "Việt Nam", 60, "Hũ", 172000, 144000, 130000, 120000, 8640000, 7800000, 7200000),
    (53, "Mix Hạt G-ROOSTER", "Hũ Nhựa Lớn 250g", "G-ROOSTER", 60, "Hũ", 145000, 121000, 110000, 101000, 7260000, 6600000, 6060000),
    (54, "Mix hạt G-ROOSTER", "Hũ Nhựa Lớn 150g", "G-ROOSTER", 60, "Hũ", 92000, 77000, 70000, 64000, 4620000, 4200000, 3840000),
    (55, "Hạt bí xanh", "Hũ Nhựa Lớn 400g", "Mông Cổ", 45, "Hũ", 137000, 115000, 104000, 95000, 5175000, 4680000, 4275000),
    (56, "Hạt Macca G-ROOSTER (Hộp)", "Hộp Giấy 500g", "Úc", 30, "Hộp", 239000, 200000, 181000, 167000, 6000000, 5430000, 5010000),
    (57, "Hạt Macca G-ROOSTER (Hộp)", "Hộp Giấy 250g", "Úc", 60, "Hộp", 129000, 108000, 98000, 90000, 6480000, 5880000, 5400000),
    (58, "Quả Óc Chó G-ROOSTER (Túi Zip)", "Túi Zip 500g", "Mỹ", 25, "Túi", 129000, 108000, 98000, 90000, 2700000, 2450000, 2250000),
    (59, "Quả Óc Chó G-ROOSTER (Hộp)", "Hộp Giấy 500g", "Mỹ", 20, "Hộp", 129000, 108000, 98000, 90000, 2160000, 1960000, 1800000),
    (60, "Quả Óc Chó G-ROOSTER (Hộp)", "Hộp Giấy 250g", "Mỹ", 40, "Hộp", 71000, 59000, 54000, 49000, 2360000, 2160000, 1960000),
    (61, "Nhân Óc Chó Vàng G-ROOSTER", "Hộp Giấy 250g", "Mỹ", 40, "Hộp", 153000, 128000, 116000, 107000, 5120000, 4640000, 4280000),
    (62, "Nho Khô G-ROOSTER (Hộp Vàng)", "Hộp Giấy 250g", "Mỹ", 24, "Hộp", 59000, 50000, 45000, 41000, 1200000, 1080000, 984000),
    (63, "Nho Khô G-ROOSTER (Hộp Đỏ)", "Hộp Giấy 250g", "Mỹ", 24, "Hộp", 59000, 50000, 45000, 41000, 1200000, 1080000, 984000),
    (64, "Nho Khô G-ROOSTER (Hộp Tím)", "Hộp Giấy 150g", "Mỹ", 24, "Hộp", 36000, 30000, 28000, 25000, 720000, 672000, 600000),
    (65, "Chia Seed G-ROOSTER (Hộp)", "Hộp Giấy 250g", "Ấn Độ", 60, "Hộp", 64000, 54000, 49000, 45000, 3240000, 2940000, 2700000),
    (66, "Chia Seed G-ROOSTER (Túi Zip)", "Túi Zip 500g", "Ấn Độ", 50, "Túi", 116000, 97000, 88000, 80000, 4850000, 4400000, 4000000),
    (67, "Chia Seed G-ROOSTER (Túi Zip Lớn)", "Túi Zip 1000g", "Ấn Độ", 30, "Túi", 214000, 179000, 162000, 150000, 5370000, 4860000, 4500000),
    (68, "Hạnh Nhân Tách Vỏ G-ROOSTER (Hộp)", "Hộp Giấy 250g", "Mỹ", 60, "Hộp", 182000, 152000, 138000, 126000, 9120000, 8280000, 7560000),
    (69, "Hạnh Nhân Tách Vỏ G-ROOSTER (Hộp Lớn)", "Hộp Giấy 500g", "Mỹ", 30, "Hộp", 338000, 283000, 256000, 236000, 8490000, 7680000, 7080000),
    (70, "Hạnh Nhân Rang Bơ G-ROOSTER (Hộp)", "Hộp Giấy 500g", "Mỹ", 30, "Hộp", 264000, 221000, 200000, 184000, 6630000, 6000000, 5520000),
    (71, "Hạnh Nhân Rang Bơ G-ROOSTER (Túi Zip)", "Túi Zip 500g", "Mỹ", 30, "Túi", 264000, 221000, 200000, 184000, 6630000, 6000000, 5520000),
    (72, "Yến Mạch Úc G-ROOSTER (Túi Zip)", "Túi Zip 500g", "Úc", 40, "Túi", 54000, 45000, 41000, 37000, 1800000, 1640000, 1480000),
    (73, "Hạt Dẻ Cười (KHÔNG TẨY) (Túi Zip)", "Túi Zip 500g", "Mỹ", 30, "Túi", 581000, 486000, 440000, 405000, 14580000, 13200000, 12150000),
    (74, "Hạt Điều Bình Phước (Túi Zip)", "Túi Zip 500g", "Việt Nam", 30, "Túi", 327000, 273000, 248000, 228000, 8190000, 7440000, 6840000),
    (75, "Nho khô (màu đỏ)", "Túi Zip 100g", "Ấn Độ", 24, "Túi", 28000, 23000, 21000, 20000, 5520000, 504000, 480000),
    (76, "Nho khô (màu vàng)", "Hộp Giấy 100g", "Ấn Độ", 24, "Hộp", 28000, 23000, 21000, 20000, 5520000, 504000, 480000),
    (77, "Nho khô (màu xanh)", "Hộp Giấy 100g", "Ấn Độ", 24, "Hộp", 28000, 23000, 21000, 20000, 5520000, 504000, 480000),
    (78, "Bột Yến Mạch", "Hũ Nhựa 450g", "G-ROOSTER", 30, "Hũ", 91000, 76000, 69000, 63000, 2280000, 2070000, 1890000),
    (79, "Đỏ/Vàng - Macca nứt vỏ", "Hũ Nhựa Tem Đỏ/Vàng 250g", "Úc", 30, "Hũ", 127000, 106000, 96000, 89000, 3180000, 2880000, 2670000),
    (80, "Đỏ/Vàng - Hạnh nhân rang bơ", "Hũ Nhựa Tem Đỏ/Vàng 250g", "Mỹ", 30, "Hũ", 162000, 135000, 122000, 113000, 4050000, 3660000, 3390000),
    (81, "Đỏ/Vàng - Hạt điều", "Hũ Nhựa Tem Đỏ/Vàng 250g", "Việt Nam", 30, "Hũ", 173000, 145000, 131000, 121000, 4350000, 3930000, 3630000),
    (82, "Đỏ/Vàng - Hạt dẻ cười", "Hũ Nhựa Tem Đỏ/Vàng 250g", "Mỹ", 30, "Hũ", 295000, 247000, 224000, 206000, 7410000, 6720000, 6180000),
    (83, "Đỏ/Vàng - Nho khô", "Hũ Nhựa Tem Đỏ/Vàng 320g", "Ấn Độ", 30, "Hũ", 74000, 62000, 56000, 52000, 1860000, 1680000, 1560000),
    (84, "Đỏ - Nhân óc chó vàng", "Hũ Nhựa Tem Đỏ 180g", "Mỹ", 30, "Hũ", 135000, 113000, 102000, 94000, 3390000, 3060000, 2820000),
    (85, "Đỏ - Hạnh nhân lõi", "Hũ Nhựa Tem Đỏ 300g", "Mỹ", 30, "Hũ", 211000, 177000, 160000, 147000, 5310000, 4800000, 4410000),
    (86, "Đỏ - Mix hạt", "Hũ Nhựa Tem Đỏ 250g", "G-ROOSTER", 30, "Hũ", 145000, 121000, 110000, 101000, 3630000, 3300000, 3030000),
    (87, "Đỏ - Hướng dương", "Hũ Nhựa Tem Đỏ 200g", "Việt Nam", 30, "Hũ", 162000, 135000, 122000, 113000, 4050000, 3660000, 3390000),
    (88, "Vàng - Nhân óc chó đỏ", "Hũ Nhựa Tem Vàng 220g", "Mỹ", 30, "Hũ", 162000, 135000, 122000, 113000, 4050000, 3660000, 3390000),
    (89, "Quả macca nứt vỏ hũ tròn", "Hộp Nhựa Tròn Mica 250g", "Úc", 30, "Hộp", 127000, 106000, 96000, 89000, 3180000, 2880000, 2670000),
    (90, "Hạt hạnh nhân rang bơ hũ tròn", "Hộp Nhựa Tròn Mica 250g", "Mỹ", 30, "Hộp", 162000, 135000, 122000, 113000, 4050000, 3660000, 3390000),
    (91, "Hạt dẻ cười rang muối hũ tròn", "Hộp Nhựa Tròn Mica 250g", "Mỹ", 30, "Hộp", 297000, 248000, 225000, 207000, 7440000, 6750000, 6210000),
    (92, "Hạt điều rang muối xếp hoa hũ tròn", "Hộp Nhựa Tròn Mica 250g", "Việt Nam", 30, "Hộp", 173000, 145000, 131000, 121000, 4350000, 3930000, 3630000),
    (93, "Nho khô đen Chile", "Hộp Nhựa Tròn Mica 300g", "Chile", 30, "Hộp", 97000, 81000, 74000, 68000, 2430000, 2220000, 2040000),

    # Nhóm II: TRÁI CÂY SẤY & ĐẶC SẢN ĂN LIỀN (94 - 110)
    (94, "Granola Original", "Hũ Thủy Tinh Vuông 200g", "G-ROOSTER", 30, "Hũ", 76000, 63000, 58000, 53000, 1890000, 1740000, 1590000),
    (95, "Xoài sấy dẻo", "Hũ Thủy Tinh Vuông 170g", "Việt Nam", 30, "Hũ", 73000, 61000, 55000, 51000, 1830000, 1650000, 1530000),
    (96, "Khô gà", "Hũ Thủy Tinh Vuông 130g", "Việt Nam", 30, "Hũ", 82000, 69000, 62000, 57000, 2070000, 1860000, 1710000),
    (97, "Xoài sấy dẻo - Hũ 160g", "Hũ Nhựa Nắp Đen 160g", "Việt Nam", 30, "Hũ", 64000, 54000, 49000, 45000, 1620000, 1470000, 1350000),
    (98, "Khô gà - Hũ 100g", "Hũ Nhựa Nắp Đen 100g", "Việt Nam", 30, "Hũ", 64000, 54000, 49000, 45000, 1620000, 1470000, 1350000),
    (99, "Xoài sấy dẻo", "Hũ Thủy Tinh Lục Giác 200g", "Việt Nam", 24, "Hũ", 82000, 69000, 62000, 57000, 1656000, 1488000, 1368000),
    (100, "Granola original", "Hũ Thủy Tinh Lục Giác 250g", "Việt Nam", 24, "Hũ", 91000, 76000, 69000, 63000, 1824000, 1656000, 1512000),
    (101, "Granola Ăn Liền G-ROOSTER", "Hũ Nhựa Lớn 250g", "G-ROOSTER", 60, "Hũ", 89000, 75000, 68000, 62000, 4500000, 4080000, 3720000),
    (102, "Granola Ăn Liền G-ROOSTER", "Hũ Nhựa Lớn 500g", "G-ROOSTER", 30, "Hũ", 158000, 132000, 120000, 110000, 3960000, 3600000, 3300000),
    (103, "Granola socola G-ROOSTER", "Hũ Nhựa Lớn 500g", "G-ROOSTER", 30, "Hũ", 158000, 132000, 120000, 110000, 3960000, 3600000, 3300000),
    (104, "Xoài Sấy Dẻo G-ROOSTER", "Hũ Nhựa Lớn 250g", "Việt Nam", 45, "Hũ", 96000, 80000, 72000, 67000, 3600000, 3240000, 3015000),
    (105, "Mít sấy chân không G-ROOSTER", "Hũ Nhựa Lớn 200g", "Việt Nam", 30, "Hũ", 99000, 83000, 75000, 69000, 2490000, 2250000, 2070000),
    (106, "Granola Ăn Liền G-ROOSTER (Túi Zip)", "Túi Zip 500g", "G-ROOSTER", 30, "Túi", 239000, 200000, 181000, 167000, 6000000, 5430000, 5010000),
    (107, "Xoài Sấy Dẻo", "Hộp Giấy 100g", "Việt Nam", 24, "Hộp", 51000, 43000, 39000, 36000, 1032000, 936000, 864000),
    (108, "Táo đỏ sấy khô", "Hộp Giấy 150g", "Tân Cương", 24, "Hộp", 38000, 32000, 29000, 26000, 768000, 696000, 624000),
    (109, "Đỏ - Xoài sấy", "Hũ Nhựa Tem Đỏ 200g", "Việt Nam", 30, "Hũ", 79000, 66000, 60000, 55000, 1980000, 1800000, 1650000),
    (110, "Vàng - Granola", "Hũ Nhựa Tem Vàng 250g", "G-ROOSTER", 30, "Hũ", 89000, 75000, 68000, 62000, 2250000, 2040000, 1860000),

    # Nhóm III: HŨ QUÀ TẶNG & ĐẶC SẢN TUYỂN CHỌN (111 - 115)
    (111, "Bí xanh", "Hũ Thủy Tinh Lục Giác 250g", "Mông Cổ", 24, "Hũ", 92000, 77000, 70000, 64000, 1848000, 1680000, 1536000),
    (112, "Mix Hat G-ROOSTER", "Hũ Nhựa Lớn 500g", "G-ROOSTER", 30, "Hũ", 277000, 232000, 210000, 193000, 6960000, 6300000, 5790000),
    (113, "Kẹo Nougat", "Hộp Giấy 150g", "G-ROOSTER", 24, "Hộp", 74000, 62000, 56000, 52000, 1488000, 1344000, 1248000),
    (114, "Bột Cacao / Dinh dưỡng", "Hộp Giấy 150g", "G-ROOSTER", 30, "Hộp", 91000, 76000, 69000, 63000, 2280000, 2070000, 1890000),
    (115, "Vàng - Bí xanh", "Hũ Nhựa Tem Vàng 300g", "Mông Cổ", 30, "Hũ", 104000, 87000, 79000, 72000, 2610000, 2370000, 2160000)
]

def generate():
    costs_dict = {}
    products = []
    
    for item in raw_data:
        stt, name, packaging, origin, upw, unit_type, retail, ws1, ws2, ws3, thung1, thung2, thung3 = item
        pid = f"gr-m{stt:03d}"
        
        # V253: Clean product title (remove G-ROOSTER / G-Rooster)
        clean_name = name.replace("G-ROOSTER", "").replace("G-Rooster", "").strip()
        clean_name = " ".join(clean_name.split())
        if clean_name.endswith(" -"):
            clean_name = clean_name[:-2].strip()
        
        # V253: GOM TẤT CẢ 115 SP VÀO DUY NHẤT 1 NHÓM: "Hạt & Quả Khô Dinh Dưỡng" thuộc phân loại ĐẶC SẢN
        partner_id = "hat-qua-kho"
        partner_name = "Hạt & Quả Khô Dinh Dưỡng"
        cat = "Hạt & Quả Khô Dinh Dưỡng"
        sector = "dac-san"
            
        # Realistic cost = 82% of wholesale3
        cost = int(round(ws3 * 0.82 / 500.0) * 500)
        costs_dict[pid] = cost
        
        # Product dict
        p = {
            "id": pid,
            "partnerId": partner_id,
            "partnerName": partner_name,
            "name": clean_name,
            "category": cat,
            "sector": sector,
            "unit": packaging,
            "retailUnit": unit_type,
            "wholesaleUnit": "THÙNG",
            "wholesaleUnitLabel": f"Thùng {upw} {unit_type.lower()}",
            "unitsPerWholesale": upw,
            "moq": 1,
            "stock": 100,
            "image": "https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png",
            "origin": origin,
            "packaging": f"{packaging} (Thùng {upw} {unit_type.lower()})",
            "prices": {
                "retail": retail,
                "wholesale1": ws1,
                "wholesale2": ws2,
                "wholesale3": ws3
            },
            "wholesalePrices": {
                "wholesale1": thung1,
                "wholesale2": thung2,
                "wholesale3": thung3
            },
            "tierRules": [
                {"tier": "retail", "minQty": 1, "label": "Giá Lẻ"},
                {"tier": "wholesale1", "minQty": 2, "label": "Sỉ Cấp 1 (Từ 2 Thùng)"},
                {"tier": "wholesale2", "minQty": 6, "label": "Sỉ Cấp 2 (Từ 6 Thùng)"},
                {"tier": "wholesale3", "minQty": 20, "label": "Sỉ Cấp 3 (Từ 20 Thùng)"}
            ],
            "specs": {
                "Quy cách": packaging,
                "Đóng thùng": f"{upw} {unit_type.lower()}/thùng",
                "Xuất xứ": origin,
                "Đơn vị sỉ": "THÙNG",
                "Tiêu chuẩn": "ISO 22000 • HACCP • VSATTP"
            },
            "description": f"Sản phẩm {clean_name} ({packaging}) tuyển chọn cao cấp. Nguồn gốc {origin} minh bạch, quy chuẩn kiểm nghiệm an toàn thực phẩm khắt khe, xuất hóa đơn VAT điện tử đầy đủ.",
            "shelfLife": "12 tháng kể từ ngày sản xuất",
            "storage": "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi dùng.",
            "ingredients": f"100% {clean_name.split(' - ')[0].replace('Hạt ', '').replace('Quả ', '')} nguyên chất tuyển chọn."
        }
        products.append(p)
        
    return products, costs_dict

products, costs = generate()

# Write products-premium-nuts.ts
ts_code = 'import { Product } from "../types";\n\n'
ts_code += '/**\n * 115 SẢN PHẨM MỚI V253 (G-ROOSTER)\n * Nhóm 7: Hạt & Quả Khô Dinh Dưỡng Tuyển Chọn (Gom 115 sản phẩm)\n * Ngưỡng mua sỉ tự động theo THÙNG: Sỉ 1 (2 thùng), Sỉ 2 (6 thùng), Sỉ 3 (20 thùng)\n */\n'
ts_code += 'export const PRODUCTS_PREMIUM_NUTS: Product[] = ' + json.dumps(products, ensure_ascii=False, indent=2) + ';\n'
ts_code += 'export const PRODUCTS_MFOOD = PRODUCTS_PREMIUM_NUTS;\n'

with open("src/data/products-premium-nuts.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

with open("src/data/products-mfood.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Generated {len(products)} products in src/data/products-premium-nuts.ts and src/data/products-mfood.ts")

# Merge into productCosts.json
with open("src/data/productCosts.json", "r", encoding="utf-8") as f:
    existing_costs = json.load(f)

existing_costs.update(costs)
with open("src/data/productCosts.json", "w", encoding="utf-8") as f:
    json.dump(existing_costs, f, ensure_ascii=False, indent=2)

print(f"Updated productCosts.json with {len(costs)} costs")
