
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Banknote, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const totals = { "components": "Total Amount", "sc_st": "44,500", "general_obc": "96,000", "annual_family_income_less_than_1_lakh": "44,500", "annual_family_income_1_lakh_to_5_lakhs": "55,833", "annual_family_income_greater_than_5_lakhs": "96,000" };
const messAdvance = 24500;

const categories = [
    { value: 'sc_st', label: 'SC/ST/PwD' },
    { value: 'annual_family_income_less_than_1_lakh', label: 'General/OBC (Income < ₹1 Lakh)' },
    { value: 'annual_family_income_1_lakh_to_5_lakhs', label: 'General/OBC (Income ₹1 Lakh - ₹5 Lakhs)' },
    { value: 'general_obc', label: 'General/OBC (Income > ₹5 Lakhs)' },
];

type CategoryKey = keyof typeof totals & string;


export default function FeesPage() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('general_obc');
    const router = useRouter();

    const instituteFeeString = totals[selectedCategory] || "0";
    const instituteFee = parseInt(instituteFeeString.replace(/,/g, ''), 10);
    const grandTotal = instituteFee + messAdvance;

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
                    <CardTitle className="font-headline">B.Tech Odd Semester Fee Summary</CardTitle>
                    <CardDescription>
                        Select your category to view the total fee payable.
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
                    <CardTitle className="text-xl font-headline">Fee Summary for: <span className="text-primary">{categories.find(c => c.value === selectedCategory)?.label}</span></CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fee Component</TableHead>
                                <TableHead className="text-right">Amount (₹)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Total Institute Fees (Part I)</TableCell>
                                <TableCell className="text-right text-lg">{instituteFee.toLocaleString('en-IN')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Mess Advance (Part II)</TableCell>
                                <TableCell className="text-right text-lg">{messAdvance.toLocaleString('en-IN')}</TableCell>
                            </TableRow>
                        </TableBody>
                         <TableFooter>
                            <TableRow className="bg-primary/10">
                                <TableCell className="font-bold text-xl">Grand Total Payable</TableCell>
                                <TableCell className="text-right font-bold text-xl text-primary">{grandTotal.toLocaleString('en-IN')}</TableCell>
                            </TableRow>
                        </TableFooter>
                     </Table>
                </CardContent>
            </Card>
             <CardDescription className="mt-6 text-xs">
                Note: The "Total Institute Fees" includes tuition, development, and other mandatory fees. "Mess Advance" is an initial amount collected for mess charges, which is adjusted against actual bills later. Fees are subject to change as per institute regulations.
            </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
