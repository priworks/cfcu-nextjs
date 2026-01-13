import { RateTableType } from 'types/sanity'
import { clsx } from 'clsx'
import { formatDate } from 'utils'
import { PortableText } from '@portabletext/react'
import { useEffect, useRef } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'
import { WysiwygComponentsWithoutPadding } from '@/lib/portabletTextComponents'
import FormattedTextField from 'components/interaction/formattedTextField'

const RateTable = ({ data }: { data: RateTableType }) => {
  const maxRows = data?.columns?.reduce(
    (max, column) => Math.max(max, column?.columnValues?.length),
    0,
  )
  const { width } = useWindowSize(500)
  const gradientRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  useEffect(() => {
    if (!gradientRef.current || !tableRef.current) return
    if (tableRef.current.offsetWidth + (width > 1024 ? 48 : 24) < width) {
      gradientRef.current.style.opacity = '0'
    } else {
      gradientRef.current.style.opacity = '1'
    }
  }, [width])

  return (
    <section
      className={clsx(
        'py-[89px]',
        'lg:py-[74px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto',
      )}
    >
      <div
        className={clsx(
          'px-[24px] flex flex-col gap-y-[9px]',
          'lg:flex-row lg:justify-between lg:items-end lg:px-[48px]',
          'xl:px-[0px]',
        )}
      >
        <h3 className={clsx('text-lavender title-m', 'lg:title-m-desktop')}>
          <FormattedTextField text={data?.title} />
        </h3>
        <h4 className={clsx('w-paragraph-s-desktop text-black/75')}>
          Date Updated {formatDate(data?._updatedAt)}
        </h4>
      </div>
      <div className={clsx('relative h-fit w-full')}>
        <div
          ref={gradientRef}
          className={clsx(
            'absolute right-0 top-0 w-[32px] h-full rateTableGradient z-[2]',
          )}
        ></div>
        <div
          className={clsx(
            ' mt-[29px] relative flex overflow-x-auto pl-[24px] w-full',
            'lg:mt-[44px] lg:px-[48px] ',
            'xl:px-[0px]',
          )}
        >
          <table className="w-full" ref={tableRef}>
            <thead>
              <tr>
                {data?.columns?.map((column, index) => (
                  <th
                    key={index}
                    className={clsx(
                      'bg-lavender text-left w-h6 text-white py-[14px] pl-[20px] min-w-[300px]',
                      'lg:pt-[23px] lg:pb-[16px] lg:pl-[31px] lg:w-h6-desktop',
                    )}
                  >
                    <PortableText value={column?.columnTitle as any} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxRows }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {data?.columns?.map((column, colIndex) => {
                    return (
                      <td
                        key={colIndex}
                        className={clsx(
                          'pt-[16px] pb-[18px] pl-[20px] border-b-[1px] border-black/20 w-paragraph-s-desktop',
                          rowIndex % 2 === 0 ? 'bg-[#EDEDED]/20' : 'bg-white',
                          'lg:pl-[31px] lg:pb-[20px] lg:pt-[16px] lg:w-paragraph-l-desktop',
                        )}
                      >
                        {
                          //@ts-ignore
                          column?.columnValues[rowIndex]?.value ? (
                            <PortableText
                              //@ts-ignore
                              value={column?.columnValues[rowIndex]?.value}
                              components={
                                WysiwygComponentsWithoutPadding as any
                              }
                            />
                          ) : (
                            '\u00A0'
                          )
                        }
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className={clsx(
              'w-[24px] h-[24px] bg-white flex-shrink-0 lg:hidden',
            )}
          ></div>
        </div>
      </div>
      {data?.tableNotes && (
        <div
          className={clsx(
            'px-[24px] pt-[28px] text-black w-paragraph-s-desktop rateTableBlock text-[16px] leading-[24px]',
            'lg:px-[48px] lg:pt-[12px]',
            'xl:px-[0px]',
          )}
        >
          <PortableText
            value={data?.tableNotes}
            components={WysiwygComponentsWithoutPadding as any}
          />
        </div>
      )}
    </section>
  )
}

export default RateTable
