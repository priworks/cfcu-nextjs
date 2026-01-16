import { readToken } from '@/lib/sanity.api'
import {
  getGlobalSettings,
  getClient,
  getLocationHomepage,
  getAllLocations,
  getATMLocations,
} from '@/lib/sanity.client'
import {
  globalSettingsQuery,
  locationHomepageQuery,
  locationsQuery,
} from '@/lib/sanity.queries'
import {
  LocationHomepageType,
  GlobalSettingsType,
  LocationPage,
  ATMLocation,
} from '@/types/sanity'
import { GetStaticProps } from 'next'
// import { draftMode } from 'next/headers'
import { QueryParams } from 'next-sanity'
import type { SharedPageProps } from '@/pages/_app'
import { useLiveQuery } from '@sanity/preview-kit'
import { Layout } from '@/components/layouts/Layout'
import { useGlobalSettingsStore } from '@/stores/globalSettingsStore'
import { useEffect } from 'react'
import LocationHomePage from '@/components/pages/LocationHomePage'
import { Seo } from '@/pages/_app'

interface PageProps extends SharedPageProps {
  params: QueryParams
  globalSettings: GlobalSettingsType
  locationHomepage: LocationHomepageType
  allLocations: LocationPage[]
  atmLocations: ATMLocation[]
  seo: Seo
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const [data] = useLiveQuery<GlobalSettingsType>(
    props.globalSettings,
    globalSettingsQuery,
  )
  const [locationHomepage] = useLiveQuery<LocationHomepageType>(
    props.locationHomepage,
    locationHomepageQuery,
  )
  const [allLocations] = useLiveQuery<LocationPage[]>(
    props.allLocations,
    locationsQuery,
  )

  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )
  useEffect(() => {
    setGlobalSettings(data)
  }, [data, setGlobalSettings])

  return (
    <Layout seo={props.seo}>
      <LocationHomePage
        globalSettings={data}
        data={locationHomepage}
        allLocations={allLocations}
        atmLocations={props.atmLocations}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const globalSettings = await getGlobalSettings(client)
  const locationHomepage = await getLocationHomepage(client)
  const allLocations = await getAllLocations(client)
  const atmLocations = await getATMLocations(client)

  const seo = {
    title: locationHomepage?.metaTitle || 'Locations | CFCU',
    description: locationHomepage?.metaDescription || '',
    image: locationHomepage?.ogImage || '',
    keywords: locationHomepage?.keywords || '',
  }

  return {
    props: {
      globalSettings,
      locationHomepage,
      allLocations,
      params,
      draftMode,
      atmLocations,
      seo,
      token: draftMode ? readToken : '',
    },
    revalidate: 3600,
  }
}
