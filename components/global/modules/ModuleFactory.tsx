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
import ImageGrid from './ImageGrid'
import QuickExit from './QuickExit'
import Wysiwyg from './wysiwyg'
import TeamGrid from './TeamGrid'
import SanitizedEmbed from './Embed'
import ErrorBoundary from './ErrorBoundary'
import RateTable from './RateTable'

const ModuleFactory = ({ modules }: { modules: any[] }) => {
  if (!modules || modules?.length === 0) return null

  const siteAlerts = modules.filter((module) => module?._type === 'siteAlert')
  const otherModules = modules.filter((module) => module?._type !== 'siteAlert')

  return (
    <>
      {otherModules.map((module, index) => (
        <React.Fragment key={`module-${index}`}>
          {renderModule(module, index, otherModules.length)}
        </React.Fragment>
      ))}
    </>
  )
}

export default ModuleFactory

export const renderModule = (
  module: any,
  moduleIndex = 0,
  modulesLegnth = 0,
) => {
  switch (module?._type) {
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
      return (
        <CTAFullMedia
          data={module}
          moduleIndex={moduleIndex}
          modulesLength={modulesLegnth}
        />
      )
    case 'getInspired':
      return <GetInspired data={module} />
    case 'textCardGrid':
      return <TextCardGrid data={module} />
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
    case 'imageGrid':
      return <ImageGrid data={module} />
    // case 'quickExit':
    //   return <QuickExit data={module} />
    case 'wysiwyg':
      return <Wysiwyg data={module} />
    case 'teamGrid':
      return <TeamGrid data={module} />
    case 'embed':
      return <SanitizedEmbed embed={module} />
    case 'rateTable':
      return <RateTable data={module} />
    default:
      return <></>
  }
}
