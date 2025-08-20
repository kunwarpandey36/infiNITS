
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
    User,
    Camera,
  } from 'lucide-react';
  
  export const features = [
    {
      title: 'Profile',
      href: '/profile',
      icon: <User className="h-8 w-8 text-primary" />,
      description: 'View your personal profile.',
    },
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
      title: 'SGPA Calculator',
      href: '/sgpa-calculator',
      icon: <Calculator className="h-8 w-8 text-primary" />,
      description: 'Calculate your SGPA.',
    },
    {
      title: 'Campus Clicks',
      href: '/campus-clicks',
      icon: <Camera className="h-8 w-8 text-primary" />,
      description: 'A glimpse into campus life.',
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
  
