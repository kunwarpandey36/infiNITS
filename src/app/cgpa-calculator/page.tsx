import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

export default function CgpaCalculatorPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        CGPA Calculator
      </h1>
      <Card className="flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
        <CardHeader>
          <Calculator className="h-16 w-16 mx-auto text-primary" />
          <CardTitle className="font-headline mt-4">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            This feature is under construction. You'll soon be able to calculate your SGPA and CGPA here.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
