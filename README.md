This is a [Next.js](https://nextjs.org/) project with TypeScript and tailwindCss

## Clone Repository
git clone https://github.com/francismaxug/chat-app.git
cd chat-app

## Install dependencies
npm install

## Configure Environment Variables
Create a .env file at the root of the project with the following content:

SECRETE_KEY = your_secrete_key

## Run the project
npm run dev



## Project structure

chat-interface/
├── public/
│   ├── images/
│   └── ...
├── src/
│   ├── app/
│   │    ├── (auth)/
│   │        ├── login/
│   │   │        ├── login.tsx
│   │   │    ├── signup/
│   │   │        ├── signup.tsx
              ├── layout.tsx
              ├── page.tsx
│   │   ├── actions/
│   │   │   ├── auth.ts
│   │   │  
│   │   ├── contexts/
│   │   │   └── AppContext.tsx
│   │   ├── (dashboard)/
│   │   │──.......   
│   │   │   
│   ├── components/  
│   │   │   ├── .....
│   ├── middleware.ts
│   │── libs/   
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   └── globals.css
│   └── 
├── .env
├── package.json
└── README.md

## The CHATBOT-APP

## Interacting with the app on running # npm run dev

## Login Interface
- A login interface which has input details as email and password where a user will be able to log in.
Upon a Successful login, The user will be redirected to the chatbot interface

## Sign up
- In a case where its the users first time interacting with the app, He will be  require to sign up to the chatbot in other to be registered in the database.
The user is route to the chat interface immediately after signing up.

## Logout Button
- There is a logout button where the user can logout of the chat-app. In that case, he will not be allowed to accessd the chat page unless he logs in with his correctt credentials again.

# Note that passwords must be eight characters in length and must include at lease 1 letter of the alphabet



## Chat Interface

A chat interface application with authentication, conversation management, and real-time chat features.

## Features

- **Authentication**: Access restricted to users with correct login credentials.
- **Sidebar**: Displays all user conversations with options to create, delete, and switch between conversations.
- **Chat Window**: Displays the chat history of the selected conversation.
- **Send Message**: Send messages within the chat window.
- **Chatbot Response Typing Animation**: Simulates typing animation for chatbot responses.
- **Loading Spinners**: Displays loading spinners for chat history and conversation list when fetching data from the API.




## App Deployed on Vercel!!!


