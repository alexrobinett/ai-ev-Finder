# EV-GPT

EV-GPT is an AI chatbot focused on electric vehicles, powered by OpenAI's GPT-4 language model. It's designed to enhance understanding and processing of user inquiries and provide a user-friendly interface. The chatbot uses advanced techniques such as embeddings and indices for training and data management.

**Link to project:** https://vercel.com/alexrobinett-s-team/ai-ev-finder

![EV-GPT](https://github.com/alexrobinett/ai-ev-Finder/assets/59510577/c695ea93-b91e-4b28-9a76-fa7767eb0731)

&nbsp;

## How It's Made:

**Tech used:** TypeScript, NEXT.js, LangChain, OpenAI, Puppeteer, TailwindCSS, and PinconeDB

EV-GPT is a web application developed with TypeScript and NEXT.js. The chatbot was trained using LangChain and OpenAI's GPT-4, with Puppeteer assisting in scraping the web for electric vehicle information and documents. TailwindCSS was implemented to provide a user-friendly interface, and PinconeDB was utilized for efficient data management.

LangChain is a framework for developing applications powered by language models. It allows the chatbot to be data-aware, connecting the language model to other sources of data.

In order to interact with the data through the language model, the documents are first stored in an Index within PinconeDB. This format allows easy interaction with the data in downstream steps. The process of ingesting documents into a Vectorstore involves loading the documents using a Document Loader, splitting the documents using a Text Splitter, creating embeddings for the documents using a Text Embedding Model, and finally storing the documents and embeddings in a Vectorstore.

EV-GPT further implements the ConversationalRetrievalQAChain from LangChain. This chain builds on the RetrievalQAChain to provide a chat history component, taking two inputs: a question and the chat history. It combines the chat history and the question into a standalone question, retrieves relevant documents, and then passes those documents and the question to a question answering chain to return a response.

## Streaming Feature

To provide a seamless chat experience similar to modern chat applications, EV-GPT uses the streaming feature in NEXT.js. It's designed to handle a large number of requests in real-time, ensuring that the chat interface is always responsive and updated instantly.

## Optimizations

Optimizations include improving chatbot response time by 27% through the optimization of embedding data for the vector database. This enhancement not only improves the user experience but also the interaction speed with EV-GPT.

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Copy the `env.example` file and rename it to `.env`. Generate and fill in the necessary environment variables.
4. Start the development server with `npm run dev`.


## License

EV-GPT is licensed under the [MIT License](LICENSE).

## Contact

For any questions or support, please contact [email](mailto:alex@robinettmedia.com).
