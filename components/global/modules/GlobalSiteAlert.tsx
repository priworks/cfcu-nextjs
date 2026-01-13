import { GlobalAlertType } from 'types/sanity'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import { WysiwygComopentsMin } from '@/lib/portabletTextComponents'
import { useState, useRef, useEffect, use } from 'react'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { useWindowSize } from '@/hooks/useWindowSize'
import FormattedTextField from 'components/interaction/formattedTextField'

const GlobalSiteAlert = ({ data }: { data: GlobalAlertType }) => {
  const [isClosed, setIsClosed] = useState(false)
  // const [alertHeight, setAlertHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const globalAlertHeight = useGlobalSettingsStore(
    (state) => state.globalAlertHeight,
  )
  const setGlobalAlertHeight = useGlobalSettingsStore(
    (state) => state.setGlobalAlertHeight,
  )
  const setGlobalAlertIsOpen = useGlobalSettingsStore(
    (state) => state.setGlobalAlertIsOpen,
  )
  const globalAlertIsOpen = useGlobalSettingsStore(
    (state) => state.globalAlertIsOpen,
  )

  const alertIsOpen = useGlobalSettingsStore((state) => state.alertIsOpen)
  const { width } = useWindowSize()

  useEffect(() => {
    if (contentRef.current) {
      setGlobalAlertHeight(contentRef.current.scrollHeight)
      setGlobalAlertIsOpen(true)
      window.scrollTo(0, 0)
    }
    return () => {
      setGlobalAlertIsOpen(false)
      setGlobalAlertHeight(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (globalAlertIsOpen) {
      setGlobalAlertHeight(contentRef.current.scrollHeight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, setGlobalAlertHeight, alertIsOpen])

  return (
    <section
      style={{ maxHeight: globalAlertHeight || 'unset' }}
      className={clsx(
        ' bg-[#B40303] px-[24px] w-full z-[10] flex  justify-between transition-all h-fit ease-in duration-300 overflow-hidden items-start',
        'lg:px-[48px]',
        isClosed && '!max-h-[0px] !bg-transparent',
      )}
    >
      <div
        ref={contentRef}
        className={clsx(
          'flex flex-col gap-[8px] py-[16px]',
          'lg:flex-row lg:items-start lg:gap-x-[40px]',
        )}
      >
        <h6
          className={clsx(
            'text-[14px] leading-[14px] p-[10px] text-[#606060] font-codec-news bg-white rounded-full w-fit h-fit whitespace-nowrap',
          )}
        >
          <FormattedTextField text={data?.tabName} />
        </h6>
        <div
          className={clsx(
            'w-paragraph-s-desktop text-white flex flex-col gap-y-[16px]',
            'lg:w-[90%] lg:mt-[4px]',
          )}
        >
          <PortableText
            value={data?.content}
            components={WysiwygComopentsMin as any}
          />
        </div>
      </div>
      <button
        onClick={() => {
          setIsClosed(true)
          setGlobalAlertIsOpen(false)
          setGlobalAlertHeight(0)
        }}
        className={clsx(
          'transition-opacity duration-150 py-[16px]',
          isClosed && 'opacity-0',
        )}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.281 18.2193C19.3507 18.289 19.406 18.3717 19.4437 18.4628C19.4814 18.5538 19.5008 18.6514 19.5008 18.7499C19.5008 18.8485 19.4814 18.9461 19.4437 19.0371C19.406 19.1281 19.3507 19.2109 19.281 19.2806C19.2114 19.3502 19.1286 19.4055 19.0376 19.4432C18.9465 19.4809 18.849 19.5003 18.7504 19.5003C18.6519 19.5003 18.5543 19.4809 18.4632 19.4432C18.3722 19.4055 18.2895 19.3502 18.2198 19.2806L12.0004 13.0602L5.78104 19.2806C5.64031 19.4213 5.44944 19.5003 5.25042 19.5003C5.05139 19.5003 4.86052 19.4213 4.71979 19.2806C4.57906 19.1398 4.5 18.949 4.5 18.7499C4.5 18.5509 4.57906 18.36 4.71979 18.2193L10.9401 11.9999L4.71979 5.78055C4.57906 5.63982 4.5 5.44895 4.5 5.24993C4.5 5.05091 4.57906 4.86003 4.71979 4.7193C4.86052 4.57857 5.05139 4.49951 5.25042 4.49951C5.44944 4.49951 5.64031 4.57857 5.78104 4.7193L12.0004 10.9396L18.2198 4.7193C18.3605 4.57857 18.5514 4.49951 18.7504 4.49951C18.9494 4.49951 19.1403 4.57857 19.281 4.7193C19.4218 4.86003 19.5008 5.05091 19.5008 5.24993C19.5008 5.44895 19.4218 5.63982 19.281 5.78055L13.0607 11.9999L19.281 18.2193Z"
            fill="white"
          />
        </svg>
      </button>
    </section>
  )
}

export default GlobalSiteAlert
