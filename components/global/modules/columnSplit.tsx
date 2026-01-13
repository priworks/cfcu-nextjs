import { ColumnSplitType } from 'types/sanity'
import { PortableText } from '@portabletext/react'
import { clsx } from 'clsx'
import {
  WysiwygComponentsWithoutPadding,
  WysiwygComopentsMin,
} from 'lib/portabletTextComponents'
import { stegaClean } from '@sanity/client/stega'
import FormattedTextField from 'components/interaction/formattedTextField'

const ColumnSplit = ({ data }: { data: ColumnSplitType }) => {
  return (
    <section
      className={clsx(
        'px-[24px]  py-[66px]',
        'lg:px-[48px] lg:pt-[95px] lg:pb-[117px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto',
      )}
    >
      {data?.subtitle && (
        <h2
          className={clsx(
            'subtitle-m text-black/75 mb-[9px]',
            'lg:mb-[11px] lg:subtitle-l',
          )}
        >
          <FormattedTextField text={data?.subtitle} />
        </h2>
      )}
      <h3
        className={clsx(
          stegaClean(data?.titleSize) === 'large'
            ? 'title-l lg:title-l-desktop'
            : 'title-xl lg:title-xl-desktop',

          stegaClean(data?.titleColor) === 'orange'
            ? 'text-orange'
            : 'text-lavender',
        )}
      >
        <FormattedTextField text={data?.title} />
      </h3>
      {data?.description && (
        <div
          className={clsx(
            'mt-[15px] text-black/75 w-paragraph-s-desktop  flex flex-col gap-y-[16px]',
            'lg:mt-[11px] lg:w-paragraph-l-desktop',
          )}
        >
          <PortableText
            value={data?.description}
            components={WysiwygComopentsMin as any}
          />
        </div>
      )}
      <div
        className={clsx(
          'mt-[41px] flex flex-col gap-y-[24px]',
          'lg:grid lg:mt-[57px]',
          data?.columns?.length == 2 && 'lg:grid-cols-2 lg:gap-x-[64px]',
          data?.columns?.length == 3 && 'lg:grid-cols-3 lg:gap-x-[48px]',
          data?.columns?.length == 4 && 'lg:grid-cols-4 lg:gap-x-[36px]',
          data?.columns?.length == 5 && 'lg:grid-cols-5 lg:gap-x-[24px]',
        )}
      >
        {data?.columns?.map((column, index) => (
          <div
            key={index}
            className={clsx(
              'flex flex-col gap-y-[8px] balanceText text-black/75',
            )}
          >
            <PortableText
              value={column?.content}
              components={WysiwygComponentsWithoutPadding as any}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ColumnSplit
