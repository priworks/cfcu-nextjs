import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { useRef, useState } from 'react'
import Link from 'next/link'
import Button from 'components/global/ui/Button'
import { clsx } from 'clsx'
import { ATMLocation, LocationPage } from 'types/sanity'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { formatPhoneNumber, getGoogleMapsLink } from '@/lib/utils'
import { PortableText } from '@portabletext/react'
import { WysiwygComopentsMin } from 'lib/portabletTextComponents'
import { externalOnClick } from 'utils'
import FormattedTextField from 'components/interaction/formattedTextField'

export default function LocationCard({
  data,
  setSelectedLocation,
  setSelectedMobilePopup,
}: {
  data: LocationPage
  setSelectedLocation: React.Dispatch<React.SetStateAction<LocationPage | null>>
  setSelectedATM: React.Dispatch<React.SetStateAction<ATMLocation | null>>
  setSelectedMobilePopup: React.Dispatch<
    React.SetStateAction<LocationPage | null>
  >
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power4.out' },
      )
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <article
      onClick={(e) => e.stopPropagation()}
      ref={cardRef}
      className={clsx(
        'bg-white p-[30px] relative mapCardShadow opacity-0 mx-w-[329px] w-[90%]',
        'lg:max-w-[428px] lg:w-[428px]',
      )}
    >
      <button
        onClick={() => {
          setSelectedLocation(null)
          setSelectedMobilePopup(null)
        }}
        className={clsx(
          'bg-orange w-[48px] h-[48px] rounded-full flex items-center justify-center absolute top-[-24px] right-[-24px]',
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
            d="M19.281 18.2194C19.3507 18.289 19.406 18.3718 19.4437 18.4628C19.4814 18.5539 19.5008 18.6514 19.5008 18.75C19.5008 18.8485 19.4814 18.9461 19.4437 19.0372C19.406 19.1282 19.3507 19.2109 19.281 19.2806C19.2114 19.3503 19.1286 19.4056 19.0376 19.4433C18.9465 19.481 18.849 19.5004 18.7504 19.5004C18.6519 19.5004 18.5543 19.481 18.4632 19.4433C18.3722 19.4056 18.2895 19.3503 18.2198 19.2806L12.0004 13.0603L5.78104 19.2806C5.64031 19.4213 5.44944 19.5004 5.25042 19.5004C5.05139 19.5004 4.86052 19.4213 4.71979 19.2806C4.57906 19.1399 4.5 18.949 4.5 18.75C4.5 18.551 4.57906 18.3601 4.71979 18.2194L10.9401 12L4.71979 5.78061C4.57906 5.63988 4.5 5.44901 4.5 5.24999C4.5 5.05097 4.57906 4.8601 4.71979 4.71936C4.86052 4.57863 5.05139 4.49957 5.25042 4.49957C5.44944 4.49957 5.64031 4.57863 5.78104 4.71936L12.0004 10.9397L18.2198 4.71936C18.3605 4.57863 18.5514 4.49957 18.7504 4.49957C18.9494 4.49957 19.1403 4.57863 19.281 4.71936C19.4218 4.8601 19.5008 5.05097 19.5008 5.24999C19.5008 5.44901 19.4218 5.63988 19.281 5.78061L13.0607 12L19.281 18.2194Z"
            fill="#3C1053"
          />
        </svg>
      </button>
      <Link href={`/${data?.slug.current}`}>
        <div className={clsx('aspect-w-16 aspect-h-9')}>
          <Image
            src={urlForImage(data?.thumbnailImage)
              .width(600)
              .quality(100)
              .url()}
            alt={data?.thumbnailImage?.alt as string}
            fill
            quality={100}
            onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            className={clsx(
              'object-cover w-full h-full opacity-0 transition-all duration-200 ease-linear',
            )}
          />
        </div>
      </Link>
      <Link href={`/${data?.slug.current}`}>
        <h4
          className={clsx(
            'w-h5',
            'mt-[25px] lg:text-[32px] font-codec-extra-bold text-lavender ',
          )}
        >
          <FormattedTextField text={data?.title} />
        </h4>
      </Link>
      <div
        className={clsx(
          'w-paragraph-s-desktop flex gap-x-[6px] items-start font-codec-news text-black/75 mt-[12px]',
          'lg:text-[18px] lg:leading-[27px]',
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
            d="M12 6C11.2583 6 10.5333 6.21993 9.91661 6.63199C9.29993 7.04404 8.81928 7.62971 8.53545 8.31494C8.25162 9.00016 8.17736 9.75416 8.32205 10.4816C8.46675 11.209 8.8239 11.8772 9.34835 12.4017C9.8728 12.9261 10.541 13.2833 11.2684 13.4279C11.9958 13.5726 12.7498 13.4984 13.4351 13.2145C14.1203 12.9307 14.706 12.4501 15.118 11.8334C15.5301 11.2167 15.75 10.4917 15.75 9.75C15.75 8.75544 15.3549 7.80161 14.6517 7.09835C13.9484 6.39509 12.9946 6 12 6ZM12 12C11.555 12 11.12 11.868 10.75 11.6208C10.38 11.3736 10.0916 11.0222 9.92127 10.611C9.75097 10.1999 9.70642 9.7475 9.79323 9.31105C9.88005 8.87459 10.0943 8.47368 10.409 8.15901C10.7237 7.84434 11.1246 7.63005 11.561 7.54323C11.9975 7.45642 12.4499 7.50097 12.861 7.67127C13.2722 7.84157 13.6236 8.12996 13.8708 8.49997C14.118 8.86998 14.25 9.30499 14.25 9.75C14.25 10.3467 14.0129 10.919 13.591 11.341C13.169 11.7629 12.5967 12 12 12ZM12 1.5C9.81273 1.50248 7.71575 2.37247 6.16911 3.91911C4.62247 5.46575 3.75248 7.56273 3.75 9.75C3.75 12.6937 5.11031 15.8138 7.6875 18.7734C8.84552 20.1108 10.1489 21.3151 11.5734 22.3641C11.6995 22.4524 11.8498 22.4998 12.0037 22.4998C12.1577 22.4998 12.308 22.4524 12.4341 22.3641C13.856 21.3147 15.1568 20.1104 16.3125 18.7734C18.8859 15.8138 20.25 12.6937 20.25 9.75C20.2475 7.56273 19.3775 5.46575 17.8309 3.91911C16.2843 2.37247 14.1873 1.50248 12 1.5ZM12 20.8125C10.4503 19.5938 5.25 15.1172 5.25 9.75C5.25 7.95979 5.96116 6.2429 7.22703 4.97703C8.4929 3.71116 10.2098 3 12 3C13.7902 3 15.5071 3.71116 16.773 4.97703C18.0388 6.2429 18.75 7.95979 18.75 9.75C18.75 15.1153 13.5497 19.5938 12 20.8125Z"
            fill="#F56600"
          />
        </svg>
        <a
          href={getGoogleMapsLink(data?.coordinates)}
          target={'_blank'}
          onClick={(e) =>
            externalOnClick(e, getGoogleMapsLink(data?.coordinates))
          }
        >
          <div>
            <PortableText
              value={data?.address}
              components={WysiwygComopentsMin as any}
            />
          </div>
        </a>
      </div>
      <div
        className={clsx(
          'w-paragraph-s-desktop flex gap-x-[6px] items-start font-codec-news text-black/75 mt-[12px]',
          'lg:text-[18px] lg:leading-[27px]',
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
            d="M20.8472 14.8557L16.4306 12.8766L16.4184 12.871C16.1892 12.7729 15.939 12.7336 15.6907 12.7565C15.4424 12.7794 15.2037 12.8639 14.9963 13.0022C14.9718 13.0184 14.9484 13.0359 14.9259 13.0547L12.6441 15.0001C11.1984 14.2979 9.70595 12.8166 9.00376 11.3897L10.9519 9.07318C10.9706 9.04974 10.9884 9.0263 11.0053 9.00099C11.1407 8.79409 11.2229 8.55692 11.2445 8.31059C11.2661 8.06427 11.2264 7.81642 11.1291 7.58912V7.57787L9.14438 3.1538C9.0157 2.85687 8.79444 2.60951 8.51362 2.44865C8.2328 2.2878 7.9075 2.22208 7.58626 2.2613C6.31592 2.42847 5.14986 3.05234 4.30588 4.01639C3.4619 4.98045 2.99771 6.21876 3.00001 7.50005C3.00001 14.9438 9.05626 21.0001 16.5 21.0001C17.7813 21.0024 19.0196 20.5382 19.9837 19.6942C20.9477 18.8502 21.5716 17.6841 21.7388 16.4138C21.7781 16.0927 21.7125 15.7674 21.5518 15.4866C21.3911 15.2058 21.144 14.9845 20.8472 14.8557ZM16.5 19.5001C13.3185 19.4966 10.2682 18.2312 8.01856 15.9815C5.76888 13.7318 4.50348 10.6816 4.50001 7.50005C4.49648 6.58458 4.82631 5.69911 5.42789 5.00903C6.02947 4.31895 6.86167 3.87143 7.76907 3.75005C7.7687 3.7538 7.7687 3.75756 7.76907 3.7613L9.73782 8.16755L7.80001 10.4869C7.78034 10.5096 7.76247 10.5337 7.74657 10.5591C7.60549 10.7756 7.52273 11.0249 7.5063 11.2827C7.48988 11.5406 7.54035 11.7984 7.65282 12.031C8.5022 13.7682 10.2525 15.5054 12.0084 16.3538C12.2428 16.4652 12.502 16.5139 12.7608 16.4952C13.0196 16.4765 13.2692 16.3909 13.485 16.2469C13.5091 16.2307 13.5322 16.2132 13.5544 16.1944L15.8334 14.2501L20.2397 16.2235C20.2397 16.2235 20.2472 16.2235 20.25 16.2235C20.1301 17.1322 19.6833 17.9661 18.9931 18.5691C18.3028 19.1722 17.4166 19.5031 16.5 19.5001Z"
            fill="#F56600"
          />
        </svg>

        <a href={formatPhoneNumber(data?.phoneNumber)}>{data?.phoneNumber}</a>
      </div>
      <Link
        href={`/${data?.slug.current}`}
        className={clsx('inline-block w-fit mt-[25px]')}
      >
        <Button
          label={'More Info'}
          className={clsx('!bg-lavender !text-white')}
        />
      </Link>
    </article>
  )
}
