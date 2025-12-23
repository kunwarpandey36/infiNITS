import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { mergedStudentData } from '@/lib/nit-silchar-student-data';

interface ChartData {
    branch: string;
    "Average CGPA": number;
}

export default function ClassPerformanceGraph() {
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const branches = [...new Set(mergedStudentData.map(s => s.branch))];
    const data: ChartData[] = branches.map(branch => {
        const branchStudents = mergedStudentData.filter(s => s.branch === branch);
        const totalCgpa = branchStudents.reduce((acc, s) => acc + (s.cgpa || 0), 0);
        const avgCgpa = totalCgpa / branchStudents.length;
        return { branch, "Average CGPA": avgCgpa };
    });
    setChartData(data);
  }, []);

  if (!hasMounted) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Class-wise Performance</CardTitle>
            <CardDescription>A comparison of the average CGPA for each class.</CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-[350px]" />
          </CardContent>
        </Card>
      );
    }
  
    if (!chartData) {
      return (
         <Card>
           <CardHeader>
             <CardTitle className="font-headline">Class-wise Performance</CardTitle>
             <CardDescription>A comparison of the average CGPA for each class.</CardDescription>
           </CardHeader>
           <CardContent>
             <p className="text-muted-foreground">
               Not enough data to generate a graph.
             </p>
           </CardContent>
         </Card>
      );
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Class-wise Performance</CardTitle>
        <CardDescription>A comparison of the average CGPA for each class.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="branch" />
            <YAxis domain={[0, 10]} />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              formatter={(value: number) => [value.toFixed(2), 'Average CGPA']}
            />
            <Legend />
            <Bar dataKey="Average CGPA" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
