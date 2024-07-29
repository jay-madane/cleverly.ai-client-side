# Cleverly.ai Client Side Application

Welcome to the client-side repository of **Cleverly.ai**, a SaaS AI platform designed to provide advanced AI tools for various applications. This project is built using modern technologies including ReactJS, NodeJS, ExpressJS, TypeScript, Tailwind CSS, and MongoDB.

## Features

**AI Tools**: Utilize 5 advanced AI tools powered by Gemini and Replicate AI models.
  - Conversation Generation
  - Code Generation
  - Image Generation
  - Video Generation
  - Music Generation
**Secure Authentication**: Enhanced user experience with secure authentication and efficient user management using Clerk Authentication.

## Technologies Used

- **ReactJS**: For building the user interface.
- **NodeJS & ExpressJS**: For handling the backend API.
- **TypeScript**: For type safety and better development experience.
- **Tailwind CSS**: For styling the application.
- **MongoDB**: For the database.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later) or yarn (v1.22 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cleverly-client.git
cd cleverly-client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```
VITE_CLERK_PUBLISHABLE_KEY=<Your Clerk Publishable API Key>
CLERK_SIGN_IN_FORCE_REDIRECT_URL="/dashboard"
```

### Running the Application

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:5173) to view it in the browser.
