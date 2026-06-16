import { HeritageSite } from "../types";

export interface WeatherData {
  currentTemp: string;
  condition: string;
  bestMonths: string;
  bestTimeOfDay: string;
}

export interface FacilitiesData {
  restrooms: boolean;
  water: boolean;
  wifi: boolean;
  parking: boolean;
  accessibility: boolean;
  ecoCharging?: boolean; // EV Charging availability
}

export interface GreenRoute {
  id: string;
  name: string;
  duration: string;
  co2Saved: string; // approximate comparison to using a petrol car
  transportMode: "Bicycle / Cycle Shared" | "Walking Trail" | "Electric Auto / Scooter";
  desc: string;
  stops: string[];
}

export const AUGMENTED_SITE_DATA: Record<string, {
  weather: WeatherData;
  facilities: FacilitiesData;
  greenTips: string;
}> = {
  amba_vilas: {
    weather: {
      currentTemp: "28°C",
      condition: "Partly Cloudy",
      bestMonths: "October to March (Dussehra season is gorgeous)",
      bestTimeOfDay: "5:30 PM - 7:30 PM (To watch the golden illumination)"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: true,
      parking: true,
      accessibility: true,
      ecoCharging: true
    },
    greenTips: "Rent a Trinity Shared Green Cycle from the South Gate compound stand to traverse the vast courtyard grounds with zero footprint."
  },
  jaganmohan: {
    weather: {
      currentTemp: "27°C",
      condition: "Clear Sky",
      bestMonths: "September to April",
      bestTimeOfDay: "10:30 AM - 1:00 PM (Best natural gallery illumination)"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: false,
      parking: true,
      accessibility: true,
      ecoCharging: false
    },
    greenTips: "Located deep in town. Walk along the heritage brick footpath axis from Mysore Palace rather than taking gasoline auto-rickshaws."
  },
  lalitha_mahal: {
    weather: {
      currentTemp: "26°C",
      condition: "Mild Breeze",
      bestMonths: "November to February",
      bestTimeOfDay: "4:00 PM - 6:30 PM (Sunset tea reflection hours)"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: true,
      parking: true,
      accessibility: true,
      ecoCharging: true
    },
    greenTips: "Utilize the modern solar EV shuttle buggy service from the main gate archways up to the white pillared porch."
  },
  chamundi_nandi: {
    weather: {
      currentTemp: "24°C",
      condition: "Cool Hill Wind",
      bestMonths: "August to January",
      bestTimeOfDay: "6:00 AM - 8:30 AM (Morning mystical dew trail)"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: false,
      parking: true,
      accessibility: false,
      ecoCharging: false
    },
    greenTips: "Part of the green forest sanctuary. Strictly carry non-plastic bottles and drop all seed pods in green organic recycling bins."
  },
  st_philomena: {
    weather: {
      currentTemp: "28°C",
      condition: "Clear",
      bestMonths: "All Year (St. Philomena feast in August is grand)",
      bestTimeOfDay: "2:00 PM - 4:30 PM (Light casting through vintage symmetric glass windows)"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: false,
      parking: true,
      accessibility: true,
      ecoCharging: false
    },
    greenTips: "Preserved heritage zone. Switch off all dynamic camera flashes and mobile haptics to protect the neo-Gothic sanctuary vibe."
  },
  chamundi_hill: {
    weather: {
      currentTemp: "23°C",
      condition: "Mist Covered",
      bestMonths: "September to February",
      bestTimeOfDay: "5:00 AM - 7:00 AM or 6:00 PM - 8:00 PM"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: false,
      parking: true,
      accessibility: true,
      ecoCharging: true
    },
    greenTips: "Join the 'Clean Chamundi Step Initiative'. Avoid single-use disposable cups. Choose the 1008 structural walking steps."
  },
  mysore_zoo: {
    weather: {
      currentTemp: "29°C",
      condition: "Sunny Shade",
      bestMonths: "June to January (Post-monsoon canopy is lush)",
      bestTimeOfDay: "8:30 AM - 11:30 AM (Active animal breakfast hours)"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: true,
      parking: true,
      accessibility: true,
      ecoCharging: true
    },
    greenTips: "Completely plastic-free ecosystem. Electric multi-passenger carts are available inside. Bring rechargeable batteries."
  },
  karanji_lake: {
    weather: {
      currentTemp: "25°C",
      condition: "Lush Swampland Breeze",
      bestMonths: "October to May",
      bestTimeOfDay: "4:00 PM - 6:30 PM (To capture egret and migratory heron nesting arrays)"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: false,
      parking: true,
      accessibility: true,
      ecoCharging: false
    },
    greenTips: "Silent boat rowing is prioritized. Maintain low-decibel speaking tones so nesting migratory birds remain untroubled."
  },
  kukkarahalli_lake: {
    weather: {
      currentTemp: "24°C",
      condition: "Fresh Wetlands",
      bestMonths: "All Year Around",
      bestTimeOfDay: "6:00 AM - 8:00 AM (Sunrise walking runs)"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: false,
      parking: true,
      accessibility: true,
      ecoCharging: false
    },
    greenTips: "No motorized traffic allowed within 100 meters of the bank borders. Safe bicycle locks are set up at the principal entry arches."
  },
  devaraja_market: {
    weather: {
      currentTemp: "30°C",
      condition: "Bustling Air",
      bestMonths: "All Year (A vibrant harvest vibe on festivals)",
      bestTimeOfDay: "9:00 AM - 12:00 PM or 5:00 PM - 8:00 PM"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: false,
      parking: true,
      accessibility: false,
      ecoCharging: false
    },
    greenTips: "Purchase a local woven banana-fiber or organic cotton bag before entering to avoid requesting plastic covers from spice makers."
  },
  chamundi_hairpin: {
    weather: {
      currentTemp: "23°C",
      condition: "Cool Uplift Wind",
      bestMonths: "October to January",
      bestTimeOfDay: "6:30 PM - 9:00 PM (To overlook the glowing city lines)"
    },
    facilities: {
      restrooms: false,
      water: false,
      wifi: false,
      parking: true,
      accessibility: false,
      ecoCharging: false
    },
    greenTips: "Quiet scooter zone. Shut down idle combustion motors while parking at viewpoint shoulders to preserve mountain floral health."
  },
  windflower_resort: {
    weather: {
      currentTemp: "26°C",
      condition: "Gentle Wind",
      bestMonths: "All Year",
      bestTimeOfDay: "3:00 PM - 6:00 PM"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: true,
      parking: true,
      accessibility: true,
      ecoCharging: true
    },
    greenTips: "Solar-heated pools and organic herbal compost gardens. Book treatments that utilize hand-pressed garden botanicals."
  },
  lingambudhi_forest_park: {
    weather: {
      currentTemp: "25°C",
      condition: "Bamboo Canopy shade",
      bestMonths: "September to April",
      bestTimeOfDay: "4:30 PM - 6:00 PM (When the bamboo forest turns golden)"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: false,
      parking: true,
      accessibility: true,
      ecoCharging: false
    },
    greenTips: "The massive botanical bamboo preserve absorbs 4x more carbon than normal woods. Walk soft and keep to designated soil walkways."
  },
  mall_of_mysore: {
    weather: {
      currentTemp: "21°C",
      condition: "Air Conditioned",
      bestMonths: "All Year",
      bestTimeOfDay: "11:00 AM - 9:30 PM"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: true,
      parking: true,
      accessibility: true,
      ecoCharging: true
    },
    greenTips: "The structure utilizes rooftop solar panels for lobby lighting. Recycle single-use plastic cups into central composting portals."
  },
  maharaja_food_street: {
    weather: {
      currentTemp: "28°C",
      condition: "Aromatic Warm",
      bestMonths: "All Year Around",
      bestTimeOfDay: "6:30 PM - 10:00 PM (Bustling street glow)"
    },
    facilities: {
      restrooms: false,
      water: false,
      wifi: false,
      parking: true,
      accessibility: true,
      ecoCharging: false
    },
    greenTips: "Food vendors serve on biodegradable areca nut plates and eco-friendly banana leaves. Dispose of plates in compost bins."
  },
  chamundi_backtrail_offroad: {
    weather: {
      currentTemp: "24°C",
      condition: "Dusty Foothill Breeze",
      bestMonths: "August to February",
      bestTimeOfDay: "6:30 AM - 9:30 AM (For optimal hiking traction)"
    },
    facilities: {
      restrooms: false,
      water: false,
      wifi: false,
      parking: true,
      accessibility: false,
      ecoCharging: false
    },
    greenTips: "Strictly leave-no-trace terrain. Mountain bike circuits run here; support the trail repairs by keeping tires on path lines."
  },
  grs_fantasy_park: {
    weather: {
      currentTemp: "29°C",
      condition: "Bright Sun",
      bestMonths: "March to August (Summer splash is absolute peak)",
      bestTimeOfDay: "10:30 AM - 4:00 PM (Optimal water heat balance)"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: true,
      parking: true,
      accessibility: true,
      ecoCharging: true
    },
    greenTips: "GRS employs an advanced closed-loop 100% recycling water filtration station, keeping environmental wastage to near zero."
  },
  st_philomena_gothic_viewpoint: {
    weather: {
      currentTemp: "27°C",
      condition: "Shaded Spires",
      bestMonths: "All Year Around",
      bestTimeOfDay: "4:45 PM - 6:15 PM"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: false,
      parking: true,
      accessibility: true,
      ecoCharging: false
    },
    greenTips: "Symmetric cobblestone lane with very low traffic noise. Perfect place to sit on the brick ledge and sketch rather than idle motors."
  },
  old_house_pizza: {
    weather: {
      currentTemp: "26°C",
      condition: "Warm Garden Glow",
      bestMonths: "All Year Around",
      bestTimeOfDay: "7:00 PM - 9:30 PM (Fairy-lights garden shine)"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: true,
      parking: true,
      accessibility: true,
      ecoCharging: false
    },
    greenTips: "100% locally sourced organic sourdough flours and wood ash compost program. Supports regional smallholder dairy farmers."
  },
  depot_18_cafe: {
    weather: {
      currentTemp: "25°C",
      condition: "Cozy Indoor Air",
      bestMonths: "All Year Around",
      bestTimeOfDay: "1:00 PM - 5:00 PM (Indie reading & writing escape)"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: true,
      parking: true,
      accessibility: true,
      ecoCharging: false
    },
    greenTips: "Boasts a highly beloved second-hand book donations network. Hand over an old paperback to receive eco bookmarks."
  },
  mylari_hotel: {
    weather: {
      currentTemp: "29°C",
      condition: "Warm Kitchen Comfort",
      bestMonths: "All Year Around",
      bestTimeOfDay: "7:30 AM - 10:30 AM (Hot morning butter dosa peak)"
    },
    facilities: {
      restrooms: false,
      water: true,
      wifi: false,
      parking: false,
      accessibility: true,
      ecoCharging: false
    },
    greenTips: "Extremely short supply chain—all fresh butter is gathered daily from local cooperative cow farms under 4km away."
  },
  sandalwood_crafts: {
    weather: {
      currentTemp: "28°C",
      condition: "Aromatic Wood Scent",
      bestMonths: "All Year",
      bestTimeOfDay: "10:00 AM - 1:00 PM"
    },
    facilities: {
      restrooms: false,
      water: true,
      wifi: false,
      parking: false,
      accessibility: true,
      ecoCharging: false
    },
    greenTips: "All raw sandalwood is ethically sourced from certified government-regulated high-reforestation program nurseries."
  },
  radisson_blu_hotel: {
    weather: {
      currentTemp: "25°C",
      condition: "Refreshed Pool Air",
      bestMonths: "October to April",
      bestTimeOfDay: "6:00 PM - 8:30 PM (Sunset over the hills backdrop)"
    },
    facilities: {
      restrooms: true,
      water: true,
      wifi: true,
      parking: true,
      accessibility: true,
      ecoCharging: true
    },
    greenTips: "Certified eco-green building utilizing architectural water harvest wells and low-energy smart cooling grids."
  }
};

