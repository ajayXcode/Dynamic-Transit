
export interface TransitNode {
  id: string;
  name: string;
  marathi: string;
  coords: [number, number];
  modes: string[];
  zone: "south" | "central" | "western" | "harbour" | "thane" | "navi";
  crowdFactor: number;
  floodProne: boolean;
  landmark: string;
}

export interface TransitEdge {
  from: string;
  to: string;
  mode: string;
  duration: number;
  peakFactor: number;
  cost: number;
  co2: number;
  waypoints: [number, number][];
  active: boolean;
  lineId?: string;
}

export const NODES: Record<string, TransitNode> = {
  CSMT: {
    id: "CSMT", name: "CSMT", marathi: "सीएसएमटी",
    coords: [18.9402, 72.8356], modes: ["local", "bus"],
    zone: "south", crowdFactor: 0.9, floodProne: false,
    landmark: "UNESCO Heritage Building"
  },
  CHURCHGATE: {
    id: "CHURCHGATE", name: "Churchgate", marathi: "चर्चगेट",
    coords: [18.9355, 72.8258], modes: ["local", "bus"],
    zone: "south", crowdFactor: 0.85, floodProne: false,
    landmark: "Marine Drive nearby"
  },
  DADAR: {
    id: "DADAR", name: "Dadar", marathi: "दादर",
    coords: [19.0187, 72.8439], modes: ["local", "bus"],
    zone: "central", crowdFactor: 0.95, floodProne: false,
    landmark: "Shivaji Park nearby"
  },
  MATUNGA: {
    id: "MATUNGA", name: "Matunga", marathi: "माटुंगा",
    coords: [19.0285, 72.8562], modes: ["local"],
    zone: "central", crowdFactor: 0.7, floodProne: false,
    landmark: "South Indian restaurants"
  },
  SION: {
    id: "SION", name: "Sion", marathi: "शीव",
    coords: [19.0438, 72.8647], modes: ["local", "bus"],
    zone: "central", crowdFactor: 0.72, floodProne: false,
    landmark: "Sion Fort"
  },
  KURLA: {
    id: "KURLA", name: "Kurla", marathi: "कुर्ला",
    coords: [19.0659, 72.8793], modes: ["local", "bus"],
    zone: "central", crowdFactor: 0.85, floodProne: true,
    landmark: "Phoenix MarketCity"
  },
  GHATKOPAR: {
    id: "GHATKOPAR", name: "Ghatkopar", marathi: "घाटकोपर",
    coords: [19.0863, 72.9083], modes: ["local", "metro"],
    zone: "central", crowdFactor: 0.88, floodProne: false,
    landmark: "Metro Station Hub"
  },
  VIDYAVIHAR: {
    id: "VIDYAVIHAR", name: "Vidyavihar", marathi: "विद्याविहार",
    coords: [19.0799, 72.8980], modes: ["local"],
    zone: "central", crowdFactor: 0.6, floodProne: false,
    landmark: "Somaiya Campus"
  },
  KANJURMARG: {
    id: "KANJURMARG", name: "Kanjurmarg", marathi: "कांजूरमार्ग",
    coords: [19.1028, 72.9222], modes: ["local"],
    zone: "central", crowdFactor: 0.65, floodProne: false,
    landmark: "Residential hub"
  },
  BHANDUP: {
    id: "BHANDUP", name: "Bhandup", marathi: "भांडूप",
    coords: [19.1411, 72.9408], modes: ["local"],
    zone: "central", crowdFactor: 0.68, floodProne: false,
    landmark: "Bhandup Complex"
  },
  MULUND: {
    id: "MULUND", name: "Mulund", marathi: "मुलुंड",
    coords: [19.1737, 72.9554], modes: ["local"],
    zone: "central", crowdFactor: 0.7, floodProne: false,
    landmark: "Mulund Check Naka"
  },
  THANE: {
    id: "THANE", name: "Thane", marathi: "ठाणे",
    coords: [19.1815, 72.9510], modes: ["local", "bus"],
    zone: "thane", crowdFactor: 0.82, floodProne: false,
    landmark: "Upvan Lake"
  },
  KALYAN: {
    id: "KALYAN", name: "Kalyan", marathi: "कल्याण",
    coords: [19.2437, 73.1355], modes: ["local", "bus"],
    zone: "thane", crowdFactor: 0.75, floodProne: false,
    landmark: "Kalyan Fort"
  },
  DOMBIVALI: {
    id: "DOMBIVALI", name: "Dombivali", marathi: "डोंबिवली",
    coords: [19.2165, 73.0839], modes: ["local"],
    zone: "thane", crowdFactor: 0.78, floodProne: false,
    landmark: "Dombivali Market"
  },
  ANDHERI: {
    id: "ANDHERI", name: "Andheri", marathi: "अंधेरी",
    coords: [19.1197, 72.8464], modes: ["local", "metro", "bus"],
    zone: "western", crowdFactor: 0.88, floodProne: false,
    landmark: "Airport nearby"
  },
  BORIVALI: {
    id: "BORIVALI", name: "Borivali", marathi: "बोरिवली",
    coords: [19.2307, 72.8566], modes: ["local", "bus"],
    zone: "western", crowdFactor: 0.83, floodProne: false,
    landmark: "Sanjay Gandhi National Park"
  },
  VIRAR: {
    id: "VIRAR", name: "Virar", marathi: "विरार",
    coords: [19.4609, 72.8065], modes: ["local", "bus"],
    zone: "western", crowdFactor: 0.8, floodProne: false,
    landmark: "Virar Fort"
  },
  BANDRA: {
    id: "BANDRA", name: "Bandra", marathi: "बांद्रा",
    coords: [19.0544, 72.8402], modes: ["local", "bus"],
    zone: "western", crowdFactor: 0.87, floodProne: false,
    landmark: "Bandstand, BKC"
  },
  VASAI: {
    id: "VASAI", name: "Vasai Road", marathi: "वसई रोड",
    coords: [19.3603, 72.8237], modes: ["local"],
    zone: "western", crowdFactor: 0.7, floodProne: false,
    landmark: "Vasai Fort"
  },
  NALASOPARA: {
    id: "NALASOPARA", name: "Nala Sopara", marathi: "नालासोपारा",
    coords: [19.4184, 72.8102], modes: ["local"],
    zone: "western", crowdFactor: 0.72, floodProne: false,
    landmark: "Nalasopara"
  },
  KANDIVALI: {
    id: "KANDIVALI", name: "Kandivali", marathi: "कांदिवली",
    coords: [19.2043, 72.8562], modes: ["local", "bus"],
    zone: "western", crowdFactor: 0.78, floodProne: false,
    landmark: "Growel's Mall"
  },
  MALAD: {
    id: "MALAD", name: "Malad", marathi: "मालाड",
    coords: [19.1887, 72.8489], modes: ["local", "bus"],
    zone: "western", crowdFactor: 0.81, floodProne: false,
    landmark: "Inorbit Mall"
  },
  GOREGAON: {
    id: "GOREGAON", name: "Goregaon", marathi: "गोरेगाव",
    coords: [19.1663, 72.8526], modes: ["local", "bus"],
    zone: "western", crowdFactor: 0.77, floodProne: false,
    landmark: "Film City"
  },
  JOGESHWARI: {
    id: "JOGESHWARI", name: "Jogeshwari", marathi: "जोगेश्वरी",
    coords: [19.1362, 72.8491], modes: ["local"],
    zone: "western", crowdFactor: 0.72, floodProne: false,
    landmark: "Jogeshwari Caves"
  },
  VILE_PARLE: {
    id: "VILE_PARLE", name: "Vile Parle", marathi: "विलेपार्ले",
    coords: [19.0990, 72.8492], modes: ["local"],
    zone: "western", crowdFactor: 0.74, floodProne: false,
    landmark: "JVPD area"
  },
  SANTACRUZ: {
    id: "SANTACRUZ", name: "Santacruz", marathi: "सांताक्रूझ",
    coords: [19.0813, 72.8475], modes: ["local"],
    zone: "western", crowdFactor: 0.73, floodProne: false,
    landmark: "Khar Danda"
  },
  KHAR: {
    id: "KHAR", name: "Khar Road", marathi: "खार रोड",
    coords: [19.0694, 72.8381], modes: ["local"],
    zone: "western", crowdFactor: 0.68, floodProne: false,
    landmark: "Khar Market"
  },
  GRANT_ROAD: {
    id: "GRANT_ROAD", name: "Grant Road", marathi: "ग्रांट रोड",
    coords: [18.9638, 72.8204], modes: ["local"],
    zone: "south", crowdFactor: 0.72, floodProne: false,
    landmark: "Opera House"
  },
  MARINE_LINES: {
    id: "MARINE_LINES", name: "Marine Lines", marathi: "मरीन लाइन्स",
    coords: [18.9443, 72.8204], modes: ["local"],
    zone: "south", crowdFactor: 0.6, floodProne: false,
    landmark: "Marine Drive"
  },
  MUMBAI_CENTRAL: {
    id: "MUMBAI_CENTRAL", name: "Mumbai Central", marathi: "मुंबई सेंट्रल",
    coords: [18.9691, 72.8193], modes: ["local", "bus"],
    zone: "south", crowdFactor: 0.8, floodProne: false,
    landmark: "Bus Terminus"
  },
  MAHALAXMI: {
    id: "MAHALAXMI", name: "Mahalaxmi", marathi: "महालक्ष्मी",
    coords: [18.9835, 72.8188], modes: ["local"],
    zone: "south", crowdFactor: 0.67, floodProne: false,
    landmark: "Mahalaxmi Temple"
  },
  LOWER_PAREL: {
    id: "LOWER_PAREL", name: "Lower Parel", marathi: "लोअर परेल",
    coords: [19.0010, 72.8305], modes: ["local", "monorail"],
    zone: "south", crowdFactor: 0.78, floodProne: false,
    landmark: "Phoenix Mills, Kamala Mills"
  },
  ELPHINSTONE: {
    id: "ELPHINSTONE", name: "Elphinstone Road", marathi: "एल्फिन्स्टन रोड",
    coords: [19.0098, 72.8332], modes: ["local"],
    zone: "south", crowdFactor: 0.7, floodProne: false,
    landmark: "Prabhadevi"
  },
  WADALA: {
    id: "WADALA", name: "Wadala", marathi: "वडाळा",
    coords: [19.0231, 72.8549], modes: ["local", "monorail"],
    zone: "south", crowdFactor: 0.74, floodProne: false,
    landmark: "Tank Bund Road"
  },
  COTTON_GREEN: {
    id: "COTTON_GREEN", name: "Cotton Green", marathi: "कॉटन ग्रीन",
    coords: [18.9867, 72.8490], modes: ["local"],
    zone: "harbour", crowdFactor: 0.6, floodProne: false,
    landmark: "Dockyard"
  },
  REAY_ROAD: {
    id: "REAY_ROAD", name: "Reay Road", marathi: "रे रोड",
    coords: [18.9667, 72.8522], modes: ["local"],
    zone: "harbour", crowdFactor: 0.55, floodProne: false,
    landmark: "Mazgaon"
  },
  SANDHURST_ROAD: {
    id: "SANDHURST_ROAD", name: "Sandhurst Road", marathi: "सँडहर्स्ट रोड",
    coords: [18.9545, 72.8447], modes: ["local"],
    zone: "harbour", crowdFactor: 0.55, floodProne: false,
    landmark: "Central Jail"
  },
  BYCULLA: {
    id: "BYCULLA", name: "Byculla", marathi: "भायखळा",
    coords: [18.9785, 72.8348], modes: ["local"],
    zone: "south", crowdFactor: 0.65, floodProne: false,
    landmark: "Veermata Jijabai Bhosale Udyan"
  },
  CURREY_ROAD: {
    id: "CURREY_ROAD", name: "Currey Road", marathi: "करी रोड",
    coords: [18.9938, 72.8360], modes: ["local"],
    zone: "south", crowdFactor: 0.62, floodProne: false,
    landmark: "Hindmata"
  },
  PAREL: {
    id: "PAREL", name: "Parel", marathi: "परळ",
    coords: [19.0026, 72.8395], modes: ["local"],
    zone: "south", crowdFactor: 0.7, floodProne: false,
    landmark: "KEM Hospital"
  },
  GHATKOPAR_METRO: {
    id: "GHATKOPAR_METRO", name: "Ghatkopar Metro", marathi: "घाटकोपर मेट्रो",
    coords: [19.0863, 72.9083], modes: ["metro"],
    zone: "central", crowdFactor: 0.85, floodProne: false,
    landmark: "Metro Hub"
  },
  VERSOVA: {
    id: "VERSOVA", name: "Versova", marathi: "वर्सोवा",
    coords: [19.1374, 72.8197], modes: ["metro", "ferry"],
    zone: "western", crowdFactor: 0.72, floodProne: false,
    landmark: "Versova Beach"
  },
  BKC: {
    id: "BKC", name: "BKC", marathi: "बीकेसी",
    coords: [19.0677, 72.8674], modes: ["metro", "bus"],
    zone: "central", crowdFactor: 0.82, floodProne: false,
    landmark: "Bandra-Kurla Complex"
  },
  VASHI: {
    id: "VASHI", name: "Vashi", marathi: "वाशी",
    coords: [19.0767, 73.0051], modes: ["local", "bus"],
    zone: "navi", crowdFactor: 0.74, floodProne: false,
    landmark: "Vashi Plaza"
  },
  PANVEL: {
    id: "PANVEL", name: "Panvel", marathi: "पनवेल",
    coords: [18.9946, 73.1111], modes: ["local", "bus"],
    zone: "navi", crowdFactor: 0.7, floodProne: false,
    landmark: "Karnala Fort"
  },
  BELAPUR: {
    id: "BELAPUR", name: "CBD Belapur", marathi: "सीबीडी बेलापूर",
    coords: [19.0219, 73.0351], modes: ["local"],
    zone: "navi", crowdFactor: 0.65, floodProne: false,
    landmark: "CBD Area"
  },
  MANKHURD: {
    id: "MANKHURD", name: "Mankhurd", marathi: "मानखुर्द",
    coords: [19.0514, 72.9303], modes: ["local"],
    zone: "harbour", crowdFactor: 0.68, floodProne: true,
    landmark: "Deonar"
  },
  CHEMBUR: {
    id: "CHEMBUR", name: "Chembur", marathi: "चेंबूर",
    coords: [19.0522, 72.8993], modes: ["local", "monorail", "bus"],
    zone: "central", crowdFactor: 0.75, floodProne: false,
    landmark: "RCF Colony"
  },
  GATEWAY: {
    id: "GATEWAY", name: "Gateway of India", marathi: "गेटवे ऑफ इंडिया",
    coords: [18.9219, 72.8347], modes: ["ferry", "bus"],
    zone: "south", crowdFactor: 0.9, floodProne: false,
    landmark: "Iconic Monument"
  },
  ELEPHANTA: {
    id: "ELEPHANTA", name: "Elephanta Caves", marathi: "एलिफंटा गुहा",
    coords: [18.9633, 72.9314], modes: ["ferry"],
    zone: "harbour", crowdFactor: 0.6, floodProne: false,
    landmark: "UNESCO World Heritage Site"
  },
  MANDWA: {
    id: "MANDWA", name: "Mandwa", marathi: "मांडवा",
    coords: [18.8133, 72.9218], modes: ["ferry"],
    zone: "harbour", crowdFactor: 0.4, floodProne: false,
    landmark: "Alibaug Gateway"
  }
};

