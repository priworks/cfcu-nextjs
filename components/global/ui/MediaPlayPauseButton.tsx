import { clsx } from 'clsx'
import { stegaClean } from '@sanity/client/stega'
import PlayPause from 'components/global/ui/PlayPause'
import type { Media } from 'types/sanity'

interface MediaPlayPauseButtonProps {
  media: Media
  isPlaying: boolean
  onToggle: () => void
  className?: string
  classNameMobile?: string
}

export default function MediaPlayPauseButton({
  media,
  isPlaying,
  onToggle,
  className,
  classNameMobile,
}: MediaPlayPauseButtonProps) {
  const hasDesktopVideo = stegaClean(media?.mediaType) === 'video'

  const hasMobileVideo =
    (media?.mobileOverrideEnabled &&
      stegaClean(media?.mobileMediaType) === 'video') ||
    (!media?.mobileOverrideEnabled && stegaClean(media?.mediaType) === 'video')

  if (!hasDesktopVideo && !hasMobileVideo) {
    return null
  }

  return (
    <>
      {/* Desktop play/pause button */}
      {hasDesktopVideo && (
        <button
          className={clsx(
            className ||
              'absolute !right-[16px] !bottom-[16px] !top-[unset] !left-[unset] z-[10] !w-fit !h-fit hidden lg:!right-[36px] lg:!bottom-[36px] lg:block',
          )}
          onClick={onToggle}
        >
          <PlayPause isPlaying={isPlaying} />
        </button>
      )}
      {/* Mobile play/pause button */}
      {hasMobileVideo && (
        <button
          className={clsx(
            classNameMobile ||
              'absolute !right-[16px] !bottom-[16px] !top-[unset] !left-[unset] z-[10] !w-fit !h-fit lg:hidden',
          )}
          onClick={onToggle}
        >
          <PlayPause isPlaying={isPlaying} />
        </button>
      )}
    </>
  )
}
