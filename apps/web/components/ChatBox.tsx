"use client";

import { useState, useEffect } from "react";
import { ChatBubble } from "./ui/ChatBubble";
import { ChatInput } from "./ui/ChatInput";
import { LoadingBubble } from "./ui/LoadingBubble";

export default function ChatBox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [flowId, setFlowId] = useState("create-product");

  useEffect(() => {
    setMessages([{ text: "Qual nicho você quer atuar?", isUser: false }]);
  }, []);

  async function handleSend() {
    if (!input) return;

    const updatedAnswers = { ...answers, [stepIndex]: input };

    setMessages((prev) => [...prev, { text: input, isUser: true }]);

    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        flowId,
        stepIndex,
        answers,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (data.type === "question") {
      setStepIndex(stepIndex + 1);
      setMessages((prev) => [
        ...prev,
        { text: data.data.question, isUser: false },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: "🔥 Resultado:\n\n" + data.data,
          isUser: false,
        },
      ]);
    }

    setAnswers(updatedAnswers);
    setInput("");
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 border rounded-2xl p-4 shadow-sm">
      <div className="h-[400px] overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg.text} isUser={msg.isUser} />
        ))}

        {loading && <LoadingBubble />}
      </div>

      <ChatInput value={input} onChange={setInput} onSend={handleSend} />
    </div>
  );
}
