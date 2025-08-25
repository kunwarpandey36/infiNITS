
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info } from 'lucide-react';
import { timetableData } from '@/lib/timetable-data';
import { useStudentData } from '@/hooks/use-student-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
    "8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00", 
    "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00"
];

const getHour = (time: string) => parseInt(time.split(':')[0]);

const colorPalette = [
    'bg-red-500/10 border-red-500/30 text-red-800 dark:text-red-200',
    'bg-orange-500/10 border-orange-500/30 text-orange-800 dark:text-orange-200',
    'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200',
    'bg-yellow-500/10 border-yellow-500/30 text-yellow-800 dark:text-yellow-200',
    'bg-lime-500/10 border-lime-500/30 text-lime-800 dark:text-lime-200',
    'bg-green-500/10 border-green-500/30 text-green-800 dark:text-green-200',
    'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200',
    'bg-teal-500/10 border-teal-500/30 text-teal-800 dark:text-teal-200',
    'bg-cyan-500/10 border-cyan-500/30 text-cyan-800 dark:text-cyan-200',
    'bg-sky-500/10 border-sky-500/30 text-sky-800 dark:text-sky-200',
    'bg-blue-500/10 border-blue-500/30 text-blue-800 dark:text-blue-200',
    'bg-indigo-500/10 border-indigo-500/30 text-indigo-800 dark:text-indigo-200',
    'bg-violet-500/10 border-violet-500/30 text-violet-800 dark:text-violet-200',
    'bg-purple-500/10 border-purple-500/30 text-purple-800 dark:text-purple-200',
    'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-800 dark:text-fuchsia-200',
    'bg-pink-500/10 border-pink-500/30 text-pink-800 dark:text-pink-200',
    'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200',
];

const courseColorCache = new Map<string, string>();
let lastColorIndex = -1;

const getColorForCourse = (course: string) => {
    if (!course || course === '-') return 'bg-transparent';
    if (courseColorCache.has(course)) {
        return courseColorCache.get(course);
    }
    lastColorIndex = (lastColorIndex + 1) % colorPalette.length;
    const color = colorPalette[lastColorIndex];
    courseColorCache.set(course, color);
    return color;
};

