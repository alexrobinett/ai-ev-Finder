'use client';
import React, { useState, useEffect, useRef } from 'react';

import ChatBubbles from './ChatBubbles';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';

export default function ChatWindow() {
  const [incoming, setIncoming] = useState({ role: 'ai', message: '' });
  const [newMessage, setNewMessage] = useState({ role: 'ai', message: '' });
  const [input, setInput] = useState('');
  const [finished, setFinished] = useState(true);
  const [fullResponse, setFullResponse] = useState('');
  const [history, setHistory] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      message: "Hello, I'm EV-GPT! Ask me anything about Electric Vehicles."
    }
  ]);

  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setNewMessage(incoming);
  }, [incoming]);

  useEffect(() => {
    if (newMessage.message) {
      setMessages((prevMsgs) => [...prevMsgs, newMessage]);
      setHistory((prevHistory) => prevHistory + ' ' + newMessage.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input == '') {
      return;
    }
    setFinished(false);
    setMessages((prev) => [...prev, { role: 'human', message: input }]);

    setHistory((prevHistory) => prevHistory + ' ' + input);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: input,
        history: history
      })
    });

    setInput('');
    setIncoming({ role: 'ai', message: '' });
    setFullResponse('');

    const stream = res.body;
    console.log(stream);
    const reader = stream.getReader();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setHistory((prevHistory) => prevHistory + ' ' + fullResponse);
          break;
        }

        const decodedValue = new TextDecoder().decode(value);
        setIncoming(({ role, message }) => ({
          role,
          message: message + decodedValue
        }));
        setFullResponse((prevResponse) => prevResponse + decodedValue);
      }
    } catch (error) {
      console.error(error);
    } finally {
      reader.releaseLock();
      setIncoming({ role: 'ai', message: '' });
      setFinished(true);
      console.log(history);
    }
  };

  return (
    <div className="relative flex w-full flex-auto flex-col bg-white pt-2 drop-shadow-md sm:my-4 sm:rounded-lg sm:px-4 md:max-w-4xl">
      <div
        className="mb-4 flex flex-grow flex-col px-4 py-5 sm:p-2"
        ref={chatWindowRef}
      >
        <ChatHeader />
        <section className="max-h[15rem] mb-24 mt-32 flex-1 overflow-y-auto rounded-md border border-gray-500 p-2 sm:mb-20 sm:mt-28 md:max-h-[36rem]">
          <ChatBubbles
            messages={messages}
            finished={finished}
            incoming={incoming}
          />
        </section>
      </div>
      <div className="fixed inset-x-0 bottom-0 mb-2 p-2 px-4 sm:px-6">
        <ChatForm
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          finished={finished}
        />
      </div>
    </div>
  );
}
