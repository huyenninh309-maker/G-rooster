import React from 'react';
import { Zap, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface TrustBadgesProps {
  onOpenRecipeModal?: () => void;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({ onOpenRecipeModal }) => {
  const badges = [
    {
      id: 'badge-express-delivery',
      title: 'Giao hỏa tốc 2H tại HCM',
      subtitle: 'Xuất kho 44 Trần Đình Xu, Quận 1',
      description: 'Giao nhận nội thành siêu tốc trong 120 phút. Chuỗi lạnh chuyên dụng -18°C bảo toàn trọn vị tươi mát cho Nước Mía Tuyết.',
      icon: Zap,
      accent: 'border-emerald-200 bg-gradient-to-br from-emerald-950 via-[#0d3b22] to-[#082a17] text-amber-300',
      badgeText: 'CAM KẾT 2 GIỜ',
    },
    {
      id: 'badge-lifetime-recipes',
      title: 'Tặng công thức trọn đời',
      subtitle: 'Trang bị trọn bộ Menu F&B Chuẩn Quán',
      description: 'Đặc quyền miễn phí cho đối tác sỉ: Toàn bộ bí quyết định lượng gram/ml, cách tính cost giá vốn và cập nhật đồ uống xu hướng định kỳ.',
      icon: BookOpen,
      accent: 'border-amber-300/40 bg-gradient-to-br from-[#1a402a] via-[#10301d] to-[#0a2415] text-amber-300',
      badgeText: 'ĐỘC QUYỀN B2B',
      actionText: 'Khám phá Góc Công Thức →',
      onAction: onOpenRecipeModal,
    },
    {
      id: 'badge-100-guarantee',
      title: 'Đổi trả 100%',
      subtitle: 'Bảo vệ quyền lợi khách sỉ & lẻ',
      description: 'Hoàn tiền 100% hoặc 1 đổi 1 ngay lập tức nếu hàng lỗi móp méo do vận chuyển, không đúng cam kết chất lượng hoặc hết hạn sử dụng.',
      icon: ShieldCheck,
      accent: 'border-emerald-200 bg-gradient-to-br from-emerald-950 via-[#0d3b22] to-[#082a17] text-amber-300',
      badgeText: 'BẢO HIỂM CHẤT LƯỢNG',
    },
  ];

  return (
    <section className="relative my-3 sm:my-4" aria-label="Huy chương niềm tin">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3.5">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.id}
              id={b.id}
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${b.accent}`}
            >
              {/* Gold gradient ambient light */}
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-[#d4af37]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-amber-400/15 border border-amber-400/30 text-[#f6d884] shrink-0 shadow-inner">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight truncate">
                      {b.title}
                    </h3>
                    <span className="hidden sm:inline-block px-1.5 py-0.2 rounded-full text-[9px] font-bold tracking-wider bg-[#d4af37]/20 text-[#f9df90] border border-[#d4af37]/30 uppercase shrink-0">
                      {b.badgeText}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-medium text-emerald-200/90 leading-tight truncate mt-0.5">
                    {b.subtitle}
                  </p>
                  <p className="text-[10px] text-stone-300 leading-snug line-clamp-1 mt-0.5 font-normal">
                    {b.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
