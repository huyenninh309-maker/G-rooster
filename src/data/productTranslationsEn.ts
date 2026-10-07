import { ProductHealthBenefit } from '../types';

/**
 * G-ROOSTER CO., LTD - COMPLETE ENGLISH TRANSLATION DATASET
 * 100% Fluent, Professional B2B / Export Grade English Translations
 * Covers all 133 Products: Names, Descriptions, Ingredients, Packaging, and 14 Health Benefits.
 */

export const SPECIFIC_PRODUCT_NAMES: Record<string, string> = {
  // 1. Matcha & Cascara (10 Products)
  'vtn-matcha-laka-ceremonial': 'Ceremonial Matcha Powder (Grade 1 - Ceremonial)',
  'vtn-matcha-laka-premium': 'Premium Matcha Powder (Grade 2 - Barista)',
  'vtn-matcha-laka-culinary': 'Culinary Matcha Powder (Grade 3 - Kitchen & Bakery)',
  'vtn-tra-xa-den': 'Black Celastrus Herbal Tea (Hoa Binh Origin)',
  'vtn-cascara-original': 'Cau Dat Cascara Tea - Original Sun-Dried Cherry Husk',
  'vtn-cascara-truyen-thong': 'Cau Dat Cascara Tea - Original Sun-Dried Cherry Husk',
  'vtn-cascara-dao': 'Cau Dat Cascara Tea - Natural Peach Infusion',
  'vtn-cascara-cam-que': 'Cau Dat Cascara Tea - Orange Peel & Cinnamon Bark',
  'vtn-cascara-gung': 'Cau Dat Cascara Tea - Mountain Ginger Infusion',
  'vtn-syrup-cascara-1000ml': 'Specialty Cascara Coffee Cherry Fruit Concentrate 1000ml (PET Bottle)',
  'vtn-syrup-cascara-700ml': 'Specialty Cascara Coffee Cherry Fruit Concentrate 700ml (Glass Bottle)',

  // 2. Frozen Sugarcane Juice (1 Product)
  'vua-mia-tuyet-350ml': 'IQF Cane Snow® Natural Frozen Sugarcane Juice (Carton of 28 Packs)',

  // 3. Ngoc Linh Codonopsis & Herbs (16 Products)
  'dato-tra-sam-day': 'Ngoc Linh Codonopsis Tea (Dang Shen)',
  'dato-tra-sam-lac-tien': 'Codonopsis & Wild Passionflower Herbal Sleep Tea',
  'dato-tra-sam-gung': 'Codonopsis & Mountain Ginger Warming Vitality Tea',
  'dato-tra-gung-nhan-sam': 'Codonopsis & Mountain Ginger Warming Vitality Tea',
  'dato-tra-kho-qua-rung': 'Wild Bitter Melon Herbal Tea (Blood Sugar Balance)',
  'dato-tinh-chat-sam-day-mat-ong-500ml': 'Ngoc Linh Codonopsis & Wild Honey Tonic Extract 500ml',
  'dato-tinh-chat-sam-day-mat-ong-250ml': 'Ngoc Linh Codonopsis & Wild Honey Tonic Extract 250ml',
  'dato-tinh-chat-sam-day-200g': 'Ngoc Linh Codonopsis & Wild Honey Tonic Extract (200g Box)',
  'dato-tinh-chat-sam-day-400g': 'Ngoc Linh Codonopsis & Wild Honey Tonic Extract (400g Box)',
  'dato-tinh-chat-chanh-day-mat-ong-500ml': 'Purple Passion Fruit & Wild Honey Extract 500ml',
  'dato-tinh-chat-chanh-day-mat-ong-250ml': 'Purple Passion Fruit & Wild Honey Extract 250ml',
  'dato-tinh-chat-chanh-day-200g': 'Purple Passion Fruit & Wild Honey Extract (200g Box)',
  'dato-tinh-chat-chanh-day-400g': 'Purple Passion Fruit & Wild Honey Extract (400g Box)',
  'dato-tinh-chat-gung-mat-ong-500ml': 'Mountain Ginger & Wild Honey Warming Extract 500ml',
  'dato-tinh-chat-gung-mat-ong-250ml': 'Mountain Ginger & Wild Honey Warming Extract 250ml',
  'dato-tinh-chat-gung-200g': 'Mountain Ginger & Wild Honey Warming Extract (200g Box)',
  'dato-tinh-chat-gung-400g': 'Mountain Ginger & Wild Honey Warming Extract (400g Box)',
  'dato-tinh-chat-nghe-mat-ong-500ml': 'Red Turmeric Curcumin & Wild Honey Tonic Extract 500ml',
  'dato-tinh-chat-nghe-mat-ong-250ml': 'Red Turmeric Curcumin & Wild Honey Tonic Extract 250ml',
  'dato-tinh-chat-nghe-200g': 'Red Turmeric Curcumin & Wild Honey Tonic Extract (200g Box)',
  'dato-tinh-chat-nghe-400g': 'Red Turmeric Curcumin & Wild Honey Tonic Extract (400g Box)',
  'dato-mut-sam-day-150g': 'Candied Ngoc Linh Codonopsis Root Slices 150g',
  'dato-mut-sam-day-100g': 'Candied Ngoc Linh Codonopsis Root Slices 100g',
  'dato-sam-day-kho-1kg': 'Pure Dried Ngoc Linh Codonopsis Roots (1kg Box)',
  'dato-sam-day-kho-500g': 'Pure Dried Ngoc Linh Codonopsis Roots (500g Bag)',
  'dato-sam-day-kho-100g': 'Pure Dried Ngoc Linh Codonopsis Roots (100g Bag)',

  // 4. Coffee Cubes & Specialty Beans (26 Products)
  'nonla-vien-01-suadua': 'Freeze-Dried Coffee Cube - Coconut Milk (Single Box)',
  'nonla-vien-01-cacao': 'Freeze-Dried Coffee Cube - Cocoa (Single Box)',
  'nonla-vien-01-chanh': 'Freeze-Dried Coffee Cube - Lemon (Single Box)',
  'nonla-vien-01-kemtrung': 'Freeze-Dried Coffee Cube - Egg Cream (Single Box)',
  'nonla-vien-01-muoi': 'Freeze-Dried Coffee Cube - Salted Cream (Single Box)',
  'nonla-vien-01-saurieng': 'Freeze-Dried Coffee Cube - Durian (Single Box)',
  'nonla-vien-01-americano': 'Freeze-Dried Coffee Cube - Level 6 Americano (Single Box)',
  'nonla-vien-08-suadua': 'Freeze-Dried Coffee Cubes - Coconut Milk (8-Cube Box)',
  'nonla-vien-08-cacao': 'Freeze-Dried Coffee Cubes - Cocoa (8-Cube Box)',
  'nonla-vien-08-chanh': 'Freeze-Dried Coffee Cubes - Lemon (8-Cube Box)',
  'nonla-vien-08-kemtrung': 'Freeze-Dried Coffee Cubes - Egg Cream (8-Cube Box)',
  'nonla-vien-08-muoi': 'Freeze-Dried Coffee Cubes - Salted Cream (8-Cube Box)',
  'nonla-vien-08-saurieng': 'Freeze-Dried Coffee Cubes - Durian (8-Cube Box)',
  'nonla-vien-08-americano': 'Freeze-Dried Coffee Cubes - Level 6 Americano (8-Cube Box)',
  'nonla-hop-08-mix': 'Freeze-Dried Coffee Cubes - Assorted Flavors (8-Cube Box)',
  'nonla-hop-18-mix': 'Freeze-Dried Coffee Cubes - Assorted Flavors (18-Cube Box)',
  'nonla-hop-24-mix': 'Freeze-Dried Coffee Cubes - Assorted Flavors (24-Cube Box)',
  'nonla-hop-42-mix': 'Freeze-Dried Coffee Cubes - Assorted Flavors (42-Cube Master Box)',
  'nonla-tui-200g-hat': 'Artisanal Whole Roasted Coffee Beans (200g Bag)',
  'nonla-tui-200g-bot': 'Artisanal Ground Roasted Coffee (200g Bag)',
  'aodai-hop-03-vien': 'Ao Dai Heritage Coffee Cubes (3-Cube Box)',
  'aodai-hop-06-vien': 'Ao Dai Heritage Coffee Cubes (6-Cube Box)',
  'aodai-hop-08-cacao': 'Ao Dai Heritage Cocoa Cubes (8-Cube Box)',
  'aodai-hop-12-vien': 'Ao Dai Heritage Coffee Cubes (12-Cube Gift Box)',
  'aodai-hop-50-cacao': 'Ao Dai Heritage Cocoa Cubes (50-Cube Bulk Box)',
  'aodai-hop-50-caphe': 'Ao Dai Heritage Coffee Cubes (50-Cube Bulk Box)',

  // 5. Meat Floss & Specialty Jerky (9 Products)
  'phu-nha-cha-bong-heo-nuoc-mam': 'Traditional First-Press Fish Sauce Pork Floss',
  'phu-nha-cha-bong-heo-khong-duong': 'Zero-Sugar Keto Artisanal Pork Floss',
  'phu-nha-cha-bong-heo-thuong-hang': 'Superb Hand-Roasted Golden Pork Floss',
  'phu-nha-cha-bong-heo-nhuyen': 'Finely Shredded Tender Pork Floss for Babies & Elders',
  'phu-nha-cha-bong-heo-cao-cap': 'Premium Lean Pork Floss for Bakeries & Gourmet Dining',
  'phu-nha-cha-bong-ga': 'Crispy Golden Chicken Breast Floss',
  'phu-nha-cha-bong-ga-hanh-phi': 'Crispy Fried Shallot Golden Chicken Floss',
  'phu-nha-kho-ga-la-chanh': 'Dried Chicken with Crispy Kaffir Lime Leaves',
  'phu-nha-kho-heo-chay-toi': 'Crispy Garlic & Chili Tender Pork Jerky',

  // 6. Artisanal Chocolates & Nutrition (71 Products)
  'socola-den-100-khong-duong-20g': '100% Sugar-Free Artisanal Dark Chocolate 20g',
  'socola-den-100-khong-duong-50g': '100% Sugar-Free Artisanal Dark Chocolate 50g',
  'socola-den-100-khong-duong-100g': '100% Sugar-Free Artisanal Dark Chocolate 100g',
  'socola-den-100-duong-an-kieng-20g': '100% Dark Chocolate with Isomalt Sweetener 20g',
  'socola-den-100-duong-an-kieng-50g': '100% Dark Chocolate with Isomalt Sweetener 50g',
  'socola-den-90-cacao-20g': '90% Cacao Low-Sugar Dark Chocolate 20g',
  'socola-den-90-cacao-50g': '90% Cacao Low-Sugar Dark Chocolate 50g',
  'socola-den-85-cacao-20g': '85% Cacao Low-Sugar Dark Chocolate 20g',
  'socola-den-85-cacao-50g': '85% Cacao Low-Sugar Dark Chocolate 50g',
  'socola-den-85-cacao-100g': '85% Cacao Low-Sugar Dark Chocolate 100g',
  'socola-den-70-cacao-20g': '70% Cacao Artisanal Dark Chocolate 20g',
  'socola-den-70-cacao-50g': '70% Cacao Artisanal Dark Chocolate 50g',
  'socola-den-70-cacao-100g': '70% Cacao Artisanal Dark Chocolate 100g',
  'set-qua-tang-chocolate-hoi-an-50g': 'Hoi An Heritage Chocolate Gift Set (6 Pieces) 50g',
  'set-qua-tang-chocolate-sai-gon-50g': 'Saigon Heritage Chocolate Gift Set (6 Pieces) 50g',
  'set-qua-tang-chocolate-phu-quoc-50g': 'Phu Quoc Island Chocolate Gift Set (6 Pieces) 50g',
  'set-qua-tang-chocolate-tay-bac-50g': 'Northwest Highlands Chocolate Gift Set (6 Pieces) 50g',
  'set-qua-tang-chocolate-non-la-vang-250g': 'Golden Conical Hat Artisanal Chocolate Gift Box 250g',
  'set-qua-tang-chocolate-non-la-trang-250g': 'Pure White Conical Hat Artisanal Chocolate Gift Box 250g',
  'set-qua-tang-chocolate-non-la-tphcm-150g': 'Ho Chi Minh City Landmark Conical Hat Chocolate Box 150g',
  'set-qua-tang-chocolate-non-la-ha-noi-150g': 'Hanoi Landmark Conical Hat Chocolate Box 150g',
  'set-qua-tang-chocolate-non-la-ha-long-150g': 'Ha Long Bay Conical Hat Chocolate Box 150g',
  'set-qua-tang-chocolate-non-la-da-nang-150g': 'Da Nang Landmark Conical Hat Chocolate Box 150g',
  'set-qua-tang-chocolate-non-la-ben-tre-150g': 'Ben Tre Coconut Conical Hat Chocolate Box 150g',
  'set-qua-tang-chocolate-non-la-hoi-an-150g': 'Hoi An Ancient Town Conical Hat Chocolate Box 150g',
  'socola-sua-khong-nhan-20g': 'Classic Velvet Milk Chocolate 20g',
  'socola-sua-khong-nhan-50g': 'Classic Velvet Milk Chocolate 50g',
  'socola-sua-hanh-nhan-20g': 'Roasted California Almond Milk Chocolate 20g',
  'socola-sua-hanh-nhan-50g': 'Roasted California Almond Milk Chocolate 50g',
  'socola-sua-hat-dieu-20g': 'Toasted Binh Phuoc Cashew Milk Chocolate 20g',
  'socola-sua-hat-dieu-50g': 'Toasted Binh Phuoc Cashew Milk Chocolate 50g',
  'socola-sua-dua-20g': 'Toasted Ben Tre Coconut Flake Milk Chocolate 20g',
  'socola-sua-dua-50g': 'Toasted Ben Tre Coconut Flake Milk Chocolate 50g',
  'socola-sua-cacao-nibs-20g': 'Crunchy Ben Tre Roasted Cocoa Nibs Milk Chocolate 20g',
  'socola-sua-cacao-nibs-50g': 'Crunchy Ben Tre Roasted Cocoa Nibs Milk Chocolate 50g',
  'socola-sua-nho-kho-20g': 'Sun-Dried Raisin Milk Chocolate 20g',
  'socola-sua-nho-kho-50g': 'Sun-Dried Raisin Milk Chocolate 50g',
  'socola-sua-cookie-20g': 'Crispy Butter Cookie Crunch Milk Chocolate 20g',
  'socola-sua-cookie-50g': 'Crispy Butter Cookie Crunch Milk Chocolate 50g',
  'socola-sua-pho-mai-20g': 'Cheddar Cheese Wafer Crisp Milk Chocolate 20g',
  'socola-sua-pho-mai-50g': 'Cheddar Cheese Wafer Crisp Milk Chocolate 50g',
  'socola-sua-hanh-nhan-non-la-50g': 'Roasted Almond Milk Chocolate (Conical Hat Edition) 50g',
  'socola-sua-cacao-nibs-non-la-50g': 'Crunchy Cocoa Nibs Milk Chocolate (Conical Hat Edition) 50g',
  'socola-sua-khong-nhan-non-la-50g': 'Classic Milk Chocolate (Conical Hat Edition) 50g',
  'socola-sua-pho-mai-non-la-50g': 'Cheddar Cheese Wafer Milk Chocolate (Conical Hat Edition) 50g',
  'socola-sua-dua-non-la-50g': 'Coconut Flake Milk Chocolate (Conical Hat Edition) 50g',
  'keo-chocolate-da-nang-80g': 'Da Nang Dragon Bridge Artisan Chocolate Souvenir Box 80g',
  'keo-chocolate-hue-80g': 'Hue Imperial Citadel Artisan Chocolate Souvenir Box 80g',
  'keo-chocolate-hoi-an-80g': 'Hoi An Lantern Town Artisan Chocolate Souvenir Box 80g',
  'keo-chocolate-phu-quoc-80g': 'Phu Quoc Pearl Island Artisan Chocolate Souvenir Box 80g',
  'socola-sua-mut-dau-20g': 'Highland Strawberry Jam Milk Chocolate 20g',
  'socola-sua-mut-dau-50g': 'Highland Strawberry Jam Milk Chocolate 50g',
  'socola-sua-mut-xoai-20g': 'Tropical Mango Jam Milk Chocolate 20g',
  'socola-sua-mut-xoai-50g': 'Tropical Mango Jam Milk Chocolate 50g',
  'socola-sua-ca-phe-20g': 'Highland Robusta Coffee Milk Chocolate 20g',
  'socola-sua-ca-phe-50g': 'Highland Robusta Coffee Milk Chocolate 50g',
  'socola-sua-kem-sau-rieng-20g': 'Ri6 Durian Wafer Cream Milk Chocolate 20g',
  'socola-sua-kem-sau-rieng-50g': 'Ri6 Durian Wafer Cream Milk Chocolate 50g',
  'socola-sau-rieng-100g': 'Ri6 Durian Gourmet Chocolate Slab 100g',
  'socola-xoai-100g': 'Tropical Sweet Mango Gourmet Chocolate Slab 100g',
  'socola-dau-100g': 'Highland Strawberry Gourmet Chocolate Slab 100g',
  'socola-dubai-70g': 'Dubai Pistachio & Crunchy Kunafa Artisanal Chocolate 70g',
  'bot-cacao-nguyen-chat-150g': '100% Pure Ben Tre Unsweetened Cocoa Powder 150g',
  'bot-socola-sua-balance-150g': 'Balance Gourmet Milk Chocolate Beverage Powder 150g',
  'socola-sua-tra-xanh-20g': 'Matcha Green Tea Milk Chocolate 20g',
  'socola-sua-tra-xanh-50g': 'Matcha Green Tea Milk Chocolate 50g',
  'bot-dau-nanh-me-den-moc-an-500g': 'Moc An Black Sesame & Soybean Beauty Cereal 500g',
  'bot-yen-mach-socola-moc-an-500g': 'Moc An Chocolate Oat Slimming Cereal 500g',
  'bot-yen-mach-dam-dau-ha-lan-moc-an-500g': 'Moc An Pea Protein & Oat Muscle Fuel Cereal 500g',
  'bot-dau-den-moc-an-500g': 'Moc An Roasted Green-Heart Black Bean Cereal 500g',
  'tra-la-sen-dau-tam-hong-sam-moc-an-150g': 'Moc An Lotus Leaf, Mulberry & Red Ginseng Detox Tea 150g',
};

