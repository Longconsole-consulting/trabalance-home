import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonShape = "pill" | "rounded";
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "outline-light"
  | "ghost";

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-2.5 text-[15px]",
  lg: "px-8 py-3.5 text-base",
};

const shapes: Record<ButtonShape, string> = {
  pill: "rounded-full",
  rounded: "rounded-xl",
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-deep shadow-soft",
  secondary:
    "border border-white/20 bg-white/10 text-white hover:bg-white/15",
  outline:
    "border border-white/30 bg-transparent text-white hover:bg-white/10",
  "outline-light":
    "border border-primary/30 bg-transparent text-primary hover:bg-primary-soft",
  ghost: "text-ink-mid hover:text-ink underline-offset-4 hover:underline",
};

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  className?: string;
};

function buttonClasses({
  variant = "primary",
  size = "md",
  shape = "pill",
  className = "",
}: StyleProps) {
  const base =
    "inline-flex items-center justify-center gap-1.5 font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2";

  return `${base} ${shapes[shape]} ${sizes[size]} ${variants[variant]} ${className}`;
}

type BaseProps = StyleProps & {
  showChevron?: boolean;
  children: ReactNode;
};

type LinkButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof BaseProps> & {
    as?: "link";
    href: string;
  };

type NativeButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & {
    as: "button";
    href?: never;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    shape = "pill",
    showChevron = false,
    className = "",
    children,
    ...rest
  } = props;

  const classes = buttonClasses({ variant, size, shape, className });
  const content = (
    <>
      {children}
      {showChevron ? <ChevronRight size={16} aria-hidden /> : null}
    </>
  );

  if (props.as === "button") {
    const {
      as: _as,
      type = "button",
      ...buttonProps
    } = props;
    return (
      <button type={type} className={classes} {...buttonProps}>
        {content}
      </button>
    );
  }

  const { href, ...linkProps } = rest as LinkButtonProps;
  return (
    <Link href={href} className={classes} {...linkProps}>
      {content}
    </Link>
  );
}
