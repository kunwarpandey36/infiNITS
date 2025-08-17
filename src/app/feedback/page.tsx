
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Mail, ArrowLeft, Heart, UserCircle, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const developers = [
    { name: 'Kunwar', email: "ku36pd@gmail.com" },
    { name: 'Kavish', email: 'kavishsharma5656@gmail.com' },
    { name: 'Lalith', email: 'lalithgunnu2202@gmail.com' },
    { name: 'Rahul', email: 'iclapcheekz69@gmail.com' },
    { name: 'Akshay', email: 'akshwebteam@gmail.com' },
    { name: 'Chaitainya', email: 'chaitanyamahajan06@gmail.com' },
];

export default function FeedbackPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [problem, setProblem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Feedback from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nProblem:\n${problem}`;
    window.location.href = `mailto:infinitsilchar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

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
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Send us your Feedback</CardTitle>
                <CardDescription>
                    For any feedback, suggestions, or issues, please fill out the form below.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input id="email" type="email" placeholder="Your Email for mailback" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="problem">Problem/Suggestion</Label>
                        <Textarea id="problem" placeholder="Describe the issue or your suggestion" value={problem} onChange={(e) => setProblem(e.target.value)} required />
                    </div>
                    <Button type="submit" className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Send Feedback
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                 <p className="text-xs text-muted-foreground">Alternatively, you can email us directly at <a href="mailto:infinitsilchar@gmail.com" className="text-primary">infinitsilchar@gmail.com</a>.</p>
            </CardFooter>
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
