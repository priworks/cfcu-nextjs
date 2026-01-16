import { GetStaticProps, GetStaticPaths } from 'next'
import { Layout } from '@/components/layouts/Layout'
import PostHomePage from '@/components/pages/PostHomePage'
import {
  getClient,
  getAllTopicSlugs,
  getTopicBySlug,
  getGlobalSettings,
  getBlogHomepage,
} from '@/lib/sanity.client'
import {
  TopicPageType,
  PostPageType,
  GlobalSettingsType,
  BlogHomepageType,
} from '@/types/sanity'
import { QueryParams } from 'next-sanity'
import { readToken } from '@/lib/sanity.api'
import { Seo, SharedPageProps } from '@/pages/_app'
import { useEffect } from 'react'
import { useGlobalSettingsStore } from '@/stores/globalSettingsStore'
import { useLiveQuery } from '@sanity/preview-kit'
import { topicBySlugQuery } from '@/lib/sanity.queries'
import blogHomePage from '@/schemas/singletons/blogHomePage'

interface PageProps extends SharedPageProps {
  topicData: TopicPageType
  relatedPosts: PostPageType[]
  globalSettings: GlobalSettingsType
  params: QueryParams
  blogHomepage: BlogHomepageType
  pagination: {
    currentPage: number
    totalPages: number
  }
  totalPosts?: number
  seo: Seo
}

const POSTS_PER_PAGE = 12

interface Query {
  [key: string]: string
}

export default function TopicSlugRoute({
  topicData,
  relatedPosts,
  globalSettings,
  pagination,
  seo,
  params,
  blogHomepage,
  totalPosts,
}: PageProps) {
  const prevUrl =
    pagination.currentPage - 1 == 1
      ? `/${topicData.slug.current}`
      : `/${topicData.slug.current}/${Math.max(1, pagination.currentPage - 1)}`
  const nextUrl = `/${topicData.slug.current}/${Math.min(pagination.totalPages, pagination.currentPage + 1)}`

  const generateButtonUrl = (page: number) => {
    return `/${topicData.slug.current}/${page}`
  }
  const [data] = useLiveQuery<TopicPageType>(
    topicData,
    topicBySlugQuery,
    params,
  )

  const extendedPagination = {
    ...pagination,
    prevUrl,
    nextUrl,
    generateButtonUrl,
  }
  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )
  useEffect(() => {
    setGlobalSettings(globalSettings)
  }, [globalSettings, setGlobalSettings])

  return (
    <Layout seo={seo} noIndex={pagination.currentPage > 1}>
      <PostHomePage
        key={data?.slug?.current}
        data={blogHomepage}
        allPosts={relatedPosts}
        topic={data}
        totalPosts={totalPosts}
        pagination={extendedPagination}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (
  context,
) => {
  const { params, draftMode = false } = context
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const slug = `posts/topic/${params?.slug}`
  const page = params?.page ? parseInt(params.page[0], 10) : 1

  const { topicData, relatedPosts, totalPosts } = await getTopicBySlug(
    client,
    slug,
    page,
    POSTS_PER_PAGE,
  )
  const blogHomepage = await getBlogHomepage(client)

  if (!topicData?.name) {
    return { notFound: true }
  }

  const globalSettings = await getGlobalSettings(client)

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  const seo = {
    title: `Get Inspired | CFCU`,
    description: topicData?.metaDescription || '',
    image: typeof topicData?.ogImage === 'string' ? topicData.ogImage : '',
    keywords: '',
  }

  return {
    props: {
      topicData,
      relatedPosts,
      globalSettings,
      blogHomepage,
      totalPosts,
      params: {
        ...params,
        slug,
      },
      token: draftMode ? readToken : '',
      draftMode,
      pagination: {
        currentPage: page,
        totalPages,
      },
      seo,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllTopicSlugs()

  const paths = slugs.flatMap(({ slug }) => [
    `/posts/topic/${removePostPrefix(slug)}`,
  ])

  return {
    paths,
    fallback: 'blocking',
  }
}

function removePostPrefix(slug: string) {
  return slug.startsWith('posts/topic/') ? slug.slice(12) : slug
}
