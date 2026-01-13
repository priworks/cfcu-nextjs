import { useState, useEffect, use } from 'react'
import { SearchResult } from 'types/sanity'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { clsx } from 'clsx'
import Image from 'next/image'
import defualtSubPageHero from 'public/images/defaultSubPage.png'
import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import { GlobalSettingsType } from 'types/sanity'
import FormattedTextField from 'components/interaction/formattedTextField'

const SearchResultsPage = ({
  initialQuery,
  results,
  globalSettings,
  totalResults,
  currentPage,
  totalPages,
}: {
  initialQuery: string
  results: SearchResult[]
  globalSettings: GlobalSettingsType
  totalResults: number
  currentPage: number
  totalPages: number
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }
  const setGlobalSettings = useGlobalSettingsStore(
    (state) => state.setGlobalSettings,
  )

  useEffect(() => {
    setGlobalSettings(globalSettings)
  }, [setGlobalSettings, globalSettings])

  function createSlug(_type: string, slug?: string) {
    let generatedSlug = ''

    switch (_type) {
      case 'subPage':
        generatedSlug = `/${slug}`
        break
      case 'rates':
        generatedSlug = `/${slug}`
        break
      case 'location':
        generatedSlug = `/${slug}`
        break
      case 'homepage':
        generatedSlug = `/`
        break
      case 'post':
        generatedSlug = `/${slug}`
        break
      default:
        generatedSlug = `/`
    }
    return generatedSlug
  }

  //TODO once we know what to display here.
  function generateExcerpt(SearchResult: any) {
    let excerpt = ''
  }

  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  return (
    <div>
      <section
        className={clsx(
          'relative px-[24px] pt-[24px] pb-[45px]',
          'lg:h-[650px]',
        )}
      >
        <Link
          href={'/'}
          className={clsx(
            'block relative z-[3]',
            'lg:absolute lg:top-[48px] lg:left-[48px]',
          )}
        >
          <Image
            src={'/icons/LogoFull.png'}
            alt={'Community Financial Logo'}
            width={500}
            height={108}
            className={clsx('w-[212px]', 'lg:w-[244.71px]')}
          />
        </Link>
        <Image
          src={defualtSubPageHero}
          alt={'origami'}
          fill
          priority
          className={clsx('object-cover w-full h-full absolute top-0 left-0 ')}
        />
        <div
          className={clsx(
            'relative z-[2] max-w-[888px] mx-auto pt-[111px]',
            'lg:pt-[275px]',
          )}
        >
          <h1
            className={clsx(
              'w-h1 text-white mb-[27px]',
              'lg:text-[90px] lg:leading-[99px] font-codec-heavy lg:text-center lg:mb-[33px]',
            )}
          >
            Search CFCU
          </h1>
          <form
            onSubmit={handleSearch}
            className={clsx(
              'pl-[20px]',
              'relative lg:pl-[25px] pr-[5px] pt-[5px] pb-[5px] rounded-[8px] bg-white flex',
            )}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className={clsx(
                'w-full font-codec-bold text-black bg-none focus:outline-none',
              )}
            />
            <button
              type="submit"
              className={clsx(
                'w-[50px] h-[52px] bg-orange flex items-center justify-center rounded-[6px] flex-shrink-0',
                'hover:opacity-80 transition-opacity duration-200',
              )}
            >
              <svg
                width="29"
                height="30"
                viewBox="0 0 29 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.8391 25.1727L20.2049 19.5396C21.8379 17.579 22.6522 15.0644 22.4784 12.5187C22.3046 9.97307 21.1561 7.59242 19.2717 5.87201C17.3874 4.1516 14.9123 3.22389 12.3614 3.28186C9.81046 3.33983 7.38009 4.37903 5.57585 6.18327C3.77161 7.98751 2.73241 10.4179 2.67444 12.9688C2.61646 15.5197 3.54418 17.9948 5.26459 19.8791C6.985 21.7635 9.36565 22.912 11.9113 23.0858C14.457 23.2596 16.9716 22.4453 18.9322 20.8123L24.5653 26.4465C24.6489 26.5302 24.7482 26.5965 24.8575 26.6418C24.9668 26.687 25.0839 26.7103 25.2022 26.7103C25.3205 26.7103 25.4376 26.687 25.5469 26.6418C25.6562 26.5965 25.7555 26.5302 25.8391 26.4465C25.9227 26.3629 25.9891 26.2636 26.0344 26.1543C26.0796 26.045 26.1029 25.9279 26.1029 25.8096C26.1029 25.6913 26.0796 25.5742 26.0344 25.4649C25.9891 25.3557 25.9227 25.2564 25.8391 25.1727ZM4.49718 13.2066C4.49718 11.6042 4.97236 10.0377 5.86261 8.70536C6.75287 7.373 8.01822 6.33455 9.49866 5.72133C10.9791 5.10811 12.6081 4.94767 14.1798 5.26028C15.7514 5.5729 17.195 6.34454 18.3281 7.47762C19.4612 8.6107 20.2328 10.0543 20.5454 11.626C20.8581 13.1976 20.6976 14.8266 20.0844 16.3071C19.4712 17.7875 18.4327 19.0529 17.1004 19.9431C15.768 20.8334 14.2016 21.3085 12.5991 21.3085C10.4511 21.3062 8.39172 20.4518 6.87283 18.9329C5.35393 17.414 4.49957 15.3546 4.49718 13.2066Z"
                  fill="#3C1053"
                />
              </svg>
            </button>
          </form>
        </div>
      </section>
      <section
        className={clsx(
          'max-w-[888px] mt-[40px] mb-[68px] mx-auto px-[24px]',
          'lg:mt-[61px] lg:mb-[83px] lg:px-[0px]',
        )}
      >
        <p
          className={clsx(
            'text-black text-[16px] leading-[14.4px] font-codec-bold',
          )}
        >
          Showing{' '}
          <span className={clsx('text-lavender font-codec-heavy')}>
            {totalResults}
          </span>{' '}
          results for{' '}
          <span className={clsx('text-lavender font-codec-heavy')}>
            &apos;{initialQuery}&apos;
          </span>
        </p>
        {results.length > 0 ? (
          <ul className={clsx('mt-[68px]', 'lg:mt-[40px]')}>
            {results.map((result) => (
              <li
                key={result._id}
                className={clsx('py-[28px] border-t-[1px] border-t-black/10')}
              >
                <Link
                  href={createSlug(result._type, result?.slug?.current)}
                  className={clsx('group')}
                >
                  <h3
                    className={clsx(
                      'w-h6 group-hover:opacity-80 transition-opacity duration-200',
                      'text-lavender lg:text-[38px] lg:leading-[41.8px] font-codec-extra-bold ',
                    )}
                  >
                    <FormattedTextField text={result.metaTitle} />
                  </h3>
                  {result.metaDescription && (
                    <p
                      className={clsx(
                        'w-paragraph-s-desktop mt-[16px] text-black/75 mb-[28px]',
                        'lg:w-paragraph-l-desktop lg:mb-[0px]',
                      )}
                    >
                      <FormattedTextField text={result.metaDescription} />
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-[16px]">No results found.</p>
        )}
      </section>
    </div>
  )
}

export default SearchResultsPage
