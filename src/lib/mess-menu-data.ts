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
        Monday: {
            breakfast: "Bread/Butter/Fruit/Jam or Idli Sambar with Chetney, Tea, Milk or Boiled Egg, Banana, Sprouts",
            lunch: "Rice, Dal, Roti, Seasonal Sabji Fry, Rajma Curry (gravy), Papad, Lemon",
            snacks: "Onion Pakoda, Tea",
            dinner: {
                veg: "Butter Paneer Curry, Rice, Dal, Roti, Mixed Veg curry, Sewai",
                nonVeg: "Butter Chicken Curry, Rice, Dal, Roti, Mixed Veg curry, Sewai"
            }
        },
        Tuesday: {
            breakfast: "Bread/Butter/Fruit/Jam or Aloo Paratha with Pickle, Coffee, Milk or Omelet, Banana, Sprouts",
            lunch: "Rice, Roti, Sambar, Masala Channa Fry, Kadhi Pakoda, Fryums, Lemon",
            snacks: "Veg Sandwich, Tea",
            dinner: {
                veg: "Mushroom Masala/Baby Corn Masala, Rice, Dal, Roti, Mixed Veg Curry, Banana Shake",
                nonVeg: "Egg Curry, Rice, Dal, Roti, Mixed Veg Curry, Banana Shake"
            }
        },
        Wednesday: {
            breakfast: "Bread/Butter/Fruit/Jam or Masala Dosa with Sambar/Chetney, Tea, Milk or Boiled Egg, Banana, Sprouts",
            lunch: "Rice, Dal, Roti, Seasonal Sabji Fry, Gobi Manchurian, Papad, Salad",
            snacks: "Samosa, Tea",
            dinner: {
                veg: "Chilli Paneer Curry, Rice, Dal, Roti, Mixed Veg curry, Fruit Salad",
                nonVeg: "Garlic Chicken Curry, Rice, Dal, Roti, Mixed Veg curry, Fruit Salad"
            }
        },
        Thursday: {
            breakfast: "Bread/Butter/Fruit/Jam or Chola Bhatura, Coffee, Milk, Banana, Sprouts",
            lunch: "Rice, Dal, Roti, Mixed Dal, Potato French Fry, Mixed Veg curry, Dahi, Papad",
            snacks: "Bread Pakoda, Tea",
            dinner: {
                veg: "Shahi Paneer, Rice, Dal, Roti, Mixed Veg curr, Rice Kheer",
                nonVeg: "(No Non-Veg Option), Rice, Dal, Roti, Mixed Veg curr, Rice Kheer"
            }
        },
        Friday: {
            breakfast: "Bread/Butter/Fruit/Jam or Puri with Aloo matar, Tea, Milk or boiled Egg, Banana, Sprouts",
            lunch: "Rice, Dal Frt, Roti, Gobi Fry/Brinjal Fry, Veg kopta curry, Papad, Lemon",
            snacks: "Aloo Chop, Tea",
            dinner: {
                veg: "Paneer Biryani, Dal, Roti, Raita, Separate Gravy, Sweet (Gulabjamun/Rasgulla)",
                nonVeg: "Chicken Biryani, Dal, Roti, Raita, Separate Gravy, Sweet (Gulabjamun/Rasgulla)"
            }
        },
        Saturday: {
            breakfast: "Bread/Butter/Fruit with Jam or Uttapam with Sambar/Chetney, Tea, Milk or omelet, Banana, Sprouts",
            lunch: "Dal, Roti, Khichdi, Seasonal Sabji Fry, Sweet Chutney, Dahi, Papad, Lemon",
            snacks: "Chat, Tea",
            dinner: {
                veg: "Mutter Paneer, Rice, Dal, Roti, Mixed Veg Curry, Fruit Juice",
                nonVeg: "Fish Masala, Rice, Dal, Roti, Mixed Veg Curry, Fruit Juice"
            }
        },
        Sunday: {
            breakfast: "Bread/Butter/Fruit/Jam or Sattu Paratha, Tea, Milk or boiled Egg, Banana, Sprouts",
            lunch: "Rice, Roti, Sambar, Pumpkin Fry, Mixed veg curry, Fryums, Salad",
            snacks: "Veg Roll, Tea",
            dinner: {
                veg: "Kadai Paneer, Paneer fry, Pulao, Methi Puri, Dhal Makhni, Lassi",
                nonVeg: "Kadai Chicken Curry, Chicken fry, Pulao, Methi Puri, Dhal Makhni, Lassi"
            }
        },
    },
    // Grand feast is not specified in the new menu, keeping the old one as a placeholder.
    grandFeast: {
        veg: "Paneer Tikka, Veg Biryani, Dal Makhani, Naan/Roti, Gulab Jamun, Ice Cream",
        nonVeg: "Chicken Tandoori, Chicken Biryani, Dal Makhani, Naan/Roti, Gulab Jamun, Ice Cream"
    }
};

// Since the new menu is for all hostels, we only need the default menu.
export const hostelSpecificMenus: Record<string, WeeklyMenu> = {
    "Default": defaultMenu,
};

export function getMenuForHostel(hostelName: string): WeeklyMenu {
    // This function will always return the default menu as per the new unified menu structure.
    return hostelSpecificMenus["Default"];
}
