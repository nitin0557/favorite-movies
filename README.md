Favorite Movies & TV Shows — Project Documentation 

Full-stack web application to manage a user's favorite movies & TV shows. 

Login Credentials: nitin@example.com
Login PWD: nitin123


Table of Contents 

---------> Project Overview <---------

 Tech Stack 

--> Repo Structure -Component Based
--> Database Schema - Prisma
--> Backend - Node+Express+Typescript+
--> Frontend - React+ Vite+ Typswcript+ Tailwind +Context+ Zustaand+ Material Ui
--> Database -MongoDB
--> Validation-ZOd
--> Authentication - JWT 

Setup 
Environment variables 
Prisma schema (example) 
REST API endpoints 
Validation rules 
Pagination strategy (infinite scroll) 
Seed script 

Frontend 

Setup 
Environment variables
Key screens & components 
Infinite scroll implementation notes 
Form validation 
Authentication
Deployment 

Testing 

Added README

Tips & Best Practices 


1. Project Overview 

A single-page web application that allows users to add, view (table with infinite scroll), edit and delete favorite movies and TV shows. Each entry contains fields like title, type, director, budget, location, duration, year/time and optional poster image. 

Core features implemented: 

Create, read (paginated), update, delete entries (CRUD) 

Table with infinite scroll to fetch more records as the user scrolls 

Input validation on backend and frontend 

Responsive layout using Tailwind CSS  

Authentication (JWT-based) 

Upload posters (local / cloud storage) 

Search & filters 

 

2. Tech Stack 

Frontend 

React + Vite + TypeScript 

Tailwind CSS 

UI Library:  Material UI  

State management: Use Context and Zustaand 

Authentication using JWT  

Perfomance Optimisation 

Material Ui Icons 

Infinite Scrollin 

 

 

 

 

 

Backend 

Node.js + Express 

MySQL  

ORM: Prisma 

Validation: Zod  

Authentication : JWT 

Dev tooling 

ESLint, Prettier 

 

3. Repo Structure (suggested) 


favorite-movies/           # monorepo root (optional) 
├─ backend/ 
│  ├─ prisma/ 
│  │  ├─ schema.prisma 
│  │  └─ seed.ts 
│  ├─ src/ 
│  │  ├─ controllers/ 
│  │  ├─ routes/ 
│  │  ├─ services/ 
│  │  ├─ middlewares/ 
│  │  ├─ validations/ 
│  │  └─ index.ts 
│  ├─ package.json 
│  └─ .env 
├─ frontend/ 
│  ├─ src/ 
│  │  ├─ components/ 
│  │  ├─ pages/ 
│  │  ├─ hooks/ 
│  │  ├─ services/   # api calls 
│  │  └─ App.tsx 
│  ├─ package.json 
│  └─ .env 
└─ README.md 
  

 

4. Database Schema (MySQL) 

A simple favorites table to store movie/show entries. 

SQL (example) 

CREATE TABLE favorites ( 
  id BIGINT PRIMARY KEY AUTO_INCREMENT, 
  title VARCHAR(255) NOT NULL, 
  type ENUM('Movie','TV Show') NOT NULL, 
  director VARCHAR(255), 
  budget VARCHAR(100), 
  location VARCHAR(255), 
  duration VARCHAR(50), 
  year_or_time VARCHAR(100), 
  notes TEXT, 
  poster_url VARCHAR(1024), 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
); 
  

Prisma schema (if using Prisma) 

generator client { 
  provider = "prisma-client-js" 
} 
 
datasource db { 
  provider = "mysql" 
  url      = env("DATABASE_URL") 
} 
 
model Favorite { 
  id         Int      @id @default(autoincrement()) 
  title      String 
  type       String 
  director   String? 
  budget     String? 
  location   String? 
  duration   String? 
  yearOrTime String? 
  notes      String? 
  posterUrl  String? 
  createdAt  DateTime @default(now()) 
  updatedAt  DateTime @updatedAt 
} 
  

 

5. Backend 

Setup (quick) 

cd backend 

npm install 

Create .env with environment variables (example below) 

npx prisma migrate dev --name init (if using Prisma) 

npm run dev 

Example .env 

DATABASE_URL="mysql://user:password@localhost:3306/favorite_movies" 
PORT=4000 
JWT_SECRET=your_jwt_secret_here 
  

Install (recommended packages) 

npm i express cors prisma @prisma/client zod bcrypt jsonwebtoken 
npm i -D typescript ts-node-dev nodemon 
  

REST API endpoints (suggested) 
Deployment BASE URL: https://favorite-movies-six.vercel.app/ 

Authentication ENDPOINTS 

GET /api/auth/login 
POST /api/auth/register  

MOVIES ENDPOINT 

POST   /api/favorites           # create new favorite 
GET    /api/favorites           # list favorites (supports pagination: ?limit=20&cursor=123) 
GET    /api/favorites/:id       # get single favorite 
PUT    /api/favorites/:id       # update favorite 
DELETE /api/favorites/:id       # delete favorite 


Example controllers (concept) 

createFavorite(req, res) — validate with Zod, insert via Prisma, return created item 

listFavorites(req, res) — supports cursor or page offset. Return items[], nextCursor|null 

updateFavorite(req, res) — partial updates allowed 

deleteFavorite(req, res) — soft or hard delete 

