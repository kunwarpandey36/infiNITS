
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

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const branches = ['CE', 'ME', 'EE', 'ECE', 'CSE', 'EIE'];
const timeSlots = [
    "8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00", 
    "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00"
];

const getHour = (time: string) => parseInt(time.split(':')[0]);

export default function TimetablePage() {
  const router = useRouter();
  const student = useStudentData();
  const [activeSemester, setActiveSemester] = useState('1');
  const [activeBranch, setActiveBranch] = useState('CE');
  const [activeSection, setActiveSection] = useState('A');

  useEffect(() => {
    if (student) {
      setActiveSemester(student.semester);
      setActiveBranch(student.branch);
    }
  }, [student]);
  
  const currentBranchData = useMemo(() => {
    return timetableData[activeSemester as keyof typeof timetableData]?.[activeBranch as keyof typeof timetableData[keyof typeof timetableData]] || {};
  }, [activeSemester, activeBranch]);

  const currentBranchSections = useMemo(() => Object.keys(currentBranchData), [currentBranchData]);
  const hasSections = useMemo(() => currentBranchSections.length > 0 && !currentBranchSections.some(s => s === ''), [currentBranchSections]);

  useEffect(() => {
    if (hasSections && !currentBranchSections.includes(activeSection)) {
        setActiveSection(currentBranchSections[0] || 'A');
    }
  }, [hasSections, currentBranchSections, activeSection]);

  const scheduleForView = useMemo(() => {
    const sectionKey = hasSections ? activeSection : '';
    const sectionData = currentBranchData[sectionKey as keyof typeof currentBranchData] || {};
    let processedSchedule: { [day: string]: { [time: string]: { content: string, span: number } } } = {};

    days.forEach(day => {
        processedSchedule[day] = {};
        const daySchedule = sectionData[day as keyof typeof schedule] || {};
        let coveredSlots: string[] = [];

        timeSlots.forEach(slot => {
            if (coveredSlots.includes(slot)) return;

            let classInfo = daySchedule[slot];
            if (classInfo) {
                // This is a normal 1-hour slot or the start of a multi-hour slot
                let span = 1;
                // Check for multi-hour slots by looking at start and end times in the key
                const multiHourSlot = Object.keys(daySchedule).find(s => s.startsWith(slot.split('-')[0] + ':') && s !== slot);
                if (multiHourSlot) {
                    const start = getHour(multiHourSlot.split('-')[0]);
                    const end = getHour(multiHourSlot.split('-')[1]);
                    span = end - start;
                    classInfo = daySchedule[multiHourSlot];
                }
                
                processedSchedule[day][slot] = { content: classInfo, span };
                
                if (span > 1) {
                    for(let i=1; i<span; i++) {
                       const nextSlotIndex = timeSlots.indexOf(slot) + i;
                       if(nextSlotIndex < timeSlots.length) {
                         coveredSlots.push(timeSlots[nextSlotIndex]);
                       }
                    }
                }
            } else {
                processedSchedule[day][slot] = { content: '-', span: 1 };
            }
        });
    });
    return processedSchedule;
  }, [currentBranchData, activeSection, hasSections]);

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
            <CardDescription>Select your semester and branch to view the schedule. Your defaults are pre-selected.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs value={activeSemester} onValueChange={(sem) => {setActiveSemester(sem); setActiveBranch('CSE'); setActiveSection('A')}} className="w-full mb-4">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="1">1st Semester</TabsTrigger>
                    <TabsTrigger value="3">3rd Semester</TabsTrigger>
                    <TabsTrigger value="5">5th Semester</TabsTrigger>
                    <TabsTrigger value="7">7th Semester</TabsTrigger>
                </TabsList>
            </Tabs>
            
          <Tabs value={activeBranch} onValueChange={(branch) => {setActiveBranch(branch); setActiveSection(Object.keys(timetableData[activeSemester as keyof typeof timetableData]?.[branch as keyof typeof timetableData] || {})[0] || 'A')}} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-4">
                {branches.map(branch => (
                    <TabsTrigger key={branch} value={branch}>{branch}</TabsTrigger>
                ))}
            </TabsList>
            
            {hasSections && (
                 <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full mb-4">
                    <TabsList className="grid w-full grid-cols-2">
                        {currentBranchSections.map(section => (
                             <TabsTrigger key={section} value={section}>Section {section}</TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            )}

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
                                    if(!cellData) return null; // Slot has been spanned over
                                    if(cellData.content === '-') return <TableCell key={day}>-</TableCell>;

                                    return (
                                        <TableCell key={day}>
                                            <div className="min-w-[150px]">{cellData.content}</div>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

