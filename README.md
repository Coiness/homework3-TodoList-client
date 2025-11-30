# TodoList Client

A simple React 18 TodoList frontend application with CRUD operations, built with Vite, Tailwind CSS, and shadcn/ui.

## Features

- ✅ Create, Read, Update, Delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Inline editing of todo titles
- ✅ Clean and modern UI with Tailwind CSS and shadcn/ui
- ✅ API integration for backend communication

## Tech Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## API Configuration

By default, the app connects to `http://localhost:3000` for the backend API. You can configure this by setting the `VITE_API_BASE_URL` environment variable:

```bash
# Create a .env file
echo "VITE_API_BASE_URL=http://your-api-server.com" > .env
```

## API Endpoints

The frontend expects the following API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/:id` | Get a single todo |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

### Todo Object Structure

```json
{
  "id": 1,
  "title": "Learn React",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## Project Structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   └── input.tsx
│   ├── TodoItem.tsx # Single todo item component
│   └── TodoList.tsx # Main todo list component
├── lib/
│   └── utils.ts     # Utility functions
├── services/
│   └── todoApi.ts   # API service for backend communication
├── types/
│   └── todo.ts      # TypeScript types
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles with Tailwind
```
