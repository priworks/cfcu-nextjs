import {
  BlogHomepageType,
  PostPageType,
  TopicPageType,
  TopicWithRelatedPosts,
} from 'types/sanity'
import Image from 'next/image'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import PostCard from '../global/ui/PostCard'
import Pagination from 'components/posts/paginationPosts'
import Link from 'next/link'
import FilterButton from '../global/ui/FilterButton'
import { useState, useRef } from 'react'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import SplitTextDynamic from '../interaction/splitTextDynamic'
import { useWindowSize } from '@/hooks/useWindowSize'
import FormattedTextField from 'components/interaction/formattedTextField'
type Props = {
  allPosts: PostPageType[]
  data: BlogHomepageType
  allTopics?: TopicWithRelatedPosts[]
  isBlogHome?: boolean
  topic?: TopicPageType
  totalPosts?: number
  pagination: {
    currentPage: number
    totalPages: number
    totalCount?: number
    prevUrl?: string
    nextUrl?: string
    generateButtonUrl?: (page: number) => string
  }
}

const PostHomePage = ({
  allPosts,
  data,
  allTopics,
  isBlogHome,
  pagination,
  topic,
  totalPosts,
}: Props) => {
  const [lineAmount, setLineAmount] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  useIsomorphicLayoutEffect(() => {
    if (!lineAmount) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(heroRef.current)
      if (!isBlogHome) {
        gsap.fromTo(
          q('.backButton'),
          { opacity: 0, y: width > 1024 ? 30 : 10 },
          {
            opacity: 1,
            y: 0,
            ease: 'power4.out',
            duration: 0.7,
            delay: 0.15,
          },
        )
      }

      const tl = gsap.timeline({ delay: lineAmount * 0.25 }).fromTo(
        q('.subItem'),
        { opacity: 0, y: width > 1024 ? 30 : 10 },
        {
          opacity: 1,
          y: 0,
          ease: 'power4.out',
          duration: 0.7,
          stagger: 0.1,
        },
        '<',
      )
    })
    return () => {
      ctx.revert()
    }
  }, [lineAmount])
  return (
    <main>
      <section
        ref={heroRef}
        className={clsx(
          'pt-[24px]',
          'lg:pt-[48px]',
          'px-[24px]',
          'lg:px-[48px]',
        )}
      >
        <Link href={'/'} className={clsx('absolute w-fit focus:!shadow-none')}>
          <Image
            src={'/icons/logoPurple.png'}
            alt={'Community Financial Logo'}
            width={500}
            height={108}
            priority
            className={clsx('w-[212px]', 'lg:w-[244.71px]')}
          />
        </Link>
        <div
          className={clsx(
            'mt-[185px] flex flex-col items-center',
            'lg:mt-[143px]',
          )}
        >
          {!isBlogHome && (
            <Link
              href={'/posts/page/1'}
              className={clsx(
                'inline-block cursor-pointer mb-[16px] group  backButton opacity-0',
              )}
            >
              <button
                className={clsx(
                  'flex gap-x-[6px] py-[8px] px-[16px] rounded-full items-center bg-lightGrey hover:opacity-80 transition-opacity duration-200',
                )}
              >
                <svg
                  width="5"
                  height="9"
                  viewBox="0 0 5 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={clsx(
                    'group-hover:translate-x-[-4px] transition-all duration-200 ease-in-out-cubic',
                  )}
                >
                  <path
                    d="M3.86046 8.51528L0.110455 4.76528C0.075589 4.73045 0.0479291 4.68909 0.0290578 4.64357C0.010186 4.59804 0.000473317 4.54925 0.000473319 4.49996C0.000473321 4.45068 0.010186 4.40189 0.0290578 4.35636C0.0479291 4.31084 0.075589 4.26948 0.110455 4.23465L3.86046 0.484652C3.93082 0.414287 4.02626 0.374756 4.12577 0.374756C4.22528 0.374756 4.32072 0.414287 4.39108 0.484652C4.46145 0.555017 4.50098 0.650453 4.50098 0.749964C4.50098 0.849476 4.46145 0.944912 4.39108 1.01528L0.905924 4.49996L4.39108 7.98465C4.42592 8.01949 4.45356 8.06086 4.47242 8.10638C4.49127 8.1519 4.50098 8.20069 4.50098 8.24996C4.50098 8.29924 4.49127 8.34803 4.47242 8.39355C4.45356 8.43907 4.42592 8.48044 4.39108 8.51528C4.35624 8.55012 4.31488 8.57776 4.26935 8.59661C4.22383 8.61547 4.17504 8.62517 4.12577 8.62517C4.07649 8.62517 4.0277 8.61547 3.98218 8.59661C3.93666 8.57776 3.8953 8.55012 3.86046 8.51528Z"
                    fill="#F56600"
                  />
                </svg>
                <span
                  className={clsx(
                    'font-codec-pro text-lavender text-[12px] leading-[18px]',
                  )}
                >
                  News & Resources
                </span>
              </button>
            </Link>
          )}
          <h1
            className={clsx(
              'text-center uppercase text-lavender  font-codec-fat text-[44px] leading-[39.6px] tracking-[-0.16px]',
              'lg:text-[172px] lg:leading-[154.8px] lg:tracking-[-0.16px] ',
            )}
          >
            <SplitTextDynamic
              value={data?.title}
              classNames={'line'}
              wrapperHeights={'154.8px'}
              duration={0.7}
              stagger={0.1}
              yPercent={10}
              delay={0.3}
              setLineAmount={(count) => setLineAmount(count)}
            />
          </h1>
          <p
            className={clsx(
              'text-black/75 text-center mt-[20px] w-paragraph-m-desktop subItem opacity-0',
              'lg:max-w-[922px] lg:mx-auto lg:font-codec-news lg:mt-[2px] lg:text-[24px] lg:leading-[36px]',
            )}
          >
            <FormattedTextField text={data?.description} />
          </p>
          {isBlogHome && (
            <FilterButton
              title="Filter by Topic"
              items={allTopics}
              className={clsx('mt-[29px]', 'lg:mt-[42px] subItem opacity-0')}
            />
          )}
        </div>
        {topic?.name && (
          <div
            className={clsx(
              'pt-[33px] text-center border-t-[1px] border-t-[#F0F0F0]  mt-[32px] w-paragraph-m-desktop subItem opacity-0',
              'lg:mt-[56px]',
            )}
          >
            Showing{' '}
            <span className={clsx('font-codec-heavy')}>{totalPosts}</span>{' '}
            results for{' '}
            <span className={clsx('font-codec-heavy')}>{topic?.name}</span>
          </div>
        )}
      </section>
      <section
        className={clsx(
          'grid grid-cols-2 gap-x-[24px] gap-y-[49px] mb-[95px] px-[24px]',
          'lg:grid lg:grid-cols-3 lg:gap-x-[32px] lg:gap-y-[96px] lg:mb-[96px] lg:px-[48px] lg:max-w-[1800px] lg:mx-auto',
          'xl:px-[0px]',
          topic?.name ? 'mt-[32px] lg:mt-[32px]' : 'mt-[49px] lg:mt-[111px]',
        )}
      >
        {allPosts.map((post, index) => (
          <PostCard data={post} key={index} isBlogListing fixSize={true} />
        ))}
      </section>
      <div className={clsx('px-[24px]', 'lg:px-[48px]')}>
        {pagination.totalPages > 1 && (
          <Pagination
            key={pagination.currentPage}
            totalPages={pagination.totalPages}
            currentPage={pagination.currentPage}
            prevUrl={pagination.prevUrl}
            nextUrl={pagination.nextUrl}
            generateButtonUrl={pagination.generateButtonUrl}
          />
        )}
      </div>
    </main>
  )
}

export default PostHomePage
