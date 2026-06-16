import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

// Lazy-init Gemini client so missing key doesn't crash at module load
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const fallbackStories: { [key: string]: string[] } = {
  amba_vilas: [
    "During the Dussehra festival, the palace is adorned with over 97,000 light bulbs, creating a breathtaking golden glow visible from miles away. Inside, the spectacular Durbar Hall features a magnificent ceiling crafted of high-grade Bavarian stained glass. Hidden under the private chambers is an elaborate network of subterranean passageways designed as escape routes for the royal family during times of siege.",
    "The palace holds a rare golden throne made of 280 kilograms of pure gold, adorned with intricate depictions of celestial guardians. Its architecture is an exquisite union of Indo-Saracenic, Hindu, and Gothic design, reflecting the diverse cultural influences of the Wodeyar era. Standing in the courtyard, visitors can feel the resonance of century-old courtly traditions and Royal assemblies.",
  ],
  jaganmohan: [
    "Built entirely of wood as an alternative royal residence in 1861, this exquisite palace survived the great fire of the old fort. It houses the legendary 'Lady with the Lamp' masterpiece by Haldenkar, painted with translucent watercolors that illuminate the room. The wooden ceiling displays complex astrological maps detailing ancient Indian stellar charts and lunar cycles.",
    "The palace is constructed with structural interlocking timber without using physical metallic columns, showcasing Karnataka's historic engineering. It contains rare musical clocks and hand-woven silk tapestries depicting military conquests of the Mysuru kingdom. Every pillar is carved with ivory accents, preserving the delicate motifs of 19th-century craft dynasties.",
  ],
  lalitha_mahal: [
    "Commanded by Maharaja Krishnaraja Wodeyar IV, this exquisite white palace was built exclusively to host high-ranking officers and the Viceroy of India. The architecture was modeled after St. Paul's Cathedral in London, featuring double-columned ionic porticos. A majestic hand-cranked Otis elevator, finished in hand-polished teakwood and brass, is still perfectly preserved inside.",
    "The central banquet hall is decorated with stunning spherical chandeliers imported from Venice, each casting a warm, starry glow. This hill-facing pavilion boasts a pristine Italian marble staircase that acts as a majestic focal point of the grand lobby. Guests of royalty enjoyed exquisite high-tea ceremonies on the windy terraces, overlooking the Chamundi peaks.",
  ],
  chamundi_nandi: [
    "Carved out of a single towering monolith of black granite in 1659, this is one of India's largest and most sacred Nandi statues. Standing over 16 feet tall, the bull is adorned with delicate carved garlands, bells, and golden ear-stud motifs. Priests still scale a wooden scaffold daily to perform elaborate milk and turmeric ablutions on the ancient stone.",
    "The sacred Nandi serves as the celestial mount of Lord Shiva, keeping eternal vigil over the surrounding valleys of historic Mysuru. According to folklore, the entire statue was carved in a single continuous night by dedicated sculptors of the royal court. The unique luster of the granite stays deep black due to hundreds of years of traditional oil-based rituals.",
  ],
  st_philomena: [
    "Inspired by the famed Cologne Cathedral in Germany, this structure boasts twin Gothic spires towering 175 feet high into the sky. Below the main altar lies a quiet, sacred crypt holding a relic of Third-Century Saint Philomena. The stunning stained glass windows were imported from France, illustrating spectacular biblical stories with deep ruby and cobalt tones.",
    "This cathedral is built in a distinct Neo-Gothic style, incorporating towering buttresses and elegant pointed archways. The foundation of this holy monument was personally laid by the Maharaja of Mysore, symbolizing deep interfaith harmony. Standing inside, the colossal vaulted ceiling creates a magnificent acoustic resonance that amplifies every quiet whisper.",
  ],
  vvce: [
    "Established in 1997, Vidyavardhaka College of Engineering stands as a proud landmark of academic innovation and technological prowess in Mysuru. Its sprawling green campus is home to thousands of engineers pioneering advancements in artificial intelligence, robotics, and sustainable designs. The central block coordinates a vibrant legacy of student innovation, carrying Mysore's heritage of intellectual curiosity into the modern century.",
    "The college represents a bridge between Mysuru's storied intellectual past and the high-tech digital future. Under its academic canopy, students build collaborative software, smart grids, and clean energy solutions. The legendary campus cafeteria serves as a buzzing arena of ideation, where great technical start-ups are brainstormed over hot cups of traditional filter coffee.",
  ],
};

function getFallbackStory(name: string): string {
  const norm = name.toLowerCase();
  let key = "amba_vilas";
  if (norm.includes("jaganmohan")) key = "jaganmohan";
  else if (norm.includes("lalitha")) key = "lalitha_mahal";
  else if (norm.includes("bull") || norm.includes("nandi") || norm.includes("chamundi")) key = "chamundi_nandi";
  else if (norm.includes("philomena")) key = "st_philomena";
  else if (norm.includes("vidyavardhaka") || norm.includes("vvce")) key = "vvce";

  const stories = fallbackStories[key] || fallbackStories["amba_vilas"];
  const randomIndex = Math.floor(Math.random() * stories.length);
  return stories[randomIndex];
}

