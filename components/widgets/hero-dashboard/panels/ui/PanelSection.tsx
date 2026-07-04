import type { ReactNode } from "react";

interface PanelSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function PanelSection({ title, children, className = "" }: PanelSectionProps) {
  return (
    <div className={`px-3 py-2.5 lg:px-4 lg:py-3 ${className}`}>
      {title && (
        <p className="mb-2 text-[10px] font-medium tracking-wide text-ink-faint uppercase lg:text-xs">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}
