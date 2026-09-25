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
        className="bg-white/80 backdrop-blur-md hover:bg-white/95 rounded-xl sm:rounded-2xl border border-white/90 hover:border-emerald-600/70 p-2.5 sm:py-2.5 sm:px-3.5 md:py-3 md:px-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3.5 group active:scale-[0.99] select-none text-left w-full max-w-md mx-auto"
        title={`Bấm để xem chi tiết ${ingredient.name} và đặt hàng`}
      >
        {/* Ảnh gọn gàng trên mobile (56px) và desktop (64-72px), bo tròn thanh lịch */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 shrink-0 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-2xs relative">
          <img
            src={ingredient.image}
            alt={`${ingredient.name} - G-ROOSTER | Nguyên liệu nông sản cao cấp`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Thông tin sản phẩm: Dòng sản phẩm -> Tên sản phẩm -> Nút Xem chi tiết ↗ */}
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-1">
            <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-[9px] sm:text-[10px] font-black text-emerald-800 uppercase tracking-wider font-heading">
              {ingredient.partnerName || 'G-ROOSTER'}
            </span>
          </div>

          <h4 className="text-[12.5px] sm:text-sm font-extrabold text-stone-900 leading-snug line-clamp-2 group-hover:text-emerald-800 transition-colors mt-0.5 font-heading">
            {ingredient.name}
          </h4>

          {/* Nút Nhập sỉ nguyên liệu ↗ dạng pill button sang trọng */}
          <div className="mt-1 sm:mt-1.5">
            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md sm:rounded-lg bg-emerald-900 text-white text-[10px] sm:text-[11px] font-bold group-hover:bg-[#143A24] transition-all shadow-2xs font-heading">
              <span>Nhập sỉ nguyên liệu</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
      className="bg-white/80 backdrop-blur-md hover:bg-white/95 rounded-xl border border-white/90 hover:border-emerald-600/70 p-2 sm:p-2.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer flex items-center gap-2 sm:gap-2.5 group active:scale-[0.98] select-none text-left"
      title={`Bấm để xem chi tiết ${ingredient.name} và đặt hàng`}
    >
      {/* 1. Ảnh nhỏ chuẩn kích thước, bo góc 8px, tỉ lệ 1:1 */}
      <div className="w-11 h-11 sm:w-13 sm:h-13 shrink-0 rounded-lg overflow-hidden bg-stone-100 border border-stone-200/80 shadow-2xs relative">
        <img
          src={ingredient.image}
          alt={`${ingredient.name} - G-ROOSTER | Nguyên liệu nông sản cao cấp`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* 2. Nội dung: Nhãn dòng sản phẩm + Tên sản phẩm + Nút Xem chi tiết ↗ */}
      <div className="min-w-0 flex-1 flex flex-col justify-center">
        <div className="text-[8.5px] sm:text-[9.5px] font-bold text-emerald-800 uppercase tracking-wide leading-tight break-words font-heading">
          {ingredient.partnerName || 'G-ROOSTER'}
        </div>

        {/* Tên sản phẩm: Tự động xuống dòng 2 dòng linh hoạt */}
        <h4 className="text-[10px] sm:text-[11px] font-bold text-stone-900 leading-tight line-clamp-2 group-hover:text-emerald-800 transition-colors mt-0.5 break-words font-heading">
          {ingredient.name}
        </h4>

        {/* Nút dẫn liên kết tinh tế */}
        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-emerald-800 group-hover:text-emerald-950 transition-colors mt-0.5">
          <span>Nhập sỉ</span>
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-emerald-700" />
        </div>
      </div>
    </div>
  );
};
