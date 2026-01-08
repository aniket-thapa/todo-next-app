'use client';

import React from 'react';
import { useTodoStore } from '@/store/todo-store';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const TodoFilter = () => {
  const { filter, setFilter, completedCount, activeCount } = useTodoStore();

  const filterOptions = [
    {
      key: 'all',
      label: 'All',
      count: activeCount() + completedCount(),
    },
    { key: 'active', label: 'Active', count: activeCount() },
    {
      key: 'completed',
      label: 'Completed',
      count: completedCount(),
    },
  ];

  return (
    <Card className="mb-6">
      <CardContent className="px-4 py-1.5">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {filterOptions.map((option) => (
              <Button
                key={option.key}
                variant={filter === option.key ? 'default' : 'outline'}
                onClick={() => setFilter(option.key)}
                className="relative cursor-pointer"
              >
                {option.label}
                {option.count > 0 && (
                  <span className="ml-0.5 bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                    {option.count}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoFilter;
