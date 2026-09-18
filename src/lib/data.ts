export type TravelPackage = {
  slug: string;
  title: string;
  region: string;
  country: string;
  categories: string[];
  days: number;
  price: number;
  image: string;
  alt: string;
  label: string;
  summary: string;
  route: string;
  season: string;
  overnights: string[];
  highlights: string[];
  itinerary: { title: string; description: string }[];
};
export const photos = {
  mountain: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  kerala: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
  rajasthan: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
  beach: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
  thailand: "https://images.unsplash.com/photo-1528181304800-259b08848526",
};
export const packages: TravelPackage[] = [
  {
    slug: "kerala-backwaters",
    title: "The quieter side of Kerala",
    region: "Kerala",
    country: "India",
    categories: ["India", "Family", "Honeymoon"],
    days: 6,
    price: 24900,
    image: photos.kerala,
    alt: "Green hills and tea plantations in Kerala",
    label: "Slow travel",
    summary: "Tea-scented mornings, winding waterways, and time to simply be.",
    route: "Kochi · Munnar · Alleppey",
    overnights: ["Kochi", "Munnar", "Munnar", "Alleppey", "Alleppey", "Kochi"],
    season: "October – March",
    highlights: [
      "Two nights in the Munnar hills",
      "Private overnight houseboat",
      "Fort Kochi heritage walk",
      "Local flavours and coastal cuisine",
    ],
    itinerary: [
      {
        title: "Welcome to Kochi",
        description:
          "Arrive in Kochi and settle into your hotel. Explore the lanes of Fort Kochi at your own pace.",
      },
      {
        title: "Into the Munnar hills",
        description:
          "Drive through tea country with stops for waterfalls and scenic viewpoints.",
      },
      {
        title: "A day in tea country",
        description:
          "Visit a tea estate, enjoy a guided walk, and leave the afternoon free to explore.",
      },
      {
        title: "Life on the backwaters",
        description:
          "Travel to Alleppey and board your private houseboat. Enjoy a relaxed afternoon on the water.",
      },
      {
        title: "A little coastal calm",
        description:
          "Disembark after breakfast. Spend the day by the coast with an optional local cooking session.",
      },
      {
        title: "Until next time",
        description:
          "Enjoy breakfast before your transfer to Kochi for the onward journey.",
      },
    ],
  },
  {
    slug: "rajasthan-royal-trail",
    title: "Rajasthan, royally yours",
    region: "Rajasthan",
    country: "India",
    categories: ["India", "Family"],
    days: 7,
    price: 32900,
    image: photos.rajasthan,
    alt: "Warm pink architecture of Jaipur in Rajasthan",
    label: "Culture & heritage",
    summary: "Pink cities, palace courtyards, and stories that stay with you.",
    route: "Jaipur · Jodhpur · Udaipur",
    overnights: [
      "Jaipur",
      "Jaipur",
      "Jodhpur",
      "Jodhpur",
      "Udaipur",
      "Udaipur",
      "Udaipur",
    ],
    season: "October – March",
    highlights: [
      "Amber Fort with a local guide",
      "Blue city walking tour",
      "Sunset on Lake Pichola",
      "Traditional crafts and markets",
    ],
    itinerary: [
      {
        title: "Arrive in Jaipur",
        description:
          "Settle in and take an evening stroll through the Pink City.",
      },
      {
        title: "Forts and craft",
        description: "Explore Amber Fort and meet local artisans in Jaipur.",
      },
      {
        title: "Road to Jodhpur",
        description: "Travel to the Blue City and enjoy a relaxed evening.",
      },
      {
        title: "Discover the Blue City",
        description: "Visit Mehrangarh Fort and wander the old market lanes.",
      },
      {
        title: "Towards Udaipur",
        description: "Drive to Udaipur, with a stop at Ranakpur along the way.",
      },
      {
        title: "Palaces and lakes",
        description:
          "Explore City Palace and take an optional sunset boat ride.",
      },
      {
        title: "Journey home",
        description: "Enjoy breakfast before your departure transfer.",
      },
    ],
  },
  {
    slug: "himalayan-valleys",
    title: "Himalayan trails & valleys",
    region: "Himachal Pradesh",
    country: "India",
    categories: ["India", "Adventure"],
    days: 8,
    price: 38900,
    image: photos.mountain,
    alt: "Dramatic mountain peaks beneath a cloudy sky",
    label: "Adventure",
    summary: "Wide-open skies, mountain villages, and a fresh perspective.",
    route: "Manali · Kaza · Chandratal",
    overnights: [
      "Manali",
      "Manali",
      "Kaza",
      "Kaza",
      "Kaza",
      "Chandratal",
      "Manali",
      "Manali",
    ],
    season: "June – September",
    highlights: [
      "Manali to Spiti Valley",
      "Chandratal Lake camping",
      "Village homestays",
      "Local mountain guides",
    ],
    itinerary: [
      {
        title: "Arrive in Manali",
        description: "Meet your guide and settle into a mountain lodge.",
      },
      {
        title: "Explore and acclimatise",
        description: "Take a gentle walk and prepare for higher elevations.",
      },
      {
        title: "Journey to Kaza",
        description: "Drive through mountain landscapes with regular breaks.",
      },
      {
        title: "Villages of Spiti",
        description: "Visit nearby villages and learn about local life.",
      },
      {
        title: "Monasteries and mountains",
        description: "Spend a day exploring monasteries with your guide.",
      },
      {
        title: "Chandratal camp",
        description:
          "Travel to Chandratal for a night at a designated camp, subject to local conditions.",
      },
      {
        title: "Return to Manali",
        description: "Drive back through the valley and relax at your lodge.",
      },
      {
        title: "Departure",
        description:
          "Transfer for your onward journey. The route may change with road and weather conditions.",
      },
    ],
  },
  {
    slug: "bali-island-escape",
    title: "Bali, beyond the beaches",
    region: "Bali",
    country: "Indonesia",
    categories: ["International", "Honeymoon", "Beach"],
    days: 6,
    price: 52900,
    image: photos.bali,
    alt: "Lush landscape and Balinese architecture",
    label: "Island escape",
    summary: "A little temple magic, a little ocean air, a lot of discovery.",
    route: "Ubud · Uluwatu · Seminyak",
    overnights: ["Ubud", "Ubud", "Ubud", "Seminyak", "Seminyak", "Seminyak"],
    season: "April – October",
    highlights: [
      "Ubud rice terrace walk",
      "Balinese temple visit",
      "Uluwatu sunset",
      "Two nights by the beach",
    ],
    itinerary: [
      {
        title: "Welcome to Bali",
        description: "Meet your driver and travel to Ubud.",
      },
      {
        title: "Discover Ubud",
        description: "Explore rice terraces and artisan villages.",
      },
      {
        title: "Temples and local life",
        description: "Join a cultural tour with time for your own discoveries.",
      },
      {
        title: "To the coast",
        description: "Travel to the coast and visit Uluwatu at sunset.",
      },
      {
        title: "Your island day",
        description:
          "Enjoy a free day by the beach or choose an optional activity.",
      },
      {
        title: "Farewell Bali",
        description: "Transfer to the airport after breakfast.",
      },
    ],
  },
  {
    slug: "goa-coastal-days",
    title: "Unhurried days in Goa",
    region: "Goa",
    country: "India",
    categories: ["India", "Family", "Beach"],
    days: 4,
    price: 16900,
    image: photos.beach,
    alt: "Palm-lined coast in Goa",
    label: "Beach break",
    summary: "Salt in the air, colourful lanes, and nowhere to rush.",
    route: "Panaji · Old Goa · South Goa",
    overnights: ["South Goa", "Panaji", "South Goa", "South Goa"],
    season: "November – February",
    highlights: [
      "Fontainhas heritage stroll",
      "South Goa beaches",
      "Goan flavours",
      "A full day at your own pace",
    ],
    itinerary: [
      {
        title: "Hello, Goa",
        description: "Arrive and settle into your beachside stay.",
      },
      {
        title: "Colour and culture",
        description: "Explore Fontainhas and the heritage of Old Goa.",
      },
      {
        title: "A day for yourself",
        description: "Relax by the coast or explore nearby villages.",
      },
      {
        title: "Departure",
        description: "Breakfast and transfer for your return journey.",
      },
    ],
  },
  {
    slug: "thailand-island-trail",
    title: "Thailand’s island trail",
    region: "Thailand",
    country: "Thailand",
    categories: ["International", "Adventure", "Beach"],
    days: 5,
    price: 45900,
    image: photos.thailand,
    alt: "Tropical limestone cliffs and turquoise water in Thailand",
    label: "Tropical discovery",
    summary: "Limestone cliffs, turquoise water, and golden-hour swims.",
    route: "Phuket · Phang Nga · Krabi",
    overnights: ["Phuket", "Phuket", "Krabi", "Krabi", "Krabi"],
    season: "November – April",
    highlights: [
      "Phang Nga Bay excursion",
      "Old Phuket town",
      "Krabi coastal stay",
      "Free time for island adventures",
    ],
    itinerary: [
      {
        title: "Arrive in Phuket",
        description: "Transfer to your hotel and enjoy a relaxed evening.",
      },
      {
        title: "Phang Nga Bay",
        description:
          "Explore the bay on a guided boat excursion, subject to weather.",
      },
      {
        title: "Travel to Krabi",
        description: "Visit Old Phuket town before your transfer to Krabi.",
      },
      {
        title: "Coastal discoveries",
        description: "Choose a beach day or an optional island excursion.",
      },
      {
        title: "Homeward bound",
        description: "Transfer to the airport after breakfast.",
      },
    ],
  },
];
export const categories = [
  "All packages",
  "India",
  "International",
  "Family",
  "Adventure",
  "Honeymoon",
  "Beach",
];
export const destinations = packages.map((p) => ({
  name: p.region,
  image: p.image,
  alt: p.alt,
  description: p.summary,
  slug: p.slug,
  country: p.country,
}));
