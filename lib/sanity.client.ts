import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import { ATMLocation, TopicPageType, PostPageType } from 'types/sanity'
import {
  globalSettingsQuery,
  dynamicPageSlugsQuery,
  dynamicPageBySlugQuery,
  homepageQuery,
  subPageBySlugQuery,
  postBySlugQuery,
  testModulesQuery,
  ratePageBySlugQuery,
  ratePageSlugsQuery,
  locationBySlugQuery,
  locationSlugsQuery,
  locationsQuery,
  locationHomepageQuery,
  allPostsQuery,
  blogHomepageQuery,
  individualPostBySlugQuery,
  individualPostSlugsQuery,
  topicBySlugQuery,
  topicSlugsQuery,
  allTopicsQuery,
  fourOhFourQuery,
  allSubpagesQuery,
  allPostsWithouPagination,
} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'

import Papa from 'papaparse'
export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    encodeSourceMap: preview?.token ? true : false,
    studioUrl,
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'drafts',
    })
  }
  return client
}

export const getSanityImageConfig = () => getClient()

export async function getGlobalSettings(client: SanityClient) {
  return (await client.fetch(globalSettingsQuery)) || {}
}

export async function getDynamicPageBySlug(client: SanityClient, slug: string) {
  return (await client.fetch(dynamicPageBySlugQuery, { slug })) || ({} as any)
}

export async function getAllDynamicPageSlugs() {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(dynamicPageSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getHomepage(client: SanityClient) {
  return (await client.fetch(homepageQuery)) || {}
}

export async function getTestModules(client: SanityClient) {
  return (await client.fetch(testModulesQuery)) || {}
}

export async function getAllSubpages(client: SanityClient) {
  return (await client.fetch(allSubpagesQuery)) || []
}
export async function getSubPageBySlug(client: SanityClient, slug: string) {
  return (await client.fetch(subPageBySlugQuery, { slug })) || ({} as any)
}

export async function getPostBySlug(client: SanityClient, slug: string) {
  return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
}

export async function getRatePageBySlug(client: SanityClient, slug: string) {
  return (await client.fetch(ratePageBySlugQuery, { slug })) || ({} as any)
}

export async function getAllRatePageSlugs() {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(ratePageSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getLocationBySlug(client: SanityClient, slug: string) {
  return (await client.fetch(locationBySlugQuery, { slug })) || ({} as any)
}

export async function getAllLocationSlugs() {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(locationSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getAllLocations(client: SanityClient) {
  return (await client.fetch(locationsQuery)) || []
}

export async function getLocationHomepage(client: SanityClient) {
  return (await client.fetch(locationHomepageQuery)) || {}
}

export async function getATMLocations(
  client: SanityClient,
): Promise<ATMLocation[]> {
  // First, fetch the file asset reference from your document
  const query = `*[_type == "locationHomePage"][0].atmCSV.asset->url`
  const fileUrl = await client.fetch(query)

  if (!fileUrl) {
    return []
  }

  // Fetch the CSV content
  const response = await fetch(fileUrl)
  const csvText = await response.text()

  // Parse CSV
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: false, // Set to true if your CSV has headers
      complete: (results) => {
        const locations = results.data
          .filter((row: any) => row.length === 4) // Ensure row has all fields
          .map((row: any) => ({
            name: row[0],
            address: row[1],
            longitude: parseFloat(row[2]),
            latitude: parseFloat(row[3]),
          }))
        resolve(locations)
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}

export async function getAllPostsWithoutPagination(client: SanityClient) {
  return (await client.fetch(allPostsWithouPagination)) || []
}

export async function getAllPosts(
  client: SanityClient,
  page = 1,
  itemsPerPage = 10,
) {
  const start = page == 1 ? 0 : (page - 1) * itemsPerPage
  const end = start + itemsPerPage

  const [posts, totalCount] = await Promise.all([
    client.fetch(allPostsQuery, { start, end }),
    client.fetch(`count(*[_type == "post"])`),
  ])

  return {
    posts,
    totalCount,
    totalPages: Math.ceil(totalCount / itemsPerPage),
  }
}

export async function getBlogHomepage(client: SanityClient) {
  return (await client.fetch(blogHomepageQuery)) || {}
}

export async function getIndividualPostBySlug(
  client: SanityClient,
  slug: string,
) {
  return (
    (await client.fetch(individualPostBySlugQuery, { slug })) || ({} as any)
  )
}

export async function getAllIndividualPostSlugs() {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(individualPostSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getAllTopicSlugs() {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(topicSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

// export async function getTopicBySlug(client: SanityClient, slug: string) {
//   return (await client.fetch(topicBySlugQuery, { slug })) || ({} as any)
// }

export async function getTopicBySlug(
  client: SanityClient,
  slug: string,
  page: number = 1,
  postsPerPage: number = 10,
): Promise<{
  topicData: TopicPageType
  relatedPosts: PostPageType[]
  totalPosts: number
}> {
  const start = (page - 1) * postsPerPage
  const end = start + postsPerPage
  const [topicData, relatedPosts, totalPosts] = await Promise.all([
    client.fetch<TopicPageType>(topicBySlugQuery, { slug }),
    client.fetch<PostPageType[]>(
      `
      *[_type == "post" && $slug in topics[]->slug.current] | order(date desc) [$start...$end] {
      ...,
      }
    `,
      { slug, start, end },
    ),
    client.fetch<number>(
      `count(*[_type == "post" && $slug in topics[]->slug.current])`,
      { slug },
    ),
  ])

  if (!topicData) {
    throw new Error(`No topic found for slug: ${slug}`)
  }
  return { topicData, relatedPosts, totalPosts }
}

export async function getAllTopics(client: SanityClient) {
  return (await client.fetch(allTopicsQuery)) || []
}

export async function get404Page(client: SanityClient) {
  return (await client.fetch(fourOhFourQuery)) || {}
}
