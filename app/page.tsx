import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PlanetEarthWebsite() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="absolute top-0 left-0 right-0 z-10 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            PlanetEarth
          </Link>
          <div className="space-x-4">
            <Link
              href="https://discord.com/invite/PlanetEarth"
              className="hover:text-gray-300"
            >
              디스코드
            </Link>
            <Link
              href="https://docs.planetearth.kr"
              className="hover:text-gray-300"
            >
              가이드
            </Link>
            <Link
              href="https://map.planetearth.kr"
              className="hover:text-gray-300"
            >
              지도
            </Link>
          </div>
        </div>
      </nav>
      <section className="relative h-[70vh] flex items-center">
        <Image
          src="/background.png"
          alt="PlanetEarth Preview"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        <div className="relative z-10 text-white container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">
              게임 속, 또 하나의 지구
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              오픈월드 타우니 지구서버 PlanetEarth
            </p>
            <Button
              size="lg"
              className="text-lg px-6 py-6 bg-green-500 hover:bg-green-600"
            >
              IP: planetearth.kr
            </Button>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "26,000+", label: "누적 접속" },
              { number: "10,000+", label: "디스코드 멤버" },
              { number: "394", label: "최고 동시 접속" },
              { number: "340+", label: "마을" },
            ].map((stat, index) => (
              <div key={index} className="text-center relative">
                <h2 className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={`/screenshot-${index + 1}.png`}
                  alt={`In-Game screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              2022-{new Date().getFullYear()} planetearth.kr. All rights reserved.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">
              <span>
                PlanetEarth is not affiliated with Mojang or Microsoft
              </span>
              <span className="mx-2"></span>
              <span>Help: contact@planetearth.kr</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
