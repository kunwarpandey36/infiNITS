export function getCurrentDayName(date: Date): keyof WeeklyMenu['days'] {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()] as keyof WeeklyMenu['days'];
}
  
export function isLastSundayOfMonth(date: Date): boolean {
    if (date.getDay() !== 0) { // 0 is Sunday
        return false;
    }
    const nextSunday = new Date(date);
    nextSunday.setDate(date.getDate() + 7);
    return nextSunday.getMonth() !== date.getMonth();
}

interface WeeklyMenu {
    days: {
        [key: string]: any;
    };
}
