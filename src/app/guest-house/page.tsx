
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Mail, Phone, BedDouble, FileText, IndianRupee, Wifi, Utensils, UserCircle, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';


const rules = [
    "Please switch off the Lights/TV/AC/Geyser before leaving the room.",
    "Use dustbin for the wastage.",
    "Bed Tea between 6.00 am – 6.30 am will be served in the room.",
    "Tea/Breakfast, Lunch and Dinner will be served in the dining hall of the guest house.",
    "Visitors of the Guest are not allowed to enter in the room after 10 pm.",
    "Photo ID card is to be shown before entering the Guest House.",
    "Students from the institute are not allowed to enter the rooms. However, a Student can do so with prior permission/through proper channel.",
    "If any belongings/property of the Guest House are found damaged, the occupant is requested to report immediately or else fine will be charged as deem fit.",
    "Never leave any cash, jewellery, mobile phone or other valuables in the room. The Guest House Management is not responsible for any loss, theft, etc.",
    "Smoking, alcoholic drinks and other intoxicants in the Guest House is strictly prohibited.",
    "The permission to stay in the Guest House shall be subject to availability of accommodation.",
    "Booking/recommending authority will be responsible for the payment of all tariffs, bills, charges, etc.",
    "Student requiring accommodations for their parents are required to get their requisition forwarded by Dean of Students Welfare or The Registrar.",
    "Not more than two persons shall be allowed to stay in the double bedded room.",
    "Room Charges are levied on 24 hours basis.",
    "Please inform the reception about your departure and settle your account well in advance.",
    "Cooking in any form using gas, oven, heater and hot plate is not allowed inside the room.",
    "For cleaning purposes, room keys are to be left with the reception desks.",
    "In case of emergency, a single occupant of the room may be asked to share the accommodation with another guest. The accommodation in the Guest House shall be provided to the people in the order of first come first serve basis. The management of guest house may at its discretion, cancel a booking or offer alternate accommodation depending upon the availability and other unforeseen circumstances.",
];

const tariff = [
    { type: "Normal", official: "600/-", semiOfficial: "850/-", semiPrivate: "950/-", licenseFee: "200/-", instituteGuest: "600/-", privateGuest: "1200/- +GST" },
    { type: "Special", official: "950/-", semiOfficial: "1200/- + GST", semiPrivate: "1500/- + GST", licenseFee: "500/-", instituteGuest: "900/-", privateGuest: "3000/- + GST" },
    { type: "Dormitory", official: "150/- per bed per night", semiOfficial: "", semiPrivate: "", licenseFee: "", instituteGuest: "", privateGuest: ""},
];

const notes = [
    "Official Guest are those persons who are visiting the Institute: a) for any official or academic work related Institute activities, b) to attend Student, Gymkhana functions, etc. arranged officially.",
    "Semi-Official Guest are those persons who are being provided accommodation : a) on the recommendation of R & D and Academic Institutes in the region, b) for being faculty and officers of other NITs, c) to meet their son/daughter/spouse, who are student/scholar of NIT Silchar, d) Institute alumni.",
    "Semi Private Guest are those who are a) the visitor from any other Academic Institute in India and relative’s staff and faculty of NITS, b) for installation, repair etc. of machines, equipment, apparatus etc. of the Institute.",
    "License Fee Guest are those who are the newly joining the Institute as a Staff or Faculty (for 15 days only).",
    "Institute Guest (only BOG Members, Speakers of Convocation, MHRD Officials, T&P guests, and other permitted by the Director, NIT Silchar).",
    "Room will be allotted on sharing basis for the participants and single room for resource person for STC/Workshop/Seminar and other Training programs. The Coordinators of the programmes will be responsible for the payment of room rents & food charges. Henceforth the participants, resource persons & T&P Guests will not be treated as Institute guest for guest house payment purpose. The settlement of Bills (food & Room Rent) will be the responsibility of the indenter of concerned Deptt.",
    "Private Guest are those who do not fall in any of the categories above and who are not Institute Guest.",
    "For students room will be allotted only after recommendation/verification by Dean of Student Affairs or Warden.",
    "The indenter has to inform to the Guest House Authority the actual number of occupants and the list of the guests with name & address before 48 hours.",
    "If the indenter cancels any booked rooms within 24 hours, he/she has to pay full room rent."
];

const otherStaff = [
    { name: "BAPPON BARDHAN", phone: "8134994119" },
    { name: "SUMIT RABIDAS", phone: "6000155435" },
    { name: "AJOY DHAR", phone: "7053856166" },
    { name: "POMPI DEV", phone: "8474803355" },
    { name: "SUBHO BHATTACHRJEE", phone: "6000107689" },
];

