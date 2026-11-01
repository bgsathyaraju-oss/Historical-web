import React, { useState } from 'react';
import {
  RoyalButton,
  RoyalCard,
  RoyalCardHeader,
  RoyalCardTitle,
  RoyalCardDescription,
  RoyalCardContent,
  RoyalCardFooter,
  type RoyalButtonVariant,
  type RoyalButtonSize,
  type RoyalCardVariant,
  Input,
  Textarea,
  Select,
  Dropdown,
  DropdownButtonTrigger,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
  Badge,
  Divider,
} from '../components/ui';
import {
  Crown,
  Sparkles,
  Shield,
  Search,
  Mail,
  Lock,
  Download,
  Share2,
  Bookmark,
  CheckCircle,
  AlertCircle,
  Layers,
  Palette,
  Sliders,
  Send,
  Eye,
  ArrowRight,
  Code2,
  Copy,
  Check,
  FileText,
  Calendar,
  Globe,
  Award,
} from 'lucide-react';

interface UiDesignSystemPageProps {
  onNavigate?: (path: string) => void;
}

export const UiDesignSystemPage: React.FC<UiDesignSystemPageProps> = ({ onNavigate }) => {
  // Sandbox State for RoyalButton
  const [btnVariant, setBtnVariant] = useState<RoyalButtonVariant>('gold');
  const [btnSize, setBtnSize] = useState<RoyalButtonSize>('md');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnIcon, setBtnIcon] = useState<'crown' | 'shield' | 'sparkles' | 'none'>('crown');
  const [btnText, setBtnText] = useState('Explore Royal Archive');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Sandbox State for RoyalCard
  const [cardVariant, setCardVariant] = useState<RoyalCardVariant>('default');
  const [cardOrnament, setCardOrnament] = useState(true);
  const [cardGoldText, setCardGoldText] = useState(true);

  // General Portal Form State
  const [sampleInput, setSampleInput] = useState('Kapilendra Deva Inscription');
  const [sampleError, setSampleError] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('te');
  const [dropdownSelection, setDropdownSelection] = useState<string>('Select an action');

  const copyToClipboard = (text: string, snippetId: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedSnippet(snippetId);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  const getButtonIcon = () => {
    switch (btnIcon) {
      case 'crown':
        return <Crown className="w-4 h-4" />;
      case 'shield':
        return <Shield className="w-4 h-4" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4" />;
      default:
        return undefined;
    }
  };

  const generatedButtonCode = `<RoyalButton
  variant="${btnVariant}"
  size="${btnSize}"${btnLoading ? '\n  isLoading' : ''}${btnDisabled ? '\n  disabled' : ''}${
    btnIcon !== 'none' ? `\n  leftIcon={<${btnIcon === 'crown' ? 'Crown' : btnIcon === 'shield' ? 'Shield' : 'Sparkles'} className="w-4 h-4" />}` : ''
  }
>
  ${btnText}
</RoyalButton>`;

  const generatedCardCode = `<RoyalCard variant="${cardVariant}" ornament={${cardOrnament}}>
  <RoyalCardHeader border>
    <RoyalCardTitle goldText={${cardGoldText}}>Suryavamsha Archival Folio</RoyalCardTitle>
    <RoyalCardDescription>Epigraphic copper plate documentation</RoyalCardDescription>
  </RoyalCardHeader>
  <RoyalCardContent>
    <p>Historical record authenticated by epigraphic survey...</p>
  </RoyalCardContent>
  <RoyalCardFooter>
    <Badge variant="verified">Epigraphically Verified</Badge>
    <RoyalButton variant="gold" size="sm">Inspect Inscription</RoyalButton>
  </RoyalCardFooter>
</RoyalCard>`;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* 1. Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE3D0] border border-[#A87924]/40 text-[#762D35] text-xs font-semibold tracking-wider uppercase">
          <Crown className="w-3.5 h-3.5 text-[#A87924]" />
          <span>Suryavamsha Odiyaraju Kshatriya Design Tokens</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-royal-heading tracking-wide text-[#54351F] font-bold">
          Royal UI Design System
        </h1>
        <p className="text-[#6B5948] text-sm sm:text-base font-royal-serif leading-relaxed">
          The official component library unifying visual hierarchy, historical dignity, and responsive
          interaction standards across the historical documentary portal.
        </p>
      </div>

      <Divider />

      {/* 2. Design Tokens Foundation */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-[#A87924]" />
            <h2 className="text-xl sm:text-2xl font-royal-heading text-[#54351F] font-bold">
              1. Light Almond &amp; Warm Ivory Theme Tokens in index.css
            </h2>
          </div>
          <Badge variant="gold">Theme Tokens</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-[#F5EBD9] text-[#292521] border border-[#D8C3A2] text-center shadow-sm">
            <div className="text-xs font-bold text-[#54351F]">#F5EBD9</div>
            <div className="text-xs font-medium text-[#292521] mt-1">Light Almond</div>
            <div className="text-[10px] text-[#6B5948] mt-0.5">--page-bg</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#FFFCF5] text-[#292521] border border-[#D8C3A2] text-center shadow-sm">
            <div className="text-xs font-bold text-[#54351F]">#FFFCF5</div>
            <div className="text-xs font-medium text-[#292521] mt-1">Warm Ivory Card</div>
            <div className="text-[10px] text-[#6B5948] mt-0.5">--card-bg</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#EFE3D0] text-[#292521] border border-[#D8C3A2] text-center shadow-sm">
            <div className="text-xs font-bold text-[#54351F]">#EFE3D0</div>
            <div className="text-xs font-medium text-[#292521] mt-1">Section Surface</div>
            <div className="text-[10px] text-[#6B5948] mt-0.5">--section-bg</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#762D35] text-white border border-[#5E2229] text-center font-bold shadow-sm">
            <div className="text-xs">#762D35</div>
            <div className="text-xs font-medium text-white mt-1">Primary Maroon</div>
            <div className="text-[10px] text-[#EFE3D0] mt-0.5">--primary-button</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#A87924] text-white border border-[#8E641B] text-center font-bold shadow-sm">
            <div className="text-xs">#A87924</div>
            <div className="text-xs font-medium text-white mt-1">Accent Gold</div>
            <div className="text-[10px] text-[#FFF9EF] mt-0.5">--accent-gold</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#54351F] text-white border border-[#292521] text-center font-bold shadow-sm">
            <div className="text-xs">#54351F</div>
            <div className="text-xs font-medium text-white mt-1">Heading Espresso</div>
            <div className="text-[10px] text-[#EFE3D0] mt-0.5">--heading-text</div>
          </div>
        </div>

        {/* Typography & Borders Tokens Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#76501F]">
              Typography Tokens
            </div>
            <div className="font-royal-heading text-lg text-[#54351F] font-bold">
              Cinzel: SŪRYAVAṀŚA GAJAPATHI RĀJULU
            </div>
            <div className="font-royal-serif text-sm text-[#292521] italic">
              Cormorant Garamond: "Epigraphic chronicles of Odra Desha, Kalinga, and Trikalinga."
            </div>
            <div className="text-xs text-[#6B5948]">
              Plus Jakarta Sans: Clean, highly legible body text for documentary archives.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#A87924]/50 shadow-sm space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#76501F]">
              Royal Borders &amp; Surfaces
            </div>
            <div className="text-xs text-[#292521]">
              <span className="font-semibold text-[#54351F]">.royal-border:</span> 1px warm gold border (#D8C3A2) with subtle warm shadow.
            </div>
            <div className="text-xs text-[#292521]">
              <span className="font-semibold text-[#54351F]">.royal-border-glow:</span> Enhanced golden highlight for primary edicts.
            </div>
            <div className="text-xs text-[#292521]">
              <span className="font-semibold text-[#54351F]">.royal-gold-gradient:</span> Warm heritage metallic reflection (#A87924).
            </div>
          </div>
        </div>
      </section>

      {/* 3. RoyalButton Component Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sliders className="w-5 h-5 text-[#A87924]" />
            <h2 className="text-xl sm:text-2xl font-royal-heading text-[#54351F] font-bold">
              2. RoyalButton Component
            </h2>
          </div>
          <Badge variant="maroon">src/components/ui/RoyalButton.tsx</Badge>
        </div>

        {/* Interactive RoyalButton Sandbox */}
        <RoyalCard variant="glow" ornament>
          <RoyalCardHeader border>
            <RoyalCardTitle goldText>Interactive RoyalButton Playground</RoyalCardTitle>
            <RoyalCardDescription>
              Test variants, sizes, icon slots, and active states with live code output.
            </RoyalCardDescription>
          </RoyalCardHeader>
          <RoyalCardContent className="pt-6 space-y-6">
            {/* Control Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2]">
              {/* Variant selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#54351F] mb-1.5">
                  Variant
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['gold', 'maroon', 'outline', 'ghost', 'danger'] as RoyalButtonVariant[]).map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setBtnVariant(v)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border capitalize transition-all cursor-pointer ${
                        btnVariant === v
                          ? 'border-[#762D35] bg-[#762D35] text-white font-semibold'
                          : 'border-[#D8C3A2] bg-white text-[#54351F] hover:bg-[#EFE3D0]'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#54351F] mb-1.5">
                  Size
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['sm', 'md', 'lg'] as RoyalButtonSize[]).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setBtnSize(s)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border uppercase transition-all cursor-pointer ${
                        btnSize === s
                          ? 'border-[#762D35] bg-[#762D35] text-white font-semibold'
                          : 'border-[#D8C3A2] bg-white text-[#54351F] hover:bg-[#EFE3D0]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Icon selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#54351F] mb-1.5">
                  Icon Slot
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['crown', 'shield', 'sparkles', 'none'] as const).map(ic => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setBtnIcon(ic)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border capitalize transition-all cursor-pointer ${
                        btnIcon === ic
                          ? 'border-[#762D35] bg-[#762D35] text-white font-semibold'
                          : 'border-[#D8C3A2] bg-white text-[#54351F] hover:bg-[#EFE3D0]'
                      }`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#54351F] mb-1.5">
                  State Toggles
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs text-[#292521] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={btnLoading}
                      onChange={e => setBtnLoading(e.target.checked)}
                      className="rounded accent-[#762D35]"
                    />
                    <span>Loading Spinner (isLoading)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-[#292521] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={btnDisabled}
                      onChange={e => setBtnDisabled(e.target.checked)}
                      className="rounded accent-[#762D35]"
                    />
                    <span>Disabled State</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Live Interactive Preview */}
            <div className="p-8 rounded-2xl bg-[#EFE3D0]/60 border border-[#D8C3A2] flex flex-col items-center justify-center gap-4 text-center">
              <span className="text-[11px] uppercase tracking-widest text-[#6B5948] font-semibold">
                Live Component Preview
              </span>
              <RoyalButton
                variant={btnVariant}
                size={btnSize}
                isLoading={btnLoading}
                disabled={btnDisabled}
                leftIcon={getButtonIcon()}
              >
                {btnText}
              </RoyalButton>
            </div>

            {/* Code Output */}
            <div className="relative rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] p-4">
              <div className="flex items-center justify-between text-xs text-[#6B5948] mb-2">
                <span className="flex items-center gap-1.5 font-mono text-[#54351F] font-semibold">
                  <Code2 className="w-3.5 h-3.5 text-[#A87924]" /> JSX Code Snippet
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(generatedButtonCode, 'btn')}
                  className="flex items-center gap-1 text-xs text-[#76501F] hover:text-[#A87924] transition-colors font-semibold cursor-pointer"
                >
                  {copiedSnippet === 'btn' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#1E5631]" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-[#292521] overflow-x-auto whitespace-pre leading-relaxed">
                {generatedButtonCode}
              </pre>
            </div>

            {/* Fixed Matrix of Variants */}
            <div className="space-y-3 pt-4 border-t border-[#D8C3A2]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#54351F]">
                Standard Variant Showcase
              </h4>
              <div className="flex flex-wrap gap-4 items-center">
                <RoyalButton variant="gold" leftIcon={<Crown className="w-4 h-4" />}>
                  Royal Gold
                </RoyalButton>
                <RoyalButton variant="maroon" leftIcon={<Shield className="w-4 h-4" />}>
                  Imperial Maroon
                </RoyalButton>
                <RoyalButton variant="outline" leftIcon={<Bookmark className="w-4 h-4" />}>
                  Almond Outline
                </RoyalButton>
                <RoyalButton variant="ghost" leftIcon={<Share2 className="w-4 h-4" />}>
                  Ghost Action
                </RoyalButton>
                <RoyalButton variant="danger" leftIcon={<AlertCircle className="w-4 h-4" />}>
                  Danger Red
                </RoyalButton>
                <RoyalButton variant="gold" size="sm" isLoading>
                  Processing
                </RoyalButton>
              </div>
            </div>
          </RoyalCardContent>
        </RoyalCard>
      </section>

      {/* 4. RoyalCard Component Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-[#A87924]" />
            <h2 className="text-xl sm:text-2xl font-royal-heading text-[#54351F] font-bold">
              3. RoyalCard Component Suite
            </h2>
          </div>
          <Badge variant="gold">src/components/ui/RoyalCard.tsx</Badge>
        </div>

        {/* Interactive RoyalCard Sandbox */}
        <RoyalCard variant="default" ornament>
          <RoyalCardHeader border>
            <RoyalCardTitle goldText>Interactive RoyalCard Playground</RoyalCardTitle>
            <RoyalCardDescription>
              Test surface variants, decorative corner brackets, and subcomponent hierarchy.
            </RoyalCardDescription>
          </RoyalCardHeader>
          <RoyalCardContent className="pt-6 space-y-6">
            {/* Control Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2]">
              {/* Variant */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#54351F] mb-1.5">
                  Surface Variant
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['default', 'glow', 'maroon', 'pattern', 'flat'] as RoyalCardVariant[]).map(cv => (
                    <button
                      key={cv}
                      type="button"
                      onClick={() => setCardVariant(cv)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border capitalize transition-all cursor-pointer ${
                        cardVariant === cv
                          ? 'border-[#762D35] bg-[#762D35] text-white font-semibold'
                          : 'border-[#D8C3A2] bg-white text-[#54351F] hover:bg-[#EFE3D0]'
                      }`}
                    >
                      {cv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ornaments */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#54351F] mb-1.5">
                  Ornaments
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-[#292521] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cardOrnament}
                      onChange={e => setCardOrnament(e.target.checked)}
                      className="rounded accent-[#762D35]"
                    />
                    <span>Corner Brackets (ornament)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-[#292521] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cardGoldText}
                      onChange={e => setCardGoldText(e.target.checked)}
                      className="rounded accent-[#762D35]"
                    />
                    <span>Heading Accent Title (goldText)</span>
                  </label>
                </div>
              </div>

              {/* Subcomponent list */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#54351F] mb-1.5">
                  Subcomponents Included
                </label>
                <ul className="text-xs text-[#6B5948] space-y-1">
                  <li>• <code className="text-[#762D35] font-semibold">RoyalCardHeader</code> (with optional bottom border)</li>
                  <li>• <code className="text-[#762D35] font-semibold">RoyalCardTitle</code> (Cinzel font)</li>
                  <li>• <code className="text-[#762D35] font-semibold">RoyalCardDescription</code> (Cormorant / Sans)</li>
                  <li>• <code className="text-[#762D35] font-semibold">RoyalCardContent</code> &amp; <code className="text-[#762D35] font-semibold">RoyalCardFooter</code></li>
                </ul>
              </div>
            </div>

            {/* Live Interactive Card Preview */}
            <div className="max-w-xl mx-auto w-full">
              <RoyalCard variant={cardVariant} ornament={cardOrnament}>
                <RoyalCardHeader border>
                  <div className="flex items-center justify-between">
                    <Badge variant="gold">Dynastic Folio</Badge>
                    <span className="text-[11px] text-[#6B5948]">Regnal Year 1435 CE</span>
                  </div>
                  <RoyalCardTitle goldText={cardGoldText} className="mt-2">
                    Suryavamsha Archival Folio
                  </RoyalCardTitle>
                  <RoyalCardDescription>
                    Epigraphic copper plate documentation preserving royal grants and land endowments.
                  </RoyalCardDescription>
                </RoyalCardHeader>
                <RoyalCardContent className="space-y-3 pt-4 text-xs sm:text-sm text-[#292521]">
                  <p>
                    Inscribed during the reign of Maharaja Sri Kapilendra Deva at Simhachalam temple,
                    recording the titles of Gajapathi, Gaudesvara, and Navakoti Karnata Kalavaragesvara.
                  </p>
                  <div className="p-3 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] text-xs text-[#292521]">
                    <span className="text-[#54351F] font-semibold">Evidence Status:</span> Primary Epigraphic Inscription
                  </div>
                </RoyalCardContent>
                <RoyalCardFooter>
                  <Badge variant="verified" icon={<CheckCircle className="w-3.5 h-3.5" />}>
                    Epigraphically Verified
                  </Badge>
                  <RoyalButton variant="gold" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Inspect Folio
                  </RoyalButton>
                </RoyalCardFooter>
              </RoyalCard>
            </div>

            {/* Code Output for RoyalCard */}
            <div className="relative rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] p-4">
              <div className="flex items-center justify-between text-xs text-[#6B5948] mb-2">
                <span className="flex items-center gap-1.5 font-mono text-[#54351F] font-semibold">
                  <Code2 className="w-3.5 h-3.5 text-[#A87924]" /> JSX Code Snippet
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(generatedCardCode, 'card')}
                  className="flex items-center gap-1 text-xs text-[#76501F] hover:text-[#A87924] transition-colors font-semibold cursor-pointer"
                >
                  {copiedSnippet === 'card' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#1E5631]" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-[#292521] overflow-x-auto whitespace-pre leading-relaxed">
                {generatedCardCode}
              </pre>
            </div>
          </RoyalCardContent>
        </RoyalCard>

        {/* 3 Real-World Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Card 1: Default Ivory */}
          <RoyalCard variant="default" ornament>
            <RoyalCardHeader border>
              <RoyalCardTitle goldText>Warm Ivory Card</RoyalCardTitle>
              <RoyalCardDescription>
                Signature warm ivory backdrop (#FFFCF5) with fine 1px golden almond border.
              </RoyalCardDescription>
            </RoyalCardHeader>
            <RoyalCardContent className="pt-4 text-xs sm:text-sm text-[#292521] space-y-2">
              <p>
                Features warm paper elegance and geometric gold corner brackets. Used for
                standard archival records, member listings, and references.
              </p>
            </RoyalCardContent>
            <RoyalCardFooter>
              <span className="text-xs text-[#6B5948]">Variant: default</span>
              <RoyalButton size="sm" variant="outline">
                View Archive
              </RoyalButton>
            </RoyalCardFooter>
          </RoyalCard>

          {/* Card 2: Glow Aura */}
          <RoyalCard variant="glow" ornament>
            <RoyalCardHeader border>
              <RoyalCardTitle goldText>Glow Variant Card</RoyalCardTitle>
              <RoyalCardDescription>
                Warm gold border accent for high-priority archival citations.
              </RoyalCardDescription>
            </RoyalCardHeader>
            <RoyalCardContent className="pt-4 text-xs sm:text-sm text-[#292521] space-y-2">
              <p>
                Engineered for authenticated copper plates, verified claims, and documentary highlights
                requiring visual prominence.
              </p>
            </RoyalCardContent>
            <RoyalCardFooter>
              <Badge variant="verified">Epigraphic</Badge>
              <RoyalButton size="sm" variant="gold" leftIcon={<Crown className="w-3.5 h-3.5" />}>
                Explore
              </RoyalButton>
            </RoyalCardFooter>
          </RoyalCard>

          {/* Card 3: Heritage Almond */}
          <RoyalCard variant="maroon" ornament>
            <RoyalCardHeader border>
              <RoyalCardTitle goldText={false}>Heritage Almond Card</RoyalCardTitle>
              <RoyalCardDescription>
                Rich warm parchment gradient evoking sovereign royal seals.
              </RoyalCardDescription>
            </RoyalCardHeader>
            <RoyalCardContent className="pt-4 text-xs sm:text-sm text-[#292521] space-y-2">
              <p>
                Harmonizes with historical documentary narratives, royal lineage branches, and dynastic
                rulers biographies.
              </p>
            </RoyalCardContent>
            <RoyalCardFooter>
              <Badge variant="maroon">Dynastic</Badge>
              <RoyalButton size="sm" variant="maroon" leftIcon={<Shield className="w-3.5 h-3.5" />}>
                Details
              </RoyalButton>
            </RoyalCardFooter>
          </RoyalCard>
        </div>
      </section>

      {/* 5. Real-World Portal Composition Exhibit */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#A87924]" />
            <h2 className="text-xl sm:text-2xl font-royal-heading text-[#54351F] font-bold">
              4. Complete Portal Composition Exhibit
            </h2>
          </div>
          <Badge variant="verified">Design System Consistency</Badge>
        </div>

        <p className="text-xs sm:text-sm text-[#292521] leading-relaxed max-w-3xl">
          Demonstrating how <code className="text-[#762D35] font-semibold">RoyalButton</code> and{' '}
          <code className="text-[#762D35] font-semibold">RoyalCard</code> combine seamlessly with form inputs,
          badges, and interactive dropdowns to produce authentic royal heritage layouts.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Exhibit A: Epigraphic Citation Box */}
          <RoyalCard variant="glow" ornament>
            <RoyalCardHeader border>
              <div className="flex items-center justify-between">
                <Badge variant="gold" icon={<Crown className="w-3 h-3" />}>
                  Royal Dynasty Edict
                </Badge>
                <Badge variant="verified" icon={<CheckCircle className="w-3 h-3" />}>
                  Primary Evidence
                </Badge>
              </div>
              <RoyalCardTitle goldText className="mt-3">
                Kondavidu Fort Inscription (1454 CE)
              </RoyalCardTitle>
              <RoyalCardDescription>
                Bilingual Sanskrit-Telugu epigraph celebrating Gajapathi sovereignty in Coastal Andhra.
              </RoyalCardDescription>
            </RoyalCardHeader>
            <RoyalCardContent className="pt-4 space-y-4">
              <div className="p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] font-royal-serif text-sm text-[#54351F] leading-relaxed italic">
                "Sri Suryavamsha Prathama Pratishthapaka Sri Kapilendra Deva Gajapathi Mahārājulankāru..."
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#FFF9EF] border border-[#D8C3A2]">
                  <span className="text-[#6B5948] block text-[11px]">Repository</span>
                  <span className="text-[#54351F] font-semibold">Archaeological Survey of India</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FFF9EF] border border-[#D8C3A2]">
                  <span className="text-[#6B5948] block text-[11px]">Epigraphia Indica</span>
                  <span className="text-[#54351F] font-semibold">Vol. XXXVI, pp. 206–214</span>
                </div>
              </div>
            </RoyalCardContent>
            <RoyalCardFooter>
              <RoyalButton variant="outline" size="sm" leftIcon={<Bookmark className="w-3.5 h-3.5" />}>
                Bookmark
              </RoyalButton>
              <div className="flex gap-2">
                <RoyalButton variant="maroon" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
                  Citation
                </RoyalButton>
                <RoyalButton variant="gold" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Full Transcript
                </RoyalButton>
              </div>
            </RoyalCardFooter>
          </RoyalCard>

          {/* Exhibit B: Community Research Submission Box */}
          <RoyalCard variant="pattern" ornament>
            <RoyalCardHeader border>
              <div className="flex items-center justify-between">
                <Badge variant="maroon" icon={<Shield className="w-3 h-3" />}>
                  Community Contribution
                </Badge>
                <span className="text-[11px] text-[#6B5948]">Editorial Review Required</span>
              </div>
              <RoyalCardTitle goldText className="mt-3">
                Submit Inscription / Lineage Record
              </RoyalCardTitle>
              <RoyalCardDescription>
                Peer-reviewed research workflow for members and epigraphic researchers.
              </RoyalCardDescription>
            </RoyalCardHeader>
            <RoyalCardContent className="pt-4 space-y-4">
              <Input
                label="Historical Inscription Title"
                placeholder="e.g. Copper Plate Grant of Purushottama Deva"
                value={sampleInput}
                onChange={e => setSampleInput(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Inscription Language"
                  value={selectedLanguage}
                  onChange={e => setSelectedLanguage(e.target.value)}
                  options={[
                    { value: 'te', label: 'తెలుగు (Telugu)' },
                    { value: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
                    { value: 'sa', label: 'संस्कृतम् (Sanskrit)' },
                    { value: 'en', label: 'English Translation' },
                  ]}
                />
                <Select
                  label="Evidence Classification"
                  options={[
                    { value: 'epigraphic', label: 'Epigraphic / Stone' },
                    { value: 'copper', label: 'Copper Plate Grant' },
                    { value: 'palm_leaf', label: 'Palm-Leaf Manuscript' },
                    { value: 'lineage', label: 'Family Vamsavali' },
                  ]}
                />
              </div>

              <Textarea
                label="Epigraphic Notes & Source Citations"
                rows={3}
                placeholder="Include reference volumes, ASI numbers, and provenance details..."
                defaultValue="Preserved in the temple archives of Simhachalam. Transcribed in South Indian Inscriptions Vol. VI."
              />
            </RoyalCardContent>
            <RoyalCardFooter>
              <RoyalButton variant="ghost" size="sm">
                Save Draft
              </RoyalButton>
              <RoyalButton variant="gold" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
                Submit for Editorial Review
              </RoyalButton>
            </RoyalCardFooter>
          </RoyalCard>
        </div>
      </section>

      <Divider />

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <p className="text-xs text-[#6B5948]">
          Suryavamsha Odiyaraju Kshatriya Design Tokens &copy; {new Date().getFullYear()}. Production
          components located under <code className="text-[#762D35] font-semibold">src/components/ui/</code>.
        </p>
        <div className="flex gap-3">
          {onNavigate && (
            <>
              <RoyalButton variant="outline" size="sm" onClick={() => onNavigate('/')}>
                Back to Home
              </RoyalButton>
              <RoyalButton variant="gold" size="sm" onClick={() => onNavigate('/documentary')}>
                Explore Documentary
              </RoyalButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
