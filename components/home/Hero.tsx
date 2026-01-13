import { HomepageType } from 'types/sanity'
import { clsx } from 'clsx'
import MediaComponent from 'components/global/ui/Media'
import Button from 'components/global/ui/Button'
import PageLink from 'components/global/ui/PageLink'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import SplitTextDynamic from 'components/interaction/splitTextDynamic'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { useRef, useState } from 'react'
import Link from 'next/link'
import MediaPlayPauseButton from 'components/global/ui/MediaPlayPauseButton'

const Hero = ({ data }: { data: HomepageType['hero'] }) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [lineAmount, setLineAmount] = useState(0)

  useIsomorphicLayoutEffect(() => {
    if (!lineAmount) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(heroRef.current)
      const tl = gsap
        .timeline({ delay: lineAmount * 0.3 })
        .fromTo(
          q('.subItem'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power4.out',
            duration: 0.7,
            stagger: 0.1,
          },
          '<',
        )
        .to(q('.tertItem'), { opacity: 1, duration: 0.5 }, '<+=0.2')
    })
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
      .to(gradientRef.current, { scale: 1.05 })
      .to(backgroundRef.current, { scale: 1.05 }, '<+=0')

    return () => {
      ctx.revert()
    }
  }, [lineAmount])
  return (
    <section
      ref={heroRef}
      className={clsx(
        'min-h-[600px] h-[100svh] bg-lavender px-[10px] py-[12px] relative flex flex-col justify-end overflow-hidden',
        'lg:px-[18px] lg:py-[16px] lg:min-h-[800px]',
      )}
    >
      <Link href={'/'} className={clsx('block w-fit focus:!shadow-none')}>
        <Image
          src={'/icons/LogoFull.png'}
          alt={'Community Financial Logo'}
          width={500}
          height={108}
          className={clsx(
            'w-[212px] leading-[47px] absolute top-[24px] left-[25px] z-[8]',
            'lg:w-[244.71px] lg:leading-[54px] lg:left-[48px] lg:top-[48px]',
          )}
        />
      </Link>
      <div
        ref={gradientRef}
        className={clsx(
          'heroGradient absolute inset-x-[10px] inset-y-[12px] z-[2] rounded-[10px]',
          'lg:inset-x-[18px] lg:inset-y-[16px] lg:rounded-[20px]',
        )}
      />
      <div
        ref={backgroundRef}
        className={clsx(
          'absolute inset-x-[10px] inset-y-[12px] rounded-[10px] overflow-hidden',
          'lg:inset-x-[18px] lg:inset-y-[16px] lg:rounded-[20px]',
        )}
      >
        <MediaComponent
          media={data?.backgroundMedia}
          priority={true}
          isPlaying={isPlaying}
        />
      </div>
      <MediaPlayPauseButton
        media={data?.backgroundMedia}
        isPlaying={isPlaying}
        onToggle={() => setIsPlaying((prev) => !prev)}
      />
      <div
        className={clsx(
          'lg:px-[30px] lg:flex lg:justify-between lg:relative lg:z-[3] lg:items-end lg:pb-[46px]',
        )}
      >
        <article
          className={clsx(
            'pb-[58px] relative z-[3] max-w-[841px] px-[14px]',
            'lg:pl-[0px] lg:pb-[0px]',
          )}
        >
          <h1
            className={clsx(
              'text-white font-codec-heavy text-[56px] leading-[53.76px] pr-[14px] unbalance',
              'lg:page-title-desktop',
            )}
          >
            <SplitTextDynamic
              value={data?.title}
              classNames={'line'}
              wrapperHeights={'100px'}
              duration={0.7}
              stagger={0.1}
              yPercent={40}
              delay={0.3}
              setLineAmount={(count) => setLineAmount(count)}
            />
          </h1>
          <p
            className={clsx(
              'text-[18px] leading-[23.4px] font-codec-regular text-white mt-[11px] max-w-[590px] subItem opacity-0',
              'lg:font-codec-light lg:text-[26px] lg:leading-[33.8px] lg:mt-[19px]',
            )}
          >
            {data?.description}
          </p>
          <PageLink
            data={data?.cta}
            className={clsx(
              'mt-[16px] block',
              'lg:mt-[31px] w-fit subItem opacity-0',
            )}
          >
            <Button label={data?.cta?.title} />
          </PageLink>
        </article>
        <article
          className={clsx(
            'text-white font-codec-news hidden opacity-0 tertItem',
            'lg:flex lg:flex-col lg:gap-y-[12px] lg:pl-[16px] border-l-[1px] border-l-orange ',
          )}
        >
          <div className={clsx('max-w-[300px] text-[18px] leading-[26px] ')}>
            <PortableText value={data?.testimonial?.content} />
          </div>
          <h6 className={clsx('font-codec-heavy text-[16px] leading-[24px]')}>
            – {data?.testimonial?.author}, {data?.testimonial?.title}
          </h6>
        </article>
      </div>
    </section>
  )
}

export default Hero
