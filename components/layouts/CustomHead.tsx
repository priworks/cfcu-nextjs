// import { NextSeo } from 'next-seo'
import NextHead from 'next/head'
import { urlForImage } from '@/lib/sanity.image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
//SETUP GUIDE:
//Replace **Business with the correct detials.
//Ensure NODE_ENV is set to development during the build.
//Switch to production on Go live.

//Use Favicon.io to generate all required favicon files
export function CustomHead({
  title,
  description,
  image,
  keywords,
  jsonLD,
  twitter = { handle: '@**Business' },
  noIndex,
}: {
  title: string
  description: string
  image: string
  keywords: string
  jsonLD?: string
  twitter?: { handle: string }
  noIndex?: boolean
}) {
  //Replace with the default OG image
  const defaultOGImage =
    'https://cdn.sanity.io/images/uq2qrg8z/production/292b9d74cd91c7064c06ea5f211a8a8f54c5758a-1200x630.png'

  const defaultDescription =
    'At Community Financial, we value belonging over banking. How better to create belonging than by investing in the communities where we live, play, and serve?'

  const router = useRouter()
  const canonicalUrl = `https://www.cfcu.org${router.asPath}`

  return (
    <>
      <NextHead>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="robots"
          content={!noIndex ? 'index, follow' : 'noindex, nofollow'}
        />
        <meta
          name="googlebot"
          content={!noIndex ? 'index, follow' : 'noindex, nofollow'}
        />
        {/* <meta
          name="keywords"
          content={keywords && keywords.length ? keywords.join(',') : keywords}
        /> */}
        <meta name="author" content="Community Financial" />
        <meta name="referrer" content="no-referrer" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="US" />
        <meta name="twitter:creator" content="Community Financial" />
        <meta name="twitter:title" content={title || 'Community Financial'} />
        <meta name="twitter:description" content={description || ''} />
        <meta name="theme-color" content="#FAFAFA" />

        <meta
          name="twitter:image"
          content={image ? urlForImage(image).url() : defaultOGImage}
        />
        <link rel="canonical" href={canonicalUrl} />
        {/* START FAVICON */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="icon" href="/favicon/favicon-32x32.png" />
        {/* END FAVICON */}

        <title>{title}</title>
        {jsonLD && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
          />
        )}
      </NextHead>
      {/* @todo: Update NextSeo Component */}
      {/* <NextSeo
        title={title}
        description={description || defaultDescription}
        noindex={noIndex}
        openGraph={{
          title,
          description: description || defaultDescription,
          type: 'website',
          locale: 'en_US',
          images: [
            {
              url: image ? urlForImage(image).url() : defaultOGImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
          defaultImageWidth: 1200,
          defaultImageHeight: 630,
          site_name: 'cfcu',
        }}
        twitter={{
          handle: twitter.handle,
          cardType: 'summary_large_image',
          site: 'https://www.cfcu.org/',
        }}
      /> */}
    </>
  )
}
