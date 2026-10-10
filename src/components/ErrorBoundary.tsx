import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, Home, ShoppingBag, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
  key?: React.Key;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State;
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`ErrorBoundary [${this.props.name || 'Root'}] caught an error:`, error, errorInfo);
  }

  private handleResetCart = () => {
    try {
      localStorage.removeItem('chutchiu_cart');
    } catch (e) {
      console.warn('Failed to clear cart storage:', e);
    }
    (this as any).setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  private handleReload = () => {
    (this as any).setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#fbfbf8] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center shadow-inner">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-black text-stone-900 font-heading">
                Đang khôi phục hệ thống mua hàng
              </h2>
              <p className="text-xs text-stone-600 font-body leading-relaxed">
                Đã bảo vệ an toàn cho đơn hàng của Quý khách. Vui lòng bấm bên dưới để tiếp tục trải nghiệm mua sỉ &amp; lẻ mượt mà.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full py-3 px-4 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-amber-300" />
                <span>Tải lại phiên làm việc</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetCart}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4 text-stone-500" />
                <span>Làm mới giỏ hàng &amp; Về trang chủ</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
