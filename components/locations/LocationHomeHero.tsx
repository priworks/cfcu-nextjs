import { clsx } from 'clsx'
import Image from 'next/image'
import MediaComponent from 'components/global/ui/Media'
import { LocationHomepageType } from 'types/sanity'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useRef, useState } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'
import SplitTextDynamic from 'components/interaction/splitTextDynamic'
import MediaPlayPauseButton from 'components/global/ui/MediaPlayPauseButton'

const LocationHomeHero = ({
  data,
}: {
  data: LocationHomepageType['pageHero']
}) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const [isPlaying, setIsPlaying] = useState(true)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(heroRef.current)
      gsap.timeline({ delay: 0.5 }).fromTo(
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
  }, [])

  return (
    <section
      ref={heroRef}
      className={clsx('relative', 'lg:min-h-[650px] lg:h-[70vh]')}
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

              <MediaComponent media={data?.backgroundMedia} />
            </div>
            <MediaPlayPauseButton
              media={data?.backgroundMedia}
              isPlaying={isPlaying}
              onToggle={() => setIsPlaying((prev) => !prev)}
            />
          </div>
        )}
      </div>
      <div
        className={clsx(
          'flex relative z-[2] px-[24px] pt-[24px] flex-col h-full justify-between gap-y-[111px]',
          'lg:px-[48px] lg:pt-[48px]',
        )}
      >
        <Link href={'/'} className={clsx('block w-fit focus:!shadow-none')}>
          <Image
            src={'/icons/LogoFull.png'}
            alt={'Community Financial Logo'}
            width={500}
            priority
            height={108}
            className={clsx('w-[212px]', 'lg:w-[244.71px]')}
          />
        </Link>
        <article
          className={clsx(
            'flex flex-col gap-y-[11px] pb-[24px] max-w-[841px]',
            'lg:gap-y-[19px] lg:pb-[62px]',
          )}
        >
          <h1 className={clsx('w-h1 text-white', 'lg:page-title-desktop')}>
            <SplitTextDynamic
              value={data?.title}
              classNames={'line'}
              wrapperHeights={'85px'}
              duration={0.7}
              stagger={0.1}
              yPercent={40}
              delay={0.3}
            />
          </h1>
          <p
            className={clsx(
              'w-paragraph-m-desktop text-white subItem opacity-0',
              'lg:text-[26px] lg:leading-[33.8px]',
            )}
          >
            {data?.subtitle}
          </p>
        </article>
      </div>
    </section>
  )
}

export default LocationHomeHero
