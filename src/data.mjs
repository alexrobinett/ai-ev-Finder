// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { JSONLoader } from "langchain/document_loaders/fs/json"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PineconeClient } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio"

dotenv.config();

const client = new PineconeClient();
await client.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});
const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

export const  runData = async () =>{
    const loader = new JSONLoader("./data/ev-cars.json");
    const rawDocs = await loader.load();
    console.log("loader Created");

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    })
    const docs = await textSplitter.splitDocuments(rawDocs)

    console.log("docs splitted")

    console.log("creating vector database...")

    PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
  pineconeIndex,
});


}

export const  runInternetData = async () =>{
    const loader = new PuppeteerWebBaseLoader("https://cars.usnews.com/cars-trucks/advice/ev-charging-stations", {
   launchOptions: {
     headless: false,
   },
   gotoOptions: {
     waitUntil: "domcontentloaded",
     timeout: 60000, // Set timeout to 60 seconds
   },
   /** Pass custom evaluate, in this case you get page and browser instances */
   async evaluate(page) {
 
     const result = await page.evaluate(() => document.body.innerHTML);
     return result;
   },
 });
     const rawDocs = await loader.load();
     console.log("loader Created");
 
     const textSplitter = new RecursiveCharacterTextSplitter({
         chunkSize: 1000,
         chunkOverlap: 200,
     })
     const docs = await textSplitter.splitDocuments(rawDocs)
 
     console.log(docs)
     console.log("docs splitted")
 
     console.log("creating vector database...")
 
     PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
   pineconeIndex,
 });
}

export const  runInternetData2 = async () =>{
   const loader = new PuppeteerWebBaseLoader("https://www.caranddriver.com/features/g40322167/best-electric-cars/", {
  launchOptions: {
    headless: false,
  },
  gotoOptions: {
    waitUntil: "domcontentloaded",
    timeout: 60000, // Set timeout to 60 seconds
  },
  /** Pass custom evaluate, in this case you get page and browser instances */
  async evaluate(page) {

    const result = await page.evaluate(() => document.body.innerHTML);
    return result;
  },
});
    const rawDocs = await loader.load();
    console.log("loader Created");

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    })
    const docs = await textSplitter.splitDocuments(rawDocs)

    console.log(docs)
    console.log("docs splitted")

    console.log("creating vector database...")

    PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
  pineconeIndex,
});

}

export const  runInternetData3 = async () =>{
    const loader = new PuppeteerWebBaseLoader("https://www.edmunds.com/electric-car/articles/ev-buying-guide/", {
   launchOptions: {
     headless: false,
   },
   gotoOptions: {
     waitUntil: "domcontentloaded",
     timeout: 60000, // Set timeout to 60 seconds
   },
   /** Pass custom evaluate, in this case you get page and browser instances */
   async evaluate(page) {
 
     const result = await page.evaluate(() => document.body.innerHTML);
     return result;
   },
 });
     const rawDocs = await loader.load();
     console.log("loader Created");
 
     const textSplitter = new RecursiveCharacterTextSplitter({
         chunkSize: 1000,
         chunkOverlap: 200,
     })
     const docs = await textSplitter.splitDocuments(rawDocs)
 
     console.log(docs)
     console.log("docs splitted")
 
     console.log("creating vector database...")
 
     PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
   pineconeIndex,
 });
 
 }

 export const  runInternetData4 = async () =>{
    const loader = new PuppeteerWebBaseLoader("https://www.evgo.com/ev-drivers/charging-basics/", {
   launchOptions: {
     headless: false,
   },
   gotoOptions: {
     waitUntil: "domcontentloaded",
     timeout: 60000, // Set timeout to 60 seconds
   },
   /** Pass custom evaluate, in this case you get page and browser instances */
   async evaluate(page) {
 
     const result = await page.evaluate(() => document.body.innerHTML);
     return result;
   },
 });
     const rawDocs = await loader.load();
     console.log("loader Created");
 
     const textSplitter = new RecursiveCharacterTextSplitter({
         chunkSize: 1000,
         chunkOverlap: 200,
     })
     const docs = await textSplitter.splitDocuments(rawDocs)
 
     console.log(docs)
     console.log("docs splitted")
 
     console.log("creating vector database...")
 
     PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
   pineconeIndex,
 });
 
 }

void (async () => {
    await runData();
    await runInternetData()
    await runInternetData2()
    await runInternetData3()
    await runInternetData4()
    console.log("done")
})();
