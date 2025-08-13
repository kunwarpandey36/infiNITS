
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trash2, ArrowLeft, PlusCircle, Plus, Minus, FlaskConical } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { courseData, branchCodeMapping } from '@/lib/course-data';
import { useRouter } from 'next/navigation';
import { useStudentData } from '@/hooks/use-student-data';

interface Subject {
  id: string; 
  name: string;
  code: string;
  total: number;
  attended: number;
}

const getSubjectsByBranchAndSem = (branch: string, semester: string): Subject[] => {
    const branchKey = Object.keys(branchCodeMapping).find(key => branchCodeMapping[key as keyof typeof branchCodeMapping] === branch);
    if (!branchKey || !courseData[branchKey as keyof typeof courseData]?.[semester as keyof typeof courseData[keyof typeof courseData]]) {
        return [];
    }
    const subjects = courseData[branchKey as keyof typeof courseData][semester as keyof typeof courseData[keyof typeof courseData]];
    return subjects.map((s: { code: any; name: any; }) => ({
        id: s.code,
        name: s.name,
        code: s.code,
        total: 0,
        attended: 0,
    }));
};

const isLab = (subjectCode: string): boolean => {
  const codePart = subjectCode.replace(/^[A-Z]*/, '');
  return codePart.length >= 3 && codePart.charAt(1) === '1';
};

export default function AttendanceTrackerPage() {
  const student = useStudentData();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const router = useRouter();
  
  const availableBranches = useMemo(() => Object.values(branchCodeMapping), []);
  const storageKey = useMemo(() => `attendance-${student?.scholarId}-${selectedSemester}-${selectedBranch}`, [student, selectedSemester, selectedBranch]);

  useEffect(() => {
    if (student) {
      setSelectedSemester(student.semester);
      setSelectedBranch(student.branch);
    }
  }, [student]);

  const handleLoadSubjects = useCallback(() => {
    if (!selectedSemester || !selectedBranch || !student) return;
    const savedSubjects = localStorage.getItem(storageKey);
    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    } else {
       const newSubjects = getSubjectsByBranchAndSem(selectedBranch, selectedSemester);
       setSubjects(newSubjects);
    }
  }, [selectedSemester, selectedBranch, storageKey, student]);

  useEffect(() => {
    handleLoadSubjects();
  }, [handleLoadSubjects]);
  
  useEffect(() => {
    if (subjects.length > 0 && student) {
        localStorage.setItem(storageKey, JSON.stringify(subjects));
    }
  }, [subjects, storageKey, student]);

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
            <CardTitle className="font-headline">Your Subjects</CardTitle>
            <CardDescription>
              Your subjects are loaded automatically based on your profile. You can also change the selection. Your attendance data is saved locally in your browser.
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
                        {[...Array(8)].map((_, i) => (
                           <SelectItem key={i+1} value={(i+1).toString()}>{i+1}{['st', 'nd', 'rd'][i] || 'th'} Semester</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2 w-full">
                <label>Branch</label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
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
          </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Track Attendance</CardTitle>
          <CardDescription>
            Update your total and attended classes to see your attendance percentage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead className="w-[150px]">Total Classes</TableHead>
                <TableHead className="w-[150px]">Attended Classes</TableHead>
                <TableHead className="w-[200px]">Percentage</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => {
                  const percentage = getPercentage(subject.attended, subject.total);
                  const labClass = isLab(subject.code);
                  return (
                      <TableRow key={subject.id}>
                          <TableCell>
                              <Input 
                                value={subject.name}
                                onChange={(e) => setSubjects(subjects.map(s => s.id === subject.id ? {...s, name: e.target.value} : s))}
                                className="font-medium border-none focus-visible:ring-1"
                              />
                              <div className="text-sm text-muted-foreground pl-3 flex items-center gap-2">
                                {subject.code}
                                {labClass && <FlaskConical className="h-3 w-3 text-primary" />}
                              </div>
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

