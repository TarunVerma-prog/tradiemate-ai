"use client";
import React, { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "ai";
  content: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        body: JSON.stringify({ message: input }),
      });
      if (!res.ok) throw new Error("Failed to fetch AI response");
      const data = await res.json();
      const aiMessage: Message = { role: "ai", content: data.reply || "(No response)" };
      setMessages((prev) => [...prev, aiMessage]);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="w-full max-w-2xl flex flex-col rounded-2xl shadow-2xl bg-white overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 text-xl font-semibold">
          💬 Tradiemate AI Chat
        </div>
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50" style={{ minHeight: "60vh" }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs break-words shadow ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none text-xl"
                    : "bg-white text-gray-900 border border-gray-200 rounded-bl-none text-lg"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-4 py-2 max-w-xs bg-white text-gray-400 border border-gray-200 animate-pulse">
                AI is typing...
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
        <div className="p-4 bg-gray-100 flex gap-2 border-t">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={loading}
          />
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
