
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

const images = [
  { src: '/photo_2025-08-21_00-07-37.jpg', alt: 'Campus lake view', orientation: 'landscape' },
  { src: '/photo_2025-08-21_00-07-40.jpg', alt: 'Library building', orientation: 'portrait' },
  { src: '/photo_2025-08-21_00-07-42.jpg', alt: 'Admin building front', orientation: 'landscape' },
  { src: '/photo_2025-08-21_00-07-43.jpg', alt: 'Student activity center', orientation: 'landscape' },
  { src: '/photo_2025-08-21_00-07-44.jpg', alt: 'Hostel corridor', orientation: 'portrait' },
  { src: '/photo_2025-08-21_00-07-45.jpg', alt: 'Lush greenery on campus', orientation: 'landscape' },
  { src: '/photo_2025-08-21_00-07-46.jpg', alt: 'Sports complex', orientation: 'portrait' },
  { src: '/photo_2025-08-21_00-07-49.jpg', alt: 'Department building', orientation: 'landscape' },
  { src: '/photo_2025-08-21_00-07-50.jpg', alt: 'Campus at night', orientation: 'portrait' },
  { src: '/photo_2025-08-21_00-07-51.jpg', alt: 'Walkway with trees', orientation: 'landscape' },
  { src: '/photo_2025-08-21_00-07-52.jpg', alt: 'Inside a classroom', orientation: 'landscape' },
  { src: '/photo_2025-08-21_00-07-53.jpg', alt: 'Campus main gate', orientation: 'portrait' },
  { src: '/photo_2025-08-21_00-07-54.jpg', alt: 'Students walking on campus', orientation: 'landscape' },
];

export default function CampusClicks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Camera className="text-primary" /> Campus Clicks
        </CardTitle>
        <CardDescription>A glimpse into life at NIT Silchar.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((image, index) => (
            <div key={index} className="break-inside-avoid">
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={image.orientation === 'portrait' ? 750 : 500}
                className="rounded-lg object-cover w-full h-auto shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                data-ai-hint="campus photo"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
