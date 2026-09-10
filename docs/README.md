# Manage Data Panel — MERN + MongoDB

A production-oriented Manage Data admin panel built for the BlackCube Solutions LLC full-stack interview assignment.

## Stack

- React + Vite
- Node.js + Express
- MongoDB Atlas
- Mongoose
- TypeScript
- Tailwind CSS
- Zod
- SheetJS (`xlsx`)
- Vercel

## Core Flow

Excel/CSV → validation → header mapping → preview → confirmed import → MongoDB → Manage Data CRUD.

## Core Features

- Database-backed summary cards
- Category tabs
- Backend search and filters
- Pagination
- Update/delete with validation and confirmation
- Excel/CSV upload and preview
- Loading, empty, success and error states
- Responsive UI

## Environment

Use `.env.example` as the template. Never commit real credentials.

Backend:
`MONGODB_URI=`

Frontend:
`VITE_API_BASE_URL=`

## Development

Install dependencies in the client and server applications, configure environment variables, start the Express API, then start the Vite client.

## Production

Deploy to Vercel, configure production environment variables, verify MongoDB Atlas connectivity, and execute the QA smoke test.

## Architecture

React → Express REST API → services/validation → Mongoose → MongoDB Atlas.

## Security

No passwords, API keys, private keys, database credentials or `.env` files should be committed.
