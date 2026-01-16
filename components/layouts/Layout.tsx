import { CustomHead } from './CustomHead'
import { clsx } from 'clsx'
import Footer from '@/components/global/Footer'

export function Layout({
  children,
  seo = {
    title: '',
    description: '',
    image: '',
    keywords: '',
    jsonLD: '',
  },
  noIndex,
}: {
  children: React.ReactNode
  seo?: {
    title: string
    description: string
    image: string
    keywords: string
    jsonLD?: string
  }
  noIndex?: boolean
}) {
  return (
    <div className={clsx('')}>
      <CustomHead {...seo} noIndex={noIndex} />
      {children}
      <Footer />
    </div>
  )
}
