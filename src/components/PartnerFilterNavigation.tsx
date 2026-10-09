import React, { useState, useMemo } from 'react';
import { Search, X, Check, Building2, Layers, Filter, ChevronRight, Store, Sparkles } from 'lucide-react';
import { PartnerId, Sector, Language } from '../types';

export interface PartnerItem {
  id: PartnerId | 'all';
  label: string;
  count: number;
  badge: string;
  sector?: 'nong-san' | 'dac-san';
  avatar?: string;
}

interface PartnerSidebarProps {
  partnerTabs: PartnerItem[];
  selectedPartner: PartnerId | 'all';
  onSelectPartner: (partner: PartnerId | 'all') => void;
  selectedSector: 'all' | 'nong-san' | 'dac-san';
  onSelectSector: (sector: 'all' | 'nong-san' | 'dac-san') => void;
  totalProductCount: number;
  language?: Language;
}

/**
 * 1. SIDEBAR CHO DESKTOP (Quy mô 50+ đối tác)
 * Hiển thị dạng danh sách theo chiều dọc bên trái: [Logo + Tên + Badge + Số lượng SP]
 * Phía trên có ô tìm kiếm tức thì "🔍 Tìm nhanh đối tác..."
 * Tự động lọc theo 2 nhóm ngành hàng: [Nông Sản] & [Đặc Sản]
 */
