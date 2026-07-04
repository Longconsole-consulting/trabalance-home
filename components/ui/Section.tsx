import { type ReactNode } from "react";

type SectionBackground =
  | "surface"
  | "surface-2"
  | "surface-3"
  | "cream"
  | "primary-soft"
  | "hero"
  | "transparent";

interface SectionProps {
  id?: string;
  background?: SectionBackground;
  className?: string;
  mesh?: boolean;
  fullBleed?: boolean;
  children: ReactNode;
}

const backgrounds: Record<SectionBackground, string> = {
  surface: "bg-surface",
  "surface-2": "bg-surface-2",
  "surface-3": "bg-surface-3",
  cream: "bg-soft-section",
  "primary-soft": "bg-primary-soft",
  hero: "bg-hero-gradient text-white",
  transparent: "",
};

export function Section({
  id,
  background = "surface",
  className = "",
  mesh = false,
  fullBleed = false,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-32 md:py-44 lg:py-52 ${backgrounds[background]} ${className}`}
    >
      {mesh && background !== "hero" && (
        <div className="pointer-events-none absolute inset-0 bg-mesh-primary" aria-hidden />
      )}
      {mesh && background === "hero" && (
        <div className="pointer-events-none absolute inset-0 bg-mesh-hero" aria-hidden />
      )}
      <div className={`relative ${fullBleed ? "w-full" : ""}`}>{children}</div>
    </section>
  );
}
