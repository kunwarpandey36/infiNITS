
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { courseData, branchCodeMapping } from '@/lib/course-data';
import { useStudentData } from '@/hooks/use-student-data';

interface Subject {
    code: string;
    name: string;
    credits: number;
    resourceUrl?: string;
}

const getSubjectsByBranchAndSem = (branch: string, semester: string): Subject[] => {
    const branchKey = Object.keys(branchCodeMapping).find(key => branchCodeMapping[key as keyof typeof branchCodeMapping] === branch);
    if (!branchKey || !courseData[branchKey as keyof typeof courseData]?.[semester as keyof typeof courseData[keyof typeof courseData]]) {
        return [];
    }
    return courseData[branchKey as keyof typeof courseData][semester as keyof typeof courseData[keyof typeof courseData]];
};
  

export default function BranchResourcesPage() {
  const router = useRouter();
  const student = useStudentData();
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  
  const availableBranches = useMemo(() => Object.values(branchCodeMapping), []);

  useEffect(() => {
    if (student) {
      setSelectedSemester(student.semester);
      setSelectedBranch(student.branch);
    }
  }, [student]);

  useEffect(() => {
    if(selectedBranch && selectedSemester) {
        const loadedSubjects = getSubjectsByBranchAndSem(selectedBranch, selectedSemester);
        setSubjects(loadedSubjects);
    } else {
        setSubjects([]);
    }
  }, [selectedSemester, selectedBranch]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Branch Resources
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Find Your Subjects</CardTitle>
          <CardDescription>
            Select your semester and branch to find available resources for your subjects. Your profile defaults are pre-selected.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
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
            </div>

            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Subjects for {selectedBranch} - {selectedSemester}{['st', 'nd', 'rd'][parseInt(selectedSemester)-1] || 'th'} Semester</CardTitle>
                </CardHeader>
                <CardContent>
                    {subjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {subjects.map(subject => (
                                <Card key={subject.code} className="hover:shadow-md transition-shadow">
                                  <CardContent className="p-4 flex items-center gap-4">
                                      <FileText className="h-8 w-8 text-primary" />
                                      <div>
                                          <p className="font-semibold">{subject.name}</p>
                                          <p className="text-sm text-muted-foreground">{subject.code}</p>
                                      </div>
                                  </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            <p>Select a semester and branch to see the subjects.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

        </CardContent>
      </Card>
    </div>
  );
}
