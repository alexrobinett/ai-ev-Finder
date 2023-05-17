import { type NextPage } from 'next';
import Head from 'next/head';
import ChatWindow from './ChatWindow';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>EV-GPT</title>
        <meta
          name="description"
          content="A AI chat Bot Trained on the Latest EV Data"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-full flex-col items-center justify-center bg-slate-100">
        <ChatWindow />
      </main>
    </>
  );
};

export default Home;
