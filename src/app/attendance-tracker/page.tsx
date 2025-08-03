'use client';

import { useState, type FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PlusCircle, Trash2 } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  code: string;
  total: number;
  attended: number;
}

export default function AttendanceTrackerPage() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: 'Data Structures', code: 'CS201', total: 20, attended: 18 },
    { id: 2, name: 'Algorithms', code: 'CS202', total: 22, attended: 15 },
  ]);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectCode, setNewSubjectCode] = useState('');

  const handleAddSubject = (e: FormEvent) => {
    e.preventDefault();
    if (newSubjectName.trim() === '' || newSubjectCode.trim() === '') return;
    const newSubject: Subject = {
      id: Date.now(),
      name: newSubjectName,
      code: newSubjectCode,
      total: 0,
      attended: 0,
    };
    setSubjects([...subjects, newSubject]);
    setNewSubjectName('');
    setNewSubjectCode('');
  };

  const handleDeleteSubject = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const handleAttendanceChange = (id: number, type: 'attended' | 'total', value: number) => {
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
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        Attendance Tracker
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
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
                  <TableHead className="w-[100px]">Attended</TableHead>
                  <TableHead className="w-[100px]">Total</TableHead>
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
                                <div className="font-medium">{subject.name}</div>
                                <div className="text-sm text-muted-foreground">{subject.code}</div>
                            </TableCell>
                            <TableCell>
                                <Input
                                type="number"
                                value={subject.attended}
                                onChange={(e) => handleAttendanceChange(subject.id, 'attended', parseInt(e.target.value))}
                                className="w-20"
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                type="number"
                                value={subject.total}
                                onChange={(e) => handleAttendanceChange(subject.id, 'total', parseInt(e.target.value))}
                                className="w-20"
                                />
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Add New Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSubject} className="space-y-4">
              <Input
                placeholder="Subject Name"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                required
              />
              <Input
                placeholder="Subject Code"
                value={newSubjectCode}
                onChange={(e) => setNewSubjectCode(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
