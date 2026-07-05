import Image from "next/image";
import { useTranslations } from "next-intl";
import { Navigation } from "@/components/Layout";
import { Footer } from "@/components/Footer";
import CopyIPButton from "@/components/CopyIPButton";

const screenshots = [
  "/screenshot-1.webp",
  "/screenshot-2.webp",
  "/screenshot-3.webp",
  "/screenshot-4.webp",
  "/screenshot-5.webp",
  "/screenshot-6.webp",
];

export default function HomeContent() {
  const t = useTranslations("home");

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <section className="relative h-[70vh] flex items-center">
        <Image
          src="/background.webp"
          alt={t("backgroundAlt")}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        <div className="relative z-10 text-white container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight text-balance break-keep">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">{t("subtitle")}</p>
          <CopyIPButton />
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "45,000+", label: t("stats.totalPlayers") },
              { number: "17,000+", label: t("stats.discordMembers") },
              { number: "562", label: t("stats.peakPlayers") },
              { number: "320+", label: t("stats.towns") },
            ].map((stat, index, arr) => (
              <div key={stat.label} className="text-center relative">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </h2>
                <p className="text-base text-gray-600">{stat.label}</p>
                {index < arr.length - 1 && (
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
            {screenshots.map((src, index) => (
              <div
                key={src}
                className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={src}
                  alt={t("screenshotAlt", { number: index + 1 })}
                  fill
                  className="object-cover"
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
