import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/map",
        destination: "https://map.planetearth.kr",
        permanent: false,
      },
      {
        source: "/map/:path*",
        destination: "https://map.planetearth.kr",
        permanent: false,
      },
      {
        source: "/discord",
        destination: "https://discord.com/invite/planetearth",
        permanent: false,
      },
      {
        source: "/discord/:path*",
        destination: "https://discord.com/invite/planetearth",
        permanent: false,
      },
      {
        source: "/guide",
        destination:
          "https://planetearthmc.notion.site/PlanetEarth-9e3ba37035e44f59bf492a8bede7b646",
        permanent: false,
      },
      {
        source: "/guide/:path*",
        destination:
          "https://planetearthmc.notion.site/PlanetEarth-9e3ba37035e44f59bf492a8bede7b646",
        permanent: false,
      },
      {
        source: "/schedule",
        destination:
          "https://planetearthmc.notion.site/df5041caf2824c3fb2a331013c25acbf?v=0ce14acc9db3446da1522e4221de9e64",
        permanent: false,
      },
      {
        source: "/schedule/:path*",
        destination:
          "https://planetearthmc.notion.site/df5041caf2824c3fb2a331013c25acbf?v=0ce14acc9db3446da1522e4221de9e64",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minotar.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
