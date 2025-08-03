
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type CategoryKey = 'sc_st' | 'income_less_than_1_lakh' | 'income_1_to_5_lakhs' | 'income_more_than_5_lakhs';

const feeComponents = [
    { component: 'Development fee', sc_st: 3000, income_less_than_1_lakh: 3000, income_1_to_5_lakhs: 3000, income_more_than_5_lakhs: 3000 },
    { component: 'Corpus fee', sc_st: 1000, income_less_than_1_lakh: 1000, income_1_to_5_lakhs: 1000, income_more_than_5_lakhs: 1000 },
    { component: 'Student Aided Fund', sc_st: 1000, income_less_than_1_lakh: 1000, income_1_to_5_lakhs: 1000, income_more_than_5_lakhs: 1000 },
    { component: 'Alumni fee', sc_st: 1000, income_less_than_1_lakh: 1000, income_1_to_5_lakhs: 1000, income_more_than_5_lakhs: 1000 },
    { component: 'T & P Charges', sc_st: 1000, income_less_than_1_lakh: 1000, income_1_to_5_lakhs: 1000, income_more_than_5_lakhs: 1000 },
    { component: 'Misc. fee', sc_st: 500, income_less_than_1_lakh: 500, income_1_to_5_lakhs: 500, income_more_than_5_lakhs: 500 },
    { component: 'Admission fee', sc_st: 1000, income_less_than_1_lakh: 1000, income_1_to_5_lakhs: 1000, income_more_than_5_lakhs: 1000 },
    { component: 'Tuition fee', sc_st: 0, income_less_than_1_lakh: 0, income_1_to_5_lakhs: 20833, income_more_than_5_lakhs: 62500 },
    { component: 'Library fee', sc_st: 500, income_less_than_1_lakh: 500, income_1_to_5_lakhs: 500, income_more_than_5_lakhs: 500 },
    { component: 'IT System fee', sc_st: 1100, income_less_than_1_lakh: 1100, income_1_to_5_lakhs: 1100, income_more_than_5_lakhs: 1100 },
    { component: 'Transport facility', sc_st: 500, income_less_than_1_lakh: 500, income_1_to_5_lakhs: 500, income_more_than_5_lakhs: 500 },
    { component: 'Medical facility', sc_st: 300, income_less_than_1_lakh: 300, income_1_to_5_lakhs: 300, income_more_than_5_lakhs: 300 },
    { component: 'Examination fee', sc_st: 1200, income_less_than_1_lakh: 1200, income_1_to_5_lakhs: 1200, income_more_than_5_lakhs: 1200 },
    { component: 'Gymkhana/Sports fee', sc_st: 1500, income_less_than_1_lakh: 1500, income_1_to_5_lakhs: 1500, income_more_than_5_lakhs: 1500 },
    { component: 'Mediclaim Insurance', sc_st: 270, income_less_than_1_lakh: 270, income_1_to_5_lakhs: 270, income_more_than_5_lakhs: 270 },
    { component: 'Institutional Caution Money (Refundable)', sc_st: 10000, income_less_than_1_lakh: 10000, income_1_to_5_lakhs: 10000, income_more_than_5_lakhs: 10000 },
    { component: 'Hostel Caution Money (Refundable)', sc_st: 10000, income_less_than_1_lakh: 10000, income_1_to_5_lakhs: 10000, income_more_than_5_lakhs: 10000 },
    { component: 'Hostel Seat Rent', sc_st: 1500, income_less_than_1_lakh: 1500, income_1_to_5_lakhs: 1500, income_more_than_5_lakhs: 1500 },
    { component: 'Light and Water charges', sc_st: 1000, income_less_than_1_lakh: 1000, income_1_to_5_lakhs: 1000, income_more_than_5_lakhs: 1000 },
    { component: 'Cable TV', sc_st: 130, income_less_than_1_lakh: 130, income_1_to_5_lakhs: 130, income_more_than_5_lakhs: 130 },
    { component: 'Mess Establishment', sc_st: 1500, income_less_than_1_lakh: 1500, income_1_to_5_lakhs: 1500, income_more_than_5_lakhs: 1500 },
];

