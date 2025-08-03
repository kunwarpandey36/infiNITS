'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const events: Record<string, { title: string; type: 'holiday' | 'exam' | 'event' }> = {
  '2024-08-15': { title: 'Independence Day', type: 'holiday' },
  '2024-09-05': { title: 'Teachers\' Day', type: 'event' },
  '2024-09-16': { title: 'Mid Semester Exams Begin', type: 'exam' },
  '2024-09-21': { title: 'Mid Semester Exams End', type: 'exam' },
  '2024-10-02': { title: 'Gandhi Jayanti', type: 'holiday' },
  '2024-11-01': { title: 'Diwali Break', type: 'holiday' },
  '2024-12-02': { title: 'End Semester Exams Begin', type: 'exam' },
  '2024-12-14': { title: 'End Semester Exams End', type: 'exam' },
  '2024-12-25': { title: 'Christmas', type: 'holiday' },
};


export default function AcademicCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

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
                        <Badge variant={selectedEvent.type === 'exam' ? 'destructive' : 'default'}>{selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}</Badge>
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
