import { CtaCardGridHomeType } from 'types/sanity'
import { clsx } from 'clsx'
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react'
import 'swiper/css'
import CardGridCard from '../ui/CardGridCard'
import PageLink from '../ui/PageLink'
import { useWindowSize } from 'hooks/useWindowSize'
import { useRef } from 'react'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { useInView } from 'react-intersection-observer'
import FormattedTextField from 'components/interaction/formattedTextField'

const CtaCardGridHome = ({ data }: { data: CtaCardGridHomeType }) => {
  const { width } = useWindowSize()
  const containerRef = useRef<HTMLDivElement>(null)

  const { ref, inView } = useInView({
    threshold: 0.6,
    triggerOnce: true,
  })
  useIsomorphicLayoutEffect(() => {
    if (!inView) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef.current)
      const tl = gsap
        .timeline()
        .fromTo(
          containerRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power4.inOut',
            duration: 0.9,
          },
        )
        .fromTo(
          q('.elementAnimation'),
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            ease: 'power4.out',
            duration: 0.5,
            stagger: 0.1,
          },
          '<+=0.7',
        )
    })
    return () => {
      ctx.revert()
    }
  }, [inView])

  return (
    <section
      ref={ref}
      className={clsx(
        'bg-white pt-[33px] pb-[98px]',
        'lg:pt-[64px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto lg:pb-[28px]',
      )}
    >
      <div className={clsx('px-[24px]', 'lg:px-[48px] xl:px-[0px]')}>
        <h2
          className={clsx(
            'text-[16px] leading-[16px] font-codec-news text-[#606060] tracking-[1.6px]',
            'lg:subtitle-l',
          )}
        >
          <FormattedTextField text={data?.subTitle} />
        </h2>
        <h3
          className={clsx(
            'title-m text-lavender mt-[17px]',
            'lg:title-m-desktop lg:max-w-[1216px]',
          )}
        >
          <FormattedTextField text={data?.title} />
        </h3>
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
      <div
        className={clsx(
          'lg:grid lg:grid-cols-4 lg:mt-[56px] lg:px-[48px] lg:gap-x-[24px]',
          'xl:px-[0px]',
        )}
      >
        {width >= 1024 && (
          <div className={clsx(' gap-x-[24px] col-span-3 grid grid-cols-3')}>
            {data?.cards.map((card, index) => (
              <CardGridCard data={card} key={index} />
            ))}
          </div>
        )}
        <article
          ref={containerRef}
          className={clsx(
            'bg-lavender mx-[24px] px-[38px] pt-[46px] pb-[48px] mt-[37px] ctaCardGridClip',
            'lg:mx-0 lg:mt-0 lg:w-full lg:pt-[42px] lg:h-[90%] ',
          )}
        >
          <h5
            className={clsx(
              'font-codec-news text-[16px] leading-[16px] tracking-[1.6px] text-white uppercase elementAnimation',
            )}
          >
            <FormattedTextField text={data?.linkListTitle} />
          </h5>
          <nav
            className={clsx(
              'flex flex-col gap-y-[12px] mt-[19px]',
              'lg:mt-[21px]',
            )}
          >
            {data?.linkList?.map((link, index) => (
              <PageLink
                key={index}
                data={link}
                className={clsx(
                  'font-codec-extra-bold text-[18px] leading-[27px]  text-white flex gap-x-[6px] items-center group elementAnimation',
                )}
              >
                <span>
                  <FormattedTextField text={link?.title} />
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={clsx(
                    'lg:group-hover:translate-x-[6px] transition-transform duration-200 ease-in-out-cubic',
                  )}
                >
                  <path
                    d="M13.8538 8.35378L9.35375 12.8538C9.25993 12.9476 9.13268 13.0003 9 13.0003C8.86732 13.0003 8.74007 12.9476 8.64625 12.8538C8.55243 12.76 8.49972 12.6327 8.49972 12.5C8.49972 12.3674 8.55243 12.2401 8.64625 12.1463L12.2931 8.50003H2.5C2.36739 8.50003 2.24021 8.44736 2.14645 8.35359C2.05268 8.25982 2 8.13264 2 8.00003C2 7.86743 2.05268 7.74025 2.14645 7.64648C2.24021 7.55271 2.36739 7.50003 2.5 7.50003H12.2931L8.64625 3.85378C8.55243 3.75996 8.49972 3.63272 8.49972 3.50003C8.49972 3.36735 8.55243 3.2401 8.64625 3.14628C8.74007 3.05246 8.86732 2.99976 9 2.99976C9.13268 2.99976 9.25993 3.05246 9.35375 3.14628L13.8538 7.64628C13.9002 7.69272 13.9371 7.74786 13.9623 7.80856C13.9874 7.86926 14.0004 7.93433 14.0004 8.00003C14.0004 8.06574 13.9874 8.13081 13.9623 8.1915C13.9371 8.2522 13.9002 8.30735 13.8538 8.35378Z"
                    fill="#F56600"
                  />
                </svg>
              </PageLink>
            ))}
          </nav>
        </article>
      </div>
    </section>
  )
}

export default CtaCardGridHome
