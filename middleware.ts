// middleware.js
import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

let goPhpRedirectsCache: any = null
let lastFetch = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function getGoPhpRedirects() {
  const now = Date.now()

  if (goPhpRedirectsCache && now - lastFetch < CACHE_DURATION) {
    return goPhpRedirectsCache
  }

  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: '2021-03-25',
      useCdn: false,
    })

    const sanityRedirects = await client.fetch(`*[_type == "redirects"]{
      ...,
    }`)

    const goPhpRedirects: Record<
      string,
      { destination: string; permanent: boolean }
    > = {}

    sanityRedirects[0].redirects.forEach((redirect: any) => {
      if (redirect.source.startsWith('/go.php?bid=')) {
        const bidMatch = redirect.source.match(/bid=(\d+)/)
        if (bidMatch) {
          const bidValue = bidMatch[1]
          goPhpRedirects[bidValue] = {
            destination: redirect.destination,
            permanent: redirect.permanent,
          }
        }
      }
    })

    goPhpRedirectsCache = goPhpRedirects
    lastFetch = now

    return goPhpRedirects
  } catch (error) {
    console.error('Error fetching /go.php redirects in middleware:', error)
    return goPhpRedirectsCache || {}
  }
}

export async function middleware(request: any) {
  const url = request.nextUrl.clone()

  if (url.pathname === '/go.php') {
    const bid = url.searchParams.get('bid')

    if (bid) {
      const goPhpRedirects = await getGoPhpRedirects()

      if (goPhpRedirects[bid]) {
        const statusCode = goPhpRedirects[bid].permanent ? 308 : 307

        // Fix: Create absolute URL for redirect
        let destination = goPhpRedirects[bid].destination

        // If destination is relative, make it absolute
        if (destination.startsWith('/')) {
          destination = new URL(destination, request.url).toString()
        }

        console.log(`Redirecting /go.php?bid=${bid} to ${destination}`)
        return NextResponse.redirect(destination, statusCode)
      }
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/go.php',
}
