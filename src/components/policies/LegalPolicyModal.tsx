import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, FileText, Truck, RefreshCw, Printer, ChevronRight } from 'lucide-react';
import { Language } from '../../types';
import { LEGAL_POLICIES, PolicyKey } from '../../data/legalPoliciesData';

export interface LegalPolicyModalProps {
  initialPolicyKey?: PolicyKey;
  language: Language;
  onClose: () => void;
}

export const LegalPolicyModal: React.FC<LegalPolicyModalProps> = ({
  initialPolicyKey = 'privacy',
  language = 'VN',
  onClose,
}) => {
  const [activeKey, setActiveKey] = useState<PolicyKey>(initialPolicyKey);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  const currentPolicyMap = LEGAL_POLICIES[language] || LEGAL_POLICIES.VN;
  const currentDoc = currentPolicyMap[activeKey] || currentPolicyMap.privacy;

  // Sync initial policy if prop changes
  useEffect(() => {
    if (initialPolicyKey) {
      setActiveKey(initialPolicyKey);
    }
  }, [initialPolicyKey]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll and apply class to hide fixed header completely
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('has-legal-modal-open');
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.classList.remove('has-legal-modal-open');
    };
  }, []);

  // Reset scroll and set first section active when tab switches
  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTop = 0;
    }
    if (currentDoc.sections.length > 0) {
      setActiveSectionId(currentDoc.sections[0].id);
    }
  }, [activeKey, currentDoc]);

  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const element = document.getElementById(`policy-sec-${sectionId}`);
    if (element && contentScrollRef.current) {
      const containerTop = contentScrollRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const scrollPos = contentScrollRef.current.scrollTop + (elementTop - containerTop) - 16;
      contentScrollRef.current.scrollTo({
        top: Math.max(0, scrollPos),
        behavior: 'smooth',
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const policyTabs: { key: PolicyKey; icon: React.ReactNode; label: string }[] = [
    {
      key: 'privacy',
      icon: <ShieldCheck className="w-4 h-4 shrink-0" />,
      label: currentPolicyMap.privacy.shortLabel,
    },
    {
      key: 'terms',
      icon: <FileText className="w-4 h-4 shrink-0" />,
      label: currentPolicyMap.terms.shortLabel,
    },
    {
      key: 'shipping',
      icon: <Truck className="w-4 h-4 shrink-0" />,
      label: currentPolicyMap.shipping.shortLabel,
    },
    {
      key: 'returns',
      icon: <RefreshCw className="w-4 h-4 shrink-0" />,
      label: currentPolicyMap.returns.shortLabel,
    },
  ];

  const isEn = language === 'EN';

  const modalContent = (
    <div
      id="legal-policy-modal-portal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-policy-modal-title"
      className="legal-policy-backdrop fixed inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      <div
        className="bg-white text-stone-900 rounded-2xl max-w-5xl w-full max-h-[92vh] sm:max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden font-body select-text animate-in zoom-in-95 duration-200 relative"
        style={{ zIndex: 100000 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================================================
            HEADER MODAL: Tiêu đề xanh đậm #00332c, nút in và đóng
            V262: Nằm trọn vẹn 100% trên cùng của màn hình, không bị bất kỳ Header nào che
           ========================================================================= */}
        <div className="bg-[#00332c] text-white px-4 sm:px-6 py-3.5 border-b border-[#00332c]/80 flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2
                  id="legal-policy-modal-title"
                  className="font-heading font-black text-sm sm:text-base text-white tracking-wide uppercase leading-tight"
                >
                  {isEn ? 'Legal & Compliance System' : 'Hệ Thống Chính Sách & Pháp Lý'}
                </h2>
                <p className="text-[11px] text-white/70 font-light mt-0.5">
                  G-ROOSTER CO., LTD · {isEn ? 'Tax ID' : 'Mã số thuế'}: 0319153593 · 44 Trần Đình Xu, Q.1, TP.HCM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 text-xs font-medium transition-colors cursor-pointer"
                title={isEn ? 'Print document' : 'In văn bản chính sách'}
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isEn ? 'Print' : 'In'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label={isEn ? 'Close legal policies' : 'Đóng cửa sổ chính sách'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 4 Tabs Điều Hướng Chính Sách (Hiển thị trọn vẹn và rõ nét ngay trên đầu) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
            {policyTabs.map((tab) => {
              const isActive = activeKey === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveKey(tab.key)}
                  className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer text-center leading-tight ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#00332c] font-bold shadow-md shadow-black/20'
                      : 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {tab.icon}
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            THÂN VĂN BẢN CHÍNH SÁCH:
            - Desktop: 2 Cột (Mục lục Table of Contents bên trái, Nội dung bên phải)
            - Mobile: Mục lục ngang rút gọn trên cùng, nội dung bên dưới
            - Nền trắng sạch sẽ, tiêu đề xanh đậm sang trọng, line-height: 1.6
           ========================================================================= */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">
          {/* CỘT TRÁI: TABLE OF CONTENTS (MỤC LỤC ĐIỀU HƯỚNG NHANH) */}
          <aside className="w-full md:w-64 lg:w-72 bg-stone-50 border-b md:border-b-0 md:border-r border-stone-200 shrink-0 flex flex-col overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-stone-200/80 bg-stone-100/60 flex items-center justify-between">
              <span className="text-[11px] font-heading font-black tracking-wider uppercase text-stone-600">
                {isEn ? 'Table of Contents' : 'Mục Lục Điều Hướng'}
              </span>
              <span className="text-[10px] text-stone-500 font-mono bg-white px-2 py-0.5 rounded-full border border-stone-200">
                {currentDoc.sections.length} {isEn ? 'Sections' : 'Điều khoản'}
              </span>
            </div>

            {/* Danh sách mục lục */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1 max-h-36 md:max-h-none">
              {currentDoc.sections.map((sec, idx) => {
                const isCurrent = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex items-start gap-2 cursor-pointer leading-snug ${
                      isCurrent
                        ? 'bg-[#00332c] text-white font-semibold shadow-xs'
                        : 'text-stone-700 hover:bg-stone-200/70 hover:text-stone-900 font-normal'
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] font-bold shrink-0 mt-0.5 ${
                        isCurrent ? 'text-[#D4AF37]' : 'text-stone-400'
                      }`}
                    >
                      §{idx + 1}
                    </span>
                    <span className="line-clamp-2">{sec.title.replace(/^\d+\.\s*/, '')}</span>
                  </button>
                );
              })}
            </div>

            {/* Thông tin xác thực dưới góc mục lục */}
            <div className="p-3 border-t border-stone-200 bg-white/70 text-[10.5px] text-stone-500 leading-normal hidden md:block">
              <p className="font-semibold text-stone-700">G-ROOSTER CO., LTD</p>
              <p>MST: 0319153593 · Sở KH&ĐT TP.HCM</p>
              <p>Hotline: 0961 525 450</p>
              <div className="mt-2 pt-2 border-t border-stone-200/70 flex items-center gap-1.5 text-blue-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>{isEn ? 'Ministry of Industry and Trade Registered' : 'Chuẩn đăng ký Bộ Công Thương'}</span>
              </div>
            </div>
          </aside>

          {/* CỘT PHẢI: NỘI DUNG VĂN BẢN DÀI */}
          <main
            ref={contentScrollRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-white scroll-smooth"
            style={{ lineHeight: '1.6' }}
          >
            {/* Header Văn Bản */}
            <div className="border-b border-stone-200 pb-5 mb-6">
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-[#00332c]/10 text-[#00332c] font-mono text-[11px] font-bold tracking-wider uppercase mb-2">
                {currentDoc.shortLabel}
              </div>
              <h1 className="text-xl sm:text-2xl font-heading font-black text-[#00332c] tracking-tight leading-snug">
                {currentDoc.title}
              </h1>
              <p className="text-stone-600 text-xs sm:text-sm mt-1.5 font-light leading-relaxed">
                {currentDoc.subtitle}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-stone-500 font-mono">
                <span>{currentDoc.lastUpdated}</span>
                <span className="text-stone-300">·</span>
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>

            {/* Các Phần Điều Khoản */}
            <div className="space-y-6 sm:space-y-7">
              {currentDoc.sections.map((sec) => (
                <section
                  key={sec.id}
                  id={`policy-sec-${sec.id}`}
                  className="scroll-mt-6 p-4 sm:p-5 rounded-xl bg-stone-50/50 border border-stone-100 hover:border-stone-200 transition-colors"
                >
                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#00332c] mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4.5 rounded-full bg-[#D4AF37] shrink-0"></span>
                    <span>{sec.title}</span>
                  </h3>
                  <div className="space-y-2 text-xs sm:text-[13px] text-stone-700 font-light leading-relaxed">
                    {sec.content.map((p, pIdx) => {
                      const isBullet = p.startsWith('•');
                      const isSubHeader = (p.endsWith(':') || p.startsWith('a)') || p.startsWith('b)') || p.startsWith('c)')) && !isBullet;
                      return (
                        <p
                          key={pIdx}
                          className={`${
                            isBullet
                              ? 'pl-2 text-stone-700'
                              : isSubHeader
                              ? 'font-semibold text-stone-900 pt-1'
                              : 'text-stone-800'
                          }`}
                        >
                          {p}
                        </p>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* Khối Cam Kết Pháp Lý Cuối Trang & Dấu Mộc Doanh Nghiệp */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
              <div className="space-y-1 text-center sm:text-left">
                <p className="font-heading font-bold text-stone-900">
                  {isEn ? 'REPRESENTATIVE OF G-ROOSTER CO., LTD' : 'ĐẠI DIỆN CÔNG TY TNHH TM DV G-ROOSTER'}
                </p>
                <p className="text-[11.5px] text-stone-500">
                  {isEn ? 'General Director / Legal Representative' : 'Tổng Giám Đốc / Người đại diện theo pháp luật'}
                </p>
                <p className="font-mono text-[11px] text-[#00332c] font-semibold">
                  MST: 0319153593 · 44 Trần Đình Xu, P. Cầu Ông Lãnh, Q.1, TP.HCM
                </p>
                <p className="font-mono text-[11px] text-stone-500">
                  Hotline & Zalo: 0961 525 450 - 0938 7979 04
                </p>
              </div>

              {/* Dấu Mộc Bộ Công Thương Thu Nhỏ */}
              <a
                href="https://online.gov.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 hover:bg-blue-100 transition-colors shadow-2xs group"
                title={isEn ? 'Ministry of Industry and Trade E-Commerce Portal' : 'Cổng thông tin Quản lý hoạt động Thương mại điện tử - Bộ Công Thương'}
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  ✓
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-black uppercase text-blue-900 tracking-wider">
                    {isEn ? 'REGISTERED' : 'ĐÃ THÔNG BÁO'}
                  </div>
                  <div className="text-[8.5px] font-bold text-blue-700">
                    {isEn ? 'MINISTRY OF INDUSTRY & TRADE' : 'BỘ CÔNG THƯƠNG'}
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </main>
        </div>

        {/* =========================================================================
            FOOTER MODAL: Nút Đóng & Xác Nhận
           ========================================================================= */}
        <div className="p-3 sm:p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-stone-500 hidden sm:inline">
            {isEn
              ? 'Press ESC or click outside to dismiss.'
              : 'Nhấn phím ESC hoặc bấm vùng ngoài để đóng.'}
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#00332c] text-white hover:bg-[#00221d] font-heading font-bold text-xs transition-all shadow-sm cursor-pointer"
            >
              {isEn ? 'Close Window' : 'Đóng cửa sổ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render via React Portal to document.body so it is never trapped in any container stacking context
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
};

export default LegalPolicyModal;
