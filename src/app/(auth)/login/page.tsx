'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Combobox } from '@/components/ui/combo-box';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [nit, setNit] = useState('national institute of technology, silchar');
  const [scholarId, setScholarId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nit, scholarId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An unexpected error occurred.');
      }

      localStorage.setItem('userProfile', JSON.stringify(data));
      
      toast({
        title: 'Login Successful',
        description: `Welcome, ${data.name}!`,
      });
      router.push('/dashboard');

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: "Invalid credentials",
      });
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <Image
        src="/photo_2025-08-20_23-53-37.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="blur-sm"
      />
      <div className="absolute inset-0 bg-black/50" />
      <Card className="w-full max-w-sm z-10 bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Image src="/icon.jpg" alt="infiNITS Logo" width={32} height={32} className="h-8 w-8 text-primary rounded-md" />
            <h1 className="text-2xl font-bold font-headline">
              infi<span className="text-primary">NITS</span>
            </h1>
          </div>
          <CardTitle className="font-headline">Welcome Back!</CardTitle>
          <CardDescription>Enter your Scholar ID to log in to your account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="nit">NIT</Label>
                <Combobox
                    value={nit}
                    onChange={(value) => setNit(value)}
                />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scholarId">Scholar ID</Label>
              <Input
                id="scholarId"
                placeholder="e.g. 2211001 or 25CS10001"
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
                placeholder="Should be same as Scholar ID"
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col">
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
