'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, CalendarPlus } from "lucide-react";
import { useRouter } from "next/navigation";

const societiesList = [
  {
    name: "Computer Science Society (CSS)",
    description: "The students and the faculty of the Computer Science and Engineering Department are the members of the Society. The Society aims at organising various activities for the professional and intellectual development of the students. It involves a wide variety of events including seminars, paper presentations, debate, quiz and software contests.The society also organises socialisation programmes for the freshmen in the society.",
    icon: Shield,
  },
  {
    name: "Electronics & Communication Society (ECS)",
    description: "The Electronics and Telecommunication Department has an active Society called “Electronics Society” which has been formed with a view to promote various technical activities among the students. Both the faculty and the students are the members of the Society.",
    icon: Shield,
  },
  {
    name: "Electra (Electrical Engineering Society)",
    description: "The Electrical Engineering Society aims at guiding the students to undertake various activities like technical seminars and debates on various fields of electrical engineering which enables the students to keep pace with the rapidly changing technology.",
    icon: Shield,
  },
  {
    name: "Civil Engineering Society (CES)",
    description: "The students and the staff of the Civil Engineering Department are the members of the Society. The Society aims at organising various activities for the professional development of the students. The most important function organised annually by the Society is “aaghaz”. It involves a wide variety of events including seminars, paper presentations, debate, quiz and software contests.",
    icon: Shield,
  },
  {
    name: "Mechanical Engineering Society (MES)",
    description: "The Mechanical Engineering Society, called “MES” is an integral part of the Department which aims at bringing the best out of the students and helping them hone their skills through various activities conducted by the Society. The Society is also involved in active consultancy works for the development and utilization of resources of the North-Eastern part of India.",
    icon: Shield,
  },
  {
    name: "IEEE Students' Branch",
    description: "IEEE NITS (National Institute of Technology, Silchar) is one of the many student organizations working under IEEE, Institute of Electrical and Electronics Engineers, headquartered in USA. We are a part of the IEEE Kolkata Section, under Asia Pacific Region (IEEE Region 10). Being one of the few IEEE branches in the north-east, we hope to fulfill our role to bring the latest innovations in technology to this vibrant corner of India.",
    icon: Shield,
  },
  {
    name: "Indian Society for Technical Education (ISTE)",
    description: "The Institute has a very active ISTE Students’ Chapter and a Teachers’ Chapter as well. The Institute is an Institutional Menber of ISTE as well. The Society is chiefly concerned with the technical and educational extra-academics. In addition to these events, the Institute also organizes rock concerts, food fests, Institute freshers and farewell.",
    icon: Shield,
  },
  {
    name: "Instrumentation and Electronics Engineering Society (INSEES)",
    description: "The Department of Electronics & Instrumentation Engineering (EIE) has a society, the INSEES (Instrumentation and Electronics Engineering Society), comprising of the faculty and student members of the department. The society has been formed with a view to promote various technical activities among the students. It aims to play an active role in the development of students as potential engineers by various out-of-curriculum and extra-curricular activities including organizing of seminars, paper presentations, debate, quiz and software contests. The society also organises socialisation programmes for the freshmen in the society.\n\nINSEES aims to inculcate among its members an awareness and appreciation of the various disciplines of not just Electronics & Instrumentation Engineering but also other relevant fields. By way of its activities, INSEES aims to be a platform for all the students of NIT Silchar in general and particularly of the students of EIE department. The INSEES plays a vital role as an active organization of the EIE department at NITS which promotes career interests of the members.",
    icon: Shield,
  },
  {
    name: "Management Society",
    description: "Vision\nTo nurture an environment for the managers to be inspiring, intercultural and ethical pioneers of change with management knowledge of global standards and to create knowledge that nurtures innovative leaders and develop leaders of enterprises who add value to society and nation-building.\n\nMission\nTo be a pre-eminent centre of excellence with a holistic concern for significant impact on business and society bygenerating and imparting knowledge in management and providing socially conscious and globally relevant thought leadership and to promote creative solutions for and with responsible organizations.\n\nKey Personalities\nChairman: Dr. Ashim Kr Das\nSecretary: Dr. Soma Panja\nFaculty-in – Charge: Mr. Subhadeep Mukherjee\nFounding Members: Mr. Tomin Sabu Paul, Mr. Bishal De and Mr. Prakash Giri.",
    icon: Shield,
  },
];

export default function SocietiesPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center font-headline">
          <Shield className="mr-3 h-8 w-8 text-primary" />
          Student Societies
        </h1>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {societiesList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {societiesList.map((society) => (
            <Card key={society.name} className="hover:shadow-lg transition-shadow duration-200 flex flex-col">
              <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                <society.icon className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl font-headline">{society.name.toUpperCase()}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {society.description}
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
          <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg">
            Society information will be updated soon.
          </p>
        </div>
      )}
       <Card className="mt-8 bg-secondary/20">
        <CardHeader>
            <CardTitle className="text-lg font-headline">Note</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">
            This section provides a list of student societies at NIT Silchar.
            Detailed information about each society, their objectives, and events will be updated soon.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
