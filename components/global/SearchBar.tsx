import { clsx } from 'clsx'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SearchBar = ({
  setMenuOpen,
  setCloseInitiated,
  setMenuButtonOpen,
}: {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCloseInitiated?: React.Dispatch<React.SetStateAction<boolean>>
  setMenuButtonOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [search, setSearch] = useState('')

  const router = useRouter()
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCloseInitiated && setCloseInitiated(true)
    setSearch('')
    router.push(`/search?q=${encodeURIComponent(search)}`)
  }

  return (
    <form
      className={clsx('lg:grid-cols-12 lg:grid lg:gap-x-[24px]')}
      onSubmit={handleSearch}
    >
      <div className={clsx('relative', 'lg:col-span-6')}>
        <input
          type={'text'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={'Search'}
          className={clsx(
            'w-full pb-[17px] pt-[21px] bg-[#D9D9D9]/20 rounded-[4px] pl-[17px] text-black placeholder:text-black font-codec-bold text-[16px] leading-[14.4px] focus:outline-lavender',
            'lg:rounded-[8px] lg:pl-[26px] py-[24px]',
          )}
        />
        <button
          disabled={search.length === 0}
          className={clsx('block')}
          type="submit"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
              'absolute right-[13px] top-[50%] translate-y-[-50%]',
              'lg:w-[28px] lg:h-[28px] lg:right-[18px]',
            )}
          >
            <path
              d="M16.8721 16.0415L13.1931 12.3633C14.2594 11.0831 14.7911 9.44112 14.6776 7.77889C14.5641 6.11666 13.8142 4.56218 12.5838 3.4388C11.3534 2.31543 9.73722 1.70967 8.07156 1.74752C6.40589 1.78538 4.81894 2.46394 3.64083 3.64205C2.46272 4.82016 1.78416 6.40711 1.7463 8.07278C1.70845 9.73844 2.31421 11.3546 3.43758 12.585C4.56096 13.8154 6.11544 14.5654 7.77767 14.6789C9.4399 14.7923 11.0819 14.2606 12.3621 13.1943L16.0403 16.8733C16.0949 16.9279 16.1598 16.9712 16.2311 17.0008C16.3025 17.0303 16.3789 17.0455 16.4562 17.0455C16.5334 17.0455 16.6099 17.0303 16.6813 17.0008C16.7526 16.9712 16.8174 16.9279 16.8721 16.8733C16.9267 16.8187 16.97 16.7538 16.9996 16.6825C17.0291 16.6111 17.0443 16.5346 17.0443 16.4574C17.0443 16.3802 17.0291 16.3037 16.9996 16.2323C16.97 16.161 16.9267 16.0961 16.8721 16.0415ZM2.93649 8.22803C2.93649 7.1817 3.24677 6.15887 3.82807 5.28889C4.40938 4.4189 5.23561 3.74083 6.20229 3.34042C7.16897 2.94001 8.23268 2.83524 9.2589 3.03937C10.2851 3.2435 11.2278 3.74735 11.9676 4.48721C12.7075 5.22708 13.2113 6.16972 13.4155 7.19594C13.6196 8.22216 13.5148 9.28586 13.1144 10.2525C12.714 11.2192 12.0359 12.0455 11.1659 12.6268C10.296 13.2081 9.27313 13.5183 8.22681 13.5183C6.82421 13.5168 5.4795 12.9589 4.48771 11.9671C3.49592 10.9753 2.93805 9.63063 2.93649 8.22803Z"
              fill="#3C1053"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchBar
