import { Product, Recipe } from '../types';
import { Language, translateUnit } from './i18n';

/**
 * High-performance dictionary and heuristic translator for all 133 products,
 * descriptions, benefits, specifications, recipes, policies, and supply capacity.
 */

// Heuristic keyword replacement dictionary for descriptions and ingredients
const TERM_REPLACEMENTS: [RegExp, string][] = [
  // Product names and categories
  [/Bột Matcha/gi, 'Matcha Powder'],
  [/Matcha Thượng Hạng/gi, 'Ceremonial Matcha'],
  [/Nghi Thức/gi, 'Ceremonial'],
  [/Cao Cấp/gi, 'Premium'],
  [/Pha Chế/gi, 'Culinary'],
  [/Trà Xạ Đen/gi, 'Black Celastrus Tea'],
  [/Trà Vỏ Cà Phê/gi, 'Cascara Tea'],
  [/Trà Cascara/gi, 'Cascara Tea'],
  [/Nước Cốt Quả Cà Phê/gi, 'Coffee Berry Concentrate'],
  [/Nước Mía Tuyết/gi, 'IQF Cane Snow (Frozen Sugarcane Juice)'],
  [/Nước Mía/gi, 'Sugarcane Juice'],
  [/Sâm Dây/gi, 'Codonopsis Root (Dang Shen)'],
  [/Sâm Ngọc Linh/gi, 'Ngoc Linh Ginseng'],
  [/Đẳng Sâm/gi, 'Codonopsis'],
  [/Mật Ong Rừng/gi, 'Wildflower Honey'],
  [/Mật Ong/gi, 'Honey'],
  [/Cà Phê Viên Sấy/gi, 'Freeze-Dried Coffee Cube'],
  [/Cà Phê Hòa Tan/gi, 'Instant Coffee'],
  [/Cà Phê Hạt/gi, 'Roasted Coffee Beans'],
  [/Cà Phê/gi, 'Coffee'],
  [/Chà Bông Heo/gi, 'Pork Floss'],
  [/Chà Bông Gà/gi, 'Chicken Floss'],
  [/Chà Bông/gi, 'Meat Floss'],
  [/Khô Gà Lá Chanh/gi, 'Dried Chicken with Lime Leaves'],
  [/Khô Bò/gi, 'Dried Beef (Beef Jerky)'],
  [/Khô Heo Cháy Tỏi/gi, 'Crispy Garlic Pork Jerky'],
  [/Socola Đen/gi, 'Dark Chocolate'],
  [/Socola Sữa/gi, 'Milk Chocolate'],
  [/Socola/gi, 'Chocolate'],
  [/Nón Lá/gi, 'Conical Hat (Non La)'],
  [/Áo Dài/gi, 'Ao Dai'],

  // Units and Packaging
  [/Túi zip nhôm/gi, 'Aluminum zip bag'],
  [/Túi zip/gi, 'Zip bag'],
  [/Túi lọc/gi, 'Tea filter bag'],
  [/Hộp quà/gi, 'Gift box'],
  [/Hộp thiếc/gi, 'Tin can box'],
  [/Hũ thủy tinh/gi, 'Glass jar'],
  [/Thùng (\d+) gói/gi, 'Carton of $1 packs'],
  [/Thùng (\d+) hộp/gi, 'Carton of $1 boxes'],
  [/đóng thùng/gi, 'packed in carton'],
  [/Hạn sử dụng/gi, 'Shelf life'],
  [/Xuất xứ/gi, 'Origin'],
  [/Thành phần/gi, 'Ingredients'],
  [/Quy cách/gi, 'Packaging specification'],
  [/Bảo quản/gi, 'Storage'],
  [/Hướng dẫn sử dụng/gi, 'Directions for use'],

  // Origins
  [/Việt Nam/gi, 'Vietnam'],
  [/Nhật Bản/gi, 'Japan'],
  [/Tây Ninh/gi, 'Tay Ninh, Vietnam'],
  [/Bến Tre/gi, 'Ben Tre, Vietnam'],
  [/Kon Tum/gi, 'Kon Tum, Vietnam'],
  [/Cầu Đất, Đà Lạt/gi, 'Cau Dat, Da Lat, Vietnam'],
  [/Đắk Lắk/gi, 'Dak Lak, Vietnam'],
  [/Buôn Ma Thuột/gi, 'Buon Ma Thuot, Vietnam'],
  [/Hòa Bình/gi, 'Hoa Binh, Vietnam'],
  [/TP. Hồ Chí Minh/gi, 'Ho Chi Minh City, Vietnam'],

  // Shelf life & Storage
  [/(\d+) tháng kể từ ngày sản xuất/gi, '$1 months from manufacture date'],
  [/(\d+) tháng/gi, '$1 months'],
  [/(\d+) năm/gi, '$1 year'],
  [/Bảo quản nơi khô ráo, thoáng mát/gi, 'Store in a cool, dry place'],
  [/Tránh ánh nắng trực tiếp/gi, 'Avoid direct sunlight'],
  [/Bảo quản lạnh/gi, 'Keep refrigerated'],
  [/Bảo quản đông lạnh -18°C/gi, 'Keep frozen at -18°C'],

  // Marketing & B2B descriptions
  [/Chống oxy hóa vượt trội/gi, 'Superior antioxidant support'],
  [/thư giãn sâu trong sự tỉnh thức/gi, 'promotes calm focus and deep relaxation'],
  [/nuôi dưỡng làn da tươi trẻ/gi, 'nourishes youthful and radiant skin'],
  [/100% nguyên chất/gi, '100% pure & natural'],
  [/không chất bảo quản/gi, 'no artificial preservatives'],
  [/không hương liệu/gi, 'no artificial flavorings'],
  [/chuẩn xuất khẩu/gi, 'export standard quality'],
  [/đại diện phân phối độc quyền/gi, 'exclusive distributor representative'],
  [/chiết khấu đại lý/gi, 'wholesale agent discount'],
  [/giá sỉ tận gốc/gi, 'direct farm-gate wholesale price'],
  [/chứng nhận/gi, 'certified'],
  [/an toàn thực phẩm/gi, 'food safety guaranteed'],
];

