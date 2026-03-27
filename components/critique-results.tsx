import type { Critique } from '@/lib/schema';

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,22,37,0.96),rgba(11,15,28,0.96))] shadow-[0_10px_40px_rgba(0,0,0,0.22)]',
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  title,
  icon,
  iconTone = 'neutral',
}: {
  title: string;
  icon: React.ReactNode;
  iconTone?: 'green' | 'red' | 'neutral';
}) {
  const toneClass =
    iconTone === 'green'
      ? 'bg-[#0d2b24] text-[#29f0ba]'
      : iconTone === 'red'
      ? 'bg-[#2a1318] text-[#ff5d6c]'
      : 'bg-white/8 text-white/75';

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full',
          toneClass
        )}
      >
        {icon}
      </div>
      <h3 className="text-[31px] font-semibold tracking-[-0.03em] text-white md:text-[28px]">
        {title}
      </h3>
    </div>
  );
}

function BulletList({
  items,
  bulletColor,
}: {
  items: string[];
  bulletColor: string;
}) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-start gap-3">
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: bulletColor }}
          />
          <span className="text-[15px] leading-8 text-white/65 md:text-[16px]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function NumberList({ items }: { items: string[] }) {
  return (
    <ol className="mt-7 space-y-5">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-start gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0d2b24] text-sm font-semibold text-[#29f0ba]">
            {index + 1}
          </div>
          <span className="pt-0.5 text-[15px] leading-8 text-white/68 md:text-[16px]">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

function ScoreRing({ score }: { score: number }) {
  const clamped = Math.max(1, Math.min(10, score));
  const percent = (clamped / 10) * 100;
  const degrees = `${percent}%`;

  return (
    <div className="flex items-center justify-center">
      <div
        className="relative flex h-28 w-28 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(#29f0ba ${degrees}, rgba(255,255,255,0.08) 0)`,
        }}
      >
        <div className="absolute inset-[6px] rounded-full bg-[#0e1322]" />
        <div className="relative z-10 text-center">
          <div className="text-[22px] font-semibold text-[#29f0ba]">
            {clamped}
          </div>
          <div className="text-sm text-white/45">/10</div>
        </div>
      </div>
    </div>
  );
}

function SummaryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="M5 7h14" />
      <path d="M5 17h9" />
    </svg>
  );
}

function ThumbsUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M7 10v10" />
      <path d="M14 4l-3 6v10h7.2a2 2 0 0 0 2-1.6l1-6A2 2 0 0 0 19.2 10H15V6a2 2 0 0 0-1-2Z" />
      <path d="M7 10H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3" />
    </svg>
  );
}

function ThumbsDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M7 14V4" />
      <path d="M14 20l-3-6V4h7.2a2 2 0 0 1 2 1.6l1 6a2 2 0 0 1-2 2.4H15v4a2 2 0 0 1-1 2Z" />
      <path d="M7 14H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3" />
    </svg>
  );
}

function ScreenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 17 10 10l4 4 7-7" />
      <path d="M14 7h7v7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M8.2 14a6 6 0 1 1 7.6 0c-.8.7-1.3 1.5-1.6 2.5h-4c-.3-1-.8-1.8-1.6-2.5Z" />
    </svg>
  );
}

export default function CritiqueResults({
  critique,
}: {
  critique: Critique;
}) {
  return (
    <div className="space-y-6">
      <Card className="p-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0d2b24] px-4 py-2 text-sm font-medium text-[#29f0ba]">
              <SummaryIcon />
              Summary
            </div>

            <p className="mt-6 text-[18px] leading-9 text-white/68">
              {critique.summary}
            </p>
          </div>

          <div className="shrink-0">
            <ScoreRing score={critique.score} />
          </div>
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="p-8">
          <SectionHeader
            title="Strengths"
            icon={<ThumbsUpIcon />}
            iconTone="green"
          />
          <BulletList items={critique.strengths} bulletColor="#29f0ba" />
        </Card>

        <Card className="p-8">
          <SectionHeader
            title="Weaknesses"
            icon={<ThumbsDownIcon />}
            iconTone="red"
          />
          <BulletList items={critique.weaknesses} bulletColor="#ff5d6c" />
        </Card>

        <Card className="p-8">
          <SectionHeader title="UX" icon={<ScreenIcon />} />
          <BulletList items={critique.ux} bulletColor="#9aa3b2" />
        </Card>

        <Card className="p-8">
          <SectionHeader title="SEO" icon={<SearchIcon />} />
          <BulletList items={critique.seo} bulletColor="#9aa3b2" />
        </Card>

        <Card className="p-8">
          <SectionHeader title="Conversion" icon={<TrendIcon />} />
          <BulletList items={critique.conversion} bulletColor="#9aa3b2" />
        </Card>

        <Card className="p-8">
          <SectionHeader title="Trust Signals" icon={<ShieldIcon />} />
          <BulletList items={critique.trustSignals} bulletColor="#9aa3b2" />
        </Card>
      </div>

      <Card className="p-8">
        <SectionHeader
          title="Recommended Changes"
          icon={<BulbIcon />}
          iconTone="green"
        />
        <NumberList items={critique.recommendedChanges} />
      </Card>
    </div>
  );
}