'use client';

import { useStudentData } from '@/hooks/use-student-data';
import { mergedStudentData } from '@/lib/student-data';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

export default function BranchResults() {
  const student = useStudentData();

  const getBranchStudents = () => {
    if (!student) return [];
    const admissionYear = student.scholarId.substring(0, 2);
    const isNewFormat = student.scholarId.startsWith('25');

    return mergedStudentData
      .filter((s) => {
        if (s.scholarId.substring(0, 2) !== admissionYear) {
          return false;
        }
        if (isNewFormat) {
          return (
            s.scholarId.startsWith('25') &&
            s.scholarId.substring(2, 4) === student.scholarId.substring(2, 4)
          );
        } else {
          return (
            !s.scholarId.startsWith('25') &&
            s.scholarId.substring(3, 4) === student.scholarId.substring(3, 4)
          );
        }
      })
      .sort((a, b) => (b.sgpa || 0) - (a.sgpa || 0));
  };

  const branchStudents = getBranchStudents();

  if (!student) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Branch Results</CardTitle>
        <CardDescription>
          Results of all students in {student.branch} (Semester {student.semester}). (The new semester result will be added within one day after result declaration)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>SGPA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branchStudents.map((s, index) => (
                <TableRow key={s.scholarId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{s.name} ji</TableCell>
                  <TableCell>{s.sgpa || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
