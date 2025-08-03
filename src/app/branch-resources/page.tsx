import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const branches = [
  { name: 'Computer Science & Engineering', value: 'cse' },
  { name: 'Mechanical Engineering', value: 'me' },
  { name: 'Civil Engineering', value: 'ce' },
  { name: 'Electrical Engineering', value: 'ee' },
  { name: 'Electronics & Communication Engineering', value: 'ece' },
  { name: 'Electronics & Instrumentation Engineering', value: 'eie' },
];

const semesters = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);

export default function BranchResourcesPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        Branch Resources
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Find Your Resources</CardTitle>
          <CardDescription>
            Select your branch and semester to find notes, previous year papers, and other materials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {branches.map((branch) => (
              <AccordionItem value={branch.value} key={branch.value}>
                <AccordionTrigger className="text-lg font-medium font-headline">{branch.name}</AccordionTrigger>
                <AccordionContent>
                  <Tabs defaultValue="semester-1" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
                      {semesters.map((sem, index) => (
                        <TabsTrigger key={sem} value={`semester-${index + 1}`}>
                          Sem {index + 1}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {semesters.map((sem, index) => (
                        <TabsContent key={sem} value={`semester-${index + 1}`}>
                            <Card className="mt-4">
                                <CardHeader>
                                    <CardTitle>Resources for {sem}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-primary" />
                                            <a href="#" className="hover:underline">Subject 1 Notes</a>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-primary" />
                                            <a href="#" className="hover:underline">Subject 2 PYQs</a>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-primary" />
                                            <a href="#" className="hover:underline">Lab Manual</a>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