export const SPECIFIC_PRODUCT_DESCRIPTIONS: Record<string, string> = {
  // 1. Matcha & Cascara
  'vtn-matcha-laka-ceremonial':
    'The finest Ceremonial Grade Matcha powder distributed by G-ROOSTER, tailored for Omakase dining, Specialty cafes, and discerning connoisseurs. Delivers intense natural umami sweetness with an enduring, crystal-clean lingering finish.',
  'vtn-matcha-laka-premium':
    'Premium Grade Japanese Matcha powder ideal for signature iced lattes, Dirty Matcha, and high-end pastry creations. Vibrant jade green tone with rich, aromatic tea notes.',
  'vtn-matcha-laka-culinary':
    'Culinary Grade Matcha tailored for high-volume coffee and milk tea chains, bakeries, and ice cream workshops. Strong tea aroma, vivid color retention, and high cost efficiency.',
  'vtn-tra-xa-den':
    'Premium Black Celastrus Tea harvested from pristine Hoa Binh valleys. Naturally supports liver detoxification, deep cellular cleansing, and soothing restorative sleep.',
  'vtn-cascara-original':
    'Original Cascara Tea produced from sun-dried ripe coffee cherries. Crisp and refreshing with notes of hibiscus, wild honey, and rich dried fruits.',
  'vtn-cascara-truyen-thong':
    'Original Cascara Tea produced from sun-dried ripe coffee cherries. Crisp and refreshing with notes of hibiscus, wild honey, and rich dried fruits.',
  'vtn-cascara-dao':
    'Specialty Cau Dat Cascara Tea delicately infused with refreshing natural peach blossom aroma. A top signature choice for modern tea shops and specialty cafes.',
  'vtn-cascara-cam-que':
    'A harmonious blend of antioxidant-rich Cascara coffee cherry husks, dried orange peel, and wild Tra Bong cinnamon bark. Delivers a warm, uplifting citrus aroma.',
  'vtn-cascara-gung':
    'A soothing blend of antioxidant-packed Cascara cherry tea and spicy aged mountain ginger slices. Warms the body, aids digestion, and protects the respiratory system.',
  'vtn-syrup-cascara-1000ml':
    'High-concentration artisanal Cascara syrup extracted from Cau Dat coffee cherry pulp. Balanced sweet-tart fruity notes and raw cane molasses, perfect for specialty mocktails and teas.',
  'vtn-syrup-cascara-700ml':
    'Specialty Cascara Fruit Concentrate in an elegant 700ml glass bottle for premium bar counters. Intense natural berry-like brightness and rich molasses undertones.',

  // 2. Frozen Sugarcane Juice
  'vua-mia-tuyet-350ml':
    'IQF Cane Snow® (Frozen Sugarcane Juice) is a breakthrough solution for the modern F&B industry. 100% natural cold-pressed fresh purple cane, deep-frozen at -18°C via IQF technology to preserve full vitamins, essential minerals, and crisp refreshing sweetness.',

  // 3. Ngoc Linh Codonopsis & Herbs
  'dato-tra-sam-day':
    'Ngoc Linh Codonopsis Tea is a precious wellness gift from the legendary Ngoc Linh mountain. Helps detoxify, replenishes vital energy, reduces fatigue, and rapidly restores physical vitality.',
  'dato-tra-sam-lac-tien':
    'A soothing herbal blend of wild Ngoc Linh Codonopsis root, wild forest passionflower, and lotus hearts. Calms the nervous system, eases tension, and promotes deep restorative sleep.',
  'dato-tra-sam-gung':
    'A warming herbal formula combining mountain Codonopsis and freeze-dried spicy hill ginger. Boosts internal heat, strengthens immunity, and relieves seasonal chills.',
  'dato-tra-gung-nhan-sam':
    'A warming herbal formula combining mountain Codonopsis and freeze-dried spicy hill ginger. Boosts internal heat, strengthens immunity, and relieves seasonal chills.',
  'dato-tra-kho-qua-rung':
    'Freeze-dried wild bitter melon tea rich in natural Charantin and Polypeptide-p. Effectively supports healthy blood sugar regulation, cools liver heat, and purifies the body.',
  'dato-tinh-chat-sam-day-mat-ong-500ml':
    'Concentrated Ngoc Linh Codonopsis liquid extract blended with pure wildflower honey. Enhances stamina, reinforces resistance, and delivers immediate energy revitalization.',
  'dato-tinh-chat-sam-day-mat-ong-250ml':
    'Convenient 250ml glass bottle of concentrated Codonopsis and wildflower honey extract. Perfect daily natural tonic for busy executives, elders, and post-workout recovery.',
  'dato-tinh-chat-sam-day-200g':
    'Concentrated Ngoc Linh Codonopsis liquid extract blended with pure wildflower honey (200g Box). Enhances stamina, reinforces resistance, and delivers immediate energy revitalization.',
  'dato-tinh-chat-sam-day-400g':
    'Concentrated Ngoc Linh Codonopsis liquid extract blended with pure wildflower honey (400g Box). Enhances stamina, reinforces resistance, and delivers immediate energy revitalization.',
  'dato-tinh-chat-chanh-day-mat-ong-500ml':
    'Rich Highland purple passion fruit concentrate paired with wild forest honey and Ngoc Linh Codonopsis. High in natural vitamin C, refreshing, and deeply revitalizing.',
  'dato-tinh-chat-chanh-day-mat-ong-250ml':
    'Compact 250ml extract of Highland purple passion fruit and raw wild honey. A delicious, vitamin-dense base for signature wellness drinks and chilled sodas.',
  'dato-tinh-chat-chanh-day-200g':
    'Highland purple passion fruit extract blended with wild honey and mountain Codonopsis (200g Box). Rich in natural vitamin C, refreshing, and deeply revitalizing.',
  'dato-tinh-chat-chanh-day-400g':
    'Highland purple passion fruit extract blended with wild honey and mountain Codonopsis (400g Box). Rich in natural vitamin C, refreshing, and deeply revitalizing.',
  'dato-tinh-chat-gung-mat-ong-500ml':
    'Pure concentrated mountain ginger extract blended with raw wild honey and mountain Codonopsis. Soothes sensitive stomachs, dispels cold, and stimulates healthy digestion.',
  'dato-tinh-chat-gung-mat-ong-250ml':
    'Compact 250ml bottle of warming mountain ginger and wild honey extract. Delivers comforting warmth, eases throat irritation, and improves blood circulation.',
  'dato-tinh-chat-gung-200g':
    'Warming mountain ginger extract blended with wild honey and mountain Codonopsis (200g Box). Comforting warmth, eases throat irritation, and aids digestion.',
  'dato-tinh-chat-gung-400g':
    'Warming mountain ginger extract blended with wild honey and mountain Codonopsis (400g Box). Comforting warmth, eases throat irritation, and aids digestion.',
  'dato-tinh-chat-nghe-mat-ong-500ml':
    'Curcumin-rich red turmeric extract blended with pure forest wildflower honey. Protects gastric mucosa, accelerates healing, and enhances radiant skin vitality.',
  'dato-tinh-chat-nghe-mat-ong-250ml':
    'Daily 250ml red turmeric and wildflower honey liquid tonic. Gentle on digestion, anti-inflammatory, and easy to consume straight or mixed with warm water.',
  'dato-tinh-chat-nghe-200g':
    'Curcumin-rich red turmeric tonic blended with wild forest honey (200g Box). Protects stomach mucosa, accelerates healing, and enhances radiant skin vitality.',
  'dato-tinh-chat-nghe-400g':
    'Curcumin-rich red turmeric tonic blended with wild forest honey (400g Box). Protects stomach mucosa, accelerates healing, and enhances radiant skin vitality.',
  'dato-mut-sam-day-150g':
    'Hand-selected fresh Ngoc Linh Codonopsis roots gently simmered with natural rock sugar. Tender, subtly sweet, and chewy, delivering wholesome herbal nutrition in every bite.',
  'dato-mut-sam-day-100g':
    'Hand-selected fresh Ngoc Linh Codonopsis roots gently simmered with natural rock sugar (100g). Tender, subtly sweet, and chewy herbal nutrition in every bite.',
  'dato-sam-day-kho-1kg':
    'Bulk 1kg gift box of whole sun-dried Ngoc Linh Codonopsis roots grown above 1,500m altitude. Packed with precious Saponin, ideal for herbal broths, tonic teas, and premium liquor infusion.',
  'dato-sam-day-kho-500g':
    'Premium 500g vacuum-sealed pack of authentic Ngoc Linh Codonopsis roots. Rich earthy aroma, high medicinal grade, and 100% free from sulfur or chemical preservatives.',
  'dato-sam-day-kho-100g':
    'Convenient 100g pack of whole dried Ngoc Linh Codonopsis roots for home wellness tea steeping and nourishing herbal soups.',

  // 4. Coffee Cubes & Specialty Beans
  'nonla-vien-01-suadua':
    'Single freeze-dried coffee cube blending bold Robusta with creamy Ben Tre coconut milk. Dissolves instantly in 3 seconds in cold water, milk, or over ice.',
  'nonla-vien-01-cacao':
    'Single freeze-dried coffee cube pairing Vietnamese dark roast with rich Ben Tre cocoa. Rich mocha aroma, velvety mouthfeel, and zero brewing equipment required.',
  'nonla-vien-01-chanh':
    'Single freeze-dried coffee cube combining chilled Americano with zesty natural lemon notes. Crisp, refreshing, and invigorating for hot summer days.',
  'nonla-vien-01-kemtrung':
    'Single freeze-dried coffee cube capturing authentic Hanoi egg coffee richness. Golden creamy egg custard aroma over a bold, aromatic espresso base.',
  'nonla-vien-01-muoi':
    'Single freeze-dried coffee cube recreating Vietnam’s viral Hue salted coffee. Savory sea salt cream contrasts exquisitely with deep caramel roasted coffee.',
  'nonla-vien-01-saurieng':
    'Single freeze-dried coffee cube infused with fragrant Ri6 durian essence. A bold and distinctive Vietnamese specialty favorite for adventurous coffee lovers.',
  'nonla-vien-01-americano':
    'Single freeze-dried Level 6 Americano cube made from 100% premium roasted coffee beans. Delivers a clean, smokey, full-bodied black coffee in 3 seconds.',
  'nonla-vien-08-suadua':
    'Box of 8 freeze-dried coffee cubes with Ben Tre coconut milk. Compact travel-friendly pack offering instant barista-quality coconut coffee anywhere.',
  'nonla-vien-08-cacao':
    'Box of 8 freeze-dried coffee cubes with rich Ben Tre cocoa. Smooth mocha profile with natural energy boost, dissolving instantly in cold or hot liquid.',
  'nonla-vien-08-chanh':
    'Box of 8 freeze-dried coffee cubes with zesty lemon essence. Refreshing sparkling coffee and citrus tonic base for modern cafes and on-the-go professionals.',
  'nonla-vien-08-kemtrung':
    'Box of 8 freeze-dried coffee cubes with Hanoi egg cream flavor. Rich, creamy, and indulgent, bringing traditional northern Vietnamese coffee heritage home.',
  'nonla-vien-08-muoi':
    'Box of 8 freeze-dried coffee cubes with savory sea salt cream. Delivers the signature sweet-salty richness of central Vietnamese coffee culture.',
  'nonla-vien-08-saurieng':
    'Box of 8 freeze-dried coffee cubes with premium Ri6 durian aroma. Intense tropical sensory experience that dissolves effortlessly in iced water or fresh milk.',
  'nonla-vien-08-americano':
    'Box of 8 freeze-dried Level 6 Americano cubes. 100% pure Vietnamese coffee with bold roasted notes, zero sugar, and instant 3-second solubility.',
  'nonla-hop-08-mix':
    'Assorted box of 8 freeze-dried coffee cubes featuring a curated variety of iconic Vietnamese flavors: Americano, Salted Coffee, Coconut Milk, and Egg Cream.',
  'nonla-hop-18-mix':
    'Medium gift box of 18 assorted freeze-dried coffee cubes. An exciting flight of 7 Vietnamese coffee profiles, perfect for offices, gifting, and hospitality amenities.',
  'nonla-hop-24-mix':
    'Deluxe gift box of 24 assorted freeze-dried coffee cubes. Beautifully packaged cultural gift showcase featuring all signature Vietnamese coffee creations.',
  'nonla-hop-42-mix':
    'Master collection box of 42 freeze-dried coffee cubes with full flavor spectrum. Designed for hospitality lounges, corporate gifting, and passionate coffee collectors.',
  'nonla-tui-200g-hat':
    'Whole roasted specialty coffee beans hand-harvested from high-altitude Cau Dat basalt slopes. Medium-dark roast offering nutty dark chocolate notes and sweet lingering finish.',
  'nonla-tui-200g-bot':
    'Freshly ground artisanal roasted coffee for traditional Vietnamese phin filters or French press. Deep roasted aroma, thick crema, and authentic bold body.',
  'aodai-hop-03-vien':
    'Heritage 3-cube coffee souvenir box adorned with graceful Vietnamese Ao Dai artwork. An elegant, lightweight cultural keepsake for international tourists.',
  'aodai-hop-06-vien':
    'Heritage 6-cube coffee souvenir box with Ao Dai illustrations. Includes assorted freeze-dried coffee cubes dissolving instantly in cold water.',
  'aodai-hop-08-cacao':
    'Heritage 8-cube cocoa souvenir box with Ao Dai graphics. 100% pure Vietnamese freeze-dried cocoa cubes for hot chocolate and iced cocoa drinks.',
  'aodai-hop-12-vien':
    'Luxury 12-cube coffee gift box showcasing Vietnamese Ao Dai cultural motifs. Premium freeze-dried cubes crafted for discerning corporate gifting.',
  'aodai-hop-50-cacao':
    'Bulk catering pack of 50 freeze-dried cocoa cubes. Ideal for hotel breakfast buffets, office pantries, and high-volume coffee bars.',
  'aodai-hop-50-caphe':
    'Bulk catering pack of 50 freeze-dried coffee cubes. Rapid 3-second barista-grade solution for airlines, cruise lines, and hospitality partners.',

  // 5. Meat Floss & Specialty Jerky
  'phu-nha-cha-bong-heo-nuoc-mam':
    'Traditional Fish Sauce Pork Floss is a renowned Saigon delicacy with over 30 years of heritage. Fresh premium lean pork is gently pounded and roasted with first-press Phu Quoc fish sauce into tender, golden fluffy threads that melt smoothly in the mouth.',
  'phu-nha-cha-bong-heo-khong-duong':
    'Zero Sugar Pork Floss specially formulated for health-conscious diners, keto regimens, elders, and young children. 100% pure lean pork seasoned only with savory sea salt and natural spices.',
  'phu-nha-cha-bong-heo-thuong-hang':
    'Superb Grade Pork Floss with long, golden tender strands. Hand-roasted on cast-iron pans, low moisture, clean preservation, and irresistible savory sweetness.',
  'phu-nha-cha-bong-heo-nhuyen':
    'Finely shredded baby pork floss, exceptionally soft and gentle for infants, toddlers, porridge bowls, and soft pastry toppings.',
  'phu-nha-cha-bong-heo-cao-cap':
    'Premium Pork Floss crafted from fresh daily butchered lean meat. Ideal topping for banh mi, sticky rice, savory rolls, and snack platters.',
  'phu-nha-cha-bong-ga':
    'Crispy Golden Chicken Floss made from tender chicken breast and natural seasonings. High in protein, low in fat, perfect for bakery fillings and breakfast menus.',
  'phu-nha-cha-bong-ga-hanh-phi':
    'Aromatic Fried Onion Chicken Floss with crispy shallots and golden chicken shreds. Highly popular topping for bakeries and modern milk tea snacks.',
  'phu-nha-kho-ga-la-chanh':
    'Dried Chicken with Kaffir Lime Leaves, crunchy and savory with balanced chili heat and aromatic lime fragrance. A staple Vietnamese premium finger food.',
  'phu-nha-kho-heo-chay-toi':
    'Crispy Garlic Pork Jerky infused with aromatic toasted garlic slices and rich chili seasoning. Savory, crispy, and thoroughly addictive.',

  // 6. Artisanal Chocolates & Nutrition
  'socola-den-100-khong-duong-20g':
    '100% pure artisanal dark chocolate with zero added sugar, handcrafted from traditionally fermented Ben Tre cocoa beans and pure cocoa butter. Pocket 20g size.',
  'socola-den-100-khong-duong-50g':
    '100% pure artisanal dark chocolate with zero added sugar. Robust, rustic cacao bitterness with natural fruity acidity and superior antioxidant polyphenol content. 50g bar.',
  'socola-den-100-khong-duong-100g':
    '100% pure artisanal dark chocolate bar (100g). Pure unadulterated cacao mass and cocoa butter for keto enthusiasts, pastry chefs, and true chocolate purists.',
  'socola-den-100-duong-an-kieng-20g':
    '100% dark chocolate sweetened mildly with natural Isomalt for diabetics and calorie-controlled diets. 20g pocket snack.',
  'socola-den-100-duong-an-kieng-50g':
    '50g bar of 100% dark chocolate sweetened with Isomalt. Smooth chocolate melt without sugar spikes or bitter harshness.',
  'socola-den-90-cacao-20g':
    '90% high-cacao dark chocolate with a touch of cane sugar. Rich, bold, and satisfying 20g snack for daily antioxidant intake.',
  'socola-den-90-cacao-50g':
    '50g slab of 90% Ben Tre dark chocolate. Deep cocoa intensity balanced with subtle natural molasses sweetness.',
  'socola-den-85-cacao-20g':
    '85% dark chocolate bar (20g). A crowd-favorite balance of rich earthy bitterness and velvety cocoa butter melt.',
  'socola-den-85-cacao-50g':
    '50g artisanal dark chocolate bar with 85% cacao content. Hand-tempered for a satisfying crisp snap and lingering aroma.',
  'socola-den-85-cacao-100g':
    '100g full-size dark chocolate bar with 85% cacao. Ideal for pairing with espresso, fine red wine, or direct gourmet baking.',
  'socola-den-70-cacao-20g':
    '70% classic dark chocolate bar (20g). Approachable rich cocoa profile with gentle sweet finish and subtle red berry undertones.',
  'socola-den-70-cacao-50g':
    '50g artisan 70% dark chocolate bar crafted from fermented Ben Tre single-origin cacao. Balanced, silky, and harmonious.',
  'socola-den-70-cacao-100g':
    '100g premier dark chocolate bar with 70% cacao. A versatile gourmet choice for everyday enjoyment and pastry ganache recipes.',
  'set-qua-tang-chocolate-hoi-an-50g':
    'Artisanal 6-piece chocolate gift collection inspired by Hoi An Ancient Town lantern architecture. Features regional Vietnamese spices and fruit fillings.',
  'set-qua-tang-chocolate-sai-gon-50g':
    'Artisanal 6-piece chocolate gift collection capturing the dynamic spirit of Saigon. Includes coffee, cashew, and coconut praline chocolates.',
  'set-qua-tang-chocolate-phu-quoc-50g':
    'Artisanal 6-piece chocolate gift collection celebrating Phu Quoc Island. Infused with famous Phu Quoc black pepper and local roasted nuts.',
  'set-qua-tang-chocolate-tay-bac-50g':
    'Artisanal 6-piece chocolate gift collection inspired by Northwest Highlands. Features wild Tra Bong cinnamon, mountain cardamom, and forest honey.',
  'set-qua-tang-chocolate-non-la-vang-250g':
    'Luxurious 250g Golden Conical Hat gift box filled with premium assorted Vietnamese chocolates. A distinguished souvenir for international dignitaries.',
  'set-qua-tang-chocolate-non-la-trang-250g':
    'Elegant 250g Pure White Conical Hat gift box containing handcrafted Vietnamese chocolates. Symbolizes the graceful charm of Vietnamese heritage.',
  'set-qua-tang-chocolate-non-la-tphcm-150g':
    '150g Conical Hat gift box featuring iconic Ho Chi Minh City landmark illustrations and a delicious assortment of milk and dark chocolates.',
  'set-qua-tang-chocolate-non-la-ha-noi-150g':
    '150g Conical Hat gift box celebrating Hanoi Old Quarter and Sword Lake. Filled with assorted handcrafted chocolates.',
  'set-qua-tang-chocolate-non-la-ha-long-150g':
    '150g Conical Hat gift box showcasing the UNESCO heritage seascape of Ha Long Bay with premium chocolate bonbons.',
  'set-qua-tang-chocolate-non-la-da-nang-150g':
    '150g Conical Hat gift box featuring Da Nang’s Golden Bridge and coastal scenery, paired with delectable artisan chocolates.',
  'set-qua-tang-chocolate-non-la-ben-tre-150g':
    '150g Conical Hat gift box honoring the coconut land of Ben Tre, filled with coconut milk, cacao nibs, and dark chocolate delights.',
  'set-qua-tang-chocolate-non-la-hoi-an-150g':
    '150g Conical Hat gift box adorned with Hoi An lantern town imagery, packed with assorted milk and dark artisan chocolates.',
  'socola-sua-khong-nhan-20g':
    'Smooth, creamy 20g milk chocolate made with pure cocoa butter and whole New Zealand milk powder. Melts effortlessly on the palate.',
  'socola-sua-khong-nhan-50g':
    'Classic 50g milk chocolate bar with velvety mouthfeel and balanced milky sweetness. A beloved treat for children and sweet chocolate lovers.',
  'socola-sua-hanh-nhan-20g':
    '20g milk chocolate embedded with crunchy roasted California almonds. Wholesome nutty aroma and satisfying bite.',
  'socola-sua-hanh-nhan-50g':
    '50g milk chocolate bar loaded with whole roasted almonds. A delightful contrast of smooth chocolate and crispy toasted nut texture.',
  'socola-sua-hat-dieu-20g':
    '20g milk chocolate bar packed with buttery roasted Binh Phuoc cashew pieces. Rich, creamy, and distinctively Vietnamese.',
  'socola-sua-hat-dieu-50g':
    '50g milk chocolate bar generously studded with golden toasted cashews. Delivers a rich, nutty crunch with every bite.',
  'socola-sua-dua-20g':
    '20g milk chocolate infused with fragrant toasted Ben Tre coconut flakes. Tropical sweetness and delightful crispy texture.',
  'socola-sua-dua-50g':
    '50g milk chocolate bar featuring crunchy toasted coconut shreds from Ben Tre. Rich coconut aroma paired with smooth dairy chocolate.',
  'socola-sua-cacao-nibs-20g':
    '20g milk chocolate with roasted Ben Tre cocoa nibs. Creates an exciting contrast between sweet creamy chocolate and rustic crunchy cacao bits.',
  'socola-sua-cacao-nibs-50g':
    '50g milk chocolate bar loaded with antioxidant-rich roasted cacao nibs. A textured, sophisticated treat for chocolate enthusiasts.',
  'socola-sua-nho-kho-20g':
    '20g milk chocolate bar with plump sun-dried raisins. Chewy fruity sweetness embraced by rich, smooth milk chocolate.',
  'socola-sua-nho-kho-50g':
    '50g milk chocolate bar studded with sweet natural raisins. A timeless classic combining juicy dried fruit and creamy cocoa melt.',
  'socola-sua-cookie-20g':
    '20g milk chocolate bar with crunchy golden butter cookie crumbles. Delicious snack bar reminiscent of cookies and cream.',
  'socola-sua-cookie-50g':
    '50g milk chocolate bar infused with crispy butter biscuit pieces for an extra satisfying crunch in every square.',
  'socola-sua-pho-mai-20g':
    '20g milk chocolate bar filled with crispy cheddar cheese wafers. An intriguing harmony of savory cheese and sweet chocolate.',
  'socola-sua-pho-mai-50g':
    '50g milk chocolate bar with crispy savory cheese wafer layers. A popular modern Asian confectionery flavor innovation.',
  'socola-sua-hanh-nhan-non-la-50g':
    '50g roasted almond milk chocolate packaged in a traditional Vietnamese Conical Hat box. A charming cultural gift souvenir.',
  'socola-sua-cacao-nibs-non-la-50g':
    '50g crunchy cocoa nibs milk chocolate in Conical Hat packaging. Combines authentic Vietnamese cacao with iconic folk art.',
  'socola-sua-khong-nhan-non-la-50g':
    '50g smooth milk chocolate in Conical Hat packaging. Perfect sweet keepsake celebrating Vietnamese cultural identity.',
  'socola-sua-pho-mai-non-la-50g':
    '50g cheese wafer milk chocolate in Conical Hat packaging. Unique savory-sweet souvenir loved by international travelers.',
  'socola-sua-dua-non-la-50g':
    '50g toasted coconut milk chocolate in Conical Hat packaging. Celebrates the tropical essence of Ben Tre coconut groves.',
  'keo-chocolate-da-nang-80g':
    '80g souvenir chocolate box celebrating Da Nang city. Crisp packaging with assorted premium chocolate pralines inside.',
  'keo-chocolate-hue-80g':
    '80g souvenir chocolate box featuring the ancient imperial capital of Hue. Rich heritage artwork with exquisite chocolates.',
  'keo-chocolate-hoi-an-80g':
    '80g souvenir chocolate box capturing the nostalgic romance of Hoi An Ancient Town with delicious artisan chocolates.',
  'keo-chocolate-phu-quoc-80g':
    '80g souvenir chocolate box highlighting Phu Quoc Island’s tropical beauty, filled with premium chocolate bites.',
  'socola-sua-mut-dau-20g':
    '20g milk chocolate bar featuring a sweet center of Highland strawberry fruit jam. A refreshing berry burst inside smooth chocolate.',
  'socola-sua-mut-dau-50g':
    '50g milk chocolate bar with luscious strawberry fruit jam filling. Naturally tart, fragrant, and delightfully fruity.',
  'socola-sua-mut-xoai-20g':
    '20g milk chocolate bar with sweet tropical mango jam filling. Bursting with sun-ripened tropical fruit flavor.',
  'socola-sua-mut-xoai-50g':
    '50g milk chocolate bar infused with concentrated tropical mango fruit paste. A vibrant, exotic Southeast Asian taste.',
  'socola-sua-ca-phe-20g':
    '20g milk chocolate infused with authentic Central Highland Robusta coffee extract. Rich mocha notes with a gentle caffeine lift.',
  'socola-sua-ca-phe-50g':
    '50g milk chocolate bar with aromatic Vietnamese coffee. Perfectly mirrors the beloved taste of Vietnamese iced milk coffee.',
  'socola-sua-kem-sau-rieng-20g':
    '20g milk chocolate bar layered with crispy wafers and fragrant Ri6 durian cream. A must-try delicacy for durian aficionados.',
  'socola-sua-kem-sau-rieng-50g':
    '50g milk chocolate bar with crispy durian wafer layers. Rich, aromatic durian custard enveloped in silky milk chocolate.',
  'socola-sau-rieng-100g':
    '100g premium chocolate slab infused with real freeze-dried Ri6 durian fruit. Bold, creamy, and unforgettable tropical flavor.',
  'socola-xoai-100g':
    '100g gourmet chocolate slab studded with freeze-dried tropical mango pieces. Sweet, tangy, and beautifully vibrant.',
  'socola-dau-100g':
    '100g gourmet chocolate slab infused with freeze-dried Da Lat strawberries. Crisp berry texture and charming pink accents.',
  'socola-dubai-70g':
    'Viral Dubai-style artisanal chocolate bar (70g) filled with buttery crispy toasted Kunafa pastry threads and 100% pure pistachio paste.',
  'bot-cacao-nguyen-chat-150g':
    '100% pure Ben Tre unsweetened cocoa powder (150g), naturally alkalized according to European standards. Ideal for hot cocoa, tiramisu, and baking.',
  'bot-socola-sua-balance-150g':
    'Balance Gourmet Milk Chocolate Powder (150g) made with pure cocoa and New Zealand dairy milk. Simply stir with hot water for instant cafe-grade hot chocolate.',
  'socola-sua-tra-xanh-20g':
    '20g milk chocolate bar infused with fine Matcha green tea powder. Soothing grassy aroma, subtle bitterness, and creamy sweet melt.',
  'socola-sua-tra-xanh-50g':
    '50g Matcha green tea milk chocolate bar. Beautiful jade hue with authentic Japanese green tea aroma and creamy dairy finish.',
  'bot-dau-nanh-me-den-moc-an-500g':
    'Moc An Beauty & Vitality Cereal Powder (500g) combining non-GMO roasted soybeans, black sesame, oats, and lotus seeds. High in plant protein and natural vitamin E.',
  'bot-yen-mach-socola-moc-an-500g':
    'Moc An Slimming Cereal Powder (500g) crafted with whole rolled oats, pure Ben Tre cocoa, chia seeds, and Stevia. Rich in fiber and promotes long satiety.',
  'bot-yen-mach-dam-dau-ha-lan-moc-an-500g':
    'Moc An Muscle Fuel Plant Protein Powder (500g) featuring pea protein isolate, whole grain oats, and freeze-dried banana. Perfect post-workout vegan recovery drink.',
  'bot-dau-den-moc-an-500g':
    'Moc An 100% Green-Heart Black Bean Powder (500g) traditionally roasted and finely ground. Helps cool body heat, detoxifies kidneys, and supports healthy hair and skin.',
  'tra-la-sen-dau-tam-hong-sam-moc-an-150g':
    'Moc An Herbal Detox Tea (150g) blending young lotus leaves, dried mulberries, Korean red ginseng slices, and stevia. Naturally lowers blood lipids and supports serene sleep.',
};

