# MindBloom - Mental Health Journal Application

A web application for tracking and analyzing emotional states through personal journal entries and receiving personalized recommendations for maintaining mental well-being.

## Project Structure

```
mindbloom/
├── client/           # Frontend React application
└── server/           # Backend Node.js application
    ├── src/
    │   ├── config/      # Configuration files
    │   ├── middleware/  # Express middleware
    │   ├── models/      # Database models
    │   ├── routes/      # API routes
    │   └── server.js    # Main application file
    └── package.json
```

## Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following content:
```env
PORT=3000
DB_NAME=mindbloom
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
JWT_SECRET=your-super-secret-key-change-this-in-production
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
  - Body: `{ username, email, password }`
- `POST /auth/login` - Login and get JWT token
  - Body: `{ email, password }`

### Journal Entries
- `GET /entries` - Get journal entries (with filtering and pagination)
  - Query params: `mood`, `date`, `page`, `pageSize`
- `POST /entries` - Create a new journal entry
  - Body: `{ mood, note, trigger, entryDate }`

### Recommendations
- `GET /recommendations` - Get recommendations based on mood
  - Query params: `mood`, `type`

## Frontend

The frontend application will be developed using React and will be located in the `client` directory. 