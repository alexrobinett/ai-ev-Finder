import { type NextPage } from "next";
import Head from "next/head";
import ChatWindow from "./ChatWindow";
import { OpenAI } from "langchain/llms/openai";



const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
      <ChatWindow/>
    </main>
    </>
  );
};

export default Home;
