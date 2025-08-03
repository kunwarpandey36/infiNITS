'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

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
  '2025-12-15': { title: 'Winter Break Begins', type: 'holiday' },
  '2025-12-23': { title: 'End-Semester Results Declaration', type: 'event' },
  '2026-01-04': { title: 'Winter Break Ends', type: 'holiday' },
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
  '2026-05-13': { title: 'Summer Break Begins', type: 'holiday' },
  '2026-05-18': { title: 'End-Semester Project Completion', type: 'event' },
  '2026-05-29': { title: 'End-Semester Results Declaration', type: 'event' },
  '2026-07-12': { title: 'Summer Break Ends', type: 'holiday' },
};


export default function AcademicCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date('2025-07-21'));

  const selectedEvent = date ? events[format(date, 'yyyy-MM-dd')] : null;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        Academic Calendar
      </h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
            <CardContent className="p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-0"
                    classNames={{
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90",
                        day_today: "bg-accent text-accent-foreground",
                    }}
                    components={{
                      DayContent: ({ date }) => {
                        const event = events[format(date, 'yyyy-MM-dd')];
                        if (event) {
                          return (
                            <div className="relative h-full w-full flex items-center justify-center">
                               <span>{date.getDate()}</span>
                               <div className={`absolute bottom-1 w-1 h-1 rounded-full ${
                                    event.type === 'holiday' ? 'bg-green-500' :
                                    event.type === 'exam' ? 'bg-red-500' :
                                    'bg-blue-500'
                                }`}></div>
                            </div>
                          );
                        }
                        return <span>{date.getDate()}</span>;
                      },
                    }}
                />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">
                    {date ? format(date, 'PPP') : 'Select a date'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {selectedEvent ? (
                    <div>
                        <Badge variant={selectedEvent.type === 'exam' ? 'destructive' : selectedEvent.type === 'holiday' ? 'default' : 'secondary'}>{selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}</Badge>
                        <p className="mt-2 text-lg">{selectedEvent.title}</p>
                    </div>
                ) : (
                    <p className="text-muted-foreground">No events for this day.</p>
                )}
                 <div className="mt-6 space-y-2 text-sm">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"/> Exam</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"/> Holiday</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"/> Event</div>
                 </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
