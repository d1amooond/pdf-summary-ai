# PDF Summary AI

A web application that allows users to upload PDF documents and receive AI-generated summaries using OpenAI's API.

![Alt text](/public/demo.png?raw=true "Optional Title")

## DEMO
[Click here to view demo](https://pdf-summary-ai-alpha.vercel.app/)

## Features

- 📄 PDF Upload: Upload PDF files for processing
- 🤖 AI Summary: Generate concise summaries using OpenAI's GPT
- 🕒 History: View the last 5 processed documents
- 🐳 Docker: Containerized application for easy deployment

## Prerequisites

- Node.js 18+ or Docker
- OpenAI API key

## Quick Start

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd pdf-summary-ai
```

2. Create environment file:
```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

3. Build and run with Docker:
```bash
docker-compose up --build
```

4. Open `http://localhost:3000` in your browser

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd pdf-summary-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

4. Run the development server:
```bash
npm run dev
```

5. Open `http://localhost:3000` in your browser

## API Documentation

### Upload PDF
- **Endpoint**: `/api/upload`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Body**: `{ file: File }`
- **Response**: `{ text: string, filename: string }`

### Generate Summary
- **Endpoint**: `/api/summary`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**: `{ text: string, filename: string }`
- **Response**: `{ summary: string, filename: string }`

## Architecture

This project follows clean architecture principles and SOLID design patterns:

- **Services**: Business logic encapsulation (PDF, OpenAI, Storage)
- **Components**: Presentational logic with separation of concerns
- **Hooks**: Shared stateful logic
- **Types**: TypeScript interfaces for type safety
- **API Routes**: Next.js 15 app router for backend logic

## Structure
- **app**: All logic related to pages and api
  - **components**: Custom components that used only in current page
  - **api** Api routes that handles backend stuff
-  **components**: Reusable base components
-  **helpers**: Shared constants, enums, hooks and methods
   - **constants**: Shared constants
   - **enums**: Type safety enums
   - **errors**: Error constructor
   - **hooks**: Methods to use in client components 
-  **services**: Business logic and integrations
   - **ai**: Service for ai integration
   - **api**: Service to encapsulate fetch logic
   - **doc**: Service for document processing
   - **storage**: Service to save data to storage
-  **types**: Shared types for type safety
   - **services**: Service interfaces to implement (Dependency Inversion principle)
   - **storage**: Types for storage
   - **summary**: Summary response
   - **upload**: Upload response
-  **tests**: Unit testing

## Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PDF Processing**: pdf-parse
- **AI**: OpenAI API
- **Containerization**: Docker