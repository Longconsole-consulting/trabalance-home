"use client";

import { navMenu } from "@/lib/content/homepage";
import {
  NavMegaPanel,
  navStaggerContainer,
  navStaggerItem,
} from "@/components/layout/nav/NavMegaPanel";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const productMenu = navMenu.find((item) => item.id === "product");

interface NavProductPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function NavProductPanel({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: NavProductPanelProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!productMenu || productMenu.type !== "mega" || !("footer" in productMenu)) {
    return null;
  }

  return (
    <NavMegaPanel
      id="product"
      isOpen={isOpen}
      onClose={onClose}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        role="none"
        initial={prefersReducedMotion ? false : "hidden"}
        animate={isOpen && !prefersReducedMotion ? "visible" : false}
        variants={navStaggerContainer}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {productMenu.items.map((item) => (
          <motion.div key={item.title} variants={prefersReducedMotion ? undefined : navStaggerItem}>
            <Link
              href={item.href}
              role="menuitem"
              onClick={onClose}
              className="group block py-2"
            >
              <p className="font-medium text-ink transition-colors group-hover:text-primary">
                {item.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-faint transition-colors group-hover:text-ink-mid">
                {item.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        animate={isOpen ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 0.25, delay: prefersReducedMotion ? 0 : 0.2 }}
        className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-rule/60 pt-6"
      >
        <p className="text-sm text-ink-mid">{productMenu.footer.note}</p>
        <Link
          href={productMenu.footer.link.href}
          role="menuitem"
          onClick={onClose}
          className="text-sm font-medium text-primary transition-colors hover:text-primary-deep"
        >
          {productMenu.footer.link.label} →
        </Link>
      </motion.div>
    </NavMegaPanel>
  );
}
