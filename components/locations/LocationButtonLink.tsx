import { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import Link from 'next/link'
import Button from 'components/global/ui/Button'
import { externalOnClick } from 'utils'
import type { PageLinkType } from 'types/sanity'

const LocationButtonLink = ({
  title,
  externalLink,
  link,
  externalLinkOneOff,
}: PageLinkType) => {
  const [href, setHref] = useState('')
  const [target, setTarget] = useState('_self')
  const [showAlert, setShowAlert] = useState(true)

  useEffect(() => {
    if (link?._type) {
      switch (link?._type) {
        case 'post':
          setHref(`/${link?.slug}`)
          break
        case 'homepage':
          setHref('/')
          break
        case 'subPage':
          setHref(`/${link?.slug}`)
          break
        case 'blogHomePage':
          setHref(`/posts/page/1`)
          break
        case 'locationHomePage':
          setHref(`/locations`)
          break
        case 'topic':
          setHref(`/${link?.slug}/1`)
          break
        case 'location':
          setHref(`/${link?.slug}`)
          break
        default:
          setHref('/')
          break
      }
    }
    if (externalLinkOneOff) {
      if (externalLinkOneOff?.link) {
        setHref(externalLinkOneOff.link)
      }
      if (externalLinkOneOff?.openInNewTab) {
        setTarget('_blank')
      }
      setShowAlert(externalLinkOneOff?.showPdfPageLeaveAlert)
    }

    if (externalLink?.externalLink) {
      setHref(externalLink.externalLink)
      if (externalLink?.openInNewTab) {
        setTarget('_blank')
      }
      setShowAlert(externalLink?.showPdfPageLeaveAlert)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!externalLink && !link && !externalLinkOneOff?.link) return null

  return link?._type ? (
    <Link href={href} className={clsx('w-fit')}>
      <Button label={title} className="!bg-lavender text-white" />
    </Link>
  ) : (
    <a
      href={href}
      target={target}
      className={clsx('w-fit')}
      onClick={(e) => externalOnClick(e, href, showAlert)}
    >
      <Button label={title} className="!bg-lavender text-white" />
    </a>
  )
}
export default LocationButtonLink
