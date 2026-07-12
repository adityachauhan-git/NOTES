# Notes

A lightweight notes and book-management web application with user authentication, note creation, and a personal library view. The backend is built with Node.js and Express; the frontend is static HTML/CSS/JS in the `client/` folder.

## Quick Start

1. Install server dependencies and create environment file:

```bash
cd src
npm install
cp .env.example .env    # or create .env manually
```

2. Set environment variables in `src/.env` (example):

```env
DATABASE_URL=postgres://user:pass@host:port/dbname
ACCESS_TOKEN_KEY=your_access_token_secret
REFRESH_TOKEN_KEY=your_refresh_token_secret
PORT=8080
```

3. Start the backend:

```bash
cd src
node server.js
```

4. Serve the frontend (use Live Server in VS Code or a simple static server):

```bash
npx serve client  # or use Live Server extension
```

The backend defaults to port `8080`; the static frontend can be served on any port (commonly `5500` for Live Server).

## Features

- User registration and login
- JWT-based authentication with refresh-token support
- Create, view, and save notes
- Organize notes by book
- Personal library view

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: PostgreSQL (Supabase-compatible)
- Validation: Zod
- Authentication: JSON Web Tokens and cookies

## Project Structure

- client/ — Static frontend pages and assets
- src/ — Server and backend modules
  - modules/auth/ — Registration, login, and token handling
  - modules/book/ — Book library endpoints
  - modules/reading/ — Note CRUD endpoints
  - common/ — Shared config, middleware, and utilities

## API Examples

Register a user:

```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"s3cret"}'
```

Login (returns tokens):

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"s3cret"}'
```

Notes endpoints (authenticated):

- `GET /notes/getNotes/:bookID`
- `GET /notes/getNote/:noteID`
- `POST /notes/createNote/:bookID`
- `PUT /notes/saveNote`

Books endpoints:

- `GET /books/library`
- `GET /books/book/:id`
- `POST /books/addbooks`
- `DELETE /books/deleteBook/:id`

## Development Tips

- Use the `client/` folder with the Live Server extension for faster frontend iteration.
- Ensure `DATABASE_URL` points to a running PostgreSQL instance. If using Supabase, use the database connection string provided by Supabase.
- Middleware and validation logic live under `src/common/`.

## Contributing

Feel free to open issues or submit pull requests. For code changes, run the server locally and include short notes on steps to reproduce.

## License

This project is provided as-is. Add a license file if you plan to publish or share the code.
