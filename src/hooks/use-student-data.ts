
'use client';

import { useState, useEffect } from 'react';

interface StudentProfile {
  scholarId: string;
  name: string;
  branch: string;
  semester: string;
  sgpa?: number | string;
  cgpa?: number | string;
}

export function useStudentData(): StudentProfile | null {
  const [student, setStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    // This code runs only on the client side
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        setStudent(JSON.parse(storedProfile));
      } catch (e) {
        console.error("Failed to parse user profile from localStorage", e);
        setStudent(null);
      }
    }
  }, []);

  return student;
}
