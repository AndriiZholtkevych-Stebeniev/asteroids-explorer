#  Asteroid Tracker

A web application that tracks Near-Earth Objects (NEOs) using NASA's NeoWs API. Built with React + TypeScript on the frontend and Node.js + Express on the backend.

##  Live Demo

[Live Demo](https://asteroids-explorer.vercel.app)

##  Features

- Search asteroids by date range (up to 7 days)
- Filter potentially hazardous asteroids
- Interactive scatter chart — velocity vs date
- Sortable table with search by name
- Detailed modal for each asteroid
- URL-based state — shareable links that preserve search params

##  Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Recharts, Axios, React Router

**Backend:** Node.js, Express, Axios, dotenv

##  Project Structure
asteroids-explorer/

├── frontend/

│   └── src/

│       ├── api/

│       ├── components/

│       ├── hooks/

│       └── types/

├── backend/

│   └── src/

│       ├── controllers/

│       ├── routes/

│       └── services/

└── README.md

##  Setup & Installation

### Prerequisites
- Node.js v18+
- NASA API key from [https://api.nasa.gov/](https://api.nasa.gov/)

### Backend
```bash
cd backend
npm install
```

Create `.env` file in `backend/`: NASA_API_KEY=your_api_key_here

```bash
npm run dev
```

Backend runs on `http://localhost:3000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/asteroids/feed?start_date=&end_date=` | Get asteroids for date range |
| GET | `/api/asteroids/:id` | Get asteroid details by ID |

##  How to Use

1. Select a start and end date (max 7 days range)
2. Click **Search**
3. Toggle **Show only potentially hazardous** to filter dangerous asteroids
4. Click any column header to sort the table
5. Use the search box to filter by asteroid name
6. Click any row to see detailed information