
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mergedStudentData } from '@/lib/student-data';
import Image from 'next/image';
import { branchCodeMapping } from '@/lib/course-data';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [scholarId, setScholarId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!scholarId || !password) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Scholar ID and Password cannot be empty.',
      });
      setLoading(false);
      return;
    }
    
    if (scholarId !== password) {
       toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid credentials. Password must be the same as the Scholar ID.',
      });
      setLoading(false);
      return;
    }

    const student = mergedStudentData.find(s => s.scholarId === scholarId);

    if (!student) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid Scholar ID. Please check your credentials.',
      });
      setLoading(false);
      return;
    }

    const admissionYear = parseInt(scholarId.substring(0, 2), 10);
    let branchCode;
    // For scholarId format YYBBRRR (e.g., 2212345)
    if (scholarId.length === 7) {
        branchCode = parseInt(scholarId.substring(2, 4), 10);
    } else {
        // Fallback or other formats
        branchCode = parseInt(scholarId.substring(2, 4), 10); // Example: 22-1-2345
    }
    
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    let yearDiff = currentYear - admissionYear;
    let semester;

    // Odd semester months: July-December (7-12)
    if (currentMonth >= 7 && currentMonth <= 12) {
      semester = yearDiff * 2 + 1;
    } else { // Even semester months: January-June (1-6)
      semester = yearDiff * 2;
    }
    
    if (semester > 8) semester = 8;
    if (semester <= 0) semester = 1;
    
    const branchKey = Object.keys(branchCodeMapping).find(
      (key) => parseInt(key) === branchCode
    );
    const branch = branchKey ? branchCodeMapping[branchKey as keyof typeof branchCodeMapping] : 'Unknown';

    const userProfile = {
      scholarId: student.scholarId,
      name: student.name,
      branch: branch,
      semester: semester.toString(),
      sgpa: student.sgpa || 'N/A',
      cgpa: student.cgpa || 'N/A',
    };

    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    setTimeout(() => {
      toast({
        title: 'Login Successful',
        description: `Welcome, ${student.name}!`,
      });
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Image src="/icon.jpg" alt="infiNITS Logo" width={32} height={32} className="h-8 w-8 text-primary" />
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
                    placeholder="Should be same as Scholar ID"
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
