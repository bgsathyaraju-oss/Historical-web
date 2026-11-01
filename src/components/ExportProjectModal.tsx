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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292521]/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#FFFCF5] border-2 border-[#A87924] shadow-[0_14px_45px_rgba(75,51,31,0.25)] overflow-hidden flex flex-col max-h-[90vh] text-[#292521]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#D8C3A2] bg-[#F1E4D0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#762D35] border border-[#A87924] text-white">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-royal-heading font-extrabold text-lg sm:text-xl text-[#54351F]">
                {t.exportModal?.title || 'Export & Download Portal Project'}
              </h2>
              <p className="text-xs text-[#6B5948]">
                {t.exportModal?.subtitle || 'Complete source code, database configuration, 8-language translations & Android setup'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#54351F] hover:text-white hover:bg-[#762D35] border border-[#D8C3A2] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-[#D8C3A2] bg-[#FFF9EF]">
          <button
            onClick={() => setActiveTab('download')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'download'
                ? 'border-[#762D35] text-[#54351F]'
                : 'border-transparent text-[#6B5948] hover:text-[#292521]'
            }`}
          >
            <Download className="w-4 h-4 text-[#A87924]" />
            <span>{t.exportModal?.downloadTab || 'Download ZIP Package'}</span>
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'android'
                ? 'border-[#762D35] text-[#54351F]'
                : 'border-transparent text-[#6B5948] hover:text-[#292521]'
            }`}
          >
            <Smartphone className="w-4 h-4 text-[#2D7A4D]" />
            <span>{t.exportModal?.androidTab || 'Android Phone Guide'}</span>
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'github'
                ? 'border-[#762D35] text-[#54351F]'
                : 'border-transparent text-[#6B5948] hover:text-[#292521]'
            }`}
          >
            <Github className="w-4 h-4 text-[#76501F]" />
            <span>{t.exportModal?.githubTab || 'Free GitHub Export'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#292521] text-xs sm:text-sm leading-relaxed bg-[#FFFCF5]">
          {activeTab === 'download' && (
            <div className="space-y-6">
              {/* Download Callout */}
              <div className="p-6 rounded-2xl bg-[#FFF9EF] border border-[#A87924]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-royal-heading font-bold text-base text-[#54351F]">
                    {t.exportModal?.readyNotice ? 'Ready for Instant Export' : 'Ready for Instant Export'}
                  </h3>
                  <p className="text-xs text-[#6B5948]">
                    {t.exportModal?.readyNotice || 'Includes all React 19 components, Express backend routes, database data, translations & tests.'}
                  </p>
                </div>
                <a
                  href="/api/export/project-zip"
                  download="suryavamsha-odiyaraju-kshatriya-portal.zip"
                  className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#762D35] hover:bg-[#5e2229] text-white border border-[#A87924] transition-all flex items-center gap-2 shadow-sm whitespace-nowrap cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.exportModal?.downloadBtn || 'Download ZIP (Complete)'}</span>
                </a>
              </div>

              {/* Package Manifest */}
              <div className="space-y-3">
                <h4 className="font-royal-heading font-bold text-xs uppercase tracking-wider text-[#54351F]">
                  {t.exportModal?.packageIncludes || 'What is Included in Your Package:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] flex items-start gap-3">
                    <Layers className="w-4 h-4 text-[#A87924] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#54351F] block text-xs">Frontend Client (/src)</strong>
                      <span className="text-[11px] text-[#6B5948]">
                        {t.exportModal?.frontendDesc || 'React 19, Tailwind v4, Royal Heritage UI tokens, 30+ pages, interactive genealogy tree & documentary.'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] flex items-start gap-3">
                    <Terminal className="w-4 h-4 text-[#2D7A4D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#54351F] block text-xs">Backend Server (/server)</strong>
                      <span className="text-[11px] text-[#6B5948]">
                        {t.exportModal?.backendDesc || 'Express.js TypeScript API with authentication, RBAC, file upload handler, and search routes.'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] flex items-start gap-3">
                    <Database className="w-4 h-4 text-[#A87924] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#54351F] block text-xs">Database & Seeds (/data)</strong>
                      <span className="text-[11px] text-[#6B5948]">
                        {t.exportModal?.databaseDesc || 'Normalized atomic storage containing dynasties, epigraphic records, member accounts, and timeline.'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#2D7A4D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#54351F] block text-xs">8-Language Translation Engine</strong>
                      <span className="text-[11px] text-[#6B5948]">
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
              <div className="p-4 rounded-xl bg-[#EDF7F0] border border-[#2D7A4D] text-[#14532D] text-xs">
                <strong>No Computer Required:</strong> {t.exportModal?.androidNotice || 'You can run this entire portal locally on any modern Android smartphone using Termux.'}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[#54351F]">Termux Setup Commands:</span>
                  <button
                    onClick={() => copyToClipboard(androidCommands, 'android')}
                    className="text-xs text-[#76501F] hover:text-[#A87924] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSection === 'android' ? <CheckCircle className="w-3.5 h-3.5 text-[#2D7A4D]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'android' ? (t.common?.copied || 'Copied!') : (t.exportModal?.copyCmds || 'Copy Commands')}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-[#EFE3D0] border border-[#D8C3A2] font-mono text-[11px] sm:text-xs text-[#292521] overflow-x-auto">
                  {androidCommands}
                </pre>
              </div>

              <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#6B5948]">
                <li>Download Termux from <strong className="text-[#54351F]">F-Droid</strong> (free & open source).</li>
                <li>Tap <strong>Download ZIP</strong> above in your mobile browser.</li>
                <li>Paste the commands into Termux to start your server.</li>
                <li>Open <strong>http://localhost:3000</strong> in Chrome on your phone to use the portal offline!</li>
              </ol>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-4">
              <p className="text-xs text-[#6B5948]">
                {t.exportModal?.githubNotice || 'Push your project to GitHub for free version control and cloud backup. You can also connect it to free cloud providers like Render, Vercel, or Railway.'}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[#54351F]">Git Terminal Commands:</span>
                  <button
                    onClick={() => copyToClipboard(gitCommands, 'git')}
                    className="text-xs text-[#76501F] hover:text-[#A87924] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSection === 'git' ? <CheckCircle className="w-3.5 h-3.5 text-[#2D7A4D]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'git' ? (t.common?.copied || 'Copied!') : (t.exportModal?.copyCmds || 'Copy Commands')}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-[#EFE3D0] border border-[#D8C3A2] font-mono text-[11px] sm:text-xs text-[#292521] overflow-x-auto">
                  {gitCommands}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-[#FFF9EF] border border-[#A87924]/50 text-[#54351F] text-xs flex items-center justify-between">
                <span>Free cloud deployment: Render.com (Full-Stack) or Vercel (Frontend).</span>
                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#76501F] hover:text-[#A87924]"
                >
                  Create Repo <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#D8C3A2] bg-[#F1E4D0] flex items-center justify-between text-xs text-[#6B5948]">
          <span>{t.siteTitle} • Production Release</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#E9D9BE] hover:bg-[#762D35] text-[#54351F] hover:text-white border border-[#A87924]/50 font-medium transition-colors cursor-pointer"
          >
            {t.exportModal?.closeBtn || t.common?.close || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
