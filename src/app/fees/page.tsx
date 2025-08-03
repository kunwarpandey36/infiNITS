
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type Degree = 'btech' | 'mtech' | 'msc' | 'mba';
type Semester = '1' | '3' | '5' | '7';
type BTechCategory = 'sc_st_pwd' | 'income_less_1' | 'income_1_5' | 'income_over_5';
type OtherCategory = 'hosteller' | 'non_hosteller';

interface FeeData {
  [key: string]: {
    label: string;
    semesters: {
      [key: string]: {
        label: string;
        categories: {
          [key: string]: {
            label: string;
            part1_fees: { component: string, amount: number }[];
            part2_fees: { component: string, amount: number }[];
          }
        }
      }
    }
  }
}

const feeData: FeeData = {
  btech: {
    label: 'B.Tech',
    semesters: {
      '3': {
        label: '3rd / 5th / 7th Semester',
        categories: {
          sc_st_pwd: {
            label: 'SC/ST/PWD',
            part1_fees: [{ component: 'Institute Fees (Tuition Fee Waived)', amount: 11000 }],
            part2_fees: [{ component: 'BHM Contribution', amount: 1500 }, { component: 'Mess Advance', amount: 22500 }],
          },
          income_less_1: {
            label: 'Income < ₹1 Lakh',
            part1_fees: [{ component: 'Institute Fees (Tuition Fee Waived)', amount: 11000 }],
            part2_fees: [{ component: 'BHM Contribution', amount: 1500 }, { component: 'Mess Advance', amount: 22500 }],
          },
          income_1_5: {
            label: 'Income ₹1 Lakh - ₹5 Lakhs',
            part1_fees: [{ component: 'Institute Fees (Other)', amount: 11000 }, { component: 'Tuition Fee', amount: 20833 }],
            part2_fees: [{ component: 'BHM Contribution', amount: 1500 }, { component: 'Mess Advance', amount: 22500 }],
          },
          income_over_5: {
            label: 'Income > ₹5 Lakhs',
            part1_fees: [{ component: 'Institute Fees (Other)', amount: 11000 }, { component: 'Tuition Fee', amount: 62500 }],
            part2_fees: [{ component: 'BHM Contribution', amount: 1500 }, { component: 'Mess Advance', amount: 22500 }],
          }
        }
      },
      '1': {
        label: '1st Semester (Entry Batch)',
        categories: {
          sc_st_pwd: {
            label: 'SC/ST/PwD',
            part1_fees: [{ component: 'Institute Fees (Tuition Fee Waived)', amount: 22870 }],
            part2_fees: [{ component: 'BHM Contribution', amount: 1500 }, { component: 'Mess Advance (adjustable with mess bills)', amount: 22500 }],
          },
          income_less_1: {
            label: 'General/OBC (Income < ₹1 Lakh)',
            part1_fees: [{ component: 'Institute Fees (Tuition Fee Waived)', amount: 22870 }],
            part2_fees: [{ component: 'BHM Contribution', amount: 1500 }, { component: 'Mess Advance (adjustable with mess bills)', amount: 22500 }],
          },
          income_1_5: {
            label: 'General/OBC (Income ₹1 Lakh - ₹5 Lakhs)',
            part1_fees: [{ component: 'Institute Fees (Other)', amount: 22870 }, { component: 'Tuition Fee', amount: 20833 }],
            part2_fees: [{ component: 'BHM Contribution', amount: 1500 }, { component: 'Mess Advance (adjustable with mess bills)', amount: 22500 }],
          },
          income_over_5: {
            label: 'General/OBC (Income > ₹5 Lakhs)',
            part1_fees: [{ component: 'Institute Fees (Other)', amount: 22870 }, { component: 'Tuition Fee', amount: 62500 }],
            part2_fees: [{ component: 'BHM Contribution', amount: 1500 }, { component: 'Mess Advance (adjustable with mess bills)', amount: 22500 }],
          }
        }
      }
    }
  },
  mtech: {
    label: 'M.Tech',
    semesters: {
      '1': {
        label: '1st Semester (Entry Batch)',
        categories: {
          hosteller: { label: 'Hosteller', part1_fees: [{ component: 'Academic Fees', amount: 73000 }], part2_fees: [{ component: 'BHM Contribution & Mess Advance', amount: 28500 }] },
          non_hosteller: { label: 'Non-Hosteller', part1_fees: [{ component: 'Academic Fees', amount: 54870 }], part2_fees: [] }
        }
      },
      '3': {
        label: '3rd Semester',
        categories: {
          hosteller: { label: 'Hosteller', part1_fees: [{ component: 'Academic Fees', amount: 40000 }], part2_fees: [{ component: 'BHM Contribution & Mess Advance', amount: 31500 }] },
          non_hosteller: { label: 'Non-Hosteller', part1_fees: [{ component: 'Academic Fees', amount: 41870 }], part2_fees: [] }
        }
      }
    }
  },
  msc: {
    label: 'M.Sc',
    semesters: {
      '1': {
        label: '1st Semester (Entry Batch)',
        categories: {
          hosteller: { label: 'Hosteller', part1_fees: [{ component: 'Academic Fees', amount: 46000 }], part2_fees: [{ component: 'BHM Contribution & Mess Advance', amount: 28500 }] },
          non_hosteller: { label: 'Non-Hosteller', part1_fees: [{ component: 'Academic Fees', amount: 51870 }], part2_fees: [] }
        }
      },
      '3': {
        label: '3rd Semester',
        categories: {
          hosteller: { label: 'Hosteller', part1_fees: [{ component: 'Academic Fees', amount: 19870 }], part2_fees: [{ component: 'BHM Contribution & Mess Advance', amount: 28500 }] },
          non_hosteller: { label: 'Non-Hosteller', part1_fees: [{ component: 'Academic Fees', amount: 14870 }], part2_fees: [] }
        }
      }
    }
  },
  mba: {
    label: 'MBA',
    semesters: {
      '3': {
        label: '3rd Semester',
        categories: {
          hosteller: { label: 'Hosteller', part1_fees: [{ component: 'Academic Fees', amount: 49870 }], part2_fees: [{ component: 'BHM Contribution & Mess Advance', amount: 28500 }] },
          non_hosteller: { label: 'Non-Hosteller', part1_fees: [{ component: 'Academic Fees', amount: 46870 }], part2_fees: [] }
        }
      }
    }
  }
};

