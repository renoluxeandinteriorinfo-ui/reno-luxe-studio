import goldcurl from "@/assets/scene-living.jpg";
import acrylic from "@/assets/scene-bedroom.jpg";
import standingLamps from "@/assets/scene-office.jpg";
import centerTables from "@/assets/scene-retail.jpg";
import centerTables2 from "@/assets/scene-living.jpg";
import sideStool from "@/assets/scene-bedroom.jpg";
import tripod from "@/assets/scene-office.jpg";
import figurines from "@/assets/scene-retail.jpg";
import figurines2 from "@/assets/scene-living.jpg";
import foreignCouch from "@/assets/scene-bedroom.jpg";
import fancyChairs from "@/assets/scene-office.jpg";
import kaws from "@/assets/scene-retail.jpg";
import visualizationLamp from "@/assets/scene-living.jpg";
import backMan from "@/assets/scene-bedroom.jpg";
import swingChairs from "@/assets/scene-office.jpg";
import frames from "@/assets/scene-retail.jpg";
import plasticVase from "@/assets/scene-living.jpg";
import mirror from "@/assets/scene-bedroom.jpg";

import viju1 from "@/assets/scene-office.jpg";
import viju2 from "@/assets/scene-retail.jpg";
import viju3 from "@/assets/scene-living.jpg";
import viju4 from "@/assets/scene-bedroom.jpg";

import heroCover from "@/assets/scene-living.jpg";
import brandPoster from "@/assets/scene-bedroom.jpg";
import portfolioStrip from "@/assets/scene-retail.jpg";
const logo = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-21%20at%207.21.40%20PM-LfqAaPp9rRQSSZasOijFBi5zpWnwDX.jpeg";

import sceneLiving from "@/assets/scene-living.jpg";
import sceneBedroom from "@/assets/scene-bedroom.jpg";
import sceneOffice from "@/assets/scene-office.jpg";
import sceneRetail from "@/assets/scene-retail.jpg";

export const BRAND_IMAGES = {
  logo: logo,
  hero: heroCover,
  poster: brandPoster,
  strip: portfolioStrip,
  scenes: {
    living: sceneLiving,
    bedroom: sceneBedroom,
    office: sceneOffice,
    retail: sceneRetail,
  },
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  short: string;
  description: string;
  image: string;
  gallery: string[];
  installation: "professional" | "diy" | "either";
};

const p = (
  slug: string,
  name: string,
  category: string,
  short: string,
  description: string,
  image: string,
  installation: Product["installation"] = "either",
  gallery: string[] = [],
): Product => ({
  slug,
  name,
  category,
  short,
  description,
  image,
  gallery: [image, ...gallery],
  installation,
});

