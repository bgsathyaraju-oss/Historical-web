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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c99738]/15 border border-[#c99738]/40 text-[#e6be6c] text-xs font-semibold tracking-wider uppercase">
          <Crown className="w-3.5 h-3.5" />
          <span>Suryavamsha Odiyaraju Kshatriya Design Tokens</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-royal-heading tracking-wide royal-gold-text">
          Royal UI Design System
        </h1>
        <p className="text-stone-300 text-sm sm:text-base font-royal-serif leading-relaxed">
          The official component library unifying visual hierarchy, historical dignity, and responsive
          interaction standards across the historical documentary portal.
        </p>
      </div>

      <Divider />

      {/* 2. Design Tokens Foundation */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-[#c99738]" />
            <h2 className="text-xl sm:text-2xl font-royal-heading text-[#faf7f0]">
              1. Royal Design Tokens in index.css
            </h2>
          </div>
          <Badge variant="gold">Theme Tokens</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-[#580014] border border-[#c99738]/40 text-center shadow-lg">
            <div className="text-xs font-bold text-amber-200">#580014</div>
            <div className="text-xs font-medium text-stone-200 mt-1">Royal Maroon</div>
            <div className="text-[10px] text-amber-300/70 mt-0.5">--royal-maroon</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#3a000d] border border-stone-700 text-center shadow-lg">
            <div className="text-xs font-bold text-amber-200">#3a000d</div>
            <div className="text-xs font-medium text-stone-200 mt-1">Maroon Dark</div>
            <div className="text-[10px] text-amber-300/70 mt-0.5">--royal-maroon-dark</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#c99738] text-[#070d18] border border-amber-300 text-center font-bold shadow-lg">
            <div className="text-xs">#c99738</div>
            <div className="text-xs font-medium text-[#070d18] mt-1">Royal Gold</div>
            <div className="text-[10px] text-[#3a000d] mt-0.5">--royal-gold</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#e6be6c] text-[#070d18] border border-amber-200 text-center font-bold shadow-lg">
            <div className="text-xs">#e6be6c</div>
            <div className="text-xs font-medium text-[#070d18] mt-1">Gold Light</div>
            <div className="text-[10px] text-[#3a000d] mt-0.5">--royal-gold-light</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#0b1528] border border-[#c99738]/40 text-center shadow-lg">
            <div className="text-xs font-bold text-sky-200">#0b1528</div>
            <div className="text-xs font-medium text-stone-200 mt-1">Royal Navy</div>
            <div className="text-[10px] text-sky-400/70 mt-0.5">--royal-navy</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#faf7f0] text-[#070d18] border border-[#c99738] text-center font-bold shadow-lg">
            <div className="text-xs">#faf7f0</div>
            <div className="text-xs font-medium text-[#070d18] mt-1">Royal Ivory</div>
            <div className="text-[10px] text-[#580014] mt-0.5">--royal-ivory</div>
          </div>
        </div>

        {/* Typography & Borders Tokens Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#0b1528]/80 royal-border space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#c99738]">
              Typography Tokens
            </div>
            <div className="font-royal-heading text-lg text-[#faf7f0]">
              Cinzel: SŪRYAVAṀŚA GAJAPATHI RĀJULU
            </div>
            <div className="font-royal-serif text-sm text-stone-300 italic">
              Cormorant Garamond: "Epigraphic chronicles of Odra Desha, Kalinga, and Trikalinga."
            </div>
            <div className="text-xs text-stone-400">
              Plus Jakarta Sans: Clean, highly legible body text for documentary archives.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b1528]/80 royal-border-glow space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#c99738]">
              Royal Borders & Gradients
            </div>
            <div className="text-xs text-stone-300">
              <span className="font-semibold text-amber-300">.royal-border:</span> 1px gold border with subtle inner/outer atmospheric shadow.
            </div>
            <div className="text-xs text-stone-300">
              <span className="font-semibold text-amber-300">.royal-border-glow:</span> Enhanced golden luminescence for primary edicts.
            </div>
            <div className="text-xs text-stone-300">
              <span className="font-semibold text-amber-300">.royal-gold-gradient:</span> 135° metallic reflection (#e6be6c → #c99738 → #8b6218).
            </div>
          </div>
        </div>
      </section>

      {/* 3. RoyalButton Component Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sliders className="w-5 h-5 text-[#c99738]" />
            <h2 className="text-xl sm:text-2xl font-royal-heading text-[#faf7f0]">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-[#070d18] border border-[#c99738]/20">
              {/* Variant selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#c99738] mb-1.5">
                  Variant
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['gold', 'maroon', 'outline', 'ghost', 'danger'] as RoyalButtonVariant[]).map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setBtnVariant(v)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border capitalize transition-all ${
                        btnVariant === v
                          ? 'border-[#c99738] bg-[#c99738]/20 text-[#e6be6c] font-semibold'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#c99738] mb-1.5">
                  Size
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['sm', 'md', 'lg'] as RoyalButtonSize[]).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setBtnSize(s)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border uppercase transition-all ${
                        btnSize === s
                          ? 'border-[#c99738] bg-[#c99738]/20 text-[#e6be6c] font-semibold'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Icon selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#c99738] mb-1.5">
                  Icon Slot
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['crown', 'shield', 'sparkles', 'none'] as const).map(ic => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setBtnIcon(ic)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border capitalize transition-all ${
                        btnIcon === ic
                          ? 'border-[#c99738] bg-[#c99738]/20 text-[#e6be6c] font-semibold'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#c99738] mb-1.5">
                  State Toggles
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={btnLoading}
                      onChange={e => setBtnLoading(e.target.checked)}
                      className="rounded accent-[#c99738]"
                    />
                    <span>Loading Spinner (isLoading)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={btnDisabled}
                      onChange={e => setBtnDisabled(e.target.checked)}
                      className="rounded accent-[#c99738]"
                    />
                    <span>Disabled State</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Live Interactive Preview */}
            <div className="p-8 rounded-2xl bg-[#0c0e16] border border-[#c99738]/30 flex flex-col items-center justify-center gap-4 text-center">
              <span className="text-[11px] uppercase tracking-widest text-stone-400">
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
            <div className="relative rounded-xl bg-[#070d18] border border-stone-800 p-4">
              <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                <span className="flex items-center gap-1.5 font-mono">
                  <Code2 className="w-3.5 h-3.5 text-[#c99738]" /> JSX Code Snippet
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(generatedButtonCode, 'btn')}
                  className="flex items-center gap-1 text-xs text-[#c99738] hover:text-[#e6be6c] transition-colors"
                >
                  {copiedSnippet === 'btn' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-[#fcedc7] overflow-x-auto whitespace-pre leading-relaxed">
                {generatedButtonCode}
              </pre>
            </div>

            {/* Fixed Matrix of Variants */}
            <div className="space-y-3 pt-4 border-t border-[#c99738]/20">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#c99738]">
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
                  Navy Outline
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
            <Layers className="w-5 h-5 text-[#c99738]" />
            <h2 className="text-xl sm:text-2xl font-royal-heading text-[#faf7f0]">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#070d18] border border-[#c99738]/20">
              {/* Variant */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#c99738] mb-1.5">
                  Surface Variant
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['default', 'glow', 'maroon', 'pattern', 'flat'] as RoyalCardVariant[]).map(cv => (
                    <button
                      key={cv}
                      type="button"
                      onClick={() => setCardVariant(cv)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border capitalize transition-all ${
                        cardVariant === cv
                          ? 'border-[#c99738] bg-[#c99738]/20 text-[#e6be6c] font-semibold'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {cv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ornaments */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#c99738] mb-1.5">
                  Ornaments
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cardOrnament}
                      onChange={e => setCardOrnament(e.target.checked)}
                      className="rounded accent-[#c99738]"
                    />
                    <span>Corner Brackets (ornament)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cardGoldText}
                      onChange={e => setCardGoldText(e.target.checked)}
                      className="rounded accent-[#c99738]"
                    />
                    <span>Gold Gradient Title (goldText)</span>
                  </label>
                </div>
              </div>

              {/* Subcomponent list */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#c99738] mb-1.5">
                  Subcomponents Included
                </label>
                <ul className="text-xs text-stone-400 space-y-1">
                  <li>• <code className="text-[#c99738]">RoyalCardHeader</code> (with optional bottom border)</li>
                  <li>• <code className="text-[#c99738]">RoyalCardTitle</code> (Cinzel font)</li>
                  <li>• <code className="text-[#c99738]">RoyalCardDescription</code> (Cormorant / Sans)</li>
                  <li>• <code className="text-[#c99738]">RoyalCardContent</code> &amp; <code className="text-[#c99738]">RoyalCardFooter</code></li>
                </ul>
              </div>
            </div>

            {/* Live Interactive Card Preview */}
            <div className="max-w-xl mx-auto w-full">
              <RoyalCard variant={cardVariant} ornament={cardOrnament}>
                <RoyalCardHeader border>
                  <div className="flex items-center justify-between">
                    <Badge variant="gold">Dynastic Folio</Badge>
                    <span className="text-[11px] text-stone-400">Regnal Year 1435 CE</span>
                  </div>
                  <RoyalCardTitle goldText={cardGoldText} className="mt-2">
                    Suryavamsha Archival Folio
                  </RoyalCardTitle>
                  <RoyalCardDescription>
                    Epigraphic copper plate documentation preserving royal grants and land endowments.
                  </RoyalCardDescription>
                </RoyalCardHeader>
                <RoyalCardContent className="space-y-3 pt-4 text-xs sm:text-sm text-stone-300">
                  <p>
                    Inscribed during the reign of Maharaja Sri Kapilendra Deva at Simhachalam temple,
                    recording the titles of Gajapathi, Gaudesvara, and Navakoti Karnata Kalavaragesvara.
                  </p>
                  <div className="p-3 rounded-xl bg-[#070d18]/60 border border-[#c99738]/20 text-xs text-stone-300">
                    <span className="text-[#c99738] font-semibold">Evidence Status:</span> Primary Epigraphic Inscription
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
            <div className="relative rounded-xl bg-[#070d18] border border-stone-800 p-4">
              <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                <span className="flex items-center gap-1.5 font-mono">
                  <Code2 className="w-3.5 h-3.5 text-[#c99738]" /> JSX Code Snippet
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(generatedCardCode, 'card')}
                  className="flex items-center gap-1 text-xs text-[#c99738] hover:text-[#e6be6c] transition-colors"
                >
                  {copiedSnippet === 'card' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-[#fcedc7] overflow-x-auto whitespace-pre leading-relaxed">
                {generatedCardCode}
              </pre>
            </div>
          </RoyalCardContent>
        </RoyalCard>

        {/* 3 Real-World Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Card 1: Default Navy */}
          <RoyalCard variant="default" ornament>
            <RoyalCardHeader border>
              <RoyalCardTitle goldText>Royal Navy Card</RoyalCardTitle>
              <RoyalCardDescription>
                Signature dark navy backdrop with fine 1px golden border.
              </RoyalCardDescription>
            </RoyalCardHeader>
            <RoyalCardContent className="pt-4 text-xs sm:text-sm text-stone-300 space-y-2">
              <p>
                Features glassmorphic backdrop filtering and geometric gold corner brackets. Used for
                standard archival records, member listings, and references.
              </p>
            </RoyalCardContent>
            <RoyalCardFooter>
              <span className="text-xs text-stone-400">Variant: default</span>
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
                Deep ambient gold aura for high-priority archival citations.
              </RoyalCardDescription>
            </RoyalCardHeader>
            <RoyalCardContent className="pt-4 text-xs sm:text-sm text-stone-300 space-y-2">
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

          {/* Card 3: Imperial Maroon */}
          <RoyalCard variant="maroon" ornament>
            <RoyalCardHeader border>
              <RoyalCardTitle goldText={false}>Imperial Maroon Card</RoyalCardTitle>
              <RoyalCardDescription>
                Rich imperial crimson gradient evoking sovereign royal seals.
              </RoyalCardDescription>
            </RoyalCardHeader>
            <RoyalCardContent className="pt-4 text-xs sm:text-sm text-stone-300 space-y-2">
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
            <Award className="w-5 h-5 text-[#c99738]" />
            <h2 className="text-xl sm:text-2xl font-royal-heading text-[#faf7f0]">
              4. Complete Portal Composition Exhibit
            </h2>
          </div>
          <Badge variant="verified">Design System Consistency</Badge>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
          Demonstrating how <code className="text-[#c99738]">RoyalButton</code> and{' '}
          <code className="text-[#c99738]">RoyalCard</code> combine seamlessly with form inputs,
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
              <div className="p-4 rounded-xl bg-[#070d18] border border-[#c99738]/20 font-royal-serif text-sm text-[#fcedc7] leading-relaxed">
                "Sri Suryavamsha Prathama Pratishthapaka Sri Kapilendra Deva Gajapathi Mahārājulankāru..."
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#0b1528] border border-stone-800">
                  <span className="text-stone-400 block text-[11px]">Repository</span>
                  <span className="text-[#faf7f0] font-medium">Archaeological Survey of India</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0b1528] border border-stone-800">
                  <span className="text-stone-400 block text-[11px]">Epigraphia Indica</span>
                  <span className="text-[#faf7f0] font-medium">Vol. XXXVI, pp. 206–214</span>
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
                <span className="text-[11px] text-stone-400">Editorial Review Required</span>
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
        <p className="text-xs text-stone-400">
          Suryavamsha Odiyaraju Kshatriya Design Tokens &copy; {new Date().getFullYear()}. Production
          components located under <code className="text-[#c99738]">src/components/ui/</code>.
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
