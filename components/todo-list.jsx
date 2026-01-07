'use client';

import React from 'react';
import { useTodo } from '@/hooks/use-create-todo';
import { useTodoStore } from '@/store/todo-store';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Loader2 } from 'lucide-react';
import TodoItem from './todo-item';

const TodoList = () => {
  const { data: todos, isLoading, error } = useTodo();

  const filteredTodos = useTodoStore((state) => state.filteredTodos());

  if (isLoading) {
    return (
      // Create Card Loader
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Loading Todos...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Error Loading Todos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Failed to load todos: {error?.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Todos Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {todos?.length === 0
              ? 'You have no todos to display.'
              : 'No todos match the current filter.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