export const SPECIFIC_PRODUCT_INGREDIENTS: Record<string, string> = {
  // 1. Matcha & Cascara
  'vtn-matcha-laka-ceremonial': '100% pure shade-grown first-flush green tea buds (Ceremonial Grade, Yame/Kagoshima, Japan)',
  'vtn-matcha-laka-premium': '100% pure shade-grown green tea leaves (Barista Premium Grade, Japan)',
  'vtn-matcha-laka-culinary': '100% pure green tea leaves (Culinary Foodservice Grade, Japan)',
  'vtn-tra-xa-den': '100% dried stems and leaves of wild Black Celastrus (Celastrus hindsii), gently roasted in earthen pans',
  'vtn-cascara-original': '100% ripe Arabica coffee cherry husks (Cau Dat, Da Lat), naturally sun-dried in greenhouse beds',
  'vtn-cascara-truyen-thong': '100% ripe Arabica coffee cherry husks (Cau Dat, Da Lat), naturally sun-dried in greenhouse beds',
  'vtn-cascara-dao': 'Ripe Arabica coffee cherry husks (Cau Dat), natural peach blossom extract, dried apple pieces',
  'vtn-cascara-cam-que': 'Ripe Arabica coffee cherry husks (Cau Dat), dried organic orange peel, Tra Bong forest cinnamon bark',
  'vtn-cascara-gung': 'Ripe Arabica coffee cherry husks, sliced aged Dak Lak mountain ginger root',
  'vtn-syrup-cascara-1000ml': 'Specialty Arabica coffee cherry pulp extract, raw unrefined cane sugar, purified water',
  'vtn-syrup-cascara-700ml': 'Specialty Arabica coffee cherry pulp extract, raw unrefined cane sugar, purified water',

  // 2. Frozen Sugarcane Juice
  'vua-mia-tuyet-350ml': '100% cold-pressed natural purple sugarcane juice (Tay Ninh), zero added water, zero chemicals, deep-frozen at -18°C',

  // 3. Ngoc Linh Codonopsis & Herbs
  'dato-tra-sam-day': '85% wild Ngoc Linh Codonopsis root (Dang Shen), 15% natural sweet stevia leaf',
  'dato-tra-sam-lac-tien': 'Wild forest passionflower, Ngoc Linh Codonopsis root, lotus embryo plumule, sweet leaf',
  'dato-tra-sam-gung': 'Freeze-dried aged hill ginger, Ngoc Linh Codonopsis root, raw cane molasses',
  'dato-tra-gung-nhan-sam': 'Freeze-dried aged hill ginger, Ngoc Linh Codonopsis root, raw cane molasses',
  'dato-tra-kho-qua-rung': '100% freeze-dried wild forest bitter melon (Momordica charantia), sweet stevia leaf',
  'dato-tinh-chat-sam-day-mat-ong-500ml': 'Concentrated Ngoc Linh Codonopsis extract (60%), natural forest wildflower honey (40%)',
  'dato-tinh-chat-sam-day-mat-ong-250ml': 'Concentrated Ngoc Linh Codonopsis extract (60%), natural forest wildflower honey (40%)',
  'dato-tinh-chat-sam-day-200g': 'Concentrated Ngoc Linh Codonopsis extract (60%), natural forest wildflower honey (40%)',
  'dato-tinh-chat-sam-day-400g': 'Concentrated Ngoc Linh Codonopsis extract (60%), natural forest wildflower honey (40%)',
  'dato-tinh-chat-chanh-day-mat-ong-500ml': 'Highland purple passion fruit juice concentrate, Ngoc Linh Codonopsis extract, wild forest honey',
  'dato-tinh-chat-chanh-day-mat-ong-250ml': 'Highland purple passion fruit juice concentrate, Ngoc Linh Codonopsis extract, wild forest honey',
  'dato-tinh-chat-chanh-day-200g': 'Highland purple passion fruit juice concentrate, Ngoc Linh Codonopsis extract, wild forest honey',
  'dato-tinh-chat-chanh-day-400g': 'Highland purple passion fruit juice concentrate, Ngoc Linh Codonopsis extract, wild forest honey',
  'dato-tinh-chat-gung-mat-ong-500ml': 'Concentrated hill ginger juice, Ngoc Linh Codonopsis root extract, wild forest honey',
  'dato-tinh-chat-gung-mat-ong-250ml': 'Concentrated hill ginger juice, Ngoc Linh Codonopsis root extract, wild forest honey',
  'dato-tinh-chat-gung-200g': 'Concentrated hill ginger juice, Ngoc Linh Codonopsis root extract, wild forest honey',
  'dato-tinh-chat-gung-400g': 'Concentrated hill ginger juice, Ngoc Linh Codonopsis root extract, wild forest honey',
  'dato-tinh-chat-nghe-mat-ong-500ml': 'High-curcumin red turmeric extract, pure forest wildflower honey',
  'dato-tinh-chat-nghe-mat-ong-250ml': 'High-curcumin red turmeric extract, pure forest wildflower honey',
  'dato-tinh-chat-nghe-200g': 'High-curcumin red turmeric extract, pure forest wildflower honey',
  'dato-tinh-chat-nghe-400g': 'High-curcumin red turmeric extract, pure forest wildflower honey',
  'dato-mut-sam-day-150g': 'Selected fresh Ngoc Linh Codonopsis roots (80%), natural crystallized rock sugar (20%)',
  'dato-mut-sam-day-100g': 'Selected fresh Ngoc Linh Codonopsis roots (80%), natural crystallized rock sugar (20%)',
  'dato-sam-day-kho-1kg': '100% authentic whole dried Ngoc Linh Codonopsis roots (Kon Tum, Vietnam)',
  'dato-sam-day-kho-500g': '100% authentic whole dried Ngoc Linh Codonopsis roots (Kon Tum, Vietnam)',
  'dato-sam-day-kho-100g': '100% authentic whole dried Ngoc Linh Codonopsis roots (Kon Tum, Vietnam)',

  // 4. Coffee Cubes & Specialty Beans
  'nonla-vien-01-suadua': 'Freeze-dried specialty coffee, Ben Tre coconut milk powder, natural cane sugar',
  'nonla-vien-01-cacao': 'Freeze-dried specialty coffee, Ben Tre cocoa powder, dairy milk, cane sugar',
  'nonla-vien-01-chanh': 'Freeze-dried specialty coffee, natural lemon juice crystals, unrefined cane sugar',
  'nonla-vien-01-kemtrung': 'Freeze-dried specialty coffee, egg yolk custard powder, creamy milk, vanilla',
  'nonla-vien-01-muoi': 'Freeze-dried specialty coffee, sea salt, whipping cream powder, cane sugar',
  'nonla-vien-01-saurieng': 'Freeze-dried specialty coffee, Ri6 durian powder, creamy milk, cane sugar',
  'nonla-vien-01-americano': '100% pure freeze-dried Vietnamese roasted coffee (zero additives, zero sugar)',
  'nonla-vien-08-suadua': 'Freeze-dried specialty coffee, Ben Tre coconut milk powder, natural cane sugar',
  'nonla-vien-08-cacao': 'Freeze-dried specialty coffee, Ben Tre cocoa powder, dairy milk, cane sugar',
  'nonla-vien-08-chanh': 'Freeze-dried specialty coffee, natural lemon juice crystals, unrefined cane sugar',
  'nonla-vien-08-kemtrung': 'Freeze-dried specialty coffee, egg yolk custard powder, creamy milk, vanilla',
  'nonla-vien-08-muoi': 'Freeze-dried specialty coffee, sea salt, whipping cream powder, cane sugar',
  'nonla-vien-08-saurieng': 'Freeze-dried specialty coffee, Ri6 durian powder, creamy milk, cane sugar',
  'nonla-vien-08-americano': '100% pure freeze-dried Vietnamese roasted coffee (zero additives, zero sugar)',
  'nonla-hop-08-mix': 'Assortment of pure coffee, coconut milk, cocoa, egg cream, and sea salt cubes',
  'nonla-hop-18-mix': 'Assortment of pure coffee, coconut milk, cocoa, egg cream, lemon, durian, and sea salt cubes',
  'nonla-hop-24-mix': 'Assortment of pure coffee, coconut milk, cocoa, egg cream, lemon, durian, and sea salt cubes',
  'nonla-hop-42-mix': 'Assortment of pure coffee, coconut milk, cocoa, egg cream, lemon, durian, and sea salt cubes',
  'nonla-tui-200g-hat': '100% whole roasted Arabica & Fine Robusta coffee beans (Cau Dat & Buon Ma Thuot)',
  'nonla-tui-200g-bot': '100% ground roasted Arabica & Fine Robusta coffee beans (Cau Dat & Buon Ma Thuot)',
  'aodai-hop-03-vien': '100% freeze-dried roasted coffee & coconut milk cubes',
  'aodai-hop-06-vien': 'Assorted freeze-dried specialty coffee cubes',
  'aodai-hop-08-cacao': '100% freeze-dried Ben Tre cocoa and whole milk cubes',
  'aodai-hop-12-vien': 'Assorted freeze-dried specialty coffee & cocoa cubes',
  'aodai-hop-50-cacao': '100% freeze-dried Ben Tre cocoa and whole milk cubes',
  'aodai-hop-50-caphe': '100% pure freeze-dried roasted coffee cubes',

  // 5. Meat Floss & Specialty Jerky
  'phu-nha-cha-bong-heo-nuoc-mam': '95% fresh lean pork leg meat, first-press Phu Quoc fish sauce, cane sugar, white pepper',
  'phu-nha-cha-bong-heo-khong-duong': '98% fresh lean pork meat, pure sea salt, artisanal fish sauce (0% added sugar or starch)',
  'phu-nha-cha-bong-heo-thuong-hang': '95% fresh lean pork meat, traditional fish sauce, cane sugar, secret natural spices',
  'phu-nha-cha-bong-heo-nhuyen': '100% tender pork tenderloin, gentle natural seasonings, extra fine fluffy texture',
  'phu-nha-cha-bong-heo-cao-cap': 'Selected clean pork lean meat, balanced sweet-savory traditional seasonings',
  'phu-nha-cha-bong-ga': '100% fresh farm chicken breast meat, fish sauce, cane sugar, natural herbs',
  'phu-nha-cha-bong-ga-hanh-phi': '88% fresh chicken breast meat, 10% crispy fried shallots, fish sauce, mild chili',
  'phu-nha-kho-ga-la-chanh': '90% clean chicken breast meat, crispy roasted kaffir lime leaves, dried whole chilies, seasonings',
  'phu-nha-kho-heo-chay-toi': '92% fresh lean pork thigh meat, 6% crispy solo garlic cloves, bird’s eye chili, wildflower honey, spices',

  // 6. Artisanal Chocolates & Nutrition
  'socola-den-100-khong-duong-20g': '100% fermented Ben Tre cocoa beans and pure unadulterated cocoa butter (0% sugar)',
  'socola-den-100-khong-duong-50g': '100% fermented Ben Tre cocoa beans and pure unadulterated cocoa butter (0% sugar)',
  'socola-den-100-khong-duong-100g': '100% fermented Ben Tre cocoa beans and pure unadulterated cocoa butter (0% sugar)',
  'socola-den-100-duong-an-kieng-20g': 'Selected Ben Tre cocoa beans (90%), pure cocoa butter, Isomalt sweetener (10%)',
  'socola-den-100-duong-an-kieng-50g': 'Selected Ben Tre cocoa beans (90%), pure cocoa butter, Isomalt sweetener (10%)',
  'socola-den-90-cacao-20g': 'Fermented Ben Tre cacao beans (90%), refined cane sugar (10%), pure cocoa butter',
  'socola-den-90-cacao-50g': 'Fermented Ben Tre cacao beans (90%), refined cane sugar (10%), pure cocoa butter',
  'socola-den-85-cacao-20g': 'Cacao mass (85%), pure cocoa butter, natural cane sugar (15%)',
  'socola-den-85-cacao-50g': 'Cacao mass (85%), pure cocoa butter, natural cane sugar (15%)',
  'socola-den-85-cacao-100g': 'Cacao mass (85%), pure cocoa butter, natural cane sugar (15%)',
  'socola-den-70-cacao-20g': 'Single-origin Ben Tre cacao mass (70%), pure cocoa butter, cane sugar (30%)',
  'socola-den-70-cacao-50g': 'Single-origin Ben Tre cacao mass (70%), pure cocoa butter, cane sugar (30%)',
  'socola-den-70-cacao-100g': 'Single-origin Ben Tre cacao mass (70%), pure cocoa butter, cane sugar (30%)',
  'set-qua-tang-chocolate-hoi-an-50g': 'Dark chocolate, milk chocolate, roasted cashews, almonds, pure cocoa butter',
  'set-qua-tang-chocolate-sai-gon-50g': 'Cacao mass, cocoa butter, milk powder, Dak Lak Robusta coffee extract',
  'set-qua-tang-chocolate-phu-quoc-50g': 'Fine chocolate, ripe Phu Quoc island black pepper, sea salt, cocoa butter',
  'set-qua-tang-chocolate-tay-bac-50g': '70% dark chocolate, wild Tra Bong cinnamon, cardamom, wild forest honey',
  'set-qua-tang-chocolate-non-la-vang-250g': 'Assorted dark and milk chocolates with almonds, cashews, and Ben Tre toasted coconut',
  'set-qua-tang-chocolate-non-la-trang-250g': 'Assorted dark and milk chocolates with almonds, cashews, and Ben Tre toasted coconut',
  'set-qua-tang-chocolate-non-la-tphcm-150g': 'Artisanal milk and dark chocolates, roasted almonds, cocoa nibs',
  'set-qua-tang-chocolate-non-la-ha-noi-150g': 'Cacao mass, roasted cashews, whole milk powder, unrefined cane sugar',
  'set-qua-tang-chocolate-non-la-ha-long-150g': 'Milk chocolate, toasted coconut flakes, roasted hazelnuts, cocoa butter',
  'set-qua-tang-chocolate-non-la-da-nang-150g': 'Artisanal chocolate pairing with macadamia nuts and roasted almonds',
  'set-qua-tang-chocolate-non-la-ben-tre-150g': 'Ben Tre cocoa, dried coconut meat, condensed milk, pure cocoa butter',
  'set-qua-tang-chocolate-non-la-hoi-an-150g': 'Milk chocolate, dark chocolate, kumquat marmalade, roasted cashews',
  'socola-sua-khong-nhan-20g': 'Whole milk powder, cacao mass, pure cocoa butter, cane sugar, soy lecithin',
  'socola-sua-khong-nhan-50g': 'Whole milk powder, cacao mass, pure cocoa butter, cane sugar, soy lecithin',
  'socola-sua-hanh-nhan-20g': 'Roasted California almonds (25%), fine milk chocolate (75%)',
  'socola-sua-hanh-nhan-50g': 'Roasted California almonds (25%), fine milk chocolate (75%)',
  'socola-sua-hat-dieu-20g': 'Roasted Binh Phuoc cashews (25%), cacao mass, whole milk powder, cocoa butter',
  'socola-sua-hat-dieu-50g': 'Roasted Binh Phuoc cashews (25%), cacao mass, whole milk powder, cocoa butter',
  'socola-sua-dua-20g': 'Toasted Ben Tre coconut flakes (20%), pure milk chocolate (80%)',
  'socola-sua-dua-50g': 'Toasted Ben Tre coconut flakes (20%), pure milk chocolate (80%)',
  'socola-sua-cacao-nibs-20g': 'Crispy roasted Ben Tre cocoa nibs (30%), fine milk chocolate (70%)',
  'socola-sua-cacao-nibs-50g': 'Crispy roasted Ben Tre cocoa nibs (30%), fine milk chocolate (70%)',
  'socola-sua-nho-kho-20g': 'Natural sun-dried raisins (25%), fine milk chocolate (75%)',
  'socola-sua-nho-kho-50g': 'Natural sun-dried raisins (25%), fine milk chocolate (75%)',
  'socola-sua-cookie-20g': 'Crispy butter cookie crumbs (20%), fine milk chocolate (80%)',
  'socola-sua-cookie-50g': 'Crispy butter cookie crumbs (20%), fine milk chocolate (80%)',
  'socola-sua-pho-mai-20g': 'Crispy cheddar cheese wafers (25%), fine milk chocolate (75%)',
  'socola-sua-pho-mai-50g': 'Crispy cheddar cheese wafers (25%), fine milk chocolate (75%)',
  'socola-sua-hanh-nhan-non-la-50g': 'Whole roasted almonds, premium milk chocolate, pure cocoa butter',
  'socola-sua-cacao-nibs-non-la-50g': 'Crisp roasted cocoa nibs, premium milk chocolate, pure cocoa butter',
  'socola-sua-khong-nhan-non-la-50g': 'Whole milk powder, Ben Tre cacao mass, pure cocoa butter, cane sugar',
  'socola-sua-pho-mai-non-la-50g': 'Cheddar cheese, crispy wafers, premium milk chocolate',
  'socola-sua-dua-non-la-50g': 'Toasted Ben Tre coconut flakes, premium milk chocolate',
  'keo-chocolate-da-nang-80g': 'Cacao mass, roasted cashews, whole milk powder, cane sugar, cocoa butter',
  'keo-chocolate-hue-80g': 'Milk chocolate, roasted sesame, cocoa butter, pure cane sugar',
  'keo-chocolate-hoi-an-80g': 'Milk chocolate, roasted sliced almonds, cocoa butter, cane sugar',
  'keo-chocolate-phu-quoc-80g': 'Milk chocolate, candied black pepper, sea salt, cocoa butter',
  'socola-sua-mut-dau-20g': 'Highland strawberry jam center (25%), fine milk chocolate (75%)',
  'socola-sua-mut-dau-50g': 'Highland strawberry jam center (25%), fine milk chocolate (75%)',
  'socola-sua-mut-xoai-20g': 'Tropical mango jam center (25%), fine milk chocolate (75%)',
  'socola-sua-mut-xoai-50g': 'Tropical mango jam center (25%), fine milk chocolate (75%)',
  'socola-sua-ca-phe-20g': 'Central Highland Robusta coffee extract, fine milk chocolate',
  'socola-sua-ca-phe-50g': 'Central Highland Robusta coffee extract, fine milk chocolate',
  'socola-sua-kem-sau-rieng-20g': 'Ri6 durian cream (25%), crispy wafer biscuit, fine milk chocolate',
  'socola-sua-kem-sau-rieng-50g': 'Ri6 durian cream (25%), crispy wafer biscuit, fine milk chocolate',
  'socola-sau-rieng-100g': 'Freeze-dried Ri6 durian fruit powder (15%), fine milk chocolate, pure cocoa butter',
  'socola-xoai-100g': 'Freeze-dried mango fruit pieces, cacao mass, cocoa butter, milk powder',
  'socola-dau-100g': 'Freeze-dried Highland strawberries, white & milk chocolate, cocoa butter',
  'socola-dubai-70g': 'Crispy toasted Kunafa pastry shreds, 100% pure pistachio butter, fine milk chocolate',
  'bot-cacao-nguyen-chat-150g': '100% fermented Ben Tre cocoa beans, defatted and alkalized to European standards',
  'bot-socola-sua-balance-150g': 'Pure cocoa powder (40%), New Zealand whole milk powder, cane sugar, natural vanilla',
  'socola-sua-tra-xanh-20g': 'Ceremonial Matcha green tea powder, fine milk chocolate, pure cocoa butter',
  'socola-sua-tra-xanh-50g': 'Ceremonial Matcha green tea powder, fine milk chocolate, pure cocoa butter',
  'bot-dau-nanh-me-den-moc-an-500g': 'Non-GMO roasted soybeans (60%), roasted black sesame (30%), whole oats, lotus seeds',
  'bot-yen-mach-socola-moc-an-500g': 'Fine rolled oats (65%), 100% pure cocoa powder (25%), chia seeds, Stevia leaf',
  'bot-yen-mach-dam-dau-ha-lan-moc-an-500g': 'Pea protein isolate (50%), whole grain oats (45%), freeze-dried banana powder',
  'bot-dau-den-moc-an-500g': '100% selected green-heart black beans, traditionally slow-roasted and stone-ground',
  'tra-la-sen-dau-tam-hong-sam-moc-an-150g': 'Young lotus leaves (40%), dried mulberries (30%), sliced Korean red ginseng (20%), sweet leaf (10%)',
};

