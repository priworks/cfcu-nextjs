import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getClient, getGlobalSettings } from '@/lib/sanity.client'
import { useGlobalSettingsStore } from '@/stores/globalSettingsStore'
import { GlobalSettingsType } from '@/types/sanity'
import { Layout } from '@/components/layouts/Layout'
import { Search } from '@/components/search/Search'
import { GetStaticProps } from 'next'
import { QueryParams } from 'next-sanity'
import type { SharedPageProps } from '@/pages/_app'
import { readToken } from '@/lib/sanity.api'

interface PageProps extends SharedPageProps {
  params: QueryParams
  globalSettings: GlobalSettingsType
}
interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const globalSettings = await getGlobalSettings(client)
  return {
    props: {
      globalSettings,
      token: '',
      draftMode,
      params,
    },
  }
}
export default function Page(props: PageProps) {
  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )
  useEffect(() => {
    setGlobalSettings(props.globalSettings)
  }, [props.globalSettings, setGlobalSettings])

  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(props.params.q as string)

  const seo = {
    title: `Search Results for "${searchQuery}" | CFCU`,
    description: `r`,
    image: '',
    keywords: '',
  }

  useEffect(() => {
    setSearchQuery(router.query.q as string)
  }, [router.query])

  return (
    <Layout seo={seo}>
      <Search />
    </Layout>
  )
}
