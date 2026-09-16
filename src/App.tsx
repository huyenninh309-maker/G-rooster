import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Layers,
  Sparkles,
  Award,
  BookOpen,
  FileCheck2,
  Phone,
  CheckCircle2,
  ChevronRight,
  TrendingDown,
  ShoppingBag,
  Info,
} from 'lucide-react';
import { Product, Currency, PartnerId, PurchaseMode, Sector } from './types';
import { PRODUCTS, VCB_USD_RATE } from './data/products';
import { RECIPES } from './data/recipes';
import { useLiveExchangeRate } from './hooks/useLiveExchangeRate';
import { calculateModePricing, getProductWholesaleConfig, formatPrice } from './utils/pricing';
import { Navbar } from './components/Navbar';
import { TrustBadges } from './components/TrustBadges';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QRCodeModal } from './components/QRCodeModal';
import { SmartCartDrawer, CartItemState, CheckoutSummary } from './components/SmartCartDrawer';
import { CartToast, CartToastData } from './components/CartToast';
import { OrderModal } from './components/OrderModal';
import { AdminOrderDashboard } from './components/AdminOrderDashboard';
import { RecipeCorner } from './components/RecipeCorner';
import { PartnerJourneyBlog } from './components/PartnerJourneyBlog';
import { WholesaleTierExplainer } from './components/WholesaleTierExplainer';
import { FloatingHotlineZalo } from './components/FloatingHotlineZalo';
import { Footer } from './components/Footer';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Live Dynamic Exchange Rate (Open Exchange API with 26.125 fallback)
  const { exchangeRate, rateInfo, refreshRate, isRefreshing } = useLiveExchangeRate();

  // State for Currency (VND vs USD)
  const [currency, setCurrency] = useState<Currency>('VND');
  const [routeNotice, setRouteNotice] = useState<string | null>(null);
  const [activeRecipeId, setActiveRecipeId] = useState<string | null>(null);

  // Sector navigation state: 'all' | 'nong-san' | 'dac-san'
  const [selectedSector, setSelectedSector] = useState<'all' | 'nong-san' | 'dac-san'>('all');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // State for Partner Filter
  const [selectedPartner, setSelectedPartner] = useState<PartnerId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (stored locally, rehydrated against live PRODUCTS)
  const [cartItems, setCartItems] = useState<CartItemState[]>(() => {
    try {
      const saved = localStorage.getItem('chutchiu_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const rehydrated = parsed
            .map((item: any) => {
              const productId = item?.product?.id || item?.productId;
              const freshProduct = PRODUCTS.find((p) => p.id === productId);
              if (!freshProduct) return null;
              return {
                product: freshProduct,
                quantity: Math.max(1, Number(item.quantity) || 1),
                purchaseMode: (item.purchaseMode === 'wholesale' ? 'wholesale' : 'retail') as PurchaseMode,
                selected: item.selected !== false,
              };
            })
            .filter(Boolean) as CartItemState[];

          if (rehydrated.length > 0) {
            return rehydrated;
          }
        }
      }
    } catch (e) {
      console.error('Lỗi nạp giỏ hàng từ localStorage:', e);
    }
    // Default demo cart item to showcase smart wholesale buying
    const vuaMia = PRODUCTS.find((p) => p.partnerId === 'vua-mia');
    return vuaMia ? [{ product: vuaMia, quantity: 1, purchaseMode: 'wholesale', selected: true }] : [];
  });

  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartToast, setCartToast] = useState<CartToastData | null>(null);

  // Modals state
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [detailInitialMode, setDetailInitialMode] = useState<PurchaseMode>('retail');
  const [selectedProductForQR, setSelectedProductForQR] = useState<Product | null>(null);
  const [checkoutSummary, setCheckoutSummary] = useState<CheckoutSummary | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Save cart to local storage (safely saving normalized data)
  useEffect(() => {
    try {
      const cleanData = cartItems
        .filter((item) => item && item.product && item.product.id)
        .map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          purchaseMode: item.purchaseMode || 'retail',
          selected: item.selected !== false,
        }));
      localStorage.setItem('chutchiu_cart', JSON.stringify(cleanData));
    } catch (e) {
      console.warn('Could not persist cart to localStorage:', e);
    }
  }, [cartItems]);

  // Deep-link & Route Synchronizer: Handles /product/:id, /recipe/:id, ?product=, ?recipe=, and hashes
  useEffect(() => {
    try {
      const pathname = location.pathname;
      const searchParams = new URLSearchParams(location.search);
      const hash = location.hash;

      let productIdToOpen: string | null = null;
      let recipeIdToOpen: string | null = null;

      // 1. Path matching: /product/:id or /san-pham/:id
      const productMatch = pathname.match(/^\/(?:product|san-pham)\/([^/]+)/i);
      if (productMatch) {
        productIdToOpen = decodeURIComponent(productMatch[1]);
      }

      // 2. Path matching: /recipe/:id or /cong-thuc/:id
      const recipeMatch = pathname.match(/^\/(?:recipe|cong-thuc)\/([^/]+)/i);
      if (recipeMatch) {
        recipeIdToOpen = decodeURIComponent(recipeMatch[1]);
      }

      // 3. Search parameters fallback: ?product=... or ?recipe=...
      if (!productIdToOpen && searchParams.get('product')) {
        productIdToOpen = searchParams.get('product');
      }
      if (!recipeIdToOpen && searchParams.get('recipe')) {
        recipeIdToOpen = searchParams.get('recipe');
      }

      // 4. Hash fallback: #recipe-xyz or #/product/xyz or #/recipe/xyz
      if (!recipeIdToOpen && hash) {
        if (hash.startsWith('#recipe-')) {
          recipeIdToOpen = hash.replace('#recipe-', '');
        } else if (hash.startsWith('#/recipe/')) {
          recipeIdToOpen = hash.replace('#/recipe/', '');
        }
      }
      if (!productIdToOpen && hash && hash.startsWith('#/product/')) {
        productIdToOpen = hash.replace('#/product/', '');
      }

      // Handle product deep-link
      if (productIdToOpen) {
        const found = PRODUCTS.find(
          (p) => p.id === productIdToOpen || p.barcode === productIdToOpen
        );
        if (found) {
          setSelectedProductForDetail(found);
          if (found.partnerId) {
            setSelectedPartner(found.partnerId);
          }
        } else {
          setRouteNotice(`Không tìm thấy sản phẩm "${productIdToOpen}". Đã đưa về trang chủ.`);
          setTimeout(() => setRouteNotice(null), 4000);
          navigate('/', { replace: true });
        }
      }

      // Handle recipe deep-link
      if (recipeIdToOpen) {
        const found = RECIPES.find((r) => r.id === recipeIdToOpen);
        if (found) {
          setActiveRecipeId(found.id);
          const el = document.getElementById('goc-cong-thuc');
          if (el) {
            setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 200);
          }
        } else {
          setRouteNotice(`Không tìm thấy công thức "${recipeIdToOpen}". Đã đưa về trang chủ.`);
          setTimeout(() => setRouteNotice(null), 4000);
          navigate('/', { replace: true });
        }
      }
    } catch (err) {
      console.error('Error handling route deep link:', err);
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  const handleOpenProductDetail = (product: Product, mode: PurchaseMode = 'retail') => {
    setSelectedProductForDetail(product);
    setDetailInitialMode(mode);
    navigate(`/product/${encodeURIComponent(product.id)}`, { replace: false });
  };

  const handleCloseProductDetail = () => {
    setSelectedProductForDetail(null);
    if (
      location.pathname.startsWith('/product/') ||
      location.pathname.startsWith('/san-pham/')
    ) {
      navigate('/', { replace: false });
    }
  };

  const handleRecipeModalChange = (recipe: any) => {
    if (recipe) {
      setActiveRecipeId(recipe.id);
      navigate(`/recipe/${encodeURIComponent(recipe.id)}`, { replace: false });
    } else {
      setActiveRecipeId(null);
      if (
        location.pathname.startsWith('/recipe/') ||
        location.pathname.startsWith('/cong-thuc/')
      ) {
        navigate('/', { replace: false });
      }
    }
  };


  // Cart Handlers with defensive guards preventing white-screen crashes
  const handleAddToCart = (
    product: Product,
    quantity: number,
    purchaseMode: PurchaseMode = 'retail'
  ) => {
    if (!product || !product.id) return;
    const safeQty = Math.max(1, Number(quantity) || 1);
    const safeMode: PurchaseMode = purchaseMode === 'wholesale' ? 'wholesale' : 'retail';

    setCartItems((prev) => {
      const safePrev = (prev || []).filter((item) => item && item.product && item.product.id);
      const existingIndex = safePrev.findIndex(
        (item) => item.product.id === product.id && (item.purchaseMode || 'retail') === safeMode
      );
      if (existingIndex >= 0) {
        return safePrev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + safeQty, selected: true }
            : item
        );
      }
      return [...safePrev, { product, quantity: safeQty, purchaseMode: safeMode, selected: true }];
    });

    // Immediate Shopee Feedback: Toast Notification + Header Counter Update
    try {
      const wConfig = getProductWholesaleConfig(product);
      const calc = calculateModePricing(product, safeMode, safeQty);
      const unit =
        safeMode === 'wholesale'
          ? wConfig.wholesaleUnit
          : (product.retailUnit || product.unit || 'đv');

      setCartToast({
        id: `${Date.now()}-${product.id}`,
        product,
        quantity: safeQty,
        unit,
        purchaseMode: safeMode,
        totalPriceVND: calc?.totalPrice || 0,
        tierLabel: calc?.activeTierLabel,
      });
    } catch (err) {
      console.error('Error generating cart toast:', err);
    }
  };

  const handleToggleSelectItem = (productId: string, purchaseMode: PurchaseMode) => {
    setCartItems((prev) =>
      (prev || [])
        .filter((item) => item && item.product && item.product.id)
        .map((item) => {
          if (item.product.id === productId && (item.purchaseMode || 'retail') === purchaseMode) {
            const currentSelected = item.selected !== false;
            return { ...item, selected: !currentSelected };
          }
          return item;
        })
    );
  };

  const handleToggleSelectAll = (selectAll: boolean) => {
    setCartItems((prev) =>
      (prev || [])
        .filter((item) => item && item.product && item.product.id)
        .map((item) => ({ ...item, selected: selectAll }))
    );
  };

  const handleDeleteSelected = () => {
    setCartItems((prev) => (prev || []).filter((item) => item && item.selected === false));
  };

  const handleUpdateQuantity = (
    productId: string,
    purchaseMode: PurchaseMode,
    newQty: number
  ) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, purchaseMode);
      return;
    }
    setCartItems((prev) =>
      (prev || [])
        .filter((item) => item && item.product && item.product.id)
        .map((item) =>
          item.product.id === productId && (item.purchaseMode || 'retail') === purchaseMode
            ? { ...item, quantity: newQty }
            : item
        )
    );
  };

  const handleRemoveItem = (productId: string, purchaseMode: PurchaseMode) => {
    setCartItems((prev) =>
      (prev || []).filter(
        (item) => item && item.product && !(item.product.id === productId && (item.purchaseMode || 'retail') === purchaseMode)
      )
    );
  };

  const handleProceedCheckout = (summary: CheckoutSummary) => {
    setCheckoutSummary(summary);
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  const handleOrderComplete = () => {
    // Shopee-style: only remove items that were selected & checked out!
    setCartItems((prev) => prev.filter((item) => item.selected === false));
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter products by selected sector, partner, subCategory, and search keyword
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSector = selectedSector === 'all' || p.sector === selectedSector;
    const matchesPartner = selectedPartner === 'all' || p.partnerId === selectedPartner;
    const matchesSubCategory = selectedSubCategory === 'all' || p.subCategory === selectedSubCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSector && matchesPartner && matchesSubCategory && matchesSearch;
  });

  // Available sub-categories for current partner and sector filter
  const availableSubCategories = useMemo(() => {
    const relevantProducts = PRODUCTS.filter((p) => {
      const matchSector = selectedSector === 'all' || p.sector === selectedSector;
      const matchPartner = selectedPartner === 'all' || p.partnerId === selectedPartner;
      return matchSector && matchPartner;
    });

    const subMap: { [key: string]: number } = {};
    relevantProducts.forEach((p) => {
      if (p.subCategory) {
        subMap[p.subCategory] = (subMap[p.subCategory] || 0) + 1;
      }
    });

    return Object.entries(subMap).map(([name, count]) => ({
      name,
      count,
    }));
  }, [selectedSector, selectedPartner]);

  // Total quantity of items in cart
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 5 Partners tab definitions in exact order with avatars/logos
  const partnerTabs: {
    id: PartnerId | 'all';
    label: string;
    count: number;
    badge: string;
    sector?: 'nong-san' | 'dac-san';
    avatar?: string;
  }[] = [
    {
      id: 'all',
      label: 'Tất cả đối tác',
      count: PRODUCTS.length,
      badge: '5 Thương hiệu',
      avatar: 'https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png',
    },
    {
      id: 'viet-thao-nhien',
      label: 'Việt Thảo Nhiên',
      count: PRODUCTS.filter((p) => p.partnerId === 'viet-thao-nhien').length,
      badge: 'Matcha & Cascara',
      sector: 'nong-san',
      avatar: 'https://theme.hstatic.net/200001001229/1001354547/14/logo.png?v=198',
    },
    {
      id: 'vua-mia',
      label: 'Vua Mía',
      count: PRODUCTS.filter((p) => p.partnerId === 'vua-mia').length,
      badge: 'Nước Mía Tuyết',
      sector: 'nong-san',
      avatar: 'https://vuamia.vn/thumbs/200x200x2/upload/photo/logo-chuan-9538.png',
    },
    {
      id: 'thao-duoc-dato',
      label: 'Thảo Dược DATO',
      count: PRODUCTS.filter((p) => p.partnerId === 'thao-duoc-dato').length,
      badge: 'Sâm Dây Ngọc Linh',
      sector: 'nong-san',
      avatar: 'https://dato.vn/wp-content/uploads/2021/08/logo-dato.png',
    },
    {
      id: 'non-la-aodai',
      label: 'Nón Lá & AODAI',
      count: PRODUCTS.filter((p) => p.partnerId === 'non-la-aodai').length,
      badge: 'Cà Phê Thăng Hoa',
      sector: 'nong-san',
      avatar: 'https://nonlacoffee.com/thumbs/1200x1200x2/upload/photo/logocircle-8023.png',
    },
    {
      id: 'phu-nha',
      label: 'Đặc Sản Phú Nhã',
      count: PRODUCTS.filter((p) => p.partnerId === 'phu-nha').length,
      badge: 'Chà Bông & Khô',
      sector: 'dac-san',
      avatar: '/images/phunha/logo-phunha.svg',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbfbf8] flex flex-col selection:bg-amber-300 selection:text-emerald-950">
      {/* 1. Header / Navbar with Currency Converter & 2 Hotlines */}
      <Navbar
        currency={currency}
        onToggleCurrency={setCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        selectedPartner={selectedPartner}
        onSelectPartner={setSelectedPartner}
        onScrollToSection={handleScrollToSection}
        rateInfo={rateInfo}
        onRefreshRate={refreshRate}
        isRefreshing={isRefreshing}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Deep-link notification banner if product/recipe was invalid */}
      {routeNotice && (
        <div className="bg-amber-50 border-b border-amber-300 px-4 py-2 text-center text-xs font-semibold text-amber-900 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{routeNotice}</span>
        </div>
      )}

      <main className="flex-1">
        {/* Trade Center Hero Section - Ultra-Compact on Mobile/Tablet (50%+ height reduction) */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#0b3b24] via-[#082a17] to-[#04170d] text-white py-2 sm:py-2.5 lg:py-4 px-2.5 sm:px-6 lg:px-8 border-b border-[#d4af37]/30 shadow-md">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Desktop Layout (lg+) */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
              {/* Left Column: Brand, Title, Description & Feature Strip */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#144385]/40 to-[#15803d]/40 text-[#f9df90] border border-emerald-400/30 text-[10px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                  <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>CHUTCHIU CO.,LTD • NÔNG SẢN CAO CẤP</span>
                </div>

                <h1 className="text-xl xl:text-2xl font-black tracking-tight leading-snug font-heading text-white">
                  Sàn Thương Mại Nông Sản B2B & B2C Chuẩn Xuất Khẩu
                </h1>

                <p className="text-xs text-stone-200/90 leading-normal max-w-2xl font-normal line-clamp-1">
                  Phân phối độc quyền 5 thương hiệu danh tiếng: <strong>Việt Thảo Nhiên</strong> (Matcha & Cascara), <strong>Vua Mía</strong> (Nước Mía Tuyết IQF), <strong>Thảo Dược DATO</strong> (Sâm dây Ngọc Linh & Mật ong), <strong>Nón Lá & Aodai Coffee</strong> (Cà phê sấy thăng hoa), <strong>Đặc Sản Phú Nhã</strong> (Chà bông & Khô gia truyền).
                </p>

                {/* Các icon tính năng nhỏ gọn xếp trên cùng 1 hàng ngang mỏng */}
                <div className="flex items-center flex-wrap gap-2 pt-0.5 text-[11px] select-none">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-amber-300 font-bold">
                    <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                    <span>Bảng giá sỉ B2B</span>
                  </div>

                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-stone-200 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>Kho: 44 TĐX Q.1</span>
                  </div>

                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-stone-200 font-medium">
                    <span className={`w-1.5 h-1.5 rounded-full ${rateInfo.isFallback ? 'bg-amber-400' : 'bg-emerald-400'} shrink-0`} />
                    <span>USD: {exchangeRate.toLocaleString('vi-VN')}₫</span>
                    {rateInfo.isFallback && <span className="text-[9px] text-amber-300 ml-0.5">(dự phòng)</span>}
                  </div>
                </div>
              </div>

              {/* Right Column: Hotline & B2B Contact Box */}
              <div className="lg:col-span-5 xl:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-2.5 border border-white/20 shadow-lg flex flex-col justify-between">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/15">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-amber-300" />
                    Tổng Đài Phân Phối Sỉ B2B
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-700/90 text-white font-bold uppercase">
                    Kho Q.1 • Điều phối nhanh
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <a
                    href="tel:0961525450"
                    className="flex flex-col p-1.5 rounded-xl bg-white/95 hover:bg-white text-emerald-950 transition-all shadow-xs group"
                    title="Hotline 1: 0961 525 450"
                  >
                    <span className="text-[9px] text-stone-500 font-medium truncate">Hotline 1 (Tư vấn Sỉ)</span>
                    <span className="text-xs font-mono font-black text-emerald-950 flex items-center justify-between">
                      0961 525 450
                      <ChevronRight className="w-3 h-3 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </a>

                  <a
                    href="tel:0938797904"
                    className="flex flex-col p-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 transition-all shadow-xs group"
                    title="Hotline 2: 0938 7979 04"
                  >
                    <span className="text-[9px] text-stone-800 font-medium truncate">Hotline 2 (Điều phối đơn)</span>
                    <span className="text-xs font-mono font-black text-stone-950 flex items-center justify-between">
                      0938 7979 04
                      <ChevronRight className="w-3 h-3 text-emerald-950 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </a>
                </div>

                <div className="mt-1.5 pt-1.5 border-t border-white/15 flex items-center justify-between text-[10px] text-stone-300">
                  <span>MST: <strong className="text-white font-mono">0319153593</strong></span>
                  <a
                    href="https://zalo.me/0961525450"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-300 underline hover:text-white font-bold"
                  >
                    Zalo báo giá đại lý →
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile & Tablet Ultra-Slim Layout (< lg) - Height reduced 50-60% */}
            <div className="lg:hidden flex flex-col gap-2">
              {/* Row 1: Brand badge & MST */}
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-900/60 text-[#f9df90] border border-emerald-400/30 text-[9.5px] font-bold tracking-wider uppercase shrink-0">
                  <Award className="w-2.5 h-2.5 text-[#d4af37]" />
                  <span>CHUTCHIU CO.,LTD</span>
                </div>
                <span className="text-[10px] text-stone-300 font-mono">
                  MST: 0319153593
                </span>
              </div>

              {/* Title: 16px - 18px on mobile */}
              <h1 className="text-[16px] sm:text-[18px] font-black tracking-tight leading-tight text-white font-heading truncate">
                Sàn Nông Sản B2B & B2C Chuẩn Xuất Khẩu
              </h1>

              {/* 3 Ô TÍNH NĂNG (GIÁ SỈ, KHO, TỶ GIÁ) THU NHỎ THÀNH 1 HÀNG NGANG DUY NHẤT */}
              <div className="grid grid-cols-3 gap-1.5 select-none">
                {/* Ô 1: Giá sỉ */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg py-1 px-1.5 border border-white/15 flex items-center justify-center gap-1 text-center">
                  <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 truncate">
                    Giá Sỉ 4 Mức
                  </span>
                </div>

                {/* Ô 2: Kho */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg py-1 px-1.5 border border-white/15 flex items-center justify-center gap-1 text-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-semibold text-white truncate">
                    Kho: 44 TĐX Q.1
                  </span>
                </div>

                {/* Ô 3: Tỷ giá */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg py-1 px-1.5 border border-white/15 flex items-center justify-center gap-1 text-center">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-300 truncate">
                    1$={exchangeRate.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              {/* Row 3: Slim Horizontal Contact & Action Strip */}
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-0.5">
                <a
                  href="tel:0961525450"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white text-emerald-950 font-black text-[10px] sm:text-xs shadow-xs hover:bg-stone-100 transition-colors shrink-0"
                  title="Hotline 1: 0961 525 450"
                >
                  <Phone className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                  <span>0961 525 450</span>
                </a>

                <a
                  href="tel:0938797904"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-400 text-stone-950 font-black text-[10px] sm:text-xs shadow-xs hover:bg-amber-300 transition-colors shrink-0"
                  title="Hotline 2: 0938 7979 04"
                >
                  <Phone className="w-2.5 h-2.5 text-emerald-950 shrink-0" />
                  <span>0938 7979 04</span>
                </a>

                <a
                  href="https://zalo.me/0961525450"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-900/90 text-amber-300 border border-emerald-500/50 font-bold text-[10px] sm:text-xs shadow-xs hover:bg-emerald-800 transition-colors shrink-0"
                  title="Chat Zalo báo giá sỉ"
                >
                  <span>💬 Zalo Báo Giá</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Three Trust Badges (Hiển thị ngay trên Desktop/Tablet, trên Mobile đặt sau sản phẩm để không che màn hình đầu) */}
        <div className="hidden md:block max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative z-20">
          <TrustBadges
            onOpenRecipeModal={() => handleScrollToSection('goc-cong-thuc')}
          />
        </div>

        {/* 3. Product Catalog Section with Alibaba-style 4-Tier Matrix */}
        <section id="san-pham" className="py-4 sm:py-6 max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          {/* Header: Title */}
          <div className="mb-3.5">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-950 tracking-tight font-heading">
              Danh Mục Sản Phẩm
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Bảng giá sỉ & lẻ chính thức từ Hệ Sinh Thái Đối Tác Chiến Lược Chút Chíu
            </p>
          </div>

          {/* Thanh Điều Hướng Đối Tác (Partner Navigation) - Horizontal Scroll + Search Bar Mỏng */}
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-[0_2px_14px_rgba(0,0,0,0.03)] p-2.5 sm:p-3 mb-4 space-y-2.5">
            {/* HÀNG 1: Chọn Ngành hàng (Tất cả | Nông Sản | Đặc Sản) */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-xl overflow-x-auto scrollbar-none">
              {[
                { id: 'all', label: 'Tất cả', count: PRODUCTS.length },
                {
                  id: 'nong-san',
                  label: 'Nông Sản',
                  count: PRODUCTS.filter((p) => p.sector === 'nong-san' || !p.sector).length,
                },
                {
                  id: 'dac-san',
                  label: 'Đặc Sản',
                  count: PRODUCTS.filter((p) => p.sector === 'dac-san').length,
                },
              ].map((sec) => {
                const isSecSelected = selectedSector === sec.id;
                return (
                  <button
                    key={sec.id}
                    id={`nav-sector-${sec.id}`}
                    onClick={() => {
                      setSelectedSector(sec.id as any);
                      if (sec.id === 'dac-san') {
                        setSelectedPartner('phu-nha');
                      } else if (sec.id === 'nong-san' && selectedPartner === 'phu-nha') {
                        setSelectedPartner('all');
                      }
                      setSelectedSubCategory('all');
                    }}
                    className={`flex-1 min-w-[90px] sm:min-w-0 py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-lg text-xs sm:text-[13px] font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 sm:gap-2 ${
                      isSecSelected
                        ? 'bg-emerald-950 text-white shadow-xs font-black'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                  >
                    <span>{sec.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSecSelected ? 'bg-amber-400 text-stone-950 font-black' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {sec.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* HÀNG 2: Thanh Cuộn Ngang (Horizontal Scroll) Đối Tác dạng Capsule thanh thoát */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-0.5 no-scrollbar">
              {partnerTabs
                .filter((tab) => selectedSector === 'all' || tab.id === 'all' || tab.sector === selectedSector)
                .map((tab) => {
                  const isSelected = selectedPartner === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`tab-partner-${tab.id}`}
                      onClick={() => {
                        setSelectedPartner(tab.id);
                        setSelectedSubCategory('all');
                        if (tab.sector) {
                          setSelectedSector(tab.sector);
                        } else if (tab.id === 'all') {
                          setSelectedSector('all');
                        }
                      }}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950 text-amber-300 border-emerald-950 shadow-xs font-black ring-2 ring-amber-400/40'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200/80 hover:border-stone-300 font-medium'
                      }`}
                    >
                      {tab.avatar ? (
                        <img
                          src={tab.avatar}
                          alt={tab.label}
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full object-contain p-0.5 border border-stone-200 shrink-0 bg-white"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
                          <Layers className="w-3 h-3 text-stone-600" />
                        </div>
                      )}
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold font-mono ${
                          isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-200/80 text-stone-600'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
            </div>

            {/* HÀNG 3: Thanh Tìm Kiếm Mỏng (Slim Search Bar) ngay dưới thanh cuộn ngang để tìm nhanh */}
            <div className="relative w-full pt-0.5">
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm nhanh theo đối tác, tên sản phẩm, mã vạch..."
                  className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-stone-200/90 bg-stone-50/70 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition-all placeholder:text-stone-400 text-stone-900"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 w-4 h-4 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[10px] hover:bg-stone-300 transition-colors"
                    title="Xóa tìm kiếm"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid: 2 cols on mobile, 3 cols on md, 4 cols on lg, 5 cols on xl */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-6">
              <Search className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-800">Không tìm thấy sản phẩm phù hợp</h3>
              <p className="text-xs text-stone-500 mt-1">
                Vui lòng thử từ khóa khác hoặc chọn tất cả đối tác.
              </p>
              <button
                onClick={() => {
                  setSelectedPartner('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold"
              >
                Xem toàn bộ sản phẩm
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-2.5 lg:gap-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  exchangeRate={exchangeRate}
                  onAddToCart={handleAddToCart}
                  onOpenDetail={(prod, mode) => {
                    handleOpenProductDetail(prod, mode || 'retail');
                  }}
                  onOpenQR={setSelectedProductForQR}
                />
              ))}
            </div>
          )}
        </section>

        {/* Mobile Trust Badges (Hiển thị sau danh mục trên mobile để màn hình đầu vào thẳng sản phẩm) */}
        <div className="md:hidden max-w-7xl mx-auto px-2.5 my-2">
          <TrustBadges
            onOpenRecipeModal={() => handleScrollToSection('goc-cong-thuc')}
          />
        </div>

        {/* 4. Recipe Corner (Góc Công Thức Pha Chế Chuyên Nghiệp) */}
        <RecipeCorner
          currency={currency}
          exchangeRate={exchangeRate}
          activeRecipeId={activeRecipeId}
          onRecipeModalChange={handleRecipeModalChange}
          onAddToCart={handleAddToCart}
          onSelectProduct={(product) => {
            handleOpenProductDetail(product, 'wholesale');
          }}
        />

        {/* 5. Wholesale 4-Tier Policy Explainer & Voucher Promo */}
        <WholesaleTierExplainer
          currency={currency}
          onScrollToCatalog={() => handleScrollToSection('san-pham')}
          rateInfo={rateInfo}
          onRefreshRate={refreshRate}
          isRefreshing={isRefreshing}
        />

        {/* 6. Partner Journey Blog ("Hành Trình Đối Tác" - 4 Lễ Ký Kết) */}
        <PartnerJourneyBlog
          onSelectPartnerFilter={(partnerId) => {
            setSelectedPartner(partnerId);
            handleScrollToSection('san-pham');
          }}
        />
      </main>

      {/* 7. Footer with Complete Legal and Contact Information */}
      <Footer
        onSelectPartner={(partnerId) => {
          setSelectedPartner(partnerId);
          handleScrollToSection('san-pham');
        }}
        onScrollToSection={handleScrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 8. Fixed Utilities: 2 Hotlines & Zalo Chat & Floating Cart */}
      <FloatingHotlineZalo
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 9. Smart Tiered Cart Drawer with Shopee Checkbox & Multi-Selection */}
      <SmartCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        currency={currency}
        exchangeRate={exchangeRate}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onToggleSelectItem={handleToggleSelectItem}
        onToggleSelectAll={handleToggleSelectAll}
        onDeleteSelected={handleDeleteSelected}
        onCheckout={handleProceedCheckout}
      />

      {/* Cart Toast Notification (Shopee style instant feedback) */}
      <CartToast
        toast={cartToast}
        currency={currency}
        exchangeRate={exchangeRate}
        onOpenCart={() => setIsCartOpen(true)}
        onClose={() => setCartToast(null)}
      />

      {/* 10. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        initialMode={detailInitialMode}
        currency={currency}
        exchangeRate={exchangeRate}
        isOpen={!!selectedProductForDetail}
        onClose={handleCloseProductDetail}
        onAddToCart={handleAddToCart}
        onOpenQR={setSelectedProductForQR}
      />

      {/* 11. Smart QR Code Modal with Center Chút Chíu Logo */}
      <QRCodeModal
        product={selectedProductForQR}
        isOpen={!!selectedProductForQR}
        onClose={() => setSelectedProductForQR(null)}
      />

      {/* 12. Order Checkout & VietQR Bank Transfer Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        summary={checkoutSummary}
        currency={currency}
        exchangeRate={exchangeRate}
        onOrderSuccess={handleOrderComplete}
      />

      {/* 13. Admin B2B/B2C Order Management Dashboard */}
      <AdminOrderDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currency={currency}
        exchangeRate={exchangeRate}
      />
    </div>
  );
}
