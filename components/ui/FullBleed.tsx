import { type ReactNode } from "react";

interface FullBleedProps {
  children: ReactNode;
  className?: string;
}

export function FullBleed({ children, className = "" }: FullBleedProps) {
  return (
    <div className={`w-full px-4 md:px-6 lg:px-10 ${className}`}>{children}</div>
  );
}

interface ContentRailProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export function ContentRail({
  children,
  className = "",
  narrow = false,
}: ContentRailProps) {
  return (
    <div
      className={`${narrow ? "max-w-2xl" : "max-w-3xl"} ${className}`}
    >
      {children}
    </div>
  );
}
