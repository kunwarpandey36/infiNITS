import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useStudentData } from '@/hooks/use-student-data';
import { mergedStudentData } from '@/lib/nit-silchar-student-data';

interface BranchChartData {
  semester: string;
  [key: string]: number | string | null;
}

const CustomTooltip = ({ active, payload, label, activeScholarId, currentUserScholarId }: any) => {
    if (active && payload && payload.length && activeScholarId) {
      const data = payload.find((p: any) => p.dataKey === activeScholarId || (p.name === 'Your SGPA' && activeScholarId === currentUserScholarId));
      
      if (data && typeof data.value === 'number') {
        const isUser = data.name === 'Your SGPA';
        const scholarId = isUser ? currentUserScholarId : data.dataKey;
        const student = mergedStudentData.find(s => s.scholarId === scholarId);
        const studentName = isUser ? "You" : (student ? student.name : scholarId);
        const sgpa = data.value.toFixed(2);
        
        return (
          <div className="p-2 bg-background border border-border rounded-md shadow-lg">
            <p className="font-bold">{label}</p>
            <p className="text-sm">{`${studentName}: ${sgpa}`}</p>
          </div>
        );
      }
    }
    return null;
};


export default function BranchPerformanceGraph() {
  const currentUser = useStudentData();
  const [chartData, setChartData] = useState<BranchChartData[] | null>(null);
  const [studentKeys, setStudentKeys] = useState<string[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [description, setDescription] = useState('Your SGPA progression compared to your branchmates.');
  const [activeScholarId, setActiveScholarId] = useState<string | null>(null);

  useEffect(() => {
    setHasMounted(true);
    if (currentUser && mergedStudentData) {
      const currentUserScholarId = currentUser.scholarId;
      setActiveScholarId(currentUserScholarId)

      const currentUserPrefix = currentUserScholarId.substring(0, 4);

      const branchStudents = mergedStudentData.filter(s =>
        s.scholarId.startsWith(currentUserPrefix)
      );

      const studentIds = branchStudents.map(s => s.scholarId);

      const data: BranchChartData[] = [
        { semester: 'Previous Sem' },
        { semester: 'Current Sem' },
      ];

      branchStudents.forEach(student => {
        const key = student.scholarId === currentUserScholarId ? 'Your SGPA' : student.scholarId;
        data[0][key] = student.sgpa_prev;
        data[1][key] = student.sgpa_curr;
      });

      const userRank = branchStudents
        .sort((a, b) => b.cgpa - a.cgpa)
        .findIndex(s => s.scholarId === currentUserScholarId);

      const desc = userRank !== -1
          ? `You are ranked #${userRank + 1} in your class of ${branchStudents.length} students based on CGPA.`
          : 'This is the SGPA progression for your branch.';
      
      setDescription(desc);
      setChartData(data);
      setStudentKeys(studentIds);
    }
  }, [currentUser]);

  if (!hasMounted) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Branch Performance Analysis</CardTitle>
            <CardDescription>{description}</CardDescription>
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
             <CardTitle className="font-headline">Branch Performance Analysis</CardTitle>
             <CardDescription>{description}</CardDescription>
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
        <CardTitle className="font-headline">Branch Performance Analysis</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} onMouseLeave={() => setActiveScholarId(currentUser?.scholarId ?? null)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis domain={[0, 10]} />
                <Tooltip content={<CustomTooltip activeScholarId={activeScholarId} currentUserScholarId={currentUser?.scholarId} />} isAnimationActive={false}/>
                {studentKeys.filter(id => id !== currentUser?.scholarId).map(scholarId => (
                    <Line 
                        key={scholarId} 
                        connectNulls type="monotone" 
                        dataKey={scholarId} 
                        stroke="#d3d3d3" 
                        strokeWidth={activeScholarId === scholarId ? 2 : 1} 
                        dot={false}
                        onMouseEnter={() => setActiveScholarId(scholarId)}
                        name={scholarId}
                    />
                ))}
                <Line 
                    connectNulls 
                    type="monotone" 
                    dataKey="Your SGPA" 
                    name="Your SGPA" 
                    stroke="red" 
                    strokeWidth={activeScholarId === currentUser?.scholarId ? 3 : 2} 
                    dot={true} 
                    onMouseEnter={() => setActiveScholarId(currentUser?.scholarId ?? null)}
                />
            </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
