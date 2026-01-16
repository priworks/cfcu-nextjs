import React from 'react'
import { SubPageType } from '@/types/sanity'
import { clsx } from 'clsx'

import Link from 'next/link'
import ModuleFactory from '@/components/global/modules/ModuleFactory'
import SubpageLinkList from '@/components/global/ui/SubpageLinkList'
import SubPageHero from '@/components/global/modules/subPageHero'

import { renderModule } from '@/components/global/modules/ModuleFactory'

const SubPage = ({
  data,
  childrenPages,
}: {
  data: SubPageType
  childrenPages?: SubPageType[]
}) => {
  const siteAlerts = data?.modules?.filter(
    //@ts-ignore
    (module) => module?._type === 'siteAlert',
  )

  return (
    <main>
      {siteAlerts?.map((module, index) => (
        <React.Fragment key={`site-alert-${index}`}>
          {renderModule(module)}
        </React.Fragment>
      ))}
      <SubPageHero data={data?.pageHero} parent={data?.parent} />
      <div className="flex flex-col">
        {childrenPages && childrenPages.length > 0 && (
          <SubpageLinkList data={childrenPages} />
        )}
      </div>
      {data?.modules && <ModuleFactory modules={data?.modules || []} />}
    </main>
  )
}

export default SubPage
