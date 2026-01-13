'use client'

import type React from 'react'

import { liteClient as algoliasearch } from 'algoliasearch/lite'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Pagination from './pagination' // Adjust the import path as needed
import FormattedTextField from 'components/interaction/formattedTextField'

export function Search() {
  const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!
  const algoliaApiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!

  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const resultsPerPage = 10
  const searchClient = algoliasearch(algoliaAppId, algoliaApiKey)

  // Function to perform the actual search
  const performSearch = async (searchQuery: string, page = 1) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setSearchTerm(searchQuery)
    setHasSearched(true)
    setCurrentPage(page)

    try {
      const { results } = await searchClient.search({
        requests: [
          {
            indexName,
            query: searchQuery.trim(),
            hitsPerPage: resultsPerPage,
            page: page - 1, // Algolia uses 0-based indexing
            attributesToRetrieve: [
              'title',
              'slug',
              'thumbnailImage',
              'thumbnailImageAlt',
              'address',
              'phoneNumber',
              'services',
              'excerpt',
              'type',
              'metaTitle',
              'metaDescription',
              '_type',
              '_id',
            ],
          },
        ],
      })
      const searchResult = results[0]
      //@ts-ignore
      setResults(searchResult?.hits || [])

      //@ts-ignore
      setTotalResults(searchResult?.nbHits || 0)
      //@ts-ignore
      setTotalPages(Math.ceil((searchResult?.nbHits || 0) / resultsPerPage))
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
      setTotalResults(0)
      setTotalPages(0)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle form submission
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    const newPage = 1

    // Use replace instead of push to avoid navigation issues
    router.replace(
      `/search?q=${encodeURIComponent(query)}&page=${newPage}`,
      undefined,
      { shallow: true },
    )

    await performSearch(query, newPage)
  }

  // Generate URL for pagination buttons
  const generateButtonUrl = (page: number) => {
    return `/search?q=${encodeURIComponent(searchTerm)}&page=${page}`
  }

  // Effect to handle URL parameter changes and initial load
  useEffect(() => {
    if (router.isReady) {
      const urlQuery = router.query.q as string
      const urlPage = Number.parseInt(router.query.page as string) || 1

      if (urlQuery) {
        setQuery(urlQuery)
        performSearch(urlQuery, urlPage)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.q, router.query.page])

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
          src={'/images/defaultSubPage.png'}
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className={clsx(
                'w-full font-codec-bold text-black bg-none focus:outline-none',
              )}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className={clsx(
                'w-[50px] h-[52px] bg-orange flex items-center justify-center rounded-[6px] flex-shrink-0',
                'hover:opacity-80 transition-opacity duration-200',
                isLoading && 'opacity-70',
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

      {hasSearched && (
        <section
          className={clsx(
            'max-w-[888px] mt-[40px] mb-[68px] mx-auto px-[24px]',
            'lg:mt-[61px] lg:mb-[83px] lg:px-[0px]',
          )}
        >
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lavender"></div>
            </div>
          ) : (
            <>
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
                  &apos;{searchTerm}&apos;
                </span>
              </p>

              {results.length > 0 ? (
                <ul className={clsx('mt-[68px]', 'lg:mt-[40px]')}>
                  {results.map((result) => (
                    <li
                      key={result.objectID}
                      className={clsx(
                        'py-[28px] border-t-[1px] border-t-black/10',
                      )}
                    >
                      <Link
                        href={createSlug(result.type, result?.slug)}
                        className={clsx('group')}
                      >
                        <h3
                          className={clsx(
                            'w-h6 group-hover:opacity-80 transition-opacity duration-200',
                            'text-lavender lg:text-[38px] lg:leading-[41.8px] font-codec-extra-bold ',
                          )}
                        >
                          <FormattedTextField
                            text={result.title || result.metaTitle}
                          />
                        </h3>
                        {(result.metaDescription ||
                          result._type === 'subPage') && (
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
                <p className="text-gray-600 mt-[16px] text-center py-8">
                  No results found for &quot;{searchTerm}&quot;. Try different
                  keywords.
                </p>
              )}
            </>
          )}
        </section>
      )}

      {hasSearched && !isLoading && totalPages > 1 && (
        <div
          className={clsx(
            'px-[24px]',
            'lg:px-[48px] lg:max-w-[1800px] mx-auto',
            'xl:px-[0px]',
          )}
        >
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            searchQuery={searchTerm}
            generateButtonUrl={generateButtonUrl}
          />
        </div>
      )}
    </div>
  )
}
