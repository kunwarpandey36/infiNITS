'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Library,
  Users,
  CalendarDays,
  MapIcon,
  Calculator,
  Home,
  Banknote,
  TrendingUp,
  Clock,
  Mail,
  BookOpen,
  Theater,
} from 'lucide-react';

const components: { title: string; href: string; description: string, icon: React.ReactNode }[] = [
    { href: '/academic-calendar', title: 'Academic Calendar', icon: <Calendar />, description: 'View important dates and events.' },
    { href: '/attendance-tracker', title: 'Attendance', icon: <CheckSquare />, description: 'Track your class attendance.' },
    { href: '/branch-resources', title: 'Resources', icon: <Library />, description: 'Access notes and materials.' },
    { href: '/clubs', title: 'Clubs', icon: <Users />, description: 'Explore student clubs.'},
    { href: '/societies', title: 'Societies', icon: <Theater />, description: 'Discover campus societies.'},
    { href: '/events', title: 'Events', icon: <CalendarDays />, description: 'Find upcoming college events.'},
    { href: '/campus-map', title: 'Campus Map', icon: <MapIcon />, description: 'Navigate the campus grounds.'},
    { href: '/cgpa-calculator', title: 'CGPA Calculator', icon: <Calculator />, description: 'Calculate your CGPA.'},
    { href: '/hostels', title: 'Hostels', icon: <Home />, description: 'Info on hostels & mess.'},
    { href: '/fees', title: 'Fees', icon: <Banknote />, description: 'View fee structure details.'},
    { href: '/placements', title: 'Placements', icon: <TrendingUp />, description: 'Check placement statistics.' },
    { href: '/timetable', title: 'Timetable', icon: <Clock />, description: 'Your class schedule.' },
    { href: '/feedback', title: 'Feedback', icon: <Mail />, description: 'Send us your feedback.'},
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === '/dashboard' ? 'bg-accent' : ''
                )}
              >
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    icon={component.icon}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { icon: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5 text-primary' })}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';