export default function TimetablePage() {
  const router = useRouter();
  const student = useStudentData();
  const [activeProgram, setActiveProgram] = useState('UG');
  const [activeSemester, setActiveSemester] = useState('1');
  const [activeBranch, setActiveBranch] = useState('CE');
  const [activeSection, setActiveSection] = useState('A');

  useEffect(() => {
    if (student) {
      setActiveProgram('UG');
      setActiveSemester(student.semester);
      const studentBranch = Object.keys(timetableData[student.semester] || {}).find(b => b === student.branch);
      setActiveBranch(studentBranch || Object.keys(timetableData[student.semester] || {})[0]);
      
      const studentSections = Object.keys(timetableData[student.semester]?.[studentBranch || ''] || {});
      if (studentSections.length > 0) {
        setActiveSection(studentSections[0]);
      }
    }
  }, [student]);

  const semestersForProgram = useMemo(() => {
    if (activeProgram === 'UG') return Object.keys(timetableData).filter(k => !k.startsWith('PG'));
    if (activeProgram === 'PG') return Object.keys(timetableData).filter(k => k.startsWith('PG'));
    return [];
  }, [activeProgram]);

  const branchesForSemester = useMemo(() => {
    return Object.keys(timetableData[activeSemester] || {});
  }, [activeSemester]);

  const sectionsForBranch = useMemo(() => {
    return Object.keys(timetableData[activeSemester]?.[activeBranch] || {});
  }, [activeSemester, activeBranch]);
  
  useEffect(() => {
    courseColorCache.clear();
    lastColorIndex = -1;
  }, [activeSemester, activeBranch, activeSection]);
  
  useEffect(() => {
    if (semestersForProgram.length > 0 && !semestersForProgram.includes(activeSemester)) {
      setActiveSemester(semestersForProgram[0]);
    }
  }, [activeSemester, semestersForProgram]);
  
  useEffect(() => {
    if (branchesForSemester.length > 0 && !branchesForSemester.includes(activeBranch)) {
      setActiveBranch(branchesForSemester[0]);
    }
  }, [activeBranch, branchesForSemester]);
  
  useEffect(() => {
    if (sectionsForBranch.length > 0 && !sectionsForBranch.includes(activeSection)) {
      setActiveSection(sectionsForBranch[0]);
    }
  }, [activeSection, sectionsForBranch]);


  const scheduleForView = useMemo(() => {
    if (!activeSemester || !activeBranch || !activeSection) return {};

    const sectionData = timetableData[activeSemester]?.[activeBranch]?.[activeSection] || {};
    let processedSchedule: { [day: string]: { [time: string]: { content: string, span: number } | null } } = {};

    days.forEach(day => {
        processedSchedule[day] = {};
        const daySchedule = sectionData[day] || {};
        
        timeSlots.forEach((slot) => {
            if (processedSchedule[day][slot] === null) return;

            const classKey = Object.keys(daySchedule).find(s => {
                if (!s.includes('-')) return s === slot;
                const [start, end] = s.split('-');
                if (!start || !end) return false;
                const startHour = getHour(start);
                const currentHour = getHour(slot.split('-')[0]);
                const endHour = getHour(end);
                return currentHour >= startHour && currentHour < endHour;
            });
            
            if (classKey) {
                if (classKey.includes('-')) {
                    const [start, end] = classKey.split('-');
                    const startHour = getHour(start);
                    const endHour = getHour(end);
                    const span = endHour - startHour;

                    if (slot.startsWith(start)) {
                        processedSchedule[day][slot] = { content: daySchedule[classKey], span: span };
                        for (let i = 1; i < span; i++) {
                            const nextSlotIndex = timeSlots.indexOf(slot) + i;
                            if (nextSlotIndex < timeSlots.length) {
                                processedSchedule[day][timeSlots[nextSlotIndex]] = null;
                            }
                        }
                    }
                } else {
                    processedSchedule[day][slot] = { content: daySchedule[slot], span: 1 };
                }
            } else {
                 processedSchedule[day][slot] = { content: '-', span: 1 };
            }
        });
    });
    return processedSchedule;
  }, [activeSemester, activeBranch, activeSection]);
  

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Class Timetable
        </h1>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Timetable (July-Dec 2025)</CardTitle>
            <CardDescription>Select program, semester, branch, and section to view the schedule. Your defaults are pre-selected.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="grid gap-2">
                <label>Program</label>
                <Select value={activeProgram} onValueChange={setActiveProgram}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UG">Undergraduate (B.Tech)</SelectItem>
                    <SelectItem value="PG">Postgraduate (M.Tech/M.Sc/MBA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label>Semester</label>
                 <Select value={activeSemester} onValueChange={setActiveSemester} disabled={semestersForProgram.length === 0}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    {semestersForProgram.map(sem => (
                       <SelectItem key={sem} value={sem}>{sem.startsWith('PG') ? '1st Semester' : `${sem}${['st', 'nd', 'rd'][parseInt(sem)-1] || 'th'} Semester`}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label>Branch / Department</label>
                <Select value={activeBranch} onValueChange={setActiveBranch} disabled={branchesForSemester.length === 0}>
                   <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    {branchesForSemester.map(branch => (
                       <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label>Section / Specialization</label>
                <Select value={activeSection} onValueChange={setActiveSection} disabled={sectionsForBranch.length === 0}>
                   <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    {sectionsForBranch.map(section => (
                       <SelectItem key={section} value={section}>{section || 'N/A'}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-border">
                <Table className="min-w-full">
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[120px] text-primary font-bold p-3">Time</TableHead>
                            {days.map(day => (
                                <TableHead key={day} className="text-primary font-bold p-3">{day}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {timeSlots.map(slot => (
                            <TableRow key={slot} className="border-t">
                                <TableCell className="font-semibold text-muted-foreground p-3 align-middle">{slot}</TableCell>
                                {days.map(day => {
                                    const cellData = scheduleForView[day]?.[slot];
                                    if(cellData === null) return null;
                                    
                                    const hasClass = cellData?.content && cellData.content !== '-';

                                    return (
                                        <TableCell 
                                            key={day} 
                                            rowSpan={cellData?.span || 1}
                                            className={cn(
                                                "align-top p-0 transition-all",
                                                cellData?.span && cellData.span > 1 ? 'align-middle' : ''
                                            )}
                                        >
                                            <div className={cn(
                                                "h-full w-full min-w-[150px] p-2 rounded-md",
                                                hasClass ? `${getColorForCourse(cellData.content)} font-semibold` : 'text-muted-foreground'
                                            )}>
                                                {cellData?.content || '-'}
                                            </div>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
                <Info className="h-4 w-4"/>
                If there are any discrepancies in the timetable, class representatives are requested to email <a href="mailto:infinitsilchar@gmail.com" className="text-primary hover:underline">infinitsilchar@gmail.com</a>.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}