// API route to generate stories
app.post("/api/gemini/story", async (req, res) => {
  const { siteName } = req.body;
  if (!siteName) {
    return res.status(400).json({ error: "siteName is required" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("No API key configured");
    }

    const ai = getGeminiClient();
    const prompt = `You are a local historian and master storyteller for Mysuru (Mysore), Karnataka, India.
Write a 3-sentence 'Hidden History' or a mysterious, relatively unknown, and engaging historical tale about the following heritage site: ${siteName}.
Make it fascinating, atmospheric, and focus on details that an explorer standing outside the monument would find intriguing. Keep it highly relevant to its architecture or legends.
Adhere strictly to the 3-sentence limit. Do NOT include any intro or outro text (like "Here is the story..."). Produce only the three engaging sentences.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (response && response.text) {
      return res.json({ story: response.text, liveApi: true });
    } else {
      throw new Error("Empty response from primary model");
    }
  } catch (error: any) {
    console.warn("Gemini API Error (using graceful local fallback):", error.message || error);
    const story = getFallbackStory(siteName);
    return res.json({
      story,
      liveApi: false,
      fallbackMode: true,
      message: "Returned curated historical chronicle due to key credentials restriction",
    });
  }
});

// API route for Chatbot
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history, currentSite } = req.body;
    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("No API key configured");
    }

    const chatPrompt = `You are "Royal Guide", a friendly and extremely knowledgeable local chatbot tour guide for the Mysuru Heritage Passport program in Mysuru, Karnataka, India.
The user is currently visiting or inquiring about the following monument: ${currentSite || "General Mysuru Region"}.

Keep answers concise (max 3 short paragraphs), atmospheric, and delightfully informative. Talk about Mysuru architecture, Dussehra festivals, local street food (like Mysore Pak, aromatic Mysore Masala Dosa, Mylari Butter Dosa, and filter coffee) and royal legends of the Wodeyars. If asked about "Vidyavardhaka College of Engineering" (VVCE), proudly describe it as the premier engineering institution of Mysuru, founded in 1997, known for technical innovations and student start-ups.

Here is the conversation history:
${(history || []).map((h: any) => `${h.role === "user" ? "Visitor" : "Royal Guide"}: ${h.text}`).join("\n")}
Visitor: ${message}
Royal Guide:`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: chatPrompt,
    });

    if (response && response.text) {
      return res.json({ reply: response.text });
    } else {
      throw new Error("Empty chatbot response from primary model");
    }
  } catch (error: any) {
    console.warn("Gemini Chatbot API Error, fallback applied:", error);

    const visitorMsg = (req.body.message || "").toLowerCase();
    let responseText =
      "Greetings from Mysuru! I am currently operating in high-fidelity local mode. Mysuru holds countless majestic stories of the Wodeyar kings, the aromatic Mylari butter dosas, and the world-renowned gold-threaded Mysore Silk. Ask me more about the grand palaces, the Chamundi temple, or the technical legacy of Vidyavardhaka College (VVCE)!";

    if (visitorMsg.includes("dosa") || visitorMsg.includes("food") || visitorMsg.includes("coffee") || visitorMsg.includes("eat")) {
      responseText =
        "Mysuru is a paradise for culinary explorers! You must visit Hotel Mylari near Subbarayan Road for their legendary soft butter dosas served on plantain leaves with coconut chutney, and Cafe Aramane near the palace gates for real, rich frothy South Indian filter coffee. Also, do not forget to pick up authentic royal Mysore Pak made in pure ghee!";
    } else if (visitorMsg.includes("palace") || visitorMsg.includes("amba") || visitorMsg.includes("jaganmohan")) {
      responseText =
        "The palaces of Mysuru are architectural marvels. Amba Vilas (the main Mysore Palace) incorporates beautiful grand arches and is illuminated by nearly 100,000 bulbs! Jaganmohan Palace holds stunning works by Raja Ravi Varma, and Lalitha Mahal recreates a majestic visual look modeled after St. Paul's Cathedral in London.";
    } else if (visitorMsg.includes("vidyavardhaka") || visitorMsg.includes("vvce") || visitorMsg.includes("college") || visitorMsg.includes("engineering")) {
      responseText =
        "Vidyavardhaka College of Engineering (VVCE), Mysuru, established in 1997, is indeed a prominent learning landmark of the city! Located in Gokulam, it's known for amazing computer science research, tech hackathons, and a highly active student startup community. Over at Namma Cafe inside campus, amazing ideas are engineered every day over local samosas and hot tea.";
    }

    return res.json({ reply: responseText, fallbackMode: true });
  }
});

export default app;
