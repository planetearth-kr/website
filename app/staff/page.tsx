import Image from "next/image";
import Link from "next/link";
import { FaYoutube, FaGithub, FaDiscord } from 'react-icons/fa';
import { FiExternalLink, FiShield, FiCode, FiUsers } from 'react-icons/fi';
import { MdPalette } from 'react-icons/md';

type Staff = {
  id: string;
  name: string;
  links?: {
    type: "youtube" | "github" | "discord" | "other";
    url: string;
    label?: string;
  }[];
  description?: string;
  badge?: {
    text: string;
    color: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
};

const staffData: Record<string, Staff[]> = {
  Admin: [
    {
      id: "heiz",
      name: "Heiz",
      links: [
        { type: "discord", url: "https://discord.com/users/195514337996177408", label: "heizheizheiz" }
      ],
      badge: { text: "총괄", color: "bg-red-500" },
    },
    {
      id: "Oneper34_",
      name: "Ago",
      links: [
        { type: "discord", url: "https://discord.com/users/722273731329916959", label: "yxung_seo" }
      ],
      badge: { text: "총괄", color: "bg-green-500" },
    },
  ],
  Developer: [
    {
      id: "irochi_",
      name: "Irochi",
      description: "Play the lead with all your life,\nand may devotion never fade",
      links: [
        { type: "discord", url: "https://discord.com/users/1086117494189723658", label: "irochi" },
        { type: "github", url: "https://github.com/irochi-moe", label: "GitHub" },
        { type: "other", url: "https://irochi.moe", label: "irochi.moe" }
      ],
      badge: { text: "백엔드 개발", color: "bg-indigo-500" },
    },
    {
      id: "yellim",
      name: "Yellim",
      links: [
        { type: "discord", url: "https://discord.com/users/596201576327282699", label: "yellim" }
      ],
      badge: { text: "활동중단", color: "bg-gray-500" },
    },
  ],
    Moderator: [
      { id: "turtlefisherman", name: "TurtleFisherman", links: [{ type: "discord", url: "https://discord.com/users/453470747130724363", label: "1023_hd" }] },
      { id: "townyapi", name: "TownyAPI", links: [{ type: "discord", url: "https://discord.com/users/244889376025346049", label: "xdgf0" }] },
      {
        id: "maltese_",
        name: "Maltese_",
        links: [{ type: "discord", url: "https://discord.com/users/376282963781877770", label: "byeol._.ha" }],
        badge: { text: "활동중단", color: "bg-gray-500" },
      },
      {
        id: "aceda8",
        name: "aceda8",
        links: [{ type: "discord", url: "https://discord.com/users/589405416447016960", label: "aceda8" }],
        badge: { text: "활동중단", color: "bg-gray-500" },
      },
      {
        id: "i_loveryo",
        name: "I_loveryo",
        links: [{ type: "discord", url: "https://discord.com/users/328504741711839233", label: "fo1ver" }],
        badge: { text: "활동중단", color: "bg-gray-500" },
      },
      {
        id: "royang_",
        name: "Royang_",
        links: [{ type: "discord", url: "https://discord.com/users/1128999881801990265", label: "no.l2" }],
        badge: { text: "활동중단", color: "bg-gray-500" },
      },
    ],
  Designer: [
    { id: "cokuun", name: "CoKuun", links: [{ type: "discord", url: "https://discord.com/users/387188588628017152", label: "cokuun" }] },
    { id: "squirrel", name: "Squirrel", links: [{ type: "discord", url: "https://discord.com/users/268772304375382016", label: "squirrel1202" }] },
  ],
};

const categoryInfo = {
  Admin: { icon: FiShield, bgColor: "bg-red-500" },
  Developer: { icon: FiCode, bgColor: "bg-blue-500" },
  Moderator: { icon: FiUsers, bgColor: "bg-green-500" },
  Designer: { icon: MdPalette, bgColor: "bg-purple-500" },
} as const;

const iconMap = {
  youtube: { component: FaYoutube, color: "text-red-500 hover:text-red-600" },
  github: { component: FaGithub, color: "text-gray-700 hover:text-gray-800" },
  discord: { component: FaDiscord, color: "text-indigo-500 hover:text-indigo-600" },
  other: { component: FiExternalLink, color: "text-gray-500 hover:text-gray-600" },
} as const;

export default function StaffPage() {
  const getIcon = (type: string) => {
    const iconInfo = iconMap[type as keyof typeof iconMap] || iconMap.other;
    const IconComponent = iconInfo.component;
    return <IconComponent className="w-4 h-4" />;
  };

  const getIconColor = (type: string) => {
    return iconMap[type as keyof typeof iconMap]?.color || iconMap.other.color;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="absolute top-0 left-0 right-0 z-10 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">PlanetEarth</Link>
          <div className="space-x-4">
            <Link href="/staff" className="hover:text-gray-300">운영진</Link>
            <Link href="https://discord.com/invite/PlanetEarth" className="hover:text-gray-300">디스코드</Link>
            <Link href="https://planetearth.kr/guide" className="hover:text-gray-300">가이드</Link>
            <Link href="https://map.planetearth.kr" className="hover:text-gray-300">지도</Link>
          </div>
        </div>
      </nav>

      <section className="relative h-[30vh] flex items-center">
        <Image
          src="/background.webp"
          alt="PlanetEarth Preview"
          fill
          priority
          className="object-cover object-[50%_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        <div className="relative z-10 text-white container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight">운영진 소개</h1>
          <p className="text-lg md:text-xl text-gray-200">PlanetEarth를 함께 만들어가는 사람들</p>
        </div>
      </section>

      <main className="py-8 bg-gray-50 flex-1">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-500 p-2 rounded-lg shadow-sm">
                    <FiShield className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Admin</h2>
                  <span className="text-sm text-gray-500">({staffData.Admin.length}명)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {staffData.Admin.map((staff) => (
                    <div key={staff.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 relative group flex flex-col">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm flex-shrink-0 bg-gray-100">
                          <Image src={`https://minotar.net/helm/${staff.id}/64.png`} alt={`${staff.name} 마인크래프트 스킨`} width={64} height={64} className="w-full h-full object-cover" style={{ imageRendering: "pixelated" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-800 truncate">{staff.name}</h3>
                            {staff.badge && (
                              <div className={`${staff.badge.color} text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 whitespace-nowrap`}>
                                {staff.badge.icon && <staff.badge.icon className="w-3 h-3" />}
                                <span>{staff.badge.text}</span>
                              </div>
                            )}
                          </div>
                          {staff.links && (
                            <div className="flex gap-2">
                              {staff.links.map((link, index) => (
                                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ${getIconColor(link.type)}`} title={link.label || link.type}>
                                  {getIcon(link.type)}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      {staff.description && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          <div className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 shadow-lg max-w-xs w-max">
                            <div className="text-center leading-relaxed whitespace-pre-line">{staff.description}</div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-500 p-2 rounded-lg shadow-sm">
                    <FiCode className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Developer</h2>
                  <span className="text-sm text-gray-500">({staffData.Developer.length}명)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {staffData.Developer.map((staff) => (
                    <div key={staff.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 relative group flex flex-col">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm flex-shrink-0 bg-gray-100">
                          <Image src={`https://minotar.net/helm/${staff.id}/64.png`} alt={`${staff.name} 마인크래프트 스킨`} width={64} height={64} className="w-full h-full object-cover" style={{ imageRendering: "pixelated" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-800 truncate">{staff.name}</h3>
                            {staff.badge && (
                              <div className={`${staff.badge.color} text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 whitespace-nowrap`}>
                                {staff.badge.icon && <staff.badge.icon className="w-3 h-3" />}
                                <span>{staff.badge.text}</span>
                              </div>
                            )}
                          </div>
                          {staff.links && (
                            <div className="flex gap-2">
                              {staff.links.map((link, index) => (
                                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ${getIconColor(link.type)}`} title={link.label || link.type}>
                                  {getIcon(link.type)}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      {staff.description && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          <div className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 shadow-lg max-w-xs w-max">
                            <div className="text-center leading-relaxed whitespace-pre-line">{staff.description}</div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {Object.entries(staffData)
              .filter(([category]) => !['Admin', 'Developer'].includes(category))
              .map(([category, staffList]) => {
                const info = categoryInfo[category as keyof typeof categoryInfo];
                if (!info) return null;
                const IconComponent = info.icon;
                return (
                  <section key={category}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`${info.bgColor} p-2 rounded-lg shadow-sm`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
                      <span className="text-sm text-gray-500">({staffList.length}명)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {staffList.map((staff) => (
                        <div key={staff.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 relative group flex flex-col">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm flex-shrink-0 bg-gray-100">
                              <Image src={`https://minotar.net/helm/${staff.id}/64.png`} alt={`${staff.name} 마인크래프트 스킨`} width={64} height={64} className="w-full h-full object-cover" style={{ imageRendering: "pixelated" }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-bold text-gray-800 truncate">{staff.name}</h3>
                                {staff.badge && (
                                  <div className={`${staff.badge.color} text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 whitespace-nowrap`}>
                                    {staff.badge.icon && <staff.badge.icon className="w-3 h-3" />}
                                    <span>{staff.badge.text}</span>
                                  </div>
                                )}
                              </div>
                              {staff.links && (
                                <div className="flex gap-2">
                                  {staff.links.map((link, index) => (
                                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ${getIconColor(link.type)}`} title={link.label || link.type}>
                                      {getIcon(link.type)}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          {staff.description && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                              <div className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 shadow-lg max-w-xs w-max">
                                <div className="text-center leading-relaxed whitespace-pre-line">{staff.description}</div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
          </div>
        </div>
      </main>

      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            2022-{new Date().getFullYear()} planetearth.kr. All rights reserved.
          </p>
          <div className="text-gray-500 text-sm space-x-4">
            <span>PlanetEarth is not affiliated with Mojang or Microsoft.</span>
            <span>Help: contact@planetearth.kr</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
