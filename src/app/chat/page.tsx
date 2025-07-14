"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: "Hello, how may I help you"
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setError(null);
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      if (!res.ok) throw new Error("Failed to fetch AI response");
      const data = await res.json();
      const assistantMessage: Message = { role: "assistant", content: data.reply || "(No response)" };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-2">
      <div className="w-full max-w-xl flex flex-col rounded-2xl shadow-2xl bg-white overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 text-xl font-semibold">
          Tradiemate AI Chat
        </div>
        {/* Chat History */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          style={{ minHeight: "60vh", maxHeight: "60vh" }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs sm:max-w-md break-words shadow text-base sm:text-lg ${
                  msg.role === "user"
                    ? "bg-gray-200 text-gray-900 rounded-br-none"
                    : "bg-blue-500 text-white rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-4 py-2 max-w-xs sm:max-w-md bg-white text-gray-400 border border-gray-200 animate-pulse">
                typing…
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 text-sm text-center">{error}</div>
        )}
        {/* Input Area */}
        <div className="p-4 bg-gray-100 flex gap-2 border-t items-center sticky bottom-0">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-base sm:text-lg"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={loading}
            aria-label="Type your message"
            ref={inputRef}
          />
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50 text-base sm:text-lg flex items-center gap-2"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <FaPaperPlane className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
