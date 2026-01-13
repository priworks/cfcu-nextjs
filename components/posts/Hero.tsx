import React, { useState } from 'react'
import { PostPageType } from 'types/sanity'
import Image from 'next/image'
import { clsx } from 'clsx'
import { urlForImage } from 'lib/sanity.image'
import Link from 'next/link'
import { formatDate } from 'utils'
import SplitTextDynamic from '../interaction/splitTextDynamic'
import { gsap } from 'gsap'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useRef } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'
import { externalOnClick } from 'utils'
import FormattedTextField from 'components/interaction/formattedTextField'

const Hero = ({ post }: { post: PostPageType }) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const [lineAmount, setLineAmount] = useState(0)
  useIsomorphicLayoutEffect(() => {
    if (!lineAmount) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(heroRef.current)
      gsap.fromTo(
        q('.backButton'),
        { opacity: 0, y: width > 1024 ? 30 : 10 },
        {
          opacity: 1,
          y: 0,
          ease: 'power4.out',
          duration: 0.7,
          delay: 0.15,
        },
      )
      const tl = gsap.timeline({ delay: lineAmount * 0.2 + 0.1 }).fromTo(
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
    return () => {
      ctx.revert()
    }
  }, [lineAmount])
  return (
    <section
      ref={heroRef}
      className={clsx(
        'px-[24px] pt-[24px] pb-[16px]',
        'lg:px-[48px] lg:pt-[48px] lg:pb-[0px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto',
      )}
    >
      <Link
        href={'/'}
        className={clsx(
          'block w-fit focus:!shadow-none',
          'lg:absolute lg:left-[48px]',
        )}
      >
        <Image
          src={'/icons/logoPurple.png'}
          alt={'Community Financial Logo'}
          width={500}
          height={108}
          className={clsx('w-[212px]', 'lg:w-[244.71px]')}
          priority
        />
      </Link>
      <div
        className={clsx(
          'mt-[47px] flex flex-col-reverse gap-y-[35px]',
          'lg:mt-[99px] lg:grid lg:grid-cols-2 lg:gap-x-[100px] items-center',
        )}
      >
        <article className={clsx('w-full')}>
          <Link
            href={'/posts/page/1'}
            className={clsx(
              'block group hover:opacity-80 transition-opacity duration-200',
            )}
          >
            <button
              className={clsx(
                'flex gap-x-[6px] py-[8px] px-[16px] rounded-full items-center bg-lightGrey backButton opacity-0',
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
              <span
                className={clsx(
                  'font-codec-pro text-lavender text-[12px] leading-[18px]',
                )}
              >
                News & Resources
              </span>
            </button>
          </Link>
          <h1
            className={clsx(
              'text-lavender title-m mt-[11px]',
              'lg:text-[80px] lg:leading-[75.2px] lg:tracking-[-0.32px] lg:font-codec-extra-bold lg:mt-[29px] unbalance',
            )}
          >
            <SplitTextDynamic
              value={post?.title}
              classNames={'line'}
              wrapperHeights={'75.2px'}
              duration={0.7}
              stagger={0.1}
              yPercent={40}
              delay={0.25}
              setLineAmount={(count) => setLineAmount(count)}
            />
          </h1>
          {post?.excerpt && (
            <p
              className={clsx(
                'font-codec-news text-black/75 mt-[8px] w-paragraph-m-desktop subItem opacity-0',
                '',
                'lg:text-[26px] lg:leading-[39px]  l:mt-[17px]',
              )}
            >
              <FormattedTextField text={post?.excerpt} />
            </p>
          )}
          <div
            className={clsx(
              'grid grid-cols-2 gap-x-[24px gap-y-[29px] mt-[22px] subItem opacity-0',
              'lg:mt-[36px] lg:w-[75%]',
            )}
          >
            {post?.author && (
              <div className={clsx('flex flex-col gap-y-[8px]')}>
                <h4
                  className={clsx(
                    'subtitle-s text-black/75 font-codec-news uppercase',
                    'lg:text-[14px] lg:leading-[14px] lg:tracking-[1.6px]',
                  )}
                >
                  Author
                </h4>
                <h5
                  className={clsx(
                    'font-codec-pro text-black text-[16px] leading-[20.8px]',
                  )}
                >
                  <FormattedTextField text={post?.author?.name} />
                </h5>
              </div>
            )}
            {post?.date && (
              <div className={clsx('flex flex-col gap-y-[8px] ')}>
                <h4
                  className={clsx(
                    'subtitle-s text-black/75 font-codec-news uppercase',
                    'lg:text-[14px] lg:leading-[14px] lg:tracking-[1.6px]',
                  )}
                >
                  Date
                </h4>
                <h5
                  className={clsx(
                    'font-codec-pro text-black text-[16px] leading-[20.8px]',
                  )}
                >
                  {formatDate(post?.date)}
                </h5>
              </div>
            )}
            {post?.topics?.length > 0 && (
              <div className={clsx('flex flex-col gap-y-[8px] ')}>
                <h4
                  className={clsx(
                    'subtitle-s text-black/75 font-codec-news uppercase',
                    'lg:text-[14px] lg:leading-[14px] lg:tracking-[1.6px]',
                  )}
                >
                  Topics
                </h4>
                <div
                  className={clsx(
                    'font-codec-pro text-lavender  text-[16px] leading-[20.8px] flex flex-col gap-y-[8px] ',
                  )}
                >
                  {post?.topics?.map((topic, index) => (
                    <Link
                      key={index}
                      href={'/' + topic?.slug?.current + '/1'}
                      className={clsx(
                        'underline hover:!no-underline w-fit block',
                      )}
                    >
                      <FormattedTextField text={topic?.name} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {post?.shareLinks?.length > 0 && (
              <div className={clsx('flex flex-col gap-y-[8px]')}>
                <h4
                  className={clsx(
                    'subtitle-s text-black/75 font-codec-news uppercase',
                    'lg:text-[14px] lg:leading-[14px] lg:tracking-[1.6px]',
                  )}
                >
                  Share
                </h4>
                <div
                  className={clsx(
                    'font-codec-pro text-lavender underline text-[16px] leading-[20.8px] flex gap-x-[14px] ',
                  )}
                >
                  {post?.shareLinks?.map((link, index) => (
                    <a
                      onClick={(e) => externalOnClick(e, link.link)}
                      key={index}
                      href={link.link}
                      target="_blank"
                      className={clsx(
                        'hover:opacity-80 transition-opacity duration-200',
                      )}
                    >
                      <Image
                        src={urlForImage(link.icon).url()}
                        alt={link.icon.alt as string}
                        width={26}
                        height={26}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
        <div className={clsx('aspect-w-8 aspect-h-7 w-full')}>
          <Image
            src={urlForImage(post?.thumbnailImage)
              .width(1000)
              .quality(100)
              .url()}
            alt=""
            fill
            onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            className={clsx(
              'object-cover w-full h-full opacity-0 transition-opacity duration-300 ease-linear',
            )}
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
