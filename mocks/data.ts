export interface Category {
  id: string;
  emoji: string;
  label: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  tags: string[];
  image: string;
  rating: number;
  distance: string;
  creditCost: number;
  featured: boolean;
  description: string;
  address: string;
  hours: string;
  latitude: number;
  longitude: number;
}

export interface MealPlan {
  id: string;
  name: string;
  credits: number;
  price: number;
  perCredit: number;
  popular?: boolean;
  description: string;
}

export interface Transaction {
  id: string;
  restaurantName: string;
  credits: number;
  date: string;
  type: "purchase" | "topup";
}

export const CATEGORIES: Category[] = [
  { id: "all", emoji: "🍽️", label: "All" },
  { id: "burger", emoji: "🍔", label: "Burgers" },
  { id: "pizza", emoji: "🍕", label: "Pizza" },
  { id: "sushi", emoji: "🍣", label: "Sushi" },
  { id: "mexican", emoji: "🌮", label: "Mexican" },
  { id: "asian", emoji: "🍜", label: "Asian" },
  { id: "healthy", emoji: "🥗", label: "Healthy" },
  { id: "coffee", emoji: "☕", label: "Coffee" },
  { id: "dessert", emoji: "🍰", label: "Desserts" },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "Satchel's Pizza",
    cuisine: "Pizza",
    tags: ["pizza", "italian", "casual"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    rating: 4.8,
    distance: "0.8 mi",
    creditCost: 8,
    featured: true,
    description: "Legendary Gainesville pizza joint known for eclectic decor and wood-fired pies.",
    address: "1800 NE 23rd Ave, Gainesville, FL",
    hours: "11 AM – 10 PM",
    latitude: 29.6682,
    longitude: -82.3018,
  },
  {
    id: "2",
    name: "Reggae Shack Café",
    cuisine: "Caribbean",
    tags: ["caribbean", "healthy", "vegetarian"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    rating: 4.6,
    distance: "0.3 mi",
    creditCost: 6,
    featured: true,
    description: "Vibrant Caribbean flavors with fresh, healthy ingredients near campus.",
    address: "12 SW 1st Ave, Gainesville, FL",
    hours: "11 AM – 9 PM",
    latitude: 29.6516,
    longitude: -82.3248,
  },
  {
    id: "3",
    name: "Bento Asian Kitchen",
    cuisine: "Asian",
    tags: ["asian", "sushi", "japanese"],
    image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=600&q=80",
    rating: 4.5,
    distance: "0.5 mi",
    creditCost: 7,
    featured: true,
    description: "Fresh sushi, bowls, and Asian-inspired dishes made to order.",
    address: "3832 W Newberry Rd, Gainesville, FL",
    hours: "11 AM – 10 PM",
    latitude: 29.6523,
    longitude: -82.3801,
  },
  {
    id: "4",
    name: "Relish Burger Bar",
    cuisine: "Burgers",
    tags: ["burger", "american", "casual"],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    rating: 4.4,
    distance: "0.6 mi",
    creditCost: 7,
    featured: false,
    description: "Craft burgers with creative toppings and hand-cut fries.",
    address: "1632 W University Ave, Gainesville, FL",
    hours: "11 AM – 11 PM",
    latitude: 29.6520,
    longitude: -82.3337,
  },
  {
    id: "5",
    name: "Taco Libre",
    cuisine: "Mexican",
    tags: ["mexican", "tacos", "casual"],
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
    rating: 4.3,
    distance: "0.4 mi",
    creditCost: 5,
    featured: false,
    description: "Authentic street tacos and burritos at student-friendly prices.",
    address: "1620 W University Ave, Gainesville, FL",
    hours: "10 AM – 12 AM",
    latitude: 29.6519,
    longitude: -82.3330,
  },
  {
    id: "6",
    name: "Crane Ramen",
    cuisine: "Asian",
    tags: ["asian", "ramen", "japanese"],
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
    rating: 4.7,
    distance: "1.0 mi",
    creditCost: 9,
    featured: true,
    description: "Rich tonkotsu broth and handmade noodles in a cozy setting.",
    address: "16 SW 1st Ave, Gainesville, FL",
    hours: "11:30 AM – 10 PM",
    latitude: 29.6515,
    longitude: -82.3250,
  },
  {
    id: "7",
    name: "Daily Green",
    cuisine: "Healthy",
    tags: ["healthy", "salad", "smoothie"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    rating: 4.5,
    distance: "0.2 mi",
    creditCost: 6,
    featured: false,
    description: "Fresh salads, acai bowls, and cold-pressed juices for the health-conscious Gator.",
    address: "1702 W University Ave, Gainesville, FL",
    hours: "8 AM – 8 PM",
    latitude: 29.6521,
    longitude: -82.3350,
  },
  {
    id: "8",
    name: "Opus Coffee",
    cuisine: "Coffee",
    tags: ["coffee", "dessert", "cafe"],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    rating: 4.6,
    distance: "0.1 mi",
    creditCost: 4,
    featured: false,
    description: "Locally roasted specialty coffee and pastries loved by UF students.",
    address: "2410 SW 13th St, Gainesville, FL",
    hours: "7 AM – 7 PM",
    latitude: 29.6440,
    longitude: -82.3310,
  },
  {
    id: "9",
    name: "BurgerFi",
    cuisine: "Burgers",
    tags: ["burger", "american", "fast casual"],
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80",
    rating: 4.2,
    distance: "0.7 mi",
    creditCost: 8,
    featured: false,
    description: "Premium all-natural Angus beef burgers with bold flavors.",
    address: "3524 SW Archer Rd, Gainesville, FL",
    hours: "11 AM – 10 PM",
    latitude: 29.6391,
    longitude: -82.3500,
  },
  {
    id: "10",
    name: "Sweetberries",
    cuisine: "Desserts",
    tags: ["dessert", "frozen yogurt", "treats"],
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
    rating: 4.7,
    distance: "0.5 mi",
    creditCost: 4,
    featured: false,
    description: "Frozen yogurt, smoothies, and sweet treats — the perfect campus pick-me-up.",
    address: "505 NW 13th St, Gainesville, FL",
    hours: "12 PM – 10 PM",
    latitude: 29.6570,
    longitude: -82.3300,
  },
];

export const MEAL_PLANS: MealPlan[] = [
  {
    id: "starter",
    name: "Starter",
    credits: 30,
    price: 25,
    perCredit: 0.83,
    description: "Perfect for light eaters or trying Crave out.",
  },
  {
    id: "regular",
    name: "Regular",
    credits: 60,
    price: 45,
    perCredit: 0.75,
    popular: true,
    description: "Great balance of value and flexibility.",
  },
  {
    id: "unlimited",
    name: "Unlimited",
    credits: 120,
    price: 80,
    perCredit: 0.67,
    description: "Best value — eat off campus every day.",
  },
];

export const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    restaurantName: "Satchel's Pizza",
    credits: 8,
    date: "2026-04-16",
    type: "purchase",
  },
  {
    id: "t2",
    restaurantName: "Reggae Shack Café",
    credits: 6,
    date: "2026-04-15",
    type: "purchase",
  },
  {
    id: "t3",
    restaurantName: "Regular Plan Top-up",
    credits: 60,
    date: "2026-04-14",
    type: "topup",
  },
  {
    id: "t4",
    restaurantName: "Crane Ramen",
    credits: 9,
    date: "2026-04-12",
    type: "purchase",
  },
  {
    id: "t5",
    restaurantName: "Opus Coffee",
    credits: 4,
    date: "2026-04-11",
    type: "purchase",
  },
];