export const PRODUCTS: Product[] = [
  p(
    "swing-chairs",
    "Swing Chairs",
    "Chairs",
    "Suspended egg-style swing seating with cushioning.",
    "Statement swing seating with a supporting frame and padded cushion. A sculptural addition to a lounge, balcony, reading corner or reception area. Colours and cushion options are confirmed on enquiry.",
    swingChairs,
    "professional",
  ),
  p(
    "foreign-couch",
    "Foreign Couch",
    "Furniture",
    "Curved contemporary couch for modern living rooms.",
    "A soft, curved couch designed for contemporary living spaces. Ideal as the anchor piece of a living room scheme. Fabric, size and configuration options are confirmed during enquiry.",
    foreignCouch,
    "professional",
  ),
  p(
    "fancy-chairs",
    "Fancy Chairs",
    "Chairs",
    "Upholstered accent and dining chairs.",
    "Upholstered accent chairs suitable for dining rooms, offices and lounges. Available in a selection of finishes — current options are confirmed on enquiry.",
    fancyChairs,
  ),
  p(
    "center-tables",
    "Center Tables",
    "Tables",
    "Round marble-top centre table with gold frame.",
    "A round centre table with a light stone-look top and a metal frame. Designed to sit at the heart of a living room arrangement.",
    centerTables,
    "diy",
    [centerTables2],
  ),
  p(
    "center-table-dark",
    "Dark Wood Center Table",
    "Tables",
    "Low-profile dark timber centre table.",
    "A low, rectangular centre table in a dark timber finish. Pairs well with neutral upholstery and warm lighting.",
    centerTables2,
    "diy",
  ),
  p(
    "side-stool",
    "Side Stool",
    "Tables",
    "Two-tier round side stool.",
    "A compact two-tier side stool for beside a sofa or bed. Useful as an extra surface with additional display space below.",
    sideStool,
    "diy",
  ),
  p(
    "standing-lamps",
    "Standing Lamps",
    "Lighting",
    "Arched floor lamp for ambient lighting.",
    "An arched standing lamp that delivers soft ambient light over a seating area. A simple way to add layered lighting to a room.",
    standingLamps,
    "diy",
  ),
  p(
    "visualization-lamp",
    "Visualization Lamp",
    "Lighting",
    "Illuminated acrylic display lamp.",
    "An illuminated display lamp with an engraved acrylic panel. Works as a bedside, desk or shelf accent light.",
    visualizationLamp,
    "diy",
  ),
  p(
    "tripod-flame-aroma",
    "Tripod Flame Aroma",
    "Accessories",
    "Aroma diffuser with dynamic light effects.",
    "An aroma diffuser with adjustable light effects and remote control. Adds scent and soft colour to bedrooms, lounges and studios.",
    tripod,
    "diy",
  ),
  p(
    "mirror",
    "Mirrors",
    "Mirrors",
    "Arched and framed decorative mirrors.",
    "Decorative mirrors in arched and framed profiles. Mirrors open up a space visually and reflect light through a room. Sizes and frame finishes are confirmed on enquiry.",
    mirror,
    "professional",
  ),
  p(
    "acrylic-wall-sculpture",
    "Acrylic Wall Sculpture",
    "Wall Décor",
    "Layered acrylic scenic wall piece.",
    "A layered acrylic wall sculpture with a scenic composition. Designed as a focal wall piece for a living room, hallway or reception.",
    acrylic,
    "professional",
  ),
  p(
    "frames",
    "Frames",
    "Wall Décor",
    "Framed wall art and lettering pieces.",
    "Framed art and lettering pieces for gallery walls and feature walls. Custom wording and framing options are discussed on enquiry.",
    frames,
    "diy",
  ),
  p(
    "goldcurl-ornaments",
    "Goldcurl Ornaments",
    "Sculptures",
    "Sculptural gold curl ornaments on a base.",
    "A pair of sculptural gold-toned curl ornaments mounted on display bases. Ideal for console tables, shelving and centre tables.",
    goldcurl,
    "diy",
  ),
  p(
    "figurines",
    "Figurines",
    "Figurines",
    "Curated decorative figurines collection.",
    "A curated selection of decorative figurines in mixed finishes for shelves, consoles and display units. Available pieces vary — current stock is confirmed on enquiry.",
    figurines,
    "diy",
    [figurines2],
  ),
  p(
    "back-man-figurines",
    "Back Man Figurines",
    "Figurines",
    "Musician-style character figurines pair.",
    "A pair of character figurines with a musical theme. A playful, contemporary accent for a shelf or media unit.",
    backMan,
    "diy",
  ),
  p(
    "kaws",
    "Kaws",
    "Figurines",
    "Contemporary collectible-style figures.",
    "Contemporary collectible-style figures for modern and art-led interiors. Sizes and finishes are confirmed on enquiry.",
    kaws,
    "diy",
  ),
  p(
    "figurine-gold-face",
    "Gold Face Figurines",
    "Sculptures",
    "Sculpted face figurines with gold detail.",
    "Sculpted face figurines finished with gold detailing, designed as a paired feature on a console or shelf.",
    figurines2,
    "diy",
  ),
  p(
    "plastic-vase-flowers",
    "Plastic Vase Flowers",
    "Vases",
    "Vase arrangements with lasting faux florals.",
    "Vase arrangements with long-lasting faux florals in a range of colours. A low-maintenance way to add softness and colour to a room.",
    plasticVase,
    "diy",
  ),
];

export const PRODUCT_CATEGORIES = [
  "All",
  ...Array.from(new Set(PRODUCTS.map((x) => x.category))).sort(),
];

export function getProduct(slug: string) {
  return PRODUCTS.find((x) => x.slug === slug);
}

export type VijuItem = { slug: string; name: string; note: string; image: string };

export const VIJU_ITEMS: VijuItem[] = [
  {
    slug: "viju-range",
    name: "Viju Full Product Range",
    note: "Assorted drinks, milk, yoghurt and water range as shown.",
    image: viju2,
  },
  {
    slug: "viju-milk-drinks",
    name: "Viju Milk Drinks Selection",
    note: "Chocolate, malt, wheat and baked yoghurt drinks.",
    image: viju1,
  },
  {
    slug: "viju-family-choice",
    name: "Viju Family Selection",
    note: "Mixed flavours including wheat, chocolate, apple and orange.",
    image: viju4,
  },
  {
    slug: "viju-assorted",
    name: "Viju Assorted Cartons & Bottles",
    note: "Bottled and carton formats for bulk purchase.",
    image: viju3,
  },
];

export type Service = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  points: string[];
  image: string;
};

