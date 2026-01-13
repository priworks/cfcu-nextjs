import { TextCardGridType } from 'types/sanity'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import PageLink from '../ui/PageLink'
import Button from '../ui/Button'
import { stegaClean } from '@sanity/client/stega'
import { useRef } from 'react'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { useInView } from 'react-intersection-observer'
import { useWindowSize } from '@/hooks/useWindowSize'
import FormattedTextField from 'components/interaction/formattedTextField'

const TextCardGrid = ({ data }: { data: TextCardGridType }) => {
  const leftGridItems = data?.cards?.filter((article, index) => index % 2 === 0)
  const rightGridItems = data?.cards?.filter(
    (article, index) => index % 2 === 1,
  )

  const gridRef = useRef<HTMLDivElement>(null)
  const leftGridItemsRef = useRef<HTMLDivElement>(null)
  const rightGridItemsRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()

  const { ref, inView } = useInView({
    threshold: 0.01,
    triggerOnce: true,
  })

  // useIsomorphicLayoutEffect(() => {
  //   if (
  //     !leftGridItemsRef.current ||
  //     !rightGridItemsRef.current ||
  //     !gridRef.current ||
  //     !inView ||
  //     width < 1024
  //   )
  //     return

  //   const ctx = gsap.context(() => {
  //     gsap.set(leftGridItemsRef.current, { yPercent: 5 })
  //     gsap.set(rightGridItemsRef.current, { yPercent: -4 })
  //     gsap
  //       .timeline({
  //         scrollTrigger: {
  //           trigger: gridRef.current,
  //           start: 'top-=400px top',
  //           end: `+=${gridRef.current.offsetHeight * 0.8}px`,
  //           scrub: true,
  //         },
  //       })
  //       .to(leftGridItemsRef.current, { yPercent: -10 })
  //       .to(rightGridItemsRef.current, { yPercent: 8 }, '<+=0')
  //   })
  //   return () => {
  //     ctx.revert()
  //   }
  // }, [inView, width])

  return (
    <section
      ref={ref}
      className={clsx(
        'px-[24px] py-[66px]',
        'lg:grid-cols-12 lg:grid lg:gap-x-[24px] lg:px-[48px] lg:pt-[95px] lg:pb-[187px] lg:relative lg:max-w-[1800px] xl:px-[0px] lg:mx-auto',
      )}
    >
      <article
        className={clsx('col-span-5', 'lg:sticky lg:top-[95px] lg:h-fit')}
      >
        {data?.subtitle && (
          <h2
            className={clsx(
              'subtitle-m text-black/75 mb-[9px]',
              'lg:mb-[11px] ml:subtitle-l',
            )}
          >
            <FormattedTextField text={stegaClean(data?.subtitle)} />
          </h2>
        )}
        <h3
          className={clsx(
            stegaClean(data?.titleSize) === 'large'
              ? 'title-l lg:title-l-desktop'
              : 'title-xl lg:title-l-desktop ml:title-xl-desktop',

            stegaClean(data?.titleColor) === 'orange'
              ? 'text-orange'
              : 'text-lavender',
          )}
        >
          <FormattedTextField text={stegaClean(data?.title)} />
        </h3>
        {data?.description && (
          <p
            className={clsx(
              'mt-[15px] text-black/75 w-paragraph-s-desktop',
              'lg:mt-[11px] ml:w-paragraph-l-desktop lg:max-w-[473px]',
            )}
          >
            <FormattedTextField text={data?.description} />
          </p>
        )}
      </article>
      <div
        ref={gridRef}
        className={clsx(
          'flex flex-col gap-y-[48px] mt-[32px]',
          'md:flex-row md:gap-x-[42px] md:grid md:grid-cols-2',
          'lg:col-start-7 lg:col-end-13 lg:grid lg:grid-cols-2 lg:gap-x-[42px]',
        )}
      >
        <div className={clsx('flex flex-col gap-y-[48px]', 'lg:gap-y-[54px]')}>
          {leftGridItems?.map((card, index) => (
            <CardGridItem card={card} key={index} />
          ))}
        </div>
        <div
          className={clsx(
            'flex flex-col gap-y-[48px]',
            'lg:gap-y-[54px] lg:mt-[54px]',
          )}
        >
          {rightGridItems?.map((card, index) => (
            <CardGridItem card={card} key={index} />
          ))}
        </div>
        {/* <div
          className={clsx('flex flex-col gap-y-[48px]', 'lg:gap-y-[81px]')}
          ref={leftGridItemsRef}
        >
          {leftGridItems?.map((card, index) => (
            <CardGridItem card={card} key={index} />
          ))}
        </div>
        <div
          ref={rightGridItemsRef}
          className={clsx('flex flex-col gap-y-[48px]', 'lg:gap-y-[81px]')}
        >
          {rightGridItems?.map((card, index) => (
            <CardGridItem card={card} key={index} />
          ))}
        </div> */}
      </div>
    </section>
  )
}

export default TextCardGrid

function CardGridItem({ card }: { card: TextCardGridType['cards'][0] }) {
  return (
    <article>
      <h4 className={clsx('w-h6 text-lavender mb-[4px]', 'lg:w-h6-desktop')}>
        <FormattedTextField text={stegaClean(card?.title)} />
      </h4>
      <p
        className={clsx(
          'w-paragraph-s text-black/75 ',
          'lg:w-paragraph-s-desktop lg:max-w-[320px]',

          card?.pageLink?.title && 'mb-[19px]',
        )}
      >
        <FormattedTextField text={card?.description} />
      </p>
      {card?.pageLink?.title && (
        <PageLink data={card?.pageLink}>
          <Button
            label={card?.pageLink?.title}
            className={clsx('!bg-lavender !text-white')}
          />
        </PageLink>
      )}
    </article>
  )
}
