import Image from 'next/image'
import { urlForImage } from '../lib/sanity.image'
import clsx from 'clsx'
import WTable from '@/components/global/ui/wTable'
import { getImageDimensions } from '@sanity/asset-utils'
import WysiwygButtonGroup from '@/components/global/modules/WysiwygButtonGroup'
import WysiwygPageLink from '@/components/global/modules/WysiwygPageLink'
import SanitizedEmbed from '@/components/global/modules/Embed'
import { Eyebrow } from '@/components/global/ui/TextDecorators'

export const WysiwygComponentsWithoutPadding = {
  types: {
    buttonLinkGroup: (props: any) => {
      return <WysiwygButtonGroup value={props.value} isWithoutPadding />
    },
    image: ({ value }: { value: any }) => (
      <figure
        className={clsx(
          'flex flex-col gap-y-[17px]  w-full re',
          'lg:items-end lg:gap-y-[9px] lg:px-0',
        )}
      >
        {value.asset && (
          <Image
            src={urlForImage(value).width(1200).quality(100).url()}
            alt={String(value.alt)}
            quality={100}
            width={getImageDimensions(value).width}
            height={getImageDimensions(value).height}
            onLoad={(event) =>
              (event.target as HTMLImageElement).classList.remove('opacity-0')
            }
            className={clsx(
              'w-full object-contain opacity-0 transition-all duration-300 ease-in-out-cubic',
            )}
          />
        )}
        <figcaption className={clsx('w-paragraph-s-desktop text-black/75')}>
          {value.caption}
        </figcaption>
      </figure>
    ),
    containedSmall: ({ value }: { value: any }) => {
      return (
        <figure
          className={clsx(
            'flex flex-col gap-y-[17px] px-[24px] w-full',
            'lg:gap-y-[9px] lg:px-0',
          )}
        >
          {value.asset && (
            <Image
              src={urlForImage(value).width(2440).quality(100).url()}
              alt={String(value.alt)}
              width={getImageDimensions(value).width}
              height={getImageDimensions(value).height}
              quality={100}
              onLoad={(event) =>
                (event.target as HTMLImageElement).classList.remove('opacity-0')
              }
              className={clsx(
                'w-full object-cover opacity-0 transition-all duration-300 ease-in-out-cubic max-w-[340px]',
              )}
            />
          )}
          <figcaption className={clsx('w-paragraph-s-desktop text-black/75')}>
            {value.caption}
          </figcaption>
        </figure>
      )
    },
    containedMedium: ({ value }: { value: any }) => {
      return (
        <figure
          className={clsx(
            'flex flex-col gap-y-[17px] px-[24px] w-full',
            'lg:gap-y-[9px] lg:px-0',
          )}
        >
          {value.asset && (
            <Image
              src={urlForImage(value).width(2440).quality(100).url()}
              alt={String(value.alt)}
              width={getImageDimensions(value).width}
              height={getImageDimensions(value).height}
              quality={100}
              onLoad={(event) =>
                (event.target as HTMLImageElement).classList.remove('opacity-0')
              }
              className={clsx(
                'w-full object-cover opacity-0 transition-all duration-300 ease-in-out-cubic max-w-[560px]',
              )}
            />
          )}

          <figcaption className={clsx('w-paragraph-s-desktop text-black/75')}>
            {value.caption}
          </figcaption>
        </figure>
      )
    },
    embed: ({ value }: { value: any }) => {
      return <SanitizedEmbed embed={value} />
    },
    fullBleedImage: ({ value }: { value: any }) => (
      <figure
        className={clsx(
          'flex flex-col gap-y-[17px] w-full',
          'lg:items-end lg:gap-y-[9px] lg:px-0',
        )}
      >
        {value.asset && (
          <Image
            src={urlForImage(value).width(2440).url()}
            alt={String(value.alt)}
            width={getImageDimensions(value).width}
            height={getImageDimensions(value).height}
            onLoad={(event) =>
              (event.target as HTMLImageElement).classList.remove('opacity-0')
            }
            className={clsx(
              'w-full object-cover opacity-0 transition-all duration-300 ease-in-out-cubic',
            )}
          />
        )}
        <figcaption className={clsx('w-paragraph-s-desktop text-black/75')}>
          {value.caption}
        </figcaption>
      </figure>
    ),
    table: ({ value }: { value: any }) => <WTable data={value} noPadding />,
  },

  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className={clsx('font-codec-heavy')}>{children}</strong>
    ),
    link: ({ children, value }: { children: React.ReactNode; value: any }) => (
      <a
        href={value.href}
        className={clsx(
          'underline font-codec-bold text-lavender hover:no-underline transition-colors duration-200',
        )}
      >
        {children}
      </a>
    ),
    telEmailLink: ({
      children,
      value,
    }: {
      children: React.ReactNode
      value: any
    }) => (
      <a
        href={value.href}
        className={clsx(
          'underline font-codec-bold text-lavender hover:no-underline transition-colors duration-200',
        )}
      >
        {children}
      </a>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className={clsx('italic')}>{children}</em>
    ),
    leftAligned: ({ children }: { children: React.ReactNode }) => (
      <span className={clsx('text-left block')}>{children}</span>
    ),
    centerAligned: ({ children }: { children: React.ReactNode }) => (
      <span className={clsx('text-center block')}>{children}</span>
    ),
    rightAligned: ({ children }: { children: React.ReactNode }) => (
      <span className={clsx('text-right block')}>{children}</span>
    ),
    sub: ({ children }: { children: React.ReactNode }) => <sub>{children}</sub>,
    sup: ({ children }: { children: React.ReactNode }) => <sup>{children}</sup>,
    orangeText: ({ children }: { children: React.ReactNode }) => (
      <span className={clsx('text-[#F56600]!')}>{children}</span>
    ),
    wysiwygPageLink: (props: any) => {
      return (
        <WysiwygPageLink
          title={props.text}
          link={props.value.link}
          externalLink={props.value.externalLink}
          externalLinkOneOff={props.value.externalLinkOneOff}
        />
      )
    },
  },

  block: {
    small: ({ children }: { children: React.ReactNode }) => (
      <p className={clsx('text-[16px] leading-[21px] font-codec-regular')}>
        {children}
      </p>
    ),
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1
        className={clsx('w-h1 text-lavender w-full', 'lg:w-h1-desktop lg:px-0')}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2
        className={clsx(
          'w-h2 text-lavender w-full ',
          'lg:w-h2-desktop lg:px-0',
        )}
      >
        {children}
      </h2>
    ),
    eyebrow: ({ children }: { children: React.ReactNode }) => (
      <h2
        className={clsx(
          'subtitle-m text-black/75 mb-[9px]',
          'lg:mb-[11px] lg:subtitle-l',
        )}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className={clsx(' w-h3 text-lavender', 'lg:w-h3-desktop lg:px-0')}>
        {children}
      </h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className={clsx('w-h4 text-lavender ', 'lg:w-h4-desktop lg:px-0')}>
        {children}
      </h4>
    ),
    h5: ({ children }: { children: React.ReactNode }) => (
      <h5 className={clsx(' w-h5 text-lavender ', 'lg:w-h5-desktop')}>
        {children}
      </h5>
    ),
    h6: ({ children }: { children: React.ReactNode }) => (
      <h6 className={clsx('w-h6 text-lavender ', 'lg:w-h6-desktop lg:px-0')}>
        {children}
      </h6>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p
        className={clsx(
          'w-full w-paragraph-s-desktop',
          'lg:px-0 lg:w-paragraph-l-desktop',
        )}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote
        className={clsx(
          '  text-lavender border-t-orange border-t-4 pt-[24px] text-[24px] leading-[30px]',
          'lg:text-[36px] lg:leading-[46.08px] font-codec-heavy lg:border-t-4  lg:mx-auto',
        )}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode[] }) => {
      const childrenLists = children?.filter((item: any) => {
        const hasInnerChildrenLists = item?.props?.children?.filter(
          (innerItem: any) => innerItem?.props?.value?._type === '@list',
        )
        if (hasInnerChildrenLists?.length > 0) {
          return true
        }
        return false
      })
      return (
        <ul
          className={clsx(
            'list-disc list-inside w-full flex flex-col gap-y-[21px] w-paragraph-s-desktop text-black/75',
            'lg:px-0 lg:w-paragraph-l-desktop',
            childrenLists?.length > 0
              ? 'gap-y-[32px] px-[24px]'
              : 'gap-y-[16px] px-0 pt-[16px]',
          )}
        >
          {children}
        </ul>
      )
    },
    number: ({ children }: { children: React.ReactNode }) => (
      <ol
        className={clsx(
          'list-none list-inside  w-full flex flex-col gap-y-[21px] lg:w-paragraph-l-desktop text-black/75',
          'lg:px-0',
        )}
      >
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className={clsx('flex gap-x-[16px] items-start')}>
        <span
          className={clsx(
            'inline-block w-[6px] h-[6px] rounded-full bg-lavender shrink-0 mt-[9px] lg:mt-[12px]',
          )}
        ></span>
        <span
          className={clsx(
            'inline-block w-paragraph-s-desktop',
            'lg:text-[21px] lg:leading-[31.5px]',
          )}
        >
          {children}
        </span>
      </li>
    ),
    number: ({
      children,
      index,
    }: {
      children: React.ReactNode
      index: number
    }) => (
      <li className={clsx('flex gap-x-[12px] items-start')}>
        <span
          className={clsx(
            'inline-block w-[19px] h-[32px] text-[21px] leading-[31.5px] font-codec-heavy text-lavender',
          )}
        >
          {index + 1}.
        </span>
        <span
          className={clsx(
            'inline-block w-paragraph-s-desktop',
            'lg:text-[21px] lg:leading-[31.5px]',
          )}
        >
          {children}
        </span>
      </li>
    ),
  },
}

