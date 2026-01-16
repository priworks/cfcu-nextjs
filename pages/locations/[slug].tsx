import { readToken } from '@/lib/sanity.api'
import {
  getGlobalSettings,
  getClient,
  getAllLocationSlugs,
  getLocationBySlug,
} from '@/lib/sanity.client'
import { GetStaticProps } from 'next'
import type { SharedPageProps, Seo } from '@/pages/_app'
import { QueryParams } from 'next-sanity'
import { useLiveQuery } from '@sanity/preview-kit'
import { Layout } from '@/components/layouts/Layout'
import { LocationPage, GlobalSettingsType } from '@/types/sanity'
import { locationBySlugQuery } from '@/lib/sanity.queries'
import { useEffect } from 'react'
import { useGlobalSettingsStore } from '@/stores/globalSettingsStore'
import { stegaClean } from '@sanity/client/stega'

import LocationPageComponent from '@/components/pages/LocationPage'
interface PageProps extends SharedPageProps {
  locationPage: LocationPage
  globalSettings: GlobalSettingsType
  params: QueryParams
  seo: Seo & { jsonLD: any }
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const [data] = useLiveQuery<LocationPage>(
    props.locationPage,
    locationBySlugQuery,
    props.params,
  )

  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )

  useEffect(() => {
    setGlobalSettings(props.globalSettings)
  }, [setGlobalSettings, props.globalSettings])

  return (
    <Layout seo={props.seo}>
      <LocationPageComponent data={data} key={data?.slug?.current} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const slug = `locations/${params?.slug}`
  const [globalSettings, locationPage] = await Promise.all([
    getGlobalSettings(client),
    getLocationBySlug(client, slug),
  ])

  if (!locationPage?.title) {
    return {
      notFound: true,
    }
  }

  const seo = {
    title: locationPage?.metaTitle || locationPage?.title + ' | CFCU',
    description: locationPage?.metaDescription || '',
    image: locationPage?.ogImage || '',
    keywords: locationPage?.keywords || '',
    jsonLD:
      typeof locationPage?.jsonLd === 'string'
        ? JSON.parse(stegaClean(locationPage?.jsonLd))
        : '',
  }

  return {
    props: {
      locationPage,
      params: {
        ...params,
        slug,
      },
      globalSettings,
      draftMode,
      seo,
      token: draftMode ? readToken : '',
    },
    revalidate: 3600,
  }
}

export const getStaticPaths = async () => {
  const slugs = (await getAllLocationSlugs()).map((slug) =>
    removeLocationPrefix(slug.slug),
  )
  return {
    paths: slugs?.map(({ slug }) => `/locations/${slug}`) || [],
    fallback: 'blocking',
  }
}

function removeLocationPrefix(slug: any) {
  // Check if the slug starts with 'post/'
  if (slug.startsWith('locations/')) {
    // If it does, remove 'post/' and return the rest
    return slug.slice(10)
  } // If it doesn't start with 'post/', return the original slug
  return slug
}
