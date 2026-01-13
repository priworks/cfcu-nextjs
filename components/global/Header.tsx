import Image from 'next/image'
import { clsx } from 'clsx'
import Menu from './Menu'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { useScrollPastPoint } from 'hooks/useScrollPastPoint'
import { useWindowSize } from 'hooks/useWindowSize'
import { useRef } from 'react'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import FastExitButton from './modules/QuickExit'
import SiteAlert from './modules/siteAlert'
import GlobalSiteAlert from './modules/GlobalSiteAlert'
import globalAlert from '@/schemas/documents/modules/globalAlert'
import SanitizedEmbed from './modules/Embed'
import FormattedTextField from 'components/interaction/formattedTextField'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [closeInitiated, setCloseInitiated] = useState(false)
  const [menuButtonOpen, setMenuButtonOpen] = useState(false)
  const [alertHeightInternal, setAlertHeightInternal] = useState(0)
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [isMenuOpen])

  const alertIsOpen = useGlobalSettingsStore((state) => state.alertIsOpen)
  const alertHeight = useGlobalSettingsStore((state) => state.alertHeight)
  const globalAlertHeight = useGlobalSettingsStore(
    (state) => state.globalAlertHeight,
  )
  const globalAlertIsOpen = useGlobalSettingsStore(
    (state) => state.globalAlertIsOpen,
  )
  const globalSettings = useGlobalSettingsStore((state) => state.globalSettings)
  const isPastPoint = useScrollPastPoint(alertHeight)
  const { width } = useWindowSize()
  const headerRef = useRef<HTMLDivElement>(null)
  const [entryRun, setEntryRun] = useState(false)

  useIsomorphicLayoutEffect(() => {
    if (!globalSettings?.navigation?.headerBarLinks || !width || entryRun)
      return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'linear',
          duration: 0.2,
          delay: 0.1,
          onComplete: () => {
            setEntryRun(true)
          },
        },
      )
      return () => {
        ctx.revert()
      }
    })
  }, [globalSettings, width, entryRun])

  useEffect(() => {
    setAlertHeightInternal(alertHeight + globalAlertHeight)
  }, [alertHeight, globalAlertHeight])

  return (
    <>
      {globalSettings?.quickExit?.showFastExit && (
        <FastExitButton url={globalSettings?.quickExit?.exitUrl} />
      )}
      {globalSettings?.globalAlerts?.map((alert, index) => (
        <GlobalSiteAlert key={index} data={alert} />
      ))}
      {globalSettings?.globalEmbeds?.map((embed, index) => (
        <SanitizedEmbed key={index} embed={embed} isGlobal={true} />
      ))}
      <header
        ref={headerRef}
        style={
          alertIsOpen || globalAlertIsOpen
            ? {
                transform: `translateY(${alertHeightInternal + (width < 1024 ? 24 : 48)}px)`,
              }
            : {}
        }
        className={clsx(
          'fixed top-[00px] right-[24px] z-[13] transition-transform ease-in duration-300 translate-y-[24px] lg:translate-y-[48px] opacity-0',
          'lg:right-[48px] lg:top-[0] ',
          alertIsOpen && 'lg:top-[0px]  ease-in-out-cubic',
          (isMenuOpen || isPastPoint) &&
            '!translate-y-[24px] lg:!translate-y-[48px]',
        )}
      >
        <div
          className={clsx(
            'w-fit',
            'lg:flex lg:gap-x-[12px] lg:p-[8px] lg:bg-purple lg:rounded-full lg:top-[30px] lg:right-[48px] font-codec-bold  lg:border-[1px] lg:border-white/[0.08]',
          )}
        >
          <div>
            {globalSettings?.navigation?.headerBarLinks?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className={clsx(
                  'hidden px-[12px] py-[9.5px] text-white',
                  'lg:inline-block',
                  'lg:hover:opacity-60 transition-opacity duration-150',
                )}
              >
                <FormattedTextField text={link.title} />
              </a>
            ))}
          </div>
          <button
            disabled={closeInitiated}
            onClick={() => {
              if (!isMenuOpen) {
                setIsMenuOpen(true)
                setMenuButtonOpen(true)
              } else {
                setCloseInitiated(true)
                setMenuButtonOpen(false)
              }
            }}
            className={clsx(
              'w-[48px] h-[48px] flex items-center justify-center rounded-full overflow-hidden font-codec-bold transition-all duration-300 ease-linear group border-[1px] border-white/[0.08]',
              'lg:w-fit lg:flex lg:px-[14px] lg:h-[unset] gap-x-[9px] lg:py-[9.5px] lg:border-[0px]',
              menuButtonOpen
                ? 'bg-orange lg:bg-white lg:hover:bg-lightGrey lg:hover:text-black'
                : 'bg-orange lg:hover:bg-white',
            )}
          >
            <div className={clsx('hidden', 'lg:block h-[23px]')}>
              <span
                className={clsx(
                  'flex flex-col transition-all duration-300 ease-in-out-cubic text-lavender',
                  menuButtonOpen
                    ? 'translate-y-[-24px] group-hover:text-black'
                    : 'translate-y-[0px]',
                )}
              >
                <span
                  className={clsx(
                    menuButtonOpen ? 'opacity-0' : 'opacity-100',
                    'transition-opacity linear duration-200',
                  )}
                >
                  Menu
                </span>
                <span
                  className={clsx(
                    !menuButtonOpen ? 'opacity-0' : 'opacity-100',
                    'transition-opacity linear duration-200',
                  )}
                >
                  Close
                </span>
              </span>
            </div>
            <div
              className={clsx('w-[18px] flex flex-col gap-y-[5px] relative')}
            >
              <span
                className={clsx(
                  'w-full h-[1.5px] rounded-full bg-purple absolute transition-all duration-300 ease-in-out-cubic',
                  menuButtonOpen
                    ? 'rotate-45 translate-y-[0px]'
                    : 'rotate-0 translate-y-[5px]',
                )}
              ></span>
              <span
                className={clsx(
                  'w-full h-[1.5px] rounded-full bg-purple absolute transition-all duration-300 linear',
                  menuButtonOpen ? 'opacity-0' : 'opacity-100',
                )}
              ></span>
              <span
                className={clsx(
                  'w-full h-[1.5px] rounded-full bg-purple absolute transition-all duration-300 ease-in-out-cubic',
                  menuButtonOpen
                    ? '-rotate-45 translate-y-[0px]'
                    : 'rotate-0 translate-y-[-5px]',
                )}
              ></span>
            </div>
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <Menu
          key={'Menu'}
          menuOpen={isMenuOpen}
          setMenuOpen={setIsMenuOpen}
          closeInitiated={closeInitiated}
          setCloseInitiated={setCloseInitiated}
          setMenuButtonOpen={setMenuButtonOpen}
        />
      )}
    </>
  )
}

export default Header
