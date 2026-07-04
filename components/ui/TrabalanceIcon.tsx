import Image from "next/image";

interface TrabalanceIconProps {
  size?: number;
  className?: string;
}

export function TrabalanceIcon({ size = 28, className = "" }: TrabalanceIconProps) {
  return (
    <Image
      src="/images/favicon.png"
      alt=""
      width={size}
      height={size}
      className={`shrink-0 object-cover ${className}`}
      aria-hidden
    />
  );
}
