'use client';

import { useState, useEffect } from 'react';

interface StudentProfile {
  scholarId: string;
  name: string;
  branch: string;
  semester: string;
}

export function useStudentData(): StudentProfile | null {
  const [student, setStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    // This code runs only on the client side
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setStudent(JSON.parse(storedProfile));
    }
  }, []);

  return student;
}