export const GREEN_MYSORE_ROUTES: GreenRoute[] = [
  {
    id: "route_palaces_cycling",
    name: "Green Royal Heritage Cycling Circuit",
    duration: "2 - 3 Hours",
    co2Saved: "3.2 kg CO₂",
    transportMode: "Bicycle / Cycle Shared",
    desc: "A breathtaking high-visibility route connecting Mysore's royal focal points. Follow designated bicycle lanes under magnificent mahogany avenues, bypassing heavy municipal traffic hubs.",
    stops: ["Amba Vilas Palace", "Jaganmohan Palace Gallery", "Lalitha Mahal Palace"]
  },
  {
    id: "route_canopy_nature",
    name: "Lake & Nature Canopy Eco-Trail",
    duration: "3 - 4 Hours",
    co2Saved: "4.8 kg CO₂",
    transportMode: "Electric Auto / Scooter",
    desc: "This route links Mysore's crucial wildlife and wetland bird sanctuaries. Run entirely on zero-emission transport modes to prevent engine noise and localized exhaust gases from reaching nesting grounds.",
    stops: ["Karanji Lake Reserve", "Kukkarahalli Wetlands", "Lingambudhi Forest Park"]
  },
  {
    id: "route_devotional_walk",
    name: "Historic Devotional Heritage Walking Trail",
    duration: "1.5 - 2 Hours",
    co2Saved: "1.9 kg CO₂",
    transportMode: "Walking Trail",
    desc: "A fully pedestrianized sidewalk-first walking circuit exploring centuries of religious architecture, ending with a gorgeous Gothic vantage spot. Clean, slow, and deep travel at its best.",
    stops: ["Devaraja Market Spices", "St. Philomena Cathedral", "St. Philomena Gothic Viewpoint"]
  }
];

export interface AdventureBadge {
  id: string;
  name: string;
  badgeLevel: "Bronze Seeker" | "Silver Explorer" | "Gold Guardian";
  description: string;
  iconType: "compass" | "leaf" | "award" | "shield";
  pointsRequired: number;
}

export const EXPLO_BADGES: AdventureBadge[] = [
  {
    id: "badge_1",
    name: "Green Footprint Seeker",
    badgeLevel: "Bronze Seeker",
    description: "Earned by visiting and checking out the eco tips of at least any 3 heritage monuments.",
    iconType: "compass",
    pointsRequired: 30
  },
  {
    id: "badge_2",
    name: "Canopy Eco Explorer",
    badgeLevel: "Silver Explorer",
    description: "Acquired by exploring an eco-conscious Green Route itinerary and reading dynamic Weather forecasts.",
    iconType: "leaf",
    pointsRequired: 60
  },
  {
    id: "badge_3",
    name: "Mysore Guardian Royal",
    badgeLevel: "Gold Guardian",
    description: "The grandest tier! Complete all tasks, answer local safety questions, and unlock elite sustainable vouchers.",
    iconType: "award",
    pointsRequired: 100
  }
];
