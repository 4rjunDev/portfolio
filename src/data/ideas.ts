// Mobile-app ideas not started yet. Sourced from the Atelier tracker
// (~/Documents/atelier/ideas/atelier.jsx, status "idea", category "Mobile App");
// `atelierId` is the tracker id. Curated, not auto-synced.
export type Idea = {
  atelierId: number;
  name: string;
  tagline: string;
  category: string;
  /** Part of the "properly social" thread. */
  ethos?: boolean;
};

export const ideas: Idea[] = [
  { atelierId: 22, name: "Friend Recs", tagline: "Places and food from your actual friends, not Yelp strangers.", category: "Social", ethos: true },
  { atelierId: 66, name: "What's the Motive", tagline: "Float a loose day plan; friends pick what they're down for.", category: "Social", ethos: true },
  { atelierId: 76, name: "Chip In", tagline: "A tip jar for the friend who keeps the group stocked.", category: "Social", ethos: true },
  { atelierId: 75, name: "Margins", tagline: "Log what you read, write your take, admit when it changed your mind.", category: "Social / Reading", ethos: true },
  { atelierId: 70, name: "Garage", tagline: "Every car you've driven, ridden in, or spotted — rated.", category: "Social / Automotive", ethos: true },
  { atelierId: 20, name: "Occasion Wishes", tagline: "Birthdays and occasions, with a message that doesn't sound canned.", category: "Social" },
  { atelierId: 21, name: "The Spot", tagline: "A starter pack for a city you just moved to.", category: "Local" },
  { atelierId: 73, name: "Stubs", tagline: "Scan the ticket stub before it fades. A scrapbook for movies.", category: "Entertainment" },
  { atelierId: 13, name: "Combined Watchlist", tagline: "One watchlist across every streaming service.", category: "Entertainment" },
  { atelierId: 65, name: "Highlight Reel", tagline: "Sports highlights as a vertical feed.", category: "Sports" },
  { atelierId: 72, name: "Refit", tagline: "Return what doesn't fit first; resell what you can't.", category: "Utility" },
  { atelierId: 47, name: "Creator Codes", tagline: "A shared vault for promo codes — forward the email, it does the rest.", category: "Utility" },
  { atelierId: 48, name: "Spot", tagline: "Your favourite parking garages, suggested by destination.", category: "Utility" },
  { atelierId: 77, name: "Meal Prep", tagline: "Plan the week's meals around your schedule, then scale prep day.", category: "Utility" },
  { atelierId: 18, name: "Location Alerts", tagline: "Weather, closures, and incidents — only where you are.", category: "Utility" },
  { atelierId: 60, name: "Setpiece", tagline: "Previs a stream or podcast set in your own room, in AR.", category: "Creative" },
];
