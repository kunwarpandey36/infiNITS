import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export default function TimetablePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        Timetable
      </h1>
      <Card className="flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
        <CardHeader>
          <Clock className="h-16 w-16 mx-auto text-primary" />
          <CardTitle className="font-headline mt-4">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            A feature to view and manage your class timetable will be available here soon.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
