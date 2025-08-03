'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trash2, ArrowLeft, Bot, PlusCircle, Plus, Minus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { timetableData } from '@/lib/timetable-data';
import { useRouter } from 'next/navigation';

interface Subject {
  id: string; // Use subject code as ID
  name: string;
  code: string;
  total: number;
  attended: number;
}

const getSubjectsFromTimetable = (semester: string, branch: string, section: string): Subject[] => {
  const semesterData = timetableData[semester as keyof typeof timetableData];
  if (!semesterData) return [];
  const branchData = semesterData[branch as keyof typeof semesterData];
  if (!branchData) return [];
  const sectionData = branchData[section as keyof typeof branchData] || branchData['' as keyof typeof branchData];
  if (!sectionData) return [];

  const subjects = new Set<string>();
  Object.values(sectionData).forEach((daySchedule: Record<string, string>) => {
    Object.values(daySchedule).forEach((classInfo) => {
        // Extract subject code, e.g., "MA 201" from "MA 201 (TA1)"
        const match = classInfo.match(/^([A-Z]{2}\s?\d{3,})/);
        if (match) {
            subjects.add(match[1]);
        }
    });
  });

  return Array.from(subjects).map(code => ({
    id: code,
    name: code, // We don't have full names, so use code for now
    code: code,
    total: 0,
    attended: 0,
  }));
};


export default function AttendanceTrackerPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSemester, setSelectedSemester] = useState('3');
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const router = useRouter();
  
  const availableBranches = useMemo(() => Object.keys(timetableData[selectedSemester as keyof typeof timetableData] || {}), [selectedSemester]);

  useEffect(() => {
    if (!availableBranches.includes(selectedBranch)) {
        setSelectedBranch(availableBranches[0] || '');
    }
  }, [selectedSemester, availableBranches, selectedBranch]);

  const handleLoadSubjects = () => {
    // For simplicity, we'll assume Section A for all. 
    // This could be enhanced with a section selector.
    const newSubjects = getSubjectsFromTimetable(selectedSemester, selectedBranch, 'A');
    setSubjects(newSubjects);
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };
  
  const handleAddSubject = () => {
    setSubjects([
        ...subjects,
        { id: `custom-${Date.now()}`, name: 'New Subject', code: 'Custom', total: 0, attended: 0 },
    ]);
  };

  const handleAttendanceChange = (id: string, type: 'attended' | 'total', value: number) => {
    setSubjects(
      subjects.map((s) => (s.id === id ? { ...s, [type]: Math.max(0, value) } : s))
    );
  };
  
  const getPercentage = (attended: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((attended / total) * 100);
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Attendance Tracker
        </h1>
      </div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-headline">Load Your Subjects</CardTitle>
            <CardDescription>
              Select your semester and branch to automatically load your subjects from the timetable.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4 items-end">
            <div className="grid gap-2 w-full">
                <label>Semester</label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="3">3rd Semester</SelectItem>
                        <SelectItem value="5">5th Semester</SelectItem>
                        <SelectItem value="7">7th Semester</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2 w-full">
                <label>Branch</label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch} disabled={!availableBranches.length}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableBranches.map(branch => (
                             <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={handleLoadSubjects} className="w-full md:w-auto">
                <Bot className="mr-2 h-4 w-4" /> Load Subjects
            </Button>
          </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Subjects</CardTitle>
          <CardDescription>
            Update your attended and total classes to see your attendance percentage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead className="w-[150px]">Total</TableHead>
                <TableHead className="w-[150px]">Attended</TableHead>
                <TableHead className="w-[200px]">Percentage</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => {
                  const percentage = getPercentage(subject.attended, subject.total);
                  return (
                      <TableRow key={subject.id}>
                          <TableCell>
                              <Input 
                                defaultValue={subject.name}
                                onBlur={(e) => setSubjects(subjects.map(s => s.id === subject.id ? {...s, name: e.target.value} : s))}
                                className="font-medium border-none focus-visible:ring-1"
                              />
                              <div className="text-sm text-muted-foreground pl-3">{subject.code}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                                <Button size="icon" variant="outline" onClick={() => handleAttendanceChange(subject.id, 'total', subject.total - 1)}><Minus className="h-4 w-4" /></Button>
                                <Input
                                    type="number"
                                    value={subject.total}
                                    onChange={(e) => handleAttendanceChange(subject.id, 'total', parseInt(e.target.value) || 0)}
                                    className="w-16 text-center"
                                />
                                <Button size="icon" variant="outline" onClick={() => handleAttendanceChange(subject.id, 'total', subject.total + 1)}><Plus className="h-4 w-4" /></Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                                <Button size="icon" variant="outline" onClick={() => handleAttendanceChange(subject.id, 'attended', subject.attended - 1)}><Minus className="h-4 w-4" /></Button>
                                <Input
                                    type="number"
                                    value={subject.attended}
                                    onChange={(e) => handleAttendanceChange(subject.id, 'attended', parseInt(e.target.value) || 0)}
                                    className="w-16 text-center"
                                />
                                <Button size="icon" variant="outline" onClick={() => handleAttendanceChange(subject.id, 'attended', subject.attended + 1)}><Plus className="h-4 w-4" /></Button>
                            </div>
                          </TableCell>
                          <TableCell>
                              <div className="flex items-center gap-2">
                              <Progress value={percentage} className="w-full" />
                              <span className={`font-semibold ${percentage < 75 ? 'text-destructive' : ''}`}>{percentage}%</span>
                              </div>
                          </TableCell>
                          <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteSubject(subject.id)}>
                                  <Trash2 className="h-4 w-4" />
                              </Button>
                          </TableCell>
                      </TableRow>
                  );
              })}
            </TableBody>
          </Table>
           {subjects.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    Please load your subjects to begin tracking.
                </div>
            )}
            <div className="flex justify-start mt-4">
                <Button onClick={handleAddSubject} variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4"/> Add Custom Subject
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
