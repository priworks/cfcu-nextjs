import { GlobalSettingsType } from 'types/sanity'
import { clsx } from 'clsx'
import Image from 'next/image'
import LogoFull from '/public/icons/LogoFull.png'
import { urlForImage } from 'lib/sanity.image'
import PageLink from './ui/PageLink'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { useClickToCopy } from 'hooks/useClickToCopy'
import { useRef } from 'react'
import Link from 'next/link'
import { externalOnClick } from 'utils'
import { PortableText } from '@portabletext/react'
import LowerFooterIcon from 'components/global/LowerFooterIcon'

const Footer = () => {
  const data = useGlobalSettingsStore((state) => state.globalSettings?.footer)
  const { isCopied, handleCopy } = useClickToCopy(
    data?.routingNumber || '',
    2000,
  )
  const copiedRef = useRef<HTMLParagraphElement>(null)

  return (
    <div
      className={clsx(
        'bg-lavender border-t-[1px] border-t-white/10',
        'lg:pt-[36px] lg:border-b-[0px]',
      )}
    >
      <footer
        className={clsx(
          'px-[24px] py-[66px]',
          'lg:px-[48px] lg:pt-[102px] lg:pb-[46px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto',
        )}
      >
        <div className={clsx('lg:grid lg:grid-cols-12 lg:gap-x-[24px]')}>
          <div className={clsx('lg:col-span-5')}>
            <Link href={'/'} className={clsx('block')}>
              <Image
                src={LogoFull}
                alt="Community Financial Logo"
                width={273}
                height={60}
                className={clsx('w-[208px]', 'lg:w-[273px]')}
              />
            </Link>
            <nav
              className={clsx(
                'mt-[33.17px] flex flex-row gap-x-[36px] items-center',
                'lg:mt-[46px] lg:gap-x-[17px]',
              )}
            >
              {data?.socials.map((social, index) => (
                <a
                  target="_blank"
                  key={index}
                  onClick={(e) => externalOnClick(e, social.url)}
                  href={social.url}
                  className={clsx(
                    'lg:hover:opacity-60 transition-opacity duration-150',
                  )}
                >
                  <Image
                    src={
                      social?.icon?.asset
                        ? urlForImage(social.icon).quality(100).url()
                        : ''
                    }
                    alt={social?.icon?.alt as string}
                    quality={100}
                    width={50}
                    height={50}
                    className={clsx('w-[25px] h-auto object-contain')}
                  />
                </a>
              ))}
            </nav>
          </div>
          <div
            className={clsx(
              'mt-[66px] flex flex-col gap-y-[25px]',
              'lg:col-span-3 lg:mt-[0px]',
            )}
          >
            <h5
              className={clsx(
                'font-codec-news text-white/70 text-[14px] leading-[14px] tracking-[1.6px] uppercase',
              )}
            >
              Company
            </h5>
            <div className={clsx('flex flex-col gap-y-[18px]')}>
              {data?.companyLinks.map((link, index) => (
                <PageLink
                  key={index}
                  data={link}
                  className={clsx(
                    'font-codec-bold text-[18px] leading-[16.2px] text-white',
                    'lg:hover:opacity-60 transition-opacity duration-150',
                  )}
                >
                  <span>{link.title}</span>
                </PageLink>
              ))}
            </div>
          </div>
          <div
            className={clsx(
              'mt-[48px] flex flex-col gap-y-[25px]',
              'lg:mt-[0px] lg:col-span-2',
            )}
          >
            <h5
              className={clsx(
                'font-codec-news text-white/70 text-[14px] leading-[14px] tracking-[1.6px] uppercase',
              )}
            >
              Resources
            </h5>
            <div className={clsx('flex flex-col gap-y-[18px]')}>
              {data?.resourceLinks.map((link, index) => (
                <PageLink
                  key={index}
                  data={link}
                  className={clsx(
                    'font-codec-bold text-[18px] leading-[16.2px] text-white',
                    'lg:hover:opacity-60 transition-opacity duration-150',
                  )}
                >
                  <span>{link.title}</span>
                </PageLink>
              ))}
            </div>
          </div>

          <div
            className={clsx(
              'mt-[48px] flex flex-col gap-y-[22px] relative h-fit',
              'lg:mt-[0px] lg:col-span-2',
            )}
          >
            <h5
              className={clsx(
                'font-codec-news text-white/70 text-[14px] leading-[14px] tracking-[1.6px] uppercase',
              )}
            >
              Routing Number
            </h5>
            <button
              onClick={handleCopy}
              className={clsx('flex flex-row gap-x-[6px] items-center group')}
            >
              <span
                className={clsx(
                  'font-codec-bold text-[18px] leading-[16.2px] text-white',
                )}
              >
                {data?.routingNumber}
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={clsx(
                  'lg:group-hover:translate-y-[0px] lg:group-hover:opacity-100 lg:opacity-0 group-hover:ease-in-cubic lg:translate-y-[6px] transition-all duration-200 ease-out-cubic',
                )}
              >
                <path
                  d="M20.25 3H8.25C8.05109 3 7.86032 3.07902 7.71967 3.21967C7.57902 3.36032 7.5 3.55109 7.5 3.75V7.5H3.75C3.55109 7.5 3.36032 7.57902 3.21967 7.71967C3.07902 7.86032 3 8.05109 3 8.25V20.25C3 20.4489 3.07902 20.6397 3.21967 20.7803C3.36032 20.921 3.55109 21 3.75 21H15.75C15.9489 21 16.1397 20.921 16.2803 20.7803C16.421 20.6397 16.5 20.4489 16.5 20.25V16.5H20.25C20.4489 16.5 20.6397 16.421 20.7803 16.2803C20.921 16.1397 21 15.9489 21 15.75V3.75C21 3.55109 20.921 3.36032 20.7803 3.21967C20.6397 3.07902 20.4489 3 20.25 3ZM15 19.5H4.5V9H15V19.5ZM19.5 15H16.5V8.25C16.5 8.05109 16.421 7.86032 16.2803 7.71967C16.1397 7.57902 15.9489 7.5 15.75 7.5H9V4.5H19.5V15Z"
                  fill="#F56600"
                />
              </svg>
            </button>
            <p
              ref={copiedRef}
              className={clsx(
                'absolute bottom-[-32px] text-white ',
                isCopied
                  ? 'opacity-100 translate-y-[0px] transition-all duration-200 ease-out-cubic'
                  : 'opacity-0 translate-y-[6px] transition-all duration-200 ease-in-cubic',
              )}
            >
              Copied!
            </p>
          </div>
        </div>
        <div
          className={clsx(
            'lg:border-t-[1px] lg:border-t-white/20 lg:flex  lg:flex-row lg:mt-[129px] lg:justify-start lg:pt-[33px] lg:items-center lg:gap-x-[32px]',
          )}
        >
          <div
            className={clsx(
              'flex gap-x-[24px] items-center mt-[50px] pt-[33px] border-t-[1px] border-t-white/20',
              'lg:border-t-[0px] lg:gap-x-[36px] lg:w-fit lg:pt-[0px] lg:mt-[0px]',
            )}
          >
            {data?.lowerFooterIcons.map((icon, index) => (
              <LowerFooterIcon key={index} value={icon} />
            ))}
          </div>
          <div
            className={clsx(
              'font-codec-regular text-[14px] leading-[18.2px] text-white mt-[56px] max-w-[570px]',
              'lg:mt-[0px]',
            )}
          >
            <PortableText value={data?.lowerFooterContent} />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
