# Next AI: Full-Stack RAG-Based PDF Question Answering System

An AI-powered full-stack web application that allows users to upload a PDF document, ask questions based on its content, and interact with the system through both text and voice.

## Overview

This project is a PDF question-answering application built with React on the frontend and Express on the backend. It uses LangChain and OpenAI to process PDF files, retrieve relevant document chunks, and generate context-aware answers. The application also supports speech recognition and text-to-speech with both Chinese and English language options.

## Features

- Upload PDF files
- Ask questions based on the uploaded PDF
- Multi-turn chat history
- Display source page numbers for answers
- Delete current PDF
- Clear chat history
- Copy answers
- Voice input with speech recognition
- Voice output with text-to-speech
- Chinese / English voice mode switching
- Structured frontend and backend architecture

## Tech Stack

### Frontend
- React
- Ant Design
- Axios
- react-speech-recognition
- speak-tts

### Backend
- Node.js
- Express.js
- Multer
- dotenv

### AI / RAG
- LangChain
- OpenAI API
- PDFLoader
- RecursiveCharacterTextSplitter
- OpenAIEmbeddings
- MemoryVectorStore

## Project Structure

```bash
nextai/
├── public/
├── src/
│   ├── components/
│   │   ├── PdfUploader.js
│   │   └── ChatComponent.js
│   ├── hooks/
│   │   ├── useChatHistory.js
│   │   └── useSpeechControls.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── speech.js
│   ├── constants/
│   │   └── config.js
│   └── App.js
├── server/
│   ├── config/
│   │   └── multerConfig.js
│   ├── controllers/
│   │   └── pdfController.js
│   ├── middlewares/
│   │   ├── asyncHandler.js
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   └── validators.js
│   ├── routes/
│   │   └── pdfRoutes.js
│   ├── services/
│   │   ├── chatService.js
│   │   └── fileStateService.js
│   ├── utils/
│   │   ├── AppError.js
│   │   └── pdfHelpers.js
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
├── .env
├── package.json
├── .gitignore
└── README.md