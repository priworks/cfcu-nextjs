import '@/styles/global.css'

import { AppProps } from 'next/app'
import { lazy } from 'react'
import { clsx } from 'clsx'
import { urlForImage } from '@/lib/sanity.image'
import Image from 'next/image'
import Header from '@/components/global/Header'
import { SplitText } from 'gsap/dist/SplitText'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { gsap } from 'gsap'

gsap.registerPlugin(SplitText, ScrollTrigger)
import {
  CodecPro,
  CodecProBold,
  CodecExtraBold,
  CodecNews,
  CodecFat,
  CodecHeavy,
  CodecRegular,
  CodecUltra,
  CodecLight,
} from '@/font'
import GlobalErrorBoundary from '@/components/global/GlobalErrorBoundary'
export interface SharedPageProps {
  draftMode: boolean
  token: string
}

export interface Seo {
  title: string
  description: string
  image: string
  keywords: string
}

export const myWysiwygComponentsWithoutPadding = {
  types: {
    image: ({ value }: { value: any }) => (
      <Image
        src={urlForImage(value).quality(80).width(2440).url()}
        alt={String(value.alt)}
        width={2440}
        height={2440}
        className={clsx('my-[22px] ')}
      />
    ),
  },
}

const PreviewProvider = lazy(() => import('@/components/PreviewProvider'))

export default function App({ Component, pageProps }: AppProps) {
  const { draftMode, token } = pageProps
  return (
    <GlobalErrorBoundary>
      <div
        className={clsx(
          'antialiased font-codec-pro relative',
          CodecPro.variable,
          CodecProBold.variable,
          CodecExtraBold.variable,
          CodecNews.variable,
          CodecFat.variable,
          CodecHeavy.variable,
          CodecRegular.variable,
          CodecUltra.variable,
          CodecLight.variable,
        )}
      >
        <Header />
        {draftMode ? (
          <PreviewProvider token={token}>
            <Component {...pageProps} />
          </PreviewProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </GlobalErrorBoundary>
  )
}
