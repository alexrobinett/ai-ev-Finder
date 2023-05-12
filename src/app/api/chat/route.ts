
import { NextResponse } from "next/server";
import { BaseCallbackHandler } from "langchain/callbacks";
import { PineconeClient } from '@pinecone-database/pinecone';
import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { BufferMemory } from "langchain/memory";

interface Body {
    query: string
    history: never[]
}

export async function POST(req: Request) {
    const body = await req.json()as Body 
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const chatHistory = []

    class CustomHandler extends BaseCallbackHandler {
        name = "custom_handler";
    
        async handleLLMNewToken(token: string) {
            await writer.ready;
            await writer.write(encoder.encode(`${token}`));
        }
    
        async handleLLMEnd() {
            await writer.ready;
            await writer.close();
        }
    
        async handleLLMError(e) {
            await writer.ready;
            await writer.abort(e);
        }
    }
    
    const handler1 = new CustomHandler();
    const client = new PineconeClient();
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    

    await client.init({
        apiKey: process.env.PINECONE_API_KEY,
        environment: process.env.PINECONE_ENVIRONMENT,
    });
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

    try {
        if (!OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not defined.");
        }
   
        const model = new OpenAI({
            modelName: "text-davinci-003",
            temperature: 0.9,
            streaming: true,
            callbacks: [handler1],
            maxTokens: 256,
        });

        const vectorStore = await PineconeStore.fromExistingIndex(
            new OpenAIEmbeddings(),
            { pineconeIndex }
        );

        const chain = ConversationalRetrievalQAChain.fromLLM(
            model,
            vectorStore.asRetriever(),
            {
                questionGeneratorTemplate: "give me information about electric vehicles. Your also friendly an can chat",
                returnSourceDocuments: true,
            }
        );

        
    
        chain
            .call({ question: `${body.query}`, chat_history: chatHistory })
            .catch((error: any) => console.error(error));

        return new NextResponse(stream.readable , {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
            },
        });
    } catch (error: unknown){
        if (error instanceof Error) {
            return new Response(
                JSON.stringify(
                    { error: error.message }
                ),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    }
}