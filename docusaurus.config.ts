import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import notionSync from './notion-sync.json';

const toDocs = (path: string) => `/docs${path}`.replace(/\/$/, '');

const config: Config = {
  title: 'PlanetEarth',
  tagline: '마인크래프트 오픈월드 지구서버',
  url: 'https://planetearth.kr',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',

  future: {v4: true},

  trailingSlash: false,

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en', 'ja'],
    localeConfigs: {ko: {label: 'KO'}, en: {label: 'EN'}, ja: {label: 'JA'}},
  },

  markdown: {hooks: {onBrokenMarkdownLinks: 'warn'}},

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          path: 'src/docs',
          routeBasePath: 'docs',
        },
        blog: false,
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**', '/search/**'],
        },
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // 목록은 notion-sync.json에서 관리한다.
        redirects: Object.entries(notionSync.redirects).map(([from, to]) => ({from: toDocs(from), to: toDocs(to)})),
      },
    ],
  ],

  themeConfig: {
    image: 'img/site/og-image.jpg',
    colorMode: {defaultMode: 'dark', disableSwitch: true},
    navbar: {
      logo: {alt: 'PlanetEarth', src: 'img/logo.png'},
      items: [
        {type: 'docSidebar', sidebarId: 'tutorialSidebar', label: '가이드', position: 'left'},
        {to: '/staff', label: '운영진', position: 'left'},
        {href: 'https://map.planetearth.kr', label: '웹 지도', position: 'left'},
        {href: 'https://discord.planetearth.kr', label: '디스코드', position: 'left'},
        {type: 'localeDropdown', position: 'right', queryString: '?persistLocale=true'},
      ],
    },
    footer: {
      copyright: `<span>Copyright 2022-${new Date().getFullYear()} 플래닛네트워크. All rights reserved.</span><span>PlanetEarth is not affiliated with Mojang or Microsoft. Help: contact@planetearth.kr</span>`,
    },
    algolia: {
      appId: 'K7LZJ1O8AW',
      apiKey: 'a3cec996f9bf8146ef99af8fedd6b2a2',
      indexName: 'planetearth_docs',
    },
    prism: {theme: prismThemes.dracula},
  } satisfies Preset.ThemeConfig,
};

export default config;
