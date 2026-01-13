import { RelatedStoriesType } from 'types/sanity'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import Button from '../ui/Button'
import PageLink from '../ui/PageLink'
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react'
import 'swiper/css'
import Link from 'next/link'
import Image from 'next/image'
import { PostPageType } from 'types/sanity'
import { urlForImage } from 'lib/sanity.image'
import { stegaClean } from '@sanity/client/stega'
import PostCard from '../ui/PostCard'
import FormattedTextField from 'components/interaction/formattedTextField'

const RelatedStories = ({ data }: { data: RelatedStoriesType }) => {
  const posts = data?.useTopic ? data?.topic?.relatedPosts : data?.posts
  return (
    <section
      style={{
        backgroundColor:
          stegaClean(data?.backgroundColor) === 'lightGrey'
            ? '#F0F0F0'
            : 'white',
      }}
    >
      <div
        className={clsx(
          'pt-[66px] pb-[136px]',
          'lg:pt-[130px] lg:pb-[105px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto',
        )}
      >
        <article
          className={clsx(
            'px-[24px] flex items-center flex-col',
            'lg:px-[48px] xl:px-[0px]',
          )}
        >
          {data?.subTitle && (
            <h2
              className={clsx(
                'subtitle-m text-black/75 mb-[17px]',
                'lg:subtitle-l lg:mb-[7px]',
              )}
            >
              <FormattedTextField text={data.subTitle} />
            </h2>
          )}
          <h3
            className={clsx(
              'title-xl text-lavender text-center',
              stegaClean(data?.headingVariant) === 'large'
                ? 'lg:title-xl-desktop'
                : 'lg:title-m-desktop lg:py-[20px]',
            )}
          >
            <FormattedTextField text={data?.title} />
          </h3>
          {data.description && (
            <p
              className={clsx(
                'text-[18px] leading-[25.2px] flex flex-col gap-y-[24px] text-center font-codec-news break-words mt-[13px] text-black/75',
                'lg:w-paragraph-l-desktop lg:mt-[0px] lg:max-w-[980px]',
              )}
            >
              <FormattedTextField text={data?.description} />
            </p>
          )}
          {data?.pageLink && (
            <PageLink data={data?.pageLink} className={clsx('mt-[16px] block')}>
              <Button
                label={data?.pageLink?.title}
                className={clsx(
                  stegaClean(data?.backgroundColor) === 'white'
                    ? ''
                    : '!bg-lightGrey',
                )}
              />
            </PageLink>
          )}
        </article>
        <div className={clsx('mt-[47px]', 'lg:hidden')}>
          <Swiper
            slidesOffsetAfter={24}
            slidesOffsetBefore={24}
            spaceBetween={13}
            slidesPerView={'auto'}
          >
            {posts?.map((post, index) => (
              <SwiperSlide key={index} className={clsx('!w-fit')}>
                {<PostCard data={post} key={index} fixSize={true} />}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          className={clsx(
            'hidden',
            'lg:grid lg:grid-cols-3 lg:gap-x-[24px] lg:px-[48px] lg:mt-[44px] xl:px-[0px]',
          )}
        >
          {posts?.map((post, index) => (
            <PostCard data={post} key={index} fixSize={true} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedStories
