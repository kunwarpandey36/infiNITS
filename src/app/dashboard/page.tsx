'use client';

import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import UpcomingEvents from '@/components/upcoming-events';
import RedditFeed from '@/components/reddit-feed';
import { features } from '@/lib/features-data';
import { useStudentData } from '@/hooks/use-student-data';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import BranchResults from '@/components/branch-results';
import { Instagram, Linkedin } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const student = useStudentData();
  const searchParams = useSearchParams();
  const showConfettiParam = searchParams.get('confetti');
  const [showConfetti, setShowConfetti] = useState(showConfettiParam === 'true');

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000); // Confetti lasts for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {showConfetti && <Confetti />}
      <div className="flex items-center justify-between space-y-2 mb-4">
        <div>
          <h2 className="text-lg font-medium">Happy New Year!</h2>
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            swagatam, <span className="text-primary">{student?.name ? `${student.name} ji` : 'Student'}</span>!
          </h2>
        </div>
      </div>
      <div className="space-y-6 bg-cover bg-center p-6 rounded-lg" style={{backgroundImage: `url("/merry christmas.webp")`}}>
        <UpcomingEvents />
        <RedditFeed />
      </div>
      <BranchResults />
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Explore Features</CardTitle>
            <CardDescription>
              All the tools and information you need for your campus life.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.title} className="group">
                <Card className="h-full transition-all group-hover:shadow-md group-hover:-translate-y-1 flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                       {feature.icon}
                       <CardTitle className="text-lg font-medium font-headline leading-tight">
                         {feature.title}
                       </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow pt-0">
                    <CardDescription>
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </CardContent>
        </Card>
        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>Built by Kunwar Pandey</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://www.linkedin.com/in/kunwarpandey36/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/kunwarpandey36" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
    </div>
  );
}
