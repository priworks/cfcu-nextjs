import { HomepageType } from 'types/sanity'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { clsx } from 'clsx'
import * as Accordion from '@radix-ui/react-accordion'
import { getThemeClasses } from 'lib/themeConfig'
import Link from 'next/link'
import PageLink from 'components/global/ui/PageLink'
import { stegaClean } from '@sanity/client/stega'
import { motion, useTransform, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { useWindowSize } from 'hooks/useWindowSize'
import FormattedTextField from 'components/interaction/formattedTextField'

const EmotionalNavigation = ({
  data,
}: {
  data: HomepageType['emotionalNavigation']
}) => {
  const { width } = useWindowSize()
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (width < 1024) return
    const section = sectionRef.current
    const container = containerRef.current

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section)

      if (!section || !container) return

      // Calculate the width of the scrolling content
      const totalWidth = container.offsetWidth - window.innerWidth

      const contentTimeline = gsap
        .timeline({ paused: true })
        .to(q('.emotionalAnimateOut'), {
          opacity: 0,
          ease: 'linear',
          duration: 0.3,
          stagger: 0,
        })

      const tl = gsap.to(container, {
        xPercent: width > 1440 ? -80 : -90,
        ease: 'none',
        scrollTrigger: {
          onEnter: () => {
            if (width < 1024) return
            contentTimeline.play()
          },
          onLeaveBack: () => {
            if (width < 1024) return
            contentTimeline.reverse()
          },
          trigger: section,
          start: `top top+=${width > 1800 ? 48 : 0}px`,
          end: `+=${container.offsetWidth * 0.8}px`,
          scrub: true,
          invalidateOnRefresh: true,
          pin: true,
          pinSpacing: true,
        },
      })
    })

    return () => {
      // Cleanup
      ctx.revert()
    }
  }, [width])

  return (
    <section
      ref={sectionRef}
      className={clsx(
        'pt-[90px] pb-[10px]',
        'lg:clamp-pt-[149px] lg:flex lg:pb-[150px] lg:relative lg:overflow-x-hidden',
      )}
    >
      <div
        className={clsx(
          'px-[24px]',
          'lg:px-[48px] lg:pt-[36px] lg:shrink-0  lg:h-[620px]',
        )}
      >
        <Image
          src={urlForImage(data?.icon).url()}
          alt={data?.icon?.alt as string}
          width={122}
          height={92}
          className={clsx(
            'emotionalNavigationIcon emotionalAnimateOut w-[75px]',
            'lg:w-[122px]',
          )}
        />
        <h2
          className={clsx(
            'text-[14px] leading-[14px] tracking-[1.6px] font-codec-news uppercase text-orange mt-[19px] emotionalAnimateOut',
            'lg:subtitle-l lg:mt-[32px]',
          )}
        >
          <FormattedTextField text={data?.subtitle} />
        </h2>
        <h3
          className={clsx(
            'font-codec-bold text-white text-[26px] leading-[28.6px] mt-[10px] max-w-[451px] emotionalAnimateOut',
            'lg:mt-[16px] lg:w-h4-desktop ',
          )}
        >
          <FormattedTextField text={data?.title} />
        </h3>
      </div>
      <div className={clsx('px-[9px]', 'lg:hidden')}>
        <Accordion.Root
          type="single"
          collapsible
          className={clsx('w-full mt-[40px] flex flex-col gap-y-[16px]')}
        >
          {data?.navigationCards.map((card, index) => (
            <CardMobile data={card} key={index} />
          ))}
        </Accordion.Root>
      </div>
      <div className={clsx('lg:h-fit')}>
        <div
          ref={containerRef}
          className={clsx('hidden', 'lg:flex lg:gap-x-[24px] ')}
        >
          {data?.navigationCards?.map((card, index) => (
            <CardDesktop data={card} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmotionalNavigation

const CardMobile = ({
  data,
}: {
  data: HomepageType['emotionalNavigation']['navigationCards'][0]
}) => {
  const colors = getThemeClasses(data.theme.label)
  if (!colors) {
    return <div></div>
  }
  return (
    <Accordion.Item
      value={data?.title}
      style={{ backgroundColor: colors.background, color: colors.heading }}
      className={clsx('pt-[35px] pl-[26px] pr-[37px] group LMAO')}
    >
      <Accordion.Header className={clsx('pb-[35px]')}>
        <div>
          <h4
            className={clsx(
              'text-left text-[14px] leading-[14px] tracking-[1.6px] uppercase font-codec-news',
            )}
          >
            <FormattedTextField text={data?.subtitle} />
          </h4>
          <h3
            className={clsx(
              'font-codec-extra-bold text-[32px] leading-[33.28px] tracking-[-0.16px] text-left mt-[4px]',
            )}
          >
            <FormattedTextField text={data?.title} />
          </h3>
        </div>
        <Accordion.Trigger
          className={clsx(
            'w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center relative mt-[26px]',
          )}
        >
          <span
            className={clsx(
              'w-[14px] h-[4px] rotate-[90deg]  absolute bg-lavender block transition-transform duration-300 ease-in-out-cubic',
              'group-data-[state=open]:rotate-[0deg]',
            )}
          ></span>
          <span className={clsx('w-[14px] h-[4px] bg-lavender block')}></span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className={clsx('AccordionContent overflow-hidden')}>
        <p>
          <FormattedTextField text={data?.description} />
        </p>
        <nav className={clsx('flex flex-col gap-y-[12px] mt-[18px] pb-[41px]')}>
          {data?.links?.map((link, index) => (
            <PageLink
              data={link}
              key={index}
              className={clsx('flex flex-row gap-x-[6px] items-center')}
            >
              <span className={clsx('font-codec-extra-bold')}>
                <FormattedTextField text={link?.title} />
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8538 8.35378L9.35375 12.8538C9.25993 12.9476 9.13268 13.0003 9 13.0003C8.86732 13.0003 8.74007 12.9476 8.64625 12.8538C8.55243 12.76 8.49972 12.6327 8.49972 12.5C8.49972 12.3674 8.55243 12.2401 8.64625 12.1463L12.2931 8.50003H2.5C2.36739 8.50003 2.24021 8.44736 2.14645 8.35359C2.05268 8.25982 2 8.13264 2 8.00003C2 7.86743 2.05268 7.74025 2.14645 7.64648C2.24021 7.55271 2.36739 7.50003 2.5 7.50003H12.2931L8.64625 3.85378C8.55243 3.75996 8.49972 3.63272 8.49972 3.50003C8.49972 3.36735 8.55243 3.2401 8.64625 3.14628C8.74007 3.05246 8.86732 2.99976 9 2.99976C9.13268 2.99976 9.25993 3.05246 9.35375 3.14628L13.8538 7.64628C13.9002 7.69272 13.9371 7.74786 13.9623 7.80856C13.9874 7.86926 14.0004 7.93433 14.0004 8.00003C14.0004 8.06574 13.9874 8.13081 13.9623 8.1915C13.9371 8.2522 13.9002 8.30735 13.8538 8.35378Z"
                  fill={
                    stegaClean(data?.theme?.label) === 'Yellow'
                      ? '#3C1053'
                      : '#FFC600'
                  }
                />
              </svg>
            </PageLink>
          ))}
        </nav>
      </Accordion.Content>
    </Accordion.Item>
  )
}

const CardDesktop = ({
  data,
}: {
  data: HomepageType['emotionalNavigation']['navigationCards'][0]
}) => {
  const colors = getThemeClasses(stegaClean(data?.theme?.label))
  if (!colors) {
    return <div></div>
  }

  return (
    <article
      style={{ backgroundColor: colors?.background, color: colors?.heading }}
      className={clsx(
        'px-[53px] pt-[77px] ml:clamp-w-[547px]  ml:clamp-h-[620px] flex-shrink-0 h-[620px] w-[547px]',
      )}
    >
      <h4
        className={clsx(
          'text-left ml:clamp-text-[16px] ml:clamp-leading-[16px] ml:clamp-tracking-[1.6px] uppercase font-codec-news',
          'text-[16px] leading-[16px] tracking-[1.6px]',
        )}
      >
        <FormattedTextField text={data?.subtitle} />
      </h4>
      <h3
        className={clsx(
          'title-s-desktop ml:clamp-text-[50px] ml:clamp-leading-[50px] ml:clamp-tracking-[-0.32px] text-left ml:clamp-mt-[8px]',
          'mt-[8px]',
        )}
      >
        <FormattedTextField text={data?.title} />
      </h3>
      <p
        className={clsx(
          'w-paragraph-l-desktop mt-[17px] ml:clamp-text-[21px] ml:clamp-leading-[31.5px] ml:clamp-mt-[17px]',
        )}
      >
        <FormattedTextField text={data?.description} />
      </p>
      <nav
        className={clsx(
          'flex flex-col gap-y-[12px] mt-[20px] pb-[41px] ml:clamp-gap-y-[12px] ml:clamp-mt-[20px] ml:clamp-pb-[41px]',
        )}
      >
        {data?.links.map((link, index) => (
          <PageLink
            data={link}
            key={index}
            className={clsx(
              'flex flex-row gap-x-[6px] ml:clamp-gap-x-[6px] items-center group',
            )}
          >
            <span
              className={clsx(
                'font-codec-extra-bold ml:clamp-text-[18px] ml:clamp-leading-[27px]',
              )}
            >
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
                fill={
                  stegaClean(data?.theme?.label) === 'Yellow'
                    ? '#3C1053'
                    : '#FFC600'
                }
              />
            </svg>
          </PageLink>
        ))}
      </nav>
    </article>
  )
}
