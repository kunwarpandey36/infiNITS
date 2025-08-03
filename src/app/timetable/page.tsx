'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const timetableData = {
  CE: {
    A: {
      Monday: { '8:00-9:00': 'MA 201 (TA1)', '10:00-11:00': 'CE 202 (PD)', '11:00-12:00': 'CE 201 (A Sahu)', '1:00-2:00': 'CE 204 (MH)', '2:00-5:00': 'CE 212 A1 (NA), CE 211 A2 (MH)' },
      Tuesday: { '8:00-9:00': 'CE 201 T A2 (A Sahu)', '9:00-10:00': 'MA 201', '10:00-11:00': 'CE 202 (PD)', '11:00-12:00': 'CE 201 (A Sahu)', '1:00-2:00': 'MA 201 (T A2)', '2:00-5:00': 'CE 213 A1 (DM), CE 212 A2 (TR)' },
      Wednesday: { '8:00-9:00': 'CE 204 (MH)', '9:00-10:00': 'CE 202 (PD)', '10:00-11:00': 'MA 201', '11:00-12:00': 'CE 203 (OB)', '1:00-2:00': 'CE 205 (PR)', '2:00-5:00': 'CE 213 A2 (PJ)' },
      Thursday: { '8:00-9:00': 'CE 204 T A2 (MH)', '9:00-10:00': 'CE 203 (OB)', '10:00-11:00': 'MA 201', '11:00-12:00': 'CE 204 T A1 (MH)', '1:00-2:00': 'CE 201 T A1 (A Sahu)', '2:00-5:00': 'CE 211 A1 (DM)' },
      Friday: { '9:00-10:00': 'CE 204 T A2 (MH)', '10:00-11:00': 'CE 203 (OB)', '11:00-12:00': 'CE 205 (PR)', '1:00-2:00': 'CE 201 (A Sahu)' },
    },
    B: {
      Monday: { '11:00-12:00': 'MA 201', '1:00-2:00': 'CE 201 (SB)', '2:00-5:00': 'CE 204 (Kh.LS)' },
      Tuesday: { '8:00-9:00': 'CE 205 (J Hazarika)', '9:00-10:00': 'CE 204 T B1 (Kh.LS)', '10:00-11:00': 'CE 202 (PJ)', '11:00-12:00': 'CE 201 (SB)', '2:00-5:00': 'CE 211 B2 (DP)' },
      Wednesday: { '8:00-9:00': 'CE 204 (Kh.LS)', '9:00-10:00': 'CE 203 (DP)', '10:00-11:00': 'CE 205 (J Hazarika)', '11:00-12:00': 'CE 202 (PJ)', '1:00-2:00': 'MA 201', '2:00-5:00': 'CE 211 B1 (VVK)' },
      Thursday: { '8:00-9:00': 'CE 204 T B2 (Kh.LS)', '9:00-10:00': 'CE 205 (J Hazarika)', '10:00-11:00': 'CE 203 (DP)', '11:00-12:00': 'CE 201 (SB)', '1:00-2:00': 'CE 205 (PR)', '2:00-5:00': 'CE 212 B1 (DKG)' },
      Friday: { '9:00-10:00': 'CE 204 T B2 (Kh.LS)', '10:00-11:00': 'CE 205 (J Hazarika)', '11:00-12:00': 'CE 201 T B1 (SB)', '1:00-2:00': 'CE 205 (PR)', '2:00-5:00': 'CE 213 B1 (J Haloi), CE 212 B2 (AS)' },
    },
  },
  ME: {
    A: {
        Monday: { '8:00-9:00': 'MA 201 (TA1)', '9:00-10:00': 'ME 204 (L) SK/PKP', '11:00-12:00': 'ME 203 (L) AB', '2:00-5:00': 'ME 213 (Thermo Fluid Lab-I) A1, ME 211 (Machine Drawing Lab) A2' },
        Tuesday: { '9:00-10:00': 'ME 202 (L) VM/ABD', '10:00-11:00': 'ME 201 (L) SP', '11:00-12:00': 'ME 204 (L) SK/PKP', '1:00-2:00': 'MA 201 (T A2)', '2:00-5:00': 'ME 212 (Manufacturing Lab) A1, ME 213 (Thermo Fluid Lab-I) A2' },
        Wednesday: { '8:00-9:00': 'ME 202 (L) VM/ABD', '9:00-10:00': 'ME 203 (L) AB', '10:00-11:00': 'MA 201', '11:00-12:00': 'ME 205 (SH)', '1:00-2:00': 'ME 204 (L) SK/PKP', '2:00-5:00': 'ME 211 (Machine Drawing Lab) A1, ME 212 (Manufacturing Lab) A2' },
        Thursday: { '8:00-9:00': 'ME 201 (L) SP', '10:00-11:00': 'MA 201', '11:00-12:00': 'ME 201 (T) A2 SP', '1:00-2:00': 'CE 201 (A Sahu)', '2:00-5:00': 'ME 212 (Manufacturing Lab) B1' },
        Friday: { '8:00-9:00': 'ME 201 (T) A1 SP', '9:00-10:00': 'ME 202 (T) A2', '10:00-11:00': 'MA 201', '11:00-12:00': 'MA 201 (T B1)', '1:00-2:00': 'ME 203 (T) A1 AB' }
      },
      B: {
        Monday: { '8:00-9:00': 'ME 205 (L) SKD', '9:00-10:00': 'ME 203 (L) SSTR', '11:00-12:00': 'MA 201', '1:00-2:00': 'ME 201 (RDM)', '2:00-5:00': 'ME 201 (L) SP, ME 203 (T) B1 SSTR' },
        Tuesday: { '8:00-9:00': 'ME 201 (RDM)', '9:00-10:00': 'ME 204 (L) BD', '10:00-11:00': 'ME 202 (L) ABI', '11:00-12:00': 'MA 201', '2:00-5:00': 'ME 211 (Machine Drawing Lab) B1' },
        Wednesday: { '8:00-9:00': 'ME 203 (L) SSTR', '9:00-10:00': 'ME 205 (L) SKD', '10:00-11:00': 'ME 204 (L) BD', '11:00-12:00': 'ME 202 (L) ABI', '1:00-2:00': 'MA 201', '2:00-5:00': 'ME 213 (Thermo Fluid Lab-I) B1' },
        Thursday: { '8:00-9:00': 'ME 204 (L) BD', '9:00-10:00': 'ME 203 (L) SSTR', '10:00-11:00': 'MA 201', '11:00-12:00': 'ME 201 (T)B1 (RDM)', '1:00-2:00': 'ME 202 (T) B1 ABI', '2:00-5:00': 'ME 211 Machine Drawing Lab) B2' },
        Friday: { '8:00-9:00': 'ME 201 (T)B1 (RDM)', '11:00-12:00': 'MA 201 (T B1)', '1:00-2:00': 'ME 212 (Manufacturing Lab) B1' }
      },
  },
  EE: {
    A: {
        Monday: { '8:00-9:00': 'MA 201 (TAI)', '9:00-10:00': 'EE 205 (MB)', '10:00-11:00': 'EC 226 (A1) (KLB)', '11:00-12:00': 'EE 205 (T/A2) (PR)', '1:00-2:00': 'EE 204 (CB)', '2:00-5:00': 'EE 211 (B1) (APa), EE 212 (B2) (SR)' },
        Tuesday: { '9:00-10:00': 'MA 201', '10:00-11:00': 'EE 201 (AP)', '11:00-12:00': 'EE 201 (AP)', '1:00-2:00': 'EE 203 (SM)', '2:00-5:00': 'EE 211: Prog. & Simulation Lab (A1) (AKG)' },
        Wednesday: { '8:00-9:00': 'EE 202 (T/A1) (SSK)', '9:00-10:00': 'EE 202 (SSK)', '10:00-11:00': 'MA 201', '11:00-12:00': 'EE 205 (PR)', '1:00-2:00': 'EE 203 (SM)', '2:00-5:00': 'EE 212: Measurement Lab (Al) (VS)' },
        Thursday: { '8:00-9:00': 'ME 201 (T)B2 (RDM)', '9:00-10:00': 'EE 204 (T/A1) (CB)', '10:00-11:00': 'EE 201 (T/A1) (AP)', '11:00-12:00': 'EE 205 (T/A1) (PR)', '1:00-2:00': 'EE 204 (CB)' },
        Friday: { '8:00-9:00': 'EE 205 (PR)', '9:00-10:00': 'EC 226: Analog Lab- A2', '10:00-11:00': 'EE 202 (SSK)', '11:00-12:00': 'EE 202 (SSK)' }
      },
      B: {
        Monday: { '8:00-9:00': 'MA 201 (TAI)', '9:00-10:00': 'EE221 APa', '10:00-11:00': 'EE 204 (T/A2) (CB)', '11:00-12:00': 'EE 202 (SC)', '1:00-2:00': 'EE 201 EE 202', '2:00-5:00': 'EE 211: Prog. & Simulation Lab (B1) (APa), EE 212: Measurement Lab (B2) (SR)' },
        Tuesday: { '9:00-10:00': 'EC 226', '10:00-11:00': 'Analog Laboratory (B1)', '11:00-12:00': 'EE 205 (T/B2) (MB)', '1:00-2:00': 'MA 201', '2:00-5:00': 'EE 212: Measurement Lab (A2) (DS)' },
        Wednesday: { '9:00-10:00': 'EE 202 (SC)', '10:00-11:00': 'EE 205 (MB)', '11:00-12:00': 'EE 201 (BG)', '1:00-2:00': 'EE 204 (SR)', '2:00-5:00': 'EE 204 (T/B2) (SR)' },
        Thursday: { '8:00-9:00': 'MA 201 (TB1)', '9:00-10:00': 'MA 201', '10:00-11:00': 'EE 202 (SC)', '11:00-12:00': 'EE 205 (MB)', '1:00-2:00': 'EE 203 (VS)', '2:00-5:00': 'EE 212: Measurement Lab (B1) (SR)' },
        Friday: { '8:00-9:00': 'MA 201 (T B2)', '1:00-2:00': 'EE 203 (VS)' }
      },
  },
  ECE: {
    A: {
        Monday: { '8:00-9:00': 'CS-222 Sec-B T/B1 PS', '10:00-11:00': 'MA 201', '11:00-12:00': 'CS-222 Sec-A PKN', '1:00-2:00': 'EE 202 (SSK)', '2:00-5:00': 'EE 202 (T/A2) (SSK)' },
        Tuesday: { '8:00-9:00': 'EE221 APa', '9:00-10:00': 'MA 201', '10:00-11:00': 'EC-201 (HK)', '11:00-12:00': 'EC-203 (BB)', '1:00-2:00': 'MA 201 (T A2)', '2:00-5:00': 'EE-222' },
        Wednesday: { '9:00-10:00': 'MA 201', '10:00-11:00': 'EC-201 (DD)', '11:00-12:00': 'CS-222 Sec-A PKN', '1:00-2:00': 'EC-221 T/A2 Apa', '2:00-5:00': 'EC-211 (A1) (FAT)' },
        Thursday: { '8:00-9:00': 'CS-222 T/A1 PKN', '9:00-10:00': 'EC-203 BB)(T A2)', '10:00-11:00': 'EC-202 (KM)', '11:00-12:00': 'EC-201 (HK)', '1:00-2:00': 'EE221 T/AI APa', '2:00-5:00': 'EE-222 (A1)' },
        Friday: { '10:00-11:00': 'CS201 (B) (BS)', '11:00-12:00': 'CE 201 T A1 (A Sahu)' }
      },
      B: {
        Monday: { '8:00-9:00': 'MA 201', '9:00-10:00': 'EC-203 (MVS)(T B1)', '10:00-11:00': 'EC-201 (DD)', '11:00-12:00': 'EC-201 (DD)', '1:00-2:00': 'EE 202 (T/A2) (SSK)', '2:00-5:00': 'EC-203 EC-202 (KM) (T A1)' },
        Tuesday: { '8:00-9:00': 'EE-221 PK T/BI', '9:00-10:00': 'EC-202 (RS)(T B1)', '10:00-11:00': 'EC-202 (RS)', '11:00-12:00': 'EC-203 (MVS)', '1:00-2:00': 'EE-221 PK', '2:00-5:00': 'EC-211 (A2) (AK' },
        Wednesday: { '8:00-9:00': 'EC-202 (RS)(T B2)', '9:00-10:00': 'EC-203 (BB)', '10:00-11:00': 'EC-202 (KM)', '11:00-12:00': 'MA 201', '2:00-5:00': 'EE-221 PK T/B2' },
        Thursday: { '8:00-9:00': 'MA 201 (T B1)', '9:00-10:00': 'MA 201', '10:00-11:00': 'CS-222 Sec-B PS', '11:00-12:00': 'EC-202 (RS)', '1:00-2:00': 'EC-203 MVS)(T B2)' },
        Friday: { '8:00-9:00': 'EC-221 (PPD) (T B1)', '9:00-10:00': 'MA 201 (T B2)', '11:00-12:00': 'MA 201' }
      },
  },
  CSE: {
    A: {
        Monday: { '8:00-9:00': 'MA 201', '9:00-10:00': 'EC221 (SKT/WA)', '10:00-11:00': 'CS201 (RP)', '11:00-12:00': 'EF223', '1:00-2:00': 'EE223 T(A2)', '2:00-5:00': 'EC-211 (B2) (RS), CS211 A (SP)' },
        Tuesday: { '9:00-10:00': 'MA 201', '10:00-11:00': 'EC221 (A)', '11:00-12:00': 'EE223 (A)', '1:00-2:00': 'CS202 T (A2) LDS', '2:00-5:00': 'EE224 (A1)' },
        Wednesday: { '9:00-10:00': 'MA 201', '10:00-11:00': 'CS201 (RP)', '11:00-12:00': 'CS201 (RP)', '1:00-2:00': 'MA 201 T (A2)', '2:00-5:00': 'CS-222 Sec-A T/A2 PKN' },
        Thursday: { '8:00-9:00': 'CS202 T (A1) LDS', '9:00-10:00': 'EC-221 (SKT/WA) (TA2)', '10:00-11:00': 'CS202 (A) LDS', '11:00-12:00': 'EC-221 (SKT/WA)', '1:00-2:00': 'EE223 T(A2)', '2:00-5:00': 'EF224 (A2)' },
        Friday: { '8:00-9:00': 'MA 201 (T2)', '11:00-12:00': 'ME 203 (T) A1 AB' }
      },
      B: {
        Monday: { '8:00-9:00': 'CS201 T (B2) BS', '9:00-10:00': 'EC-221 (PPD) (T B2)', '10:00-11:00': 'EC-221 (PPD)', '11:00-12:00': 'EE223', '1:00-2:00': 'MA 201 (T B1)', '2:00-5:00': 'EE224 (B1), EI 213-CN Lab (G2)' },
        Tuesday: { '8:00-9:00': 'EC-221 (PPD), CS202 T (B2) DPC', '9:00-10:00': 'MA 201', '10:00-11:00': 'EE223 (B), CS 222 (UM)', '11:00-12:00': 'CS201 (B) (BS)', '2:00-5:00': 'EC222 (B1) (PPD)' },
        Wednesday: { '8:00-9:00': 'CS201 T (A1)(RP)', '9:00-10:00': 'MA 201', '10:00-11:00': 'CS201 (B) (BS)', '11:00-12:00': 'CS201 (B) (BS)', '2:00-5:00': 'CS211 (B) BS' },
        Thursday: { '8:00-9:00': 'MA 201 (T B2)', '10:00-11:00': 'EE223 (B)', '11:00-12:00': 'CS202 (B) DPC', '1:00-2:00': 'MA 201', '2:00-5:00': 'EC222 (B2) (DSG)' },
        Friday: { '8:00-9:00': 'CS202 T (B1) DPC', '9:00-10:00': 'MA 201 (T1)', '1:00-2:00': 'El 213-CN Lab (G1)/CS 223 (G2)' }
      },
  },
  EIE: {
    '': {
      Monday: { '8:00-9:00': 'MA 201', '9:00-10:00': 'EI 202 (RD)', '10:00-11:00': 'El 201 (SHL/VCP)', '11:00-12:00': 'CS 222 (UM)', '1:00-2:00': 'El 203 TI (AKS)', '2:00-5:00': 'EI 213-CN Lab (G2)' },
      Tuesday: { '8:00-9:00': 'El 202 (RD)', '9:00-10:00': 'MA 201', '10:00-11:00': 'EE223 (B), CS 222 (UM)', '11:00-12:00': 'EI 203 (AKS)', '1:00-2:00': 'El 202 TI (RD)', '2:00-5:00': 'CS 223 Lab (G1 and G2) (UM)' },
      Wednesday: { '8:00-9:00': 'CS202 T (A2) LDS', '9:00-10:00': 'EC-201 (DD)', '11:00-12:00': 'EI 203 (AKS)', '1:00-2:00': 'EI 202 (RD)', '2:00-5:00': 'EI 212 G2/EI 211 G1' },
      Thursday: { '8:00-9:00': 'EI 203 (AKS)', '9:00-10:00': 'EI 201 (SHL/VCP)', '10:00-11:00': 'CS 222 T/G2 (UM)', '11:00-12:00': 'EI 202 T2', '1:00-2:00': 'El 201 T1 (SHL/VCP)', '2:00-5:00': 'EI 212 (G1)/ EI 211(G2)' },
      Friday: { '9:00-10:00': 'CS 222 T/G1 (UM)', '10:00-11:00': 'EI 201 (SHL/VCP)', '11:00-12:00': 'CE 201 T A1 (A Sahu)' },
    },
  },
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '1:00-2:00', '2:00-5:00'];
const branches = ['CE', 'ME', 'EE', 'ECE', 'CSE', 'EIE'];
const branchFullNames: { [key: string]: string } = {
    CE: 'Civil Engineering',
    ME: 'Mechanical Engineering',
    EE: 'Electrical Engineering',
    ECE: 'Electronics & Communication Engineering',
    CSE: 'Computer Science & Engineering',
    EIE: 'Electronics & Instrumentation Engineering',
};

