import { useState, useRef, use } from 'react'
import { clsx } from 'clsx'
import Button from '../global/ui/Button'
import ReversedButton from '../global/ui/ReverseArrowButton'
import Link from 'next/link'
import { useEffect } from 'react'

interface PaginationProps {
  totalPages: number
  currentPage: number
  generateButtonUrl?: (page: number) => string
  nextUrl?: string
  prevUrl?: string
}

const Pagination = ({
  totalPages,
  currentPage,
  nextUrl,
  prevUrl,
  generateButtonUrl,
}: PaginationProps) => {
  const [selectedPage, setSelectedPage] = useState(currentPage)
  const selectRef = useRef<HTMLSelectElement>(null)
  const handleButtonClick = () => {
    selectRef.current?.focus()
    selectRef.current?.click()
  }

  return (
    <div
      key={currentPage}
      className={clsx(
        'flex justify-between items-center gap-x-[32px] max-w-[1800px] mx-auto mb-[84px]',
      )}
    >
      {prevUrl && (
        <Link
          href={prevUrl}
          className={clsx(
            currentPage == 1 && 'opacity-50 pointer-events-none',
            'hidden md:block',
          )}
        >
          <ReversedButton
            label="Prev"
            className={clsx('!bg-lavender text-white!')}
          />
        </Link>
      )}
      {/* <div className={clsx('flex items-center gap-x-[16px]')}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Link href={generateButtonUrl(index + 1)} key={index}>
            <button
              className={clsx(
                'w-[67px] h-[67px] bg-lightGrey font-codec-extra-bold text-lavender rounded-full',
                currentPage == index + 1 && '!bg-lavender text-white!',
              )}
            >
              {index + 1}
            </button>
          </Link>
        ))}
      </div> */}
      <div
        className={clsx(
          'flex text-black/75 text-[18px] leading-[27px] font-codec-pro items-center justify-center w-full',
        )}
      >
        <span className={clsx('inline-block mr-[12px]')}>Page</span>
        <div className={clsx('relative w-fit h-fit')}>
          <div className={clsx('relative')}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={clsx(
                'absolute top-[14px] right-[16px] z-2 pointer-events-none',
              )}
            >
              <path
                d="M20.031 9.53055L12.531 17.0306C12.4614 17.1003 12.3787 17.1556 12.2876 17.1933C12.1966 17.2311 12.099 17.2505 12.0004 17.2505C11.9019 17.2505 11.8043 17.2311 11.7132 17.1933C11.6222 17.1556 11.5394 17.1003 11.4698 17.0306L3.96979 9.53055C3.82906 9.38982 3.75 9.19895 3.75 8.99993C3.75 8.80091 3.82906 8.61003 3.96979 8.4693C4.11052 8.32857 4.30139 8.24951 4.50042 8.24951C4.69944 8.24951 4.89031 8.32857 5.03104 8.4693L12.0004 15.4396L18.9698 8.4693C19.0395 8.39962 19.1222 8.34435 19.2132 8.30663C19.3043 8.26892 19.4019 8.24951 19.5004 8.24951C19.599 8.24951 19.6965 8.26892 19.7876 8.30663C19.8786 8.34435 19.9614 8.39962 20.031 8.4693C20.1007 8.53899 20.156 8.62171 20.1937 8.71276C20.2314 8.8038 20.2508 8.90138 20.2508 8.99993C20.2508 9.09847 20.2314 9.19606 20.1937 9.2871C20.156 9.37815 20.1007 9.46087 20.031 9.53055Z"
                fill="#F56600"
              />
            </svg>
            <select
              ref={selectRef}
              onChange={(e) => setSelectedPage(Number(e.target.value))}
              value={selectedPage}
              className={clsx(
                'top-0 left-0 opacity- cursor-pointer appearance-none',
                'w-[83px] flex items-center justify-between bg-lightGrey rounded-[4px] pl-[16px] pr-[8px] h-[48px] mr-[9px] focus:outline-lavender',
                'text-lavender font-codec-extra-bold text-[18px] leading-[27px]',
              )}
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <option value={index + 1} key={index}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <span className={clsx('inline-block mr-[17px]')}>of {totalPages}</span>

        {generateButtonUrl && (
          <Link
            href={generateButtonUrl(selectedPage)}
            className={clsx(
              currentPage == selectedPage && 'opacity-50 pointer-events-none',
            )}
          >
            <Button label="Go" className={clsx('!bg-lavender text-white!')} />
          </Link>
        )}
      </div>

      {nextUrl && (
        <Link
          href={nextUrl}
          className={clsx(
            currentPage == totalPages && 'opacity-50 pointer-events-none',
            'hidden md:block',
          )}
        >
          <Button label="next" className={clsx('!bg-lavender text-white!')} />
        </Link>
      )}
    </div>
  )
}

export default Pagination
