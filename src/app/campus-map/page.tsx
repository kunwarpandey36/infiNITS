import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CampusMapPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        Campus Map
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">NIT Silchar Campus</CardTitle>
          <CardDescription>A visual guide to navigate the campus.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[60vh] rounded-lg overflow-hidden border">
             <Image
                src="https://placehold.co/1200x800.png"
                alt="Campus Map"
                layout="fill"
                objectFit="cover"
                data-ai-hint="college campus map"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