export const PartnerSidebar: React.FC<PartnerSidebarProps> = ({
  partnerTabs,
  selectedPartner,
  onSelectPartner,
  selectedSector,
  onSelectSector,
  totalProductCount,
  language = 'VN',
}) => {
  const isEn = language === 'EN';
  const [partnerQuery, setPartnerQuery] = useState('');

  // 1. Phân nhóm ngành hàng: Lọc danh sách đối tác theo ngành đã chọn
  // Quy tắc 3: Nếu chọn 'Đặc Sản', chỉ hiện 'Đặc Sản & Snack'
  const sectorFilteredPartners = useMemo(() => {
    if (selectedSector === 'all') {
      return partnerTabs;
    }
    return partnerTabs.filter((tab) => tab.id !== 'all' && tab.sector === selectedSector);
  }, [partnerTabs, selectedSector]);

  // 2. Lọc tức thì theo ô tìm kiếm "🔍 Tìm nhanh đối tác..."
  const visiblePartners = useMemo(() => {
    const q = partnerQuery.trim().toLowerCase();
    if (!q) return sectorFilteredPartners;
    return sectorFilteredPartners.filter((p) => {
      if (p.id === 'all') return true;
      return (
        p.label.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q)
      );
    });
  }, [sectorFilteredPartners, partnerQuery]);

  const activePartnerCount = sectorFilteredPartners.filter((p) => p.id !== 'all').length;

  return (
    <aside className="w-full bg-white rounded-2xl border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-3.5 sticky top-20 flex flex-col">
      {/* Header Sidebar */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
            <Store className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-900">
              {isEn ? 'Product Categories' : 'Danh Mục Ngành Hàng'}
            </h3>
            <p className="text-[10px] text-stone-500">
              {activePartnerCount} {isEn ? 'strategic groups' : 'nhóm chiến lược'} ({selectedSector === 'all' ? (isEn ? 'All sectors' : 'Tất cả ngành') : selectedSector === 'nong-san' ? (isEn ? 'Agri-Products' : 'Nông Sản') : (isEn ? 'Specialties' : 'Đặc Sản')})
            </p>
          </div>
        </div>

        {selectedPartner !== 'all' && (
          <button
            onClick={() => {
              onSelectPartner('all');
              onSelectSector('all');
            }}
            className="text-[10px] text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
            title={isEn ? 'Clear category filter' : 'Bỏ lọc ngành hàng'}
          >
            {isEn ? 'View all' : 'Xem tất cả'}
          </button>
        )}
      </div>

      {/* Ô nhập liệu tìm nhanh ngành hàng */}
      <div className="mt-3 relative">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            value={partnerQuery}
            onChange={(e) => setPartnerQuery(e.target.value)}
            placeholder={isEn ? '🔍 Quick search categories...' : '🔍 Tìm nhanh ngành hàng...'}
            className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50/80 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition-all placeholder:text-stone-400 text-stone-900 font-medium"
          />
          {partnerQuery && (
            <button
              onClick={() => setPartnerQuery('')}
              className="absolute right-2 w-4 h-4 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[9px] hover:bg-stone-300 transition-colors"
              title={isEn ? 'Clear search' : 'Xóa tìm kiếm ngành hàng'}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Danh sách ngành hàng theo chiều dọc [Logo + Tên + Badge] */}
      <div className="mt-3 space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto scrollbar-thin pr-1">
        {visiblePartners.length === 0 ? (
          <div className="py-6 text-center text-stone-400 text-xs">
            <p>{isEn ? 'No matching categories found' : 'Không tìm thấy ngành hàng nào'}</p>
            <button
              onClick={() => setPartnerQuery('')}
              className="mt-1 text-[11px] text-emerald-700 font-bold underline"
            >
              {isEn ? 'Clear keyword' : 'Xóa từ khóa'}
            </button>
          </div>
        ) : (
          visiblePartners.map((tab) => {
            const isSelected = selectedPartner === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                id={`sidebar-partner-${tab.id}`}
                onClick={() => {
                  if (isSelected && tab.id !== 'all') {
                    onSelectPartner('all');
                    onSelectSector?.('all');
                  } else {
                    onSelectPartner(tab.id);
                  }
                }}
                className={`w-full group flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-left transition-all duration-150 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#1a4d2e] text-white border-[#1a4d2e] shadow-xs'
                    : 'bg-stone-50/70 hover:bg-stone-100 text-stone-800 border-stone-200/70 hover:border-stone-300'
                }`}
              >
                {/* Logo đối tác */}
                <div
                  className={`w-7 h-7 rounded-lg overflow-hidden shrink-0 border p-0.5 flex items-center justify-center ${
                    isSelected
                      ? 'bg-white border-amber-300'
                      : 'bg-white border-stone-200 group-hover:border-stone-300'
                  }`}
                >
                  {tab.avatar ? (
                    <img
                      src={tab.avatar}
                      alt={`Logo ${tab.label} - G-ROOSTER`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Layers className="w-3.5 h-3.5 text-stone-600" />
                  )}
                </div>

                {/* Tên & Ngành/Badge: Đảm bảo tên không bị cắt cụt */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                      <span
                        className={`text-xs font-bold whitespace-normal leading-tight ${
                          isSelected ? 'text-white' : 'text-stone-900 group-hover:text-emerald-950'
                        }`}
                      >
                        {tab.id === 'all' ? (isEn ? `All Categories (${tab.count} Items)` : `Tất cả dòng sản phẩm (${tab.count} SP)`) : tab.label}
                      </span>
                      <span
                        className={`text-[9.5px] px-1.5 py-0.5 rounded-full font-mono font-bold whitespace-nowrap inline-flex items-center justify-center gap-0.5 shrink-0 ${
                          isSelected
                            ? 'bg-amber-400 text-stone-950'
                            : 'bg-stone-200/90 text-stone-700'
                        }`}
                      >
                        <span>{tab.count}</span>
                        <span>{isEn ? 'ITEMS' : 'SP'}</span>
                      </span>
                    </div>
                  </div>

                  <p
                    className={`text-[9.5px] truncate mt-0.5 ${
                      isSelected ? 'text-amber-200/90' : 'text-stone-500'
                    }`}
                  >
                    {tab.badge}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Footer nhỏ của Sidebar */}
      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500">
        <span>{isEn ? 'Total Products' : 'Tổng sản phẩm'}</span>
        <strong className="font-mono text-stone-800 text-xs px-2 py-0.5 rounded-md bg-stone-100">{totalProductCount}</strong>
      </div>
    </aside>
  );
};

interface PartnerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  partnerTabs: PartnerItem[];
  selectedPartner: PartnerId | 'all';
  onSelectPartner: (partner: PartnerId | 'all') => void;
  selectedSector: 'all' | 'nong-san' | 'dac-san';
  onSelectSector: (sector: 'all' | 'nong-san' | 'dac-san') => void;
  language?: Language;
}

/**
 * 2. BẢNG LỌC ĐỐI TÁC CUNG ỨNG (MODAL / POPUP Y HỆT HÌNH 3)
 * Mở ra khi khách hàng nhấn vào nút "🔍 Lọc Theo Đối Tác (Chọn thương hiệu)"
 * Cấu trúc:
 * - Trên cùng: Tab chọn Ngành hàng [Tất cả] [Nông Sản] [Đặc Sản]
 * - Giữa: Ô tìm nhanh đối tác
 * - Dưới: Danh sách đối tác theo hàng dọc [Logo + Tên + Số lượng sản phẩm] (Ví dụ: 62 SP, 10 SP...)
 * - Nút to dưới cùng: [Đóng Bảng Lọc]
 */
export const PartnerFilterModal: React.FC<PartnerDrawerProps> = ({
  isOpen,
  onClose,
  partnerTabs,
  selectedPartner,
  onSelectPartner,
  selectedSector,
  onSelectSector,
  language = 'VN',
}) => {
  const isEn = language === 'EN';
  const [drawerQuery, setDrawerQuery] = useState('');

  // Lọc theo ngành hàng trước:
  // Quy tắc 3 (Từ trên xuống): Nếu chọn 'Đặc Sản' ở trên, danh sách bên dưới chỉ được hiện 'Đặc Sản & Snack'
  // Nếu chọn 'Nông Sản' ở trên, danh sách bên dưới chỉ hiện các dòng của Nông Sản
  // Nếu chọn 'Tất cả', danh sách hiện 'Tất cả dòng sản phẩm' cùng toàn bộ các nhóm
  const sectorFilteredPartners = useMemo(() => {
    if (selectedSector === 'all') {
      return partnerTabs;
    }
    return partnerTabs.filter((tab) => tab.id !== 'all' && tab.sector === selectedSector);
  }, [partnerTabs, selectedSector]);

  // Lọc tức thì theo ô tìm kiếm
  const visiblePartners = useMemo(() => {
    const q = drawerQuery.trim().toLowerCase();
    if (!q) return sectorFilteredPartners;
    return sectorFilteredPartners.filter((p) => {
      if (p.id === 'all') return true;
      return (
        p.label.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q)
      );
    });
  }, [sectorFilteredPartners, drawerQuery]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bảng Lọc - Y hệt Hình 3 */}
        <div className="p-3.5 sm:p-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold shrink-0">
              <Store className="w-4 h-4 text-emerald-800" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-stone-900 leading-tight">
                {isEn ? 'Filter by Product Category' : 'Lọc Theo Nhóm Ngành Hàng'}
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {isEn ? 'Select a strategic category to filter the product catalog' : 'Chọn ngành hàng chiến lược để lọc danh mục sản phẩm'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer shrink-0"
            title={isEn ? 'Close filter' : 'Đóng bảng lọc'}
          >
            ✕
          </button>
        </div>

        {/* 1. Trên cùng: Tab chọn Ngành hàng [Tất cả] [Nông Sản] [Đặc Sản] */}
        <div className="px-3.5 sm:px-4 pt-3 sm:pt-3.5">
          <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5">
            {isEn ? 'SECTOR CLASSIFICATION:' : 'PHÂN LOẠI NGÀNH:'}
          </div>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-xl">
            {[
              { id: 'all', label: isEn ? 'All' : 'Tất cả' },
              { id: 'nong-san', label: isEn ? 'Agri-Products' : 'Nông Sản' },
              { id: 'dac-san', label: isEn ? 'Specialties' : 'Đặc Sản' },
            ].map((sec) => {
              const isActive = selectedSector === sec.id;
              return (
                <button
                  key={sec.id}
                  id={`filter-modal-sector-${sec.id}`}
                  onClick={() => {
                    onSelectSector(sec.id as any);
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                    isActive
                      ? 'bg-[#0a2e1d] text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Giữa: Ô tìm kiếm nhóm sản phẩm nhanh */}
        <div className="px-3.5 sm:px-4 py-2.5">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={drawerQuery}
              onChange={(e) => setDrawerQuery(e.target.value)}
              placeholder={isEn ? '🔍 Quick search categories...' : '🔍 Tìm nhanh nhóm ngành hàng...'}
              className="w-full pl-9 sm:pl-10 pr-8 py-2 sm:py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50/70 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 text-stone-900 placeholder:text-stone-400 font-medium"
            />
            {drawerQuery && (
              <button
                onClick={() => setDrawerQuery('')}
                className="absolute right-2.5 w-4 h-4 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[10px] hover:bg-stone-300 transition-colors"
                title={isEn ? 'Clear search' : 'Xóa tìm kiếm'}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 3. Dưới: Danh sách nhóm sản phẩm xếp theo hàng dọc [Logo + Tên + Số lượng sản phẩm] */}
        <div className="px-3 sm:px-4 pb-2 space-y-1.5 overflow-y-auto flex-1 max-h-[46vh] scrollbar-thin">
          {visiblePartners.length === 0 ? (
            <div className="py-6 text-center text-stone-400 text-xs">
              <p>{isEn ? 'No matching categories found' : 'Không tìm thấy nhóm ngành hàng phù hợp'}</p>
              <button
                onClick={() => setDrawerQuery('')}
                className="mt-1.5 text-xs text-emerald-700 font-bold underline cursor-pointer"
              >
                {isEn ? 'Clear search' : 'Xóa tìm kiếm'}
              </button>
            </div>
          ) : (
            visiblePartners.map((tab) => {
              const isSelected = selectedPartner === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  id={`drawer-partner-${tab.id}`}
                  onClick={() => {
                    // Nếu bấm lại vào dòng đang chọn, tự động bỏ chọn về 'all' và reset Ngành hàng
                    if (isSelected && tab.id !== 'all') {
                      onSelectPartner('all');
                      onSelectSector('all');
                    } else {
                      onSelectPartner(tab.id);
                    }
                    onClose();
                  }}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 sm:py-2 rounded-xl text-left transition-all border cursor-pointer select-none active:scale-[0.99] ${
                    isSelected
                      ? 'bg-[#0a2e1d] text-white border-[#0a2e1d] shadow-sm'
                      : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200/90 shadow-2xs'
                  }`}
                >
                  {/* Logo thương hiệu trong khung vuông viền bo nhẹ */}
                  <div
                    className={`w-8 h-8 rounded-lg overflow-hidden shrink-0 border p-1 flex items-center justify-center bg-white ${
                      isSelected ? 'border-amber-300/60' : 'border-stone-200'
                    }`}
                  >
                    {tab.avatar ? (
                      <img
                        src={tab.avatar}
                        alt={`Logo ${tab.label} - G-ROOSTER`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Layers className="w-3.5 h-3.5 text-stone-600" />
                    )}
                  </div>

                  {/* Tên & Mô tả đối tác: hiển thị đầy đủ, không cắt cụt */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                        <span className={`text-xs sm:text-[13px] font-bold whitespace-normal leading-tight ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                          {tab.id === 'all' ? (isEn ? `All Categories (${tab.count} Items)` : `Tất cả dòng sản phẩm (${tab.count} SP)`) : tab.label}
                        </span>
                        {/* Con số trong nhãn tròn phía sau, ví dụ: [10 SP] */}
                        <span
                          className={`text-[9.5px] sm:text-[10px] min-w-[24px] text-center px-1.5 py-0.2 rounded-full font-mono font-bold whitespace-nowrap inline-flex items-center justify-center gap-0.5 shrink-0 ${
                            isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          <span>{tab.count}</span>
                          <span>{isEn ? 'ITEMS' : 'SP'}</span>
                        </span>
                      </div>
                    </div>
                    <p className={`text-[10.5px] sm:text-[11px] truncate mt-0.5 ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                      {tab.badge}
                    </p>
                  </div>

                  {/* Checkmark icon tròn vàng khi đang chọn */}
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Nút to dưới cùng: [Đóng Bảng Lọc] - Y hệt Hình 3 */}
        <div className="p-3 sm:p-3.5 bg-white border-t border-stone-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#0a2e1d] hover:bg-[#072115] text-amber-300 font-extrabold text-xs sm:text-sm tracking-wide text-center shadow-xs transition-colors cursor-pointer"
          >
            {isEn ? 'Close Filter Panel' : 'Đóng Bảng Lọc'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Export alias for compatibility
export const PartnerDrawer = PartnerFilterModal;

interface PartnerFilterTriggerProps {
  onClick: () => void;
  selectedPartner: PartnerId | 'all';
  partnerTabs: PartnerItem[];
  selectedSector?: 'all' | 'nong-san' | 'dac-san';
  onClearPartner: () => void;
  defaultLabel?: string;
  language?: Language;
}

/**
 * Nút bấm '🔍 Lọc Theo Đối Tác Cung Ứng'
 * Đồng bộ sử dụng cho cả 3 thiết bị: Desktop, Tablet, Mobile
 * Hiển thị nằm cạnh ô tìm kiếm để tạo thành một bộ công cụ lọc chuyên nghiệp
 */
export const PartnerFilterTrigger: React.FC<PartnerFilterTriggerProps> = ({
  onClick,
  selectedPartner,
  partnerTabs,
  selectedSector = 'all',
  onClearPartner,
  defaultLabel,
  language = 'VN',
}) => {
  const isEn = language === 'EN';
  const resolvedDefaultLabel = defaultLabel || (isEn ? '🔍 Product Categories (6 Groups)' : '🔍 Danh Mục Ngành Hàng (6 Nhóm)');
  const currentTab = partnerTabs.find((t) => t.id === selectedPartner);
  const isFiltered = (selectedPartner !== 'all' && !!currentTab) || selectedSector !== 'all';

  const sectorCount = React.useMemo(() => {
    if (!selectedSector || selectedSector === 'all') {
      return partnerTabs.find((t) => t.id === 'all')?.count ?? 133;
    }
    return partnerTabs
      .filter((t) => t.id !== 'all' && t.sector === selectedSector)
      .reduce((sum, t) => sum + t.count, 0);
  }, [partnerTabs, selectedSector]);

  const activeCount = selectedPartner !== 'all' && currentTab ? currentTab.count : sectorCount;

  return (
    <div className="flex items-center gap-1.5 w-full">
      <button
        onClick={onClick}
        id="btn-open-partner-drawer"
        className={`flex-1 h-11 px-3 sm:px-3.5 rounded-xl border text-xs sm:text-[13px] font-bold transition-all flex items-center justify-between shadow-2xs cursor-pointer ${
          isFiltered
            ? 'bg-[#0a2e1d] text-white border-[#0a2e1d]'
            : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200 hover:border-stone-300'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Filter className={`w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0 ${isFiltered ? 'text-amber-300' : 'text-emerald-800'}`} />
          <span className="truncate">
            {selectedPartner !== 'all' && currentTab ? (
              <>
                <strong className="text-amber-300">{isEn ? 'Category:' : 'Dòng SP:'}</strong> {currentTab.label}
              </>
            ) : selectedSector !== 'all' ? (
              <>
                <strong className="text-amber-300">{isEn ? 'Sector:' : 'Ngành:'}</strong>{' '}
                {selectedSector === 'nong-san' ? (isEn ? 'Agri-Products' : 'Nông Sản') : (isEn ? 'Specialties' : 'Đặc Sản')}
              </>
            ) : (
              resolvedDefaultLabel
            )}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {/* Nhãn số lượng SP hiển thị rõ ràng, không bị rớt dòng */}
          <span
            className={`text-[10px] sm:text-[11px] min-w-[32px] text-center px-2 py-0.5 rounded-full font-mono font-bold whitespace-nowrap inline-flex items-center justify-center gap-0.5 shrink-0 ${
              isFiltered ? 'bg-amber-400 text-stone-950' : 'bg-stone-100 text-stone-600'
            }`}
          >
            <span>{activeCount}</span>
            <span>{isEn ? 'ITEMS' : 'SP'}</span>
          </span>
          <ChevronRight className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${isFiltered ? 'text-amber-300' : 'text-stone-400'}`} />
        </div>
      </button>

      {isFiltered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClearPartner();
          }}
          className="h-11 px-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs transition-colors cursor-pointer"
          title={isEn ? 'Clear filter' : 'Bỏ lọc ngành hàng'}
        >
          ✕
        </button>
      )}
    </div>
  );
};

// Export alias for backwards compatibility
export const MobilePartnerFilterTrigger = PartnerFilterTrigger;

