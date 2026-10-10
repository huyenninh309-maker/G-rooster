import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  Phone,
  MapPin,
  FileText,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Building2,
  Trash2,
  Lock,
  ShieldCheck,
  LogOut,
  Eye,
  EyeOff,
  LayoutDashboard,
  DollarSign,
  Image as ImageIcon,
  ShoppingCart,
  Percent,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Upload,
  Save,
  RotateCcw,
  Download,
  Copy,
  Printer,
  Check,
  Sparkles,
  Loader2,
  SlidersHorizontal,
  MessageCircle,
  Mail,
  Calendar,
  FileSpreadsheet,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Menu,
  Star,
  Pencil,
} from 'lucide-react';
import { Currency, ProductPriceTiers, WholesaleTierPrices } from '../types';
import { formatPrice } from '../utils/pricing';
import {
  getLiveProducts,
  getAdminProductFinancials,
  saveSingleProductAdminData,
  bulkUpdateCategoryPrices,
  resetProductToDefault,
  resetAllProductsToDefault,
  AdminProductFinancialItem,
  subscribeToProductUpdates,
  estimateDefaultCost,
  saveAllOverridesToCodebase,
  downloadOverridesBackup,
  importOverridesFromJson,
  syncWithLiveWebsite,
  getProductOverrides,
  generateAIStudioSyncPayload,
  downloadPriceCsv,
  importPricesFromCsv,
  validatePriceCsvData,
  applyValidatedPrices,
  PriceValidationRow,
  saveAllDataToFirebase,
  getProductCosts,
  deleteProductPermanently,
  updateProductName,
} from '../utils/productStore';
import {
  subscribeToFirestoreOrders,
  updateOrderStatusInFirestore,
  deleteOrderFromFirestore,
} from '../services/firebase';
import { PriceValidationModal } from './PriceValidationModal';
import { QuotationPdfModal } from './QuotationPdfModal';
import { QuickScrollButtons } from './shared/QuickScrollButtons';
import { Language } from '../utils/i18n';
import {
  G_ROOSTER_FALLBACK_IMAGE,
  validateImageUrl,
  runAutoCheckAllImages,
  subscribeToImageHealth,
  markProductImageBroken,
  markProductImageHealthy,
  getBrokenImageIds,
  isProductImageMissing,
  hasRealProductImage,
} from '../utils/productImages';
import { cleanProductTitle } from '../data/products';
import { BrandedImagePlaceholder } from './BrandedImagePlaceholder';

export interface SavedOrder {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  customerProvince?: string;
  shippingFeeVND?: number;
  shippingFeeText?: string;
  shippingNote?: string;
  isCustomCarrierQuote?: boolean;
  orderTier?: string;
  orderTierLabel?: string;
  addressDetails?: {
    province?: string;
    district?: string;
    ward?: string;
    streetAddress?: string;
  };
  notes?: string;
  isVATRequested: boolean;
  companyName?: string;
  taxId?: string;
  items: {
    product: {
      id: string;
      name: string;
      image: string;
      partnerName: string;
      unit: string;
      retailUnit?: string;
      wholesaleUnit?: string;
    };
    quantity: number;
    purchaseMode: 'retail' | 'wholesale';
    unitPriceVND: number;
    subtotalVND: number;
    activeTierLabel?: string;
  }[];
  finalTotalVND: number;
  paymentMethod: 'vietqr' | 'cod' | 'b2b_credit';
  status: 'pending_payment' | 'confirmed' | 'packing' | 'shipping' | 'completed' | 'cancelled';
}

interface AdminOrderDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  exchangeRate?: number;
  language?: Language;
  onToggleLanguage?: (lang: Language) => void;
}

type AdminScreen = 'dashboard' | 'financials' | 'images' | 'orders';

export type DateFilterRange = 'all' | 'today' | 'week' | 'month' | 'custom';

/**
 * V171: Kiểm tra đơn hàng có nằm trong khoảng thời gian đã chọn hay không
 */
export const isOrderInDateRange = (
  orderDateStr: string,
  filter: DateFilterRange,
  start?: string,
  end?: string
): boolean => {
  if (filter === 'all') return true;
  const orderTime = new Date(orderDateStr).getTime();
  if (isNaN(orderTime)) return true;

  const now = new Date();
  if (filter === 'today') {
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const todayEnd = todayStart + 24 * 60 * 60 * 1000 - 1;
    return orderTime >= todayStart && orderTime <= todayEnd;
  }
  if (filter === 'week') {
    const oneWeekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
    return orderTime >= oneWeekAgo;
  }
  if (filter === 'month') {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    return orderTime >= startOfMonth;
  }
  if (filter === 'custom') {
    let match = true;
    if (start) {
      const startTime = new Date(start + 'T00:00:00').getTime();
      if (!isNaN(startTime)) match = match && orderTime >= startTime;
    }
    if (end) {
      const endTime = new Date(end + 'T23:59:59').getTime();
      if (!isNaN(endTime)) match = match && orderTime <= endTime;
    }
    return match;
  }
  return true;
};

const parseAddressDetails = (addressStr: string) => {
  const raw = (addressStr || '').trim();
  const parts = raw.split(',').map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 4) {
    return {
      street: parts.slice(0, parts.length - 3).join(', '),
      ward: parts[parts.length - 3],
      district: parts[parts.length - 2],
      province: parts[parts.length - 1],
    };
  } else if (parts.length === 3) {
    return {
      street: parts[0],
      ward: parts[1],
      district: '',
      province: parts[2],
    };
  } else if (parts.length === 2) {
    return {
      street: parts[0],
      ward: '',
      district: '',
      province: parts[1],
    };
  }
  return {
    street: raw,
    ward: '',
    district: '',
    province: '',
  };
};

const STATUS_LABELS: Record<SavedOrder['status'], { label: string; color: string; bg: string }> = {
  pending_payment: { label: 'Chờ thanh toán', color: 'text-amber-800', bg: 'bg-amber-100 border-amber-200' },
  confirmed: { label: 'Đã xác nhận', color: 'text-blue-800', bg: 'bg-blue-100 border-blue-200' },
  packing: { label: 'Đang đóng gói', color: 'text-indigo-800', bg: 'bg-indigo-100 border-indigo-200' },
  shipping: { label: 'Đang giao hàng', color: 'text-purple-800', bg: 'bg-purple-100 border-purple-200' },
  completed: { label: 'Hoàn tất', color: 'text-emerald-800', bg: 'bg-emerald-100 border-emerald-200' },
  cancelled: { label: 'Đã hủy', color: 'text-red-800', bg: 'bg-red-100 border-red-200' },
};

const PARTNER_OPTIONS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'matcha-tra-laka', label: 'Matcha & Trà' },
  { id: 'nuoc-mia-iqf', label: 'Nước Mía Tuyết' },
  { id: 'thao-duoc-sam', label: 'Thảo Dược Sâm' },
  { id: 'ca-phe-vien-say', label: 'Cà Phê' },
  { id: 'dac-san-snack', label: 'Chà bông' },
  { id: 'socola-qua-tang', label: 'Socola & Quà Tặng' },
  { id: 'hat-qua-kho', label: 'Hạt & Quả Khô Dinh Dưỡng' },
  { id: 'snack-dinh-duong', label: 'Snack & TP Dinh Dưỡng' },
];

/**
 * V169: Định dạng phân cách hàng ngàn bằng dấu phẩy (,)
 * Ví dụ: 2325000 -> "2,325,000"
 */
export const formatCommaNumber = (val: number | undefined | null): string => {
  if (val === undefined || val === null || isNaN(val)) return '0';
  const rounded = Math.round(val);
  return rounded.toLocaleString('en-US');
};

const formatAdminPrice = (
  amountVND: number,
  currency: Currency,
  exchangeRate?: number
): string => {
  if (currency === 'USD') {
    return formatPrice(amountVND, currency, exchangeRate);
  }
  return `${formatCommaNumber(amountVND)} ₫`;
};

interface CurrencyInputProps {
  value: number;
  onChange: (val: number) => void;
  className?: string;
  placeholder?: string;
  title?: string;
}

/**
 * V169: Ô nhập tiền tệ tự động chèn dấu phẩy phân cách hàng ngàn ngay khi gõ (Format while typing)
 */
const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  className = '',
  placeholder = '0',
  title,
}) => {
  const formatVal = (num: number | undefined | null) => {
    if (num === undefined || num === null || isNaN(num) || num === 0) return '';
    return Math.round(num).toLocaleString('en-US');
  };

  const [displayValue, setDisplayValue] = useState<string>(() => formatVal(value));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatVal(value));
    }
  }, [value, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, '');
    if (!digits) {
      setDisplayValue('');
      onChange(0);
      return;
    }
    const num = parseInt(digits, 10);
    setDisplayValue(num.toLocaleString('en-US'));
    onChange(num);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    e.target.select();
  };

  const handleBlur = () => {
    setIsFocused(false);
    setDisplayValue(formatVal(value));
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      title={title}
      className={className}
    />
  );
};

interface StockInputProps {
  value: number;
  onChange: (val: number) => void;
  className?: string;
  placeholder?: string;
  title?: string;
}

/**
 * V217: Ô nhập số lượng tồn kho tự động định dạng dấu phẩy hàng nghìn (Format while typing / on blur)
 * - 5000 -> 5,000; 10000 -> 10,000
 * - Giá trị trả về onChange luôn là Number thuần túy để đồng bộ Firebase/Database chính xác 100%
 */
const StockInput: React.FC<StockInputProps> = ({
  value,
  onChange,
  className = '',
  placeholder = '0',
  title,
}) => {
  const formatVal = (num: number | undefined | null) => {
    if (num === undefined || num === null || isNaN(num)) return '0';
    return Math.max(0, Math.round(num)).toLocaleString('en-US');
  };

  const [displayValue, setDisplayValue] = useState<string>(() => formatVal(value));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatVal(value));
    }
  }, [value, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, '');
    if (!digits) {
      setDisplayValue('');
      onChange(0);
      return;
    }
    const num = parseInt(digits, 10);
    setDisplayValue(num.toLocaleString('en-US'));
    onChange(num);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    e.target.select();
  };

  const handleBlur = () => {
    setIsFocused(false);
    setDisplayValue(formatVal(value));
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      title={title}
      className={className}
    />
  );
};

