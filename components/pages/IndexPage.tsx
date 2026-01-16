import { HomepageType, GlobalSettingsType } from '@/types/sanity'
import { clsx } from 'clsx'
import Hero from '@/components/home/Hero'
import EmotionalNavigation from '@/components/home/EmotionalNavigation'
import ModuleFactory from '@/components/global/modules/ModuleFactory'
import Footer from '@/components/global/Footer'
import React from 'react'
import { renderModule } from '@/components/global/modules/ModuleFactory'
export default function Page({
  globalSettings,
  homepage,
}: {
  globalSettings: GlobalSettingsType
  homepage: HomepageType
}) {
  const siteAlerts = homepage?.homepageModules?.filter(
    //@ts-ignore
    (module) => module?._type === 'siteAlert',
  )
  return (
    <main className={clsx('bg-white')}>
      <div className={clsx('bg-lavender')}>
        {siteAlerts?.map((module, index) => (
          <React.Fragment key={`site-alert-${index}`}>
            {renderModule(module)}
          </React.Fragment>
        ))}
        <Hero data={homepage?.hero} />
        <EmotionalNavigation data={homepage?.emotionalNavigation} />
      </div>
      {homepage?.homepageModules && (
        <ModuleFactory modules={homepage?.homepageModules} />
      )}
    </main>
  )
}
