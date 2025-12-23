import { NextResponse } from 'next/server';
import { branchCodeMapping, newBranchCodeMapping } from '@/lib/course-data';
import { mergedStudentData } from '@/lib/nit-silchar-student-data';

interface Student {
  scholarId: string;
  name: string;
  sgpa?: string[];
  cgpa?: string;
  sgpa_prev?: string[];
  sgpa_curr?: string;
}

export async function POST(request: Request) {
  try {
    const { nit, scholarId } = await request.json();

    if (!scholarId || !nit) {
      return NextResponse.json({ message: 'NIT and Scholar ID cannot be empty.' }, { status: 400 });
    }

    if (nit.toLowerCase() !== 'national institute of technology, silchar') {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const student = mergedStudentData.find((s: any) => s.scholarId === scholarId);

    if (!student) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 404 });
    }

    const admissionYear = parseInt(scholarId.substring(0, 2), 10);
    let branch = 'Unknown';
    let semester = 1;

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    let yearDiff = currentYear - admissionYear;

    if (scholarId.startsWith('25')) {
      const branchKey = scholarId.substring(2, 4);
      branch = newBranchCodeMapping[branchKey as keyof typeof newBranchCodeMapping] || 'Unknown';
    } else {
      const branchCode = parseInt(scholarId.substring(3, 4), 10);
      const branchKey = Object.keys(branchCodeMapping).find(
        (key) => parseInt(key) === branchCode
      );
      branch = branchKey ? branchCodeMapping[branchKey as keyof typeof branchCodeMapping] : 'Unknown';
    }

    if (currentMonth >= 7 && currentMonth <= 12) {
      semester = yearDiff * 2 + 1;
    } else {
      semester = yearDiff * 2;
    }

    if (semester > 8) semester = 8;
    if (semester <= 0) semester = 1;

    const userProfile = {
      scholarId: student.scholarId,
      name: student.name,
      branch: branch,
      semester: semester.toString(),
      sgpa: student.sgpa || 'N/A',
      cgpa: student.cgpa || 'N/A',
      sgpa_prev: student.sgpa_prev || 'N/A',
      sgpa_curr: student.sgpa_curr || 'N/A',
    };

    return NextResponse.json(userProfile);

  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred. Please try again later.' }, { status: 500 });
  }
}
