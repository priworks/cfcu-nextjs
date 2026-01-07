'use client'

import { useState, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import { TopicWithRelatedPosts } from '@/types/sanity'
import { useRouter } from 'next/router'

interface Props {
  title: string
  items: TopicWithRelatedPosts[]
  className?: string
}

const CustomSelectButton = ({ title, items, className }: Props) => {
  const [selectedItem, setSelectedItem] = useState('')
  // const filteredTopics = items.filter((item) => item.relatedPosts.length > 0)
  const filteredTopics = items.map((item) => item)
  const router = useRouter()
  const selectRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if (selectedItem) {
      const selectedItemObj = filteredTopics.find(
        (item) => item.name === selectedItem,
      )
      if (selectedItemObj) {
        router.push(`/${selectedItemObj.slug.current}`)
      }
    }
  }, [selectedItem, filteredTopics, router])

  const handleButtonClick = () => {
    selectRef.current?.focus()
    selectRef.current?.click()
  }

  return (
    <div className={clsx('relative mx-auto w-fit', 'lg:w-fit', className)}>
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx('absolute top-[18px] right-[20px] z-2')}
      >
        <path
          d="M8.05273 12.9199H4.55273V8.16211H0V4.78516L4.55273 4.77148L4.53906 0H8.03906L8.05273 4.77148H12.6738V8.16211H8.05273V12.9199Z"
          fill="#3C1053"
        />
      </svg>
      <select
        ref={selectRef}
        className={clsx(
          'block justify-center gap-x-[10px] bg-lightGrey rounded-full w-[182px] px-[20px] py-[10.5px] font-codec-extra-bold text-[18px] leading-[27px] text-lavender appearance-none cursor-pointer focus:outline-lavender',
          'lg:text-left',
        )}
        value={''}
        onChange={(e) => setSelectedItem(e.target.value)}
        aria-label={`Select a ${title}`}
      >
        <option value="" disabled>
          {title}
        </option>
        {filteredTopics.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CustomSelectButton
