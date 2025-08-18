
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStudentData } from '@/hooks/use-student-data';
import { timetableData } from '@/lib/timetable-data';
import { Clock } from 'lucide-react';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = [
    "8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00",
    "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00"
];

export default function TodaysTimetable() {
    const student = useStudentData();
    const [currentDay, setCurrentDay] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [availableSections, setAvailableSections] = useState<string[]>([]);
    
    const storageKey = useMemo(() => `timetable-section-${student?.scholarId}`, [student]);

    useEffect(() => {
        const today = new Date();
        setCurrentDay(days[today.getDay()]);
        
        if (student) {
            const sections = Object.keys(timetableData[student.semester]?.[student.branch] || {});
            setAvailableSections(sections);

            const savedSection = localStorage.getItem(storageKey);
            if (savedSection && sections.includes(savedSection)) {
                setSelectedSection(savedSection);
            } else if (sections.length > 0) {
                setSelectedSection(sections[0]);
            }
        }
    }, [student, storageKey]);

    useEffect(() => {
        if (selectedSection && student) {
            localStorage.setItem(storageKey, selectedSection);
        }
    }, [selectedSection, storageKey, student]);

    const todaysSchedule = useMemo(() => {
        if (!student || !selectedSection || !currentDay || currentDay === 'Sunday' || currentDay === 'Saturday') {
            return [];
        }

        const daySchedule = timetableData[student.semester]?.[student.branch]?.[selectedSection]?.[currentDay] || {};
        
        return timeSlots.map(slot => ({
            time: slot,
            subject: daySchedule[slot] || '---'
        })).filter(item => item.subject !== '---');

    }, [student, selectedSection, currentDay]);
    
    if (!student) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Clock className="text-primary" /> Today's Timetable ({currentDay})
                </CardTitle>
                <CardDescription>
                    Your schedule for today based on your profile. Select a section if applicable.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {availableSections.length > 1 && (
                    <div className="mb-4">
                        <label className="text-sm font-medium">Select Section</label>
                        <Select value={selectedSection} onValueChange={setSelectedSection}>
                            <SelectTrigger className="w-[180px] mt-1">
                                <SelectValue placeholder="Select Section" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableSections.map(sec => (
                                    <SelectItem key={sec} value={sec}>Section {sec}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                
                {todaysSchedule.length > 0 ? (
                    <div className="space-y-3">
                        {todaysSchedule.map((item, index) => (
                           <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                                <p className="font-semibold">{item.subject}</p>
                                <p className="text-sm text-muted-foreground">{item.time}</p>
                           </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-muted-foreground">
                        <p>No classes scheduled for today or timetable not available.</p>
                    </div>
                )}

            </CardContent>
        </Card>
    );
}
