'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [scholarId, setScholarId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!scholarId || !password) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Scholar ID and Password cannot be empty.',
      });
      setLoading(false);
      return;
    }
    
    // As per instruction, password is the same as scholar ID
    if (scholarId !== password) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid credentials. Please check your Scholar ID and Password.',
      });
      setLoading(false);
      return;
    }

    // Simulate network request
    setTimeout(() => {
      // On successful login, redirect to dashboard
      toast({
        title: 'Login Successful',
        description: `Welcome, ${scholarId}!`,
      });
      router.push('/');
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline">
                Infini<span className="text-primary">TS</span>
            </h1>
          </div>
          <CardTitle className="font-headline">Welcome Back!</CardTitle>
          <CardDescription>Enter your Scholar ID to log in to your account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="scholarId">Scholar ID</Label>
                <Input 
                    id="scholarId" 
                    placeholder="e.g. 2211001" 
                    required 
                    value={scholarId}
                    onChange={(e) => setScholarId(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            </CardContent>
            <CardFooter>
            <Button className="w-full" type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Log In
            </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
