import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Layers,
  Sparkles,
  BookOpen,
  Phone,
  CheckCircle2,
  Zap,
  ChevronRight,
  TrendingDown,
  ShoppingBag,
  Info,
  FileText,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Globe,
} from 'lucide-react';
import { Product, Currency, PartnerId, PurchaseMode, Sector, Language } from './types';
import { VCB_USD_RATE } from './data/products';
import { getLiveProducts, subscribeToProductUpdates } from './utils/productStore';
import { RECIPES } from './data/recipes';
import { useLiveExchangeRate } from './hooks/useLiveExchangeRate';
import { calculateModePricing, getProductWholesaleConfig, formatPrice, setGlobalExchangeRate } from './utils/pricing';
import { FALLBACK_USD_RATE } from './services/exchangeRate';
import { TRANSLATIONS, translateUnit, COMPANY_EXCHANGE_RATE } from './utils/i18n';
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
import { QuickScrollButtons } from './components/shared/QuickScrollButtons';
import {
  PartnerFilterModal,
  PartnerFilterTrigger,
} from './components/PartnerFilterNavigation';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // V191a: Phân trang / Lazy rendering danh mục khi hiển thị đầy đủ (chống lag/treo trình duyệt mobile)
  const [visibleCatalogLimit, setVisibleCatalogLimit] = useState(20);
  const catalogSentinelRef = useRef<HTMLDivElement | null>(null);

  // Live Dynamic Exchange Rate (Open Exchange API with 25.500 fallback)
  const { exchangeRate, rateInfo, refreshRate, isRefreshing } = useLiveExchangeRate();

  // Sync live exchange rate into global pricing helper
  useEffect(() => {
    if (exchangeRate && exchangeRate > 0) {
      setGlobalExchangeRate(exchangeRate);
    }
  }, [exchangeRate]);

  // V241: State for Language & Currency (VN | EN with Live Exchange Rate)
  const [language, setLanguage] = useState<Language>('VN');
  const [currency, setCurrency] = useState<Currency>('VND');

  const t = TRANSLATIONS[language] || TRANSLATIONS.VN;

  // Handler for Language Switch: Switches UI to EN/VN and auto-syncs currency
  // When [VN]: Language = VN, Currency = VND
  // When [EN]: Language = EN, Currency = USD with Live Exchange Rate
  const handleToggleLanguage = (newLang: Language) => {
    setLanguage(newLang);
    if (newLang === 'EN') {
      setCurrency('USD');
      // If live rate is available, use it; otherwise fallback to 25,500
      const activeRate = exchangeRate && exchangeRate > 0 ? exchangeRate : FALLBACK_USD_RATE;
      setGlobalExchangeRate(activeRate);
      refreshRate(); // trigger refresh to ensure freshest live rate
    } else {
      setCurrency('VND');
    }
  };

  // Handler for Currency Toggle: When switching currency directly
  const handleToggleCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    if (newCurrency === 'USD') {
      const activeRate = exchangeRate && exchangeRate > 0 ? exchangeRate : FALLBACK_USD_RATE;
      setGlobalExchangeRate(activeRate);
      setLanguage('EN');
    } else {
      setLanguage('VN');
    }
  };

  const [routeNotice, setRouteNotice] = useState<string | null>(null);
  const [activeRecipeId, setActiveRecipeId] = useState<string | null>(null);

  // Sector navigation state: 'all' | 'nong-san' | 'dac-san'
  const [selectedSector, setSelectedSector] = useState<'all' | 'nong-san' | 'dac-san'>('all');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFullCatalogMode, setIsFullCatalogMode] = useState(false);

  // State for Partner Filter & Drawer (V41: Ready for 50+ partners)
  const [selectedPartner, setSelectedPartner] = useState<PartnerId | 'all'>('all');
  const [isPartnerDrawerOpen, setIsPartnerDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Live dynamic product catalog with 2-way sync (base catalog + admin overrides)
  const [liveProducts, setLiveProducts] = useState<Product[]>(() => getLiveProducts());

  useEffect(() => {
    const unsubscribe = subscribeToProductUpdates(() => {
      setLiveProducts(getLiveProducts());
    });
    return unsubscribe;
  }, []);

  // Cart State (stored locally, rehydrated against live products)
  const [cartItems, setCartItems] = useState<CartItemState[]>(() => {
    try {
      // V148 FORCE RESET: Clear any legacy demo items stored from previous versions and guarantee initial state 0
      const hasResetV148 = localStorage.getItem('chutchiu_cart_v148_reset');
      if (!hasResetV148) {
        localStorage.setItem('chutchiu_cart_v148_reset', 'true');
        localStorage.removeItem('chutchiu_cart');
        return [];
      }

      const saved = localStorage.getItem('chutchiu_cart');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          if (parsed.length === 0) {
            return [];
          }
          const initialCatalog = getLiveProducts();
          const rehydrated = parsed
            .map((item: any) => {
              const productId = item?.product?.id || item?.productId;
              // Discard any old default demo item
              if (productId === 'vua-mia-tuyet-350ml' && parsed.length === 1 && Number(item.quantity) === 1) {
                return null;
              }
              const freshProduct = initialCatalog.find((p) => p.id === productId);
              if (!freshProduct) return null;
              return {
                product: freshProduct,
                quantity: Math.max(1, Number(item.quantity) || 1),
                purchaseMode: (item.purchaseMode === 'wholesale' ? 'wholesale' : 'retail') as PurchaseMode,
                selected: item.selected !== false,
              };
            })
            .filter(Boolean) as CartItemState[];

          return rehydrated;
        }
      }
    } catch (e) {
      console.error('Lỗi nạp giỏ hàng từ localStorage:', e);
    }
    // Default initial cart is strictly empty (0 items)
    return [];
  });

  // Keep cart items and selected product synchronized if admin updates prices or images live
  useEffect(() => {
    setCartItems((prev) =>
      prev.map((item) => {
        const fresh = liveProducts.find((p) => p.id === item.product.id);
        return fresh ? { ...item, product: fresh } : item;
      })
    );
    if (selectedProductForDetail) {
      const freshDetail = liveProducts.find((p) => p.id === selectedProductForDetail.id);
      if (freshDetail) {
        setSelectedProductForDetail(freshDetail);
      }
    }
  }, [liveProducts]);

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
      if (cleanData.length === 0) {
        localStorage.removeItem('chutchiu_cart');
      } else {
        localStorage.setItem('chutchiu_cart', JSON.stringify(cleanData));
      }
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
        const found = getLiveProducts().find(
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

  // SEO & Semantic Meta Description synchronization (V182: [Tên sản phẩm] - G-ROOSTER | Nông sản cao cấp)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.querySelector('meta[name="og:title"]');
    if (selectedProductForDetail) {
      const dynamicTitle = `${selectedProductForDetail.name} - G-ROOSTER | Nông sản cao cấp`;
      document.title = dynamicTitle;
      if (ogTitle) {
        ogTitle.setAttribute('content', dynamicTitle);
      }
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `${selectedProductForDetail.name} (${selectedProductForDetail.packaging || selectedProductForDetail.unit}) từ ${selectedProductForDetail.partnerName}: ${selectedProductForDetail.description || 'Nông sản đặc sản cao cấp chuẩn xuất khẩu'}. Phân phối chính hãng bởi G-ROOSTER CO.,LTD.`
        );
      }
    } else {
      const defaultTitle = 'G-ROOSTER CO.,LTD | Hệ Thống Phân Phối Cao Cấp';
      document.title = defaultTitle;
      if (ogTitle) {
        ogTitle.setAttribute('content', defaultTitle);
      }
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Hệ thống phân phối sỉ & lẻ Nông sản & Đặc sản từ G-ROOSTER.'
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
    if (typeof document === 'undefined') return;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter products by selected sector, partner, subCategory, and search keyword
  const filteredProducts = liveProducts.filter((p) => {
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
    const relevantProducts = liveProducts.filter((p) => {
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
  }, [liveProducts, selectedSector, selectedPartner]);

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
        label: language === 'EN' ? 'All Product Lines' : 'Tất cả dòng sản phẩm',
        count: liveProducts.length,
        badge: language === 'EN' ? `${liveProducts.length} Premium Selected Products` : `${liveProducts.length} Sản phẩm tuyển chọn`,
        avatar: 'https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png',
      },
      {
        id: 'matcha-tra-laka',
        label: language === 'EN' ? 'Matcha & Tea' : 'Matcha & Trà',
        count: liveProducts.filter((p) => p.partnerId === 'matcha-tra-laka').length,
        badge: language === 'EN' ? 'Ceremonial Matcha & Cascara' : 'Matcha & Cascara Cầu Đất',
        sector: 'nong-san',
        avatar: 'https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png',
      },
      {
        id: 'nuoc-mia-iqf',
        label: language === 'EN' ? 'Frozen Sugarcane Juice' : 'Nước Mía Tuyết',
        count: liveProducts.filter((p) => p.partnerId === 'nuoc-mia-iqf').length,
        badge: language === 'EN' ? 'Deep-Frozen -18°C IQF' : 'Cấp Đông Sâu -18°C',
        sector: 'nong-san',
        avatar: 'https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png',
      },
      {
        id: 'thao-duoc-sam',
        label: language === 'EN' ? 'Herbal & Ginseng' : 'Thảo Dược Sâm',
        count: liveProducts.filter((p) => p.partnerId === 'thao-duoc-sam').length,
        badge: language === 'EN' ? 'Dang Shen & Wildflower Honey' : 'Sâm Dây & Mật Ong Rừng',
        sector: 'nong-san',
        avatar: 'https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png',
      },
      {
        id: 'ca-phe-vien-say',
        label: language === 'EN' ? 'Premium Coffee' : 'Cà Phê Mộc',
        count: liveProducts.filter((p) => p.partnerId === 'ca-phe-vien-say').length,
        badge: language === 'EN' ? 'Freeze-Dried & Roasted Beans' : 'Sấy Thăng Hoa & Hạt Mộc',
        sector: 'nong-san',
        avatar: 'https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png',
      },
      {
        id: 'dac-san-snack',
        label: language === 'EN' ? 'Specialties & Snacks' : 'Đặc Sản & Snack',
        count: liveProducts.filter((p) => p.partnerId === 'dac-san-snack').length,
        badge: language === 'EN' ? 'Artisan Traditional Delicacies' : 'Chế Biến Gia Truyền',
        sector: 'dac-san',
        avatar: 'https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png',
      },
      {
        id: 'socola-qua-tang',
        label: language === 'EN' ? 'Chocolate & Gifts' : 'Socola & Quà Tặng',
        count: liveProducts.filter((p) => p.partnerId === 'socola-qua-tang').length,
        badge: language === 'EN' ? 'Fermented Ben Tre Cacao' : 'Hạt Cacao Bến Tre Lên Men',
        sector: 'dac-san',
        avatar: '/images/socola/socola-den-100-khong-duong-50g.jpg',
      },
    ],
    [liveProducts, language]
  );

  // 10 Sản phẩm Nông Sản tiêu biểu (2 hàng x 5 cột desktop | 5 hàng x 2 cột mobile)
  const featuredNongSanProducts = useMemo(() => {
    const matcha = liveProducts.filter((p) => p.partnerId === 'matcha-tra-laka');
    const mia = liveProducts.filter((p) => p.partnerId === 'nuoc-mia-iqf');
    const sam = liveProducts.filter((p) => p.partnerId === 'thao-duoc-sam');
    const caphe = liveProducts.filter((p) => p.partnerId === 'ca-phe-vien-say');

    const selected: Product[] = [];
    selected.push(...matcha.slice(0, 3));
    selected.push(...mia.slice(0, 1));
    selected.push(...sam.slice(0, 3));
    selected.push(...caphe.slice(0, 3));
    return selected;
  }, [liveProducts]);

  // 10 Sản phẩm Đặc Sản tiêu biểu (2 hàng x 5 cột desktop | 5 hàng x 2 cột mobile)
  const featuredDacSanProducts = useMemo(() => {
    const dacSan = liveProducts.filter((p) => p.partnerId === 'dac-san-snack');
    const socola = liveProducts.filter((p) => p.partnerId === 'socola-qua-tang');

    const selected: Product[] = [];
    selected.push(...dacSan.slice(0, 3));
    selected.push(...socola.slice(0, 7));
    return selected;
  }, [liveProducts]);

  // Phân nhóm ngành hàng thông minh
  const handleSectorChange = (newSector: 'all' | 'nong-san' | 'dac-san') => {
    setSelectedSector(newSector);
    setSelectedSubCategory('all');
    setIsFullCatalogMode(false);

    if (newSector === 'all') {
      setSelectedPartner('all');
    } else {
      const activeObj = partnerTabs.find((p) => p.id === selectedPartner);
      if (!activeObj || activeObj.sector !== newSector) {
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

  // V191a: Reset và kích hoạt tải dần (Infinite scroll / Progressive Load) cho chế độ xem toàn bộ sản phẩm
  useEffect(() => {
    setVisibleCatalogLimit(20);
  }, [searchQuery, selectedPartner, selectedSector, isFullCatalogMode]);

  useEffect(() => {
    if (!catalogSentinelRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCatalogLimit((prev) => prev + 20);
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(catalogSentinelRef.current);
    return () => observer.disconnect();
  }, [filteredProducts.length, visibleCatalogLimit, isFullCatalogMode]);

  if (isAdminOpen) {
    return (
      <ErrorBoundary
        name="AdminDashboard"
        fallback={
          <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-3">
              <h3 className="font-bold text-stone-900">Đang khởi động lại trang Quản Trị...</h3>
              <p className="text-xs text-stone-600">Đã phát hiện vấn đề hiển thị trên thiết bị. Bấm nút dưới để quay về.</p>
              <button
                onClick={() => setIsAdminOpen(false)}
                className="px-4 py-2 bg-emerald-900 text-white rounded-xl text-xs font-bold"
              >
                Quay lại Website
              </button>
            </div>
          </div>
        }
      >
        <AdminOrderDashboard
          isOpen={true}
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
      </ErrorBoundary>
    );
  }

  return (
    <div className="app-container min-h-screen bg-[#fbfbf8] flex flex-col selection:bg-amber-300 selection:text-emerald-950 pb-[80px] lg:pb-0">
      {/* 1. Header / Navbar with Currency Converter & 2 Hotlines */}
      <Navbar
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        language={language}
        onToggleLanguage={handleToggleLanguage}
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
        {/* =========================================================================
            HỆ THỐNG 2 THANH THÔNG TIN TINH GIẢN "CLEAN UI" (V230 & V240 ĐA NGÔN NGỮ)
            - Loại bỏ hoàn toàn thanh Trust Bar (Hóa đơn VAT, Kho hàng Q.1, Bảng giá sỉ)
            - Dải 1 (Feature Bar): ⚡ Giao hỏa tốc 2H | ✅ Đổi trả 100% | 📖 Tặng công thức
              (Font chữ trắng mỏng tinh tế, nền xanh đậm #00332c đồng bộ 100% với Header & Footer)
            - Dải 2 (Promo Bar): VÀNG CAM RỰC RỠ (#f39c12) y hệt Hình 2, chữ Đen/Xanh đậm
              tương phản cực cao, thông tin cực kỳ dễ đọc.
            - Mobile: Vừa khít màn hình, không xuất hiện thanh cuộn ngang, font 11px.
           ========================================================================= */}

        {/* DẢI 1: Feature Bar (Xanh Đậm #00332c đồng bộ thương hiệu, Font Chữ Trắng Mỏng Tinh Tế, Icon Vàng Đồng #D4AF37) */}
        <div className="w-full bg-[#00332c] border-b border-[#D4AF37]/15 h-[32px] md:h-[36px] px-2 sm:px-4 text-stone-200 text-[10.5px] sm:text-xs font-light overflow-hidden flex items-center justify-center shadow-xs">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2.5 sm:gap-6 md:gap-8 text-center whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 text-stone-200 font-light shrink-0">
              <Zap className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" strokeWidth={1.8} />
              <span>{t.featureDelivery}</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="inline-flex items-center gap-1.5 text-stone-200 font-light shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" strokeWidth={1.8} />
              <span>{t.featureReturn}</span>
            </span>
            <span className="text-white/20">|</span>
            <button
              type="button"
              onClick={() => handleScrollToSection('goc-cong-thuc')}
              className="inline-flex items-center gap-1.5 text-stone-200 hover:text-[#f6d884] font-light transition-colors cursor-pointer shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" strokeWidth={1.8} />
              <span>{t.featureRecipe}</span>
            </button>
          </div>
        </div>

        {/* DẢI 2: Promo Bar (VÀNG CAM #f39c12 - ÉP 1 HÀNG DUY NHẤT CHỐNG TRÀN CHỮ THEO V233) */}
        <div className="w-full bg-[#f39c12] text-stone-950 border-b border-[#d68910] h-[30px] sm:h-[32px] md:h-[36px] px-2 sm:px-4 text-center font-bold overflow-hidden flex items-center justify-center shadow-xs select-none">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-1 whitespace-nowrap text-[10.5px] sm:text-[11.5px] md:text-xs">
            <span className="inline sm:hidden whitespace-nowrap">
              {t.promoTextShort}
            </span>
            <span className="hidden sm:inline whitespace-nowrap">
              {t.promoTextFull}
            </span>
          </div>
        </div>

        {/* 2. Product Catalog Section with Flexible Desktop Grid & 4-Row Header (Thu hẹp 20px khoảng cách theo V229) */}
        <section id="san-pham" className="pt-3 sm:pt-4 md:pt-5 pb-8 sm:pb-12 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          {/* HÀNG 1: Tiêu đề H1 'Hệ Thống Cung Ứng Nông Sản & Đặc Sản Xuất Khẩu' chuẩn B2B Quốc Tế & Hàng Icon Trust Badges */}
          <div className="mb-3.5 sm:mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold text-[#00332c] tracking-tight font-heading leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
              {t.heroSlogan}
            </p>

            {/* V249: Hàng Icon Trust Badges nhỏ tinh tế: [ISO 22000] | [HACCP] | [VietGAP] | [Halal Certified]
                - Ép hiển thị trên 1 hàng duy nhất trên Mobile (không xuống hàng ở chứng nhận cuối cùng)
                - display: flex; flex-wrap: nowrap; overflow-x: auto;
                - Font-size ~10px trên mobile, padding vừa vặn, ẩn scrollbar
            */}
            <div
              className="mt-2 sm:mt-2.5 flex flex-nowrap items-center gap-1 sm:gap-2.5 overflow-x-auto no-scrollbar py-0.5"
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <span className="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium shadow-2xs text-[10px] sm:text-xs shrink-0 whitespace-nowrap">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-700 shrink-0" strokeWidth={2} />
                <span>{t.badgeISO}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 font-medium shadow-2xs text-[10px] sm:text-xs shrink-0 whitespace-nowrap">
                <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700 shrink-0" strokeWidth={2} />
                <span>{t.badgeHACCP}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium shadow-2xs text-[10px] sm:text-xs shrink-0 whitespace-nowrap">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-700 shrink-0" strokeWidth={2} />
                <span>{t.badgeVietGAP}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-900 font-medium shadow-2xs text-[10px] sm:text-xs shrink-0 whitespace-nowrap">
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-700 shrink-0" strokeWidth={2} />
                <span>{t.badgeHalal}</span>
              </span>
            </div>
          </div>

          {/* HÀNG 2: Nhóm Ngành Hàng [Tất cả] [Nông Sản] [Đặc Sản] (nút dẹt, tinh tế - Y hệt Hình 1) */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-xl border border-stone-200/80 mb-3 sm:mb-4">
            {[
              { id: 'all', label: t.allProducts, count: liveProducts.length },
              {
                id: 'nong-san',
                label: t.agriProducts,
                count: liveProducts.filter((p) => p.sector === 'nong-san' || !p.sector).length,
              },
              {
                id: 'dac-san',
                label: t.specialties,
                count: liveProducts.filter((p) => p.sector === 'dac-san').length,
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
                    <span>{language === 'EN' ? 'ITEMS' : 'SP'}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* HÀNG 3: BỘ CÔNG CỤ LỌC CHUYÊN NGHIỆP (ĐỒNG BỘ CHO DESKTOP, TABLET & MOBILE - Y HỆT HÌNH 2) */}
          {/* Nút 'Lọc Theo Đối Tác (Chọn thương hiệu)' nằm cạnh thanh tìm kiếm sản phẩm */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 sm:gap-3.5 mb-6 sm:mb-8">
            {/* Nút bấm '🔍 Lọc Theo Đối Tác (Chọn thương hiệu)' - Thiết kế y hệt Hình 2 */}
            <div className="w-full md:w-[380px] lg:w-[420px] shrink-0">
              <PartnerFilterTrigger
                onClick={() => setIsPartnerDrawerOpen(true)}
                selectedPartner={selectedPartner}
                partnerTabs={partnerTabs}
                selectedSector={selectedSector}
                onClearPartner={handleClearPartnerFilter}
                language={language}
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
                    <span>{language === 'EN' ? `Found ${filteredProducts.length} matching products` : `Tìm thấy ${filteredProducts.length} sản phẩm tương ứng`}</span>
                    <span className="text-[#143A24]">G-ROOSTER</span>
                  </div>
                  {filteredProducts.slice(0, 5).map((p) => {
                    const lineLabel =
                      p.partnerId === 'matcha-tra-laka'
                        ? (language === 'EN' ? 'Matcha & Tea' : 'Matcha & Trà')
                        : p.partnerId === 'nuoc-mia-iqf'
                        ? (language === 'EN' ? 'Frozen Sugarcane Juice' : 'Nước Mía Tuyết')
                        : p.partnerId === 'thao-duoc-sam'
                        ? (language === 'EN' ? 'Herbal & Ginseng' : 'Thảo Dược Sâm')
                        : p.partnerId === 'ca-phe-vien-say'
                        ? (language === 'EN' ? 'Premium Coffee' : 'Cà Phê Mộc')
                        : p.partnerId === 'socola-qua-tang'
                        ? (language === 'EN' ? 'Chocolate & Gifts' : 'Socola & Quà Tặng')
                        : (language === 'EN' ? 'Specialties & Snacks' : 'Đặc Sản & Snack');

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
                          alt={`${p.name} - G-Rooster`}
                          className="w-10 h-10 object-cover rounded-lg border border-stone-200 shrink-0"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wide">
                            {lineLabel}
                          </span>
                          <h4 className="text-xs font-bold text-stone-900 truncate group-hover:text-[#143A24]">
                            {language === 'EN' ? (p.englishName || p.name) : p.name}
                          </h4>
                          <div className="text-[10px] text-stone-500">
                            {language === 'EN' ? 'Wholesale from:' : 'Giá sỉ từ:'}{' '}
                            <strong className="text-emerald-950 font-bold font-mono">
                              {(p.prices.wholesale3 || p.prices.wholesale1).toLocaleString('en-US')}₫
                            </strong>{' '}
                            / {language === 'EN' ? (p.wholesaleUnit ? p.wholesaleUnit.toLowerCase() : 'unit') : (p.wholesaleUnit || p.unit)}
                          </div>
                        </div>
                        <span className="text-[10.5px] text-[#143A24] font-bold px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 shrink-0 group-hover:bg-[#143A24] group-hover:text-white transition-colors">
                          {language === 'EN' ? 'View details ↗' : 'Xem chi tiết ↗'}
                        </span>
                      </div>
                    );
                  })}
                  {filteredProducts.length > 5 && (
                    <div className="pt-2 text-center">
                      <span className="text-[11px] text-stone-500 font-medium">
                        {language === 'EN' ? `and ${filteredProducts.length - 5} more products in the catalog below` : `và còn ${filteredProducts.length - 5} sản phẩm khác hiển thị ở lưới bên dưới`}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* LƯỚI SẢN PHẨM:
              - Trang chủ mặc định: Tuyệt đối không hiện toàn bộ 133 sản phẩm.
              - Mỗi nhóm ngành hàng (Nông sản / Đặc sản) hiển thị tối đa 10 sản phẩm tiêu biểu (Desktop: 2 hàng x 5 cột | Mobile: 5 hàng x 2 cột).
              - Ngay dưới mỗi danh sách 10 món: Thêm nút bấm sang trọng 'XEM TOÀN BỘ [SỐ LƯỢNG] SẢN PHẨM ↗'.
          */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-6">
              <Search className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-800">{language === 'EN' ? 'No matching products found' : 'Không tìm thấy sản phẩm phù hợp'}</h3>
              <p className="text-xs text-stone-500 mt-1">
                {language === 'EN' ? 'Please try another keyword or select all categories.' : 'Vui lòng thử từ khóa khác hoặc chọn tất cả đối tác.'}
              </p>
              <button
                onClick={() => {
                  setSelectedPartner('all');
                  setSelectedSector('all');
                  setSearchQuery('');
                  setIsFullCatalogMode(false);
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition-colors"
              >
                {language === 'EN' ? 'View all products' : 'Xem toàn bộ sản phẩm'}
              </button>
            </div>
          ) : !isFullCatalogMode && searchQuery.trim() === '' && selectedPartner === 'all' ? (
            /* CHẾ ĐỘ GIỚI HẠN 10 SẢN PHẨM TIÊU BIỂU MỖI NGÀNH HÀNG */
            <div className="space-y-10 sm:space-y-14">
              {/* NHÓM 1: NÔNG SẢN (Hiển thị khi chọn 'all' hoặc 'nong-san') */}
              {(selectedSector === 'all' || selectedSector === 'nong-san') && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-stone-200/80">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-emerald-100 flex items-center justify-center font-bold text-emerald-900 text-[11px] sm:text-xs shrink-0">
                        🌾
                      </span>
                      <h3 className="text-[12px] min-[380px]:text-[13px] sm:text-base md:text-lg font-extrabold text-[#143A24] font-heading tracking-tight whitespace-nowrap truncate min-w-0">
                        {language === 'EN' ? 'Featured Agri-Products' : 'Nhóm Nông Sản Tiêu Biểu'}
                      </h3>
                    </div>
                    <span className="text-[9.5px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-mono font-bold bg-amber-50 text-amber-900 border border-amber-300/80 shrink-0 whitespace-nowrap leading-tight">
                      10 / {liveProducts.filter((p) => p.sector === 'nong-san' || !p.sector).length} {language === 'EN' ? 'ITEMS' : 'SP'}
                    </span>
                  </div>

                  {/* Lưới 10 SP Nông Sản (Desktop: 2 hàng x 5 cột | Mobile: 5 hàng x 2 cột) */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4">
                    {featuredNongSanProducts.map((product, idx) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        currency={currency}
                        language={language}
                        exchangeRate={exchangeRate}
                        isFirst={idx === 0}
                        onAddToCart={handleAddToCart}
                        onOpenDetail={(prod, mode) => {
                          handleOpenProductDetail(prod, mode || 'retail');
                        }}
                        onOpenQR={setSelectedProductForQR}
                      />
                    ))}
                  </div>

                  {/* Nút bấm sang trọng 'XEM TOÀN BỘ [SỐ LƯỢNG] SẢN PHẨM ↗' */}
                  <div className="mt-4 sm:mt-5 text-center">
                    <button
                      id="btn-view-all-nong-san"
                      onClick={() => {
                        setSelectedSector('nong-san');
                        setIsFullCatalogMode(true);
                        handleScrollToSection('san-pham');
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-2xl bg-gradient-to-r from-[#0a2e1d] via-[#143A24] to-[#0a2e1d] hover:from-[#143A24] hover:to-[#1f5436] text-[#f6d884] hover:text-white font-heading font-extrabold text-xs sm:text-[13px] tracking-wider uppercase shadow-md hover:shadow-xl transition-all duration-300 border border-[#d4af37]/50 active:scale-[0.99] cursor-pointer group"
                    >
                      <span>{language === 'EN' ? `VIEW ALL ${liveProducts.filter((p) => p.sector === 'nong-san' || !p.sector).length} AGRI-PRODUCTS` : `XEM TOÀN BỘ ${liveProducts.filter((p) => p.sector === 'nong-san' || !p.sector).length} SẢN PHẨM NÔNG SẢN`}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#f6d884] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {/* NHÓM 2: ĐẶC SẢN (Hiển thị khi chọn 'all' hoặc 'dac-san') */}
              {(selectedSector === 'all' || selectedSector === 'dac-san') && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-stone-200/80">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-amber-100 flex items-center justify-center font-bold text-amber-900 text-[11px] sm:text-xs shrink-0">
                        🎁
                      </span>
                      <h3 className="text-[12px] min-[380px]:text-[13px] sm:text-base md:text-lg font-extrabold text-[#143A24] font-heading tracking-tight whitespace-nowrap truncate min-w-0">
                        {language === 'EN' ? 'Featured Specialties & Gift Chocolates' : 'Nhóm Đặc Sản & Socola Quà Tặng'}
                      </h3>
                    </div>
                    <span className="text-[9.5px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-mono font-bold bg-amber-50 text-amber-900 border border-amber-300/80 shrink-0 whitespace-nowrap leading-tight">
                      10 / {liveProducts.filter((p) => p.sector === 'dac-san').length} {language === 'EN' ? 'ITEMS' : 'SP'}
                    </span>
                  </div>

                  {/* Lưới 10 SP Đặc Sản (Desktop: 2 hàng x 5 cột | Mobile: 5 hàng x 2 cột) */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4">
                    {featuredDacSanProducts.map((product, idx) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        currency={currency}
                        language={language}
                        exchangeRate={exchangeRate}
                        isFirst={idx === 0}
                        onAddToCart={handleAddToCart}
                        onOpenDetail={(prod, mode) => {
                          handleOpenProductDetail(prod, mode || 'retail');
                        }}
                        onOpenQR={setSelectedProductForQR}
                      />
                    ))}
                  </div>

                  {/* Nút bấm sang trọng 'XEM TOÀN BỘ [SỐ LƯỢNG] SẢN PHẨM ↗' */}
                  <div className="mt-4 sm:mt-5 text-center">
                    <button
                      id="btn-view-all-dac-san"
                      onClick={() => {
                        setSelectedSector('dac-san');
                        setIsFullCatalogMode(true);
                        handleScrollToSection('san-pham');
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-2xl bg-gradient-to-r from-[#0a2e1d] via-[#143A24] to-[#0a2e1d] hover:from-[#143A24] hover:to-[#1f5436] text-[#f6d884] hover:text-white font-heading font-extrabold text-xs sm:text-[13px] tracking-wider uppercase shadow-md hover:shadow-xl transition-all duration-300 border border-[#d4af37]/50 active:scale-[0.99] cursor-pointer group"
                    >
                      <span>{language === 'EN' ? `VIEW ALL ${liveProducts.filter((p) => p.sector === 'dac-san').length} SPECIALTY PRODUCTS` : `XEM TOÀN BỘ ${liveProducts.filter((p) => p.sector === 'dac-san').length} SẢN PHẨM ĐẶC SẢN`}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#f6d884] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* CHẾ ĐỘ DANH MỤC ĐẦY ĐỦ / TÌM KIẾM / ĐỐI TÁC CỤ THỂ */
            <div className="space-y-4">
              {isFullCatalogMode && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                  <div className="flex items-center gap-2 font-medium">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'EN' ? `Displaying all ${filteredProducts.length} catalog products` : `Đang hiển thị toàn bộ ${filteredProducts.length} sản phẩm danh mục`}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsFullCatalogMode(false);
                      handleScrollToSection('san-pham');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-900 font-bold hover:bg-emerald-100 transition-colors cursor-pointer text-[11px]"
                  >
                    {language === 'EN' ? '↩ Collapse to 10 featured items' : '↩ Thu gọn về 10 món tiêu biểu'}
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4">
                {filteredProducts.slice(0, visibleCatalogLimit).map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    language={language}
                    exchangeRate={exchangeRate}
                    isFirst={idx === 0}
                    onAddToCart={handleAddToCart}
                    onOpenDetail={(prod, mode) => {
                      handleOpenProductDetail(prod, mode || 'retail');
                    }}
                    onOpenQR={setSelectedProductForQR}
                  />
                ))}
              </div>

              {/* Sentinel trigger for smooth auto-loading when scrolling on mobile */}
              <div ref={catalogSentinelRef} className="h-4 w-full pointer-events-none" />

              {/* Tải thêm sản phẩm button if user wants to expand immediately */}
              {visibleCatalogLimit < filteredProducts.length && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setVisibleCatalogLimit((prev) => prev + 20)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs transition-colors cursor-pointer shadow-2xs active:scale-98"
                  >
                    <span>{language === 'EN' ? `Load More (${Math.min(20, filteredProducts.length - visibleCatalogLimit)} more products) ⤓` : `Tải thêm (${Math.min(20, filteredProducts.length - visibleCatalogLimit)} sản phẩm khác) ⤓`}</span>
                  </button>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {language === 'EN' ? `Showing ${Math.min(visibleCatalogLimit, filteredProducts.length)} / ${filteredProducts.length} products` : `Đang hiển thị ${Math.min(visibleCatalogLimit, filteredProducts.length)} / ${filteredProducts.length} sản phẩm`}
                  </p>
                </div>
              )}

              {isFullCatalogMode && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      setIsFullCatalogMode(false);
                      handleScrollToSection('san-pham');
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-heading font-bold text-xs transition-colors cursor-pointer border border-stone-300"
                  >
                    <span>{language === 'EN' ? '↩ Collapse to 10 featured items' : '↩ Thu gọn về 10 sản phẩm tiêu biểu'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 3. Recipe Corner (Góc Công Thức Pha Chế Chuyên Nghiệp) */}
        <RecipeCorner
          products={liveProducts}
          currency={currency}
          language={language}
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
          language={language}
          onScrollToCatalog={() => handleScrollToSection('san-pham')}
          rateInfo={rateInfo}
          onRefreshRate={refreshRate}
          isRefreshing={isRefreshing}
        />

        {/* 6. Partner Journey Blog ("Hành Trình Đối Tác" - 4 Lễ Ký Kết) */}
        <PartnerJourneyBlog
          language={language}
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
        language={language}
      />

      {/* 8. Fixed Utilities: 2 Hotlines & Zalo Chat & Floating Cart */}
      <FloatingHotlineZalo
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 8b. Mobile & Tablet Sticky Bar (V216): Thanh 'viên thuốc' Footer có hiệu ứng đổ bóng mờ nhẹ tách biệt rõ với Footer */}
      <div
        id="mobile-bottom-sticky-bar"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#062415]/95 backdrop-blur-md border-t border-white/[0.08] shadow-[0_-8px_25px_rgba(0,0,0,0.5),0_-2px_6px_rgba(0,0,0,0.2)] px-3 py-1.5 flex items-center justify-between gap-2.5 animate-in slide-in-from-bottom-2 duration-300"
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
              {totalCartCount > 0
                ? (language === 'EN' ? 'Cart Total:' : 'Tổng tiền giỏ hàng:')
                : (language === 'EN' ? 'Cart:' : 'Giỏ hàng:')}
            </div>
            <div className="text-[15px] font-black text-amber-300 font-heading tracking-tight mt-0.5 truncate">
              {totalCartCount > 0 ? (
                formatPrice(cartTotalPriceVND, currency, exchangeRate)
              ) : (
                <span className="text-stone-400 text-xs font-medium">
                  {language === 'EN' ? 'Empty' : 'Đang trống'}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          id="mobile-sticky-checkout-btn"
          onClick={() => setIsCartOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-stone-950 font-bold text-xs transition-all shadow-md active:scale-95 flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>
            {totalCartCount > 0
              ? (language === 'EN' ? `View Cart (${totalCartCount})` : `Xem Giỏ (${totalCartCount} SP)`)
              : (language === 'EN' ? 'Open Cart' : 'Mở Giỏ Hàng')}
          </span>
          <ChevronRight className="w-4 h-4 text-stone-900" />
        </button>
      </div>

      {/* 9. Smart Tiered Cart Drawer with Shopee Checkbox & Multi-Selection */}
      <ErrorBoundary name="SmartCartDrawer" fallback={null}>
        <SmartCartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          currency={currency}
          language={language}
          exchangeRate={exchangeRate}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onToggleSelectItem={handleToggleSelectItem}
          onToggleSelectAll={handleToggleSelectAll}
          onDeleteSelected={handleDeleteSelected}
          onCheckout={handleProceedCheckout}
        />
      </ErrorBoundary>

      {/* Cart Toast Notification (Shopee style instant feedback) */}
      <CartToast
        toast={cartToast}
        currency={currency}
        language={language}
        exchangeRate={exchangeRate}
        onOpenCart={() => setIsCartOpen(true)}
        onClose={() => setCartToast(null)}
      />

      {/* 10. Product Detail Modal */}
      <ErrorBoundary name="ProductDetailModal" fallback={null}>
        <ProductDetailModal
          product={selectedProductForDetail}
          initialMode={detailInitialMode}
          currency={currency}
          language={language}
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
      </ErrorBoundary>

      {/* Bảng Lọc Đối Tác Cung Ứng (Modal / Popup y hệt Hình 3 cho Desktop, Tablet & Mobile) */}
      <PartnerFilterModal
        isOpen={isPartnerDrawerOpen}
        onClose={() => setIsPartnerDrawerOpen(false)}
        partnerTabs={partnerTabs}
        selectedPartner={selectedPartner}
        onSelectPartner={handleSelectPartner}
        selectedSector={selectedSector}
        onSelectSector={handleSectorChange}
        language={language}
      />

      {/* 11. Smart QR Code Modal with Center G-ROOSTER Logo */}
      <QRCodeModal
        product={selectedProductForQR}
        isOpen={!!selectedProductForQR}
        onClose={() => setSelectedProductForQR(null)}
        language={language}
      />

      {/* 12. Order Checkout & VietQR Bank Transfer Modal */}
      {isOrderModalOpen && checkoutSummary && checkoutSummary.items && checkoutSummary.items.length > 0 && (
        <ErrorBoundary name="OrderModal" fallback={null}>
          <OrderModal
            isOpen={isOrderModalOpen}
            onClose={() => setIsOrderModalOpen(false)}
            summary={checkoutSummary}
            currency={currency}
            language={language}
            exchangeRate={exchangeRate}
            onOrderSuccess={handleOrderComplete}
          />
        </ErrorBoundary>
      )}

      {/* V174: Biểu tượng điều hướng nhanh nổi (Back to Top / Bottom Footer) cho trang chủ */}
      <QuickScrollButtons footerElementId="main-app-footer" />
    </div>
  );
}
