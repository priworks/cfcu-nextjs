// pages/posts/[page].tsx

import { GetStaticProps, GetStaticPaths } from 'next'
import { readToken } from '@/lib/sanity.api'
import {
  getGlobalSettings,
  getClient,
  getAllPosts,
  getBlogHomepage,
  getAllTopics,
} from '@/lib/sanity.client'
import {
  allPostsQuery,
  globalSettingsQuery,
  blogHomepageQuery,
  allTopicsQuery,
} from '@/lib/sanity.queries'
import {
  GlobalSettingsType,
  BlogHomepageType,
  PostPageType,
  TopicWithRelatedPosts,
} from '@/types/sanity'
import { QueryParams } from 'next-sanity'
import type { SharedPageProps } from '@/pages/_app'
import { useLiveQuery } from '@sanity/preview-kit'
import { Layout } from '@/components/layouts/Layout'
import { useGlobalSettingsStore } from '@/stores/globalSettingsStore'
import { useEffect } from 'react'
import PostHomePage from '@/components/pages/PostHomePage'
import { Seo } from '@/pages/_app'

interface PageProps extends SharedPageProps {
  params: QueryParams
  globalSettings: GlobalSettingsType
  allPosts: PostPageType[]
  blogHomepage: BlogHomepageType
  allTopics?: TopicWithRelatedPosts[]
  seo: Seo
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
  }
}

export default function Page(props: PageProps) {
  const [data] = useLiveQuery<GlobalSettingsType>(
    props.globalSettings,
    globalSettingsQuery,
  )

  const start = 0
  const end = 10

  const [allPosts] = useLiveQuery<PostPageType[]>(
    props.allPosts,
    allPostsQuery,
    { start, end },
  )
  const [blogHomepage] = useLiveQuery<BlogHomepageType>(
    props.blogHomepage,
    blogHomepageQuery,
  )
  const [allTopics] = useLiveQuery<TopicWithRelatedPosts[]>(
    props.allTopics || [],
    allTopicsQuery,
  )

  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )
  useEffect(() => {
    setGlobalSettings(data)
  }, [data, setGlobalSettings])

  const prevUrl = `/posts/page/${Math.max(1, props.pagination.currentPage - 1)}`
  const nextUrl = `/posts/page/${Math.min(props.pagination.totalPages, props.pagination.currentPage + 1)}`

  const generateButtonUrl = (page: number) => {
    return `/posts/page/${page}`
  }

  const extendedPagination = {
    ...props.pagination,
    prevUrl,
    nextUrl,
    generateButtonUrl,
  }
  return (
    <Layout seo={props.seo} noIndex={props.pagination.currentPage > 1}>
      <PostHomePage
        allPosts={allPosts}
        data={blogHomepage}
        allTopics={allTopics}
        isBlogHome={true}
        pagination={extendedPagination}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const { draftMode = false, params = {} } = context
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const page = params.page ? Number(params.page as string) : 1
  const itemsPerPage = 12

  const globalSettings = await getGlobalSettings(client)
  const blogHomepage = await getBlogHomepage(client)
  const {
    posts: allPosts,
    totalCount,
    totalPages,
  } = await getAllPosts(client, page, itemsPerPage)
  const allTopics = await getAllTopics(client)

  const seo = {
    title:
      page === 1
        ? blogHomepage?.metaTitle || 'Get Inspired | CFCU'
        : `Posts - Page ${page} | CFCU`,
    description: blogHomepage?.metaDescription || '',
    image: blogHomepage?.ogImage || '',
    keywords: blogHomepage?.keywords || '',
  }

  return {
    props: {
      globalSettings,
      allPosts,
      params,
      allTopics,
      draftMode,
      blogHomepage,
      token: draftMode ? readToken : '',
      seo,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
      },
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient()
  const { totalPages } = await getAllPosts(client, 1, 10) // Use the same itemsPerPage as in getStaticProps

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: `${i + 1}` },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
