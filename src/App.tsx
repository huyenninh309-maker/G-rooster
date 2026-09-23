import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  ShieldCheck,
  Zap,
  FileText,
} from 'lucide-react';
import { Product, Currency, PartnerId, PurchaseMode, Sector } from './types';
import { PRODUCTS, VCB_USD_RATE } from './data/products';
import { RECIPES } from './data/recipes';
import { useLiveExchangeRate } from './hooks/useLiveExchangeRate';
import { calculateModePricing, getProductWholesaleConfig, formatPrice } from './utils/pricing';
import { Navbar } from './components/Navbar';
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
import {
  PartnerFilterModal,
  PartnerFilterTrigger,
} from './components/PartnerFilterNavigation';

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

  // State for Partner Filter & Drawer (V41: Ready for 50+ partners)
  const [selectedPartner, setSelectedPartner] = useState<PartnerId | 'all'>('all');
  const [isPartnerDrawerOpen, setIsPartnerDrawerOpen] = useState(false);
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
    const defaultDemo = PRODUCTS.find((p) => p.partnerId === 'nuoc-mia-iqf' || p.id === 'vua-mia-tuyet-350ml');
    return defaultDemo ? [{ product: defaultDemo, quantity: 1, purchaseMode: 'wholesale', selected: true }] : [];
  });

  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartToast, setCartToast] = useState<CartToastData | null>(null);

  // Modals state
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [detailInitialMode, setDetailInitialMode] = useState<PurchaseMode>('retail');
  const [originRecipeId, setOriginRecipeId] = useState<string | null>(null);
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

      // 0. Secret Admin route matching: /admin or #admin
      if (pathname === '/admin' || pathname === '/admin/' || hash === '#admin') {
        setIsAdminOpen(true);
      }

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
      } else if (
        !activeRecipeId &&
        !location.pathname.startsWith('/product/') &&
        !location.pathname.startsWith('/san-pham/')
      ) {
        setSelectedProductForDetail(null);
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

  // SEO & Semantic Meta Description synchronization
  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (selectedProductForDetail) {
      document.title = `${selectedProductForDetail.name} - ${selectedProductForDetail.partnerName} | CHÚT CHÍU CO.,LTD`;
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `${selectedProductForDetail.name} (${selectedProductForDetail.packaging || selectedProductForDetail.unit}) từ ${selectedProductForDetail.partnerName}: ${selectedProductForDetail.description || 'Nông sản đặc sản cao cấp chuẩn xuất khẩu'}. Phân phối chính hãng bởi Chút Chíu Co.,Ltd.`
        );
      }
    } else {
      document.title = 'CHÚT CHÍU CO.,LTD | Hệ Thống Phân Phối Nông Sản & Đặc Sản Cao Cấp';
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Chuyên phân phối sỉ & lẻ Matcha Nhật Bản, Nước Mía Tuyết IQF, Thảo dược Sâm Ngọc Linh, Cà phê viên sấy và Đặc sản thực phẩm snack cao cấp uy tín hàng đầu bởi CHUTCHIU CO.,LTD'
        );
      }
    }
  }, [selectedProductForDetail]);

  const originRecipeRef = useRef<string | null>(null);
  const originProductRef = useRef<Product | null>(null);

  const handleOpenProductDetail = (
    product: Product,
    mode: PurchaseMode = 'retail',
    fromRecipeId?: string | null
  ) => {
    const origin = fromRecipeId || activeRecipeId || null;
    originRecipeRef.current = origin;
    setOriginRecipeId(origin);
    setSelectedProductForDetail(product);
    setDetailInitialMode(mode);
    // Khi mở từ công thức: KHÔNG điều hướng URL để giữ nguyên vẹn Modal A (Góc công thức) và vị trí cuộn
    if (!origin) {
      navigate(`/product/${encodeURIComponent(product.id)}`, { replace: false });
    }
  };

  const handleCloseProductDetail = () => {
    const fromRecipe = originRecipeRef.current || originRecipeId || activeRecipeId;
    // Đóng trạng thái cục bộ của Modal B: Tuyệt đối không đẩy khách về Trang chủ khi mở từ Công thức
    setSelectedProductForDetail(null);
    setOriginRecipeId(null);
    originRecipeRef.current = null;

    if (fromRecipe) {
      // ĐẢM BẢO QUAY LẠI ĐÚNG TRANG CÔNG THỨC ĐÓ, TUYỆT ĐỐI KHÔNG ĐẨY VỀ TRANG CHỦ
      setActiveRecipeId(fromRecipe);
      navigate(`/recipe/${encodeURIComponent(fromRecipe)}`, { replace: true });
      const el = document.getElementById('goc-cong-thuc');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
      }
      return;
    }

    // Chỉ dọn URL nếu đang ở trang URL trực tiếp /product/... (không có công thức)
    if (
      !activeRecipeId &&
      (location.pathname.startsWith('/product/') || location.pathname.startsWith('/san-pham/'))
    ) {
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
      } else {
        navigate('/', { replace: true });
      }
    }
  };

  const handleRecipeModalChange = (recipe: any) => {
    if (recipe) {
      const id = typeof recipe === 'string' ? recipe : recipe?.id;
      const found = RECIPES.find((r) => r.id === id);
      if (found) {
        setActiveRecipeId(found.id);
        navigate(`/recipe/${encodeURIComponent(found.id)}`, { replace: false });
        return;
      }
    }
    setActiveRecipeId(null);
    setOriginRecipeId(null);

    // Nếu vừa mở công thức từ xem chi tiết sản phẩm, quay lại đúng sản phẩm đó
    if (originProductRef.current) {
      const originProd = originProductRef.current;
      originProductRef.current = null;
      setSelectedProductForDetail(originProd);
      return;
    }

    if (
      location.pathname.startsWith('/recipe/') ||
      location.pathname.startsWith('/cong-thuc/')
    ) {
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
      } else {
        navigate('/', { replace: true });
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
    if (!summary || !summary.items || summary.items.length === 0) {
      return;
    }
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

  // Total price in VND for cart items
  const cartTotalPriceVND = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (!item || !item.product) return acc;
      const calc = calculateModePricing(item.product, item.purchaseMode || 'retail', item.quantity);
      return acc + calc.totalPrice;
    }, 0);
  }, [cartItems]);

  // 5 Partners tab definitions in exact order with avatars/logos (Scale-ready for 50+)
  const partnerTabs: {
    id: PartnerId | 'all';
    label: string;
    count: number;
    badge: string;
    sector?: 'nong-san' | 'dac-san';
    avatar?: string;
  }[] = useMemo(
    () => [
      {
        id: 'all',
        label: 'Tất cả dòng sản phẩm',
        count: PRODUCTS.length,
        badge: '62 Sản phẩm tuyển chọn',
        avatar: 'https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png',
      },
      {
        id: 'matcha-tra-laka',
        label: 'Matcha & Trà',
        count: PRODUCTS.filter((p) => p.partnerId === 'matcha-tra-laka').length,
        badge: 'Matcha & Cascara Cầu Đất',
        sector: 'nong-san',
        avatar: 'https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png',
      },
      {
        id: 'nuoc-mia-iqf',
        label: 'Nước Mía Tuyết',
        count: PRODUCTS.filter((p) => p.partnerId === 'nuoc-mia-iqf').length,
        badge: 'Cấp Đông Sâu -18°C',
        sector: 'nong-san',
        avatar: 'https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png',
      },
      {
        id: 'thao-duoc-sam',
        label: 'Thảo Dược Sâm',
        count: PRODUCTS.filter((p) => p.partnerId === 'thao-duoc-sam').length,
        badge: 'Sâm Dây & Mật Ong Rừng',
        sector: 'nong-san',
        avatar: 'https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png',
      },
      {
        id: 'ca-phe-vien-say',
        label: 'Cà Phê',
        count: PRODUCTS.filter((p) => p.partnerId === 'ca-phe-vien-say').length,
        badge: 'Sấy Thăng Hoa & Hạt Mộc',
        sector: 'nong-san',
        avatar: 'https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png',
      },
      {
        id: 'dac-san-snack',
        label: 'Đặc Sản & Snack',
        count: PRODUCTS.filter((p) => p.partnerId === 'dac-san-snack').length,
        badge: 'Chế Biến Gia Truyền',
        sector: 'dac-san',
        avatar: 'https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png',
      },
    ],
    []
  );

  // Phân nhóm ngành hàng thông minh (V127):
  // Quy tắc 3 (Từ trên xuống): Nếu khách bấm chọn thủ công vào 'Đặc Sản' ở trên, danh sách bên dưới chỉ được hiện 'Đặc Sản & Snack'
  const handleSectorChange = (newSector: 'all' | 'nong-san' | 'dac-san') => {
    setSelectedSector(newSector);
    setSelectedSubCategory('all');

    if (newSector === 'all') {
      setSelectedPartner('all');
    } else if (newSector === 'dac-san') {
      setSelectedPartner('dac-san-snack');
    } else if (newSector === 'nong-san') {
      const activeObj = partnerTabs.find((p) => p.id === selectedPartner);
      if (!activeObj || activeObj.sector !== 'nong-san') {
        setSelectedPartner('all');
      }
    }
  };

  const handleSelectPartner = (partnerId: PartnerId | 'all') => {
    setSelectedPartner(partnerId);
    setSelectedSubCategory('all');

    // Quy tắc 1 & 2: Đồng bộ từ dưới lên
    if (partnerId === 'all') {
      setSelectedSector('all');
    } else {
      const activeObj = partnerTabs.find((p) => p.id === partnerId);
      if (activeObj && activeObj.sector) {
        setSelectedSector(activeObj.sector);
      }
    }
  };

  const handleClearPartnerFilter = () => {
    // Hành động Reset: Khi người dùng nhấn nút 'X' để bỏ chọn một dòng sản phẩm cụ thể, hệ thống BẮT BUỘC phải tự động chuyển bộ lọc Ngành hàng ở trên cùng về trạng thái 'Tất cả'
    setSelectedPartner('all');
    setSelectedSector('all');
    setSelectedSubCategory('all');
  };

  return (
    <div className="min-h-screen bg-[#fbfbf8] flex flex-col selection:bg-amber-300 selection:text-emerald-950">
      {/* 1. Header / Navbar with Currency Converter & 2 Hotlines */}
      <Navbar
        currency={currency}
        onToggleCurrency={setCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        selectedPartner={selectedPartner}
        onSelectPartner={handleSelectPartner}
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
        {/* TẦNG 2: Banner chính (Hero Section) - Trade Center Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#0b3b24] via-[#082a17] to-[#04170d] text-white py-2 sm:py-2.5 lg:py-3 px-2.5 sm:px-6 lg:px-8 border-b border-[#d4af37]/30 shadow-md">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Desktop Layout (lg+) */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
              {/* Left Column: Brand, Title, Description & Feature Strip */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#144385]/40 to-[#15803d]/40 text-[#f9df90] border border-emerald-400/30 text-[10px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                  <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>CHUTCHIU CO.,LTD • NÔNG SẢN CAO CẤP</span>
                </div>

                {/* THẺ H1 DUY NHẤT CHUẨN SEO CHO TRANG CHỦ */}
                <h1 className="text-xl xl:text-2xl font-black tracking-tight leading-snug font-heading text-white">
                  CHÚT CHÍU CO.,LTD - Hệ Thống Phân Phối Nông Sản &amp; Đặc Sản Cao Cấp
                </h1>

                <p className="text-xs text-stone-200/90 leading-normal max-w-2xl font-normal line-clamp-1">
                  Sàn Thương Mại Nông Sản B2B &amp; B2C Chuẩn Xuất Khẩu • Hệ sinh thái phân phối chiến lược các thương hiệu Nông sản &amp; Đặc sản uy tín
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
                  </div>
                </div>
              </div>

              {/* Right Column: B2B Distribution & Warehouse Highlights */}
              <div className="lg:col-span-5 xl:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-2.5 border border-white/20 shadow-lg flex flex-col justify-between">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/15">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                    Trung Tâm Phân Phối Sỉ B2B
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-700/90 text-white font-bold uppercase">
                    Kho Q.1 • Điều Phối Nhanh
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <div className="flex flex-col p-1.5 rounded-xl bg-white/95 text-emerald-950 shadow-xs">
                    <span className="text-[9px] text-stone-500 font-medium">Kho Quận 1</span>
                    <span className="text-xs font-black text-emerald-950 flex items-center justify-between">
                      Xuất Hỏa Tốc 1-2h
                    </span>
                  </div>

                  <div className="flex flex-col p-1.5 rounded-xl bg-amber-400 text-stone-950 shadow-xs">
                    <span className="text-[9px] text-stone-800 font-medium">Doanh Nghiệp / F&B</span>
                    <span className="text-xs font-black text-stone-950 flex items-center justify-between">
                      Hóa Đơn VAT Đầy Đủ
                    </span>
                  </div>
                </div>

                <div className="mt-1.5 pt-1.5 border-t border-white/15 flex items-center justify-between text-[10px] text-stone-300">
                  <span>MST: <strong className="text-white font-mono">0319153593</strong></span>
                  <button
                    onClick={() => handleScrollToSection('chinh-sach-si')}
                    className="text-amber-300 underline hover:text-white font-bold cursor-pointer"
                  >
                    Bảng 4 mức giá sỉ →
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile & Tablet Ultra-Slim Layout (< lg) - Luxury Minimalist */}
            <div className="lg:hidden flex flex-col gap-1 py-1">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-900/60 text-[#f9df90] border border-emerald-400/30 text-[9px] font-bold tracking-wider uppercase shrink-0">
                  <Award className="w-2.5 h-2.5 text-[#d4af37]" />
                  <span>CHUTCHIU CO.,LTD</span>
                </div>
                <span className="text-[10px] text-stone-300 font-mono">
                  MST: 0319153593
                </span>
              </div>

              <div className="text-[15px] sm:text-[17px] font-black tracking-tight leading-tight text-white font-heading">
                CHÚT CHÍU CO.,LTD - Nông Sản &amp; Đặc Sản Cao Cấp
              </div>

              <p className="text-[11px] text-stone-300 line-clamp-1">
                Sàn Nông Sản B2B &amp; B2C Chuẩn Xuất Khẩu • Phân phối chiến lược uy tín
              </p>
            </div>
          </div>
        </section>

        {/* KHỐI 'CAM KẾT & ƯU ĐÃI' ĐỒNG NHẤT (NẰM NGAY DƯỚI BANNER CHÍNH) */}
        {/* TẦNG 3: Thanh Trust Bar (Màu xanh đen mỏng, 11px, font-normal không in đậm, tinh tế) */}
        <div 
          className="bg-[#051d11] border-b border-emerald-900/60 py-1 px-3 text-stone-300 text-[11px] font-normal shadow-2xs min-h-[26px] sm:min-h-[28px] flex items-center justify-center"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-3 sm:gap-6 font-normal select-none overflow-x-auto no-scrollbar whitespace-nowrap">
            <span className="inline-flex items-center gap-1 text-amber-300 font-normal">
              <Zap className="w-3 h-3 text-amber-400 shrink-0" strokeWidth={1.5} />
              <span>Giao hỏa tốc 2H</span>
            </span>
            <span className="text-emerald-800">|</span>
            <span className="inline-flex items-center gap-1 text-emerald-300 font-normal">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" strokeWidth={1.5} />
              <span>Đổi trả 100%</span>
            </span>
            <span className="text-emerald-800">|</span>
            <button
              type="button"
              onClick={() => handleScrollToSection('goc-cong-thuc')}
              className="inline-flex items-center gap-1 text-stone-200 hover:text-amber-300 transition-colors font-normal cursor-pointer"
            >
              <BookOpen className="w-3 h-3 text-[#d4af37] shrink-0" strokeWidth={1.5} />
              <span>Tặng công thức</span>
            </button>
          </div>
        </div>

        {/* TẦNG 4: Thanh Voucher Cam (Nén chiều cao bằng Trust Bar, 11px, font Jakarta Sans bản Regular không in đậm) */}
        <div 
          className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-900 py-1 px-3 text-center text-[11px] font-normal border-b border-amber-600/30 shadow-2xs min-h-[26px] sm:min-h-[28px] flex items-center justify-center gap-1.5 leading-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <span>🎉 Ưu đãi đặc quyền: Hệ thống tự động giảm ngay 50.000đ cho đơn hàng sỉ đầu tiên của bạn!</span>
        </div>

        {/* 2. Product Catalog Section with Flexible Desktop Grid & 4-Row Header (Y Hệt Hình 1) */}
        <section id="san-pham" className="py-4 sm:py-6 max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          {/* HÀNG 1: Tiêu đề 'Danh Mục Sản Phẩm' và mô tả ngắn mỏng */}
          <div className="mb-3 sm:mb-3.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3 text-emerald-700" />
              Hệ Thống 5 Dòng Sản Phẩm Phân Phối Độc Quyền
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-950 tracking-tight font-heading">
              Danh Mục Sản Phẩm
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Bảng giá sỉ & lẻ trực tiếp từ đại diện phân phối độc quyền CHUTCHIU CO.,LTD, không qua trung gian
            </p>
          </div>

          {/* HÀNG 2: Nhóm Ngành Hàng [Tất cả] [Nông Sản] [Đặc Sản] (nút dẹt, tinh tế - Y hệt Hình 1) */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-xl border border-stone-200/80 mb-2.5 sm:mb-3">
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
                  onClick={() => handleSectorChange(sec.id as any)}
                  className={`flex-1 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-[13px] font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 sm:gap-2 ${
                    isSecSelected
                      ? 'bg-[#0a2e1d] text-white shadow-xs font-black'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  <span>{sec.label}</span>
                  <span
                    className={`text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.2 rounded-full font-mono font-bold whitespace-nowrap inline-flex items-center justify-center gap-0.5 shrink-0 ${
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

          {/* HÀNG 3: BỘ CÔNG CỤ LỌC CHUYÊN NGHIỆP (ĐỒNG BỘ CHO DESKTOP, TABLET & MOBILE - Y HỆT HÌNH 2) */}
          {/* Nút 'Lọc Theo Đối Tác (Chọn thương hiệu)' nằm cạnh thanh tìm kiếm sản phẩm */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
            {/* Nút bấm '🔍 Lọc Theo Đối Tác (Chọn thương hiệu)' - Thiết kế y hệt Hình 2 */}
            <div className="w-full md:w-[380px] lg:w-[420px] shrink-0">
              <PartnerFilterTrigger
                onClick={() => setIsPartnerDrawerOpen(true)}
                selectedPartner={selectedPartner}
                partnerTabs={partnerTabs}
                selectedSector={selectedSector}
                onClearPartner={handleClearPartnerFilter}
              />
            </div>

            {/* Ô tìm kiếm sản phẩm nằm cạnh nút lọc đối tác */}
            <div className="relative flex-1 w-full">
              <div className="relative flex items-center">
                <Search className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm Matcha, Nước mía, Chà bông, Cà phê..."
                  className="w-full pl-9 sm:pl-10 pr-9 h-11 text-xs sm:text-[13px] rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 text-stone-900 placeholder:text-stone-400 shadow-2xs font-medium"
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

              {/* Bảng gợi ý sản phẩm trực quan khi người dùng gõ tìm kiếm */}
              {searchQuery.trim().length > 0 && filteredProducts.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 shadow-xl z-30 p-2 max-h-80 overflow-y-auto divide-y divide-stone-100">
                  <div className="px-2 py-1 text-[10.5px] font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Tìm thấy {filteredProducts.length} sản phẩm tương ứng</span>
                    <span className="text-[#143A24]">Chút Chíu 2.0</span>
                  </div>
                  {filteredProducts.slice(0, 5).map((p) => {
                    const lineLabel =
                      p.partnerId === 'matcha-tra-laka'
                        ? 'Matcha & Trà'
                        : p.partnerId === 'nuoc-mia-iqf'
                        ? 'Nước Mía Tuyết'
                        : p.partnerId === 'thao-duoc-sam'
                        ? 'Thảo Dược Sâm'
                        : p.partnerId === 'ca-phe-vien-say'
                        ? 'Cà Phê'
                        : 'Đặc Sản & Snack';

                    return (
                      <div
                        key={p.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          handleOpenProductDetail(p, 'wholesale');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleOpenProductDetail(p, 'wholesale');
                        }}
                        className="flex items-center gap-2.5 p-2 hover:bg-emerald-50/60 rounded-xl transition-colors cursor-pointer group text-left"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg border border-stone-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wide">
                            {lineLabel}
                          </span>
                          <h4 className="text-xs font-bold text-stone-900 truncate group-hover:text-[#143A24]">
                            {p.name}
                          </h4>
                          <div className="text-[10px] text-stone-500">
                            Giá sỉ từ:{' '}
                            <strong className="text-emerald-950 font-bold font-mono">
                              {(p.prices.wholesale3 || p.prices.wholesale1).toLocaleString('vi-VN')}₫
                            </strong>{' '}
                            / {p.wholesaleUnit || p.unit}
                          </div>
                        </div>
                        <span className="text-[10.5px] text-[#143A24] font-bold px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 shrink-0 group-hover:bg-[#143A24] group-hover:text-white transition-colors">
                          Xem chi tiết ↗
                        </span>
                      </div>
                    );
                  })}
                  {filteredProducts.length > 5 && (
                    <div className="pt-2 text-center">
                      <span className="text-[11px] text-stone-500 font-medium">
                        và còn {filteredProducts.length - 5} sản phẩm khác hiển thị ở lưới bên dưới
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* LƯỚI SẢN PHẨM:
              - Màn hình lớn (Large Desktop >= 1280px): Hiển thị 5 sản phẩm trên một hàng (xl:grid-cols-5).
              - Màn hình nhỏ/Laptop (Desktop/Laptop 1024px - 1279px): Tự động chuyển về 4 sản phẩm trên một hàng (lg:grid-cols-4).
              - Tablet (768px - 1023px): 3 sản phẩm trên một hàng (md:grid-cols-3).
              - Mobile (< 768px): 2 sản phẩm trên một hàng (grid-cols-2).
          */}
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
                  setSelectedSector('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition-colors"
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

        {/* 3. Recipe Corner (Góc Công Thức Pha Chế Chuyên Nghiệp) */}
        <RecipeCorner
          currency={currency}
          exchangeRate={exchangeRate}
          activeRecipeId={activeRecipeId}
          onRecipeModalChange={handleRecipeModalChange}
          onAddToCart={handleAddToCart}
          onSelectProduct={(product, fromRecipeId) => {
            handleOpenProductDetail(product, 'wholesale', fromRecipeId);
          }}
          cartItemCount={totalCartCount}
          cartTotalPrice={cartTotalPriceVND}
          onOpenCart={() => setIsCartOpen(true)}
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
        rateInfo={rateInfo}
      />

      {/* 8. Fixed Utilities: 2 Hotlines & Zalo Chat & Floating Cart */}
      <FloatingHotlineZalo
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 8b. Mobile Sticky Bar: Thanh 'viên thuốc' Footer chuẩn hóa con số giỏ hàng thực tế */}
      <div
        id="mobile-bottom-sticky-bar"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#062415]/95 backdrop-blur-md border-t border-[#d4af37]/60 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] px-3 py-1.5 flex items-center justify-between gap-2.5 animate-in slide-in-from-bottom-2 duration-300"
      >
        <div
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 cursor-pointer select-none min-w-0"
        >
          <div className="relative p-1.5 rounded-xl bg-emerald-900 border border-emerald-700/60 shadow-xs text-white shrink-0">
            <ShoppingBag className="w-4 h-4 text-[#f6d884]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-0.5 bg-red-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border border-white">
                {totalCartCount}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <div className="text-[9.5px] text-stone-300 font-medium leading-none">
              {totalCartCount > 0 ? 'Tổng tiền giỏ hàng:' : 'Giỏ hàng:'}
            </div>
            <div className="text-[15px] font-black text-amber-300 font-heading tracking-tight mt-0.5 truncate">
              {totalCartCount > 0 ? (
                formatPrice(cartTotalPriceVND, currency, exchangeRate)
              ) : (
                <span className="text-stone-400 text-xs font-medium">Đang trống</span>
              )}
            </div>
          </div>
        </div>

        <button
          id="mobile-sticky-checkout-btn"
          onClick={() => setIsCartOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-stone-950 font-bold text-xs transition-all shadow-md active:scale-95 flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>{totalCartCount > 0 ? `Xem Giỏ (${totalCartCount} SP)` : 'Mở Giỏ Hàng'}</span>
          <ChevronRight className="w-4 h-4 text-stone-900" />
        </button>
      </div>

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
        fromRecipeId={originRecipeId || originRecipeRef.current}
        onSelectRecipe={(recipe) => {
          if (selectedProductForDetail) {
            originProductRef.current = selectedProductForDetail;
          }
          setSelectedProductForDetail(null);
          handleRecipeModalChange(recipe);
        }}
      />

      {/* Bảng Lọc Đối Tác Cung Ứng (Modal / Popup y hệt Hình 3 cho Desktop, Tablet & Mobile) */}
      <PartnerFilterModal
        isOpen={isPartnerDrawerOpen}
        onClose={() => setIsPartnerDrawerOpen(false)}
        partnerTabs={partnerTabs}
        selectedPartner={selectedPartner}
        onSelectPartner={handleSelectPartner}
        selectedSector={selectedSector}
        onSelectSector={handleSectorChange}
      />

      {/* 11. Smart QR Code Modal with Center Chút Chíu Logo */}
      <QRCodeModal
        product={selectedProductForQR}
        isOpen={!!selectedProductForQR}
        onClose={() => setSelectedProductForQR(null)}
      />

      {/* 12. Order Checkout & VietQR Bank Transfer Modal */}
      {isOrderModalOpen && checkoutSummary && checkoutSummary.items && checkoutSummary.items.length > 0 && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          summary={checkoutSummary}
          currency={currency}
          exchangeRate={exchangeRate}
          onOrderSuccess={handleOrderComplete}
        />
      )}

      {/* 13. Admin B2B/B2C Order Management Dashboard */}
      <AdminOrderDashboard
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (location.pathname === '/admin' || location.pathname === '/admin/') {
            navigate('/', { replace: true });
          } else if (location.hash === '#admin') {
            navigate(location.pathname, { replace: true });
          }
        }}
        currency={currency}
        exchangeRate={exchangeRate}
      />
    </div>
  );
}
