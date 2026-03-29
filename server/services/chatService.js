import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "@langchain/classic/chains/combine_documents";
import { createRetrievalChain } from "@langchain/classic/chains/retrieval";
import { getPageNumber } from "../utils/pdfHelpers.js";

export const askPdfQuestion = async (filePath, question) => {
  if (!filePath) {
    throw new Error("No PDF file uploaded yet.");
  }

  if (!question) {
    throw new Error("No question provided.");
  }

  const loader = new PDFLoader(filePath);
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splitDocs = await splitter.splitDocuments(docs);

  const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  const model = new ChatOpenAI({
    model: "gpt-5.4",
    temperature: 0.2,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a helpful assistant for question answering over a PDF.
Use the provided context to answer the user's question.
If the answer is not in the context, say you don't know.
Keep the answer concise and within 3 sentences.`,
    ],
    [
      "human",
      `Context:
{context}

Question:
{input}`,
    ],
  ]);

  const combineDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt,
  });

  const retrievalChain = await createRetrievalChain({
    retriever: vectorStore.asRetriever(4),
    combineDocsChain,
  });

  const response = await retrievalChain.invoke({
    input: question,
  });

  const sourceDocs = response.context || [];
  const sourcePages = [
    ...new Set(
      sourceDocs
        .map((doc) => getPageNumber(doc))
        .filter((page) => page !== null)
    ),
  ].sort((a, b) => a - b);

  return {
    answer: response.answer,
    sourcePages,
  };
};