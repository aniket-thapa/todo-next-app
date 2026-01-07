import { createTodo, getTodos } from '@/actions/todo-actions';
import { useTodoStore } from '@/store/todo-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const todoKeys = {
  all: ['todo'],
  lists: () => [...todoKeys.all, 'list'],
};

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const addTodo = useTodoStore((state) => state.addTodo);

  return useMutation({
    mutationFn: (data) => createTodo(data),
    onSuccess: (result) => {
      if (result.success) {
        console.log('Todo created:', result.data);
        // addTodo(result.data);
        queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
      }
    },
  });
}

export function useTodo() {
  const { setTodos } = useTodoStore();
  // const setTodos = useTodoStore((state) => state.setTodos); // Other way to get setTodos

  return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: async () => {
      const result = await getTodos();
      console.log('Fetched todos:', result);
      if (result.success) {
        // Update the Zustand store with fetched todos
        setTodos(result.data);
        return result.data;
      }
      throw new Error(result.error || 'Failed to fetch todos');
    },
  });
}
