'use client';
import { useState } from "react";
export default function ChatBubbles() {
    const [messages, setMessages] = useState([
        {
            role: "human",
            message: "hello mr robot 👋",
        },
        {
            role: "ai",
            message: "🤖 beep boop. hi. what do u want",
        },
    ]);

    return (
        <div className="flex flex-col">
        {messages.map((message, index) => {
            return (
                <div
                    key={index}
                    className={`flex ${
                        message.role !== "ai"
                            ? "justify-end"
                            : "justify-start"
                    }`}
                >
                    <div
                        className={`${
                            message.role !== "ai"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                        }  text-md p-2 rounded-md mb-2 max-w-sm`}
                    >
                        {message.message}
                    </div>
                </div>
            );
        })}
</div>
      
    )
  }
  