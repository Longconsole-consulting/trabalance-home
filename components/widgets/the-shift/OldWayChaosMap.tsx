"use client";

import { theShift } from "@/lib/content/homepage";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";

const panelEase = [0.16, 1, 0.3, 1] as const;

type Node = (typeof theShift.oldWayVisual.nodes)[number];

function nodeCenter(node: Node) {
  const wPct = (node.w / 400) * 100 * 0.35;
  const hPct = (node.h / 300) * 100 * 0.35;
  return {
    x: node.x + wPct / 2,
    y: node.y + hPct / 2,
  };
}

function buildCurvePath(from: Node, to: Node) {
  const a = nodeCenter(from);
  const b = nodeCenter(to);
  const cx1 = a.x + (b.x - a.x) * 0.45;
  const cy1 = a.y - 8;
  const cx2 = a.x + (b.x - a.x) * 0.55;
  const cy2 = b.y + 8;
  return `M ${a.x} ${a.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${b.x} ${b.y}`;
}

interface OldWayChaosMapProps {
  animate?: boolean;
}

export function OldWayChaosMap({ animate = true }: OldWayChaosMapProps) {
  const { nodes, connections } = theShift.oldWayVisual;

  const nodeMap = useMemo(
    () => Object.fromEntries(nodes.map((n) => [n.id, n])),
    [nodes]
  );

  const paths = useMemo(
    () =>
      connections
        .map(({ from, to }) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          if (!a || !b) return null;
          return { id: `${from}-${to}`, d: buildCurvePath(a, b) };
        })
        .filter(Boolean) as { id: string; d: string }[],
    [connections, nodeMap]
  );

  return (
    <div className="relative h-full min-h-[360px] w-full">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {paths.map((path, index) => (
          <motion.path
            key={path.id}
            d={path.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            strokeDasharray="1.5 1.2"
            className="text-primary/35"
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 0.55,
              delay: animate ? 0.08 + index * 0.04 : 0,
              ease: panelEase,
            }}
          />
        ))}
      </svg>

      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.w,
            height: node.h,
          }}
          initial={animate ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: animate ? 0.12 + index * 0.04 : 0,
            ease: panelEase,
          }}
        >
          {node.type === "image" ? (
            <div className="relative h-full w-full overflow-hidden rounded-lg border border-rule bg-surface shadow-soft">
              <Image
                src={node.src}
                alt={node.alt ?? ""}
                fill
                className="object-cover"
                sizes={`${node.w}px`}
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-xl border border-rule bg-surface px-3 py-2 shadow-soft transition-all hover:border-primary/30 hover:grayscale-0 grayscale-[0.25]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={node.src}
                alt={node.alt ?? ""}
                className="max-h-[82%] max-w-[92%] object-contain"
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
