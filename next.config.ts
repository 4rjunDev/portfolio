import type { NextConfig } from "next";

// Set by the GitHub Pages workflow. Project sites live at <user>.github.io/<repo>,
// so every asset and link needs the repo name as a prefix there — but not locally
// or on a custom domain.
const basePath = process.env.GITHUB_PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  // next/image doesn't prefix unoptimized string srcs, so screenshots read this instead.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
};

export default nextConfig;
