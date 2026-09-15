import React from 'react';
import {
  Heart,
  Zap,
  ShieldCheck,
  Sparkles,
  Smile,
  Leaf,
  Sun,
  Moon,
  Droplet,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { ProductHealthBenefit } from '../types';

interface HealthBenefitsSectionProps {
  healthData: ProductHealthBenefit;
  partnerName: string;
}

export const HealthBenefitsSection: React.FC<HealthBenefitsSectionProps> = ({
  healthData,
  partnerName,
}) => {
  // Helper to render icon
  const renderPointIcon = (iconType: string) => {
    const className = 'w-5 h-5';
    switch (iconType) {
      case 'heart':
        return <Heart className={`${className} text-rose-600`} />;
      case 'zap':
        return <Zap className={`${className} text-amber-500`} />;
      case 'shield':
        return <ShieldCheck className={`${className} text-emerald-600`} />;
      case 'sparkles':
        return <Sparkles className={`${className} text-purple-500`} />;
      case 'smile':
        return <Smile className={`${className} text-sky-600`} />;
      case 'leaf':
        return <Leaf className={`${className} text-emerald-500`} />;
      case 'sun':
        return <Sun className={`${className} text-amber-600`} />;
      case 'moon':
        return <Moon className={`${className} text-indigo-500`} />;
      case 'droplet':
        return <Droplet className={`${className} text-cyan-600`} />;
      default:
        return <Leaf className={`${className} text-emerald-600`} />;
    }
  };

  return (
    <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-stone-50 to-amber-50/50 border border-emerald-200/80 shadow-2xs">
      {/* Header Tag & Headline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide bg-emerald-800 text-amber-200 uppercase">
            <Heart className="w-3.5 h-3.5 text-rose-300" />
            Công dụng & Giá trị sức khỏe
          </span>
          <span className="text-[11px] text-stone-500 font-medium hidden sm:inline">
            Nguồn đối tác chính hãng • {partnerName}
          </span>
        </div>
        <span className="text-[11px] text-emerald-800 font-semibold italic">
          🌱 Thuần mộc & Tự nhiên
        </span>
      </div>

      {/* Slogan & Quote */}
      <div className="mb-4">
        <h3 className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight leading-snug">
          {healthData.headline}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 italic mt-1 leading-relaxed border-l-2 border-emerald-600 pl-2.5">
          "{healthData.quote}"
        </p>
      </div>

      {/* 3-4 Key Benefits with Cute Icons */}
      <div className="grid grid-cols-1 gap-2.5 mb-4">
        {healthData.points.map((pt, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/95 border border-stone-200/90 shadow-2xs hover:border-emerald-300 transition-colors"
          >
            <div className="p-2 rounded-lg bg-stone-50 border border-stone-200/70 shrink-0 mt-0.5">
              {renderPointIcon(pt.iconType)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                {pt.title}
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {pt.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Target Audiences Breakdown: Trẻ em, Người đi làm, Người lớn tuổi */}
      {healthData.audiences && healthData.audiences.length > 0 && (
        <div className="pt-3.5 border-t border-emerald-200/60">
          <div className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            Lợi ích cho từng thế hệ trong gia đình:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {healthData.audiences.map((aud, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100/90 flex items-start gap-2 text-xs"
              >
                <span className="text-base leading-none shrink-0 mt-0.5" role="img" aria-label={aud.audience}>
                  {aud.icon}
                </span>
                <div>
                  <div className="font-bold text-emerald-950 text-xs">
                    {aud.audience}
                  </div>
                  <div className="text-stone-600 text-[11px] mt-0.5 leading-snug">
                    {aud.benefit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips / Nutrition Note */}
      {healthData.nutritionNote && (
        <div className="mt-3 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-2 text-xs text-amber-950">
          <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="leading-tight">
            <strong>Mách nhỏ:</strong> {healthData.nutritionNote}
          </span>
        </div>
      )}
    </div>
  );
};
