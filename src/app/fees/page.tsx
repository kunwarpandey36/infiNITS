import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Banknote } from 'lucide-react';

export default function FeesPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        Institute Fees
      </h1>
      <Card className="flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
        <CardHeader>
          <Banknote className="h-16 w-16 mx-auto text-primary" />
          <CardTitle className="font-headline mt-4">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            The detailed fee structure for different semesters and categories will be available here soon.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
