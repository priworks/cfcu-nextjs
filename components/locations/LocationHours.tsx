import React from 'react'
import { LocationPage } from '@/types/sanity'
import { clsx } from 'clsx'

const LocationHours = ({ data }: { data: LocationPage['hours'] }) => {
  return (
    <section
      className={clsx(
        'max-w-[888px] mx-auto px-[24px]',
        'lg:px-0 lg:pb-0',
      )}
    >
      <h2 className={clsx('w-h2', 'lg:w-h2-desktop text-lavender')}>Hours</h2>
      <div className={clsx(' w-full flex flex-col mt-[12px]', 'lg:mt-[27px]')}>
        {data?.map((day, index) => (
          <div
            key={index}
            className={clsx(
              'w-paragraph-s-deskto pl-[15px] pr-[10px] pt-[7px] pb-[6px]',
              index % 2 === 0 ? 'bg-lightGrey' : 'bg-white',
              'lg:pl-[30px] lg:pr-[25px] lg:pt-[14px] lg:pb-[12px] lg:w-paragraph-l-desktop text-black/75 flex w-full justify-between',
            )}
          >
            <span>{day.day}</span>
            {day.isClosed ? (
              <span>Closed</span>
            ) : (
              <span>
                {day.openTime} - {day.closeTime}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default LocationHours
