import React from 'react';
import { Crown, Sparkles, ExternalLink, Phone, MessageCircle } from 'lucide-react';

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.03C8.94 7.03 8.66 7.1 8.42 7.35C8.19 7.61 7.52 8.23 7.52 9.5C7.52 10.77 8.45 11.99 8.57 12.16C8.71 12.33 10.4 14.94 12.97 16.05C13.59 16.31 14.07 16.47 14.44 16.59C15.06 16.78 15.62 16.76 16.07 16.69C16.57 16.62 17.6 16.07 17.82 15.45C18.04 14.84 18.04 14.31 17.97 14.2C17.9 14.09 17.73 14.02 17.47 13.9C17.22 13.77 15.98 13.16 15.75 13.08C15.52 13 15.36 12.95 15.2 13.2C15.03 13.45 14.56 14.02 14.41 14.18C14.27 14.35 14.12 14.37 13.87 14.25C13.62 14.12 12.82 13.86 11.87 13.01C11.13 12.35 10.63 11.53 10.48 11.28C10.34 11.03 10.47 10.9 10.6 10.77C10.71 10.66 10.85 10.48 10.98 10.33C11.1 10.18 11.15 10.07 11.23 9.91C11.31 9.74 11.27 9.6 11.21 9.48C11.15 9.35 10.65 8.13 10.45 7.63C10.25 7.15 10.05 7.21 9.9 7.21C9.75 7.2 9.58 7.2 9.41 7.2C9.25 7.2 8.98 7.26 8.75 7.51" />
  </svg>
);

interface PublisherCreditCardProps {
  variant?: 'hero-top' | 'footer' | 'compact';
  className?: string;
}

export const PublisherCreditCard: React.FC<PublisherCreditCardProps> = ({
  variant = 'hero-top',
  className = ''
}) => {
  const whatsappUrl = "https://wa.me/919480112897?text=Namaste%20Dr%20G.%20Sathyanarayana%20Raju%20ji%2C%20regarding%20Suryavamsha%20Odiyaraju%20Kshatriya%20Heritage%20Portal";
  const imageSrc = "/assets/dr_g_sathyanarayana_raju.png";

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-[#141824]/90 border border-[#c99738]/50 text-xs ${className}`}>
        <img
          src={imageSrc}
          alt="Dr G.Sathyanarayana Raju"
          className="w-7 h-7 rounded-full object-cover object-top border border-[#d4af37]"
        />
        <div className="text-left leading-tight">
          <div className="text-[10px] text-[#d4af37] uppercase font-bold tracking-wider">WebSite Design & Published by</div>
          <div className="font-semibold text-[#fcedc7]">Dr G.Sathyanarayana Raju</div>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 p-1 rounded-lg bg-[#25D366] text-black hover:bg-[#20ba5a] transition-all"
          title="Contact Dr G.Sathyanarayana Raju on WhatsApp (+91 9480112897)"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 ${className}`}>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#21020b] via-[#121626] to-[#21020b] border-2 border-[#d4af37]/80 shadow-[0_0_35px_rgba(212,175,55,0.25)] hover:shadow-[0_0_45px_rgba(212,175,55,0.35)] transition-all p-5 sm:p-7">
        {/* Subtle decorative radial glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#580014]/25 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
          {/* Dr G. Sathyanarayana Raju Portrait */}
          <div className="relative shrink-0 group">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-[#fae29c] shadow-[0_10px_30px_rgba(0,0,0,0.8)] ring-4 ring-[#580014]/90">
              <img
                src={imageSrc}
                alt="Dr G.Sathyanarayana Raju, Leader of Suryavamsha Odiyaraju Kshatriya Community"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Crown Embellishment Badge */}
            <div
              className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-[#580014] to-[#80001c] text-[#fcedc7] p-2 rounded-xl border border-[#d4af37] shadow-xl"
              title="Leader & Publisher"
            >
              <Crown className="w-4 h-4 text-[#d4af37]" />
            </div>
          </div>

          {/* Publishing & Leadership Information */}
          <div className="flex-1 space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#580014]/80 border border-[#d4af37]/60 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#fae29c] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>WebSite Design and Published by</span>
            </div>

            <h2 className="font-royal-heading font-black text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#fff7e6] via-[#fae29c] to-[#d4af37] tracking-tight leading-tight">
              Dr G.Sathyanarayana Raju
            </h2>

            <p className="text-sm sm:text-base font-semibold text-[#f5ecd5] tracking-wide font-royal-serif">
              Leader of Suryavamsha Odiyaraju Kshatriya Community
            </p>

            <p className="text-xs text-stone-400 max-w-2xl leading-relaxed">
              Leading the digital historical documentation, epigraphic preservation, and pan-Indian cultural integration of the Suryavamsha Odiyaraju Kshatriya heritage.
            </p>

            {/* Direct WhatsApp Contact Button & Direct Mobile Call */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20ba5a] text-[#052e16] hover:text-black shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_4px_25px_rgba(37,211,102,0.5)] transition-all cursor-pointer group"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Contact on WhatsApp (+91 9480112897)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="tel:+919480112897"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#182032] hover:bg-[#212c44] text-stone-200 border border-stone-700/80 hover:border-[#c99738] transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>+91 9480112897</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
