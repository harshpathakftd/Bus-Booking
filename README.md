# Bus Seat Booking System (MERN)

This project includes:
- `frontend`: React + Vite client
- `backend`: Express + MongoDB API

## Backend setup

1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and update values
4. `npm run dev`

## Frontend setup

1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Core API endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/buses`
- `GET /api/buses/:id`
- `POST /api/buses` (admin only)
- `POST /api/bookings` (user token)
- `GET /api/bookings/mine` (user token)
- `GET /api/bookings/dashboard` (admin token)
"# Bus-Booking" 
