import React, { useState, useEffect, useRef } from "react";
import { 
  Lock, 
  Unlock, 
  MapPin, 
  Clock, 
  Compass, 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle2, 
  Coffee, 
  Info, 
  ChevronRight,
  HelpCircle,
  Map,
  Sparkles,
  MessageSquare,
  Send,
  User,
  ExternalLink,
  Plus,
  Gift,
  Coins,
  DollarSign,
  Ticket,
  Shield,
  Phone,
  Bell,
  Volume2,
  Trash2,
  ShieldCheck,
  Check,
  Search,
  X,
  Leaf,
  Award,
  CloudSun,
  Accessibility
} from "lucide-react";
import { HeritageSite, AppStateStage } from "./types";
import InteractiveMap from "./components/InteractiveMap";
import { 
  AUGMENTED_SITE_DATA, 
  GREEN_MYSORE_ROUTES 
} from "./data/augmentedMetadata";
import GreenMysoreRoutes from "./components/GreenMysoreRoutes";
import MysoreExplorerBadge from "./components/MysoreExplorerBadge";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

// Custom Light background themes options
export interface BgTheme {
  id: string;
  name: string;
  bgClass: string;
  accentBorder: string;
  bgHexPrimary: string;
  bgHexSecondary: string;
  badgeBg: string;
  badgeText: string;
  themeTitle: string;
}

export const BG_THEMES: BgTheme[] = [
  { id: "ivory", name: "Royal Ivory", bgClass: "bg-[#FAF9F6]", accentBorder: "border-[#B8931F]/30", bgHexPrimary: "#FAF9F6", bgHexSecondary: "#F4EFE6", badgeBg: "bg-[#B8931F]/10", badgeText: "text-[#B8931F]", themeTitle: "The Royal Court Theme" },
  { id: "mint", name: "Chamundi Mint", bgClass: "bg-[#F2F8F5]", accentBorder: "border-emerald-600/15", bgHexPrimary: "#F2F8F5", bgHexSecondary: "#E5F2EC", badgeBg: "bg-emerald-500/10", badgeText: "text-emerald-700", themeTitle: "The Forest Trails Theme" },
  { id: "sakura", name: "Palace Rose", bgClass: "bg-[#FAF3F3]", accentBorder: "border-rose-600/15", bgHexPrimary: "#FAF3F3", bgHexSecondary: "#F5E2E2", badgeBg: "bg-rose-500/10", badgeText: "text-rose-700", themeTitle: "The Dussehra Rose Theme" },
  { id: "sky", name: "Kaveri Blue", bgClass: "bg-[#F3F7FA]", accentBorder: "border-sky-600/15", bgHexPrimary: "#F3F7FA", bgHexSecondary: "#E2EEF5", badgeBg: "bg-sky-500/10", badgeText: "text-sky-750", themeTitle: "The River Kaveri Theme" },
  { id: "sandalwood", name: "Sandalwood Gold", bgClass: "bg-[#FAF7EE]", accentBorder: "border-amber-600/15", bgHexPrimary: "#FAF7EE", bgHexSecondary: "#F5EED8", badgeBg: "bg-amber-600/15", badgeText: "text-amber-800", themeTitle: "The Sandalwood Essence Theme" },
  { id: "lavender", name: "Silken Lavender", bgClass: "bg-[#FAF5FC]", accentBorder: "border-purple-600/15", bgHexPrimary: "#FAF5FC", bgHexSecondary: "#EAE0F2", badgeBg: "bg-purple-500/10", badgeText: "text-purple-750", themeTitle: "The Royal Silk Theme" },
];

export interface SpinRewardOption {
  text: string;
  type: "cashback" | "freebie" | "bonus";
  color: string;
  badgeBg: string;
  badgeTextColor: string;
}

export const SPIN_REWARDS: SpinRewardOption[] = [
  { text: "₹50 Instant Cashback", type: "cashback", color: "#FEE2E2", badgeBg: "bg-red-100", badgeTextColor: "text-red-800" }, // Sector 0
  { text: "Free Mysore Pak", type: "freebie", color: "#FEF3C7", badgeBg: "bg-amber-100", badgeTextColor: "text-amber-800" },     // Sector 1
  { text: "15% Extra Cashback", type: "cashback", color: "#D1FAE5", badgeBg: "bg-emerald-100", badgeTextColor: "text-emerald-800" }, // Sector 2
  { text: "Free Samosa Combo", type: "freebie", color: "#E0F2FE", badgeBg: "bg-sky-100", badgeTextColor: "text-sky-800" },      // Sector 3
  { text: "₹30 Fuel Cashback", type: "cashback", color: "#F3E8FF", badgeBg: "bg-purple-100", badgeTextColor: "text-purple-800" },   // Sector 4
  { text: "Royal Souvenir Toy", type: "bonus", color: "#FFF3E0", badgeBg: "bg-orange-100", badgeTextColor: "text-orange-850" }    // Sector 5
];

// Curated list of heritage sites in Mysuru
const HERITAGE_SITES: HeritageSite[] = [
  {
    id: "amba_vilas",
    name: "Amba Vilas Palace (Mysore Palace)",
    description: "The official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore, famous for its grand Indo-Saracenic columns and rich gold ceilings.",
    latitude: 12.3051,
    longitude: 76.6551,
    imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Café Aramane",
      offer: "1 Free Traditional Mysuru Filter Coffee",
      distance: "80m from the Eastern Gate Entrance"
    },
    voucherCode: "KADA-ARAMANE-COFFEE-MYS"
  },
  {
    id: "jaganmohan",
    name: "Jaganmohan Palace Art Gallery",
    description: "Built in 1861, housing one of the largest collections of traditional South Indian artwork, rare musical instruments, and paintings.",
    latitude: 12.3064,
    longitude: 76.6493,
    imageUrl: "https://images.unsplash.com/photo-1598977123418-45f04b611933?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Hotel Mylari (Subbarayan Road)",
      offer: "1 Free Authentic Butter Mylari Dosa",
      distance: "120m from the Palace Exit"
    },
    voucherCode: "MYLA-DOSA-REWARD-2026"
  },
  {
    id: "lalitha_mahal",
    name: "Lalitha Mahal Palace",
    description: "The second-largest palace in Mysuru, styled after St. Paul's Cathedral in London with sweeping white pillars and Italian marble stairs.",
    latitude: 12.2982,
    longitude: 76.6934,
    imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "The Royal Tea Pavilion",
      offer: "1 Complimentary High Tea & Mysore Pak",
      distance: "Ground floor south terrace"
    },
    voucherCode: "ROYAL-TEA-MYSOREPAK-LM"
  },
  {
    id: "chamundi_nandi",
    name: "Chamundi Hill Bull (Nandi)",
    description: "A mammoth 16-foot high monolithic Nandi statue carved out of a single continuous piece of basalt black granite in 1659.",
    latitude: 12.2747,
    longitude: 76.6775,
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Hilltop Coconut Refreshments",
      offer: "1 Free Chilled Tender Coconut + Holy Prasadam",
      distance: "Adjacent to Nandi Statue"
    },
    voucherCode: "NANDI-COCONUT-CH-2026"
  },
  {
    id: "st_philomena",
    name: "St. Philomena's Cathedral",
    description: "One of the tallest cathedrals in Asia, designed in the Neo-Gothic style resembling Germany's famous Cologne Cathedral.",
    latitude: 12.3211,
    longitude: 76.6587,
    imageUrl: "https://images.unsplash.com/photo-1548625361-155deee2627e?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "St. Joseph's Heritage Bakery",
      offer: "1 Complimentary Warm Plum Cake Slice",
      distance: "50m opposite the West Gate spire"
    },
    voucherCode: "STPH-PLUMCAKE-BAKERY"
  },
  {
    id: "vvce",
    name: "Vidyavardhaka College of Engineering (VVCE)",
    description: "A premier engineering landmark in Mysuru established in 1997, renowned for solid academic excellence, tech innovation, and startup culture.",
    latitude: 12.3276,
    longitude: 76.6135,
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "VVCE Namma Cafe Cafeteria",
      offer: "1 Free Traditional Karnataka Filter Coffee & Samosa Combo",
      distance: "Internal campus canteen under the block canopy"
    },
    voucherCode: "VVCE-STUDENT-HERITAGE-2026"
  },
  {
    id: "karanji_lake",
    name: "Karanji Lake & Butterfly Park",
    description: "A gorgeous, serene nature preserve inside the city boasting India's largest walkthrough aviary structure, home to majestic Painted Storks and Pelicans.",
    latitude: 12.3018,
    longitude: 76.6738,
    imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Karanji Lake Boating Café",
      offer: "1 Complimentary Lakeside Mango Slasher Juice",
      distance: "30m from the Boating ticket counter"
    },
    voucherCode: "KARA-BOATING-MANGO-JUICE"
  },
  {
    id: "mysore_zoo",
    name: "Mysore Zoo (Chamarajendra Zoological Gardens)",
    description: "Established in 1892 by Maharaja Chamarajendra Wadiyar X, one of India's oldest and most renowned zoos, highly acclaimed for wildlife conservation.",
    latitude: 12.3022,
    longitude: 76.6644,
    imageUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Zoological Souvenir Junction",
      offer: "1 Free Royal Bengal Tiger Wooden Miniature Toy",
      distance: "20m from the Main Exit Gate"
    },
    voucherCode: "ZOO-TIGER-MINI-SOVENIR"
  },
  {
    id: "brindavan_gardens",
    name: "Brindavan Gardens & KRS Dam",
    description: "A world-famous terrace garden laid out in Kashmiri style beneath the Krishna Raja Sagara Dam on the Kaveri river, celebrated for symmetric fountains.",
    latitude: 12.4276,
    longitude: 76.5714,
    imageUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "KRS Dam Fountain Refreshments",
      offer: "1 Free Traditional Mysore Masala Corn Cob with Lime",
      distance: "50m from the central fountain bridge"
    },
    voucherCode: "KRS-FOUNTAIN-CORN-COB"
  },
  {
    id: "railway_museum",
    name: "Railway Museum Mysore",
    description: "Inaugurated in 1979 as India's second oldest railway museum, preserving grand steam engines and the Maharaja's elegant Burma teak wooden saloon coach from 1899.",
    latitude: 12.3168,
    longitude: 76.6435,
    imageUrl: "https://images.unsplash.com/photo-1515165504669-4230c822c21f?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "The Station Master Indian Chai Spot",
      offer: "1 Free Royal Chai & Hot Samosa Combo",
      distance: "Inside the vintage railway dining coach"
    },
    voucherCode: "RAIL-STATION-MASTER-CHAI"
  },
  {
    id: "green_hotel_cafe",
    name: "The Green Hotel Garden Library (Instagram Aesthetic)",
    description: "A beautifully restored 1920s royal palace clinic turned eco-haven hotel. Boasts a delightful garden courtyard under ancient rain-trees. High trending spot for peaceful book-reading stories, pastel tea booths, and hand-filtered brews.",
    latitude: 12.3188,
    longitude: 76.6112,
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Garden Courtyard Library",
      offer: "1 Complimentary Organic Lavender Herbal Iced Tea",
      distance: "Adjacent to the greenhouse patio"
    },
    voucherCode: "INSTA-GREEN-TEA-COURT",
    isInstagramTrending: true,
    instagramHandle: "@greenhotelmysore",
    reelsCount: "125K+ Reels"
  },
  {
    id: "kukkarahalli_lake_bridge",
    name: "Kukkarahalli Sunset Bridge (Instagram Secret)",
    description: "An immersive clay walking pathway spanning across 120-acres of calm waters. Famous among local poets and college film-makers for its breathtaking orange sunset canopy reflections, exotic water birds, and vintage wooden gazebos.",
    latitude: 12.3081,
    longitude: 76.6219,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Kukkarahalli Lake Juice Junction",
      offer: "1 Complimentary Chilled Sweet Lime Soda",
      distance: "Just 10m from the Northern Gazebo Gate"
    },
    voucherCode: "SUNSET-LAKE-SODA-2026",
    isInstagramTrending: true,
    instagramHandle: "#KukkarahalliLakeSunset",
    reelsCount: "85K+ Reels"
  },
  {
    id: "devaraja_spice_alley",
    name: "Devaraja Market Spice Alley (Instagram Visual Gem)",
    description: "Over 130 years old, this bustling traditional Mysore alleyway is world-famous on travel reels for its towering geometric cones of colorful kumkum dye powder, fresh jasmine flower mounds, and essential sandalwood oils.",
    latitude: 12.3114,
    longitude: 76.6508,
    imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Mysore Genuine Perfumery House",
      offer: "1 Free Vial of Hand-poured Sandalwood/Jasmine Oil",
      distance: "Stall No. 142, middle segment of Flower Alley"
    },
    voucherCode: "DEVA-SPICE-SANDAL-OILS",
    isInstagramTrending: true,
    instagramHandle: "#DevarajaMarketVibe",
    reelsCount: "250K+ Reels"
  },
  {
    id: "chamundi_hairpin_110",
    name: "Chamundi Hairpin Bend 12 (Instagram Reels Viewpoint)",
    description: "An unofficial, serene viewing deck located at the 12th hairpin of the Chamundi Hill climb. Perfect panorama viewpoint that went viral on Instagram for displaying the entire Mysuru city illuminated in golden sparkling light after dark.",
    latitude: 12.2812,
    longitude: 76.6710,
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Chamundi Hill View Maggi & Ginger Tea Studio",
      offer: "1 Free Comp Plate of Roasted Chilli Corn & Hot Ginger Tea",
      distance: "Parked caravan lookout directly at Hairpin 12"
    },
    voucherCode: "HAIRPIN-MAGGI-GINGER-TEA",
    isInstagramTrending: true,
    instagramHandle: "#MysoreNightView110",
    reelsCount: "180K+ Reels"
  },
  {
    id: "windflower_resort",
    name: "The Windflower Spa Resort (Instagram Retreat)",
    description: "A luxurious heritage-style wellness resort nestled at the base of Chamundi Hill. Known for its gorgeous wooden pillars, floating lotus ponds, and open-air rainfall showers featured extensively in travel luxury reels.",
    latitude: 12.2965,
    longitude: 76.6695,
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Windflower Bistro & Spa Lounge",
      offer: "1 Complimentary Ayurvedic Foot Massage (15-min) or Coconut Elixir Drink",
      distance: "Ground level next to reception lotus pond"
    },
    voucherCode: "INSTA-WINDFLOWER-SPA",
    isInstagramTrending: true,
    instagramHandle: "@thewindflower_mysore",
    reelsCount: "90K+ Reels"
  },
  {
    id: "lingambudhi_forest_park",
    name: "Lingambudhi Forest Reserve & Park",
    description: "A gorgeous botanical forest garden surrounding the ancient 1828 Lingambudhi Lake. Boasts massive wild bamboo groves, flower paths, and serene sunset wooden swings that render a brilliant aesthetic look on social media posts.",
    latitude: 12.2795,
    longitude: 76.6184,
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Bamboo Grove Organic Coconut Spot",
      offer: "1 Free Traditional Ice-Cold Spiced Buttermilk & Mysore Chikki",
      distance: "At the southern walking trail gazebo entrance"
    },
    voucherCode: "LINGA-BOTANIC-COCONUT",
    isInstagramTrending: true,
    instagramHandle: "#LingambudhiLakePark",
    reelsCount: "72K+ Reels"
  },
  {
    id: "mall_of_mysore",
    name: "Mall of Mysore (Trending Youth Centric Mall)",
    description: "Mysuru's premium shopping and entertainment hub built with a majestic facade reflecting heritage architecture elements paired with modern glass panels. Famous for youth hangouts, food courts, and viral selfie spots.",
    latitude: 12.3015,
    longitude: 76.6655,
    imageUrl: "https://images.unsplash.com/photo-1519642918688-7e43b1701085?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "The Cream Stone Mysore",
      offer: "1 Complimentary Double-Scoop Crafted Ice-Cream with Waffle Cone",
      distance: "Mall Main Floor, Food Court Stall 4A"
    },
    voucherCode: "MALL-CREAMSTONE-FREEBIE",
    isInstagramTrending: true,
    instagramHandle: "@mallofmysore_official",
    reelsCount: "140K+ Reels"
  },
  {
    id: "maharaja_food_street",
    name: "Maharaja Circle Noodle & Chaat (Night Gathering)",
    description: "A vibrant roadside food encampment teeming with college crowds, local creators, and families. Renowned for bubbling butter golo dhabas, local spices, baby-corn sticks, and sizzling hot tawa pulavs.",
    latitude: 12.3055,
    longitude: 76.6355,
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Namma Mysore Sizzling Dosa & Noodles",
      offer: "1 Free Plate of Crispy Golden Baby-Corn Manchurian & Mango Mojito",
      distance: "Stall No. 3, next to the Maharaja Circle streetlamp post"
    },
    voucherCode: "NAMMA-STREET-SIZZLER",
    isInstagramTrending: true,
    instagramHandle: "#MaharajaCircleFoodStreet",
    reelsCount: "115K+ Reels"
  },
  {
    id: "chamundi_backtrail_offroad",
    name: "Chamundi Hill Eastern Off-Road Canopy Trail",
    description: "A hidden gravel-packed muddy biking path on the eastern side of Chamundi Hill. High trending among bicycle clubs, off-road motorists, and adventure vloggers for wild shrub encounters, sunset viewpoints, and raw soil paths.",
    latitude: 12.2750,
    longitude: 76.6850,
    imageUrl: "https://images.unsplash.com/photo-1533240332313-0db49b439ad3?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Adventure Trail Pitstop Tea Caravan",
      offer: "1 Free Cup of Hot Cardamom Tea & Handmade Spicy Pepper Vada",
      distance: "Parked under the grand Banyan tree, trailhead junction East"
    },
    voucherCode: "CHAMUNDI-OFFROAD-TRAIL",
    isInstagramTrending: true,
    instagramHandle: "#MysoreOffroadBikers",
    reelsCount: "95K+ Reels"
  },
  {
    id: "grs_fantasy_park",
    name: "GRS Fantasy Park (Amusement & Water Paradise)",
    description: "Mysuru's elite award-winning water amusement park. Famous across Instagram video loops for high-speed splash coasters, lazy rivers, and neon-lit aqua dance floors, making it a stellar hot spot for summer weekend stories.",
    latitude: 12.3610,
    longitude: 76.6210,
    imageUrl: "https://images.unsplash.com/photo-1513885016109-4f20415a917e?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "GRS Oasis Food Pavilion",
      offer: "1 Complimentary Multi-Flavor Fruit Slushy & Loaded Salted French Fries",
      distance: "Directly opposite the GRS Amazonia lazy river dock"
    },
    voucherCode: "GRS-FANTASY-OASIS-REWARD",
    isInstagramTrending: true,
    instagramHandle: "@grsfantasypark",
    reelsCount: "310K+ Reels"
  },
  {
    id: "st_philomena_gothic_viewpoint",
    name: "Philomena West Turret Sideview Corner (Aesthetic View)",
    description: "A charming hidden alley plaza giving you a high vertical angle of the cathedral’s Gothic towers. Perfect spot for taking vintage-style symmetric photographs and dramatic video transitions.",
    latitude: 12.3218,
    longitude: 76.6575,
    imageUrl: "https://images.unsplash.com/photo-1548625361-155deee2627e?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Gothic Spires Café & Craft Shop",
      offer: "1 Free Keepsake Sandstone Carving of Gothic Turret & Cold Brew",
      distance: "Directly facing the West Turret base garden wall"
    },
    voucherCode: "GOTHIC-SPIRES-PHOTO",
    isInstagramTrending: true,
    instagramHandle: "#PhilomenaGothicSymmetric",
    reelsCount: "80K+ Reels"
  },
  {
    id: "old_house_pizza",
    name: "The Old House Artisan Pizzeria (Instagram Bistro)",
    description: "A beautifully restored vintage heritage bungalow turned into an aesthetic candle-lit garden pizzeria. It's highly viral on Mysuru food reels for wood-fired sourdough pizzas, vintage garden furniture, and hanging fairy-light canopies.",
    latitude: 12.3120,
    longitude: 76.6340,
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "The Old House Garden Bistro",
      offer: "1 Free Artisanal Garlic Pull-apart Bread & Passion Fruit Soda",
      distance: "Directly under the center jasmine tree"
    },
    voucherCode: "INSTA-OLDHOUSE-PIZZA",
    isInstagramTrending: true,
    instagramHandle: "@theoldhouse_mysore",
    reelsCount: "140K+ Reels"
  },
  {
    id: "depot_18_cafe",
    name: "Depot 18 Hipster Cafe & Books (Instagram Indie)",
    description: "A highly aesthetic, retro record-player themed coffee shop in Gokulam. Known as a creative cove for student poets, artists, and independent travel bloggers. Famous on social apps for its towering vintage book walls, analog music vinyl corner, and matcha affogato bowls.",
    latitude: 12.3275,
    longitude: 76.6190,
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Depot 18 Coffee & Vinyls",
      offer: "1 Complimentary House-roasted Cold Brew Coffee & Handcrafted Bookmark",
      distance: "By the second-floor retro typewriter desk"
    },
    voucherCode: "GOKULAM-DEPOT18-BREW",
    isInstagramTrending: true,
    instagramHandle: "@depot18mysore",
    reelsCount: "95K+ Reels"
  },
  {
    id: "mylari_hotel",
    name: "Hotel Mylari Original 1938 (Viral Sago Dosa)",
    description: "A legendary old-quarter small shop celebrating over 85 years of legacy. Massive culinary influencer magnet, featured on travel guides worldwide. Viral across social apps for its secretive butter-soft sago dosas served with fresh coconut chutney on plantain leaves.",
    latitude: 12.3060,
    longitude: 76.6534,
    imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Original Hotel Mylari Agrahara",
      offer: "1 Complementary Sizzling Hot Ghee Butter Dosa & filter-coffee mug",
      distance: "Inside the rustic family dining room stall"
    },
    voucherCode: "LEGENDARY-MYLARI-DOSA",
    isInstagramTrending: true,
    instagramHandle: "#OriginalMylariDosa",
    reelsCount: "220K+ Reels"
  },
  {
    id: "sandalwood_crafts",
    name: "Legacy Sandalwood Arts & Crafts Shop (Viral Heirloom)",
    description: "A tiny heirloom workshop and storefront located in the old city lanes. Highly trending for independent vlogging. Master woodcarvers of Mysuru demonstrate real-time chisel-work, producing wonderfully aromatic sandalwood deities, souvenir boxes, and pure oils.",
    latitude: 12.3085,
    longitude: 76.6480,
    imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Saraswathi Sandalwood Emporium",
      offer: "1 Free Aromatic Mysore Sandalwood Pocket Soap or Carved Elephant Keychain",
      distance: "By the artisan carving work-bench"
    },
    voucherCode: "SANDAL-ART-HEIRLOOM",
    isInstagramTrending: true,
    instagramHandle: "#MysoreSandalwoodArt",
    reelsCount: "65K+ Reels"
  },
  {
    id: "radisson_blu_hotel",
    name: "Radisson Blu Plaza Hotel (Instagram Hilltop Pool View)",
    description: "A premium modern luxury enclave located with an unobstructed, spectacular view of the Chamundi Hill steps path. High-end social media hotspot for modern travelers, famous on luxury reels for its breathtaking night rooftop sunset parties and misty infinity pool reflections.",
    latitude: 12.2980,
    longitude: 76.6625,
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600",
    recommendedMerchant: {
      name: "Radisson Blu Plaza Poolside Lounge",
      offer: "1 Complimentary Signature Sunset Fruit Cooler Mocktail & Loaded Nachos Plate",
      distance: "Level 1, poolside cabana counter"
    },
    voucherCode: "RADISSON-BLU-REWARD",
    isInstagramTrending: true,
    instagramHandle: "@radissonblumysore",
    reelsCount: "185K+ Reels"
  }
];

