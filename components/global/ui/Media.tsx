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

export default function MediaComponent({
  media,
  isPlaying,
  priority,
  isSubHero,
  isCtaContent,
}: MediaComponentProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoPlayerRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoPlayerRef.current) return
    if (isPlaying) {
      videoPlayerRef.current?.play()
    } else {
      videoPlayerRef.current?.pause()
    }
  }, [isPlaying])

  if (stegaClean(media?.mediaType) === 'image' && media?.image) {
    if (media?.mobileImage) {
      return (
        <>
          <Image
            //@ts-ignore
            src={urlForImage(media?.image)
              .height(1080)
              .width(1920)
              .quality(100)
              .url()}
            //@ts-ignore
            alt={media?.image?.alt}
            width={1920}
            height={1080}
            quality={100}
            priority={priority}
            onLoad={(event) =>
              (event.target as HTMLImageElement).classList.remove('opacity-0')
            }
            className={clsx(
              'object-cover w-full h-full hidden',
              'opacity-0 transition-all duration-300 ease-in-out-cubic ',
              isSubHero ? 'min-[500px]:block' : 'lg:block',
            )}
          />
          <Image
            //@ts-ignore
            src={urlForImage(media?.mobileImage).quality(100).url()}
            //@ts-ignore
            alt={media?.mobileImage?.alt}
            width={1948}
            height={isCtaContent ? 1948 : 1080}
            quality={100}
            priority={priority}
            onLoad={(event) =>
              (event.target as HTMLImageElement).classList.remove('opacity-0')
            }
            className={clsx(
              'object-cover w-full h-full ',
              'opacity-0 transition-all duration-300 ease-in-out-cubic ',
              isSubHero ? 'min-[500px]:hidden' : 'lg:hidden',
            )}
          />
        </>
      )
    } else {
      return (
        <Image
          //@ts-ignore
          src={urlForImage(media?.image)
            .height(1080)
            .width(1920)
            .quality(100)
            .url()}
          //@ts-ignore
          alt={media?.image?.alt}
          width={1920}
          height={1080}
          quality={100}
          priority={priority}
          onLoad={(event) =>
            (event.target as HTMLImageElement).classList.remove('opacity-0')
          }
          className={clsx(
            'object-cover w-full h-full',
            'opacity-0 transition-all duration-300 ease-in-out-cubic',
          )}
        />
      )
    }
  } else if (stegaClean(media?.mediaType) === 'video' && media?.video) {
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
            src={urlForFile(media?.video?.asset?._ref)}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* {media?.video?.caption && (
          <figcaption
            className={clsx('w-paragraph-s-desktop text-black/75 mt-[8px]')}
          >
            {media?.video?.caption}
          </figcaption>
        )} */}
      </figure>
    )
  }
  return <div></div>
}
