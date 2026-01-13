import { clsx } from 'clsx'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import Link from 'next/link'
import { PostPageType } from '@/types/sanity'
import FormattedTextField from 'components/interaction/formattedTextField'

const PostCard = ({
  data,
  isBlogListing,
  className,
  fixSize,
}: {
  data: PostPageType
  isBlogListing?: boolean
  className?: string
  fixSize?: boolean
}) => {
  return (
    <Link
      href={`/${data.slug.current}`}
      className={clsx('block group h-fit', className)}
    >
      <article
        className={clsx(
          'h-fit',
          !isBlogListing ? 'min-w-[240px] max-w-[calc(33vw-26px)]' : 'w-full',
          'lg:max-w-[unset]',
        )}
      >
        <div
          className={clsx(
            'overflow-hidden w-full',
            fixSize && 'aspect-w-1 aspect-h-1',
          )}
        >
          <Image
            src={urlForImage(data?.thumbnailImage)
              .width(1000)
              .quality(100)
              .url()}
            alt={data?.thumbnailImage?.alt as string}
            width={1000}
            height={1000}
            onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            className={clsx(
              'object-cover w-full h-auto lg:group-hover:scale-[1.03] tranisiton-all duration-300 ease-in-out-cubic opacity-0',
              fixSize && '!h-full',
            )}
          />
        </div>
        <div className={clsx('flex flex-col mt-[13px]', 'lg:mt-[25px]')}>
          <h4
            className={clsx(
              'font-codec-news text-[14px] leading-[14px] tracking-[1.6px] uppercase text-black/75',
              'lg:subtitle-m',
            )}
          >
            <FormattedTextField text={data?.type} />
          </h4>
          <h5
            className={clsx(
              'font-codec-extra-bold text-[18px] leading-[23.4px] lg:text-[24px] lg:leading-[28px]  mt-[10px] text-lavender',
              'lg:w-h5-desktop lg:mt-[12px]',
              'lg:group-hover:opacity-80 transition-opacity duration-150',
            )}
          >
            <FormattedTextField text={data?.title} />
          </h5>
          <p
            className={clsx(
              'font-codec-news mt-[4px] max-w-[92%] w-full text-[14px] leading-[19.6px] text-black/75',

              'lg:w-paragraph-m-desktop',
            )}
          >
            <FormattedTextField text={data?.excerpt} />
          </p>
        </div>
      </article>
    </Link>
  )
}

export default PostCard
