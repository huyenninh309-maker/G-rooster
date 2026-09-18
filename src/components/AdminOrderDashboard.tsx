import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { Currency } from '../types';
import { formatPrice } from '../utils/pricing';

export interface SavedOrder {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
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

const STATUS_LABELS: Record<SavedOrder['status'], { label: string; color: string; bg: string }> = {
  pending_payment: { label: 'Chờ thanh toán', color: 'text-amber-800', bg: 'bg-amber-100 border-amber-200' },
  confirmed: { label: 'Đã xác nhận', color: 'text-blue-800', bg: 'bg-blue-100 border-blue-200' },
  packing: { label: 'Đang đóng gói', color: 'text-indigo-800', bg: 'bg-indigo-100 border-indigo-200' },
  shipping: { label: 'Đang giao hàng', color: 'text-purple-800', bg: 'bg-purple-100 border-purple-200' },
  completed: { label: 'Hoàn tất', color: 'text-emerald-800', bg: 'bg-emerald-100 border-emerald-200' },
  cancelled: { label: 'Đã hủy', color: 'text-red-800', bg: 'bg-red-100 border-red-200' },
};

export const AdminOrderDashboard: React.FC<AdminOrderDashboardProps> = ({
  isOpen,
  onClose,
  currency,
  exchangeRate,
}) => {
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // ADMIN AUTHENTICATION GATE (V19):
  // Requires secret password 'Chutchiu2026' to view order records, VAT data, and customer info
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
      setPasswordError('Mật khẩu quản trị không chính xác. Vui lòng kiểm tra lại!');
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

  // Load orders from localStorage with realistic initial demo orders if empty
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
        id: 'CC-839201',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        customerName: 'Anh Minh (The Coffee House Đakao)',
        phone: '0908123456',
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
              name: 'Nước Mía Tuyết Tiệt Trùng Vua Mía (350ml)',
              image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
              partnerName: 'VUA MÍA',
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
              name: 'Bột Matcha Laka Premium (Túi 500g)',
              image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
              partnerName: 'VIỆT THẢO NHIÊN',
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
        id: 'CC-839182',
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        customerName: 'Chị Mai Lan (Quán Xôi & Bánh Mì Cô Ba)',
        phone: '0912345678',
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
              name: 'Chà Bông Heo Nước Mắm Nhĩ Phú Nhã (Túi 1KG)',
              image: '/images/phunha/cha-bong-heo-truyen-thong.jpg',
              partnerName: 'ĐẶC SẢN PHÚ NHÃ',
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
        id: 'CC-839105',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        customerName: 'Trần Văn Hưng (Quà Tặng Doanh Nghiệp)',
        phone: '0987654321',
        address: 'Tòa nhà Landmark 81, P.22, Q. Bình Thạnh, TP.HCM',
        notes: 'Hộp quà sâm dây Kon Tum và Trà thảo mộc DATO kèm thiệp chúc mừng',
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
              name: 'Sâm Dây Ngọc Linh Sấy Khô DATO (Hộp 100g)',
              image: '/images/dato/sam-day-ngoc-linh-kon-tum.jpg',
              partnerName: 'THẢO DƯỢC DATO',
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
    }
  }, [isOpen]);

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

  const filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchSearch =
      !searchQuery.trim() ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      order.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.finalTotalVND, 0);

  if (!isOpen) return null;

  // PASSWORD GATE DIALOG (V19):
  // When accessing /admin or secret link, prompt password before displaying any customer data
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 text-white text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shadow-inner mb-3">
              <Lock className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="text-lg font-black tracking-wide">
              XÁC THỰC BẢO MẬT QUẢN TRỊ
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              Khu vực bảo mật nội bộ dành riêng cho Ban Quản Trị Chút Chíu
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Mật khẩu quản trị hệ thống
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
                <p className="text-xs text-red-600 font-bold mt-2 flex items-center gap-1.5 bg-red-50 p-2 rounded-lg border border-red-200">
                  <span>⚠️</span> {passwordError}
                </p>
              )}
            </div>

            <div className="text-[11px] text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200">
              🔒 Dữ liệu đơn hàng, doanh số, thông tin khách hàng và xuất hóa đơn VAT B2B được bảo mật tuyệt đối theo tiêu chuẩn ISO.
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Đăng Nhập Quản Trị</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-medium text-xs transition-colors cursor-pointer"
              >
                Quay về trang chủ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[94vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-xl p-1.5 shadow-xs shrink-0 flex items-center justify-center">
              <Package className="w-5 h-5 text-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  QUẢN TRỊ ĐƠN HÀNG B2B/B2C
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950">
                  Hệ Thống Kho 44 Trần Đình Xu
                </span>
              </div>
              <p className="text-xs text-emerald-300 font-medium mt-0.5">
                Tổng cộng {orders.length} đơn hàng • Doanh thu tạm tính: <strong>{formatPrice(totalRevenue, currency, exchangeRate)}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadOrders}
              className="p-2 text-stone-300 hover:text-white rounded-xl hover:bg-emerald-900 transition-colors cursor-pointer"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleAdminLogout}
              className="px-2.5 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 hover:text-white text-xs font-semibold flex items-center gap-1 border border-red-800/60 transition-colors cursor-pointer"
              title="Đăng xuất khỏi phiên quản trị"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng Xuất</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-emerald-900 transition-colors cursor-pointer"
              aria-label="Đóng cửa sổ quản trị"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Strip */}
        <div className="p-3 sm:p-4 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'pending_payment', label: 'Chờ thanh toán' },
              { id: 'confirmed', label: 'Đã xác nhận' },
              { id: 'shipping', label: 'Đang giao' },
              { id: 'completed', label: 'Hoàn tất' },
            ].map((tab) => {
              const isSelected = statusFilter === tab.id;
              const count = tab.id === 'all' ? orders.length : orders.filter((o) => o.status === tab.id).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-950 text-amber-300 shadow-xs'
                      : 'bg-white text-stone-600 hover:bg-stone-200/70 border border-stone-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isSelected ? 'bg-amber-400/30 text-amber-200' : 'bg-stone-100 text-stone-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mã đơn, tên, sđt..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-emerald-700"
            />
          </div>
        </div>

        {/* Order List */}
        <div className="p-3 sm:p-6 overflow-y-auto flex-1 space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-stone-50 rounded-2xl border border-dashed border-stone-300 p-6">
              <Package className="w-12 h-12 text-stone-300 mx-auto mb-2" />
              <div className="text-sm font-bold text-stone-700">Chưa có đơn hàng nào phù hợp</div>
              <p className="text-xs text-stone-500 mt-1">
                Các đơn đặt hàng từ khách hàng trên website sẽ tự động hiển thị tại đây.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const statusCfg = STATUS_LABELS[order.status] || STATUS_LABELS.pending_payment;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Summary Bar */}
                  <div
                    className="p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer bg-white hover:bg-stone-50/50 transition-colors"
                    onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center font-mono font-black text-xs shrink-0 border border-emerald-200">
                        {order.id.replace('CC-', '#')}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-extrabold text-stone-900 text-sm">{order.customerName}</span>
                          <span className="text-xs text-stone-500 font-mono flex items-center gap-1">
                            <Phone className="w-3 h-3 text-stone-400" />
                            {order.phone}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold border ${statusCfg.bg} ${statusCfg.color}`}>
                            {statusCfg.label}
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 flex flex-wrap items-center gap-2 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-stone-400" />
                            {new Date(order.createdAt).toLocaleString('vi-VN')}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-stone-400" />
                            <span className="line-clamp-1 max-w-xs">{order.address}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                      <div className="text-left md:text-right">
                        <div className="text-[10px] text-stone-400 uppercase font-semibold">Tổng Tiền</div>
                        <div className="text-base font-black text-emerald-950 font-mono">
                          {formatPrice(order.finalTotalVND, currency, exchangeRate)}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <a
                          href={`https://zalo.me/${order.phone.replace(/^0/, '84')}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1 border border-blue-200 transition-colors"
                          title="Chat Zalo với khách"
                        >
                          <span>Zalo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                          type="button"
                          className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {isExpanded && (
                    <div className="p-4 bg-stone-50/80 border-t border-stone-200 text-xs space-y-3">
                      {/* Product Items Table */}
                      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
                        <div className="p-2.5 bg-stone-100/70 border-b border-stone-200 font-bold text-stone-700 flex items-center justify-between">
                          <span>Chi tiết mặt hàng ({order.items.length})</span>
                          <span className="text-stone-500 font-normal text-[11px]">Đơn vị xuất kho: 44 Trần Đình Xu, Q.1</span>
                        </div>
                        <div className="divide-y divide-stone-100">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="p-2.5 flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                                />
                                <div>
                                  <div className="font-bold text-stone-900">{item.product.name}</div>
                                  <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                                    <span className="font-semibold text-emerald-800">{item.product.partnerName}</span>
                                    <span>•</span>
                                    <span>{item.purchaseMode === 'wholesale' ? 'Mua sỉ B2B' : 'Mua lẻ'}</span>
                                    {item.activeTierLabel && (
                                      <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-semibold text-[10px]">
                                        {item.activeTierLabel}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <div className="font-bold text-stone-900 font-mono">
                                  {item.quantity} x {formatPrice(item.unitPriceVND, currency, exchangeRate)}
                                </div>
                                <div className="text-emerald-950 font-black font-mono mt-0.5">
                                  = {formatPrice(item.subtotalVND, currency, exchangeRate)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* VAT / Company Info & Notes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                          <div className="font-bold text-stone-800 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-emerald-800" />
                            <span>Ghi chú đơn hàng:</span>
                          </div>
                          <p className="text-stone-600 italic">
                            {order.notes || 'Không có ghi chú thêm.'}
                          </p>
                        </div>

                        {order.isVATRequested && (
                          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                            <div className="font-bold text-stone-800 flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-blue-700" />
                              <span>Hóa đơn VAT Doanh Nghiệp:</span>
                            </div>
                            <div className="text-stone-700">Tên: <strong>{order.companyName}</strong></div>
                            <div className="text-stone-700">Mã số thuế: <strong className="font-mono">{order.taxId}</strong></div>
                          </div>
                        )}
                      </div>

                      {/* Update Status Bar & Actions */}
                      <div className="p-3 bg-white rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-700">Chuyển trạng thái:</span>
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value as SavedOrder['status'])}
                            className="px-3 py-1 rounded-lg border border-stone-300 bg-white text-xs font-bold text-stone-800 focus:outline-none focus:border-emerald-700"
                          >
                            <option value="pending_payment">Chờ thanh toán</option>
                            <option value="confirmed">Đã xác nhận</option>
                            <option value="packing">Đang đóng gói</option>
                            <option value="shipping">Đang giao hàng</option>
                            <option value="completed">Hoàn tất</option>
                            <option value="cancelled">Đã hủy đơn</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteOrder(order.id)}
                            className="px-2.5 py-1 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Xóa đơn</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Bar */}
        <div className="p-3 sm:p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Đơn hàng tự động lưu trữ cục bộ (Local Storage).
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs"
          >
            Đóng bảng quản trị
          </button>
        </div>
      </div>
    </div>
  );
};
