'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const societies = [
  {
    name: 'Green-NITS',
    category: 'Social',
    description: 'A society dedicated to promoting environmental awareness and sustainability on campus.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'green nature'
  },
  {
    name: 'NITS MUN',
    category: 'Debate',
    description: 'Model United Nations society, for those interested in diplomacy and international relations.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'united nations'
  },
  {
    name: 'NSS',
    category: 'Social Service',
    description: 'National Service Scheme chapter, engaging in community service and social welfare activities.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'community service'
  },
  {
      name: 'ISTE',
      category: 'Technical',
      description: 'Indian Society for Technical Education student chapter, organizing technical events and workshops.',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'technical conference'
  }
];

export default function SocietiesPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Student Societies
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {societies.map((society) => (
          <Card key={society.name} className="overflow-hidden transition-all hover:shadow-lg">
             <div className="relative w-full h-48">
              <Image src={society.image} alt={society.name} layout="fill" objectFit="cover" data-ai-hint={society.aiHint} />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline">{society.name}</CardTitle>
                <Badge>{society.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{society.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
