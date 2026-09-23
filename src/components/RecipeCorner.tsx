import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Clock,
  Sparkles,
  TrendingUp,
  ShoppingBag,
  CheckCircle2,
  X,
  Search,
  Check,
  ChevronRight,
  Flame,
  Layers,
  Award,
  Coins,
  Receipt,
  ArrowUpRight,
} from 'lucide-react';
import { RECIPES } from '../data/recipes';
import { Recipe, Product, Currency, PurchaseMode, PartnerId } from '../types';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/pricing';
import { RecipeQRCode } from './RecipeQRCode';
import { RecipeIngredientCard, RecipeIngredientItem } from './RecipeIngredientCard';
import {
  PartnerFilterModal,
  PartnerFilterTrigger,
  PartnerItem,
} from './PartnerFilterNavigation';

interface RecipeCornerProps {
  currency: Currency;
  exchangeRate?: number;
  onAddToCart: (product: Product, quantity: number, purchaseMode?: PurchaseMode) => void;
  onSelectProduct: (product: Product, fromRecipeId?: string) => void;
  activeRecipeId?: string | null;
  onRecipeModalChange?: (recipe: Recipe | null) => void;
  cartItemCount?: number;
  cartTotalPrice?: number;
  onOpenCart?: () => void;
}

export const RecipeCorner: React.FC<RecipeCornerProps> = ({
  currency,
  exchangeRate,
  onAddToCart,
  onSelectProduct,
  activeRecipeId,
  onRecipeModalChange,
  cartItemCount = 0,
  cartTotalPrice = 0,
  onOpenCart,
}) => {
  // Hàng 1: Ngành Hàng [Tất cả] [Nông Sản] [Đặc Sản]
  const [selectedSector, setSelectedSector] = useState<'all' | 'nong-san' | 'dac-san'>('all');
  // Hàng 2: Đối Tác Cung Ứng
  const [selectedPartnerTab, setSelectedPartnerTab] = useState<PartnerId | 'all'>('all');
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState<boolean>(false);
  // Hàng 3: Chuyên Mục Món Ăn
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalRecipe, setModalRecipe] = useState<Recipe | null>(null);
  const [addedSuccessMap, setAddedSuccessMap] = useState<{ [recipeId: string]: boolean }>({});
  // Homepage displays 8 recipes by default, can expand to show all
  const [showAllRecipes, setShowAllRecipes] = useState<boolean>(false);

  // Sync modal when activeRecipeId is passed from React Router or deep-link
  useEffect(() => {
    if (activeRecipeId) {
      const found = RECIPES.find((r) => r.id === activeRecipeId);
      if (found && modalRecipe?.id !== found.id) {
        setModalRecipe(found);
      }
    } else if (activeRecipeId === null && modalRecipe) {
      setModalRecipe(null);
    }
  }, [activeRecipeId, modalRecipe]);

  const handleOpenModal = (recipe: Recipe) => {
    setModalRecipe(recipe);
    onRecipeModalChange?.(recipe);
  };

  const handleCloseModal = () => {
    setModalRecipe(null);
    onRecipeModalChange?.(null);
  };

  // Helper to match recipe to category / partner
  const matchesPartnerCategory = (recipe: Recipe, partnerTab: PartnerId | 'all') => {
    if (partnerTab === 'all') return true;
    if (partnerTab === 'matcha-tra-laka' || partnerTab === 'matcha-laka') {
      return (
        recipe.partnerId === 'matcha-tra-laka' ||
        recipe.partnerId === 'matcha-laka' ||
        recipe.partnerId === 'viet-thao-nhien' ||
        recipe.title.toLowerCase().includes('matcha')
      );
    }
    if (partnerTab === 'nuoc-mia-iqf' || partnerTab === 'nuoc-mia-tuyet') {
      return (
        recipe.partnerId === 'nuoc-mia-iqf' ||
        recipe.partnerId === 'nuoc-mia-tuyet' ||
        recipe.partnerId === 'vua-mia'
      );
    }
    if (partnerTab === 'thao-duoc-sam' || partnerTab === 'tra-cascara-thao-moc') {
      return (
        recipe.partnerId === 'thao-duoc-sam' ||
        recipe.partnerId === 'thao-duoc-dato' ||
        recipe.partnerId === 'tra-cascara-thao-moc' ||
        recipe.title.toLowerCase().includes('sâm')
      );
    }
    if (partnerTab === 'ca-phe-vien-say' || partnerTab === 'ca-phe-vien-hat') {
      return (
        recipe.partnerId === 'ca-phe-vien-say' ||
        recipe.partnerId === 'ca-phe-vien-hat' ||
        recipe.partnerId === 'non-la-aodai' ||
        recipe.title.toLowerCase().includes('cà phê')
      );
    }
    if (partnerTab === 'dac-san-snack' || partnerTab === 'cha-bong-kho') {
      return (
        recipe.partnerId === 'dac-san-snack' ||
        recipe.partnerId === 'cha-bong-kho' ||
        recipe.partnerId === 'phu-nha'
      );
    }
    if (partnerTab === 'socola-qua-tang') {
      return (
        recipe.partnerId === 'socola-qua-tang' ||
        recipe.title.toLowerCase().includes('cacao') ||
        recipe.title.toLowerCase().includes('socola') ||
        recipe.title.toLowerCase().includes('chocolate')
      );
    }
    return recipe.partnerId === partnerTab;
  };

  const getRecipeSector = (recipe: Recipe): 'nong-san' | 'dac-san' => {
    if (
      recipe.partnerId === 'dac-san-snack' ||
      recipe.partnerId === 'cha-bong-kho' ||
      recipe.partnerId === 'phu-nha' ||
      recipe.partnerId === 'socola-qua-tang' ||
      recipe.title.toLowerCase().includes('cacao') ||
      recipe.title.toLowerCase().includes('socola') ||
      recipe.title.toLowerCase().includes('chocolate')
    ) {
      return 'dac-san';
    }
    return 'nong-san';
  };

  // Danh sách các nhóm ngành hàng trong Góc Công Thức
  const partnerTabs: PartnerItem[] = useMemo(
    () => [
      {
        id: 'all',
        label: 'Tất cả ngành hàng',
        count: RECIPES.length,
        badge: 'Toàn bộ 60+ công thức pha chế & F&B',
        avatar: 'https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png',
      },
      {
        id: 'matcha-tra-laka',
        label: '1. Matcha & Trà',
        count: RECIPES.filter((r) => r.partnerId === 'matcha-tra-laka' || r.partnerId === 'matcha-laka' || r.partnerId === 'viet-thao-nhien').length || 10,
        badge: 'Matcha Laka Ceremonial & Barista',
        sector: 'nong-san',
        avatar: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'nuoc-mia-iqf',
        label: '2. Nước Mía Tuyết',
        count: RECIPES.filter((r) => r.partnerId === 'nuoc-mia-iqf' || r.partnerId === 'nuoc-mia-tuyet' || r.partnerId === 'vua-mia').length || 10,
        badge: 'Nước Mía Tuyết IQF -40°C',
        sector: 'nong-san',
        avatar: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'thao-duoc-sam',
        label: '3. Thảo Dược Sâm',
        count: RECIPES.filter((r) => r.partnerId === 'thao-duoc-sam' || r.partnerId === 'thao-duoc-dato' || r.partnerId === 'tra-cascara-thao-moc').length || 12,
        badge: 'Sâm Dây Ngọc Linh & Mật Ong Tự Nhiên',
        sector: 'nong-san',
        avatar: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'ca-phe-vien-say',
        label: '4. Cà Phê',
        count: RECIPES.filter((r) => r.partnerId === 'ca-phe-vien-say' || r.partnerId === 'ca-phe-vien-hat' || r.partnerId === 'non-la-aodai').length || 11,
        badge: 'Cà Phê Thăng Hoa & Specialty SCA 84+',
        sector: 'nong-san',
        avatar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'dac-san-snack',
        label: '5. Đặc Sản & Snack',
        count: RECIPES.filter((r) => r.partnerId === 'dac-san-snack' || r.partnerId === 'cha-bong-kho' || r.partnerId === 'phu-nha').length || 10,
        badge: 'Chà Bông Sạch & Khô Thượng Hạng',
        sector: 'dac-san',
        avatar: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'socola-qua-tang',
        label: '6. Socola & Cacao',
        count: RECIPES.filter((r) => r.partnerId === 'socola-qua-tang').length || 15,
        badge: 'Socola Nghệ Thuật & Cacao Bến Tre',
        sector: 'dac-san',
        avatar: '/images/socola/socola-den-100-khong-duong-50g.jpg',
      },
    ],
    []
  );

  const categories = [
    { id: 'all', label: 'Tất cả chuyên mục' },
    { id: 'Món Ăn Nhẹ & Topping', label: 'Món Ăn Nhẹ & Topping Thượng Hạng', isDedicated: true },
    { id: 'Trà & Giải khát', label: 'Trà & Giải khát' },
    { id: 'Cà phê đặc sản', label: 'Cà phê đặc sản' },
    { id: 'Cocktail & Mocktail', label: 'Cocktail & Mocktail' },
    { id: 'Đồ uống bồi bổ', label: 'Dược liệu dưỡng sinh' },
  ];

  // CASCADE FILTER LOGIC
  const visibleCategories = useMemo(() => {
    if (selectedPartnerTab !== 'all') {
      const validCats = new Set<string>(
        RECIPES.filter((r) => matchesPartnerCategory(r, selectedPartnerTab)).map((r) => r.category)
      );
      return categories.filter((c) => c.id === 'all' || validCats.has(c.id));
    }
    if (selectedSector !== 'all') {
      const validCats = new Set<string>(
        RECIPES.filter((r) => getRecipeSector(r) === selectedSector).map((r) => r.category)
      );
      return categories.filter((c) => c.id === 'all' || validCats.has(c.id));
    }
    return categories;
  }, [categories, selectedSector, selectedPartnerTab]);

  const handleSectorChange = (sector: 'all' | 'nong-san' | 'dac-san') => {
    setSelectedSector(sector);
    setSelectedCategory('all');
    if (sector === 'all') {
      setSelectedPartnerTab('all');
    } else if (sector === 'dac-san') {
      if (selectedPartnerTab !== 'dac-san-snack' && selectedPartnerTab !== 'cha-bong-kho' && selectedPartnerTab !== 'phu-nha' && selectedPartnerTab !== 'socola-qua-tang') {
        setSelectedPartnerTab('all');
      }
    } else if (sector === 'nong-san') {
      if (selectedPartnerTab === 'dac-san-snack' || selectedPartnerTab === 'cha-bong-kho' || selectedPartnerTab === 'phu-nha' || selectedPartnerTab === 'socola-qua-tang') {
        setSelectedPartnerTab('all');
      }
    }
  };

  const handleSelectPartnerTab = (partnerId: PartnerId | 'all') => {
    setSelectedPartnerTab(partnerId);
    setSelectedCategory('all');
    if (partnerId === 'all') {
      setSelectedSector('all');
    } else if (partnerId === 'dac-san-snack' || partnerId === 'cha-bong-kho' || partnerId === 'phu-nha' || partnerId === 'socola-qua-tang') {
      setSelectedSector('dac-san');
    } else {
      setSelectedSector('nong-san');
    }
  };

  const handleClearPartnerFilter = () => {
    setSelectedPartnerTab('all');
    setSelectedSector('all');
    setSelectedCategory('all');
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Filter recipes by sector, partner tab, category and search query
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      const matchPartner = matchesPartnerCategory(recipe, selectedPartnerTab);
      if (selectedPartnerTab !== 'all' && !matchPartner) {
        return false;
      }
      const recipeSector = getRecipeSector(recipe);
      const matchSector =
        selectedSector === 'all' || selectedPartnerTab !== 'all' || recipeSector === selectedSector;
      const matchCat =
        selectedCategory === 'all' || recipe.category === selectedCategory;
      const matchSearch =
        !searchQuery.trim() ||
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchSector && matchPartner && matchCat && matchSearch;
    });
  }, [selectedSector, selectedPartnerTab, selectedCategory, searchQuery]);

  // Display 10 recipes (2 rows of 5 cards on desktop) if not expanded and no active filter
  const isFiltering =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedPartnerTab !== 'all' ||
    selectedSector !== 'all';
  const displayedRecipes = useMemo(() => {
    if (showAllRecipes || isFiltering) {
      return filteredRecipes;
    }
    return filteredRecipes.slice(0, 10);
  }, [filteredRecipes, showAllRecipes, isFiltering]);

  // Helper resolver for Chút Chíu product IDs and legacy aliases
  const resolveChutChiuProduct = (id: string): Product | undefined => {
    let prod = PRODUCTS.find((p) => p.id === id);
    if (prod) return prod;

    const lower = id.toLowerCase();
    if (lower.includes('mat-ong-sam-day') || lower.includes('sam-day-400g')) {
      return PRODUCTS.find((p) => p.id === 'dato-tinh-chat-sam-day-400g');
    }
    if (lower.includes('sam-day-200g')) {
      return PRODUCTS.find((p) => p.id === 'dato-tinh-chat-sam-day-200g');
    }
    if (lower.includes('nuoc-cot-qua-ca-phe') || lower.includes('syrup-cascara')) {
      return PRODUCTS.find((p) => p.id === 'vtn-syrup-cascara-700ml') || PRODUCTS.find((p) => p.id === 'vtn-syrup-cascara-1000ml');
    }
    if (lower.includes('americano') || lower.includes('robusta') || lower.includes('arabica') || lower.includes('coldbrew')) {
      return PRODUCTS.find((p) => p.id === 'nonla-vien-08-americano');
    }
    if (lower.includes('suadua') || lower.includes('coconut')) {
      return PRODUCTS.find((p) => p.id === 'nonla-vien-08-suadua');
    }
    if (lower.includes('kemtrung') || lower.includes('caramel')) {
      return PRODUCTS.find((p) => p.id === 'nonla-vien-08-kemtrung');
    }
    if (lower.includes('bot-cacao') || lower.includes('bột cacao')) {
      return PRODUCTS.find((p) => p.id === 'bot-cacao-nguyen-chat-150g') || PRODUCTS.find((p) => p.id === 'bot-cacao-nguyen-chat-500g');
    }
    if (lower.includes('socola') || lower.includes('chocolate')) {
      return PRODUCTS.find((p) => p.id === 'socola-den-100-khong-duong-50g') || PRODUCTS.find((p) => p.id === 'socola-den-70-cacao-50g') || PRODUCTS.find((p) => p.partnerId === 'socola-qua-tang');
    }
    if (lower.includes('cacao') || lower.includes('tiramisu')) {
      return PRODUCTS.find((p) => p.id === 'bot-cacao-nguyen-chat-150g') || PRODUCTS.find((p) => p.partnerId === 'socola-qua-tang');
    }
    if (lower.includes('tra-xa-den') || lower.includes('xa-den')) {
      return PRODUCTS.find((p) => p.id === 'vtn-tra-xa-den');
    }
    if (lower.includes('chanh-dao') || lower.includes('chanh-day')) {
      return PRODUCTS.find((p) => p.id === 'dato-tinh-chat-chanh-day-400g');
    }
    if (lower.includes('dong-trung')) {
      return PRODUCTS.find((p) => p.id === 'dato-tinh-chat-sam-day-400g');
    }
    if (lower.includes('gung')) {
      return PRODUCTS.find((p) => p.id === 'dato-tinh-chat-gung-400g');
    }
    if (lower.includes('hoa-cuc') || lower.includes('giao-co-lam')) {
      return PRODUCTS.find((p) => p.id === 'dato-tra-sam-lac-tien' || p.id === 'dato-tra-sam-day');
    }
    if (lower.includes('cascara')) {
      return PRODUCTS.find((p) => p.id === 'vtn-cascara-truyen-thong');
    }
    if (lower.includes('matcha')) {
      return PRODUCTS.find((p) => p.id === 'vtn-matcha-laka-ceremonial');
    }
    if (lower.includes('mia')) {
      return PRODUCTS.find((p) => p.id === 'vua-mia-tuyet-350ml');
    }
    if (lower.includes('cha-bong') || lower.includes('kho-ga') || lower.includes('kho-heo')) {
      return PRODUCTS.find((p) => p.id === 'phu-nha-cha-bong-heo-thuong-hang');
    }

    return undefined;
  };

  // Helper to retrieve all genuine Chút Chíu products from the 5 strategic partners involved in a recipe
  const getRecipeProducts = (recipe: Recipe): Product[] => {
    const products: Product[] = [];
    const addedIds = new Set<string>();

    // 1. Chỉ lấy sản phẩm chính hãng Chút Chíu khai báo trong recipe.productIds
    if (recipe.productIds && recipe.productIds.length > 0) {
      recipe.productIds.forEach((id) => {
        const found = resolveChutChiuProduct(id);
        if (found && !addedIds.has(found.id)) {
          products.push(found);
          addedIds.add(found.id);
        }
      });
    }

    // 2. Sản phẩm khai báo trong recipe.ingredients có productId chính hãng
    recipe.ingredients?.forEach((ing) => {
      if (ing.productId) {
        const found = resolveChutChiuProduct(ing.productId);
        if (found && !addedIds.has(found.id)) {
          products.push(found);
          addedIds.add(found.id);
        }
      }
    });

    // 3. Fallback: Nếu công thức chưa khai báo productIds, map sản phẩm chủ đạo từ đối tác chiến lược
    if (products.length === 0) {
      const partnerProducts = PRODUCTS.filter(
        (p) => p.partnerId === recipe.partnerId
      );
      if (partnerProducts.length > 0) {
        const match =
          partnerProducts.find(
            (p) =>
              (recipe.productName && recipe.productName.toLowerCase().includes(p.name.toLowerCase())) ||
              recipe.title.toLowerCase().includes(p.name.toLowerCase())
          ) || partnerProducts[0];
        if (match && !addedIds.has(match.id)) {
          products.push(match);
          addedIds.add(match.id);
        }
      }
    }

    // TUYỆT ĐỐI KHÔNG tự ý chèn thêm nguyên liệu phụ không do công ty phân phối!
    return products;
  };

  // Danh sách các nguyên liệu phụ mua ngoài - TUYỆT ĐỐI KHÔNG DẪN LINK, KHÔNG ICON NGÔI SAO, CHỮ THƯỜNG XÁM NHẠT
  const AUXILIARY_INGREDIENT_KEYWORDS = [
    'siro',
    'syrup',
    'soda',
    'schweppes',
    'đá viên',
    'da vien',
    'đá bào',
    'lát cam',
    'lat cam',
    'cam vàng',
    'cam sành',
    'chanh tươi',
    'chanh tuoi',
    'lát chanh',
    'chanh vàng',
    'chanh xanh',
    'lá bạc hà',
    'bạc hà tươi',
    'hương thảo',
    'rosemary',
    'thanh quế',
    'quế nướng',
    'sữa tươi',
    'sua tuoi',
    'sữa đặc',
    'sua dac',
    'sữa yến mạch',
    'sua yen mach',
    'sữa hạt',
    'nước lọc',
    'nuoc loc',
    'nước ấm',
    'nước nóng',
    'nước sôi',
    'đường cát',
    'đường phèn',
    'đường bắp',
    'nước đường',
    'muối biển',
    'muối hồng',
    'muối ăn',
    'bột béo',
    'kem béo',
    'whipping cream',
    'cold foam',
    'foam kem',
    'trứng gà',
    'lòng đỏ',
    'lòng trắng',
    'bột cacao rắc',
    'cacao rắc',
    'cacao bột',
    'bột quế',
    'hạt sen tươi',
    'hạt sen',
    'thạch',
    'trân châu',
    'bánh mì',
    'xôi nếp',
    'cháo trắng',
    'hành phi ngoài',
    'tỏi phi ngoài',
    'dưa leo',
    'đồ chua',
    'rau răm',
    'ớt tươi',
  ];

  // Helper to determine if an ingredient in the recipe belongs to Chút Chíu's 5 strategic partners
  const isChutChiuIngredient = (
    ing: { name: string; amount: string; note?: string; productId?: string },
    recipe: Recipe
  ): { isChutChiu: boolean; product?: Product } => {
    const nameLower = ing.name.toLowerCase();

    // KIỂM TRA BẮT BUỘC: Nếu là nguyên liệu phụ mua ngoài (Siro, Soda, Đá viên, Sữa tươi...)
    // và không gắn kèm thương hiệu đối tác chính thức -> Trả về false ngay lập tức!
    const isExplicitAuxiliary = AUXILIARY_INGREDIENT_KEYWORDS.some((kw) => nameLower.includes(kw));
    const hasBrandKeyword =
      nameLower.includes('chút chíu') ||
      nameLower.includes('laka') ||
      nameLower.includes('cascara') ||
      nameLower.includes('mía tuyết') ||
      nameLower.includes('sâm dây') ||
      nameLower.includes('ngọc linh') ||
      nameLower.includes('cà phê viên') ||
      nameLower.includes('thăng hoa') ||
      nameLower.includes('chà bông') ||
      nameLower.includes('socola') ||
      nameLower.includes('cacao');

    if (isExplicitAuxiliary && !hasBrandKeyword) {
      return { isChutChiu: false };
    }

    // 1. Explicit productId từ 5 đối tác chính thức
    if (ing.productId) {
      const prod = resolveChutChiuProduct(ing.productId);
      if (prod) return { isChutChiu: true, product: prod };
      const directProd = PRODUCTS.find((p) => p.id === ing.productId);
      if (directProd) return { isChutChiu: true, product: directProd };
    }

    // 2. Exact match in official partner PRODUCTS
    const matchedProd = PRODUCTS.find(
      (p) =>
        nameLower.includes(p.name.toLowerCase()) ||
        (p.name.length > 10 && p.name.toLowerCase().includes(nameLower))
    );
    if (matchedProd) return { isChutChiu: true, product: matchedProd };

    // 3. Strategic distinctive product keywords (dòng sản phẩm chính thức)
    const strategicPartnerKeywords = [
      'matcha laka',
      'bột matcha',
      'cascara laka',
      'trà cascara',
      'nước cốt quả cà phê',
      'trà xạ đen',
      'nước mía tuyết',
      'mật mía nguyên chất',
      'sâm dây ngọc linh',
      'tinh chất sâm dây',
      'mật ong hoa rừng sâm dây',
      'tinh chất chanh dây',
      'mật ong đông trùng hạ thảo',
      'mật ong gừng',
      'trà sâm dây',
      'trà khổ qua rừng',
      'cà phê viên sấy thăng hoa',
      'viên cà phê sấy thăng hoa',
      'viên cà phê thăng hoa',
      'chà bông heo',
      'chà bông gà',
      'khô bò',
      'khô heo cháy tỏi',
      'khô gà lá chanh',
      'đặc sản snack',
      'bột cacao nguyên chất',
      'bột cacao',
      'cacao nguyên chất',
      'socola đen',
      'socola sữa',
      'socola hạt điều',
      'socola thanh',
      'kẹo socola',
      'bột ngũ cốc',
      'bột mộc an',
    ];

    if (strategicPartnerKeywords.some((kw) => nameLower.includes(kw))) {
      // Tìm sản phẩm gần nhất từ danh mục đối tác trong công thức
      const partnerProds = PRODUCTS.filter((p) => p.partnerId === recipe.partnerId);
      const fallbackMatch = partnerProds.find(
        (p) => nameLower.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(nameLower)
      ) || partnerProds[0];

      return { isChutChiu: true, product: fallbackMatch };
    }

    return { isChutChiu: false };
  };

  // Helper to retrieve the ingredient card items for the recipe detail modal
  const getRecipeIngredientItems = (recipe: Recipe): RecipeIngredientItem[] => {
    const prods = getRecipeProducts(recipe);
    return prods.map((prod) => ({
      id: prod.id,
      name: prod.name,
      partnerName: prod.partnerName,
      image: prod.image,
      productId: prod.id,
    }));
  };

  // Handle adding all recipe ingredients into cart with 1 click
  const handleAddAllToCart = (recipe: Recipe, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const productsToAdd = getRecipeProducts(recipe);
    if (productsToAdd.length === 0) return;

    productsToAdd.forEach((prod) => {
      onAddToCart(prod, 1, 'wholesale');
    });

    setAddedSuccessMap((prev) => ({ ...prev, [recipe.id]: true }));
    setTimeout(() => {
      setAddedSuccessMap((prev) => ({ ...prev, [recipe.id]: false }));
    }, 2500);
  };

  return (
    <section
      id="goc-cong-thuc"
      className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-stone-50 via-emerald-50/20 to-stone-100 text-stone-900"
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-stone-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#d4af37]/20 text-[#8e6b12] border border-[#d4af37]/30 uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
            Góc Công Thức & Giải Pháp Menu F&B (50+ Công Thức Chuẩn Quán)
          </div>
          <h2 className="text-[16px] sm:text-[18px] md:text-3xl font-black text-stone-950 tracking-tight font-heading">
            Góc Công Thức & Giải Pháp Menu F&B
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
            Tặng trọn đời <strong>50+ công thức pha chế & món ăn nhẹ topping</strong> (Matcha Laka, Cascara, Nước Mía Tuyết IQF, Sâm Dây Ngọc Linh, Cà Phê Thăng Hoa, Chà Bông & Khô Thượng Hạng). Bảng tính chi tiết giá cost vốn, giá bán đề xuất và biên lợi nhuận ròng.
          </p>
        </div>

        {/* BỘ LỌC CÔNG THỨC 3 HÀNG ĐỒNG BỘ (V50) */}
        <div className="mb-4 sm:mb-6 space-y-2.5">
          {/* HÀNG 1: Bộ lọc Ngành hàng lớn [Tất cả] [Nông Sản] [Đặc Sản] (Full chiều ngang, nút dẹt sang trọng) */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-xl border border-stone-200/80 w-full">
            {[
              { id: 'all', label: 'Tất cả', count: RECIPES.length },
              {
                id: 'nong-san',
                label: 'Nông Sản',
                count: RECIPES.filter((r) => getRecipeSector(r) === 'nong-san').length,
              },
              {
                id: 'dac-san',
                label: 'Đặc Sản',
                count: RECIPES.filter((r) => getRecipeSector(r) === 'dac-san').length,
              },
            ].map((sec) => {
              const isSecSelected = selectedSector === sec.id;
              return (
                <button
                  key={sec.id}
                  id={`recipe-sector-${sec.id}`}
                  onClick={() => handleSectorChange(sec.id as any)}
                  className={`flex-1 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-[13px] font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                    isSecSelected
                      ? 'bg-[#0a2e1d] text-white shadow-xs font-black'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  <span>{sec.label}</span>
                  <span
                    className={`text-[10px] sm:text-[11px] min-w-[22px] text-center px-1.5 py-0.2 rounded-full font-mono font-bold whitespace-nowrap inline-flex items-center justify-center gap-0.5 shrink-0 ${
                      isSecSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    <span>{sec.count}</span>
                    <span>SP</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* HÀNG 2: Chia làm 2 cột:
              - Bên trái: Nút bấm '🔍 Lọc Theo Danh Mục Ngành Hàng'
              - Bên phải: Ô tìm kiếm món ăn/sản phẩm */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 sm:gap-3">
            {/* Cột Bên Trái: Nút bấm '🔍 Lọc Theo Danh Mục Ngành Hàng' (Mở Modal) */}
            <div className="w-full md:w-[360px] lg:w-[400px] shrink-0">
              <PartnerFilterTrigger
                onClick={() => setIsPartnerModalOpen(true)}
                selectedPartner={selectedPartnerTab}
                partnerTabs={partnerTabs}
                selectedSector={selectedSector}
                onClearPartner={handleClearPartnerFilter}
                defaultLabel="🔍 Lọc Theo Danh Mục Ngành Hàng"
              />
            </div>

            {/* Cột Bên Phải: Ô tìm kiếm món ăn / sản phẩm */}
            <div className="relative flex-1 w-full">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm công thức, món ăn, đồ uống, nguyên liệu..."
                  className="w-full pl-10 pr-9 h-11 text-xs sm:text-[13px] rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700/30 text-stone-900 placeholder:text-stone-400 shadow-2xs font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 sm:right-3 w-5 h-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[10px] hover:bg-stone-300 transition-colors cursor-pointer"
                    title="Xóa tìm kiếm"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* HÀNG 3: Giữ nguyên hàng nút bấm chuyên mục món ăn hiện tại (Tất cả chuyên mục, Món ăn nhẹ, Trà & Giải khát...) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-thin pb-1">
            {visibleCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? RECIPES.filter((r) => {
                      const matchPart =
                        selectedPartnerTab === 'all' || matchesPartnerCategory(r, selectedPartnerTab);
                      if (selectedPartnerTab !== 'all' && !matchPart) return false;
                      const rSec = getRecipeSector(r);
                      const matchSec = selectedSector === 'all' || selectedPartnerTab !== 'all' || rSec === selectedSector;
                      return matchSec && matchPart;
                    }).length
                  : RECIPES.filter((r) => {
                      const matchPart =
                        selectedPartnerTab === 'all' || matchesPartnerCategory(r, selectedPartnerTab);
                      if (selectedPartnerTab !== 'all' && !matchPart) return false;
                      const rSec = getRecipeSector(r);
                      const matchSec = selectedSector === 'all' || selectedPartnerTab !== 'all' || rSec === selectedSector;
                      return matchSec && matchPart && r.category === cat.id;
                    }).length;

              return (
                <button
                  key={cat.id}
                  id={`recipe-cat-${cat.id}`}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold shrink-0 whitespace-nowrap transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                    isSelected
                      ? cat.id === 'Món Ăn Nhẹ & Topping'
                        ? 'bg-amber-400 text-stone-950 font-black shadow-xs ring-2 ring-amber-500'
                        : 'bg-[#0a2e1d] text-amber-300 font-black shadow-xs'
                      : cat.id === 'Món Ăn Nhẹ & Topping'
                      ? 'bg-amber-50 text-amber-900 border border-amber-300/80 hover:bg-amber-100 font-bold'
                      : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200/90 font-medium'
                  }`}
                >
                  <span>{cat.label}</span>
                  {/* QUAN TRỌNG: Chỉ hiển thị duy nhất Con số trong bo góc nhỏ - Tuyệt đối không dùng chữ SP hay SKU */}
                  <span
                    className={`text-[10px] sm:text-[10.5px] min-w-[20px] text-center px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isSelected
                        ? cat.id === 'Món Ăn Nhẹ & Topping'
                          ? 'bg-stone-950 text-amber-300'
                          : 'bg-amber-400 text-stone-950'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* B2B BANNER: GIẢI PHÁP MENU MÓN ĂN NHẸ & TOPPING CHO CHỦ QUÁN F&B */}
        {(selectedCategory === 'Món Ăn Nhẹ & Topping' || selectedPartnerTab === 'dac-san-snack' || selectedPartnerTab === 'cha-bong-kho' || selectedPartnerTab === 'phu-nha') && (
          <div className="mb-4 sm:mb-5 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/60 to-emerald-50 border border-amber-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <Sparkles className="w-5 h-5 text-stone-950" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-stone-950 flex items-center gap-2">
                  <span>Chuyên Mục Món Ăn Nhẹ & Topping (Đặc Sản & Snack)</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-amber-300 text-[10px] font-black uppercase">
                    10 Công Thức F&B
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-700 mt-0.5 leading-relaxed">
                  <strong>Bài toán lợi nhuận F&B:</strong> Giá vốn chỉ từ <strong>8.000₫ – 16.000₫/món</strong>. Biên lợi nhuận ròng <strong>67% – 71%</strong>. Bán kèm cafe/trà giúp tăng thêm <strong>+20.000₫ – 37.000₫</strong> tiền lãi trên mỗi bàn khách.
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-[11px] text-stone-600 font-bold hidden md:inline">Chủ quán nhập sỉ ngay:</span>
              <button
                type="button"
                onClick={() => {
                  const dacSanProds = PRODUCTS.filter((p) => p.partnerId === 'dac-san-snack' || p.partnerId === 'cha-bong-kho' || p.partnerId === 'phu-nha');
                  dacSanProds.slice(0, 3).forEach((p) => onAddToCart(p, 1, 'wholesale'));
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-amber-300 text-xs font-black shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                <span>Nhập Sỉ Đặc Sản & Snack</span>
              </button>
            </div>
          </div>
        )}

        {/* Recipe Grid:
            - Mobile: EXACTLY 2 COLUMNS (grid-cols-2) as strictly requested by user
            - Desktop: EXACTLY 4 COLUMNS (lg:grid-cols-4)
        */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-10 sm:py-12 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <div className="text-stone-700 font-bold text-sm">Không tìm thấy công thức phù hợp</div>
            <p className="text-stone-500 text-xs mt-1">
              Thử chọn ngành hàng khác hoặc xóa từ khóa tìm kiếm.
            </p>
            <button
              onClick={() => {
                setSelectedPartnerTab('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-1.5 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-950"
            >
              Xem toàn bộ 60+ công thức
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-3.5 lg:gap-4">
              {displayedRecipes.map((recipe) => {
                const recipeProducts = getRecipeProducts(recipe);
                const isAdded = addedSuccessMap[recipe.id];
                const profit =
                  recipe.profitPerServing ??
                  recipe.recommendedMenuPrice - recipe.costPerServing;
                const margin =
                  recipe.profitMarginPercent ??
                  Math.round((profit / recipe.recommendedMenuPrice) * 100);
                const isFoodRecipe = recipe.category === 'Món Ăn Nhẹ & Topping';

                return (
                  <div
                    key={recipe.id}
                    onClick={() => handleOpenModal(recipe)}
                    className="group bg-white rounded-xl sm:rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-lg hover:border-emerald-700/50 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                  >
                    {/* Image Container: Optimized aspect ratio for mobile 2-column grid */}
                    <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden shrink-0">
                      <img
                        src={recipe.image}
                        alt={`Công thức pha chế ${recipe.title} - Chút Chíu F&B Solutions`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-1.5 left-1.5 right-1.5 sm:top-2 sm:left-2 sm:right-2 flex items-center justify-between pointer-events-none">
                        <span className="px-1.5 sm:px-2 py-0.5 rounded text-[8.5px] sm:text-[10px] font-bold bg-emerald-950/90 text-amber-300 border border-emerald-500/30 backdrop-blur-sm shadow-2xs truncate max-w-[110px]">
                          {recipe.category}
                        </span>
                        <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[8.5px] sm:text-[10px] font-semibold bg-black/70 text-stone-200 backdrop-blur-sm shadow-2xs">
                          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                          {recipe.prepTime}
                        </span>
                      </div>

                      {/* Bottom overlay on image */}
                      <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 flex items-center justify-between text-white pointer-events-none">
                        <div className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold bg-amber-400/95 text-stone-950 shadow-2xs backdrop-blur-sm truncate max-w-[110px]">
                          <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0" />
                          <span className="truncate">{recipeProducts.length} NL Chút Chíu</span>
                        </div>
                        <span className="text-[8.5px] sm:text-[9.5px] text-stone-300 font-mono hidden sm:inline">
                          {recipe.yields.split('(')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[8.5px] sm:text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-0.5 truncate" title={recipe.productName}>
                          {recipe.productName}
                        </div>

                        <h3
                          className="text-[11.5px] sm:text-[13px] md:text-[14px] font-extrabold text-stone-900 group-hover:text-emerald-950 line-clamp-2 leading-snug"
                          title={recipe.title}
                        >
                          {recipe.title}
                        </h3>
                      </div>

                      {/* BẢNG TÍNH LỢI NHUẬN RÕ RÀNG: 'Giá vốn món ăn - Giá bán đề xuất - Lợi nhuận ròng' */}
                      <div className="mt-1.5 sm:mt-2.5 pt-1.5 sm:pt-2 border-t border-stone-100">
                        <div className="text-[8px] sm:text-[9px] font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between mb-0.5 sm:mb-1">
                          <span className="flex items-center gap-0.5 sm:gap-1 text-emerald-900 font-bold truncate">
                            <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 shrink-0" />
                            <span>{isFoodRecipe ? 'Bài toán lợi nhuận' : 'Lợi Nhuận Ly'}</span>
                          </span>
                          <span className="px-1 py-0.2 rounded bg-amber-100 text-amber-900 text-[8px] sm:text-[9px] font-black shrink-0">
                            Lời ~{margin}%
                          </span>
                        </div>

                        {/* Bảng 3 cột: Vốn - Bán - Lợi */}
                        <div className="grid grid-cols-3 gap-0.5 sm:gap-1 bg-stone-50 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-stone-200/70 text-center">
                          <div>
                            <div className="text-[7.5px] sm:text-[8px] text-stone-500 uppercase font-semibold">Giá vốn</div>
                            <div className="text-[9.5px] sm:text-[10.5px] font-bold text-stone-700 truncate">
                              {formatPrice(recipe.costPerServing, currency, exchangeRate)}
                            </div>
                          </div>
                          <div className="border-x border-stone-200">
                            <div className="text-[7.5px] sm:text-[8px] text-stone-500 uppercase font-semibold">Giá bán</div>
                            <div className="text-[9.5px] sm:text-[10.5px] font-bold text-stone-900 truncate">
                              {formatPrice(recipe.recommendedMenuPrice, currency, exchangeRate)}
                            </div>
                          </div>
                          <div>
                            <div className="text-[7.5px] sm:text-[8px] text-emerald-700 uppercase font-bold">Lợi nhuận</div>
                            <div className="text-[9.5px] sm:text-[10.5px] font-black text-emerald-800 truncate">
                              +{formatPrice(profit, currency, exchangeRate)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BUTTON "XEM TẤT CẢ 50+ CÔNG THỨC" - Show if on homepage and not yet expanded */}
            {!showAllRecipes && !isFiltering && filteredRecipes.length > 10 && (
              <div className="mt-6 sm:mt-8 text-center">
                <button
                  type="button"
                  id="btn-show-all-recipes"
                  onClick={() => setShowAllRecipes(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-950 to-stone-900 hover:brightness-110 text-white font-black text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2 border border-emerald-500/30 active:scale-[0.98]"
                >
                  <BookOpen className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="whitespace-nowrap">Xem tất cả {RECIPES.length}+ công thức pha chế</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-mono shrink-0 whitespace-nowrap inline-flex items-center justify-center leading-none gap-0.5">
                    <span>+{RECIPES.length - 10}</span>
                    <span>món</span>
                  </span>
                </button>
                <div className="text-[11px] text-stone-500 mt-2">
                  Hệ sinh thái công thức đa dạng từ tất cả các đối tác chiến lược hàng đầu của Chút Chíu
                </div>
              </div>
            )}

            {/* Button Thu Gọn if already expanded */}
            {showAllRecipes && !isFiltering && (
              <div className="mt-6 sm:mt-8 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowAllRecipes(false);
                    const el = document.getElementById('goc-cong-thuc');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs transition-colors whitespace-nowrap"
                >
                  Thu gọn danh sách (Hiện 10 món tiêu biểu)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* RECIPE DETAIL MODAL (Popup Toàn Diện Với Khối 'NHẬP SỈ NGUYÊN LIỆU CHO MÓN NÀY') */}
      {/* ========================================================================= */}
      {modalRecipe && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-3xl max-w-5xl xl:max-w-6xl w-full max-h-[94vh] overflow-y-auto overflow-x-hidden shadow-2xl border border-stone-200 text-stone-900 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center shadow-lg transition-colors"
              aria-label="Đóng công thức"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Header Banner Image with Overlay */}
            <div className="relative h-44 sm:h-52 md:h-56 bg-stone-950 overflow-hidden">
              <img
                src={modalRecipe.image}
                alt={`Chi tiết công thức ${modalRecipe.title} - Chút Chíu`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-3.5 sm:left-4 sm:right-4 text-white">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-[#d4af37] text-stone-950">
                    {modalRecipe.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-white/20 backdrop-blur-sm">
                    Độ khó: {modalRecipe.difficulty}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-white/20 backdrop-blur-sm flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-300" />
                    {modalRecipe.prepTime}
                  </span>
                </div>
                <h2 className="text-base sm:text-xl md:text-2xl font-black tracking-tight font-serif-luxury">
                  {modalRecipe.title}
                </h2>
                <div className="text-[11px] sm:text-xs text-stone-300 mt-0.5">
                  Định lượng chuẩn: <strong>{modalRecipe.yields}</strong>
                </div>
              </div>
            </div>

            {/* Modal Body - Nén 50% khoảng cách dọc trên Desktop (V116) để bao quát trọn vẹn trong tầm mắt */}
            <div className="p-2.5 sm:py-3 sm:px-5 md:py-3.5 md:px-6 pb-4 sm:pb-4 space-y-2 sm:space-y-2.5">
              {/* 1. BẢNG TÍNH GIÁ VỐN & LỢI NHUẬN - NÉN GỌN 50% CHIỀU CAO & KHOẢNG CÁCH DỌC */}
              <div className="p-2 sm:py-2.5 sm:px-4 md:py-3 md:px-4.5 rounded-xl sm:rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-1.5 sm:mb-2 pb-1 sm:pb-1.5 border-b border-stone-100">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37] shrink-0" />
                    <span className="text-[11.5px] sm:text-[13px] md:text-sm font-black uppercase tracking-wider text-stone-900 font-heading">
                      {modalRecipe.category === 'Món Ăn Nhẹ & Topping'
                        ? 'Bảng Tính Giá Vốn & Lợi Nhuận (1 Phần Chuẩn)'
                        : 'Bảng Tính Giá Vốn & Lợi Nhuận F&B (1 Ly Chuẩn)'}
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300/70 font-bold text-[10px] sm:text-xs w-fit">
                    Biên Lợi Nhuận ~{modalRecipe.profitMarginPercent ?? 72}%
                  </span>
                </div>

                {/* 3 Cột đều nhau: Thu nhỏ chiều cao, giảm padding thanh thoát */}
                <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-2.5 text-center">
                  {/* Cột 1: Giá Vốn */}
                  <div className="bg-stone-50/80 p-1.5 sm:py-1.5 sm:px-2 md:py-2 md:px-2.5 rounded-lg sm:rounded-xl border border-stone-200/60 flex flex-col justify-between">
                    <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[11px] text-stone-500 font-medium">
                      <Coins className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4af37] shrink-0" />
                      <span className="truncate">Giá Vốn NL</span>
                    </div>
                    <div className="text-[11px] sm:text-sm md:text-base font-black text-stone-800 mt-0.5 font-heading">
                      {formatPrice(modalRecipe.costPerServing, currency, exchangeRate)}
                    </div>
                  </div>

                  {/* Cột 2: Giá Bán */}
                  <div className="bg-stone-50/80 p-1.5 sm:py-1.5 sm:px-2 md:py-2 md:px-2.5 rounded-lg sm:rounded-xl border border-stone-200/60 flex flex-col justify-between">
                    <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[11px] text-stone-500 font-medium">
                      <Receipt className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4af37] shrink-0" />
                      <span className="truncate">Giá Bán Đề Xuất</span>
                    </div>
                    <div className="text-[11px] sm:text-sm md:text-base font-black text-stone-800 mt-0.5 font-heading">
                      {formatPrice(modalRecipe.recommendedMenuPrice, currency, exchangeRate)}
                    </div>
                  </div>

                  {/* Cột 3: Lợi Nhuận */}
                  <div className="bg-amber-50/70 p-1.5 sm:py-1.5 sm:px-2 md:py-2 md:px-2.5 rounded-lg sm:rounded-xl border border-amber-200/80 flex flex-col justify-between shadow-2xs">
                    <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[11px] text-amber-900 font-bold uppercase">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4af37] shrink-0" />
                      <span className="truncate">{modalRecipe.category === 'Món Ăn Nhẹ & Topping' ? 'Lợi Nhuận/Phần' : 'Lợi Nhuận/Ly'}</span>
                    </div>
                    <div className="text-[11px] sm:text-sm md:text-base font-black text-emerald-900 mt-0.5 font-heading">
                      +{formatPrice(
                        modalRecipe.profitPerServing ??
                          modalRecipe.recommendedMenuPrice - modalRecipe.costPerServing,
                        currency,
                        exchangeRate
                      )}
                    </div>
                  </div>
                </div>

                {/* Khối 'Lợi thế kinh doanh': Giảm 50% khoảng cách phía trên (sm:mt-1.5 sm:pt-1.5) */}
                {modalRecipe.shopOwnerBenefits && (
                  <div className="mt-1.5 pt-1.5 sm:mt-1.5 sm:pt-1.5 border-t border-stone-100/90 flex items-start gap-1 sm:gap-2 text-[10.5px] sm:text-xs md:text-[12.5px] text-emerald-950 italic leading-snug sm:leading-normal">
                    <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5 not-italic" />
                    <span>
                      <strong className="not-italic font-bold text-emerald-900">Lợi thế kinh doanh:</strong> {modalRecipe.shopOwnerBenefits}
                    </span>
                  </div>
                )}
              </div>

              {/* 2. KHỐI NGUYÊN LIỆU CHÍNH TỪ CHÚT CHÍU - THU HẸP PADDING KHUNG TO */}
              {(() => {
                const ingredientItems = getRecipeIngredientItems(modalRecipe);
                if (ingredientItems.length === 0) return null;

                const isSingle = ingredientItems.length === 1;

                return (
                  <div className="p-2 sm:py-2.5 sm:px-3.5 md:py-3 md:px-4 rounded-xl sm:rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
                    <div className="mb-1.5 sm:mb-2 pb-1 sm:pb-1.5 border-b border-stone-100 flex items-center justify-between">
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-xs font-black uppercase tracking-wider text-stone-900 font-heading">
                          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800" />
                          NGUYÊN LIỆU CHÍNH TỪ CHÚT CHÍU
                        </div>
                        <p className="text-[9.5px] sm:text-[10.5px] md:text-[11px] text-stone-500 mt-0.5">
                          {isSingle
                            ? 'Bấm vào nguyên liệu để xem thông số kỹ thuật, bảng giá sỉ 4 cấp độ và đặt hàng trực tiếp.'
                            : 'Bấm vào từng nguyên liệu để xem thông số kỹ thuật, bảng giá sỉ 4 cấp độ và đặt hàng trực tiếp.'}
                        </p>
                      </div>
                    </div>

                    {/* Hiển thị thẻ đơn độc CĂN GIỮA hoặc DÀN LƯỚI ĐÚNG CHUẨN - NÉN GỌN PADDING */}
                    {isSingle ? (
                      <div className="flex justify-center py-0 sm:py-0.5">
                        <div className="w-full max-w-md">
                          <RecipeIngredientCard
                            ingredient={ingredientItems[0]}
                            isSingle={true}
                            onClick={() => {
                              const recipeId = modalRecipe.id;
                              const targetId = ingredientItems[0].productId || '';
                              const productToOpen =
                                PRODUCTS.find((p) => p.id === targetId) ||
                                resolveChutChiuProduct(targetId) ||
                                PRODUCTS[0];
                              if (productToOpen) {
                                onSelectProduct(productToOpen, recipeId);
                              }
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 min-[960px]:grid-cols-5 gap-1.5 sm:gap-2.5">
                        {ingredientItems.map((ing, idx) => {
                          const targetId = ing.productId || '';
                          const productToOpen =
                            PRODUCTS.find((p) => p.id === targetId) ||
                            resolveChutChiuProduct(targetId) ||
                            PRODUCTS[0];

                          return (
                            <RecipeIngredientCard
                              key={ing.id || `${ing.name}-${idx}`}
                              ingredient={ing}
                              isSingle={false}
                              onClick={() => {
                                const recipeId = modalRecipe.id;
                                if (productToOpen) {
                                  onSelectProduct(productToOpen, recipeId);
                                }
                              }}
                            />
                          );
                        })}
                      </div>
                    )}

                    {/* Nút hành động trực tiếp: NHẬP SỈ NGUYÊN LIỆU MÓN NÀY */}
                    <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          const targetId = ingredientItems[0].productId || '';
                          const productToOpen =
                            PRODUCTS.find((p) => p.id === targetId) ||
                            resolveChutChiuProduct(targetId) ||
                            PRODUCTS[0];
                          if (productToOpen) {
                            onSelectProduct(productToOpen, modalRecipe.id);
                          }
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#1a4d2e] hover:bg-[#143d24] text-white font-bold text-xs sm:text-[13px] flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 text-amber-300 shrink-0" />
                        <span className="tracking-wide uppercase">Nhập sỉ nguyên liệu món này</span>
                        <ArrowUpRight className="w-4 h-4 text-amber-300 ml-0.5 shrink-0" />
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Mô tả món - Phong cách trích dẫn thanh lịch */}
              <div className="text-[11px] sm:text-[13px] text-stone-600 leading-relaxed italic border-l-2 border-[#d4af37] pl-2 py-0.5 sm:pl-3 bg-stone-50/50 rounded-r-lg sm:rounded-r-xl">
                "{modalRecipe.description}"
              </div>

              {/* 3. ĐỊNH LƯỢNG NGUYÊN LIỆU (HÌNH 3) - DANH SÁCH TỰ CO GIÃN THÔNG MINH, NHẬN DIỆN SẢN PHẨM CHÚT CHÍU */}
              <div className="pt-0.5 sm:pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1 sm:mb-2">
                  <h3 className="text-[11.5px] sm:text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5 font-heading">
                    <span className="w-2 h-2 rounded-full bg-emerald-700 shrink-0" />
                    <span>Định Lượng Nguyên Liệu Chuẩn (Gram / Ml)</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] text-stone-500">
                    <span className="inline-flex items-center gap-1 text-[#1a4d2e] font-bold">
                      <Sparkles className="w-3 h-3 text-[#d4af37]" /> Sản phẩm Chút Chíu
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-stone-400">Nguyên liệu phụ mua ngoài</span>
                  </div>
                </div>

                <div className="divide-y divide-stone-100">
                  {modalRecipe.ingredients.map((ing, idx) => {
                    const { isChutChiu, product: linkedProduct } = isChutChiuIngredient(
                      ing,
                      modalRecipe
                    );

                    return (
                      <div
                        key={idx}
                        className={`py-1 sm:py-2 flex items-baseline justify-between gap-1.5 sm:gap-2 text-[12px] sm:text-[13px] transition-colors rounded-sm ${
                          isChutChiu ? 'hover:bg-emerald-50/40' : ''
                        }`}
                      >
                        {/* Tên nguyên liệu bên trái: Icon nhận diện (Vàng Gold ✦) + Tự động xuống dòng linh hoạt */}
                        <div className="flex items-start gap-1.5 min-w-0 shrink max-w-[62%] sm:max-w-[70%]">
                          {isChutChiu ? (
                            <Sparkles
                              className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5"
                              aria-label="Sản phẩm Chút Chíu"
                            />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-300 shrink-0 mt-1.5 mx-1" />
                          )}
                          <div className="min-w-0 leading-snug">
                            {isChutChiu && linkedProduct ? (
                              <button
                                type="button"
                                onClick={() => onSelectProduct(linkedProduct, modalRecipe.id)}
                                className="font-bold text-[#1a4d2e] hover:text-emerald-700 hover:underline text-left break-words transition-colors inline"
                                title="Bấm xem thông số kỹ thuật & bảng giá sỉ"
                              >
                                {ing.name}
                              </button>
                            ) : (
                              <span
                                className={
                                  isChutChiu
                                    ? 'font-bold text-[#1a4d2e] break-words'
                                    : 'font-normal text-stone-500 break-words'
                                }
                              >
                                {ing.name}
                              </span>
                            )}
                            {ing.note && (
                              <span
                                className={`ml-1 text-[10.5px] sm:text-[11.5px] font-normal italic leading-snug break-words ${
                                  isChutChiu ? 'text-emerald-800/80' : 'text-stone-400'
                                }`}
                              >
                                ({ing.note})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Đường chấm chấm kết nối co giãn */}
                        <div
                          className={`grow border-b border-dotted mx-1 mb-1 min-w-[8px] ${
                            isChutChiu ? 'border-emerald-300/70' : 'border-stone-200'
                          }`}
                        />

                        {/* Con số định lượng bên phải: luôn trọn vẹn 100%, không bị co rút hay đẩy tràn mép */}
                        <span
                          className={`font-mono shrink-0 text-right text-[12px] sm:text-[13px] pl-1 whitespace-nowrap ${
                            isChutChiu ? 'font-bold text-[#1a4d2e]' : 'font-medium text-stone-500'
                          }`}
                        >
                          {ing.amount}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. QUY TRÌNH PHA CHẾ (HÌNH 4) - KHÔNG TRÀN VIỀN, KHOẢNG CÁCH GỌN GÀNG */}
              <div className="pt-0.5 sm:pt-2">
                <h3 className="text-[11.5px] sm:text-sm font-bold text-stone-900 uppercase tracking-wider mb-1.5 sm:mb-2 flex items-center gap-1.5 font-heading">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>Quy Trình Các Bước Pha Chế Chuẩn Barista</span>
                </h3>
                <div className="space-y-1 sm:space-y-2">
                  {modalRecipe.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 sm:gap-2.5 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-stone-50/70 border border-stone-100 text-[11.5px] sm:text-[13px] text-stone-800"
                    >
                      <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-900 text-amber-300 font-bold text-[9.5px] sm:text-[10.5px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs font-heading">
                        {idx + 1}
                      </span>
                      <p className="flex-1 min-w-0 leading-relaxed text-stone-700 font-normal break-words">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. MẸO CHUYÊN NGHIỆP TỪ CHÚT CHÍU BARISTA - NỀN VÀNG KEM NHẠT, GỌN GÀNG */}
              <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-[16px] bg-[#fffdf0] border border-amber-200/90 shadow-2xs">
                <div className="text-[11.5px] sm:text-xs font-bold text-amber-950 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-heading">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
                  <span>Mẹo Chuyên Nghiệp Từ Chút Chíu Barista</span>
                </div>
                <ul className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs text-amber-950/90">
                  {modalRecipe.baristaNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed min-w-0 flex-1 break-words">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 6. MÃ QR PHA CHẾ TẠI QUẦY - KÍCH THƯỚC 135PX, CĂN GIỮA, GỌN GÀNG */}
              <div className="pt-1 pb-0.5 flex justify-center w-full">
                <RecipeQRCode recipe={modalRecipe} size={135} showActions={true} />
              </div>
            </div>

            {/* Modal Bottom Footer: Chỉ duy nhất một nút [ Đóng / Quay lại ] nhỏ gọn, tinh tế ở góc dưới */}
            <div className="border-t border-stone-200/80 bg-stone-50/70 px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-end rounded-b-3xl">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 text-xs font-semibold shadow-2xs active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Đóng / Quay lại</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Bảng Lọc Modal Đối Tác Cung Ứng (V50) */}
      <PartnerFilterModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        partnerTabs={partnerTabs}
        selectedPartner={selectedPartnerTab}
        onSelectPartner={(partner) => {
          handleSelectPartnerTab(partner);
        }}
        selectedSector={selectedSector}
        onSelectSector={(sector) => {
          handleSectorChange(sector);
        }}
      />
    </section>
  );
};
