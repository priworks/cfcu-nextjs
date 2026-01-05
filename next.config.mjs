import { createClient } from 'next-sanity'

/** @type {import('next').NextConfig} */
const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
    ],
    dangerouslyAllowSVG: true,
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  async redirects() {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: '2021-03-25',
      useCdn: false,
    })

    const sanityRedirects = await client.fetch(`*[_type == "redirects"]{
    ...,
  }`)
    const sanitySortedRedirects = sanityRedirects[0]?.redirects
      .filter((redirect) => {
        // Filter out /go.php?bid= redirects (handled by middleware)
        const isGoPhpBidRedirect = redirect.source.startsWith('/go.php?bid=')

        if (isGoPhpBidRedirect) {
          console.log(
            `Excluding from redirects (handled by middleware): ${redirect.source}`,
          )
          return false
        }

        return true
      })
      .map((redirect) => {
        let source = redirect.source

        // Strip query params from other redirects
        if (source.includes('?')) {
          const originalSource = source
          source = source.split('?')[0]
          console.log(
            `Stripped query params: "${originalSource}" → "${source}"`,
          )
        }

        return {
          source,
          destination: redirect.destination,
          permanent: redirect.permanent,
        }
      })
    return [
      {
        source: '/posts/topic/:slug/1',
        destination: '/posts/topic/:slug',
        permanent: true,
      },
      ...(sanitySortedRedirects || []),
      {
        source: '/blog/:path*',
        destination: '/posts',
        permanent: true,
      },
      {
        source: '/press/:path*',
        destination: '/posts',
        permanent: true,
      },
    ]
  },
}
export default config
