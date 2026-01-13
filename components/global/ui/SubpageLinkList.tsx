import { SubPageType } from 'types/sanity'
import { clsx } from 'clsx'
import Link from 'next/link'
import { useWindowSize } from 'hooks/useWindowSize'
import * as Accordion from '@radix-ui/react-accordion'
import FormattedTextField from 'components/interaction/formattedTextField'

const SubpageLinkList = ({ data }: { data: SubPageType[] }) => {
  const { width } = useWindowSize()
  return (
    <>
      <nav
        className={clsx(
          'pt-[39px] pb-[37px]  gap-x-[32px] px-[48px] justify-center items-center text-[18px] leading-[27px] font-codec-bold text-lavender border-b-[1px] border-b-black/10 hidden',
          'lg:flex',
        )}
      >
        {data?.map((page) => (
          <Link
            href={page?.slug?.current}
            key={page?.slug?.current}
            className={clsx(
              'hover:opacity-60 transition-opacity ease-linear duration-200',
            )}
          >
            {' '}
            <FormattedTextField text={page?.title} />
          </Link>
        ))}
      </nav>
      <Accordion.Root
        type="single"
        collapsible
        className={clsx(
          'w-full border-b-[1px] border-b-black/10 ',
          'lg:hidden',
        )}
      >
        <Accordion.Item value="subPageLinks group">
          <Accordion.Header className={clsx('text-black')}>
            <Accordion.Trigger
              className={clsx(
                'py-[35px] group flex justify-between items-center w-full px-[24px] data-[state=open]:bg-lightGrey  data-[state=closed]:delay-300 transition-colors duration-200',
              )}
            >
              <h4
                className={clsx(
                  'uppercase tracking-[1.6px] text-[16px] leading-[16px] text-lavender',
                )}
              >
                Explore this section
              </h4>
              <div className={clsx('relative h-[3px]')}>
                <span
                  className={clsx('block w-[13px] h-[3px] bg-lavender')}
                ></span>
                <span
                  className={clsx(
                    'sblock w-[13px] h-[3px] bg-lavender absolute left-[0px] top-[0px] origin-center group-data-[state=closed]:rotate-[90deg] transition-transform duration-300 ease-in-out-cubic',
                  )}
                ></span>
              </div>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            className={clsx(
              'AccordionContent overflow-hidden bg-lightGrey px-[24px]',
            )}
          >
            <nav className={clsx('pb-[44px] flex flex-col gap-y-[16px]')}>
              {data?.map((page) => (
                <Link
                  key={page.slug.current}
                  href={page.slug.current}
                  className={clsx(
                    'text-lavender font-codec-bold text-[18px] leading-[27px]',
                  )}
                >
                  <FormattedTextField text={page.title} />
                </Link>
              ))}
            </nav>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  )
}

export default SubpageLinkList
