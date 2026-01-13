import { GetInspiredType } from 'types/sanity'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import { WysiwygComponentsWithoutPadding } from 'lib/portabletTextComponents'
import Button from '../ui/Button'
import { PostPageType } from 'types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import PageLink from '../ui/PageLink'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { useInView } from 'react-intersection-observer'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useWindowSize } from '@/hooks/useWindowSize'
import FormattedTextField from 'components/interaction/formattedTextField'

const GetInspired = ({ data }: { data: GetInspiredType }) => {
  const posts = data?.useTopic
    ? data?.topic?.relatedPosts.slice(1)
    : data?.articleGrid
  const featuredArticle = data?.useTopic
    ? data?.topic?.relatedPosts[0]
    : data?.featuredArticle

  const leftGridItems = posts?.filter((article, index) => index % 2 === 0)
  const rightGridItems = posts?.filter((article, index) => index % 2 === 1)

  const gridRef = useRef<HTMLDivElement>(null)
  const leftGridItemsRef = useRef<HTMLDivElement>(null)
  const rightGridItemsRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()

  const { ref, inView } = useInView({
    threshold: 0.01,
    triggerOnce: true,
  })

  useIsomorphicLayoutEffect(() => {
    if (
      !leftGridItemsRef.current ||
      !rightGridItemsRef.current ||
      !gridRef.current ||
      !inView ||
      width < 1024
    )
      return

    const ctx = gsap.context(() => {
      gsap.set(leftGridItemsRef.current, { yPercent: 5 })
      gsap.set(rightGridItemsRef.current, { yPercent: -4 })
      gsap
        .timeline({
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top-=400px top',
            end: `+=${gridRef.current.offsetHeight * 0.8}px`,
            scrub: true,
          },
        })
        .to(leftGridItemsRef.current, { yPercent: -10 })
        .to(rightGridItemsRef.current, { yPercent: 6 }, '<+=0')
    })
    return () => {
      ctx.revert()
    }
  }, [inView, width])

  return (
    <section
      ref={ref}
      className={clsx(
        'pt-[112px] px-[24px] pb-[86px]',
        'lg:pt-[95px] lg:px-[48px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto lg:pb-[69px]',
      )}
    >
      <div className={clsx('flex flex-col items-center')}>
        <h2
          className={clsx(
            'font-codec-fat text-lavender text-[46px] leading-[41.4px] text-center',
            'lg:title-xl-desktop',
          )}
        >
          <FormattedTextField text={data?.title} />
        </h2>
        <p
          className={clsx(
            'mt-[12px] font-codec-pro text-black/75 text-center text-[18px] leading-[25.2px] max-w-[961px]',
            'lg:w-paragraph-xl-desktop lg:mt-[17px]',
          )}
        >
          <FormattedTextField text={data?.description} />
        </p>
        <PageLink
          data={data?.cta}
          className={clsx('mt-[10.5px] block', 'lg:mt-[7.5px]')}
        >
          <Button label={data?.cta?.title} />
        </PageLink>
      </div>
      <div
        className={clsx(
          'mt-[28.5px]',
          'lg:grid-cols-2 lg:grid lg:gap-x-[24px] lg:mt-[78px] lg:relative lg:pb-[32px]',
        )}
      >
        <PostCard data={featuredArticle} isFeatured={true} />
        <div
          ref={gridRef}
          className={clsx(
            'grid grid-cols-2 gap-x-[25px] gap-y-[30px]  relative mt-[50px]',
          )}
        >
          <div
            className={clsx('flex flex-col gap-y-[54px]')}
            ref={leftGridItemsRef}
          >
            {leftGridItems?.map((article, index) => (
              <PostCard data={article} key={index} isFeatured={false} />
            ))}
          </div>
          <div
            className={clsx('flex flex-col gap-y-[54px]')}
            ref={rightGridItemsRef}
          >
            {rightGridItems?.map((article, index) => (
              <PostCard data={article} key={index} isFeatured={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default GetInspired

const PostCard = ({
  data,
  isFeatured,
}: {
  data: PostPageType
  isFeatured: boolean
}) => {
  return (
    <Link href={`/${data?.slug?.current}`} className={clsx('block group')}>
      <article
        className={clsx('h-fit', isFeatured && 'lg:sticky lg:top-[48px]')}
      >
        <div className={clsx('overflow-hidden w-full ')}>
          <Image
            src={urlForImage(data?.thumbnailImage).url()}
            alt={data?.thumbnailImage?.alt as string}
            width={888}
            height={888}
            onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            className={clsx(
              'object-cover w-full h-auto lg:group-hover:scale-[1.03]  tranisiton-all duration-300 ease-in-out-cubic opacity-0',
            )}
          />
        </div>
        <div
          className={clsx(
            'flex flex-col',
            isFeatured
              ? 'gap-y-[8px] mt-[24px] lg:max-w-[582px]  lg:gap-y-[13px] lg:mt-[31px]'
              : 'mt-[16px] max-w-[92%] gap-y-[10px]  lg:gap-y-[0px] lg:mt-[25px]',
          )}
        >
          <h4
            className={clsx(
              'font-codec-news text-[14px] leading-[14px] tracking-[1.6px] uppercase text-black/75',
              'lg:text-[16px] lg:leading-[16px]',
            )}
          >
            <FormattedTextField text={data?.type} />
          </h4>
          <h5
            className={clsx(
              isFeatured
                ? 'font-codec-ultra text-[36px] leading-[36px] lg:text-[62px] lg:leading-[58px]'
                : 'font-codec-extra-bold text-[18px] leading-[23.4px] lg:text-[24px] lg:leading-[28px] lg:mt-[12px]',
              'text-lavender',
            )}
          >
            <FormattedTextField text={data?.title} />
          </h5>
          <p
            className={clsx(
              'font-codec-news text-black/75',
              isFeatured
                ? 'text-[16px] leading-[24px] lg:text-[24px] lg:leading-[36px] '
                : 'text-[14px] leading-[19.6px] lg:text-[18px] lg:leading-[26px] lg:mt-[8px]',
            )}
          >
            <FormattedTextField text={data?.excerpt} />
          </p>
        </div>
      </article>
    </Link>
  )
}
