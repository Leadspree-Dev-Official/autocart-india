import swift from "@/assets/car-swift.jpg";
import creta from "@/assets/car-creta.jpg";
import city from "@/assets/car-city.jpg";
import nexon from "@/assets/car-nexon.jpg";
import scorpio from "@/assets/car-scorpio.jpg";
import seltos from "@/assets/car-seltos.jpg";
import oil from "@/assets/prod-engine-oil.jpg";
import wax from "@/assets/prod-wax.jpg";
import freshener from "@/assets/prod-freshener.jpg";
import battery from "@/assets/prod-battery.jpg";
import mats from "@/assets/prod-mats.jpg";
import cleaning from "@/assets/prod-cleaning.jpg";

export type Car = {
  id: string;
  name: string;
  brand: string;
  year: number;
  price: number;
  kmDriven: number;
  fuel: "Petrol" | "Diesel" | "CNG" | "Electric";
  transmission: "Manual" | "Automatic";
  owners: number;
  location: string;
  image: string;
  bodyType: string;
  color: string;
  registration: string;
  features: string[];
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  category: "Oils & Fluids" | "Cleaning" | "Accessories" | "Electricals";
  image: string;
  rating: number;
  description: string;
};

export const cars: Car[] = [
  {
    id: "swift-vxi-2021",
    name: "Swift VXi",
    brand: "Maruti Suzuki",
    year: 2021,
    price: 549000,
    kmDriven: 32000,
    fuel: "Petrol",
    transmission: "Manual",
    owners: 1,
    location: "Mumbai, MH",
    image: swift,
    bodyType: "Hatchback",
    color: "Pearl White",
    registration: "MH-01",
    features: ["Power Steering", "Power Windows", "Air Conditioner", "ABS", "Airbags"],
  },
  {
    id: "creta-sx-2020",
    name: "Creta SX",
    brand: "Hyundai",
    year: 2020,
    price: 1189000,
    kmDriven: 48000,
    fuel: "Diesel",
    transmission: "Automatic",
    owners: 1,
    location: "Delhi, DL",
    image: creta,
    bodyType: "SUV",
    color: "Marina Blue",
    registration: "DL-3C",
    features: ["Sunroof", "Leather Seats", "Cruise Control", "Rear Camera", "6 Airbags"],
  },
  {
    id: "city-vx-2019",
    name: "City VX CVT",
    brand: "Honda",
    year: 2019,
    price: 895000,
    kmDriven: 56000,
    fuel: "Petrol",
    transmission: "Automatic",
    owners: 2,
    location: "Pune, MH",
    image: city,
    bodyType: "Sedan",
    color: "Alabaster Silver",
    registration: "MH-12",
    features: ["Paddle Shifters", "Climate Control", "Push Start", "Alloys", "Airbags"],
  },
  {
    id: "nexon-xz-2022",
    name: "Nexon XZ+",
    brand: "Tata",
    year: 2022,
    price: 949000,
    kmDriven: 21000,
    fuel: "Petrol",
    transmission: "Manual",
    owners: 1,
    location: "Bengaluru, KA",
    image: nexon,
    bodyType: "Compact SUV",
    color: "Flame Red",
    registration: "KA-05",
    features: ["Touchscreen", "Rear Camera", "Sunroof", "5-star NCAP", "Alloys"],
  },
  {
    id: "scorpio-s11-2020",
    name: "Scorpio S11",
    brand: "Mahindra",
    year: 2020,
    price: 1345000,
    kmDriven: 62000,
    fuel: "Diesel",
    transmission: "Manual",
    owners: 1,
    location: "Jaipur, RJ",
    image: scorpio,
    bodyType: "SUV",
    color: "Napoli Black",
    registration: "RJ-14",
    features: ["7 Seater", "4WD", "Projector Headlamps", "Cruise Control", "Alloys"],
  },
  {
    id: "seltos-htk-2021",
    name: "Seltos HTK+",
    brand: "Kia",
    year: 2021,
    price: 1249000,
    kmDriven: 39000,
    fuel: "Petrol",
    transmission: "Automatic",
    owners: 1,
    location: "Hyderabad, TS",
    image: seltos,
    bodyType: "SUV",
    color: "Clear White",
    registration: "TS-09",
    features: ["Sunroof", "Wireless Charging", "Bose Sound", "Ventilated Seats", "6 Airbags"],
  },
];

export const products: Product[] = [
  {
    id: "engine-oil-5w30",
    name: "Fully Synthetic Engine Oil 5W-30 (3.5L)",
    brand: "Castrol EDGE",
    price: 2499,
    mrp: 2999,
    category: "Oils & Fluids",
    image: oil,
    rating: 4.7,
    description: "Advanced fully synthetic engine oil for maximum engine protection and performance.",
  },
  {
    id: "car-wax",
    name: "Carnauba Car Wax Polish Kit",
    brand: "3M",
    price: 649,
    mrp: 899,
    category: "Cleaning",
    image: wax,
    rating: 4.5,
    description: "Long lasting shine with premium carnauba wax and microfiber applicator.",
  },
  {
    id: "air-freshener",
    name: "Car Air Freshener Combo (Pine + Spray)",
    brand: "Ambi Pur",
    price: 349,
    mrp: 499,
    category: "Accessories",
    image: freshener,
    rating: 4.3,
    description: "Long lasting fragrance combo for a fresh driving experience.",
  },
  {
    id: "car-battery",
    name: "Maintenance-Free Car Battery 45Ah",
    brand: "Exide",
    price: 5299,
    mrp: 6499,
    category: "Electricals",
    image: battery,
    rating: 4.6,
    description: "48 month warranty, MF technology, fits most Indian hatchbacks and sedans.",
  },
  {
    id: "floor-mats",
    name: "Universal Rubber Floor Mats (Set of 4)",
    brand: "AutoFurnish",
    price: 899,
    mrp: 1499,
    category: "Accessories",
    image: mats,
    rating: 4.4,
    description: "Heavy duty rubber floor mats with anti-skid design. Fits most Indian cars.",
  },
  {
    id: "cleaning-kit",
    name: "Complete Car Cleaning Kit (7 Pcs)",
    brand: "Formula 1",
    price: 1299,
    mrp: 1799,
    category: "Cleaning",
    image: cleaning,
    rating: 4.6,
    description: "Shampoo, brushes, sponge and microfiber cloths for showroom finish at home.",
  },
];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
