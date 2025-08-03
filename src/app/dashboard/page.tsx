import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import WhatToDo from '@/components/what-to-do';
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Library,
  Users,
  Theater,
  CalendarDays,
  Map,
  Calculator,
  Home as HomeIcon,
  Banknote,
  TrendingUp,
  Clock,
  Mail,
} from 'lucide-react';

const features = [
  {
    title: 'Academic Calendar',
    href: '/academic-calendar',
    icon: <Calendar className="h-8 w-8 text-primary" />,
    description: 'View important dates and events.',
  },
  {
    title: 'Attendance Tracker',
    href: '/attendance-tracker',
    icon: <CheckSquare className="h-8 w-8 text-primary" />,
    description: 'Track your class attendance.',
  },
  {
    title: 'Branch Resources',
    href: '/branch-resources',
    icon: <Library className="h-8 w-8 text-primary" />,
    description: 'Access notes and materials.',
  },
  {
    title: 'Clubs',
    href: '/clubs',
    icon: <Users className="h-8 w-8 text-primary" />,
    description: 'Explore student clubs.',
  },
  {
    title: 'Societies',
    href: '/societies',
    icon: <Theater className="h-8 w-8 text-primary" />,
    description: 'Discover campus societies.',
  },
  {
    title: 'Events',
    href: '/events',
    icon: <CalendarDays className="h-8 w-8 text-primary" />,
    description: 'Find upcoming college events.',
  },
  {
    title: 'Campus Map',
    href: '/campus-map',
    icon: <Map className="h-8 w-8 text-primary" />,
    description: 'Navigate the campus grounds.',
  },
  {
    title: 'CGPA Calculator',
    href: '/cgpa-calculator',
    icon: <Calculator className="h-8 w-8 text-primary" />,
    description: 'Calculate your CGPA.',
  },
  {
    title: 'Hostels',
    href: '/hostels',
    icon: <HomeIcon className="h-8 w-8 text-primary" />,
    description: 'Information about hostels.',
  },
  {
    title: 'Institute Fees',
    href: '/fees',
    icon: <Banknote className="h-8 w-8 text-primary" />,
    description: 'View fee structure details.',
  },
  {
    title: 'Placement Stats',
    href: '/placements',
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    description: 'Check placement statistics.',
  },
  {
    title: 'Timetable',
    href: '/timetable',
    icon: <Clock className="h-8 w-8 text-primary" />,
    description: 'Your class schedule.',
  },
  {
    title: 'Feedback',
    href: '/feedback',
    icon: <Mail className="h-8 w-8 text-primary" />,
    description: 'Send us your feedback.',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
      </div>
      <div className="space-y-6">
        <WhatToDo />
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
      </div>
    </div>
  );
}
