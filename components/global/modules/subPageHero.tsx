import { SubPageHeroType } from 'types/sanity'
import { clsx } from 'clsx'
import MediaComponent from 'components/global/ui/Media'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import SplitTextDynamic from 'components/interaction/splitTextDynamic'
import { useWindowSize } from '@/hooks/useWindowSize'
import { SubPageType } from '@/types/sanity'
import MediaPlayPauseButton from 'components/global/ui/MediaPlayPauseButton'

const SubPageHero = ({
  data,
  parent,
}: {
  data: SubPageHeroType
  parent?: SubPageType
}) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const { width } = useWindowSize()
  const [lineAmount, setLineAmount] = useState(0)

  useIsomorphicLayoutEffect(() => {
    if (!lineAmount) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(heroRef.current)
      const tl = gsap.timeline({ delay: lineAmount * 0.3 }).fromTo(
        q('.subItem'),
        { opacity: 0, y: width > 1024 ? 30 : 10 },
        {
          opacity: 1,
          y: 0,
          ease: 'power4.out',
          duration: 0.7,
          stagger: 0.2,
        },
        '<',
      )
    })
    if (data?.needsBackgroundMedia) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: backgroundRef.current,
            start: 'top-=16px top',
            end: `+=${backgroundRef.current.offsetHeight * 0.8}px`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(backgroundRef.current, { scale: 1.05 }, '<+=0')
    }
    return () => {
      ctx.revert()
    }
  }, [lineAmount])
  return (
    <section
      ref={heroRef}
      className={clsx(
        'h-[650px] relative overflow-hidden',

        data?.needsBackgroundMedia
          ? 'lg:min-h-[832px] lg:h-[80vh]'
          : 'lg:min-h-[650px] lg:h-[70vh]',
      )}
    >
      <div className={clsx('absolute h-full w-full bg-lavender')}>
        {data?.needsBackgroundMedia && (
          <div
            className={clsx(
              'px-[10px] py-[12px] bg-lavender h-full',
              'lg:p-[18px]',
            )}
          >
            <div
              ref={backgroundRef}
              className={clsx(
                'rounded-[10px] overflow-hidden relative h-full',
                'lg:rounded-[20px]',
              )}
            >
              {data?.needsGradient && (
                <div
                  className={clsx(
                    'heroGradient absolute inset-[0px] z-[2] rounded-[10px]',
                    'lg:rounded-[20px]',
                  )}
                />
              )}
              <MediaComponent
                media={data?.backgroundMedia}
                isPlaying={isPlaying}
                priority={true}
                isSubHero
              />
            </div>
          </div>
        )}
      </div>

      <div
        className={clsx(
          'flex relative z-[2] px-[24px] pt-[24px] flex-col h-full justify-between',
          'lg:px-[48px] lg:pt-[48px]',
        )}
      >
        <Link href={'/'} className={clsx('block w-fit focus:!shadow-none')}>
          <Image
            src={'/icons/LogoFull.png'}
            alt={'Community Financial Logo'}
            width={500}
            height={108}
            className={clsx('w-[212px]', 'lg:w-[244.71px]')}
          />
        </Link>

        <article
          className={clsx(
            'flex flex-col gap-y-[11px] pb-[24px] max-w-[841px]',
            'lg:gap-y-[19px] lg:pb-[71px]',
          )}
        >
          {parent?.slug?.current && (
            <Link
              href={'/' + parent?.slug?.current}
              className={clsx('block opacity-0 backButton group subItem')}
            >
              <button
                className={clsx(
                  'flex gap-x-[6px]  py-[8px] px-[16px] rounded-full items-center bg-[#2C0A3D] hover:!opacity-80 transition-opacity duration-200 text-left',
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
                <span className={clsx('font-codec-pro text-white')}>
                  {parent?.title}
                </span>
              </button>
            </Link>
          )}

          <h1
            className={clsx(
              'w-h1 text-white',
              'lg:page-title-desktop lg:!leading-[85px] unbalance',
            )}
          >
            <SplitTextDynamic
              value={data?.title}
              classNames={'line'}
              wrapperHeights={'85px'}
              duration={0.7}
              stagger={0.1}
              yPercent={40}
              delay={0.3}
              setLineAmount={(count) => setLineAmount(count)}
            />
          </h1>
          <div className={clsx('flex justify-between items-end gap-x-[16px]')}>
            <p
              className={clsx(
                'w-paragraph-m-desktop text-white subItem opacity-0',
                'lg:text-[26px] lg:leading-[33.8px]',
              )}
            >
              {data?.subtitle}
            </p>
            <MediaPlayPauseButton
              classNameMobile={clsx(
                'z-[10] !w-fit !h-fit',
                'lg:!right-[36px] lg:!bottom-[36px] lg:absolute',
              )}
              media={data?.backgroundMedia}
              isPlaying={isPlaying}
              onToggle={() => setIsPlaying((prev) => !prev)}
            />
          </div>
        </article>
      </div>
    </section>
  )
}

export default SubPageHero
