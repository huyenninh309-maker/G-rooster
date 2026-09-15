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
} from 'lucide-react';
import { RECIPES } from '../data/recipes';
import { Recipe, Product, Currency, PurchaseMode, PartnerId } from '../types';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/pricing';
import { RecipeQRCode } from './RecipeQRCode';

interface RecipeCornerProps {
  currency: Currency;
  exchangeRate?: number;
  onAddToCart: (product: Product, quantity: number, purchaseMode?: PurchaseMode) => void;
  onSelectProduct: (product: Product) => void;
  activeRecipeId?: string | null;
  onRecipeModalChange?: (recipe: Recipe | null) => void;
}

export const RecipeCorner: React.FC<RecipeCornerProps> = ({
  currency,
  exchangeRate,
  onAddToCart,
  onSelectProduct,
  activeRecipeId,
  onRecipeModalChange,
}) => {
  // Tab Selector: [Tất cả] [Vua Mía] [Việt Thảo Nhiên] [DATO] [Nón Lá]
  const [selectedPartnerTab, setSelectedPartnerTab] = useState<PartnerId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalRecipe, setModalRecipe] = useState<Recipe | null>(null);
  const [addedSuccessMap, setAddedSuccessMap] = useState<{ [recipeId: string]: boolean }>({});
  // Homepage displays 6 featured recipes by default, can expand to show all 50+
  const [showAllRecipes, setShowAllRecipes] = useState<boolean>(false);

  // Sync modal when activeRecipeId is passed from React Router or deep-link
  useEffect(() => {
    if (activeRecipeId) {
      const found = RECIPES.find((r) => r.id === activeRecipeId);
      if (found) {
        setModalRecipe(found);
      }
    } else if (activeRecipeId === null && modalRecipe) {
      setModalRecipe(null);
    }
  }, [activeRecipeId]);

  const handleOpenModal = (recipe: Recipe) => {
    setModalRecipe(recipe);
    onRecipeModalChange?.(recipe);
  };

  const handleCloseModal = () => {
    setModalRecipe(null);
    onRecipeModalChange?.(null);
  };

  // Partner tabs exactly as requested: [Tất cả] [Vua Mía] [Việt Thảo Nhiên] [DATO] [Nón Lá]
  const partnerTabs: { id: PartnerId | 'all'; label: string; shortLabel: string }[] = [
    { id: 'all', label: 'Tất cả đối tác', shortLabel: 'Tất cả' },
    { id: 'vua-mia', label: 'Vua Mía', shortLabel: 'Vua Mía' },
    { id: 'viet-thao-nhien', label: 'Việt Thảo Nhiên', shortLabel: 'Việt Thảo Nhiên' },
    { id: 'thao-duoc-dato', label: 'DATO (Sâm Dây & Trà)', shortLabel: 'DATO' },
    { id: 'non-la-aodai', label: 'Nón Lá & Aodai Coffee', shortLabel: 'Nón Lá' },
  ];

  const categories = [
    { id: 'all', label: 'Tất cả chuyên mục' },
    { id: 'Trà & Giải khát', label: 'Trà & Giải khát' },
    { id: 'Cà phê đặc sản', label: 'Cà phê đặc sản' },
    { id: 'Cocktail & Mocktail', label: 'Cocktail & Mocktail' },
    { id: 'Đồ uống bồi bổ', label: 'Dược liệu dưỡng sinh' },
  ];

  // Filter recipes by partner tab, category and search query
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      const matchPartner =
        selectedPartnerTab === 'all' || recipe.partnerId === selectedPartnerTab;
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
      return matchPartner && matchCat && matchSearch;
    });
  }, [selectedPartnerTab, selectedCategory, searchQuery]);

  // Display only 6 recipes if not expanded and no active search query
  const isFiltering = searchQuery.trim() !== '' || selectedCategory !== 'all' || selectedPartnerTab !== 'all';
  const displayedRecipes = useMemo(() => {
    if (showAllRecipes || isFiltering) {
      return filteredRecipes;
    }
    return filteredRecipes.slice(0, 6);
  }, [filteredRecipes, showAllRecipes, isFiltering]);

  // Helper to retrieve all Chút Chíu products involved in a recipe
  const getRecipeProducts = (recipe: Recipe): Product[] => {
    if (recipe.productIds && recipe.productIds.length > 0) {
      const found = PRODUCTS.filter((p) => recipe.productIds?.includes(p.id));
      if (found.length > 0) return found;
    }
    // Fallback: search products matching partnerId
    const partnerProducts = PRODUCTS.filter((p) => p.partnerId === recipe.partnerId);
    return partnerProducts.slice(0, 2);
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
        <div className="mb-5 sm:mb-7 pb-4 sm:pb-5 border-b border-stone-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3.5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#d4af37]/20 text-[#8e6b12] border border-[#d4af37]/30 uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
                Góc Công Thức F&B Độc Quyền Chút Chíu (50+ Công Thức Chuẩn Vị Quán)
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-stone-950 tracking-tight font-serif-luxury">
                Hướng Dẫn Pha Chế & Bài Toán Lợi Nhuận Quán F&B
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
                Tặng trọn đời <strong>50+ công thức pha chế độc quyền</strong> (Matcha, Cascara, Nước Mía, Sâm Dây, Cà Phê). Đầy đủ định lượng gram/ml chi tiết, tính toán giá cost vốn, giá bán lẻ và biên lợi nhuận ròng.
              </p>
            </div>

            {/* Quick Search Bar */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm món: Matcha, Mía, Sâm, Cà phê..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-stone-200 shadow-2xs focus:outline-none focus:ring-2 focus:ring-emerald-700/50 text-stone-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* TAB SELECTOR: [Tất cả] [Vua Mía] [Việt Thảo Nhiên] [DATO] [Nón Lá] */}
          <div className="mt-4 pt-3 border-t border-stone-200/80">
            <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-800" />
              Lọc theo Nhà Cung Cấp:
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-thin pb-1">
              {partnerTabs.map((tab) => {
                const isSelected = selectedPartnerTab === tab.id;
                const count = tab.id === 'all'
                  ? RECIPES.length
                  : RECIPES.filter((r) => r.partnerId === tab.id).length;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedPartnerTab(tab.id)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-black shrink-0 whitespace-nowrap transition-all flex items-center gap-1.5 shadow-2xs ${
                      isSelected
                        ? 'bg-emerald-950 text-amber-300 ring-2 ring-amber-400 shadow-sm scale-[1.02]'
                        : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-emerald-950 border border-stone-200'
                    }`}
                  >
                    <span>{tab.shortLabel}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                        isSelected
                          ? 'bg-amber-400/20 text-amber-300'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dedicated Category Menu - Fixed UI bug: Cà phê đặc sản & all categories 100% visible on all devices */}
          <div className="mt-2.5 pt-2 border-t border-dashed border-stone-200/80">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count = cat.id === 'all'
                  ? RECIPES.length
                  : RECIPES.filter((r) => r.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold shrink-0 whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-800 text-white font-bold'
                        : 'bg-white/80 text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200/70'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="text-[9.5px] opacity-70 font-mono">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recipe Grid:
            - Mobile: EXACTLY 2 COLUMNS (grid-cols-2) as strictly requested by user
            - Tablet: 3 COLUMNS (md:grid-cols-3)
            - Desktop: 3 to 4 COLUMNS (lg:grid-cols-3 xl:grid-cols-4)
        */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-10 sm:py-12 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <div className="text-stone-700 font-bold text-sm">Không tìm thấy công thức phù hợp</div>
            <p className="text-stone-500 text-xs mt-1">
              Thử chọn nhà cung cấp khác hoặc xóa từ khóa tìm kiếm.
            </p>
            <button
              onClick={() => {
                setSelectedPartnerTab('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-1.5 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-950"
            >
              Xem toàn bộ 50+ công thức
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
              {displayedRecipes.map((recipe) => {
                const recipeProducts = getRecipeProducts(recipe);
                const isAdded = addedSuccessMap[recipe.id];
                const profit =
                  recipe.profitPerServing ??
                  recipe.recommendedMenuPrice - recipe.costPerServing;
                const margin =
                  recipe.profitMarginPercent ??
                  Math.round((profit / recipe.recommendedMenuPrice) * 100);

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
                        alt={recipe.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
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
                          className="text-[11.5px] sm:text-[13px] md:text-[14px] font-extrabold text-stone-900 group-hover:text-emerald-950 line-clamp-2 leading-snug min-h-[30px] sm:min-h-[36px]"
                          title={recipe.title}
                        >
                          {recipe.title}
                        </h3>

                        {/* Marketing Copy Highlight: "Vị thanh mát cho cả gia đình" / "Bồi bổ sức khỏe cho người lớn tuổi" */}
                        <p className="text-[10px] sm:text-[11px] text-stone-500 line-clamp-2 mt-0.5 sm:mt-1 leading-relaxed">
                          {recipe.description}
                        </p>
                      </div>

                      {/* BẢNG TÍNH LỢI NHUẬN NHANH (Vốn - Bán - Lời) */}
                      <div className="mt-1.5 sm:mt-2.5 pt-1.5 sm:pt-2 border-t border-stone-100">
                        <div className="text-[8px] sm:text-[9px] font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between mb-0.5 sm:mb-1">
                          <span className="flex items-center gap-0.5 sm:gap-1 text-emerald-900 font-bold truncate">
                            <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 shrink-0" />
                            <span>Lợi Nhuận Ly</span>
                          </span>
                          <span className="px-1 py-0.2 rounded bg-amber-100 text-amber-900 text-[8px] sm:text-[9px] font-black shrink-0">
                            Lời ~{margin}%
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-0.5 sm:gap-1 bg-stone-50 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-stone-200/70 text-center">
                          <div>
                            <div className="text-[7.5px] sm:text-[8px] text-stone-400 uppercase font-semibold">Vốn</div>
                            <div className="text-[9.5px] sm:text-[10.5px] font-bold text-stone-700 truncate">
                              {formatPrice(recipe.costPerServing, currency, exchangeRate)}
                            </div>
                          </div>
                          <div className="border-x border-stone-200">
                            <div className="text-[7.5px] sm:text-[8px] text-stone-400 uppercase font-semibold">Bán</div>
                            <div className="text-[9.5px] sm:text-[10.5px] font-bold text-stone-900 truncate">
                              {formatPrice(recipe.recommendedMenuPrice, currency, exchangeRate)}
                            </div>
                          </div>
                          <div>
                            <div className="text-[7.5px] sm:text-[8px] text-emerald-700 uppercase font-bold">Lời</div>
                            <div className="text-[9.5px] sm:text-[10.5px] font-black text-emerald-800 truncate">
                              +{formatPrice(profit, currency, exchangeRate)}
                            </div>
                          </div>
                        </div>

                        {/* Lợi nhuận cho chủ quán highlight */}
                        {recipe.shopOwnerBenefits && (
                          <div className="mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] text-stone-600 line-clamp-1 italic flex items-center gap-1 text-emerald-950 font-medium">
                            <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 shrink-0" />
                            <span className="truncate">{recipe.shopOwnerBenefits}</span>
                          </div>
                        )}
                      </div>

                      {/* ACTION BUTTON: "NHẬP SỈ NGUYÊN LIỆU CHO MÓN NÀY" */}
                      <div className="mt-1.5 sm:mt-2.5 pt-1.5 sm:pt-2 border-t border-stone-100 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleAddAllToCart(recipe, e)}
                          className={`flex-1 py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-lg sm:rounded-xl text-[9.5px] sm:text-[11px] font-bold transition-all flex items-center justify-center gap-1 shadow-2xs ${
                            isAdded
                              ? 'bg-amber-400 text-stone-950 font-black'
                              : 'bg-emerald-900 hover:bg-emerald-950 text-white active:scale-98'
                          }`}
                          title="Nhập sỉ nguyên liệu của công thức này vào giỏ hàng"
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-950 stroke-[3]" />
                              <span className="truncate">Đã thêm!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
                              <span className="truncate">
                                <span className="sm:hidden">Nhập Sỉ NL</span>
                                <span className="hidden sm:inline">Nhập sỉ nguyên liệu</span>
                              </span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenModal(recipe)}
                          className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors shrink-0"
                          title="Xem công thức chi tiết & mã QR"
                        >
                          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BUTTON "XEM TẤT CẢ 50+ CÔNG THỨC" - Show if on homepage and not yet expanded */}
            {!showAllRecipes && !isFiltering && filteredRecipes.length > 6 && (
              <div className="mt-6 sm:mt-8 text-center">
                <button
                  type="button"
                  id="btn-show-all-recipes"
                  onClick={() => setShowAllRecipes(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-950 to-stone-900 hover:brightness-110 text-white font-black text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2 border border-emerald-500/30 active:scale-[0.98]"
                >
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>Xem tất cả {RECIPES.length}+ công thức pha chế</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-mono">
                    +{RECIPES.length - 6} món
                  </span>
                </button>
                <div className="text-[11px] text-stone-500 mt-2">
                  Đầy đủ công thức cho cả 4 nhà cung cấp: Vua Mía, Việt Thảo Nhiên, DATO, Nón Lá
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
                  className="px-5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs transition-colors"
                >
                  Thu gọn danh sách (Hiện 6 món tiêu biểu)
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
          className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 text-stone-900 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center shadow-lg transition-colors"
              aria-label="Đóng công thức"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Banner Image with Overlay */}
            <div className="relative h-52 sm:h-72 bg-stone-950 overflow-hidden">
              <img
                src={modalRecipe.image}
                alt={modalRecipe.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#d4af37] text-stone-950">
                    {modalRecipe.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm">
                    Độ khó: {modalRecipe.difficulty}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-300" />
                    {modalRecipe.prepTime}
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight font-serif-luxury">
                  {modalRecipe.title}
                </h2>
                <div className="text-xs text-stone-300 mt-1">
                  Định lượng chuẩn: <strong>{modalRecipe.yields}</strong>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-5">
              {/* BẢNG TÍNH LỢI NHUẬN RÒNG CHI TIẾT */}
              <div className="p-4 rounded-2xl bg-emerald-950 text-white border border-emerald-800/80 shadow-md">
                <div className="flex items-center justify-between mb-3 border-b border-emerald-800/60 pb-2.5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300">
                      Bảng Tính Toán Giá Vốn & Lợi Nhuận F&B (1 Ly Chuẩn)
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37] text-stone-950 font-black text-xs">
                    Biên Lợi Nhuận ~{modalRecipe.profitMarginPercent ?? 72}%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                  <div className="bg-white/10 p-2.5 sm:p-3 rounded-xl backdrop-blur-sm">
                    <div className="text-[10px] sm:text-xs text-stone-300 font-medium">Giá Vốn (Cost NL)</div>
                    <div className="text-sm sm:text-lg font-black text-stone-100 mt-0.5">
                      {formatPrice(modalRecipe.costPerServing, currency, exchangeRate)}
                    </div>
                  </div>

                  <div className="bg-white/10 p-2.5 sm:p-3 rounded-xl backdrop-blur-sm">
                    <div className="text-[10px] sm:text-xs text-stone-300 font-medium">Giá Bán Quán Đề Xuất</div>
                    <div className="text-sm sm:text-lg font-black text-amber-300 mt-0.5">
                      {formatPrice(modalRecipe.recommendedMenuPrice, currency, exchangeRate)}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-2.5 sm:p-3 rounded-xl text-stone-950 shadow-sm">
                    <div className="text-[10px] sm:text-xs font-black uppercase">Lợi Nhuận Ròng/Ly</div>
                    <div className="text-sm sm:text-lg font-black mt-0.5">
                      +{formatPrice(
                        modalRecipe.profitPerServing ??
                          modalRecipe.recommendedMenuPrice - modalRecipe.costPerServing,
                        currency,
                        exchangeRate
                      )}
                    </div>
                  </div>
                </div>

                {modalRecipe.shopOwnerBenefits && (
                  <div className="mt-3 text-xs text-emerald-200 bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-700/50 flex items-start gap-2">
                    <Flame className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span><strong>Lợi thế kinh doanh:</strong> {modalRecipe.shopOwnerBenefits}</span>
                  </div>
                )}
              </div>

              {/* KHỐI: "NHẬP SỈ NGUYÊN LIỆU CHO MÓN NÀY" (B2B Action Button & List) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300/80 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 border-b border-amber-200/80 pb-2.5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-950">
                      <ShoppingBag className="w-4 h-4 text-emerald-800" />
                      Nhập Sỉ Nguyên Liệu Cho Món Này
                    </div>
                    <p className="text-[11px] text-amber-900 mt-0.5">
                      Cam kết hàng chính hãng 100% từ 4 đối tác chiến lược Chút Chíu (Chuẩn xuất khẩu FDA/ISO/HACCP).
                    </p>
                  </div>

                  {/* NÚT CHỐT: NHẬP SỈ NGUYÊN LIỆU CHO MÓN NÀY */}
                  <button
                    type="button"
                    onClick={() => handleAddAllToCart(modalRecipe)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md shrink-0 ${
                      addedSuccessMap[modalRecipe.id]
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-emerald-900 hover:bg-emerald-950 text-white active:scale-98'
                    }`}
                  >
                    {addedSuccessMap[modalRecipe.id] ? (
                      <>
                        <Check className="w-4 h-4 text-stone-950 stroke-[3]" />
                        <span>Đã thêm bộ sỉ vào giỏ!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-amber-300" />
                        <span>NHẬP SỈ NGUYÊN LIỆU MÓN NÀY</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Danh sách các sản phẩm Chút Chíu trong công thức */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {getRecipeProducts(modalRecipe).map((prod) => (
                    <div
                      key={prod.id}
                      className="p-2.5 rounded-xl bg-white border border-stone-200/90 shadow-2xs flex items-center justify-between gap-3 hover:border-emerald-700/40 transition-all"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-stone-900 truncate" title={prod.name}>
                          {prod.name}
                        </div>
                        <div className="text-[10px] text-stone-500 truncate">
                          Quy cách: {prod.unit}
                        </div>
                        <div className="text-[11px] text-emerald-900 font-bold mt-0.5">
                          Giá sỉ: {formatPrice(prod.wholesalePrices?.wholesale1 || prod.prices?.wholesale1 || prod.prices?.retail || 0, currency, exchangeRate)}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            handleCloseModal();
                            onSelectProduct(prod);
                          }}
                          className="px-2 py-1 rounded-md text-[10px] font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-colors"
                        >
                          Chi tiết
                        </button>
                        <button
                          type="button"
                          onClick={() => onAddToCart(prod, 1, 'wholesale')}
                          className="px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-900 hover:bg-emerald-950 text-white transition-colors flex items-center gap-1"
                          title="Thêm sản phẩm này vào giỏ sỉ"
                        >
                          <ShoppingBag className="w-2.5 h-2.5 text-amber-300" />
                          <span>Thêm sỉ</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description with Marketing Copy */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80">
                "{modalRecipe.description}"
              </p>

              {/* Định Lượng Nguyên Liệu Chuẩn */}
              <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-700" />
                  Định Lượng Nguyên Liệu Chuẩn (Gram / Ml)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {modalRecipe.ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs"
                    >
                      <div className="font-semibold text-stone-800">
                        {ing.name}
                        {ing.note && (
                          <div className="text-[10px] text-stone-500 font-normal italic">
                            ({ing.note})
                          </div>
                        )}
                      </div>
                      <span className="font-mono font-bold text-emerald-950 bg-emerald-100/70 px-2 py-0.5 rounded-md ml-2 shrink-0">
                        {ing.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quy Trình Các Bước Pha Chế */}
              <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Quy Trình Các Bước Pha Chế Chuẩn Barista
                </h3>
                <div className="space-y-2.5">
                  {modalRecipe.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-xs text-stone-700"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-900 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="flex-1 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mẹo Chuyên Nghiệp Từ Chút Chíu Barista */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
                <div className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Mẹo Chuyên Nghiệp Từ Chút Chíu Barista
                </div>
                <ul className="space-y-1.5 text-xs text-amber-900">
                  {modalRecipe.baristaNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mã QR Công Thức đóng dấu CHUTCHIU CO.,LTD */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0a2f4a] via-[#093522] to-[#051c10] text-white border border-blue-500/30 flex flex-col md:flex-row items-center gap-5 shadow-lg relative overflow-hidden">
                <div className="shrink-0 bg-white p-2 rounded-2xl shadow-md border border-stone-200">
                  <RecipeQRCode recipe={modalRecipe} size={140} showActions={true} />
                </div>
                <div className="flex-1 min-w-0 text-center md:text-left relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-gradient-to-r from-[#144385] to-[#15803d] text-white border border-white/20 uppercase mb-2 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Đặc Quyền B2B Quán F&B
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    Mã QR Công Thức - Đóng Dấu CHUTCHIU CO.,LTD
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    Tải ảnh mã QR về in dán tại quầy pha chế, quầy thu ngân hoặc cho nhân viên quét xem định lượng gram/ml tức thì trên điện thoại.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Sticky Action Bar */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md p-3 sm:p-4 border-t border-stone-200 flex items-center justify-between gap-3 z-20">
              <div className="hidden sm:block">
                <span className="text-xs text-stone-500">Món: </span>
                <strong className="text-xs text-stone-900">{modalRecipe.title}</strong>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto ml-auto">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 transition-colors"
                >
                  Đóng
                </button>

                <button
                  type="button"
                  onClick={() => handleAddAllToCart(modalRecipe)}
                  className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md ${
                    addedSuccessMap[modalRecipe.id]
                      ? 'bg-emerald-800 text-white'
                      : 'bg-gradient-to-r from-emerald-900 to-emerald-950 text-white hover:brightness-110'
                  }`}
                >
                  {addedSuccessMap[modalRecipe.id] ? (
                    <>
                      <Check className="w-4 h-4 text-amber-300 stroke-[3]" />
                      <span>Đã thêm trọn bộ!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-amber-300" />
                      <span>NHẬP SỈ NGUYÊN LIỆU CHO MÓN NÀY</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
