
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Utensils } from 'lucide-react';
import type { Meal, MealDinner, WeeklyMenu } from "@/lib/mess-menu-data"; 
import { messMenuTimings, getMenuForHostel } from "@/lib/mess-menu-data"; 
import { getCurrentDayName, isLastSundayOfMonth } from "@/lib/date-utils";

// Assuming a default hostel for the profile page view, can be made dynamic later
const DEFAULT_HOSTEL = "Boys Hostel - 1";

export default function TodaysMenu() {
  const [todaysMenu, setTodaysMenu] = useState<Meal | null>(null);
  const [isGrandFeastDay, setIsGrandFeastDay] = useState(false);
  const [grandFeastDetails, setGrandFeastDetails] = useState<MealDinner | null>(null);

  useEffect(() => {
    const currentHostelMenuData = getMenuForHostel(DEFAULT_HOSTEL);
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
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Utensils className="text-primary" /> Today's Mess Menu
        </CardTitle>
        <CardDescription>
          Menu for {DEFAULT_HOSTEL}. Timings are indicative.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isGrandFeastDay && grandFeastDetails ? (
            <div className="space-y-2">
                <p className="font-bold text-lg text-center text-destructive">🎉 Grand Feast Day! 🎉</p>
                <div>
                    <p className="font-semibold text-primary">Veg Menu:</p>
                    <p className="text-muted-foreground">{grandFeastDetails?.veg || "N/A"}</p>
                </div>
                <Separator/>
                <div>
                    <p className="font-semibold text-primary">Non-Veg Menu:</p>
                    <p className="text-muted-foreground">{grandFeastDetails?.nonVeg || "N/A"}</p>
                </div>
            </div>
        ) : todaysMenu ? (
          <div className="space-y-2 text-sm">
            <div>
              <p className="font-semibold">Breakfast ({messMenuTimings.Breakfast}):</p>
              <p className="text-muted-foreground">{todaysMenu?.breakfast || "N/A"}</p>
            </div>
            <Separator />
            <div>
              <p className="font-semibold">Lunch ({messMenuTimings.Lunch}):</p>
              <p className="text-muted-foreground">{todaysMenu?.lunch || "N/A"}</p>
            </div>
            <Separator />
            <div>
              <p className="font-semibold">Snacks ({messMenuTimings.Snacks}):</p>
              <p className="text-muted-foreground">{todaysMenu?.snacks || "N/A"}</p>
            </div>
            <Separator />
            <div>
              <p className="font-semibold">Dinner ({messMenuTimings.Dinner}):</p>
              <p className="text-muted-foreground"><strong>Veg:</strong> {todaysMenu?.dinner?.veg || "N/A"}</p>
              <p className="text-muted-foreground"><strong>Non-Veg:</strong> {todaysMenu?.dinner?.nonVeg || "N/A"}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p>Mess menu for today is not available.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

