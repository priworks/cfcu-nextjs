import { getClient } from '@/lib/sanity.client'
import { groq, SanityClient } from 'next-sanity'

type SitemapLocation = {
  url: string
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority: number
  lastmod?: Date
}

// Use this to manually add routes to the sitemap
const defaultUrls: SitemapLocation[] = [
  {
    url: '/',
    changefreq: 'monthly',
    priority: 1,
    lastmod: new Date(), // or custom date: '2023-06-12T00:00:00.000Z',
  },
  {
    url: '/locations',
    changefreq: 'monthly',
    priority: 1,
    lastmod: new Date(), // or custom date: '2023-06-12T00:00:00.000Z',
  },

  //   { url: '/about', priority: 0.5 },
  //   { url: '/blog', changefreq: 'weekly', priority: 0.7 },
]

const createSitemap = (locations: SitemapLocation[]) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL // Make sure to configure this
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${locations
        .map((location) => {
          return `<url>
                    <loc>${baseUrl}${location.url}</loc>
                    <priority>${location.priority}</priority>
                    ${
                      location.lastmod
                        ? `<lastmod>${location.lastmod.toISOString()}</lastmod>`
                        : ''
                    }
                        <changefreq>${location.changefreq}</changefreq>
                  </url>`
        })
        .join('')}
  </urlset>
  `
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: any }) {
  const client = getClient()

  const locationsSlugs = await client.fetch<{ slug: string }[]>(
    `
    *[_type == "location"]{
      "slug": slug.current
    }
  `,
  )

  const postSlugs = await client.fetch<{ slug: string }[]>(
    `
    *[_type == "post"]{
       "slug": slug.current
    }
  `,
  )

  const subpageSlugs = await client.fetch<{ slug: string }[]>(
    `
    *[_type == "subPage"]{
       "slug": slug.current
    }
  `,
  )

  const allTopicIds = await client.fetch(
    `
    *[_type == "topic"]{
    ...,
      _id,
      name
    }
  `,
  )

  const topicSlugs = allTopicIds.map((topicId: any) => {
    return topicId.slug.current
  })

  const allPostsPageSlugs = await getAllPostHomePageSlugs(client)
  // Combine all slugs into one array
  const allSlugs = [
    ...new Set([
      ...locationsSlugs.map((slug) => slug.slug),
      ...postSlugs.map((slug) => slug.slug),
      ...subpageSlugs.map((slug) => slug.slug),
      ...topicSlugs.flat(),
      ...allPostsPageSlugs,
    ]),
  ]

  const allSlugsWithSitemapProps = allSlugs.map((slug) => ({
    url: '/' + slug,
    changefreq: 'monthly' as SitemapLocation['changefreq'],
    priority: 1,
    lastmod: new Date(), // or custom date: '2023-06-12T00:00:00.000Z',
  }))

  const allPaths = [...defaultUrls, ...allSlugsWithSitemapProps]

  // Set response to XML
  res.setHeader('Content-Type', 'text/xml')
  res.write(createSitemap(allPaths))
  res.end()

  return {
    props: {},
  }
}

async function getTopicPostPageSlugs(
  client: SanityClient,
  topicId: string,
): Promise<string[]> {
  // Fetch the total number of blog posts for the given topic

  ///TODO Query all pages that reference this topic.
  const totalPosts = await client.fetch(
    groq`count(*[_type == "post" && references($topicId)])`,
    { topicId },
  )
  const postsPerPage = 10 // Adjust this based on your pagination setup
  // Calculate the number of pages
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  // Fetch the topic slug
  const topicSlug = await client.fetch(
    groq`*[_type == "topic" && _id == $topicId][0].slug.current`,
    { topicId },
  )
  if (!topicSlug) {
    throw new Error(`Topic with ID ${topicId} not found`)
  }

  return [
    ...Array.from({ length: totalPages }, (_, i) => `${topicSlug}/${i + 1}`),
  ]
}

async function getAllPostHomePageSlugs(client: SanityClient) {
  // Fetch the total number of blog posts
  // Generate routes for each page
  return ['posts']
}
