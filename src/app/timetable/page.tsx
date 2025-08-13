
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { timetableData } from '@/lib/timetable-data';
import { useStudentData } from '@/hooks/use-student-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
    "8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00", 
    "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00"
];

const getHour = (time: string) => parseInt(time.split(':')[0]);

export default function TimetablePage() {
  const router = useRouter();
  const student = useStudentData();
  const [activeProgram, setActiveProgram] = useState('UG');
  const [activeSemester, setActiveSemester] = useState('1');
  const [activeBranch, setActiveBranch] = useState('CE');
  const [activeSection, setActiveSection] = useState('A');

  const semestersForProgram = useMemo(() => {
    if (activeProgram === 'UG') return ['1', '3', '5', '7'];
    if (activeProgram === 'PG') return ['PG-1'];
    return [];
  }, [activeProgram]);

  const branchesForSemester = useMemo(() => {
    return Object.keys(timetableData[activeSemester] || {});
  }, [activeSemester]);

  const sectionsForBranch = useMemo(() => {
    return Object.keys(timetableData[activeSemester]?.[activeBranch] || {});
  }, [activeSemester, activeBranch]);

  useEffect(() => {
    if (student && activeProgram === 'UG') {
      setActiveSemester(student.semester);
      setActiveBranch(student.branch);
    } else {
      setActiveSemester(semestersForProgram[0]);
    }
  }, [student, activeProgram, semestersForProgram]);
  
  useEffect(() => {
    if (!semestersForProgram.includes(activeSemester)) {
      setActiveSemester(semestersForProgram[0] || '');
    }
  }, [semestersForProgram, activeSemester]);

  useEffect(() => {
    if (!branchesForSemester.includes(activeBranch)) {
      setActiveBranch(branchesForSemester[0] || '');
    }
  }, [branchesForSemester, activeBranch]);

  useEffect(() => {
    if (!sectionsForBranch.includes(activeSection)) {
      setActiveSection(sectionsForBranch[0] || '');
    }
  }, [sectionsForBranch, activeSection]);


  const scheduleForView = useMemo(() => {
    const sectionData = timetableData[activeSemester]?.[activeBranch]?.[activeSection] || {};
    let processedSchedule: { [day: string]: { [time: string]: { content: string, span: number } | null } } = {};

    days.forEach(day => {
        processedSchedule[day] = {};
        const daySchedule = sectionData[day] || {};
        
        timeSlots.forEach((slot, index) => {
            if (processedSchedule[day][slot] === null) return;

            let classInfo = daySchedule[slot];
            if (classInfo) {
                processedSchedule[day][slot] = { content: classInfo, span: 1 };
                return;
            }

            // Check for multi-hour slots
            const multiHourSlot = Object.keys(daySchedule).find(s => {
                const [start, end] = s.split('-');
                return slot.startsWith(start) && getHour(end) > getHour(slot.split('-')[1]);
            });

            if (multiHourSlot) {
                const [start, end] = multiHourSlot.split('-');
                const startHour = getHour(start);
                const endHour = getHour(end);
                const span = endHour - startHour;
                
                processedSchedule[day][slot] = { content: daySchedule[multiHourSlot], span: span };

                for (let i = 1; i < span; i++) {
                    const nextSlotIndex = timeSlots.indexOf(slot) + i;
                    if (nextSlotIndex < timeSlots.length) {
                        processedSchedule[day][timeSlots[nextSlotIndex]] = null; // Mark as covered
                    }
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

            <div className="overflow-x-auto">
                <Table className="border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px]">Time</TableHead>
                            {days.map(day => (
                                <TableHead key={day}>{day}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {timeSlots.map(slot => (
                            <TableRow key={slot}>
                                <TableCell className="font-medium">{slot}</TableCell>
                                {days.map(day => {
                                    const cellData = scheduleForView[day]?.[slot];
                                    if(cellData === null) return null; // Slot has been spanned over by a previous cell
                                    
                                    return (
                                        <TableCell key={day} rowSpan={cellData?.span || 1} className={cellData?.span && cellData.span > 1 ? 'align-top' : ''}>
                                            <div className="min-w-[150px]">{cellData?.content || '-'}</div>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
