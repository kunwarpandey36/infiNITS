
'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ArrowLeft, CalendarPlus, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


const clubsList = [
  { name: "Dojonits", description: "Details will be updated soon.", icon: Users, link: "https://sites.google.com/view/infinitsilchar/clubs-at-nit-silchar" },
  { name: "NITS Cricket Club", description: "Details will be updated soon.", icon: Users, link: "https://www.instagram.com/nits_cricket/" },
  { name: "PPG NITS", description: "Public Policy and Governance Society, NIT Silchar.", icon: Users, link: "https://www.instagram.com/ppgsnitsilchar/" },
  { name: "Yoga Club NIT Silchar", description: "Details will be updated soon.", icon: Users, link: "https://www.instagram.com/yoga_club_nits/" },
  { name: "Symphonits", description: "ᴍᴜsɪᴄ ᴄʟᴜʙ ᴏғ ɴɪᴛ sɪʟᴄʜᴀʀ 𝙻𝚎𝚝 𝚝𝚑𝚎 𝚖𝚞𝚜𝚒𝚌 𝚜𝚙𝚎𝚊𝚔 𝚏𝚘𝚛 𝚒𝚝𝚜𝚎𝚕𝚏✨", icon: Users, link: "https://www.instagram.com/sympho.nits__/"},
  { name: "Mountaineering and Trekking Club NITS", description: "Details will be updated soon.", icon: Users, link: "https://www.instagram.com/adventure_club.nits/" },
  { name: "Obiettivo", description: "𝐏𝐡𝐨𝐭𝐨𝐠𝐫𝐚𝐩𝐡𝐲 𝐂𝐥𝐮𝐛 𝐍𝐈𝐓 𝐒𝐢𝐥𝐜𝐡𝐚𝐫.", icon: Users, link: "https://www.instagram.com/obiettivo_official/" },
  { name: "Quiz Club NITS", description: "Details will be updated soon.", icon: Users, link: "https://www.instagram.com/quizclub_nits/" },
  { name: "Aaveg", description: "Aaveg - Dance Club NIT Silchar", icon: Users, link: "https://www.instagram.com/danceclubnits/" },
  { name: "E-Cell NIT Silchar", description: "Entrepreneurship Cell NIT Silchar", icon: Users, link: "https://ecellnits.org/", instagram: "https://www.instagram.com/ecell.nitsilchar/" },
  { name: "NITS Eco Club", description: "Details will be updated soon.", icon: Users, link: "https://sites.google.com/view/infinitsilchar/clubs-at-nit-silchar" },
  { name: "Illuminits", description: "Literary, Publication, and Fine Arts Society of NIT Silchar.", icon: Users, link: "https://www.instagram.com/illuminits/" },
  { name: "NITS Model United Nations", description: "The official instagram handle of NIT Silchar Model United Nations.", icon: Users, link: "https://www.nitsmun.co.in/", instagram: "https://www.instagram.com/nitsmun/" },
  { name: "N.E.R.D.S.", description: "NITS Embedded And Robotics Development Society-Robotics Club of NIT Silchar", icon: Users, link: "https://www.nerdsnitsilchar.in/" },
  { name: "GDG on Campus NIT Silchar", description: "GDG on campus NIT Silchar-Our main focus is to cultivate tech talent in India and expand our reach worldwide", icon: Users, link: "https://gdscnits.in/" },
  { name: "Machine Learning Club NIT Silchar", description: "Machine Learning Club NIT Silchar", icon: Users, link: "https://www.mlclubnits.com/" },
  { name: "Finance and Investment Club NIT Silchar", description: "Details will be updated soon.", icon: Users, link: "https://financeclubnits.in/", instagram: "https://www.instagram.com/financeclubnits/" },
  { name: "NSS NIT Silchar", description: "National Service Scheme, NIT Silchar. NOT ME BUT YOU. A Government Organisation. Official Account Of NSS Cell, NIT SILCHAR", icon: Users, link: "https://www.instagram.com/nss_nits/" },
  { name: "Advay", description: "Advay - Dramatics Club, NIT Silchar. Unleash the Drama within... Join the Stage, Where Drama Meets Family: Uniting Hearts on Stage..!!", icon: Users, link: "https://www.instagram.com/p/DN_kLswky0l/" },
  { name: "NCC NIT Silchar", description: "Details will be updated soon.", icon: Users, link: "https://www.instagram.com/ncc_nits/" },
  { name: "NIT Silchar Basketball Club", description: "Details will be updated soon.", icon: Users, link: "https://www.instagram.com/nits_basketball/" },
  { name: "Gyansagar", description: "Details will be updated soon.", icon: Users, link: "https://bit.ly/gyansagar", instagram: "https://www.instagram.com/gyansagar.npo.nits/" },
  { name: "NITS Football Club", description: "Promoting football culture and organizing matches and tournaments within the campus.", icon: Users, link: "https://sites.google.com/view/infinitsilchar/clubs-at-nit-silchar" },
  { name: "RCA NITS (Rajasthan Cultural Association)", description: "The objective of RCA, NIT Silchar is to keep the cultural spirit of rajasthan alive,keep intact the rich culture and heritage.", icon: Users, link: "https://www.instagram.com/rca.nits/" },
  { name: "IEI NIT Silchar", description: "The Institution of Engineers (India) Student's Chapter, NIT Silchar", icon: Users, link: "https://www.instagram.com/iei.nitsilchar/" },
  { name: "ASME NITS", description: "ASME NIT Silchar Student Section", icon: Users, link: "http://asmenits.org/", instagram: "https://www.instagram.com/asme_nits/" },
  { name: "MATLAB SA NITS", description: "MATLAB Student Ambassador, NIT Silchar", icon: Users, link: "https://linktr.ee/mathworksnits", instagram: "https://www.instagram.com/mtlb_sa_nitsilchar/" },
  { name: "Hindi Sahitya Samiti", description: "Hindi Sahitya Samiti, a wing of Illuminits, the Literary, Publication and Fine Arts Society of NIT Silchar.", icon: Users, link: "https://www.instagram.com/hindisahityasamitinits/" },
  { name: "Kho Kho Club NITS", description: "Official page of Kho-Kho club of NIT Silchar.", icon: Users, link: "https://www.instagram.com/nitsilchar_khokho/" }
];

