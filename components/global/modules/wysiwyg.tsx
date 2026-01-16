import { WysiwygType } from '@/types/sanity'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import { WysiwygComponents } from '@/lib/portabletTextComponents'

const Wysiwyg = ({ data }: { data: WysiwygType }) => {
  return (
    <section
      className={clsx(
        'px-0 py-[44px] flex flex-col gap-y-[24px] wrap-break-word',
        'lg:py-[105px] lg:px-[48px] lg:gap-y-[24px]',
      )}
    >
      <PortableText
        value={data?.content}
        components={WysiwygComponents as any}
      />
    </section>
  )
}

export default Wysiwyg