// Simplify semester logic for B.Tech
feeData.btech.semesters['5'] = feeData.btech.semesters['3'];
feeData.btech.semesters['7'] = feeData.btech.semesters['3'];

export default function FeesPage() {
    const router = useRouter();
    const [selectedDegree, setSelectedDegree] = useState<Degree>('btech');
    const [selectedSemester, setSelectedSemester] = useState<Semester>('3');
    const [selectedCategory, setSelectedCategory] = useState<string>('income_over_5');

    const availableSemesters = Object.keys(feeData[selectedDegree].semesters);
    const availableCategories = Object.keys(feeData[selectedDegree].semesters[selectedSemester]?.categories || {});

    // Effect to update selections when degree changes
    useState(() => {
        const firstSemester = Object.keys(feeData[selectedDegree].semesters)[0];
        setSelectedSemester(firstSemester as Semester);
        const firstCategory = Object.keys(feeData[selectedDegree].semesters[firstSemester].categories)[0];
        setSelectedCategory(firstCategory);
    });

     // Effect to update category when semester changes
     useState(() => {
        if (!availableSemesters.includes(selectedSemester)) {
            const firstSemester = availableSemesters[0];
            setSelectedSemester(firstSemester as Semester);
            const firstCategory = Object.keys(feeData[selectedDegree].semesters[firstSemester].categories)[0];
            setSelectedCategory(firstCategory);
        } else {
            const firstCategory = Object.keys(feeData[selectedDegree].semesters[selectedSemester].categories)[0];
            if(!availableCategories.includes(selectedCategory)) {
               setSelectedCategory(firstCategory);
            }
        }
    });


    const currentFeeData = feeData[selectedDegree]?.semesters[selectedSemester]?.categories[selectedCategory];

    const part1Total = currentFeeData?.part1_fees.reduce((acc, item) => acc + item.amount, 0) || 0;
    const part2Total = currentFeeData?.part2_fees.reduce((acc, item) => acc + item.amount, 0) || 0;
    const grandTotal = part1Total + part2Total;

    const handleDegreeChange = (value: string) => {
      const newDegree = value as Degree;
      setSelectedDegree(newDegree);
      const firstSemester = Object.keys(feeData[newDegree].semesters)[0];
      setSelectedSemester(firstSemester as Semester);
      const firstCategory = Object.keys(feeData[newDegree].semesters[firstSemester].categories)[0];
      setSelectedCategory(firstCategory);
    };

    const handleSemesterChange = (value: string) => {
      const newSemester = value as Semester;
      setSelectedSemester(newSemester);
      const firstCategory = Object.keys(feeData[selectedDegree].semesters[newSemester].categories)[0];
      setSelectedCategory(firstCategory);
    };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Institute & Hostel Fees (July-Dec 2025)
        </h1>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Fee Structure Details</CardTitle>
            <CardDescription>
                Select your course, semester, and category to view the detailed fee breakdown.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                 <div className="grid gap-2">
                    <label className="font-medium">Course</label>
                    <Select value={selectedDegree} onValueChange={handleDegreeChange}>
                        <SelectTrigger><SelectValue placeholder="Select Course" /></SelectTrigger>
                        <SelectContent>
                            {Object.entries(feeData).map(([key, value]) => (
                                <SelectItem key={key} value={key}>{value.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="grid gap-2">
                    <label className="font-medium">Semester</label>
                    <Select value={selectedSemester} onValueChange={handleSemesterChange} disabled={!availableSemesters.length}>
                        <SelectTrigger><SelectValue placeholder="Select Semester" /></SelectTrigger>
                        <SelectContent>
                            {/* Filter out duplicate semesters for B.Tech display */}
                            {Array.from(new Set(availableSemesters)).map(semKey => (
                                <SelectItem key={semKey} value={semKey}>{feeData[selectedDegree].semesters[semKey].label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                 </div>
                  <div className="grid gap-2">
                    <label className="font-medium">Category</label>
                    <Select value={selectedCategory} onValueChange={(v) => setSelectedCategory(v)} disabled={!availableCategories.length}>
                        <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                        <SelectContent>
                             {availableCategories.map(catKey => (
                                <SelectItem key={catKey} value={catKey}>{feeData[selectedDegree].semesters[selectedSemester]?.categories[catKey].label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                 </div>
            </div>

            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-xl font-headline">
                        Fee Details for: <span className="text-primary">{feeData[selectedDegree]?.label} - {feeData[selectedDegree]?.semesters[selectedSemester]?.label} - {currentFeeData?.label}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     {currentFeeData ? (
                        <>
                         <Table>
                            <TableHeader>
                                <TableRow><TableHead className="font-bold text-lg" colSpan={2}>Part I: Institute Academic Fees</TableHead></TableRow>
                                <TableRow><TableHead>Component</TableHead><TableHead className="text-right">Amount (₹)</TableHead></TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentFeeData.part1_fees.map(item => (
                                    <TableRow key={item.component}><TableCell className="font-medium">{item.component}</TableCell><TableCell className="text-right">{item.amount.toLocaleString('en-IN')}</TableCell></TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow className="bg-primary/10"><TableCell className="font-bold">Total (Part I)</TableCell><TableCell className="text-right font-bold">{part1Total.toLocaleString('en-IN')}</TableCell></TableRow>
                            </TableFooter>
                         </Table>

                        {currentFeeData.part2_fees.length > 0 && (
                          <Table className="mt-6">
                            <TableHeader>
                                <TableRow><TableHead className="font-bold text-lg" colSpan={2}>Part II: Hostel Fees</TableHead></TableRow>
                                <TableRow><TableHead>Component</TableHead><TableHead className="text-right">Amount (₹)</TableHead></TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentFeeData.part2_fees.map(item => (
                                    <TableRow key={item.component}><TableCell className="font-medium">{item.component}</TableCell><TableCell className="text-right">{item.amount.toLocaleString('en-IN')}</TableCell></TableRow>
                                ))}
                            </TableBody>
                             <TableFooter>
                                <TableRow className="bg-primary/10"><TableCell className="font-bold">Total (Part II)</TableCell><TableCell className="text-right font-bold">{part2Total.toLocaleString('en-IN')}</TableCell></TableRow>
                            </TableFooter>
                         </Table>
                        )}


                      <div className="mt-8 text-center">
                        <Card className="inline-block p-6 border-primary border-2">
                            <CardTitle className="font-headline">Grand Total Payable (Part I {part2Total > 0 ? '+ Part II' : ''})</CardTitle>
                            <p className="text-4xl font-bold text-primary mt-2">₹{grandTotal.toLocaleString('en-IN')}</p>
                        </Card>
                    </div>
                    </>
                     ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            <p>Please make a selection to view fee details.</p>
                        </div>
                     )}
                </CardContent>
            </Card>
            <CardDescription className="mt-6 text-xs">
                Note: Fees are subject to change as per institute regulations. For B.Tech 1st semester, any amount already paid to JoSAA is to be deducted from Part I.
            </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
