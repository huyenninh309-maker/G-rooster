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
  healthData?: ProductHealthBenefit | null;
  partnerName?: string;
}

export const HealthBenefitsSection: React.FC<HealthBenefitsSectionProps> = ({
  healthData,
  partnerName,
}) => {
  // STRICT RULE: If healthData is missing or points are empty, auto-hide completely
  if (!healthData || !healthData.points || healthData.points.length === 0) {
    return null;
  }
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
    <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
      {/* Header Tag & Headline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10.5px] font-bold tracking-wide bg-emerald-900 text-amber-300 uppercase">
            <Heart className="w-3 h-3 text-rose-300" />
            Công dụng & Giá trị sức khỏe
          </span>
          <span className="text-[10.5px] text-stone-400 font-medium hidden sm:inline">
            • {partnerName}
          </span>
        </div>
        <span className="text-[10.5px] text-emerald-800 font-semibold">
          🌱 100% Thuần Tự Nhiên
        </span>
      </div>

      {/* Slogan & Quote */}
      <div className="mb-3">
        <h3 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight leading-snug">
          {healthData.headline}
        </h3>
        <p className="text-xs text-stone-500 italic mt-1 leading-relaxed border-l-2 border-emerald-600 pl-2">
          "{healthData.quote}"
        </p>
      </div>

      {/* 3-4 Key Benefits with Clean Card Layout */}
      <div className="grid grid-cols-1 gap-2 mb-3">
        {healthData.points.map((pt, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-stone-50/70 border border-stone-200/70 hover:bg-white hover:border-emerald-300/80 transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-white border border-stone-200 shrink-0 mt-0.5 shadow-2xs">
              {renderPointIcon(pt.iconType)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-[13px] font-bold text-stone-900 leading-tight">
                {pt.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-0.5 leading-relaxed">
                {pt.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Target Audiences Breakdown */}
      {healthData.audiences && healthData.audiences.length > 0 && (
        <div className="pt-2.5 border-t border-stone-200/80">
          <div className="text-[10.5px] font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            Phù hợp cho cả gia đình:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {healthData.audiences.map((aud, idx) => (
              <div
                key={idx}
                className="p-2 rounded-xl bg-stone-50 border border-stone-200/60 flex items-start gap-2 text-xs"
              >
                <span className="text-sm leading-none shrink-0 mt-0.5" role="img" aria-label={aud.audience}>
                  {aud.icon}
                </span>
                <div>
                  <div className="font-bold text-emerald-950 text-[11px]">
                    {aud.audience}
                  </div>
                  <div className="text-stone-500 text-[10px] sm:text-[10.5px] mt-0.5 leading-snug">
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
        <div className="mt-2.5 p-2 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center gap-1.5 text-[11px] text-amber-950">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span className="leading-tight">
            <strong>Mách nhỏ:</strong> {healthData.nutritionNote}
          </span>
        </div>
      )}
    </div>
  );
};
