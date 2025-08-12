
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function FeedbackPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Feedback
        </h1>
      </div>
      <Card className="flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
        <CardHeader>
          <Mail className="h-16 w-16 mx-auto text-primary" />
          <CardTitle className="font-headline mt-4">We'd love to hear from you</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            For any feedback, suggestions, or issues, please reach out to us.
          </CardDescription>
          <a href="mailto:help@infinites.space" className="mt-4 inline-block text-primary font-semibold hover:underline">
            help@infinites.space
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
