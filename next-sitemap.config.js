/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://planetearth.kr",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  alternateRefs: [
    { href: "https://planetearth.kr/ko", hreflang: "ko" },
    { href: "https://planetearth.kr/en", hreflang: "en" },
    { href: "https://planetearth.kr/ja", hreflang: "ja" },
  ],
};
