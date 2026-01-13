import { AccordionType } from 'types/sanity'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import * as Accordion from '@radix-ui/react-accordion'
import {
  WysiwygComponentsWithoutPadding,
  WysiwygComopentsMin,
} from 'lib/portabletTextComponents'
import FormattedTextField from 'components/interaction/formattedTextField'

const AccordionComponent = ({ data }: { data: AccordionType }) => {
  return (
    <section
      className={clsx(
        'px-[24px] py-[66px]',
        'lg:grid lg:grid-cols-12 lg:gap-x-[24px] lg:px-[48px] lg:py-[89px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto',
      )}
    >
      <article className={clsx('lg:col-span-5 lg:pr-[24px]', 'ml:col-span-4')}>
        {data.subTitle && (
          <h2
            className={clsx(
              'subtitle-m text-black/75 mb-[9px]',
              'lg:subtitle-l  lg:mb-[19px]',
            )}
          >
            <FormattedTextField text={data?.subTitle} />
          </h2>
        )}
        <h3 className={clsx('title-m text-lavender ', 'lg:title-m-desktop')}>
          <FormattedTextField text={data.title} />
        </h3>
        {data.description && (
          <div
            className={clsx(
              'w-paragraph-s-desktop mt-[9px] flex flex-col gap-y-[16px] text-black/75',
              'lg:max-w-[400px] lg:w-paragraph-l-desktop lg:mt-[13px]',
            )}
          >
            <PortableText
              value={data?.description}
              components={WysiwygComopentsMin as any}
            />
          </div>
        )}
      </article>
      <div
        className={clsx(
          'mt-[26px]',
          'lg:col-span-7 lg:mt-[0px]',
          'ml:col-span-8',
        )}
      >
        <Accordion.Root type="single" collapsible className={clsx('w-full ')}>
          {data?.accordionItems?.map((item, index) => (
            <Accordion.Item
              value={'accordion' + index}
              key={index}
              className={clsx('group')}
            >
              <Accordion.Header className={clsx('text-black')}>
                <Accordion.Trigger
                  className={clsx(
                    'flex justify-between gap-x-[16px] w-full py-[16px] border-t-[1px] border-t-lightGrey transition-colors duration-200 group-hover:border-t-lavender',
                    'lg:py-[32px]',
                    'group-data-[state=open]:border-t-orange',
                  )}
                >
                  <div
                    className={clsx(
                      'w-h6 text-left text-lavender flex flex-col gap-y-[16px]',
                      'lg:w-h6-desktop',
                    )}
                  >
                    <PortableText
                      value={item.title}
                      components={WysiwygComopentsMin as any}
                    />
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={clsx(
                      'group-data-[state=open]:rotate-[180deg] transition-all duration-300 ease-in-out-cubic',
                    )}
                  >
                    <path
                      d="M20.031 9.53104L12.531 17.031C12.4614 17.1008 12.3787 17.1561 12.2876 17.1938C12.1966 17.2316 12.099 17.251 12.0004 17.251C11.9019 17.251 11.8043 17.2316 11.7132 17.1938C11.6222 17.1561 11.5394 17.1008 11.4698 17.031L3.96979 9.53104C3.82906 9.39031 3.75 9.19944 3.75 9.00042C3.75 8.80139 3.82906 8.61052 3.96979 8.46979C4.11052 8.32906 4.30139 8.25 4.50042 8.25C4.69944 8.25 4.89031 8.32906 5.03104 8.46979L12.0004 15.4401L18.9698 8.46979C19.0395 8.40011 19.1222 8.34483 19.2132 8.30712C19.3043 8.26941 19.4019 8.25 19.5004 8.25C19.599 8.25 19.6965 8.26941 19.7876 8.30712C19.8786 8.34483 19.9614 8.40011 20.031 8.46979C20.1007 8.53947 20.156 8.6222 20.1937 8.71324C20.2314 8.80429 20.2508 8.90187 20.2508 9.00042C20.2508 9.09896 20.2314 9.19654 20.1937 9.28759C20.156 9.37863 20.1007 9.46136 20.031 9.53104Z"
                      fill="#F56600"
                      className={clsx(
                        'group-hover:fill-lavender transition-colors duration-200',
                      )}
                    />
                  </svg>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content
                className={clsx('AccordionContent overflow-hidden')}
              >
                <div
                  className={clsx(
                    'w-paragraph-s-desktop pb-[16px] flex flex-col gap-y-[24px]',
                    'lg:w-paragraph-l-desktop lg:pb-[32px]',
                  )}
                >
                  <PortableText
                    value={item?.content}
                    components={WysiwygComponentsWithoutPadding as any}
                  />
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}

export default AccordionComponent