const clubActivityAnnouncements = [
    { text: "Advay Club announces its upcoming holiday event!", link: "https://www.instagram.com/p/DN_kLswky0l/" },
    { text: "Dojo NITS & Mountaineering Club Orientation on Sep 1st at 5:30 PM in New Gallery.", link: "https://www.instagram.com/p/DN-sKPrkmG6/" },
    { text: "Aaveg Club proudly presents its new crew members!", link: "https://www.instagram.com/p/DN-pFyHE1FY/" },
    { text: "IEI NIT Silchar announces the new Junior Core Team for 2025-2026.", link: "https://www.instagram.com/p/DN-GE1kiUCb/?img_index=6" },
    { text: "2-Day Data Science Workshop by GDG on Campus, 1st & 2nd September.", link: "https://www.instagram.com/p/DN5Hapvkk75/" },
    { text: "New Machine Learning Club, NIT Silchar team for 2025-26.", link: "https://www.instagram.com/p/DNvPoDY5KDr/?img_index=1" },
    { text: "Meet the new NITS ECO Family.", link: "https://www.instagram.com/p/DNvFiTyZu7N/?img_index=1" },
    { text: "Leads of Mountaineering, Trekking, karate and Skating Club for the upcoming term.", link: "https://www.instagram.com/p/DNmlyfaTOzc/?img_index=4" },
    { text: "Core Team of Illuminits for the year 2025—26.", link: "https://www.instagram.com/p/DNe-lhYSetI/?img_index=1" },
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
            <Dialog key={club.name}>
              <DialogTrigger asChild>
                <Card className="hover:shadow-lg transition-shadow duration-200 flex flex-col h-full cursor-pointer">
                  <CardHeader className="flex flex-row items-start justify-between space-x-3 pb-3">
                    <div className="flex items-center gap-3">
                      <club.icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl font-headline">{club.name}</CardTitle>
                    </div>
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
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-headline text-2xl">{club.name}</DialogTitle>
                  <DialogDescription>
                    {club.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">More details and updates will be available on the official club page.</p>
                </div>
                <DialogFooter>
                  <div className="flex gap-2">
                  <a href={club.link} target="_blank" rel="noopener noreferrer">
                    <Button>
                      Visit Club Page <ExternalLink className="ml-2 h-4 w-4"/>
                    </Button>
                  </a>
                  {club.instagram && <a href={club.instagram} target="_blank" rel="noopener noreferrer"><Button>Instagram <ExternalLink className="ml-2 h-4 w-4"/></Button></a>}
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
