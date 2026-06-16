import React, { useState, useEffect, useRef } from "react";
import { 
  MapPin, 
  Mic, 
  Volume2, 
  VolumeX, 
  Navigation, 
  ExternalLink, 
  Search, 
  Check, 
  Compass, 
  Sparkles,
  AlertTriangle
} from "lucide-react";
import { HeritageSite } from "../types";

interface InteractiveMapProps {
  activeSite: HeritageSite;
  allSites: HeritageSite[];
  onSelectSite: (index: number) => void;
  userLocation: { latitude: number; longitude: number };
  isNearby: boolean;
}

// Bounding box for mapping latitude/longitude to a beautifully stylized 2D coordinate grid
const MAP_BOUNDS = {
  minLat: 12.26,
  maxLat: 12.44,
  minLng: 76.55,
  maxLng: 76.71,
};

interface TrafficInfo {
  status: "Clear" | "Moderate" | "Congested";
  delayText: string;
  avgSpeed: string;
  alternateTip: string;
  colorCode: string;
  scaleIndex: number; // 0-100 scale
}

const getTrafficData = (siteId: string): TrafficInfo => {
  switch (siteId) {
    case "amba_vilas":
      return {
        status: "Congested",
        delayText: "+8 mins",
        avgSpeed: "11 km/h",
        alternateTip: "Amba Vilas gate routes are highly active today. Rent a Trinity Eco Cycle at the South Gate hub to bypass cars easily and travel carbon-free.",
        colorCode: "text-red-700 bg-red-50/80 border-red-200",
        scaleIndex: 82
      };
    case "jaganmohan":
      return {
        status: "Congested",
        delayText: "+6 mins",
        avgSpeed: "14 km/h",
        alternateTip: "Bypass central Sayyaji Rao Road bottlenecks. Access the rear gates using scenic pedestrian lanes starting near the Palace East arches.",
        colorCode: "text-red-700 bg-red-50/80 border-red-200",
        scaleIndex: 75
      };
    case "lalitha_mahal":
      return {
        status: "Clear",
        delayText: "0 mins",
        avgSpeed: "38 km/h",
        alternateTip: "Lush, open avenues bypass common traffic bottlenecks. Use green hotel electric shuttles inside the property boundaries for zero emissions.",
        colorCode: "text-emerald-800 bg-emerald-50/85 border-emerald-150",
        scaleIndex: 15
      };
    case "chamundi_nandi":
      return {
        status: "Clear",
        delayText: "0 mins",
        avgSpeed: "45 km/h",
        alternateTip: "Winds are clear, roads are fluid. Enjoy a smooth ascent. Electric autos and cycles are strongly recommended to preserve Hill air quality.",
        colorCode: "text-emerald-800 bg-emerald-50/85 border-emerald-150",
        scaleIndex: 10
      };
    case "st_philomena":
      return {
        status: "Congested",
        delayText: "+9 mins",
        avgSpeed: "12 km/h",
        alternateTip: "Heavy school-bus congestion around Ashoka Road gates. Walking through symmetric pedestrian pavements remains the fastest bypass.",
        colorCode: "text-red-700 bg-red-50/80 border-red-200",
        scaleIndex: 86
      };
    case "mysore_zoo":
      return {
        status: "Moderate",
        delayText: "+4 mins",
        avgSpeed: "22 km/h",
        alternateTip: "Mild tour bus congestion near main entry lanes. Electric city carts are highly responsive in this perimeter area.",
        colorCode: "text-amber-800 bg-amber-50/80 border-amber-200",
        scaleIndex: 45
      };
    case "karanji_lake":
      return {
        status: "Clear",
        delayText: "0 mins",
        avgSpeed: "35 km/h",
        alternateTip: "Quiet, pleasant bird conservation corridor. Honking is completely prohibited on these boundary streets to protect nesting egrets.",
        colorCode: "text-emerald-800 bg-emerald-50/85 border-emerald-150",
        scaleIndex: 12
      };
    case "kukkarahalli_lake":
      return {
        status: "Clear",
        delayText: "0 mins",
        avgSpeed: "Zero Emission Zone",
        alternateTip: "Pedestrian-only recreation lake paths! All motor vehicles must remain parked in the designated parking lots at the western university gates.",
        colorCode: "text-emerald-800 bg-emerald-50/85 border-emerald-150",
        scaleIndex: 2
      };
    case "devaraja_market":
    case "devaraja_spice_alley":
      return {
        status: "Congested",
        delayText: "+12 mins",
        avgSpeed: "4 km/h (Walking Priority)",
        alternateTip: "Vehicular access is completely prohibited within spice alleys. Park early and carry reusable canvas sacs for organic spices on foot.",
        colorCode: "text-rose-805 bg-rose-50/80 border-rose-200",
        scaleIndex: 94
      };
    case "chamundi_hairpin":
    case "chamundi_hairpin_110":
      return {
        status: "Clear",
        delayText: "0 mins",
        avgSpeed: "40 km/h",
        alternateTip: "Ensure to switch off internal combustion engines while halted at viewpoints to preserve pristine mountain breeze quality.",
        colorCode: "text-emerald-800 bg-emerald-50/85 border-emerald-150",
        scaleIndex: 18
      };
    case "maharaja_food_street":
      return {
        status: "Moderate",
        delayText: "+5 mins",
        avgSpeed: "15 km/h",
        alternateTip: "High evening street food footfalls. Park on adjacent residential cross avenues and stroll up for an authentic filter coffee vibe.",
        colorCode: "text-amber-800 bg-amber-50/80 border-amber-200",
        scaleIndex: 55
      };
    case "depot_18_cafe":
      return {
        status: "Clear",
        delayText: "0 mins",
        avgSpeed: "32 km/h",
        alternateTip: "Tranquil Gokulam suburban layouts. Perfectly clear coordinates. Ride a shared e-cycle for peaceful navigation.",
        colorCode: "text-emerald-800 bg-emerald-50/85 border-emerald-150",
        scaleIndex: 20
      };
    case "mylari_hotel":
    case "sandalwood_crafts":
      return {
        status: "Congested",
        delayText: "+7 mins",
        avgSpeed: "10 km/h",
        alternateTip: "Old fort sector narrow alleys are saturated. Walking lets you inhale the sweet sandalwood workshop aromas deeper.",
        colorCode: "text-red-700 bg-red-50/80 border-red-200",
        scaleIndex: 82
      };
    default:
      return {
        status: "Moderate",
        delayText: "+3 mins",
        avgSpeed: "25 km/h",
        alternateTip: "Vibrant city streets. Use Mysore's dedicated green bike paths to bypass localized transit slowdowns with ease.",
        colorCode: "text-amber-800 bg-amber-50/80 border-amber-200",
        scaleIndex: 32
      };
  }
};

