interface TrabalanceMarkProps {
  size?: number;
  className?: string;
}

export function TrabalanceMark({ size = 28, className = "" }: TrabalanceMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      role="img"
      aria-label="Trabalance"
      className={`shrink-0 ${className}`}
    >
      <rect width="1024" height="1024" rx="224" ry="224" fill="#4169E1" />
      <text
        x="512"
        y="556"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="470"
        fontWeight="700"
        fill="#FFFFFF"
        textAnchor="middle"
        dominantBaseline="central"
        letterSpacing="-12"
      >
        TB
      </text>
    </svg>
  );
}
