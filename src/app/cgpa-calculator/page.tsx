'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, PlusCircle, Calculator, ArrowLeft, Bot } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { timetableData } from '@/lib/timetable-data';
import { useStudentData } from '@/hooks/use-student-data';

interface Subject {
  id: string; // Use subject code as ID
  code: string;
  credits: number;
  yourMarks: number;
  topperMarks: number;
}

const getSubjectsFromTimetable = (semester: string, branch: string, section: string): Subject[] => {
    const semesterData = timetableData[semester as keyof typeof timetableData];
    if (!semesterData) return [];
    const branchData = semesterData[branch as keyof typeof semesterData];
    if (!branchData) return [];
    // Use section 'A' as a default or the first available section if 'A' doesn't exist
    const sections = Object.keys(branchData);
    const selectedSection = sections.includes(section) ? section : sections[0];
    const sectionData = branchData[selectedSection as keyof typeof branchData] || branchData['' as keyof typeof branchData];
    if (!sectionData) return [];
  
    const subjects = new Set<string>();
    Object.values(sectionData).forEach((daySchedule: Record<string, string>) => {
      Object.values(daySchedule).forEach((classInfo) => {
          const match = classInfo.match(/^([A-Z]{2}\s?\d{3,})/);
          if (match) {
              subjects.add(match[1].trim());
          }
      });
    });
  
    return Array.from(subjects).map(code => ({
      id: code,
      code: code,
      credits: 0,
      yourMarks: 0,
      topperMarks: 100, // Default to 100
    }));
  };

interface Grade {
    grade: string;
    points: number;
}

export default function CgpaCalculatorPage() {
    const student = useStudentData();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [sgpa, setSgpa] = useState<number | null>(null);
    const router = useRouter();
    const [selectedSemester, setSelectedSemester] = useState('3');
    const [selectedBranch, setSelectedBranch] = useState('CSE');

    const availableBranches = useMemo(() => {
        const semesterData = timetableData[selectedSemester as keyof typeof timetableData];
        return semesterData ? Object.keys(semesterData) : [];
      }, [selectedSemester]);

      useEffect(() => {
        if (student) {
          setSelectedSemester(student.semester);
          setSelectedBranch(student.branch);
        }
      }, [student]);
    
      useEffect(() => {
        if (!availableBranches.includes(selectedBranch)) {
          setSelectedBranch(availableBranches[0] || '');
        }
      }, [selectedSemester, availableBranches, selectedBranch]);

      useEffect(() => {
        if (selectedBranch && selectedSemester) {
          handleLoadSubjects();
        }
      }, [selectedBranch, selectedSemester]);

    const handleLoadSubjects = () => {
        if(selectedBranch) {
            const loadedSubjects = getSubjectsFromTimetable(selectedSemester, selectedBranch, 'A');
            setSubjects(loadedSubjects);
            setSgpa(null);
        }
    };

    const handleAddSubject = () => {
        setSubjects([
            ...subjects,
            { id: `custom-${Date.now()}`, code: '', credits: 0, yourMarks: 0, topperMarks: 100 },
        ]);
    };

    const handleDeleteSubject = (id: string) => {
        setSubjects(subjects.filter((s) => s.id !== id));
    };

    const handleSubjectChange = (id: string, field: keyof Subject, value: string | number) => {
        setSubjects(
            subjects.map((s) =>
                s.id === id ? { ...s, [field]: typeof value === 'number' ? Math.max(0, value) : value.toUpperCase() } : s
            )
        );
    };

    const calculateGrade = (yourMarks: number, topperMarks: number): Grade => {
        if (topperMarks === 0 || yourMarks > topperMarks) return { grade: 'N/A', points: 0 };
        const percentage = (yourMarks / topperMarks) * 100;
        if (percentage >= 90) return { grade: 'A+', points: 10 };
        if (percentage >= 80) return { grade: 'A', points: 9 };
        if (percentage >= 70) return { grade: 'B+', points: 8 };
        if (percentage >= 60) return { grade: 'B', points: 7 };
        if (percentage >= 50) return { grade: 'C+', points: 6 };
        if (percentage >= 40) return { grade: 'C', points: 5 };
        if (percentage >= 35) return { grade: 'D', points: 4 };
        return { grade: 'F', points: 0 };
    };

    const handleCalculateSgpa = () => {
        let totalCredits = 0;
        let totalPoints = 0;
        subjects.forEach(subject => {
            if(subject.credits > 0 && subject.topperMarks > 0) {
                const grade = calculateGrade(subject.yourMarks, subject.topperMarks);
                totalPoints += grade.points * subject.credits;
                totalCredits += subject.credits;
            }
        });
        if (totalCredits === 0) {
            setSgpa(0);
        } else {
            setSgpa(totalPoints / totalCredits);
        }
    };


  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Relative CGPA Calculator
        </h1>
      </div>
      <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-headline">Your Subjects</CardTitle>
            <CardDescription>
              Your subjects are loaded automatically based on your profile. You can also change the selection.
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
          </CardContent>
        </Card>
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Calculate Your SGPA</CardTitle>
            <CardDescription>Enter your subjects, credits, and marks to calculate your Semester Grade Point Average based on relative grading.</CardDescription>
        </CardHeader>
        <CardContent>
            {subjects.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject Code</TableHead>
                            <TableHead>Credits</TableHead>
                            <TableHead>Your Marks</TableHead>
                            <TableHead>Topper's Marks</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subjects.map(subject => {
                            const grade = calculateGrade(subject.yourMarks, subject.topperMarks);
                            return (
                                <TableRow key={subject.id}>
                                    <TableCell>
                                        <Input value={subject.code} onChange={e => handleSubjectChange(subject.id, 'code', e.target.value)} placeholder="e.g. CS201" />
                                    </TableCell>
                                    <TableCell>
                                        <Input type="number" min="0" value={subject.credits} onChange={e => handleSubjectChange(subject.id, 'credits', parseInt(e.target.value) || 0)} placeholder="e.g. 4" />
                                    </TableCell>
                                    <TableCell>
                                        <Input type="number" min="0" value={subject.yourMarks} onChange={e => handleSubjectChange(subject.id, 'yourMarks', parseInt(e.target.value) || 0)} placeholder="e.g. 85" />
                                    </TableCell>
                                    <TableCell>
                                        <Input type="number" min="0" value={subject.topperMarks} onChange={e => handleSubjectChange(subject.id, 'topperMarks', parseInt(e.target.value) || 0)} placeholder="e.g. 98" />
                                    </TableCell>
                                    <TableCell className="font-semibold">{grade.grade}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSubject(subject.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    Please load your subjects to begin.
                </div>
            )}
            <div className="flex justify-between items-center mt-4">
                <Button onClick={handleAddSubject} variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4"/> Add Custom Subject
                </Button>
                {subjects.length > 0 && (
                    <Button onClick={handleCalculateSgpa}>
                        <Calculator className="mr-2 h-4 w-4"/> Calculate SGPA
                    </Button>
                )}
            </div>
             {sgpa !== null && (
                <div className="mt-6 text-center">
                    <Card className="inline-block p-6 bg-secondary">
                        <CardTitle className="font-headline">Your Calculated SGPA is:</CardTitle>
                        <p className="text-4xl font-bold text-primary mt-2">{sgpa.toFixed(2)}</p>
                    </Card>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
