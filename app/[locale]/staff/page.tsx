import Image from "next/image";
import { useTranslations, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { FiExternalLink, FiShield, FiCode, FiUsers } from "react-icons/fi";
import { MdPalette } from "react-icons/md";
import { Navigation } from "@/components/Layout";
import { Footer } from "@/components/Footer";
import StaffAvatar from "@/components/StaffAvatar";
import { routing } from "@/i18n/routing";
import { localizedPageMetadata } from "@/i18n/metadata";

type LinkType = "github" | "discord" | "other";

type StaffLink = {
  type: LinkType;
  url: string;
  label?: string;
};

type Staff = {
  id: string;
  name: string;
  links?: StaffLink[];
  description?: string;
  badge?: {
    key: string;
    color: string;
  };
};

const discord = (userId: string, label: string): StaffLink[] => [
  { type: "discord", url: `https://discord.com/users/${userId}`, label },
];

const inactive = { key: "inactive", color: "bg-gray-500" };

const staffData: Record<string, Staff[]> = {
  Admin: [
    {
      id: "heiz",
      name: "Heiz",
      links: discord("195514337996177408", "heizheizheiz"),
      badge: { key: "manager", color: "bg-red-500" },
    },
    {
      id: "Oneper34_",
      name: "Ago",
      links: discord("722273731329916959", "yxung_seo"),
      badge: { key: "manager", color: "bg-green-500" },
    },
  ],
  Developer: [
    {
      id: "irochi_",
      name: "Irochi",
      description:
        "Life leaves more than a few scratches.\nWhy do we still seek hope as we fall apart?",
      links: [
        ...discord("1086117494189723658", "irochi"),
        { type: "github", url: "https://github.com/irochi-moe", label: "GitHub" },
        { type: "other", url: "https://irochi.moe", label: "irochi.moe" },
      ],
      badge: { key: "backendDev", color: "bg-indigo-500" },
    },
    {
      id: "yellim",
      name: "Yellim",
      links: discord("596201576327282699", "yellim"),
      badge: inactive,
    },
  ],
  Moderator: [
    {
      id: "turtlefisherman",
      name: "TurtleFisherman",
      links: discord("453470747130724363", "1023_hd"),
    },
    { id: "townyapi", name: "TownyAPI", links: discord("244889376025346049", "xdgf0") },
    { id: "i_loveryo", name: "I_loveryo", links: discord("328504741711839233", "fo1ver") },
    { id: "ma5o", name: "MA5O", links: discord("840784325834571827", "m_ss0") },
    {
      id: "aceda8",
      name: "aceda8",
      links: discord("589405416447016960", "aceda8"),
      badge: inactive,
    },
    {
      id: "maltese_",
      name: "Maltese_",
      links: discord("376282963781877770", "byeol._.ha"),
      badge: inactive,
    },
    {
      id: "royang_",
      name: "Royang_",
      links: discord("1128999881801990265", "no.l2"),
      badge: inactive,
    },
  ],
  Designer: [
    { id: "cokuun", name: "CoKuun", links: discord("387188588628017152", "cokuun") },
    { id: "squirrel", name: "Squirrel", links: discord("268772304375382016", "squirrel1202") },
  ],
};

const categoryInfo = {
  Admin: { icon: FiShield, bgColor: "bg-red-500" },
  Developer: { icon: FiCode, bgColor: "bg-blue-500" },
  Moderator: { icon: FiUsers, bgColor: "bg-green-500" },
  Designer: { icon: MdPalette, bgColor: "bg-purple-500" },
} as const;

const iconMap = {
  github: {
    component: FaGithub,
    color: "text-gray-700 hover:text-gray-800",
  },
  discord: {
    component: FaDiscord,
    color: "text-indigo-500 hover:text-indigo-600",
  },
  other: {
    component: FiExternalLink,
    color: "text-gray-500 hover:text-gray-600",
  },
} as const;

const featuredCategories = ["Admin", "Developer"] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "staff" });

  return {
    title: t("title"),
    description: t("subtitle"),
    ...localizedPageMetadata({
      locale,
      path: "/staff",
      title: t("title"),
      description: t("subtitle"),
    }),
  };
}

export default async function StaffPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <StaffContent />;
}

function StaffContent() {
  const t = useTranslations("staff");
  const tBadges = useTranslations("badges");

  function renderStaffCard(staff: Staff) {
    // Cards with a tooltip are focusable so touch/keyboard users can reveal
    // the hover-only description via group-focus-within.
    return (
      <div
        key={staff.id}
        tabIndex={staff.description ? 0 : undefined}
        className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 relative group flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm flex-shrink-0 bg-gray-100">
            <StaffAvatar
              id={staff.id}
              name={staff.name}
              alt={t("skinAlt", { name: staff.name })}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {staff.name}
              </h3>
              {staff.badge && (
                <div
                  className={`${staff.badge.color} text-white px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap`}
                >
                  {tBadges(staff.badge.key)}
                </div>
              )}
            </div>
            {staff.links && (
              <div className="flex gap-2">
                {staff.links.map((link) => {
                  const icon = iconMap[link.type];
                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ${icon.color}`}
                      title={link.label || link.type}
                    >
                      <icon.component className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {staff.description && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            <div className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 shadow-lg max-w-xs w-max">
              <div className="text-center leading-relaxed whitespace-pre-line">
                {staff.description}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderCategorySection(
    category: string,
    staffList: Staff[],
    gridClassName: string
  ) {
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
          <span className="text-sm text-gray-500">
            ({t("memberCount", { count: staffList.length })})
          </span>
        </div>
        <div className={gridClassName}>
          {staffList.map(renderStaffCard)}
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <link rel="preconnect" href="https://api.mcheads.org" />
      <Navigation />

      <section className="relative h-[30vh] flex items-center">
        <Image
          src="/background.webp"
          alt={t("backgroundAlt")}
          fill
          priority
          className="object-cover object-[50%_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        <div className="relative z-10 text-white container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-200">{t("subtitle")}</p>
        </div>
      </section>

      <main className="py-8 bg-gray-50 flex-1">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCategories.map((category) =>
                renderCategorySection(
                  category,
                  staffData[category],
                  "grid grid-cols-1 sm:grid-cols-2 gap-6"
                )
              )}
            </div>

            {Object.entries(staffData)
              .filter(
                ([category]) =>
                  !featuredCategories.includes(
                    category as (typeof featuredCategories)[number]
                  )
              )
              .map(([category, staffList]) =>
                renderCategorySection(
                  category,
                  staffList,
                  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                )
              )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
