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

const placementData22_23 = [
  { branch: 'CE', total: 132, placed: 85, avg: 9.39, median: 7.5, highest: 28.8 },
  { branch: 'CSE', total: 167, placed: 157, avg: 23.81, median: 18, highest: 80 },
  { branch: 'EE', total: 138, placed: 117, avg: 13.18, median: 11.53, highest: 52.89 },
  { branch: 'ECE', total: 169, placed: 148, avg: 16.19, median: 14.5, highest: 52.89 },
  { branch: 'EIE', total: 70, placed: 19, avg: 13.49, median: 14, highest: 32 },
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

const branchFullNames: { [key: string]: string } = {
    CE: 'Civil Engineering',
    CSE: 'Computer Science & Engineering',
    EE: 'Electrical Engineering',
    ECE: 'Electronics & Communication Engineering',
    EIE: 'Electronics & Instrumentation Engineering',
    ME: 'Mechanical Engineering',
};


const PlacementStatsComponent = ({ data, year }: { data: typeof placementData22_23, year: string }) => {
    const [selectedBranch, setSelectedBranch] = useState(data[1]); // Default to CSE

    const getPlacementPercentage = (placed: number, total: number) => {
        return total > 0 ? ((placed / total) * 100).toFixed(2) : 0;
    };
    
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
                            />
                            <Legend />
                            <Bar dataKey="avg" fill="hsl(var(--primary))" name="Average CTC" />
                            <Bar dataKey="median" fill="hsl(var(--secondary))" name="Median CTC" />
                            <Bar dataKey="highest" fill="hsl(var(--accent))" name="Highest CTC" />
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
                                    <p className="text-3xl font-bold">{selectedBranch.placed} / {selectedBranch.total}</p>
                                </div>
                                <div className="p-4 rounded-lg bg-muted">
                                    <p className="text-sm text-muted-foreground">Placement %</p>
                                    <p className="text-3xl font-bold">{getPlacementPercentage(selectedBranch.placed, selectedBranch.total)}%</p>
                                </div>
                           </div>
                           <Table>
                               <TableBody>
                                   <TableRow>
                                       <TableCell className="font-medium">Highest CTC</TableCell>
                                       <TableCell className="text-right"><Badge variant="destructive">{selectedBranch.highest} LPA</Badge></TableCell>
                                   </TableRow>
                                    <TableRow>
                                       <TableCell className="font-medium">Average CTC</TableCell>
                                       <TableCell className="text-right"><Badge variant="default">{selectedBranch.avg} LPA</Badge></TableCell>
                                   </TableRow>
                                    <TableRow>
                                       <TableCell className="font-medium">Median CTC</TableCell>
                                       <TableCell className="text-right"><Badge variant="secondary">{selectedBranch.median} LPA</Badge></TableCell>
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
                                    <TableCell>{d.total}</TableCell>
                                    <TableCell>{d.placed}</TableCell>
                                    <TableCell>{getPlacementPercentage(d.placed, d.total)}%</TableCell>
                                    <TableCell>{d.avg} LPA</TableCell>
                                    <TableCell>{d.median} LPA</TableCell>
                                    <TableCell className="text-right">{d.highest} LPA</TableCell>
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
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline mb-2">Placement Statistics</h1>
            <p className="text-muted-foreground mb-6">Based on RTI response NITS/T&P/125/456 dt. 15 Jul 2024.</p>
            <Tabs defaultValue="2023-24" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="2023-24">2023-24</TabsTrigger>
                    <TabsTrigger value="2022-23">2022-23</TabsTrigger>
                </TabsList>
                <TabsContent value="2023-24">
                    <PlacementStatsComponent data={placementData23_24} year="2023-24" />
                </TabsContent>
                <TabsContent value="2022-23">
                     <PlacementStatsComponent data={placementData22_23} year="2022-23" />
                </TabsContent>
            </Tabs>
             <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="font-headline">Note</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                    <p>The data for the 2023-24 batch was updated as of June 12, 2024. PPO numbers from 6-month internships are not included in this data. No international placements are recorded in this document.</p>
                </CardContent>
            </Card>
        </div>
    );
}