Validation (Zod example) 

import { z } from 'zod' 
 
export const favoriteSchema = z.object({ 
  title: z.string().min(1), 
  type: z.enum(['Movie','TV Show']), 
  director: z.string().optional(), 
  budget: z.string().optional(), 
  location: z.string().optional(), 
  duration: z.string().optional(), 
  yearOrTime: z.string().optional(), 
  notes: z.string().optional(), 
  posterUrl: z.string().url().optional(), 
}) 
  

Pagination strategy (infinite scroll) 

Use cursor-based pagination for stable infinite scroll. Return a nextCursor (id or createdAt timestamp) along with items. Example query parameters: 

GET /api/favorites?limit=20&cursor=245 — fetch 20 items after cursor=245. 

Response shape: 

{ 
  "items": [ /* favorites */ ], 
  "nextCursor": 312 
} 
  

Frontend will call this endpoint when the user scrolls, passing the last nextCursor it received. 

Seed script 

Provide a prisma/seed.ts or SQL seed file to populate sample records for testing (50–200 entries so infinite scroll can be tested). 

 

6. Frontend 

Setup (quick) 

cd frontend 

npm install 

Create .env with VITE_API_BASE_URL=http://localhost:4000/api 

npm run dev 

Recommended packages 

npm i react-router-dom @tanstack/react-query axios zod react-hook-form tailwindcss 
  

Key pages & components 

Pages 

Home — table with infinite scroll (main page) 

AddFavorite — form modal/page to add 

EditFavorite — form modal/page to edit 

Components 

FavoritesTable — table rows, actions column with Edit/Delete buttons 

FavoriteForm — form built with react-hook-form + zod resolver 

InfiniteScrollWrapper — hook or component that triggers fetch when scrolled near bottom 

ConfirmModal — confirmation dialog for deletions 

Infinite scroll implementation 

Use React Query for data fetching with a cursor. Example (concept): 

Use useInfiniteQuery from React Query. 

Query key: ['favorites']. 

getNextPageParam returns nextCursor. 

Render items from data.pages. 

Trigger fetchNextPage when scroll reaches bottom (use IntersectionObserver on a sentinel element). 

Form validation 

Use react-hook-form with @hookform/resolvers/zod to reuse the same schema as backend. 

Example API service (axios) 

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL }) 
 
export const fetchFavorites = (limit = 20, cursor?: number) => 
  api.get('/favorites', { params: { limit, cursor } }) 
 
export const createFavorite = (payload) => api.post('/favorites', payload) 
export const updateFavorite = (id, payload) => api.put(`/favorites/${id}`, payload) 
export const deleteFavorite = (id) => api.delete(`/favorites/${id}`) 
  

 

7. Authentication (Optional) 

Add /api/auth/register and /api/auth/login endpoints. 

Use bcrypt for password hashing; JWT for access tokens. 

Protect create/update/delete endpoints with auth middleware. 

On frontend, keep token in memory or localStorage and attach via Authorization: Bearer <token> header. 

Provide demo seed user credentials in README. 

 

8. Deployment 

Backend: Render, Railway, Heroku (deprecated), AWS Elastic Beanstalk, or DigitalOcean App Platform. Provide DATABASE_URL as environment variable. 

 Frontend: Vercel or Netlify — build from frontend/ and set environment variable VITE_API_BASE_URL to deployed backend URL. 

Docker (optional) — Compose a docker-compose.yml with services: db (MySQL), backend, frontend. 

 

9. Testing 

Unit tests for validation and controllers using Jest + Supertest for HTTP tests. 

E2E tests using Playwright or Cypress to test add/edit/delete flows and infinite scroll. 

 

10. README / Deliverables checklist (what to include in GitHub repo) 

frontend/ code (React + Vite + TypeScript + Tailwind) 

backend/ code (Node + Express + Prisma/ORM + validations) 

Migration files / Prisma schema 

Seed data / seed script 

README with setup instructions (both frontend & backend), migration steps, and a note about environment variables 

Postman collection or API examples (curl) 

Deployed links (if available) 

 

11. Tips & Best Practices 

Use cursor (id or createdAt) rather than offset for infinite scroll to avoid duplication. 

Debounce user input and avoid fetching too frequently on scroll. 

Add optimistic updates on create/update/delete for snappier UI (React Query helps). 

Limit payload size from backend: only return fields the frontend needs. 

Sanitize and validate all user input on the server. 

 

Example cURL requests 

Create 

curl -X POST "http://localhost:4000/api/favorites" -H "Content-Type: application/json" -d '{ 
  "title": "Inception", 
  "type": "Movie", 
  "director": "Nolan", 
  "budget": "$160M", 
  "location": "LA, Paris", 
  "duration": "148 min", 
  "yearOrTime": "2010" 
}' 
  

List (first page) 

curl "http://localhost:4000/api/favorites?limit=20" 
  

List (next page using cursor) 

curl "http://localhost:4000/api/favorites?limit=20&cursor=245" 
  

 

If you'd like, I can: 

generate a ready-to-run backend starter (Express + Prisma + Zod) folder structure, 

generate a ready-to-run frontend starter (Vite + React + TypeScript + Tailwind + React Query) with infinite scroll wired up, 

or produce a compact Postman collection / curl script for testing. 

Tell me which of the above you want next and I will produce it. 

