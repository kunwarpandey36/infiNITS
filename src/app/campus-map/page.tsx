'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CampusMapPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Campus Map
        </h1>
      </div>
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
