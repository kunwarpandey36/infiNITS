'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Banknote, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const feeData = [
  { "sl_no": 1, "components": "Development fee", "sc_st": "3,000", "general_obc": "3,000", "annual_family_income_less_than_1_lakh": "3,000", "annual_family_income_1_lakh_to_5_lakhs": "3,000", "annual_family_income_greater_than_5_lakhs": "3,000" },
  { "sl_no": 2, "components": "Institute fee", "sc_st": "3,000", "general_obc": "3,000", "annual_family_income_less_than_1_lakh": "3,000", "annual_family_income_1_lakh_to_5_lakhs": "3,000", "annual_family_income_greater_than_5_lakhs": "3,000" },
  { "sl_no": 3, "components": "Student Aid Fund", "sc_st": "1,000", "general_obc": "1,000", "annual_family_income_less_than_1_lakh": "1,000", "annual_family_income_1_lakh_to_5_lakhs": "1,000", "annual_family_income_greater_than_5_lakhs": "1,000" },
  { "sl_no": 4, "components": "Admission fee", "sc_st": "1,000", "general_obc": "1,000", "annual_family_income_less_than_1_lakh": "1,000", "annual_family_income_1_lakh_to_5_lakhs": "1,000", "annual_family_income_greater_than_5_lakhs": "1,000" },
  { "sl_no": 5, "components": "T & P Charges", "sc_st": "1,000", "general_obc": "1,000", "annual_family_income_less_than_1_lakh": "1,000", "annual_family_income_1_lakh_to_5_lakhs": "1,000", "annual_family_income_greater_than_5_lakhs": "1,000" },
  { "sl_no": 6, "components": "Library fee", "sc_st": "1,000", "general_obc": "1,000", "annual_family_income_less_than_1_lakh": "1,000", "annual_family_income_1_lakh_to_5_lakhs": "1,000", "annual_family_income_greater_than_5_lakhs": "1,000" },
  { "sl_no": 7, "components": "Students' welfare fee", "sc_st": "1,000", "general_obc": "1,000", "annual_family_income_less_than_1_lakh": "1,000", "annual_family_income_1_lakh_to_5_lakhs": "1,000", "annual_family_income_greater_than_5_lakhs": "1,000" },
  { "sl_no": 8, "components": "Tuition fee", "sc_st": "0", "general_obc": "62,500", "annual_family_income_less_than_1_lakh": "0", "annual_family_income_1_lakh_to_5_lakhs": "20,833", "annual_family_income_greater_than_5_lakhs": "62,500" },
  { "sl_no": 9, "components": "Central Tution Fee", "sc_st": "0", "general_obc": "0", "annual_family_income_less_than_1_lakh": "0", "annual_family_income_1_lakh_to_5_lakhs": "0", "annual_family_income_greater_than_5_lakhs": "0" },
  { "sl_no": 10, "components": "IT System fee", "sc_st": "1,100", "general_obc": "1,100", "annual_family_income_less_than_1_lakh": "1,100", "annual_family_income_1_lakh_to_5_lakhs": "1,100", "annual_family_income_greater_than_5_lakhs": "1,100" },
  { "sl_no": 11, "components": "Examination fee", "sc_st": "500", "general_obc": "500", "annual_family_income_less_than_1_lakh": "500", "annual_family_income_1_lakh_to_5_lakhs": "500", "annual_family_income_greater_than_5_lakhs": "500" },
  { "sl_no": 12, "components": "Medical facility", "sc_st": "300", "general_obc": "300", "annual_family_income_less_than_1_lakh": "300", "annual_family_income_1_lakh_to_5_lakhs": "300", "annual_family_income_greater_than_5_lakhs": "300" },
  { "sl_no": 13, "components": "Habitation & Utility", "sc_st": "1,500", "general_obc": "1,500", "annual_family_income_less_than_1_lakh": "1,500", "annual_family_income_1_lakh_to_5_lakhs": "1,500", "annual_family_income_greater_than_5_lakhs": "1,500" },
  { "sl_no": 14, "components": "Gymkhana/Sports fee", "sc_st": "1,500", "general_obc": "1,500", "annual_family_income_less_than_1_lakh": "1,500", "annual_family_income_1_lakh_to_5_lakhs": "1,500", "annual_family_income_greater_than_5_lakhs": "1,500" },
  { "sl_no": 15, "components": "Medical Insurance", "sc_st": "1,500", "general_obc": "1,500", "annual_family_income_less_than_1_lakh": "1,500", "annual_family_income_1_lakh_to_5_lakhs": "1,500", "annual_family_income_greater_than_5_lakhs": "1,500" },
  { "sl_no": 16, "components": "Institutional Caution Money (Refundable)", "sc_st": "10,000", "general_obc": "10,000", "annual_family_income_less_than_1_lakh": "10,000", "annual_family_income_1_lakh_to_5_lakhs": "10,000", "annual_family_income_greater_than_5_lakhs": "10,000" },
  { "sl_no": 17, "components": "Mess Caution Money (Refundable)", "sc_st": "10,000", "general_obc": "10,000", "annual_family_income_less_than_1_lakh": "10,000", "annual_family_income_1_lakh_to_5_lakhs": "10,000", "annual_family_income_greater_than_5_lakhs": "10,000" },
  { "sl_no": 18, "components": "Hostel Seat Rent", "sc_st": "1,000", "general_obc": "1,000", "annual_family_income_less_than_1_lakh": "1,000", "annual_family_income_1_lakh_to_5_lakhs": "1,000", "annual_family_income_greater_than_5_lakhs": "1,000" },
  { "sl_no": 19, "components": "Light and Water charges", "sc_st": "1,000", "general_obc": "1,000", "annual_family_income_less_than_1_lakh": "1,000", "annual_family_income_1_lakh_to_5_lakhs": "1,000", "annual_family_income_greater_than_5_lakhs": "1,000" },
  { "sl_no": 20, "components": "Laundry fee", "sc_st": "1,500", "general_obc": "1,500", "annual_family_income_less_than_1_lakh": "1,500", "annual_family_income_1_lakh_to_5_lakhs": "1,500", "annual_family_income_greater_than_5_lakhs": "1,500" },
  { "sl_no": 21, "components": "Mess Establishment", "sc_st": "1,500", "general_obc": "1,500", "annual_family_income_less_than_1_lakh": "1,500", "annual_family_income_1_lakh_to_5_lakhs": "1,500", "annual_family_income_greater_than_5_lakhs": "1,500" },
];