export const SERVICES: Service[] = [
  {
    slug: "luxury-home-renovation",
    title: "Luxury Home Renovation",
    summary:
      "Transform existing residential spaces through thoughtful renovation, layout improvements, finishes, décor and styling.",
    detail:
      "We assess the existing space, agree a design direction with you, and work through finishes, joinery, lighting and styling so the finished home feels considered from every angle.",
    points: ["Space assessment", "Layout improvements", "Finishes & materials", "Décor and final styling"],
    image: sceneLiving,
  },
  {
    slug: "interior-design-styling",
    title: "Interior Design & Styling",
    summary:
      "Create cohesive, elegant interiors based on your taste, lifestyle, functionality and space.",
    detail:
      "A complete design direction: palette, materials, furniture, lighting and accessories brought together into one coherent scheme that suits how you actually live or work.",
    points: ["Design direction", "Colour & material palette", "Furniture selection", "Accessory styling"],
    image: sceneBedroom,
  },
  {
    slug: "premium-furniture-decor",
    title: "Premium Furniture & Décor",
    summary:
      "Selected furniture, décor pieces and accessories that complement sophisticated interiors.",
    detail:
      "We source and supply furniture and décor that fits the scheme — from anchor pieces such as couches and centre tables to the finishing accessories.",
    points: ["Sourcing & supply", "Worldwide delivery", "Quality-led selection", "Scheme-matched pieces"],
    image: sceneOffice,
  },
  {
    slug: "space-planning",
    title: "Space Planning & Layout",
    summary: "Optimise the arrangement and functionality of your spaces.",
    detail:
      "Planning circulation, zoning and furniture placement so a space works properly before anything is bought or installed.",
    points: ["Zoning & circulation", "Furniture placement", "Functional review", "Scale & proportion"],
    image: sceneRetail,
  },
  {
    slug: "home-decor-accessories",
    title: "Home Décor Accessories",
    summary:
      "Mirrors, figurines, ornaments, vases, sculptures, lamps, tables, chairs and other décor accessories.",
    detail:
      "The finishing layer of a room. Browse the catalogue or tell us the look you want and we will suggest pieces that fit the space.",
    points: ["Mirrors & wall décor", "Figurines & sculptures", "Vases & florals", "Lamps & accent furniture"],
    image: figurines,
  },
  {
    slug: "3d-interior-visualization",
    title: "3D Interior Visualization",
    summary:
      "Conceptual visualizations that help you understand how a space could look before implementation.",
    detail:
      "Visual concepts make decisions easier. Try the on-site Visualize Your Space tool for an instant conceptual direction, or request a bespoke visualization from our team.",
    points: ["Concept imagery", "Style exploration", "Direction before spend", "Bespoke visualizations on request"],
    image: sceneLiving,
  },
  {
    slug: "custom-interior-projects",
    title: "Custom Interior Projects",
    summary:
      "Request a completely custom project that does not fit an existing service or package.",
    detail:
      "If your requirement sits outside our standard services, describe it and we will scope it with you from first idea to installation.",
    points: ["Bespoke scope", "Tailored quotation", "Design + sourcing + execution", "Any space type"],
    image: sceneOffice,
  },
];

export type Package = {
  slug: string;
  title: string;
  intro: string;
  bestFor: string[];
  scope: string[];
};

export const PACKAGES: Package[] = [
  {
    slug: "full-house-transformation",
    title: "Full House Transformation",
    intro: "For clients who want the entire home decorated or redesigned.",
    bestFor: ["Whole homes", "New properties", "Complete refreshes"],
    scope: [
      "Initial consultation",
      "Space assessment",
      "Design direction",
      "Space planning",
      "Colour and material direction",
      "Furniture selection",
      "Décor selection",
      "Lighting recommendations",
      "Styling",
      "3D visualization where appropriate",
      "Implementation / installation options within Nigeria",
    ],
  },
  {
    slug: "single-room-transformation",
    title: "Single Room Transformation",
    intro: "One room, fully considered — from layout to the final accessory.",
    bestFor: ["Living room", "Bedroom", "Dining room", "Home office", "Other individual spaces"],
    scope: [
      "Consultation for the room",
      "Layout and space planning",
      "Colour and material direction",
      "Furniture and décor selection",
      "Lighting recommendations",
      "Styling and finishing",
    ],
  },
  {
    slug: "shop-commercial-space",
    title: "Shop / Commercial Space",
    intro: "Interiors for business environments where the space has to work as hard as it looks.",
    bestFor: ["Retail shops", "Offices", "Showrooms", "Small commercial spaces", "Other business environments"],
    scope: [
      "Brand-aware design direction",
      "Customer flow and layout planning",
      "Display and furniture selection",
      "Lighting recommendations",
      "Finishes and materials",
      "Installation options within Nigeria",
    ],
  },
  {
    slug: "custom-project",
    title: "Custom Project",
    intro: "For requirements that do not fit any package above.",
    bestFor: ["Unique briefs", "Partial scopes", "Mixed-use spaces", "Specialist requests"],
    scope: [
      "Discovery conversation",
      "Scope defined around your brief",
      "Design and sourcing as required",
      "Implementation options discussed",
    ],
  },
];

