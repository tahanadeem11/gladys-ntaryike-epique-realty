/**
 * Closed transactions exported from the brokerage system (transactions-2026-11-23.csv).
 *
 * Deliberately NOT published: commission amounts, internal transaction IDs and agent/team columns.
 * Cleanup applied to the raw export:
 *  - "Forth Worth" typo fixed
 *  - the two 9356 Tunilla Court rows (same close date, buyer + seller) are merged into one "Buyer & Seller" sale
 *  - 121 Cedar Sage Lane has a $0 price in the export, so its price is shown as "Price not disclosed"
 */

export type Side = "Buyer" | "Seller" | "Buyer & Seller";

export type Transaction = {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number | null;
  closed: string; // ISO yyyy-mm-dd
  side: Side;
  /** Optional real property photo (e.g. "/images/listings/6524-beaty.webp"). Falls back to a stock image. */
  photo?: string;
};

/** Set to false to hide house numbers (e.g. "Beaty Street" instead of "6524 Beaty Street"). */
export const SHOW_HOUSE_NUMBERS = true;

const raw: Omit<Transaction, "id">[] = [
  { address: "6524 Beaty Street", city: "Fort Worth", state: "TX", zip: "76112", price: 85000, closed: "2026-11-03", side: "Seller" },
  { address: "1854 Dolce Lane", city: "Rockwall", state: "TX", zip: "75032", price: 599700, closed: "2026-10-22", side: "Buyer" },
  { address: "929 Ryed Lane", city: "Fort Worth", state: "TX", zip: "76120", price: 490000, closed: "2026-09-28", side: "Seller" },
  { address: "1124 Runway Road", city: "Fort Worth", state: "TX", zip: "76008", price: 428473, closed: "2026-08-19", side: "Buyer" },
  { address: "7765 Hickory Spring Lane", city: "Tyler", state: "TX", zip: "75703", price: 458000, closed: "2026-07-28", side: "Seller" },
  { address: "1026 Stillmeade Drive", city: "Midlothian", state: "TX", zip: "76065", price: 573000, closed: "2026-07-13", side: "Seller" },
  { address: "112 Cedar Sage Lane", city: "Balch Springs", state: "TX", zip: "75181", price: 234000, closed: "2026-06-06", side: "Buyer" },
  { address: "3610 Frank Street", city: "Dallas", state: "TX", zip: "75210", price: 234900, closed: "2026-06-04", side: "Buyer" },
  { address: "838 Blue Heron Drive", city: "Forney", state: "TX", zip: "75126", price: 468900, closed: "2026-05-07", side: "Buyer" },
  { address: "6620 Creek Edge Circle", city: "Fort Worth", state: "TX", zip: "76123", price: 418000, closed: "2026-05-04", side: "Buyer" },
  { address: "7057 Havenridge Lane", city: "Kaufman", state: "TX", zip: "75142", price: 280000, closed: "2026-04-30", side: "Seller" },
  { address: "121 Cedar Sage Lane", city: "Balch Springs", state: "TX", zip: "75181", price: null, closed: "2026-04-20", side: "Buyer" },
  { address: "5601 Fairway Circle", city: "Haltom City", state: "TX", zip: "76117", price: 245000, closed: "2026-01-13", side: "Seller" },
  { address: "922 Christopher Drive", city: "Cedar Hill", state: "TX", zip: "75104", price: 415000, closed: "2025-12-22", side: "Seller" },
  { address: "6025 Humber Lane", city: "Celina", state: "TX", zip: "75009", price: 560000, closed: "2025-11-25", side: "Buyer" },
  { address: "4535 Alamosa Street", city: "Fort Worth", state: "TX", zip: "76119", price: 197000, closed: "2025-08-05", side: "Buyer" },
  { address: "412 Towne Center Boulevard", city: "Shorewood", state: "IL", zip: "60404", price: 480000, closed: "2025-07-21", side: "Seller" },
  { address: "525 Candlewood Lane", city: "Garland", state: "TX", zip: "75041", price: 400000, closed: "2025-04-23", side: "Buyer" },
  { address: "3208 Windy Hollow Way (Part 2)", city: "Euless", state: "TX", zip: "76040", price: 150000, closed: "2025-04-17", side: "Buyer" },
  { address: "3208 Windy Hollow Way (Part 1)", city: "Euless", state: "TX", zip: "76040", price: 150000, closed: "2025-04-13", side: "Seller" },
  { address: "9356 Tunilla Court", city: "Fort Worth", state: "TX", zip: "76177", price: 485000, closed: "2025-03-31", side: "Buyer & Seller" },
  { address: "104 Misty Mesa Trail", city: "Mansfield", state: "TX", zip: "76063", price: 490000, closed: "2025-02-04", side: "Buyer" },
  { address: "2951 Moreau Court", city: "Fort Worth", state: "TX", zip: "76118", price: 380000, closed: "2024-11-29", side: "Buyer" },
  { address: "2110 Camellia Street", city: "Denton", state: "TX", zip: "76205", price: 300000, closed: "2024-10-30", side: "Seller" },
  { address: "105 Cedar Lane", city: "Haslet", state: "TX", zip: "76052", price: 280000, closed: "2024-09-29", side: "Seller" },
  { address: "220 Lincoln Lane", city: "Crowley", state: "TX", zip: "76036", price: 315000, closed: "2024-09-26", side: "Buyer" },
  { address: "105 Musgrove Road", city: "Everman", state: "TX", zip: "76140", price: 293990, closed: "2024-08-18", side: "Buyer" },
  { address: "5750 Phoenix Drive, Unit 35", city: "Dallas", state: "TX", zip: "75231", price: 183000, closed: "2024-06-09", side: "Buyer" },
];

export const transactions: Transaction[] = raw.map((t, i) => ({ ...t, id: `t${i}` }));

const stock = [
  "/images/neighborhood.webp",
  "/images/modern-skyline.webp",
  "/images/sell-prep.webp",
  "/images/investment-growth.webp",
  "/images/agent-presents-home.webp",
  "/images/model-homes-handshake.webp",
];
export function photoFor(t: Transaction) {
  return t.photo ?? stock[Number(t.id.slice(1)) % stock.length];
}

export function displayAddress(t: Transaction) {
  return SHOW_HOUSE_NUMBERS ? t.address : t.address.replace(/^\d+\s+/, "");
}

export function sideLabel(side: Side) {
  return side === "Buyer" ? "Represented the buyer" : side === "Seller" ? "Represented the seller" : "Represented both sides";
}

export const years = Array.from(new Set(transactions.map((t) => t.closed.slice(0, 4)))).sort().reverse();

export const stats = {
  closings: transactions.length,
  volume: transactions.reduce((sum, t) => sum + (t.price ?? 0), 0),
  cities: new Set(transactions.map((t) => t.city)).size,
  buyerSide: transactions.filter((t) => t.side !== "Seller").length,
  sellerSide: transactions.filter((t) => t.side !== "Buyer").length,
};

export const fmtPrice = (n: number | null) =>
  n === null ? "Price not disclosed" : n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const fmtCompactVolume = (n: number) => `$${(n / 1_000_000).toFixed(1)}M`;
