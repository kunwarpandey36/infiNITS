'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { timetableData } from '@/lib/timetable-data';
import { useStudentData } from '@/hooks/use-student-data';

interface Subject {
    code: string;
    name: string;
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
          // Extract subject code, e.g., "MA 201" from "MA 201 (TA1)"
          const match = classInfo.match(/^([A-Z]{2,3}\s?\d{3,})/);
          if (match) {
              subjects.add(match[1].trim());
          }
      });
    });
  
    return Array.from(subjects).map(code => ({
      code: code,
      name: code, // We can expand this later if we have a mapping of codes to full names
    }));
  };
  

export default function BranchResourcesPage() {
  const router = useRouter();
  const student = useStudentData();
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  
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

  // Adjust selected branch if it's not available in the new semester
  useEffect(() => {
    if (!availableBranches.includes(selectedBranch) && availableBranches.length > 0) {
      setSelectedBranch(availableBranches[0]);
    }
  }, [selectedSemester, availableBranches, selectedBranch]);

  useEffect(() => {
    if(selectedBranch && selectedSemester) {
        // We'll use section 'A' as a default for fetching resources.
        const loadedSubjects = getSubjectsFromTimetable(selectedSemester, selectedBranch, 'A');
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
                            <SelectItem value="1">1st Semester</SelectItem>
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
