import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail } from 'lucide-react';

export default function FeedbackPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        Feedback
      </h1>
      <Card className="flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
        <CardHeader>
          <Mail className="h-16 w-16 mx-auto text-primary" />
          <CardTitle className="font-headline mt-4">We'd love to hear from you</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            For any feedback, suggestions, or issues, please reach out to us. A dedicated form will be available here soon.
          </CardDescription>
          <a href="mailto:help@infinites.space" className="mt-4 inline-block text-primary font-semibold hover:underline">
            help@infinites.space
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
