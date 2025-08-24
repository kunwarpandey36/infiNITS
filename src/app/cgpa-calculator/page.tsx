
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, PlusCircle, Calculator, ArrowLeft, Info, FlaskConical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { courseData, branchCodeMapping } from '@/lib/course-data';
import { useStudentData } from '@/hooks/use-student-data';
import { Label } from '@/components/ui/label';

interface Subject {
  id: string; 
  code: string;
  name: string;
  credits: number;
  isLab: boolean;
  marks: {
    midSem: number;
    endSem: number;
    teacherAssessment: number;
    lab: number;
  };
  topperMarks: number;
}

const getSubjectsByBranchAndSem = (branch: string, semester: string): Subject[] => {
    const branchKey = Object.keys(branchCodeMapping).find(key => branchCodeMapping[key as keyof typeof branchCodeMapping] === branch);
    if (!branchKey || !courseData[branchKey as keyof typeof courseData]?.[semester as keyof typeof courseData[keyof typeof courseData]]) {
        return [];
    }
    const subjects = courseData[branchKey as keyof typeof courseData][semester as keyof typeof courseData[keyof typeof courseData]];
    
    const isLab = (subjectCode: string): boolean => {
        const codePart = subjectCode.replace(/^[A-Z]*/, '');
        return codePart.length >= 3 && codePart.charAt(1) === '1';
    };

    return subjects.map((s: { code: any; credits: any; name: any; }) => ({
      id: s.code,
      code: s.code,
      name: s.name,
      credits: s.credits,
      isLab: isLab(s.code),
      marks: {
          midSem: 0,
          endSem: 0,
          teacherAssessment: 0,
          lab: 0,
      },
      topperMarks: 94, // Default topper marks
    }));
};

interface Grade {
    grade: string;
    points: number;
}

export default function SgpaCalculatorPage() {
    const student = useStudentData();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [sgpa, setSgpa] = useState<number | null>(null);
    const router = useRouter();
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');

    const availableBranches = useMemo(() => Object.values(branchCodeMapping), []);

    useEffect(() => {
      if (student) {
        setSelectedSemester(student.semester);
        setSelectedBranch(student.branch);
      }
    }, [student]);
  
    useEffect(() => {
      if (selectedBranch && selectedSemester) {
        handleLoadSubjects();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBranch, selectedSemester]);

    const handleLoadSubjects = () => {
        if(selectedBranch && selectedSemester) {
            const loadedSubjects = getSubjectsByBranchAndSem(selectedBranch, selectedSemester);
            setSubjects(loadedSubjects);
            setSgpa(null);
        }
    };

    const handleAddSubject = () => {
        setSubjects([
            ...subjects,
            { 
              id: `custom-${Date.now()}`, 
              code: 'Custom', 
              name: 'Custom Subject',
              credits: 0, 
              isLab: false,
              marks: { midSem: 0, endSem: 0, teacherAssessment: 0, lab: 0 },
              topperMarks: 94 
            },
        ]);
    };

    const handleDeleteSubject = (id: string) => {
        setSubjects(subjects.filter((s) => s.id !== id));
    };

    const handleMarkChange = (id: string, type: keyof Subject['marks'], value: number, max: number) => {
        setSubjects(subjects.map(s => 
            s.id === id 
                ? { ...s, marks: { ...s.marks, [type]: Math.min(Math.max(0, value), max) } } 
                : s
        ));
    };
    
    const handleSubjectChange = (id: string, field: 'code' | 'credits' | 'topperMarks' | 'name', value: string | number) => {
         setSubjects(
            subjects.map((s) =>
                s.id === id ? { ...s, [field]: typeof value === 'number' ? Math.max(0, value) : value } : s
            )
        );
    }
    
    const calculateFinalMarks = (subject: Subject) => {
        if(subject.isLab) return subject.marks.lab;
        return subject.marks.midSem + subject.marks.endSem + subject.marks.teacherAssessment;
    }

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
                const finalMarks = calculateFinalMarks(subject);
                const grade = calculateGrade(finalMarks, subject.topperMarks);
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
          Relative SGPA Calculator
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
            <CardTitle className="font-headline">Calculate Your SGPA</CardTitle>
            <CardDescription>Enter your marks in each component to calculate your Semester Grade Point Average based on relative grading.</CardDescription>
        </CardHeader>
        <CardContent>
            {subjects.length > 0 ? (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="min-w-[200px]">Subject</TableHead>
                                <TableHead>Credits</TableHead>
                                <TableHead>Mid Sem (30)</TableHead>
                                <TableHead>TA (20)</TableHead>
                                <TableHead>End Sem (50)</TableHead>
                                <TableHead>Lab (100)</TableHead>
                                <TableHead>Topper's Total</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subjects.map(subject => {
                                return (
                                    <TableRow key={subject.id}>
                                        <TableCell>
                                           <div className="font-semibold">{subject.name}</div>
                                           <div className="text-sm text-muted-foreground flex items-center gap-2">
                                            {subject.code}
                                            {subject.isLab && <FlaskConical className="h-3 w-3 text-primary" />}
                                           </div>
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" min="0" value={subject.credits} onChange={e => handleSubjectChange(subject.id, 'credits', parseInt(e.target.value) || 0)} className="w-20" />
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" value={subject.marks.midSem} onChange={e => handleMarkChange(subject.id, 'midSem', parseInt(e.target.value) || 0, 30)} disabled={subject.isLab} className="w-24" />
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" value={subject.marks.teacherAssessment} onChange={e => handleMarkChange(subject.id, 'teacherAssessment', parseInt(e.target.value) || 0, 20)} disabled={subject.isLab} className="w-24"/>
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" value={subject.marks.endSem} onChange={e => handleMarkChange(subject.id, 'endSem', parseInt(e.target.value) || 0, 50)} disabled={subject.isLab} className="w-24" />
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" value={subject.marks.lab} onChange={e => handleMarkChange(subject.id, 'lab', parseInt(e.target.value) || 0, 100)} disabled={!subject.isLab} className="w-24" />
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" min="0" max="100" value={subject.topperMarks} onChange={e => handleSubjectChange(subject.id, 'topperMarks', parseInt(e.target.value) || 0)} className="w-24" />
                                        </TableCell>
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
                </div>
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
      <Card className="mt-8 bg-secondary/30">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><Info className="h-5 w-5"/>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
            <p><strong>1. Marking Scheme:</strong></p>
            <ul className="list-disc pl-5 text-muted-foreground">
                <li><strong>Theory Subjects:</strong> The total marks (100) are composed of Mid-Semester (30), Teacher's Assessment (20), and End-Semester (50).</li>
                <li><strong>Lab Subjects:</strong> The total marks are out of 100.</li>
            </ul>
            <p><strong>2. Relative Grading:</strong></p>
            <p className="text-muted-foreground">
                Your grade is calculated relative to the topper's total marks in that subject. For example, if you score 85 and the topper scores 95, your marks for grading are considered to be (85/95) * 100 = 89.47. This value is then used to determine your grade point (e.g., a score of 89.47 falls in the 'A' grade category, which is 9 points).
            </p>
            <p><strong>3. SGPA Calculation:</strong></p>
            <p className="text-muted-foreground">
                The SGPA is the weighted average of your grade points. It's calculated by summing the products of (Credit × Grade Point) for all subjects and then dividing by the total credits.
            </p>
             <p className="font-semibold mt-4">Note: Your marks in any component cannot exceed the maximum marks for that component.</p>
        </CardContent>
      </Card>
    </div>
  );
}

