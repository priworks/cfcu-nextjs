import { readToken } from '@/lib/sanity.api'
import { getGlobalSettings, getClient, get404Page } from '@/lib/sanity.client'
import { fourOhFourQuery, globalSettingsQuery } from '@/lib/sanity.queries'
import { GetStaticProps } from 'next'
// import { draftMode } from 'next/headers'
import { QueryParams } from 'next-sanity'
import type { SharedPageProps } from '@/pages/_app'
import { useLiveQuery } from '@sanity/preview-kit'
import { Layout } from '@/components/layouts/Layout'
import { GlobalSettingsType, FourOhFour } from '@/types/sanity'
import FourOhFourPage from '@/components/pages/404Page'
import { useEffect } from 'react'
import { useGlobalSettingsStore } from '@/stores/globalSettingsStore'

interface PageProps extends SharedPageProps {
  params: QueryParams
  globalSettings: GlobalSettingsType
  fourOhFour: FourOhFour
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )
  const [data] = useLiveQuery<GlobalSettingsType>(
    props.globalSettings,
    globalSettingsQuery,
  )
  const [fourOhFour] = useLiveQuery<FourOhFour>(
    props.fourOhFour,
    fourOhFourQuery,
  )
  useEffect(() => {
    setGlobalSettings(data)
  }, [data, setGlobalSettings])
  return (
    <Layout>
      <FourOhFourPage data={props.fourOhFour} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const globalSettings = await getGlobalSettings(client)
  const fourOhFour = await get404Page(client)

  return {
    props: {
      fourOhFour,
      globalSettings,
      params,
      draftMode,
      token: draftMode ? readToken : '',
    },
    revalidate: 300,
  }
}
