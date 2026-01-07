import { RateTableType } from '@/types/sanity'
import { clsx } from 'clsx'
import { formatDate } from '@/utils'
import { PortableText } from '@portabletext/react'
import { WysiwygComponentsWithoutPadding } from '@/lib/portabletTextComponents'

const WTable = ({
  data,
  noPadding,
}: {
  data: RateTableType
  noPadding?: boolean
}) => {
  const maxRows = data?.columns?.reduce(
    (max, column) => Math.max(max, column?.columnValues?.length),
    0,
  )

  return (
    <section
      className={clsx(
        'py-0 w-full',
        'lg:py-0',
        !noPadding && 'lg:max-w-[888px] lg:px-0 lg:mx-auto',
      )}
    >
      <div
        className={clsx(
          'flex flex-col gap-y-[9px]',
          !noPadding && 'px-[24px]',
          'lg:flex-row lg:justify-between lg:items-end lg:px-0',
        )}
      >
        <h3 className={clsx('text-lavender title-m', 'lg:title-m-desktop')}>
          {data?.title}
        </h3>
      </div>

      <div
        className={clsx(
          'overflow-x-auto mt-[29px]  w-full ',
          !noPadding && 'px-[24px]',
          'lg:mt-[44px] lg:px-0',
        )}
      >
        <table className="w-full overflow-x-auto">
          <colgroup>
            {data?.columns?.map((_, index) => (
              <col
                key={index}
                style={{ width: `${100 / data.columns.length}%` }}
              />
            ))}
          </colgroup>
          <thead>
            <tr>
              {data?.columns?.map((column, index) => (
                <th
                  key={index}
                  className={clsx(
                    'bg-lavender text-left w-h6 text-white py-[14px] pl-[20px] min-w-[200px]',
                    'lg:pt-[23px] lg:pb-[16px] lg:pl-[31px] lg:w-h6-desktop lg:min-w-[unset]  lg:w-fit',
                  )}
                >
                  {column.columnTitle}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {data?.columns?.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={clsx(
                      'pt-[16px] pb-[18px] pl-[20px] border-b border-black/20 w-paragraph-s-desktop',
                      rowIndex % 2 === 0 ? 'bg-[#EDEDED]/20' : 'bg-white',
                      'lg:pl-[31px] lg:pb-[20px] lg:pt-[16px] lg:w-paragraph-l-desktop',
                    )}
                  >
                    <p>
                      {
                        //@ts-ignore
                        column?.columnValues[rowIndex]?.value ? (
                          <PortableText
                            //@ts-ignore
                            value={column?.columnValues[rowIndex]?.value}
                            components={WysiwygComponentsWithoutPadding as any}
                          />
                        ) : (
                          '\u00A0'
                        )
                      }
                    </p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default WTable
