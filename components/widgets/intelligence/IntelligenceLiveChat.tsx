"use client";

import { ChatBubble } from "@/components/widgets/intelligence/ChatBubble";
import { IntelligenceChatFrame } from "@/components/widgets/intelligence/IntelligenceChatFrame";
import { intelligence } from "@/lib/content/homepage";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

export interface IntelligenceLiveChatHandle {
  sendMessage: (text: string) => void;
}

interface IntelligenceLiveChatProps {
  onIntroComplete?: () => void;
}

function findResponse(input: string) {
  const normalized = input.trim().toLowerCase();

  const example = intelligence.examples.find(
    (item) =>
      item.question.toLowerCase() === normalized ||
      normalized.includes(item.question.toLowerCase().slice(0, 12)),
  );

  if (example) {
    return example.response ?? `${example.answer} ${example.action}`;
  }

  const capability = intelligence.capabilities.find(
    (item) => item.question.toLowerCase() === normalized,
  );

  if (capability) {
    return capability.response;
  }

  return intelligence.chat.fallbackResponse;
}

export const IntelligenceLiveChat = forwardRef<
  IntelligenceLiveChatHandle,
  IntelligenceLiveChatProps
>(function IntelligenceLiveChat({ onIntroComplete }, ref) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(introRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const introMessages = useMemo(() => {
    const example =
      intelligence.examples[intelligence.chat.introExampleIndex] ??
      intelligence.examples[0];

    return [
      { role: "user" as const, text: example.question },
      {
        role: "assistant" as const,
        text: example.response ?? `${example.answer} ${example.action}`,
      },
    ];
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [introCount, setIntroCount] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const totalIntroMessages = introMessages.length;

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setMessages(
        introMessages.map((message, index) => ({
          id: `intro-${index}`,
          role: message.role,
          text: message.text,
        })),
      );
      setIntroCount(totalIntroMessages);
      setIntroComplete(true);
      onIntroComplete?.();
      return;
    }

    setMessages([]);
    setIntroCount(0);
    setIntroComplete(false);

    let current = 0;
    const interval = window.setInterval(() => {
      current += 1;
      const message = introMessages[current - 1];
      if (message) {
        setMessages((existing) => [
          ...existing,
          {
            id: `intro-${current - 1}`,
            role: message.role,
            text: message.text,
          },
        ]);
      }
      setIntroCount(current);

      if (current >= totalIntroMessages) {
        window.clearInterval(interval);
        setIntroComplete(true);
        onIntroComplete?.();
      }
    }, 420);

    return () => window.clearInterval(interval);
  }, [
    isInView,
    introMessages,
    onIntroComplete,
    prefersReducedMotion,
    totalIntroMessages,
  ]);

  const scrollToBottom = useCallback(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, introCount, scrollToBottom]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping || !introComplete) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        text: trimmed,
      };

      setMessages((current) => [...current, userMessage]);
      setDraft("");
      setIsTyping(true);

      window.setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: findResponse(trimmed),
        };
        setMessages((current) => [...current, assistantMessage]);
        setIsTyping(false);
      }, intelligence.chat.responseDelayMs);
    },
    [introComplete, isTyping],
  );

  useImperativeHandle(ref, () => ({ sendMessage }), [sendMessage]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage(draft);
  };

  const showIntroTyping =
    !introComplete && introCount % 2 === 1 && introCount < totalIntroMessages;

  const footer = introComplete ? (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 rounded-2xl border border-rule bg-surface-2 px-3 py-2">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask about stock, margins, or costs…"
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-fainter"
          aria-label="Ask Trabalance Intelligence"
        />
        <button
          type="submit"
          disabled={!draft.trim() || isTyping}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Send message"
        >
          <Send size={16} strokeWidth={2} />
        </button>
      </div>
    </form>
  ) : undefined;

  return (
    <IntelligenceChatFrame footer={footer}>
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5"
      >
        <div ref={introRef} className="flex flex-col gap-4">
          {messages.map((message, index) => {
            const isIntroMessage = message.id.startsWith("intro-");

            if (isIntroMessage) {
              return (
                <ChatBubble key={message.id} role={message.role} delay={0}>
                  {message.text}
                </ChatBubble>
              );
            }

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <ChatBubble role={message.role} animate={false}>
                  {message.text}
                </ChatBubble>
              </motion.div>
            );
          })}
        </div>

        {showIntroTyping || isTyping ? (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-rule bg-surface px-4 py-3 shadow-soft">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="h-1.5 w-1.5 rounded-full bg-ink-fainter"
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: dot * 0.15,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </IntelligenceChatFrame>
  );
});
