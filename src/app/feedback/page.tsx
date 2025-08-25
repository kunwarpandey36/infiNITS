
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, ArrowLeft, Heart, UserCircle, Linkedin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const developers = [
    { name: 'Akshay', email: 'akshwebteam@gmail.com', linkedin: 'https://www.linkedin.com/in/akshay-singh-1a65b1322/' },
    { name: 'Chaitainya', email: 'chaitanyamahajan06@gmail.com', linkedin: 'https://www.linkedin.com/in/chaitanya-mahajan-3055101bb/' },
    { name: 'Kavish', email: 'kavishsharma5656@gmail.com', linkedin: 'https://www.linkedin.com/in/kavish-sharma-724168314?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: 'Kunwar', email: "ku36pd@gmail.com", linkedin: 'https://www.linkedin.com/in/kunwarpandey36/' },  
    { name: 'Lalith', email: 'lalithgunnu2202@gmail.com', linkedin: 'https://www.linkedin.com/in/lalithgunnu/' },
    { name: 'Rahul', email: 'iclapcheekz69@gmail.com', linkedin: 'https://www.linkedin.com/in/rahul-agrahari-749392321/' }
];

export default function FeedbackPage() {
  const router = useRouter();
  const formEmbedUrl = "https://docs.google.com/forms/d/e/1FAIpQLSes6hAXebiEzjEhvDmqW7wuDzwbuOZRjXk3B-IXcv3dzsCyhg/viewform?embedded=true";

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
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline">Send us your Feedback</CardTitle>
                <CardDescription>
                    For any feedback, suggestions, or issues, please fill out the form below.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <iframe
                    src={formEmbedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    className="min-h-[500px] rounded-md"
                    title="Feedback Form"
                >
                    Loading…
                </iframe>
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
                        <div className="flex items-center justify-between">
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
                            {dev.linkedin && dev.linkedin !== '#' && (
                                <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="icon">
                                        <Linkedin className="h-5 w-5 text-primary"/>
                                    </Button>
                                </a>
                            )}
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