export const WysiwygComopentsMin = {
  types: {},
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className={clsx('font-codec-heavy')}>{children}</strong>
    ),
    link: ({ children, value }: { children: React.ReactNode; value: any }) => (
      <a
        href={value.href}
        className={clsx(
          'underline font-codec-bold text-lavender hover:no-underline transition-colors duration-200',
        )}
      >
        {children}
      </a>
    ),
    telEmailLink: ({
      children,
      value,
    }: {
      children: React.ReactNode
      value: any
    }) => (
      <a
        href={value.href}
        className={clsx(
          'underline font-codec-bold text-lavender hover:no-underline transition-colors duration-200',
        )}
      >
        {children}
      </a>
    ),
    wysiwygPageLink: (props: any) => {
      return (
        <WysiwygPageLink
          title={props.text}
          link={props.value.link}
          externalLink={props.value.externalLink}
          externalLinkOneOff={props.value.externalLinkOneOff}
        />
      )
    },
    leftAligned: ({ children }: { children: React.ReactNode }) => (
      <span className={clsx('text-left block')}>{children}</span>
    ),
    centerAligned: ({ children }: { children: React.ReactNode }) => (
      <span className={clsx('text-center block')}>{children}</span>
    ),
    rightAligned: ({ children }: { children: React.ReactNode }) => (
      <span className={clsx('text-right block')}>{children}</span>
    ),
    sub: ({ children }: { children: React.ReactNode }) => <sub>{children}</sub>,
    sup: ({ children }: { children: React.ReactNode }) => <sup>{children}</sup>,
    orangeText: ({ children }: { children: React.ReactNode }) => (
      <span className={clsx('text-[#F56600]!')}>{children}</span>
    ),
  },

  block: {
    small: ({ children }: { children: React.ReactNode }) => (
      <p className={clsx('text-[16px] leading-[21px] font-codec-regular')}>
        {children}
      </p>
    ),
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1
        className={clsx('w-h1 text-lavender w-full', 'lg:w-h1-desktop lg:px-0')}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2
        className={clsx(
          'w-h2 text-lavender w-full ',
          'lg:w-h2-desktop lg:px-0',
        )}
      >
        {children}
      </h2>
    ),
    eyebrow: ({ children }: { children: React.ReactNode }) => (
      <h2
        className={clsx(
          'subtitle-m text-black/75 mb-[9px]',
          'lg:mb-[11px] lg:subtitle-l',
        )}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3
        className={clsx(
          ' w-h3 text-current text-lavender',
          'lg:w-h3-desktop lg:px-0',
        )}
      >
        {children}
      </h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4
        className={clsx(
          'w-h4 text-current text-lavender',
          'lg:w-h4-desktop lg:px-0',
        )}
      >
        {children}
      </h4>
    ),
    h5: ({ children }: { children: React.ReactNode }) => (
      <h5
        className={clsx(' w-h5 text-current text-lavender', 'lg:w-h5-desktop')}
      >
        {children}
      </h5>
    ),
    h6: ({ children }: { children: React.ReactNode }) => (
      <h6
        className={clsx(
          'w-h6 text-current text-lavender',
          'lg:w-h6-desktop lg:px-0',
        )}
      >
        {children}
      </h6>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p
        className={clsx(
          'w-full w-paragraph-s-desktop  text-current ',
          'lg:px-0 lg:w-paragraph-l-desktop',
        )}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote
        className={clsx(
          '  text-current border-t-orange border-t-4 pt-[24px] text-[24px] leading-[30px]',
          'lg:text-[36px] lg:leading-[46.08px] font-codec-heavy lg:border-t-4  lg:mx-auto',
        )}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode[] }) => {
      const childrenLists = children?.filter((item: any) => {
        const hasInnerChildrenLists = item?.props?.children?.filter(
          (innerItem: any) => innerItem?.props?.value?._type === '@list',
        )
        if (hasInnerChildrenLists?.length > 0) {
          return true
        }
        return false
      })
      return (
        <ul
          className={clsx(
            'list-disc list-inside w-full flex flex-col  w-paragraph-s-desktop text-current',
            'lg:px-0 lg:w-paragraph-l-desktop',
            childrenLists?.length > 0
              ? 'gap-y-[32px] px-0'
              : 'gap-y-[16px] px-0 pt-[16px]',
          )}
        >
          {children}
        </ul>
      )
    },
    number: ({ children }: { children: React.ReactNode }) => (
      <ol
        className={clsx(
          'list-none list-inside  w-full flex flex-col gap-y-[16px] lg:w-paragraph-l-desktop text-current',
          'lg:px-0',
        )}
      >
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className={clsx('flex gap-x-[16px] items-start')}>
        <span
          className={clsx(
            'inline-block w-[6px] h-[6px] rounded-full bg-current shrink-0 mt-[9px] lg:mt-[12px]',
          )}
        ></span>
        <span
          className={clsx(
            'inline-block w-paragraph-s-desktop',
            'lg:text-[21px] lg:leading-[31.5px]',
          )}
        >
          {children}
        </span>
      </li>
    ),
    number: ({
      children,
      index,
    }: {
      children: React.ReactNode
      index: any
    }) => (
      <li className={clsx('flex gap-x-[12px] items-start')}>
        <span
          className={clsx(
            'inline-block w-[19px] h-[32px] text-[21px] leading-[31.5px] font-codec-heavy text-current',
          )}
        >
          {index + 1}.
        </span>
        <span
          className={clsx(
            'inline-block w-paragraph-s-desktop text-current',
            'lg:text-[21px] lg:leading-[31.5px]',
          )}
        >
          {children}
        </span>
      </li>
    ),
  },
}