export default function TimetablePage() {
  const [activeBranch, setActiveBranch] = useState('CSE');
  const [activeSection, setActiveSection] = useState('A');

  const currentBranchSections = Object.keys(timetableData[activeBranch as keyof typeof timetableData]);
  const hasSections = currentBranchSections.length > 1;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        Class Timetable
      </h1>
      <Card>
        <CardHeader>
            <CardTitle>3rd Semester Timetable (July-Dec 2025)</CardTitle>
            <CardDescription>Select your branch to view the schedule.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeBranch} onValueChange={setActiveBranch} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-4">
                {branches.map(branch => (
                    <TabsTrigger key={branch} value={branch}>{branch}</TabsTrigger>
                ))}
            </TabsList>
            
            {hasSections && (
                 <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full mb-4">
                    <TabsList className="grid w-full grid-cols-2">
                        {currentBranchSections.map(section => (
                             <TabsTrigger key={section} value={section}>Section {section}</TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            )}

            <div className="overflow-x-auto">
                <Table className="border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px]">Time</TableHead>
                            {days.map(day => (
                                <TableHead key={day}>{day}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {timeSlots.map(slot => (
                            <TableRow key={slot}>
                                <TableCell className="font-medium">{slot}</TableCell>
                                {days.map(day => {
                                    const schedule = timetableData[activeBranch as keyof typeof timetableData];
                                    const sectionSchedule = schedule[activeSection as keyof typeof schedule];
                                    const daySchedule = sectionSchedule[day as keyof typeof sectionSchedule] || {};
                                    const classInfo = daySchedule[slot] || '-';

                                    return (
                                        <TableCell key={day}>
                                            <div className="min-w-[150px]">{classInfo}</div>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}