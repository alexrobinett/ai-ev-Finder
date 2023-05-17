import React from 'react';
import ChatInput from './ChatInput';

interface ChatFormProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  finished: boolean;
}

export default function ChatForm({
  input,
  setInput,
  handleSubmit,
  finished
}: ChatFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e).catch((err) => console.error(err));
      }}
      className="flex- mt-5 sm:mt-1 sm:flex sm:items-center"
    >
      <ChatInput input={input} setInput={setInput} />
      {finished ? (
        <button
          type="submit"
          className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:ml-3 sm:mt-0 sm:w-auto"
        >
          Submit
        </button>
      ) : (
        <button
          disabled
          type="submit"
          className="mt-3 inline-flex w-full animate-pulse items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:ml-3 sm:mt-0 sm:w-auto"
        >
          Working
        </button>
      )}
    </form>
  );
}
