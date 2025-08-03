'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO, isPast } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const events: Record<string, { title: string; type: 'holiday' | 'exam' | 'event' }> = {
  '2025-07-21': { title: 'Semester Registration', type: 'event' },
  '2025-07-22': { title: 'Semester Registration', type: 'event' },
  '2025-07-23': { title: 'Semester Registration', type: 'event' },
  '2025-07-24': { title: 'First Day of Instructions', type: 'event' },
  '2025-07-30': { title: 'Late Registration (with fine) ends', type: 'event' },
  '2025-08-25': { title: 'First Monthly Attendance Report', type: 'event' },
  '2025-09-19': { title: 'Mid-Semester Examination Begins', type: 'exam' },
  '2025-09-28': { title: 'Mid-Semester Examination Ends', type: 'exam' },
  '2025-10-30': { title: 'Technoesis Begins', type: 'event' },
  '2025-11-02': { title: 'Technoesis Ends', type: 'event' },
  '2025-11-15': { title: '23rd Convocation (tentative)', type: 'event' },
  '2025-11-21': { title: 'End-Semester Lab Exams Begin', type: 'exam' },
  '2025-11-28': { title: 'Last Date of Instructions & End-Semester Lab Exams End', type: 'event' },
  '2025-12-01': { title: 'End-Semester Theory Examinations Begin', type: 'exam' },
  '2025-12-09': { title: 'End-Semester Theory Examinations End', type: 'exam' },
  '2025-12-15': { title: 'Winter Break for Students Begins', type: 'holiday' },
  '2025-12-23': { title: 'End-Semester Results Declaration', type: 'event' },
  '2026-01-04': { title: 'Winter Break for Students Ends', type: 'holiday' },
  '2026-01-05': { title: 'Even Semester Registration', type: 'event' },
  '2026-01-06': { title: 'Even Semester Registration', type: 'event' },
  '2026-01-07': { title: 'Even Semester Registration', type: 'event' },
  '2026-01-08': { title: 'First Day of Instructions', type: 'event' },
  '2026-01-16': { title: 'Late Registration (with fine) ends', type: 'event' },
  '2026-01-31': { title: 'First Monthly Attendance Report', type: 'event' },
  '2026-02-05': { title: 'Incandescence Begins', type: 'event' },
  '2026-02-08': { title: 'Incandescence Ends', type: 'event' },
  '2026-02-23': { title: 'Mid-Semester Examination (Theory) Begins', type: 'exam' },
  '2026-03-02': { title: 'Mid-Semester Examination (Theory) Ends', type: 'exam' },
  '2026-03-05': { title: 'Mid-Semester Project Evaluation', type: 'event' },
  '2026-04-24': { title: 'End-Semester Lab Exams Begin', type: 'exam' },
  '2026-05-01': { title: 'Last Date of Instructions & End-Semester Lab Exams End', type: 'event' },
  '2026-05-04': { title: 'End-Semester Theory Examinations Begin', type: 'exam' },
  '2026-05-12': { title: 'End-Semester Theory Examinations End', type: 'exam' },
  '2026-05-13': { title: 'Summer Break for Students Begins', type: 'holiday' },
  '2026-05-18': { title: 'End-Semester Project Completion', type: 'event' },
  '2026-05-29': { title: 'End-Semester Results Declaration', type: 'event' },
  '2026-07-12': { title: 'Summer Break for Students Ends', type: 'holiday' },
};

const sortedEvents = Object.entries(events).sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime());

const oddSemesterEvents = sortedEvents.filter(([date]) => new Date(date).getFullYear() === 2025);
const evenSemesterEvents = sortedEvents.filter(([date]) => new Date(date).getFullYear() === 2026);


export default function AcademicCalendarPage() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const EventItem = ({ date, event }: { date: string, event: { title: string; type: 'holiday' | 'exam' | 'event' }}) => {
    const eventIsPast = isClient ? isPast(parseISO(date)) : false;

    return (
      <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            {isClient && (
               <Badge variant={eventIsPast ? 'default' : 'destructive'} className={cn(eventIsPast ? "bg-green-500 hover:bg-green-500/80" : "bg-red-500 hover:bg-red-500/80", "w-20 justify-center")}>
                {eventIsPast ? 'Past' : 'Upcoming'}
              </Badge>
            )}
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-muted-foreground">{format(parseISO(date), 'MMMM d, yyyy')}</p>
            </div>
          </div>
          <Badge variant={event.type === 'exam' ? 'destructive' : event.type === 'holiday' ? 'default' : 'secondary'}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Academic Calendar
        </h1>
      </div>
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Odd Semester (2025)</CardTitle>
                <CardDescription>July 2025 - December 2025</CardDescription>
            </CardHeader>
            <CardContent>
                {oddSemesterEvents.map(([date, event], index) => (
                   <div key={date}>
                     <EventItem date={date} event={event} />
                     {index < oddSemesterEvents.length - 1 && <Separator />}
                   </div>
                ))}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Even Semester (2026)</CardTitle>
                <CardDescription>January 2026 - July 2026</CardDescription>
            </CardHeader>
            <CardContent>
                {evenSemesterEvents.map(([date, event], index) => (
                    <div key={date}>
                        <EventItem date={date} event={event} />
                        {index < evenSemesterEvents.length - 1 && <Separator />}
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
       <Card className="mt-8">
            <CardHeader>
                <CardTitle className="font-headline">Legend</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2"><Badge variant="destructive">Exam</Badge><span>Mid-semester and End-semester examinations.</span></div>
                <div className="flex items-center gap-2"><Badge variant="default">Holiday</Badge><span>Semester breaks and holidays.</span></div>
                <div className="flex items-center gap-2"><Badge variant="secondary">Event</Badge><span>Registrations, fests, and other college events.</span></div>
            </CardContent>
        </Card>
    </div>
  );
}
