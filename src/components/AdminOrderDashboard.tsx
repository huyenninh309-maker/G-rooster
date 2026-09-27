import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  SlidersHorizontal,
  MessageCircle,
  Mail,
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
} from '../utils/productStore';

export interface SavedOrder {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
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
}

type AdminScreen = 'dashboard' | 'financials' | 'images' | 'orders';

const STATUS_LABELS: Record<SavedOrder['status'], { label: string; color: string; bg: string }> = {
  pending_payment: { label: 'Chờ thanh toán', color: 'text-amber-800', bg: 'bg-amber-100 border-amber-200' },
  confirmed: { label: 'Đã xác nhận', color: 'text-blue-800', bg: 'bg-blue-100 border-blue-200' },
  packing: { label: 'Đang đóng gói', color: 'text-indigo-800', bg: 'bg-indigo-100 border-indigo-200' },
  shipping: { label: 'Đang giao hàng', color: 'text-purple-800', bg: 'bg-purple-100 border-purple-200' },
  completed: { label: 'Hoàn tất', color: 'text-emerald-800', bg: 'bg-emerald-100 border-emerald-200' },
  cancelled: { label: 'Đã hủy', color: 'text-red-800', bg: 'bg-red-100 border-red-200' },
};

const PARTNER_OPTIONS = [
  { id: 'all', label: 'Tất cả 6 dòng (133 SP)' },
  { id: 'matcha-tra-laka', label: 'Matcha & Trà' },
  { id: 'nuoc-mia-iqf', label: 'Nước Mía Tuyết' },
  { id: 'thao-duoc-sam', label: 'Thảo Dược Sâm' },
  { id: 'ca-phe-vien-say', label: 'Cà Phê' },
  { id: 'dac-san-snack', label: 'Đặc Sản & Snack' },
  { id: 'socola-qua-tang', label: 'Socola & Quà Tặng' },
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

export const AdminOrderDashboard: React.FC<AdminOrderDashboardProps> = ({
  isOpen,
  onClose,
  currency,
  exchangeRate,
}) => {
  // Navigation screen
  const [activeScreen, setActiveScreen] = useState<AdminScreen>('dashboard');

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

  // Products & Financials State
  const [financialsList, setFinancialsList] = useState<AdminProductFinancialItem[]>(() =>
    getAdminProductFinancials()
  );
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [selectedPartnerFilter, setSelectedPartnerFilter] = useState('all');
  const [financialFilterMode, setFinancialFilterMode] = useState<'all' | 'loss_only' | 'no_cost'>('all');
  const [unsavedEdits, setUnsavedEdits] = useState<
    Record<
      string,
      {
        cost?: number;
        retail?: number;
        wholesale1?: number;
        wholesale2?: number;
        wholesale3?: number;
      }
    >
  >({});
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

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

  // Sync orders from localStorage
  const loadOrders = () => {
    try {
      const stored = localStorage.getItem('chutchiu_orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc orders từ localStorage:', e);
    }

    // Default sample orders showcasing realistic F&B B2B transactions
    const sampleOrders: SavedOrder[] = [
      {
        id: 'GR-839201',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        customerName: 'Anh Minh (The Coffee House Đakao)',
        phone: '0908123456',
        email: 'minh.thecoffeehouse@gmail.com',
        address: '28 Thảo Điền, P. Thảo Điền, TP. Thủ Đức, TP.HCM',
        notes: 'Giao trong buổi sáng, kiểm tra hạn sử dụng trên bao bì mía tuyết',
        isVATRequested: true,
        companyName: 'Công ty TNHH Cà Phê Mộc Sài Gòn',
        taxId: '0314892012',
        paymentMethod: 'vietqr',
        status: 'confirmed',
        finalTotalVND: 4200000,
        items: [
          {
            product: {
              id: 'vua-mia-tuyet-350ml',
              name: 'Nước Mía Tuyết Tiệt Trùng IQF (350ml)',
              image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
              partnerName: 'Nước Mía Tuyết',
              unit: 'gói 350ml',
              wholesaleUnit: 'THÙNG',
            },
            quantity: 10,
            purchaseMode: 'wholesale',
            unitPriceVND: 350000,
            subtotalVND: 3500000,
            activeTierLabel: 'Sỉ Cấp 2 (Từ 10 Thùng)',
          },
          {
            product: {
              id: 'vtn-matcha-laka-premium',
              name: 'Bột Matcha Thượng Hạng Premium (Túi 500g)',
              image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
              partnerName: 'Matcha & Trà',
              unit: 'túi 500g',
              wholesaleUnit: 'KG',
            },
            quantity: 2,
            purchaseMode: 'wholesale',
            unitPriceVND: 350000,
            subtotalVND: 700000,
            activeTierLabel: 'Sỉ Cấp 1',
          },
        ],
      },
      {
        id: 'GR-839182',
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        customerName: 'Chị Mai Lan (Quán Xôi & Bánh Mì Cô Ba)',
        phone: '0912345678',
        email: 'mailan.coba@gmail.com',
        address: '154 Hai Bà Trưng, P. Tân Định, Q.1, TP.HCM',
        notes: 'Chà bông nước mắm lấy loại sợi tơi xốp, đóng túi 1kg',
        isVATRequested: false,
        paymentMethod: 'vietqr',
        status: 'shipping',
        finalTotalVND: 2650000,
        items: [
          {
            product: {
              id: 'phu-nha-cha-bong-heo-nuoc-mam',
              name: 'Chà Bông Heo Nước Mắm Nhĩ Thượng Hạng (Túi 1KG)',
              image: '/images/phunha/cha-bong-heo-truyen-thong.jpg',
              partnerName: 'Đặc Sản & Snack',
              unit: 'túi 1kg',
              wholesaleUnit: 'KG',
            },
            quantity: 10,
            purchaseMode: 'wholesale',
            unitPriceVND: 265000,
            subtotalVND: 2650000,
            activeTierLabel: 'Sỉ 10kg-20kg',
          },
        ],
      },
      {
        id: 'GR-839105',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        customerName: 'Trần Văn Hưng (Quà Tặng Doanh Nghiệp)',
        phone: '0987654321',
        email: 'hung.tran@anphugroup.vn',
        address: 'Tòa nhà Landmark 81, P.22, Q. Bình Thạnh, TP.HCM',
        notes: 'Hộp quà sâm dây Kon Tum và Trà thảo mộc cao cấp kèm thiệp chúc mừng',
        isVATRequested: true,
        companyName: 'Tập đoàn Đầu tư An Phú',
        taxId: '0316789123',
        paymentMethod: 'vietqr',
        status: 'completed',
        finalTotalVND: 3850000,
        items: [
          {
            product: {
              id: 'dato-sam-day-ngoc-linh-kho-100g',
              name: 'Sâm Dây Ngọc Linh Sấy Khô Thượng Hạng (Hộp 100g)',
              image: '/images/dato/sam-day-ngoc-linh-kon-tum.jpg',
              partnerName: 'Thảo Dược Sâm',
              unit: 'hộp 100g',
              wholesaleUnit: 'KG',
            },
            quantity: 5,
            purchaseMode: 'wholesale',
            unitPriceVND: 770000,
            subtotalVND: 3850000,
            activeTierLabel: 'Sỉ Cấp 1',
          },
        ],
      },
      {
        id: 'GR-839090',
        createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
        customerName: 'Khách sạn Caravelle Saigon',
        phone: '0903998877',
        email: 'procurement@caravellehotel.com',
        address: '19-23 Lam Sơn Square, Bến Nghé, Quận 1, TP.HCM',
        notes: 'Set quà tặng Socola Nón Lá cao cấp và Cà Phê Viên Sấy thăng hoa cho khách VIP',
        isVATRequested: true,
        companyName: 'Công ty CP Du Lịch Sài Gòn',
        taxId: '0300456123',
        paymentMethod: 'b2b_credit',
        status: 'completed',
        finalTotalVND: 6500000,
        items: [
          {
            product: {
              id: 'socola-set-non-la-cao-cap',
              name: 'Set Hộp Quà Socola Nón Lá Truyền Thống Việt Nam',
              image: '/images/socola/set-non-la-dac-biet.jpg',
              partnerName: 'Socola & Quà Tặng',
              unit: 'hộp',
              wholesaleUnit: 'SET',
            },
            quantity: 20,
            purchaseMode: 'wholesale',
            unitPriceVND: 250000,
            subtotalVND: 5000000,
            activeTierLabel: 'Sỉ Cấp 2',
          },
          {
            product: {
              id: 'nonla-vien-08-box',
              name: 'Hộp Cà Phê Viên Sấy Thăng Hoa Mix 8 Vị',
              image: '/images/nonla/hop-8-vien-mix.jpg',
              partnerName: 'Cà Phê',
              unit: 'hộp 8 viên',
              wholesaleUnit: 'HỘP',
            },
            quantity: 10,
            purchaseMode: 'wholesale',
            unitPriceVND: 150000,
            subtotalVND: 1500000,
            activeTierLabel: 'Sỉ Cấp 1',
          },
        ],
      },
    ];

    setOrders(sampleOrders);
    try {
      localStorage.setItem('chutchiu_orders', JSON.stringify(sampleOrders));
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadOrders();
      setFinancialsList(getAdminProductFinancials());
    }
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

  // Order management actions
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
    }
  };

  // -------------------------------------------------------------
  // FINANCIALS EDITING HANDLERS
  // -------------------------------------------------------------
  const handleEditCell = (
    productId: string,
    field: 'cost' | 'retail' | 'wholesale1' | 'wholesale2' | 'wholesale3',
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
    const multiplier = product.unitsPerWholesale || 1;
    if (edit.wholesale1 !== undefined) newWholesalePrices.wholesale1 = edit.wholesale1 * multiplier;
    if (edit.wholesale2 !== undefined) newWholesalePrices.wholesale2 = edit.wholesale2 * multiplier;
    if (edit.wholesale3 !== undefined) newWholesalePrices.wholesale3 = edit.wholesale3 * multiplier;

    saveSingleProductAdminData(product.id, {
      cost: edit.cost,
      prices: Object.keys(newPrices).length > 0 ? newPrices : undefined,
      wholesalePrices: Object.keys(newWholesalePrices).length > 0 ? newWholesalePrices : undefined,
    });

    setUnsavedEdits((prev) => {
      const copy = { ...prev };
      delete copy[product.id];
      return copy;
    });

    setSaveSuccessMsg(`Đã cập nhật giá & giá vốn cho "${product.name}"!`);
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
      const multiplier = prod.unitsPerWholesale || 1;
      if (edit.wholesale1 !== undefined) newWholesalePrices.wholesale1 = edit.wholesale1 * multiplier;
      if (edit.wholesale2 !== undefined) newWholesalePrices.wholesale2 = edit.wholesale2 * multiplier;
      if (edit.wholesale3 !== undefined) newWholesalePrices.wholesale3 = edit.wholesale3 * multiplier;

      saveSingleProductAdminData(id, {
        cost: edit.cost,
        prices: Object.keys(newPrices).length > 0 ? newPrices : undefined,
        wholesalePrices: Object.keys(newWholesalePrices).length > 0 ? newWholesalePrices : undefined,
      });
    });

    setUnsavedEdits({});
    setSaveSuccessMsg(`Đã lưu thành công thay đổi cho ${productIds.length} sản phẩm! Trang chủ đã đồng bộ ngay lập tức.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleResetRow = (productId: string) => {
    if (window.confirm('Khôi phục sản phẩm này về giá mặc định ban đầu từ code/chat?')) {
      resetProductToDefault(productId);
      setUnsavedEdits((prev) => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
      setSaveSuccessMsg('Đã khôi phục giá gốc thành công!');
      setTimeout(() => setSaveSuccessMsg(null), 2500);
    }
  };

  const handleResetAll = () => {
    if (
      window.confirm(
        'Bạn có chắc chắn muốn khôi phục TOÀN BỘ 133 sản phẩm về giá gốc được định nghĩa trong mã nguồn (Chat)? Toàn bộ ghi đè thủ công sẽ được đặt lại.'
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
      const rest = prev.filter((_, idx) => idx !== indexToPromote);
      return [item, ...rest];
    });
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

    setSaveSuccessMsg(
      `Đã lưu cập nhật bộ sưu tập (${newGallery.length} ảnh) cho "${selectedProductForUpload.name}"! Ảnh chính đã đồng bộ ra trang chủ.`
    );
    setTimeout(() => setSaveSuccessMsg(null), 3500);
    setSelectedProductForUpload(null);
    setTempImagesList([]);
    setCustomImageUrlInput('');
  };

  // -------------------------------------------------------------
  // FILTERING & METRICS COMPUTATIONS
  // -------------------------------------------------------------
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;
      const matchSearch =
        !orderSearchQuery.trim() ||
        order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        order.phone.includes(orderSearchQuery) ||
        (order.email && order.email.toLowerCase().includes(orderSearchQuery.toLowerCase())) ||
        order.address.toLowerCase().includes(orderSearchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [orders, orderStatusFilter, orderSearchQuery]);

  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.finalTotalVND, 0);
  }, [orders]);

  // Screen 1: Dashboard Top 5 Best Sellers
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
      }
    > = {};

    // Aggregate from existing orders
    orders.forEach((ord) => {
      if (ord.status === 'cancelled') return;
      ord.items.forEach((item) => {
        const pid = item.product.id;
        const currentProd = financialsList.find((p) => p.id === pid);
        const cost = currentProd ? currentProd.cost : 0;
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
          };
        }
        map[pid].totalQty += item.quantity;
        map[pid].totalRevenue += item.subtotalVND;
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
          sorted.push({
            id: prod.id,
            name: prod.name,
            image: prod.image,
            partnerName: prod.partnerName,
            unit: prod.unit,
            totalQty: 25 - idx * 4,
            totalRevenue: (25 - idx * 4) * prod.prices.retail,
            cost: prod.cost,
          });
        }
      }
    });

    return sorted.slice(0, 5);
  }, [orders, financialsList]);

  // Filtered Financials List for Screen 2
  const filteredFinancials = useMemo(() => {
    return financialsList.filter((item) => {
      const matchPartner = selectedPartnerFilter === 'all' || item.partnerId === selectedPartnerFilter;
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
      }

      return matchPartner && matchSearch && matchFilterMode;
    });
  }, [financialsList, selectedPartnerFilter, productSearchQuery, financialFilterMode]);

  // Filtered Images List for Screen 3
  const filteredImages = useMemo(() => {
    return financialsList.filter((item) => {
      const matchPartner = imagePartnerFilter === 'all' || item.partnerId === imagePartnerFilter;
      const matchSearch =
        !imageSearchQuery.trim() ||
        item.name.toLowerCase().includes(imageSearchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(imageSearchQuery.toLowerCase());
      return matchPartner && matchSearch;
    });
  }, [financialsList, imagePartnerFilter, imageSearchQuery]);

  const lossCount = useMemo(() => {
    return financialsList.filter((p) => p.hasLoss).length;
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
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white p-1.5 shadow-lg border border-amber-400/40 flex items-center justify-center mb-3">
              <img
                src="https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png"
                alt="Logo G-ROOSTER"
                className="w-full h-full object-contain"
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
  // AUTHENTICATED ADMIN FULL-FEATURED WORKSPACE
  // -------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 flex flex-col w-screen h-screen bg-[#f8faf9] overflow-hidden font-sans">
      <div
        className="relative w-full h-full bg-[#f8faf9] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <header className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#051e12] via-[#092d1b] to-[#0f3c25] text-white flex items-center justify-between border-b border-emerald-900/60 shrink-0 w-full">
          <div className="flex items-center gap-3">
            {/* White rounded box with G-ROOSTER Logo */}
            <div className="bg-white rounded-xl p-1.5 shadow-sm shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 border border-stone-200">
              <img
                src="https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png"
                alt="Logo G-ROOSTER"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black tracking-tight font-heading text-white">
                  G-ROOSTER CO.,LTD
                </h2>
                <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-stone-950 uppercase tracking-wider">
                  ADMIN HUB
                </span>
                {lossCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white flex items-center gap-1 animate-pulse">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{lossCount} SP cảnh báo lỗ!</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-300 font-medium">
                Hệ thống Quản trị Đồng bộ 2 Chiều: 133 Sản Phẩm • 6 Dòng Chiến Lược • Giá Vốn & Lợi Nhuận
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setFinancialsList(getAdminProductFinancials());
                loadOrders();
                setSaveSuccessMsg('Dữ liệu hệ thống đã được đồng bộ mới nhất!');
                setTimeout(() => setSaveSuccessMsg(null), 2500);
              }}
              className="p-2 text-stone-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              title="Đồng bộ / Làm mới dữ liệu"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleAdminLogout}
              className="px-3 py-1.5 rounded-xl bg-red-900/60 hover:bg-red-800 text-red-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-red-700/60 transition-colors cursor-pointer"
              title="Đăng xuất"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng Xuất</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Đóng"
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

        {/* Navigation Tabs (4 Màn Hình Cốt Lõi) */}
        <div className="bg-white border-b border-stone-200 px-3 sm:px-5 py-2 flex items-center justify-between gap-3 shrink-0 shadow-2xs">
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none min-w-0 mr-2">
            {[
              { id: 'dashboard' as AdminScreen, label: 'Bảng Điều Khiển', icon: LayoutDashboard },
              {
                id: 'financials' as AdminScreen,
                label: 'Sản Phẩm & Giá (133 SP)',
                icon: DollarSign,
                badge: lossCount > 0 ? `${lossCount} cảnh báo` : undefined,
              },
              { id: 'images' as AdminScreen, label: 'Bộ Sưu Tập Ảnh', icon: ImageIcon },
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
                        tab.id === 'financials' && lossCount > 0
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

          {/* V167: CÔNG CỤ XUẤT DỮ LIỆU & LƯU MÃ NGUỒN CÂN ĐỐI, SANG TRỌNG, KHÔNG BỊ TRÀN VIỀN */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 ml-auto">
            {/* Nút Vàng Nổi Bật: 📥 XUẤT DỮ LIỆU */}
            <button
              type="button"
              onClick={handleOpenExportSyncModal}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.98] border border-amber-300 shrink-0 whitespace-nowrap"
              title="Xuất đoạn mã JSON đồng bộ toàn bộ ảnh, giá vốn và giá bán để dán vào AI Studio"
            >
              <Download className="w-4 h-4 text-stone-950 shrink-0" />
              <span className="font-heading tracking-tight uppercase whitespace-nowrap">📥 Xuất Dữ Liệu</span>
            </button>

            {/* Nút 1: Lưu (Save) - Hiển thị 100% đầy đủ chữ và icon, không bao giờ bị cắt cụt hay tràn viền */}
            <button
              type="button"
              disabled={isSyncingGit}
              onClick={handleSyncToGitCodebase}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#06331a] hover:bg-[#0a4724] text-white font-bold text-xs flex items-center gap-1.5 sm:gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-50 border border-emerald-700/60 active:scale-[0.98] shrink-0 whitespace-nowrap"
              title="Lưu toàn bộ link ảnh, giá vốn & giá bán vào mã nguồn (src/data/productOverrides.json) trước khi Push GitHub"
            >
              {isSyncingGit ? (
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300 shrink-0" />
              ) : (
                <Save className="w-4 h-4 text-amber-300 shrink-0" />
              )}
              <span className="font-heading tracking-tight whitespace-nowrap text-amber-300">💾 Lưu Mã Nguồn</span>
            </button>

            {/* Công cụ bổ trợ: Đồng bộ Web & Sao lưu JSON */}
            <div className="flex items-center gap-1 pl-1 border-l border-stone-200">
              <button
                type="button"
                disabled={isSyncingLive}
                onClick={handleSyncWithLiveSite}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                title="Kiểm tra & đồng bộ 2 chiều với website https://g-rooster.com"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-stone-600 shrink-0 ${isSyncingLive ? 'animate-spin' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => setIsBackupModalOpen(true)}
                className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 transition-colors cursor-pointer shrink-0"
                title="Xuất hoặc nạp bản sao lưu JSON toàn diện"
              >
                <Download className="w-3.5 h-3.5 text-stone-600 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area with dynamic screen rendering */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5">
          {/* =========================================================
              MÀN HÌNH 1: BẢNG ĐIỀU KHIỂN (DASHBOARD)
             ========================================================= */}
          {activeScreen === 'dashboard' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Stat 1: Total Orders */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs text-stone-500 font-semibold">Tổng Đơn Hàng</p>
                    <h3 className="text-2xl font-black text-stone-900 mt-1 font-heading">
                      {orders.length} đơn
                    </h3>
                    <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{orders.filter((o) => o.status === 'completed').length} đơn đã hoàn tất</span>
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                </div>

                {/* Stat 2: Expected Revenue */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs text-stone-500 font-semibold">Doanh Thu Dự Kiến</p>
                    <h3 className="text-2xl font-black text-emerald-900 mt-1 font-heading">
                      {formatAdminPrice(totalRevenue, currency, exchangeRate)}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium mt-1">
                      Tính trên các đơn hàng hợp lệ
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>

                {/* Stat 3: Total Products Managed */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs text-stone-500 font-semibold">Sản Phẩm Đang Chạy</p>
                    <h3 className="text-2xl font-black text-stone-900 mt-1 font-heading">
                      133 Sản Phẩm
                    </h3>
                    <p className="text-[11px] text-blue-700 font-medium mt-1">
                      6 Dòng phân phối chiến lược
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-800">
                    <Package className="w-6 h-6" />
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

              {/* Top 5 Best Selling Products Section */}
              <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-800" />
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-stone-900 font-heading">
                        TOP 5 SẢN PHẨM BÁN CHẠY NHẤT
                      </h3>
                      <p className="text-xs text-stone-500">
                        Xếp hạng dựa trên khối lượng tiêu thụ sỉ/lẻ và doanh thu thực tế
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

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-3">Hạng</th>
                        <th className="py-2.5 px-3">Sản phẩm</th>
                        <th className="py-2.5 px-3">Dòng chiến lược</th>
                        <th className="py-2.5 px-3 text-right">Số lượng bán</th>
                        <th className="py-2.5 px-3 text-right">Doanh thu tạo ra</th>
                        <th className="py-2.5 px-3 text-right">Giá vốn</th>
                        <th className="py-2.5 px-3 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {topBestSellers.map((item, index) => {
                        const rankMedals = ['🥇 #1', '🥈 #2', '🥉 #3', '#4', '#5'];
                        return (
                          <tr key={item.id} className="hover:bg-stone-50 transition-colors">
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
                              {item.cost > 0 ? (
                                <span>{formatAdminPrice(item.cost, currency, exchangeRate)}</span>
                              ) : (
                                <span className="text-amber-600 italic">Chưa đặt</span>
                              )}
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

              {/* 6 Strategic Categories Overview */}
              <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs">
                <h3 className="text-sm font-black text-stone-900 mb-3 font-heading uppercase">
                  CƠ CẤU 6 DÒNG SẢN PHẨM PHÂN PHỐI CHIẾN LƯỢC
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  {PARTNER_OPTIONS.filter((p) => p.id !== 'all').map((partner) => {
                    const count = financialsList.filter((p) => p.partnerId === partner.id).length;
                    const partnerLossCount = financialsList.filter(
                      (p) => p.partnerId === partner.id && p.hasLoss
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
              MÀN HÌNH 2: QUẢN LÝ SẢN PHẨM & TÀI CHÍNH (133 SP)
             ========================================================= */}
          {activeScreen === 'financials' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Header Action Bar */}
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                {/* Search & Category Filter */}
                <div className="flex flex-wrap items-center gap-2 flex-1">
                  <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={productSearchQuery}
                      onChange={(e) => setProductSearchQuery(e.target.value)}
                      placeholder="Tìm theo tên sản phẩm, mã ID..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                    />
                    {productSearchQuery && (
                      <button
                        onClick={() => setProductSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Partner select */}
                  <select
                    value={selectedPartnerFilter}
                    onChange={(e) => setSelectedPartnerFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
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
                    className="px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                  >
                    <option value="all">Tất cả tình trạng tài chính</option>
                    <option value="loss_only">⚠️ Chỉ SP cảnh báo LỖ (Bán &lt; Vốn)</option>
                    <option value="no_cost">Chưa có Giá Vốn</option>
                  </select>

                  <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-1.5 rounded-xl border border-stone-200 shrink-0">
                    Hiển thị: {filteredFinancials.length} / 133 SP
                  </span>
                </div>

                {/* Main Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  {/* V166: Nút xuất dữ liệu cho AI Studio ngay trong màn hình tài chính */}
                  <button
                    type="button"
                    onClick={handleOpenExportSyncModal}
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-stone-950 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border border-amber-300"
                    title="Xuất mã JSON đồng bộ toàn bộ giá vốn, giá bán và hình ảnh để dán vào AI Studio"
                  >
                    <Download className="w-3.5 h-3.5 text-stone-950" />
                    <span>📥 Xuất Dữ Liệu Cho AI Studio</span>
                  </button>

                  {/* Bulk Price Adjust trigger */}
                  <button
                    onClick={() => setIsBulkModalOpen(true)}
                    className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Tăng / Giảm giá theo % cho một dòng sản phẩm"
                  >
                    <Percent className="w-3.5 h-3.5 text-purple-700" />
                    <span>Sửa Giá Nhanh Theo Nhóm (%)</span>
                  </button>

                  {/* Save All Edits */}
                  <button
                    onClick={handleSaveAllEdits}
                    className="px-4 py-2 rounded-xl bg-[#062415] hover:bg-[#0a3520] text-amber-300 text-xs font-black shadow-md transition-all flex items-center gap-1.5 border border-amber-400/40 cursor-pointer active:scale-98"
                  >
                    <Save className="w-4 h-4 text-amber-400" />
                    <span>LƯU TOÀN BỘ ({Object.keys(unsavedEdits).length})</span>
                  </button>

                  {/* Reset All to defaults from Chat / Code */}
                  <button
                    onClick={handleResetAll}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 text-xs font-semibold transition-colors cursor-pointer"
                    title="Đồng bộ lại toàn bộ với dữ liệu gốc (Chat/Code)"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Financials Table */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col flex-1">
                <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-215px)] scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-stone-100">
                  <table className="w-full min-w-[1080px] text-left text-xs border-collapse">
                    <thead className="sticky top-0 z-20 bg-stone-100 border-b border-stone-200 text-stone-700 font-bold uppercase tracking-wider text-[10px] shadow-2xs">
                      <tr>
                        <th className="py-2.5 px-2 w-10 text-center">STT</th>
                        <th className="py-2.5 px-3 min-w-[210px]">Sản Phẩm & Dòng</th>
                        <th className="py-2.5 px-2.5 w-[130px] min-w-[120px] bg-amber-50/80 border-x border-amber-200/60 text-right">
                          <div className="flex items-center gap-1 text-amber-900 justify-end">
                            <Lock className="w-3 h-3 text-amber-700" />
                            <span>GIÁ VỐN (Cost)</span>
                          </div>
                        </th>
                        <th className="py-2.5 px-2.5 w-[145px] min-w-[135px] text-right">
                          <div className="font-bold text-stone-900">GIÁ LẺ (1-2 SP)</div>
                          <div className="text-[9px] text-stone-400 font-normal">Lời (đ) • Biên %</div>
                        </th>
                        <th className="py-2.5 px-2.5 w-[145px] min-w-[135px] bg-stone-50/60 text-right">
                          <div className="font-bold text-stone-900">GIÁ SỈ 1</div>
                          <div className="text-[9px] text-stone-400 font-normal">Lời (đ) • Biên %</div>
                        </th>
                        <th className="py-2.5 px-2.5 w-[145px] min-w-[135px] text-right">
                          <div className="font-bold text-stone-900">GIÁ SỈ 2</div>
                          <div className="text-[9px] text-stone-400 font-normal">Lời (đ) • Biên %</div>
                        </th>
                        <th className="py-2.5 px-2.5 w-[145px] min-w-[135px] bg-stone-50/60 text-right">
                          <div className="font-bold text-stone-900">GIÁ SỈ 3</div>
                          <div className="text-[9px] text-stone-400 font-normal">Lời (đ) • Biên %</div>
                        </th>
                        <th className="py-2.5 px-2 w-20 text-center sticky right-0 bg-stone-100 border-l border-stone-200 z-10 shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.06)]">
                          Thao Tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {filteredFinancials.map((item, idx) => {
                        const edit = unsavedEdits[item.id] || {};
                        const currentCost = edit.cost !== undefined ? edit.cost : item.cost;
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
                        const isRowModified = !!unsavedEdits[item.id];

                        return (
                          <tr
                            key={item.id}
                            className={`transition-colors ${
                              hasAnyLoss
                                ? 'bg-red-50/50 hover:bg-red-50'
                                : isRowModified
                                ? 'bg-amber-50/40 hover:bg-amber-50/60'
                                : 'hover:bg-stone-50'
                            }`}
                          >
                            {/* STT */}
                            <td className="py-1.5 px-2 text-center font-mono text-stone-400 text-xs">
                              {idx + 1}
                            </td>

                            {/* Product Info */}
                            <td className="py-1.5 px-3">
                              <div className="flex items-center gap-2">
                                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-stone-900 truncate leading-tight text-xs" title={item.name}>
                                    {item.name}
                                  </p>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[9px] text-emerald-800 font-semibold bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200 truncate max-w-[130px]">
                                      {item.partnerName}
                                    </span>
                                    <span className="text-[9px] text-stone-500 font-mono shrink-0">
                                      {item.unit}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Cost Input (Giá Vốn) */}
                            <td className="py-1.5 px-2.5 bg-amber-50/40 border-x border-amber-200/50">
                              <div className="relative">
                                <CurrencyInput
                                  value={currentCost}
                                  onChange={(val) =>
                                    handleEditCell(item.id, 'cost', val)
                                  }
                                  className="w-full px-2 py-1 rounded-md border border-amber-300 font-mono text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-right"
                                  placeholder="0"
                                />
                                <span className="text-[8px] text-stone-400 block text-right mt-0.2 font-mono">
                                  VNĐ
                                </span>
                              </div>
                            </td>

                            {/* Retail Price Column */}
                            <td className="py-1.5 px-2.5">
                              <div
                                className={`p-1 rounded-lg border ${
                                  finRetail.isLoss
                                    ? 'bg-red-100 border-red-300 text-red-900'
                                    : 'border-transparent'
                                }`}
                              >
                                <CurrencyInput
                                  value={retailPrice}
                                  onChange={(val) =>
                                    handleEditCell(item.id, 'retail', val)
                                  }
                                  className={`w-full px-2 py-1 rounded-md border font-mono text-xs font-bold text-right ${
                                    finRetail.isLoss
                                      ? 'border-red-400 bg-white text-red-700'
                                      : 'border-stone-300 bg-white text-stone-900 focus:ring-1 focus:ring-emerald-700'
                                  }`}
                                />
                                <div className="flex items-center justify-between text-[10px] mt-0.5 font-mono">
                                  <span
                                    className={
                                      finRetail.isLoss
                                        ? 'text-red-700 font-bold'
                                        : 'text-emerald-700 font-medium'
                                    }
                                  >
                                    {finRetail.profit >= 0 ? '+' : ''}
                                    {formatCommaNumber(finRetail.profit)}₫
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
                                  <p className="text-[8px] text-red-700 font-bold mt-0.2 flex items-center gap-0.5">
                                    <AlertTriangle className="w-2.5 h-2.5" />
                                    <span>LỖ (Bán &lt; Vốn)</span>
                                  </p>
                                )}
                              </div>
                            </td>

                            {/* Wholesale 1 */}
                            <td className="py-1.5 px-2.5 bg-stone-50/50">
                              <div
                                className={`p-1 rounded-lg border ${
                                  finWs1.isLoss
                                    ? 'bg-red-100 border-red-300 text-red-900'
                                    : 'border-transparent'
                                }`}
                              >
                                <CurrencyInput
                                  value={ws1Price}
                                  onChange={(val) =>
                                    handleEditCell(item.id, 'wholesale1', val)
                                  }
                                  className={`w-full px-2 py-1 rounded-md border font-mono text-xs font-bold text-right ${
                                    finWs1.isLoss
                                      ? 'border-red-400 bg-white text-red-700'
                                      : 'border-stone-300 bg-white text-stone-900 focus:ring-1 focus:ring-emerald-700'
                                  }`}
                                />
                                <div className="flex items-center justify-between text-[10px] mt-0.5 font-mono">
                                  <span
                                    className={
                                      finWs1.profit >= 0
                                        ? 'text-emerald-700 font-medium'
                                        : 'text-red-700 font-bold'
                                    }
                                  >
                                    {finWs1.profit >= 0 ? '+' : ''}
                                    {formatCommaNumber(finWs1.profit)}₫
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
                                  <p className="text-[8px] text-red-700 font-bold mt-0.2 flex items-center gap-0.5">
                                    <AlertTriangle className="w-2.5 h-2.5" />
                                    <span>LỖ</span>
                                  </p>
                                )}
                              </div>
                            </td>

                            {/* Wholesale 2 */}
                            <td className="py-1.5 px-2.5">
                              <div
                                className={`p-1 rounded-lg border ${
                                  finWs2.isLoss
                                    ? 'bg-red-100 border-red-300 text-red-900'
                                    : 'border-transparent'
                                }`}
                              >
                                <CurrencyInput
                                  value={ws2Price}
                                  onChange={(val) =>
                                    handleEditCell(item.id, 'wholesale2', val)
                                  }
                                  className={`w-full px-2 py-1 rounded-md border font-mono text-xs font-bold text-right ${
                                    finWs2.isLoss
                                      ? 'border-red-400 bg-white text-red-700'
                                      : 'border-stone-300 bg-white text-stone-900 focus:ring-1 focus:ring-emerald-700'
                                  }`}
                                />
                                <div className="flex items-center justify-between text-[10px] mt-0.5 font-mono">
                                  <span
                                    className={
                                      finWs2.profit >= 0
                                        ? 'text-emerald-700 font-medium'
                                        : 'text-red-700 font-bold'
                                    }
                                  >
                                    {finWs2.profit >= 0 ? '+' : ''}
                                    {formatCommaNumber(finWs2.profit)}₫
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
                                  <p className="text-[8px] text-red-700 font-bold mt-0.2 flex items-center gap-0.5">
                                    <AlertTriangle className="w-2.5 h-2.5" />
                                    <span>LỖ</span>
                                  </p>
                                )}
                              </div>
                            </td>

                            {/* Wholesale 3 */}
                            <td className="py-1.5 px-2.5 bg-stone-50/50">
                              <div
                                className={`p-1 rounded-lg border ${
                                  finWs3.isLoss
                                    ? 'bg-red-100 border-red-300 text-red-900'
                                    : 'border-transparent'
                                }`}
                              >
                                <CurrencyInput
                                  value={ws3Price}
                                  onChange={(val) =>
                                    handleEditCell(item.id, 'wholesale3', val)
                                  }
                                  className={`w-full px-2 py-1 rounded-md border font-mono text-xs font-bold text-right ${
                                    finWs3.isLoss
                                      ? 'border-red-400 bg-white text-red-700'
                                      : 'border-stone-300 bg-white text-stone-900 focus:ring-1 focus:ring-emerald-700'
                                  }`}
                                />
                                <div className="flex items-center justify-between text-[10px] mt-0.5 font-mono">
                                  <span
                                    className={
                                      finWs3.profit >= 0
                                        ? 'text-emerald-700 font-medium'
                                        : 'text-red-700 font-bold'
                                    }
                                  >
                                    {finWs3.profit >= 0 ? '+' : ''}
                                    {formatCommaNumber(finWs3.profit)}₫
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
                                  <p className="text-[8px] text-red-700 font-bold mt-0.2 flex items-center gap-0.5">
                                    <AlertTriangle className="w-2.5 h-2.5" />
                                    <span>LỖ</span>
                                  </p>
                                )}
                              </div>
                            </td>

                            {/* Actions Column */}
                            <td className="py-1.5 px-2 text-center sticky right-0 bg-white border-l border-stone-200 z-10 shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.06)]">
                              <div className="flex items-center justify-center gap-1">
                                {isRowModified && (
                                  <button
                                    onClick={() => handleSaveSingleRow(item)}
                                    className="p-1 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs cursor-pointer"
                                    title="Lưu dòng này"
                                  >
                                    <Save className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleResetRow(item.id)}
                                  className="p-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
                                  title="Khôi phục giá gốc mã nguồn (Chat)"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
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
                    Cập nhật và sắp xếp hình ảnh thực tế cho 133 sản phẩm trên toàn hệ thống
                  </p>
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  Hiển thị: <strong className="text-stone-900">{filteredImages.length}</strong> / 133 sản phẩm
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <div className="relative min-w-[240px] flex-1">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={imageSearchQuery}
                      onChange={(e) => setImageSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm sản phẩm để thay ảnh..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                    />
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

                <div className="text-xs text-stone-500 font-medium">
                  Hiển thị: <strong>{filteredImages.length}</strong> / 133 sản phẩm
                </div>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                {filteredImages.map((product) => {
                  const galleryCount = product.images?.length || 1;
                  const hasMultiImages = product.images && product.images.length > 1;

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-stone-200 p-3.5 shadow-xs flex flex-col justify-between hover:border-emerald-600 transition-all group"
                    >
                      <div>
                        {/* Image Preview Box */}
                        <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 mb-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          {/* Badges */}
                          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                            {product.isCustomImage && (
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

                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs">
                            {product.partnerName}
                          </span>
                        </div>

                        {/* Gallery Thumbnails Strip (nếu sản phẩm có từ 2 ảnh trở lên) */}
                        {hasMultiImages && (
                          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 mb-2">
                            {product.images!.slice(0, 5).map((thumbUrl, thumbIdx) => (
                              <div
                                key={thumbIdx}
                                className={`w-8 h-8 rounded-lg overflow-hidden border bg-white shrink-0 ${
                                  thumbIdx === 0 ? 'border-emerald-600 ring-1 ring-emerald-500' : 'border-stone-200 opacity-75'
                                }`}
                                title={thumbIdx === 0 ? 'Ảnh đại diện chính' : `Ảnh #${thumbIdx + 1}`}
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

                        {/* Product Name */}
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-tight">
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-stone-500 font-mono mt-0.5">
                          ID: {product.id} • {product.unit}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-3 mt-3 border-t border-stone-100 flex items-center gap-1.5">
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
                <div className="text-[11px] font-mono bg-white/10 px-3 py-1 rounded-xl text-emerald-200 font-bold shrink-0 self-end sm:self-center">
                  Tổng {orders.length} Đơn Hàng
                </div>
              </div>

              {/* Order Status Filters & Search */}
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
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
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                  />
                </div>
              </div>

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
                    const statusInfo = STATUS_LABELS[order.status] || {
                      label: order.status,
                      color: 'text-stone-800',
                      bg: 'bg-stone-100 border-stone-200',
                    };
                    const cleanPhone = order.phone.replace(/[^0-9]/g, '');

                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs hover:border-emerald-700 transition-all"
                      >
                        {/* Summary Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-black text-sm text-[#062415] bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                              {order.id}
                            </span>
                            <div>
                              <h4 className="text-sm font-bold text-stone-900 leading-tight">
                                {order.customerName}
                              </h4>
                              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
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

                            {/* Fast Action 3: Email Khách Hàng */}
                            {order.email && (
                              <a
                                href={`mailto:${order.email}?subject=${encodeURIComponent(`[G-ROOSTER] Xác nhận đơn hàng #${order.id}`)}&body=${encodeURIComponent(`Kính gửi ${order.customerName},\n\nG-ROOSTER CO.,LTD xin chân thành cảm ơn Quý khách đã đặt đơn hàng #${order.id}.\n\nTổng thanh toán: ${formatAdminPrice(order.finalTotalVND, currency, exchangeRate)}\nĐịa chỉ nhận hàng: ${order.address}\n\nHotline: 0961 525 450 - 0938 7979 04\nKho phân phối: 44 Trần Đình Xu, P. Cầu Ông Lãnh, TP.HCM`)}`}
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
                                  className="p-2.5 bg-white flex items-center justify-between gap-3 text-xs"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <img
                                      src={it.product.image}
                                      alt={it.product.name}
                                      className="w-9 h-9 rounded-lg object-cover border border-stone-200 shrink-0"
                                      onError={(e) => {
                                        (e.target as HTMLElement).style.display = 'none';
                                      }}
                                    />
                                    <div className="min-w-0">
                                      <p className="font-bold text-stone-900 truncate">
                                        {it.product.name}
                                      </p>
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

      {/* =========================================================
          MODAL CON: SỬA GIÁ NHANH THEO NHÓM (%)
         ========================================================= */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
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
          MODAL CON: QUẢN LÝ BỘ SƯU TẬP ẢNH (V164 - SMART GALLERY)
         ========================================================= */}
      {selectedProductForUpload && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
          <div
            className="bg-white rounded-3xl p-5 sm:p-6 max-w-2xl w-full shadow-2xl border border-stone-200 space-y-4 my-auto max-h-[92vh] flex flex-col"
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
              <button
                onClick={() => {
                  setSelectedProductForUpload(null);
                  setTempImagesList([]);
                  setCustomImageUrlInput('');
                }}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                title="Đóng cửa sổ"
              >
                ✕
              </button>
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
                          {/* Khung ảnh vuông */}
                          <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                            <img
                              src={imgSrc}
                              alt={`Ảnh ${index + 1}`}
                              className="w-full h-full object-cover"
                            />

                            {/* Badge #1 ẢNH CHÍNH hoặc Ảnh phụ */}
                            <div className="absolute top-1.5 left-1.5 z-10">
                              {isMain ? (
                                <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-[#062415] text-amber-300 border border-emerald-600 shadow-xs flex items-center gap-1">
                                  <span>★</span>
                                  <span>ẢNH CHÍNH</span>
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-black/75 text-stone-200 font-mono">
                                  #{index + 1}
                                </span>
                              )}
                            </div>

                            {/* Nút Xóa (X / Thùng rác đỏ) ở góc phải phía trên */}
                            <button
                              type="button"
                              onClick={() => handleRemoveTempImage(index)}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer text-xs font-black z-10"
                              title="Xóa tấm ảnh này khỏi sản phẩm"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Thanh điều khiển dưới từng ảnh */}
                          <div className="p-1.5 bg-white border-t border-stone-100 flex items-center justify-between text-[10px]">
                            {!isMain ? (
                              <button
                                type="button"
                                onClick={() => handleSetMainImage(index)}
                                className="text-emerald-800 hover:text-emerald-950 font-bold hover:underline cursor-pointer flex items-center gap-0.5 truncate"
                                title="Đặt ảnh này làm Ảnh chính hiển thị ngoài Trang chủ"
                              >
                                <span>★ Đặt làm ảnh chính</span>
                              </button>
                            ) : (
                              <span className="text-emerald-800 font-black text-[10px] flex items-center gap-1">
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>Ảnh chính</span>
                              </span>
                            )}

                            {/* Nút đổi thứ tự hiển thị */}
                            <div className="flex items-center gap-0.5 ml-auto">
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveImage(index, 'left')}
                                  className="w-5 h-5 flex items-center justify-center bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-bold cursor-pointer transition-colors"
                                  title="Đẩy ảnh sang trái"
                                >
                                  ←
                                </button>
                              )}
                              {index < tempImagesList.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveImage(index, 'right')}
                                  className="w-5 h-5 flex items-center justify-center bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-bold cursor-pointer transition-colors"
                                  title="Đẩy ảnh sang phải"
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
                  onClick={() => {
                    setSelectedProductForUpload(null);
                    setTempImagesList([]);
                    setCustomImageUrlInput('');
                  }}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Hủy bỏ
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
                        setSelectedProductForUpload(null);
                        setTempImagesList([]);
                        setCustomImageUrlInput('');
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
                className="px-5 py-2.5 rounded-xl bg-[#062415] hover:bg-[#0a3520] disabled:bg-stone-300 text-amber-300 disabled:text-stone-500 text-xs font-black shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>
                  LƯU CẬP NHẬT BỘ SƯU TẬP ({tempImagesList.length} ẢNH)
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL CON: SAO LƯU & NẠP DỮ LIỆU JSON (V165 DATA PROTECTION)
         ========================================================= */}
      {isBackupModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
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
              {/* Highlight Instruction Box */}
              <div className="p-3.5 bg-gradient-to-br from-amber-50 to-emerald-50/70 border border-amber-200/80 rounded-2xl space-y-1.5">
                <p className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <span>💡</span>
                  <span>QUY TRÌNH ĐỒNG BỘ 2 BƯỚC CHO CHỦ DOANH NGHIỆP:</span>
                </p>
                <ol className="text-xs text-stone-700 space-y-1 list-decimal list-inside leading-relaxed pl-1">
                  <li>
                    Bấm nút <strong>'📋 SAO CHÉP MÃ ĐỒNG BỘ'</strong> màu vàng bên dưới.
                  </li>
                  <li>
                    Quay lại cửa sổ chat với AI Studio, <strong>Dán (Ctrl+V / Cmd+V)</strong> và gửi đi.
                  </li>
                </ol>
                <p className="text-[11px] text-emerald-900 font-semibold pt-1 border-t border-amber-200/50">
                  ✨ AI Studio sẽ ngay lập tức ghi đè vào tệp dữ liệu gốc (<code>src/data/products.ts</code>). Toàn bộ 133 sản phẩm bạn đã sửa sẽ vĩnh viễn nằm trong mã nguồn, không bao giờ mất khi Push GitHub!
                </p>
              </div>

              {/* Statistics Badges Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="text-[10px] font-bold text-stone-500 uppercase">Đã đổi ảnh</div>
                  <div className="text-base font-black text-emerald-800 font-mono mt-0.5">
                    {syncExportData.stats.imagesModified} <span className="text-xs font-normal">SP</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="text-[10px] font-bold text-stone-500 uppercase">Đã đổi giá bán</div>
                  <div className="text-base font-black text-amber-800 font-mono mt-0.5">
                    {syncExportData.stats.pricesModified} <span className="text-xs font-normal">SP</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="text-[10px] font-bold text-stone-500 uppercase">Đã lưu giá vốn</div>
                  <div className="text-base font-black text-blue-800 font-mono mt-0.5">
                    {syncExportData.stats.costsModified} <span className="text-xs font-normal">SP</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-[10px] font-bold text-emerald-800 uppercase">Tổng tùy chỉnh</div>
                  <div className="text-base font-black text-[#062415] font-mono mt-0.5">
                    {syncExportData.stats.totalCustomProducts} <span className="text-xs font-normal">SP</span>
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

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-3 border-t border-stone-100 shrink-0">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    downloadOverridesBackup();
                    setSaveSuccessMsg('Đã tải thành công tệp JSON sao lưu về máy tính!');
                    setTimeout(() => setSaveSuccessMsg(null), 3000);
                  }}
                  className="flex-1 sm:flex-none px-3 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Tải tệp JSON về máy tính dự phòng"
                >
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span>Tải File .JSON</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    await handleSyncToGitCodebase();
                    setIsExportSyncModalOpen(false);
                  }}
                  className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Lưu trực tiếp vào file productOverrides.json trên máy chủ dev"
                >
                  <Save className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Lưu Vào Mã Nguồn</span>
                </button>
              </div>

              {/* NÚT CHÍNH: SAO CHÉP MÃ ĐỒNG BỘ */}
              <button
                type="button"
                onClick={handleCopySyncCode}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-heading font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-[0.98] ${
                  copiedSyncCode
                    ? 'bg-emerald-700 text-white shadow-emerald-700/30'
                    : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-stone-950 shadow-amber-500/30'
                }`}
              >
                {copiedSyncCode ? (
                  <>
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                    <span>✓ ĐÃ CHÉP! HÃY DÁN VÀO CHAT VỚI AI STUDIO</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-950" />
                    <span>📋 SAO CHÉP MÃ ĐỒNG BỘ CHO AI STUDIO</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
