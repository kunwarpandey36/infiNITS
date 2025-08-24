
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO, isPast } from 'date-fns';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

const allEvents: Record<string, { title: string; type: 'holiday' | 'exam' | 'event' }> = {
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


export default function UpcomingEvents() {
    const [upcomingEvents, setUpcomingEvents] = useState<{date: string, title: string, type: 'holiday' | 'exam' | 'event'}[]>([]);

    useEffect(() => {
        const filtered = Object.entries(allEvents)
            .map(([date, event]) => ({ date, ...event }))
            .filter(event => !isPast(parseISO(event.date)))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5);
        setUpcomingEvents(filtered);
    }, []);


    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Bell className="text-primary" /> Upcoming Events
                </CardTitle>
                <CardDescription>
                    Here are the next few events from the academic calendar.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {upcomingEvents.length > 0 ? (
                    <ul className="space-y-3">
                        {upcomingEvents.map((event) => (
                            <li key={event.date} className="flex items-center justify-between p-3 bg-muted rounded-md">
                                <div>
                                    <p className="font-semibold">{event.title}</p>
                                    <p className="text-sm text-muted-foreground">{format(parseISO(event.date), 'MMMM d, yyyy')}</p>
                                </div>
                                <Badge variant={event.type === 'exam' ? 'destructive' : event.type === 'holiday' ? 'default' : 'secondary'}>
                                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-10 text-muted-foreground">
                        <p>No upcoming events found in the academic calendar.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
