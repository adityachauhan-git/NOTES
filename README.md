# Notes

A lightweight notes and book-management web application with authentication, note creation, and a personal library view. The project uses a Node.js and Express backend with a static frontend served from the client folder.

## Features

- User registration and login
- JWT-based authentication with refresh-token support
- Create, view, and save notes
- Organize notes by book
- View a personal library of books
- Responsive browser-based UI for notes and auth pages

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: PostgreSQL (via Supabase connection string)
- Validation: Zod
- Authentication: JSON Web Tokens and cookies

## Project Structure

- client/ - Static HTML, CSS, and JavaScript frontend pages
- src/ - Server and backend modules
  - modules/auth/ - Registration, login, and token handling
  - modules/book/ - Book library endpoints
  - modules/reading/ - Note CRUD endpoints
  - common/ - Shared config, middleware, and utilities

## Prerequisites

- Node.js 18+
- npm
- A PostgreSQL-compatible database (the project is currently configured to use a Supabase connection string)

## Installation

1. Open the project folder.
2. Install backend dependencies:

```bash
cd src
npm install
```

## Environment Variables

Create a .env file inside the src folder with values similar to:

```env
DATABASE_URL=your_postgresql_connection_string
ACCESS_TOKEN_KEY=your_access_token_secret
REFRESH_TOKEN_KEY=your_refresh_token_secret
PORT=8080
```

## Running the App

Start the backend server:

```bash
cd src
node server.js
```

The server will run on port 8080 by default.

For the frontend, open the HTML files in the client folder with a local server such as Live Server in VS Code. The app is expected to be served from a browser environment on port 5500.

## API Overview

### Authentication

- POST /auth/register
- POST /auth/login
- GET /auth/refreshToken

### Notes

- GET /notes/getNotes/:bookID
- GET /notes/getNote/:noteID
- POST /notes/createNote/:bookID
- PUT /notes/saveNote

### Books

- GET /books/library
- GET /books/book/:id
- POST /books/addbooks
- DELETE /books/deleteBook/:id

## Notes

- The frontend is served as static files, so it is best run through a simple local web server rather than opening the HTML files directly.
- The current backend configuration uses CORS for the local frontend origin at http://127.0.0.1:5500.
