import React from 'react'
import { CtaInContentType } from 'types/sanity'
import { clsx } from 'clsx'
import { getThemeClasses } from 'lib/themeConfig'
import MediaComponent from '../ui/Media'
import { PortableText } from '@portabletext/react'
import { WysiwygComopentsMin } from 'lib/portabletTextComponents'
import PageLink from '../ui/PageLink'
import Button from '../ui/Button'
import { stegaClean } from '@sanity/client/stega'
import { useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { useInView } from 'react-intersection-observer'
import { useWindowSize } from '@/hooks/useWindowSize'
import { urlForImage } from '@/lib/sanity.image'
import Image from 'next/image'
import MediaPlayPauseButton from 'components/global/ui/MediaPlayPauseButton'

const CtaInContent = ({ data }: { data: CtaInContentType }) => {
  const theme = getThemeClasses(data?.theme?.label)
  const innerContentRef = useRef(null)
  const articleRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  const { width } = useWindowSize()

  useIsomorphicLayoutEffect(() => {
    if (!inView) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(innerContentRef.current)

      if (width > 1024) {
        gsap
          .timeline()
          .fromTo(
            articleRef.current,
            {
              clipPath: 'inset(0% 0% 100% 0%)',
            },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'power4.inOut',
              duration: 0.7,
            },
          )
          .fromTo(
            q('.animateArticle'),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              ease: 'power4.out',
              stagger: 0.1,
            },
            '<+=0.5',
          )
      } else {
        gsap.timeline({}).fromTo(
          q('.animateArticle'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power4.out',
            stagger: 0.1,
          },
          '<+=0.5',
        )
      }
    })
    return () => {
      ctx.revert()
    }
  }, [inView, width])

  useIsomorphicLayoutEffect(() => {
    if (!inView || width < 1024) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: articleRef.current,
            start: 'top-=400px top',
            end: `+=${articleRef.current.offsetHeight * 0.8}px`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(articleRef.current, {
          yPercent: width > 1600 ? 30 : 0,
        })
    })
    return () => {
      ctx.revert()
    }
  }, [inView, width])

  //TODO check with expected mobile.
  return (
    <section
      ref={ref}
      className={clsx(
        'title-s pt-[51px]',
        'lg:!bg-white lg:pt-[178px] lg:relative lg:pb-[119px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto',
      )}
      style={{ backgroundColor: theme?.background, color: theme?.heading }}
    >
      <div ref={innerContentRef}>
        <div
          className={clsx(
            'pl-[24px]',
            stegaClean(data?.ctaCard?.contentPosition) === 'left'
              ? 'lg:pl-[164px] lg:pr-[48px]'
              : 'lg:pr-[164px] lg:pl-[48px]',
          )}
        >
          {data?.ctaCard.subtitle?.type === 'text' && width < 1024 && (
            <h2
              className={clsx(
                'w-[140px] text-[21px] tracking-[-0.16px] leading-[20.58px] font-codec-bold animateArticle opacity-0',
                'lg:hidden',
              )}
            >
              {data?.ctaCard?.subtitle?.text}
            </h2>
          )}
          {data?.ctaCard?.subtitle?.type === 'svg' && (
            <Image
              src={urlForImage(data?.ctaCard?.subtitle?.svg).url()}
              alt={data?.ctaCard?.subtitle?.svg?.alt as string}
              width={140}
              height={140}
              className={clsx('animateArticle !h-[81px] !w-auto', 'lg:hidden')}
            />
          )}
          <div
            className={clsx(
              'aspect-w-6 aspect-h-4 relative mt-[26px]',
              'lg:aspect-w-7 lg:mt-[0px]',
            )}
          >
            <MediaComponent
              media={data?.backgroundImage}
              isPlaying={isPlaying}
              isCtaContent
            />

            <MediaPlayPauseButton
              className={clsx(
                'absolute !right-[24px] !bottom-[24px] !top-[unset] !left-[unset] z-[2] !w-fit !h-fit lg:block hidden',
              )}
              classNameMobile={clsx(
                'absolute !right-[24px] !bottom-[24px] !top-[unset] !left-[unset] z-[2] !w-fit !h-fit lg:hidden',
              )}
              media={data?.backgroundImage}
              isPlaying={isPlaying}
              onToggle={() => setIsPlaying((prev) => !prev)}
            />
          </div>
        </div>
        <article
          ref={articleRef}
          className={clsx(
            'mt-[22px] px-[24px] pb-[59px]',
            'lg:px-[48px] lg:pt-[48px] lg:w-[585px] lg:h-[705px] lg:flex lg:flex-col lg:justify-between lg:pb-[54px] lg:absolute lg:top-[71px] lg:[clip-path:inset(0%_0%_100%_0%)]',
            stegaClean(data?.ctaCard?.contentPosition) === 'left'
              ? 'lg:left-[0px]'
              : 'lg:right-[0px]',
          )}
          style={{ backgroundColor: theme.background, color: theme.heading }}
        >
          <div className={clsx('hidden', 'lg:block')}>
            {data?.ctaCard?.subtitle?.type === 'text' && (
              <h2
                className={clsx(
                  'w-[185px] text-[28px] tracking-[-0.16px] leading-[27.44px] font-codec-bold animateArticle opacity-0',
                )}
              >
                {data?.ctaCard?.subtitle?.text}
              </h2>
            )}
            {data?.ctaCard?.subtitle?.type === 'svg' && (
              <Image
                src={urlForImage(data?.ctaCard?.subtitle?.svg).url()}
                alt={data?.ctaCard?.subtitle?.svg?.alt as string}
                width={185}
                height={185}
                className={clsx('animateArticle !h-[107px] !w-auto')}
              />
            )}
          </div>
          <div>
            <h3
              className={clsx(
                'text-extra-bold text-[32px] leading-[35.2px] animateArticle opacity-0',
                'lg:title-s-desktop',
              )}
            >
              {data?.ctaCard?.title}
            </h3>

            {data?.ctaCard?.description ? (
              <div
                style={{ color: theme?.heading }}
                className={clsx(
                  'font-codec-news text-[18px] leading-[27px] mt-[14px] animateArticle opacity-0 flex flex-col gap-y-[16px] descriptionContent',

                  'lg:text-[21px] lg:leading-[31.5px] lg:mt-[16px]',
                  stegaClean(data?.theme?.label) !== 'White' &&
                    'currentColorLinks',
                )}
              >
                <PortableText
                  value={data?.ctaCard?.description}
                  components={WysiwygComopentsMin as any}
                />
              </div>
            ) : (
              <div
                className={clsx('h-[48px]', 'lg:h-[64px] lg:mt-[16px]')}
              ></div>
            )}
            <PageLink
              data={data?.ctaCard?.cta}
              className={clsx(
                'mt-[21px] block',
                'lg:mt-[24px] animateArticle opacity-0',
              )}
            >
              <Button label={data?.ctaCard?.cta?.title} />
            </PageLink>
          </div>
        </article>
      </div>
    </section>
  )
}

export default CtaInContent
