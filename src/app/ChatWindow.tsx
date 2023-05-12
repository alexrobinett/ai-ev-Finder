/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import React,{useState} from 'react'
import { PineconeClient } from '@pinecone-database/pinecone';
import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain, VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import * as dotenv from "dotenv";
import ChatBubbleSystem from './ChatBubbleClient';
import ChatBubbles from './ChatBubbles';


dotenv.config();

const model = new OpenAI({});

const client = new PineconeClient() ;

export default async function ChatWindow() {
    


  
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
    
      const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings(),
        { pineconeIndex }
      );

      const chain = ConversationalRetrievalQAChain.fromLLM(
        model,
        vectorStore.asRetriever()
      );

      const question = "whats a nema 14-50 plug?";
    const res = await chain.call({ question, chat_history: [] });

    console.log(res)




  return (
    <div className="mx-auto max-w-[1000px] flex flex-col h-screen bg-white drop-shadow-md sm:rounded-lg pt-2">
      <div className="px-4 py-5 sm:p-2">
        <h1 className="text-base font-semibold leading-6 text-gray-900">EV GPT </h1>
        <div className="m-2 max-w-xl text-sm text-gray-500 h-max">
          <p>Ask EV GPT about what type of EV fits your lifestyle</p>
        </div>
        <section className='border border-gray-500 h-5/6 rounded-md'>
        <ChatBubbles/>
        </section>
        <form className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="email" className="sr-only">
              EV GPT
            </label>
            <textarea
              name="User"
              id="User"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Ask about EVs"
            />
          </div>
          <button
            type="button"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
