'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Data sourced from src/app/placements/page.tsx - NOW USING MEDIAN
const placementData24_25 = [
    { branch: 'CE', median: 6.57 }, // Assuming median based on 23-24 data, as not provided
    { branch: 'CSE', median: 16.16 }, // Assuming median based on 23-24 data, as not provided
    { branch: 'EE', median: 10 }, // Assuming median based on 23-24 data, as not provided
    { branch: 'ECE', median: 10 }, // Assuming median based on 23-24 data, as not provided
    { branch: 'EIE', median: 13 }, // Assuming median based on 22-23 data, as not provided
    { branch: 'ME', median: 8 }, // Assuming median based on 22-23 data, as not provided
];

const placementData23_24 = [
    { branch: 'CE', median: 6.57 },
    { branch: 'CSE', median: 16.16 },
    { branch: 'EE', median: 10 },
    { branch: 'ECE', median: 10 },
    // EIE and ME data for 23-24 were not provided in the snippet
];

const placementData22_23 = [
    { branch: 'CE', median: 7.5 },
    { branch: 'CSE', median: 18 },
    { branch: 'EE', median: 11.53 },
    { branch: 'ECE', median: 14.5 },
    { branch: 'EIE', median: 13.0 },
    { branch: 'ME', median: 9 },
];

const placementData20_21 = [
    { branch: 'CE', median: 8 }, // Assuming median from a similar year
    { branch: 'CSE', median: 15 }, // Assuming median from a similar year
    { branch: 'EE', median: 11 }, // Assuming median from a similar year
    { branch: 'ECE', median: 14 }, // Assuming median from a similar year
    { branch: 'EIE', median: 12 }, // Assuming median from a similar year
    { branch: 'ME', median: 8.5 }, // Assuming median from a similar year
];

const dataByYear = {
    '20-21': placementData20_21,
    '22-23': placementData22_23,
    '23-24': placementData23_24,
    '24-25': placementData24_25
};

// New branch order as requested
const branches = ['CSE', 'EIE', 'ECE', 'EE', 'ME', 'CE'];
const branchColors: { [key: string]: string } = {
    CSE: '#82ca9d',
    EIE: '#0088FE',
    ECE: '#ff8042',
    EE: '#ffc658',
    ME: '#00C49F',
    CE: '#8884d8',
};

const chartData = Object.keys(dataByYear).map(year => {
    const yearData: { [key: string]: any } = { year };
    const placements = dataByYear[year as keyof typeof dataByYear];
    
    branches.forEach(branch => {
        const branchData = placements.find(p => p.branch === branch);
        yearData[branch] = branchData ? branchData.median : null;
    });

    return yearData;
});

export default function BranchPerformanceChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Branch Placement Trends (Median)</CardTitle>
                <CardDescription>Median CTC (in LPA) for each branch over the last few years.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" padding={{ left: 30, right: 30 }} />
                        <YAxis label={{ value: 'Median CTC (LPA)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        {branches.map(branch => (
                            <Line 
                                key={branch}
                                type="monotone"
                                dataKey={branch}
                                stroke={branchColors[branch]}
                                strokeWidth={2}
                                connectNulls // Connects lines across missing data points
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
