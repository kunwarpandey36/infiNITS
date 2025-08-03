import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export default function PlacementsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        Placement Stats
      </h1>
      <Card className="flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
        <CardHeader>
          <TrendingUp className="h-16 w-16 mx-auto text-primary" />
          <CardTitle className="font-headline mt-4">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Detailed placement statistics, company lists, and package details will be available here soon.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
