
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
      keywords: 'profile user details sgpa cgpa attendance'
    },
    {
      title: 'Academic Calendar',
      href: '/academic-calendar',
      icon: <Calendar className="h-8 w-8 text-primary" />,
      description: 'View important dates and events.',
      keywords: 'calendar academic dates events holidays exam'
    },
    {
      title: 'Attendance Tracker',
      href: '/attendance-tracker',
      icon: <CheckSquare className="h-8 w-8 text-primary" />,
      description: 'Track your class attendance.',
      keywords: 'attendance tracker subjects classes'
    },
    {
      title: 'Branch Resources',
      href: '/branch-resources',
      icon: <Library className="h-8 w-8 text-primary" />,
      description: 'Access notes and materials.',
      keywords: 'resources notes materials subjects branch'
    },
    {
      title: 'Clubs',
      href: '/clubs',
      icon: <Users className="h-8 w-8 text-primary" />,
      description: 'Explore student clubs.',
      keywords: 'clubs student activities social'
    },
    {
      title: 'Societies',
      href: '/societies',
      icon: <Theater className="h-8 w-8 text-primary" />,
      description: 'Discover campus societies.',
      keywords: 'societies student technical cultural'
    },
    {
      title: 'Events',
      href: '/events',
      icon: <CalendarDays className="h-8 w-8 text-primary" />,
      description: 'Find upcoming college events.',
      keywords: 'events fests technoesis incandescence'
    },
    {
      title: 'Campus Map',
      href: '/campus-map',
      icon: <Map className="h-8 w-8 text-primary" />,
      description: 'Navigate the campus grounds.',
      keywords: 'map campus navigation directions'
    },
    {
      title: 'SGPA Calculator',
      href: '/cgpa-calculator',
      icon: <Calculator className="h-8 w-8 text-primary" />,
      description: 'Calculate your SGPA.',
      keywords: 'sgpa cgpa calculator grade marks'
    },
    {
      title: 'Campus Clicks',
      href: '/campus-clicks',
      icon: <Camera className="h-8 w-8 text-primary" />,
      description: 'A glimpse into campus life.',
      keywords: 'gallery photos images campus life'
    },
    {
      title: 'Hostels',
      href: '/hostels',
      icon: <HomeIcon className="h-8 w-8 text-primary" />,
      description: 'Information about hostels.',
      keywords: 'hostel mess menu warden staff'
    },
    {
      title: 'Institute Fees',
      href: '/fees',
      icon: <Banknote className="h-8 w-8 text-primary" />,
      description: 'View fee structure details.',
      keywords: 'fees payment institute structure'
    },
    {
      title: 'Placement Stats',
      href: '/placements',
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      description: 'Check placement statistics.',
      keywords: 'placements stats statistics jobs salary'
    },
    {
      title: 'Timetable',
      href: '/timetable',
      icon: <Clock className="h-8 w-8 text-primary" />,
      description: 'Your class schedule.',
      keywords: 'timetable schedule routine classes'
    },
    {
      title: 'Feedback',
      href: '/feedback',
      icon: <Mail className="h-8 w-8 text-primary" />,
      description: 'Send us your feedback.',
      keywords: 'feedback contact developers team'
    },
  ];
  
