//@ts-nocheck

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import type { Media } from 'types/sanity'
import { urlForImage } from 'lib/sanity.image'
import { urlForFile } from 'lib/sanity.file'
import { clsx } from 'clsx'
import { stegaClean } from '@sanity/client/stega'
import { SanityImage } from 'sanity-image'
import { useNextSanityImage } from 'next-sanity-image'
import { getClient } from '@/lib/sanity.client'

interface MediaComponentProps {
  media: Media
  isPlaying?: boolean
  priority?: boolean
  isSubHero?: boolean
  isCtaContent?: boolean
}

// Helper to determine what media to show on mobile
function getMobileMedia(media: Media) {
  const hasMobileOverride =
    media?.mobileOverrideEnabled &&
    media?.mobileMediaType &&
    ((stegaClean(media?.mobileMediaType) === 'image' && media?.mobileImage) ||
      (stegaClean(media?.mobileMediaType) === 'video' && media?.mobileVideo))

  if (hasMobileOverride) {
    return {
      type: stegaClean(media.mobileMediaType),
      image: media.mobileImage,
      video: media.mobileVideo,
    }
  }

  // Fallback to primary media
  return {
    type: stegaClean(media?.mediaType),
    image: media?.image,
    video: media?.video,
  }
}

// Helper to determine what media to show on desktop
function getDesktopMedia(media: Media) {
  return {
    type: stegaClean(media?.mediaType),
    image: media?.image,
    video: media?.video,
  }
}

export default function MediaComponent({
  media,
  isPlaying,
  priority,
  isSubHero,
  isCtaContent,
}: MediaComponentProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoPlayerRef = useRef<HTMLVideoElement>(null)
  const mobileVideoPlayerRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isPlaying) {
      videoPlayerRef.current?.play()
      mobileVideoPlayerRef.current?.play()
    } else {
      videoPlayerRef.current?.pause()
      mobileVideoPlayerRef.current?.pause()
    }
  }, [isPlaying])

  const desktopMedia = getDesktopMedia(media)
  const mobileMedia = getMobileMedia(media)

  // Check if we need to render separate desktop and mobile elements
  const needsSeparateElements =
    desktopMedia.type !== mobileMedia.type ||
    (desktopMedia.type === 'image' &&
      mobileMedia.type === 'image' &&
      desktopMedia.image !== mobileMedia.image) ||
    (desktopMedia.type === 'video' &&
      mobileMedia.type === 'video' &&
      desktopMedia.video !== mobileMedia.video)

  // Single media element (no mobile override or same media)
  if (!needsSeparateElements) {
    if (desktopMedia.type === 'image' && desktopMedia.image) {
      return (
        <Image
          //@ts-ignore
          src={urlForImage(desktopMedia.image)
            .height(1080)
            .width(1920)
            .quality(100)
            .url()}
          //@ts-ignore
          alt={desktopMedia.image?.alt}
          width={1920}
          height={1080}
          quality={100}
          priority={priority}
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
          className={clsx(
            'object-cover w-full h-full',
            'opacity-0 transition-all duration-300 ease-in-out-cubic',
          )}
        />
      )
    } else if (desktopMedia.type === 'video' && desktopMedia.video) {
      return (
        <figure className={clsx('w-full h-full')}>
          <video
            muted
            playsInline
            autoPlay
            loop
            ref={videoPlayerRef}
            className={clsx('w-full h-full object-cover')}
          >
            <source
              src={urlForFile(desktopMedia.video?.asset?._ref)}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </figure>
      )
    }
    return <div></div>
  }

  // Separate desktop and mobile elements
  return (
    <>
      {/* Desktop media */}
      {desktopMedia.type === 'image' && desktopMedia.image && (
        <Image
          //@ts-ignore
          src={urlForImage(desktopMedia.image)
            .height(1080)
            .width(1920)
            .quality(100)
            .url()}
          //@ts-ignore
          alt={desktopMedia.image?.alt}
          width={1920}
          height={1080}
          quality={100}
          priority={priority}
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
          className={clsx(
            'object-cover w-full h-full hidden',
            'opacity-0 transition-all duration-300 ease-in-out-cubic',
            isSubHero ? 'min-[500px]:block' : 'lg:block',
          )}
        />
      )}
      {desktopMedia.type === 'video' && desktopMedia.video && (
        <figure
          className={clsx(
            'w-full h-full hidden',
            isSubHero ? 'min-[500px]:block' : 'lg:block',
          )}
        >
          <video
            muted
            playsInline
            autoPlay
            loop
            ref={videoPlayerRef}
            className={clsx('w-full h-full object-cover')}
          >
            <source
              src={urlForFile(desktopMedia.video?.asset?._ref)}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </figure>
      )}

      {/* Mobile media */}
      {mobileMedia.type === 'image' && mobileMedia.image && (
        <Image
          //@ts-ignore
          src={urlForImage(mobileMedia.image).quality(100).url()}
          //@ts-ignore
          alt={mobileMedia.image?.alt}
          width={1948}
          height={isCtaContent ? 1948 : 1080}
          quality={100}
          priority={priority}
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
          className={clsx(
            'object-cover w-full h-full',
            'opacity-0 transition-all duration-300 ease-in-out-cubic',
            isSubHero ? 'min-[500px]:hidden' : 'lg:hidden',
          )}
        />
      )}
      {mobileMedia.type === 'video' && mobileMedia.video && (
        <figure
          className={clsx(
            'w-full h-full',
            isSubHero ? 'min-[500px]:hidden' : 'lg:hidden',
          )}
        >
          <video
            muted
            playsInline
            autoPlay
            loop
            ref={mobileVideoPlayerRef}
            className={clsx('w-full h-full object-cover')}
          >
            <source
              src={urlForFile(mobileMedia.video?.asset?._ref)}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </figure>
      )}
    </>
  )
}