export const WysiwygComponents = {
  types: {
    embed: ({ value }: { value: any }) => {
      return <SanitizedEmbed embed={value} />
    },
    image: ({ value }: { value: any }) => {
      return (
        <figure
          className={clsx(
            'flex flex-col gap-y-[17px] px-[24px] max-w-[888px] mx-auto w-full',
            'lg:items-end lg:gap-y-[9px] lg:px-0',
          )}
        >
          {value.asset && (
            <Image
              src={urlForImage(value).width(2440).quality(100).url()}
              alt={String(value.alt)}
              width={getImageDimensions(value).width}
              height={getImageDimensions(value).height}
              quality={100}
              onLoad={(event) =>
                (event.target as HTMLImageElement).classList.remove('opacity-0')
              }
              className={clsx(
                'w-full object-cover opacity-0 transition-all duration-300 ease-in-out-cubic',
              )}
            />
          )}

          <figcaption className={clsx('w-paragraph-s-desktop text-black/75')}>
            {value.caption}
          </figcaption>
        </figure>
      )
    },
    containedSmall: ({ value }: { value: any }) => {
      return (
        <figure
          className={clsx(
            'flex flex-col gap-y-[17px] px-[24px] max-w-[888px] mx-auto w-full',
            'lg:gap-y-[9px] lg:px-0',
          )}
        >
          {value.asset && (
            <Image
              src={urlForImage(value).width(2440).quality(100).url()}
              alt={String(value.alt)}
              width={getImageDimensions(value).width}
              height={getImageDimensions(value).height}
              quality={100}
              onLoad={(event) =>
                (event.target as HTMLImageElement).classList.remove('opacity-0')
              }
              className={clsx(
                'w-full object-cover opacity-0 transition-all duration-300 ease-in-out-cubic max-w-[340px]',
              )}
            />
          )}
          <figcaption className={clsx('w-paragraph-s-desktop text-black/75')}>
            {value.caption}
          </figcaption>
        </figure>
      )
    },
    containedMedium: ({ value }: { value: any }) => {
      return (
        <figure
          className={clsx(
            'flex flex-col gap-y-[17px] px-[24px] max-w-[888px] mx-auto w-full',
            'lg:gap-y-[9px] lg:px-0',
          )}
        >
          {value.asset && (
            <Image
              src={urlForImage(value).width(2440).quality(100).url()}
              alt={String(value.alt)}
              width={getImageDimensions(value).width}
              height={getImageDimensions(value).height}
              quality={100}
              onLoad={(event) =>
                (event.target as HTMLImageElement).classList.remove('opacity-0')
              }
              className={clsx(
                'w-full object-cover opacity-0 transition-all duration-300 ease-in-out-cubic max-w-[560px]',
              )}
            />
          )}

          <figcaption className={clsx('w-paragraph-s-desktop text-black/75')}>
            {value.caption}
          </figcaption>
        </figure>
      )
    },
    fullBleedImage: ({ value }: { value: any }) => (
      <figure
        className={clsx(
          'flex flex-col gap-y-[17px] px-[24px] w-full',
          'lg:items-end lg:gap-y-[9px] lg:px-0',
        )}
      >
        {value.asset && (
          <Image
            src={urlForImage(value).width(2440).url()}
            alt={String(value.alt)}
            width={getImageDimensions(value).width}
            height={getImageDimensions(value).height}
            onLoad={(event) =>
              (event.target as HTMLImageElement).classList.remove('opacity-0')
            }
            className={clsx(
              'w-full object-cover opacity-0 transition-all duration-300 ease-in-out-cubic',
            )}
          />
        )}
        <figcaption className={clsx('w-paragraph-s-desktop text-black/75')}>
          {value.caption}
        </figcaption>
      </figure>
    ),
    table: ({ value }: { value: any }) => <WTable data={value} />,
    buttonLinkGroup: (props: any) => {
      return <WysiwygButtonGroup value={props.value} />
    },
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className={clsx('font-codec-heavy')}>{children}</strong>
    ),
    link: ({ children, value }: { children: React.ReactNode; value: any }) => (
      <a
        href={value.href}
        className={clsx(
          'underline font-codec-bold text-lavender hover:no-underline transition-colors duration-200',
        )}
      >
        {children}
      </a>
    ),
    wysiwygPageLink: (props: any) => {
      return (
        <WysiwygPageLink
          title={props.text}
          link={props.value.link}
          externalLink={props.value.externalLink}
          externalLinkOneOff={props.value.externalLinkOneOff}
        />
      )
    },

    telEmailLink: ({
      children,
      value,
    }: {
      children: React.ReactNode
      value: any
    }) => (
      <a
        href={value.href}
        className={clsx(
          'underline font-codec-bold text-lavender hover:no-underline transition-colors duration-200',
        )}
      >
        {children}
      </a>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className={clsx('')}>{children}</em>
    ),
    leftAligned: ({ children }: { children: React.ReactNode }) => (
      <span className={clsx('text-left block')}>{children}</span>
    ),
    centerAligned: ({ children }: { children: React.ReactNode }) => (
      <span className={clsx('text-center block')}>{children}</span>
    ),
    rightAligned: ({ children }: { children: React.ReactNode }) => (
      <span className={clsx('text-right block')}>{children}</span>
    ),
    sub: ({ children }: { children: React.ReactNode }) => <sub>{children}</sub>,
    sup: ({ children }: { children: React.ReactNode }) => <sup>{children}</sup>,
    orangeText: ({ children }: { children: React.ReactNode }) => (
      <span className={clsx('!text-orange')}>{children}</span>
    ),
  },

  block: {
    small: ({ children }: { children: React.ReactNode }) => (
      <p
        className={clsx(
          'text-[16px] leading-[21px] font-codec-regular  max-w-[888px] mx-auto w-full px-[24px]',
          'lg:px-0',
        )}
      >
        {children}
      </p>
    ),
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1
        className={clsx(
          'w-h1 text-lavender max-w-[888px] mx-auto w-full px-[24px]',
          'lg:w-h1-desktop lg:px-0',
        )}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2
        className={clsx(
          'w-h2 text-lavender max-w-[888px] mx-auto w-full px-[24px]',
          'lg:w-h2-desktop lg:px-0',
        )}
      >
        {children}
      </h2>
    ),
    eyebrow: ({ children }: { children: React.ReactNode }) => (
      <h2
        className={clsx(
          'subtitle-m text-black/75 mb-[9px] max-w-[888px] mx-auto px-[24px] w-full',
          'lg:mb-[11px] lg:subtitle-l lg:px-0',
        )}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3
        className={clsx(
          ' w-h3 text-lavender max-w-[888px] mx-auto w-full px-[24px]',
          'lg:w-h3-desktop lg:px-0',
        )}
      >
        {children}
      </h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4
        className={clsx(
          'w-h4 text-lavender max-w-[888px] mx-auto w-full px-[24px]',
          'lg:w-h4-desktop lg:px-0',
        )}
      >
        {children}
      </h4>
    ),
    h5: ({ children }: { children: React.ReactNode }) => (
      <h5
        className={clsx(
          ' w-h5 text-lavender max-w-[888px] mx-auto w-full px-[24px]',
          'lg:w-h5-desktop lg:px-0',
        )}
      >
        {children}
      </h5>
    ),
    h6: ({ children }: { children: React.ReactNode }) => (
      <h6
        className={clsx(
          'w-h6 text-lavender max-w-[888px] mx-auto w-full px-[24px]',
          'lg:w-h6-desktop lg:px-0',
        )}
      >
        {children}
      </h6>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p
        className={clsx(
          'max-w-[888px] mx-auto w-full w-paragraph-s-desktop  px-[24px] text-black/75 ',
          'lg:px-0 lg:w-paragraph-l-desktop',
        )}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote
        className={clsx(
          'max-w-[888px]   text-lavender border-t-orange border-t-4 pt-[24px] text-[24px] leading-[30px] mx-[24px]',
          'lg:text-[36px] lg:leading-[46.08px] font-codec-heavy lg:border-t-4  lg:mx-auto',
        )}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode[] }) => {
      const childrenLists = children?.filter((item: any) => {
        const hasInnerChildrenLists = item?.props?.children?.filter(
          (innerItem: any) => innerItem?.props?.value?._type === '@list',
        )

        if (hasInnerChildrenLists?.length > 0) {
          return true
        }
        return false
      })

      return (
        <ul
          className={clsx(
            'list-disc list-inside max-w-[888px] mx-auto w-full flex flex-col w-paragraph-s-desktop  text-black/75',
            'lg:px-0 lg:w-paragraph-l-desktop',
            childrenLists?.length > 0
              ? 'gap-y-[32px] px-[24px] innerContainer'
              : 'gap-y-[16px] px-[24px] pt-[16px]',
          )}
        >
          {children}
        </ul>
      )
    },
    number: ({ children }: { children: React.ReactNode }) => (
      <ol
        className={clsx(
          'list-none list-inside max-w-[888px] mx-auto w-full flex flex-col gap-y-[21px] lg:w-paragraph-l-desktop px-[24px] text-black/75',
          'lg:px-0',
        )}
      >
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className={clsx('flex gap-x-[16px] items-start')}>
        <span
          className={clsx(
            'inline-block w-[6px] h-[6px] rounded-full bg-lavender shrink-0 mt-[9px] lg:mt-[12px]',
          )}
        ></span>
        <span
          className={clsx(
            'inline-block w-paragraph-s-desktop flex-1 min-w-0',
            'lg:text-[21px] lg:leading-[31.5px]',
          )}
        >
          {children}
        </span>
      </li>
    ),
    number: ({
      children,
      index,
    }: {
      children: React.ReactNode
      index: any
    }) => (
      <li className={clsx('flex gap-x-[12px] items-start')}>
        <span
          className={clsx(
            'inline-block w-[19px] h-[32px] text-[21px] leading-[31.5px] font-codec-heavy text-lavender',
          )}
        >
          {index + 1}.
        </span>
        <span
          className={clsx(
            'inline-block w-paragraph-s-desktop flex-1 min-w-0',
            'lg:text-[21px] lg:leading-[31.5px]',
          )}
        >
          {children}
        </span>
      </li>
    ),
  },
}