export const EDGES: TransitEdge[] = [
  // === CENTRAL LINE (CSMT → Kalyan) ===
  { from: "CSMT", to: "BYCULLA", mode: "local_central", duration: 6, peakFactor: 1.4, cost: 5, co2: 3, waypoints: [[18.9402, 72.8356], [18.9785, 72.8348]], active: true, lineId: "central" },
  { from: "BYCULLA", to: "CURREY_ROAD", mode: "local_central", duration: 4, peakFactor: 1.3, cost: 5, co2: 2, waypoints: [[18.9785, 72.8348], [18.9938, 72.8360]], active: true, lineId: "central" },
  { from: "CURREY_ROAD", to: "PAREL", mode: "local_central", duration: 3, peakFactor: 1.3, cost: 5, co2: 2, waypoints: [[18.9938, 72.8360], [19.0026, 72.8395]], active: true, lineId: "central" },
  { from: "PAREL", to: "DADAR", mode: "local_central", duration: 5, peakFactor: 1.5, cost: 5, co2: 3, waypoints: [[19.0026, 72.8395], [19.0187, 72.8439]], active: true, lineId: "central" },
  { from: "DADAR", to: "MATUNGA", mode: "local_central", duration: 4, peakFactor: 1.3, cost: 5, co2: 2, waypoints: [[19.0187, 72.8439], [19.0285, 72.8562]], active: true, lineId: "central" },
  { from: "MATUNGA", to: "SION", mode: "local_central", duration: 4, peakFactor: 1.2, cost: 5, co2: 2, waypoints: [[19.0285, 72.8562], [19.0438, 72.8647]], active: true, lineId: "central" },
  { from: "SION", to: "KURLA", mode: "local_central", duration: 5, peakFactor: 1.4, cost: 5, co2: 3, waypoints: [[19.0438, 72.8647], [19.0659, 72.8793]], active: true, lineId: "central" },
  { from: "KURLA", to: "VIDYAVIHAR", mode: "local_central", duration: 4, peakFactor: 1.2, cost: 5, co2: 2, waypoints: [[19.0659, 72.8793], [19.0799, 72.8980]], active: true, lineId: "central" },
  { from: "VIDYAVIHAR", to: "GHATKOPAR", mode: "local_central", duration: 4, peakFactor: 1.3, cost: 5, co2: 2, waypoints: [[19.0799, 72.8980], [19.0863, 72.9083]], active: true, lineId: "central" },
  { from: "GHATKOPAR", to: "KANJURMARG", mode: "local_central", duration: 6, peakFactor: 1.2, cost: 10, co2: 3, waypoints: [[19.0863, 72.9083], [19.1028, 72.9222]], active: true, lineId: "central" },
  { from: "KANJURMARG", to: "BHANDUP", mode: "local_central", duration: 6, peakFactor: 1.1, cost: 10, co2: 3, waypoints: [[19.1028, 72.9222], [19.1411, 72.9408]], active: true, lineId: "central" },
  { from: "BHANDUP", to: "MULUND", mode: "local_central", duration: 5, peakFactor: 1.1, cost: 10, co2: 3, waypoints: [[19.1411, 72.9408], [19.1737, 72.9554]], active: true, lineId: "central" },
  { from: "MULUND", to: "THANE", mode: "local_central", duration: 6, peakFactor: 1.2, cost: 10, co2: 4, waypoints: [[19.1737, 72.9554], [19.1815, 72.9510]], active: true, lineId: "central" },
  { from: "THANE", to: "DOMBIVALI", mode: "local_central", duration: 18, peakFactor: 1.2, cost: 15, co2: 8, waypoints: [[19.1815, 72.9510], [19.2165, 73.0839]], active: true, lineId: "central" },
  { from: "DOMBIVALI", to: "KALYAN", mode: "local_central", duration: 12, peakFactor: 1.1, cost: 15, co2: 6, waypoints: [[19.2165, 73.0839], [19.2437, 73.1355]], active: true, lineId: "central" },

  // === WESTERN LINE (Churchgate → Virar) ===
  { from: "CHURCHGATE", to: "MARINE_LINES", mode: "local_western", duration: 3, peakFactor: 1.3, cost: 5, co2: 2, waypoints: [[18.9355, 72.8258], [18.9443, 72.8204]], active: true, lineId: "western" },
  { from: "MARINE_LINES", to: "GRANT_ROAD", mode: "local_western", duration: 5, peakFactor: 1.3, cost: 5, co2: 3, waypoints: [[18.9443, 72.8204], [18.9638, 72.8204]], active: true, lineId: "western" },
  { from: "GRANT_ROAD", to: "MUMBAI_CENTRAL", mode: "local_western", duration: 4, peakFactor: 1.3, cost: 5, co2: 2, waypoints: [[18.9638, 72.8204], [18.9691, 72.8193]], active: true, lineId: "western" },
  { from: "MUMBAI_CENTRAL", to: "MAHALAXMI", mode: "local_western", duration: 4, peakFactor: 1.3, cost: 5, co2: 2, waypoints: [[18.9691, 72.8193], [18.9835, 72.8188]], active: true, lineId: "western" },
  { from: "MAHALAXMI", to: "LOWER_PAREL", mode: "local_western", duration: 4, peakFactor: 1.3, cost: 5, co2: 2, waypoints: [[18.9835, 72.8188], [19.0010, 72.8305]], active: true, lineId: "western" },
  { from: "LOWER_PAREL", to: "ELPHINSTONE", mode: "local_western", duration: 3, peakFactor: 1.3, cost: 5, co2: 2, waypoints: [[19.0010, 72.8305], [19.0098, 72.8332]], active: true, lineId: "western" },
  { from: "ELPHINSTONE", to: "DADAR", mode: "local_western", duration: 4, peakFactor: 1.5, cost: 5, co2: 2, waypoints: [[19.0098, 72.8332], [19.0187, 72.8439]], active: true, lineId: "western" },
  { from: "DADAR", to: "MATUNGA", mode: "local_western", duration: 4, peakFactor: 1.4, cost: 5, co2: 2, waypoints: [[19.0187, 72.8439], [19.0285, 72.8462]], active: true, lineId: "western" },
  { from: "MATUNGA", to: "BANDRA", mode: "local_western", duration: 5, peakFactor: 1.4, cost: 5, co2: 3, waypoints: [[19.0285, 72.8462], [19.0544, 72.8402]], active: true, lineId: "western" },
  { from: "BANDRA", to: "KHAR", mode: "local_western", duration: 4, peakFactor: 1.3, cost: 5, co2: 2, waypoints: [[19.0544, 72.8402], [19.0694, 72.8381]], active: true, lineId: "western" },
  { from: "KHAR", to: "SANTACRUZ", mode: "local_western", duration: 4, peakFactor: 1.2, cost: 5, co2: 2, waypoints: [[19.0694, 72.8381], [19.0813, 72.8475]], active: true, lineId: "western" },
  { from: "SANTACRUZ", to: "VILE_PARLE", mode: "local_western", duration: 4, peakFactor: 1.2, cost: 5, co2: 2, waypoints: [[19.0813, 72.8475], [19.0990, 72.8492]], active: true, lineId: "western" },
  { from: "VILE_PARLE", to: "ANDHERI", mode: "local_western", duration: 5, peakFactor: 1.4, cost: 5, co2: 3, waypoints: [[19.0990, 72.8492], [19.1197, 72.8464]], active: true, lineId: "western" },
  { from: "ANDHERI", to: "JOGESHWARI", mode: "local_western", duration: 5, peakFactor: 1.3, cost: 5, co2: 3, waypoints: [[19.1197, 72.8464], [19.1362, 72.8491]], active: true, lineId: "western" },
  { from: "JOGESHWARI", to: "GOREGAON", mode: "local_western", duration: 5, peakFactor: 1.2, cost: 5, co2: 3, waypoints: [[19.1362, 72.8491], [19.1663, 72.8526]], active: true, lineId: "western" },
  { from: "GOREGAON", to: "MALAD", mode: "local_western", duration: 5, peakFactor: 1.2, cost: 5, co2: 3, waypoints: [[19.1663, 72.8526], [19.1887, 72.8489]], active: true, lineId: "western" },
  { from: "MALAD", to: "KANDIVALI", mode: "local_western", duration: 5, peakFactor: 1.2, cost: 5, co2: 3, waypoints: [[19.1887, 72.8489], [19.2043, 72.8562]], active: true, lineId: "western" },
  { from: "KANDIVALI", to: "BORIVALI", mode: "local_western", duration: 6, peakFactor: 1.2, cost: 5, co2: 3, waypoints: [[19.2043, 72.8562], [19.2307, 72.8566]], active: true, lineId: "western" },
  { from: "BORIVALI", to: "VASAI", mode: "local_western", duration: 20, peakFactor: 1.1, cost: 15, co2: 10, waypoints: [[19.2307, 72.8566], [19.3603, 72.8237]], active: true, lineId: "western" },
  { from: "VASAI", to: "NALASOPARA", mode: "local_western", duration: 10, peakFactor: 1.1, cost: 10, co2: 5, waypoints: [[19.3603, 72.8237], [19.4184, 72.8102]], active: true, lineId: "western" },
  { from: "NALASOPARA", to: "VIRAR", mode: "local_western", duration: 8, peakFactor: 1.0, cost: 10, co2: 4, waypoints: [[19.4184, 72.8102], [19.4609, 72.8065]], active: true, lineId: "western" },

  // === HARBOUR LINE ===
  { from: "CSMT", to: "SANDHURST_ROAD", mode: "local_harbour", duration: 6, peakFactor: 1.2, cost: 5, co2: 3, waypoints: [[18.9402, 72.8356], [18.9545, 72.8447]], active: true, lineId: "harbour" },
  { from: "SANDHURST_ROAD", to: "REAY_ROAD", mode: "local_harbour", duration: 4, peakFactor: 1.1, cost: 5, co2: 2, waypoints: [[18.9545, 72.8447], [18.9667, 72.8522]], active: true, lineId: "harbour" },
  { from: "REAY_ROAD", to: "COTTON_GREEN", mode: "local_harbour", duration: 4, peakFactor: 1.1, cost: 5, co2: 2, waypoints: [[18.9667, 72.8522], [18.9867, 72.8490]], active: true, lineId: "harbour" },
  { from: "COTTON_GREEN", to: "WADALA", mode: "local_harbour", duration: 5, peakFactor: 1.2, cost: 5, co2: 3, waypoints: [[18.9867, 72.8490], [19.0231, 72.8549]], active: true, lineId: "harbour" },
  { from: "WADALA", to: "CHEMBUR", mode: "local_harbour", duration: 6, peakFactor: 1.2, cost: 5, co2: 3, waypoints: [[19.0231, 72.8549], [19.0522, 72.8993]], active: true, lineId: "harbour" },
  { from: "CHEMBUR", to: "MANKHURD", mode: "local_harbour", duration: 7, peakFactor: 1.1, cost: 5, co2: 4, waypoints: [[19.0522, 72.8993], [19.0514, 72.9303]], active: true, lineId: "harbour" },
  { from: "MANKHURD", to: "VASHI", mode: "local_harbour", duration: 20, peakFactor: 1.1, cost: 15, co2: 10, waypoints: [[19.0514, 72.9303], [19.0767, 73.0051]], active: true, lineId: "harbour" },
  { from: "VASHI", to: "BELAPUR", mode: "local_harbour", duration: 15, peakFactor: 1.0, cost: 15, co2: 8, waypoints: [[19.0767, 73.0051], [19.0219, 73.0351]], active: true, lineId: "harbour" },
  { from: "BELAPUR", to: "PANVEL", mode: "local_harbour", duration: 20, peakFactor: 1.0, cost: 15, co2: 10, waypoints: [[19.0219, 73.0351], [18.9946, 73.1111]], active: true, lineId: "harbour" },

  // === METRO LINE 1 (Versova–Andheri–Ghatkopar) ===
  { from: "VERSOVA", to: "ANDHERI", mode: "metro1", duration: 10, peakFactor: 1.2, cost: 40, co2: 5, waypoints: [[19.1374, 72.8197], [19.1197, 72.8464]], active: true, lineId: "metro1" },
  { from: "ANDHERI", to: "GHATKOPAR", mode: "metro1", duration: 20, peakFactor: 1.3, cost: 70, co2: 8, waypoints: [[19.1197, 72.8464], [19.0863, 72.9083]], active: true, lineId: "metro1" },

  // === METRO LINE 2A/7 (approx) ===
  { from: "ANDHERI", to: "BKC", mode: "metro2", duration: 12, peakFactor: 1.2, cost: 40, co2: 5, waypoints: [[19.1197, 72.8464], [19.0677, 72.8674]], active: true, lineId: "metro2" },
  { from: "BKC", to: "GHATKOPAR", mode: "metro2", duration: 8, peakFactor: 1.2, cost: 30, co2: 4, waypoints: [[19.0677, 72.8674], [19.0863, 72.9083]], active: true, lineId: "metro2" },

  // === MONORAIL (Wadala–Chembur–Lower Parel) ===
  { from: "WADALA", to: "CHEMBUR", mode: "monorail", duration: 12, peakFactor: 1.1, cost: 35, co2: 4, waypoints: [[19.0231, 72.8549], [19.0522, 72.8993]], active: true, lineId: "monorail" },
  { from: "CHEMBUR", to: "LOWER_PAREL", mode: "monorail", duration: 18, peakFactor: 1.1, cost: 50, co2: 6, waypoints: [[19.0522, 72.8993], [19.0010, 72.8305]], active: true, lineId: "monorail" },

  // === FERRY ROUTES ===
  { from: "GATEWAY", to: "ELEPHANTA", mode: "ferry", duration: 60, peakFactor: 1.0, cost: 200, co2: 40, waypoints: [[18.9219, 72.8347], [18.9633, 72.9314]], active: true, lineId: "ferry" },
  { from: "GATEWAY", to: "MANDWA", mode: "ferry", duration: 60, peakFactor: 1.0, cost: 180, co2: 38, waypoints: [[18.9219, 72.8347], [18.8133, 72.9218]], active: true, lineId: "ferry" },
  { from: "VERSOVA", to: "GATEWAY", mode: "ferry", duration: 45, peakFactor: 1.0, cost: 100, co2: 30, waypoints: [[19.1374, 72.8197], [18.9219, 72.8347]], active: true, lineId: "ferry" },

  // === WALK CONNECTIONS (transfers) ===
  { from: "DADAR", to: "DADAR", mode: "walk", duration: 3, peakFactor: 1.0, cost: 0, co2: 0, waypoints: [], active: true },
  { from: "CSMT", to: "CHURCHGATE", mode: "walk", duration: 15, peakFactor: 1.0, cost: 0, co2: 0, waypoints: [[18.9402, 72.8356], [18.9355, 72.8258]], active: true },
  { from: "GHATKOPAR", to: "GHATKOPAR_METRO", mode: "walk", duration: 2, peakFactor: 1.0, cost: 0, co2: 0, waypoints: [], active: true },
  { from: "LOWER_PAREL", to: "ELPHINSTONE", mode: "walk", duration: 3, peakFactor: 1.0, cost: 0, co2: 0, waypoints: [], active: true },
  { from: "WADALA", to: "COTTON_GREEN", mode: "walk", duration: 5, peakFactor: 1.0, cost: 0, co2: 0, waypoints: [], active: true },
  { from: "BANDRA", to: "ANDHERI", mode: "bus", duration: 25, peakFactor: 1.8, cost: 15, co2: 20, waypoints: [], active: true },
  { from: "CSMT", to: "GATEWAY", mode: "bus", duration: 20, peakFactor: 1.5, cost: 10, co2: 15, waypoints: [], active: true },
  { from: "ANDHERI", to: "BORIVALI", mode: "bus", duration: 40, peakFactor: 2.0, cost: 20, co2: 30, waypoints: [], active: true },
];

const GRAPH_CACHE_KEY = "mdt_transit_graph_v2";
const CACHE_VERSION = "2.0.3";

export function initializeOfflineData() {
  try {
    const cached = localStorage.getItem(GRAPH_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.version === CACHE_VERSION) return parsed.data;
    }
  } catch {}
  const graphData = { nodes: NODES, edges: EDGES };
  try {
    localStorage.setItem(GRAPH_CACHE_KEY, JSON.stringify({
      version: CACHE_VERSION,
      timestamp: Date.now(),
      data: graphData
    }));
  } catch {}
  return graphData;
}

export function buildAdjacencyList(edges: TransitEdge[]) {
  const adj: Record<string, TransitEdge[]> = {};
  edges.filter(e => e.active).forEach(edge => {
    if (!adj[edge.from]) adj[edge.from] = [];
    if (!adj[edge.to]) adj[edge.to] = [];
    adj[edge.from].push(edge);
    if (edge.mode !== "ferry" && edge.from !== edge.to) {
      adj[edge.to].push({ ...edge, from: edge.to, to: edge.from });
    }
  });
  return adj;
}
