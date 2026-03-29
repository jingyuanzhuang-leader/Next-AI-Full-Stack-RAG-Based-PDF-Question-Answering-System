# Next AI: Full-Stack RAG-Based PDF Question Answering System

An AI-powered full-stack application that allows users to upload PDF documents, ask context-aware questions based on document content, and interact with the system through both text and voice.

## Overview

This project is a full-stack PDF question answering system built with React on the frontend and Express on the backend. It integrates LangChain and OpenAI to process PDF documents, retrieve relevant content, and generate accurate responses based on the uploaded file.

The system also supports multilingual voice interaction, including speech recognition and text-to-speech in both Chinese and English.

## Key Features

- Upload PDF documents
- Ask questions based on uploaded PDF content
- Multi-turn chat history
- Display source page numbers for answers
- Delete the currently uploaded PDF
- Clear chat history
- Copy generated answers
- Speech recognition for voice input
- Text-to-speech for answer playback
- Chinese / English voice mode switching
- Structured frontend and backend architecture

## Demo Workflow

1. Upload a PDF file from the frontend
2. Enter a text question or use voice input
3. The backend processes the document through a RAG pipeline
4. The system retrieves relevant document chunks
5. OpenAI generates a context-aware answer
6. The frontend displays the answer and related source pages
7. Users can also play the answer using voice output

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

## System Architecture

```mermaid
flowchart TD
    A[Upper Layer 上层<br/>UI / User Interaction / Page Rendering<br/>React + Ant Design]
    B[Middle Layer 中层<br/>Business Logic / Hooks / API Communication<br/>useChatHistory / useSpeechControls / api.js]
    C[Lower Layer 下层<br/>Backend Services / RAG Pipeline / File Management<br/>Express + LangChain + OpenAI]

    A --> B
    B --> C