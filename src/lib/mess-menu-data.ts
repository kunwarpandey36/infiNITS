export interface MealDinner {
    veg: string;
    nonVeg: string;
}

export interface Meal {
    breakfast: string;
    lunch: string;
    snacks: string;
    dinner: MealDinner;
}

export interface WeeklyMenu {
    days: {
        Sunday?: Meal;
        Monday?: Meal;
        Tuesday?: Meal;
        Wednesday?: Meal;
        Thursday?: Meal;
        Friday?: Meal;
        Saturday?: Meal;
    };
    grandFeast: MealDinner;
}

export const messMenuTimings = {
    Breakfast: "7:30 AM - 9:30 AM",
    Lunch: "12:00 PM - 2:00 PM",
    Snacks: "4:30 PM - 5:30 PM",
    Dinner: "7:30 PM - 9:30 PM"
};

const defaultMenu: WeeklyMenu = {
    days: {
        Sunday: {
            breakfast: "Puri, Chana Masala, Boiled Egg/Banana, Tea",
            lunch: "Rice, Dal, Seasonal Veg Sabji, Aloo Bharta, Salad, Papad",
            snacks: "Aloo Chop/Samosa, Tea",
            dinner: { veg: "Rice/Roti, Dal, Paneer Curry, Salad", nonVeg: "Rice/Roti, Dal, Chicken Curry, Salad" }
        },
        Monday: {
            breakfast: "Aloo Paratha, Curd, Pickle, Tea",
            lunch: "Rice, Dal, Seasonal Veg Sabji, Aloo Bharta, Salad, Papad",
            snacks: "Maggi/Pasta, Tea",
            dinner: { veg: "Rice/Roti, Dal, Mixed Veg, Salad", nonVeg: "Rice/Roti, Dal, Egg Curry, Salad" }
        },
        Tuesday: {
            breakfast: "Poha, Jalebi, Tea",
            lunch: "Rice, Dal, Seasonal Veg Sabji, Aloo Bharta, Salad, Papad",
            snacks: "Bread Pakora, Tea",
            dinner: { veg: "Rice/Roti, Dal, Soyabean Curry, Salad", nonVeg: "Rice/Roti, Dal, Fish Curry, Salad" }
        },
        Wednesday: {
            breakfast: "Bread, Butter/Jam, Boiled Egg/Banana, Tea",
            lunch: "Rice, Dal, Seasonal Veg Sabji, Aloo Bharta, Salad, Papad",
            snacks: "Puri Sabji, Tea",
            dinner: { veg: "Rice/Roti, Dal, Paneer Butter Masala, Salad", nonVeg: "Rice/Roti, Dal, Chicken Curry, Salad" }
        },
        Thursday: {
            breakfast: "Idli/Dosa, Sambhar, Chutney, Tea",
            lunch: "Rice, Dal, Seasonal Veg Sabji, Aloo Bharta, Salad, Papad",
            snacks: "Bhel Puri, Tea",
            dinner: { veg: "Rice/Roti, Dal, Chana Masala, Salad", nonVeg: "Rice/Roti, Dal, Egg Curry, Salad" }
        },
        Friday: {
            breakfast: "Chowmein, Tea",
            lunch: "Rice, Dal, Seasonal Veg Sabji, Aloo Bharta, Salad, Papad",
            snacks: "Kachori, Tea",
            dinner: { veg: "Rice/Roti, Dal, Veg Korma, Salad", nonVeg: "Rice/Roti, Dal, Fish Fry, Salad" }
        },
        Saturday: {
            breakfast: "Puri, Aloo Sabji, Tea",
            lunch: "Khichdi, Chokha, Papad, Pickle",
            snacks: "Pakora, Tea",
            dinner: { veg: "Rice/Roti, Dal, Kadai Paneer, Salad", nonVeg: "Rice/Roti, Dal, Chicken Curry, Salad" }
        },
    },
    grandFeast: {
        veg: "Paneer Tikka, Veg Biryani, Dal Makhani, Naan/Roti, Gulab Jamun, Ice Cream",
        nonVeg: "Chicken Tandoori, Chicken Biryani, Dal Makhani, Naan/Roti, Gulab Jamun, Ice Cream"
    }
};

// You can define specific menus for hostels here. If a hostel is not listed, it will use the default menu.
export const hostelSpecificMenus: Record<string, WeeklyMenu> = {
    "Default": defaultMenu,
    // Example of a specific menu for a hostel
    "Gargi Hostel": {
        ...defaultMenu,
        days: {
            ...defaultMenu.days,
            Sunday: {
                ...defaultMenu.days.Sunday!,
                dinner: { veg: "Rice/Roti, Dal, Malai Kofta, Salad", nonVeg: "Rice/Roti, Dal, Mutton Curry, Salad" }
            }
        }
    }
};

export function getMenuForHostel(hostelName: string): WeeklyMenu {
    return hostelSpecificMenus[hostelName] || hostelSpecificMenus["Default"];
}
