import test from 'node:test';
import assert from 'node:assert/strict';
import {decide} from './_middleware.mjs';

const req = (pathname, {search = '', cookie = '', lang = ''} = {}) =>
  decide({pathname, search, cookieHeader: cookie, acceptLanguage: lang});

test('외부 짧은 주소', () => {
  assert.deepEqual(req('/map'), {status: 302, location: 'https://map.planetearth.kr'});
  assert.deepEqual(req('/discord/x'), {status: 302, location: 'https://discord.com/invite/planetearth'});
  assert.equal(
    req('/guide').location,
    'https://planetearthmc.notion.site/PlanetEarth-9e3ba37035e44f59bf492a8bede7b646',
  );
  assert.equal(
    req('/schedule').location,
    'https://planetearthmc.notion.site/df5041caf2824c3fb2a331013c25acbf?v=0ce14acc9db3446da1522e4221de9e64',
  );
  assert.equal(req('/mapping'), null);
});

test('옛 /ko 주소', () => {
  assert.deepEqual(req('/ko'), {status: 301, location: '/', setLocale: 'ko'});
  assert.deepEqual(req('/ko/staff', {search: '?a=1'}), {status: 301, location: '/staff?a=1', setLocale: 'ko'});
  assert.equal(req('/kofi'), null);
});

test('겹친 슬래시로 다른 사이트로 보내지 않는다', () => {
  assert.equal(req('/ko//evil.com').location, '/evil.com');
  assert.equal(req('//evil.com', {search: '?persistLocale=true'}).location, '/evil.com');
});

test('persistLocale: 주소의 언어를 저장하고 쿼리를 뺀다', () => {
  assert.deepEqual(req('/en/staff', {search: '?persistLocale=true'}), {
    status: 307,
    location: '/en/staff',
    setLocale: 'en',
  });
  assert.deepEqual(req('/docs/towny', {search: '?persistLocale=true&x=1'}), {
    status: 307,
    location: '/docs/towny?x=1',
    setLocale: 'ko',
  });
  assert.deepEqual(req('/', {search: '?persistLocale=true', cookie: 'NEXT_LOCALE=en', lang: 'en'}), {
    status: 307,
    location: '/',
    setLocale: 'ko',
  });
});

test('자동 이동', () => {
  assert.deepEqual(req('/', {lang: 'en-US,en;q=0.9'}), {status: 307, location: '/en/'});
  assert.deepEqual(req('/staff', {lang: 'ja,en;q=0.5', search: '?a=1'}), {status: 307, location: '/ja/staff?a=1'});
  assert.deepEqual(req('/', {cookie: 'x=1; NEXT_LOCALE=ja'}), {status: 307, location: '/ja/'});
  assert.equal(req('/', {lang: 'ko-KR,ko;q=0.9,en;q=0.8'}), null);
  assert.equal(req('/', {lang: 'en;q=0.5,ko;q=0.9'}), null);
  assert.equal(req('/', {lang: 'fr-FR'}), null);
  assert.equal(req('/', {lang: 'en;q=0'}), null);
  assert.equal(req('/', {lang: 'en', cookie: 'NEXT_LOCALE=ko'}), null);
  assert.equal(req('/', {lang: 'en', cookie: 'NEXT_LOCALE=fr'}).location, '/en/');
  assert.equal(req('/docs', {lang: 'en'}), null);
  assert.equal(req('/docs/towny/basics', {lang: 'en'}), null);
  assert.equal(req('/en/staff', {cookie: 'NEXT_LOCALE=ko'}), null);
  assert.equal(req('/sitemap.xml', {lang: 'en'}), null);
});
