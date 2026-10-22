import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  Github,
  Terminal,
  CheckCircle,
  Copy,
  ExternalLink,
  X,
  Package,
  Layers,
  Database
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportProjectModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'download' | 'android' | 'github'>('download');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const androidCommands = `# 1. Update Termux & install Node.js + Git
pkg update && pkg upgrade -y
pkg install nodejs git unzip -y

# 2. Grant Termux storage access
termux-setup-storage

# 3. Create folder and extract downloaded ZIP
mkdir -p ~/suryavamsha-portal
cd ~/suryavamsha-portal
cp /sdcard/Download/suryavamsha-odiyaraju-kshatriya-portal.zip .
unzip suryavamsha-odiyaraju-kshatriya-portal.zip

# 4. Install dependencies and start server
npm install
npm run dev

# 5. Open http://localhost:3000 in your Android browser`;

  const gitCommands = `# 1. Initialize local repository
git init
git add .
git commit -m "Initial export: Suryavamsha Odiyaraju Kshatriya Portal"

# 2. Rename branch to main
git branch -M main

# 3. Connect to your free GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/suryavamsha-portal.git

# 4. Push all code
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#111520] border border-[#c99738]/50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 bg-[#161b2a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#580014] border border-[#c99738]/40 text-[#fcedc7]">
              <Package className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h2 className="font-royal-heading font-extrabold text-lg sm:text-xl text-[#fcedc7]">
                {t.exportModal?.title || 'Export & Download Portal Project'}
              </h2>
              <p className="text-xs text-stone-400">
                {t.exportModal?.subtitle || 'Complete source code, database configuration, 8-language translations & Android setup'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-200 hover:bg-stone-800/60 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-stone-800 bg-[#111520]">
          <button
            onClick={() => setActiveTab('download')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'download'
                ? 'border-[#c99738] text-[#fcedc7]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Download className="w-4 h-4 text-[#d4af37]" />
            <span>{t.exportModal?.downloadTab || 'Download ZIP Package'}</span>
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'android'
                ? 'border-[#c99738] text-[#fcedc7]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>{t.exportModal?.androidTab || 'Android Phone Guide'}</span>
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'github'
                ? 'border-[#c99738] text-[#fcedc7]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Github className="w-4 h-4 text-purple-400" />
            <span>{t.exportModal?.githubTab || 'Free GitHub Export'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-300 text-xs sm:text-sm leading-relaxed">
          {activeTab === 'download' && (
            <div className="space-y-6">
              {/* Download Callout */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#2a0810] to-[#121622] border border-[#c99738]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-royal-heading font-bold text-base text-[#fcedc7]">
                    {t.exportModal?.readyNotice ? 'Ready for Instant Export' : 'Ready for Instant Export'}
                  </h3>
                  <p className="text-xs text-stone-400">
                    {t.exportModal?.readyNotice || 'Includes all React 19 components, Express backend routes, database data, translations & tests.'}
                  </p>
                </div>
                <a
                  href="/api/export/project-zip"
                  download="suryavamsha-odiyaraju-kshatriya-portal.zip"
                  className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#c99738] hover:bg-[#dfab43] text-[#300207] transition-all flex items-center gap-2 shadow-lg shadow-[#c99738]/20 whitespace-nowrap cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.exportModal?.downloadBtn || 'Download ZIP (Complete)'}</span>
                </a>
              </div>

              {/* Package Manifest */}
              <div className="space-y-3">
                <h4 className="font-royal-heading font-bold text-xs uppercase tracking-wider text-[#d4af37]">
                  {t.exportModal?.packageIncludes || 'What is Included in Your Package:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3">
                    <Layers className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-200 block text-xs">Frontend Client (/src)</strong>
                      <span className="text-[11px] text-stone-400">
                        {t.exportModal?.frontendDesc || 'React 19, Tailwind v4, Royal Heritage UI tokens, 30+ pages, interactive genealogy tree & documentary.'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3">
                    <Terminal className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-200 block text-xs">Backend Server (/server)</strong>
                      <span className="text-[11px] text-stone-400">
                        {t.exportModal?.backendDesc || 'Express.js TypeScript API with authentication, RBAC, file upload handler, and search routes.'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3">
                    <Database className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-200 block text-xs">Database & Seeds (/data)</strong>
                      <span className="text-[11px] text-stone-400">
                        {t.exportModal?.databaseDesc || 'Normalized atomic storage containing dynasties, epigraphic records, member accounts, and timeline.'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-200 block text-xs">8-Language Translation Engine</strong>
                      <span className="text-[11px] text-stone-400">
                        {t.exportModal?.translationDesc || 'TranslationManager service with offline persistence and translations across 8 major Indian languages.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs">
                <strong>No Computer Required:</strong> {t.exportModal?.androidNotice || 'You can run this entire portal locally on any modern Android smartphone using Termux.'}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-stone-300">Termux Setup Commands:</span>
                  <button
                    onClick={() => copyToClipboard(androidCommands, 'android')}
                    className="text-xs text-[#c99738] hover:text-[#e8c872] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSection === 'android' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'android' ? (t.common?.copied || 'Copied!') : (t.exportModal?.copyCmds || 'Copy Commands')}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-black/60 border border-stone-800 font-mono text-[11px] sm:text-xs text-stone-300 overflow-x-auto">
                  {androidCommands}
                </pre>
              </div>

              <ol className="list-decimal list-inside space-y-1.5 text-xs text-stone-400">
                <li>Download Termux from <strong className="text-stone-300">F-Droid</strong> (free & open source).</li>
                <li>Tap <strong>Download ZIP</strong> above in your mobile browser.</li>
                <li>Paste the commands into Termux to start your server.</li>
                <li>Open <strong>http://localhost:3000</strong> in Chrome on your phone to use the portal offline!</li>
              </ol>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-400">
                {t.exportModal?.githubNotice || 'Push your project to GitHub for free version control and cloud backup. You can also connect it to free cloud providers like Render, Vercel, or Railway.'}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-stone-300">Git Terminal Commands:</span>
                  <button
                    onClick={() => copyToClipboard(gitCommands, 'git')}
                    className="text-xs text-[#c99738] hover:text-[#e8c872] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSection === 'git' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'git' ? (t.common?.copied || 'Copied!') : (t.exportModal?.copyCmds || 'Copy Commands')}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-black/60 border border-stone-800 font-mono text-[11px] sm:text-xs text-stone-300 overflow-x-auto">
                  {gitCommands}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 text-purple-200 text-xs flex items-center justify-between">
                <span>Free cloud deployment: Render.com (Full-Stack) or Vercel (Frontend).</span>
                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-purple-300 hover:text-white"
                >
                  Create Repo <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-[#161b2a] flex items-center justify-between text-xs text-stone-400">
          <span>{t.siteTitle} • Production Release</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium transition-colors cursor-pointer"
          >
            {t.exportModal?.closeBtn || t.common?.close || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
