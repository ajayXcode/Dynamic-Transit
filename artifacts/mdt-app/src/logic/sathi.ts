
import { RouteResult, RouteSegment } from "./router";

export interface DisruptionScenario {
  id: string;
  name: string;
  marathi: string;
  description: string;
  affectedLines: string[];
  affectedNodes: string[];
  icon: string;
  severity: "low" | "medium" | "high" | "critical";
  active: boolean;
}

export const DISRUPTIONS: DisruptionScenario[] = [
  {
    id: "central_block",
    name: "Central Line Mega Block",
    marathi: "मध्य रेल्वे मेगा ब्लॉक",
    description: "Major maintenance work. Trains running on alternate track at half speed.",
    affectedLines: ["central"],
    affectedNodes: ["THANE", "MULUND", "BHANDUP", "KANJURMARG"],
    icon: "🚧",
    severity: "critical",
    active: false
  },
  {
    id: "monsoon_flood",
    name: "Monsoon Flooding",
    marathi: "पूर परिस्थिती",
    description: "Heavy rainfall causing severe waterlogging. Kurla and Mankhurd affected.",
    affectedLines: ["local_central", "local_harbour"],
    affectedNodes: ["KURLA", "MANKHURD"],
    icon: "🌧️",
    severity: "high",
    active: false
  },
  {
    id: "western_strike",
    name: "Western Railway Strike",
    marathi: "पश्चिम रेल्वे संप",
    description: "Union strike. Limited services on Western Line.",
    affectedLines: ["western"],
    affectedNodes: [],
    icon: "✊",
    severity: "critical",
    active: false
  },
  {
    id: "metro_technical",
    name: "Metro Signal Failure",
    marathi: "मेट्रो सिग्नल बिघाड",
    description: "Signal failure causing delays of 15-20 minutes on Metro Line 1.",
    affectedLines: ["metro1"],
    affectedNodes: [],
    icon: "⚡",
    severity: "medium",
    active: false
  },
  {
    id: "harbour_cancellation",
    name: "Harbour Line Cancellation",
    marathi: "हार्बर लाइन रद्दीकरण",
    description: "60% trains cancelled due to technical issue near Mankhurd.",
    affectedLines: ["harbour"],
    affectedNodes: ["MANKHURD", "CHEMBUR"],
    icon: "🚂",
    severity: "high",
    active: false
  }
];

export const MODE_COLORS: Record<string, string> = {
  local_central: "#E74C3C",
  local_western: "#3498DB",
  local_harbour: "#E67E22",
  metro1: "#9B59B6",
  metro2: "#2ECC71",
  monorail: "#F39C12",
  ferry: "#1ABC9C",
  bus: "#95A5A6",
  walk: "#BDC3C7",
};

export const MODE_NAMES: Record<string, string> = {
  local_central: "Central Line",
  local_western: "Western Line",
  local_harbour: "Harbour Line",
  metro1: "Metro Line 1",
  metro2: "Metro Line 2",
  monorail: "Monorail",
  ferry: "Ferry",
  bus: "Bus",
  walk: "Walk",
};

export const MODE_MARATHI: Record<string, string> = {
  local_central: "मध्य रेल्वे",
  local_western: "पश्चिम रेल्वे",
  local_harbour: "हार्बर लाइन",
  metro1: "मेट्रो",
  metro2: "मेट्रो 2",
  monorail: "मोनोरेल",
  ferry: "फेरी",
  bus: "बस",
  walk: "चाल",
};

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 7 && h <= 10) return "peak_morning";
  if (h >= 17 && h <= 21) return "peak_evening";
  if (h >= 0 && h <= 5) return "late_night";
  return "offpeak";
}

const SATHI_GREETINGS = [
  "Arre yaar!",
  "Bhai sun!",
  "Chalega?",
  "Dikkat nahi!",
  "Tension mat le!",
];

const SATHI_ROUTE_COMMENTS: Record<string, string[]> = {
  local_central: [
    "Central Line pakad — seedha jaayega!",
    "Ek kaam kar, Central Line le, thoda rush rahega par time pe pahuncha dega.",
    "Central ki train lo, 99 problems but delay ek nahi (hopefully 😅)."
  ],
  local_western: [
    "Western Line — Mumbai ki lifeline!",
    "Arre Western lo yaar, AC coach milega agar lucky raha toh!",
    "Western Line mein thodi bheed rahegi par alternative kya hai bhai?"
  ],
  metro1: [
    "Metro pakad bhai — AC, fast, tension-free!",
    "Metro toh must hai — ghanta nahi lagega!",
    "Metro lo — no crowd, no drama, sirf smooth ride!"
  ],
  ferry: [
    "Ferry mein thoda time lagega par kya view milega Mumbai harbour ka!",
    "Sea route mein ja bhai — change of scene toh milega!"
  ],
  bus: [
    "Bus ka option bhi hai par peak hours mein pakad lena early.",
    "BEST bus lo — affordable hai, reliable bhi."
  ]
};

