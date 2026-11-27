import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {FaDiscord, FaGithub} from 'react-icons/fa';
import {FiCode, FiExternalLink, FiShield, FiUsers} from 'react-icons/fi';
import {MdPalette} from 'react-icons/md';
import type {IconType} from 'react-icons';
import styles from './styles.module.css';

const inactive = ['inactive', 'secondary'];

type MemberLink = {Icon: IconType; href: string; title: string};
type Member = {id: string; name: string; discord: string; badge?: string[]; links?: MemberLink[]};

const categories: {name: string; Icon: IconType; members: Member[]}[] = [
  {
    name: 'Admin',
    Icon: FiShield,
    members: [
      {id: 'heiz', name: 'Heiz', discord: '195514337996177408', badge: ['manager', 'danger']},
      {id: 'Oneper34_', name: 'Ago', discord: '722273731329916959', badge: ['manager', 'success']},
    ],
  },
  {
    name: 'Developer',
    Icon: FiCode,
    members: [
      {
        id: 'irochi_',
        name: 'Irochi',
        discord: '1086117494189723658',
        links: [
          {Icon: FaGithub, href: 'https://github.com/irochi-moe', title: 'GitHub'},
          {Icon: FiExternalLink, href: 'https://irochi.moe', title: 'irochi.moe'},
        ],
        badge: ['backendDev', 'primary'],
      },
      {id: 'yellim', name: 'Yellim', discord: '596201576327282699', badge: inactive},
    ],
  },
  {
    name: 'Moderator',
    Icon: FiUsers,
    members: [
      {id: 'turtlefisherman', name: 'TurtleFisherman', discord: '453470747130724363'},
      {id: 'townyapi', name: 'TownyAPI', discord: '244889376025346049'},
      {id: 'i_loveryo', name: 'I_loveryo', discord: '328504741711839233'},
      {id: 'ma5o', name: 'MA5O', discord: '840784325834571827'},
      {id: 'aceda8', name: 'aceda8', discord: '589405416447016960', badge: inactive},
      {id: 'maltese_', name: 'Maltese_', discord: '376282963781877770', badge: inactive},
      {id: 'royang_', name: 'Royang_', discord: '1128999881801990265', badge: inactive},
    ],
  },
  {
    name: 'Designer',
    Icon: MdPalette,
    members: [
      {id: 'cokuun', name: 'CoKuun', discord: '387188588628017152'},
      {id: 'squirrel', name: 'Squirrel', discord: '268772304375382016'},
      {id: 'apologle', name: 'Apologle', discord: '347864621274759170'},
    ],
  },
];

export default function Staff() {
  const title = translate({id: 'staff.title', message: '운영진 소개'});
  const subtitle = translate({id: 'staff.subtitle', message: 'PlanetEarth를 함께 만들어가는 사람들'});
  const badges: Record<string, string> = {
    manager: translate({id: 'badges.manager', message: '총괄'}),
    backendDev: translate({id: 'badges.backendDev', message: '백엔드 개발'}),
    inactive: translate({id: 'badges.inactive', message: '활동중단'}),
  };

  return (
    <Layout title={title} description={subtitle}>
      <header className={clsx('hero', styles.hero, styles.staffHero)}>
        <div>
          <Heading as="h1" className="hero__title">
            {title}
          </Heading>
          <p className="hero__subtitle">{subtitle}</p>
        </div>
      </header>
      <main className={clsx(styles.main, styles.categories)}>
        {categories.map(({name, Icon, members}) => (
          <section key={name} className={clsx(members.length > 2 && styles.wide)}>
            <Heading as="h2">
              <Icon /> {name} <small>({members.length})</small>
            </Heading>
            <div className={styles.grid}>
              {members.map((member) => (
                <div key={member.id} className={clsx('card', styles.member)}>
                  <img
                    src={`https://api.mcheads.org/head/${member.id}/64`}
                    alt={translate({id: 'staff.skinAlt', message: '{name} 마인크래프트 스킨'}, {name: member.name})}
                    loading="lazy"
                    width={56}
                    height={56}
                    className={styles.head}
                  />
                  <div className={styles.info}>
                    <strong className={styles.name}>{member.name}</strong>
                    {member.badge && (
                      <span className={`badge badge--${member.badge[1]} margin-left--sm`}>
                        {badges[member.badge[0]]}
                      </span>
                    )}
                    <div className={styles.links}>
                      {[
                        {Icon: FaDiscord, href: `https://discord.com/users/${member.discord}`, title: 'Discord'},
                        ...(member.links ?? []),
                      ].map((link) => (
                        <Link key={link.href} href={link.href} title={link.title}>
                          <link.Icon />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </Layout>
  );
}
