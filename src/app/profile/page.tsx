'use client';

import { useEffect, useState } from 'react';
import { useStudentData } from '@/hooks/use-student-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UpcomingEvents from '@/components/upcoming-events';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Instagram, AlertTriangle, Linkedin } from 'lucide-react';
import TodaysMenu from '@/components/todays-menu';
import TodaysTimetable from '@/components/todays-timetable';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface Subject {
  id: string;
  name: string;
  code: string;
  total: number;
  attended: number;
}

export default function ProfilePage() {
  const student = useStudentData();
  const router = useRouter();
  const [overallAttendance, setOverallAttendance] = useState(0);

  useEffect(() => {
    if (student) {
        const key = `attendance-${student?.scholarId}-${student.semester}-${student.branch}`;
        const storedData = localStorage.getItem(key);
        if (storedData) {
            const subjects: Subject[] = JSON.parse(storedData);
            const totalClasses = subjects.reduce((acc, s) => acc + s.total, 0);
            const attendedClasses = subjects.reduce((acc, s) => acc + s.attended, 0);
            const percentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;
            setOverallAttendance(percentage);
        }
    }
  }, [student]);


  if (!student) {
    return <div className="container mx-auto p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
        <div className="flex items-center gap-4 mb-2">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Your Profile</h1>
        </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-center gap-6 space-y-0">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/teddy profilkepicture.jpeg" alt={student.name ? `${student.name} ji` : 'Student'} data-ai-hint="profile picture" />
            <AvatarFallback>{student.name ? student.name.charAt(0) : 'U'}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <CardTitle className="font-headline text-3xl">{student.name ? `${student.name} ji` : 'Student'}</CardTitle>
            <CardDescription className="text-lg">Scholar ID: {student.scholarId}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <Card className="p-4">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Branch</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className="text-2xl font-bold">{student.branch}</p>
                    </CardContent>
                </Card>
                 <Card className="p-4">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Semester</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className="text-2xl font-bold">{student.semester}</p>
                    </CardContent>
                </Card>
                 <Card className="p-4">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Overall Attendance</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className={`text-2xl font-bold ${overallAttendance < 75 ? 'text-destructive' : 'text-green-500'}`}>{overallAttendance > 0 ? `${overallAttendance}%` : 'N/A'}</p>
                    </CardContent>
                </Card>
                 <Card className="p-4">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Previous Sem SGPA</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className="text-2xl font-bold">{student.sgpa || 'N/A'}</p>
                    </CardContent>
                </Card>
                 <Card className="p-4">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Previous SGPA</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className="text-2xl font-bold">{student.sgpa_prev || 'N/A'}</p>
                    </CardContent>
                </Card>
                 <Card className="p-4">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Current SGPA</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className="text-2xl font-bold">{student.sgpa_curr || 'N/A'}</p>
                    </CardContent>
                </Card>
                 <Card className="p-4">
                    <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Overall CGPA</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className="text-2xl font-bold">{student.cgpa || 'N/A'}</p>
                    </CardContent>
                </Card>
            </div>
        </CardContent>
        <CardFooter>
          <Alert variant="destructive" className="w-full">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
              The SGPA and CGPA data shown here is based on unofficial sources and may not be accurate. Please confirm with the official results.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TodaysTimetable />
        </div>
        <div className="space-y-6">
          <UpcomingEvents />
          <TodaysMenu />
        </div>
      </div>
      
       <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Instagram className="text-pink-500"/>Follow NITS Official</CardTitle>
            </CardHeader>
            <CardContent>
                <Link href="https://www.instagram.com/nitsilchar_/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                        Follow the official page of NIT Silchar
                    </Button>
                </Link>
            </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>Built with ❤️ by Kunwar Pandey</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://www.linkedin.com/in/kunwarpandey36/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/kunwarpandey36" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
    </div>
  );
}
