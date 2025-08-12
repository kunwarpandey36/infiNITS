
'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BedDouble, ArrowLeft, UserCircle, Phone, Mail, Utensils, Home, CheckCircle, Info, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { wardenStaffData } from "@/lib/hostel-data";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect, useMemo } from "react";
import type { Meal, MealDinner, WeeklyMenu } from "@/lib/mess-menu-data"; 
import { messMenuTimings, getMenuForHostel, hostelSpecificMenus } from "@/lib/mess-menu-data"; 
import { getCurrentDayName, isLastSundayOfMonth } from "@/lib/date-utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStudentData } from "@/hooks/use-student-data";


const GUEST_DEFAULT_HOSTEL = "Boys Hostel - 1";
const dayOrder: (keyof WeeklyMenu['days'])[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


export default function HostelsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const student = useStudentData();

  const [todaysMenu, setTodaysMenu] = useState<Meal | null>(null);
  const [isGrandFeastDay, setIsGrandFeastDay] = useState(false);
  const [grandFeastDetails, setGrandFeastDetails] = useState<MealDinner | null>(null);
  const [selectedHostelName, setSelectedHostelName] = useState<string | null>(GUEST_DEFAULT_HOSTEL);
  const [isUpdatingPreference, setIsUpdatingPreference] = useState(false);
  
  const [showFullMenuModal, setShowFullMenuModal] = useState(false);
  const [selectedHostelWeeklyMenu, setSelectedHostelWeeklyMenu] = useState<WeeklyMenu | null>(null);


  const allHostelDisplayNames = useMemo(() => {
    return [...new Set(wardenStaffData.map(h => h.hostelDisplayName))].sort();
  }, []);

  const selectedHostelData = useMemo(() => {
    if (!selectedHostelName) return null;
    return wardenStaffData.find(h => h.hostelDisplayName === selectedHostelName) || null;
  }, [selectedHostelName]);

  useEffect(() => {
    if (selectedHostelName) {
      const currentHostelMenuData = getMenuForHostel(selectedHostelName);
      setSelectedHostelWeeklyMenu(currentHostelMenuData); 

      const today = new Date();
      const currentDayKey = getCurrentDayName(today);

      if (isLastSundayOfMonth(today)) {
        setIsGrandFeastDay(true);
        setGrandFeastDetails(currentHostelMenuData.grandFeast);
        setTodaysMenu(null);
      } else {
        setIsGrandFeastDay(false);
        setGrandFeastDetails(null);
        const menuForDisplay = currentHostelMenuData.days[currentDayKey] ? { ...currentHostelMenuData.days[currentDayKey] } : null;
        setTodaysMenu(menuForDisplay);
      }
    } else {
      setTodaysMenu(null);
      setIsGrandFeastDay(false);
      setGrandFeastDetails(null);
      setSelectedHostelWeeklyMenu(null);
    }
  }, [selectedHostelName]);


  const getMenuTitle = () => {
    if (!selectedHostelName) return "Today's Mess Menu";
    return `Today's Mess Menu for ${selectedHostelName}`;
  };


  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center font-headline">
          <BedDouble className="mr-3 h-8 w-8 text-primary" />
          Hostels Information
        </h1>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle>Select Hostel</CardTitle>
          <CardDescription>Choose a hostel to view its staff details and mess menu.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hostel-select">Hostel Name</Label>
            <Select
              value={selectedHostelName || ""}
              onValueChange={(value) => setSelectedHostelName(value)}
            >
              <SelectTrigger id="hostel-select" className="w-full md:w-1/2 mt-1">
                <SelectValue placeholder="Select a hostel..." />
              </SelectTrigger>
              <SelectContent>
                {allHostelDisplayNames.map((hostelName) => (
                  <SelectItem key={hostelName} value={hostelName}>
                    {hostelName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedHostelData ? (
        <Card key={selectedHostelData.hostelDisplayName} className="hover:shadow-lg transition-shadow duration-200 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start space-x-3">
              <BedDouble className="h-7 w-7 text-primary mt-1 flex-shrink-0" />
              <CardTitle className="text-lg sm:text-xl font-headline">{selectedHostelData.hostelDisplayName}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow space-y-3">
            {selectedHostelData.staff && selectedHostelData.staff.length > 0 ? (
              selectedHostelData.staff.map((staffMember, index) => (
                <div key={index} className="space-y-1">
                  {index > 0 && <Separator className="my-2" />}
                  <p className="font-semibold text-xs sm:text-sm text-primary/90">{staffMember.role}</p>
                  <div className="flex items-center text-xs sm:text-sm text-foreground">
                    <UserCircle className="mr-2 h-4 w-4 text-primary/70 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{staffMember.name}</span>
                  </div>
                  {staffMember.department && <p className="text-xs text-muted-foreground ml-6">{staffMember.department}</p>}
                  {staffMember.phone && (
                    <div className="flex items-center text-[0.7rem] sm:text-xs text-muted-foreground ml-1">
                      <Phone className="mr-2 h-3 w-3 text-primary/70 flex-shrink-0" />
                      <a href={`tel:${staffMember.phone}`} className="hover:text-primary">{staffMember.phone}</a>
                    </div>
                  )}
                  {staffMember.email && (
                    <div className="flex items-center text-[0.7rem] sm:text-xs text-muted-foreground ml-1">
                      <Mail className="mr-2 h-3 w-3 text-primary/70 flex-shrink-0" />
                      <a href={`mailto:${staffMember.email}`} className="hover:text-primary">{staffMember.email}</a>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Staff information not available for this hostel.</p>
            )}

            <Separator className="my-4" />

            <div>
              <h4 className="text-sm sm:text-md font-semibold flex items-center mb-2 text-primary/90 font-headline">
                <Utensils className="mr-2 h-4 sm:h-5 w-4 sm:w-5 text-primary/70" />
                {getMenuTitle()}
              </h4>
               <p className="text-xs text-muted-foreground mb-2">
                  Timings: Breakfast: {messMenuTimings.Breakfast}, Lunch: {messMenuTimings.Lunch},
                  Snacks: {messMenuTimings.Snacks}, Dinner: {messMenuTimings.Dinner}.
                  {isGrandFeastDay && <span className="font-bold text-destructive block mt-1">🎉 Today is Grand Feast Day! 🎉</span>}
              </p>
              {isGrandFeastDay && grandFeastDetails ? (
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-primary text-md">Grand Feast Menu:</p>
                    <div>
                      <p className="font-semibold text-sm">Veg Menu:</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">{grandFeastDetails?.veg || "N/A"}</p>
                    </div>
                    <Separator className="my-0.5"/>
                    <div>
                      <p className="font-semibold text-sm">Non-Veg Menu:</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">{grandFeastDetails?.nonVeg || "N/A"}</p>
                    </div>
                  </div>
              ) : todaysMenu ? (
                <div className="space-y-1 text-xs">
                  <div>
                    <p className="font-medium text-xs sm:text-sm">Breakfast:</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">{todaysMenu?.breakfast || "N/A"}</p>
                  </div>
                  <Separator orientation="horizontal" className="my-0.5" />
                  <div>
                    <p className="font-medium text-xs sm:text-sm">Lunch:</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">{todaysMenu?.lunch || "N/A"}</p>
                  </div>
                  <Separator orientation="horizontal" className="my-0.5" />
                  <div>
                    <p className="font-medium text-xs sm:text-sm">Snacks:</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">{todaysMenu?.snacks || "N/A"}</p>
                  </div>
                  <Separator orientation="horizontal" className="my-0.5" />
                  <div>
                    <p className="font-medium text-xs sm:text-sm">Dinner:</p>
                    <p className="text-muted-foreground text-xs sm:text-sm"><strong>Veg:</strong> {todaysMenu?.dinner?.veg || "N/A"}</p>
                    <p className="text-muted-foreground text-xs sm:text-sm"><strong>Non-Veg:</strong> {todaysMenu?.dinner?.nonVeg || "N/A"}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Mess menu for today is not available.</p>
              )}

              {selectedHostelWeeklyMenu && (
                <Dialog open={showFullMenuModal} onOpenChange={setShowFullMenuModal}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mt-4 w-full sm:w-auto">
                      <BookOpen className="mr-2 h-4 w-4" /> View Full Week Menu
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Full Weekly Mess Menu for {selectedHostelName}</DialogTitle>
                      <DialogDescription>
                        Timings: Breakfast: {messMenuTimings.Breakfast}, Lunch: {messMenuTimings.Lunch},
                        Snacks: {messMenuTimings.Snacks}, Dinner: {messMenuTimings.Dinner}.
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] pr-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Day</TableHead>
                            <TableHead>Breakfast</TableHead>
                            <TableHead>Lunch</TableHead>
                            <TableHead>Snacks</TableHead>
                            <TableHead>Dinner (Veg)</TableHead>
                            <TableHead>Dinner (Non-Veg)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dayOrder.map((day) => {
                            const meals = selectedHostelWeeklyMenu.days[day];
                            if (!meals) return null; 
                            return (
                              <TableRow key={day}>
                                <TableCell className="font-medium">{day}</TableCell>
                                <TableCell>{meals.breakfast || "N/A"}</TableCell>
                                <TableCell>{meals.lunch || "N/A"}</TableCell>
                                <TableCell>{meals.snacks || "N/A"}</TableCell>
                                <TableCell>{meals.dinner?.veg || "N/A"}</TableCell>
                                <TableCell>{meals.dinner?.nonVeg || "N/A"}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                      <Separator className="my-6" />
                      <Card>
                        <CardHeader>
                          <CardTitle>Grand Feast Menu (Last Sunday of the Month)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 text-sm">
                          <p><strong>Veg:</strong> {selectedHostelWeeklyMenu.grandFeast.veg || "N/A"}</p>
                          <p><strong>Non-Veg:</strong> {selectedHostelWeeklyMenu.grandFeast.nonVeg || "N/A"}</p>
                        </CardContent>
                      </Card>
                    </ScrollArea>
                    <DialogFooter className="mt-4">
                      <Button variant="outline" onClick={() => setShowFullMenuModal(false)}>Close</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
          <CardFooter>
             <p className="text-xs text-muted-foreground">
                  The menu is same for all hostels. If there are discrepancies or updates, please email help@infinits.space.
              </p>
          </CardFooter>
        </Card>
      ) : (
          <Alert>
            <BedDouble className="h-4 w-4" />
            <AlertTitle>Select a Hostel</AlertTitle>
            <AlertDescription>
              Please select a hostel from the dropdown above to view its details.
            </AlertDescription>
          </Alert>
      )}
      <Card className="mt-8 bg-secondary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center font-headline"><Info className="h-4 w-4 mr-2"/>Important Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This section provides details for the selected hostel.
            The quick view shows today's menu, and the "View Full Week Menu" button provides a detailed weekly schedule.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
