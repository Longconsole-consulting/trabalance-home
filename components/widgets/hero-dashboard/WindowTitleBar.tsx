interface WindowTitleBarProps {
  title: string;
}

export function WindowTitleBar({ title }: WindowTitleBarProps) {
  return (
    <div
      className="flex shrink-0 items-center border-b border-rule bg-surface-2 px-3 py-2.5 lg:px-4 lg:py-3"
      aria-hidden
    >
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-coral/80 lg:h-3 lg:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/80 lg:h-3 lg:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald/80 lg:h-3 lg:w-3" />
      </div>
      <p className="flex-1 text-center text-[11px] font-medium tracking-wide text-ink-faint lg:text-xs">
        {title}
      </p>
      <div className="w-[52px] shrink-0 lg:w-[60px]" aria-hidden />
    </div>
  );
}
