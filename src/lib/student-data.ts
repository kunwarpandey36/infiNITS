
import studentData from './student-data.json';

export interface Student {
  name: string;
  scholarId: string;
  sgpa?: number | string;
  cgpa?: number | string;
}

const scholarIdMap = new Map<string, Student>();

// Filter out any entries without a scholarId and ensure NA names are handled
(studentData as Student[]).forEach(student => {
  if (student.scholarId) {
    const existingStudent = scholarIdMap.get(student.scholarId);
    if (!existingStudent || (student.name && student.name.toUpperCase() !== 'NA')) {
       scholarIdMap.set(student.scholarId, student);
    }
  }
});

export const mergedStudentData: Student[] = Array.from(scholarIdMap.values());