const part2Components = [
    { component: 'BHM Contribution', amount: 1500 },
    { component: 'Mess Advance (adjustable with mess bills)', amount: 22500 },
];

const categories = [
    { value: 'sc_st', label: 'SC/ST/PwD' },
    { value: 'income_less_than_1_lakh', label: 'General/OBC (Income < ₹1 Lakh)' },
    { value: 'income_1_to_5_lakhs', label: 'General/OBC (Income ₹1 Lakh - ₹5 Lakhs)' },
    { value: 'income_more_than_5_lakhs', label: 'General/OBC (Income > ₹5 Lakhs)' },
];

export default function FeesPage() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('income_more_than_5_lakhs');
    const router = useRouter();

    const part1Total = feeComponents.reduce((acc, item) => acc + item[selectedCategory], 0);
    const part2Total = part2Components.reduce((acc, item) => acc + item.amount, 0);
    const grandTotal = part1Total + part2Total;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Institute Fees
        </h1>
      </div>
      <Card>
        <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                    <CardTitle className="font-headline">B.Tech Odd Semester Fee Structure (2025 Entry)</CardTitle>
                    <CardDescription>
                        Select your category to view the detailed fee breakdown.
                    </CardDescription>
                </div>
                <div className="mt-4 md:mt-0 w-full md:w-auto">
                    <Select onValueChange={(value: CategoryKey) => setSelectedCategory(value)} defaultValue={selectedCategory}>
                        <SelectTrigger className="w-full md:w-[350px]">
                            <SelectValue placeholder="Select your category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(cat => (
                                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Fee Details for: <span className="text-primary">{categories.find(c => c.value === selectedCategory)?.label}</span></CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold text-lg" colSpan={2}>Part I</TableHead>
                            </TableRow>
                            <TableRow>
                                <TableHead>Component</TableHead>
                                <TableHead className="text-right">Amount (₹)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {feeComponents.map(item => (
                                <TableRow key={item.component}>
                                    <TableCell className="font-medium">{item.component}</TableCell>
                                    <TableCell className="text-right">{item[selectedCategory].toLocaleString('en-IN')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                         <TableFooter>
                            <TableRow className="bg-primary/10">
                                <TableCell className="font-bold">Total (Part I)</TableCell>
                                <TableCell className="text-right font-bold">{part1Total.toLocaleString('en-IN')}</TableCell>
                            </TableRow>
                        </TableFooter>
                     </Table>

                      <Table className="mt-6">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold text-lg" colSpan={2}>Part II</TableHead>
                            </TableRow>
                             <TableRow>
                                <TableHead>Component</TableHead>
                                <TableHead className="text-right">Amount (₹)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {part2Components.map(item => (
                                <TableRow key={item.component}>
                                    <TableCell className="font-medium">{item.component}</TableCell>
                                    <TableCell className="text-right">{item.amount.toLocaleString('en-IN')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                         <TableFooter>
                            <TableRow className="bg-primary/10">
                                <TableCell className="font-bold">Total (Part II)</TableCell>
                                <TableCell className="text-right font-bold">{part2Total.toLocaleString('en-IN')}</TableCell>
                            </TableRow>
                        </TableFooter>
                     </Table>

                      <div className="mt-8 text-center">
                        <Card className="inline-block p-6 border-primary border-2">
                            <CardTitle className="font-headline">Grand Total Payable (Part I + Part II)</CardTitle>
                            <p className="text-4xl font-bold text-primary mt-2">₹{grandTotal.toLocaleString('en-IN')}</p>
                        </Card>
                    </div>

                </CardContent>
            </Card>
             <CardDescription className="mt-6 text-xs">
                Note: Any amount already paid to JoSAA towards admission is to be deducted from Part I. Fees are subject to change as per institute regulations.
            </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

    