import React, { useState, useMemo } from 'react';
import {
  X,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowRight,
  TrendingUp,
  Percent,
  Lock,
  Download,
  Filter,
  FileSpreadsheet,
} from 'lucide-react';
import { formatCommaNumber } from './AdminOrderDashboard';
import { PriceValidationRow } from '../utils/productStore';

interface PriceValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  rows: PriceValidationRow[];
  onConfirmSave: () => void;
  isSaving: boolean;
}

export const PriceValidationModal: React.FC<PriceValidationModalProps> = ({
  isOpen,
  onClose,
  rows,
  onConfirmSave,
  isSaving,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'loss' | 'missing' | 'low_stock' | 'valid'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLossConfirmDialog, setShowLossConfirmDialog] = useState(false);

  // Statistics calculation
  const stats = useMemo(() => {
    let lossCount = 0;
    let missingCount = 0;
    let lowStockCount = 0;
    let validCount = 0;

    rows.forEach((row) => {
      if (row.hasLoss) {
        lossCount++;
      } else if (row.hasMissingPrice) {
        missingCount++;
      } else {
        validCount++;
      }
      if (row.isLowStock) {
        lowStockCount++;
      }
    });

    return {
      total: rows.length,
      lossCount,
      missingCount,
      lowStockCount,
      validCount,
    };
  }, [rows]);

  // Filtered rows for display
  const displayedRows = useMemo(() => {
    return rows.filter((row) => {
      // 1. Filter by mode
      if (filterMode === 'loss' && !row.hasLoss) return false;
      if (filterMode === 'missing' && !row.hasMissingPrice) return false;
      if (filterMode === 'low_stock' && !row.isLowStock) return false;
      if (filterMode === 'valid' && !row.isValid) return false;

      // 2. Search by name, id, or partner
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchId = row.id.toLowerCase().includes(q);
        const matchName = row.name.toLowerCase().includes(q);
        const matchPartner = row.partnerName.toLowerCase().includes(q);
        if (!matchId && !matchName && !matchPartner) return false;
      }

      return true;
    });
  }, [rows, filterMode, searchQuery]);

  if (!isOpen) return null;

  const handleAttemptSave = () => {
    if (stats.lossCount > 0) {
      setShowLossConfirmDialog(true);
    } else {
      onConfirmSave();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs font-['Plus_Jakarta_Sans',sans-serif]">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-[98vw] max-h-[96vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#062415] via-[#0b3820] to-[#124b2b] text-white flex items-center justify-between shrink-0 border-b border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shadow-sm shrink-0">
              <FileSpreadsheet className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight text-white uppercase font-heading">
                  Kiểm Tra Dữ Liệu Bảng Giá Trước Khi Lưu Vào Firebase
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                  CHẾ ĐỘ XÁC THỰC THÔNG MINH
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 font-medium">
                Tự động rà soát cảnh báo Bán Lỗ (Giá bán &lt; Giá vốn) và Kiểm tra tính toàn vẹn 9 cột giá
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Summary Dashboard Cards on Top */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 shrink-0 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {/* Total */}
            <div
              onClick={() => setFilterMode('all')}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white border-emerald-700 shadow-sm ring-2 ring-emerald-600/20'
                  : 'bg-white/70 border-stone-200 hover:bg-white'
              }`}
            >
              <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Tổng Quét Được
              </div>
              <div className="text-lg sm:text-xl font-black text-stone-900 mt-0.5">
                {stats.total}{' '}
                <span className="text-xs font-normal text-stone-500">SP</span>
              </div>
            </div>

            {/* Valid */}
            <div
              onClick={() => setFilterMode('valid')}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                filterMode === 'valid'
                  ? 'bg-emerald-50 border-emerald-600 shadow-sm ring-2 ring-emerald-600/20'
                  : 'bg-white border-stone-200 hover:bg-emerald-50/50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hợp Lệ</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-emerald-800 mt-0.5">
                {stats.validCount}{' '}
                <span className="text-xs font-normal text-emerald-600">Có lời</span>
              </div>
            </div>

            {/* Missing Price Warning (Yellow) */}
            <div
              onClick={() => setFilterMode('missing')}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                filterMode === 'missing'
                  ? 'bg-amber-50 border-amber-600 shadow-sm ring-2 ring-amber-600/30'
                  : 'bg-white border-stone-200 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Thiếu Giá</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-amber-800 mt-0.5">
                {stats.missingCount}{' '}
                <span className="text-xs font-normal text-amber-600">Cột trống</span>
              </div>
            </div>

            {/* Loss Warning (Red) */}
            <div
              onClick={() => setFilterMode('loss')}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                filterMode === 'loss'
                  ? 'bg-red-50 border-red-600 shadow-sm ring-2 ring-red-600/30'
                  : 'bg-white border-stone-200 hover:bg-red-50/50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-700 uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                <span>BÁN LỖ</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-red-700 mt-0.5 flex items-center gap-1.5">
                <span>{stats.lossCount}</span>
                <span className="text-xs font-normal text-red-600">Bán &lt; Vốn</span>
              </div>
            </div>

            {/* Stock Warning (V178) */}
            <div
              onClick={() => setFilterMode('low_stock')}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                filterMode === 'low_stock'
                  ? 'bg-orange-50 border-orange-600 shadow-sm ring-2 ring-orange-600/30'
                  : 'bg-white border-stone-200 hover:bg-orange-50/50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-700 uppercase tracking-wider">
                <span>🔥</span>
                <span>CHÁY HÀNG</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-orange-700 mt-0.5 flex items-center gap-1.5">
                <span>{stats.lowStockCount}</span>
                <span className="text-xs font-normal text-orange-600">Kho &lt; 5</span>
              </div>
            </div>
          </div>

          {/* Alert Description Banner */}
          {stats.lossCount > 0 ? (
            <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-xs text-red-900 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-700 shrink-0" />
                <span>
                  <strong>Phát hiện {stats.lossCount} sản phẩm có Giá bán nhỏ hơn Giá vốn (Bị Lỗ)!</strong>{' '}
                  Các dòng này được tô <strong>Màu Đỏ</strong> bên dưới. Hệ thống sẽ yêu cầu xác nhận bảo mật cao nếu bạn cố tình lưu.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFilterMode('loss')}
                className="px-2.5 py-1 rounded-lg bg-red-700 text-white font-bold text-[11px] hover:bg-red-800 shrink-0 cursor-pointer"
              >
                Xem dòng lỗi đỏ ({stats.lossCount})
              </button>
            </div>
          ) : stats.missingCount > 0 ? (
            <div className="p-3 bg-amber-100 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  Phát hiện {stats.missingCount} sản phẩm bị bỏ trống một số ô giá trong file. Các dòng này được tô <strong>Màu Vàng</strong>.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFilterMode('missing')}
                className="px-2.5 py-1 rounded-lg bg-amber-700 text-white font-bold text-[11px] hover:bg-amber-800 shrink-0 cursor-pointer"
              >
                Xem dòng thiếu giá ({stats.missingCount})
              </button>
            </div>
          ) : (
            <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Toàn bộ {stats.total} sản phẩm đều có Giá bán cao hơn Giá vốn, tỷ suất lợi nhuận an toàn. Đã sẵn sàng lưu chính thức vào Firebase!
              </span>
            </div>
          )}

          {/* Quick Filter & Search Bar */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-stone-600 mr-1">Bộ lọc hiển thị:</span>
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterMode === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
                }`}
              >
                Tất cả ({rows.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('loss')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterMode === 'loss'
                    ? 'bg-red-700 text-white'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                }`}
              >
                ⚠️ Chỉ dòng Bán Lỗ ({stats.lossCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('missing')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterMode === 'missing'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
              >
                ⚡ Thiếu Giá ({stats.missingCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('low_stock')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterMode === 'low_stock'
                    ? 'bg-orange-600 text-white'
                    : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                }`}
              >
                🔥 Sắp Cháy Hàng ({stats.lowStockCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('valid')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterMode === 'valid'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                }`}
              >
                ✅ Hợp Lệ ({stats.validCount})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm Mã ID, tên sản phẩm..."
                className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 w-56 sm:w-72"
              />
            </div>
          </div>
        </div>

        {/* Detailed Table View with Color-Coded Rows */}
        <div className="flex-1 overflow-x-auto overflow-y-auto max-h-[calc(90vh-270px)] scrollbar-thin scrollbar-thumb-stone-300">
          <table className="w-full text-left text-xs border-collapse min-w-[1180px]">
            <thead className="sticky top-0 z-20 bg-stone-100 border-b border-stone-200 text-stone-700 font-bold uppercase text-[10px] tracking-wider shadow-2xs">
              <tr>
                <th className="py-2.5 px-2 w-10 text-center">STT</th>
                <th className="py-2.5 px-3 min-w-[180px]">Sản Phẩm & Dòng</th>
                <th className="py-2.5 px-2.5 w-[120px] bg-amber-50/80 border-x border-amber-200/60 text-right">
                  <div className="flex items-center gap-1 text-amber-900 justify-end">
                    <Lock className="w-3 h-3 text-amber-700" />
                    <span>GIÁ VỐN</span>
                  </div>
                </th>
                <th className="py-2.5 px-2.5 w-[140px] text-right">
                  <div className="font-bold text-stone-900">GIÁ LẺ</div>
                  <div className="text-[9px] text-stone-400 font-normal">Lời • Biên %</div>
                </th>
                <th className="py-2.5 px-2.5 w-[140px] bg-stone-50/60 text-right">
                  <div className="font-bold text-stone-900">GIÁ SỈ 1</div>
                  <div className="text-[9px] text-stone-400 font-normal">Lời • Biên %</div>
                </th>
                <th className="py-2.5 px-2.5 w-[140px] text-right">
                  <div className="font-bold text-stone-900">GIÁ SỈ 2</div>
                  <div className="text-[9px] text-stone-400 font-normal">Lời • Biên %</div>
                </th>
                <th className="py-2.5 px-2.5 w-[140px] bg-stone-50/60 text-right">
                  <div className="font-bold text-stone-900">GIÁ SỈ 3</div>
                  <div className="text-[9px] text-stone-400 font-normal">Lời • Biên %</div>
                </th>
                <th className="py-2.5 px-2 w-[100px] text-center bg-stone-100 font-black text-stone-900 border-x border-stone-200">
                  TỒN KHO
                </th>
                <th className="py-2.5 px-3 w-[150px] text-center">TÌNH TRẠNG & CẢNH BÁO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 font-mono">
              {displayedRows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-stone-500 font-sans">
                    Không có sản phẩm nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                displayedRows.map((item, idx) => {
                  // Determine background color according to requirements:
                  // RED: Entire row if any selling price < cost OR out of stock
                  // YELLOW: Entire row if any price column is empty/missing
                  // WHITE: Valid row
                  let rowBgClass = 'bg-white hover:bg-stone-50/80';
                  let borderMarker = 'border-l-4 border-transparent';

                  if (item.hasLoss) {
                    rowBgClass = 'bg-red-50 hover:bg-red-100/70 text-red-950 font-medium';
                    borderMarker = 'border-l-4 border-red-600';
                  } else if (item.isLowStock) {
                    rowBgClass = 'bg-orange-50/70 hover:bg-orange-100/70 text-orange-950 font-medium';
                    borderMarker = 'border-l-4 border-orange-500';
                  } else if (item.hasMissingPrice) {
                    rowBgClass = 'bg-amber-50 hover:bg-amber-100/70 text-amber-950 font-medium';
                    borderMarker = 'border-l-4 border-amber-500';
                  }

                  const renderTierCell = (
                    sellingPrice: number,
                    profit: number,
                    marginPercent: number,
                    isLoss: boolean,
                    isMissing: boolean
                  ) => {
                    if (isMissing) {
                      return (
                        <div className="text-right">
                          <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 text-[10px] font-bold">
                            Chưa có giá
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div className="text-right">
                        <div
                          className={`font-bold ${
                            isLoss
                              ? 'text-red-700 underline decoration-red-500 font-black'
                              : 'text-stone-900'
                          }`}
                        >
                          {formatCommaNumber(sellingPrice)} ₫
                        </div>
                        <div
                          className={`text-[10px] flex items-center justify-end gap-1 ${
                            isLoss ? 'text-red-600 font-bold' : 'text-emerald-700'
                          }`}
                        >
                          <span>{profit >= 0 ? `+${formatCommaNumber(profit)}` : formatCommaNumber(profit)}</span>
                          <span className="font-bold">({marginPercent}%)</span>
                        </div>
                      </div>
                    );
                  };

                  return (
                    <tr key={item.id} className={`${rowBgClass} transition-colors text-xs`}>
                      {/* STT */}
                      <td className={`py-2 px-2 text-center text-stone-500 font-mono text-[11px] ${borderMarker}`}>
                        {idx + 1}
                      </td>

                      {/* Name & Partner */}
                      <td className="py-2 px-3 font-sans">
                        <div className="font-bold text-stone-900 line-clamp-1">{item.name}</div>
                        <div className="text-[10px] text-stone-500 flex items-center gap-1.5">
                          <span className="font-mono bg-stone-100 px-1 rounded text-stone-600">
                            {item.id}
                          </span>
                          <span>•</span>
                          <span>{item.partnerName}</span>
                          <span>•</span>
                          <span className="text-stone-400">Đ/v: {item.unit}</span>
                        </div>
                      </td>

                      {/* Cost */}
                      <td className="py-2 px-2.5 text-right bg-amber-50/50 border-x border-amber-200/50 font-bold text-amber-950">
                        {item.cost > 0 ? (
                          `${formatCommaNumber(item.cost)} ₫`
                        ) : (
                          <span className="text-amber-700 text-[10px] font-bold">Chưa có vốn</span>
                        )}
                      </td>

                      {/* Retail */}
                      <td className="py-2 px-2.5">
                        {renderTierCell(
                          item.retail,
                          item.profitRetail,
                          item.marginRetail,
                          item.retail > 0 && item.retail < item.cost,
                          item.retail === 0
                        )}
                      </td>

                      {/* Wholesale 1 */}
                      <td className="py-2 px-2.5 bg-stone-50/40">
                        {renderTierCell(
                          item.wholesale1,
                          item.profitWs1,
                          item.marginWs1,
                          item.wholesale1 > 0 && item.wholesale1 < item.cost,
                          item.wholesale1 === 0
                        )}
                      </td>

                      {/* Wholesale 2 */}
                      <td className="py-2 px-2.5">
                        {renderTierCell(
                          item.wholesale2,
                          item.profitWs2,
                          item.marginWs2,
                          item.wholesale2 > 0 && item.wholesale2 < item.cost,
                          item.wholesale2 === 0
                        )}
                      </td>

                      {/* Wholesale 3 */}
                      <td className="py-2 px-2.5 bg-stone-50/40">
                        {renderTierCell(
                          item.wholesale3,
                          item.profitWs3,
                          item.marginWs3,
                          item.wholesale3 > 0 && item.wholesale3 < item.cost,
                          item.wholesale3 === 0
                        )}
                      </td>

                      {/* Stock (V178) */}
                      <td className="py-2 px-2 text-center bg-stone-50/30 border-x border-stone-200/60 font-sans">
                        {item.isOutOfStock ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-stone-900 text-red-400 border border-red-500/40">
                            Hết hàng (0)
                          </span>
                        ) : item.isLowStock ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-stone-950 animate-pulse shadow-2xs">
                            🔥 Sắp hết ({item.stock})
                          </span>
                        ) : (
                          <span className="font-bold text-stone-900 font-mono text-xs">
                            {formatCommaNumber(item.stock)}
                          </span>
                        )}
                      </td>

                      {/* Status / Alert */}
                      <td className="py-2 px-3 text-center font-sans">
                        {item.hasLoss ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-red-600 text-white shadow-2xs">
                            <AlertTriangle className="w-3 h-3 shrink-0" />
                            <span>LỖ: {item.lossTiers.join(', ')}</span>
                          </span>
                        ) : item.hasMissingPrice ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>Thiếu {item.missingColumns.length} cột giá</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>Lợi nhuận tốt</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-4 shrink-0 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>
              Giá vốn, Tiền lời và % Biên lợi nhuận được mã hóa nội bộ, chỉ hiển thị cho Ban Quản trị.
            </span>
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-bold text-xs transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>

            <button
              type="button"
              disabled={isSaving}
              onClick={handleAttemptSave}
              className={`px-5 py-2.5 rounded-xl font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98 ${
                stats.lossCount > 0
                  ? 'bg-red-700 hover:bg-red-800 text-white border border-red-500 animate-pulse'
                  : 'bg-[#062415] hover:bg-[#0a3520] text-amber-300 border border-amber-400/40'
              }`}
            >
              <Database className="w-4 h-4 text-amber-400" />
              <span>
                {isSaving
                  ? 'Đang lưu vào Firebase...'
                  : stats.lossCount > 0
                  ? `⚠️ Xác nhận lưu vào Database (${stats.lossCount} SP Lỗ)`
                  : '💾 Xác nhận lưu vào Database Firebase'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Strong Confirmation Dialog when Loss exists */}
      {showLossConfirmDialog && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-['Plus_Jakarta_Sans',sans-serif]">
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-red-500 space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 className="text-base font-black text-stone-900 uppercase">
                  Cảnh Báo Nguy Hiểm: Bán Lỗ!
                </h4>
                <p className="text-xs text-red-600 font-semibold">
                  Phát hiện {stats.lossCount} sản phẩm có Giá bán nhỏ hơn Giá vốn
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Bạn đang yêu cầu ghi đè file giá có <strong>{stats.lossCount} sản phẩm</strong> mà giá bán lẻ hoặc giá sỉ thấp hơn giá vốn (bán lỗ).
              <br />
              Nếu bấm <strong>Đồng Ý Lưu</strong>, hệ thống sẽ ghi đè giá này trực tiếp lên Google Cloud Firebase và khách hàng trên website có thể mua với mức giá lỗ này!
            </p>

            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 font-bold">
              Bạn có chắc chắn muốn bỏ qua cảnh báo này và lưu vào Firebase Database không?
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowLossConfirmDialog(false)}
                className="px-4 py-2 rounded-xl text-stone-700 hover:bg-stone-100 font-bold text-xs transition-colors cursor-pointer"
              >
                Quay lại kiểm tra
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLossConfirmDialog(false);
                  onConfirmSave();
                }}
                className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-xs shadow-md transition-all cursor-pointer"
              >
                Vẫn lưu vào Firebase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