export default function InteractiveMap({
  activeSite,
  allSites,
  onSelectSite,
  userLocation,
  isNearby
}: InteractiveMapProps) {
  // Voice search state
  const [isListening, setIsListening] = useState(false);
  const [voiceResult, setVoiceResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successVoiceMessage, setSuccessVoiceMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  // Recognition ref
  const recognitionRef = useRef<any>(null);

  // Live Traffic monitoring states
  const [showTraffic, setShowTraffic] = useState(true);
  const [subTab, setSubTab] = useState<"directions" | "traffic">("directions");

  // Convert lat/long to grid percentage values (x, y)
  const getMapCoords = (lat: number, lng: number) => {
    const { minLat, maxLat, minLng, maxLng } = MAP_BOUNDS;
    
    // Map longitude to X (left to right)
    let x = ((lng - minLng) / (maxLng - minLng)) * 100;
    // Map latitude to Y (latitude increases northwards, SVG increases downwards, so flip)
    let y = 100 - (((lat - minLat) / (maxLat - minLat)) * 100);

    // Keep safe margins to prevent clipping at maps border
    const clamp = (val: number, min = 6, max = 94) => Math.max(min, Math.min(max, val));
    return { x: clamp(x), y: clamp(y) };
  };

  // Convert current coordinates
  const userPos = getMapCoords(userLocation.latitude, userLocation.longitude);
  const activePos = getMapCoords(activeSite.latitude, activeSite.longitude);

  // Distance computation
  const getDistanceInMeters = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371000; // Earth's radius in meters
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
  };

  const distanceMeters = Math.round(getDistanceInMeters(
    userLocation.latitude,
    userLocation.longitude,
    activeSite.latitude,
    activeSite.longitude
  ));

  // Speech response assistant narrator
  const speakFeedback = (text: string) => {
    if (isMuted) return;
    try {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel(); // cancel current narration
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.05;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.error("Speech Synthesis error", e);
    }
  };

  // Start continuous/single-shot Speech Recognition
  const startVoiceSearch = () => {
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognitionClass) {
      setErrorMessage("Speech Recognition API is not supported in this browser. Please use Chrome/Safari.");
      return;
    }

    setErrorMessage("");
    setSuccessVoiceMessage("");
    setVoiceResult("");

    try {
      const rec = new SpeechRecognitionClass();
      rec.lang = "en-IN"; // Set English with Indian pronunciation mapping
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onerror = (event: any) => {
        const err = event.error === "not-allowed" 
          ? "Microphone access blocked. Click 'Open in New Tab' to grant browser hardware permissions!" 
          : `Speech error: ${event.error}`;
        setErrorMessage(err);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceResult(transcript);
        processVoiceCommand(transcript);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (e: any) {
      setErrorMessage("Could not initialize microphone: " + e.message);
      setIsListening(false);
    }
  };

  // Match voice query to monument items
  const processVoiceCommand = (rawText: string) => {
    const text = rawText.toLowerCase().trim();
    
    // Define aliases and keywords mapping
    const matchRules: { keywords: string[]; index: number }[] = allSites.map((site, i) => {
      const keywords = [site.name.toLowerCase(), site.id.replace(/_/g, " ")];
      
      // Add specific friendly aliases for Instagram hidden gems
      if (site.id === "green_hotel_cafe") {
        keywords.push("green hotel", "garden library", "hotel cafe", "library cafe", "aesthetic library");
      } else if (site.id === "kukkarahalli_lake_bridge") {
        keywords.push("sunset bridge", "kukkarahalli", "lake bridge", "bridge sunset", "sunset lake");
      } else if (site.id === "devaraja_spice_alley") {
        keywords.push("devaraja", "spice alley", "old market", "flower market", "perfume bazaar", "market spice");
      } else if (site.id === "chamundi_hairpin_110") {
        keywords.push("hairpin", "hairpin bend", "lookout 12", "reels viewpoint", "bend 12", "night viewpoint");
      } else if (site.id === "amba_vilas") {
        keywords.push("palace", "mysore palace", "royal palace", "amba vilas");
      } else if (site.id === "jaganmohan") {
        keywords.push("art gallery", "jaganmohan", "jaganmohan palace", "paintings museum");
      } else if (site.id === "lalitha_mahal") {
        keywords.push("lalitha mahal", "high tea", "white palace");
      } else if (site.id === "chamundi_nandi") {
        keywords.push("nandi", "bull", "hill bull", "monolithic bull");
      } else if (site.id === "st_philomena") {
        keywords.push("church", "cathedral", "philomena", "gothic church");
      } else if (site.id === "vvce") {
        keywords.push("college", "engineering", "vvce", "vidyavardhaka", "hackathon");
      } else if (site.id === "karanji_lake") {
        keywords.push("karanji", "lake park", "butterfly park", "aviary");
      } else if (site.id === "mysore_zoo") {
        keywords.push("zoo", "chamarajendra", "zoo animals");
      } else if (site.id === "brindavan_gardens") {
        keywords.push("brindavan", "gardens", "krs", "fountain");
      } else if (site.id === "railway_museum") {
        keywords.push("railway", "train museum", "vintage trains");
      } else if (site.id === "windflower_resort") {
        keywords.push("windflower", "wellness resort", "spa resort", "wind flower");
      } else if (site.id === "lingambudhi_forest_park") {
        keywords.push("lingambudhi", "forest park", "botanical garden", "lake park swings");
      } else if (site.id === "mall_of_mysore") {
        keywords.push("mall", "mysore mall", "forum mall", "cream stone mall", "shopping mall");
      } else if (site.id === "maharaja_food_street") {
        keywords.push("food street", "maharaja circle", "chaat street", "noodle street", "street food", "gathering place");
      } else if (site.id === "chamundi_backtrail_offroad") {
        keywords.push("offroad", "off-road", "dirt trail", "canopy trail", "biking trail", "mountain trail");
      } else if (site.id === "grs_fantasy_park") {
        keywords.push("grs", "fantasy park", "amusement park", "water park", "splash coaster");
      } else if (site.id === "st_philomena_gothic_viewpoint") {
        keywords.push("gothic view", "turret viewpoint", "church corner", "aesthetic viewpoint", "symmetric photo");
      } else if (site.id === "old_house_pizza") {
        keywords.push("pizzeria", "pizza", "bistro", "old house", "italian bistro", "garden restaurant");
      } else if (site.id === "depot_18_cafe") {
        keywords.push("depot 18", "depot cafe", "book cafe", "hipster coffee", "vinyl record", "gokulam cafe");
      } else if (site.id === "mylari_hotel") {
        keywords.push("mylari", "dosa mylari", "original mylari", "butter dosa", "sago dosa", "small dosa shop");
      } else if (site.id === "sandalwood_crafts") {
        keywords.push("sandalwood craft", "workshop", "woodcarver", "woodcarving", "souvenir shop", "artisan shop");
      } else if (site.id === "radisson_blu_hotel") {
        keywords.push("radisson", "radisson blu", "plazas", "infinity pool", "luxury sunset", "luxury hotel");
      }

      return { keywords, index: i };
    });

    // Find first matching site
    let matchedIndex = -1;
    for (const rule of matchRules) {
      const matchFound = rule.keywords.some(kw => text.includes(kw) || kw.includes(text));
      if (matchFound) {
        matchedIndex = rule.index;
        break;
      }
    }

    if (matchedIndex !== -1) {
      const matchedSite = allSites[matchedIndex];
      onSelectSite(matchedIndex);
      
      const distanceMsg = getDistanceInMeters(
        userLocation.latitude,
        userLocation.longitude,
        matchedSite.latitude,
        matchedSite.longitude
      );
      
      const readText = `Found match! Setting destination to ${matchedSite.name}. It is approximately ${Math.round(distanceMsg)} meters from your simulated location.`;
      setSuccessVoiceMessage(`Matched: "${matchedSite.name}"`);
      speakFeedback(readText);
    } else {
      setErrorMessage(`No clear match for "${rawText}". Try saying 'Palace', 'Sunset Bridge', 'Spice Alley', or 'College'.`);
      speakFeedback(`I heard you say ${rawText}, but couldn't locate that specific site. Try saying Mysore Palace or Sunset Bridge.`);
    }
  };

  // Contextual step directions relative to active destination
  const getTurnByTurnDirections = (siteId: string) => {
    switch (siteId) {
      case "amba_vilas":
        return [
          { text: "Head East toward Albert Victor Road past the horse carriage stand.", dist: "20m" },
          { text: "Turn right, passing the historic Golden Chariot Arch Gate.", dist: "150m" },
          { text: "Enter through the visitor security courtyard queue.", dist: "50m" },
          { text: "Arrive at Amba Vilas Palace Grand Corridor ticket hall.", dist: "Destination" }
        ];
      case "jaganmohan":
        return [
          { text: "Depart West on Maharaja Chamaraja Circle boulevard.", dist: "80m" },
          { text: "Pass through Jaganmohan Palace Road past sandalwood woodcarvers.", dist: "120m" },
          { text: "Enter the decorative heavy brass vintage entry gates.", dist: "15m" },
          { text: "Arrive at Jaganmohan Art Gallery building facade.", dist: "Destination" }
        ];
      case "lalitha_mahal":
        return [
          { text: "Travel East along the outer boundary of Mysore Race Club fields.", dist: "400m" },
          { text: "Head straight onto Lalitha Mahal palace driveway canopy lanes.", dist: "250m" },
          { text: "Ascend past the white decorative royal dome roundabouts.", dist: "80m" },
          { text: "Arrive at the Lalitha Mahal grand terrace step portico.", dist: "Destination" }
        ];
      case "chamundi_nandi":
        return [
          { text: "Proceed climb up Chamundi Hill road past hairpin bends section.", dist: "1.2km" },
          { text: "Decelerate near the traditional forest-range checkpost junction.", dist: "100m" },
          { text: "Step down onto the stone walking trail next to coconut sellers.", dist: "35m" },
          { text: "Arrive directly at the 16ft monolithic Nandi Bull structure.", dist: "Destination" }
        ];
      case "st_philomena":
        return [
          { text: "Head North along Ashoka Road through commercial bazaars.", dist: "300m" },
          { text: "Continue straight, look up to spot the twin Gothic spires.", dist: "150m" },
          { text: "Turn right inside the high sandstone cathedral boundaries.", dist: "20m" },
          { text: "Arrive at the main wooden doors of St. Philomena's.", dist: "Destination" }
        ];
      case "vvce":
        return [
          { text: "Travel West along Gokulam 3rd Stage double road boulevard.", dist: "220m" },
          { text: "Turn right at the Vidyavardhaka main entrance campus pillar.", dist: "40m" },
          { text: "Walk past the student green bench innovation canopy.", dist: "80m" },
          { text: "Arrive at the block courtyard (VVCE Hackathon station).", dist: "Destination" }
        ];
      case "green_hotel_cafe":
        return [
          { text: "Travel West along Hunsur Highway toward the Kalamandira arch.", dist: "350m" },
          { text: "Signal right and head into the leafy boutique lane.", dist: "180m" },
          { text: "Pass the old royal Chittaranjan Palace portico entry gates.", dist: "30m" },
          { text: "Arrive at the beautiful Green Hotel Garden Library Courtyard.", dist: "Destination" }
        ];
      case "kukkarahalli_lake_bridge":
        return [
          { text: "Head West toward Saraswathipuram Lake entrance node.", dist: "120m" },
          { text: "Enter through the pedestrian gates, keep on the clay walking path.", dist: "240m" },
          { text: "Follow the shade trees, look left for Pelican birds in the water.", dist: "190m" },
          { text: "Walk onto the rustic wooden Sunset Gazebo Bridge.", dist: "Destination" }
        ];
      case "devaraja_spice_alley":
        return [
          { text: "Walk North up Sayyaji Rao Road past the central Clock Tower.", dist: "90m" },
          { text: "Pass under the 130-year-old carved plaster main market archway.", dist: "15m" },
          { text: "Squeeze straight past marigold mounds and perfume dispensers.", dist: "60m" },
          { text: "Arrive inside Stall 142 at the central aromatic Spice Alley.", dist: "Destination" }
        ];
      case "chamundi_hairpin_110":
        return [
          { text: "Climb South up Chamundi Hills scenic curve motorway path.", dist: "1.4km" },
          { text: "Ascend through hairpin bends 1 to 11 with caution.", dist: "800m" },
          { text: "Park carefully at the gravel shoulder lookout of Hairpin 12.", dist: "40m" },
          { text: "Arrive at the viral panoramic Mysore City Sparkling night line.", dist: "Destination" }
        ];
      case "windflower_resort":
        return [
          { text: "Head Southwest along foothills bypass road past Chamundi Meadows.", dist: "200m" },
          { text: "Enter through the royal tall stone archway pillar gates.", dist: "40m" },
          { text: "Walk past the tranquil outdoor rain forest grove and yoga gazebo.", dist: "90m" },
          { text: "Arrive at the central Windflower Lotus Pond reception lobby.", dist: "Destination" }
        ];
      case "lingambudhi_forest_park":
        return [
          { text: "Walk West from Ramakrishnanagar toward Lingambudhi Lake bund.", dist: "180m" },
          { text: "Proceed past the forest guard post, heading into bamboo avenues.", dist: "110m" },
          { text: "Follow the muddy lakeside walking trails under gulmohar shadows.", dist: "140m" },
          { text: "Arrive directly at the rustic sunset swing overlooking the lotus bird bays.", dist: "Destination" }
        ];
      case "mall_of_mysore":
        return [
          { text: "Travel South along the scenic MG Road avenue near the zoo back-gate.", dist: "300m" },
          { text: "Signal right to enter the under-ground secure vehicle bay.", dist: "25m" },
          { text: "Ride the central escalators up to the 1st Floor Food Atrium.", dist: "60m" },
          { text: "Arrive at the bubbling youth gathering zone next to Cream Stone.", dist: "Destination" }
        ];
      case "maharaja_food_street":
        return [
          { text: "Walk Northwest from Saraswathipuram main library axis.", dist: "150m" },
          { text: "Cross over to the glowing food caravan street stalls segment.", dist: "40m" },
          { text: "Look for the towering steam and aromatic spice noodle griddles.", dist: "20m" },
          { text: "Arrive at Stall 3 (Namma Mysore Sizzling Dosa block).", dist: "Destination" }
        ];
      case "chamundi_backtrail_offroad":
        return [
          { text: "Head East past JCW golf course towards the Hill's rear base.", dist: "400m" },
          { text: "Turn right onto the gravel off-road trailhead marked by rocky boulders.", dist: "80m" },
          { text: "Ascend steep dusty terrain curves with high motor grip traction.", dist: "350m" },
          { text: "Arrive at the scenic Eastern Wilderness Peak viewpoint.", dist: "Destination" }
        ];
      case "grs_fantasy_park":
        return [
          { text: "Travel North up Ring Road bypass past Hebbal industrial clusters.", dist: "1.1km" },
          { text: "Turn left into the massive GRS water fountain arrival lane.", dist: "150m" },
          { text: "Pass through the main security ticket turnstile lobby.", dist: "40m" },
          { text: "Arrive at GRS Amazonia deck, ready for high splash rides.", dist: "Destination" }
        ];
      case "st_philomena_gothic_viewpoint":
        return [
          { text: "Head West from St. Philomena's main courtyard fountain.", dist: "30m" },
          { text: "Turn right into the quiet brick heritage lane on the church side.", dist: "15m" },
          { text: "Stand at the marked camera-icon cobblestone floor spot.", dist: "5m" },
          { text: "Look straight up to get the symmetric Gothic tower photo story.", dist: "Destination" }
        ];
      case "old_house_pizza":
        return [
          { text: "Depart West on Sayyaji Rao Road, crossing Jaganmohan Circle.", dist: "200m" },
          { text: "Continue towards the quiet tree-lined Residential lane segment.", dist: "120m" },
          { text: "Spot the vintage colonial whitewashed bungalow archway gates.", dist: "40m" },
          { text: "Walk directly inside the tranquil candle-lit Pizza garden lawn.", dist: "Destination" }
        ];
      case "depot_18_cafe":
        return [
          { text: "Walk North up Gokulam 3rd Stage main commercial roadway.", dist: "150m" },
          { text: "Turn left near the local artisan pottery street stalls block.", dist: "60m" },
          { text: "Ascend the spiral staircase lined with indie book hang posters.", dist: "20m" },
          { text: "Step inside the air-conditioned Depot 18 vinyl-listening lounge.", dist: "Destination" }
        ];
      case "mylari_hotel":
        return [
          { text: "Head South on Nazarbad main police station cross junction.", dist: "130m" },
          { text: "Enter Agrahara historical layout, passing tiny local flower setups.", dist: "90m" },
          { text: "Spot the small red-brick 1938 heritage storefront board.", dist: "15m" },
          { text: "Arrive at the original Hotel Mylari (Order sago-butter dosa!).", dist: "Destination" }
        ];
      case "sandalwood_crafts":
        return [
          { text: "Walk South down Devaraja Market outer perimeter lanes.", dist: "80m" },
          { text: "Squeeze through the vibrant old-quarter sandalwood bazaar line.", dist: "45m" },
          { text: "Look for the small open-shutter shop displaying hand-carved pillars.", dist: "15m" },
          { text: "Arrive at Saraswathi Crafts Workshop (See real carver chisels).", dist: "Destination" }
        ];
      case "radisson_blu_hotel":
        return [
          { text: "Travel East along outer race course greenery park fence road.", dist: "350m" },
          { text: "Turn right past the golf range boundary toward the grand porch.", dist: "120m" },
          { text: "Clear secure security screening lane, proceed to ground lobby.", dist: "30m" },
          { text: "Arrive at the spectacular Hilltop Infinity Poolside Lounge.", dist: "Destination" }
        ];
      default:
        return [
          { text: "Head toward regional landmark coordinates on the Map.", dist: "150m" },
          { text: "Follow connecting street lanes, minding light road traffic.", dist: "100m" },
          { text: "Keep within geofence radar scan circles to verify presence.", dist: "50m" },
          { text: "Arrive at destination gates of " + activeSite.name + ".", dist: "Destination" }
        ];
    }
  };

  const steps = getTurnByTurnDirections(activeSite.id);

  // Deep Link Google Maps Route
  const gMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${activeSite.latitude},${activeSite.longitude}&travelmode=walking`;

  return (
    <div id="ux-live-map-directions" className="space-y-4">
      
      {/* HEADER WITH VOICE SEARCH BUTTON */}
      <div className="bg-[#FCFBF9] border border-[#D4AF37]/30 rounded-2xl p-4 space-y-3.5 shadow-xs relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[#B8931F] font-black uppercase tracking-wider text-[11px] font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Accessible Voice Searching
            </div>
            <h3 className="text-[#3E2723] font-serif font-black text-sm tracking-tight">
              Where would you like to travel in Mysuru?
            </h3>
            <p className="text-[11px] text-stone-500">
              Speak naturally! Matches names, key sites, or Instagram-trending spots.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 border border-stone-200 rounded-xl hover:bg-stone-50 text-stone-600 transition cursor-pointer"
              title={isMuted ? "Unmute Voice Guidance" : "Mute Voice Guidance"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-[#B8931F]" />}
            </button>

            <button
              onClick={startVoiceSearch}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-black text-[11px] uppercase tracking-widest cursor-pointer transition ${
                isListening
                  ? "bg-rose-600 border-rose-700 text-white animate-pulse"
                  : "bg-stone-900 border-stone-950 text-white hover:bg-stone-850"
              }`}
            >
              <Mic className={`w-4 h-4 ${isListening ? "animate-bounce" : ""}`} />
              {isListening ? "Listening..." : "Voice Search"}
            </button>
          </div>
        </div>

        {/* VOICE FEEDBACK OUTPUTS */}
        {voiceResult && (
          <div className="bg-stone-50 border border-stone-150 rounded-xl p-2.5 flex items-start gap-2 animate-fade-in">
            <div className="p-1 rounded-md bg-[#B8931F]/10 text-[#B8931F] mt-0.5 font-mono text-[9px] font-bold">Heard</div>
            <p className="text-xs text-stone-700 italic">" {voiceResult} "</p>
          </div>
        )}

        {successVoiceMessage && (
          <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-2.5 flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-800">{successVoiceMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="bg-rose-50 border border-rose-150 rounded-xl p-2.5 flex items-start gap-2 text-rose-850 animate-fade-in text-[11px]">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{errorMessage}</p>
              {errorMessage.includes("Tab") && (
                <p className="text-[10px] text-rose-600 mt-1">
                  iFrame security blocks microphones. Please click the icon at the top corner of your browser preview to open the app in a full new tab where browser voices are 100% active!
                </p>
              )}
            </div>
          </div>
        )}

        {/* Micro Sample helper tips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-stone-100/70">
          <span className="text-[9px] font-mono font-bold uppercase text-stone-400">Try saying:</span>
          {["Take me to the Palace", "Kukkarahalli Lake Sunset", "Market Spice Alley", "VVCE College"].map((phrase) => (
            <button
              key={phrase}
              onClick={() => processVoiceCommand(phrase)}
              className="text-[10px] bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-150/70 px-2 py-0.5 rounded-lg transition"
            >
              "{phrase}"
            </button>
          ))}
        </div>
      </div>

      {/* DUAL DISPLAY GRID: MAP & DIRECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* INTERACTIVE VECTOR SVG MAP (7 Columns) */}
        <div className="md:col-span-7 bg-[#E8ECE9] border border-stone-250/70 rounded-2xl overflow-hidden shadow-xs relative flex flex-col">
          
          {/* Map floating info badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs border border-stone-200 p-2.5 rounded-xl z-20 text-left max-w-xs space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] font-mono font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase">
                Offline Vector GPS Map
              </span>
              {isNearby && (
                <span className="text-[8px] font-mono font-extrabold text-blue-700 bg-blue-50 px-1 py-0.5 rounded border border-blue-100 uppercase animate-pulse">
                  📍 In Range
                </span>
              )}
            </div>
            <div className="text-stone-850 font-bold text-xs truncate animate-fade-in" key={activeSite.id}>
              Destination: {activeSite.name}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-stone-500">
              <Compass className="w-3.5 h-3.5 text-[#B8931F]" /> Lat: {userLocation.latitude.toFixed(4)}, Lng: {userLocation.longitude.toFixed(4)}
            </div>
          </div>

          {/* Floating Live Traffic control panel top right */}
          <div className="absolute top-3 right-3 z-30 flex flex-col gap-1">
            <button
              onClick={() => setShowTraffic(prev => !prev)}
              className={`p-2 px-3 rounded-xl shadow-md border text-[10px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 transition-all outline-none cursor-pointer select-none active:scale-95 ${
                showTraffic
                  ? "bg-rose-600 border-rose-700 text-white hover:bg-rose-700"
                  : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${showTraffic ? "bg-white animate-ping" : "bg-rose-500"}`} />
              <span>🚥 Traffic {showTraffic ? "LIVE" : "OFF"}</span>
            </button>
          </div>

          {/* Interactive Legend in corner */}
          <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-2xs border border-stone-200/50 p-2.5 rounded-xl z-15 text-[9px] font-mono space-y-1.5 hidden md:block">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#B8931F] animate-ping" />
              <span>Standard Heritage Spot</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse border border-white" />
              <span className="text-purple-800 font-extrabold uppercase text-[8px]">✨ Instagram Trending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-white" />
              <span>Your Simulated GPS Location</span>
            </div>
            {showTraffic && (
              <div className="pt-1.5 border-t border-stone-250/70 space-y-1">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-[#3E2723] block pb-0.5">🚦 Traffic Levels</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 rounded bg-red-500" /> <span className="text-[8px] font-sans">Heavy Delay</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 rounded bg-amber-500" /> <span className="text-[8px] font-sans">Moderate flow</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 rounded bg-emerald-500" /> <span className="text-[8px] font-sans">Clear / Silent</span>
                </div>
              </div>
            )}
          </div>

          {/* Main SVG Vector Canvas */}
          <div className="w-full h-[320px] md:h-[400px] relative bg-[#E1EDEB]">
            {/* Self-contained CSS flow style tag for the traffic dashes */}
            <style>{`
              @keyframes trafficFlowSlo {
                to { stroke-dashoffset: -20; }
              }
              @keyframes trafficFlowMed {
                to { stroke-dashoffset: -30; }
              }
              @keyframes trafficFlowFst {
                to { stroke-dashoffset: -40; }
              }
              .animate-traffic-slow {
                stroke-dasharray: 4, 3;
                animation: trafficFlowSlo 7s linear infinite;
              }
              .animate-traffic-med {
                stroke-dasharray: 5, 2.5;
                animation: trafficFlowMed 4s linear infinite;
              }
              .animate-traffic-fast {
                stroke-dasharray: 6, 2;
                animation: trafficFlowFst 2.2s linear infinite;
              }
            `}</style>
            <svg className="w-full h-full select-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              
              {/* STYLIZED LANDSCAPE: RIVERS & WATER BODIES */}
              {/* Kaveri / Dam flow up North (around Y: 10) */}
              <path d="M 0 8 Q 30 15, 60 7 T 100 9 L 100 0 L 0 0 Z" fill="#D3EAF0" opacity="0.85" />
              <path d="M 50 8 Q 55 12, 60 7" stroke="#90CAD7" strokeWidth="0.8" fill="none" />

              {/* Kukkarahalli Lake (West - Y: ~40, X: ~35) */}
              <circle cx="38" cy="45" r="9" xmlns="http://www.w3.org/2000/svg" fill="#CADFDF" stroke="#B0D5D4" strokeWidth="0.4" />
              <text x="35" y="46" fill="#4B777A" fontSize="2" fontWeight="bold" fontFamily="monospace">Kukkarahalli Lake</text>

              {/* Karanji Lake (East - Y: ~48, X: ~75) */}
              <ellipse cx="76" cy="51" rx="8" ry="5" fill="#CADFDF" stroke="#B0D5D4" strokeWidth="0.4" />
              <text x="73" y="52" fill="#4B777A" fontSize="2" fontWeight="bold" fontFamily="monospace">Karanji Lake</text>

              {/* VEGETATION & FORESTS */}
              {/* Chamundi Hills forest core (South - Y: ~80 to ~95, X: ~80) */}
              <ellipse cx="80" cy="85" rx="14" ry="11" fill="#D4EAD6" opacity="0.9" stroke="#BEDFC1" strokeWidth="0.3" />
              <text x="75" y="87" fill="#2E5A32" fontSize="2" fontWeight="bold" fontFamily="monospace">Chamundi Reserve Forest</text>

              {/* MAJOR STREETS NETWORKS GRID */}
              {/* Central cross (Maharaja Road, Sayyaji Rao, Albert Victor) */}
              <line x1="10" y1="50" x2="90" y2="50" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round" /> {/* East-West main highway */}
              <line x1="10" y1="50" x2="90" y2="50" stroke="#D3C7B5" strokeWidth="0.4" strokeDasharray="1,1" />

              <line x1="55" y1="10" x2="55" y2="90" stroke="#FAF7F2" strokeWidth="1.8" strokeLinecap="round" /> {/* North-South central trunk */}
              <line x1="55" y1="10" x2="55" y2="90" stroke="#D3C7B5" strokeWidth="0.4" strokeDasharray="1,1" />

              {/* Gokulam Roads (West / Top - VVCE) */}
              <line x1="10" y1="35" x2="45" y2="35" stroke="#FAF7F2" strokeWidth="1.3" />
              
              {/* Hill motorways curves (Connecting to Chamundi) */}
              <path d="M 55 50 Q 65 70, 75 80 T 80 87" fill="none" stroke="#FAF7F2" strokeWidth="1.2" strokeLinecap="round" />

              {/* LIVE TRAFFIC PLOTTED OVERLAYS (Shown when toggle is enabled) */}
              {showTraffic && (
                <g opacity="0.85">
                  {/* Sayyaji Rao Road North - Saturated commercial bottleneck (Red) */}
                  <line x1="55" y1="10" x2="55" y2="50" stroke="#EF4444" strokeWidth="2.0" strokeLinecap="round" className="animate-traffic-slow" />
                  
                  {/* Sayyaji Rao Road South - Moderate flow (Orange) */}
                  <line x1="55" y1="50" x2="55" y2="90" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" className="animate-traffic-med" />

                  {/* Maharaja Road West - Moderate flow (Orange) */}
                  <line x1="10" y1="50" x2="55" y2="50" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" className="animate-traffic-med" />

                  {/* Albert Victor Road East - Heavy tourist market density (Red) */}
                  <line x1="55" y1="50" x2="90" y2="50" stroke="#EF4444" strokeWidth="2.0" strokeLinecap="round" className="animate-traffic-slow" />

                  {/* Gokulam leafy suburban roads (Clean Green) */}
                  <line x1="10" y1="35" x2="45" y2="35" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" className="animate-traffic-fast" />

                  {/* Chamundi Hill motorways curves - Clean flowing mountain breeze (Green) */}
                  <path d="M 55 50 Q 65 70, 75 80 T 80 87" fill="none" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" className="animate-traffic-fast" />
                </g>
              )}

              {/* ACTIVE DIRECTIONS TRAVEL LINE (Dotted neon highlight path!) */}
              <line 
                x1={userPos.x} 
                y1={userPos.y} 
                x2={activePos.x} 
                y2={activePos.y} 
                stroke="#B8931F" 
                strokeWidth="1.3" 
                strokeDasharray="3,2" 
                strokeLinecap="round"
                className="animate-pulse"
              />
              
              <line 
                x1={userPos.x} 
                y1={userPos.y} 
                x2={activePos.x} 
                y2={activePos.y} 
                stroke="#6366F1" 
                strokeWidth="0.55" 
                strokeDasharray="2,3" 
                strokeLinecap="round"
              />

              {/* LANDMARKS INTERACTIVE LOGOS / PINS ON CANVAS */}
              {allSites.map((site, index) => {
                const isSelected = site.id === activeSite.id;
                const gp = getMapCoords(site.latitude, site.longitude);
                
                return (
                  <g 
                    key={site.id} 
                    transform={`translate(${gp.x}, ${gp.y})`}
                    className="cursor-pointer"
                    onClick={() => onSelectSite(index)}
                  >
                    {/* Ring Pulse around the selected destination */}
                    {isSelected && (
                      <circle cx="0" cy="0" r="4.2" fill="none" stroke={site.isInstagramTrending ? "#A855F7" : "#B8931F"} strokeWidth="0.6">
                        <animate attributeName="r" values="2;5.5;2" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Pin element shape */}
                    <circle 
                      cx="0" 
                      cy="0" 
                      r={isSelected ? "2.5" : "1.8"} 
                      fill={site.isInstagramTrending ? "#9333EA" : isSelected ? "#3E2723" : "#CDB370"} 
                      stroke="#FFFFFF" 
                      strokeWidth="0.35" 
                    />

                    {/* Sparkle/Instagram star for Instagram tags */}
                    {site.isInstagramTrending && (
                      <circle cx="1.2" cy="-1.2" r="1.1" fill="#E879F9" stroke="#FFFFFF" strokeWidth="0.2">
                        <animate attributeName="fill" values="#E879F9;#F43F5E;#E879F9" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Micro tooltip text labels when selected or zoom hover */}
                    {isSelected && (
                      <g transform="translate(0, -5.5)">
                        <rect x="-16" y="-5.5" width="32" height="6.5" rx="1.5" fill="#1E1B18" opacity="0.9" />
                        <text x="0" y="-1" fill="#FFFFFF" fontSize="2.2" textAnchor="middle" fontWeight="bold">
                          {site.name.split(" ")[0]}.. {site.isInstagramTrending ? "✨" : ""}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* CURRENT SIMULATED POSITION PINPOINT WITH PULSING RING */}
              <g transform={`translate(${userPos.x}, ${userPos.y})`}>
                <circle cx="0" cy="0" r="4.8" fill="none" stroke="#2563EB" strokeWidth="0.6">
                  <animate attributeName="r" values="3.2;6.8;3.2" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.85;0.1;0.85" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="1.8" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="0.35" />
                {/* Simulated Direction arrow cone */}
                <path d="M 0 -2.4 L 1.2 0.8 L -1.2 0.8 Z" fill="#2563EB" opacity="0.8" transform="rotate(45)" />
              </g>

            </svg>
            
            {/* Quick simulated compass rose */}
            <div className="absolute bottom-3 right-3 bg-white/70 p-2 rounded-xl text-[9px] font-mono flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#B8931F] animate-spin-slow" /> Compass Grid N
            </div>
          </div>

          {/* Map bottom stats */}
          <div className="bg-stone-900 text-white p-3.5 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-blue-400 rotate-45" />
              <span>Simulated Route Line Plotted:</span>
            </div>
            <div className="space-x-4">
              <span>📏 <strong>{distanceMeters >= 1000 ? `${(distanceMeters / 1000).toFixed(2)} km` : `${distanceMeters} m`}</strong></span>
              <span>🕒 <strong>{Math.ceil(distanceMeters / 80)} mins walk</strong></span>
            </div>
          </div>

        </div>

        {/* TURN BY TURN STEPS & DEEP LINK DIRECTIONS (5 Columns) */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Main direction steps context */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4.5 space-y-4 shadow-xs flex-1 flex flex-col justify-between">
            <div className="space-y-3.5">
              
              {/* Inner tab router: Directions vs Live Traffic Feed */}
              <div className="grid grid-cols-2 gap-2 border-b border-stone-150 pb-3">
                <button
                  type="button"
                  onClick={() => setSubTab("directions")}
                  className={`py-2 px-1 text-[10px] font-black font-mono uppercase tracking-wider rounded-xl transition text-center cursor-pointer ${
                    subTab === "directions"
                      ? "bg-stone-900 text-white font-black"
                      : "bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200"
                  }`}
                >
                  📍 Itinerary Steps
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubTab("traffic");
                    setShowTraffic(true); // turning sub-tab to traffic turns on map traffic layers automatically
                  }}
                  className={`py-2 px-1 text-[10px] font-black font-mono uppercase tracking-wider rounded-xl transition text-center cursor-pointer flex items-center justify-center gap-1 border ${
                    subTab === "traffic"
                      ? "bg-rose-600 border-rose-700 text-white font-black"
                      : "bg-rose-50 text-rose-750 hover:bg-rose-100 border border-rose-200/65"
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-pulse" />
                  🚦 Live Traffic Index
                </button>
              </div>

              {subTab === "directions" ? (
                <div className="space-y-3.5">
                  {/* Destination badge card */}
                  <div className="p-3 bg-stone-50/50 border border-stone-200 rounded-xl space-y-1.5 relative overflow-hidden">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-mono text-stone-400 uppercase font-bold tracking-wider">Destination target</span>
                      {activeSite.isInstagramTrending && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-extrabold text-[8px] uppercase tracking-wider border border-purple-200 animate-pulse">
                          ✨ Instagram Viral ({activeSite.reelsCount})
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-xs font-black text-stone-900 tracking-tight leading-tight">
                      {activeSite.name}
                    </h4>
                    {activeSite.instagramHandle && (
                      <div className="text-[10px] text-purple-600 font-mono font-bold">
                        Insta Handle: {activeSite.instagramHandle}
                      </div>
                    )}
                    
                    <p className="text-[11px] text-stone-500 leading-relaxed font-light italic">
                      "{activeSite.description.substring(0, 100)}..."
                    </p>
                  </div>

                  {/* Turn by turn list */}
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-mono font-black uppercase text-stone-400 tracking-widest block">
                      Turn-By-Turn Local Itinerary
                    </h5>
                    <div className="space-y-2.5 max-h-[170px] overflow-y-auto pr-1">
                      {steps.map((st, sIndex) => {
                        const isLast = sIndex === steps.length - 1;
                        return (
                          <div key={sIndex} className="flex gap-2.5 items-start text-xs text-left">
                            <div className="flex flex-col items-center shrink-0 mt-0.5">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono font-bold border-2 ${
                                isLast ? "bg-emerald-500 border-white text-white" : "bg-stone-50 border-stone-300 text-stone-500"
                              }`}>
                                {sIndex + 1}
                              </div>
                              {!isLast && <div className="w-0.5 h-6 bg-stone-150 mt-1" />}
                            </div>
                            <div className="space-y-0.5 pb-1">
                              <p className="text-stone-750 text-[11px] font-medium leading-tight">
                                {st.text}
                              </p>
                              <code className="text-[9px] text-[#B8931F] font-mono block font-black uppercase">
                                {st.dist}
                              </code>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-h-[295px] overflow-y-auto pr-1 scrollbar-thin text-left">
                  {(() => {
                    const traffic = getTrafficData(activeSite.id);
                    return (
                      <div className="space-y-3.5">
                        {/* Traffic metrics scorecard */}
                        <div className={`p-3 rounded-xl border ${traffic.colorCode} space-y-2`}>
                          <div className="flex items-center justify-between">
                            <span className="text-[8.5px] font-mono font-black uppercase tracking-wider opacity-90 block">
                              Active Sector Congestion
                            </span>
                            <span className="text-[9.5px] font-mono font-black uppercase tracking-wider px-1.5 py-0.5 bg-white/40 border border-white/20 rounded">
                              {traffic.status}
                            </span>
                          </div>

                          <div className="flex items-end justify-between">
                            <div>
                              <span className="text-sm font-black tracking-tight leading-tight text-stone-900 block">
                                {traffic.delayText === "0 mins" ? "No Transit Delay" : `${traffic.delayText} Expected`}
                              </span>
                              <span className="text-[10px] font-mono text-stone-600 block">
                                Average Speed: <strong>{traffic.avgSpeed}</strong>
                              </span>
                            </div>
                            <span className="relative flex h-2.5 w-2.5">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                traffic.status === "Congested" ? "bg-red-500" : traffic.status === "Moderate" ? "bg-amber-400" : "bg-emerald-400"
                              }`} />
                              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                                traffic.status === "Congested" ? "bg-red-650" : traffic.status === "Moderate" ? "bg-amber-500" : "bg-emerald-500"
                              }`} />
                            </span>
                          </div>

                          {/* Level meter bar */}
                          <div className="space-y-1">
                            <div className="w-full bg-white/60 h-1 rounded-full overflow-hidden border border-black/5">
                              <div 
                                className={`h-full rounded-full transition-all duration-300 ${
                                  traffic.status === "Congested" 
                                    ? "bg-red-600" 
                                    : traffic.status === "Moderate" 
                                      ? "bg-amber-500" 
                                      : "bg-emerald-500"
                                }`}
                                style={{ width: `${traffic.scaleIndex}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-[8px] font-mono text-stone-500">
                              <span>Clear</span>
                              <span>Moderate</span>
                              <span>Saturated</span>
                            </div>
                          </div>
                        </div>

                        {/* Alternate route eco advice */}
                        <div className="p-3 bg-emerald-50/90 border border-emerald-150 rounded-xl space-y-1">
                          <span className="text-[9px] font-mono text-emerald-800 font-extrabold uppercase block tracking-wider">
                            🍀 Dynamic Avoidance Option
                          </span>
                          <p className="text-[10.5px] text-emerald-950 leading-relaxed font-semibold">
                            {traffic.alternateTip}
                          </p>
                        </div>

                        {/* Real-time high congestion points list */}
                        <div className="space-y-2 pt-2 border-t border-stone-150">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] text-stone-400 font-mono font-black uppercase tracking-wider block">
                              Mysuru Hotspot Feeds
                            </span>
                            <span className="text-[8px] bg-red-100 text-red-700 px-1 py-0.5 rounded font-mono uppercase font-extrabold tracking-widest animate-pulse">
                              🔥 Saturated Junctions
                            </span>
                          </div>

                          <div className="space-y-1.5 text-[9.5px]">
                            <div className="flex items-center justify-between p-1.5 bg-stone-50 border border-stone-200/40 rounded-lg">
                              <span className="text-stone-750 font-bold">1. Sayyaji Rao Rd (K.R. Circle)</span>
                              <span className="text-red-700 bg-red-50 px-1.5 py-0.5 rounded font-mono font-black text-[8px]">
                                HEAVY (10m delay)
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-1.5 bg-stone-50 border border-stone-200/40 rounded-lg">
                              <span className="text-stone-750 font-bold">2. Albert Victor Rd / North Gate</span>
                              <span className="text-red-700 bg-red-50 px-1.5 py-0.5 rounded font-mono font-black text-[8px]">
                                HEAVY (8m delay)
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-1.5 bg-stone-50 border border-stone-200/40 rounded-lg">
                              <span className="text-stone-750 font-bold">3. Nazarbad Junction / Zoo Access</span>
                              <span className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-mono font-black text-[8px]">
                                MODERATE (3m)
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-1.5 bg-stone-50 border border-stone-200/40 rounded-lg">
                              <span className="text-stone-750 font-medium">4. Chamundi Hill Ascent road</span>
                              <span className="text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-black text-[8px]">
                                CLEAR (0m delay)
                              </span>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })()}
                </div>
              )}

            </div>

            {/* Google Maps deep route launch */}
            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
              <a
                href={gMapsLink}
                target="_blank"
                rel="no-referrer"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] tracking-widest uppercase rounded-xl text-center flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Launch Google Maps Navigation
              </a>
              <code className="text-[9px] text-stone-400 font-mono text-center block">
                Deep-links coordinates to official native GPS app
              </code>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
