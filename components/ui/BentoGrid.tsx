import { type ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div
      className={`grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5 lg:grid-cols-12 lg:gap-6 ${className}`}
    >
      {children}
    </div>
  );
}

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  rowSpan?: 1 | 2 | 3;
}

const colSpanClasses: Record<number, string> = {
  1: "md:col-span-1 lg:col-span-1",
  2: "md:col-span-2 lg:col-span-2",
  3: "md:col-span-3 lg:col-span-3",
  4: "md:col-span-3 lg:col-span-4",
  5: "md:col-span-4 lg:col-span-5",
  6: "md:col-span-6 lg:col-span-6",
  7: "md:col-span-6 lg:col-span-7",
  8: "md:col-span-6 lg:col-span-8",
  9: "md:col-span-6 lg:col-span-9",
  10: "md:col-span-6 lg:col-span-10",
  11: "md:col-span-6 lg:col-span-11",
  12: "md:col-span-6 lg:col-span-12",
};

const rowSpanClasses: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
};

export function BentoTile({
  children,
  className = "",
  colSpan = 6,
  rowSpan = 1,
}: BentoTileProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl ${colSpanClasses[colSpan]} ${rowSpanClasses[rowSpan]} ${className}`}
    >
      {children}
    </div>
  );
}
