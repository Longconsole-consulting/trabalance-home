"use client";

import { Magnetic } from "@/components/interaction/Magnetic";
import { MobileNavMenu } from "@/components/layout/nav/MobileNavMenu";
import { NavSlidePairPanel } from "@/components/layout/nav/NavSlidePairPanel";
import { NavDropdownTrigger } from "@/components/layout/nav/NavDropdownTrigger";
import { NavProductPanel } from "@/components/layout/nav/NavProductPanel";
import { useNavDropdown } from "@/components/layout/nav/useNavDropdown";
import { Button } from "@/components/ui/Button";
import { TrabalanceMark } from "@/components/ui/TrabalanceMark";
import { headerCta, navMenu, signInLink } from "@/lib/content/homepage";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const SCROLL_RANGE = 180;

export function Header() {
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdown = useNavDropdown();

  const bgOpacity = useTransform(scrollY, [0, SCROLL_RANGE], [0, 0.92]);
  const borderOpacity = useTransform(scrollY, [0, SCROLL_RANGE], [0, 1]);
  const shadowOpacity = useTransform(scrollY, [0, SCROLL_RANGE], [0, 0.06]);
  const logoColor = useTransform(scrollY, [0, SCROLL_RANGE], ["#0a0e27", "#0a0e27"]);
  const linkColor = useTransform(scrollY, [0, SCROLL_RANGE], ["#475569", "#475569"]);
  const iconColor = useTransform(scrollY, [0, SCROLL_RANGE], ["#0a0e27", "#0a0e27"]);

  const backgroundColor = useMotionTemplate`rgba(255, 255, 255, ${bgOpacity})`;
  const borderColor = useMotionTemplate`rgba(232, 227, 215, ${borderOpacity})`;
  const boxShadow = useMotionTemplate`0 1px 3px rgba(10, 14, 39, ${shadowOpacity})`;

  const handlePanelEnter = () => {
    dropdown.cancelClose();
    if (dropdown.openId) dropdown.open(dropdown.openId);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    dropdown.close();
  };

  return (
    <>
      <motion.header
        className="top-[var(--site-banner-height,0px)] fixed right-0 left-0 z-50 backdrop-blur-[2px]"
        style={{
          backgroundColor,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: borderColor,
          boxShadow,
        }}
      >
        <div className="flex h-14 w-full items-center justify-between px-4 md:px-6 lg:px-10">
          <motion.div style={{ color: logoColor }}>
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight"
            >
              <TrabalanceMark />
              Trabalance
            </Link>
          </motion.div>

          <nav className="hidden items-center gap-10 md:flex">
            {navMenu.map((item) => {
              if (item.type === "link") {
                return (
                  <motion.div key={item.id} style={{ color: linkColor }}>
                    <Link
                      href={item.href}
                      className="text-[15px] transition-colors hover:text-primary"
                      onClick={dropdown.close}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={item.id}
                  style={{ color: linkColor }}
                  onMouseEnter={() => {
                    dropdown.cancelClose();
                    dropdown.scheduleOpen(item.id);
                  }}
                  onMouseLeave={dropdown.scheduleClose}
                >
                  <NavDropdownTrigger
                    id={item.id}
                    label={item.label}
                    isOpen={dropdown.isOpen(item.id)}
                    linkColor={linkColor}
                    onMouseEnter={() => {
                      dropdown.cancelClose();
                      dropdown.scheduleOpen(item.id);
                    }}
                    onMouseLeave={dropdown.scheduleClose}
                    onClick={() => dropdown.toggle(item.id)}
                    registerRef={(node) => dropdown.registerTrigger(item.id, node)}
                  />
                </motion.div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              href={signInLink.href}
              size="md"
              variant="outline-light"
            >
              {signInLink.label}
            </Button>
            <Magnetic>
              <Button href={headerCta.href} size="md">
                {headerCta.label}
              </Button>
            </Magnetic>
          </div>

          <motion.button
            type="button"
            className="md:hidden"
            style={{ color: iconColor }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-rule bg-surface md:hidden"
          >
            <div className="px-4 py-5 md:px-6">
              <MobileNavMenu onNavigate={closeMobile} />
              <div className="mt-6 flex flex-col gap-3">
                <Button
                  href={signInLink.href}
                  size="md"
                  variant="outline-light"
                  className="w-full text-center"
                  onClick={closeMobile}
                >
                  {signInLink.label}
                </Button>
                <Button
                  href={headerCta.href}
                  size="md"
                  className="w-full text-center"
                  onClick={closeMobile}
                >
                  {headerCta.label}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      <NavProductPanel
        isOpen={dropdown.isOpen("product")}
        onClose={dropdown.close}
        onMouseEnter={handlePanelEnter}
        onMouseLeave={dropdown.scheduleClose}
      />
      <NavSlidePairPanel
        openId={dropdown.openId}
        slideDirection={dropdown.slideDirection}
        onClose={dropdown.close}
        onMouseEnter={handlePanelEnter}
        onMouseLeave={dropdown.scheduleClose}
      />
    </>
  );
}