const totals = { "components": "Total Amount", "sc_st": "44,500", "general_obc": "96,000", "annual_family_income_less_than_1_lakh": "44,500", "annual_family_income_1_lakh_to_5_lakhs": "55,833", "annual_family_income_greater_than_5_lakhs": "96,000" };

const categories = [
    { value: 'sc_st', label: 'SC/ST/PwD' },
    { value: 'annual_family_income_less_than_1_lakh', label: 'General/OBC (Income < ₹1 Lakh)' },
    { value: 'annual_family_income_1_lakh_to_5_lakhs', label: 'General/OBC (Income ₹1 Lakh - ₹5 Lakhs)' },
    { value: 'general_obc', label: 'General/OBC (Income > ₹5 Lakhs)' },
];

type CategoryKey = keyof typeof totals & keyof (typeof feeData)[0];


export default function FeesPage() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('general_obc');
    const router = useRouter();

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
                    <CardTitle className="font-headline">B.Tech First Semester Fee Structure</CardTitle>
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Sl. No.</TableHead>
                        <TableHead>Fee Component</TableHead>
                        <TableHead className="text-right">Amount (₹)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {feeData.map(item => (
                        <TableRow key={item.sl_no}>
                            <TableCell>{item.sl_no}</TableCell>
                            <TableCell className="font-medium">{item.components}</TableCell>
                            <TableCell className="text-right">{item[selectedCategory]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="bg-muted/50">
                        <TableCell colSpan={2} className="font-bold text-lg">Total Amount (Part I)</TableCell>
                        <TableCell className="text-right font-bold text-lg text-primary">{totals[selectedCategory]}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Part II - Mess Advance</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Component</TableHead>
                                <TableHead className="text-right">Amount (₹)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Mess Advance (adjustable with mess bills)</TableCell>
                                <TableCell className="text-right">24,500</TableCell>
                            </TableRow>
                        </TableBody>
                         <TableFooter>
                            <TableRow>
                                <TableCell className="font-bold">Total (Part II)</TableCell>
                                <TableCell className="text-right font-bold">24,500</TableCell>
                            </TableRow>
                        </TableFooter>
                     </Table>
                </CardContent>
            </Card>
        </CardContent>
      </Card>
    </div>
  );
}
