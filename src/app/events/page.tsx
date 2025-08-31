
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Pin, ArrowLeft, Info, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { parse, compareAsc } from 'date-fns';

const eventsList = [
  {
    title: 'Incandescence',
    date: 'February 15-18, 2025',
    location: 'NIT Silchar Campus',
    description: 'The annual cultural festival of NIT Silchar, with concerts, competitions, and celebrity nights.',
    organizer: 'Gymkhana Union Body',
    type: 'Festival'
  },
  {
    title: 'Tecnoesis',
    date: 'October 28-31, 2024',
    location: 'New Gallery',
    description: 'The annual techno-management festival, featuring workshops, competitions, and guest lectures.',
    organizer: 'Technical Board',
    type: 'Festival',
    links: {
      website: 'https://www.tecnoesis.co.in/',
      instagram: 'https://www.instagram.com/tecnoesis.nits/'
    }
  },
   {
    title: 'Chhath Puja',
    date: 'October 25, 2024',
    location: 'Campus Ghat',
    description: 'A celebration of Chhath Puja organized by अभ्युदय. For more details, follow their pages.',
    organizer: 'अभ्युदय',
    type: 'Cultural',
    links: {
        instagram: 'https://www.instagram.com/abhyuday_nits/',
        facebook: 'https://www.facebook.com/AbhyudayNITS',
        glimpse: 'https://www.instagram.com/p/DCNrAqOSkps/',
    }
  },
  {
    title: 'UpStart Pitching Event',
    date: 'September 20, 2024',
    location: 'SAC',
    description: 'An opportunity for budding entrepreneurs to pitch their ideas to investors and mentors.',
    organizer: 'E-Cell',
    type: 'Competition'
  },
  {
    title: 'Innovision 2025',
    date: 'September 13-14, 2024',
    location: 'Management Studies Dept.',
    description: 'The flagship event of the Department of Management Studies, NIT Silchar.',
    organizer: 'DOMS',
    type: 'Event',
    links: {
      website: 'https://www.linkedin.com/posts/doms-nit-silchar_innovision2025-innovationmeetsvision-nitsilchar-activity-7367253065650860032-_4Nq?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAD55tPIBoY9yy_VvhBG9TkXc5LZTGW-GzQs&utm_campaign=copy_link'
    }
  },
  {
    title: 'DojoNITS & Trekking Club Orientation',
    date: 'September 1, 2024',
    location: 'New Gallery',
    description: 'Joint orientation session for Dojonits and the Mountaineering and Trekking Club.',
    organizer: 'Dojonits & MTC',
    type: 'Event',
    links: {
      website: 'https://www.instagram.com/p/DN-sKPrkmG6/'
    }
  },
  {
    title: '2-Day Data Science Workshop',
    date: 'September 1-2, 2024',
    location: 'Online / Campus',
    description: 'A comprehensive workshop on Data Science organized by GDG on Campus.',
    organizer: 'GDG on Campus',
    type: 'Workshop',
    links: {
      website: 'https://www.instagram.com/p/DN5Hapvkk75/'
    }
  },
  {
    title: 'Alpha Crescendo',
    date: 'January 12, 2025',
    location: 'Campus Auditorium',
    description: 'The annual technical fest of the EIE department, with various technical events and workshops.',
    organizer: 'INSEES',
    type: 'Tech Fest',
    links: {
      gallery: 'https://www.instagram.com/p/DMM2anwy7_s/?img_index=1',
    }
  },
  {
    title: 'Robotics Workshop',
    date: 'November 05, 2024',
    location: 'Robotics Lab',
    description: 'A hands-on workshop on building and programming autonomous bots.',
    organizer: 'Robotics Club',
    type: 'Workshop'
  },
  {
    title: 'Posua',
    date: 'February 17, 2025',
    location: 'Campus',
    description: 'Details will be updated soon.',
    organizer: 'Posua Team',
    type: 'Cultural',
    links: {
      instagram: 'https://www.instagram.com/posua_nits/'
    }
  },
  {
    title: 'Abacus',
    date: 'April 5, 2025',
    location: 'CSE Department',
    description: 'The annual technical fest of the CSE department.',
    organizer: 'CSS',
    type: 'Tech Fest',
    links: {
      glimpse: 'https://www.instagram.com/p/DIIZXKMPt1-/'
    }
  },
  {
    title: 'Oikyotaan',
    date: 'May 5, 2025',
    location: 'Campus',
    description: 'A cultural event celebrating unity and diversity.',
    organizer: 'Oikyotaan Team',
    type: 'Cultural',
    links: {
      website: 'https://oikyotaan.in/',
      instagram: 'https://www.instagram.com/_oikyotaan_/'
    }
  },
  {
    title: 'Electra Cup',
    date: 'February 7, 2025',
    location: 'Campus',
    description: 'The annual sports fest of the EE department.',
    organizer: 'Electra Society',
    type: 'Sports',
    links: {
      glimpse: 'https://www.instagram.com/p/DFnPF4zPwI9/'
    }
  },
  {
    title: 'Literary Premier League',
    date: 'April 5, 2025',
    location: 'Campus',
    description: 'A literary competition organized by Illuminits.',
    organizer: 'Illuminits',
    type: 'Competition',
    links: {
      website: 'https://heyzine.com/flip-book/dcbf4d0d2c.html#page/1'
    }
  },
  {
    title: 'School Genius',
    date: 'November 2, 2024',
    location: 'During Tecnoesis',
    description: 'A quiz competition for school students.',
    organizer: 'Tecnoesis',
    type: 'Competition',
    links: {
        instagram: 'https://www.instagram.com/school_genius_nits/'
    }
  }
];

