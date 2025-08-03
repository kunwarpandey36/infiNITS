'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ArrowLeft, CalendarPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const clubsList = [
  { name: "Dojonits", description: "Details will be updated soon.", icon: Users },
  { name: "NITS Cricket Club", description: "Details will be updated soon.", icon: Users },
  { name: "Ppgnitsilchar", description: "Details will be updated soon.", icon: Users },
  { name: "Yoga Club NIT Silchar", description: "Details will be updated soon.", icon: Users },
  { name: "Symphonits", description: "Details will be updated soon.", icon: Users },
  { name: "Mountaineering and Trekking Club NITS", description: "Details will be updated soon.", icon: Users },
  { name: "Obiettivo", description: "Details will be updated soon.", icon: Users },
  { name: "Quizclub NITS", description: "Details will be updated soon.", icon: Users },
  { name: "Aaveg", description: "Details will be updated soon.", icon: Users },
  { name: "E Cell NIT Silchar", description: "Details will be updated soon.", icon: Users },
  { name: "NITS Eco Club", description: "Details will be updated soon.", icon: Users },
  { name: "Illuminits", description: "Details will be updated soon.", icon: Users },
  { name: "NITS Model United Nations", description: "Details will be updated soon.", icon: Users },
  { name: "N.E.R.D.S.", description: "Details will be updated soon.", icon: Users },
  { name: "GDG on Campus NIT Silchar", description: "Details will be updated soon.", icon: Users },
  { name: "Machine Learning Club NIT Silchar", description: "Fostering interest and knowledge in Machine Learning. Visit our website: https://www.mlclubnits.com/", icon: Users },
  { name: "Finance and Investment Club NIT Silchar", description: "Details will be updated soon.", icon: Users },
  { name: "NSS NIT Silchar", description: "Details will be updated soon.", icon: Users },
  { name: "Advay", description: "Details will be updated soon.", icon: Users },
  { name: "NCC NIT Silchar", description: "Details will be updated soon.", icon: Users },
  { name: "NIT Silchar Basketball Club", description: "Details will be updated soon.", icon: Users },
  { name: "Gyansagar", description: "Details will be updated soon.", icon: Users },
  { name: "NITS Football Club", description: "Promoting football culture and organizing matches and tournaments within the campus.", icon: Users },
];

const clubActivityAnnouncements = [
    { 
      text: "We are proud to announce the initiation of the Public Policy and " + 
            "Governance Society (PPGS) Chapter at NIT Silchar.", 
      link: "https://www.instagram.com/ppgsnitsilchar/?g=5" 
    },
    { 
      text: "Collaboration of Assam University with TEDx.", 
      link: "https://www.instagram.com/p/DKNIVrsyqVC/?img_index=1" 
    },
    { 
      text: "A warm welcome to Batch 2029 from Think India, NIT Silchar!", 
      link: "https://www.instagram.com/p/DKFAISJSnIC/?img_index=1" 
    },
    { 
      text: "Eco Club of NIT Silchar invites you to COSMOSPEECH.", 
      link: "https://www.instagram.com/p/DKEYEpwzajd/?img_index=1" 
    },
];

export default function ClubsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center font-headline">
          <Users className="mr-3 h-8 w-8 text-primary" />
          Student Clubs
        </h1>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
            <CardTitle>Recent Club Activity</CardTitle>
        </CardHeader>
        <CardContent>
            {clubActivityAnnouncements.map((announcement, index) => (
                <Alert key={index} className="mb-2">
                    <AlertDescription>
                        <a href={announcement.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {announcement.text}
                        </a>
                    </AlertDescription>
                </Alert>
            ))}
        </CardContent>
      </Card>


      {clubsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubsList.map((club) => (
            <Card key={club.name} className="hover:shadow-lg transition-shadow duration-200 flex flex-col">
              <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                <club.icon className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl font-headline">{club.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <p className="text-sm text-muted-foreground">
                  {club.description}
                </p>
                <div className="pt-2 border-t border-border/50">
                  <p className="text-sm font-medium text-foreground flex items-center">
                    <CalendarPlus className="mr-2 h-4 w-4 text-primary/80" />
                    Upcoming Events: <span className="ml-1 font-normal text-muted-foreground">Coming soon</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg">
            Club information will be updated soon. Please provide the list of clubs.
          </p>
        </div>
      )}
       <Card className="mt-8 bg-secondary/20">
        <CardHeader>
            <CardTitle className="text-lg font-headline">Note</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">
            This section provides a list of student clubs at NIT Silchar. 
            Detailed information about each club, including their activities and contact information, will be updated soon.
            The announcements box above highlights recent general club notices.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
