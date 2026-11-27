import {useState} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {FiCheck, FiCopy} from 'react-icons/fi';
import styles from './styles.module.css';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const {withBaseUrl} = useBaseUrlUtils();
  const copyLabel = copied
    ? translate({id: 'home.copied', message: '서버 주소가 복사되었습니다'})
    : translate({id: 'home.copy', message: '서버 주소 복사'});
  const stats = [
    ['49,000+', translate({id: 'home.stats.totalPlayers', message: '누적 접속'})],
    ['18,000+', translate({id: 'home.stats.discordMembers', message: '디스코드 멤버'})],
    ['571', translate({id: 'home.stats.peakPlayers', message: '최고 동시 접속'})],
    ['330+', translate({id: 'home.stats.towns', message: '마을'})],
  ];

  function copy() {
    navigator.clipboard.writeText('planetearth.kr').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  }

  return (
    <Layout description={translate({id: 'meta.description', message: '오픈월드 타우니 지구서버 PlanetEarth'})}>
      <header className={clsx('hero', styles.hero)}>
        <div>
          <span className="badge badge--danger margin-bottom--sm">
            <Translate id="home.announcement">🎉 PlanetEarth 4주년! 함께해 주셔서 감사합니다</Translate>
          </span>
          <Heading as="h1" className={clsx('hero__title', styles.title)}>
            <Translate id="home.title">게임 속, 또 하나의 지구</Translate>
          </Heading>
          <p className={clsx('hero__subtitle', styles.subtitle)}>
            <Translate id="home.subtitle">오픈월드 타우니 지구서버 PlanetEarth</Translate>
          </p>
          <div className={styles.ip}>
            IP: planetearth.kr
            <button className={clsx('clean-btn', styles.copy)} aria-label={copyLabel} title={copyLabel} onClick={copy}>
              {copied ? <FiCheck /> : <FiCopy />}
            </button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={clsx(styles.grid, styles.stats, 'text--center margin-bottom--xl')}>
          {stats.map(([number, label]) => (
            <div key={label}>
              <strong className={styles.stat}>{number}</strong>
              {label}
            </div>
          ))}
        </div>
        <div className={clsx(styles.grid, styles.gallery)}>
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <img
              key={number}
              src={withBaseUrl(`/img/site/screenshot-${number}.webp`)}
              alt={translate({id: 'home.screenshotAlt', message: '인게임 스크린샷 {number}'}, {number})}
              loading="lazy"
              className={clsx(styles.screenshot, 'shadow--md')}
            />
          ))}
        </div>
      </main>
    </Layout>
  );
}
