'use client';

import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import UpcomingEvents from '@/components/upcoming-events';
import RedditFeed from '@/components/reddit-feed';
import { features } from '@/lib/features-data.tsx';
import { useStudentData } from '@/hooks/use-student-data';
import BranchResults from '@/components/branch-results';
import PerformanceGraph from '@/components/performance-graph';
import BranchPerformanceGraph from '@/components/branch-performance-graph';

const primaryFeatureTitles = [
  'Profile',
  'Academic Calendar',
  'Attendance Tracker',
  'Branch Resources',
  'Timetable',
  'SGPA Calculator',
];

const primaryFeatures = features.filter((f) =>
  primaryFeatureTitles.includes(f.title)
);
const secondaryFeatures = features.filter(
  (f) => !primaryFeatureTitles.includes(f.title)
);

export default function DashboardClientPage() {
  const student = useStudentData();

  const name = student?.name || 'Student';
  const nameParts = name.split(' ');
  const displayName = nameParts.length > 1 ? `${nameParts[nameParts.length - 1]} ji` : name;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <div>
          <h2 className="text-lg font-medium">Happy New Year!</h2>
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            swagatam, <span className="text-primary">{displayName}</span>!
          </h2>
        </div>
      </div>
      <div className="space-y-6 bg-cover bg-center p-6 rounded-lg" style={{backgroundImage: `url("/merry christmas.webp")`}}>
        <UpcomingEvents />
        <RedditFeed />
      </div>
      <BranchResults />
      <PerformanceGraph />
      <BranchPerformanceGraph />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Features</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {primaryFeatures.map((feature) => (
            <Link href={feature.href} key={feature.href}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {feature.icon}
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">More Features</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {secondaryFeatures.map((feature) => (
            <Link href={feature.href} key={feature.href}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {feature.icon}
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
