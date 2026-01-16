import React, { useEffect, useState } from 'react'
import { CardLinkType, PageLinkType } from '@/types/sanity'
import Link from 'next/link'
import { clsx } from 'clsx'
import { externalOnClick } from '@/utils'
const CardLink = ({
  data,
  className,
  children,
}: {
  className?: string
  data: CardLinkType
  children: React.ReactNode
}) => {
  const [href, setHref] = useState<string>('')
  useEffect(() => {
    if (!data?.externalLink) {
      switch (data?.link?._type) {
        case 'post':
          setHref(`/${data?.link?.slug}`)
          break
        case 'homepage':
          setHref('/')
          break
        case 'subPage':
          setHref(`/${data?.link?.slug}`)
          break
        case 'blogHomePage':
          setHref(`/posts/page/1`)
          break
        case 'locationHomePage':
          setHref(`/locations`)
          break
        case 'topic':
          setHref(`/${data?.link?.slug}/1`)
          break
        case 'location':
          setHref(`/${data?.link?.slug}`)
          break
        default:
          setHref('/')
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return data?.externalLink ? (
    <a
      href={data?.externalLink?.externalLink}
      target="_blank"
      className={clsx(className)}
      onClick={(e) =>
        externalOnClick(
          e,
          data?.externalLink?.externalLink || '',
          data?.externalLink?.showPdfPageLeaveAlert,
        )
      }
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={clsx(className)}>
      {children}
    </Link>
  )
}

export default CardLink
