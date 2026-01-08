import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useTodoStore = create(
  devtools(
    (set, get) => ({
      todos: [],
      filter: 'all',
      isLoading: false,

      setTodos: (todos) => set({ todos }),
      addTodo: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),

      updateTodo: (id, updatedFields) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo._id === id ? { ...todo, ...updatedFields } : todo
          ),
        })),

      setFilter: (filter) => set({ filter }),
      setLoading: (isLoading) => set({ isLoading }),

      filteredTodos: () => {
        const { todos, filter } = get();
        switch (filter) {
          case 'completed':
            return todos.filter((todo) => todo.completed);
          case 'active':
            return todos.filter((todo) => !todo.completed);
          default:
            return todos;
        }
      },

      completedCount: () => {
        const { todos } = get();
        return todos.filter((todo) => todo.completed).length;
      },

      activeCount: () => {
        const { todos } = get();
        return todos.filter((todo) => !todo.completed).length;
      },
    }),

    {
      name: 'todo-store',
    }
  )
);
