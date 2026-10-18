import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { initFirebaseProductSync } from './utils/productStore';
import './index.css';

// Initialize real-time 2-way Google Cloud Firebase Firestore sync
initFirebaseProductSync();

const rootEl = typeof document !== 'undefined' ? document.getElementById('root') : null;
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="min-h-screen bg-[#00332c] flex flex-col items-center justify-center text-white">
              <div className="w-8 h-8 border-2 border-white/20 border-t-[#D4AF37] rounded-full animate-spin mb-3"></div>
              <span className="text-xs font-mono text-stone-200">Đang khởi động G-ROOSTER...</span>
            </div>
          }
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </StrictMode>,
  );
}

