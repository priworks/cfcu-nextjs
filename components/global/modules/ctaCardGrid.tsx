import { CtaCardGridHomeType } from 'types/sanity'
import { clsx } from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import CardGridCard from '../ui/CardGridCard'
import { useWindowSize } from 'hooks/useWindowSize'
import { PortableText } from '@portabletext/react'
import FormattedTextField from 'components/interaction/formattedTextField'

const CtaCardGrid = ({ data }: { data: CtaCardGridHomeType }) => {
  const { width } = useWindowSize()
  return (
    <section
      className={clsx(
        'bg-white pt-[33px] pb-[98px]',
        'lg:pt-[64px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto lg:pb-[108px]',
      )}
    >
      <div className={clsx('px-[24px]', 'lg:px-[48px]', 'xl:px-[0px]')}>
        {data?.subTitle && (
          <h2
            className={clsx(
              'text-[16px] leading-[16px] font-codec-news text-[#606060] tracking-[1.6px]',
              'lg:subtitle-l',
            )}
          >
            <FormattedTextField text={data?.subTitle} />
          </h2>
        )}
        {data?.title && (
          <h3
            className={clsx(
              'title-m text-lavender mt-[17px]',
              'lg:title-m-desktop lg:max-w-[1216px]',
            )}
          >
            <FormattedTextField text={data?.title} />
          </h3>
        )}
        {data?.description && (
          <p
            className={clsx(
              'w-paragraph-s-desktop text-black/75 mt-[17px]',
              'lg:w-paragraph-l-desktop lg:max-w-[1216px]',
            )}
          >
            <FormattedTextField text={data?.description} />
          </p>
        )}
      </div>
      {width < 1024 && (
        <Swiper
          slidesOffsetAfter={24}
          slidesOffsetBefore={24}
          spaceBetween={24}
          slidesPerView={'auto'}
          className={clsx('mt-[39px]')}
        >
          {data?.cards?.map((card, index) => (
            <SwiperSlide key={index} className={clsx('!w-fit')}>
              <CardGridCard data={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className={clsx('lg:mt-[56px] lg:px-[48px]', 'xl:px-[0px]')}>
        {width >= 1024 && (
          <div
            className={clsx(
              'gap-x-[24px]  grid gap-y-[57px]',
              data?.cards?.length < 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-4',
            )}
          >
            {data?.cards?.map((card, index) => (
              <CardGridCard data={card} key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CtaCardGrid
