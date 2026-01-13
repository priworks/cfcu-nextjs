import { clsx } from 'clsx'
import { getThemeClasses, Theme } from 'lib/themeConfig'
import { GlobalSettingsType } from 'types/sanity'
import PageLink from './PageLink'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { useEffect, useState } from 'react'

import { useRef } from 'react'
import Button from './Button'
import FormattedTextField from 'components/interaction/formattedTextField'
const MenuCTA = ({
  data,
  menuOpen,
  setMenuOpen,
  setCloseInitiated,
}: {
  data: GlobalSettingsType['navigation']['navigationCta']
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCloseInitiated?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [mounted, setMounted] = useState(false)
  const theme = getThemeClasses(data.theme.label) as any
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!menuOpen) return
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ delay: 0.2 })
        .fromTo(
          containerRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power4.inOut',
            duration: 0.8,
          },
        )
        .fromTo(
          '.elementAnimation',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power4.out',
            duration: 0.5,
            stagger: 0.1,
          },
          '<+=0.6',
        )
    })
    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <article
      ref={containerRef}
      style={{
        backgroundColor: theme?.background,
      }}
      className={clsx(
        `mt-[75px] pt-[42px] pb-[58px] px-[21px] font-codec-pro mx-[26px] flex flex-col items-center `,
        'lg:mt-[0px] lg:mx-[0px] lg:px-[51px] lg:py-[74px]',
      )}
    >
      <h3
        ref={titleRef}
        style={{
          color: theme?.heading,
        }}
        className={clsx(
          'font-codec-fat text-[34px] leading-[32.64px] text-center uppercase elementAnimation',
          'lg:text-[54px] lg:leading-[51.84px]',
        )}
      >
        <FormattedTextField text={data?.title} />
      </h3>
      <div className={clsx('opacity-75')}>
        <p
          ref={descriptionRef}
          style={{
            color: theme?.copy,
          }}
          className={clsx(
            'text-[16px] leading-[24px] text-center font-codec-news mt-[13px] elementAnimation',
            'lg:text-[24px] lg:leading-[36px] lg:max-w-[580px]',
          )}
        >
          <FormattedTextField text={data?.description} />
        </p>
      </div>
      <PageLink
        data={data?.cta}
        className={clsx('overflow-hidden md:overflow-visible')}
      >
        <Button
          cb={() => setCloseInitiated(true)}
          label={data?.cta?.title}
          className={clsx('elementAnimation mt-[21px] overflow-hidden')}
        />
      </PageLink>
    </article>
  )
}

export default MenuCTA
