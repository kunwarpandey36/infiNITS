'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const clubs = [
  {
    name: 'Illuminati',
    category: 'Technical',
    description: 'The official quizzing club of NIT Silchar, organizing quizzes on various topics.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'quiz club'
  },
  {
    name: 'Robotics Club',
    category: 'Technical',
    description: 'A hub for robotics enthusiasts to learn, build, and compete.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'robotics students'
  },
  {
    name: 'E-Cell',
    category: 'Entrepreneurship',
    description: 'Fostering the spirit of entrepreneurship among students.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'startup meeting'
  },
  {
    name: 'Dramatics Club',
    category: 'Cultural',
    description: 'The stage for all aspiring actors and playwrights on campus.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'theater stage'
  },
  {
    name: 'V-Zone',
    category: 'Cultural',
    description: 'The official dance club, covering all forms from classical to hip-hop.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'dance group'
  },
  {
    name: 'Pixonoids',
    category: 'Creative',
    description: 'The photography club, capturing moments and teaching the art of the lens.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'camera lens'
  },
];

export default function ClubsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Student Clubs
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <Card key={club.name} className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative w-full h-48">
              <Image src={club.image} alt={club.name} layout="fill" objectFit="cover" data-ai-hint={club.aiHint} />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline">{club.name}</CardTitle>
                <Badge>{club.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{club.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