const parseDate = (dateString: string): Date => {
  // Handles formats like "Month Day, YYYY" and "Month Day-Day, YYYY"
  const year = new Date().getFullYear();
  const monthDatePart = dateString.split(',')[0];
  const firstMonthDay = monthDatePart.split(' ')[0] + ' ' + monthDatePart.split(' ')[1].split('-')[0];
  return parse(`${firstMonthDay}, ${year}`, 'MMMM d, yyyy', new Date());
};

const sortedEvents = eventsList.sort((a, b) => {
  const dateA = parseDate(a.date);
  const dateB = parseDate(b.date);
  return compareAsc(dateA, dateB);
});


export default function EventsPage() {
  const router = useRouter();
  
  return (
    <div className="container mx-auto p-4 md:p-8">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Upcoming Events
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedEvents.map((event) => (
          <Card key={event.title} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline">{event.title}</CardTitle>
                <Badge variant="secondary">{event.type}</Badge>
              </div>
              <CardDescription>{event.organizer}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{event.description}</p>
                 {event.links && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {event.links.website && <a href={event.links.website} target="_blank" rel="noopener noreferrer"><Button size="sm" variant="outline">Website</Button></a>}
                    {event.links.instagram && <a href={event.links.instagram} target="_blank" rel="noopener noreferrer"><Button size="sm" variant="outline">Instagram</Button></a>}
                    {event.links.facebook && <a href={event.links.facebook} target="_blank" rel="noopener noreferrer"><Button size="sm" variant="outline">Facebook</Button></a>}
                    {event.links.glimpse && <a href={event.links.glimpse} target="_blank" rel="noopener noreferrer"><Button size="sm" variant="outline">Last Year's Glimpse</Button></a>}
                    {event.links.gallery && <a href={event.links.gallery} target="_blank" rel="noopener noreferrer"><Button size="sm" variant="outline">Photo Gallery</Button></a>}
                  </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Pin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card className="mt-8 bg-secondary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center font-headline"><Info className="h-4 w-4 mr-2"/>Note for Clubs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            All club executives are requested to mail their upcoming event details to <a href="mailto:infinitsilchar@gmail.com" className="text-primary hover:underline">infinitsilchar@gmail.com</a> to have them featured on this page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
