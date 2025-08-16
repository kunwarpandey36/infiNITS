
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Mail, ArrowLeft, Heart, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const developers = [
    { name: 'Kunwar', email: "ku36pd@gmail.com" },
    { name: 'Kavish', email: 'kavish_ug_24@ei.nits.ac.in' },
    { name: 'Lalith', email: 'lalith_ug_24@ei.nits.ac.in' },
    { name: 'Rahul', email: 'iclapcheekz69@gmail.com' },
    { name: 'Akshay', email: 'akshwebteam@gmail.com' },
    { name: 'Chaitainya', email: 'chaitainya_ug_24@ei.nits.ac.in' },
];

export default function FeedbackPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Feedback & Development Team
        </h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="flex flex-col items-center justify-center text-center p-10">
            <CardHeader>
            <Mail className="h-16 w-16 mx-auto text-primary" />
            <CardTitle className="font-headline mt-4">We'd love to hear from you</CardTitle>
            </CardHeader>
            <CardContent>
            <CardDescription>
                For any feedback, suggestions, or issues, please reach out to the development team or use the general contact email.
            </CardDescription>
            <a href="mailto:help@infinites.space" className="mt-4 inline-block text-primary font-semibold hover:underline">
                help@infinites.space
            </a>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Meet the Developers</CardTitle>
                <CardDescription>This project was brought to you by a passionate team from the EI branch.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {developers.map((dev, index) => (
                    <div key={dev.name}>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={`https://placehold.co/100x100.png?text=${dev.name.charAt(0)}`} alt={dev.name} data-ai-hint="developer avatar" />
                                <AvatarFallback>{dev.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{dev.name}</p>
                                {dev.email ? (
                                     <a href={`mailto:${dev.email}`} className="text-sm text-primary hover:underline">
                                        {dev.email}
                                    </a>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Contact info not available</p>
                                )}
                            </div>
                        </div>
                        {index < developers.length - 1 && <Separator className="my-4" />}
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
       <div className="mt-8 text-center text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-5 w-5 text-red-500" /> for the NITS.
        </div>
    </div>
  );
}
