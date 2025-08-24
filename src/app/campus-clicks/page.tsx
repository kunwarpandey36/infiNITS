
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Camera, ArrowLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useState } from 'react';

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

export default function CampusClicksPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4 md:p-8">
        <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
              <Camera className="text-primary h-8 w-8" /> Campus Clicks
            </h1>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>A Glimpse Into NITS Life</CardTitle>
                <CardDescription>A collection of photos from around the campus. Click any image to view it larger.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {images.map((image, index) => (
                    <Dialog key={index} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
                      <DialogTrigger asChild>
                        <div key={index} className="break-inside-avoid cursor-pointer" onClick={() => setSelectedImage(image.src)}>
                          <Image
                              src={image.src}
                              alt={image.alt}
                              width={500}
                              height={image.orientation === 'portrait' ? 750 : 500}
                              className="rounded-lg object-cover w-full h-auto shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                              data-ai-hint="campus photo"
                          />
                        </div>
                      </DialogTrigger>
                       {selectedImage === image.src && (
                        <DialogContent className="max-w-4xl p-0 border-0">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={1200}
                            height={800}
                            className="rounded-lg object-contain max-h-[90vh] w-full h-auto"
                          />
                        </DialogContent>
                       )}
                    </Dialog>
                ))}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
