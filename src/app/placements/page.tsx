
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const placementData24_25 = [
    { branch: 'CE', total: 138, placed: 69, avg: 7.49, median: 6.57, highest: 19.9 },
    { branch: 'CSE', total: 183, placed: 126, avg: 16.74, median: 16.0, highest: 45.22 },
    { branch: 'EE', total: 142, placed: 101, avg: 10.41, median: 7.96, highest: 52.0 },
    { branch: 'ECE', total: 176, placed: 115, avg: 14.4, median: 12.6, highest: 54.0 },
    { branch: 'EIE', total: 77, placed: 63, avg: 13.48, median: 13.65, highest: 28.0 },
    { branch: 'ME', total: 139, placed: 98, avg: 8.87, median: 7.5, highest: 20.0 },
];

const placementData22_23 = [
    { branch: 'CE', total: 132, placed: 85, avg: 9.39, median: 7.5, highest: 28.8 },
    { branch: 'CSE', total: 167, placed: 157, avg: 23.81, median: 18, highest: 80 },
    { branch: 'EE', total: 138, placed: 117, avg: 13.18, median: 11.53, highest: 52.89 },
    { branch: 'ECE', total: 169, placed: 148, avg: 16.19, median: 14.5, highest: 52.89 },
    { branch: 'EIE', total: 70, placed: 58, avg: 14.9, median: 13.0, highest: 52.89 },
    { branch: 'ME', total: 147, placed: 126, avg: 10.77, median: 9, highest: 28.8 },
];
  
const placementData23_24 = [
    { branch: 'CE', total: 133, placed: 67, avg: 7.81, median: 7.0, highest: 19.9 },
    { branch: 'CSE', total: 168, placed: 116, avg: 18.57, median: 14, highest: 52.89 },
    { branch: 'EE', total: 149, placed: 79, avg: 11.7, median: 8, highest: 52.89 },
    { branch: 'ECE', total: 169, placed: 86, avg: 15.7, median: 12, highest: 52.89 },
    { branch: 'EIE', total: 78, placed: 53, avg: 12.4, median: 9.0, highest: 52.89 },
    { branch: 'ME', total: 134, placed: 67, avg: 8.86, median: 7.5, highest: 19.9 },
];

const placementData20_21 = [
    { branch: 'CE', total: 99, placed: 48, avg: 8.87, median: null, highest: 25.40 },
    { branch: 'CSE', total: 89, placed: 76, avg: 16.46, median: null, highest: 44.00 },
    { branch: 'EE', total: 106, placed: 76, avg: 12.34, median: null, highest: 31.84 },
    { branch: 'ECE', total: 107, placed: 85, avg: 15.30, median: null, highest: 42.00 },
    { branch: 'EIE', total: 45, placed: 39, avg: 13.84, median: null, highest: 44.00 },
    { branch: 'ME', total: 108, placed: 61, avg: 9.05, median: null, highest: 21.86 },
];

const placementData19_20 = [
    { branch: 'CE', total: null, placed: null, avg: 4.80, median: null, highest: null },
    { branch: 'CSE', total: null, placed: null, avg: 10.80, median: null, highest: null },
    { branch: 'EE', total: null, placed: null, avg: 6.44, median: null, highest: null },
    { branch: 'ECE', total: null, placed: null, avg: 7.42, median: null, highest: null },
    { branch: 'EIE', total: null, placed: null, avg: 7.55, median: null, highest: null },
    { branch: 'ME', total: null, placed: null, avg: 6.17, median: null, highest: null },
];

const branchFullNames: { [key: string]: string } = {
    CE: 'Civil Engineering',
    CSE: 'Computer Science & Engineering',
    EE: 'Electrical Engineering',
    ECE: 'Electronics & Communication Engineering',
    EIE: 'Electronics & Instrumentation Engineering',
    ME: 'Mechanical Engineering',
};


