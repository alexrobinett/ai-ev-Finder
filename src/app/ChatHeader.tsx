import React from 'react';

export default function ChatHeader() {
  return (
    <header className="sticky left-0 right-0 top-0 z-10 mb-2 ">
      <h1 className="my-2 mb-2 flex-none text-2xl font-semibold leading-6 text-gray-900 md:text-4xl">
        EV-GPT 🚗🔋⚡{' '}
      </h1>
      <span className="leading-2 mb-4 flex-none text-sm font-medium text-black">
        Ask EV-GPT any questions regarding electric vehicles, including
        inquiries about charging procedures and vehicle recommendations.
      </span>
    </header>
  );
}
