import React from 'react';

export default function ChatHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 bg-white px-4 py-2 sm:px-6">
      <h1 className="my-4 flex-none text-4xl font-semibold leading-6 text-gray-900">
        EV GPT{' '}
      </h1>
      <span className="text-md mb-4 flex-none font-semibold leading-6 text-gray-900">
        Ask EV-GPT any questions regarding electric vehicles, including
        inquiries about charging procedures and vehicle recommendations.
      </span>
    </header>
  );
}