export const SPECIFIC_PRODUCT_PACKAGING: Record<string, string> = {
  // 1. Matcha & Cascara
  'vtn-matcha-laka-ceremonial': 'Aluminum Zip Bag 100g (Carton of 20 bags / 2kg)',
  'vtn-matcha-laka-premium': 'Aluminum Zip Bag 100g (Carton of 20 bags / 2kg)',
  'vtn-matcha-laka-culinary': 'Vacuum Sealed Aluminum Bag 500g (Carton of 10 bags / 5kg)',
  'vtn-tra-xa-den': 'Box of 24 Filter Bags x 5g (Carton of 24 boxes)',
  'vtn-cascara-original': 'Kraft Zip Bag 100g (Carton of 24 bags)',
  'vtn-cascara-truyen-thong': 'Kraft Zip Bag 100g (Carton of 24 bags)',
  'vtn-cascara-dao': 'Kraft Zip Bag 100g (Carton of 24 bags)',
  'vtn-cascara-cam-que': 'Kraft Zip Bag 100g (Carton of 24 bags)',
  'vtn-cascara-gung': 'Kraft Zip Bag 100g (Carton of 24 bags)',
  'vtn-syrup-cascara-1000ml': 'Food-Grade PET Bottle 1000ml (Carton of 12 bottles)',
  'vtn-syrup-cascara-700ml': 'High-End Glass Bottle 700ml (Carton of 12 bottles)',

  // 2. Frozen Sugarcane Juice
  'vua-mia-tuyet-350ml': 'Carton of 28 packs x 350ml (IQF Deep-Frozen at -18°C)',

  // 3. Ngoc Linh Codonopsis & Herbs
  'dato-tra-sam-day': 'Box of 20 Filter Bags x 2g (Carton of 30 boxes)',
  'dato-tra-sam-lac-tien': 'Box of 20 Filter Bags x 2g (Carton of 30 boxes)',
  'dato-tra-sam-gung': 'Box of 20 Filter Bags x 2g (Carton of 30 boxes)',
  'dato-tra-gung-nhan-sam': 'Box of 20 Filter Bags x 2g (Carton of 30 boxes)',
  'dato-tra-kho-qua-rung': 'Box of 20 Filter Bags x 2g (Carton of 30 boxes)',
  'dato-tinh-chat-sam-day-mat-ong-500ml': 'Glass Bottle 500ml (Carton of 12 bottles)',
  'dato-tinh-chat-sam-day-mat-ong-250ml': 'Glass Bottle 250ml (Carton of 24 bottles)',
  'dato-tinh-chat-sam-day-200g': 'Box of 200g (Glass Jar / Carton of 24 jars)',
  'dato-tinh-chat-sam-day-400g': 'Box of 400g (Glass Jar / Carton of 12 jars)',
  'dato-tinh-chat-chanh-day-mat-ong-500ml': 'Glass Bottle 500ml (Carton of 12 bottles)',
  'dato-tinh-chat-chanh-day-mat-ong-250ml': 'Glass Bottle 250ml (Carton of 24 bottles)',
  'dato-tinh-chat-chanh-day-200g': 'Box of 200g (Glass Jar / Carton of 24 jars)',
  'dato-tinh-chat-chanh-day-400g': 'Box of 400g (Glass Jar / Carton of 12 jars)',
  'dato-tinh-chat-gung-mat-ong-500ml': 'Glass Bottle 500ml (Carton of 12 bottles)',
  'dato-tinh-chat-gung-mat-ong-250ml': 'Glass Bottle 250ml (Carton of 24 bottles)',
  'dato-tinh-chat-gung-200g': 'Box of 200g (Glass Jar / Carton of 24 jars)',
  'dato-tinh-chat-gung-400g': 'Box of 400g (Glass Jar / Carton of 12 jars)',
  'dato-tinh-chat-nghe-mat-ong-500ml': 'Glass Bottle 500ml (Carton of 12 bottles)',
  'dato-tinh-chat-nghe-mat-ong-250ml': 'Glass Bottle 250ml (Carton of 24 bottles)',
  'dato-tinh-chat-nghe-200g': 'Box of 200g (Glass Jar / Carton of 24 jars)',
  'dato-tinh-chat-nghe-400g': 'Box of 400g (Glass Jar / Carton of 12 jars)',
  'dato-mut-sam-day-150g': 'Glass Jar 150g (Carton of 24 jars)',
  'dato-mut-sam-day-100g': 'Glass Jar 100g (Carton of 24 jars)',
  'dato-sam-day-kho-1kg': 'Gift Box 1kg (Whole dried roots)',
  'dato-sam-day-kho-500g': 'Vacuum-Sealed Bag 500g',
  'dato-sam-day-kho-100g': 'Vacuum-Sealed Bag 100g',

  // 4. Coffee Cubes & Specialty Beans
  'nonla-vien-01-suadua': 'Individual Box 01 Cube (Carton of 100 boxes)',
  'nonla-vien-01-cacao': 'Individual Box 01 Cube (Carton of 100 boxes)',
  'nonla-vien-01-chanh': 'Individual Box 01 Cube (Carton of 100 boxes)',
  'nonla-vien-01-kemtrung': 'Individual Box 01 Cube (Carton of 100 boxes)',
  'nonla-vien-01-muoi': 'Individual Box 01 Cube (Carton of 100 boxes)',
  'nonla-vien-01-saurieng': 'Individual Box 01 Cube (Carton of 100 boxes)',
  'nonla-vien-01-americano': 'Individual Box 01 Cube (Carton of 100 boxes)',
  'nonla-vien-08-suadua': 'Gift Box of 8 Cubes (Carton of 24 boxes)',
  'nonla-vien-08-cacao': 'Gift Box of 8 Cubes (Carton of 24 boxes)',
  'nonla-vien-08-chanh': 'Gift Box of 8 Cubes (Carton of 24 boxes)',
  'nonla-vien-08-kemtrung': 'Gift Box of 8 Cubes (Carton of 24 boxes)',
  'nonla-vien-08-muoi': 'Gift Box of 8 Cubes (Carton of 24 boxes)',
  'nonla-vien-08-saurieng': 'Gift Box of 8 Cubes (Carton of 24 boxes)',
  'nonla-vien-08-americano': 'Gift Box of 8 Cubes (Carton of 24 boxes)',
  'nonla-hop-08-mix': 'Gift Box of 8 Cubes (Carton of 24 boxes)',
  'nonla-hop-18-mix': 'Gift Box of 18 Cubes (Carton of 16 boxes)',
  'nonla-hop-24-mix': 'Gift Box of 24 Cubes (Carton of 12 boxes)',
  'nonla-hop-42-mix': 'Master Gift Box of 42 Cubes (Carton of 6 boxes)',
  'nonla-tui-200g-hat': 'Valve Bag 200g (Carton of 25 bags)',
  'nonla-tui-200g-bot': 'Valve Bag 200g (Carton of 25 bags)',
  'aodai-hop-03-vien': 'Souvenir Box of 3 Cubes (Carton of 50 boxes)',
  'aodai-hop-06-vien': 'Souvenir Box of 6 Cubes (Carton of 30 boxes)',
  'aodai-hop-08-cacao': 'Souvenir Box of 8 Cubes (Carton of 24 boxes)',
  'aodai-hop-12-vien': 'Gift Box of 12 Cubes (Carton of 20 boxes)',
  'aodai-hop-50-cacao': 'Foodservice Box of 50 Cubes',
  'aodai-hop-50-caphe': 'Foodservice Box of 50 Cubes',

  // 5. Meat Floss & Specialty Jerky
  'phu-nha-cha-bong-heo-nuoc-mam': 'Sealed PET Jar 200g (Carton of 24 jars)',
  'phu-nha-cha-bong-heo-khong-duong': 'Sealed PET Jar 200g (Carton of 24 jars)',
  'phu-nha-cha-bong-heo-thuong-hang': 'Sealed PET Jar 250g (Carton of 24 jars)',
  'phu-nha-cha-bong-heo-nhuyen': 'Sealed PET Jar 200g (Carton of 24 jars)',
  'phu-nha-cha-bong-heo-cao-cap': 'Sealed PET Jar 200g (Carton of 24 jars)',
  'phu-nha-cha-bong-ga': 'Sealed PET Jar 200g (Carton of 24 jars)',
  'phu-nha-cha-bong-ga-hanh-phi': 'Sealed PET Jar 200g (Carton of 24 jars)',
  'phu-nha-kho-ga-la-chanh': 'Sealed PET Jar 250g (Carton of 24 jars)',
  'phu-nha-kho-heo-chay-toi': 'Sealed PET Jar 250g (Carton of 24 jars)',

  // 6. Artisanal Chocolates & Nutrition
  'socola-den-100-khong-duong-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-den-100-khong-duong-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-den-100-khong-duong-100g': 'Slab 100g (Carton of 30 bars)',
  'socola-den-100-duong-an-kieng-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-den-100-duong-an-kieng-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-den-90-cacao-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-den-90-cacao-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-den-85-cacao-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-den-85-cacao-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-den-85-cacao-100g': 'Slab 100g (Carton of 30 bars)',
  'socola-den-70-cacao-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-den-70-cacao-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-den-70-cacao-100g': 'Slab 100g (Carton of 30 bars)',
  'set-qua-tang-chocolate-hoi-an-50g': 'Gift Box 50g (6 pieces / Carton of 30 boxes)',
  'set-qua-tang-chocolate-sai-gon-50g': 'Gift Box 50g (6 pieces / Carton of 30 boxes)',
  'set-qua-tang-chocolate-phu-quoc-50g': 'Gift Box 50g (6 pieces / Carton of 30 boxes)',
  'set-qua-tang-chocolate-tay-bac-50g': 'Gift Box 50g (6 pieces / Carton of 30 boxes)',
  'set-qua-tang-chocolate-non-la-vang-250g': 'Luxury Conical Hat Box 250g (Carton of 10 boxes)',
  'set-qua-tang-chocolate-non-la-trang-250g': 'Luxury Conical Hat Box 250g (Carton of 10 boxes)',
  'set-qua-tang-chocolate-non-la-tphcm-150g': 'Conical Hat Souvenir Box 150g (Carton of 15 boxes)',
  'set-qua-tang-chocolate-non-la-ha-noi-150g': 'Conical Hat Souvenir Box 150g (Carton of 15 boxes)',
  'set-qua-tang-chocolate-non-la-ha-long-150g': 'Conical Hat Souvenir Box 150g (Carton of 15 boxes)',
  'set-qua-tang-chocolate-non-la-da-nang-150g': 'Conical Hat Souvenir Box 150g (Carton of 15 boxes)',
  'set-qua-tang-chocolate-non-la-ben-tre-150g': 'Conical Hat Souvenir Box 150g (Carton of 15 boxes)',
  'set-qua-tang-chocolate-non-la-hoi-an-150g': 'Conical Hat Souvenir Box 150g (Carton of 15 boxes)',
  'socola-sua-khong-nhan-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-sua-khong-nhan-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-sua-hanh-nhan-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-sua-hanh-nhan-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-sua-hat-dieu-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-sua-hat-dieu-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-sua-dua-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-sua-dua-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-sua-cacao-nibs-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-sua-cacao-nibs-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-sua-nho-kho-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-sua-nho-kho-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-sua-cookie-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-sua-cookie-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-sua-pho-mai-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-sua-pho-mai-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-sua-hanh-nhan-non-la-50g': 'Conical Hat Box 50g (Carton of 40 boxes)',
  'socola-sua-cacao-nibs-non-la-50g': 'Conical Hat Box 50g (Carton of 40 boxes)',
  'socola-sua-khong-nhan-non-la-50g': 'Conical Hat Box 50g (Carton of 40 boxes)',
  'socola-sua-pho-mai-non-la-50g': 'Conical Hat Box 50g (Carton of 40 boxes)',
  'socola-sua-dua-non-la-50g': 'Conical Hat Box 50g (Carton of 40 boxes)',
  'keo-chocolate-da-nang-80g': 'Souvenir Box 80g (Carton of 24 boxes)',
  'keo-chocolate-hue-80g': 'Souvenir Box 80g (Carton of 24 boxes)',
  'keo-chocolate-hoi-an-80g': 'Souvenir Box 80g (Carton of 24 boxes)',
  'keo-chocolate-phu-quoc-80g': 'Souvenir Box 80g (Carton of 24 boxes)',
  'socola-sua-mut-dau-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-sua-mut-dau-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-sua-mut-xoai-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-sua-mut-xoai-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-sua-ca-phe-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-sua-ca-phe-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-sua-kem-sau-rieng-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-sua-kem-sau-rieng-50g': 'Bar 50g (Carton of 50 bars)',
  'socola-sau-rieng-100g': 'Slab 100g (Carton of 30 bars)',
  'socola-xoai-100g': 'Slab 100g (Carton of 30 bars)',
  'socola-dau-100g': 'Slab 100g (Carton of 30 bars)',
  'socola-dubai-70g': 'Artisanal Bar 70g (Carton of 24 bars)',
  'bot-cacao-nguyen-chat-150g': 'Kraft Zip Bag 150g (Carton of 24 bags)',
  'bot-socola-sua-balance-150g': 'Kraft Zip Bag 150g (Carton of 24 bags)',
  'socola-sua-tra-xanh-20g': 'Individual Bar 20g (Display box of 20 bars)',
  'socola-sua-tra-xanh-50g': 'Bar 50g (Carton of 50 bars)',
  'bot-dau-nanh-me-den-moc-an-500g': 'Kraft Zip Bag 500g (Carton of 12 bags)',
  'bot-yen-mach-socola-moc-an-500g': 'Kraft Zip Bag 500g (Carton of 12 bags)',
  'bot-yen-mach-dam-dau-ha-lan-moc-an-500g': 'Kraft Zip Bag 500g (Carton of 12 bags)',
  'bot-dau-den-moc-an-500g': 'Kraft Zip Bag 500g (Carton of 12 bags)',
  'tra-la-sen-dau-tam-hong-sam-moc-an-150g': 'Kraft Zip Bag 150g (Carton of 20 bags)',
};