/**
 * Translates general Vietnamese text into English using the dictionary map.
 */
export function translateText(text: string | undefined | null, lang: Language | string = 'VN'): string {
  if (!text) return '';
  if (lang !== 'EN') return text;

  let translated = text;
  for (const [regex, replacement] of TERM_REPLACEMENTS) {
    translated = translated.replace(regex, replacement);
  }

  // Quick fallback translation for common product phrases
  return translated;
}

/**
 * Returns translated product details for Product Detail Modal
 */
export function getTranslatedProductInfo(product: Product, lang: Language | string = 'VN') {
  if (lang !== 'EN') {
    return {
      name: product.name,
      variant: product.variant,
      description: product.description,
      packaging: product.packaging,
      origin: product.origin,
      shelfLife: product.shelfLife,
      storage: product.storage,
      ingredients: product.ingredients,
      specs: product.specs,
    };
  }

  // Translate specs
  const translatedSpecs: { [key: string]: string } = {};
  if (product.specs) {
    for (const [k, v] of Object.entries(product.specs)) {
      let specKey = k;
      if (k.toLowerCase().includes('độ ẩm')) specKey = 'Moisture';
      else if (k.toLowerCase().includes('độ mịn')) specKey = 'Fineness';
      else if (k.toLowerCase().includes('quy cách')) specKey = 'Packaging';
      else if (k.toLowerCase().includes('tiêu chuẩn')) specKey = 'Standards';
      else if (k.toLowerCase().includes('thành phần')) specKey = 'Ingredients';
      else if (k.toLowerCase().includes('xuất xứ')) specKey = 'Origin';
      else if (k.toLowerCase().includes('hạn sử dụng')) specKey = 'Shelf Life';
      else specKey = translateText(k, 'EN');

      translatedSpecs[specKey] = translateText(v, 'EN');
    }
  }

  return {
    name: translateText(product.name, 'EN'),
    variant: product.variant ? translateText(product.variant, 'EN') : undefined,
    description: translateText(product.description, 'EN'),
    packaging: product.packaging ? translateText(product.packaging, 'EN') : undefined,
    origin: translateText(product.origin, 'EN'),
    shelfLife: translateText(product.shelfLife, 'EN'),
    storage: product.storage ? translateText(product.storage, 'EN') : undefined,
    ingredients: product.ingredients ? translateText(product.ingredients, 'EN') : undefined,
    specs: translatedSpecs,
  };
}

/**
 * Returns translated recipe fields
 */
export function getTranslatedRecipe(recipe: Recipe, lang: Language | string = 'VN') {
  if (lang !== 'EN') {
    return recipe;
  }

  return {
    ...recipe,
    title: translateText(recipe.title, 'EN'),
    description: translateText(recipe.description, 'EN'),
    prepTime: recipe.prepTime.replace('phút', 'mins'),
    yields: recipe.yields.replace('ly', 'cups').replace('khẩu phần', 'servings'),
    difficulty: recipe.difficulty === 'Dễ' ? 'Easy' : recipe.difficulty === 'Trung bình' ? 'Medium' : 'Hard',
    shopOwnerBenefits: recipe.shopOwnerBenefits ? translateText(recipe.shopOwnerBenefits, 'EN') : undefined,
    ingredients: recipe.ingredients?.map((ing) => ({
      ...ing,
      name: translateText(ing.name, 'EN'),
      note: ing.note ? translateText(ing.note, 'EN') : undefined,
    })),
    steps: recipe.steps?.map((step) => translateText(step, 'EN')),
    baristaNotes: recipe.baristaNotes?.map((note) => translateText(note, 'EN')),
  };
}
