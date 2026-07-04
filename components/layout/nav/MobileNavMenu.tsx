"use client";

import { navMenu } from "@/lib/content/homepage";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MobileNavMenuProps {
  onNavigate: () => void;
}

export function MobileNavMenu({ onNavigate }: MobileNavMenuProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <nav className="flex flex-col gap-1">
      {navMenu.map((item) => {
        if (item.type === "link") {
          return (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-lg px-2 py-3 text-[15px] font-medium text-ink-mid transition-colors hover:bg-surface-2 hover:text-primary"
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          );
        }

        const isExpanded = expandedId === item.id;

        return (
          <div key={item.id} className="border-b border-rule/60 last:border-b-0">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-left text-[15px] font-medium text-ink-mid transition-colors hover:text-primary"
              aria-expanded={isExpanded}
              onClick={() => toggle(item.id)}
            >
              {item.label}
              <ChevronDown
                size={16}
                className={`shrink-0 transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>

            {isExpanded && item.type === "mega" && (
              <div className="space-y-1 pb-4 pl-2">
                {item.items.map((sub) => (
                  <Link
                    key={sub.title}
                    href={sub.href}
                    className="group block px-3 py-2"
                    onClick={onNavigate}
                  >
                    <p className="text-sm font-medium text-ink transition-colors group-hover:text-primary">
                      {sub.title}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-faint transition-colors group-hover:text-ink-mid">
                      {sub.description}
                    </p>
                  </Link>
                ))}
                {"footer" in item && item.footer ? (
                  <div className="mt-3 border-t border-rule/60 px-3 pt-3">
                    <p className="text-xs text-ink-faint">{item.footer.note}</p>
                    <Link
                      href={item.footer.link.href}
                      className="mt-1 inline-block text-xs font-medium text-primary"
                      onClick={onNavigate}
                    >
                      {item.footer.link.label}
                    </Link>
                  </div>
                ) : null}
              </div>
            )}

            {isExpanded && item.type === "grouped" && (
              <div className="space-y-4 pb-4 pl-2">
                {item.groups.map((group) => (
                  <div key={group.label}>
                    <p className="px-3 text-xs font-medium tracking-wide text-primary uppercase">
                      {group.label}
                    </p>
                    <div className="mt-2 space-y-0.5">
                      {group.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-3 py-2 text-sm text-ink-mid transition-colors hover:text-primary"
                          onClick={onNavigate}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