// Haversine distance formula in meters
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function App() {
  // Navigation & Tabs helper
  const [activeTab, setActiveTab] = useState<"chatbot" | "spin" | "simulation" | "safety" | "rules" | "map" | "green-routes" | "explorer-badge">("chatbot");

  // --- Mysore Explorer Badge Gamification and Quest state ---
  const [explorerPoints, setExplorerPoints] = useState<number>(15); // Start with 15 EXP points on initial load
  const [completedQuests, setCompletedQuests] = useState({
    viewedWeather: false,
    viewedFacilities: false,
    spinTried: false,
    askedChat: false,
    simPresetUsed: false,
    sitesSelected: [HERITAGE_SITES[0].id] // track explored site ids
  });

  const [weatherDetailsOpen, setWeatherDetailsOpen] = useState<boolean>(false);
  const [facilitiesDetailsOpen, setFacilitiesDetailsOpen] = useState<boolean>(false);

  // Helper trigger to try/complete a quest and allocate points
  const handleTryQuest = (questKey: "weather" | "facilities" | "spin" | "chat" | "simulator") => {
    setCompletedQuests(prev => {
      let isAlreadyDone = false;
      let pointsToAdd = 0;

      if (questKey === "weather" && !prev.viewedWeather) {
        isAlreadyDone = true;
        pointsToAdd = 15;
      } else if (questKey === "facilities" && !prev.viewedFacilities) {
        isAlreadyDone = true;
        pointsToAdd = 15;
      } else if (questKey === "spin" && !prev.spinTried) {
        isAlreadyDone = true;
        pointsToAdd = 20;
      } else if (questKey === "chat" && !prev.askedChat) {
        isAlreadyDone = true;
        pointsToAdd = 20;
      } else if (questKey === "simulator" && !prev.simPresetUsed) {
        isAlreadyDone = true;
        pointsToAdd = 20;
      }

      if (isAlreadyDone) {
        setExplorerPoints(p => p + pointsToAdd);
        return {
          ...prev,
          viewedWeather: questKey === "weather" ? true : prev.viewedWeather,
          viewedFacilities: questKey === "facilities" ? true : prev.viewedFacilities,
          spinTried: questKey === "spin" ? true : prev.spinTried,
          askedChat: questKey === "chat" ? true : prev.askedChat,
          simPresetUsed: questKey === "simulator" ? true : prev.simPresetUsed,
        };
      }
      return prev;
    });

    // Custom helper routing redirects
    if (questKey === "spin") {
      setActiveTab("spin");
    } else if (questKey === "simulator") {
      setActiveTab("simulation");
    } else if (questKey === "chat") {
      setActiveTab("chatbot");
    } else if (questKey === "weather" || questKey === "facilities") {
      // Focus on metadata
      const el = document.getElementById("augmented-site-metadata-pills");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      if (questKey === "weather") setWeatherDetailsOpen(true);
      if (questKey === "facilities") setFacilitiesDetailsOpen(true);
    }
  };

  // --- Campaign Session State (Hoisted to top of state definitions) ---
  const [activeSite, setActiveSite] = useState<HeritageSite>(HERITAGE_SITES[0]);
  const [stage, setStage] = useState<AppStateStage>("SCANNER");
  const [discoveryProgress, setDiscoveryProgress] = useState<number>(300); // 5 mins
  const [voucherProgress, setVoucherProgress] = useState<number>(120); // 2 mins
  const [historyText, setHistoryText] = useState<string>("");
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(false);

  // --- Location Track Safety Kit States ---
  const [guardians, setGuardians] = useState<Array<{ id: string; name: string; phone: string; isPreset?: boolean }>>(() => {
    try {
      const saved = localStorage.getItem("mysore_rewards_guardians_v2");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { id: "police", name: "Mysuru Tourist Police Helpline", phone: "112", isPreset: true },
      { id: "vvce_security", name: "VVCE Student Security Desk", phone: "+91-821-427-6201", isPreset: true }
    ];
  });

  const [guardianName, setGuardianName] = useState<string>("");
  const [guardianPhone, setGuardianPhone] = useState<string>("");
  const [isSirenActive, setIsSirenActive] = useState<boolean>(false);
  const [sosAlertCopied, setSosAlertCopied] = useState<boolean>(false);
  const [activeCallingContact, setActiveCallingContact] = useState<{ name: string; phone: string } | null>(null);
  
  // Safe Walk Session Tracking
  const [isSafeWalkActive, setIsSafeWalkActive] = useState<boolean>(false);
  const [safeWalkDuration, setSafeWalkDuration] = useState<number>(5); // defaults to 5 mins for easily tested simulation
  const [safeWalkSecondsLeft, setSafeWalkSecondsLeft] = useState<number>(300); // 5 mins

  // Web Audio Context refs for the siren synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const modRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Auto-save guardians in localstorage
  useEffect(() => {
    try {
      localStorage.setItem("mysore_rewards_guardians_v2", JSON.stringify(guardians));
    } catch (e) {
      console.error(e);
    }
  }, [guardians]);

  // Siren synthesis controls
  const startSiren = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) {
        alert("Web Audio Context not supported. Siren fallback active!");
        setIsSirenActive(true);
        return;
      }
      
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.1);
      gainNodeRef.current = gainNode;

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc1Ref.current = osc;

      const mod = ctx.createOscillator();
      mod.frequency.value = 2.5; // oscillation rate (Hz)
      modRef.current = mod;

      const modGain = ctx.createGain();
      modGain.gain.value = 175; // frequency depth offset

      mod.connect(modGain);
      modGain.connect(osc.frequency);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      mod.start();
      osc.start();
      setIsSirenActive(true);
    } catch (e) {
      console.error("Audio error", e);
      setIsSirenActive(true);
    }
  };

  const stopSiren = () => {
    try {
      if (gainNodeRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.1);
      }
      setTimeout(() => {
        if (osc1Ref.current) {
          try { osc1Ref.current.stop(); } catch(e){}
          osc1Ref.current.disconnect();
          osc1Ref.current = null;
        }
        if (modRef.current) {
          try { modRef.current.stop(); } catch(e){}
          modRef.current.disconnect();
          modRef.current = null;
        }
        if (audioCtxRef.current) {
          try { audioCtxRef.current.close(); } catch(e){}
          audioCtxRef.current = null;
        }
      }, 120);
      setIsSirenActive(false);
    } catch (e) {
      console.error(e);
      setIsSirenActive(false);
    }
  };

  const toggleSiren = () => {
    if (isSirenActive) {
      stopSiren();
    } else {
      startSiren();
    }
  };

  const handleBroadcastSOS = () => {
    const mapsLink = `https://www.google.com/maps?q=${userLocation.latitude.toFixed(6)},${userLocation.longitude.toFixed(6)}`;
    const sosMessage = `🚨 EMERGENCY SOS BEACON 🚨\n`;
    const details = `My live traveler coordinates: [Lat: ${userLocation.latitude.toFixed(6)}, Lng: ${userLocation.longitude.toFixed(6)}]\n`;
    const siteContext = `Last tracked near monument: ${activeSite.name}\n`;
    const appLink = `Rewards Safety Sentinel verified position.\nView: ${mapsLink}`;
    
    const textToCopy = `${sosMessage}${details}${siteContext}${appLink}`;
    navigator.clipboard.writeText(textToCopy);
    setSosAlertCopied(true);
    setTimeout(() => setSosAlertCopied(false), 4500);

    // Flash/pulse feedback
    if (!isSirenActive) {
      startSiren();
      setTimeout(() => {
        stopSiren();
      }, 3000); // Auto stop beep after 3 secs of SOS unless toggled on purpose
    }
  };

  const handleStartSafeWalk = (mins: number) => {
    setIsSafeWalkActive(true);
    setSafeWalkDuration(mins);
    setSafeWalkSecondsLeft(mins * 60);
  };

  const handleStopSafeWalk = () => {
    setIsSafeWalkActive(false);
  };

  // Safe Walk Interval Stopwatch
  useEffect(() => {
    let watchTimer: any;
    if (isSafeWalkActive && safeWalkSecondsLeft > 0) {
      watchTimer = setInterval(() => {
        setSafeWalkSecondsLeft(prev => {
          if (prev <= 1) {
            setIsSafeWalkActive(false);
            startSiren();
            alert("🚨 Safety Timeout Breached! Real-time check-in failed, launching security sirens and broadcast beacons. Stay calm!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (watchTimer) clearInterval(watchTimer);
    };
  }, [isSafeWalkActive, safeWalkSecondsLeft]);

  // Audio cleanup on unmount
  useEffect(() => {
    return () => {
      if (osc1Ref.current) {
        try { osc1Ref.current.stop(); } catch(e){}
      }
      if (modRef.current) {
        try { modRef.current.stop(); } catch(e){}
      }
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch(e){}
      }
    };
  }, []);

  const addGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guardianName.trim() || !guardianPhone.trim()) return;
    setGuardians(prev => [
      ...prev,
      {
        id: "guardian_" + Date.now(),
        name: guardianName.trim(),
        phone: guardianPhone.trim()
      }
    ]);
    setGuardianName("");
    setGuardianPhone("");
  };

  const removeGuardian = (id: string) => {
    setGuardians(prev => prev.filter(g => g.id !== id));
  };

  // --- Background theme state ---
  const [selectedThemeId, setSelectedThemeId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("mysore_heritage_bg_theme_v3");
      return saved || "ivory";
    } catch {
      return "ivory";
    }
  });

  // Save theme selection in localStorage
  useEffect(() => {
    try {
      localStorage.setItem("mysore_heritage_bg_theme_v3", selectedThemeId);
    } catch (e) {
      console.error(e);
    }
  }, [selectedThemeId]);

  // --- Spin Wheel state ---
  const [spinBillAmount, setSpinBillAmount] = useState<string>("");
  const [selectedSpinMerchantId, setSelectedSpinMerchantId] = useState<string>(HERITAGE_SITES[0].id);
  const [wheelRotation, setWheelRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [hasSpunCurrent, setHasSpunCurrent] = useState<boolean>(false);
  const [spinResult, setSpinResult] = useState<typeof SPIN_REWARDS[number] | null>(null);
  const [spinHistory, setSpinHistory] = useState<Array<{
    receiptId: string;
    merchantName: string;
    billAmount: number;
    rewardEarned: string;
    code: string;
    timestamp: string;
  }>>(() => {
    try {
      const saved = localStorage.getItem("mysore_heritage_spinhistory_v4");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save spin history
  useEffect(() => {
    try {
      localStorage.setItem("mysore_heritage_spinhistory_v4", JSON.stringify(spinHistory));
    } catch (e) {
      console.error(e);
    }
  }, [spinHistory]);

  const activeTheme = BG_THEMES.find(t => t.id === selectedThemeId) || BG_THEMES[0];

  const getSafetyTipForSite = (siteId: string) => {
    switch (siteId) {
      case "amba_vilas":
        return {
          threatLevel: "Very Low",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Palace zone is heavily guarded under video CCTV inspection. Highly secure tourist zone. Simply ignore aggressive external tour guides."
        };
      case "jaganmohan":
        return {
          threatLevel: "Very Low",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Art gallery area is tightly monitored. Strict museum check-ins. Ideal safe spot for families and independent solo backpackers."
        };
      case "lalitha_mahal":
        return {
          threatLevel: "Low",
          colorClass: "text-emerald-600 bg-emerald-50/75 border-emerald-200/50",
          tip: "Secluded heritage boulevard scenery. A bit dark under the canopy paths after 10 PM. Secure registered cab rides pre-booked online."
        };
      case "chamundi_nandi":
        return {
          threatLevel: "Moderate (Wildlife Patrol Zone)",
          colorClass: "text-amber-600 bg-amber-50/75 border-amber-200/30",
          tip: "Reserve forest boundaries. Wild leopards and troops of monkeys are highly active post-sunset. Do NOT walk or ride scooters alone on hills after 8:30 PM!"
        };
      case "st_philomena":
        return {
          threatLevel: "Low",
          colorClass: "text-emerald-600 bg-emerald-50/75 border-emerald-200/50",
          tip: "Densely packed cultural cathedral zone. Keep bags closed to prevent accidental pocket picking during high-holiday mass ceremonies."
        };
      case "vvce":
        return {
          threatLevel: "Extremely Safe (Campus)",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Vidyavardhaka security guard posts are active at all principal gates. Solid student-managed secure zone, open for coding hackathons."
        };
      case "karanji_lake":
        return {
          threatLevel: "Low",
          colorClass: "text-emerald-600 bg-emerald-50/75 border-emerald-200/50",
          tip: "Lake closes early (5:30 PM). Sturdy iron enclosures preserve walkthrough aviaries. Keep away from muddy lakeshore banks of deep water."
        };
      case "mysore_zoo":
        return {
          threatLevel: "Extremely Safe",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Heavy public presence, with zoo officers actively patrolling the path networks. Stay behind iron railings and never feed zoo animal units."
        };
      case "brindavan_gardens":
        return {
          threatLevel: "Moderate",
          colorClass: "text-amber-600 bg-amber-50/75 border-amber-200/30",
          tip: "High moisture rapid stone decks. Tightly guarded beneath dam flows. Always obey safety red signposts and avoid slipping near the canal drops."
        };
      case "railway_museum":
        return {
          threatLevel: "Very Low",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Closed heritage garden lot. Under surveillance and quiet. Safe for solo or kid exploration."
        };
      case "green_hotel_cafe":
        return {
          threatLevel: "Extremely Safe",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Boutique eco-hotel compound under 24/7 security reception. Highly welcoming, perfect quiet spot for digital nomads and evening tea stories."
        };
      case "kukkarahalli_lake_bridge":
        return {
          threatLevel: "Low to Moderate",
          colorClass: "text-amber-600 bg-amber-50/75 border-amber-250/30",
          tip: "Scenic walking canopy. Tends to get dark and empty after 6:30 PM. Exit campus boundaries before gates close to secure dynamic travel comfort."
        };
      case "devaraja_spice_alley":
        return {
          threatLevel: "Low",
          colorClass: "text-emerald-600 bg-emerald-50/75 border-emerald-200/50",
          tip: "Very high public density. Mind your personal belongings and wallet pockets in flower and spice alley squeezes."
        };
      case "chamundi_hairpin_110":
        return {
          threatLevel: "Moderate (Forest Rim View)",
          colorClass: "text-amber-600 bg-amber-50/75 border-amber-200/30",
          tip: "Amazing night lookout. Ensure your scooter has enough charge of fuel. Highly advised to stay within group parameters; wildlife patrols active after 9:00 PM."
        };
      case "windflower_resort":
        return {
          threatLevel: "Extremely Safe",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Luxury resort zone with private secure parking reception. Perfect for high-end cozy evenings and couple photoshoots."
        };
      case "lingambudhi_forest_park":
        return {
          threatLevel: "Low to Moderate",
          colorClass: "text-amber-600 bg-amber-50/75 border-amber-250/30",
          tip: "Beautiful bamboo walkways. Avoid walking deep into unlit forest pathways after 6:00 PM as wild peacocks and reptiles retreat."
        };
      case "mall_of_mysore":
        return {
          threatLevel: "Very Low",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Modern shopping mall with active CCTV and high-fidelity security screening. Extremely child and family-friendly."
        };
      case "maharaja_food_street":
        return {
          threatLevel: "Low",
          colorClass: "text-amber-600 bg-amber-50/75 border-amber-200/50",
          tip: "Lively street gathering. Enjoy delicious local chaat, but be cautious of high vehicle traffic surrounding scooter parking blocks."
        };
      case "chamundi_backtrail_offroad":
        return {
          threatLevel: "Moderate (Advisory Active)",
          colorClass: "text-amber-600 bg-amber-50/75 border-amber-200/30",
          tip: "Unpaved dirt canopy road. Highly recommended to travel in day-time hours within groups. Ensure tire pressure is optimized."
        };
      case "grs_fantasy_park":
        return {
          threatLevel: "Extremely Safe",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Professional amusement park with active lifeguard shifts and high safety compliance. Always follow individual ride guidelines."
        };
      case "st_philomena_gothic_viewpoint":
        return {
          threatLevel: "Very Low",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Peaceful cathedral side lane. Highly respectful atmosphere. Please remain quiet, mindful of worshippers, and keep camera flash off inside halls."
        };
      case "old_house_pizza":
        return {
          threatLevel: "Very Low",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Delightful private dining restaurant property. Tends to be well-lit, gated, and heavily crowded with families. Extremely safe for late-night food exploration."
        };
      case "depot_18_cafe":
        return {
          threatLevel: "Very Low",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Artistic, cozy, child-safe interior. Great neighborhood area in Gokulam. Highly friendly community vibe."
        };
      case "mylari_hotel":
        return {
          threatLevel: "Low",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Traditional neighborhood old hotel. Highly crowded; keep a small eye on personal items but feel free to enjoy the authentic local hospitality."
        };
      case "sandalwood_crafts":
        return {
          threatLevel: "Very Low",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "Historic bazaar sector. Shop is situated directly on the busy commercial walkway. Fully hospitable and safe."
        };
      case "radisson_blu_hotel":
        return {
          threatLevel: "Extremely Safe",
          colorClass: "text-green-600 bg-green-50/75 border-green-200/50",
          tip: "5-star luxury secure premises with strict entry management and valet security. Outstanding safety setup."
        };
      default:
        return {
          threatLevel: "Low",
          colorClass: "text-emerald-600 bg-emerald-50/75 border-emerald-200/50",
          tip: "Standard travel routes. Keep digital tracking alerts active and secure your travel logs."
        };
    }
  };

  const getMerchantMinPurchase = (siteId: string) => {
    switch (siteId) {
      case "amba_vilas": return 100;
      case "jaganmohan": return 150;
      case "lalitha_mahal": return 250;
      case "chamundi_nandi": return 80;
      case "st_philomena": return 120;
      case "vvce": return 80;
      case "green_hotel_cafe": return 120;
      case "kukkarahalli_lake_bridge": return 60;
      case "devaraja_spice_alley": return 80;
      case "chamundi_hairpin_110": return 50;
      case "windflower_resort": return 300;
      case "lingambudhi_forest_park": return 50;
      case "mall_of_mysore": return 150;
      case "maharaja_food_street": return 80;
      case "chamundi_backtrail_offroad": return 40;
      case "grs_fantasy_park": return 200;
      case "st_philomena_gothic_viewpoint": return 60;
      case "old_house_pizza": return 180;
      case "depot_18_cafe": return 120;
      case "mylari_hotel": return 50;
      case "sandalwood_crafts": return 100;
      case "radisson_blu_hotel": return 350;
      default: return 100;
    }
  };

  const handleSpinWheel = () => {
    if (isSpinning) return;

    const isNearbySelected = isNearby && (selectedSpinMerchantId === activeSite.id);
    const minAmount = getMerchantMinPurchase(selectedSpinMerchantId);
    let enteredAmount = parseFloat(spinBillAmount);

    if (!isNearbySelected && (isNaN(enteredAmount) || enteredAmount < minAmount)) {
      alert(`Invalid Amount!\n\nMinimum purchase for this merchant is ₹${minAmount}. Your entered bill amount is ₹${spinBillAmount || "0"}.\n\n💡 Physical Visitor Bonus: Walk within 100m of the site to bypass purchase bill restrictions and spin completely for free!`);
      return;
    }

    if (isNearbySelected && isNaN(enteredAmount)) {
      enteredAmount = 0; // Free presence spin
    }

    const siteObj = HERITAGE_SITES.find(s => s.id === selectedSpinMerchantId) || activeSite;
    
    setIsSpinning(true);
    setSpinResult(null);
    handleTryQuest("spin");

    // Pick winning index
    const winningIndex = Math.floor(Math.random() * SPIN_REWARDS.length);
    const loopRotations = 360 * 6; // Spin 6 full loops
    const sliceAngle = winningIndex * 60;
    const randomJiggle = Math.floor(Math.random() * 26) - 13; // random angular variation for physical reality
    const finalRot = loopRotations - sliceAngle + randomJiggle;

    setWheelRotation(finalRot);

    // Dynamic timer
    setTimeout(() => {
      setIsSpinning(false);
      setHasSpunCurrent(true);
      
      const wonReward = SPIN_REWARDS[winningIndex];
      setSpinResult(wonReward);

      const receiptNum = `MYS-${siteObj.id.substring(0,3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const promoCode = `MYS-CASH-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const nextEntry = {
        receiptId: receiptNum,
        merchantName: siteObj.recommendedMerchant.name,
        billAmount: enteredAmount,
        rewardEarned: wonReward.text,
        code: promoCode,
        timestamp: new Date().toLocaleString()
      };

      setSpinHistory(prev => [nextEntry, ...prev]);
    }, 3600);
  };

  // Synchronize Spin Choice to Active Monument
  useEffect(() => {
    setSelectedSpinMerchantId(activeSite.id);
  }, [activeSite]);

  // --- Simulation & Location states ---
  const [useSimulation, setUseSimulation] = useState<boolean>(true);
  const [selectedSiteIndex, setSelectedSiteIndex] = useState<number>(0);
  const [monumentSearch, setMonumentSearch] = useState<string>("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState<boolean>(false);
  const [simulatedDistancePreset, setSimulatedDistancePreset] = useState<"close" | "far" | "away">("close");
  
  // Synchronize Simulator Quest Points
  useEffect(() => {
    if (simulatedDistancePreset !== "close") {
      handleTryQuest("simulator");
    }
  }, [simulatedDistancePreset]);
  
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: HERITAGE_SITES[0].latitude + 0.0001, // ~15m away by default
    longitude: HERITAGE_SITES[0].longitude + 0.0001,
  });

  const [realGPSEnabled, setRealGPSEnabled] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  
  // Chatbot state
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Namaskara! I am your Royal AI Companion. Ask me anything about Mysore Palace, historic facts, local street food secrets, or Vidyavardhaka College (VVCE)!",
      timestamp: new Date()
    }
  ]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Claims
  const [claimedVouchers, setClaimedVouchers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("mysore_heritage_claims_v3");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const currentDistance = getDistance(
    userLocation.latitude,
    userLocation.longitude,
    activeSite.latitude,
    activeSite.longitude
  );

  const isNearby = currentDistance < 100;

  // Derive filtered search sites
  const filteredSites = HERITAGE_SITES.map((site, idx) => ({
    site,
    originalIndex: idx
  })).filter(({ site }) => {
    if (!monumentSearch.trim()) return true;
    const q = monumentSearch.toLowerCase();
    return (
      site.name.toLowerCase().includes(q) ||
      site.description.toLowerCase().includes(q) ||
      (site.recommendedMerchant && site.recommendedMerchant.name.toLowerCase().includes(q)) ||
      (site.recommendedMerchant && site.recommendedMerchant.offer.toLowerCase().includes(q))
    );
  });

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  // GPS Watcher
  useEffect(() => {
    let watchId: number | null = null;
    if (realGPSEnabled && !useSimulation) {
      if ("geolocation" in navigator) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setGpsError(null);
          },
          (err) => {
            setGpsError(err.message || "Failed to acquire real location. Reverting to simulator.");
            setUseSimulation(true);
            setRealGPSEnabled(false);
          },
          { enableHighAccuracy: true, timeout: 8000 }
        );
      } else {
        setGpsError("Geolocation is not supported by your browser.");
        setUseSimulation(true);
        setRealGPSEnabled(false);
      }
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [realGPSEnabled, useSimulation]);

  // Simulation Preset Handle
  useEffect(() => {
    if (useSimulation) {
      const baseSite = HERITAGE_SITES[selectedSiteIndex];
      setActiveSite(baseSite);

      if (simulatedDistancePreset === "close") {
        setUserLocation({
          latitude: baseSite.latitude + 0.0001,
          longitude: baseSite.longitude + 0.0001,
        });
      } else if (simulatedDistancePreset === "away") {
        setUserLocation({
          latitude: baseSite.latitude + 0.0009,
          longitude: baseSite.longitude + 0.0008,
        });
      } else {
        setUserLocation({
          latitude: baseSite.latitude + 0.02,
          longitude: baseSite.longitude + 0.02,
        });
      }
    }
  }, [useSimulation, selectedSiteIndex, simulatedDistancePreset]);

  // Select Site dropdown
  const handleSiteSelect = (index: number) => {
    setSelectedSiteIndex(index);
    const targetSite = HERITAGE_SITES[index];
    setActiveSite(targetSite);
    
    setStage("SCANNER");
    setDiscoveryProgress(300);
    setVoucherProgress(120);
    setHistoryText("");

    // Hook tracking for the Mysore Explorer Badge
    setCompletedQuests(prev => {
      if (prev.sitesSelected.includes(targetSite.id)) {
        return prev;
      }
      const updatedList = [...prev.sitesSelected, targetSite.id];
      // If they just hit exactly 3 unique sites, reward 30 EXP points
      if (updatedList.length === 3) {
        setExplorerPoints(pts => pts + 30);
      }
      return {
        ...prev,
        sitesSelected: updatedList
      };
    });
  };

  // Timer Tick (Phase 2 & Phase 3)
  useEffect(() => {
    const interval = setInterval(() => {
      if (stage === "DISCOVERY") {
        if (isNearby) {
          setDiscoveryProgress((prev) => {
            if (prev <= 1) {
              setStage("VOUCHER");
              return 0;
            }
            return prev - 1;
          });
        }
      } else if (stage === "VOUCHER") {
        setVoucherProgress((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [stage, isNearby]);

  // Fetch Story
  const fetchGeminiHistory = async (siteName: string) => {
    setIsHistoryLoading(true);
    try {
      const response = await fetch("/api/gemini/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteName }),
      });
      const data = await response.json();
      if (data.story) {
        setHistoryText(data.story);
      } else {
        setHistoryText(getCuratedStoryFallback(siteName));
      }
    } catch {
      setHistoryText(getCuratedStoryFallback(siteName));
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const getCuratedStoryFallback = (siteName: string) => {
    const norm = siteName.toLowerCase();
    if (norm.includes("amba") || norm.includes("palace")) {
      return "During the Dussehra festival, this magnificent Palace is illuminated with over 97,000 light bulbs, creating a breathtaking gold outline visible across the entire city. Inside, the grand Durbar Hall features magnificent ceilings of high-grade Bavarian stained glass. Hidden deep underneath is an elaborate network of brick arches designed as safe rooms for royalty.";
    }
    if (norm.includes("jaganmohan")) {
      return "Built entirely of seasoned wood in 1861, Jaganmohan Palace served as the home for royalty when the old fort palace caught fire. It currently preserves the rare 'Lady with the Lamp' artwork by Haldenkar, painted with watercolors that create a mystical self-illuminated aesthetic. Its rafters are structurally locked together without using physical metallic fasteners.";
    }
    if (norm.includes("lalitha")) {
      return "Styled after London's St. Paul's Cathedral, this grand white palace was commissioned in 1921 exclusively for hosting the Viceroy of India. Inside resides Karnataka's oldest working Otis wood-panel elevator, operated manually with brass levers. Its historic banquet floors hosted spectacular evening high-tea ceremonies looking at the hill ranges.";
    }
    if (norm.includes("nandi") || norm.includes("bull") || norm.includes("chamundi")) {
      return "Carved out of a single continuous block of basalt granite in 1659, this is one of India's largest monolith Nandi sculptures. Standing over 16-feet high, the bull is adorned with detailed carved chains and bells. Priests scale a scaffold every morning to execute holy milk and sandalwood paste rituals on the ancient stone.";
    }
    if (norm.includes("philomena")) {
      return "Boasting two twin Neo-Gothic spires rising 175-feet high, this cathedral resembles Germany's famous Cologne Cathedral. Beneath the main altar is a serene subterranean crypt preserving a sacred relic of Third-Century Saint Philomena. The rich stained glass windows were crafted in France to illuminate Bible parables in ruby tones.";
    }
    if (norm.includes("vidyavardhaka") || norm.includes("vvce")) {
      return "Established in 1997, Vidyavardhaka College of Engineering represents the technological heartbeat and modern educational standard of Mysuru. Its campus serves as an exciting hub for students building cutting-edge innovations in AI and coding. Over cups of freshly brewed South Indian filter coffee at the student canopy workspace, some of Karnataka's brightest technical start-ups have been imagined.";
    }
    if (norm.includes("karanji") || norm.includes("lake")) {
      return "Karanji Lake preserves India's largest walkthrough aviary structure, populated by spectacular Painted Storks and wild herons. Sourced originally as an eco-conservation garden, the lake ecosystem is powered entirely by natural rain catchments from Chamarajendra Zoological lands.";
    }
    if (norm.includes("zoo") || norm.includes("chamarajendra")) {
      return "Established in 1892, Chamarajendra Zoological Gardens is one of the world's oldest zoos. Founded by the Mysuru Maharaja Chamarajendra Wadiyar X, it prides itself on roomy enclosures and legendary early royal wildlife sanctuaries.";
    }
    if (norm.includes("brindavan") || norm.includes("krs")) {
      return "Inspired by the Mughal gardens of Kashmir, Brindavan Gardens sit right below the Krishnarajasagara (KRS) Dam across River Kaveri. Created in 1927, it boasts terraced lawns and spectacular dynamic musical color dancing fountains.";
    }
    if (norm.includes("railway") || norm.includes("museum")) {
      return "Inaugurated as India's second oldest railway heritage yard, Mysore Railway Museum features the classic Maharaja wooden saloon car built in 1899. Crafted in solid Burma teak and royal silk panels, it tells the grand saga of old standard locomotive travels.";
    }
    return "This Mysuru monument acts as an elegant keeper of regional legends and art patronage. From secret archives to rare ceiling graphics, the historic walls breathe Karnataka's grand heritage.";
  };

  const handleCheckMyLocation = () => {
    if (isNearby) {
      // Instantly open the physical reward voucher when they verify they are at the physical location
      setStage("VOUCHER");
      setVoucherProgress(120);
      setDiscoveryProgress(0); // marks discovery stopwatch completed
      fetchGeminiHistory(activeSite.name);
    } else {
      alert(`Geofence Gate Locked!\n\nYou are currently ${Math.round(currentDistance)} meters away from "${activeSite.name}". You must move within 100 meters to unlock.\n\nEasy Testing Hint: In the side panel, select "Inside Gate (15m)" to instantly simulate walking inside the zone!`);
    }
  };

  // chatbot message helper
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || chatInput;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!customText) setChatInput("");
    setChatLoading(true);
    handleTryQuest("chat");

    try {
      const historyPayload = chatMessages.slice(-6).map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          currentSite: activeSite.name
        })
      });

      const data = await response.json();
      const replyMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: "model",
        text: data.reply || "Something went wrong. Let us keep exploring the beauty of Mysuru!",
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, replyMsg]);
    } catch {
      // Local graceful fallback
      const replyMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: "model",
        text: "I am having trouble connecting to the network, but as your local guardian: did you know that the Mysore Masala Dosa is fried with real pure ghee and spiced red chutney inside? Also feel free to ask about the Mysore Royal Palace's beautiful 97,000 festival lights!",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, replyMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleRedeemVoucher = () => {
    if (voucherProgress === 0) {
      alert("This voucher's live countdown has expired!");
      return;
    }

    const confirmClaim = window.confirm(
      `Redeem Offer Now?\n\nMerchant: ${activeSite.recommendedMerchant.name}\nOffer: ${activeSite.recommendedMerchant.offer}\n\nPlease have the merchant witness this. Once confirmed, your single-use pass is consumed.`
    );

    if (confirmClaim) {
      const nextClaims = [...claimedVouchers, activeSite.id];
      setClaimedVouchers(nextClaims);
      localStorage.setItem("mysore_heritage_claims_v3", JSON.stringify(nextClaims));
    }
  };

  const resetClaims = () => {
    if (window.confirm("Are you sure you want to reset your rewards claims session?")) {
      setClaimedVouchers([]);
      localStorage.removeItem("mysore_heritage_claims_v3");
      setStage("SCANNER");
      setDiscoveryProgress(300);
      setVoucherProgress(120);
      setHistoryText("");
    }
  };

  const isAlreadyClaimed = claimedVouchers.includes(activeSite.id);
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div 
      className={`min-h-screen ${activeTheme.bgClass} text-[#2C2925] flex flex-col font-sans transition-all duration-500`}
      style={{ backgroundColor: activeTheme.bgHexPrimary }}
    >
      
      {/* Elegantly Designed Top Header (Light Cream with subtle Gold theme) */}
      <header className="border-b border-[#D4AF37]/20 bg-white/95 backdrop-blur-md shadow-xs sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo with high fidelity design */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#E6C657] to-[#B8931F] w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md shadow-amber-500/10 border border-[#D4AF37]/30 shrink-0">
              <span className="font-serif text-lg font-black text-white select-none tracking-tight">M</span>
            </div>
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-black tracking-tight text-stone-900 flex items-center gap-1.5 leading-none">
                MYSURU <span className="text-[#B8931F] font-serif">Heritage Rewards</span>
              </h1>
              <p className="text-[9px] text-[#B8931F] font-mono tracking-widest uppercase font-bold mt-0.5">{activeTheme.themeTitle}</p>
            </div>
          </div>

          {/* User & program info indicator */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-550 font-mono font-medium">Status:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-[#B8931F]/10 text-[#B8931F] border border-[#B8931F]/20 uppercase tracking-widest animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8931F]"></span> GPS Active
            </span>
          </div>

        </div>
      </header>

      {/* User guidance ticker */}
      <div className="bg-white/80 border-b border-stone-200/65 py-2.5 px-4 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-700">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#B8931F] shrink-0" />
            <span>
              <strong>Welcome, Visitor</strong>! Reach the geofence to lock-in history and claim local delights.
            </span>
          </div>

          {/* Light Colors Background Presets Switcher Row */}
          <div className="flex items-center gap-2 bg-stone-105 py-1 px-2 rounded-full border border-stone-200 shrink-0">
            <span className="text-[9.5px] font-mono text-stone-500 font-extrabold uppercase pl-1">Background Clr:</span>
            <div className="flex gap-1">
              {BG_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedThemeId(theme.id)}
                  title={`Switch to ${theme.name}`}
                  className={`w-4.5 h-4.5 rounded-full border cursor-pointer hover:scale-120 active:scale-95 transition-all ${
                    selectedThemeId === theme.id ? "ring-2 ring-[#B8931F] ring-offset-1 scale-110" : "border-stone-300/80"
                  }`}
                  style={{ backgroundColor: theme.bgHexPrimary }}
                  aria-label={theme.name}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono shrink-0">
            <span className="text-stone-600 font-semibold">Unlocked: <strong className="text-stone-900 font-bold">{claimedVouchers.length} / {HERITAGE_SITES.length}</strong></span>
            <button 
              onClick={resetClaims}
              className="text-[#B8931F] hover:text-[#917112] font-extrabold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Session
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: HERITAGE RADAR & ACTIVE SENSORS FRAME */}
        <section className="lg:col-span-7 flex flex-col justify-between bg-white border border-stone-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm relative overflow-hidden">
          
          <div className="space-y-4">
            
            {/* Context station header */}
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between pb-6 border-b border-stone-100">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#B8931F]">
                  <Map className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-widest font-mono">Monitored Station</span>
                </div>
                <h2 className="text-2xl font-serif text-stone-900 font-black tracking-tight leading-tight">
                  {activeSite.name}
                </h2>
                <p className="text-xs text-stone-500 leading-relaxed max-w-lg">
                  {activeSite.description}
                </p>
              </div>
              
              {/* Dropdown & Search in the primary context */}
              <div className="w-full sm:w-auto shrink-0 min-w-[250px] space-y-2 relative" id="ux-site-search-wrapper">
                <label className="text-[10px] font-mono text-[#B8931F] uppercase tracking-widest block font-extrabold flex items-center justify-between">
                  <span>Select Monument:</span>
                  {monumentSearch && (
                    <button
                      onClick={() => {
                        setMonumentSearch("");
                        setShowSearchSuggestions(false);
                      }}
                      className="text-[9px] text-[#B8931F] hover:underline cursor-pointer lowercase"
                    >
                      [clear search]
                    </button>
                  )}
                </label>

                {/* Search query box */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#B8931F]/70 pointer-events-none">
                    <Search className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by name, tag, or offer..."
                    value={monumentSearch}
                    onChange={(e) => {
                      setMonumentSearch(e.target.value);
                      setShowSearchSuggestions(true);
                    }}
                    onFocus={() => setShowSearchSuggestions(true)}
                    className="w-full bg-[#FCFBF9] border border-[#D4AF37]/45 text-stone-900 pl-8.5 pr-7 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-[#B8931F] focus:outline-none shadow-xs font-semibold placeholder:text-stone-400 placeholder:font-normal"
                  />
                  {monumentSearch && (
                    <button
                      onClick={() => {
                        setMonumentSearch("");
                        setShowSearchSuggestions(false);
                      }}
                      className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-stone-450 hover:text-stone-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Autosuggest search drop overlays */}
                {showSearchSuggestions && monumentSearch.trim().length > 0 && (
                  <div className="absolute left-0 right-0 z-30 mt-1 bg-white border border-stone-200 rounded-2xl shadow-xl max-h-60 overflow-y-auto divide-y divide-stone-100">
                    {filteredSites.length > 0 ? (
                      filteredSites.map(({ site, originalIndex }) => (
                        <button
                          key={site.id}
                          onClick={() => {
                            handleSiteSelect(originalIndex);
                            setMonumentSearch("");
                            setShowSearchSuggestions(false);
                          }}
                          className="w-full text-left px-3.5 py-2.5 hover:bg-stone-50 transition flex flex-col gap-0.5 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-stone-900 truncate">
                              {site.name}
                            </span>
                            {site.isInstagramTrending && (
                              <span className="text-[8px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded uppercase font-mono tracking-tighter shrink-0 ml-2">
                                ✨ Insta
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-stone-500 line-clamp-1 italic">
                            {site.recommendedMerchant.offer}
                          </p>
                        </button>
                      ))
                    ) : (
                      <div className="px-3.5 py-2.5 text-xs text-stone-450 text-center italic">
                        No matches found. Try another term.
                      </div>
                    )}
                  </div>
                )}

                {/* Index dropdown list */}
                <div className="relative">
                  <select
                    id="monument-picker-main"
                    value={selectedSiteIndex}
                    onChange={(e) => {
                      handleSiteSelect(Number(e.target.value));
                      setMonumentSearch("");
                    }}
                    className="w-full bg-[#FCFBF9]/80 border border-stone-250 text-stone-900 py-1.5 pl-3 pr-8 rounded-xl text-[11px] focus:ring-1 focus:ring-[#B8931F] focus:outline-none cursor-pointer appearance-none shadow-3xs font-semibold"
                  >
                    {HERITAGE_SITES.map((site, index) => (
                      <option key={site.id} value={index} className="text-stone-900">
                        {site.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-450">
                    <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                  </div>
                </div>
              </div>
            </div>

            {/* Weather, Public Facilities & Green Eco Tips (Dynamic Widgets) */}
            {(() => {
              const meta = AUGMENTED_SITE_DATA[activeSite.id] || {
                weather: {
                  currentTemp: "26°C",
                  condition: "Soft Sunshine",
                  bestMonths: "October to March",
                  bestTimeOfDay: "9:00 AM - 5:00 PM"
                },
                facilities: {
                  restrooms: true,
                  water: true,
                  wifi: true,
                  parking: true,
                  accessibility: true,
                  ecoCharging: true
                },
                greenTips: "Walk or cycle inside the core perimeter of monuments to reduce harmful soot emissions near historic structures."
              };

              return (
                <div id="augmented-site-metadata-pills" className="bg-stone-50/80 border border-stone-200/60 rounded-2xl p-4 space-y-3 shadow-3xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-0.5 border-b border-stone-200/50 pb-2">
                    <div className="flex items-center gap-1.5">
                      <CloudSun className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-black text-stone-900 tracking-tight font-serif uppercase">
                        Spot Weather &amp; Amenities Directory
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-stone-500 font-extrabold uppercase tracking-widest bg-stone-100 px-1.5 py-0.5 rounded">
                      GPS: {activeSite.latitude.toFixed(4)}°, {activeSite.longitude.toFixed(4)}°
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* WEATHER INSIGHTS */}
                    <div className="bg-white border border-stone-200/50 p-3 rounded-xl space-y-2 hover:border-amber-300 transition duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold font-mono text-stone-400 uppercase tracking-wide">
                          Conditions & Hours
                        </span>
                        <span className="text-[11px] font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/25 font-mono">
                          ☀️ {meta.weather.currentTemp}
                        </span>
                      </div>
                      
                      <div className="space-y-1.5 text-stone-800 text-[10.5px]">
                        <p className="flex items-start gap-1 text-stone-600">
                          <span className="text-amber-700 font-black shrink-0">☁️ Sky:</span>
                          <span className="font-semibold">{meta.weather.condition}</span>
                        </p>
                        <p className="flex items-start gap-1 text-stone-600">
                          <span className="text-amber-700 font-black shrink-0">📅 Best Months:</span>
                          <span className="font-bold">{meta.weather.bestMonths}</span>
                        </p>
                        <p className="flex items-start gap-1 text-stone-600">
                          <span className="text-amber-700 font-black shrink-0">⏰ Ideal Hours:</span>
                          <span className="font-mono text-[9.5px] text-stone-800 bg-amber-50/80 px-1 py-0.5 rounded font-extrabold">
                            {meta.weather.bestTimeOfDay}
                          </span>
                        </p>
                      </div>

                      <button 
                        onClick={() => handleTryQuest("weather")}
                        className="w-full text-center text-[9.5px] font-black font-mono uppercase text-amber-700 hover:text-amber-900 pt-1.5 border-t border-dashed border-stone-100 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Forecast Logs</span>
                        {completedQuests.viewedWeather ? (
                          <span className="text-[8px] bg-green-100 text-green-700 px-1 py-0.5 rounded-md">Cleared (+15 XP)</span>
                        ) : (
                          <span className="text-[8px] bg-amber-100 text-amber-800 px-1 py-0.5 rounded-md animate-pulse">Unlock +15 EXP</span>
                        )}
                      </button>
                    </div>

                    {/* PUBLIC FACILITIES AUDIT */}
                    <div className="bg-white border border-stone-200/50 p-3 rounded-xl space-y-2 hover:border-emerald-300 transition duration-200">
                      <span className="text-[10px] font-extrabold font-mono text-stone-400 uppercase tracking-wide block">
                        Verified Amenities Checklist
                      </span>
                      
                      <div className="flex flex-wrap gap-1.5">
                        <span className={`inline-flex items-center gap-0.5 px-2 py-1 rounded text-[9.5px] font-extrabold ${meta.facilities.restrooms ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-stone-50 text-stone-400 line-through"}`}>
                          🚻 Restrooms
                        </span>
                        <span className={`inline-flex items-center gap-0.5 px-2 py-1 rounded text-[9.5px] font-extrabold ${meta.facilities.water ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-stone-50 text-stone-400 line-through"}`}>
                          💧 Water
                        </span>
                        <span className={`inline-flex items-center gap-0.5 px-2 py-1 rounded text-[9.5px] font-extrabold ${meta.facilities.parking ? "bg-emerald-50 text-emerald-750 border border-emerald-100" : "bg-stone-50 text-stone-400 line-through"}`}>
                          🚗 Parking
                        </span>
                        <span className={`inline-flex items-center gap-0.5 px-2 py-1 rounded text-[9.5px] font-extrabold ${meta.facilities.accessibility ? "bg-teal-50 text-teal-700 border border-teal-100" : "bg-stone-50 text-stone-400 line-through"}`}>
                          ♿ Accessibility
                        </span>
                        <span className={`inline-flex items-center gap-0.5 px-2 py-1 rounded text-[9.5px] font-extrabold ${meta.facilities.wifi ? "bg-purple-50 text-purple-700 border border-purple-100" : "bg-stone-50 text-stone-400 line-through"}`}>
                          📶 Free Wi-Fi
                        </span>
                        {meta.facilities.ecoCharging && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[9.5px] font-mono font-bold bg-amber-500 text-stone-950 border border-amber-300 animate-pulse-subtle">
                            ⚡ EV Hub
                          </span>
                        )}
                      </div>

                      <button 
                        onClick={() => handleTryQuest("facilities")}
                        className="w-full text-center text-[9.5px] font-black font-mono uppercase text-emerald-750 hover:text-emerald-900 pt-1.5 border-t border-dashed border-stone-100 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Amenities Check</span>
                        {completedQuests.viewedFacilities ? (
                          <span className="text-[8px] bg-green-100 text-green-700 px-1 py-0.5 rounded-md">Cleared (+15 EXP)</span>
                        ) : (
                          <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded-md animate-pulse">Unlock +15 EXP</span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* GREEN EMISSIONS ROAD TIP */}
                  <div className="bg-emerald-50/50 border border-emerald-150 rounded-xl p-3 flex items-start gap-2.5">
                    <div className="p-1 px-1.5 bg-emerald-100 rounded text-emerald-700 text-[10px] font-black shrink-0 font-mono tracking-wider">
                      GREEN PASS
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-900 leading-relaxed font-medium">
                        {meta.greenTips}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Main Interactive Stage viewport */}
            <div className="flex-1 flex flex-col justify-center min-h-[380px] bg-[#FCFBF9] border border-stone-200/50 rounded-2xl p-6 md:p-8">
              
              {/* STAGE 1: SCANNER */}
              {stage === "SCANNER" && (
                <div id="ux-state-scanner" className="space-y-6 max-w-md mx-auto w-full text-center">
                  <div className="mx-auto w-20 h-20 rounded-full bg-white border border-stone-200 flex items-center justify-center text-[#B8931F] shadow-sm relative">
                    <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-[#B8931F]/10 opacity-75"></span>
                    <Lock className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif text-stone-900 font-bold">Physical Geofence Gate</h3>
                    <p className="text-xs text-stone-600 leading-relaxed px-2">
                      To lock in this monument's history, you must be in person within <strong className="text-stone-900">100 meters</strong> of the site's GPS center.
                    </p>
                  </div>

                  {/* Proximity Card feedback */}
                  <div className="bg-white rounded-xl p-4 border border-stone-200 text-stone-800">
                    <div className="grid grid-cols-2 gap-4 divide-x divide-stone-100">
                      <div>
                        <span className="text-[9px] uppercase font-mono text-stone-500 block mb-1">Checked Distance</span>
                        <strong className={`text-base font-mono tracking-tight ${isNearby ? "text-green-600" : "text-[#B8931F]"}`}>
                          {Math.round(currentDistance)} meters
                        </strong>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-mono text-stone-500 block mb-1">Geofence Access</span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${isNearby ? "text-green-600" : "text-amber-600"}`}>
                          {isNearby ? "● Near Enough" : "● Outside Fence"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      id="btn-main-check"
                      onClick={handleCheckMyLocation}
                      className="w-full py-3.5 bg-[#B8931F] hover:bg-[#917112] text-white font-bold uppercase text-xs tracking-widest rounded-xl transition duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Unlock className="w-4 h-4" /> Verify My Proximity & Unlock
                    </button>
                    <p className="text-[10px] text-stone-400 mt-2 font-mono">
                      Checks against hardware GPS receiver
                    </p>
                  </div>
                </div>
              )}

              {/* STAGE 2: DISCOVERY */}
              {stage === "DISCOVERY" && (
                <div id="ux-state-discovery" className="space-y-6">
                  
                  {/* Timer Information */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-stone-200">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-bold text-[#B8931F] uppercase tracking-widest font-mono block">Phase 2: Historical Presence Verification</span>
                      <h3 className="text-xs text-stone-600">Please stay inside the limit lines:</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xl font-mono font-bold text-[#B8931F] bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                        {formatTime(discoveryProgress)}
                      </code>
                      <button 
                        onClick={() => setDiscoveryProgress(5)}
                        className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-850 transition duration-200 rounded-lg text-[10px] font-bold uppercase tracking-wider font-mono border border-stone-300 cursor-pointer"
                      >
                        ⚡ Fast Test Check
                      </button>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="relative w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#B8931F] transition-all duration-1000"
                      style={{ width: `${(discoveryProgress / 300) * 100}%` }}
                    ></div>
                  </div>

                  {/* Geofence Breach Block */}
                  {!isNearby ? (
                    <div className="p-6 bg-amber-50 border border-amber-300 rounded-xl text-center space-y-3 flex flex-col items-center">
                      <AlertTriangle className="w-8 h-8 text-amber-600 animate-bounce" />
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest font-mono">
                          TIMER PAUSED: Walked Too Far!
                        </h4>
                        <p className="text-xs text-stone-655 leading-relaxed max-w-md mx-auto">
                          You registered a distance of <strong className="text-stone-800">{Math.round(currentDistance)}m</strong>. Please return under <strong className="text-stone-800">100 meters</strong> from <strong>{activeSite.name}</strong> to resume.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs uppercase font-bold tracking-widest text-stone-500 border-l-2 border-[#B8931F] pl-2">
                          Did you know? (Official lore)
                        </h4>
                        <span className="text-[10px] font-mono text-stone-400 font-semibold">
                          ✦ Live Gemini-Vetted History
                        </span>
                      </div>

                      <div className="bg-white border border-stone-200 rounded-xl p-5 min-h-[140px] flex flex-col justify-center shadow-inner relative">
                        {isHistoryLoading ? (
                          <div className="flex flex-col items-center justify-center space-y-2 py-4">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8931F] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#B8931F]"></span>
                            </span>
                            <p className="text-[11px] text-stone-400 font-mono uppercase tracking-widest">
                              Retrieving Archives...
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-sm leading-relaxed text-stone-900 font-serif italic text-center px-2">
                              "{historyText || "Opening historical transcripts..."}"
                            </p>
                            <div className="text-[10px] font-mono text-stone-400 text-center uppercase tracking-wider">
                              📖 Scroll the side guide to search more about this monument.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STAGE 3: VOUCHER */}
              {stage === "VOUCHER" && (
                <div id="ux-state-voucher" className="space-y-6">
                  
                  {/* Visual Premium Gold Reward Card (Kept elegant and readable) */}
                  <div className="bg-gradient-to-br from-[#FCFBF4] via-amber-50 to-[#F2EADA] text-stone-900 rounded-2xl p-6 border-2 border-[#B8931F] space-y-5 shadow-md relative overflow-hidden">
                    
                    <div className="absolute top-0 right-0 p-2 bg-[#B8931F] text-white text-[9px] font-bold uppercase tracking-wider rounded-bl-xl font-mono">
                      VALID REWARDS PASS
                    </div>

                    <div className="flex justify-between items-start border-b border-stone-200 pb-3">
                      <div>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#B8931F] block">
                          Karnataka State Explorer Reward
                        </span>
                        <h3 className="font-serif text-base font-bold tracking-tight text-stone-900">
                          {activeSite.name}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2 bg-white/70 p-4 rounded-xl border border-stone-200">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500 block">EXCLUSIVE TOURIST OFFER:</span>
                      <h4 className="font-serif text-lg font-black text-[#B8931F] leading-tight flex items-center gap-1.5">
                        <Coffee className="w-5 h-5 shrink-0 text-[#B8931F]" /> {activeSite.recommendedMerchant.offer}
                      </h4>
                      <p className="text-xs text-stone-600">
                        📍 <strong>Merchant:</strong> {activeSite.recommendedMerchant.name} ({activeSite.recommendedMerchant.distance})
                      </p>
                    </div>

                    {/* Verified Historical Lore right on the Unlocked Reward! */}
                    <div className="space-y-2 bg-[#FCFBF8] p-4 rounded-xl border border-[#D4AF37]/20 shadow-inner">
                      <div className="flex justify-between items-center pb-1 border-b border-[#D4AF37]/10">
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#B8931F]">
                          📜 UNLOCKED GOLD LORE SUMMARY
                        </span>
                        <span className="text-[8px] font-mono text-stone-400 font-bold uppercase tracking-wider">
                          Verified Present
                        </span>
                      </div>
                      {isHistoryLoading ? (
                        <div className="py-2 text-center text-[10px] font-mono text-stone-400 animate-pulse uppercase tracking-widest">
                          Retrieving Archives...
                        </div>
                      ) : (
                        <p className="text-[11.5px] italic text-stone-700 leading-relaxed font-serif text-center px-1">
                          "{historyText || getCuratedStoryFallback(activeSite.name)}"
                        </p>
                      )}
                    </div>

                    {/* LIVE countdown ticket fuse */}
                    <div className="bg-white border border-stone-200 p-3.5 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wide text-stone-500 block mb-0.5">
                          Fraud protection live timer:
                        </span>
                        <code className="text-2xl font-mono font-black tracking-tight text-[#B8931F]">
                          {formatTime(voucherProgress)}
                        </code>
                      </div>
                      <div className="text-right">
                        {voucherProgress > 0 ? (
                          <span className="inline-flex px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase bg-stone-900 text-[#FAF9F6] tracking-wider animate-pulse">
                            LIVE REWARDS FUSE
                          </span>
                        ) : (
                          <span className="inline-flex px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase bg-red-100 text-red-700">
                            Expired
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons list */}
                    <div className="space-y-2.5">
                      {isAlreadyClaimed ? (
                        <div className="bg-green-100 text-green-800 p-3 rounded-xl font-bold uppercase text-xs tracking-wider text-center flex items-center justify-center gap-2 border border-green-200">
                          <CheckCircle2 className="w-4 h-4 text-green-700" /> Reward successfully claimed!
                        </div>
                      ) : voucherProgress === 0 ? (
                        <div className="bg-red-50 text-red-700 p-3 rounded-xl font-bold uppercase text-xs tracking-wider text-center border border-red-200">
                          ⏱️ Counter Expired (Visit again)
                        </div>
                      ) : (
                        <button
                          onClick={handleRedeemVoucher}
                          className="w-full py-3 bg-[#B8931F] hover:bg-[#917112] text-white font-bold uppercase text-xs tracking-widest rounded-xl transition duration-200 active:scale-95 shadow-sm cursor-pointer flex items-center justify-center gap-2"
                        >
                          Redeem Now (Claim in Person)
                        </button>
                      )}
                      <p className="text-[9px] text-center text-stone-500 font-medium">
                        Must press in front of staff. Static images or screenshot copies will not be honored.
                      </p>
                    </div>

                    {/* Promoted Cashback and Rewards Spin-Wheel link */}
                    <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-3 text-center space-y-1.5 animate-pulse-subtle">
                      <div className="flex items-center justify-center gap-1.5 text-emerald-700">
                        <Coins className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-black uppercase tracking-wide font-mono">Premium Cashback Spin!</span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-normal max-w-sm mx-auto">
                        Spent ₹{getMerchantMinPurchase(activeSite.id)}+ at <strong>{activeSite.recommendedMerchant.name}</strong>? Spin the Lucky Wheel for instant cashbacks and souvenirs!
                      </p>
                      <button 
                        onClick={() => {
                          setSelectedSpinMerchantId(activeSite.id);
                          setActiveTab("spin");
                        }}
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-850 hover:text-[#917112] underline decoration-solid transition-all cursor-pointer"
                      >
                        Launch Lucky Wheel <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                  {/* Standard backtrack */}
                  <button 
                    onClick={() => setStage("SCANNER")}
                    className="w-full text-center py-2.5 bg-white hover:bg-[#FCFBF9] text-stone-500 hover:text-stone-700 transition duration-200 text-xs font-mono uppercase tracking-widest rounded-xl border border-stone-200"
                  >
                    ← Back to Radar Scanner
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Quick steps tracker on bottom */}
          <div className="pt-4 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div className={`p-2.5 rounded-xl ${stage === "SCANNER" ? "bg-[#B8931F]/10 border border-[#B8931F]/30 text-[#B8931F]" : "bg-[#FCFBF9] text-stone-400"}`}>
              <span className="font-mono text-[9px] uppercase block font-extrabold">Step 1</span>
              <span className="font-medium truncate block">Radar Guard</span>
            </div>
            <div className={`p-2.5 rounded-xl ${stage === "DISCOVERY" ? "bg-[#B8931F]/10 border border-[#B8931F]/30 text-[#B8931F]" : "bg-[#FCFBF9] text-stone-400"}`}>
              <span className="font-mono text-[9px] uppercase block font-extrabold">Step 2</span>
              <span className="font-medium truncate block">5m Presence</span>
            </div>
            <div className={`p-2.5 rounded-xl ${stage === "VOUCHER" ? "bg-[#B8931F]/10 border border-[#B8931F]/30 text-[#B8931F]" : "bg-[#FCFBF9] text-stone-400"}`}>
              <span className="font-mono text-[9px] uppercase block font-extrabold">Step 3</span>
              <span className="font-medium truncate block">Claim Reward</span>
            </div>
          </div>

        </section>

        {/* RIGHT COLUMN: CHATBOT WIDGET, SIMULATION PANELS, RULES */}
        <section className="lg:col-span-5 flex flex-col justify-between bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
          
          <div className="flex flex-col h-full space-y-4">
            
            {/* Elegant tab selectors for side pane */}
            <div className="flex border-b border-stone-200 overflow-x-auto scrollbar-none shrink-0 gap-1 md:gap-2">
              <button
                onClick={() => setActiveTab("chatbot")}
                className={`pb-2.5 text-[10px] md:text-xs font-extrabold uppercase tracking-wide border-b-2 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-1.5 md:px-3 ${
                  activeTab === "chatbot"
                    ? "border-[#B8931F] text-[#B8931F] font-black"
                    : "border-transparent text-stone-450 hover:text-stone-750"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" /> Chat
              </button>
              <button
                onClick={() => setActiveTab("map")}
                className={`pb-2.5 text-[10px] md:text-xs font-extrabold uppercase tracking-wide border-b-2 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-1.5 md:px-3 ${
                  activeTab === "map"
                    ? "border-[#B8931F] text-[#B8931F] font-black"
                    : "border-transparent text-stone-450 hover:text-stone-750"
                }`}
              >
                <Map className="w-3.5 h-3.5 text-[#B8931F] shrink-0" /> Live Map
              </button>
              <button
                onClick={() => setActiveTab("spin")}
                className={`pb-2.5 text-[10px] md:text-xs font-extrabold uppercase tracking-wide border-b-2 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-1.5 md:px-3 ${
                  activeTab === "spin"
                    ? "border-emerald-600 text-emerald-700 font-black"
                    : "border-transparent text-stone-450 hover:text-stone-750"
                }`}
              >
                <Gift className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Spin Win
              </button>
              <button
                onClick={() => setActiveTab("simulation")}
                className={`pb-2.5 text-[10px] md:text-xs font-extrabold uppercase tracking-wide border-b-2 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-1.5 md:px-3 ${
                  activeTab === "simulation"
                    ? "border-[#B8931F] text-[#B8931F] font-black"
                    : "border-transparent text-stone-450 hover:text-stone-750"
                }`}
              >
                <Compass className="w-3.5 h-3.5 shrink-0" /> Simulator
              </button>
              <button
                onClick={() => setActiveTab("safety")}
                className={`pb-2.5 text-[10px] md:text-xs font-extrabold uppercase tracking-wide border-b-2 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-1.5 md:px-3 ${
                  activeTab === "safety"
                    ? "border-red-600 text-red-600 font-black"
                    : "border-transparent text-stone-450 hover:text-stone-750"
                }`}
              >
                <Shield className="w-3.5 h-3.5 shrink-0 text-red-500 animate-pulse" /> Safety Kit
              </button>
              <button
                onClick={() => setActiveTab("rules")}
                className={`pb-2.5 text-[10px] md:text-xs font-extrabold uppercase tracking-wide border-b-2 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-1.5 md:px-3 ${
                  activeTab === "rules"
                    ? "border-[#B8931F] text-[#B8931F] font-black"
                    : "border-transparent text-stone-450 hover:text-stone-750"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 shrink-0" /> Guide
              </button>
              <button
                onClick={() => setActiveTab("green-routes")}
                className={`pb-2.5 text-[10px] md:text-xs font-extrabold uppercase tracking-wide border-b-2 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-1.5 md:px-3 ${
                  activeTab === "green-routes"
                    ? "border-emerald-600 text-emerald-700 font-black"
                    : "border-transparent text-slate-450 hover:text-emerald-800"
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Green Trails
              </button>
              <button
                onClick={() => setActiveTab("explorer-badge")}
                className={`pb-2.5 text-[10px] md:text-xs font-extrabold uppercase tracking-wide border-b-2 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-1.5 md:px-3 ${
                  activeTab === "explorer-badge"
                    ? "border-amber-500 text-amber-600 font-black"
                    : "border-transparent text-slate-450 hover:text-amber-700"
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Explorer ({explorerPoints}p)
              </button>
            </div>

            {/* TAB 1: ROYAL AI CHATBOT (Delightfully simple user friendly design!) */}
            {activeTab === "chatbot" && (
              <div className="flex-1 flex flex-col min-h-[440px] justify-between space-y-4">
                
                {/* Intro status info inside chat window */}
                <div className="bg-[#FCFBF9] p-3 rounded-xl border border-stone-150 flex items-center gap-2.5">
                  <div className="p-1 text-white bg-[#B8931F] rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#B8931F] font-bold block">Historical AI Guardian</span>
                    <p className="text-[11px] text-stone-600">Locked to active monument: <strong>{activeSite.name}</strong></p>
                  </div>
                </div>

                {/* Dialog Bubble History */}
                <div className="flex-1 overflow-y-auto max-h-[300px] border border-stone-100 rounded-xl p-3 bg-[#FAF8F5] space-y-3 scrollbar-none">
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                    >
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#B8931F] text-white rounded-tr-none"
                          : "bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-xs"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-stone-400 font-mono mt-1 px-1">
                        {msg.role === "user" ? "You" : "Royal Guide"} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                  
                  {chatLoading && (
                    <div className="flex items-center gap-2 mr-auto bg-stone-100 p-3 rounded-2xl rounded-tl-none border border-stone-200 max-w-[80%]">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8931F] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B8931F]"></span>
                      </span>
                      <span className="text-[10px] font-mono text-stone-500">Drafting answer...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Highly user friendly chip suggestions (Zero typing needed!) */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest block">Quick Suggestions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => handleSendMessage(`What are the hidden secrets of ${activeSite.name}?`)}
                      className="text-[10px] px-2 py-1 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-lg transition text-left cursor-pointer font-medium"
                    >
                      ✦ Secrets of this site
                    </button>
                    <button
                      onClick={() => handleSendMessage("Where to find the best Mysore Masala Dosa?")}
                      className="text-[10px] px-2 py-1 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-lg transition text-left cursor-pointer font-medium"
                    >
                      🍴 Mysore Masala Dosa tips
                    </button>
                    <button
                      onClick={() => handleSendMessage("Tell me about Vidyavardhaka College (VVCE) engineering heritage")}
                      className="text-[10px] px-2 py-1 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-lg transition text-left cursor-pointer font-medium"
                    >
                      🎓 VVCE College story
                    </button>
                  </div>
                </div>

                {/* Text entry row */}
                <div className="relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about Mysore palaces, legends, or filter coffee spots..."
                    className="w-full bg-[#FCFBF9] border border-stone-250 rounded-xl py-3 pl-4 pr-12 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#B8931F] focus:ring-1 focus:ring-[#B8931F]"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#B8931F] hover:text-[#917112] transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* TAB: LIVE MAP & VOICE EXPLORATION */}
            {activeTab === "map" && (
              <InteractiveMap
                activeSite={activeSite}
                allSites={HERITAGE_SITES}
                onSelectSite={(index) => handleSiteSelect(index)}
                userLocation={userLocation}
                isNearby={isNearby}
              />
            )}

            {/* TAB 4: LUCKY REWARDS & CASHBACK SPIN-WHEEL */}
            {activeTab === "spin" && (
              <div id="ux-state-spinwheel" className="space-y-4 flex-1 flex flex-col justify-between min-h-[440px]">
                
                {/* Header Information */}
                <div className="bg-emerald-500/8 border border-emerald-500/15 p-3 rounded-xl">
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#B8931F] block">
                      Local Merchant Rewards
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Get extra cashback or premium snacks from authorized heritage partner shops after qualifying purchases!
                  </p>
                </div>

                {/* Validation Form */}
                <div className="bg-[#FCFBF9] border border-stone-200/60 p-4 rounded-xl space-y-3 shadow-xs">
                  
                  {/* Select Partner Shop */}
                  <div className="space-y-1">
                    <label htmlFor="spin-merchant-select" className="text-[10px] font-mono text-[#B8931F] uppercase tracking-wider block font-extrabold">
                      1. Select Partner Merchant:
                    </label>
                    <select
                      id="spin-merchant-select"
                      value={selectedSpinMerchantId}
                      onChange={(e) => {
                        setSelectedSpinMerchantId(e.target.value);
                        setSpinResult(null);
                        setWheelRotation(0);
                        setHasSpunCurrent(false);
                      }}
                      className="w-full bg-white border border-stone-250 py-2 px-3 rounded-lg text-xs leading-none text-stone-900 focus:outline-none focus:border-[#B8931F] cursor-pointer font-semibold shadow-2xs"
                    >
                      {HERITAGE_SITES.map((site) => (
                        <option key={site.id} value={site.id}>
                          {site.recommendedMerchant.name} ({site.name.split(" ")[0]})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pricing Threshold & Enter Receipt Bill Amount */}
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-between pt-1">
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <label htmlFor="receipt-bill-amt" className="text-[10px] font-mono text-[#B8931F] uppercase tracking-wider block font-extrabold">
                          2. Enter Bill Amount (₹):
                        </label>
                        <span className="text-[10.5px] font-mono text-[#B8931F] font-black">
                          Min purchase: ₹{getMerchantMinPurchase(selectedSpinMerchantId)}
                        </span>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500 leading-none">
                          ₹
                        </div>
                        <input
                          id="receipt-bill-amt"
                          type="number"
                          value={spinBillAmount}
                          onChange={(e) => {
                            setSpinBillAmount(e.target.value);
                            setHasSpunCurrent(false);
                            setSpinResult(null);
                            setWheelRotation(0);
                          }}
                          placeholder={`E.g., ${getMerchantMinPurchase(selectedSpinMerchantId) + 50}`}
                          className="w-full bg-white border border-stone-250 rounded-lg py-2.5 pl-7 pr-3 text-xs font-bold font-mono text-stone-900 placeholder-stone-300 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Verification Quick helper to auto fill purchase bills for demo evaluation */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="text-[10px] text-stone-405 leading-tight font-medium">No real bill receipt handy?</span>
                    <button
                      type="button"
                      onClick={() => {
                        const targetMin = getMerchantMinPurchase(selectedSpinMerchantId);
                        setSpinBillAmount(String(targetMin + Math.floor(Math.random() * 85) + 20));
                        setHasSpunCurrent(false);
                        setSpinResult(null);
                        setWheelRotation(0);
                      }}
                      className="text-[10.5px] font-extrabold text-[#B8931F] hover:text-[#917112] underline decoration-dotted transition cursor-pointer flex items-center gap-1 font-mono uppercase bg-stone-105 px-2 py-1 rounded-sm border border-stone-200"
                    >
                      ⚡ Auto Fill Demo Bill (₹{getMerchantMinPurchase(selectedSpinMerchantId) + 45})
                    </button>
                  </div>

                </div>

                {/* THE SPINNING WHEEL INTERACTIVE CANVAS SECTION */}
                <div className="py-2.5 flex flex-col items-center justify-center relative">
                  
                  {/* Dial Needle/Pointer positioned at the top of the wheel */}
                  <div className="absolute top-[8px] z-20 pointer-events-none flex flex-col items-center">
                    <div className="w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-t-[22px] border-t-red-600 filter drop-shadow-sm"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white -mt-2"></div>
                  </div>

                  {/* SVG Sector Wheel */}
                  <div className="relative p-1 bg-gradient-to-tr from-amber-600/35 to-yellow-350/20 rounded-full shadow-lg border-2 border-stone-100">
                    <svg 
                      viewBox="0 0 300 300" 
                      className="w-[195px] h-[195px] md:w-[230px] md:h-[230px] filter drop-shadow-sm select-none"
                    >
                      {/* Wheel Border Ring */}
                      <circle cx="150" cy="150" r="148" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="4" />
                      <circle cx="150" cy="150" r="142" fill="#FAF9F6" stroke="#D4AF37" strokeWidth="1" />
                      
                      {/* Group for wheel rotation */}
                      <g 
                        style={{ 
                          transform: `rotate(${wheelRotation}deg)`, 
                          transition: isSpinning ? 'transform 3.6s cubic-bezier(0.12, 0.85, 0.22, 1)' : 'transform 0.5s ease-out',
                          transformOrigin: '150px 150px' 
                        }}
                      >
                        {SPIN_REWARDS.map((reward, i) => {
                          const startAng = i * 60;
                          const endAng = (i + 1) * 60;
                          
                          // Draw Sector Wedge
                          const rad = Math.PI / 180;
                          const x1 = 150 + 138 * Math.cos(startAng * rad);
                          const y1 = 150 + 138 * Math.sin(startAng * rad);
                          const x2 = 150 + 138 * Math.cos(endAng * rad);
                          const y2 = 150 + 138 * Math.sin(endAng * rad);
                          const pathStr = `M 150 150 L ${x1} ${y1} A 138 138 0 0 1 ${x2} ${y2} Z`;

                          // Text translation coordinates
                          const labelAngle = startAng + 30;
                          const tx = 150 + 82 * Math.cos(labelAngle * rad);
                          const ty = 150 + 82 * Math.sin(labelAngle * rad);

                          // Short display labels to fit wedge constraints
                          const shortLabels = [
                            "₹50 Cash",
                            "Free Sweet",
                            "15% Cash",
                            "Samosa",
                            "₹30 Fuel",
                            "Royal Gift"
                          ];

                          return (
                            <g key={i}>
                              {/* Background color wedge */}
                              <path 
                                d={pathStr} 
                                fill={reward.color} 
                                stroke="#D4AF37" 
                                strokeWidth="1.5" 
                              />
                              
                              {/* Label rotated perfectly representing the slice */}
                              <text 
                                x={tx} 
                                y={ty + 3}
                                transform={`rotate(${labelAngle + 180}, ${tx}, ${ty})`}
                                textAnchor="middle" 
                                className="text-[10px] md:text-[11px] font-black font-sans fill-stone-900 tracking-tight select-none uppercase"
                              >
                                {shortLabels[i]}
                              </text>
                            </g>
                          );
                        })}

                        {/* Little decorative gold circles around the edge */}
                        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                          const rad = Math.PI / 180;
                          return (
                            <circle 
                              key={i} 
                              cx={150 + 138 * Math.cos(deg * rad)} 
                              cy={150 + 138 * Math.sin(deg * rad)} 
                              r="4.5" 
                              fill="#B8931F" 
                              stroke="#FFFFFF" 
                              strokeWidth="1" 
                            />
                          );
                        })}
                      </g>

                      {/* Center Golden Crown Button Cap Pin */}
                      <circle cx="150" cy="150" r="22" fill="#B8931F" stroke="#FFFFFF" strokeWidth="3" className="filter drop-shadow-xs" />
                      <circle cx="150" cy="150" r="16" fill="#FAF9F6" />
                      <path d="M 144 154 L 146 146 L 150 152 L 154 146 L 156 154 Z" fill="#B8931F" strokeWidth="1" />
                    </svg>
                  </div>

                  {/* Spin Actions Trigger */}
                  <div className="mt-4 w-full px-4">
                    {(() => {
                      const isNearbySelected = isNearby && (selectedSpinMerchantId === activeSite.id);
                      const isEnabled = !isSpinning && (spinBillAmount || isNearbySelected);
                      return (
                        <button
                          type="button"
                          disabled={!isEnabled}
                          onClick={handleSpinWheel}
                          className={`w-full py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition duration-250 ${
                            isSpinning 
                              ? "bg-amber-300 text-stone-600 cursor-not-allowed" 
                              : !isEnabled 
                                ? "bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300"
                                : isNearbySelected && !spinBillAmount
                                  ? "bg-gradient-to-r from-amber-500 to-[#B8931F] hover:from-amber-600 hover:to-[#917112] text-white font-black shadow-md cursor-pointer active:scale-97"
                                  : "bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-md cursor-pointer active:scale-97 hover:shadow-emerald-200"
                          }`}
                        >
                          {isSpinning ? (
                            <span className="flex items-center justify-center gap-1.5">
                              <RefreshCw className="w-4 h-4 animate-spin text-stone-705" /> Spinning Lucky Wheel...
                            </span>
                          ) : isNearbySelected && !spinBillAmount ? (
                            "🎁 Near Monument Bonus: Spin For Free!"
                          ) : (
                            "🎰 Spin Lucky Wheel"
                          )}
                        </button>
                      );
                    })()}
                  </div>

                </div>

                {/* VISUAL REWARD CELEBRATION BOX */}
                {spinResult && hasSpunCurrent && !isSpinning && (
                  <div className="bg-emerald-55 border-2 border-emerald-500/35 rounded-2xl p-4 text-stone-900 space-y-3 shadow-md animate-shimmer-subtle">
                    
                    <div className="flex justify-between items-start border-b border-emerald-500/15 pb-2">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-emerald-800 uppercase tracking-widest block">
                          Triumphant Win Logged!
                        </span>
                        <h4 className="font-serif text-sm font-black text-emerald-950 flex items-center gap-1 mt-0.5">
                          🎁 {spinResult.text}
                        </h4>
                      </div>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${spinResult.badgeBg} ${spinResult.badgeTextColor}`}>
                        {spinResult.type}
                      </span>
                    </div>

                    <div className="bg-white/90 p-3 rounded-xl border border-emerald-300/40 text-center space-y-1.5 relative overflow-hidden">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#B8931F] block">
                        CASHIER REDEMPTION CODE:
                      </span>
                      <code className="text-xl font-mono font-black tracking-wider text-stone-900 block bg-stone-50 py-1 rounded border border-stone-200 select-all">
                        {spinHistory[0]?.code || "MYS-CASH-WHEEL"}
                      </code>
                      <p className="text-[10px] text-stone-500 leading-tight">
                        Present this to staff during receipt settlement of ₹{spinHistory[0]?.billAmount} at <strong>{spinHistory[0]?.merchantName}</strong>. Code saved in rewards ledger!
                      </p>
                    </div>

                  </div>
                )}

                {/* EARNED CASHBACK LISTING / REWARDS LEDGER */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex justify-between items-center border-b border-stone-200 pb-1.5">
                    <span className="text-[10px] font-mono font-black text-[#B8931F] uppercase tracking-wider block">
                      📜 Your Cashback Wallet ({spinHistory.length})
                    </span>
                    {spinHistory.length > 0 && (
                      <button
                        onClick={() => {
                          if (window.confirm("Do you want to wipe your Cashback history? This deletes won vouchers.")) {
                            setSpinHistory([]);
                          }
                        }}
                        className="text-[9px] font-mono text-stone-400 hover:text-red-655 uppercase font-bold cursor-pointer transition-colors"
                      >
                        Wipe Ledger
                      </button>
                    )}
                  </div>

                  {spinHistory.length === 0 ? (
                    <div className="text-center py-4 bg-stone-50 rounded-xl border border-dotted border-stone-200 text-stone-400 text-[11px] font-mono">
                      No active cashbacks won yet. Go scan, buy local snacks, and spin!
                    </div>
                  ) : (
                    <div className="max-h-[145px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                      {spinHistory.map((item, idx) => (
                        <div key={idx} className="bg-white border border-stone-200 rounded-lg p-2.5 flex justify-between items-center text-xs shadow-3xs">
                          <div className="space-y-0.5">
                            <span className="text-[9.5px] font-mono text-stone-400 block">{item.timestamp}</span>
                            <div className="font-bold text-stone-900 leading-none">
                              {item.rewardEarned}
                            </div>
                            <span className="text-[10px] text-stone-505 block font-medium">
                              📍 {item.merchantName} (Bill: ₹{item.billAmount})
                            </span>
                          </div>
                          <div className="text-right">
                            <code className="text-[11px] font-mono font-bold bg-[#B8931F]/10 text-[#B8931F] px-1.5 py-0.5 rounded border border-[#B8931F]/20">
                              {item.code}
                            </code>
                            <span className="text-[8px] font-mono text-stone-400 block mt-1">Receipt: {item.receiptId}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 2: SIMULATOR & COORDINATE CONTROLS */}
            {activeTab === "simulation" && (
              <div className="space-y-4">
                
                {/* Simulator header */}
                <div className="bg-[#FAF9F6] p-3 rounded-xl border border-stone-150">
                  <span className="text-[10px] font-mono font-bold text-[#B8931F] uppercase block mb-0.5">GPS Hardware Emulator</span>
                  <p className="text-xs text-stone-600">Simulate physical distances to explore the stage states easily.</p>
                </div>

                {/* Preset choices */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-stone-700 block uppercase tracking-wider font-mono">1. Choose Simulated Proximity</span>
                  
                  <div className="grid grid-cols-1 gap-2">
                    
                    <button
                      onClick={() => setSimulatedDistancePreset("close")}
                      className={`p-3 rounded-lg text-left border flex items-center justify-between transition-all duration-200 ${
                        simulatedDistancePreset === "close"
                          ? "bg-[#B8931F]/10 border-[#B8931F] text-stone-900 font-bold"
                          : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono uppercase block font-semibold text-stone-500">Preset A: Inside Gate</span>
                        <span className="text-xs">Perfectly close enough (Stand at 15 meters)</span>
                      </div>
                      <span className="text-sm font-mono text-green-700 bg-green-100 px-2 py-0.5 rounded font-bold">15m</span>
                    </button>

                    <button
                      onClick={() => setSimulatedDistancePreset("away")}
                      className={`p-3 rounded-lg text-left border flex items-center justify-between transition-all duration-200 ${
                        simulatedDistancePreset === "away"
                          ? "bg-amber-50 border-amber-500 text-stone-900 font-bold"
                          : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono uppercase block font-semibold text-stone-500">Preset B: Walked Outside Fence</span>
                        <span className="text-xs">Forces the presence stopwatch to pause</span>
                      </div>
                      <span className="text-sm font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">120m</span>
                    </button>

                    <button
                      onClick={() => setSimulatedDistancePreset("far")}
                      className={`p-3 rounded-lg text-left border flex items-center justify-between transition-all duration-200 ${
                        simulatedDistancePreset === "far"
                          ? "bg-red-50 border-red-300 text-stone-900 font-bold"
                          : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono uppercase block font-semibold text-stone-500">Preset C: Other Side of City</span>
                        <span className="text-xs">Firmly denies entry to monument lore phase</span>
                      </div>
                      <span className="text-sm font-mono text-red-700 bg-red-100 px-2 py-0.5 rounded font-bold">2.5km</span>
                    </button>

                  </div>
                </div>

                {/* Coordinate table metadata */}
                <div className="bg-[#FCFBF9] rounded-xl p-4 border border-stone-150 space-y-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#B8931F] block">Live Location Coordinates</span>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-stone-400 block font-mono text-[9px] uppercase">Active Target:</span>
                      <code className="text-stone-850 font-bold font-mono">{activeSite.latitude.toFixed(4)}, {activeSite.longitude.toFixed(4)}</code>
                    </div>
                    <div>
                      <span className="text-stone-400 block font-mono text-[9px] uppercase">Your Position:</span>
                      <code className="text-[#B8931F] font-bold font-mono">{userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}</code>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-stone-200 flex justify-between items-center">
                    <div className="space-y-0.5">
                      <span className="text-xs text-stone-800 font-semibold block">Browser Chip Lock</span>
                      <p className="text-[10px] text-stone-400 leading-tight">Syncs real GPS on foot</p>
                    </div>
                    <button
                      onClick={() => {
                        setUseSimulation(!useSimulation);
                        setRealGPSEnabled(useSimulation);
                      }}
                      className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border transition ${
                        !useSimulation 
                          ? "bg-green-100 border-green-400 text-green-800" 
                          : "bg-white border-stone-250 text-stone-500 font-bold"
                      }`}
                    >
                      {!useSimulation ? "REAL LIVE GPS" : "SIMULATED"}
                    </button>
                  </div>

                  {gpsError && !useSimulation && (
                    <div className="text-[10px] text-red-600 bg-red-50 p-2 rounded-lg border border-red-100 font-mono mt-1">
                      {gpsError}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB: LOCATION TRACK SAFETY KIT */}
            {activeTab === "safety" && (
              <div id="ux-state-safety" className="space-y-4">
                
                {/* Status indicator */}
                <div className="bg-red-50 border border-red-200/80 rounded-2xl p-4 space-y-2.5 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                      <span className="font-mono text-xs font-black uppercase text-red-600 tracking-wide">
                        Live Tracking Core Active
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded uppercase">
                      Local Threat Rated
                    </span>
                  </div>

                  {/* Active Site Threat Intelligence */}
                  {(() => {
                    const tipData = getSafetyTipForSite(activeSite.id);
                    return (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-stone-500">Current Site Context:</span>
                          <strong className="text-stone-800">{activeSite.name}</strong>
                        </div>
                        <div className="flex justify-between items-center text-xs pb-1.5 border-b border-red-100/50">
                          <span className="text-stone-500">Local Area Assessment:</span>
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono uppercase cursor-default ${tipData.colorClass}`}>
                            {tipData.threatLevel}
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-stone-650 italic font-serif">
                          "⚠️ {tipData.tip}"
                        </p>
                      </div>
                    );
                  })()}
                </div>

                {/* Simulated Siren Alternator & Audio trigger */}
                <div className="bg-white border border-stone-200 rounded-2xl p-4.5 space-y-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-rose-700 flex items-center gap-1.5 font-mono">
                        <Volume2 className="w-4 h-4 text-red-500 flex-shrink-0" /> Web Audio Siren Deterrent
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Sounds a high-decibel modulating acoustic alert to ward off threat scenarios, stray wildlife, or summon nearby physical assistance.
                      </p>
                    </div>
                    <button
                      onClick={toggleSiren}
                      className={`font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-lg border transition duration-200 cursor-pointer shrink-0 ${
                        isSirenActive
                          ? "bg-red-600 border-red-700 text-white font-black animate-bounce shadow-md hover:bg-red-700"
                          : "bg-stone-50 border-stone-250 text-stone-600 hover:bg-stone-100"
                      }`}
                    >
                      {isSirenActive ? "STOP SIREN" : "START SIREN"}
                    </button>
                  </div>

                  {/* Siren audio pulsing banner when playing */}
                  {isSirenActive && (
                    <div className="bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-white rounded-xl p-3.5 flex items-center justify-between text-xs animate-pulse">
                      <span className="font-mono font-extrabold uppercase tracking-widest text-[9px]">
                        🔊 SIREN AUDIO OSCILLATING ACTIVE...
                      </span>
                      <span className="font-mono text-[8px] tracking-tight bg-black/25 px-2 py-1 rounded">
                        880Hz ⇌ 1055Hz Sweepers
                      </span>
                    </div>
                  )}

                  {/* SOS COPY MESSAGE CONTAINER */}
                  <div className="pt-3 border-t border-stone-100 space-y-3">
                    <button
                      type="button"
                      onClick={handleBroadcastSOS}
                      className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-200 active:scale-97 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Bell className="w-3.5 h-3.5 animate-bounce text-white" />
                      🚨 Broadcast SOS Telemetry Links
                    </button>

                    {sosAlertCopied ? (
                      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-emerald-800 text-center animate-pulse">
                        <p className="text-[11px] font-medium flex items-center justify-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <strong>SOS SMS Link Copied!</strong> Simulated temporary beacon fired.
                        </p>
                        <p className="text-[9px] text-emerald-600 mt-1 font-mono uppercase tracking-wide">
                          Pasted on clipboard! Send to your emergency contacts or WhatsApp group.
                        </p>
                      </div>
                    ) : (
                      <p className="text-[10px] text-stone-400 text-center font-mono uppercase">
                        Copies coordinates link and sounds a brief physical distress chirp
                      </p>
                    )}
                  </div>
                </div>

                {/* Safe Walk Sentinel Beacon (Stopwatch Timer checking) */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-stone-800 font-mono">
                        Safe Walk Sentinel Timer
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Walking alone in quiet lanes? Set a security countdown interval. If you do not safely check-in before it reaches zero, sirens instantly deploy!
                      </p>
                    </div>
                    {isSafeWalkActive && (
                      <span className="text-xs font-bold px-2 py-0.5 bg-red-100 text-red-700 border border-red-200 rounded-full animate-pulse uppercase tracking-wider font-mono">
                        Active Watch
                      </span>
                    )}
                  </div>

                  {isSafeWalkActive ? (
                    <div className="bg-white border border-stone-200 rounded-xl p-3.5 text-center space-y-3.5">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-stone-400 uppercase block font-semibold">
                          Time Left Until Automated Siren Safety Breach
                        </span>
                        <div className="text-2xl md:text-3xl font-mono font-black text-red-600 tracking-tight animate-pulse space-x-1">
                          <span>{Math.floor(safeWalkSecondsLeft / 60)}</span>
                          <span className="text-stone-300 font-normal">:</span>
                          <span>{String(safeWalkSecondsLeft % 60).padStart(2, '0')}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleStartSafeWalk(safeWalkDuration)}
                          className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-mono font-extrabold uppercase rounded-lg border border-stone-300/40 cursor-pointer"
                        >
                          Reset Timer
                        </button>
                        <button
                          type="button"
                          onClick={handleStopSafeWalk}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-lg shadow-md cursor-pointer"
                        >
                          ✓ Safely Check-In
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-stone-500 uppercase block font-semibold">
                        Choose Watch Interval Duration:
                      </span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[1, 3, 5, 15].map((mins) => (
                          <button
                            key={mins}
                            type="button"
                            onClick={() => handleStartSafeWalk(mins)}
                            className="py-1.5 px-2 bg-white hover:bg-stone-100 border border-stone-200 text-stone-750 text-xs font-mono font-extrabold rounded-lg transition cursor-pointer"
                          >
                            {mins} Min{mins > 1 ? "s" : ""}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Safe Guardians Registry Panel */}
                <div className="bg-white border border-stone-200 rounded-2xl p-4.5 space-y-3.5 shadow-sm">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-stone-800 font-mono">
                      Safe Guardians & SOS Contacts
                    </h3>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Emergency contacts synchronized to receive emergency physical details.
                    </p>
                  </div>

                  {/* Add Guardian Mini Form */}
                  <form onSubmit={addGuardian} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Name/Relation"
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      className="p-2 border border-stone-250 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      required
                      placeholder="phone or text line"
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(e.target.value)}
                      className="p-2 border border-stone-250 rounded-lg text-xs font-mono"
                    />
                    <button
                      type="submit"
                      className="py-2 px-3 bg-stone-900 text-white text-xs font-bold uppercase rounded-lg hover:bg-stone-800 transition cursor-pointer"
                    >
                      + Save Contact
                    </button>
                  </form>

                  {/* Guardians Checklist */}
                  <div className="space-y-1.5 pt-1.5">
                    {guardians.map((g) => (
                      <div
                        key={g.id}
                        className="p-2.5 rounded-lg border border-stone-150 flex items-center justify-between text-xs bg-stone-50/50"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-stone-800">{g.name}</span>
                            {g.isPreset && (
                              <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest font-bold border border-stone-250 bg-white px-1.5 rounded">
                                Official
                              </span>
                            )}
                          </div>
                          <code className="text-[10px] text-stone-500 font-mono block">{g.phone}</code>
                        </div>

                        <div className="flex gap-1.5 items-center">
                          <button
                            type="button"
                            onClick={() => setActiveCallingContact({ name: g.name, phone: g.phone })}
                            className="p-1 px-2.5 rounded bg-amber-500 hover:bg-amber-600 text-white font-mono text-[9px] font-extrabold uppercase tracking-wider cursor-pointer"
                          >
                            Call Support
                          </button>

                          {!g.isPreset && (
                            <button
                              type="button"
                              onClick={() => removeGuardian(g.id)}
                              className="p-1.5 rounded hover:bg-red-50 text-red-600 transition cursor-pointer"
                              title="Delete contact"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: GUIDEBOOK CHRONICLES */}
            {activeTab === "rules" && (
              <div className="space-y-3.5 text-xs text-stone-700">
                <div className="bg-[#FAF9F6] p-3 rounded-xl border border-stone-150 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#B8931F]" />
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#B8931F]">Rewards Rules Guidebook</span>
                </div>

                <div className="space-y-3 pl-1">
                  <div className="space-y-1">
                    <h4 className="font-bold text-stone-900 flex items-center gap-1">
                      <span className="text-[#B8931F]">1.</span> Locked Gate Scanner
                    </h4>
                    <p className="text-[11px] leading-relaxed text-stone-600">
                      Merchants sponsor delicious free filter coffee & local buttery dosas. To verify that users actually visit, the scanner enforces a 100m geofence.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-stone-900 flex items-center gap-1">
                      <span className="text-[#B8931F]">2.</span> 5-Minute Presence Proof
                    </h4>
                    <p className="text-[11px] leading-relaxed text-stone-600">
                      Drive-by fraud is avoided by requiring a 5-minute educational presence. The AI Companion showcases unique story logs while you stay. If you step outside the limits, the stopwatch automatically freezes.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-stone-900 flex items-center gap-1">
                      <span className="text-[#B8931F]">3.</span> Anti-Screenshot Burning Fuse
                    </h4>
                    <p className="text-[11px] leading-relaxed text-stone-600">
                      Once unlocked, the digital reward pass reveals a live 120-second dynamic countdown. Cafés will check the countdown to prevent users from sharing screenshots on WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: GREEN MYSORE ROUTES */}
            {activeTab === "green-routes" && (
              <div className="flex-1 overflow-y-auto pr-1">
                <GreenMysoreRoutes
                  heritageSites={HERITAGE_SITES}
                  activeSite={activeSite}
                  onSelectSiteById={(id) => {
                    const idx = HERITAGE_SITES.findIndex(s => s.id === id);
                    if (idx !== -1) {
                      handleSiteSelect(idx);
                    }
                  }}
                />
              </div>
            )}

            {/* TAB: MYSORE EXPLORER BADGE GAMIFICATION */}
            {activeTab === "explorer-badge" && (
              <div className="flex-1 overflow-y-auto pr-1">
                <MysoreExplorerBadge
                  explorerPoints={explorerPoints}
                  completedQuests={completedQuests}
                  onTryQuest={handleTryQuest}
                />
              </div>
            )}

          </div>

          {/* Persistent security registry block */}
          <div className="pt-4 mt-6 border-t border-stone-100 text-[10px] font-mono text-stone-500 text-center flex flex-col gap-1 inline-block">
            <span>🛡️ Claims logged in secure local registry</span>
            <span>Program ID: 2026-MYS-REWARDS-SECURE</span>
          </div>

        </section>

      </main>

      {/* Simplified, Professional Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span>REWARDS FRAMEWORK: SECURED</span>
          </div>
          <div className="flex gap-4 uppercase font-bold text-[#B8931F]">
            <span>© 2026 Mysuru City Council</span>
            <span>•</span>
            <span>Karnataka Tourism Alliance</span>
          </div>
        </div>
      </footer>

      {/* Interactive Active Dispatch Emergency Call Overlay */}
      {activeCallingContact && (
        <div id="calling-modal" className="fixed inset-0 bg-stone-900/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] text-white w-full max-w-sm rounded-[32px] p-6 text-center space-y-8 shadow-2xl border border-stone-800">
            
            {/* Status light */}
            <div className="space-y-2 pt-6">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-450 border border-emerald-400/20 text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full animate-pulse">
                🛡️ Local Emergency Dispatch Uplink
              </span>
              <h2 className="text-xl font-bold tracking-tight text-white">{activeCallingContact.name}</h2>
              <code className="text-sm font-mono text-stone-400 block tracking-widest">{activeCallingContact.phone}</code>
            </div>

            {/* Simulated Caller Interface */}
            <div className="py-6 flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 bg-stone-800 rounded-full flex items-center justify-center shadow-inner relative z-10 border border-stone-750 animate-pulse">
                  <Phone className="w-8 h-8 text-emerald-400 transform rotate-[135deg]" />
                </div>
                <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#B8931F] font-bold mt-2">
                Simulating Connection...
              </span>
              <p className="text-xs text-stone-400 px-6 max-w-xs leading-relaxed">
                We are routing your current live location coordinate payload <strong>[{userLocation.latitude.toFixed(5)}, {userLocation.longitude.toFixed(5)}]</strong> to the regional responder.
              </p>
            </div>

            {/* Call Control Tools */}
            <div className="pt-2 pb-4">
              <button
                type="button"
                onClick={() => setActiveCallingContact(null)}
                className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all duration-200 mx-auto cursor-pointer"
                title="Hang Up"
              >
                <Phone className="w-6 h-6 transform rotate-[135deg]" />
              </button>
              <span className="text-[9px] font-mono uppercase font-black tracking-wider text-red-500 mt-2 block">
                End Call
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
