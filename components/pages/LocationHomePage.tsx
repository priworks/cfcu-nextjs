import LocationGrid from '@/components/locations/LocationGrid'
import LocationHomeHero from '@/components/locations/LocationHomeHero'
import React from 'react'
import {
  LocationHomepageType,
  LocationPage,
  GlobalSettingsType,
  ATMLocation,
} from '@/types/sanity'
import LocationMap from '@/components/locations/LocationMap'
import { clsx } from 'clsx'
import ModuleFactory from '../global/modules/ModuleFactory'
import { renderModule } from '../global/modules/ModuleFactory'

const LocationHomePage = ({
  data,
  allLocations,
  globalSettings,
  atmLocations,
}: {
  data: LocationHomepageType
  allLocations: LocationPage[]
  globalSettings: GlobalSettingsType
  atmLocations: ATMLocation[]
}) => {
  const siteAlerts = data?.modules?.filter(
    //@ts-ignore
    (module) => module?._type === 'siteAlert',
  )

  return (
    <main className={clsx('overflow-hidden')}>
      {siteAlerts?.map((module, index) => (
        <React.Fragment key={`site-alert-${index}`}>
          {renderModule(module)}
        </React.Fragment>
      ))}
      <LocationHomeHero data={data?.pageHero} />
      <LocationMap locations={allLocations} atmLocations={atmLocations} />
      <LocationGrid data={allLocations} />
      {data?.modules?.length > 0 && <ModuleFactory modules={data?.modules} />}
    </main>
  )
}

export default LocationHomePage
