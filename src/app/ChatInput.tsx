import React from 'react';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
}

export default function ChatInput({ input, setInput }: ChatInputProps) {
  return (
    <div className="w-full">
      <label className="sr-only">EV GPT</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        placeholder="Ask about EVs"
      />
    </div>
  );
}
