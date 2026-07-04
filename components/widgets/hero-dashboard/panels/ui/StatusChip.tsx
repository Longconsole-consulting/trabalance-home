import type { StatusChipVariant } from "@/lib/content/homepage";

const labels: Record<StatusChipVariant, string> = {
  paid: "Paid",
  current: "Current",
  scheduled: "Scheduled",
  onTrack: "On track",
  sent: "Sent",
  ready: "Ready",
};

const styles: Record<StatusChipVariant, string> = {
  paid: "bg-emerald/10 text-emerald",
  current: "bg-primary-soft text-primary",
  scheduled: "bg-primary-soft text-primary",
  onTrack: "bg-emerald/10 text-emerald",
  sent: "bg-surface-3 text-ink-mid",
  ready: "bg-emerald/10 text-emerald",
};

export function StatusChip({ variant }: { variant: StatusChipVariant }) {
  return (
    <span
      className={`inline-block shrink-0 px-1.5 py-0.5 text-[9px] font-medium lg:text-[10px] ${styles[variant]}`}
    >
      {labels[variant]}
    </span>
  );
}