const PlacementStatsComponent = ({ data, year }: { data: typeof placementData22_23, year: string }) => {
    const [selectedBranch, setSelectedBranch] = useState(data.find(b => b.branch === 'CSE') || data[0]);

    const getPlacementPercentage = (placed: number | null, total: number | null) => {
        if (placed === null || total === null || total === 0) return "N/A";
        return ((placed / total) * 100).toFixed(2) + '%';
    };

    const formatLPA = (value: number | null) => value !== null ? `${value} LPA` : "N/A";
    
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Branch-wise CTC Comparison ({year})</CardTitle>
                    <CardDescription>Average, Median, and Highest CTC (in LPA) for each branch.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="branch" />
                            <YAxis label={{ value: 'CTC (LPA)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    borderColor: 'hsl(var(--border))',
                                }}
                                formatter={(value: number | null) => value !== null ? `${value} LPA` : "N/A"}
                            />
                            <Legend />
                            <Bar dataKey="avg" fill="hsl(var(--chart-1))" name="Average CTC" />
                            <Bar dataKey="median" fill="hsl(var(--chart-2))" name="Median CTC" />
                            <Bar dataKey="highest" fill="hsl(var(--chart-3))" name="Highest CTC" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Select a Branch</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                           {data.map(branch => (
                               <button key={branch.branch}
                                    onClick={() => setSelectedBranch(branch)}
                                    className={`p-3 text-left rounded-md transition-colors ${selectedBranch.branch === branch.branch ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}>
                                    <div className="font-semibold">{branchFullNames[branch.branch]}</div>
                                    <div className="text-sm opacity-80">{branch.branch}</div>
                               </button>
                           ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>{branchFullNames[selectedBranch.branch]} ({selectedBranch.branch})</CardTitle>
                            <CardDescription>Detailed statistics for the academic year {year}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="p-4 rounded-lg bg-muted">
                                    <p className="text-sm text-muted-foreground">Students Placed</p>
                                    <p className="text-3xl font-bold">{selectedBranch.placed ?? 'N/A'} / {selectedBranch.total ?? 'N/A'}</p>
                                </div>
                                <div className="p-4 rounded-lg bg-muted">
                                    <p className="text-sm text-muted-foreground">Placement %</p>
                                    <p className="text-3xl font-bold">{getPlacementPercentage(selectedBranch.placed, selectedBranch.total)}</p>
                                </div>
                           </div>
                           <Table>
                               <TableBody>
                                   <TableRow>
                                       <TableCell className="font-medium">Highest CTC</TableCell>
                                       <TableCell className="text-right"><Badge variant="destructive">{formatLPA(selectedBranch.highest)}</Badge></TableCell>
                                   </TableRow>
                                    <TableRow>
                                       <TableCell className="font-medium">Average CTC</TableCell>
                                       <TableCell className="text-right"><Badge variant="default">{formatLPA(selectedBranch.avg)}</Badge></TableCell>
                                   </TableRow>
                                    <TableRow>
                                       <TableCell className="font-medium">Median CTC</TableCell>
                                       <TableCell className="text-right"><Badge variant="secondary">{formatLPA(selectedBranch.median)}</Badge></TableCell>
                                   </TableRow>
                               </TableBody>
                           </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Full Data Table ({year})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Branch</TableHead>
                                <TableHead>Total Students</TableHead>
                                <TableHead>Placed</TableHead>
                                <TableHead>Placement %</TableHead>
                                <TableHead>Avg. CTC</TableHead>
                                <TableHead>Median CTC</TableHead>
                                <TableHead className="text-right">Highest CTC</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map(d => (
                                <TableRow key={d.branch}>
                                    <TableCell className="font-medium">{branchFullNames[d.branch]}</TableCell>
                                    <TableCell>{d.total ?? 'N/A'}</TableCell>
                                    <TableCell>{d.placed ?? 'N/A'}</TableCell>
                                    <TableCell>{getPlacementPercentage(d.placed, d.total)}</TableCell>
                                    <TableCell>{formatLPA(d.avg)}</TableCell>
                                    <TableCell>{formatLPA(d.median)}</TableCell>
                                    <TableCell className="text-right">{formatLPA(d.highest)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default function PlacementsPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex items-center gap-4 mb-2">
                 <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Placement Statistics</h1>
            </div>
            <p className="text-muted-foreground mb-6 ml-14">Based on official RTI responses and placement reports.</p>
            <Tabs defaultValue="2024-25" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="2024-25">2024-25</TabsTrigger>
                    <TabsTrigger value="2023-24">2023-24</TabsTrigger>
                    <TabsTrigger value="2022-23">2022-23</TabsTrigger>
                    <TabsTrigger value="2020-21">2020-21</TabsTrigger>
                    <TabsTrigger value="2019-20">2019-20</TabsTrigger>
                </TabsList>
                <TabsContent value="2024-25">
                    <PlacementStatsComponent data={placementData24_25} year="2024-25" />
                </TabsContent>
                <TabsContent value="2023-24">
                    <PlacementStatsComponent data={placementData23_24} year="2023-24" />
                </TabsContent>
                <TabsContent value="2022-23">
                     <PlacementStatsComponent data={placementData22_23} year="2022-23" />
                </TabsContent>
                <TabsContent value="2020-21">
                    <PlacementStatsComponent data={placementData20_21} year="2020-21" />
                </TabsContent>
                <TabsContent value="2019-20">
                    <PlacementStatsComponent data={placementData19_20} year="2019-20" />
                </TabsContent>
            </Tabs>
             <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="font-headline">Note</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>The data for the 2023-24 batch was updated as of June 12, 2024. PPO numbers from 6-month internships are not included in this data. No international placements are recorded in this document.</p>
                    <p>The data for 2022-23 is based on RTI response NITS/T&amp;P/125/456 dt. 15 Jul 2024.</p>
                    <p>The data for 2020-21 and 2019-20 is based on past placement reports and may not include all metrics.</p>
                </CardContent>
            </Card>
        </div>
    );
}
