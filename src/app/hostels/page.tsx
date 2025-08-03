import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Home } from 'lucide-react';

export default function HostelsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        Hostels
      </h1>
      <Card className="flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
        <CardHeader>
          <Home className="h-16 w-16 mx-auto text-primary" />
          <CardTitle className="font-headline mt-4">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Information about all the hostels, facilities, and contact details will be available here soon.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