const DISRUPTION_RESPONSES = [
  "Bhai, yahan aaj line pe problem hai! Alternate route suggest kar raha hoon —",
  "Arre ruk! Aaj woh route blocked hai. Suno —",
  "Chal, plan B activate karte hain! Route changed —",
  "Ek kaam kar, aaj dusra rasta lo. Yeh wali line pe jhanjhat hai —"
];

const PEAK_WARNINGS = [
  "Peak hour chal raha hai bhai! Thodi bheed milegi.",
  "Rush hour hai — pehle se nikal dena recommended!",
  "Arre yaar, peak time mein thodi jagah kam milti hai trains mein.",
];

const CROWD_WARNINGS: Record<string, string> = {
  DADAR: "Dadar mein bahut bheed hoti hai — careful reh!",
  CSMT: "CSMT pe tourist bhi hote hain, thoda time milao.",
  ANDHERI: "Andheri station pe rush hai — metro ya local, dono pe line milegi.",
  KURLA: "Kurla ka traffic notorious hai — time extra rakho.",
  GHATKOPAR: "Ghatkopar mein metro aur local dono ka rush hai."
};

const MONSOON_WARNINGS: Record<string, string> = {
  KURLA: "KURLA pe flooding ka risk hai — monsoon mein careful!",
  MANKHURD: "MANKHURD track flood-prone hai — aaj alternate lo.",
};

export function generateSathiMessage(
  route: RouteResult | null,
  disruptions: DisruptionScenario[],
  origin: string,
  destination: string,
  isMarathi = false
): string {
  if (!route) {
    if (isMarathi) {
      return "भाऊ, या मार्गावर थेट ट्रेन नाही. पण मी पर्यायी मार्ग शोधत आहे!";
    }
    return "Bhai, direct route nahi mila. But don't worry — let me check alternate paths or try nearby stations!";
  }

  const timeOfDay = getTimeOfDay();
  const activeDisruptions = disruptions.filter(d => d.active);
  const greeting = SATHI_GREETINGS[Math.floor(Math.random() * SATHI_GREETINGS.length)];

  let messages: string[] = [];

  if (activeDisruptions.length > 0) {
    const disruptionResponse = DISRUPTION_RESPONSES[Math.floor(Math.random() * DISRUPTION_RESPONSES.length)];
    messages.push(disruptionResponse);
  }

  const primaryMode = route.segments[0]?.mode;
  if (primaryMode && SATHI_ROUTE_COMMENTS[primaryMode]) {
    const comments = SATHI_ROUTE_COMMENTS[primaryMode];
    messages.push(comments[Math.floor(Math.random() * comments.length)]);
  }

  if (timeOfDay === "peak_morning" || timeOfDay === "peak_evening") {
    const warning = PEAK_WARNINGS[Math.floor(Math.random() * PEAK_WARNINGS.length)];
    messages.push(warning);
  }

  if (CROWD_WARNINGS[origin]) messages.push(CROWD_WARNINGS[origin]);
  if (CROWD_WARNINGS[destination]) messages.push(CROWD_WARNINGS[destination]);

  if (route.co2Saved > 100) {
    messages.push(`Aur bhai — tune ₹${route.cabEquivalentCost} bachaye aur ${route.co2Saved}g CO₂ bhi save kiya! 🌿`);
  } else if (route.totalCost < 50) {
    messages.push(`Sirf ₹${route.totalCost} mein poora safar — auto waale ko toh ₹${route.cabEquivalentCost}+ dena padta!`);
  }

  if (isMarathi) {
    const marathiGreetings = ["अरे यार!", "भाऊ!", "ऐक रे!"];
    const mg = marathiGreetings[Math.floor(Math.random() * marathiGreetings.length)];
    return `${mg} ${route.totalDuration} मिनिटांत पोहोचशील! ${route.transfers} बदल आहेत. फक्त ₹${route.totalCost} लागतील!`;
  }

  const intro = `${greeting} Route ready! ${route.totalDuration} min journey`;
  const transferStr = route.transfers === 0 ? ", no transfers" : `, ${route.transfers} transfer${route.transfers > 1 ? "s" : ""}`;
  const costStr = ` — only ₹${route.totalCost}`;

  return [intro + transferStr + costStr + ".", ...messages].join(" ");
}

export function generateCrisisMessage(disruption: DisruptionScenario, isMarathi: boolean): string {
  if (isMarathi) {
    return `⚠️ ${disruption.marathi}: ${disruption.description} पर्यायी मार्ग पाहत आहे...`;
  }
  return `${disruption.icon} ${disruption.name} Alert! ${disruption.description} Recalculating your best route now...`;
}

export function getMonsoonScore(path: string[], nodes: Record<string, { floodProne: boolean }>): number {
  const total = path.length;
  const floodProne = path.filter(id => nodes[id]?.floodProne).length;
  return Math.round((1 - floodProne / total) * 10);
}

export function getCrowdScore(path: string[], nodes: Record<string, { crowdFactor: number }>): string {
  const factors = path.map(id => nodes[id]?.crowdFactor ?? 0.5);
  const avg = factors.reduce((a, b) => a + b, 0) / factors.length;
  if (avg > 0.85) return "Very Crowded";
  if (avg > 0.7) return "Crowded";
  if (avg > 0.5) return "Moderate";
  return "Light";
}
