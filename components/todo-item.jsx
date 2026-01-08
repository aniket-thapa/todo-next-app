'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToggleTodo } from '@/hooks/use-create-todo';
import { toast } from 'sonner';

const TodoItem = ({ todo }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleMutation = useToggleTodo();

  const handleToggle = async () => {
    try {
      const result = await toggleMutation.mutateAsync(todo._id);
      if (!result.success) {
        toast.error('Failed to toggle todo');
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
      toast.error('An error occurred while toggling the todo');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card
      className={cn(
        'transition-all duration-200 hover:shadow-md',
        todo.completed && 'opacity-75'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggle}
            className="mt-1 cursor-pointer"
            disabled={false}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3
                className={cn(
                  'font-medium text-sm',
                  todo.completed && 'line-through text-muted-foreground'
                )}
              >
                {todo.title}
              </h3>
              <Badge
                variant="secondary"
                className={cn('text-xs', getPriorityColor(todo.priority))}
              >
                {todo.priority}
              </Badge>
            </div>

            {todo.description && (
              <p
                className={cn(
                  'text-sm text-start text-muted-foreground mb-2',
                  todo.completed && 'line-through'
                )}
              >
                {todo.description}
              </p>
            )}

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>
                Created on: {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div>
            <Button
              variant="ghost"
              size="sm"
              disabled={false}
              onClick={() => {}}
              className={cn(
                'h-8,w-8 p-0',
                isDeleting && 'bg-destructive text-destructive-foreground'
              )}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
