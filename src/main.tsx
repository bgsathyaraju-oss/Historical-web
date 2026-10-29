import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary, logSafePortalError } from './components/ErrorBoundary';
import './index.css';

function mountApplication() {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  try {
    const root = createRoot(rootElement);
    root.render(
      <ErrorBoundary fallbackTitle="Suryavamsha Portal Recovery Mode">
        <App />
      </ErrorBoundary>
    );
  } catch (err) {
    logSafePortalError('RootMountError', err);
    const msg = err instanceof Error ? err.message : String(err);
    rootElement.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#0c0d12;color:#f7f5f0;font-family:system-ui,-apple-system,sans-serif;">
        <div style="max-width:520px;width:100%;background:#141824;border:1px solid #c99738;border-radius:16px;padding:24px;">
          <div style="color:#d4af37;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Suryavamsha Odiyaraju Kshatriya Portal</div>
          <h1 style="color:#fcedc7;font-size:20px;margin:10px 0;">Unable to Initialize View</h1>
          <p style="color:#d6d3d1;font-size:14px;line-height:1.5;">An initialization error occurred in this WebView environment.</p>
          <pre style="background:#080a10;color:#fde68a;padding:12px;border-radius:8px;font-size:12px;white-space:pre-wrap;word-break:break-word;margin:12px 0;">${msg.replace(/[<>]/g, '')}</pre>
          <button onclick="window.location.reload()" style="background:#c99738;color:#290106;border:none;padding:10px 18px;border-radius:10px;font-weight:700;cursor:pointer;">Reload Portal</button>
        </div>
      </div>
    `;
  }
}

mountApplication();
