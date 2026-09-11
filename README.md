# SMERGERS Clone - Business Matchmaking Platform

A modern web application inspired by SMERGERS.com, built with React (frontend) and Node.js/Express (backend).

## Features

- User authentication (registration, login)
- Role-based access control (Business Owner, Investor, Advisor, Franchise)
- Profile creation and management
- Business/franchise listing browsing
- Search and filtering capabilities
- Dashboard for users
- Responsive design

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
npm install --prefix client
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
```

### Running the Application

1. Start the backend server:
```bash
npm run dev
```
This will start the backend on `http://localhost:5000`

2. In a new terminal, start the frontend development server:
```bash
npm run dev --prefix client
```
This will start the frontend on `http://localhost:3000`

### Available Scripts

#### Backend (root directory)
- `npm run dev`: Start the backend in development mode with ts-node
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Start the compiled backend

#### Frontend (client directory)
- `npm run dev`: Start the frontend development server
- `npm run build`: Build the frontend for production

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login an existing user

## Project Structure

```
isoko/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React contexts (Auth)
│   │   ├── services/       # API service layers
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
├── src/                    # Backend Node.js application
│   ├── controllers/        # Request handlers
│   ├── routes/             # API route definitions
│   ├── middleware/         # Custom middleware
│   ├── services/           # Business logic services
│   ├── utils/              # Helper functions
│   └── config/             # Configuration files
└── package.json            # Root package.json (backend dependencies)
```

## Design Decisions

1. **TypeScript**: Used throughout for type safety and better developer experience.
2. **Modular Architecture**: Separated concerns into controllers, routes, services, etc.
3. **RESTful API**: Clean, predictable endpoints for frontend consumption.
4. **React Context**: For global state management (authentication).
5. **Tailwind CSS**: For rapid UI development with responsive design.

## Future Enhancements

- Implement real database (PostgreSQL) with TypeORM or Prisma
- Add real-time features with Socket.io for messaging
- Implement actual JWT authentication with refresh tokens
- Add payment processing for premium features
- Create admin dashboard for content moderation
- Add valuation tools and financial calculators
- Implement file upload for profile pictures and documents
- Add comprehensive testing (unit, integration, e2e)
- Dockerize the application for easy deployment

## License

ISC