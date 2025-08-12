
'use client';

import { useState, useEffect, useMemo } from 'react';
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

  const currentSemesterData = timetableData[activeSemester as keyof typeof timetableData] || {};
  const currentBranchData = currentSemesterData[activeBranch as keyof typeof currentSemesterData] || {};
  const currentBranchSections = useMemo(() => Object.keys(currentBranchData), [currentBranchData]);
  const hasSections = currentBranchSections.length > 1 && !(currentBranchSections.length === 1 && currentBranchSections[0] === '');
  
  const getUniqueTimeSlotsForSemester = (semester: string) => {
    const slots = new Set<string>();
    const semesterData = timetableData[semester as keyof typeof timetableData] || {};
    for (const branch in semesterData) {
      for (const section in semesterData[branch as keyof typeof semesterData]) {
        const sectionData = semesterData[branch as keyof typeof semesterData][section as keyof typeof branchData];
        for (const day in sectionData) {
            for (const slot in sectionData[day as keyof typeof sectionData]) {
                 slots.add(slot);
            }
        }
      }
    }
    
    return Array.from(slots).sort((a, b) => {
        const parseTime = (timeStr: string) => {
            let [hour, minute] = timeStr.split(':').map(Number);
            if (hour < 8) hour += 12; // Convert PM hours to 24-hour format for sorting
            return hour * 60 + minute;
        };

        const aStartTime = parseTime(a.split('-')[0]);
        const bStartTime = parseTime(b.split('-')[0]);

        return aStartTime - bStartTime;
    });
  };

  const activeTimeSlots = getUniqueTimeSlotsForSemester(activeSemester);
  
  useEffect(() => {
    if (hasSections && !currentBranchSections.includes(activeSection)) {
        setActiveSection(currentBranchSections[0] || 'A');
    }
  }, [hasSections, currentBranchSections, activeSection]);

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
                        {activeTimeSlots.map(slot => (
                            <TableRow key={slot}>
                                <TableCell className="font-medium">{slot}</TableCell>
                                {days.map(day => {
                                    const sectionKey = hasSections ? activeSection : '';
                                    const schedule = currentBranchData[sectionKey as keyof typeof currentBranchData] || {};
                                    const daySchedule = schedule[day as keyof typeof schedule] || {};
                                    const classInfo = daySchedule[slot] || '-';

                                    return (
                                        <TableCell key={day}>
                                            <div className="min-w-[150px]">{classInfo}</div>
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
