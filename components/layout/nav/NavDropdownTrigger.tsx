"use client";

import { type NavMenuId } from "@/lib/content/homepage";
import { ChevronDown } from "lucide-react";
import { type MotionValue } from "framer-motion";
import { motion } from "framer-motion";

interface NavDropdownTriggerProps {
  id: NavMenuId;
  label: string;
  isOpen: boolean;
  linkColor: MotionValue<string>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  registerRef: (node: HTMLButtonElement | null) => void;
}

export function NavDropdownTrigger({
  id,
  label,
  isOpen,
  linkColor,
  onMouseEnter,
  onMouseLeave,
  onClick,
  registerRef,
}: NavDropdownTriggerProps) {
  return (
    <motion.button
      ref={registerRef}
      type="button"
      id={`nav-trigger-${id}`}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-controls={`nav-panel-${id}`}
      style={{ color: linkColor }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`group relative flex items-center gap-1 py-1 text-[15px] transition-colors ${
        isOpen ? "text-primary" : "hover:text-primary"
      }`}
    >
      {label}
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex"
      >
        <ChevronDown size={14} strokeWidth={2} aria-hidden />
      </motion.span>
      <span
        className={`absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-primary transition-all duration-200 ${
          isOpen ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
        }`}
        aria-hidden
      />
    </motion.button>
  );
}
