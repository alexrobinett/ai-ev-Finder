
'use client'
import React,{useState, useEffect} from 'react'

import ChatBubbles from './ChatBubbles';


export default function ChatWindow() {

    const [incoming, setIncoming] = useState( { role: "ai", message: "" });
    const [newMessage, setNewMessage] = useState( { role: "ai", message: "" } );
    const [input, setInput] = useState("");
    const [finished, setFinished] = useState(true);
    const [history, setHistory] = useState([]);
    const [messages, setMessages] = useState([{
        role: "ai",
        message: "Hello, I'm EV-GPT! Ask me anything about Electric Vehicles.",
    },
    ]);


    useEffect(() => {
        setNewMessage(incoming);
    }, [incoming])

    useEffect(() => {
        if (newMessage.message) {
            setMessages((prevMsgs) => [...prevMsgs, newMessage])
        }
    }, [finished])
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input == ""){
            return
        }
        setFinished(false);
        setMessages((prev) => [...prev, { role: "human", message: input }])


        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: input,
                history: history,
            }),
        });


        setInput("");
        setIncoming( { role: "ai", message: "" });

        const stream = res.body;
        console.log(stream)
        const reader = stream.getReader();

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                const decodedValue = new TextDecoder().decode(value);
                setIncoming( ({ role, message }) => ({ role, message: message + decodedValue }));
            }

        } catch (error) {
            console.error(error);
        } finally {
            reader.releaseLock();
            setIncoming( { role: "ai", message: "" });
            setFinished(true)
        }
    };

  return (
    <div className=" flex w-full flex-col bg-white flex-auto drop-shadow-md sm:rounded-lg pt-2 md:max-w-2xl sm:my-4 sm:px-4 ">
      <div className="px-4 py-5 sm:p-2 flex flex-col flex-grow ">
        <h1 className="text-2xl font-semibold leading-6 text-gray-900 mb-4 flex-none">EV GPT </h1>
        <section className='border border-gray-500 rounded-md flex-1 overflow-y-auto max-h-[28rem] p-2 md:max-h-[34rem]'>
        <ChatBubbles messages={messages} finished={finished} incoming={incoming}/>
        </section>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e).catch(err => console.error(err)); }} className="mt-5 sm:flex sm:items-center flex-">
          <div className="w-full">
            <label htmlFor="userInput" className="sr-only">
              EV GPT
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Ask about EVs"
            />
          </div>
          {finished? (
            <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Submit
          </button>
          ): (
            <button disabled
            type="submit"
            className="animate-pulse mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600   sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Working
          </button>
          )}
          
        </form>
      </div>
    </div>
  )
}