export default function GuestHousePage() {
    const router = useRouter();

    return (
        <div className="container mx-auto p-4 md:p-8 space-y-6">
            <div className="flex items-center gap-4 mb-2">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Guest House</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Important Information</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <h3 className="font-semibold flex items-center gap-2"><Wifi className="h-5 w-5 text-primary"/> WiFi Details</h3>
                        <p className="text-muted-foreground ml-7">Network Name: <span className="font-mono bg-muted px-2 py-1 rounded-md">NITS</span></p>
                        <p className="text-muted-foreground ml-7">Password: <span className="font-mono bg-muted px-2 py-1 rounded-md">abcde</span></p>
                    </div>
                     <div className="space-y-1">
                        <h3 className="font-semibold flex items-center gap-2"><Phone className="h-5 w-5 text-primary"/> Reception</h3>
                        <a href="tel:+919707524004" className="text-muted-foreground ml-7 hover:underline">+91 9707524004</a>
                    </div>
                     <div className="space-y-1">
                        <h3 className="font-semibold flex items-center gap-2"><Utensils className="h-5 w-5 text-primary"/> Canteen</h3>
                        <a href="tel:+916901595620" className="text-muted-foreground ml-7 hover:underline">+91 6901595620</a>
                    </div>
                </CardContent>
            </Card>
            
            <Accordion type="single" collapsible className="w-full" defaultValue="booking">
                 <AccordionItem value="booking">
                    <AccordionTrigger className="text-xl font-headline"><Mail className="mr-2 h-5 w-5 text-primary"/>Booking Information</AccordionTrigger>
                    <AccordionContent>
                        <p className="text-muted-foreground mb-4">To book a room in the Guest House, please send an email to the official address with your requirements.</p>
                        <a href="mailto:guesthouse@nits.ac.in">
                            <Button>
                                Email to Book: guesthouse@nits.ac.in
                            </Button>
                        </a>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rules">
                    <AccordionTrigger className="text-xl font-headline"><FileText className="mr-2 h-5 w-5 text-primary"/>Rules and Regulations</AccordionTrigger>
                    <AccordionContent className="pl-2">
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            {rules.map((rule, index) => (
                                <li key={index}>{rule}</li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tariff">
                    <AccordionTrigger className="text-xl font-headline"><IndianRupee className="mr-2 h-5 w-5 text-primary"/>Revised Room Tariff</AccordionTrigger>
                    <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-4">Effective from 15.09.2018. GST as applicable time to time.</p>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type of Room</TableHead>
                                        <TableHead>Official (Rs.)</TableHead>
                                        <TableHead>Semi-Official (Rs.)</TableHead>
                                        <TableHead>Semi-Private (Rs.)</TableHead>
                                        <TableHead>License Fee (Rs.)</TableHead>
                                        <TableHead>Institute Guest (Rs.)</TableHead>
                                        <TableHead>Private Guest (Rs.)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tariff.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{row.type}</TableCell>
                                            <TableCell>{row.official || '-'}</TableCell>
                                            <TableCell>{row.semiOfficial || '-'}</TableCell>
                                            <TableCell>{row.semiPrivate || '-'}</TableCell>
                                            <TableCell>{row.licenseFee || '-'}</TableCell>
                                            <TableCell>{row.instituteGuest || '-'}</TableCell>
                                            <TableCell>{row.privateGuest || '-'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                         <ul className="list-decimal space-y-2 pl-6 mt-4 text-sm text-muted-foreground">
                            {notes.map((note, index) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <Card className="p-4 bg-muted/50">
                        <p className="font-semibold text-primary">Dr. Ujjal Chakraborty</p>
                        <p className="text-sm text-muted-foreground">Assistant Prof. (Dept. of ECE) & Faculty-in-Charge, Guest House</p>
                        <Separator className="my-2"/>
                        <div className="flex items-center gap-2 mt-2">
                            <Phone className="h-4 w-4 text-primary"/>
                            <a href="tel:03842-240251" className="text-sm hover:underline">03842-240251</a>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <Mail className="h-4 w-4 text-primary"/>
                             <a href="mailto:guesthouse@nits.ac.in" className="text-sm hover:underline">guesthouse@nits.ac.in</a>
                        </div>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                        <p className="font-semibold text-primary">Mr. Indrajit Goswami</p>
                        <p className="text-sm text-muted-foreground">Caretaker</p>
                         <Separator className="my-2"/>
                        <div className="flex items-center gap-2 mt-2">
                            <Phone className="h-4 w-4 text-primary"/>
                            <a href="tel:+919707910108" className="text-sm hover:underline">+91 9707910108</a>, <a href="tel:+918473088573" className="text-sm hover:underline">+91 8473088573</a>
                        </div>
                         <div className="flex items-center gap-2 mt-1">
                            <Mail className="h-4 w-4 text-primary"/>
                            <a href="mailto:igoswami34@gmail.com" className="text-sm hover:underline">igoswami34@gmail.com</a>, <a href="mailto:nits.guesthouse@gmail.com" className="text-sm hover:underline">nits.guesthouse@gmail.com</a>
                        </div>
                    </Card>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" /> Staff and Support
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {otherStaff.map((staff, index) => (
                        <Card key={index} className="p-4">
                            <div className="flex items-center gap-3">
                                <UserCircle className="h-8 w-8 text-muted-foreground" />
                                <div>
                                    <p className="font-semibold">{staff.name}</p>
                                    <a href={`tel:+91${staff.phone}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                                        <Phone className="h-3 w-3" />
                                        {staff.phone}
                                    </a>
                                </div>
                            </div>
                        </Card>
                    ))}
                </CardContent>
            </Card>

        </div>
    );
}
