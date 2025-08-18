
import studentData from './student-data.json';

export interface Student {
  name: string;
  scholarId: string;
  sgpa?: number | string;
  cgpa?: number | string;
}

const scholarIdMap = new Map<string, Student>();

(studentData as Student[]).forEach(student => {
  scholarIdMap.set(student.scholarId, student);
});

export const mergedStudentData: Student[] = Array.from(scholarIdMap.values());
