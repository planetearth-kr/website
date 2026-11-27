const external = {
  map: 'https://map.planetearth.kr',
  discord: 'https://discord.com/invite/planetearth',
  guide: 'https://planetearthmc.notion.site/PlanetEarth-9e3ba37035e44f59bf492a8bede7b646',
  schedule: 'https://planetearthmc.notion.site/df5041caf2824c3fb2a331013c25acbf?v=0ce14acc9db3446da1522e4221de9e64',
};

function preferredLocale(cookieHeader, acceptLanguage) {
  const cookie = cookieHeader.match(/(?:^|;\s*)NEXT_LOCALE=(ko|en|ja)(?:;|$)/)?.[1];
  if (cookie) return cookie;
  return acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(/\s*;\s*q=/);
      return {lang: tag.split('-')[0].toLowerCase(), q: q === undefined ? 1 : Number(q)};
    })
    .filter(({lang, q}) => q > 0 && ['ko', 'en', 'ja'].includes(lang))
    .reduce((best, l) => (l.q > best.q ? l : best), {lang: 'ko', q: 0}).lang;
}

export function decide({pathname: rawPathname, search, cookieHeader, acceptLanguage}) {
  // '//host'는 Location에서 다른 사이트 주소가 된다.
  const pathname = rawPathname.replace(/\/{2,}/g, '/');
  const short = pathname.match(/^\/(map|discord|guide|schedule)(\/|$)/);
  if (short) return {status: 302, location: external[short[1]]};

  if (/^\/ko(\/|$)/.test(pathname))
    return {status: 301, location: (pathname.slice(3) || '/') + search, setLocale: 'ko'};

  const params = new URLSearchParams(search);
  if (params.has('persistLocale')) {
    params.delete('persistLocale');
    const rest = params.toString();
    return {
      status: 307,
      location: pathname + (rest && `?${rest}`),
      setLocale: pathname.match(/^\/(en|ja)(\/|$)/)?.[1] ?? 'ko',
    };
  }

  if (/^\/(en|ja|docs)(\/|$)/.test(pathname) || pathname.split('/').pop().includes('.')) return null;

  const locale = preferredLocale(cookieHeader, acceptLanguage);
  return locale === 'ko' ? null : {status: 307, location: `/${locale}${pathname}${search}`};
}

export async function onRequest(context) {
  const {request} = context;
  const url = new URL(request.url);
  const result = decide({
    pathname: url.pathname,
    search: url.search,
    cookieHeader: request.headers.get('Cookie') ?? '',
    acceptLanguage: request.headers.get('Accept-Language') ?? '',
  });
  if (!result) return context.next();

  const headers = new Headers({Location: result.location, 'Cache-Control': 'no-store'});
  if (result.setLocale)
    headers.set('Set-Cookie', `NEXT_LOCALE=${result.setLocale}; Path=/; Max-Age=31536000; SameSite=Lax`);
  return new Response(null, {status: result.status, headers});
}
