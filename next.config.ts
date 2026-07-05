import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const externalRedirects: [path: string, destination: string][] = [
  ["map", "https://map.planetearth.kr"],
  ["discord", "https://discord.com/invite/planetearth"],
  [
    "guide",
    "https://planetearthmc.notion.site/PlanetEarth-9e3ba37035e44f59bf492a8bede7b646",
  ],
  [
    "schedule",
    "https://planetearthmc.notion.site/df5041caf2824c3fb2a331013c25acbf?v=0ce14acc9db3446da1522e4221de9e64",
  ],
];

const nextConfig: NextConfig = {
  async redirects() {
    return externalRedirects.flatMap(([path, destination]) => [
      { source: `/${path}`, destination, permanent: false },
      { source: `/${path}/:path*`, destination, permanent: false },
    ]);
  },
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "api.mcheads.org" }],
  },
};

export default withNextIntl(nextConfig);

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
