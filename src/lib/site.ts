export const site = {
  name: "Gladys Ntaryike",
  brokerage: "Epique Realty",
  fullName: "Gladys Ntaryike · Epique Realty",
  tagline: "Residential & Commercial Real Estate for Buyers and Sellers",
  phone: "(682) 318-1994",
  phoneHref: "tel:+16823181994",
  email: "Gladystherealtor@gmail.com",
  city: "Euless",
  state: "TX",
  zip: "76040",
  // Street address intentionally not displayed publicly (marked "Hide" in the business profile).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gladysntaryike.com",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/areas", label: "Areas" },
  { href: "/listings", label: "Listings" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

/** Extra links shown in the footer only. */
export const footerLinks = [
  { href: "/mortgage-calculator", label: "Mortgage Calculator" },
  { href: "/contact", label: "Contact" },
  { href: "/iabs", label: "Information About Brokerage Services (IABS)" },
];

/* ─────────────────────────  SERVICES  ───────────────────────── */

export type Service = {
  slug: string;
  title: string;
  kicker: string;
  short: string;
  image: string;
  imageAlt: string;
  secondImage: string;
  secondImageAlt: string;
  headline: string;
  intro: string;
  forWho: string;
  benefits: { title: string; body: string }[];
  process: { title: string; body: string }[];
  includes: string[];
  gallery: { src: string; alt: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "buyers-agent",
    title: "Buyer's Agent",
    kicker: "For buyers",
    short:
      "From your first tour to the day you get the keys, a dedicated advocate who negotiates, protects and guides you through every step.",
    image: "/images/tablet-tour.webp",
    imageAlt: "A real estate agent reviewing a home with a smiling couple on a tablet",
    gallery: [
      { src: "/images/home-tour.webp", alt: "Agent pointing out features of a home to buyers" },
      { src: "/images/hallway-tour.webp", alt: "Agent and buyers touring a bright hallway" },
      { src: "/images/walkthrough.webp", alt: "Agent walking a couple through an open living space" },
      { src: "/images/move-in-handshake.webp", alt: "Agent shaking hands with new homeowners among moving boxes" },
    ],
    secondImage: "/images/keys-handshake.webp",
    secondImageAlt: "Buyers shaking hands with their agent while holding new keys",
    headline: "Find the home that fits your life — and buy it on the best terms.",
    intro:
      "Buying a home or commercial property is one of the biggest decisions you'll make. As your buyer's agent, Gladys works only for you: finding the right properties, reading the market honestly, writing strong offers and keeping every deadline on track.",
    forWho:
      "First-time buyers, move-up families, relocators, investors and business owners looking for residential or commercial property across Dallas–Fort Worth.",
    benefits: [
      {
        title: "Your interests come first",
        body: "A buyer's agent represents you — not the seller. Every recommendation is made with your goals and budget in mind.",
      },
      {
        title: "Local market knowledge",
        body: "Neighborhood-by-neighborhood insight across Euless and the surrounding 50 miles, so you know what a fair price really looks like.",
      },
      {
        title: "Strategic negotiation",
        body: "Strong offers, clear counters and sharp negotiation on price, repairs and closing terms to protect your bottom line.",
      },
      {
        title: "Clear, calm communication",
        body: "No jargon and no guessing. You'll always know what's happening, what's next and what it means for you.",
      },
      {
        title: "Residential & commercial",
        body: "Single-family homes, townhomes, condos, land and commercial spaces — one trusted agent for every kind of purchase.",
      },
      {
        title: "Vetted local network",
        body: "Introductions to trusted lenders, inspectors, title companies and contractors when you need them.",
      },
    ],
    process: [
      {
        title: "Discovery call",
        body: "We talk through your goals, timeline, must-haves and budget so the search is focused from day one.",
      },
      {
        title: "Get financially ready",
        body: "We connect you with trusted lenders to get pre-approved, so your offers are taken seriously.",
      },
      {
        title: "Search & tour",
        body: "Curated listings, early access to new matches and efficient tours — in person or virtual.",
      },
      {
        title: "Offer & negotiate",
        body: "Comparable-sales analysis, a competitive offer strategy and expert negotiation on your behalf.",
      },
      {
        title: "Inspect & close",
        body: "Inspections, appraisal, title and final walk-through — coordinated until you hold the keys.",
      },
    ],
    includes: [
      "Personalized property search & alerts",
      "Private & virtual tours",
      "Market analysis and comparable sales",
      "Offer writing and negotiation",
      "Inspection & repair negotiation support",
      "Closing coordination to the final walk-through",
    ],
    faqs: [
      {
        q: "Does it cost me anything to work with a buyer's agent?",
        a: "Agent compensation is typically agreed and disclosed up front, and in many transactions it's negotiated with the seller side. Gladys will walk you through exactly how it works on your purchase before you sign anything.",
      },
      {
        q: "Should I get pre-approved before I start looking?",
        a: "Yes — it clarifies your real budget and makes your offers more competitive. We can introduce you to trusted local lenders if you'd like.",
      },
      {
        q: "Can you help with commercial property?",
        a: "Yes. Gladys works with both residential and commercial buyers, from first homes to commercial spaces and investment properties.",
      },
      {
        q: "How long does it take to buy a home?",
        a: "Searches vary, but once an offer is accepted, most purchases close in roughly 30 to 45 days. We'll build a timeline around your situation.",
      },
    ],
  },
  {
    slug: "listing-agent",
    title: "Listing Agent",
    kicker: "For sellers",
    short:
      "Strategic pricing, standout marketing and skilled negotiation to sell your property for the best price, with the least stress.",
    image: "/images/agent-model-house.webp",
    imageAlt: "Agent presenting a model home across a desk with contracts",
    gallery: [
      { src: "/images/sell-prep.webp", alt: "A model home presented by hand on a wooden desk" },
      { src: "/images/contract-signing.webp", alt: "Listing agreement being reviewed with a model home" },
      { src: "/images/model-homes-handshake.webp", alt: "Seller and agent shaking hands over model homes" },
      { src: "/images/agent-presents-home.webp", alt: "Agent presenting a home" },
    ],
    secondImage: "/images/sold-handshake.webp",
    secondImageAlt: "A seller and agent shaking hands next to a SOLD sign",
    headline: "Sell with a plan — priced right, presented beautifully, negotiated hard.",
    intro:
      "Selling is about more than putting a sign in the yard. As your listing agent, Gladys builds a pricing and marketing strategy around your property and your timeline, then manages every showing, offer and deadline so you can focus on your next chapter.",
    forWho:
      "Homeowners, landlords, investors and business owners selling residential or commercial property in Euless and across the Dallas–Fort Worth area.",
    benefits: [
      {
        title: "Data-driven pricing",
        body: "A detailed comparative market analysis positions your property to attract strong offers — not sit on the market.",
      },
      {
        title: "Marketing that stands out",
        body: "Polished presentation, online exposure and targeted outreach so the right buyers see your property first.",
      },
      {
        title: "Prep & staging guidance",
        body: "Practical, budget-aware advice on what to fix, clean and style to maximize your net proceeds.",
      },
      {
        title: "Skilled negotiation",
        body: "Offers are reviewed carefully and negotiated for price, terms and timing — protecting your outcome.",
      },
      {
        title: "Showings handled for you",
        body: "Scheduling, feedback and follow-up managed professionally, with clear updates along the way.",
      },
      {
        title: "Smooth path to closing",
        body: "Contracts, option period, appraisal and title coordinated step by step until funds are delivered.",
      },
    ],
    process: [
      {
        title: "Listing consultation",
        body: "We discuss your goals and timeline and walk the property to spot opportunities.",
      },
      {
        title: "Price & prepare",
        body: "A market analysis sets the strategy, plus a simple plan to get the property show-ready.",
      },
      {
        title: "Market & showcase",
        body: "Your listing goes live with strong visuals, compelling copy and wide exposure.",
      },
      {
        title: "Review & negotiate",
        body: "We compare every offer on price, terms and strength, then negotiate for the best result.",
      },
      {
        title: "Close with confidence",
        body: "We manage the details through inspection, appraisal and closing day.",
      },
    ],
    includes: [
      "Comparative market analysis & pricing strategy",
      "Listing preparation and staging advice",
      "Professional marketing and online exposure",
      "Showing coordination and buyer feedback",
      "Offer review and negotiation",
      "Closing management to funding",
    ],
    faqs: [
      {
        q: "How do you decide what my property is worth?",
        a: "Through a comparative market analysis — recent sales of similar properties, current competition, condition and local demand — combined with market trends in your specific neighborhood.",
      },
      {
        q: "Do I need to renovate before selling?",
        a: "Not necessarily. Gladys will tell you honestly which updates pay off and which don't, so you spend only where it increases your return.",
      },
      {
        q: "Can you list commercial properties?",
        a: "Yes. Gladys represents sellers of both residential and commercial property.",
      },
      {
        q: "How long will it take to sell?",
        a: "It depends on price, condition, location and season. After your consultation you'll get a realistic timeline for your property.",
      },
    ],
  },
];

/* ─────────────────────────  AREAS  ───────────────────────── */

export type Area = {
  slug: string;
  name: string;
  county: string;
  group: "Mid-Cities" | "Fort Worth & West" | "Dallas & East" | "North Metroplex";
  lat: number;
  lng: number;
  blurb: string;
  highlights: string[];
  lifestyle: string;
};

const HQ = { lat: 32.837, lng: -97.082 }; // Euless, TX

export const areas: Area[] = [
  {
    slug: "euless",
    name: "Euless",
    county: "Tarrant County",
    group: "Mid-Cities",
    lat: 32.837,
    lng: -97.082,
    blurb:
      "Home base. Euless sits in the heart of the Mid-Cities, minutes from DFW Airport with quick access to Highways 121, 183 and 360.",
    highlights: ["Minutes from DFW Airport", "Central Mid-Cities location", "Hurst-Euless-Bedford ISD"],
    lifestyle: "Commuters, airline & airport professionals and families who want a central, connected address.",
  },
  {
    slug: "bedford",
    name: "Bedford",
    county: "Tarrant County",
    group: "Mid-Cities",
    lat: 32.844,
    lng: -97.143,
    blurb: "A convenient Mid-Cities community with established neighborhoods, parks and easy highway access.",
    highlights: ["Established neighborhoods", "Close to Highway 121 & 183", "Hurst-Euless-Bedford ISD"],
    lifestyle: "Buyers wanting central DFW access at a Mid-Cities pace.",
  },
  {
    slug: "hurst",
    name: "Hurst",
    county: "Tarrant County",
    group: "Mid-Cities",
    lat: 32.823,
    lng: -97.171,
    blurb: "Centrally located between Dallas and Fort Worth with a strong mix of shopping, dining and housing styles.",
    highlights: ["Between Dallas & Fort Worth", "NorthEast Mall area retail", "Hurst-Euless-Bedford ISD"],
    lifestyle: "Households that value convenience, shopping and flexible commutes.",
  },
  {
    slug: "grapevine",
    name: "Grapevine",
    county: "Tarrant County",
    group: "Mid-Cities",
    lat: 32.934,
    lng: -97.078,
    blurb: "A charming destination city known for its historic Main Street, Grapevine Lake and proximity to DFW Airport.",
    highlights: ["Historic Main Street", "Grapevine Lake", "Next door to DFW Airport"],
    lifestyle: "Buyers drawn to character, festivals and lakeside recreation.",
  },
  {
    slug: "colleyville",
    name: "Colleyville",
    county: "Tarrant County",
    group: "Mid-Cities",
    lat: 32.881,
    lng: -97.15,
    blurb: "A polished residential community of larger lots and custom homes, close to everything in the Mid-Cities.",
    highlights: ["Larger lots & custom homes", "Quiet residential feel", "Close to Grapevine & Southlake"],
    lifestyle: "Move-up buyers looking for space and a refined neighborhood setting.",
  },
  {
    slug: "southlake",
    name: "Southlake",
    county: "Tarrant County",
    group: "Mid-Cities",
    lat: 32.941,
    lng: -97.134,
    blurb: "A sought-after address home to Southlake Town Square, upscale housing and a strong sense of community.",
    highlights: ["Southlake Town Square", "Upscale residential options", "Carroll ISD"],
    lifestyle: "Buyers seeking a premium suburban lifestyle with walkable dining and shopping.",
  },
  {
    slug: "north-richland-hills",
    name: "North Richland Hills",
    county: "Tarrant County",
    group: "Mid-Cities",
    lat: 32.834,
    lng: -97.229,
    blurb: "A large, active Tarrant County city with parks, family attractions and a wide range of homes.",
    highlights: ["NRH2O Family Water Park", "Extensive parks & trails", "Birdville ISD"],
    lifestyle: "Families who want variety, recreation and good value.",
  },
  {
    slug: "keller",
    name: "Keller",
    county: "Tarrant County",
    group: "Mid-Cities",
    lat: 32.934,
    lng: -97.252,
    blurb: "A well-loved family community with Old Town Keller, neighborhood parks and a small-town feel.",
    highlights: ["Old Town Keller", "Family-oriented neighborhoods", "Keller ISD"],
    lifestyle: "Families looking for a community-focused suburb north of Fort Worth.",
  },
  {
    slug: "irving",
    name: "Irving",
    county: "Dallas County",
    group: "Dallas & East",
    lat: 32.814,
    lng: -96.949,
    blurb: "A diverse, business-forward city anchored by Las Colinas, with housing from starter homes to luxury condos.",
    highlights: ["Las Colinas business district", "Close to DFW Airport", "Variety of housing types"],
    lifestyle: "Professionals and investors who want proximity to major employers.",
  },
  {
    slug: "coppell",
    name: "Coppell",
    county: "Dallas & Denton Counties",
    group: "Dallas & East",
    lat: 32.955,
    lng: -97.015,
    blurb: "A tidy, family-friendly suburb with convenient airport access and a strong community identity.",
    highlights: ["Near DFW Airport", "Family-friendly neighborhoods", "Coppell ISD"],
    lifestyle: "Families and professionals who value schools, parks and commute convenience.",
  },
  {
    slug: "carrollton",
    name: "Carrollton",
    county: "Dallas, Denton & Collin Counties",
    group: "Dallas & East",
    lat: 32.954,
    lng: -96.89,
    blurb: "A well-connected suburb with historic downtown charm, diverse dining and several highway corridors.",
    highlights: ["Historic downtown Carrollton", "Multiple highway corridors", "Diverse dining scene"],
    lifestyle: "Buyers who want a central north-Dallas location with options.",
  },
  {
    slug: "arlington",
    name: "Arlington",
    county: "Tarrant County",
    group: "Fort Worth & West",
    lat: 32.736,
    lng: -97.108,
    blurb: "Entertainment capital of the Metroplex — home to AT&T Stadium, Globe Life Field and the University of Texas at Arlington.",
    highlights: ["AT&T Stadium & Globe Life Field", "University of Texas at Arlington", "Entertainment District"],
    lifestyle: "Investors, students, and buyers who want energy and variety.",
  },
  {
    slug: "grand-prairie",
    name: "Grand Prairie",
    county: "Dallas, Tarrant & Ellis Counties",
    group: "Dallas & East",
    lat: 32.746,
    lng: -96.998,
    blurb: "A central Metroplex city with lakeside parks, entertainment venues and a range of housing at accessible prices.",
    highlights: ["Joe Pool Lake", "Lone Star Park", "Central location"],
    lifestyle: "Value-minded buyers wanting a central address.",
  },
  {
    slug: "fort-worth",
    name: "Fort Worth",
    county: "Tarrant County",
    group: "Fort Worth & West",
    lat: 32.755,
    lng: -97.333,
    blurb: "Cowtown meets culture: the Stockyards, the Cultural District and a booming downtown alongside diverse neighborhoods.",
    highlights: ["Fort Worth Stockyards", "Cultural District museums", "Sundance Square"],
    lifestyle: "Buyers wanting urban energy, history and abundant housing choices.",
  },
  {
    slug: "dallas",
    name: "Dallas",
    county: "Dallas County",
    group: "Dallas & East",
    lat: 32.777,
    lng: -96.797,
    blurb: "A major business and cultural hub with distinct neighborhoods from Uptown to Lake Highlands.",
    highlights: ["Uptown & Downtown", "Deep Ellum & Bishop Arts", "Major employment centers"],
    lifestyle: "Urban buyers, investors and commercial clients.",
  },
  {
    slug: "flower-mound",
    name: "Flower Mound",
    county: "Denton County",
    group: "North Metroplex",
    lat: 33.015,
    lng: -97.097,
    blurb: "A spacious, family-friendly town with abundant green space, Lewisville Lake access and newer neighborhoods.",
    highlights: ["Lewisville Lake", "Open space & trails", "Lakeside & Bridlewood"],
    lifestyle: "Families who want space and a more rural-suburban feel.",
  },
  {
    slug: "lewisville",
    name: "Lewisville",
    county: "Denton County",
    group: "North Metroplex",
    lat: 33.046,
    lng: -96.994,
    blurb: "A growing city on the shores of Lewisville Lake with an energetic Old Town and strong highway access.",
    highlights: ["Lewisville Lake", "Old Town Lewisville", "I-35E access"],
    lifestyle: "Buyers wanting value, growth and lake recreation.",
  },
  {
    slug: "denton",
    name: "Denton",
    county: "Denton County",
    group: "North Metroplex",
    lat: 33.215,
    lng: -97.133,
    blurb: "A university town with a lively Courthouse Square, a thriving music scene and expanding neighborhoods.",
    highlights: ["Historic Courthouse Square", "UNT & Texas Woman's University", "Arts & music scene"],
    lifestyle: "Students, investors and buyers who like a vibrant small-city feel.",
  },
  {
    slug: "frisco",
    name: "Frisco",
    county: "Collin & Denton Counties",
    group: "North Metroplex",
    lat: 33.15,
    lng: -96.824,
    blurb: "One of DFW's fastest-growing cities, known for sports venues, major retail and master-planned neighborhoods.",
    highlights: ["The Star in Frisco", "Stonebriar Centre", "Master-planned communities"],
    lifestyle: "Growing families and professionals who want newer homes and amenities.",
  },
  {
    slug: "plano",
    name: "Plano",
    county: "Collin & Denton Counties",
    group: "North Metroplex",
    lat: 33.02,
    lng: -96.699,
    blurb: "A mature, amenity-rich city with corporate headquarters, historic Downtown Plano and diverse housing.",
    highlights: ["Legacy business district", "Historic Downtown Plano", "Established neighborhoods"],
    lifestyle: "Corporate professionals and families seeking an established, connected city.",
  },
  {
    slug: "allen",
    name: "Allen",
    county: "Collin County",
    group: "North Metroplex",
    lat: 33.103,
    lng: -96.671,
    blurb: "A family-focused city with great parks, a lively events scene and easy access to US-75.",
    highlights: ["Allen Premium Outlets", "Parks & recreation", "US-75 corridor"],
    lifestyle: "Families who like events, parks and convenient shopping.",
  },
  {
    slug: "mckinney",
    name: "McKinney",
    county: "Collin County",
    group: "North Metroplex",
    lat: 33.198,
    lng: -96.64,
    blurb: "Charming historic downtown, award-winning growth and new master-planned neighborhoods on the north edge of the Metroplex.",
    highlights: ["Historic downtown square", "New master-planned communities", "Boutique dining & shopping"],
    lifestyle: "Buyers who want small-town charm and room to grow.",
  },
  {
    slug: "richardson",
    name: "Richardson",
    county: "Dallas & Collin Counties",
    group: "Dallas & East",
    lat: 32.948,
    lng: -96.73,
    blurb: "A tech-oriented city with the Telecom Corridor, UT Dallas and a wide range of established neighborhoods.",
    highlights: ["Telecom Corridor", "UT Dallas", "DART rail access"],
    lifestyle: "Tech professionals, students and buyers who value transit access.",
  },
  {
    slug: "garland",
    name: "Garland",
    county: "Dallas County",
    group: "Dallas & East",
    lat: 32.913,
    lng: -96.639,
    blurb: "A large, affordable east-Dallas-County city with lakefront access along Lake Ray Hubbard and diverse housing.",
    highlights: ["Lake Ray Hubbard", "Affordable options", "Downtown Garland revitalization"],
    lifestyle: "Value-focused buyers and investors.",
  },
  {
    slug: "mansfield",
    name: "Mansfield",
    county: "Tarrant, Johnson & Ellis Counties",
    group: "Fort Worth & West",
    lat: 32.563,
    lng: -97.142,
    blurb: "A fast-growing south-Tarrant city with newer neighborhoods, parks and a small-town core.",
    highlights: ["Newer neighborhoods", "Historic downtown", "Strong growth"],
    lifestyle: "Families wanting newer construction south of the Mid-Cities.",
  },
  {
    slug: "burleson",
    name: "Burleson",
    county: "Johnson & Tarrant Counties",
    group: "Fort Worth & West",
    lat: 32.542,
    lng: -97.321,
    blurb: "A friendly, growing community south of Fort Worth with an inviting Old Town and plenty of new-home options.",
    highlights: ["Old Town Burleson", "New-home communities", "Close to Fort Worth"],
    lifestyle: "Buyers looking for a small-town feel with big-city reach.",
  },
  {
    slug: "cedar-hill",
    name: "Cedar Hill",
    county: "Dallas & Ellis Counties",
    group: "Dallas & East",
    lat: 32.588,
    lng: -96.956,
    blurb: "A hilltop city known for Cedar Hill State Park, Joe Pool Lake and scenic views just south of Dallas.",
    highlights: ["Cedar Hill State Park", "Joe Pool Lake", "Scenic elevated terrain"],
    lifestyle: "Outdoor-minded buyers who want nature near the city.",
  },
  {
    slug: "midlothian",
    name: "Midlothian",
    county: "Ellis County",
    group: "Dallas & East",
    lat: 32.482,
    lng: -97.005,
    blurb: "A growing southern-Metroplex community with room to breathe, newer neighborhoods and a historic downtown.",
    highlights: ["Historic downtown", "Newer communities", "Space & value"],
    lifestyle: "Buyers wanting acreage and a quieter pace within reach of the Metroplex.",
  },
  {
    slug: "weatherford",
    name: "Weatherford",
    county: "Parker County",
    group: "Fort Worth & West",
    lat: 32.759,
    lng: -97.797,
    blurb: "The Parker County seat — known for its historic courthouse square, farmers market and a more rural pace.",
    highlights: ["Historic courthouse square", "Weatherford Farmers Market", "Rural-suburban lifestyle"],
    lifestyle: "Buyers seeking acreage and western charm west of Fort Worth.",
  },
];

export const alsoServing = [
  "Haltom City", "Watauga", "Haslet", "Roanoke", "Trophy Club", "Westlake", "Azle", "Saginaw", "Benbrook",
  "Crowley", "Duncanville", "DeSoto", "Lancaster", "Addison", "Farmers Branch", "The Colony", "Little Elm",
  "Rockwall", "Mesquite", "Waxahachie", "Aledo",
];

function toRad(d: number) {
  return (d * Math.PI) / 180;
}
export function milesFromEuless(lat: number, lng: number) {
  const R = 3958.8;
  const dLat = toRad(lat - HQ.lat);
  const dLng = toRad(lng - HQ.lng);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(HQ.lat)) * Math.cos(toRad(lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
/** Local-plane offset (miles) east/north of Euless for the radius map. */
export function offsetMiles(lat: number, lng: number) {
  return {
    x: (lng - HQ.lng) * 69.17 * Math.cos(toRad(HQ.lat)),
    y: (lat - HQ.lat) * 69.0,
  };
}

export const areasWithDistance = areas.map((a) => ({
  ...a,
  miles: Math.max(0, Math.round(milesFromEuless(a.lat, a.lng))),
}));

export const getArea = (slug: string) => areasWithDistance.find((a) => a.slug === slug);
export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const faqs = [
  {
    q: "What areas do you serve?",
    a: "Gladys is based in Euless, TX and serves buyers and sellers within roughly 50 miles — including Fort Worth, Dallas, Arlington, Grapevine, Southlake, Irving, Plano, Frisco, Denton, McKinney and many more communities across the Dallas–Fort Worth Metroplex.",
  },
  {
    q: "Do you work with both buyers and sellers?",
    a: "Yes. Gladys acts as a buyer's agent for purchases and as a listing agent for sales — and can help if you're doing both at once, such as selling a home and buying your next one.",
  },
  {
    q: "Do you handle residential and commercial real estate?",
    a: "Yes. Residential and commercial transactions are both part of the practice — from single-family homes and condos to commercial space and investment property.",
  },
  {
    q: "How do I get started?",
    a: "Call (682) 318-1994, email Gladystherealtor@gmail.com or use the contact form. The first consultation is a relaxed conversation about your goals, timeline and budget — no pressure.",
  },
  {
    q: "Should I get pre-approved before I search?",
    a: "Yes. A lender pre-approval shows you exactly what you can afford and makes your offers more competitive. Gladys can introduce you to trusted local lenders.",
  },
  {
    q: "When is the best time to sell?",
    a: "Spring and early summer are often busy, but the best time to sell is when it fits your plans and your local market conditions. A free listing consultation will give you a realistic view for your property.",
  },
  {
    q: "How is a buyer's agent paid?",
    a: "Compensation is agreed in writing up front and is often negotiated as part of the transaction. Gladys will explain exactly how it works for your situation before you commit to anything.",
  },
];

/* ───── Imagery & content helpers for area pages ───── */
const urban = new Set(["dallas", "fort-worth", "irving", "plano", "frisco", "richardson", "arlington", "carrollton"]);
const suburbPool = ["/images/neighborhood.webp", "/images/walkthrough.webp", "/images/home-tour.webp", "/images/hallway-tour.webp", "/images/tablet-tour.webp", "/images/move-in-handshake.webp"];
const urbanPool = ["/images/modern-skyline.webp", "/images/commercial-development.webp", "/images/commercial-model.webp"];

export function areaImage(slug: string) {
  const idx = areas.findIndex((a) => a.slug === slug);
  const pool = urban.has(slug) ? urbanPool : suburbPool;
  return pool[idx % pool.length];
}
export function areaSecondImage(slug: string) {
  const idx = areas.findIndex((a) => a.slug === slug);
  const pool = ["/images/keys-handshake.webp", "/images/sell-prep.webp", "/images/contract-signing.webp", "/images/agent-model-house.webp", "/images/sold-handshake.webp"];
  return pool[idx % pool.length];
}

export function areaFaqs(name: string) {
  return [
    { q: `Do you help buyers in ${name}, TX?`, a: `Yes. As a buyer's agent, Gladys helps you search, tour, negotiate and close on residential or commercial property in ${name} and the surrounding area.` },
    { q: `Can you help me sell my property in ${name}?`, a: `Absolutely. As a listing agent, Gladys builds a pricing and marketing plan around your ${name} property and manages showings, offers and closing.` },
    { q: `How far is ${name} from Euless?`, a: `Gladys is based in Euless, TX and serves clients within roughly 50 miles — ${name} is well within that service area.` },
    { q: "How do I get started?", a: "Call (682) 318-1994, email Gladystherealtor@gmail.com or use the contact form for a free, no-pressure consultation." },
  ];
}
