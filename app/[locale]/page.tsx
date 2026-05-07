import { setRequestLocale } from "next-intl/server";
import HomeContent, { type Stats } from "@/components/HomeContent";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

const FALLBACK_STATS: Stats = {
  totalPlayers: "43,000+",
  discordMembers: "16,000+",
  towns: "320+",
};

async function fetchStats(): Promise<Stats> {
  const [residentRes, discordRes, townRes] = await Promise.allSettled([
    fetch("https://api.planetearth.kr/resident/list", { signal: AbortSignal.timeout(3000) }),
    fetch("https://discord.com/api/v10/invites/VJJDsnKDcy?with_counts=true", { signal: AbortSignal.timeout(3000) }),
    fetch("https://api.planetearth.kr/town/list", { signal: AbortSignal.timeout(3000) }),
  ]);

  const stats = { ...FALLBACK_STATS };

  if (residentRes.status === "fulfilled" && residentRes.value.ok) {
    const data = await residentRes.value.json();
    if (Array.isArray(data?.data)) {
      stats.totalPlayers = data.data.length.toLocaleString("en-US");
    }
  }

  if (discordRes.status === "fulfilled" && discordRes.value.ok) {
    const data = await discordRes.value.json();
    if (data?.approximate_member_count) {
      stats.discordMembers = data.approximate_member_count.toLocaleString("en-US");
    }
  }

  if (townRes.status === "fulfilled" && townRes.value.ok) {
    const data = await townRes.value.json();
    if (Array.isArray(data?.data)) {
      stats.towns = data.data.length.toLocaleString("en-US");
    }
  }

  return stats;
}

export default async function PlanetEarthWebsite({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const stats = await fetchStats();

  return <HomeContent stats={stats} />;
}
