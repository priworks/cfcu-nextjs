import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import SearchBar from './SearchBar'
import { clsx } from 'clsx'
import * as Accordion from '@radix-ui/react-accordion'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import Link from 'next/link'
import MenuCTA from './ui/MenuCTA'
import { useWindowSize } from 'hooks/useWindowSize'
import PageLink from './ui/PageLink'
import { animate, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import FormattedTextField from 'components/interaction/formattedTextField'

const Menu = ({
  menuOpen,
  setMenuOpen,
  setCloseInitiated,
  closeInitiated,
  setMenuButtonOpen,
}: {
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCloseInitiated?: React.Dispatch<React.SetStateAction<boolean>>
  closeInitiated?: boolean
  setMenuButtonOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const globalSettings = useGlobalSettingsStore((state) => state.globalSettings)
  const topLevelNavigation = globalSettings?.navigation?.topLevelNavigation
  const bottomLevelNavigation =
    globalSettings?.navigation?.bottomLevelNavigation
  const { width } = useWindowSize()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useIsomorphicLayoutEffect(() => {
    if (!mounted) return
    const ctx = gsap.context(() => {
      if (menuOpen) {
        const tl = gsap
          .timeline()
          .fromTo(
            containerRef.current,
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
            '.linkColumn',
            { opacity: 0, y: width > 1024 ? 30 : 20 },
            {
              opacity: 1,
              y: 0,
              ease: 'power4.out',
              duration: 0.5,
              stagger: width > 1024 ? 0.1 : 0.05,
            },
            '<+=0.35',
          )
          .fromTo(
            '.secondaryAnimation',
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              ease: 'power4.out',
              duration: 0.5,
              stagger: 0.1,
            },
            width > 1024 ? '<+=0.1' : '<+=0.25',
          )
      }
    })
    return () => {
      ctx.revert()
    }
  }, [mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (!closeInitiated) return
    setMenuButtonOpen(false)
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          onComplete: () => {
            setMenuOpen(false)
            setCloseInitiated(false)
          },
        })
        .fromTo(
          containerRef.current,
          {
            clipPath: 'inset(0px 0px 0px 0px)',
          },
          {
            clipPath: 'inset(0px 0px 100% 0px)',
            ease: 'power4.inOut',
            duration: 0.7,
          },
        )
    })
    return () => {
      ctx.revert()
    }
  }, [closeInitiated])

  return (
    <div
      ref={containerRef}
      key={'Menu container'}
      className={clsx(
        'fixed top-0 left-0 w-full z-[12] bg-white h-screen min-h-[105lvh] [clip-path:inset(0%_0%_100%_0%)]',
      )}
    >
      <div
        className={clsx(
          'min-h-[105lvh]  pt-[28px] overflow-y-auto h-full pb-[120px] bg-white',
          'lg:pt-[48px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto lg:mb-[48px] lg:min-h-screen',
        )}
      >
        <div
          className={clsx(
            'text-[16px]  font-codec-bold gap-x-[24px] flex justify-start pl-[24px] mb-[32px] text-lavender mt-[7px]',
            'lg:hidden',
          )}
        >
          {globalSettings?.navigation?.headerBarLinks?.map((link, index) => (
            <a key={index} href={link.url}>
              <FormattedTextField text={link.title} />
            </a>
          ))}
        </div>
        <div className={clsx('px-[24px]', 'lg:px-[48px]')}>
          <SearchBar
            setMenuOpen={setMenuOpen}
            setCloseInitiated={setCloseInitiated}
            setMenuButtonOpen={setMenuButtonOpen}
          />

          {width > 1024 ? (
            <div className={clsx('grid grid-cols-12 gap-x-[24px] mt-[60px]')}>
              {topLevelNavigation?.map((item, index) => (
                <article key={index} className={clsx('col-span-3 linkColumn')}>
                  <div className={clsx('w-[35px]')}>
                    <Image
                      src={item?.icon ? urlForImage(item?.icon).url() : ' '}
                      alt={item?.titleLink?.title + ' icon'}
                      width={48}
                      height={48}
                      className={clsx('h-[26px] w-auto')}
                    />
                  </div>
                  <PageLink
                    onClick={() => setCloseInitiated(true)}
                    data={item.titleLink}
                    className={clsx(
                      'text-[28px] leading-[26.88px] font-codec-extra-bold text-lavender mt-[13.63px] block w-fit',
                      'lg:hover:opacity-60 transition-opacity duration-150',
                    )}
                  >
                    <FormattedTextField text={item.titleLink.title} />
                  </PageLink>
                  <nav
                    className={clsx(
                      'flex flex-col text-[18px] leading-[27px] gap-y-[12px] font-codec-news text-lavender mt-[16px]',
                    )}
                  >
                    {item.links?.map((link, index) => (
                      <PageLink
                        data={link}
                        key={index}
                        onClick={() => setCloseInitiated(true)}
                        className={clsx(
                          'lg:hover:opacity-60 transition-opacity duration-150',
                        )}
                      >
                        <FormattedTextField text={link.title} />
                      </PageLink>
                    ))}
                  </nav>
                </article>
              ))}
            </div>
          ) : (
            <Accordion.Root
              type="single"
              collapsible
              className={clsx('w-full mt-[18px]')}
            >
              {topLevelNavigation?.map((item, index) => (
                <Accordion.Item
                  value={item.titleLink.title}
                  key={index}
                  className="linkColumn"
                >
                  <Accordion.Header className={clsx('text-black')}>
                    <Accordion.Trigger
                      className={clsx(
                        'flex justify-between w-full items-center py-[24px] border-t-[1px] group border-divider data-[state=open]:!border-lavender transition-colors duration-200',
                      )}
                    >
                      <div
                        className={clsx('flex gap-x-[18.8px] items-center ')}
                      >
                        <div className={clsx('w-[35px]')}>
                          <Image
                            src={urlForImage(item?.icon).url()}
                            alt={item.titleLink.title + ' icon'}
                            width={48}
                            height={48}
                            className={clsx('h-[26px] w-auto')}
                          />
                        </div>
                        <PageLink
                          onClick={() => setCloseInitiated(true)}
                          data={item.titleLink}
                          className={clsx(
                            'text-[28px] leading-[26.88px] font-codec-extra-bold text-lavender w-fit',
                            'lg:hover:opacity-60 transition-opacity duration-150',
                          )}
                        >
                          <FormattedTextField text={item.titleLink.title} />
                        </PageLink>
                      </div>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={clsx(
                          'group-data-[state=open]:rotate-[45deg] transition-transform duration-300 ease-in-out-cubic',
                        )}
                      >
                        <path
                          d="M8.05273 12.9199H4.55273V8.16211H0V4.78516L4.55273 4.77148L4.53906 0H8.03906L8.05273 4.77148H12.6738V8.16211H8.05273V12.9199Z"
                          fill="#3C1053"
                          className={clsx(
                            'group-data-[state=open]:fill-orange transition-colors duration-300 ease-in-out-cubic',
                          )}
                        />
                      </svg>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content
                    className={clsx('AccordionContent overflow-hidden')}
                  >
                    <nav
                      className={clsx(
                        'pl-[53px] flex flex-col text-[16px] leading-[24px] gap-y-[12px] font-codec-news text-lavender mb-[27px]',
                      )}
                    >
                      {item.links?.map((link, index) => (
                        <PageLink
                          data={link}
                          key={index}
                          onClick={() => setCloseInitiated(true)}
                          className={clsx(
                            'lg:hover:opacity-60 transition-opacity duration-150',
                          )}
                        >
                          <FormattedTextField text={link.title} />
                        </PageLink>
                      ))}
                    </nav>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          )}
        </div>
        <div
          className={clsx(
            'lg:grid lg:grid-cols-2 lg:gap-x-[24px] lg:px-[48px] lg:mt-[68px]',
          )}
        >
          <div
            className={clsx(
              'grid grid-cols-2 gap-x-[24px] mx-[24px] pt-[18.5px] border-t-[1px] border-t-dividers',
              'lg:border-t-[0px] lg:mx-[0px] lg:pt-[0px]',
            )}
          >
            {bottomLevelNavigation?.map((nav, index) => (
              <nav
                key={index}
                className={clsx(
                  'lg:border-[1px] lg:border-dividers lg:p-[40px] secondaryAnimation',
                )}
              >
                <div
                  className={clsx(
                    'flex gap-x-[8px] items-center',
                    'lg:gap-x-[10px]',
                  )}
                >
                  <Image
                    width={24}
                    height={24}
                    src={urlForImage(nav.icon).url()}
                    alt={nav.icon.alt as string}
                    className={clsx(
                      'flex-shrink-0 w-[18px] h-[18px]',
                      'lg:h-[24px] lg:w-[24px]',
                    )}
                  />
                  <h4
                    className={clsx(
                      'uppercase text-[12px] tracking-[1.6px] font-codec-news text-black',
                      'lg:text-[16px] lg:leading-[16px]',
                    )}
                  >
                    <FormattedTextField text={nav.title} />
                  </h4>
                </div>
                <div
                  className={clsx(
                    'flex flex-col gap-y-[12px] mt-[16px] text-[14px] leading-[21px] font-codec-news text-lavender',
                    'lg:text-[16px] lg:leading-[24px]',
                  )}
                >
                  {nav.links?.map((link, index) => (
                    <PageLink
                      data={link}
                      key={index}
                      onClick={() => setCloseInitiated(true)}
                      className={clsx(
                        'lg:hover:opacity-60 transition-opacity duration-150',
                      )}
                    >
                      <FormattedTextField text={link.title} />
                    </PageLink>
                  ))}
                </div>
              </nav>
            ))}
          </div>
          {globalSettings?.navigation?.navigationCta && (
            <MenuCTA
              data={globalSettings?.navigation?.navigationCta}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              setCloseInitiated={setCloseInitiated}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Menu
