# Project Setup Instructions

This project is a monorepo containing both the backend and frontend. Follow the steps below to run it locally.

## Clone the Repository
```sh
git clone <https://github.com/AkhilendreSinghRawat/Akuma-Task-Manager.git>
cd <Akuma-Task-Manager>
```

## Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Change the Node.js version to 20:
   ```sh
   nvm use 20
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the backend server:
   ```sh
   npm run start
   ```
   - The backend server will run on **port 8000**.

## Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Change the Node.js version to 20:
   ```sh
   nvm use 20
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the frontend server:
   ```sh
   npm run dev
   ```
   - The frontend server will run on **port 5173**.

## Deployed Application
You can check the deployed app at: [https://akuma-task-manager-fe.vercel.app/]