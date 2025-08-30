
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, PlusCircle, Calculator, ArrowLeft, Info, FlaskConical, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { courseData, branchCodeMapping } from '@/lib/course-data';
import { useStudentData } from '@/hooks/use-student-data';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

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
    const subjectsFromData = courseData[branchKey as keyof typeof courseData][semester as keyof typeof courseData[keyof typeof courseData]];
    
    const isLab = (subjectCode: string): boolean => {
        const codePart = subjectCode.replace(/^[A-Z]*/, '');
        return codePart.length >= 3 && codePart.charAt(1) === '1';
    };

    return subjectsFromData.map((s: { code: any; credits: any; name: any; }) => ({
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
    const { toast } = useToast();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [sgpa, setSgpa] = useState<number | null>(null);
    const router = useRouter();
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');

    const availableBranches = useMemo(() => [...new Set(Object.values(branchCodeMapping))], []);
    const storageKey = useMemo(() => `sgpa-calc-${student?.scholarId}-${selectedSemester}-${selectedBranch}`, [student, selectedSemester, selectedBranch]);


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
        if (!selectedSemester || !selectedBranch || !student) return;
        const savedSubjects = localStorage.getItem(storageKey);
        if (savedSubjects) {
            setSubjects(JSON.parse(savedSubjects));
        } else {
            const newSubjects = getSubjectsByBranchAndSem(selectedBranch, selectedSemester);
            setSubjects(newSubjects);
        }
        setSgpa(null);
    };

    useEffect(() => {
        if(subjects.length > 0 && student) {
            localStorage.setItem(storageKey, JSON.stringify(subjects));
        }
    }, [subjects, storageKey, student]);

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

    const handleMarkChange = (id: string, type: keyof Subject['marks'], value: number) => {
        const maxMarksMap = { midSem: 50, endSem: 100, teacherAssessment: 20, lab: 100 };
        const max = maxMarksMap[type];

        setSubjects(subjects.map(s => 
            s.id === id 
                ? { ...s, marks: { ...s.marks, [type]: Math.min(Math.max(0, value), max) } } 
                : s
        ));
    };
    
    const handleSubjectChange = (id: string, field: 'code' | 'credits' | 'topperMarks' | 'name' | 'isLab', value: string | number | boolean) => {
         setSubjects(
            subjects.map((s) =>
                s.id === id ? { ...s, [field]: value } : s
            )
        );
    }
    
    const calculateFinalMarks = (subject: Subject) => {
        if(subject.isLab) return subject.marks.lab;
        // 60% of Mid-Sem (out of 50) + 50% of End-Sem (out of 100) + TA (out of 20)
        return (subject.marks.midSem * 0.6) + (subject.marks.endSem * 0.5) + subject.marks.teacherAssessment;
    }

    const calculateGrade = (yourMarks: number, topperMarks: number): Grade => {
        if (topperMarks === 0) return { grade: 'N/A', points: 0 };
        if (yourMarks > topperMarks) return { grade: 'Error', points: 0 }; // Handle error case
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
        let hasError = false;

        subjects.forEach(subject => {
            const finalMarks = calculateFinalMarks(subject);
            if (finalMarks > subject.topperMarks) {
                toast({
                    variant: "destructive",
                    title: "Error in " + subject.name,
                    description: "Your marks cannot be greater than the topper's marks.",
                })
                hasError = true;
            }
            if(subject.credits > 0 && subject.topperMarks > 0 && !hasError) {
                const grade = calculateGrade(finalMarks, subject.topperMarks);
                totalPoints += grade.points * subject.credits;
                totalCredits += subject.credits;
            }
        });

        if(hasError) {
            setSgpa(null);
            return;
        }

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
              Subjects are loaded automatically based on your profile. You can also change the selection.
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
                                <TableHead>Mid Sem (50)</TableHead>
                                <TableHead>TA (20)</TableHead>
                                <TableHead>End Sem (100)</TableHead>
                                <TableHead>Lab (100)</TableHead>
                                <TableHead>Topper's Total</TableHead>
                                <TableHead>Final Marks</TableHead>
                                <TableHead>Grade</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subjects.map(subject => {
                                const finalMarks = calculateFinalMarks(subject);
                                const gradeInfo = calculateGrade(finalMarks, subject.topperMarks);
                                return (
                                    <TableRow key={subject.id}>
                                        <TableCell>
                                           <Input 
                                            value={subject.name} 
                                            onChange={(e) => handleSubjectChange(subject.id, 'name', e.target.value)} 
                                            className="font-semibold w-48 border-none focus-visible:ring-1"
                                           />
                                           <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                            {subject.code}
                                            <button onClick={() => handleSubjectChange(subject.id, 'isLab', !subject.isLab)} title="Toggle Lab/Theory">
                                                <FlaskConical className={`h-4 w-4 cursor-pointer ${subject.isLab ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`} />
                                            </button>
                                           </div>
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" min="0" value={subject.credits} onChange={e => handleSubjectChange(subject.id, 'credits', parseInt(e.target.value) || 0)} className="w-20" />
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" value={subject.marks.midSem} onChange={e => handleMarkChange(subject.id, 'midSem', parseInt(e.target.value) || 0)} disabled={subject.isLab} className="w-24" />
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" value={subject.marks.teacherAssessment} onChange={e => handleMarkChange(subject.id, 'teacherAssessment', parseInt(e.target.value) || 0)} disabled={subject.isLab} className="w-24"/>
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" value={subject.marks.endSem} onChange={e => handleMarkChange(subject.id, 'endSem', parseInt(e.target.value) || 0)} disabled={subject.isLab} className="w-24" />
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" value={subject.marks.lab} onChange={e => handleMarkChange(subject.id, 'lab', parseInt(e.target.value) || 0)} disabled={!subject.isLab} className="w-24" />
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" min="0" max="100" value={subject.topperMarks} onChange={e => handleSubjectChange(subject.id, 'topperMarks', parseInt(e.target.value) || 0)} className="w-24" />
                                        </TableCell>
                                        <TableCell className={`font-bold ${finalMarks > subject.topperMarks ? 'text-destructive' : ''}`}>
                                            {finalMarks.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="font-bold">{gradeInfo.grade}</TableCell>
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
      <Alert variant="destructive" className="mt-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Disclaimer</AlertTitle>
        <AlertDescription>
          The calculated SGPA is an estimate based on relative grading. It may not match your official result exactly.
        </AlertDescription>
      </Alert>
      <Card className="mt-8 bg-secondary/30">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><Info className="h-5 w-5"/>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
            <p><strong>1. Marking Scheme:</strong></p>
            <ul className="list-disc pl-5 text-muted-foreground">
                <li><strong>Theory Subjects:</strong> Total marks (100) = 60% of Mid-Sem (out of 50) + 50% of End-Sem (out of 100) + Teacher's Assessment (out of 20).</li>
                <li><strong>Lab Subjects:</strong> Total marks are out of 100.</li>
                <li>Use the <FlaskConical className="inline h-4 w-4" /> icon to toggle a subject between Theory and Lab.</li>
            </ul>
            <p><strong>2. Relative Grading:</strong></p>
            <p className="text-muted-foreground">
                Your grade is calculated relative to the topper's total marks in that subject. The formula used is: `(Your Total Marks / Topper's Total Marks) * 100`. This percentage then maps to a grade point (e.g., >= 90% is A+ with 10 points). Your marks cannot exceed the topper's marks. The default topper's marks are set to 94 but can be adjusted.
            </p>
            <p><strong>3. SGPA Calculation:</strong></p>
            <p className="text-muted-foreground">
                The SGPA is the weighted average of your grade points. It's calculated by summing the products of (Credit × Grade Point) for all subjects and then dividing by the total credits. Formula: `Σ(Creditᵢ × GradePointᵢ) / Σ(Creditᵢ)`.
            </p>
             <p className="font-semibold mt-4">Note: Your marks in any component cannot exceed the maximum marks for that component (e.g. 50 for Mid-Sem). The calculator enforces this automatically.</p>
        </CardContent>
      </Card>
    </div>
  );
}
