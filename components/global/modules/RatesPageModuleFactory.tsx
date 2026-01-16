import React from 'react'
import CTAInContent from './ctaInContent'
import CTATopicRow from './ctaTopicRow'
import CTACardGridHome from './ctaCardGridHome'
import CTACardGrid from './ctaCardGrid'
import CTAText from './ctaText'
import CTAFullMedia from './ctaFullMedia'
import GetInspired from './getInspired'
import TextCardGrid from './textCardGrid'
import SubPageHero from './subPageHero'
import RelatedStories from './RelatedStories'
import Accordion from './Accordion'
import SiteAlert from './siteAlert'
import Tabs from './Tabs'
import ColumnSplit from './columnSplit'
import LogoGrid from './ImageGrid'
import QuickExit from './QuickExit'
import RateTable from './RateTable'

const ModuleFactory = ({ modules }: { modules: any[] }) => {
  const siteAlerts = modules.filter((module) => module._type === 'siteAlert')
  const otherModules = modules.filter((module) => module._type !== 'siteAlert')

  const renderModule = (module: any) => {
    switch (module._type) {
      case 'ctaInContent':
        return <CTAInContent data={module} />
      case 'ctaTopicRow':
        return <CTATopicRow data={module} />
      case 'ctaCardGridHome':
        return <CTACardGridHome data={module} />
      case 'ctaCardGrid':
        return <CTACardGrid data={module} />
      case 'ctaText':
        return <CTAText data={module} />
      case 'ctaFullMedia':
        return <CTAFullMedia data={module} />
      case 'getInspired':
        return <GetInspired data={module} />
      case 'textCardGrid':
        return <TextCardGrid data={module} />
      case 'subPageHero':
        return <SubPageHero data={module} />
      case 'relatedStories':
        return <RelatedStories data={module} />
      case 'accordion':
        return <Accordion data={module} />
      case 'siteAlert':
        return <SiteAlert data={module} />
      case 'tabs':
        return <Tabs data={module} />
      case 'columnSplit':
        return <ColumnSplit data={module} />
      case 'logoGrid':
        return <LogoGrid data={module} />
      // case 'quickExit':
      //   return <QuickExit data={module} />
      case 'rateTable':
        return <RateTable data={module} />
      default:
        return null
    }
  }

  return (
    <>
      {siteAlerts.map((module, index) => (
        <React.Fragment key={`site-alert-${index}`}>
          {renderModule(module)}
        </React.Fragment>
      ))}
      {otherModules.map((module, index) => (
        <React.Fragment key={`module-${index}`}>
          {renderModule(module)}
        </React.Fragment>
      ))}
    </>
  )
}

export default ModuleFactory
