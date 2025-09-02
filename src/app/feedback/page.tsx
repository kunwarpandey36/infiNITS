
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mail, ArrowLeft, Heart, Phone, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';


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
          Feedback
        </h1>
      </div>

      <Alert className="mb-8">
        <Info className="h-4 w-4" />
        <AlertTitle className="font-headline">Under Development</AlertTitle>
        <AlertDescription>
          This website is still in the development phase. Any error in the data or misinformation is highly regretted. Please inform us regarding any issues using the anonymous feedback form below.
        </AlertDescription>
      </Alert>

      <Alert className="mb-8">
        <Info className="h-4 w-4" />
        <AlertTitle className="font-headline">Security Statement.</AlertTitle>
        <AlertDescription>
        We haven't implemented password security yet, but we will add it soon. This is a trial rollout.
        </AlertDescription>
      </Alert>
      
      <div className="grid gap-8">
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
                <CardTitle className="font-headline">Contact Details</CardTitle>
                <CardDescription>If you spot any mistakes or have urgent issues, feel free to reach out directly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href="https://wa.me/918318849893" className="text-sm text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        +91 8318849893 (WA)
                    </a>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:infinitsilchar@gmail.com" className="text-sm text-primary hover:underline">
                        infinitsilchar@gmail.com
                    </a>
                </div>
            </CardContent>
        </Card>
      </div>

       <div className="mt-8 text-center text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-5 w-5 text-red-500" /> for NITS.
        </div>
    </div>
  );
}
