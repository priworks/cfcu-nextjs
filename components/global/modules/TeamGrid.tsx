import { TeamGridType, GroupMember } from 'types/sanity'
import { PortableText } from '@portabletext/react'
import { clsx } from 'clsx'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import PageLink from '../ui/PageLink'
import Button from '../ui/Button'
import { formatPhoneNumber } from '@/lib/utils'
import FormattedTextField from 'components/interaction/formattedTextField'

const TeamGrid = ({ data }: { data: TeamGridType }) => {
  return (
    <section
      className={clsx('pt-[54px] pb-[125px]', 'lg:pt-[80px] lg:pb-[158px]')}
    >
      <div
        className={clsx(
          'flex items-center justify-center flex-col px-[24px] mb-[34px]',
          'lg:mb-[66px]',
        )}
      >
        {data?.subtitle && (
          <h2
            className={clsx(
              'mb-[11px] subtitle-l text-center',
              ' text-[#606060] ',
            )}
          >
            <FormattedTextField text={data?.subtitle} />
          </h2>
        )}
        <h3
          className={clsx(
            'text-lavender title-l text-center',
            'lg:title-l-desktop',
          )}
        >
          <FormattedTextField text={data?.title} />
        </h3>
        {data?.description && (
          <p
            className={clsx(
              'w-paragraph-w-desktop text-center mt-[12px] max-w-[975px] mx-auto',
              'lg:w-paragraph-l-desktop text-black/75  lg:mt-[8px]',
            )}
          >
            <FormattedTextField text={data?.description} />
          </p>
        )}
      </div>
      <div className={clsx('flex flex-col gap-y-[78px]', 'lg:gap-y-[86px]')}>
        {data?.teamRows?.map((row, index) => (
          <div
            key={index}
            className={clsx(
              'flex flex-col  justify-center items-center gap-y-[18px]',
              'lg:gap-y-[24px]',
            )}
          >
            <h4 className={clsx('text-lavender w-h4', 'lg:w-h4-desktop')}>
              <FormattedTextField text={row?.groupTitle} />
            </h4>
            <div
              className={clsx(
                'flex justify-center items-start gap-y-[48px] gap-x-[24px] flex-wrap',
                'lg:gap-x-[24px]',
              )}
            >
              {row?.groupMembers?.map((member, index) => (
                <TeamCard data={member} key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TeamGrid

function TeamCard({ data }: { data: GroupMember }) {
  return (
    <article className={clsx('flex flex-col items-center w-[320px]')}>
      <div
        className={clsx(
          'w-[240px] h-[240px] relative rounded-full overflow-hidden',
        )}
      >
        <Image
          src={urlForImage(data?.image).width(600).url()}
          alt={data?.image?.alt as string}
          fill
          className={clsx(
            'object-cover w-full h-full opacity-0 transition-all duration-300 ease-in-out-cubic',
          )}
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
        />
      </div>
      <h5 className={clsx('w-h5-desktop text-lavender mt-[16px] text-center')}>
        <FormattedTextField text={data?.name} />
      </h5>
      <h6
        className={clsx(
          'w-paragraph-m-desktop text-black/65 mt-[4px] mb-[16px] text-center',
        )}
      >
        <FormattedTextField text={data?.title} />
      </h6>
      {data?.phoneNumber && (
        <a
          href={formatPhoneNumber(data?.phoneNumber)}
          className={clsx('flex gap-x-[6px] items-start ')}
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.3472 14.8556L16.9306 12.8766L16.9184 12.8709C16.6892 12.7729 16.439 12.7335 16.1907 12.7564C15.9424 12.7793 15.7037 12.8638 15.4963 13.0022C15.4718 13.0183 15.4484 13.0358 15.4259 13.0547L13.1441 15C11.6984 14.2978 10.2059 12.8166 9.50376 11.3897L11.4519 9.07312C11.4706 9.04968 11.4884 9.02624 11.5053 9.00093C11.6407 8.79403 11.7229 8.55686 11.7445 8.31053C11.7661 8.0642 11.7264 7.81636 11.6291 7.58906V7.57781L9.64438 3.15374C9.5157 2.8568 9.29444 2.60944 9.01362 2.44859C8.7328 2.28774 8.4075 2.22202 8.08626 2.26124C6.81592 2.42841 5.64986 3.05228 4.80588 4.01633C3.9619 4.98039 3.49771 6.2187 3.50001 7.49999C3.50001 14.9437 9.55626 21 17 21C18.2813 21.0023 19.5196 20.5381 20.4837 19.6941C21.4477 18.8501 22.0716 17.6841 22.2388 16.4137C22.2781 16.0926 22.2125 15.7674 22.0518 15.4866C21.8911 15.2058 21.644 14.9845 21.3472 14.8556ZM17 19.5C13.8185 19.4965 10.7682 18.2311 8.51856 15.9814C6.26888 13.7318 5.00348 10.6815 5.00001 7.49999C4.99648 6.58451 5.32631 5.69905 5.92789 5.00897C6.52947 4.31888 7.36167 3.87137 8.26907 3.74999C8.2687 3.75373 8.2687 3.7575 8.26907 3.76124L10.2378 8.16749L8.30001 10.4869C8.28034 10.5095 8.26247 10.5336 8.24657 10.5591C8.10549 10.7755 8.02273 11.0248 8.0063 11.2827C7.98988 11.5406 8.04035 11.7983 8.15282 12.0309C9.0022 13.7681 10.7525 15.5053 12.5084 16.3537C12.7428 16.4652 13.002 16.5139 13.2608 16.4952C13.5196 16.4764 13.7692 16.3909 13.985 16.2469C14.0091 16.2307 14.0322 16.2131 14.0544 16.1944L16.3334 14.25L20.7397 16.2234C20.7397 16.2234 20.7472 16.2234 20.75 16.2234C20.6301 17.1321 20.1833 17.966 19.4931 18.5691C18.8028 19.1721 17.9166 19.5031 17 19.5Z"
              fill="#F56600"
            />
          </svg>
          <span
            className={clsx(
              'text-[18px] leading-[27px] font-codec-news text-lavender text-center',
            )}
          >
            {data?.phoneNumber}
          </span>
        </a>
      )}
      {data?.email && (
        <a href={`mailto:${data?.email}`} className={clsx('flex gap-x-[6px]')}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25V18C2.25 18.3978 2.40804 18.7794 2.68934 19.0607C2.97064 19.342 3.35218 19.5 3.75 19.5H20.25C20.6478 19.5 21.0294 19.342 21.3107 19.0607C21.592 18.7794 21.75 18.3978 21.75 18V5.25C21.75 5.05109 21.671 4.86032 21.5303 4.71967C21.3897 4.57902 21.1989 4.5 21 4.5ZM19.0716 6L12 12.4828L4.92844 6H19.0716ZM20.25 18H3.75V6.95531L11.4928 14.0531C11.6312 14.1801 11.8122 14.2506 12 14.2506C12.1878 14.2506 12.3688 14.1801 12.5072 14.0531L20.25 6.95531V18Z"
              fill="#F56600"
            />
          </svg>

          <span
            className={clsx(
              'text-[18px] leading-[27px] font-codec-news text-lavender text-center',
            )}
          >
            {data?.email}
          </span>
        </a>
      )}
      {data?.moreInfoLink && (
        <PageLink
          data={data?.moreInfoLink}
          className={clsx((data?.email || data?.phoneNumber) && 'mt-[16px]')}
        >
          <Button
            label={data?.moreInfoLink.title}
            className={clsx('!bg-lavender !text-white')}
          />
        </PageLink>
      )}
    </article>
  )
}
