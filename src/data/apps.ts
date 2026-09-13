export type App = {
  slug: string;
  name: string;
  displayName?: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  status: string;
  statusDetail: string;
  category: string;
  year: string;
  accent: string;
  screenshots: string[];
  landscapeScreens?: string[];
};

export const apps: App[] = [
  {
    slug: "convoy",
    name: "Convoy",
    tagline: "Live group-drive navigation with shared maps, hazards, and voice.",
    description:
      "Convoy is a map-first iOS app for coordinating group road trips. Drivers see each other as live pins on a shared map, plan routes with multi-point checkpoints, get spoken turn-by-turn guidance, and report hazards to the group in real time — all built around recurring cruises rather than one-off drives.",
    features: [
      "Live member presence on a shared map with Dynamic-Type-aware pins",
      "Turn-by-turn voice navigation via Ferrostar/Valhalla routing",
      "Multi-point route planner with tappable alternate routes",
      "Real-time hazard reporting with severity-coded tiles",
      "Hold-to-talk radio screen for the whole convoy",
      "Groups & cruises model for recurring meetups, not one-off drives",
    ],
    stack: ["SwiftUI", "Swift Observation", "MapLibre", "Ferrostar", "Valhalla", "Supabase", "CoreLocation"],
    status: "Active prototype",
    statusDetail: "16 commits · self-authored code & design review passes",
    category: "Navigation / Social",
    year: "2026",
    accent: "#38bdf8",
    screenshots: [
      "/apps/convoy/02-map.png",
      "/apps/convoy/07-drawer-full.png",
      "/apps/convoy/01-welcome.png",
      "/apps/convoy/03-talk.png",
      "/apps/convoy/04-hazard.png",
      "/apps/convoy/10-planner.png",
      "/apps/convoy/06-map-dark.png",
      "/apps/convoy/05-profile.png",
    ],
  },
  {
    slug: "grid",
    name: "GRID",
    tagline: "Letterboxd for cars — log, rate, and share your garage.",
    description:
      "GRID is a social car-logging app for enthusiasts to record cars they've owned or driven, score them across Looks, Drive, and Value, and write short reviews. Ratings roll up into community averages per generation, and curated public Lists group cars into themed collections.",
    features: [
      "Three-axis rating flow: Looks, Drive, Value",
      "Generation pages with community score bars & factory specs",
      "Garage & profile with logged/owned stats and rating distribution",
      "Curated public Lists and car/people search",
      "Custom flat, no-shadow typographic design system",
      "Built from a pixel-perfect interactive design prototype",
    ],
    stack: ["SwiftUI", "Supabase", "PostgreSQL + RLS", "Custom design system"],
    status: "Early prototype",
    statusDetail: "7 commits · design system fully implemented",
    category: "Social / Automotive",
    year: "2026",
    accent: "#f59e0b",
    screenshots: [
      "/apps/grid/1-feed.png",
      "/apps/grid/2-generation.png",
      "/apps/grid/3-rate-and-log.png",
      "/apps/grid/4-garage.png",
      "/apps/grid/5-search.png",
      "/apps/grid/6-lists.png",
    ],
  },
  {
    slug: "moody",
    name: "Moody",
    tagline: "Share your mood as a color, word, or face with friends in real time.",
    description:
      "Moody is a social status app where what you share isn't a photo or a caption — it's a mood, expressed as color, word, or face. Friends see each other's current state in a feed, with a redesign in progress that pits four distinct visual directions against each other behind a runtime switch before one ships.",
    features: [
      "Four parallel design directions (Atmosphere, Edition, Exchange, Wall) toggled at runtime",
      "Mood palette mapped to hue angles with Oklch-based color math",
      "Friends system with requests and reactions",
      "WidgetKit extension mirroring your mood on the lock screen",
      "TestFlight-gated style picker via StoreKit build detection",
      "Extensive launch-argument system for QA and demoing",
    ],
    stack: ["SwiftUI", "SwiftData", "Supabase", "WidgetKit", "StoreKit", "Oklch color"],
    status: "Mid-redesign",
    statusDetail: "46 commits in one week · design decision pending",
    category: "Social",
    year: "2026",
    accent: "#a78bfa",
    screenshots: ["/apps/moody/editorial.png", "/apps/moody/midnight.png", "/apps/moody/orbit.png"],
  },
  {
    slug: "tennis-trivia",
    name: "Deuce",
    displayName: "Deuce (Tennis Trivia)",
    tagline: "Live tennis scores, news, stories, and daily trivia in one app.",
    description:
      "Deuce is a SwiftUI iOS + macOS companion for tennis fans, combining a live-scores feed, tour schedule, Instagram-style stories, direct messages, a podcast player, and a daily trivia game with badges and a monthly leaderboard — a small social network built on top of the trivia hook.",
    features: [
      "Daily trivia with streaks, badges, and a monthly leaderboard",
      "Live ATP/WTA scores with favorite-player pinning",
      "Story composer with full-screen viewer and moderation queue",
      "News/article feed with a CMS-driven media library",
      "Direct messages, profiles, and search",
      "Shared codebase across iOS and macOS targets",
    ],
    stack: ["SwiftUI", "macOS target", "Supabase", "PostgreSQL (30+ migrations)", "Edge Functions"],
    status: "Active development",
    statusDetail: "15 commits over 7 weeks · macOS target added",
    category: "Sports / Social",
    year: "2026",
    accent: "#a3e635",
    screenshots: [],
  },
  {
    slug: "come-thru",
    name: "Come Thru",
    tagline: "Post where you'll be, let friends tail along — ad-hoc pull-ups, not events.",
    description:
      "Come Thru is built for casual, spontaneous hangouts — \"pulling up to McCarren at 6\" — instead of formal event planning. Two-tap posting, tiered audiences with time-gated visibility, and a suggestion engine that notices recurring habits and offers to re-post them.",
    features: [
      "Two-tap quick posting with smart defaults",
      "\"Spots\" — frequent places promoted to one-tap regulars",
      "Tiered audiences with a cascade-gating visibility rule",
      "Suggestion engine for recurring pull-up patterns",
      "Guest lists, RSVPs, and shareable deep links",
      "Fully functional local-only via SwiftData, optional Supabase sync",
    ],
    stack: ["SwiftUI", "SwiftData", "Supabase", "Sign in with Apple", "XCUITest"],
    status: "Active development",
    statusDetail: "16 commits · pivoted from web to native mid-build",
    category: "Social",
    year: "2026",
    accent: "#fb7185",
    screenshots: [],
  },
  {
    slug: "on-loop",
    name: "On Loop",
    tagline: "Passive social music — your listening posts your top 3, automatically.",
    description:
      "On Loop is built around a simple rule: there is no compose button anywhere in the app. It silently ingests your listening history across Spotify, Apple Music, and YouTube Music, computes a ranked top-3 per day and week, and auto-publishes it to your followers as a Loop.",
    features: [
      "Fully automatic daily & weekly \"Loop\" publishing",
      "Own scrobbling layer polling Spotify, Apple Music, and YTM",
      "Cross-provider track identity resolution via ISRC",
      "Asymmetric follow graph with per-Loop visibility control",
      "Recommendations engine for what to put on repeat next",
      "Background ingestion via BGAppRefreshTask",
    ],
    stack: ["SwiftUI", "MusicKit", "Spotify OAuth (PKCE)", "BackgroundTasks", "Keychain"],
    status: "Early prototype",
    statusDetail: "14 commits · provider adapters just landed",
    category: "Music / Social",
    year: "2026",
    accent: "#34d399",
    screenshots: [],
  },
  {
    slug: "restrung",
    name: "Restrung",
    tagline: "Order and track racket restringing from a solo stringer.",
    description:
      "Restrung digitizes a one-person tennis-stringing business. Customers submit racket orders with string, tension, and turnaround preferences and track status in real time, while the admin runs a work-ticket queue and a monthly \"Club\" subscription that skips the line.",
    features: [
      "Multi-racket ordering with string, tension, and grip options",
      "Live order tracking with a status stepper",
      "Admin work-ticket queue, rush- and Club-member-first sorted",
      "Restrung Club monthly subscriptions with usage tracking",
      "Saved racket setups for one-tap reordering",
      "Push notifications via a Supabase Edge Function + APNs",
    ],
    stack: ["SwiftUI", "Supabase", "PostgreSQL + RLS", "Edge Functions", "APNs"],
    status: "Pre-submission MVP",
    statusDetail: "Full customer + admin flows built · App Store prep remaining",
    category: "Utility / Local business",
    year: "2026",
    accent: "#f97316",
    screenshots: [],
  },
  {
    slug: "inspo",
    name: "Inspo",
    displayName: "Inspo iOS",
    tagline: "Share Instagram reels for AI categorization via the iOS share sheet.",
    description:
      "Inspo iOS is the native companion to a web-based Instagram-reel categorizer. A share extension lets you send a reel straight from Instagram or Safari into Inspo, which posts it to the backend for AI categorization — something iOS Safari can't do with web standards alone.",
    features: [
      "Share Extension registered for URLs and plain text",
      "Supabase auth shared with the extension via an App Group",
      "Extension independently refreshes an expired access token",
      "Recent Reels list with AI-assigned category labels",
      "Full demo mode with seeded reels — no backend required",
    ],
    stack: ["SwiftUI", "Share Extension", "Supabase", "Keychain / App Groups"],
    status: "Verified MVP",
    statusDetail: "7 commits · verified working on real hardware",
    category: "Utility",
    year: "2026",
    accent: "#e879f9",
    screenshots: [
      "/apps/inspo/demo-screenshot.png",
      "/apps/inspo/share-sheet.png",
      "/apps/inspo/sign-in.png",
      "/apps/inspo/reels-tab.png",
    ],
  },
  {
    slug: "bookmarked",
    name: "Bookmarked",
    tagline: "Letterboxd, but for books — log, rate, and shelve what you read.",
    description:
      "Bookmarked is a cover-centric, taste-forward reading tracker built against Goodreads and StoryGraph. Log books with a thumbs-up/down rating, organize them into shelves, and see what friends are reading — search is powered by the free Open Library API.",
    features: [
      "Book search via Open Library, with Google Books as fallback",
      "Thumbs rating, would-recommend, and all-time-favorite flags",
      "Auto shelves plus custom shelves",
      "Social feed of friends' reviews",
      "Sign in with Apple + email/password via Supabase",
    ],
    stack: ["SwiftUI", "Supabase", "Open Library API", "XcodeGen"],
    status: "Early MVP",
    statusDetail: "Demo-mode-first, seeded catalog and mock social graph",
    category: "Social / Reading",
    year: "2026",
    accent: "#fbbf24",
    screenshots: [],
  },
  {
    slug: "call-it",
    name: "Call It",
    displayName: "Call It — Court Lab",
    tagline: "Two-iPhone synced recording prototype for future tennis line calls.",
    description:
      "Call It is a field-data prototype toward a future two-camera tennis line-calling system — deliberately not an automated line-caller yet. It pairs two iPhones over Multipeer Connectivity, records synchronized landscape video with four-corner court calibration, and logs frame-level event data for offline analysis.",
    features: [
      "Six-digit-code host/join phone pairing",
      "Synchronized local recording on both phones",
      "Manual four-corner court calibration with convexity checks",
      "Wireless clock-offset measurement between paired phones",
      "Manual serve/bounce event markers relayed live",
      "Per-session export of video + manifest + event log",
    ],
    stack: ["SwiftUI", "AVFoundation", "MultipeerConnectivity", "AVSpeechSynthesizer"],
    status: "Simulator-verified prototype",
    statusDetail: "3 commits · physical two-device testing pending",
    category: "Sports / Computer vision",
    year: "2026",
    accent: "#22d3ee",
    screenshots: ["/apps/call-it/06-pairing-portrait.png", "/apps/call-it/07-recordings-portrait.png"],
    landscapeScreens: [
      "/apps/call-it/01-capture.png",
      "/apps/call-it/02-pairing.png",
      "/apps/call-it/03-host-waiting.png",
      "/apps/call-it/05-test-signal.png",
    ],
  },
];

export function getApp(slug: string) {
  return apps.find((a) => a.slug === slug);
}
