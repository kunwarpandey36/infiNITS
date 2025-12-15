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
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const parsedProfile: StudentProfile = JSON.parse(storedProfile);
        if (parsedProfile.name && parsedProfile.name !== 'Student') {
            setStudent(parsedProfile);
        } else {
            // If name is missing or default, refetch from API
            fetch(`/api/student/${parsedProfile.scholarId}`)
                .then(res => res.json())
                .then(fullProfile => {
                    // Assuming the API returns a full profile
                    const updatedProfile = { ...parsedProfile, ...fullProfile };
                    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
                    setStudent(updatedProfile);
                })
                .catch(e => {
                    console.error("Failed to refetch student profile", e);
                    setStudent(parsedProfile); // Fallback to stored profile
                });
        }
      } catch (e) {
        console.error("Failed to parse user profile from localStorage", e);
        setStudent(null);
      }
    }
  }, []);

  return student;
}
