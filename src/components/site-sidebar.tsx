'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Library,
  Users,
  Theater,
  CalendarDays,
  MapIcon,
  Calculator,
  Home,
  Banknote,
  TrendingUp,
  Clock,
  Mail,
  BookOpen,
} from 'lucide-react';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/academic-calendar', label: 'Academic Calendar', icon: <Calendar /> },
  { href: '/attendance-tracker', label: 'Attendance', icon: <CheckSquare /> },
  { href: '/branch-resources', label: 'Resources', icon: <Library /> },
  { href: '/clubs', label: 'Clubs', icon: <Users /> },
  { href: '/societies', label: 'Societies', icon: <Theater /> },
  { href: '/events', label: 'Events', icon: <CalendarDays /> },
  { href: '/campus-map', label: 'Campus Map', icon: <MapIcon /> },
  { href: '/cgpa-calculator', label: 'CGPA Calculator', icon: <Calculator /> },
  { href: '/hostels', label: 'Hostels', icon: <Home /> },
  { href: '/fees', label: 'Fees', icon: <Banknote /> },
  { href: '/placements', label: 'Placements', icon: <TrendingUp /> },
  { href: '/timetable', label: 'Timetable', icon: <Clock /> },
  { href: '/feedback', label: 'Feedback', icon: <Mail /> },
];

export function SiteSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="dark">
      <SidebarHeader className="h-14 items-center flex justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center"
        >
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg font-headline text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            Infinites Hub
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{
                    children: item.label,
                    side: 'right',
                  }}
                >
                  <a>
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