/**
 * High-End English translations for all 14 Health Benefits Data keys in HEALTH_BENEFITS_DATA
 */
export const SPECIFIC_HEALTH_BENEFITS: Record<string, ProductHealthBenefit> = {
  'matcha-ceremonial': {
    headline: 'Pristine Wellness Gift from Ancient Highland Tea Buds',
    quote: 'Superior antioxidant power, calm mental alertness, and youthful cellular skin nourishment.',
    points: [
      {
        iconType: 'sparkles',
        title: 'Cellular Anti-Aging & Radiant Skin',
        description: 'Contains 137x more natural EGCG antioxidants than standard green tea, shielding skin cells against ultraviolet damage and promoting natural moisture glow.',
      },
      {
        iconType: 'zap',
        title: 'Calm Alertness for 4–6 Hours',
        description: 'A harmonious synergy between natural L-Theanine and clean caffeine promotes focused mental clarity without caffeine jitters or heart palpitations.',
      },
      {
        iconType: 'leaf',
        title: 'Gentle Detox & Gut Health',
        description: 'Rich chlorophyll content naturally supports bodily toxin elimination, balances intestinal microbiome, and gently stimulates healthy metabolic rate.',
      },
    ],
    audiences: [
      {
        audience: 'Professionals & Young Creatives',
        icon: '💼',
        benefit: 'Stress-free focused creativity and sustained positive morning vitality.',
      },
      {
        audience: 'Women & Beauty Enthusiasts',
        icon: '✨',
        benefit: 'Deep inner cellular nourishment, melanin reduction, and delayed photo-aging.',
      },
      {
        audience: 'Seniors & Grandparents',
        icon: '🍵',
        benefit: 'Helps balance blood sugar, promotes healthy blood pressure, and brings serene tranquility.',
      },
    ],
    nutritionNote: 'Best enjoyed in the morning or early afternoon 30 minutes after meals for optimal antioxidant absorption.',
  },

  'matcha-premium': {
    headline: 'Clean Green Vitality for Active Lifestyles',
    quote: 'Natural chlorophyll reinforces physical stamina, purifies the system, and protects cardiovascular wellness.',
    points: [
      {
        iconType: 'sparkles',
        title: 'Cellular Rejuvenation & Purification',
        description: 'Packed with polyphenol antioxidants to flush metabolic waste and impart a healthy, rosy complexion.',
      },
      {
        iconType: 'heart',
        title: 'Cardiovascular & Vascular Support',
        description: 'Helps reduce LDL oxidation, maintains clear arterial walls, and supports smooth circulatory wellness.',
      },
      {
        iconType: 'zap',
        title: 'Metabolic Boost & Weight Balance',
        description: 'Enhances natural thermogenesis and caloric expenditure during workouts and daily physical activities.',
      },
    ],
    audiences: [
      {
        audience: 'Fitness & Sports Enthusiasts',
        icon: '🏃',
        benefit: 'Natural pre-workout fuel, faster post-exercise recovery, and sustained stamina.',
      },
      {
        audience: 'Baristas & Cafe Operators',
        icon: '☕',
        benefit: 'Vibrant jade hue and intense aromatic profile for premium specialty beverage menus.',
      },
      {
        audience: 'Office Workers',
        icon: '💻',
        benefit: 'Replaces artificial energy drinks with clean, wholesome plant-powered vitality.',
      },
    ],
    nutritionNote: 'Pairs exceptionally with fresh milk, oat milk, or chilled sparkling water for an energizing midday beverage.',
  },

  'matcha-culinary': {
    headline: 'Natural Superfood Essence for F&B Creations',
    quote: 'Retains vivid emerald green tone, rich tea aroma, and high cost efficiency under high baking temperatures.',
    points: [
      {
        iconType: 'leaf',
        title: 'Vibrant Heat-Resistant Green Color',
        description: 'Specially milled to preserve natural chlorophyll stability during baking, steaming, and beverage blending.',
      },
      {
        iconType: 'sparkles',
        title: 'Rich Tea Aroma & Bittersweet Balance',
        description: 'Robust authentic Japanese matcha flavor that cuts clearly through dairy milk, cream cheese, and butter.',
      },
      {
        iconType: 'shield',
        title: 'Certified Clean Food Safety',
        description: '100% pure tea leaves tested strictly for zero heavy metal residues and zero artificial colorings.',
      },
    ],
    audiences: [
      {
        audience: 'Pastry Chefs & Bakeries',
        icon: '🥐',
        benefit: 'Perfect color retention and distinct tea notes in croissants, cheesecakes, and cookies.',
      },
      {
        audience: 'Milk Tea & Beverage Chains',
        icon: '🧋',
        benefit: 'Optimized food-cost yield per cup with intense, recognizable matcha taste.',
      },
      {
        audience: 'Culinary Enthusiasts',
        icon: '👩‍🍳',
        benefit: 'Versatile pantry staple for homemade green tea lattes, pancakes, and ice creams.',
      },
    ],
  },

  'cascara-tea': {
    headline: 'Antioxidant Super-Tea from Ripe Coffee Cherries',
    quote: 'Crisp fruity sweetness, low caffeine, and 8x higher polyphenol levels than fresh blueberries.',
    points: [
      {
        iconType: 'sparkles',
        title: 'Super-Antioxidant Defense',
        description: 'Rich in polyphenols and chlorogenic acid to neutralize free radicals and guard cellular vitality.',
      },
      {
        iconType: 'sun',
        title: 'Gentle Awakening Without Jitters',
        description: 'Contains only 1/4 the caffeine of brewed coffee, providing gentle refreshment without sleep disruption.',
      },
      {
        iconType: 'leaf',
        title: 'Digestive Wellness & Gut Comfort',
        description: 'Natural organic fruit acids gently support intestinal motility and ease after-meal bloating.',
      },
    ],
    audiences: [
      {
        audience: 'Coffee & Tea Enthusiasts',
        icon: '🍒',
        benefit: 'Discover a novel, exotic fruit tea profile reminiscent of hibiscus, tamarind, and dried plums.',
      },
      {
        audience: 'Health-Conscious Drinkers',
        icon: '🌿',
        benefit: 'Zero artificial sugars, calorie-conscious hydration packed with raw fruit antioxidants.',
      },
      {
        audience: 'F&B Menu Developers',
        icon: '🍹',
        benefit: 'Sensational trending ingredient for cold brews, fruit teas, and signature mocktails.',
      },
    ],
  },

  'cascara-xa-den': {
    headline: 'Double Detox Shield: Mountain Celastrus & Cascara',
    quote: 'Ancient northern herbal remedy meets modern antioxidant coffee cherry tea for deep cellular cleansing.',
    points: [
      {
        iconType: 'shield',
        title: 'Liver Protection & Deep Detox',
        description: 'Active flavonoids and quinones in Hoa Binh Black Celastrus stimulate bile flow and ease hepatic burden.',
      },
      {
        iconType: 'moon',
        title: 'Soothing Tranquility & Restful Sleep',
        description: 'Calms internal body heat, stabilizes nervous tension, and encourages restorative overnight rest.',
      },
      {
        iconType: 'heart',
        title: 'Cellular Immune Fortification',
        description: 'Assists natural defense against chronic oxidative stress and cellular degeneration.',
      },
    ],
    audiences: [
      {
        audience: 'Busy Professionals & Social Drinkers',
        icon: '🍺',
        benefit: 'Clears alcohol toxins quickly, relieves morning heaviness, and protects liver cells.',
      },
      {
        audience: 'Middle-Aged & Senior Adults',
        icon: '🫖',
        benefit: 'Supports stable blood pressure, cools internal inflammation, and eases sleep onset.',
      },
      {
        audience: 'Individuals with Acne or Heat Symptoms',
        icon: '🌱',
        benefit: 'Purifies blood and clears heat-induced breakouts from the inside out.',
      },
    ],
  },

  'cascara-syrup': {
    headline: 'Artisanal Cascara Concentrate for Gourmet Mixology',
    quote: 'Intense natural fruit acidity, honeyed molasses sweetness, and 100% natural antioxidant extraction.',
    points: [
      {
        iconType: 'sparkles',
        title: 'Exotic Barista Flavor Enhancer',
        description: 'Adds layered notes of red berries, hibiscus, and dried stone fruits to specialty cocktails and sodas.',
      },
      {
        iconType: 'droplet',
        title: 'High Brix Concentration',
        description: 'A few drops deliver robust flavor and gorgeous sunset amber color, maximizing drink margins.',
      },
      {
        iconType: 'shield',
        title: 'Natural Sweetness from Cane Molasses',
        description: 'Crafted without high-fructose corn syrup or artificial food colorings.',
      },
    ],
    audiences: [
      {
        audience: 'Specialty Coffee Bars & Mixologists',
        icon: '🍸',
        benefit: 'Signature craft ingredient for Cascara Tonics, Cold Brew Spritzes, and gourmet lemonades.',
      },
      {
        audience: 'Upscale Restaurants & Lounges',
        icon: '🍽️',
        benefit: 'Distinctive non-alcoholic pairing syrup for sophisticated farm-to-table tasting menus.',
      },
      {
        audience: 'Home Mixology Enthusiasts',
        icon: '🥂',
        benefit: 'Elevate casual sodas, teas, and desserts with artisan Vietnamese coffee fruit syrup.',
      },
    ],
  },

  'vua-mia': {
    headline: 'IQF Cane Snow: 100% Natural Frozen Sugarcane Solution',
    quote: 'Cold-pressed from prime Tay Ninh purple cane, flash-frozen at -18°C to lock in active enzymes and minerals.',
    points: [
      {
        iconType: 'droplet',
        title: 'Rapid Natural Electrolyte Hydration',
        description: 'Instantly rehydrates cells with bioavailable potassium, magnesium, and natural sucrose.',
      },
      {
        iconType: 'sun',
        title: 'Zero Preservatives, Pure Raw Flavor',
        description: 'Preserves the fresh farm-gate crisp sweetness of freshly squeezed sugarcane without spoilage.',
      },
      {
        iconType: 'shield',
        title: 'Effortless F&B Standardized Logistics',
        description: 'Pre-portioned frozen packs eliminate manual peeling, pressing machines, and organic waste in stores.',
      },
    ],
    audiences: [
      {
        audience: 'Beverage & Fruit Juice Chains',
        icon: '🥤',
        benefit: 'Consistent taste year-round, zero machine maintenance, and rapid 15-second drink assembly.',
      },
      {
        audience: 'Athletes & Outdoor Workers',
        icon: '⚡',
        benefit: 'Pure natural isotonic energy boost that curbs physical exhaustion and heat stress.',
      },
      {
        audience: 'Export & Supermarket Partners',
        icon: '🚢',
        benefit: '12-month frozen shelf-life certified to strict international phytosanitary standards.',
      },
    ],
  },

  'dato-sam-day': {
    headline: 'Legendary Ngoc Linh Codonopsis: Mountain Longevity Herb',
    quote: 'Harvested above 1,500m on Ngoc Linh slopes, rich in Saponins to replenish Qi, blood, and vital stamina.',
    points: [
      {
        iconType: 'heart',
        title: 'Qi & Blood Nourishment (Tonifies Vitality)',
        description: 'Traditional Dang Shen replenishes spleen and lung Qi, combating chronic fatigue and paleness.',
      },
      {
        iconType: 'shield',
        title: 'Potent Saponin Immune Defense',
        description: 'Fortifies natural lymphocyte activity against viral infections and seasonal environmental stress.',
      },
      {
        iconType: 'sparkles',
        title: 'Rapid Physical Recovery',
        description: 'Accelerates convalescence for post-illness recovery, postpartum mothers, and exhausted elders.',
      },
    ],
    audiences: [
      {
        audience: 'Seniors & Elderly Family Members',
        icon: '👵',
        benefit: 'Sustains stamina, supports cardiovascular rhythm, and enhances day-to-day vigor.',
      },
      {
        audience: 'Hard-Working Professionals',
        icon: '💼',
        benefit: 'Combats brain fog, replenishes depleted reserves, and reduces afternoon burnout.',
      },
      {
        audience: 'Gourmet Chefs & Home Cooks',
        icon: '🍲',
        benefit: 'A precious, savory-sweet herbal foundation for tonic chicken soups and herbal broths.',
      },
    ],
  },

  'dato-mat-ong': {
    headline: 'Wild Mountain Honey & Concentrated Herbal Elixirs',
    quote: 'Pure multi-floral forest nectar combined with medicinal Ngoc Linh roots to soothe digestion and nourish life.',
    points: [
      {
        iconType: 'sparkles',
        title: 'Digestive Gastric Mucosa Comfort',
        description: 'Antibacterial forest honey coats stomach lining, easing acid reflux and gastric inflammation.',
      },
      {
        iconType: 'shield',
        title: 'Throat & Respiratory Soothing',
        description: 'Calms dry coughs, hoarseness, and scratchy throats with rich, smooth plant enzymes.',
      },
      {
        iconType: 'zap',
        title: 'Instant Natural Clean Energy',
        description: 'Easily digestible glucose and fructose provide immediate revitalization without energy crashes.',
      },
    ],
    audiences: [
      {
        audience: 'Individuals with Sensitive Stomachs',
        icon: '🍯',
        benefit: 'Daily morning spoonful in warm water provides gentle stomach comfort and eases acidity.',
      },
      {
        audience: 'Teachers, Speakers & Singers',
        icon: '🎤',
        benefit: 'Protects vocal cords, lubricates the larynx, and relieves vocal fatigue.',
      },
      {
        audience: 'Children & Elders',
        icon: '🧒',
        benefit: 'Wholesome natural sweetener packed with beneficial live enzymes and trace minerals.',
      },
    ],
  },

  'dato-tra-lac-tien': {
    headline: 'Forest Passionflower & Codonopsis Serene Sleep Tea',
    quote: 'Wild mountain sedatives gently calm overactive nerves, quiet the mind, and restore deep natural REM sleep.',
    points: [
      {
        iconType: 'moon',
        title: 'Natural Non-Habit-Forming Sleep Support',
        description: 'Passiflora flavonoids bind soothing GABA receptors, easing racing thoughts without morning grogginess.',
      },
      {
        iconType: 'heart',
        title: 'Nervous System Stress Relief',
        description: 'Lowers cortisol, relieves chronic tension, and promotes a profound sense of inner emotional tranquility.',
      },
      {
        iconType: 'leaf',
        title: 'Gentle Heart & Vessel Calming',
        description: 'Lotus heart alkaloids balance cardiac rhythm and cool nervous internal heat.',
      },
    ],
    audiences: [
      {
        audience: 'Chronic Insomnia Sufferers',
        icon: '🛌',
        benefit: 'Fall asleep faster naturally and awake feeling thoroughly refreshed and clear-headed.',
      },
      {
        audience: 'High-Stress Corporate Executives',
        icon: '📱',
        benefit: 'Unwind effortlessly after intense work hours, reducing nighttime screen-induced anxiety.',
      },
      {
        audience: 'Menopausal Women & Seniors',
        icon: '🌙',
        benefit: 'Alleviates nighttime restlessness, hot flashes, and disrupted sleep cycles.',
      },
    ],
  },

  'dato-tra-kho-qua-rung': {
    headline: 'Wild Forest Bitter Melon: Natural Glycemic Shield',
    quote: '100% whole wild melon rich in Charantin, assisting blood sugar balance, liver cooling, and metabolic reset.',
    points: [
      {
        iconType: 'shield',
        title: 'Healthy Blood Sugar Modulation',
        description: 'Charantin and polypeptide-p emulate plant insulin, improving peripheral glucose utilization.',
      },
      {
        iconType: 'leaf',
        title: 'Hepatic Heat Clearance & Detox',
        description: 'Cools internal heat, reduces liver enzyme strain, and encourages healthy fat metabolism.',
      },
      {
        iconType: 'heart',
        title: 'Cardiovascular Lipid Support',
        description: 'Assists in managing blood triglyceride levels and maintaining clean arterial pathways.',
      },
    ],
    audiences: [
      {
        audience: 'Pre-Diabetic & Type 2 Diabetic Individuals',
        icon: '🩺',
        benefit: 'A safe, daily herbal accompaniment for maintaining steady post-meal glycemic levels.',
      },
      {
        audience: 'Individuals with Internal Heat & Breakouts',
        icon: '🌿',
        benefit: 'Rapidly clears mouth ulcers, facial acne, and heat-induced body discomfort.',
      },
      {
        audience: 'Health & Weight Management Seekers',
        icon: '⚖️',
        benefit: 'Curbs sugar cravings and stimulates healthy, active lipid metabolism.',
      },
    ],
  },

  'nonla-coffee-freeze-dried': {
    headline: 'Breakthrough Freeze-Dried Coffee Cubes (SCA 84+)',
    quote: 'Aerospace freeze-drying captures 99% of delicate volatile coffee aromatics. Dissolves instantly in 3 seconds.',
    points: [
      {
        iconType: 'zap',
        title: '3-Second Instant Cold Solubility',
        description: 'Pours straight into icy water, cold milk, or soda without hot water brewing gear.',
      },
      {
        iconType: 'sparkles',
        title: 'Pure Barista-Grade Flavor Preservation',
        description: 'Gentle -40°C sublimation preserves subtle floral, caramel, and chocolate notes lost in spray-drying.',
      },
      {
        iconType: 'shield',
        title: 'Zero Sugar & Additive-Free Black Options',
        description: '100% clean coffee bean extract with zero artificial binders, corn fillers, or synthetic aromas.',
      },
    ],
    audiences: [
      {
        audience: 'Business Travelers & Remote Workers',
        icon: '✈️',
        benefit: 'Enjoy specialty coffee on planes, in hotel rooms, and on mountain treks in seconds.',
      },
      {
        audience: 'Boutique Hotels & High-End Pantries',
        icon: '🏨',
        benefit: 'Luxurious in-room amenity that elevates guest experience without bulky machines.',
      },
      {
        audience: 'Gift Givers & Cultural Admirers',
        icon: '🎁',
        benefit: 'Iconic packaging celebrating Vietnam’s proud Ao Dai and conical hat heritage.',
      },
    ],
  },

  'nonla-cacao-heritage': {
    headline: 'Ben Tre Single-Origin Artisanal Cacao Heritage',
    quote: 'Award-winning Vietnamese cocoa beans fermented with local banana leaves, bursting with rich rustic flavors.',
    points: [
      {
        iconType: 'heart',
        title: 'Cardiovascular Flavanol Health',
        description: 'High levels of pure cocoa flavanols promote nitric oxide production and arterial elasticity.',
      },
      {
        iconType: 'sparkles',
        title: 'Natural Mood Elevation & Theobromine',
        description: 'Clean theobromine stimulant lifts mood, encourages dopamine release, and relaxes blood vessels.',
      },
      {
        iconType: 'shield',
        title: 'Pure Cocoa Butter, Zero Palm Oil',
        description: 'Crafted with genuine cocoa butter for a luxurious melt-in-mouth finish without greasy trans fats.',
      },
    ],
    audiences: [
      {
        audience: 'Chocolate Connoisseurs & Foodies',
        icon: '🍫',
        benefit: 'Savor unique tropical fruit and tobacco notes native to Ben Tre Mekong delta soil.',
      },
      {
        audience: 'Pastry Chefs & Baristas',
        icon: '🎂',
        benefit: 'Unrivaled color and aroma intensity for cakes, brownies, hot chocolate, and dessert sauces.',
      },
      {
        audience: 'Families Seeking Clean Nutrition',
        icon: '🏡',
        benefit: 'Wholesome breakfast cocoa drink packed with natural magnesium, iron, and zinc.',
      },
    ],
  },

  'phunha-dac-san': {
    headline: 'Phu Nha: 30-Year Saigon Artisanal Meat Delicacies',
    quote: 'Handcrafted with fresh lean pork, Phu Quoc first-press fish sauce, and time-honored slow-roasting pans.',
    points: [
      {
        iconType: 'shield',
        title: 'Fresh Daily Lean Meat (Zero Fillers)',
        description: 'Only warm butchered lean meat from inspected slaughterhouses, zero filler flour or preservatives.',
      },
      {
        iconType: 'sparkles',
        title: 'Hand-Roasted Tender Fluffy Strands',
        description: 'Pounded gently to preserve long muscle fibers that melt softly without fibrous dryness.',
      },
      {
        iconType: 'heart',
        title: 'High Protein, Clean Seasoning',
        description: 'Over 70% bioavailable lean animal protein with minimal fat, seasoned with pure sea salt and fish sauce.',
      },
    ],
    audiences: [
      {
        audience: 'Children, Toddlers & Congee Lovers',
        icon: '👶',
        benefit: 'Super soft baby floss melts effortlessly in porridge, gentle on delicate digestions.',
      },
      {
        audience: 'Keto, Low-Carb & Gym Regimens',
        icon: '💪',
        benefit: 'Zero-sugar pork floss provides pure lean protein snacking without carbohydrate spikes.',
      },
      {
        audience: 'Traditional Bakeries & Snack Platters',
        icon: '🥖',
        benefit: 'Golden appetizing topping for banh mi, sticky rice, salted egg sponge cakes, and drinks.',
      },
    ],
  },
};
