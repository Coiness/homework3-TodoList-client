import { useState, useEffect, useCallback } from 'react';
import type { Todo } from '@/types/todo';
import { todoApi } from '@/services/todoApi';
import { TodoItem } from './TodoItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, RefreshCw } from 'lucide-react';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.getAllTodos();
      setTodos(data);
    } catch {
      setError('Failed to load todos. Please check if the API server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Create a new todo
  const handleCreate = async () => {
    if (!newTodoTitle.trim()) return;

    try {
      setError(null);
      const newTodo = await todoApi.createTodo({ title: newTodoTitle.trim() });
      setTodos((prev) => [...prev, newTodo]);
      setNewTodoTitle('');
    } catch {
      setError('Failed to create todo.');
    }
  };

  // Toggle todo completed status
  const handleToggle = async (id: number, completed: boolean) => {
    try {
      setError(null);
      const updatedTodo = await todoApi.toggleTodo(id, completed);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch {
      setError('Failed to update todo.');
    }
  };

  // Update todo title
  const handleUpdate = async (id: number, title: string) => {
    try {
      setError(null);
      const updatedTodo = await todoApi.updateTodo(id, { title });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch {
      setError('Failed to update todo.');
    }
  };

  // Delete a todo
  const handleDelete = async (id: number) => {
    try {
      setError(null);
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch {
      setError('Failed to delete todo.');
    }
  };

  // Handle enter key press to create todo
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreate();
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
        <CardTitle className="text-2xl font-bold text-center">
          📝 Todo List
        </CardTitle>
        <p className="text-center text-blue-100 text-sm">
          {totalCount > 0
            ? `${completedCount} of ${totalCount} tasks completed`
            : 'No tasks yet'}
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Add new todo */}
        <div className="flex gap-2">
          <Input
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleCreate} disabled={!newTodoTitle.trim()}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
          <Button variant="outline" onClick={fetchTodos} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && todos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
            Loading todos...
          </div>
        )}

        {/* Empty state */}
        {!loading && todos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-4xl mb-2">📋</p>
            <p>No todos yet. Add one above!</p>
          </div>
        )}

        {/* Todo list */}
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
