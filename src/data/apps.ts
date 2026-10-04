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
  /** "ready" = closest to shipping; "early" = concept or first scaffold. */
  stage: "ready" | "early";
  /** Part of the "properly social" thread — yours first, shared as you would in person. */
  ethos?: boolean;
  /** Screenshots are simulator captures, so they already include a status bar. */
  islandInCapture?: boolean;
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
      "Live Activity: ETA and next manoeuvre on the Lock Screen and Dynamic Island",
      "Real-time hazard reporting with severity-coded tiles and nearby alerts",
      "Tap-to-talk radio screen for the whole convoy",
      "Groups & cruises model for recurring meetups, not one-off drives",
    ],
    stack: ["SwiftUI", "Swift Observation", "MapLibre", "Ferrostar", "Valhalla", "Supabase", "CoreLocation"],
    status: "Active prototype",
    statusDetail: "28 commits · Live Activity, unit tests, locked-down Supabase policies",
    category: "Navigation / Social",
    year: "2026",
    stage: "ready",
    islandInCapture: true,
    accent: "#38bdf8",
    screenshots: [
      "/apps/convoy/02-map-n.webp",
      "/apps/convoy/07-drawer-full-n.webp",
      "/apps/convoy/01-welcome-n.webp",
      "/apps/convoy/03-talk-n.webp",
      "/apps/convoy/04-hazard-n.webp",
      "/apps/convoy/10-planner-n.webp",
      "/apps/convoy/06-map-dark-n.webp",
      "/apps/convoy/05-profile-n.webp",
    ],
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
    stage: "ready",
    accent: "#f97316",
    screenshots: [],
  },
  {
    slug: "come-thru",
    name: "Come Thru",
    tagline: "Post a plan in ten seconds. Your circle fills it in.",
    description:
      "Come Thru is for spontaneous hangs, not events. Post what, when, and where in two taps, pick which circle sees it, and watch the headcount fill. No comments, no options, no roles — one pinned note, a plan that expires three hours after it ends, and a need-a-number mode that opens to the next circle every 30 minutes until it's full.",
    features: [
      "Post in two taps: what, when (Now · In an hour · Tonight · Tomorrow night), where",
      "Circles — close friends, all friends, a named circle, or anyone with the link",
      "Need-a-number: \"need 4 for doubles\" opens to the next circle every 30 min until full",
      "Hidden location shown only to people who say they're coming, enforced by RLS",
      "Live headcount with day-of status (on my way / here) and host-approved +1s",
      "Plans expire on their own; suggestions re-post your recurring Wednesdays in one tap",
    ],
    stack: ["SwiftUI", "SwiftData", "Supabase", "Sign in with Apple"],
    status: "Active development",
    statusDetail: "19 commits · rebuilt around plans and circles, rewritten UI tests",
    category: "Social",
    year: "2026",
    stage: "ready",
    ethos: true,
    accent: "#fb7185",
    screenshots: [],
  },
  {
    slug: "schedule",
    name: "Schedule",
    tagline: "Tell it what you want time for — it builds your week around it.",
    description:
      "Schedule is a local-first week builder. You describe what you want time for (activities with weekly targets), what's fixed (work, standups), and what needs doing (errands with opening hours and deadlines); a deterministic solver lays out the week with travel time and breathing room, and anything that doesn't fit lands on a deferred list with a reason. At the end of each day, a one-tap retro compares plan against reality.",
    features: [
      "Deterministic, unit-tested solver: fixed blocks, errands before deadlines, activities toward weekly targets",
      "Today: a live now/next card with progress, a leave-by time from travel, and one-tap done or skip",
      "MapKit travel time inserted between blocks at different places",
      "Insights: weekly follow-through %, a six-week trend, and per-activity sparklines",
      "Export the week to Apple Calendar via EventKit, with reminders before each block",
      "Notes for to-dos, appointments, follow-ups, and learning",
    ],
    stack: ["SwiftUI", "SwiftData", "MapKit", "EventKit", "UserNotifications"],
    status: "Feature-complete MVP",
    statusDetail: "14 commits · 40 tests · runs with sample data, no accounts",
    category: "Productivity",
    year: "2026",
    stage: "ready",
    islandInCapture: true,
    accent: "#818cf8",
    screenshots: ["/apps/schedule/01-week-n.webp", "/apps/schedule/02-day-n.webp", "/apps/schedule/03-retro-n.webp", "/apps/schedule/04-insights-n.webp", "/apps/schedule/05-notes-n.webp", "/apps/schedule/06-setup-n.webp"],
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
    stack: ["SwiftUI", "Supabase", "PostgreSQL + RLS", "Edge Functions", "Realtime"],
    status: "Active development",
    statusDetail: "19 commits · unit tests on iOS and macOS, live DM polling",
    category: "Sports / Social",
    year: "2026",
    stage: "ready",
    accent: "#a3e635",
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
    stack: ["SwiftUI", "Share Extension", "Supabase", "App Groups"],
    status: "Verified MVP",
    statusDetail: "10 commits · verified on hardware, integration-tested against the real backend",
    category: "Utility",
    year: "2026",
    stage: "ready",
    ethos: true,
    islandInCapture: true,
    accent: "#e879f9",
    screenshots: [
      "/apps/inspo/demo-screenshot-n.webp",
      "/apps/inspo/share-sheet-n.webp",
      "/apps/inspo/sign-in-n.webp",
      "/apps/inspo/reels-tab-n.webp",
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
    stack: ["SwiftUI", "Supabase", "PostgreSQL + RLS"],
    status: "Early prototype",
    statusDetail: "7 commits · design system fully implemented",
    category: "Social / Automotive",
    year: "2026",
    stage: "ready",
    ethos: true,
    islandInCapture: true,
    accent: "#f59e0b",
    screenshots: [
      "/apps/grid/1-feed-n.webp",
      "/apps/grid/2-generation-n.webp",
      "/apps/grid/3-rate-and-log-n.webp",
      "/apps/grid/4-garage-n.webp",
      "/apps/grid/5-search-n.webp",
      "/apps/grid/6-lists-n.webp",
    ],
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
    stack: ["SwiftUI", "MusicKit", "Spotify API", "BackgroundTasks", "Keychain"],
    status: "Early prototype",
    statusDetail: "14 commits · provider adapters just landed",
    category: "Music / Social",
    year: "2026",
    stage: "ready",
    ethos: true,
    islandInCapture: true,
    accent: "#34d399",
    screenshots: ["/apps/on-loop/01-onboarding-n.webp"],
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
    stack: ["SwiftUI", "Supabase", "Open Library API"],
    status: "Early MVP",
    statusDetail: "7 commits · testable API clients, Dynamic Type and a11y fixes",
    category: "Social / Reading",
    year: "2026",
    stage: "ready",
    ethos: true,
    islandInCapture: true,
    accent: "#fbbf24",
    screenshots: ["/apps/bookmarked/01-home-n.webp"],
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
      "Home and lock screen widget showing your own mood, refreshed as it changes",
      "TestFlight-gated style picker via StoreKit build detection",
      "Extensive launch-argument system for QA and demoing",
    ],
    stack: ["SwiftUI", "SwiftData", "Supabase", "WidgetKit", "StoreKit"],
    status: "Mid-redesign",
    statusDetail: "50 commits · TestFlight builds, home-screen widget, App Store prep",
    category: "Social",
    year: "2026",
    stage: "ready",
    ethos: true,
    accent: "#a78bfa",
    screenshots: ["/apps/moody/editorial-v2.webp", "/apps/moody/midnight-v2.webp", "/apps/moody/orbit-v2.webp"],
  },
  {
    slug: "revue",
    name: "Revue",
    tagline: "Letterboxd for movies and TV — log, rate, and see what friends watched.",
    description:
      "Revue is a movie and TV tracker with a mutual-friend social feed: search titles via TMDB, log what you watched with a thumbs rating, and see reviews from friends who watched the same thing. This is the native SwiftUI client — one of three (alongside a Next.js web app and a Flutter app) sharing the same Supabase backend and users.",
    features: [
      "TMDB search with title detail pages",
      "Log a title as watched — tag venue (home / theater)",
      "Thumbs up/down rating, would-watch-again, and all-time-favorite flags",
      "Friend feed via a shared get_friend_feed RPC — same call as web and Flutter",
      "Public profile with your logs and ratings",
      "One Supabase backend shared across all three clients",
    ],
    stack: ["SwiftUI", "Supabase", "TMDB API"],
    status: "Single-commit MVP",
    statusDetail: "Auth, feed, search, log, and profile flows built · no screenshots yet",
    category: "Social / Entertainment",
    year: "2026",
    stage: "early",
    ethos: true,
    accent: "#ef4444",
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
      "Deterministic, unit-tested solver: fixed blocks, errands before deadlines, activities toward weekly targets",
      "Today: a live now/next card with progress, a leave-by time from travel, and one-tap done or skip",
      "MapKit travel time inserted between blocks at different places",
      "Insights: weekly follow-through %, a six-week trend, and per-activity sparklines",
      "Export the week to Apple Calendar via EventKit, with reminders before each block",
      "Notes for to-dos, appointments, follow-ups, and learning",
    ],
    stack: ["SwiftUI", "AVFoundation", "MultipeerConnectivity", "AVSpeechSynthesizer"],
    status: "Simulator-verified prototype",
    statusDetail: "3 commits · physical two-device testing pending",
    category: "Sports / Computer vision",
    year: "2026",
    stage: "early",
    islandInCapture: true,
    accent: "#22d3ee",
    screenshots: ["/apps/call-it/06-pairing-portrait-n.webp", "/apps/call-it/07-recordings-portrait-n.webp"],
    landscapeScreens: [
      "/apps/call-it/01-capture-n.webp",
      "/apps/call-it/02-pairing-n.webp",
      "/apps/call-it/03-host-waiting-n.webp",
      "/apps/call-it/05-test-signal-n.webp",
    ],
  },
];

export function getApp(slug: string) {
  return apps.find((a) => a.slug === slug);
}