export const AdminOrderDashboard: React.FC<AdminOrderDashboardProps> = ({
  isOpen,
  onClose,
  currency,
  exchangeRate,
  language = 'VN',
  onToggleLanguage,
}) => {
  // Navigation screen
  const [activeScreen, setActiveScreen] = useState<AdminScreen>('dashboard');

  // V250: State ngôn ngữ cho Admin và Báo giá PDF
  const [adminLanguage, setAdminLanguage] = useState<Language>(language);

  useEffect(() => {
    if (language) {
      setAdminLanguage(language);
    }
  }, [language]);

  const handleAdminLanguageSwitch = (newLang: Language) => {
    setAdminLanguage(newLang);
    onToggleLanguage?.(newLang);
  };

  // Authentication gate: Password Chutchiu2026
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('chutchiu_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Orders State
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // V171: Smart Date Filter state
  const [dateFilter, setDateFilter] = useState<DateFilterRange>('all');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');

  // Products & Financials State
  const [financialsList, setFinancialsList] = useState<AdminProductFinancialItem[]>(() =>
    getAdminProductFinancials()
  );
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [selectedPartnerFilter, setSelectedPartnerFilter] = useState('all');
  const [financialFilterMode, setFinancialFilterMode] = useState<
    'all' | 'loss_only' | 'no_cost' | 'low_stock' | 'out_of_stock'
  >('all');
  // V254: Trạng thái lọc tình trạng ảnh: Tất cả / Đã có ảnh / Chưa có ảnh
  const [productImageFilter, setProductImageFilter] = useState<'all' | 'has_image' | 'no_image'>('all');
  const [unsavedEdits, setUnsavedEdits] = useState<
    Record<
      string,
      {
        cost?: number;
        stock?: number;
        retail?: number;
        wholesale1?: number;
        wholesale2?: number;
        wholesale3?: number;
      }
    >
  >({});
  const [refreshingRowId, setRefreshingRowId] = useState<string | null>(null);
  const [brokenImageIds, setBrokenImageIds] = useState<Set<string>>(() => getBrokenImageIds());
  const [imageStatusFilter, setImageStatusFilter] = useState<'all' | 'has_image' | 'no_image' | 'broken' | 'custom'>('all');
  const [isAutoCheckingImages, setIsAutoCheckingImages] = useState(false);
  const [autoCheckProgress, setAutoCheckProgress] = useState<{ current: number; total: number; brokenCount: number } | null>(null);
  const hasAutoScannedRef = useRef(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  // V183/V191a: Trạng thái thu gọn/mở rộng Sidebar - Mặc định là ẨN (Collapsed) trên Mobile & Tablet (<1024px) để nhường chỗ cho bảng
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return true;
  });

  // V255: State xóa vĩnh viễn sản phẩm & Sửa tên inline
  const [productToDelete, setProductToDelete] = useState<AdminProductFinancialItem | null>(null);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [editingNameText, setEditingNameText] = useState<string>('');

  const handleStartEditName = (item: AdminProductFinancialItem) => {
    setEditingNameId(item.id);
    setEditingNameText(cleanProductTitle(item.name));
  };

  const handleSaveInlineName = (productId: string) => {
    if (!editingNameText.trim()) {
      setEditingNameId(null);
      return;
    }
    const cleanName = editingNameText.trim();
    updateProductName(productId, cleanName);
    setFinancialsList((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, name: cleanName } : item))
    );
    setEditingNameId(null);
    setSaveSuccessMsg(`🎉 Đã cập nhật tên sản phẩm thành: "${cleanName}"!`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleConfirmDeleteProduct = () => {
    if (!productToDelete) return;
    setIsDeletingProduct(true);
    const deletedName = cleanProductTitle(productToDelete.name);
    const targetId = productToDelete.id;

    try {
      deleteProductPermanently(targetId);
      setFinancialsList((prev) => prev.filter((item) => item.id !== targetId));
      setProductToDelete(null);
      setSaveSuccessMsg(`🗑️ Đã xóa vĩnh viễn sản phẩm: "${deletedName}" khỏi Database!`);
      setTimeout(() => setSaveSuccessMsg(null), 5000);
    } catch (err) {
      console.error('Lỗi xóa sản phẩm:', err);
    } finally {
      setIsDeletingProduct(false);
    }
  };

  // V177: Đồng bộ trạng thái kiểm soát link ảnh thông minh
  useEffect(() => {
    const unsubscribe = subscribeToImageHealth((ids) => {
      setBrokenImageIds(new Set(ids));
    });
    return () => unsubscribe();
  }, []);

  // V177: Thực hiện tự động quét kiểm tra tính khả dụng link ảnh (Auto-Check)
  const handleRunAutoCheckImages = async () => {
    if (isAutoCheckingImages || financialsList.length === 0) return;
    setIsAutoCheckingImages(true);
    try {
      const liveList = getLiveProducts();
      const broken = await runAutoCheckAllImages(liveList, (current, total, brokenCount) => {
        setAutoCheckProgress({ current, total, brokenCount });
      });
      setBrokenImageIds(new Set(broken));
      setSaveSuccessMsg(`Auto-Check hoàn tất! Phát hiện ${broken.size} sản phẩm có link ảnh bị hỏng.`);
      setTimeout(() => setSaveSuccessMsg(null), 3500);
    } catch (err) {
      console.error('Lỗi khi chạy Auto-Check link ảnh:', err);
    } finally {
      setIsAutoCheckingImages(false);
      setTimeout(() => setAutoCheckProgress(null), 4000);
    }
  };

  // Tự động quét kiểm tra link ảnh khi Admin đăng nhập lần đầu
  useEffect(() => {
    if (isAuthenticated && !hasAutoScannedRef.current && financialsList.length > 0) {
      hasAutoScannedRef.current = true;
      handleRunAutoCheckImages();
    }
  }, [isAuthenticated, financialsList.length]);

  // Bulk Price Adjust state
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkPartnerId, setBulkPartnerId] = useState('all');
  const [bulkPercent, setBulkPercent] = useState<number>(5);
  const [bulkTargetTier, setBulkTargetTier] = useState<
    'all' | 'retail' | 'wholesale1' | 'wholesale2' | 'wholesale3'
  >('all');

  // Image Manager state (V164 & V165 Smart Gallery & Git Data Protection)
  const [imageSearchQuery, setImageSearchQuery] = useState('');
  const [imagePartnerFilter, setImagePartnerFilter] = useState('all');
  const [selectedProductForUpload, setSelectedProductForUpload] = useState<AdminProductFinancialItem | null>(null);
  const [tempImagesList, setTempImagesList] = useState<string[]>([]);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [customImageUrlInput, setCustomImageUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // V263: Handler đóng Modal Quản lý bộ sưu tập ảnh - Tuyệt đối chỉ đóng modal, không redirect hay thoát trang Quản trị
  const handleCloseGalleryModal = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedProductForUpload(null);
    setTempImagesList([]);
    setCustomImageUrlInput('');
  }, []);

  // V263: Hỗ trợ phím ESC để đóng Modal Bộ sưu tập ảnh an toàn
  useEffect(() => {
    if (!selectedProductForUpload) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseGalleryModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProductForUpload, handleCloseGalleryModal]);

  // V172: Admin Zoom & Lightbox Image Preview state
  const [lightboxData, setLightboxData] = useState<{
    src: string;
    productName: string;
    partnerName?: string;
    currentIndex: number;
    imagesList: string[];
  } | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);

  // V172: Keyboard navigation for Lightbox Preview (ESC to close, ArrowLeft / ArrowRight to navigate, +/- to zoom)
  useEffect(() => {
    if (!lightboxData) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxData(null);
        setLightboxZoom(1);
      } else if (e.key === 'ArrowLeft') {
        setLightboxData((prev) => {
          if (!prev || prev.imagesList.length <= 1) return prev;
          const nextIdx = (prev.currentIndex - 1 + prev.imagesList.length) % prev.imagesList.length;
          return {
            ...prev,
            currentIndex: nextIdx,
            src: prev.imagesList[nextIdx],
          };
        });
        setLightboxZoom(1);
      } else if (e.key === 'ArrowRight') {
        setLightboxData((prev) => {
          if (!prev || prev.imagesList.length <= 1) return prev;
          const nextIdx = (prev.currentIndex + 1) % prev.imagesList.length;
          return {
            ...prev,
            currentIndex: nextIdx,
            src: prev.imagesList[nextIdx],
          };
        });
        setLightboxZoom(1);
      } else if (e.key === '+' || e.key === '=') {
        setLightboxZoom((z) => Math.min(z + 0.25, 3.5));
      } else if (e.key === '-') {
        setLightboxZoom((z) => Math.max(z - 0.25, 0.75));
      } else if (e.key === '0') {
        setLightboxZoom(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxData]);

  // V165 & V166 Data Protection & AI Studio Sync state
  const [isSyncingGit, setIsSyncingGit] = useState(false);
  const [isSyncingLive, setIsSyncingLive] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [backupJsonInput, setBackupJsonInput] = useState('');

  // V166: Lấy mã đồng bộ xuất dữ liệu cho AI Studio
  const [isExportSyncModalOpen, setIsExportSyncModalOpen] = useState(false);
  const [syncExportData, setSyncExportData] = useState<{
    jsonString: string;
    stats: {
      totalCustomProducts: number;
      imagesModified: number;
      pricesModified: number;
      costsModified: number;
    };
    summary: any[];
  } | null>(null);
  const [copiedSyncCode, setCopiedSyncCode] = useState(false);

  // V174/V189/V191a: Quản lý file giá Excel/CSV & Sticky Group chính xác, loại bỏ loop gây treo trình duyệt
  const financialsFilterRef = useRef<HTMLDivElement | null>(null);
  const [financialsStickyTop, setFinancialsStickyTop] = useState(54);
  const filterRoRef = useRef<ResizeObserver | null>(null);

  // V189/V191a: Callback ref bắt chiều cao an toàn, có ngắt kết nối và chặn vòng lặp re-render
  const setFinancialsFilterNode = useCallback((node: HTMLDivElement | null) => {
    if (filterRoRef.current) {
      filterRoRef.current.disconnect();
      filterRoRef.current = null;
    }
    financialsFilterRef.current = node;
    if (node) {
      const initialHeight = node.offsetHeight;
      if (initialHeight > 0) {
        setFinancialsStickyTop(initialHeight);
      }
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => {
          const h = node.offsetHeight;
          if (h > 0) {
            setFinancialsStickyTop((prev) => (Math.abs(prev - h) > 1 ? h : prev));
          }
        });
        ro.observe(node);
        filterRoRef.current = ro;
      }
    }
  }, []);

  const priceFileInputRef = useRef<HTMLInputElement>(null);
  const [isImportingPrices, setIsImportingPrices] = useState(false);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [validationRows, setValidationRows] = useState<PriceValidationRow[]>([]);
  const [isApplyingValidatedPrices, setIsApplyingValidatedPrices] = useState(false);
  const [isSavingAllChanges, setIsSavingAllChanges] = useState(false);
  // V218: Trạng thái mở modal xuất Báo Giá PDF chuyên nghiệp
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);

  // V175: Khi Admin bấm 'Nhập file giá', mở màn hình 'Kiểm tra dữ liệu' trước khi lưu chính thức vào Firebase
  const handleImportPriceFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImportingPrices(true);
    try {
      const text = await file.text();
      const valResult = validatePriceCsvData(text);
      if (!valResult.success || valResult.rows.length === 0) {
        alert(`Lỗi đọc file: ${valResult.message}`);
        return;
      }
      setValidationRows(valResult.rows);
      setIsValidationModalOpen(true);
    } catch (err: any) {
      alert(`Không thể đọc file: ${err?.message || 'Lỗi không xác định'}`);
    } finally {
      setIsImportingPrices(false);
      if (priceFileInputRef.current) {
        priceFileInputRef.current.value = '';
      }
    }
  };

  // V175: Xác nhận lưu bảng giá đã kiểm tra vào Google Firebase Cloud
  const handleConfirmSaveValidatedPrices = async () => {
    setIsApplyingValidatedPrices(true);
    try {
      const res = await applyValidatedPrices(validationRows);
      setFinancialsList(getAdminProductFinancials());
      setIsValidationModalOpen(false);
      setSaveSuccessMsg(`🎉 ${res.message}`);
      setTimeout(() => setSaveSuccessMsg(null), 5000);
    } catch (err: any) {
      alert(`Lỗi khi lưu bảng giá vào Firebase: ${err?.message || 'Lỗi không xác định'}`);
    } finally {
      setIsApplyingValidatedPrices(false);
    }
  };

  // V175/V191: Nút duy nhất [💾 Lưu thay đổi] lưu toàn bộ thay đổi trực tiếp vào Firebase với hiệu ứng xoay loading và vô hiệu hóa tạm thời 1.5s
  const handleSaveAllChangesToFirebase = async () => {
    if (isSavingAllChanges) return;
    setIsSavingAllChanges(true);
    try {
      const productIds = Object.keys(unsavedEdits);
      if (productIds.length > 0) {
        productIds.forEach((id) => {
          const edit = unsavedEdits[id];
          const prod = financialsList.find((p) => p.id === id);
          if (!prod || !edit) return;

          const newPrices: Partial<ProductPriceTiers> = {};
          if (edit.retail !== undefined) newPrices.retail = edit.retail;
          if (edit.wholesale1 !== undefined) newPrices.wholesale1 = edit.wholesale1;
          if (edit.wholesale2 !== undefined) newPrices.wholesale2 = edit.wholesale2;
          if (edit.wholesale3 !== undefined) newPrices.wholesale3 = edit.wholesale3;

          const newWholesalePrices: Partial<WholesaleTierPrices> = {};
          const multiplier =
            prod.id === 'vtn-tra-xa-den' || (prod.name && prod.name.includes('Xạ Đen'))
              ? 30
              : prod.id.startsWith('vtn-cascara-') || (prod.name && prod.name.includes('Cascara'))
              ? 24
              : prod.unitsPerWholesale || 1;
          if (edit.wholesale1 !== undefined) newWholesalePrices.wholesale1 = edit.wholesale1 * multiplier;
          if (edit.wholesale2 !== undefined) newWholesalePrices.wholesale2 = edit.wholesale2 * multiplier;
          if (edit.wholesale3 !== undefined) newWholesalePrices.wholesale3 = edit.wholesale3 * multiplier;

          saveSingleProductAdminData(id, {
            cost: edit.cost,
            stock: edit.stock,
            prices: Object.keys(newPrices).length > 0 ? newPrices : undefined,
            wholesalePrices: Object.keys(newWholesalePrices).length > 0 ? newWholesalePrices : undefined,
          });
        });

        setUnsavedEdits({});
      }

      const res = await saveAllDataToFirebase();
      setFinancialsList(getAdminProductFinancials());
      setSaveSuccessMsg(`💾 ${res.message}`);
      setTimeout(() => setSaveSuccessMsg(null), 4500);
    } catch (err: any) {
      alert('Lỗi lưu Firebase Firestore: ' + (err?.message || 'Lỗi không xác định'));
    } finally {
      // V191: Tạm thời vô hiệu hóa và duy trì loading icon xoay trong 1.5 giây để tránh Admin bấm liên tục
      setTimeout(() => {
        setIsSavingAllChanges(false);
      }, 1500);
    }
  };

  const handleOpenExportSyncModal = () => {
    const payload = generateAIStudioSyncPayload();
    setSyncExportData(payload);
    setIsExportSyncModalOpen(true);
    setCopiedSyncCode(false);
  };

  const handleCopySyncCode = () => {
    if (!syncExportData?.jsonString) return;
    navigator.clipboard.writeText(syncExportData.jsonString).then(() => {
      setCopiedSyncCode(true);
      setTimeout(() => setCopiedSyncCode(false), 3000);
    }).catch(() => {
      alert('Vui lòng click vào ô mã bên dưới và bấm Ctrl+C để sao chép.');
    });
  };

  const handleSyncToGitCodebase = async () => {
    setIsSyncingGit(true);
    try {
      const res = await saveAllOverridesToCodebase();
      setSaveSuccessMsg(`✅ ${res.message} Dữ liệu đã sẵn sàng cho Git Push!`);
      setTimeout(() => setSaveSuccessMsg(null), 4500);
    } catch (err: any) {
      alert('Lỗi đồng bộ mã nguồn: ' + err?.message);
    } finally {
      setIsSyncingGit(false);
    }
  };

  const handleSyncWithLiveSite = async () => {
    setIsSyncingLive(true);
    try {
      const res = await syncWithLiveWebsite();
      setFinancialsList(getAdminProductFinancials());
      setSaveSuccessMsg(`🔄 ${res.message}`);
      setTimeout(() => setSaveSuccessMsg(null), 4500);
    } catch (err: any) {
      alert('Lỗi đồng bộ với web thật: ' + err?.message);
    } finally {
      setIsSyncingLive(false);
    }
  };

  const handleImportBackup = async () => {
    if (!backupJsonInput.trim()) {
      alert('Vui lòng dán nội dung JSON sao lưu.');
      return;
    }
    const res = await importOverridesFromJson(backupJsonInput);
    if (res.success) {
      setFinancialsList(getAdminProductFinancials());
      setIsBackupModalOpen(false);
      setBackupJsonInput('');
      setSaveSuccessMsg(`🎉 ${res.message}`);
      setTimeout(() => setSaveSuccessMsg(null), 4500);
    } else {
      alert('Lỗi: ' + res.message);
    }
  };

  // Reload financials whenever productStore broadcasts changes
  useEffect(() => {
    const refreshFinancials = () => {
      setFinancialsList(getAdminProductFinancials());
    };
    const unsubscribe = subscribeToProductUpdates(refreshFinancials);
    return unsubscribe;
  }, []);

  // V175: Đồng bộ đơn hàng thật từ Firestore & localStorage (Dọn dẹp 100% đơn hàng mẫu)
  const loadOrders = () => {
    try {
      const stored = localStorage.getItem('chutchiu_orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Xóa bỏ hoàn toàn các đơn hàng nháp/mẫu có tiền tố GR-839
          const realOrders = parsed.filter((o: any) => !o.id?.startsWith('GR-839'));
          setOrders(realOrders);
          localStorage.setItem('chutchiu_orders', JSON.stringify(realOrders));
          return;
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc orders từ localStorage:', e);
    }
    // Mặc định hoàn toàn trống để bắt đầu nhận đơn thật
    setOrders([]);
    try {
      localStorage.setItem('chutchiu_orders', JSON.stringify([]));
    } catch (e) {}
  };

  useEffect(() => {
    if (isOpen) {
      loadOrders();
      setFinancialsList(getAdminProductFinancials());
    }

    // V175: Lắng nghe đơn hàng real-time từ Google Firebase Firestore
    const unsubscribeFirestoreOrders = subscribeToFirestoreOrders((firestoreOrders) => {
      const cleanOrders = (firestoreOrders || []).filter((o) => !o.id?.startsWith('GR-839'));
      setOrders(cleanOrders);
      try {
        localStorage.setItem('chutchiu_orders', JSON.stringify(cleanOrders));
      } catch (e) {}
    });

    return () => {
      unsubscribeFirestoreOrders();
    };
  }, [isOpen]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput.trim() === 'Chutchiu2026') {
      try {
        sessionStorage.setItem('chutchiu_admin_authenticated', 'true');
      } catch (err) {
        console.warn(err);
      }
      setIsAuthenticated(true);
      setPasswordError(null);
    } else {
      setPasswordError('Mật khẩu quản trị không chính xác. Mật khẩu chuẩn là Chutchiu2026!');
    }
  };

  const handleAdminLogout = () => {
    try {
      sessionStorage.removeItem('chutchiu_admin_authenticated');
    } catch (err) {
      console.warn(err);
    }
    setIsAuthenticated(false);
    setAdminPasswordInput('');
    setPasswordError(null);
    onClose();
  };

  // Order management actions with Firebase Firestore sync
  const handleUpdateStatus = (orderId: string, newStatus: SavedOrder['status']) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord));
      try {
        localStorage.setItem('chutchiu_orders', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    // V175: Cập nhật trạng thái tức thì lên Firebase Firestore
    updateOrderStatusInFirestore(orderId, newStatus).catch((err) => {
      console.warn('Lỗi cập nhật trạng thái Firestore:', err);
    });
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng ${orderId}?`)) {
      setOrders((prev) => {
        const updated = prev.filter((ord) => ord.id !== orderId);
        try {
          localStorage.setItem('chutchiu_orders', JSON.stringify(updated));
        } catch (e) {
          console.warn(e);
        }
        return updated;
      });

      // V175: Xóa vĩnh viễn trên Firebase Firestore
      deleteOrderFromFirestore(orderId).catch((err) => {
        console.warn('Lỗi xóa đơn hàng Firestore:', err);
      });
    }
  };

  // -------------------------------------------------------------
  // FINANCIALS EDITING HANDLERS
  // -------------------------------------------------------------
  const handleEditCell = (
    productId: string,
    field: 'cost' | 'stock' | 'retail' | 'wholesale1' | 'wholesale2' | 'wholesale3',
    value: number
  ) => {
    setUnsavedEdits((prev) => ({
      ...prev,
      [productId]: {
        ...(prev[productId] || {}),
        [field]: value,
      },
    }));
  };

  const handleSaveSingleRow = (product: AdminProductFinancialItem) => {
    const edit = unsavedEdits[product.id];
    if (!edit) return;

    const newPrices: Partial<ProductPriceTiers> = {};
    if (edit.retail !== undefined) newPrices.retail = edit.retail;
    if (edit.wholesale1 !== undefined) newPrices.wholesale1 = edit.wholesale1;
    if (edit.wholesale2 !== undefined) newPrices.wholesale2 = edit.wholesale2;
    if (edit.wholesale3 !== undefined) newPrices.wholesale3 = edit.wholesale3;

    // Converted wholesale prices
    const newWholesalePrices: Partial<WholesaleTierPrices> = {};
    const multiplier =
      product.id === 'vtn-tra-xa-den' || (product.name && product.name.includes('Xạ Đen'))
        ? 30
        : product.id.startsWith('vtn-cascara-') || (product.name && product.name.includes('Cascara'))
        ? 24
        : product.unitsPerWholesale || 1;
    if (edit.wholesale1 !== undefined) newWholesalePrices.wholesale1 = edit.wholesale1 * multiplier;
    if (edit.wholesale2 !== undefined) newWholesalePrices.wholesale2 = edit.wholesale2 * multiplier;
    if (edit.wholesale3 !== undefined) newWholesalePrices.wholesale3 = edit.wholesale3 * multiplier;

    saveSingleProductAdminData(product.id, {
      cost: edit.cost,
      stock: edit.stock,
      prices: Object.keys(newPrices).length > 0 ? newPrices : undefined,
      wholesalePrices: Object.keys(newWholesalePrices).length > 0 ? newWholesalePrices : undefined,
    });

    setUnsavedEdits((prev) => {
      const copy = { ...prev };
      delete copy[product.id];
      return copy;
    });

    setSaveSuccessMsg(`Đã cập nhật giá & tồn kho cho "${product.name}"!`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleSaveAllEdits = () => {
    const productIds = Object.keys(unsavedEdits);
    if (productIds.length === 0) {
      alert('Không có thay đổi nào chưa lưu.');
      return;
    }

    productIds.forEach((id) => {
      const edit = unsavedEdits[id];
      const prod = financialsList.find((p) => p.id === id);
      if (!prod || !edit) return;

      const newPrices: Partial<ProductPriceTiers> = {};
      if (edit.retail !== undefined) newPrices.retail = edit.retail;
      if (edit.wholesale1 !== undefined) newPrices.wholesale1 = edit.wholesale1;
      if (edit.wholesale2 !== undefined) newPrices.wholesale2 = edit.wholesale2;
      if (edit.wholesale3 !== undefined) newPrices.wholesale3 = edit.wholesale3;

      const newWholesalePrices: Partial<WholesaleTierPrices> = {};
      const multiplier =
        prod.id === 'vtn-tra-xa-den' || (prod.name && prod.name.includes('Xạ Đen'))
          ? 30
          : prod.id.startsWith('vtn-cascara-') || (prod.name && prod.name.includes('Cascara'))
          ? 24
          : prod.unitsPerWholesale || 1;
      if (edit.wholesale1 !== undefined) newWholesalePrices.wholesale1 = edit.wholesale1 * multiplier;
      if (edit.wholesale2 !== undefined) newWholesalePrices.wholesale2 = edit.wholesale2 * multiplier;
      if (edit.wholesale3 !== undefined) newWholesalePrices.wholesale3 = edit.wholesale3 * multiplier;

      saveSingleProductAdminData(id, {
        cost: edit.cost,
        stock: edit.stock,
        prices: Object.keys(newPrices).length > 0 ? newPrices : undefined,
        wholesalePrices: Object.keys(newWholesalePrices).length > 0 ? newWholesalePrices : undefined,
      });
    });

    setUnsavedEdits({});
    setSaveSuccessMsg(`Đã lưu thành công thay đổi cho ${productIds.length} sản phẩm! Trang chủ đã đồng bộ ngay lập tức.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleResetRow = (productId: string) => {
    setRefreshingRowId(productId);
    const hasUnsaved = Boolean(unsavedEdits[productId]);
    if (hasUnsaved) {
      setUnsavedEdits((prev) => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
      setSaveSuccessMsg(`Đã hủy các thay đổi chưa lưu và khôi phục hàng #${productId}!`);
      setTimeout(() => {
        setSaveSuccessMsg(null);
        setRefreshingRowId(null);
      }, 1200);
      return;
    }

    try {
      resetProductToDefault(productId);
      setFinancialsList(getAdminProductFinancials());
      setSaveSuccessMsg(`Đã làm mới dữ liệu hàng #${productId} thành công!`);
    } catch (err) {
      console.error('Lỗi làm mới hàng sản phẩm:', err);
    } finally {
      setTimeout(() => {
        setSaveSuccessMsg(null);
        setRefreshingRowId(null);
      }, 1200);
    }
  };

  const handleResetAll = () => {
    if (
      window.confirm(
        'Bạn có chắc chắn muốn khôi phục TOÀN BỘ 248 sản phẩm về giá gốc được định nghĩa trong mã nguồn (Chat)? Toàn bộ ghi đè thủ công sẽ được đặt lại.'
      )
    ) {
      resetAllProductsToDefault();
      setUnsavedEdits({});
      setSaveSuccessMsg('Đã đồng bộ lại toàn bộ sản phẩm theo mã nguồn gốc (Chat)!');
      setTimeout(() => setSaveSuccessMsg(null), 3500);
    }
  };

  // Bulk adjust apply
  const handleApplyBulk = () => {
    if (bulkPercent === 0) {
      alert('Vui lòng nhập phần trăm thay đổi khác 0.');
      return;
    }
    const res = bulkUpdateCategoryPrices(bulkPartnerId, bulkPercent, bulkTargetTier);
    setIsBulkModalOpen(false);
    setSaveSuccessMsg(
      `Đã ${bulkPercent > 0 ? 'tăng' : 'giảm'} ${Math.abs(bulkPercent)}% giá cho ${res.updatedCount} sản phẩm! Trang chủ đã cập nhật tức thì.`
    );
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // -------------------------------------------------------------
  // IMAGE MULTI-UPLOAD & GALLERY HANDLERS (V163 REPLACE LOGIC)
  // -------------------------------------------------------------
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (!result) {
          resolve('');
          return;
        }

        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const maxDim = 1000;
            let width = img.width;
            let height = img.height;

            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
              resolve(compressedDataUrl);
            } else {
              resolve(result);
            }
          } catch {
            resolve(result);
          }
        };
        img.onerror = () => resolve(result);
        img.src = result;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  const handleMultipleImageFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (fileArray.length === 0) {
      alert('Vui lòng chọn các file hình ảnh hợp lệ (JPG, PNG, WebP).');
      return;
    }

    setIsProcessingFiles(true);
    try {
      const processedPromises = fileArray.map((file) => compressImage(file));
      const results = await Promise.all(processedPromises);
      const validResults = results.filter((r) => Boolean(r && r.length > 0));

      if (validResults.length === 0) {
        alert('Không thể đọc file hình ảnh vừa chọn. Vui lòng thử lại.');
      } else {
        // Thêm vào danh sách ảnh tạm đã chọn
        setTempImagesList((prev) => [...prev, ...validResults]);
      }
    } catch (err) {
      console.error('Lỗi nén ảnh:', err);
      alert('Có lỗi khi xử lý hình ảnh. Vui lòng thử lại.');
    } finally {
      setIsProcessingFiles(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddCustomImageUrl = () => {
    const raw = customImageUrlInput.trim();
    if (!raw) return;

    // Cho phép dán 1 link hoặc nhiều link cách nhau bằng dấu phẩy hoặc xuống dòng
    const splitUrls = raw
      .split(/[\n,]/)
      .map((u) => u.trim())
      .filter((u) => u.length > 5 && (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('data:image')));

    if (splitUrls.length === 0) {
      alert('Vui lòng nhập đường link ảnh hợp lệ (bắt đầu bằng https:// hoặc http://)');
      return;
    }

    setTempImagesList((prev) => [...prev, ...splitUrls]);
    setCustomImageUrlInput('');
  };

  const handleRemoveTempImage = (indexToRemove: number) => {
    setTempImagesList((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetMainImage = (indexToPromote: number) => {
    if (indexToPromote === 0) return;
    setTempImagesList((prev) => {
      const item = prev[indexToPromote];
      if (!item) return prev;
      const rest = prev.filter((_, idx) => idx !== indexToPromote);
      return [item, ...rest];
    });
    setSaveSuccessMsg(`⭐️ Đã lập tức đưa tấm ảnh #${indexToPromote + 1} lên vị trí số 1 làm Ảnh đại diện chính ngoài Trang chủ!`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleMoveImage = (fromIndex: number, direction: 'left' | 'right') => {
    setTempImagesList((prev) => {
      const toIndex = direction === 'left' ? fromIndex - 1 : fromIndex + 1;
      if (toIndex < 0 || toIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[fromIndex];
      copy[fromIndex] = copy[toIndex];
      copy[toIndex] = temp;
      return copy;
    });
  };

  const handleSaveProductImage = () => {
    if (!selectedProductForUpload) return;
    if (tempImagesList.length === 0) {
      alert('Vui lòng giữ lại hoặc chọn ít nhất 01 ảnh cho sản phẩm trước khi lưu.');
      return;
    }

    // YÊU CẦU V164 - SMART GALLERY:
    // 1. Tổng hợp ảnh cũ được giữ lại và ảnh mới tải lên.
    // 2. Tấm đầu tiên [0] được định danh "ẢNH CHÍNH" xuất hiện ngoài Trang chủ.
    // 3. Toàn bộ mảng images xuất hiện dạng Bộ sưu tập Gallery trong Trang Chi tiết.
    const mainImage = tempImagesList[0];
    const newGallery = [...tempImagesList];

    saveSingleProductAdminData(selectedProductForUpload.id, {
      image: mainImage,
      images: newGallery,
    });

    // V177: Kiểm tra ngay tính khả dụng của ảnh mới để tự động gỡ cảnh báo lỗi link
    validateImageUrl(mainImage).then((isValid) => {
      if (isValid) {
        markProductImageHealthy(selectedProductForUpload.id);
        setBrokenImageIds((prev) => {
          if (!prev.has(selectedProductForUpload.id)) return prev;
          const next = new Set(prev);
          next.delete(selectedProductForUpload.id);
          return next;
        });
      } else {
        markProductImageBroken(selectedProductForUpload.id, 'Link ảnh mới không tải được');
      }
    });

    setSaveSuccessMsg(
      `Đã lưu cập nhật bộ sưu tập (${newGallery.length} ảnh) cho "${selectedProductForUpload.name}"! Ảnh chính đã đồng bộ ra trang chủ.`
    );
    setTimeout(() => setSaveSuccessMsg(null), 3500);
    setSelectedProductForUpload(null);
    setTempImagesList([]);
    setCustomImageUrlInput('');
  };

  // -------------------------------------------------------------
  // FILTERING & METRICS COMPUTATIONS (V171 SMART DATE FILTER)
  // -------------------------------------------------------------
  const filteredOrdersByDate = useMemo(() => {
    return orders.filter((order) =>
      isOrderInDateRange(order.createdAt, dateFilter, customStartDate, customEndDate)
    );
  }, [orders, dateFilter, customStartDate, customEndDate]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;
      const matchDate = isOrderInDateRange(
        order.createdAt,
        dateFilter,
        customStartDate,
        customEndDate
      );
      const matchSearch =
        !orderSearchQuery.trim() ||
        order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        order.phone.includes(orderSearchQuery) ||
        (order.email && order.email.toLowerCase().includes(orderSearchQuery.toLowerCase())) ||
        order.address.toLowerCase().includes(orderSearchQuery.toLowerCase());
      return matchStatus && matchDate && matchSearch;
    });
  }, [orders, orderStatusFilter, orderSearchQuery, dateFilter, customStartDate, customEndDate]);

  // V178: Cảnh báo đơn trùng (Cùng SĐT và cùng số tiền trong vòng 10 phút)
  const duplicateOrderMap = useMemo(() => {
    const map = new Map<string, { duplicateWithId: string; phone: string; diffMinutes: number }>();
    for (let i = 0; i < orders.length; i++) {
      const o1 = orders[i];
      const p1 = (o1.phone || '').replace(/\D/g, '');
      const t1 = new Date(o1.createdAt).getTime();
      if (!p1 || isNaN(t1)) continue;

      for (let j = 0; j < orders.length; j++) {
        if (i === j) continue;
        const o2 = orders[j];
        const p2 = (o2.phone || '').replace(/\D/g, '');
        const t2 = new Date(o2.createdAt).getTime();
        if (!p2 || isNaN(t2)) continue;

        if (p1 === p2 && Math.abs(o1.finalTotalVND - o2.finalTotalVND) < 100) {
          const diffMs = Math.abs(t1 - t2);
          if (diffMs <= 10 * 60 * 1000) {
            map.set(o1.id, {
              duplicateWithId: o2.id,
              phone: o1.phone,
              diffMinutes: Math.round(diffMs / 60000),
            });
            break;
          }
        }
      }
    }
    return map;
  }, [orders]);

  const dateFilterLabel = useMemo(() => {
    if (dateFilter === 'today') return 'Hôm nay';
    if (dateFilter === 'week') return 'Tuần này';
    if (dateFilter === 'month') return 'Tháng này';
    if (dateFilter === 'custom') {
      if (customStartDate && customEndDate) return `${customStartDate} → ${customEndDate}`;
      if (customStartDate) return `Từ ${customStartDate}`;
      if (customEndDate) return `Đến ${customEndDate}`;
      return 'Tùy chỉnh';
    }
    return 'Toàn bộ thời gian';
  }, [dateFilter, customStartDate, customEndDate]);

  const totalRevenue = useMemo(() => {
    return filteredOrdersByDate
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.finalTotalVND, 0);
  }, [filteredOrdersByDate]);

  const totalCost = useMemo(() => {
    return filteredOrdersByDate
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => {
        let orderCost = 0;
        o.items.forEach((item) => {
          const prod = financialsList.find((p) => p.id === item.product.id);
          const costPerRetail = prod ? prod.cost : 0;
          const totalRetailUnits =
            item.purchaseMode === 'wholesale'
              ? item.quantity * (prod?.unitsPerWholesale || 1)
              : item.quantity;
          orderCost += costPerRetail * totalRetailUnits;
        });
        return sum + orderCost;
      }, 0);
  }, [filteredOrdersByDate, financialsList]);

  const totalExpectedProfit = useMemo(() => {
    return totalRevenue - totalCost;
  }, [totalRevenue, totalCost]);

  const profitMarginPercent = useMemo(() => {
    return totalRevenue > 0 ? (totalExpectedProfit / totalRevenue) * 100 : 0;
  }, [totalRevenue, totalExpectedProfit]);

  // V171: Xuất Báo Cáo Kinh Doanh Chuẩn Kế Toán (Excel/CSV)
  const handleExportAccountingReport = () => {
    const ordersToExport = filteredOrdersByDate.length > 0 ? filteredOrdersByDate : orders;
    if (ordersToExport.length === 0) {
      alert('Chưa có đơn hàng nào trong khoảng thời gian đã chọn để xuất báo cáo.');
      return;
    }

    const escapeCsv = (str: any) => `"${String(str ?? '').replace(/"/g, '""')}"`;

    const headers = [
      'Ngày giờ đặt hàng',
      'Tên khách / Cửa hàng',
      'Email',
      'Số điện thoại',
      'Địa chỉ (Số nhà/Đường)',
      'Phường / Xã',
      'Quận / Huyện',
      'Tỉnh / Thành Phố',
      'Tên sản phẩm',
      'Đơn vị tính',
      'Số lượng bán',
      'Doanh thu (VNĐ)',
      'Tổng giá vốn (VNĐ)',
      'Lợi nhuận ròng (VNĐ)',
      'Biên lợi nhuận (%)',
      'Mã đơn hàng',
      'Phương thức thanh toán',
      'Trạng thái đơn hàng',
      'Ghi chú đơn hàng',
    ];

    const rows: string[] = [headers.map(escapeCsv).join(',')];

    let grandTotalQty = 0;
    let grandTotalRevenue = 0;
    let grandTotalCost = 0;
    let grandTotalProfit = 0;

    ordersToExport.forEach((ord) => {
      const addr = parseAddressDetails(ord.address);
      const isCancelled = ord.status === 'cancelled';

      ord.items.forEach((item) => {
        const prod = financialsList.find((p) => p.id === item.product.id);
        const costPerRetail = prod ? prod.cost : 0;
        const totalRetailUnits =
          item.purchaseMode === 'wholesale'
            ? item.quantity * (prod?.unitsPerWholesale || 1)
            : item.quantity;
        const itemCost = isCancelled ? 0 : costPerRetail * totalRetailUnits;
        const itemRev = isCancelled ? 0 : item.subtotalVND;
        const itemProfit = itemRev - itemCost;
        const marginPct = itemRev > 0 ? (itemProfit / itemRev) * 100 : 0;
        const unitDisplay =
          item.purchaseMode === 'wholesale'
            ? item.product.wholesaleUnit || 'THÙNG'
            : item.product.unit || 'Hộp';

        grandTotalQty += item.quantity;
        grandTotalRevenue += itemRev;
        grandTotalCost += itemCost;
        grandTotalProfit += itemProfit;

        rows.push(
          [
            escapeCsv(new Date(ord.createdAt).toLocaleString('vi-VN')),
            escapeCsv(ord.customerName),
            escapeCsv(ord.email || ''),
            escapeCsv(ord.phone),
            escapeCsv(addr.street),
            escapeCsv(addr.ward),
            escapeCsv(addr.district),
            escapeCsv(addr.province),
            escapeCsv(item.product.name),
            escapeCsv(unitDisplay),
            escapeCsv(item.quantity),
            escapeCsv(itemRev),
            escapeCsv(itemCost),
            escapeCsv(itemProfit),
            escapeCsv(marginPct.toFixed(1) + '%'),
            escapeCsv(ord.id),
            escapeCsv(
              ord.paymentMethod === 'vietqr'
                ? 'VietQR 24/7'
                : ord.paymentMethod === 'b2b_credit'
                ? 'Công nợ B2B'
                : 'COD'
            ),
            escapeCsv(STATUS_LABELS[ord.status]?.label || ord.status),
            escapeCsv(ord.notes || ''),
          ].join(',')
        );
      });
    });

    // Summary line
    const grandMarginPct = grandTotalRevenue > 0 ? (grandTotalProfit / grandTotalRevenue) * 100 : 0;
    rows.push(
      [
        escapeCsv('TỔNG CỘNG'),
        escapeCsv(`${ordersToExport.length} đơn`),
        escapeCsv(''),
        escapeCsv(''),
        escapeCsv(''),
        escapeCsv(''),
        escapeCsv(''),
        escapeCsv(''),
        escapeCsv(''),
        escapeCsv(''),
        escapeCsv(grandTotalQty),
        escapeCsv(grandTotalRevenue),
        escapeCsv(grandTotalCost),
        escapeCsv(grandTotalProfit),
        escapeCsv(grandMarginPct.toFixed(1) + '%'),
        escapeCsv(''),
        escapeCsv(''),
        escapeCsv(''),
        escapeCsv(''),
      ].join(',')
    );

    const blob = new Blob(['\uFEFF' + rows.join('\r\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Bao_Cao_Kinh_Doanh_GROOSTER_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSaveSuccessMsg(
      `📊 Đã xuất Báo Cáo Kinh Doanh (${ordersToExport.length} đơn hàng) ra file Excel/CSV thành công!`
    );
    setTimeout(() => setSaveSuccessMsg(null), 4500);
  };

  // Screen 1: Dashboard Top 5 Best Sellers (V171: Cập nhật Lợi nhuận & Biên độ)
  const topBestSellers = useMemo(() => {
    const map: Record<
      string,
      {
        id: string;
        name: string;
        image: string;
        partnerName: string;
        unit: string;
        totalQty: number;
        totalRevenue: number;
        cost: number;
        totalCost: number;
        totalProfit: number;
        profitMargin: number;
      }
    > = {};

    // Aggregate from filtered orders by date
    filteredOrdersByDate.forEach((ord) => {
      if (ord.status === 'cancelled') return;
      ord.items.forEach((item) => {
        const pid = item.product.id;
        const currentProd = financialsList.find((p) => p.id === pid);
        const cost = currentProd ? currentProd.cost : 0;
        const totalRetailUnits =
          item.purchaseMode === 'wholesale'
            ? item.quantity * (currentProd?.unitsPerWholesale || 1)
            : item.quantity;
        const itemCost = cost * totalRetailUnits;

        if (!map[pid]) {
          map[pid] = {
            id: pid,
            name: item.product.name,
            image: item.product.image,
            partnerName: item.product.partnerName,
            unit: item.product.unit,
            totalQty: 0,
            totalRevenue: 0,
            cost,
            totalCost: 0,
            totalProfit: 0,
            profitMargin: 0,
          };
        }
        map[pid].totalQty += item.quantity;
        map[pid].totalRevenue += item.subtotalVND;
        map[pid].totalCost += itemCost;
        map[pid].totalProfit = map[pid].totalRevenue - map[pid].totalCost;
        map[pid].profitMargin =
          map[pid].totalRevenue > 0
            ? (map[pid].totalProfit / map[pid].totalRevenue) * 100
            : 0;
      });
    });

    const sorted = Object.values(map).sort((a, b) => b.totalQty - a.totalQty);
    if (sorted.length >= 5) return sorted.slice(0, 5);

    // Fallback: If sample orders have fewer than 5 items, supplement with top flagship products
    const flagshipIds = [
      'vua-mia-tuyet-350ml',
      'vtn-matcha-laka-ceremonial',
      'phu-nha-cha-bong-heo-nuoc-mam',
      'dato-sam-day-ngoc-linh-kho-100g',
      'nonla-vien-08-box',
    ];

    flagshipIds.forEach((fid, idx) => {
      if (!map[fid]) {
        const prod = financialsList.find((p) => p.id === fid);
        if (prod) {
          const dummyQty = Math.max(25 - idx * 4, 4);
          const rev = dummyQty * prod.prices.retail;
          const costTot = prod.cost * dummyQty;
          const profitTot = rev - costTot;
          const margin = rev > 0 ? (profitTot / rev) * 100 : 0;
          sorted.push({
            id: prod.id,
            name: prod.name,
            image: prod.image,
            partnerName: prod.partnerName,
            unit: prod.unit,
            totalQty: dummyQty,
            totalRevenue: rev,
            cost: prod.cost,
            totalCost: costTot,
            totalProfit: profitTot,
            profitMargin: margin,
          });
        }
      }
    });

    return sorted.slice(0, 5);
  }, [filteredOrdersByDate, financialsList]);

  // Filtered Financials List for Screen 2
  const filteredFinancials = useMemo(() => {
    return financialsList.filter((item) => {
      const matchPartner =
        selectedPartnerFilter === 'all' ||
        item.partnerId === selectedPartnerFilter ||
        (selectedPartnerFilter === 'hat-qua-kho' &&
          (item.partnerId === 'hat-dinh-duong' ||
            item.partnerId === 'trai-cay-say' ||
            item.partnerId === 'hu-qua-tang'));
      const matchSearch =
        !productSearchQuery.trim() ||
        item.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        item.partnerName.toLowerCase().includes(productSearchQuery.toLowerCase());

      let matchFilterMode = true;
      if (financialFilterMode === 'loss_only') {
        matchFilterMode = item.hasLoss;
      } else if (financialFilterMode === 'no_cost') {
        matchFilterMode = item.cost <= 0;
      } else if (financialFilterMode === 'low_stock') {
        matchFilterMode = item.stock > 0 && item.stock < 5;
      } else if (financialFilterMode === 'out_of_stock') {
        matchFilterMode = item.stock <= 0;
      }

      // V254: Lọc theo Tình trạng ảnh (Tất cả / Đã có ảnh / Chưa có ảnh)
      let matchImageFilter = true;
      const isMissing = isProductImageMissing(item);
      if (productImageFilter === 'has_image') {
        matchImageFilter = !isMissing;
      } else if (productImageFilter === 'no_image') {
        matchImageFilter = isMissing;
      }

      return matchPartner && matchSearch && matchFilterMode && matchImageFilter;
    });
  }, [financialsList, selectedPartnerFilter, productSearchQuery, financialFilterMode, productImageFilter]);

  // Filtered Images List for Screen 3 (V177/V254: Hỗ trợ lọc ảnh lỗi / ảnh tùy chỉnh / đã có ảnh / chưa có ảnh)
  const filteredImages = useMemo(() => {
    return financialsList.filter((item) => {
      const matchPartner =
        imagePartnerFilter === 'all' ||
        item.partnerId === imagePartnerFilter ||
        (imagePartnerFilter === 'hat-qua-kho' &&
          (item.partnerId === 'hat-dinh-duong' ||
            item.partnerId === 'trai-cay-say' ||
            item.partnerId === 'hu-qua-tang'));
      const matchSearch =
        !imageSearchQuery.trim() ||
        item.name.toLowerCase().includes(imageSearchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(imageSearchQuery.toLowerCase());
      const isBroken = brokenImageIds.has(item.id);
      let matchStatus = true;
      if (imageStatusFilter === 'broken') {
        matchStatus = isBroken;
      } else if (imageStatusFilter === 'custom') {
        matchStatus = !!item.isCustomImage;
      } else if (imageStatusFilter === 'has_image') {
        matchStatus = !isProductImageMissing(item);
      } else if (imageStatusFilter === 'no_image') {
        matchStatus = isProductImageMissing(item);
      }
      return matchPartner && matchSearch && matchStatus;
    });
  }, [financialsList, imagePartnerFilter, imageSearchQuery, imageStatusFilter, brokenImageIds]);

  const lossCount = useMemo(() => {
    return financialsList.filter((p) => p.hasLoss).length;
  }, [financialsList]);

  const lowStockCount = useMemo(() => {
    return financialsList.filter((p) => p.stock > 0 && p.stock < 5).length;
  }, [financialsList]);

  const outOfStockCount = useMemo(() => {
    return financialsList.filter((p) => p.stock <= 0).length;
  }, [financialsList]);

  if (!isOpen) return null;

  // -------------------------------------------------------------
  // PASSWORD GATE DIALOG (Mật khẩu: Chutchiu2026)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <div
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-br from-[#062415] via-[#0d3b25] to-[#124b30] text-white text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl !bg-transparent p-0 border-0 shadow-none flex items-center justify-center mb-3.5 grooster-logo-container !shadow-none !border-none" style={{ backgroundColor: 'transparent', boxShadow: 'none', filter: 'none', border: 'none', outline: 'none', mixBlendMode: 'normal', opacity: 1, padding: 0 }}>
              <img
                src="https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png"
                alt="Logo G-ROOSTER"
                className="w-full h-full object-contain rounded-xl grooster-logo-img !opacity-100"
                style={{ objectFit: 'contain', backgroundColor: 'transparent', opacity: 1, filter: 'none', boxShadow: 'none', border: 'none', mixBlendMode: 'normal' }}
                onError={(e) => {
                  e.currentTarget.src = '/logo-g-rooster-v5-3d.png';
                }}
              />
            </div>
            <h3 className="text-lg font-black tracking-wide font-heading">
              G-ROOSTER CO.,LTD
            </h3>
            <p className="text-xs text-amber-300 font-semibold mt-0.5">
              PHÒNG QUẢN TRỊ TỔNG LỰC (/admin)
            </p>
            <p className="text-[11px] text-stone-300 mt-1">
              Hệ thống kiểm soát tài chính, giá vốn, hình ảnh & đơn hàng nội bộ
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Mật khẩu quản trị cấp cao
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={adminPasswordInput}
                  onChange={(e) => {
                    setAdminPasswordInput(e.target.value);
                    if (passwordError) setPasswordError(null);
                  }}
                  autoFocus
                  placeholder="Nhập mật khẩu quản trị..."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-600 font-bold mt-2 flex items-center gap-1.5 bg-red-50 p-2.5 rounded-xl border border-red-200">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{passwordError}</span>
                </p>
              )}
            </div>

            <div className="text-[11px] text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200 leading-relaxed">
              🔒 <strong>Bảo mật cấp cao:</strong> Toàn bộ dữ liệu Giá Vốn, Biên Lợi Nhuận, Đơn hàng B2B và thông tin đối tác được mã hóa cục bộ. Khách hàng thông thường tuyệt đối không thể truy cập.
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#062415] hover:bg-[#0a3520] text-amber-300 font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-400/40 active:scale-98"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>ĐĂNG NHẬP PHÒNG QUẢN TRỊ</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-medium text-xs transition-colors cursor-pointer"
              >
                Quay về cửa hàng
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN FULL-FEATURED WORKSPACE (V186: Natural Document Length - 1 Browser Scrollbar)
  // -------------------------------------------------------------
  return (
    <div className="w-full min-h-screen bg-[#f8faf9] font-sans select-text">
      <div className="relative w-full min-h-screen bg-[#f8faf9] flex flex-col md:flex-row">
        {/* Left Sidebar (Drawer on mobile, fixed collapsible on desktop) */}
        <aside
          style={{ position: 'fixed', left: 0, top: 0, bottom: 0, height: '100vh' }}
          className={`flex flex-col fixed left-0 top-0 bottom-0 h-screen bg-gradient-to-b from-[#051e12] via-[#092d1b] to-[#04170d] text-white border-r border-emerald-900/60 z-50 select-none shadow-2xl transition-all duration-300 ease-in-out ${
            isSidebarCollapsed
              ? 'w-0 -translate-x-full overflow-hidden opacity-0 pointer-events-none'
              : 'w-64 max-w-[85vw] translate-x-0 opacity-100'
          }`}
        >
          {/* Nút bấm tại mép Sidebar để Admin có thể "Thu gọn/Mở rộng" (Toggle Sidebar) - HÌNH 1 */}
          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(true)}
            className="absolute -right-3.5 top-14 w-7 h-7 rounded-full bg-emerald-700 hover:bg-emerald-600 text-amber-300 border-2 border-emerald-400 shadow-md flex items-center justify-center cursor-pointer transition-all z-50 hover:scale-110 active:scale-95"
            title="Thu gọn Sidebar (nhường diện tích tối đa cho bảng)"
            aria-label="Thu gọn Sidebar"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Brand & Logo Header (Đồng bộ Logo v3 trong suốt V233) */}
          <div className="p-3.5 border-b border-emerald-900/50 flex items-center gap-3 shrink-0 bg-emerald-950/60">
            <div className="!bg-transparent shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 border-0 shadow-none grooster-logo-container !shadow-none !border-none" style={{ backgroundColor: 'transparent', boxShadow: 'none', filter: 'none', border: 'none', outline: 'none', mixBlendMode: 'normal', opacity: 1, padding: 0 }}>
              <img
                src="https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png"
                alt="G-ROOSTER CO.,LTD - Nông sản cao cấp"
                className="w-full h-full object-contain grooster-logo-img !opacity-100"
                style={{ objectFit: 'contain', backgroundColor: 'transparent', opacity: 1, filter: 'none', boxShadow: 'none', border: 'none', mixBlendMode: 'normal' }}
                onError={(e) => {
                  e.currentTarget.src = '/logo-g-rooster-v5-3d.png';
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm lg:text-base font-black tracking-tight font-heading text-white truncate">
                G-ROOSTER CO.,LTD
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex px-1.5 py-0.2 rounded-full text-[9px] font-black bg-amber-400 text-stone-950 uppercase tracking-wider">
                  ADMIN HUB
                </span>
                {lossCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-red-600 text-white animate-pulse">
                    {lossCount} lỗ
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* V182/V183/V185: Nút XEM WEBSITE màu xanh lá duy nhất tại Sidebar Admin */}
          <div className="p-3 border-b border-emerald-900/40 shrink-0">
            <button
              onClick={onClose}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs tracking-wide flex items-center justify-center gap-2 border border-emerald-400/40 shadow-sm hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
              title="Chuyển nhanh ra trang khách hàng (Xem Website)"
            >
              <ExternalLink className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform shrink-0" />
              <span>XEM WEBSITE</span>
            </button>
          </div>

          {/* Navigation Items in Sidebar (scrollbar-none, loại bỏ thanh cuộn bên trong) */}
          <nav className="flex-1 p-2.5 space-y-1 overflow-y-auto no-scrollbar scrollbar-none">
            {[
              { id: 'dashboard' as AdminScreen, label: 'Bảng Điều Khiển', icon: LayoutDashboard },
              {
                id: 'financials' as AdminScreen,
                label: 'Sản Phẩm & Giá',
                icon: DollarSign,
                badge: lossCount > 0 ? `${lossCount} cảnh báo` : undefined,
              },
              {
                id: 'images' as AdminScreen,
                label: 'Bộ Sưu Tập Ảnh',
                icon: ImageIcon,
                badge: brokenImageIds.size > 0 ? `⚠️ ${brokenImageIds.size} lỗi` : undefined,
              },
              {
                id: 'orders' as AdminScreen,
                label: 'Quản Lý Đơn Hàng',
                icon: ShoppingCart,
                badge: `${orders.length}`,
              },
            ].map((tab) => {
              const isActive = activeScreen === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveScreen(tab.id)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-900/90 text-amber-300 shadow-sm border border-emerald-700/60'
                      : 'text-stone-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono shrink-0 ${
                        tab.id === 'images' && brokenImageIds.size > 0
                          ? 'bg-red-600 text-white font-black animate-pulse'
                          : tab.id === 'financials' && lossCount > 0
                          ? 'bg-red-600 text-white font-bold'
                          : isActive
                          ? 'bg-amber-400/30 text-amber-200'
                          : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* V185: Phần cuối Sidebar chỉ để thông tin phiên bản tinh gọn, thoáng đãng */}
          <div className="p-3.5 border-t border-emerald-900/50 text-center shrink-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] font-mono text-emerald-300 font-bold tracking-wide">
                v1.9.1a STABLE
              </span>
            </div>
            <p className="text-[9.5px] text-emerald-400/60 mt-1 font-medium">
              G-ROOSTER Admin Hub
            </p>
          </div>
        </aside>

        {/* Mobile Sidebar Backdrop Overlay */}
        {!isSidebarCollapsed && (
          <div
            onClick={() => setIsSidebarCollapsed(true)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden cursor-pointer"
          />
        )}

        {/* Floating expand trigger button on left edge when Sidebar is collapsed (HÌNH 1) */}
        {isSidebarCollapsed && (
          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(false)}
            className="fixed left-0 top-14 z-40 py-2.5 px-2 rounded-r-xl bg-[#051e12] hover:bg-emerald-700 text-amber-300 border-y border-r border-emerald-400 shadow-xl cursor-pointer flex items-center justify-center transition-all hover:pr-3 group"
            title="Mở rộng Sidebar (Menu quản trị)"
            aria-label="Mở rộng Sidebar"
          >
            <ChevronRight className="w-4 h-4 group-hover:scale-125 transition-transform stroke-[2.5]" />
          </button>
        )}

        {/* Right Content Area (Tự động co dãn width 100% khi Sidebar ẩn, có margin-left khi Sidebar hiện) */}
        <div
          className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? 'ml-0 w-full' : 'ml-0 lg:ml-64 w-full lg:w-[calc(100%-16rem)]'
          }`}
        >
          {/* Top Header Bar - V257: Cố định vị trí position: sticky; top: 0; z-index: 100; cho TẤT CẢ các tab */}
          <header
            style={{ position: 'sticky', top: 0, zIndex: 100 }}
            className="sticky top-0 z-[100] px-3 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#051e12] via-[#092d1b] to-[#0f3c25] text-white flex items-center justify-between border-b border-emerald-900/60 shrink-0 w-full gap-2 shadow-md"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Menu Toggle for Mobile & Tablet */}
              <button
                type="button"
                onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors active:scale-95 shrink-0"
                title="Mở/Đóng Menu Quản Trị"
                aria-label="Menu quản trị"
              >
                <Menu className="w-4 sm:w-5 h-4 sm:h-5 text-amber-300" />
              </button>

              {lossCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white flex items-center gap-1 animate-pulse shrink-0">
                  <AlertTriangle className="w-2.5 h-2.5" />
                  <span>{lossCount} lỗ!</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* V250: Bộ chuyển đổi ngôn ngữ [VN | EN] đồng bộ với Báo Giá PDF */}
              <div className="flex items-center rounded-xl bg-black/40 border border-white/15 p-0.5 text-xs font-mono font-bold shrink-0">
                <button
                  type="button"
                  onClick={() => handleAdminLanguageSwitch('VN')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    adminLanguage === 'VN'
                      ? 'bg-[#D4AF37] text-stone-950 font-black shadow-xs'
                      : 'text-stone-300 hover:text-white'
                  }`}
                  title="Chuyển sang Tiếng Việt (Báo giá PDF tiếng Việt)"
                >
                  VN
                </button>
                <button
                  type="button"
                  onClick={() => handleAdminLanguageSwitch('EN')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    adminLanguage === 'EN'
                      ? 'bg-[#D4AF37] text-stone-950 font-black shadow-xs'
                      : 'text-stone-300 hover:text-white'
                  }`}
                  title="Switch to English (Pure English PDF & Quotes)"
                >
                  EN
                </button>
              </div>

              {/* V192: Nút XEM WEBSITE trên Desktop & Tablet (Trên mobile chuyển sang icon tròn nổi) */}
              <button
                onClick={onClose}
                className="hidden sm:flex px-2 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 text-white font-bold text-xs items-center gap-1.5 border border-emerald-400/40 shadow-xs cursor-pointer active:scale-95 shrink-0"
                title="Chuyển nhanh ra trang khách hàng (Xem Website)"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>XEM WEBSITE</span>
              </button>

              {/* V185: Nút Làm mới dữ liệu đặt tại Header */}
              <button
                onClick={() => {
                  setFinancialsList(getAdminProductFinancials());
                  loadOrders();
                  setSaveSuccessMsg('Dữ liệu hệ thống đã được đồng bộ mới nhất!');
                  setTimeout(() => setSaveSuccessMsg(null), 2500);
                }}
                className="px-2 sm:px-2.5 py-1.5 text-stone-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all flex items-center gap-1 text-xs font-semibold border border-white/10 cursor-pointer shadow-2xs shrink-0"
                title="Đồng bộ / Làm mới dữ liệu từ hệ thống"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-300" />
                <span className="hidden md:inline">Làm mới</span>
              </button>

              {/* V185 & V263: Nút Thoát đặt tại Header - Tuyệt đối không thoát Admin nếu đang mở Modal Bộ sưu tập */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (selectedProductForUpload) {
                    handleCloseGalleryModal();
                    return;
                  }
                  if (lightboxData) {
                    setLightboxData(null);
                    return;
                  }
                  if (isBulkModalOpen) {
                    setIsBulkModalOpen(false);
                    return;
                  }
                  if (productToDelete) {
                    setProductToDelete(null);
                    return;
                  }
                  handleAdminLogout();
                }}
                className="px-2 sm:px-2.5 py-1.5 rounded-xl bg-red-900/60 hover:bg-red-800 text-red-200 hover:text-white text-xs font-semibold flex items-center gap-1 border border-red-700/60 transition-colors cursor-pointer shrink-0 active:scale-95"
                title={selectedProductForUpload ? 'Đóng cửa sổ bộ sưu tập (ở lại Quản trị)' : 'Đăng xuất khỏi Admin'}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Thoát</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (selectedProductForUpload) {
                    handleCloseGalleryModal();
                    return;
                  }
                  if (lightboxData) {
                    setLightboxData(null);
                    return;
                  }
                  if (isBulkModalOpen) {
                    setIsBulkModalOpen(false);
                    return;
                  }
                  if (productToDelete) {
                    setProductToDelete(null);
                    return;
                  }
                  onClose();
                }}
                className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer ml-1 active:scale-95"
                aria-label="Đóng"
                title={selectedProductForUpload ? 'Đóng cửa sổ bộ sưu tập (ở lại Quản trị)' : 'Đóng trang Quản trị'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Global Save Toast */}
          {saveSuccessMsg && (
            <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between gap-2 shadow-inner shrink-0">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-200" />
                <span>{saveSuccessMsg}</span>
              </div>
              <button
                onClick={() => setSaveSuccessMsg(null)}
                className="text-emerald-100 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

          {/* Navigation Tabs (Mobile: 4 Màn Hình Cốt Lõi, Desktop: Sub-bar with Export & Save) */}
          <div className="bg-white border-b border-stone-200 px-3 sm:px-5 py-2 flex items-center justify-between gap-3 shrink-0 shadow-2xs">
            <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none min-w-0 mr-2 md:hidden">
              {[
                { id: 'dashboard' as AdminScreen, label: 'Bảng Điều Khiển', icon: LayoutDashboard },
                {
                  id: 'financials' as AdminScreen,
                  label: 'Sản Phẩm & Giá',
                  icon: DollarSign,
                  badge: lossCount > 0 ? `${lossCount} cảnh báo` : undefined,
                },
                {
                  id: 'images' as AdminScreen,
                  label: 'Bộ Sưu Tập Ảnh',
                  icon: ImageIcon,
                  badge: brokenImageIds.size > 0 ? `⚠️ ${brokenImageIds.size} lỗi ảnh` : undefined,
                },
                {
                  id: 'orders' as AdminScreen,
                  label: 'Quản Lý Đơn Hàng',
                  icon: ShoppingCart,
                  badge: `${orders.length}`,
                },
              ].map((tab) => {
                const isActive = activeScreen === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveScreen(tab.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[#062415] text-amber-300 shadow-sm'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono shrink-0 ${
                          tab.id === 'images' && brokenImageIds.size > 0
                            ? 'bg-red-600 text-white font-black animate-pulse'
                            : tab.id === 'financials' && lossCount > 0
                            ? 'bg-red-600 text-white font-bold'
                            : isActive
                            ? 'bg-amber-400/30 text-amber-200'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop current screen title breadcrumb */}
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-stone-700">
              <span className="text-stone-400">Khu Vực Quản Trị:</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-extrabold flex items-center gap-1.5">
                {activeScreen === 'dashboard' && <LayoutDashboard className="w-3.5 h-3.5 text-emerald-700" />}
                {activeScreen === 'financials' && <DollarSign className="w-3.5 h-3.5 text-emerald-700" />}
                {activeScreen === 'images' && <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />}
                {activeScreen === 'orders' && <ShoppingCart className="w-3.5 h-3.5 text-emerald-700" />}
                <span>
                  {activeScreen === 'dashboard'
                    ? 'Bảng Điều Khiển'
                    : activeScreen === 'financials'
                    ? 'Sản Phẩm & Bảng Giá'
                    : activeScreen === 'images'
                    ? 'Bộ Sưu Tập Hình Ảnh'
                    : 'Quản Lý Đơn Hàng'}
                </span>
              </span>
            </div>

            {/* V175/V177/V179/V191a: Nút XUẤT DỮ LIỆU & Nút Lưu thay đổi (Tinh gọn thanh thoát, chống tràn viền) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-auto flex-wrap sm:flex-nowrap justify-end">
              <button
                type="button"
                onClick={handleOpenExportSyncModal}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer border border-amber-500/80 active:scale-[0.98] shrink-0"
                title="Xuất mã đồng bộ JSON cho AI Studio để lưu vĩnh viễn toàn bộ dữ liệu vào mã nguồn"
              >
                <Download className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-stone-950 shrink-0" />
                <span className="font-heading tracking-tight whitespace-nowrap">
                  <span className="sm:hidden">Xuất file</span>
                  <span className="hidden sm:inline">XUẤT DỮ LIỆU</span>
                </span>
              </button>

              <button
                type="button"
                disabled={isSavingAllChanges}
                onClick={handleSaveAllChangesToFirebase}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-800 via-[#06331a] to-emerald-950 hover:from-emerald-700 hover:to-emerald-900 text-amber-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 border-2 border-amber-400/60 active:scale-[0.98] shrink-0 whitespace-nowrap"
                title="Lưu toàn bộ thay đổi về Giá vốn, Giá bán, Tồn kho và Hình ảnh vào Google Firebase Firestore"
              >
                {isSavingAllChanges ? (
                  <RefreshCw className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-spin text-amber-300 shrink-0" />
                ) : (
                  <Save className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-300 shrink-0" />
                )}
                <span className="font-heading tracking-tight whitespace-nowrap text-amber-300">
                  {isSavingAllChanges ? 'Đang lưu...' : `Lưu thay đổi${Object.keys(unsavedEdits).length > 0 ? ` (${Object.keys(unsavedEdits).length})` : ''}`}
                </span>
              </button>
            </div>
          </div>

        {/* Content Area with dynamic screen rendering - Duy nhất 1 thanh cuộn dọc ngoài cùng của trình duyệt (V183/V186) */}
        <main className="flex-1 p-3 sm:p-5">
          {/* V178: Cảnh báo biến động tỷ giá nếu lệch > 5%/ngày từ Open Exchange API */}
          {(() => {
            const liveRate = exchangeRate || 26125;
            const rateDeviationPercent = Math.abs((liveRate - 26125) / 26125) * 100;
            if (rateDeviationPercent < 5) return null;
            return (
              <div className="mb-4 p-3 bg-amber-500 text-stone-950 rounded-2xl flex items-center justify-between gap-3 shadow-md border border-amber-600 font-sans">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black">
                  <AlertTriangle className="w-5 h-5 text-stone-950 shrink-0 animate-bounce" />
                  <span>
                    ⚠️ BÁO ĐỘNG TỶ GIÁ: Tỷ giá USD/VND hiện tại ({formatCommaNumber(liveRate)} ₫) đang biến động lệch {rateDeviationPercent.toFixed(1)}% (&gt;5%/ngày) từ Open Exchange API! Quản trị viên lưu ý kiểm tra lại bảng giá xuất khẩu FCL OEM.
                  </span>
                </div>
              </div>
            );
          })()}

          {/* =========================================================
              MÀN HÌNH 1: BẢNG ĐIỀU KHIỂN (DASHBOARD)
             ========================================================= */}
          {activeScreen === 'dashboard' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* V171: Smart Date Filter & Business Report Export Bar */}
              <div className="bg-white p-3 sm:p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                {/* Left: Filter Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <div className="flex items-center gap-1.5 mr-1 text-stone-700 text-xs font-bold">
                    <Calendar className="w-4 h-4 text-emerald-800" />
                    <span>Lọc Thời Gian:</span>
                  </div>
                  {(
                    [
                      { key: 'all' as DateFilterRange, label: 'Tất cả' },
                      { key: 'today' as DateFilterRange, label: 'Hôm nay' },
                      { key: 'week' as DateFilterRange, label: 'Tuần này' },
                      { key: 'month' as DateFilterRange, label: 'Tháng này' },
                      { key: 'custom' as DateFilterRange, label: 'Tùy chỉnh 📅' },
                    ]
                  ).map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setDateFilter(tab.key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        dateFilter === tab.key
                          ? 'bg-[#062415] text-amber-300 shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}

                  {/* Custom Date Pickers */}
                  {dateFilter === 'custom' && (
                    <div className="flex items-center gap-1.5 ml-1 animate-in fade-in duration-200">
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="px-2.5 py-1 rounded-lg border border-stone-300 text-xs text-stone-800 font-mono focus:ring-1 focus:ring-emerald-700 bg-white"
                        title="Từ ngày"
                      />
                      <span className="text-stone-400 text-xs font-bold">→</span>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="px-2.5 py-1 rounded-lg border border-stone-300 text-xs text-stone-800 font-mono focus:ring-1 focus:ring-emerald-700 bg-white"
                        title="Đến ngày"
                      />
                    </div>
                  )}
                </div>

                {/* Right: Export Business Report (Excel/CSV) Button */}
                <button
                  type="button"
                  onClick={handleExportAccountingReport}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95 border border-emerald-700"
                  title="Tải file Excel/CSV chuẩn kế toán chi tiết theo đơn và sản phẩm"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span className="font-heading">Xuất Báo Cáo Kinh Doanh (Excel/CSV)</span>
                </button>
              </div>

              {/* Stat Cards Grid (4 Ô Thống Kê Tổng V171) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Stat 1: Expected Revenue */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs text-stone-500 font-semibold">Doanh Thu Dự Kiến</p>
                    <h3 className="text-2xl font-black text-stone-900 mt-1 font-heading">
                      {formatAdminPrice(totalRevenue, currency, exchangeRate)}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium mt-1 truncate max-w-[210px]" title={`Tổng giá vốn: ${formatAdminPrice(totalCost, currency, exchangeRate)}`}>
                      Tổng vốn: {formatAdminPrice(totalCost, currency, exchangeRate)}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>

                {/* Stat 2: Expected Profit (LỢI NHUẬN DỰ KIẾN - Yêu cầu V171) */}
                <div className="bg-gradient-to-br from-emerald-50/90 to-white p-4 rounded-2xl border border-emerald-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs text-emerald-800 font-bold uppercase tracking-wider">
                      Lợi Nhuận Dự Kiến
                    </p>
                    <h3 className="text-2xl font-black text-emerald-900 mt-1 font-heading">
                      {formatAdminPrice(totalExpectedProfit, currency, exchangeRate)}
                    </h3>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Biên lợi nhuận: {profitMarginPercent >= 0 ? '+' : ''}{profitMarginPercent.toFixed(1)}%</span>
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-emerald-800 shadow-2xs">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>

                {/* Stat 3: Total Orders in Filtered Range */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs text-stone-500 font-semibold">Tổng Đơn Hàng ({dateFilterLabel})</p>
                    <h3 className="text-2xl font-black text-stone-900 mt-1 font-heading">
                      {filteredOrdersByDate.length} đơn
                    </h3>
                    <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {filteredOrdersByDate.filter((o) => o.status === 'completed').length} đơn đã hoàn tất
                      </span>
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-800">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                </div>

                {/* Stat 4: Margin & Health Alert */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs text-stone-500 font-semibold">Tình Trạng Giá Vốn</p>
                    <h3 className="text-2xl font-black mt-1 font-heading text-stone-900">
                      {lossCount === 0 ? (
                        <span className="text-emerald-700">100% An Toàn</span>
                      ) : (
                        <span className="text-red-600">{lossCount} Cảnh Báo</span>
                      )}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium mt-1">
                      {lossCount === 0
                        ? 'Tất cả mức giá > Giá vốn'
                        : 'Có sản phẩm giá bán thấp hơn vốn!'}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      lossCount === 0
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {lossCount === 0 ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                  </div>
                </div>
              </div>

              {/* =========================================================
                  V177: MỤC THÔNG BÁO TÌNH TRẠNG HỆ THỐNG (SYSTEM STATUS & SMART IMAGE CONTROL)
                 ========================================================= */}
              <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                        brokenImageIds.size > 0
                          ? 'bg-red-50 text-red-600 border border-red-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {brokenImageIds.size > 0 ? (
                        <AlertTriangle className="w-5 h-5 animate-bounce text-red-600" />
                      ) : (
                        <ShieldCheck className="w-5 h-5 text-emerald-700" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-black text-stone-900 font-heading">
                          TÌNH TRẠNG HỆ THỐNG &amp; KIỂM SOÁT HÌNH ẢNH (AUTO-CHECK)
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide uppercase shadow-2xs ${
                            brokenImageIds.size > 0
                              ? 'bg-red-600 text-white animate-pulse'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {brokenImageIds.size > 0
                            ? `⚠️ ${brokenImageIds.size} SẢN PHẨM LỖI LINK ẢNH`
                            : '✅ 100% HOẠT ĐỘNG TỐT'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Tự động rà quét kiểm tra tính khả dụng đường link ảnh (404/không thể tải) và kích hoạt cơ chế ảnh dự phòng
                      </p>
                    </div>
                  </div>

                  {/* Scanner trigger button */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleRunAutoCheckImages}
                      disabled={isAutoCheckingImages}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                        isAutoCheckingImages
                          ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                          : 'bg-[#062415] hover:bg-stone-900 text-amber-300'
                      }`}
                      title="Quét lại toàn bộ 248 link ảnh sản phẩm để phát hiện link chết hoặc lỗi 404"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isAutoCheckingImages ? 'animate-spin text-amber-400' : ''}`} />
                      <span>{isAutoCheckingImages ? 'Đang Auto-Check...' : '🔍 Quét Lại Link Ảnh (Auto-Check)'}</span>
                    </button>
                  </div>
                </div>

                {/* Live Scanning Progress Banner */}
                {isAutoCheckingImages && autoCheckProgress && (
                  <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex flex-col gap-1.5 animate-in fade-in">
                    <div className="flex items-center justify-between font-bold">
                      <span>Đang tự động quét kiểm tra link ảnh ({autoCheckProgress.current}/{autoCheckProgress.total} sản phẩm)...</span>
                      <span>{Math.round((autoCheckProgress.current / autoCheckProgress.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-600 h-1.5 rounded-full transition-all duration-200"
                        style={{ width: `${(autoCheckProgress.current / autoCheckProgress.total) * 100}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-amber-800">
                      Phát hiện: <strong>{autoCheckProgress.brokenCount} link ảnh bị lỗi</strong>
                    </div>
                  </div>
                )}

                {/* System Status Sub-cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3.5">
                  {/* Box 1: Image Link Status */}
                  <div
                    className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                      brokenImageIds.size > 0
                        ? 'bg-red-50/70 border-red-300 ring-1 ring-red-400/40'
                        : 'bg-emerald-50/50 border-emerald-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-stone-700">Tình trạng link ảnh sản phẩm:</span>
                        {brokenImageIds.size > 0 ? (
                          <span className="text-[10px] font-black text-red-600 bg-red-100 px-2 py-0.5 rounded-md border border-red-200 animate-pulse">
                            ⚠️ Link ảnh bị hỏng
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                            100% Khả dụng
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-600 leading-snug">
                        {brokenImageIds.size > 0 ? (
                          <>
                            Hệ thống phát hiện <strong className="text-red-600">{brokenImageIds.size} sản phẩm</strong> có link ảnh bị lỗi (404 hoặc không thể tải). Đã tô đỏ khung cảnh báo và kích hoạt ảnh dự phòng.
                          </>
                        ) : (
                          <>
                            Toàn bộ <strong>{financialsList.length}/{financialsList.length} sản phẩm</strong> có đường link hình ảnh hoạt động chính xác, hiển thị sắc nét.
                          </>
                        )}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveScreen('images');
                          if (brokenImageIds.size > 0) {
                            setImageStatusFilter('broken');
                          }
                        }}
                        className={`text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                          brokenImageIds.size > 0
                            ? 'text-red-700 hover:text-red-900 underline font-black'
                            : 'text-emerald-800 hover:text-emerald-950'
                        }`}
                      >
                        <span>{brokenImageIds.size > 0 ? `👉 Xử lý ${brokenImageIds.size} link ảnh bị hỏng ngay` : 'Quản lý bộ sưu tập ảnh →'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Box 2: Luxury Fallback Mechanism */}
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-stone-700">Cơ chế hình ảnh dự phòng:</span>
                        <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200">
                          BẢO VỆ 24/7
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-snug">
                        Khi link ảnh gặp lỗi ngoài website, hệ thống <strong>tự động thay thế</strong> bằng placeholder sang trọng có <strong>Logo G-ROOSTER</strong> kèm dòng chữ: <em>"G-ROOSTER: Sản phẩm đang cập nhật hình ảnh"</em>. <strong>Tuyệt đối không hiện icon ảnh vỡ</strong>.
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-stone-200/60 text-[11px] text-stone-500 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Bảo vệ thẩm mỹ giao diện khách xem 100%</span>
                    </div>
                  </div>

                  {/* Box 3: Inventory & Financial Audit Status */}
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-stone-700">Kiểm soát kho &amp; giá vốn:</span>
                        <span className="text-[10px] font-black text-stone-700 bg-stone-200 px-1.5 py-0.5 rounded">
                          TỰ ĐỘNG
                        </span>
                      </div>
                      <div className="text-xs text-stone-600 space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            setFinancialFilterMode('low_stock');
                            setActiveScreen('financials');
                          }}
                          className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-amber-100/70 transition-colors cursor-pointer text-left group"
                          title="Xem danh sách sản phẩm sắp cháy hàng (Tồn < 5)"
                        >
                          <span className="group-hover:text-amber-900 group-hover:underline flex items-center gap-1 font-medium">
                            <span>Sắp cháy hàng (&lt;5):</span>
                          </span>
                          <strong className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-transform group-hover:scale-105 ${lowStockCount > 0 ? 'bg-amber-200 text-amber-900' : 'bg-stone-200 text-stone-700'}`}>
                            {lowStockCount} SP ↗
                          </strong>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFinancialFilterMode('out_of_stock');
                            setActiveScreen('financials');
                          }}
                          className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-red-100/70 transition-colors cursor-pointer text-left group"
                          title="Xem danh sách sản phẩm đã hết hàng (Tồn 0)"
                        >
                          <span className="group-hover:text-red-900 group-hover:underline flex items-center gap-1 font-medium">
                            <span>Hết hàng (tồn 0):</span>
                          </span>
                          <strong className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-transform group-hover:scale-105 ${outOfStockCount > 0 ? 'bg-red-200 text-red-900' : 'bg-stone-200 text-stone-700'}`}>
                            {outOfStockCount} SP ↗
                          </strong>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFinancialFilterMode('loss_only');
                            setActiveScreen('financials');
                          }}
                          className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-red-100/70 transition-colors cursor-pointer text-left group"
                          title="Xem danh sách sản phẩm cảnh báo bán dưới vốn"
                        >
                          <span className="group-hover:text-red-900 group-hover:underline flex items-center gap-1 font-medium">
                            <span>Cảnh báo bán dưới vốn:</span>
                          </span>
                          <strong className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-transform group-hover:scale-105 ${lossCount > 0 ? 'bg-red-200 text-red-900' : 'bg-emerald-200 text-emerald-900'}`}>
                            {lossCount} SP ↗
                          </strong>
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveScreen('financials')}
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Kiểm tra bảng giá &amp; tồn kho</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top 5 Best Selling Products Section (V171: Có thêm cột Lợi Nhuận Tạo Ra) */}
              <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-800" />
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-stone-900 font-heading">
                        TOP 5 SẢN PHẨM BÁN CHẠY NHẤT ({dateFilterLabel})
                      </h3>
                      <p className="text-xs text-stone-500">
                        Xếp hạng dựa trên khối lượng tiêu thụ sỉ/lẻ, doanh thu và lợi nhuận thực tế
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveScreen('financials')}
                    className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Xem bảng giá chi tiết</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-3">Hạng</th>
                        <th className="py-2.5 px-3">Sản phẩm</th>
                        <th className="py-2.5 px-3">Dòng chiến lược</th>
                        <th className="py-2.5 px-3 text-right">Số lượng bán</th>
                        <th className="py-2.5 px-3 text-right">Doanh thu tạo ra</th>
                        <th className="py-2.5 px-3 text-right">Tổng giá vốn</th>
                        <th className="py-2.5 px-3 text-right bg-emerald-50/70 text-emerald-950 font-black">
                          Lợi nhuận tạo ra
                        </th>
                        <th className="py-2.5 px-3 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {topBestSellers.map((item, index) => {
                        const rankMedals = ['🥇 #1', '🥈 #2', '🥉 #3', '#4', '#5'];
                        return (
                          <tr key={item.id} className="hover:bg-[#f9fafb] transition-colors">
                            <td className="py-3 px-3">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-md font-black text-xs ${
                                  index === 0
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : index === 1
                                    ? 'bg-stone-200 text-stone-800'
                                    : index === 2
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'text-stone-500 font-medium'
                                }`}
                              >
                                {rankMedals[index] || `#${index + 1}`}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2.5 min-w-[200px]">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                                <div className="min-w-0">
                                  <p className="font-bold text-stone-900 truncate">{item.name}</p>
                                  <p className="text-[10px] text-stone-500 font-mono">Đơn vị: {item.unit}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[10px]">
                                {item.partnerName}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right font-black font-mono text-stone-900">
                              {formatCommaNumber(item.totalQty)} {item.unit}
                            </td>
                            <td className="py-3 px-3 text-right font-black font-mono text-emerald-900">
                              {formatAdminPrice(item.totalRevenue, currency, exchangeRate)}
                            </td>
                            <td className="py-3 px-3 text-right font-mono text-stone-600">
                              {item.totalCost > 0 ? (
                                <span>{formatAdminPrice(item.totalCost, currency, exchangeRate)}</span>
                              ) : (
                                <span className="text-amber-600 italic">Chưa đặt</span>
                              )}
                            </td>
                            {/* V171: Cột Lợi Nhuận Tạo Ra */}
                            <td className="py-3 px-3 text-right bg-emerald-50/40">
                              <div className="font-bold text-emerald-900 font-mono text-xs">
                                {item.totalProfit >= 0 ? '+' : ''}
                                {formatCommaNumber(item.totalProfit)} ₫
                              </div>
                              <div className="text-[10px] text-stone-500 font-mono">
                                Biên: {item.profitMargin.toFixed(1)}%
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={() => {
                                  setSelectedPartnerFilter('all');
                                  setProductSearchQuery(item.name);
                                  setActiveScreen('financials');
                                }}
                                className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[10px] transition-colors cursor-pointer"
                              >
                                Sửa Giá
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 8 Strategic Categories Overview (V262) */}
              <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs">
                <h3 className="text-sm font-black text-stone-900 mb-3 font-heading uppercase">
                  CƠ CẤU 8 DÒNG SẢN PHẨM PHÂN PHỐI CHIẾN LƯỢC
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                  {PARTNER_OPTIONS.filter((p) => p.id !== 'all').map((partner) => {
                    const count = financialsList.filter(
                      (p) =>
                        p.partnerId === partner.id ||
                        (partner.id === 'hat-qua-kho' &&
                          (p.partnerId === 'hat-dinh-duong' ||
                            p.partnerId === 'trai-cay-say' ||
                            p.partnerId === 'hu-qua-tang'))
                    ).length;
                    const partnerLossCount = financialsList.filter(
                      (p) =>
                        (p.partnerId === partner.id ||
                          (partner.id === 'hat-qua-kho' &&
                            (p.partnerId === 'hat-dinh-duong' ||
                              p.partnerId === 'trai-cay-say' ||
                              p.partnerId === 'hu-qua-tang'))) &&
                        p.hasLoss
                    ).length;
                    return (
                      <div
                        key={partner.id}
                        onClick={() => {
                          setSelectedPartnerFilter(partner.id);
                          setActiveScreen('financials');
                        }}
                        className="p-3 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-100 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-stone-900 group-hover:text-emerald-900 truncate">
                            {partner.label}
                          </p>
                          {partnerLossCount > 0 && (
                            <span className="w-2 h-2 rounded-full bg-red-600"></span>
                          )}
                        </div>
                        <p className="text-lg font-black text-stone-800 mt-1 font-mono">
                          {count} SP
                        </p>
                        <p className="text-[10px] text-stone-500 mt-0.5">
                          {partnerLossCount > 0 ? (
                            <span className="text-red-600 font-bold">⚠️ {partnerLossCount} lỗi giá</span>
                          ) : (
                            'Biên lợi nhuận ổn định'
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              MÀN HÌNH 2: QUẢN LÝ SẢN PHẨM & TÀI CHÍNH (248 SP)
             ========================================================= */}
          {activeScreen === 'financials' && (
            <div className="space-y-2 animate-in fade-in duration-150">
              {/* V257: Sticky Group - Ô tìm kiếm / Bộ lọc: Nằm ngay dưới Top Header Bar (top: 50px, z-30) */}
              <div
                ref={setFinancialsFilterNode}
                className="sticky top-[48px] sm:top-[52px] z-30 bg-[#f8faf9] pt-1 pb-1.5 shadow-2xs"
                style={{ position: 'sticky', top: '50px', zIndex: 30 }}
              >
                <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-stone-200 shadow-sm flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-2">
                  {/* Search & Category Filter */}
                  <div className="flex flex-wrap items-center gap-1.5 flex-1">
                    <div className="relative min-w-[180px] flex-1 sm:flex-initial">
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={productSearchQuery}
                        onChange={(e) => setProductSearchQuery(e.target.value)}
                        placeholder="Tìm theo tên sản phẩm, mã ID..."
                        className={`w-full pl-8 ${productSearchQuery ? 'pr-8' : 'pr-2.5'} py-1.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white transition-all`}
                      />
                      {productSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setProductSearchQuery('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer text-xs"
                          title="Xóa nội dung tìm kiếm"
                          aria-label="Xóa tìm kiếm"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Partner select */}
                    <select
                      value={selectedPartnerFilter}
                      onChange={(e) => setSelectedPartnerFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                    >
                      {PARTNER_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    {/* Financial filter mode */}
                    <select
                      value={financialFilterMode}
                      onChange={(e) => setFinancialFilterMode(e.target.value as any)}
                      className="px-2.5 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                    >
                      <option value="all">Tất cả tình trạng tài chính</option>
                      <option value="loss_only">⚠️ Chỉ SP cảnh báo LỖ (Bán &lt; Vốn)</option>
                      <option value="no_cost">Chưa có Giá Vốn</option>
                      <option value="low_stock">🔥 Sắp cháy hàng (Tồn &lt; 5)</option>
                      <option value="out_of_stock">🛑 Hết hàng (Tồn 0)</option>
                    </select>

                    {/* V254: Bộ lọc Tình trạng ảnh (Đã có / Chưa có) */}
                    <select
                      value={productImageFilter}
                      onChange={(e) => setProductImageFilter(e.target.value as any)}
                      className="px-2.5 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                      title="Lọc sản phẩm theo tình trạng ảnh"
                    >
                      <option value="all">🖼️ Tất cả ảnh ({financialsList.length})</option>
                      <option value="has_image">✓ Đã có ảnh ({financialsList.filter((p) => !isProductImageMissing(p)).length})</option>
                      <option value="no_image">⏳ Chưa có ảnh ({financialsList.filter((p) => isProductImageMissing(p)).length})</option>
                    </select>

                    <span className="text-[11px] font-bold text-stone-600 bg-stone-100 px-2 py-1 rounded-lg border border-stone-200 shrink-0">
                      Hiển thị: {filteredFinancials.length}
                    </span>
                  </div>

                  {/* Main Action Buttons: 3 nút trên cùng 1 hàng ngang dàn đều đẹp mắt (V218) */}
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
                    {/* V174: Input ẩn để nạp file CSV giá */}
                    <input
                      ref={priceFileInputRef}
                      type="file"
                      accept=".csv,text/csv"
                      onChange={handleImportPriceFile}
                      className="hidden"
                    />

                    {/* 1. 📄 NÚT "XUẤT BÁO GIÁ PDF" NỔI BẬT (Màu đỏ có icon PDF) */}
                    <button
                      type="button"
                      onClick={() => setIsQuotationModalOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white border border-red-500 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98] shrink-0"
                      title="Xuất bảng Báo Giá PDF chuyên nghiệp (Logo G-ROOSTER, MST, Hotline, Quy cách, Giá lẻ & Giá sỉ 1-2-3 kèm quyền lợi Đại lý lời)"
                    >
                      <FileText className="w-4 h-4 text-white" />
                      <span className="whitespace-nowrap">Xuất Báo Giá PDF</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/25 text-[9px] font-mono font-black uppercase">
                        PDF
                      </span>
                    </button>

                    {/* 2. 📤 Xuất file giá (CSV/Excel) */}
                    <button
                      type="button"
                      onClick={() => {
                        const currentExportList = filteredFinancials.map((item) => {
                          const edit = unsavedEdits[item.id] || {};
                          return {
                            ...item,
                            cost: edit.cost !== undefined ? edit.cost : item.cost,
                            stock: edit.stock !== undefined ? edit.stock : item.stock,
                            prices: {
                              ...item.prices,
                              retail: edit.retail !== undefined ? edit.retail : item.prices.retail,
                              wholesale1: edit.wholesale1 !== undefined ? edit.wholesale1 : item.prices.wholesale1,
                              wholesale2: edit.wholesale2 !== undefined ? edit.wholesale2 : item.prices.wholesale2,
                              wholesale3: edit.wholesale3 !== undefined ? edit.wholesale3 : item.prices.wholesale3,
                            },
                          };
                        });
                        downloadPriceCsv(currentExportList);
                        setSaveSuccessMsg('📤 Đang tải xuống file bảng giá Excel/CSV cho các sản phẩm...');
                        setTimeout(() => setSaveSuccessMsg(null), 4000);
                      }}
                      className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-[0.98] shrink-0"
                      title="Xuất bảng giá Excel/CSV 10 cột chuẩn để chỉnh sửa offline"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                      <span className="whitespace-nowrap">Xuất file giá</span>
                    </button>

                    {/* 3. 📥 Nhập file giá (CSV/Excel) */}
                    <button
                      type="button"
                      disabled={isImportingPrices}
                      onClick={() => priceFileInputRef.current?.click()}
                      className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs disabled:opacity-50 active:scale-[0.98] shrink-0"
                      title="Tải lên file Excel/CSV đã sửa để đối chiếu Mã ID và cập nhật giá mới ngay lập tức"
                    >
                      <Upload className={`w-4 h-4 text-blue-700 ${isImportingPrices ? 'animate-bounce' : ''}`} />
                      <span className="whitespace-nowrap">{isImportingPrices ? 'Đang cập nhật...' : 'Nhập file giá'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* V195: DẠNG THẺ (CARD VIEW) TỐI ƯU CUỐI CHO MOBILE & TABLET (< xl)
                  - Khoảng cách Card: gap chuẩn 16px (gap-4)
                  - Shadow: box-shadow 0 4px 6px -1px rgb(0 0 0 / 0.1) tạo độ sâu tinh tế, không nặng mắt
                  - Bo góc 12px, phân biệt rõ vùng nhập liệu
              */}
              <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-8">
                {filteredFinancials.map((item, idx) => {
                  const edit = unsavedEdits[item.id] || {};
                  const currentCost = edit.cost !== undefined ? edit.cost : item.cost;
                  const currentStock = edit.stock !== undefined ? edit.stock : (item.stock ?? 50);
                  const isLowStock = currentStock < 5;
                  const isOutOfStock = currentStock <= 0;
                  const retailPrice = edit.retail !== undefined ? edit.retail : item.prices.retail;
                  const ws1Price = edit.wholesale1 !== undefined ? edit.wholesale1 : item.prices.wholesale1;

                  const calcMargin = (p: number) => {
                    const profit = p - currentCost;
                    const pct = p > 0 ? (profit / p) * 100 : 0;
                    return { profit, marginPercent: Math.round(pct * 10) / 10, isLoss: p < currentCost };
                  };

                  const finRetail = calcMargin(retailPrice);
                  const isRowWarning = finRetail.isLoss || isLowStock;
                  const isRowModified = !!unsavedEdits[item.id];

                  return (
                    <div
                      key={item.id}
                      style={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      className={`relative bg-white rounded-[12px] border p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                        isRowWarning
                          ? 'border-red-400 bg-red-50/20 ring-1 ring-red-400/30'
                          : isRowModified
                          ? 'border-amber-400 bg-amber-50/15 ring-1 ring-amber-400/30'
                          : 'border-stone-200/90'
                      }`}
                    >
                      {/* Nút 'Làm mới' - V196: Đồng bộ màu xanh thương hiệu với nút 'Lưu thay đổi' */}
                      <button
                        type="button"
                        onClick={() => handleResetRow(item.id)}
                        disabled={refreshingRowId === item.id}
                        className={`absolute top-4 right-4 w-8 h-8 rounded-[10px] cursor-pointer transition-all duration-200 active:scale-90 flex items-center justify-center z-10 ${
                          isRowModified
                            ? 'bg-gradient-to-r from-emerald-800 via-[#06331a] to-emerald-950 text-amber-300 border-2 border-amber-400/80 shadow-xs ring-2 ring-amber-400/30'
                            : 'bg-gradient-to-r from-emerald-800 via-[#06331a] to-emerald-950 hover:from-emerald-700 hover:to-emerald-900 text-white border border-emerald-700/80 shadow-xs'
                        }`}
                        title={
                          isRowModified
                            ? 'Khôi phục giá trị trước khi sửa'
                            : 'Làm mới dữ liệu hàng này'
                        }
                        aria-label="Làm mới sản phẩm"
                      >
                        <RotateCcw
                          className={`w-3.5 h-3.5 ${
                            refreshingRowId === item.id
                              ? 'animate-spin text-amber-300'
                              : isRowModified
                              ? 'text-amber-300 hover:rotate-180 transition-transform duration-300'
                              : 'text-white hover:rotate-180 transition-transform duration-300'
                          }`}
                        />
                      </button>

                      {/* Header Card: Ảnh nhỏ + Tên SP + Đối tác + Tình trạng ảnh */}
                      <div className="flex items-start gap-2.5 pr-9 mb-3">
                        <div
                          className={`relative w-12 h-12 aspect-square rounded-[10px] overflow-hidden border shrink-0 bg-white p-0.5 flex items-center justify-center shadow-2xs ${
                            brokenImageIds.has(item.id)
                              ? 'border-2 border-red-500 bg-red-50'
                              : 'border-stone-200'
                          }`}
                          style={{ aspectRatio: '1 / 1', backgroundColor: '#ffffff' }}
                        >
                          {isProductImageMissing(item) ? (
                            <BrandedImagePlaceholder size="sm" />
                          ) : (
                            <img
                              src={item.image}
                              alt={`${cleanProductTitle(item.name)} - G-ROOSTER`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-contain"
                              style={{ objectFit: 'contain', backgroundColor: '#ffffff' }}
                              onError={(e) => {
                                setBrokenImageIds((prev) => {
                                  if (prev.has(item.id)) return prev;
                                  const next = new Set(prev);
                                  next.add(item.id);
                                  return next;
                                });
                                (e.target as HTMLImageElement).src = G_ROOSTER_FALLBACK_IMAGE;
                              }}
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[9.5px] text-emerald-800 font-medium bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/80 truncate max-w-[130px]">
                              {item.partnerName}
                            </span>
                            <span className="text-[9.5px] text-stone-400 font-mono">
                              #{idx + 1}
                            </span>
                          </div>

                          {editingNameId === item.id ? (
                            <div className="flex items-center gap-1 mt-1">
                              <input
                                type="text"
                                value={editingNameText}
                                autoFocus
                                onChange={(e) => setEditingNameText(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveInlineName(item.id);
                                  else if (e.key === 'Escape') setEditingNameId(null);
                                }}
                                className="w-full px-2 py-1 text-xs font-bold border-2 border-emerald-600 rounded-lg bg-white focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleSaveInlineName(item.id)}
                                className="p-1 rounded bg-emerald-700 text-white"
                                title="Lưu"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingNameId(null)}
                                className="p-1 rounded bg-stone-200 text-stone-700"
                                title="Hủy"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <h4
                              onClick={() => handleStartEditName(item)}
                              className="text-xs sm:text-[13px] font-bold text-stone-900 line-clamp-2 leading-snug mt-0.5 cursor-pointer hover:text-emerald-800 hover:underline flex items-center gap-1"
                              title="Bấm để sửa tên sản phẩm trực tiếp (Inline Editing)"
                            >
                              <span>{cleanProductTitle(item.name)}</span>
                              <Pencil className="w-3 h-3 text-stone-400 shrink-0 opacity-70" />
                            </h4>
                          )}

                          <span className="text-[10px] text-stone-400 font-mono mt-0.5 block">
                            ĐVT: {item.id === 'vtn-tra-xa-den' || (item.name && item.name.includes('Xạ Đen')) ? 'Hộp 150g' : item.unit}
                          </span>
                        </div>
                      </div>

                      {/* Thân Card: 2 Ô NHẬP TO, DỄ CHẠM VỚI MÀU NỀN NHẠT KHÁC BIỆT VÙNG NHẬP LIỆU */}
                      <div className="space-y-3 pt-2.5 border-t border-stone-100">
                        {/* Ô 1: TỒN KHO (Nền nhạt khác biệt với Card để Admin dễ nhận diện tức thì) */}
                        <div className="bg-stone-50/90 p-2.5 rounded-[12px] border border-stone-200/80">
                          <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wide mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <span>📦</span>
                              <span>SỐ LƯỢNG TỒN KHO</span>
                            </span>
                            <span className="text-stone-400 font-mono text-[10px] lowercase font-normal">
                              ({item.unit})
                            </span>
                          </label>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleEditCell(item.id, 'stock', Math.max(0, currentStock - 1))}
                              className="w-10 h-10 rounded-[10px] bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-black text-lg flex items-center justify-center active:scale-95 shadow-2xs cursor-pointer select-none transition-colors duration-150"
                              title="Giảm 1"
                            >
                              -
                            </button>
                            <StockInput
                              value={currentStock}
                              onChange={(val) => handleEditCell(item.id, 'stock', val)}
                              className={`flex-1 h-10 rounded-[10px] border text-center font-mono text-base font-black shadow-2xs leading-tight transition-all duration-300 ${
                                isOutOfStock
                                  ? 'border-red-500 bg-red-100 text-red-900 focus:ring-2 focus:ring-red-600'
                                  : isLowStock
                                  ? 'border-amber-500 bg-amber-100 text-amber-950 focus:ring-2 focus:ring-amber-600'
                                  : 'border-stone-300/90 bg-stone-100/90 hover:bg-white focus:bg-white text-stone-900 focus:ring-2 focus:ring-emerald-700'
                              }`}
                              title={`Tồn kho: ${currentStock.toLocaleString('en-US')} (${item.unit})`}
                            />
                            <button
                              type="button"
                              onClick={() => handleEditCell(item.id, 'stock', currentStock + 1)}
                              className="w-10 h-10 rounded-[10px] bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-black text-lg flex items-center justify-center active:scale-95 shadow-2xs cursor-pointer select-none transition-colors duration-150"
                              title="Tăng 1"
                            >
                              +
                            </button>
                          </div>

                          {isOutOfStock ? (
                            <span className="text-[10px] text-red-600 font-bold mt-1.5 block text-center">
                              🛑 Hết hàng (Tồn 0)
                            </span>
                          ) : isLowStock ? (
                            <span className="text-[10px] text-amber-700 font-bold mt-1.5 block text-center">
                              🔥 Sắp cháy hàng (Chỉ còn {currentStock} {item.unit})
                            </span>
                          ) : null}
                        </div>

                        {/* Ô 2: GIÁ LẺ (Nền nhạt khác biệt với Card để Admin dễ nhận diện) */}
                        <div
                          className={`p-2.5 rounded-[12px] border transition-all duration-300 ${
                            finRetail.isLoss
                              ? 'bg-red-50/90 border-red-300'
                              : 'bg-emerald-50/50 border-emerald-200/80'
                          }`}
                        >
                          <label className="text-[11px] font-bold text-emerald-950 uppercase tracking-wide mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1 font-black">
                              <span>🏷️</span>
                              <span>GIÁ BÁN LẺ (VNĐ)</span>
                            </span>
                            <div className="flex items-center gap-1 text-[10px] font-mono">
                              <span
                                className={
                                  finRetail.isLoss ? 'text-red-700 font-bold' : 'text-emerald-700 font-bold'
                                }
                              >
                                {finRetail.profit >= 0 ? '+' : ''}
                                {Math.abs(finRetail.profit) >= 1000
                                  ? `${Math.round(finRetail.profit / 1000)}k`
                                  : `${finRetail.profit}₫`}
                              </span>
                              <span
                                className={`px-1 py-0.2 rounded font-bold ${
                                  finRetail.isLoss
                                    ? 'bg-red-200 text-red-900'
                                    : 'bg-emerald-200 text-emerald-900'
                                }`}
                              >
                                {finRetail.marginPercent}%
                              </span>
                            </div>
                          </label>

                          <CurrencyInput
                            value={retailPrice}
                            onChange={(val) => handleEditCell(item.id, 'retail', val)}
                            className={`w-full h-10 px-3 rounded-[10px] border font-mono text-base font-black text-right shadow-2xs leading-tight transition-all duration-300 ${
                              finRetail.isLoss
                                ? 'border-red-400 bg-red-100/60 text-red-700'
                                : 'border-stone-300/90 bg-white/95 hover:bg-white focus:bg-white text-stone-900 focus:ring-2 focus:ring-emerald-700'
                            }`}
                            placeholder="Nhập giá lẻ"
                          />

                          {finRetail.isLoss && (
                            <p className="text-[10px] text-red-700 font-bold mt-1.5 flex items-center justify-end gap-1">
                              <AlertTriangle className="w-3 h-3 text-red-600 shrink-0" />
                              <span>Cảnh báo: Bán dưới giá vốn!</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Đáy Card: Giá vốn & Giá sỉ 1 tham chiếu tinh gọn + Thao tác */}
                      <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-light">
                        <div className="flex items-center gap-3">
                          <div>
                            Vốn: <strong className="font-mono text-stone-700 font-medium">{currentCost.toLocaleString('vi-VN')}₫</strong>
                          </div>
                          <div>
                            Sỉ 1: <strong className="font-mono text-stone-700 font-medium">{ws1Price.toLocaleString('vi-VN')}₫</strong>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleResetRow(item.id)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                            title="Khôi phục dòng này"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setProductToDelete(item)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-red-50 text-stone-500 hover:text-red-600 border border-stone-200 hover:border-red-300 transition-colors"
                            title="Xóa vĩnh viễn sản phẩm khỏi Database"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BẢNG DỮ LIỆU ĐẦY ĐỦ CHO MÀN HÌNH LỚN (DESKTOP >= xl) - V205: thead sticky top 60px z-99 */}
              <div className="hidden xl:block bg-white rounded-2xl border border-stone-200 shadow-sm">
                <table className="w-full text-left border-separate border-spacing-0">
                  <thead
                    className="sticky z-20 bg-stone-100 text-stone-700 font-bold uppercase tracking-wider shadow-2xs"
                    style={{
                      position: 'sticky',
                      top: `${50 + (financialsStickyTop > 0 ? financialsStickyTop : 54)}px`,
                      zIndex: 20,
                    }}
                  >
                    <tr className="text-[13px] border-b border-stone-200">
                      <th className="hidden md:table-cell py-2.5 px-2 w-[38px] text-center bg-stone-100 rounded-tl-2xl border-b border-stone-200 whitespace-nowrap">STT</th>
                      <th className="py-2.5 px-3 w-[240px] min-w-[160px] max-w-[260px] bg-stone-100 border-b border-stone-200 whitespace-nowrap rounded-tl-2xl md:rounded-none">SẢN PHẨM & DÒNG</th>
                      <th className="hidden md:table-cell py-2.5 px-2.5 w-[115px] min-w-[105px] bg-amber-50 border-x border-amber-200/60 border-b border-stone-200 text-right whitespace-nowrap">
                        <div className="flex items-center gap-1 text-amber-900 justify-end">
                          <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span>GIÁ VỐN</span>
                        </div>
                      </th>
                      <th className="py-2.5 px-2.5 w-[120px] min-w-[100px] text-right bg-stone-100 border-b border-stone-200 whitespace-nowrap">
                        GIÁ LẺ
                      </th>
                      <th className="hidden md:table-cell py-2.5 px-2.5 w-[120px] min-w-[110px] bg-stone-50 border-b border-stone-200 text-right whitespace-nowrap">
                        GIÁ SỈ 1
                      </th>
                      <th className="hidden lg:table-cell py-2.5 px-2.5 w-[120px] min-w-[110px] text-right bg-stone-100 border-b border-stone-200 whitespace-nowrap">
                        GIÁ SỈ 2
                      </th>
                      <th className="hidden lg:table-cell py-2.5 px-2.5 w-[120px] min-w-[110px] bg-stone-50 border-b border-stone-200 text-right whitespace-nowrap">
                        GIÁ SỈ 3
                      </th>
                      <th className="py-2.5 pl-2.5 pr-5 w-[115px] min-w-[100px] text-center bg-stone-100 font-bold text-stone-900 border-x border-b border-stone-200 whitespace-nowrap">
                        TỒN KHO
                      </th>
                      <th className="py-2.5 px-2 w-[85px] min-w-[80px] text-center font-bold uppercase tracking-wider text-[13px] rounded-tr-2xl bg-stone-100 border-b border-stone-200 text-stone-700 whitespace-nowrap">
                        THAO TÁC
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 [&>tr>td]:border-b [&>tr>td]:border-stone-200">
                      {filteredFinancials.map((item, idx) => {
                        const edit = unsavedEdits[item.id] || {};
                        const currentCost = edit.cost !== undefined ? edit.cost : item.cost;
                        const currentStock = edit.stock !== undefined ? edit.stock : (item.stock ?? 50);
                        const isLowStock = currentStock < 5;
                        const isOutOfStock = currentStock <= 0;
                        const retailPrice = edit.retail !== undefined ? edit.retail : item.prices.retail;
                        const ws1Price = edit.wholesale1 !== undefined ? edit.wholesale1 : item.prices.wholesale1;
                        const ws2Price = edit.wholesale2 !== undefined ? edit.wholesale2 : item.prices.wholesale2;
                        const ws3Price = edit.wholesale3 !== undefined ? edit.wholesale3 : item.prices.wholesale3;

                        // Recompute financial metrics live for unsaved or saved values
                        const calcMargin = (p: number) => {
                          const profit = p - currentCost;
                          const pct = p > 0 ? (profit / p) * 100 : 0;
                          return { profit, marginPercent: Math.round(pct * 10) / 10, isLoss: p < currentCost };
                        };

                        const finRetail = calcMargin(retailPrice);
                        const finWs1 = calcMargin(ws1Price);
                        const finWs2 = calcMargin(ws2Price);
                        const finWs3 = calcMargin(ws3Price);

                        const hasAnyLoss =
                          finRetail.isLoss || finWs1.isLoss || finWs2.isLoss || finWs3.isLoss;
                        const isRowWarning = hasAnyLoss || isLowStock;
                        const isRowModified = !!unsavedEdits[item.id];

                        return (
                          <tr
                            key={item.id}
                            className={`transition-colors group align-top ${
                              isRowWarning
                                ? 'bg-red-50/80 hover:bg-red-100/90 text-red-950 font-medium border-l-4 border-red-600'
                                : isRowModified
                                ? 'bg-amber-50/40 hover:bg-amber-100/60'
                                : 'hover:bg-[#f9fafb]'
                            }`}
                          >
                            {/* 1. STT - Ẩn trên Mobile (<768px) để giảm tải DOM */}
                            <td className="hidden md:table-cell py-2.5 px-2 text-center font-mono text-stone-400 text-[14px] w-[38px] align-top pt-3">
                              {idx + 1}
                            </td>

                            {/* 2. Product Info (Tối ưu 160px - 250px) */}
                            <td className="py-2.5 px-3 w-[220px] min-w-[150px] max-w-[240px] align-top pt-2.5">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`relative w-9 h-9 aspect-square rounded-lg overflow-hidden border shrink-0 bg-white p-0.5 flex items-center justify-center ${
                                    brokenImageIds.has(item.id)
                                      ? 'border-2 border-red-500 ring-2 ring-red-400 bg-red-50'
                                      : 'border border-stone-200'
                                  }`}
                                  style={{ aspectRatio: '1 / 1', backgroundColor: '#ffffff' }}
                                >
                                  {isProductImageMissing(item) ? (
                                    <BrandedImagePlaceholder size="sm" />
                                  ) : (
                                    <img
                                      src={item.image}
                                      alt={`${cleanProductTitle(item.name)} - G-ROOSTER`}
                                      loading="lazy"
                                      decoding="async"
                                      className="w-full h-full object-contain"
                                      style={{ objectFit: 'contain', backgroundColor: '#ffffff' }}
                                      onError={(e) => {
                                        setBrokenImageIds((prev) => {
                                          if (prev.has(item.id)) return prev;
                                          const next = new Set(prev);
                                          next.add(item.id);
                                          return next;
                                        });
                                        (e.target as HTMLImageElement).src = G_ROOSTER_FALLBACK_IMAGE;
                                      }}
                                    />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  {editingNameId === item.id ? (
                                    <div className="flex items-center gap-1">
                                      <input
                                        type="text"
                                        value={editingNameText}
                                        autoFocus
                                        onChange={(e) => setEditingNameText(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') handleSaveInlineName(item.id);
                                          else if (e.key === 'Escape') setEditingNameId(null);
                                        }}
                                        className="w-full px-2 py-1 text-xs font-bold border-2 border-emerald-600 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 shadow-sm"
                                        placeholder="Nhập tên sản phẩm mới..."
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleSaveInlineName(item.id)}
                                        className="p-1 rounded bg-emerald-700 text-white hover:bg-emerald-800 transition-colors cursor-pointer shrink-0"
                                        title="Lưu tên"
                                      >
                                        <Check className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setEditingNameId(null)}
                                        className="p-1 rounded bg-stone-200 text-stone-700 hover:bg-stone-300 transition-colors cursor-pointer shrink-0"
                                        title="Hủy"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() => handleStartEditName(item)}
                                      className="group/name cursor-pointer flex items-center gap-1"
                                      title="Bấm để sửa tên sản phẩm trực tiếp (Inline Editing)"
                                    >
                                      <p className="font-bold text-stone-900 group-hover/name:text-emerald-800 group-hover/name:underline line-clamp-2 leading-snug text-[13px] transition-colors">
                                        <span>{cleanProductTitle(item.name)}</span>
                                        {brokenImageIds.has(item.id) && (
                                          <span className="ml-1 text-[9px] text-red-700 font-extrabold bg-red-100 px-1 py-0.2 rounded border border-red-300 animate-pulse shrink-0">
                                            ⚠️ Link lỗi
                                          </span>
                                        )}
                                      </p>
                                      <Pencil className="w-3 h-3 text-stone-400 group-hover/name:text-emerald-600 opacity-0 group-hover/name:opacity-100 transition-opacity shrink-0" />
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[9px] text-emerald-800 font-medium bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 truncate max-w-[120px]">
                                      {item.partnerName}
                                    </span>
                                    <span className="text-[9px] text-stone-400 font-mono shrink-0">
                                      {item.id === 'vtn-tra-xa-den' || (item.name && item.name.includes('Xạ Đen')) ? 'Hộp 150g' : item.unit}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* 3. Cost Input (Giá Vốn - Ẩn trên Mobile (<768px), hiện trên Tablet & Desktop) */}
                            <td className="hidden md:table-cell py-2.5 px-2.5 bg-amber-50/40 group-hover:bg-amber-50/70 border-x border-amber-200/50 text-right w-[115px] align-top pt-2.5">
                              <div className="flex flex-col items-end">
                                <CurrencyInput
                                  value={currentCost}
                                  onChange={(val) =>
                                    handleEditCell(item.id, 'cost', val)
                                  }
                                  className="w-[90px] h-[30px] px-2 py-1 rounded border border-amber-300 font-mono text-[14px] font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white text-right shadow-2xs leading-tight"
                                  placeholder="0"
                                />
                                <span className="text-[8px] text-stone-400 font-mono mt-0.5 pr-0.5">
                                  VNĐ
                                </span>
                              </div>
                            </td>

                            {/* 4. Retail Price Column (Giá lẻ - Align Top) */}
                            <td className="py-2.5 px-2.5 text-right w-[120px] align-top pt-2.5">
                              <div
                                className={`rounded ${
                                  finRetail.isLoss
                                    ? 'bg-red-100 border border-red-300 p-0.5 text-red-900'
                                    : ''
                                }`}
                              >
                                <CurrencyInput
                                  value={retailPrice}
                                  onChange={(val) =>
                                    handleEditCell(item.id, 'retail', val)
                                  }
                                  className={`w-[90px] h-[30px] px-2 py-1 rounded border font-mono text-[14px] font-bold text-right shadow-2xs leading-tight ${
                                    finRetail.isLoss
                                      ? 'border-red-400 bg-white text-red-700'
                                      : 'border-stone-300 bg-white text-stone-900 focus:ring-1 focus:ring-emerald-700'
                                  }`}
                                />
                                <div className="flex items-center justify-between text-[10px] mt-0.5 font-mono w-[90px] ml-auto">
                                  <span
                                    className={
                                      finRetail.isLoss
                                        ? 'text-red-700 font-bold'
                                        : 'text-emerald-700 font-medium'
                                    }
                                  >
                                    {finRetail.profit >= 0 ? '+' : ''}
                                    {Math.abs(finRetail.profit) >= 1000 ? `${Math.round(finRetail.profit / 1000)}k` : `${finRetail.profit}₫`}
                                  </span>
                                  <span
                                    className={`px-1 py-0.2 rounded font-bold ${
                                      finRetail.isLoss
                                        ? 'bg-red-200 text-red-900'
                                        : 'bg-emerald-100 text-emerald-800'
                                    }`}
                                  >
                                    {finRetail.marginPercent}%
                                  </span>
                                </div>
                                {finRetail.isLoss && (
                                  <p className="text-[8px] text-red-700 font-bold mt-0.2 flex items-center justify-end gap-0.5">
                                    <AlertTriangle className="w-2.5 h-2.5" />
                                    <span>LỖ</span>
                                  </p>
                                )}
                              </div>
                            </td>

                            {/* 5. Wholesale 1 (Giá sỉ 1 - Ẩn trên Mobile (<768px), hiện trên Tablet & Desktop) */}
                            <td className="hidden md:table-cell py-2.5 px-2.5 bg-stone-50/50 group-hover:bg-transparent text-right w-[120px] align-top pt-2.5">
                              <div
                                className={`rounded ${
                                  finWs1.isLoss
                                    ? 'bg-red-100 border border-red-300 p-0.5 text-red-900'
                                    : ''
                                }`}
                              >
                                <CurrencyInput
                                  value={ws1Price}
                                  onChange={(val) =>
                                    handleEditCell(item.id, 'wholesale1', val)
                                  }
                                  className={`w-[90px] h-[30px] px-2 py-1 rounded border font-mono text-[14px] font-bold text-right shadow-2xs leading-tight ${
                                    finWs1.isLoss
                                      ? 'border-red-400 bg-white text-red-700'
                                      : 'border-stone-300 bg-white text-stone-900 focus:ring-1 focus:ring-emerald-700'
                                  }`}
                                />
                                <div className="flex items-center justify-between text-[10px] mt-0.5 font-mono w-[90px] ml-auto">
                                  <span
                                    className={
                                      finWs1.isLoss
                                        ? 'text-red-700 font-bold'
                                        : 'text-emerald-700 font-medium'
                                    }
                                  >
                                    {finWs1.profit >= 0 ? '+' : ''}
                                    {Math.abs(finWs1.profit) >= 1000 ? `${Math.round(finWs1.profit / 1000)}k` : `${finWs1.profit}₫`}
                                  </span>
                                  <span
                                    className={`px-1 py-0.2 rounded font-bold ${
                                      finWs1.isLoss
                                        ? 'bg-red-200 text-red-900'
                                        : 'bg-emerald-100 text-emerald-800'
                                    }`}
                                  >
                                    {finWs1.marginPercent}%
                                  </span>
                                </div>
                                {finWs1.isLoss && (
                                  <p className="text-[8px] text-red-700 font-bold mt-0.2 flex items-center justify-end gap-0.5">
                                    <AlertTriangle className="w-2.5 h-2.5" />
                                    <span>LỖ</span>
                                  </p>
                                )}
                              </div>
                            </td>

                            {/* 6. Wholesale 2 (Giá sỉ 2 - Ẩn trên Mobile & Tablet (<1024px), hiện trên Desktop) */}
                            <td className="hidden lg:table-cell py-2.5 px-2.5 text-right w-[120px] align-top pt-2.5">
                              <div
                                className={`rounded ${
                                  finWs2.isLoss
                                    ? 'bg-red-100 border border-red-300 p-0.5 text-red-900'
                                    : ''
                                }`}
                              >
                                <CurrencyInput
                                  value={ws2Price}
                                  onChange={(val) =>
                                    handleEditCell(item.id, 'wholesale2', val)
                                  }
                                  className={`w-[90px] h-[30px] px-2 py-1 rounded border font-mono text-[14px] font-bold text-right shadow-2xs leading-tight ${
                                    finWs2.isLoss
                                      ? 'border-red-400 bg-white text-red-700'
                                      : 'border-stone-300 bg-white text-stone-900 focus:ring-1 focus:ring-emerald-700'
                                  }`}
                                />
                                <div className="flex items-center justify-between text-[10px] mt-0.5 font-mono w-[90px] ml-auto">
                                  <span
                                    className={
                                      finWs2.isLoss
                                        ? 'text-red-700 font-bold'
                                        : 'text-emerald-700 font-medium'
                                    }
                                  >
                                    {finWs2.profit >= 0 ? '+' : ''}
                                    {Math.abs(finWs2.profit) >= 1000 ? `${Math.round(finWs2.profit / 1000)}k` : `${finWs2.profit}₫`}
                                  </span>
                                  <span
                                    className={`px-1 py-0.2 rounded font-bold ${
                                      finWs2.isLoss
                                        ? 'bg-red-200 text-red-900'
                                        : 'bg-emerald-100 text-emerald-800'
                                    }`}
                                  >
                                    {finWs2.marginPercent}%
                                  </span>
                                </div>
                                {finWs2.isLoss && (
                                  <p className="text-[8px] text-red-700 font-bold mt-0.2 flex items-center justify-end gap-0.5">
                                    <AlertTriangle className="w-2.5 h-2.5" />
                                    <span>LỖ</span>
                                  </p>
                                )}
                              </div>
                            </td>

                            {/* 7. Wholesale 3 (Giá sỉ 3 - Ẩn trên Mobile & Tablet (<1024px), hiện trên Desktop) */}
                            <td className="hidden lg:table-cell py-2.5 px-2.5 bg-stone-50/50 group-hover:bg-transparent text-right w-[120px] align-top pt-2.5">
                              <div
                                className={`rounded ${
                                  finWs3.isLoss
                                    ? 'bg-red-100 border border-red-300 p-0.5 text-red-900'
                                    : ''
                                }`}
                              >
                                <CurrencyInput
                                  value={ws3Price}
                                  onChange={(val) =>
                                    handleEditCell(item.id, 'wholesale3', val)
                                  }
                                  className={`w-[90px] h-[30px] px-2 py-1 rounded border font-mono text-[14px] font-bold text-right shadow-2xs leading-tight ${
                                    finWs3.isLoss
                                      ? 'border-red-400 bg-white text-red-700'
                                      : 'border-stone-300 bg-white text-stone-900 focus:ring-1 focus:ring-emerald-700'
                                  }`}
                                />
                                <div className="flex items-center justify-between text-[10px] mt-0.5 font-mono w-[90px] ml-auto">
                                  <span
                                    className={
                                      finWs3.isLoss
                                        ? 'text-red-700 font-bold'
                                        : 'text-emerald-700 font-medium'
                                    }
                                  >
                                    {finWs3.profit >= 0 ? '+' : ''}
                                    {Math.abs(finWs3.profit) >= 1000 ? `${Math.round(finWs3.profit / 1000)}k` : `${finWs3.profit}₫`}
                                  </span>
                                  <span
                                    className={`px-1 py-0.2 rounded font-bold ${
                                      finWs3.isLoss
                                        ? 'bg-red-200 text-red-900'
                                        : 'bg-emerald-100 text-emerald-800'
                                    }`}
                                  >
                                    {finWs3.marginPercent}%
                                  </span>
                                </div>
                                {finWs3.isLoss && (
                                  <p className="text-[8px] text-red-700 font-bold mt-0.2 flex items-center justify-end gap-0.5">
                                    <AlertTriangle className="w-2.5 h-2.5" />
                                    <span>LỖ</span>
                                  </p>
                                )}
                              </div>
                            </td>

                            {/* 8. Stock Column (V217: Nới rộng +30px, padding-right an toàn, định dạng dấu phẩy hàng nghìn, Align Top chuẩn xác) */}
                            <td className="py-2.5 pl-2.5 pr-5 text-center bg-stone-50/40 group-hover:bg-transparent border-x border-stone-200/60 font-mono w-[115px] min-w-[100px] align-top pt-2.5">
                              <div className="flex items-center justify-center">
                                <StockInput
                                  value={currentStock}
                                  onChange={(val) => handleEditCell(item.id, 'stock', val)}
                                  className={`w-[78px] sm:w-[84px] h-[30px] px-2 py-1 rounded border text-center font-mono text-[14px] font-black shadow-2xs leading-tight ${
                                    isOutOfStock
                                      ? 'border-red-500 bg-red-100 text-red-900 focus:ring-1 focus:ring-red-600'
                                      : isLowStock
                                      ? 'border-amber-500 bg-amber-100 text-amber-950 focus:ring-1 focus:ring-amber-600'
                                      : 'border-stone-300 bg-white text-stone-900 focus:ring-1 focus:ring-emerald-700'
                                  }`}
                                  title={`Số lượng tồn kho: ${currentStock.toLocaleString('en-US')} (${item.unit})`}
                                />
                              </div>
                            </td>

                            {/* 9. Actions Column (V191 & V255: Nút khôi phục và nút xóa vĩnh viễn sản phẩm) */}
                            <td className="py-2.5 px-1.5 text-center w-[85px] bg-transparent border-b border-stone-200 align-top pt-2.5">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleResetRow(item.id)}
                                  disabled={refreshingRowId === item.id}
                                  className={`w-[30px] h-[30px] p-1.5 rounded-lg cursor-pointer transition-all duration-150 active:scale-95 flex items-center justify-center ${
                                    isRowModified
                                      ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 shadow-2xs hover:shadow-xs font-bold'
                                      : 'bg-stone-100 hover:bg-emerald-50 text-stone-600 hover:text-emerald-700 border border-stone-200 hover:border-emerald-300 shadow-2xs hover:shadow-xs'
                                  }`}
                                  title={
                                    isRowModified
                                      ? 'Khôi phục giá trị trước khi sửa (Hủy thay đổi chưa lưu)'
                                      : 'Làm mới dữ liệu hàng này từ cơ sở dữ liệu'
                                  }
                                >
                                  <RotateCcw
                                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                                      refreshingRowId === item.id ? 'animate-spin text-emerald-600' : 'hover:rotate-180'
                                    }`}
                                  />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setProductToDelete(item)}
                                  className="w-[30px] h-[30px] p-1.5 rounded-lg cursor-pointer transition-all duration-150 active:scale-95 flex items-center justify-center bg-stone-100 hover:bg-red-50 text-stone-500 hover:text-red-600 border border-stone-200 hover:border-red-300 shadow-2xs hover:shadow-xs"
                                  title="Xóa vĩnh viễn sản phẩm này khỏi Database"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
          )}

          {/* =========================================================
              MÀN HÌNH 3: QUẢN LÝ BỘ SƯU TẬP ẢNH
             ========================================================= */}
          {activeScreen === 'images' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Header Title Bar */}
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-stone-900 font-heading tracking-tight uppercase">
                    QUẢN LÝ BỘ SƯU TẬP ẢNH
                  </h3>
                  <p className="text-xs text-stone-500">
                    Cập nhật và sắp xếp hình ảnh thực tế cho 248 sản phẩm trên toàn hệ thống
                  </p>
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  Hiển thị: <strong className="text-stone-900">{filteredImages.length}</strong> / 248 sản phẩm
                </div>
              </div>

              {/* V257: Sticky Group - Thanh tìm kiếm & Bộ lọc ảnh dính dưới Header (top: 50px, z-30) */}
              <div
                className="sticky top-[48px] sm:top-[52px] z-30 bg-[#f8faf9] pt-1 pb-2 shadow-2xs"
                style={{ position: 'sticky', top: '50px', zIndex: 30 }}
              >
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col gap-3">
                  <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="relative min-w-[240px] flex-1">
                        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={imageSearchQuery}
                          onChange={(e) => setImageSearchQuery(e.target.value)}
                          placeholder="Tìm kiếm sản phẩm để thay ảnh..."
                          className={`w-full pl-9 ${imageSearchQuery ? 'pr-9' : 'pr-3'} py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white transition-all`}
                        />
                        {imageSearchQuery && (
                          <button
                            type="button"
                            onClick={() => setImageSearchQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer text-xs"
                            title="Xóa nội dung tìm kiếm"
                            aria-label="Xóa tìm kiếm"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      <select
                        value={imagePartnerFilter}
                        onChange={(e) => setImagePartnerFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                      >
                        {PARTNER_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Auto-Check Button & Count */}
                    <div className="flex items-center gap-2.5 justify-between lg:justify-end">
                      <button
                        type="button"
                        onClick={handleRunAutoCheckImages}
                        disabled={isAutoCheckingImages}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs whitespace-nowrap ${
                          isAutoCheckingImages
                            ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                            : 'bg-[#062415] hover:bg-stone-900 text-amber-300 active:scale-95'
                        }`}
                        title="Tự động kiểm tra toàn bộ link ảnh xem có bị lỗi 404 không"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isAutoCheckingImages ? 'animate-spin text-amber-400' : ''}`} />
                        <span>{isAutoCheckingImages ? 'Đang Auto-Check...' : '🔍 Quét Lỗi Link Ảnh (Auto-Check)'}</span>
                      </button>
                      <div className="text-xs text-stone-500 font-medium shrink-0">
                        Hiển thị: <strong className="text-stone-900">{filteredImages.length}</strong> / 248 SP
                      </div>
                    </div>
                  </div>

                  {/* Sub-filters: Tất cả, Link ảnh bị hỏng, Ảnh tùy chỉnh */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-stone-100 text-xs">
                    <span className="text-stone-500 font-bold mr-1">Bộ Lọc Trạng Thái:</span>
                    <button
                      type="button"
                      onClick={() => setImageStatusFilter('all')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        imageStatusFilter === 'all'
                          ? 'bg-[#062415] text-amber-300 shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      Tất cả ({financialsList.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageStatusFilter('has_image')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        imageStatusFilter === 'has_image'
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      <span>✓ Đã có ảnh</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${imageStatusFilter === 'has_image' ? 'bg-white/20' : 'bg-emerald-100 text-emerald-900 font-bold'}`}>
                        {financialsList.filter((p) => !isProductImageMissing(p)).length}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageStatusFilter('no_image')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        imageStatusFilter === 'no_image'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      <span>⏳ Chưa có ảnh</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${imageStatusFilter === 'no_image' ? 'bg-white/20' : 'bg-amber-100 text-amber-900 font-bold'}`}>
                        {financialsList.filter((p) => isProductImageMissing(p)).length}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageStatusFilter('broken')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        imageStatusFilter === 'broken'
                          ? 'bg-red-600 text-white shadow-xs'
                          : brokenImageIds.size > 0
                          ? 'bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 animate-pulse font-extrabold'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      <span>⚠️ Link ảnh bị hỏng</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${imageStatusFilter === 'broken' ? 'bg-white/20' : 'bg-red-200 text-red-900 font-bold'}`}>
                        {brokenImageIds.size}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageStatusFilter('custom')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        imageStatusFilter === 'custom'
                          ? 'bg-[#062415] text-amber-300 shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      Ảnh Tùy Chỉnh ({financialsList.filter((p) => p.isCustomImage).length})
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Scanner Banner */}
              {isAutoCheckingImages && autoCheckProgress && (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 flex flex-col gap-1.5 animate-in fade-in shadow-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span>Đang tự động quét kiểm tra tính khả dụng link ảnh ({autoCheckProgress.current}/{autoCheckProgress.total} sản phẩm)...</span>
                    <span>{Math.round((autoCheckProgress.current / autoCheckProgress.total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-amber-600 h-1.5 rounded-full transition-all duration-200"
                      style={{ width: `${(autoCheckProgress.current / autoCheckProgress.total) * 100}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-amber-800">
                    Phát hiện lỗi: <strong>{autoCheckProgress.brokenCount} link ảnh không khả dụng (404/chết)</strong>
                  </div>
                </div>
              )}

              {/* V177: Banner cảnh báo ảnh hỏng */}
              {brokenImageIds.size > 0 && (
                <div className="p-3.5 bg-red-100 border border-red-300 rounded-2xl text-xs text-red-950 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 animate-bounce" />
                    <span>
                      <strong>⚠️ CẢNH BÁO HỆ THỐNG:</strong> Phát hiện <strong>{brokenImageIds.size} sản phẩm</strong> có đường link hình ảnh bị lỗi (404 hoặc không hiển thị được). Khung sản phẩm đã được <strong>TÔ ĐỎ</strong> và tự động áp dụng ảnh dự phòng chính thức G-ROOSTER. Vui lòng bấm Quản Lý Ảnh để cập nhật URL mới!
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setImageStatusFilter(imageStatusFilter === 'broken' ? 'all' : 'broken')}
                    className="px-3 py-1 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shrink-0 cursor-pointer transition-colors shadow-2xs"
                  >
                    {imageStatusFilter === 'broken' ? 'Hiện Tất Cả' : 'Chỉ Xem Ảnh Lỗi'}
                  </button>
                </div>
              )}

              {/* Image Grid - Equal Height Cards (V182) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 items-stretch">
                {filteredImages.map((product) => {
                  const galleryCount = product.images?.length || 1;
                  const hasMultiImages = product.images && product.images.length > 1;
                  const isImageBroken = brokenImageIds.has(product.id);

                  return (
                    <div
                      key={product.id}
                      className={`bg-white rounded-2xl border p-3.5 shadow-xs flex flex-col h-full justify-between transition-all group ${
                        isImageBroken
                          ? 'border-2 border-red-500 ring-4 ring-red-400/40 bg-red-50/25'
                          : 'border-stone-200 hover:border-emerald-600'
                      }`}
                    >
                      <div className="flex flex-col flex-1">
                        {/* Image Preview Box: Tỷ lệ cố định 1:1 (aspect-square) */}
                        <div
                          onClick={() => {
                            const imgs = product.images && product.images.length > 0 ? product.images : [product.image];
                            setLightboxData({
                              src: product.image,
                              productName: product.name,
                              partnerName: product.partnerName,
                              currentIndex: 0,
                              imagesList: imgs,
                            });
                            setLightboxZoom(1);
                          }}
                          className={`relative aspect-square w-full rounded-xl overflow-hidden bg-white border p-2 mb-2 cursor-zoom-in group/img shrink-0 flex items-center justify-center ${
                            isImageBroken ? 'border-2 border-red-500 shadow-xs' : 'border-stone-200'
                          }`}
                          style={{ aspectRatio: '1 / 1', backgroundColor: '#ffffff' }}
                          title="Click để phóng to ảnh xem chi tiết tem nhãn & giấy chứng nhận"
                        >
                          {isProductImageMissing(product) ? (
                            <BrandedImagePlaceholder size="md" />
                          ) : (
                            <img
                              src={product.image}
                              alt={`${cleanProductTitle(product.name)} - G-ROOSTER`}
                              className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-300"
                              style={{ objectFit: 'contain', backgroundColor: '#ffffff' }}
                              onError={(e) => {
                                setBrokenImageIds((prev) => {
                                  if (prev.has(product.id)) return prev;
                                  const next = new Set(prev);
                                  next.add(product.id);
                                  return next;
                                });
                                (e.target as HTMLImageElement).src = G_ROOSTER_FALLBACK_IMAGE;
                              }}
                            />
                          )}
                          {/* Nút PHÓNG TO HD - V265: z-index 999, kích hoạt Lightbox toàn màn hình, 100% click được */}
                          <div className="absolute inset-0 flex items-center justify-center p-2 z-[999]" style={{ zIndex: 999 }}>
                            <button
                              type="button"
                              style={{ zIndex: 999 }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const imgs = product.images && product.images.length > 0 ? product.images : [product.image];
                                setLightboxData({
                                  src: product.image,
                                  productName: product.name,
                                  partnerName: product.partnerName,
                                  currentIndex: 0,
                                  imagesList: imgs,
                                });
                                setLightboxZoom(1);
                              }}
                              className="px-2.5 py-1.5 rounded-xl bg-black/85 hover:bg-black text-white text-[11px] font-bold flex items-center gap-1.5 shadow-xl border border-white/30 cursor-pointer active:scale-95 transition-all hover:scale-105"
                              title="Click để phóng to ảnh xem chi tiết HD"
                            >
                              <ZoomIn className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                              <span>Phóng to HD</span>
                            </button>
                          </div>

                          {/* Badges */}
                          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end pointer-events-none">
                            {isImageBroken && (
                              <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-red-600 text-white shadow-md animate-pulse border border-white/30 flex items-center gap-1">
                                <span>⚠️ Link ảnh bị hỏng</span>
                              </span>
                            )}
                            {/* V254: Badge Tình trạng ảnh (Đã có / Chưa có) */}
                            {isProductImageMissing(product) ? (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-white shadow-xs">
                                ⏳ Chưa có ảnh
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-600 text-white shadow-xs flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                                <span>Đã có ảnh</span>
                              </span>
                            )}
                            {product.isCustomImage && !isImageBroken && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-400 text-stone-950 shadow-xs">
                                Ảnh Tùy Chỉnh
                              </span>
                            )}
                            {hasMultiImages && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-950/80 text-amber-300 shadow-xs backdrop-blur-xs flex items-center gap-1 font-mono">
                                <span>📸</span>
                                <span>{galleryCount} ảnh</span>
                              </span>
                            )}
                          </div>

                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs pointer-events-none">
                            {product.partnerName}
                          </span>
                        </div>

                        {/* V177: Cảnh báo chi tiết dưới ô xem ảnh khi link hỏng */}
                        {isImageBroken && (
                          <div className="p-2 mb-2 bg-red-100/90 border border-red-300 rounded-xl text-[11px] text-red-950 font-bold flex items-center gap-1.5 shadow-2xs">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                            <span className="leading-tight">⚠️ Link ảnh bị hỏng - Đang dùng ảnh dự phòng G-ROOSTER</span>
                          </div>
                        )}

                        {/* Gallery Thumbnails Strip (nếu sản phẩm có từ 2 ảnh trở lên) */}
                        {hasMultiImages && (
                          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 mb-2">
                            {product.images!.slice(0, 5).map((thumbUrl, thumbIdx) => (
                              <div
                                key={thumbIdx}
                                onClick={() => {
                                  const imgs = product.images && product.images.length > 0 ? product.images : [product.image];
                                  setLightboxData({
                                    src: thumbUrl,
                                    productName: product.name,
                                    partnerName: product.partnerName,
                                    currentIndex: thumbIdx,
                                    imagesList: imgs,
                                  });
                                  setLightboxZoom(1);
                                }}
                                className={`w-8 h-8 rounded-lg overflow-hidden border bg-white shrink-0 cursor-zoom-in transition-transform hover:scale-110 ${
                                  thumbIdx === 0 ? 'border-emerald-600 ring-1 ring-emerald-500' : 'border-stone-200 opacity-75 hover:opacity-100'
                                }`}
                                title={thumbIdx === 0 ? 'Click xem ảnh chính phóng to' : `Click xem ảnh #${thumbIdx + 1} phóng to`}
                              >
                                <img
                                  src={thumbUrl}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = product.image;
                                  }}
                                />
                              </div>
                            ))}
                            {galleryCount > 5 && (
                              <span className="text-[10px] font-mono text-stone-500 font-bold px-1">
                                +{galleryCount - 5}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Product Name (V182: Tối đa 2 dòng kèm dấu ba chấm) */}
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-tight min-h-[2.25rem]">
                          {cleanProductTitle(product.name)}
                        </h4>
                        <p className="text-[10px] text-stone-500 font-mono mt-0.5">
                          ID: {product.id} • {product.unit}
                        </p>
                      </div>

                      {/* Action buttons (V182: Luôn nằm thẳng hàng ở dưới cùng card) */}
                      <div className="pt-3 mt-auto border-t border-stone-100 flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setSelectedProductForUpload(product);
                            const currentImgs =
                              product.images && product.images.length > 0
                                ? [...product.images]
                                : product.image
                                ? [product.image]
                                : [];
                            setTempImagesList(currentImgs);
                            setCustomImageUrlInput('');
                          }}
                          className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                          title="Quản lý và cập nhật bộ sưu tập ảnh cho sản phẩm này"
                        >
                          <Upload className="w-3.5 h-3.5 text-amber-300" />
                          <span>Quản Lý Ảnh {hasMultiImages ? `(${galleryCount})` : ''}</span>
                        </button>

                        {product.isCustomImage && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Khôi phục ảnh và bộ sưu tập mặc định cho "${product.name}"?`)) {
                                saveSingleProductAdminData(product.id, {
                                  image: undefined,
                                  images: undefined,
                                });
                                setSaveSuccessMsg('Đã khôi phục bộ ảnh mặc định!');
                                setTimeout(() => setSaveSuccessMsg(null), 2500);
                              }
                            }}
                            className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                            title="Khôi phục ảnh mặc định từ hệ thống"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =========================================================
              MÀN HÌNH 4: QUẢN LÝ ĐƠN HÀNG (ORDERS MANAGEMENT)
             ========================================================= */}
          {activeScreen === 'orders' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Notification Banner: Email Company Sync */}
              <div className="p-3 bg-gradient-to-r from-emerald-950 via-[#0a3520] to-stone-900 rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-sm border border-emerald-800/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-200">
                      Đồng bộ đơn hàng &amp; Email khách hàng 2 chiều
                    </p>
                    <p className="text-[11px] text-stone-300">
                      Tất cả đơn hàng mới (kèm Email, SĐT, Địa chỉ) được gửi lưu trữ về hòm thư công ty: <strong className="text-white font-mono">groostercompany@gmail.com</strong>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center flex-wrap">
                  <button
                    type="button"
                    onClick={handleExportAccountingReport}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap border border-emerald-400/40"
                    title="Xuất dữ liệu đơn hàng chi tiết ra file Excel/CSV chuẩn kế toán"
                  >
                    <span>Xuất Báo Cáo Excel/CSV</span>
                  </button>
                  <div className="text-[11px] font-mono bg-white/10 px-3 py-1.5 rounded-xl text-emerald-200 font-bold shrink-0">
                    Tổng {filteredOrders.length} / {orders.length} Đơn
                  </div>
                </div>
              </div>

              {/* V257: Sticky Group - Thanh trạng thái & Ô tìm kiếm đơn hàng dính dưới Header (top: 50px, z-30) */}
              <div
                className="sticky top-[48px] sm:top-[52px] z-30 bg-[#f8faf9] pt-1 pb-2 shadow-2xs"
                style={{ position: 'sticky', top: '50px', zIndex: 30 }}
              >
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Status Tabs */}
                  <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
                    {[
                      { id: 'all', label: 'Tất cả' },
                      { id: 'pending_payment', label: 'Chờ thanh toán' },
                      { id: 'confirmed', label: 'Đã xác nhận' },
                      { id: 'packing', label: 'Đóng gói' },
                      { id: 'shipping', label: 'Đang giao' },
                      { id: 'completed', label: 'Hoàn tất' },
                    ].map((tab) => {
                      const isSelected = orderStatusFilter === tab.id;
                      const count =
                        tab.id === 'all'
                          ? orders.length
                          : orders.filter((o) => o.status === tab.id).length;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setOrderStatusFilter(tab.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-[#062415] text-amber-300 shadow-xs'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          <span>{tab.label}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                              isSelected ? 'bg-amber-400/30 text-amber-200' : 'bg-white text-stone-600'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Search */}
                  <div className="relative min-w-[220px]">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={orderSearchQuery}
                      onChange={(e) => setOrderSearchQuery(e.target.value)}
                      placeholder="Tìm theo mã, tên khách, SĐT, Email..."
                      className={`w-full pl-9 ${orderSearchQuery ? 'pr-9' : 'pr-3'} py-1.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white transition-all`}
                    />
                    {orderSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setOrderSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer text-xs"
                        title="Xóa nội dung tìm kiếm"
                        aria-label="Xóa tìm kiếm"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* V178: Cảnh báo đơn trùng lặp tổng quan */}
              {duplicateOrderMap.size > 0 && (
                <div className="p-3 bg-red-600 text-white rounded-2xl flex items-center justify-between gap-3 shadow-md animate-pulse">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>
                      PHÁT HIỆN {duplicateOrderMap.size} ĐƠN HÀNG TRÙNG LẶP: Có đơn hàng cùng SĐT và số tiền được đặt trong vòng 10 phút. Vui lòng rà soát kỹ!
                    </span>
                  </div>
                </div>
              )}

              {/* Order List Cards */}
              <div className="space-y-3">
                {filteredOrders.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500">
                    <Package className="w-10 h-10 mx-auto text-stone-400 mb-2" />
                    <p className="font-bold text-sm">Không tìm thấy đơn hàng nào phù hợp</p>
                    <p className="text-xs text-stone-400 mt-1">
                      Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                    </p>
                  </div>
                ) : (
                  filteredOrders.map((order) => {
                    const isExpanded = expandedOrderId === order.id;
                    const duplicateInfo = duplicateOrderMap.get(order.id);
                    const statusInfo = STATUS_LABELS[order.status] || {
                      label: order.status,
                      color: 'text-stone-800',
                      bg: 'bg-stone-100 border-stone-200',
                    };
                    const cleanPhone = order.phone.replace(/[^0-9]/g, '');
                    const orderProvince =
                      order.customerProvince ||
                      order.addressDetails?.province ||
                      parseAddressDetails(order.address).province ||
                      'TP. Hồ Chí Minh';
                    const shippingFeeDisplay =
                      order.shippingFeeText ||
                      (order.shippingFeeVND != null
                        ? order.shippingFeeVND === 0
                          ? 'MIỄN PHÍ'
                          : formatAdminPrice(order.shippingFeeVND, currency, exchangeRate)
                        : '30,000đ');
                    const tierBadge =
                      order.orderTierLabel ||
                      (order.items.some((i) => i.purchaseMode === 'wholesale')
                        ? 'Đơn Sỉ'
                        : 'Đơn Lẻ');

                    return (
                      <div
                        key={order.id}
                        className={`bg-white rounded-2xl border p-4 shadow-xs hover:border-emerald-700 transition-all font-['Plus_Jakarta_Sans',sans-serif] ${
                          duplicateInfo ? 'border-red-400 ring-2 ring-red-400/30' : 'border-stone-200'
                        }`}
                      >
                        {/* Summary Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-black text-sm text-[#062415] bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                              {order.id}
                            </span>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm font-bold text-stone-900 leading-tight">
                                  {order.customerName}
                                </h4>
                                {/* V178: Huy hiệu cảnh báo đơn trùng */}
                                {duplicateInfo && (
                                  <span className="text-[11px] bg-red-600 text-white px-2 py-0.5 rounded-md font-bold flex items-center gap-1 font-sans animate-pulse shadow-xs">
                                    <AlertTriangle className="w-3 h-3 shrink-0" />
                                    <span>CẢNH BÁO ĐƠN TRÙNG (10P)</span>
                                  </span>
                                )}
                                {/* V176: Huy hiệu Tỉnh thành khách hàng */}
                                <span className="text-[11px] text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 font-bold flex items-center gap-1 font-sans">
                                  <MapPin className="w-3 h-3 text-blue-700 shrink-0" />
                                  <span>{orderProvince}</span>
                                </span>
                                {/* V176: Huy hiệu Phân loại đơn hàng */}
                                <span className="text-[11px] text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-bold font-sans">
                                  {tierBadge}
                                </span>
                                {/* V176: Huy hiệu Phí vận chuyển */}
                                <span
                                  className={`text-[11px] px-2 py-0.5 rounded-md border font-bold flex items-center gap-1 font-sans ${
                                    order.shippingFeeVND === 0
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                      : 'bg-amber-50 text-amber-900 border-amber-300'
                                  }`}
                                >
                                  <Truck className="w-3 h-3 shrink-0" />
                                  <span>Ship: {shippingFeeDisplay}</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <p className="text-[11px] text-stone-500 font-mono">
                                  📅 {new Date(order.createdAt).toLocaleString('vi-VN')}
                                </p>
                                {order.email && (
                                  <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-mono flex items-center gap-1 font-semibold">
                                    <Mail className="w-3 h-3 text-emerald-700 shrink-0" />
                                    {order.email}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Fast Action 1: Call Phone */}
                            <a
                              href={`tel:${cleanPhone}`}
                              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Gọi hotline ngay cho khách hàng"
                            >
                              <Phone className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Gọi: {order.phone}</span>
                            </a>

                            {/* Fast Action 2: Chat Zalo */}
                            <a
                              href={`https://zalo.me/${cleanPhone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Nhắn tin Zalo trực tiếp cho khách"
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                              <span>Chat Zalo</span>
                            </a>

                            {/* Fast Action 3: Email Khách Hàng (Kèm Tỉnh thành và Phí ship) */}
                            {order.email && (
                              <a
                                href={`mailto:${order.email}?subject=${encodeURIComponent(
                                  `[G-ROOSTER] Xác nhận đơn hàng #${order.id}`
                                )}&body=${encodeURIComponent(
                                  `Kính gửi ${order.customerName},\n\nG-ROOSTER CO.,LTD xin chân thành cảm ơn Quý khách đã đặt đơn hàng #${order.id}.\n\n• Tỉnh/Thành phố nhận hàng: ${orderProvince}\n• Phí vận chuyển: ${shippingFeeDisplay}${
                                    order.isCustomCarrierQuote
                                      ? ' (G-ROOSTER sẽ liên hệ báo cước phí nhà xe/chành xe)'
                                      : ''
                                  }\n• Tổng thanh toán: ${formatAdminPrice(
                                    order.finalTotalVND,
                                    currency,
                                    exchangeRate
                                  )}\n• Địa chỉ nhận hàng: ${order.address}\n\nHotline hỗ trợ: 0961 525 450 - 0938 7979 04\nKho phân phối: 44 Trần Đình Xu, P. Cầu Ông Lãnh, TP.HCM`
                                )}`}
                                className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                                title={`Gửi email trực tiếp tới ${order.email}`}
                              >
                                <Mail className="w-3.5 h-3.5 text-purple-700" />
                                <span>Gửi Email</span>
                              </a>
                            )}

                            {/* Status Selector Dropdown */}
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleUpdateStatus(order.id, e.target.value as SavedOrder['status'])
                              }
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${statusInfo.bg} ${statusInfo.color}`}
                            >
                              <option value="pending_payment">Chờ thanh toán</option>
                              <option value="confirmed">Đã xác nhận</option>
                              <option value="packing">Đang đóng gói</option>
                              <option value="shipping">Đang giao hàng</option>
                              <option value="completed">Hoàn tất</option>
                              <option value="cancelled">Đã hủy</option>
                            </select>

                            {/* Expand / Collapse Button */}
                            <button
                              onClick={() =>
                                setExpandedOrderId(isExpanded ? null : order.id)
                              }
                              className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
                              title={isExpanded ? 'Thu gọn' : 'Xem chi tiết'}
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* V178: Cảnh báo đơn trùng chi tiết */}
                        {duplicateInfo && (
                          <div className="mt-2.5 p-2.5 bg-red-50 border border-red-300 rounded-xl text-xs text-red-950 flex items-center gap-2 font-medium">
                            <AlertTriangle className="w-4 h-4 text-red-700 shrink-0 animate-bounce" />
                            <span>
                              <strong>Cảnh Báo Đơn Trùng:</strong> Đơn hàng này có cùng SĐT ({order.phone}) và số tiền thanh toán ({formatAdminPrice(order.finalTotalVND, currency, exchangeRate)}) với đơn <strong className="font-mono">#{duplicateInfo.duplicateWithId}</strong> (đặt cách nhau {duplicateInfo.diffMinutes} phút). Vui lòng liên hệ xác nhận trước khi giao hàng!
                            </span>
                          </div>
                        )}

                        {/* Quick Info Bar */}
                        <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-stone-600">
                          <div className="flex items-center gap-2 truncate">
                            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span className="truncate">{order.address}</span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-[11px] text-stone-500">
                              {order.items.length} món • Hình thức:{' '}
                              <strong>
                                {order.paymentMethod === 'vietqr'
                                  ? 'Chuyển khoản VietQR'
                                  : order.paymentMethod === 'b2b_credit'
                                  ? 'Công nợ B2B'
                                  : 'COD'}
                              </strong>
                            </span>
                            <span className="font-mono font-black text-sm text-[#062415]">
                              {formatAdminPrice(order.finalTotalVND, currency, exchangeRate)}
                            </span>
                          </div>
                        </div>

                        {/* Expanded Detail Panel */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-stone-100 space-y-3 animate-in fade-in duration-150">
                            {/* V176: Chi tiết Vận chuyển & Giao nhận Đa Vùng */}
                            <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                              <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-blue-700 shrink-0" />
                                <div>
                                  <span className="text-blue-950 font-bold">Phí vận chuyển: </span>
                                  <span className="font-extrabold text-blue-900 font-mono text-[13px]">
                                    {shippingFeeDisplay}
                                  </span>
                                  {order.isCustomCarrierQuote && (
                                    <span className="ml-2 px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10.5px] font-bold border border-amber-300">
                                      ⚠️ Cần liên hệ báo cước nhà xe/chành xe
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-[11.5px] text-blue-950 flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                                <span>
                                  Tỉnh/Thành: <strong className="font-extrabold">{orderProvince}</strong>
                                </span>
                                <span className="text-blue-300">|</span>
                                <span>
                                  Phân loại: <strong className="font-extrabold">{tierBadge}</strong>
                                </span>
                              </div>
                            </div>

                            {/* Customer Email & Contact Info */}
                            {order.email && (
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 bg-purple-50/70 rounded-xl border border-purple-200 text-xs">
                                <div className="flex items-center gap-2">
                                  <Mail className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                                  <span className="text-stone-700 font-medium">Email khách hàng (Đã xác nhận):</span>
                                  <span className="font-mono font-bold text-purple-950">{order.email}</span>
                                </div>
                                <a
                                  href={`mailto:${order.email}`}
                                  className="text-[11px] font-bold text-purple-800 hover:text-purple-950 underline flex items-center gap-1 self-end sm:self-auto"
                                >
                                  <span>Gửi thư điện tử ↗</span>
                                </a>
                              </div>
                            )}

                            {/* Notes & VAT */}
                            {(order.notes || order.isVATRequested) && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                                {order.notes && (
                                  <div>
                                    <strong className="text-stone-700 block mb-0.5">Ghi chú giao hàng:</strong>
                                    <p className="text-stone-600">{order.notes}</p>
                                  </div>
                                )}
                                {order.isVATRequested && (
                                  <div>
                                    <strong className="text-stone-700 block mb-0.5">Yêu cầu xuất VAT:</strong>
                                    <p className="text-stone-600 font-mono">
                                      {order.companyName} • MST: {order.taxId}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Item list */}
                            <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
                              {order.items.map((it, idx) => (
                                <div
                                  key={idx}
                                  className="p-2.5 bg-white hover:bg-[#f9fafb] transition-colors flex items-center justify-between gap-3 text-xs"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <img
                                      src={it.product.image}
                                      alt={it.product.name}
                                      loading="lazy"
                                      decoding="async"
                                      className="w-9 h-9 rounded-lg object-cover border border-stone-200 shrink-0"
                                      onError={(e) => {
                                        (e.target as HTMLElement).style.display = 'none';
                                      }}
                                    />
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <p className="font-bold text-stone-900 truncate">
                                          {it.product.name}
                                        </p>
                                        {((it as any).variant || (it as any).selectedVariant) && (
                                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-black uppercase tracking-wide bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                                            🏷️ MẪU: [{(it as any).variant || (it as any).selectedVariant}]
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[10px] text-stone-500">
                                        {it.purchaseMode === 'wholesale' ? 'Giá Sỉ' : 'Giá Lẻ'}{' '}
                                        {it.activeTierLabel ? `(${it.activeTierLabel})` : ''} • Đơn giá:{' '}
                                        {formatAdminPrice(it.unitPriceVND, currency, exchangeRate)}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="text-right shrink-0">
                                    <span className="font-bold font-mono text-stone-900">
                                      x{it.quantity}
                                    </span>
                                    <span className="block font-black font-mono text-[#062415]">
                                      {formatAdminPrice(it.subtotalVND, currency, exchangeRate)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Bottom row actions */}
                            <div className="flex items-center justify-end gap-2 pt-1">
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="px-3 py-1.5 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Xóa đơn</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </main>
        </div>
      </div>

      {/* =========================================================
          MODAL CON: SỬA GIÁ NHANH THEO NHÓM (%)
         ========================================================= */}
      {isBulkModalOpen && (
        <div
          style={{ zIndex: 200 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-stone-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-purple-700" />
                <h3 className="font-heading font-black text-base text-stone-900">
                  SỬA GIÁ NHANH THEO NHÓM
                </h3>
              </div>
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  1. Chọn danh mục áp dụng:
                </label>
                <select
                  value={bulkPartnerId}
                  onChange={(e) => setBulkPartnerId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  {PARTNER_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  2. Chọn mức giá áp dụng:
                </label>
                <select
                  value={bulkTargetTier}
                  onChange={(e) => setBulkTargetTier(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="all">Tất cả mức giá (Lẻ, Sỉ 1, Sỉ 2, Sỉ 3)</option>
                  <option value="retail">Chỉ Giá Lẻ</option>
                  <option value="wholesale1">Chỉ Giá Sỉ 1</option>
                  <option value="wholesale2">Chỉ Giá Sỉ 2</option>
                  <option value="wholesale3">Chỉ Giá Sỉ 3</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  3. Nhập % tăng hoặc giảm giá:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={bulkPercent}
                    onChange={(e) => setBulkPercent(Number(e.target.value))}
                    step="1"
                    placeholder="VD: 5 hoặc -10"
                    className="flex-1 px-3 py-2 rounded-xl border border-stone-300 font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <span className="font-bold text-sm text-stone-600">%</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  {[-10, -5, 5, 10, 15].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setBulkPercent(pct)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                        bulkPercent === pct
                          ? 'bg-purple-900 text-white border-purple-900'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-200'
                      }`}
                    >
                      {pct > 0 ? `+${pct}%` : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-xl text-purple-900 text-[11px]">
                💡 Giá sau khi tính toán sẽ được làm tròn tự động đến 1.000 VNĐ gần nhất và đồng bộ tức thì trên toàn website.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsBulkModalOpen(false)}
                className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleApplyBulk}
                className="px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-950 text-white text-xs font-black shadow-md transition-all cursor-pointer"
              >
                ÁP DỤNG NGAY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL CON: QUẢN LÝ BỘ SƯU TẬP ẢNH (V164, V260 & V263 - SMART GALLERY)
          V263: Portal ra ngoài document.body với z-[999999], nút Thoát và nút X chỉ đóng Modal, tuyệt đối không redirect
         ========================================================= */}
      {selectedProductForUpload && typeof document !== 'undefined' && createPortal(
        <div
          style={{ zIndex: 999999 }}
          className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
          onClick={handleCloseGalleryModal}
        >
          <div
            className="bg-white rounded-3xl p-5 sm:p-6 max-w-2xl w-full shadow-2xl border border-stone-200 space-y-4 my-auto max-h-[92vh] flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-black text-base text-stone-900 tracking-tight">
                    QUẢN LÝ BỘ SƯU TẬP ẢNH
                  </h3>
                </div>
                <p className="text-xs text-stone-500 font-medium truncate max-w-md mt-0.5">
                  {selectedProductForUpload.name} • <span className="text-stone-400 font-mono">{selectedProductForUpload.partnerName}</span>
                </p>
              </div>

              {/* V263: Cả nút Thoát và nút X góc trên bên phải chỉ đóng Modal qua handleCloseGalleryModal, không redirect */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCloseGalleryModal}
                  className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200 active:scale-95"
                  title="Thoát / Đóng cửa sổ bộ sưu tập (ở lại Quản trị)"
                >
                  <LogOut className="w-3.5 h-3.5 text-stone-600" />
                  <span>Thoát</span>
                </button>
                <button
                  type="button"
                  onClick={handleCloseGalleryModal}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer active:scale-95"
                  title="Đóng cửa sổ"
                  aria-label="Đóng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto space-y-3.5 pr-1 flex-1">
              {/* LƯỚI QUẢN LÝ BỘ SƯU TẬP ẢNH TỔNG HỢP (SMART GALLERY GRID) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">
                      Bộ sưu tập hình ảnh ({tempImagesList.length} ảnh):
                    </span>
                    <span
                      className={`text-[11px] px-2.5 py-0.5 rounded-full font-black font-mono transition-colors ${
                        tempImagesList.length > 0
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {tempImagesList.length} ảnh
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium">
                    Ảnh #1 là ẢNH CHÍNH trên Trang chủ
                  </span>
                </div>

                {tempImagesList.length === 0 ? (
                  <div className="p-6 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50 text-center flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-stone-200/70 text-stone-400 flex items-center justify-center mb-2">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-stone-700">Bộ sưu tập hiện chưa có ảnh nào</p>
                    <p className="text-[11px] text-stone-500 mt-1 max-w-sm">
                      Bấm nút <strong>"Chọn tệp ảnh"</strong> bên dưới để tải ảnh từ máy tính/điện thoại, hoặc dán đường dẫn link ảnh.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto p-2 border border-stone-200 rounded-2xl bg-stone-50/70">
                    {tempImagesList.map((imgSrc, index) => {
                      const isMain = index === 0;
                      return (
                        <div
                          key={index}
                          className={`relative rounded-xl overflow-hidden border-2 bg-white flex flex-col transition-all shadow-xs group ${
                            isMain
                              ? 'border-emerald-600 ring-2 ring-emerald-500/40'
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          {/* Khung ảnh vuông: Click để mở Lightbox xem chi tiết độ phân giải gốc */}
                          <div
                            onClick={() => {
                              setLightboxData({
                                src: imgSrc,
                                productName: selectedProductForUpload?.name || 'Sản phẩm',
                                partnerName: selectedProductForUpload?.partnerName,
                                currentIndex: index,
                                imagesList: tempImagesList,
                              });
                              setLightboxZoom(1);
                            }}
                            className="relative aspect-square w-full overflow-hidden bg-stone-100 cursor-zoom-in group/img"
                            title="Click để phóng to ảnh xem rõ tem nhãn & giấy chứng nhận (HD)"
                          >
                            <img
                              src={imgSrc}
                              alt={`Ảnh ${index + 1}`}
                              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                            />

                            {/* Nút PHÓNG TO HD - V265: z-index 999, kích hoạt Lightbox toàn màn hình, 100% click được */}
                            <div className="absolute inset-0 flex items-center justify-center p-2 z-[999]" style={{ zIndex: 999 }}>
                              <button
                                type="button"
                                style={{ zIndex: 999 }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setLightboxData({
                                    src: imgSrc,
                                    productName: selectedProductForUpload?.name || 'Sản phẩm',
                                    partnerName: selectedProductForUpload?.partnerName,
                                    currentIndex: index,
                                    imagesList: tempImagesList,
                                  });
                                  setLightboxZoom(1);
                                }}
                                className="z-[999] px-2.5 py-1.5 rounded-xl bg-black/85 hover:bg-black text-white text-[11px] font-bold flex items-center gap-1.5 shadow-xl border border-white/30 cursor-pointer active:scale-95 transition-all hover:scale-105"
                                title="Click để phóng to ảnh xem chi tiết HD"
                              >
                                <ZoomIn className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                                <span>Phóng to HD</span>
                              </button>
                            </div>

                            {/* Badge #1 ẢNH CHÍNH hoặc Nút Ngôi Sao ⭐️ Đặt làm ảnh chính ngay trên ảnh */}
                            <div className="absolute top-1.5 left-1.5 z-20">
                              {isMain ? (
                                <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-[#062415] text-amber-300 border border-emerald-600 shadow-sm flex items-center gap-1">
                                  <span>⭐️</span>
                                  <span>ẢNH CHÍNH</span>
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSetMainImage(index);
                                  }}
                                  className="px-2 py-0.5 rounded-md text-[9.5px] font-bold bg-white/95 hover:bg-amber-400 text-stone-800 hover:text-stone-950 border border-stone-300 shadow-xs flex items-center gap-1 transition-all cursor-pointer hover:scale-105 active:scale-95 group/starbtn"
                                  title={`Click để lập tức đưa ảnh #${index + 1} này lên vị trí số 1 làm Ảnh Chính`}
                                >
                                  <span className="text-amber-500 group-hover/starbtn:text-stone-950 text-xs">⭐️</span>
                                  <span className="font-mono font-bold">#{index + 1}</span>
                                  <span className="hidden sm:inline text-[8.5px] text-amber-800 font-semibold group-hover/starbtn:text-stone-900">Làm ảnh chính</span>
                                </button>
                              )}
                            </div>

                            {/* Nút Xóa (X / Thùng rác đỏ) ở góc phải phía trên - Dùng e.stopPropagation() để không mở Lightbox */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveTempImage(index);
                              }}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer text-xs font-black z-20"
                              title="Xóa tấm ảnh này khỏi sản phẩm"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Thanh điều khiển dưới từng ảnh: Nút Star ⭐️ nổi bật, không bị cắt chữ */}
                          <div className="p-1.5 bg-white border-t border-stone-100 flex items-center justify-between gap-1 text-[10px]">
                            {!isMain ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSetMainImage(index);
                                }}
                                className="flex-1 py-1 px-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300/80 font-bold text-[10.5px] flex items-center justify-center gap-1 shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                                title="Click để LẬP TỨC nhảy lên vị trí số 1 và trở thành ảnh đại diện hiện ngoài trang chủ"
                              >
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-600 shrink-0" />
                                <span className="font-heading tracking-tight">Đặt làm ảnh chính</span>
                              </button>
                            ) : (
                              <div className="flex-1 py-1 px-1.5 rounded-lg bg-emerald-50 text-emerald-950 border border-emerald-300 font-black text-[10.5px] flex items-center justify-center gap-1.5 shadow-2xs">
                                <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                                <span>✓ Ảnh chính trang chủ</span>
                              </div>
                            )}

                            {/* Nút đổi thứ tự phụ (di chuyển 1 nấc sang trái/phải nếu cần) */}
                            <div className="flex items-center gap-0.5 shrink-0">
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMoveImage(index, 'left');
                                  }}
                                  className="w-5 h-5 flex items-center justify-center bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-bold cursor-pointer transition-colors text-xs"
                                  title="Đẩy ảnh sang trái 1 nấc"
                                >
                                  ←
                                </button>
                              )}
                              {index < tempImagesList.length - 1 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMoveImage(index, 'right');
                                  }}
                                  className="w-5 h-5 flex items-center justify-center bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-bold cursor-pointer transition-colors text-xs"
                                  title="Đẩy ảnh sang phải 1 nấc"
                                >
                                  →
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Hidden Input File hỗ trợ MULTIPLE */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleMultipleImageFiles(e.target.files);
                  }
                }}
                multiple
                accept="image/*"
                className="hidden"
              />

              {/* Action buttons: Tải thêm ảnh & Dán URL */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  disabled={isProcessingFiles}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isProcessingFiles ? (
                    <>
                      <RefreshCw className="w-4 h-4 text-amber-300 animate-spin" />
                      <span>Đang nén và tối ưu hóa hình ảnh...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-amber-300" />
                      <span>
                        + Chọn thêm ảnh từ máy tính / điện thoại (Chọn nhiều ảnh cùng lúc)
                      </span>
                    </>
                  )}
                </button>

                <div className="relative flex py-0.5 items-center">
                  <div className="flex-grow border-t border-stone-200"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-stone-400 font-semibold uppercase">
                    Hoặc dán URL ảnh trực tiếp
                  </span>
                  <div className="flex-grow border-t border-stone-200"></div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customImageUrlInput}
                    onChange={(e) => setCustomImageUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomImageUrl();
                      }
                    }}
                    placeholder="https://i.postimg.cc/.../ten-anh.png (phân tách nhiều link bằng dấu phẩy)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomImageUrl}
                    className="px-3.5 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shrink-0"
                  >
                    + Thêm Link
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-stone-100 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCloseGalleryModal}
                  className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95"
                  title="Thoát không lưu thay đổi"
                >
                  <LogOut className="w-3.5 h-3.5 text-stone-500" />
                  <span>Hủy bỏ</span>
                </button>

                {selectedProductForUpload.isCustomImage && (
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Khôi phục toàn bộ ảnh gốc mặc định ban đầu cho "${selectedProductForUpload.name}"?`
                        )
                      ) {
                        saveSingleProductAdminData(selectedProductForUpload.id, {
                          image: undefined,
                          images: undefined,
                        });
                        setSaveSuccessMsg(
                          `Đã khôi phục bộ ảnh mặc định cho "${selectedProductForUpload.name}"!`
                        );
                        setTimeout(() => setSaveSuccessMsg(null), 3000);
                        handleCloseGalleryModal();
                      }
                    }}
                    className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer hover:underline px-2 py-1"
                    title="Khôi phục ảnh gốc"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Khôi phục ảnh gốc</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleSaveProductImage}
                disabled={tempImagesList.length === 0 || isProcessingFiles}
                className="px-5 py-2.5 rounded-xl bg-[#062415] hover:bg-[#0a3520] disabled:bg-stone-300 text-amber-300 disabled:text-stone-500 text-xs font-black shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>
                  LƯU CẬP NHẬT BỘ SƯU TẬP ({tempImagesList.length} ẢNH)
                </span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* =========================================================
          MODAL CON: SAO LƯU & NẠP DỮ LIỆU JSON (V165 DATA PROTECTION)
         ========================================================= */}
      {isBackupModalOpen && (
        <div
          style={{ zIndex: 200 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            className="bg-white rounded-3xl p-5 sm:p-6 max-w-xl w-full shadow-2xl border border-stone-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-800" />
                <h3 className="font-heading font-black text-base text-stone-900 tracking-tight">
                  BẢO VỆ DỮ LIỆU &amp; SAO LƯU JSON
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsBackupModalOpen(false);
                  setBackupJsonInput('');
                }}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Mọi chỉnh sửa giá sỉ, giá vốn và link ảnh của Admin đều đã được tự động lưu vào <strong>src/data/productOverrides.json</strong> trong mã nguồn. Bạn có thể tải file sao lưu dự phòng về máy hoặc nạp dữ liệu từ máy khác vào đây:
            </p>

            {/* Hành động Tải file sao lưu */}
            <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-emerald-950">Xuất file sao lưu (JSON Backup)</p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Tải toàn bộ {Object.keys(getProductOverrides()).length} sản phẩm tùy chỉnh về máy tính
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  downloadOverridesBackup();
                  setSaveSuccessMsg('Đã tải thành công file sao lưu JSON về máy tính!');
                  setTimeout(() => setSaveSuccessMsg(null), 3000);
                }}
                className="px-3.5 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>Tải File JSON</span>
              </button>
            </div>

            {/* Hành động Nạp file sao lưu */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">
                Nạp lại dữ liệu sao lưu (Dán mã JSON):
              </label>
              <textarea
                rows={5}
                value={backupJsonInput}
                onChange={(e) => setBackupJsonInput(e.target.value)}
                placeholder='Dán nội dung JSON đã sao lưu vào đây (ví dụ: { "overrides": { ... } })...'
                className="w-full p-3 text-xs rounded-xl border border-stone-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => {
                  setIsBackupModalOpen(false);
                  setBackupJsonInput('');
                }}
                className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={handleImportBackup}
                disabled={!backupJsonInput.trim()}
                className="px-4 py-2 rounded-xl bg-[#062415] hover:bg-[#0a3520] disabled:bg-stone-300 text-amber-300 disabled:text-stone-500 text-xs font-black shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Nạp Dữ Liệu &amp; Đồng Bộ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL V166: XUẤT MÃ ĐỒNG BỘ DỮ LIỆU CHO AI STUDIO
          Tổng hợp toàn bộ Hình ảnh, Giá vốn, Giá bán đã nhập
         ========================================================= */}
      {isExportSyncModalOpen && syncExportData && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="bg-white rounded-3xl p-5 sm:p-6 max-w-2xl w-full shadow-2xl border border-stone-200 space-y-4 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-700 flex items-center justify-center font-bold">
                  📥
                </div>
                <div>
                  <h3 className="font-heading font-black text-base text-stone-900 tracking-tight flex items-center gap-2">
                    <span>MÃ ĐỒNG BỘ CHO AI STUDIO</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Sẵn sàng Copy
                    </span>
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Bảo toàn vĩnh viễn hình ảnh &amp; giá tiền vào mã nguồn khi Push GitHub
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsExportSyncModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto space-y-3.5 pr-1 flex-1">
              {/* Highlight Instruction Box - Thiết kế thanh thoát, chữ 13px - 14px */}
              <div className="p-3.5 sm:p-4 bg-stone-50/90 border border-stone-200/90 rounded-2xl space-y-2">
                <div className="text-[13.5px] font-bold text-stone-900 flex items-center gap-2">
                  <span className="text-amber-600">💡</span>
                  <span>Quy trình đồng bộ 2 bước cho chủ doanh nghiệp:</span>
                </div>
                <ol className="text-[13px] text-stone-600 space-y-1.5 list-decimal list-inside leading-relaxed pl-1">
                  <li>
                    Bấm nút <strong className="text-stone-900 font-semibold">'📋 Sao Chép Mã Đồng Bộ'</strong> ở thanh công cụ bên dưới.
                  </li>
                  <li>
                    Quay lại khung chat với AI Studio, bấm <strong className="text-stone-900 font-semibold">Dán (Ctrl+V / Cmd+V)</strong> và gửi đi.
                  </li>
                </ol>
                <p className="text-[12px] text-emerald-800/90 font-medium pt-1.5 border-t border-stone-200/70 leading-normal">
                  ✨ AI Studio sẽ ngay lập tức đồng bộ vĩnh viễn toàn bộ hình ảnh và giá cả vào mã nguồn gốc (<code>src/data/products.ts</code>), không bao giờ bị mất khi Push GitHub.
                </p>
              </div>

              {/* Statistics Badges Strip - Tinh chỉnh màu dịu mắt, nhã nhặn, chuyên nghiệp */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-stone-50/80 border border-stone-200/80">
                  <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Đã đổi ảnh</div>
                  <div className="text-base font-bold text-stone-800 font-mono mt-0.5">
                    {syncExportData.stats.imagesModified} <span className="text-xs font-normal text-stone-400">SP</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50/80 border border-stone-200/80">
                  <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Đã đổi giá bán</div>
                  <div className="text-base font-bold text-stone-800 font-mono mt-0.5">
                    {syncExportData.stats.pricesModified} <span className="text-xs font-normal text-stone-400">SP</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50/80 border border-stone-200/80">
                  <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Đã lưu giá vốn</div>
                  <div className="text-base font-bold text-stone-800 font-mono mt-0.5">
                    {syncExportData.stats.costsModified} <span className="text-xs font-normal text-stone-400">SP</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-100/70 border border-stone-300/80">
                  <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Tổng tùy chỉnh</div>
                  <div className="text-base font-black text-[#062415] font-mono mt-0.5">
                    {syncExportData.stats.totalCustomProducts} <span className="text-xs font-normal text-stone-400">SP</span>
                  </div>
                </div>
              </div>

              {/* JSON Code Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>Mã JSON Đồng Bộ (Đã định dạng chuẩn):</span>
                  <span className="text-[11px] font-normal text-stone-400">
                    Click vào ô để bôi đen toàn bộ
                  </span>
                </div>
                <div className="relative">
                  <textarea
                    readOnly
                    rows={8}
                    value={syncExportData.jsonString}
                    onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                    className="w-full p-3 text-[11px] rounded-xl border border-stone-300 font-mono bg-stone-900 text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 select-all leading-snug"
                  />
                  <button
                    type="button"
                    onClick={handleCopySyncCode}
                    className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors backdrop-blur-xs"
                    title="Sao chép toàn bộ"
                  >
                    {copiedSyncCode ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-300 stroke-[3]" />
                        <span className="text-emerald-300">Đã chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-amber-300" />
                        <span>Chép mã</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Danh sách tóm tắt các sản phẩm đã thay đổi */}
              {syncExportData.summary.length > 0 && (
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1 text-xs">
                  <p className="font-bold text-stone-800">
                    Chi tiết {syncExportData.summary.length} sản phẩm có dữ liệu mới:
                  </p>
                  <div className="max-h-28 overflow-y-auto space-y-1 pr-1 font-mono text-[10.5px]">
                    {syncExportData.summary.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-white px-2 py-1 rounded border border-stone-200/80"
                      >
                        <span className="font-semibold text-stone-900 truncate max-w-[240px]">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0 text-[10px]">
                          {item.hasImageChange && (
                            <span className="text-emerald-700 bg-emerald-50 px-1 rounded font-bold">
                              📸 {item.galleryCount} ảnh
                            </span>
                          )}
                          {item.hasPriceChange && (
                            <span className="text-amber-700 bg-amber-50 px-1 rounded font-bold">
                              🏷️ Giá bán
                            </span>
                          )}
                          {item.hasCostChange && (
                            <span className="text-blue-700 bg-blue-50 px-1 rounded font-bold">
                              💰 Vốn: {formatCommaNumber(item.cost)}₫
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions: 3 Nút dàn hàng ngang cân đối 1:1:1 bằng nhau */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3.5 border-t border-stone-100 shrink-0 w-full">
              {/* Nút 1: Tải File .JSON */}
              <button
                type="button"
                onClick={() => {
                  downloadOverridesBackup();
                  setSaveSuccessMsg('Đã tải thành công tệp JSON sao lưu về máy tính!');
                  setTimeout(() => setSaveSuccessMsg(null), 3000);
                }}
                className="w-full h-11 px-3 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
                title="Tải tệp JSON về máy tính dự phòng"
              >
                <Download className="w-4 h-4 text-stone-600 shrink-0" />
                <span className="truncate">Tải File .JSON</span>
              </button>

              {/* Nút 2: Lưu Vào Mã Nguồn */}
              <button
                type="button"
                onClick={async () => {
                  await handleSyncToGitCodebase();
                  setIsExportSyncModalOpen(false);
                }}
                className="w-full h-11 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
                title="Lưu trực tiếp vào file productOverrides.json trên máy chủ dev"
              >
                <Save className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="truncate">Lưu Vào Mã Nguồn</span>
              </button>

              {/* Nút 3: Sao Chép Mã Đồng Bộ Cho AI Studio */}
              <button
                type="button"
                onClick={handleCopySyncCode}
                className={`w-full h-11 px-3 rounded-xl font-heading font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-[0.98] ${
                  copiedSyncCode
                    ? 'bg-emerald-700 text-white border border-emerald-800'
                    : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-stone-950 border border-amber-500/80 shadow-amber-500/20'
                }`}
                title="Sao chép toàn bộ mã JSON đồng bộ vào bộ nhớ tạm"
              >
                {copiedSyncCode ? (
                  <>
                    <Check className="w-4 h-4 text-white stroke-[3] shrink-0" />
                    <span className="truncate">✓ ĐÃ CHÉP MÃ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-950 shrink-0" />
                    <span className="truncate">📋 Sao Chép Mã Đồng Bộ</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          V172: MÀN HÌNH XEM ẢNH TOÀN CẢNH (LIGHTBOX & ZOOM HD)
          - Cho phép Admin soi rõ từng chi tiết tem nhãn, giấy chứng nhận
          - Zoom in / Zoom out mượt mà, chuyển ảnh trước/sau
          - Tuyệt đối không xung đột với nút xóa hoặc nút đặt ảnh chính
         ========================================================= */}
      {lightboxData && typeof document !== 'undefined' && createPortal(
        <div
          style={{ zIndex: 10000000 }}
          className="fixed inset-0 z-[10000000] bg-black/95 backdrop-blur-md flex flex-col justify-between animate-in fade-in duration-200 select-none overflow-hidden"
          onClick={() => {
            setLightboxData(null);
            setLightboxZoom(1);
          }}
        >
          {/* Top Bar: Tiêu đề, thông tin ảnh & Bộ công cụ Zoom + Đóng */}
          <div
            className="px-4 py-3 sm:px-6 bg-gradient-to-b from-black/90 via-black/70 to-transparent flex items-center justify-between text-white shrink-0 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tên sản phẩm & chỉ số ảnh */}
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="bg-emerald-950/80 p-2 rounded-xl border border-emerald-700/60 shrink-0 text-amber-300">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black text-white font-heading truncate">
                    {lightboxData.productName}
                  </h3>
                  {lightboxData.partnerName && (
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900/80 text-emerald-200 border border-emerald-700/60">
                      {lightboxData.partnerName}
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-300 font-mono mt-0.5">
                  Ảnh <strong className="text-amber-300">#{lightboxData.currentIndex + 1}</strong> / {lightboxData.imagesList.length}
                  {lightboxData.currentIndex === 0 && (
                    <span className="ml-2 text-emerald-300 font-sans font-bold">★ Ảnh chính trang chủ</span>
                  )}
                </p>
              </div>
            </div>

            {/* Thanh công cụ Zoom & Nút Đóng */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center bg-white/10 rounded-xl p-1 border border-white/15 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setLightboxZoom((z) => Math.max(z - 0.25, 0.75))}
                  disabled={lightboxZoom <= 0.75}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-stone-200 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
                  title="Thu nhỏ (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxZoom(1)}
                  className="px-2.5 py-1 text-xs font-mono font-bold text-amber-300 hover:bg-white/20 rounded-md transition-colors cursor-pointer"
                  title="Đặt lại kích thước gốc 100%"
                >
                  {Math.round(lightboxZoom * 100)}%
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxZoom((z) => Math.min(z + 0.5, 3.5))}
                  disabled={lightboxZoom >= 3.5}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-stone-200 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
                  title="Phóng to (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxZoom((z) => (z === 1 ? 2 : 1))}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-stone-200 hover:text-white transition-colors cursor-pointer ml-1 border-l border-white/15"
                  title={lightboxZoom === 1 ? 'Soi chi tiết (200%)' : 'Vừa màn hình (Fit)'}
                >
                  <Maximize2 className="w-4 h-4 text-emerald-300" />
                </button>
              </div>

              {/* Nút Đóng [X] */}
              <button
                type="button"
                onClick={() => {
                  setLightboxData(null);
                  setLightboxZoom(1);
                }}
                className="px-3 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer active:scale-95 border border-red-500/50"
                title="Đóng chế độ phóng to (ESC)"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Đóng</span>
              </button>
            </div>
          </div>

          {/* Vùng hiển thị ảnh phóng to chính giữa */}
          <div
            className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden relative cursor-default"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setLightboxData(null);
                setLightboxZoom(1);
              }
            }}
          >
            {/* Nút lùi ảnh (Trái) */}
            {lightboxData.imagesList.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxData((prev) => {
                    if (!prev) return prev;
                    const nextIdx = (prev.currentIndex - 1 + prev.imagesList.length) % prev.imagesList.length;
                    return {
                      ...prev,
                      currentIndex: nextIdx,
                      src: prev.imagesList[nextIdx],
                    };
                  });
                  setLightboxZoom(1);
                }}
                className="absolute left-2 sm:left-6 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-emerald-950 text-white border border-white/20 hover:border-emerald-500 flex items-center justify-center shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95"
                title="Ảnh trước (← hoặc phím mũi tên trái)"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
              </button>
            )}

            {/* Container của tấm ảnh */}
            <div
              className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${lightboxZoom})`,
                cursor: lightboxZoom > 1 ? 'zoom-out' : 'zoom-in',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxZoom((z) => (z === 1 ? 2 : 1));
              }}
              title={lightboxZoom === 1 ? 'Click vào ảnh để phóng to 200% soi tem nhãn/giấy chứng nhận' : 'Click để thu nhỏ vừa màn hình'}
            >
              <img
                src={lightboxData.src}
                alt={lightboxData.productName}
                className="max-h-[75vh] sm:max-h-[80vh] max-w-[92vw] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>

            {/* Nút tiến ảnh (Phải) */}
            {lightboxData.imagesList.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxData((prev) => {
                    if (!prev) return prev;
                    const nextIdx = (prev.currentIndex + 1) % prev.imagesList.length;
                    return {
                      ...prev,
                      currentIndex: nextIdx,
                      src: prev.imagesList[nextIdx],
                    };
                  });
                  setLightboxZoom(1);
                }}
                className="absolute right-2 sm:right-6 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-emerald-950 text-white border border-white/20 hover:border-emerald-500 flex items-center justify-center shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95"
                title="Ảnh tiếp theo (→ hoặc phím mũi tên phải)"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Hướng dẫn phím tắt & Băng chuyền Thumbnail ảnh */}
          <div
            className="p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col items-center gap-2 shrink-0 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Thumbnail Carousel (khi có từ 2 ảnh trở lên) */}
            {lightboxData.imagesList.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto max-w-full px-2 py-1 scrollbar-none">
                {lightboxData.imagesList.map((thumbSrc, tIdx) => {
                  const isActive = tIdx === lightboxData.currentIndex;
                  return (
                    <button
                      key={tIdx}
                      type="button"
                      onClick={() => {
                        setLightboxData((prev) =>
                          prev
                            ? {
                                ...prev,
                                currentIndex: tIdx,
                                src: thumbSrc,
                              }
                            : null
                        );
                        setLightboxZoom(1);
                      }}
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? 'border-amber-400 ring-2 ring-amber-400/60 scale-105 opacity-100 shadow-lg'
                          : 'border-white/30 opacity-60 hover:opacity-90 hover:border-white/60'
                      }`}
                      title={`Xem ảnh #${tIdx + 1}`}
                    >
                      <img
                        src={thumbSrc}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0.5 right-0.5 px-1 rounded bg-black/80 text-[8px] font-mono text-white">
                        #{tIdx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Hint hướng dẫn thao tác */}
            <p className="text-[11px] text-stone-400 text-center font-medium">
              💡 <strong>Mẹo:</strong> Click trực tiếp vào ảnh để bật/tắt phóng to <strong>200%</strong> • Phím <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 text-[10px] text-stone-200">←</kbd> <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 text-[10px] text-stone-200">→</kbd> chuyển ảnh • Phím <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 text-[10px] text-stone-200">ESC</kbd> hoặc nút Đóng để quay lại
            </p>
          </div>
        </div>,
        document.body
      )}

      {/* V255: Modal Xác Nhận Xóa Vĩnh Viễn Sản Phẩm Khỏi Database */}
      {productToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => {
            if (!isDeletingProduct) setProductToDelete(null);
          }}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-rose-100 bg-rose-50/70 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-300 text-rose-700 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-rose-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-black text-rose-950 uppercase tracking-tight font-heading">
                  Xác Nhận Xóa Vĩnh Viễn Sản Phẩm
                </h3>
                <p className="text-[11px] text-rose-800">
                  Hành động này sẽ loại bỏ sản phẩm vĩnh viễn khỏi Database!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                disabled={isDeletingProduct}
                className="w-8 h-8 rounded-full bg-rose-100/80 hover:bg-rose-200 text-rose-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Đóng"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5 space-y-3">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-white border border-stone-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={productToDelete.image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-2">
                    {cleanProductTitle(productToDelete.name)}
                  </p>
                  <p className="text-[10px] text-stone-500 mt-0.5">
                    Mã SP: <span className="font-mono font-bold text-stone-700">{productToDelete.id}</span> • Đối tác: {productToDelete.partnerName}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Cảnh báo an toàn dữ liệu:</span>
                </p>
                <p className="text-[11.5px] leading-relaxed text-amber-900/90 pl-5">
                  Sau khi xóa, sản phẩm này sẽ biến mất trên toàn hệ thống Website, giỏ hàng và danh sách giá sỉ. Số thứ tự (STT) của toàn bộ danh mục sẽ tự động được đánh số lại liên tục.
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                disabled={isDeletingProduct}
                className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold transition-all cursor-pointer"
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteProduct}
                disabled={isDeletingProduct}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                {isDeletingProduct ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang Xóa...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xác Nhận Xóa Vĩnh Viễn</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* V175: Màn hình Kiểm Tra Dữ Liệu Bảng Giá trước khi lưu Firebase */}
      <PriceValidationModal
        isOpen={isValidationModalOpen}
        onClose={() => setIsValidationModalOpen(false)}
        rows={validationRows}
        onConfirmSave={handleConfirmSaveValidatedPrices}
        isSaving={isApplyingValidatedPrices}
      />

      {/* V218 & V250: Modal Xuất Báo Giá PDF chuyên nghiệp (Logo 100px, MST, Hotline, Quy cách sỉ động, Bảng giá, (+) Profit, Đa ngôn ngữ) */}
      <QuotationPdfModal
        isOpen={isQuotationModalOpen}
        onClose={() => setIsQuotationModalOpen(false)}
        allProducts={financialsList}
        filteredProducts={filteredFinancials}
        unsavedEdits={unsavedEdits}
        currentPartnerFilter={selectedPartnerFilter}
        language={adminLanguage}
      />

      {/* V192: Nút 'XEM WEBSITE' trên Mobile - Thu nhỏ thành icon tròn nổi (Floating Button) màu xanh lá */}
      <button
        type="button"
        onClick={onClose}
        className="sm:hidden fixed bottom-6 left-4 z-50 w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-700 to-teal-700 text-white shadow-[0_4px_16px_rgba(5,150,105,0.45)] border-2 border-white/80 flex items-center justify-center active:scale-90 transition-all cursor-pointer group"
        title="Quay lại Website (Xem Website)"
        aria-label="Xem Website"
      >
        <ExternalLink className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
      </button>

      {/* V174/V186: Biểu tượng điều hướng nhanh nổi (Back to Top / Bottom Footer) cho trang Quản trị */}
      <QuickScrollButtons className="bottom-6 right-5 z-50" />
    </div>
  );
};
