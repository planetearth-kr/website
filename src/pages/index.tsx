import {useRef, useState, type CSSProperties} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Head from '@docusaurus/Head';
import Translate, {translate} from '@docusaurus/Translate';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {FiCheck, FiCopy} from 'react-icons/fi';
import styles from './styles.module.css';

export default function Home() {
  const [status, setStatus] = useState<'copied' | 'failed'>();
  const ip = useRef<HTMLSpanElement>(null);
  const timer = useRef(0);
  const {withBaseUrl} = useBaseUrlUtils();
  const heroImage = withBaseUrl('/img/site/background.webp');
  const copyLabel = translate({id: 'home.copy', message: '서버 주소 복사'});
  const statusMessages = {
    copied: translate({id: 'home.copied', message: '서버 주소가 복사되었습니다'}),
    failed: translate({id: 'home.copyFailed', message: '자동으로 복사하지 못했습니다. 선택된 주소를 직접 복사하세요'}),
  };
  const stats = [
    ['49,000+', translate({id: 'home.stats.totalPlayers', message: '누적 접속'})],
    ['18,000+', translate({id: 'home.stats.discordMembers', message: '디스코드 멤버'})],
    ['571', translate({id: 'home.stats.peakPlayers', message: '최고 동시 접속'})],
    ['330+', translate({id: 'home.stats.towns', message: '마을'})],
  ];
  const screenshots = [
    translate({id: 'home.screenshot1', message: 'Planet Earth Space Administration 간판과 지구본 조형물'}),
    translate({id: 'home.screenshot2', message: '어두운 돌 통로에서 전투 중인 플레이어들'}),
    translate({id: 'home.screenshot3', message: '유럽풍 건물이 늘어선 운하'}),
    translate({id: 'home.screenshot4', message: '야외 무대 앞에 모인 플레이어들'}),
    translate({id: 'home.screenshot5', message: '빙산과 기지가 보이는 설원'}),
    translate({id: 'home.screenshot6', message: '연못가 정자와 의자에 앉은 플레이어'}),
  ];

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText('planetearth.kr');
      setStatus('copied');
      timer.current = window.setTimeout(() => setStatus(undefined), 3000);
    } catch {
      getSelection()?.selectAllChildren(ip.current!);
      setStatus('failed');
    }
  }

  return (
    <Layout description={translate({id: 'meta.description', message: '오픈월드 타우니 지구서버 PlanetEarth'})}>
      <Head>
        <link rel="preload" as="image" href={heroImage} fetchPriority="high" />
      </Head>
      <header className={clsx('hero', styles.hero)} style={{'--hero-image': `url(${heroImage})`} as CSSProperties}>
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
            <span>
              IP: <span ref={ip}>planetearth.kr</span>
            </span>
            <button className={clsx('clean-btn', styles.copy)} aria-label={copyLabel} title={copyLabel} onClick={copy}>
              {status === 'copied' ? <FiCheck /> : <FiCopy />}
            </button>
          </div>
          <span role="status" className={styles.status}>
            {status && statusMessages[status]}
          </span>
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
          {screenshots.map((alt, i) => (
            <img
              key={i}
              src={withBaseUrl(`/img/site/screenshot-${i + 1}.webp`)}
              alt={alt}
              loading="lazy"
              className={clsx(styles.screenshot, 'shadow--md')}
            />
          ))}
        </div>
      </main>
    </Layout>
  );
}
