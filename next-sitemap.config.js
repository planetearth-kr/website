const siteUrl = process.env.SITE_URL || "https://planetearth.kr";
const locales = ["ko", "en", "ja"];
const defaultLocale = "ko";

const localePrefix = new RegExp(`^/(?:${locales.join("|")})(?=/|$)`);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  transform: async (config, path) => {
    const basePath = path.replace(localePrefix, "");
    const alternateRefs = [
      ...locales.map((locale) => ({
        href: `${siteUrl}/${locale}${basePath}`,
        hreflang: locale,
        hrefIsAbsolute: true,
      })),
      {
        href: `${siteUrl}/${defaultLocale}${basePath}`,
        hreflang: "x-default",
        hrefIsAbsolute: true,
      },
    ];

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs,
    };
  },
};
