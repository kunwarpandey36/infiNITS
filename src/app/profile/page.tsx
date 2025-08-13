
'use client';

import { useEffect, useState } from 'react';
import { useStudentData } from '@/hooks/use-student-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UpcomingEvents from '@/components/upcoming-events';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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
            <AvatarImage src="https://placehold.co/100x100.png" alt={student.name} />
            <AvatarFallback>{student.name ? student.name.charAt(0) : 'U'}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <CardTitle className="font-headline text-3xl">{student.name || 'Student'}</CardTitle>
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
                        <CardTitle className="text-sm font-medium text-muted-foreground">Current SGPA</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className="text-2xl font-bold">{student.sgpa || 'N/A'}</p>
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
      </Card>
      
      <UpcomingEvents />

    </div>
  );
}

    