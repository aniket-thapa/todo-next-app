import { Button } from '@/components/ui/button';
import connectDB from '@/lib/db';

export default async function Home() {
  await connectDB();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button>Hello Button</Button>
    </div>
  );
}
