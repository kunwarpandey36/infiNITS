'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { filterUpcomingEvents } from '@/ai/flows/filter-upcoming-events';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  scholarId: z
    .string()
    .min(7, { message: 'Scholar ID is typically 7 digits.' }),
  branch: z.string().min(2, { message: 'Please enter your branch.' }),
  interests: z.string().min(3, { message: 'Tell us your interests.' }),
});

const upcomingEvents = [
  "Robotics workshop by Illuxions Club",
  "Guest lecture on Quantum Computing for CSE students",
  "Annual Civil Engineering Conclave 'CEOCON'",
  "E-Cell's flagship startup pitching event 'UpStart'",
  "Dramatics Club annual play 'The Tempest'",
  "Mechanical Engineering project exhibition 'MECHNOVATE'",
  "Dance competition 'Razzmatazz' by V-Zone club",
  "Talk on Machine Learning applications by a Google Engineer",
  "Photography exhibition by Pixonoids club"
];

export default function WhatToDo() {
  const [loading, setLoading] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      scholarId: '',
      branch: '',
      interests: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setFilteredEvents(null);
    try {
      const result = await filterUpcomingEvents({
        studentProfile: {
          scholarId: values.scholarId,
          branch: values.branch,
          interests: values.interests,
        },
        upcomingEvents: upcomingEvents,
      });
      setFilteredEvents(result.filteredEvents);
    } catch (e) {
      setError('Failed to get recommendations. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Wand2 className="text-primary" /> What To Do?
        </CardTitle>
        <CardDescription>
          Get personalized recommendations for upcoming events in the next 30 days based on your profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scholarId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scholar ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2211001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. CSE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. AI, startups, drama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Recommendations
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {filteredEvents && (
          <Alert>
            <AlertTitle className="font-headline">
              Here are some events you might like!
            </AlertTitle>
            <AlertDescription>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => (
                    <li key={index}>{event}</li>
                  ))
                ) : (
                  <li>No specific events match your profile right now. Check back later!</li>
                )}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
