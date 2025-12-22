'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useStudentData } from '@/hooks/use-student-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * A more advanced, optimistic momentum-based predictor.
 * It assumes students will always strive to improve and dampens predictions at high SGPAs for realism.
 */
function predictOptimistically(s1: number, s2: number): { pred: number; lowerBound: number; upperBound: number } {
    const trend = s2 - s1;

    let determinedPred: number;

    if (trend > 0) {
        // Positive Trend: Apply a dampened momentum.
        // The damping factor increases as s2 gets higher, making improvements harder.
        const dampingFactor = 0.5 * (1 - (Math.max(0, s2 - 8.0) / 2.0) * 0.8);
        determinedPred = s2 + dampingFactor * trend;
    } else {
        // Negative or Stable Trend: Assume a small, optimistic course correction.
        // This prevents the model from ever predicting a decline.
        determinedPred = s2 + 0.05;
    }

    const clampedPred = Math.max(0, Math.min(10, determinedPred));
    
    // Confidence is based on the magnitude of the last change.
    const std = Math.abs(trend) / 2;
    const conf = Math.max(0.2, 0.8 * std);
    
    return {
        pred: clampedPred,
        lowerBound: Math.max(0, clampedPred - conf),
        upperBound: Math.min(10, clampedPred + conf),
    };
}

export default function PerformanceGraph() {
  const student = useStudentData();

  const predictionResult = useMemo(() => {
    if (!student?.cgpa || !student?.sgpa) {
      return null;
    }
    
    const cgpa = parseFloat(student.cgpa);
    const s2 = parseFloat(student.sgpa);
    const s1 = (cgpa * 2) - s2;

    if (isNaN(s1) || isNaN(s2) || isNaN(cgpa)) return null;

    return predictOptimistically(s1, s2);
  }, [student]);

  const chartData = useMemo(() => {
    if (!predictionResult || !student?.cgpa || !student?.sgpa) {
      return [];
    }
    const cgpa = parseFloat(student.cgpa);
    const s2 = parseFloat(student.sgpa);
    const s1 = (cgpa * 2) - s2;

    if (isNaN(s1) || isNaN(s2) || isNaN(cgpa)) return [];

    return [
      { name: 'Sem N-2 (Calc)', sgpa: s1, predicted_sgpa: null },
      { name: 'Sem N-1', sgpa: s2, predicted_sgpa: s2 }, // Anchor point
      { name: 'Sem N (Pred)', sgpa: null, predicted_sgpa: predictionResult.pred },
    ];
  }, [student, predictionResult]);

  if (!predictionResult) {
    return (
       <Card>
         <CardHeader>
           <CardTitle className="font-headline">Performance Analysis</CardTitle>
           <CardDescription>
             Your SGPA trend and prediction for the next semester.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Not enough data to generate a prediction. We need at least one SGPA and CGPA from your profile.
           </p>
         </CardContent>
       </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Performance Analysis</CardTitle>
        <CardDescription>
          Your SGPA trend and a rule-based prediction for the next semester.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sgpa" stroke="#8884d8" name="Past SGPA" strokeWidth={2} />
            <Line type="monotone" dataKey="predicted_sgpa" stroke="#82ca9d" name="Predicted SGPA" strokeDasharray="5 5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        <div className="text-center mt-4 space-y-1">
            <p className="font-bold text-lg">
                Predicted SGPA for Next Semester: {predictionResult.pred.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
                Based on your recent performance, your SGPA is likely to be in the range of <strong>{predictionResult.lowerBound.toFixed(2)}</strong> to <strong>{predictionResult.upperBound.toFixed(2)}</strong>.
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
