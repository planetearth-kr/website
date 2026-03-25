import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Navigation, Footer } from "@/components/Layout";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PlanetEarthWebsite({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <section className="relative h-[70vh] flex items-center">
        <Image
          src="/background.webp"
          alt={t("backgroundAlt")}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        <div className="relative z-10 text-white container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight md:whitespace-nowrap">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">{t("subtitle")}</p>
          <button className="text-lg px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors duration-300 text-white">
            IP: planetearth.kr
          </button>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "42,000+", label: t("stats.totalPlayers") },
              { number: "16,000+", label: t("stats.discordMembers") },
              { number: "533", label: t("stats.peakPlayers") },
              { number: "370+", label: t("stats.towns") },
            ].map((stat, index) => (
              <div key={index} className="text-center relative">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </h2>
                <p className="text-base text-gray-600">{stat.label}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-2/3 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={`/screenshot-${index + 1}.webp`}
                  alt={t("screenshotAlt", { number: index + 1 })}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
