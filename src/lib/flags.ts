// Feature flags are read at build time (static export), so flipping one means a rebuild/redeploy.
export const showLab = process.env.NEXT_PUBLIC_SHOW_LAB === "true";
