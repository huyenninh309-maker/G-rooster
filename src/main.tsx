import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

// V286: Tự động dọn dẹp LocalStorage & Cookies cũ khi web vừa load (chạy 1 lần duy nhất)
// để loại bỏ các dữ liệu "ma" hay cookie cũ từ môi trường trước gây lỗi vòng lặp chuyển hướng
try {
  if (typeof window !== 'undefined' && !sessionStorage.getItem('chutchiu_v286_cleaned')) {
    if (document.cookie) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      }
    }
    const ghostKeys = [
      'auth_redirect',
      'redirect_to',
      'last_route',
      'admin_redirect',
      'user_role',
      'user_token',
      'firebase:authUser',
    ];
    for (const key of ghostKeys) {
      try {
        localStorage.removeItem(key);
      } catch {}
    }
    sessionStorage.setItem('chutchiu_v286_cleaned', 'true');
  }
} catch (e) {
  console.warn('Cookie/storage cleanup:', e);
}

const rootEl = typeof document !== 'undefined' ? document.getElementById('root') : null;
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>,
  );
}

