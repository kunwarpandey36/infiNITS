
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Pin, ArrowLeft, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const events = [
  {
    title: 'Incandescence',
    date: 'February 15-18, 2025',
    location: 'NIT Silchar Campus',
    description: 'The annual cultural festival of NIT Silchar, with concerts, competitions, and celebrity nights.',
    organizer: 'Gymkhana Union Body',
    type: 'Festival'
  },
  {
    title: 'Tecnoesis',
    date: 'October 28-31, 2024',
    location: 'New Gallery',
    description: 'The annual techno-management festival, featuring workshops, competitions, and guest lectures.',
    organizer: 'Technical Board',
    type: 'Festival'
  },
  {
    title: 'UpStart Pitching Event',
    date: 'September 20, 2024',
    location: 'SAC',
    description: 'An opportunity for budding entrepreneurs to pitch their ideas to investors and mentors.',
    organizer: 'E-Cell',
    type: 'Competition'
  },
  {
    title: 'Robotics Workshop',
    date: 'November 05, 2024',
    location: 'Robotics Lab',
    description: 'A hands-on workshop on building and programming autonomous bots.',
    organizer: 'Robotics Club',
    type: 'Workshop'
  },
];

export default function EventsPage() {
  const router = useRouter();
  
  return (
    <div className="container mx-auto p-4 md:p-8">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Upcoming Events
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.title} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline">{event.title}</CardTitle>
                <Badge variant="secondary">{event.type}</Badge>
              </div>
              <CardDescription>{event.organizer}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{event.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Pin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card className="mt-8 bg-secondary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center font-headline"><Info className="h-4 w-4 mr-2"/>Note for Clubs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            All club executives are requested to mail their upcoming event details to <a href="mailto:infinitsilchar@gmail.com" className="text-primary hover:underline">infinitsilchar@gmail.com</a> to have them featured on this page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
