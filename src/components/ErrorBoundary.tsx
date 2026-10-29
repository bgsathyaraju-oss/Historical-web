import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
  errorStack: string;
}

export function logSafePortalError(context: string, error: unknown, extra?: unknown): void {
  try {
    const message =
      error instanceof Error
        ? `${error.name}: ${error.message}`
        : typeof error === 'string'
        ? error
        : JSON.stringify(error);
    const entry = {
      timestamp: new Date().toISOString(),
      context,
      message,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
    };

    if (typeof window !== 'undefined') {
      const win = window as any;
      if (!Array.isArray(win.__PORTAL_ERROR_LOG__)) {
        win.__PORTAL_ERROR_LOG__ = [];
      }
      win.__PORTAL_ERROR_LOG__.push(entry);
    }
    console.error(`[Suryavamsha Portal Error - ${context}]`, error, extra || '');
  } catch {
    // Never throw inside error logger
  }
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
      errorStack: ''
    };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const errorMessage =
      error instanceof Error
        ? error.message || error.toString()
        : typeof error === 'string'
        ? error
        : 'An unexpected rendering error occurred.';
    const errorStack = error instanceof Error && error.stack ? error.stack : '';
    return {
      hasError: true,
      errorMessage,
      errorStack
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logSafePortalError('ReactErrorBoundary', error, errorInfo?.componentStack);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, errorMessage: '', errorStack: '' });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = (): void => {
    try {
      window.location.href = '/';
    } catch {
      window.location.reload();
    }
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-[60vh] w-full flex items-center justify-center p-4 sm:p-8 bg-[#0b0d14] text-[#f5f3ed]"
          style={{
            backgroundColor: '#0b0d14',
            color: '#f5f3ed',
            padding: '24px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          <div
            className="max-w-xl w-full rounded-2xl bg-[#141824] border border-[#c99738]/60 p-6 sm:p-8 shadow-2xl space-y-4"
            style={{
              backgroundColor: '#141824',
              border: '1px solid rgba(201, 151, 56, 0.6)',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '560px',
              width: '100%'
            }}
          >
            <div
              className="text-xs font-bold uppercase tracking-widest text-[#d4af37]"
              style={{ color: '#d4af37', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em' }}
            >
              Suryavamsha Odiyaraju Kshatriya Portal • Safe Recovery Mode
            </div>

            <h2
              className="font-royal-heading font-bold text-xl sm:text-2xl text-[#fcedc7]"
              style={{ color: '#fcedc7', fontSize: '20px', fontWeight: 700, margin: '8px 0' }}
            >
              {this.props.fallbackTitle || 'Unable to Render This Section in Current Browser View'}
            </h2>

            <p
              className="text-xs sm:text-sm text-stone-300 leading-relaxed"
              style={{ color: '#d6d3d1', fontSize: '14px', lineHeight: 1.6 }}
            >
              A runtime or browser compatibility issue was detected in this WebView environment. Your historical archive data and navigation remain intact.
            </p>

            {this.state.errorMessage && (
              <div
                className="p-3 rounded-xl bg-black/50 border border-stone-800 text-xs font-mono text-amber-200 break-words"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  border: '1px solid #292524',
                  borderRadius: '10px',
                  padding: '12px',
                  color: '#fde68a',
                  fontSize: '12px',
                  wordBreak: 'break-word'
                }}
              >
                Diagnostic Note: {this.state.errorMessage}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '8px' }}>
              <button
                type="button"
                onClick={this.handleReset}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#c99738] text-[#290106] hover:bg-[#dfab43] transition-all cursor-pointer"
                style={{
                  backgroundColor: '#c99738',
                  color: '#290106',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Return to Home View
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#1c2333] text-stone-200 border border-[#c99738]/40 hover:border-[#c99738] transition-all cursor-pointer"
                style={{
                  backgroundColor: '#1c2333',
                  color: '#e7e5e4',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '13px',
                  border: '1px solid rgba(201,151,56,0.4)',
                  cursor: 'pointer'
                }}
              >
                Reload Portal
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
