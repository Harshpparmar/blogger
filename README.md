# Blog Application

A full-stack blog application with React frontend and Node.js/Express backend using Prisma ORM.

## Project Structure

```
blogger/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── api/           # API integration (auth, posts)
│   │   ├── components/    # Reusable React components
│   │   ├── contexts/      # Auth & Theme context
│   │   ├── hooks/         # Custom hooks (useAuth, useTheme)
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json
│
└── server/                # Node.js/Express backend
    ├── src/
    │   ├── controllers/   # Route handlers
    │   ├── middleware/    # Auth middleware
    │   ├── routes/        # API routes
    │   ├── lib/           # Prisma client
    │   └── utils/         # Helper utilities
    ├── prisma/            # Database schema & migrations
    └── package.json
```

## Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL (or your configured database)

## Installation

### 1. Install Frontend Dependencies

```bash
cd client
npm install
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Setup Environment Variables

Create `.env` files in both `client/` and `server/` directories:

**client/.env:**
```
VITE_API_URL=http://localhost:5000
```

**server/.env:**
```
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Database Setup

```bash
cd server
npx prisma migrate dev
```

## Running the Application

### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173` and backend at `http://localhost:5000`

### Production Build

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

## Features

- 📝 Create, read, update, and delete blog posts
- 🔐 User authentication (JWT-based)
- 🎨 Dark/Light theme toggle
- 📱 Responsive design with Tailwind CSS
- ✏️ Markdown editor for blog posts
- 🛡️ Protected routes for authenticated users
- 📊 Admin dashboard for post management

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- Context API for state management

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT for authentication

## Available Scripts

### Frontend (client/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend (server/)
- `npm run dev` - Start development server
- `npm start` - Start production server
- `npx prisma migrate dev` - Run migrations
- `npx prisma generate` - Generate Prisma client