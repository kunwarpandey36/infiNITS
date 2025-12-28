'use client';

import { useState, useEffect } from 'react';
import { useStudentData } from '@/hooks/use-student-data';
import { mergedStudentData } from '@/lib/nit-silchar-student-data';
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
import { Skeleton } from '@/components/ui/skeleton';

export default function BranchResults() {
  const [hasMounted, setHasMounted] = useState(false);
  const student = useStudentData();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const getBranchStudents = () => {
    if (!student) return [];
    const admissionYear = student.scholarId.substring(0, 2);
    const isNewFormat = student.scholarId.startsWith('25');

    return mergedStudentData
      .filter((s) => {
        if (s.scholarId.substring(0, 2) !== admissionYear) return false;
        if (isNewFormat) {
          return s.scholarId.startsWith('25') && s.scholarId.substring(2, 4) === student.scholarId.substring(2, 4);
        } else {
          return !s.scholarId.startsWith('25') && s.scholarId.substring(3, 4) === student.scholarId.substring(3, 4);
        }
      })
      .sort((a, b) => (b.cgpa || 0) - (a.cgpa || 0));
  };

  const branchStudents = getBranchStudents();
  const userRank = student ? branchStudents.findIndex(s => s.scholarId === student.scholarId) : -1;

  if (!hasMounted) {
    return (
      <Card>
        <CardHeader>
            <CardTitle className="font-headline"><Skeleton className="h-6 w-1/2" /></CardTitle>
            <CardDescription><Skeleton className="h-4 w-full" /></CardDescription>
        </CardHeader>
        <CardContent>
            <Skeleton className="w-full h-96" />
        </CardContent>
      </Card>
    );
  }

  if (!student) {
    // This case will be hit on the client if student data is not yet available.
    // A more specific loading state could be used here, but the skeleton is a good default.
    return (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Branch CGPA Ranking</CardTitle>
            <CardDescription>Loading student data...</CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-96" />
          </CardContent>
        </Card>
      );
  }

  const description = userRank !== -1
    ? `You are ranked #${userRank + 1} in your class of ${branchStudents.length} students. This is the CGPA ranking for your branch.`
    : 'This is the CGPA ranking for your branch.';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Branch CGPA Ranking: {student.branch}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>CGPA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branchStudents.map((s, index) => (
                <TableRow key={s.scholarId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.cgpa || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