export type PortfolioItem = {
  slug: string;
  name: string;
  category: string;
  short: string;
  overview: string;
  approach: string;
  services: string[];
  pieces: string[];
  cover: string;
  gallery: string[];
  concept: boolean;
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    slug: "warm-neutral-living-room",
    name: "Warm Neutral Living Room",
    category: "Interior Styling",
    short: "A soft neutral lounge scheme built around a low round centre table.",
    overview:
      "A living-room direction built on warm neutral upholstery, layered textiles and a single sculptural centre table. This is the styling language Reno Luxe applies to residential lounges.",
    approach:
      "Keep the palette quiet, let texture carry the interest, and use one strong sculptural piece as the anchor of the seating arrangement.",
    services: ["Interior Design & Styling", "Premium Furniture & Décor", "Space Planning & Layout"],
    pieces: ["Center Tables", "Plastic Vase Flowers", "Frames"],
    cover: heroCover,
    gallery: [heroCover, brandPoster],
    concept: false,
  },
  {
    slug: "mirror-and-light-entry",
    name: "Mirror & Light Entry Styling",
    category: "Residential",
    short: "Entry and hallway styling using mirrors, framed art and soft lighting.",
    overview:
      "Entry-area styling from the Reno Luxe reference collection — arched mirrors, framed wall pieces and warm lighting used to open up narrow spaces.",
    approach:
      "Mirrors are placed to bounce light deeper into the space, with framed pieces keeping the eye moving along the wall.",
    services: ["Interior Design & Styling", "Home Décor Accessories"],
    pieces: ["Mirrors", "Frames", "Standing Lamps"],
    cover: portfolioStrip,
    gallery: [portfolioStrip, mirror, frames],
    concept: false,
  },
  {
    slug: "black-and-gold-lounge-concept",
    name: "Black & Gold Lounge Concept",
    category: "Custom Projects",
    short: "A concept direction for a dark, gold-accented lounge.",
    overview:
      "A conceptual design direction, not a completed client project. It shows how a black and gold scheme can stay warm rather than cold.",
    approach:
      "A dark feature wall, warm neutral seating, brushed gold detailing and layered lighting used sparingly.",
    services: ["Interior Design & Styling", "3D Interior Visualization"],
    pieces: ["Foreign Couch", "Goldcurl Ornaments", "Standing Lamps"],
    cover: sceneLiving,
    gallery: [sceneLiving, sceneBedroom],
    concept: true,
  },
  {
    slug: "executive-office-concept",
    name: "Executive Office Concept",
    category: "Commercial",
    short: "Concept direction for a dark timber and gold executive office.",
    overview:
      "A conceptual commercial direction showing how a workspace can feel executive without losing warmth.",
    approach: "Dark timber joinery, integrated lighting, restrained gold trims and a clear meeting zone.",
    services: ["Space Planning & Layout", "Interior Design & Styling"],
    pieces: ["Fancy Chairs", "Frames"],
    cover: sceneOffice,
    gallery: [sceneOffice, sceneRetail],
    concept: true,
  },
  {
    slug: "boutique-retail-concept",
    name: "Boutique Retail Concept",
    category: "Commercial",
    short: "Concept direction for a small luxury retail space.",
    overview:
      "A conceptual retail direction focused on display lighting, circulation and a strong central counter.",
    approach: "Dark display joinery, focused lighting on merchandise, and a clear path through the space.",
    services: ["Space Planning & Layout", "Premium Furniture & Décor"],
    pieces: ["Standing Lamps", "Goldcurl Ornaments"],
    cover: sceneRetail,
    gallery: [sceneRetail, sceneOffice],
    concept: true,
  },
  {
    slug: "bedroom-refresh-concept",
    name: "Bedroom Refresh Concept",
    category: "Renovation",
    short: "Concept direction for a panelled bedroom refresh.",
    overview:
      "A conceptual renovation direction for a main bedroom, showing panelling, lighting and soft layered bedding.",
    approach: "A dark panelled headboard wall, warm cream textiles and pendant lighting either side of the bed.",
    services: ["Luxury Home Renovation", "Interior Design & Styling"],
    pieces: ["Side Stool", "Visualization Lamp"],
    cover: sceneBedroom,
    gallery: [sceneBedroom, sceneLiving],
    concept: true,
  },
];

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Renovation",
  "Interior Styling",
  "Custom Projects",
];

export function getProject(slug: string) {
  return PORTFOLIO.find((x) => x.slug === slug);
}

export function getServiceBySlug(slug: string) {
  return SERVICES.find((x) => x.slug === slug);
}

export function getPackage(slug: string) {
  return PACKAGES.find((x) => x.slug === slug);
}
