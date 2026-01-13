import { CtaTopicRowType } from 'types/sanity'
import { clsx } from 'clsx'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { getThemeClasses } from 'lib/themeConfig'
import { WysiwygComopentsMin } from 'lib/portabletTextComponents'
import { PortableText } from '@portabletext/react'
import PageLink from '../ui/PageLink'
import { stegaClean } from '@sanity/client/stega'
import { useInView } from 'react-intersection-observer'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useRef } from 'react'
import { gsap } from 'gsap'
import Button from '../ui/Button'
import FormattedTextField from '@/components/interaction/formattedTextField'

const CtaTopicRow = ({ data }: { data: CtaTopicRowType }) => {
  const theme = getThemeClasses(stegaClean(data?.theme?.label))

  const needsMonoTone =
    stegaClean(data?.theme?.label) === 'Green' ||
    stegaClean(data?.theme?.label) === 'Lavender'

  const containerRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.65,
    triggerOnce: true,
  })
  useIsomorphicLayoutEffect(() => {
    if (!inView) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef.current)
      const tl = gsap.timeline().fromTo(
        q('.elementAnimation'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: 'power4.out',
          duration: 0.5,
          stagger: 0.08,
        },
      )
    })
    return () => {
      ctx.revert()
    }
  }, [inView])
  return (
    <section
      ref={ref}
      style={{
        backgroundColor:
          stegaClean(data?.theme?.label) === 'White'
            ? '#fff'
            : theme?.background,
        color: theme?.heading,
      }}
    >
      <div
        ref={containerRef}
        className={clsx(
          'px-[24px] py-[26px] ',
          'lg:py-[96px] lg:flex lg:gap-x-[59px] lg:px-[0px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto lg:items-center',
          stegaClean(data?.imagePosition) === 'left'
            ? 'lg:flex-row'
            : 'lg:flex-row-reverse',
          'xl:pl-[0px]',
        )}
      >
        <div
          className={clsx(
            'relative w-full',
            'lg:flex-shrink-0 lg:w-[calc(50%-59px)]',
          )}
        >
          <div className={clsx('aspect-w-4 aspect-h-3 relative')}>
            <Image
              src={urlForImage(data?.image).width(1000).quality(90).url()}
              alt={data?.image.alt as string}
              width={1000}
              height={1000}
              onLoadingComplete={(image) => image.classList.remove('opacity-0')}
              className={clsx(
                'object-cover w-full h-full opacity-0 transition-all  duration-300 ease-in-out-cubic',
              )}
            />
          </div>
        </div>
        <div
          className={clsx(
            'flex flex-col gap-y-[16px] mt-[30px]',
            'lg:mt-[0px] lg:pt-[28px] lg:gap-y-[24px] lg:pb-[50px] ',
            stegaClean(data?.imagePosition) === 'left'
              ? 'lg:pr-[48px]'
              : 'lg:pl-[48px]',
            'xl:pr-[0px] xl:pl-[0px]',
          )}
        >
          {data?.subtitle && (
            <h2
              style={{
                color:
                  theme?.monotoneCopy == '#000'
                    ? '#000000BF'
                    : theme?.monotoneCopy,
              }}
              className={clsx(
                'subtitle-m  text-center ',
                'lg:subtitle-l lg:text-left',
              )}
            >
              <FormattedTextField text={data?.subtitle} />
            </h2>
          )}
          <h3
            className={clsx(
              'title-m font-codec-heavy text-center',
              'lg:text-left lg:title-m-desktop',
            )}
          >
            <FormattedTextField text={data?.title} />
          </h3>
          <div
            style={{
              color:
                theme?.monotoneCopy == '#000'
                  ? '#000000BF'
                  : theme?.monotoneCopy,
            }}
            className={clsx(
              'font-codec-regular w-paragraph-s-desktop text-center flex flex-col gap-y-[16px] topicRow',
              'lg:text-left lg:w-paragraph-l-desktop',
              stegaClean(data?.theme?.label) !== 'White' && 'currentColorLinks',
            )}
          >
            <style jsx>{`
              div :global(h1),
              div :global(h2),
              div :global(h3),
              div :global(h4),
              div :global(h5),
              div :global(h6) {
                color: ${theme?.heading};
              }
            `}</style>
            <PortableText
              value={data?.description}
              components={WysiwygComopentsMin as any}
            />
          </div>
          <nav
            style={{
              color: theme?.monotoneCopy,
            }}
            className={clsx(
              'flex flex-col gap-y-[12px]  items-center',
              'lg:items-start',
            )}
          >
            {data?.links?.length > 1 ? (
              data?.links?.map((link, index) => (
                <PageLink
                  key={index}
                  data={link}
                  className={clsx(
                    'font-codec-extra-bold text-[18px] leading-[27px]  text- flex gap-x-[6px] items-center elementAnimation group opacity-0',
                  )}
                >
                  <span
                    style={{
                      color: needsMonoTone
                        ? theme?.monotoneCopy
                        : theme?.heading,
                    }}
                  >
                    {link?.title}
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
                        stegaClean(data?.theme?.label) === 'Orange'
                          ? '#FFC600'
                          : stegaClean(data?.theme?.label) === 'Green'
                            ? '#FFC600'
                            : '#F56600'
                      }
                    />
                  </svg>
                </PageLink>
              ))
            ) : data?.links?.length === 1 ? (
              <PageLink data={data?.links?.[0]}>
                <Button
                  label={data?.links?.[0]?.title}
                  className={clsx(
                    stegaClean(data?.theme?.label) === 'White' &&
                      '!bg-lavender text-white',
                  )}
                />
              </PageLink>
            ) : null}
          </nav>
        </div>
      </div>
    </section>
  )
}

export default CtaTopicRow
