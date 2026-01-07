import TodoForm from '@/components/todo-form';
import Todo from '@/model/todo';

export default async function Home() {
  return (
    <div className="min-h-screen bg-background ">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Todo App</h1>
          <p className="text-lg text-muted-foreground">
            Built with Next.js, Zustand, TanStack Query and Zod.
          </p>
        </header>
        <main className="text-center">
          <TodoForm />
        </main>
      </div>
      <footer className="text-center py-4 border-t mt-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Todo App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
