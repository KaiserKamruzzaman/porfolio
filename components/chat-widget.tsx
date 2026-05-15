"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What are your main skills?",
  "Tell me about your projects",
  "What's your work experience?",
  "How can I contact you?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Kaiser's AI assistant. Ask me anything about his skills, experience, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    setShowSuggestions(false);
    const userMessage: Message = { role: "user", content: text };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMessage]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            ...copy[copy.length - 1],
            content: copy[copy.length - 1].content + chunk,
          };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {isOpen && (
        <div className="w-[360px] h-[520px] rounded-2xl border border-border bg-card shadow-2xl shadow-black/40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Bot size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Kaiser's Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-foreground/50 hover:text-foreground"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                    msg.role === "assistant"
                      ? "bg-primary/20 border border-primary/30"
                      : "bg-secondary/20 border border-secondary/30"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot size={12} className="text-primary" />
                  ) : (
                    <User size={12} className="text-secondary" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-muted text-foreground rounded-tl-none"
                      : "bg-primary text-primary-foreground rounded-tr-none"
                  }`}
                >
                  {msg.content || (
                    <span className="inline-flex gap-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Suggestions */}
            {showSuggestions && (
              <div className="space-y-2 pt-1">
                <p className="text-xs text-foreground/40 text-center">
                  Suggested questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-border bg-muted/30">
            <div className="flex items-center gap-2 bg-background rounded-xl border border-border px-3 py-2 focus-within:border-primary/50 transition-colors">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground/40 outline-none disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center disabled:opacity-40 hover:bg-primary/80 transition-colors flex-shrink-0"
              >
                <Send size={13} className="text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X size={22} className="text-primary-foreground" />
        ) : (
          <MessageCircle size={22} className="text-primary-foreground" />
        )}
      </button>
    </div>
  );
}
