import { clsx } from 'clsx'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import PageLink from 'components/global/ui/PageLink'
import type { ImageAsset } from 'sanity'
import type { PageLinkType } from 'types/sanity'

/**
 * LowerFooterIcon Component
 *
 * Renders an icon in the lower footer section with optional link functionality.
 * If a link is provided, the icon will be wrapped in a PageLink component.
 * Otherwise, it renders as a standalone image.
 *
 * @param {Object} props - Component props
 * @param {Object} props.value - Icon configuration object
 * @param {ImageAsset} props.value.icon - The Sanity image asset to display
 * @param {PageLinkType} [props.value.link] - Optional link data for making the icon clickable
 *
 * @returns {JSX.Element} Either a linked or standalone image element
 */
const LowerFooterIcon = ({
  value,
}: {
  value: {
    icon: ImageAsset
    link?: PageLinkType
  }
}) => {
  // Configure image properties for Next.js Image component
  const imageProps = {
    // Generate optimized image URL from Sanity, fallback to empty string if no icon
    src: value?.icon ? urlForImage(value?.icon).quality(100).url() : '',
    // Use alt text from Sanity or fallback to empty string for accessibility
    alt: value.icon?.alt as string,
    // Set quality to maximum (100) for footer branding icons
    quality: 100,
    // Define intrinsic dimensions for proper image loading
    width: 200,
    height: 200,
    // Apply responsive styling classes for consistent footer icon display
    className: clsx('h-[65px] object-contain flex-shrink w-fit'),
  }

  // Create the image element to be reused in both conditional branches
  const imageElement = <Image {...imageProps} />

  // Conditionally wrap image in PageLink if link data exists
  // This allows icons to be clickable when configured in Sanity
  return value.link ? (
    <PageLink data={value.link}>{imageElement}</PageLink>
  ) : (
    imageElement
  )
}

export default LowerFooterIcon
