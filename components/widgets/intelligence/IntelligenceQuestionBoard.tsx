"use client";

import { useCursor } from "@/components/interaction/CursorProvider";
import { UserMessageBubble } from "@/components/widgets/intelligence/UserMessageBubble";
import { intelligence } from "@/lib/content/homepage";
import { motion, useReducedMotion } from "framer-motion";
import { type CSSProperties, useMemo } from "react";

interface MoodBoardPlacement {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: number;
}

const MOOD_BOARD_PLACEMENTS: MoodBoardPlacement[] = [
  { top: "4%", left: "0", delay: 0 },
  { top: "2%", right: "0", delay: 0.1 },
  { top: "38%", left: "0", delay: 0.2 },
  { top: "34%", right: "0", delay: 0.3 },
  { bottom: "12%", left: "2%", delay: 0.4 },
  { bottom: "8%", right: "2%", delay: 0.5 },
];

interface IntelligenceQuestionBoardProps {
  visible: boolean;
  onSelect: (question: string) => void;
}

function useMoodBoardQuestions() {
  return useMemo(() => {
    const introQuestion =
      intelligence.examples[intelligence.chat.introExampleIndex]?.question ??
      intelligence.examples[0]?.question;

    return intelligence.moodBoardQuestions.filter(
      (question) => question !== introQuestion,
    );
  }, []);
}

function QuestionBubble({
  question,
  delay,
  visible,
  onSelect,
  floating = true,
  className = "",
  style,
}: {
  question: string;
  delay: number;
  visible: boolean;
  onSelect: (question: string) => void;
  floating?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { setHoverVariant, enabled } = useCursor();

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(question)}
      onMouseEnter={() => enabled && setHoverVariant("ask")}
      onMouseLeave={() => setHoverVariant(null)}
      className={`group z-10 w-fit max-w-[210px] cursor-pointer border-0 bg-transparent p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
        floating ? "absolute hidden lg:block" : "relative"
      } ${className}`}
      style={style}
      initial={
        prefersReducedMotion
          ? { opacity: visible ? 1 : 0 }
          : { opacity: 0, scale: 0.6, y: 24 }
      }
      animate={
        visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 24 }
      }
      transition={{
        delay: visible ? delay : 0,
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Ask: ${question}`}
    >
      <UserMessageBubble size="large" className="group-hover:drop-shadow-[0_8px_24px_rgb(10_14_39_/_0.18)]">
        {question}
      </UserMessageBubble>
    </motion.button>
  );
}

export function IntelligenceQuestionBoard({
  visible,
  onSelect,
}: IntelligenceQuestionBoardProps) {
  const questions = useMoodBoardQuestions();

  return (
    <>
      {questions.map((question, index) => {
        const placement = MOOD_BOARD_PLACEMENTS[index];
        if (!placement) return null;

        return (
          <QuestionBubble
            key={question}
            question={question}
            delay={placement.delay}
            visible={visible}
            onSelect={onSelect}
            style={{
              top: placement.top,
              bottom: placement.bottom,
              left: placement.left,
              right: placement.right,
            }}
          />
        );
      })}
    </>
  );
}

export function IntelligenceQuestionBoardMobile({
  visible,
  onSelect,
}: IntelligenceQuestionBoardProps) {
  const questions = useMoodBoardQuestions();

  return (
    <div className="mt-8 flex flex-col items-center gap-4 px-4 sm:hidden">
      {questions.slice(0, 4).map((question, index) => (
        <QuestionBubble
          key={`mobile-${question}`}
          question={question}
          delay={index * 0.08}
          visible={visible}
          onSelect={onSelect}
          floating={false}
          className="max-w-[88%]"
        />
      ))}
    </div>
  );
}
