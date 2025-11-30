import type { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo';

// Base URL for the API - can be configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

class TodoApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Get all todos
  async getAllTodos(): Promise<Todo[]> {
    const response = await fetch(`${this.baseUrl}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  }

  // Get a single todo by id
  async getTodoById(id: number): Promise<Todo> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch todo with id ${id}`);
    }
    return response.json();
  }

  // Create a new todo
  async createTodo(input: CreateTodoInput): Promise<Todo> {
    const response = await fetch(`${this.baseUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return response.json();
  }

  // Update an existing todo
  async updateTodo(id: number, input: UpdateTodoInput): Promise<Todo> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      throw new Error(`Failed to update todo with id ${id}`);
    }
    return response.json();
  }

  // Delete a todo
  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete todo with id ${id}`);
    }
  }

  // Toggle todo completed status
  async toggleTodo(id: number, completed: boolean): Promise<Todo> {
    return this.updateTodo(id, { completed });
  }
}

// Export a singleton instance
export const todoApi = new TodoApiService(API_BASE_URL);
