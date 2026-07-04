"use client";

import { MediaSlot } from "@/components/ui/MediaSlot";
import { howItWorks } from "@/lib/content/homepage";
import { AnimatePresence, motion } from "framer-motion";

interface StepScrubberWidgetProps {
  activeStep: number;
  onStepClick: (index: number) => void;
  className?: string;
}

export function StepScrubberWidget({
  activeStep,
  onStepClick,
  className = "",
}: StepScrubberWidgetProps) {
  const currentStep = howItWorks.steps[activeStep];

  return (
    <div className={`grid items-start gap-12 lg:grid-cols-2 lg:gap-16 ${className}`}>
      <div className="space-y-4">
        {howItWorks.steps.map((step, index) => (
          <button
            key={step.number}
            type="button"
            onClick={() => onStepClick(index)}
            className={`w-full rounded-xl p-6 text-left transition-all duration-300 ${
              activeStep === index
                ? "bg-surface shadow-soft"
                : "bg-transparent opacity-50 hover:opacity-75"
            }`}
          >
            <span className="text-sm font-medium text-primary">{step.number}</span>
            <h3 className="mt-2 font-display text-xl font-medium text-ink">
              {step.title}
            </h3>
            <p
              className={`mt-2 text-[15px] text-ink-faint ${
                activeStep === index ? "block" : "hidden lg:block"
              }`}
            >
              {step.description}
            </p>
          </button>
        ))}

      </div>

      <div className="relative lg:sticky lg:top-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.number}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <MediaSlot
              src={currentStep.video.src}
              poster={currentStep.video.poster}
              label={currentStep.video.label}
              aspectRatio="wide"
              interactive
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
