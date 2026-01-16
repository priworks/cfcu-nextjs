import { GetStaticProps, GetStaticPaths } from 'next'
import { Layout } from '@/components/layouts/Layout'
import PostPage from '@/components/pages/PostPage'
import {
  getClient,
  getAllIndividualPostSlugs,
  getIndividualPostBySlug,
  getGlobalSettings,
} from '@/lib/sanity.client'
import { PostPageType, GlobalSettingsType } from '@/types/sanity'
import { readToken } from '@/lib/sanity.api'
import { useLiveQuery } from '@sanity/preview-kit'
import { postBySlugQuery } from '@/lib/sanity.queries'
import { QueryParams } from 'next-sanity'
import { useEffect } from 'react'
import { useGlobalSettingsStore } from '@/stores/globalSettingsStore'

interface PageProps {
  postData: PostPageType
  globalSettings: GlobalSettingsType
  seo: {
    title: string
    description: string
    image: string
    keywords: string
  }
  params: QueryParams
}

export default function PostSlugRoute({
  postData,
  globalSettings,
  seo,
  params,
}: PageProps) {
  const [data] = useLiveQuery<PostPageType>(postData, postBySlugQuery, params)

  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )
  useEffect(() => {
    setGlobalSettings(globalSettings)
  }, [globalSettings, setGlobalSettings])

  return (
    <Layout seo={seo}>
      <PostPage data={data} key={data?.slug?.current} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const { params, draftMode = false } = context
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const slug = `posts/${params?.slug}`
  const postData = await getIndividualPostBySlug(client, slug)

  if (!postData?.slug?.current) {
    return { notFound: true }
  }

  const globalSettings = await getGlobalSettings(client)

  const seo = {
    title: postData.metaTitle || `${postData.title} | CFCU`,
    description: postData.metaDescription || '',
    image: postData.ogImage || '',
    keywords: postData.keywords || '',
  }

  return {
    props: {
      postData,
      globalSettings,
      seo,
      params: {
        ...params,
        slug,
      },
      draftMode,
      token: draftMode ? readToken : '',
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllIndividualPostSlugs()

  return {
    paths: slugs.map(({ slug }) => `/posts/${removePostPrefix(slug)}`),
    fallback: 'blocking',
  }
}

function removePostPrefix(slug: string) {
  return slug.startsWith('posts/') ? slug.slice(6) : slug
}
