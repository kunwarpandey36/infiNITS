import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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

export default function HomePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <WhatToDo />
        </div>
        {features.map((feature) => (
          <Link href={feature.href} key={feature.title}>
            <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium font-headline">
                  {feature.title}
                </CardTitle>
                {feature.icon}
              </CardHeader>
              <CardDescription className="p-6 pt-0">
                {feature.description}
              </CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}