// Server-side Contentful content fetching for the home page hero and events
// list. Hits the Content Delivery REST API directly with `fetch` (rather than
// the `contentful` SDK) so we can use Next's `next: { revalidate }` cache
// option, matching the pattern already used for YouTube/Spotify in
// lib/media.ts. Falls back to the site's existing static copy whenever
// Contentful isn't configured or a request fails, so a misconfigured or down
// CMS never breaks the page.
const REVALIDATE_SECONDS = 600;

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';

interface ContentfulAsset {
  sys: { id: string };
  fields: { file?: { url?: string } };
}

interface ContentfulResponse<Fields> {
  items: Array<{ fields: Fields }>;
  includes?: { Asset?: ContentfulAsset[] };
}

function assetUrl(
  linkId: string,
  includes?: { Asset?: ContentfulAsset[] },
): string | null {
  const url = includes?.Asset?.find((asset) => asset.sys.id === linkId)?.fields
    .file?.url;
  return url ? `https:${url}` : null;
}

async function fetchEntries<Fields>(
  contentType: string,
): Promise<ContentfulResponse<Fields> | null> {
  if (!SPACE_ID || !ACCESS_TOKEN) return null;

  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?content_type=${contentType}&include=2`,
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );
    if (!res.ok) return null;
    return (await res.json()) as ContentfulResponse<Fields>;
  } catch {
    return null;
  }
}

export interface Hero {
  headline: string;
  subtext: string;
  backgroundImage: string;
}

const defaultHero: Hero = {
  headline: 'A generation rooted in truth',
  subtext:
    'We exist to share the life-giving message of Jesus and raise devoted followers of Christ.',
  backgroundImage: '/img/HERO2.jpg',
};

interface HeroFields {
  headline?: string;
  subtext?: string;
  backgroundImage?: { sys: { id: string } };
}

export async function getHero(): Promise<Hero> {
  const data = await fetchEntries<HeroFields>('hero');
  const fields = data?.items?.[0]?.fields;
  if (!fields) return defaultHero;

  const image = fields.backgroundImage
    ? assetUrl(fields.backgroundImage.sys.id, data?.includes)
    : null;

  return {
    headline: fields.headline || defaultHero.headline,
    subtext: fields.subtext || defaultHero.subtext,
    backgroundImage: image || defaultHero.backgroundImage,
  };
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string | null;
  location: string | null;
  image: string;
}

const defaultEvents: EventItem[] = [
  {
    id: '1',
    title: 'Refresh Tour 2026',
    subtitle: 'Across the Globe',
    date: 'Jan 31, 2026 - Jan 13, 2027',
    time: null,
    location: null,
    image: '/img/refresh-tours.jpg',
  },
  {
    id: '2',
    title: 'Night of Favour',
    subtitle: 'Every Night With Jesus',
    date: 'Friday & Saturday, February 20th & 21st, 2026',
    time: '8:00PM (WAT) daily',
    location: null,
    image: '/img/night-of-favour.jpeg',
  },
];

interface EventFields {
  title?: string;
  subtitle?: string;
  date?: string;
  time?: string;
  location?: string;
  image?: { sys: { id: string } };
}

export async function getEvents(): Promise<EventItem[]> {
  const data = await fetchEntries<EventFields>('event');
  if (!data?.items?.length) return defaultEvents;

  const events = data.items
    .map((entry, index) => {
      const f = entry.fields;
      const image = f.image ? assetUrl(f.image.sys.id, data.includes) : null;
      return {
        id: String(index + 1),
        title: f.title ?? '',
        subtitle: f.subtitle ?? '',
        date: f.date ?? '',
        time: f.time ?? null,
        location: f.location ?? null,
        image: image ?? defaultEvents[0].image,
      };
    })
    .filter((event) => event.title);

  return events.length ? events : defaultEvents;
}
