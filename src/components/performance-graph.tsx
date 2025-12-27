'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useStudentData } from '@/hooks/use-student-data';
import { Skeleton } from '@/components/ui/skeleton';

interface ChartDataPoint {
    semester: number;
    "Your SGPA"?: number | null;
    "Predicted SGPA"?: number | null;
  }

// Simple linear regression to predict the next SGPA
function predictNextSgpa(data: { semester: number, sgpa: number }[]): number | null {
  const knownData = data.filter(d => d.sgpa > 0);
  if (knownData.length < 2) return null;

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  const n = knownData.length;

  for (const point of knownData) {
    sumX += point.semester;
    sumY += point.sgpa;
    sumXY += point.semester * point.sgpa;
    sumX2 += point.semester * point.semester;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  if (isNaN(slope) || isNaN(intercept)) return null;

  const nextSemester = Math.max(...knownData.map(d => d.semester)) + 1;
  const prediction = slope * nextSemester + intercept;

  return Math.max(0, Math.min(10, prediction));
}

export default function PerformanceGraph() {
  const student = useStudentData();
  const [chartData, setChartData] = useState<ChartDataPoint[] | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    if (student && student.semester && student.sgpa_curr && student.sgpa_prev) {
      const semesterNumber = Number(student.semester);
      if (isNaN(semesterNumber)) return;

      const historicalData = [
        { semester: semesterNumber - 1, sgpa: student.sgpa_prev },
        { semester: semesterNumber, sgpa: student.sgpa_curr }
      ];

      const prediction = predictNextSgpa(historicalData);

      const data: ChartDataPoint[] = historicalData.map(p => ({
        semester: p.semester,
        "Your SGPA": p.sgpa,
      }));

      if (prediction !== null) {
        // This creates the start point for the dotted line from the last known SGPA
        data[data.length - 1] = {
          ...data[data.length - 1],
          "Predicted SGPA": student.sgpa_curr,
        };
        // This adds the single predicted point for the next semester
        data.push({
          semester: semesterNumber + 1,
          "Predicted SGPA": prediction,
        });
      }
      setChartData(data);
    }
  }, [student]);

  if (!hasMounted) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Performance Analysis</CardTitle>
            <CardDescription>Your SGPA trend and prediction for the next semester.</CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-[350px]" />
          </CardContent>
        </Card>
      );
    }
  
    if (!chartData || chartData.length === 0) {
      return (
         <Card>
           <CardHeader>
             <CardTitle className="font-headline">Your Performance Analysis</CardTitle>
             <CardDescription>Your SGPA trend and prediction for the next semester.</CardDescription>
           </CardHeader>
           <CardContent>
             <p className="text-muted-foreground">
               Not enough data to generate a prediction. 
             </p>
           </CardContent>
         </Card>
      );
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Performance Analysis</CardTitle>
        <CardDescription>An analysis of your SGPA trend and a prediction for the upcoming semester.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
                dataKey="semester"
                type="number"
                domain={['dataMin', 'dataMax']}
                tickFormatter={(tick) => `Sem ${tick}`}
                allowDecimals={false}
                interval={0}
                ticks={[...new Set(chartData.map(d => d.semester))]}
            />
            <YAxis domain={[0, 10]} />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              labelFormatter={(label) => `Semester ${label}`}
              formatter={(value: number, name: string) => [typeof value === 'number' ? value.toFixed(2) : 'N/A', name]}
            />
            <Legend />
            <Line connectNulls type="monotone" dataKey="Your SGPA" stroke="red" strokeWidth={2} />
            <Line connectNulls type="monotone" dataKey="Predicted SGPA" name="Predicted SGPA" stroke="red" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
