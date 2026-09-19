import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface RecipeIngredientItem {
  id?: string;
  name: string;
  partnerName: string;
  image: string;
  productId?: string;
  amount?: string;
}

interface RecipeIngredientCardProps {
  ingredient: RecipeIngredientItem;
  onClick: () => void;
  isSingle?: boolean;
}

export const RecipeIngredientCard: React.FC<RecipeIngredientCardProps> = ({
  ingredient,
  onClick,
  isSingle = false,
}) => {
  if (isSingle) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className="bg-white hover:bg-stone-50 rounded-2xl border-2 border-stone-200 hover:border-emerald-600 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-4 sm:gap-5 group active:scale-[0.99] select-none text-left w-full max-w-md mx-auto"
        title={`Bấm để xem chi tiết ${ingredient.name} và đặt hàng`}
      >
        {/* Ảnh to hơn 20% (w-20 sm:w-24), bo tròn thanh lịch */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-2xs relative">
          <img
            src={ingredient.image}
            alt={ingredient.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Thông tin sản phẩm: Nhãn đối tác -> Tên sản phẩm -> Nút Xem chi tiết ↗ */}
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] sm:text-[11px] font-black text-emerald-800 uppercase tracking-wider">
              {ingredient.partnerName || 'Chút Chíu B2B'}
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-extrabold text-stone-900 leading-snug line-clamp-2 group-hover:text-emerald-800 transition-colors mt-1.5">
            {ingredient.name}
          </h4>

          {/* Nút Xem chi tiết ↗ dạng pill button */}
          <div className="mt-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-100 group-hover:bg-emerald-700 text-stone-700 group-hover:text-white text-[11px] sm:text-xs font-bold transition-all shadow-2xs">
              <span>Xem chi tiết</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="bg-white rounded-xl border border-stone-200 hover:border-emerald-600 p-2.5 sm:p-3 transition-all hover:shadow-xs cursor-pointer flex items-center gap-2.5 group active:scale-[0.98] select-none text-left"
      title={`Bấm để xem chi tiết ${ingredient.name} và đặt hàng`}
    >
      {/* 1. Ảnh nhỏ chuẩn kích thước, bo góc 8px, tỉ lệ 1:1 */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg overflow-hidden bg-stone-100 border border-stone-200/80 shadow-2xs relative">
        <img
          src={ingredient.image}
          alt={ingredient.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* 2. Nội dung tối giản: Nhãn đối tác + Tên sản phẩm + Nút Xem chi tiết ↗ */}
      <div className="min-w-0 flex-1 flex flex-col justify-center">
        {/* Tên đối tác: Hiện đầy đủ, cho phép ngắt 2 dòng, giảm chữ nhẹ nếu dài, tuyệt đối không cắt dấu ... */}
        <div className="text-[9px] sm:text-[9.5px] font-bold text-emerald-800 uppercase tracking-wide leading-tight break-words line-clamp-2">
          {ingredient.partnerName || 'Chút Chíu B2B'}
        </div>

        {/* Tên sản phẩm: Tự động xuống dòng 2 dòng linh hoạt, cỡ chữ 10.5px-11.5px tối ưu không gian, không bị che chữ */}
        <h4 className="text-[10px] sm:text-[11px] font-bold text-stone-900 leading-tight line-clamp-2 group-hover:text-emerald-800 transition-colors mt-0.5 break-words">
          {ingredient.name}
        </h4>

        {/* Nút dẫn liên kết tinh tế */}
        <div className="flex items-center gap-0.5 text-[9.5px] sm:text-[10px] font-semibold text-stone-500 group-hover:text-emerald-700 transition-colors mt-0.5">
          <span>Xem chi tiết</span>
          <ArrowUpRight className="w-3 h-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
};
