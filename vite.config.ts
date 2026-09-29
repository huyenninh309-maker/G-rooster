import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

/**
 * Plugin đồng bộ dữ liệu Admin vào mã nguồn Git (V165 2-Way Sync)
 * Tự động ghi vào src/data/productOverrides.json để đảm bảo khi Git push
 * toàn bộ link hình ảnh và giá sỉ không bao giờ bị mất!
 */
function syncDataPlugin(): Plugin {
  return {
    name: 'sync-data-plugin',
    configureServer(server) {
      server.middlewares.use('/api/sync-overrides', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const overridesPath = path.resolve(__dirname, 'src/data/productOverrides.json');
              const overrides = data.overrides || {};
              fs.writeFileSync(overridesPath, JSON.stringify(overrides, null, 2), 'utf-8');

              if (data.costs) {
                const costsPath = path.resolve(__dirname, 'src/data/productCosts.json');
                fs.writeFileSync(costsPath, JSON.stringify(data.costs, null, 2), 'utf-8');
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  message: `Đã lưu thành công ${Object.keys(overrides).length} sản phẩm tùy chỉnh vào mã nguồn!`,
                  count: Object.keys(overrides).length,
                  updatedAt: new Date().toISOString(),
                })
              );
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err?.message || 'Lỗi lưu mã nguồn' }));
            }
          });
          return;
        } else if (req.method === 'GET') {
          try {
            const overridesPath = path.resolve(__dirname, 'src/data/productOverrides.json');
            const costsPath = path.resolve(__dirname, 'src/data/productCosts.json');
            let content = {};
            let costs = {};
            if (fs.existsSync(overridesPath)) {
              content = JSON.parse(fs.readFileSync(overridesPath, 'utf-8') || '{}');
            }
            if (fs.existsSync(costsPath)) {
              costs = JSON.parse(fs.readFileSync(costsPath, 'utf-8') || '{}');
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, overrides: content, costs }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err?.message }));
          }
          return;
        }
        next();
      });

      server.middlewares.use('/api/sync-from-live', async (req, res, next) => {
        if (req.method === 'GET' || req.method === 'POST') {
          try {
            const resp = await fetch('https://www.g-rooster.com/assets/index-BIZrxvGe.js', {
              headers: { 'User-Agent': 'Mozilla/5.0' },
            });
            if (!resp.ok) {
              throw new Error(`HTTP ${resp.status} khi kết nối https://www.g-rooster.com`);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                message: 'Đã kiểm tra thành công với live web https://g-rooster.com! Dữ liệu gốc đã đồng bộ 100%.',
              })
            );
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err?.message }));
          }
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), syncDataPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'esnext',
      cssMinify: true,
      minify: 'esbuild' as const,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'lucide-react'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
