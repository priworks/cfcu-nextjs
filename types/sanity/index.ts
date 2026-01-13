import type { PortableTextBlock } from '@portabletext/types'
import { ImageAsset, FileAsset } from 'sanity'

export type AuthorType = {
  _type: 'author'
  name: string
}

export type PostTagType = {
  _type: 'postTag'
  name: string
}
type MediaBase = {
  _type: 'media'
  _key: string
  mediaType: 'image' | 'video'
  // Mobile override fields
  mobileOverrideEnabled?: boolean
  mobileMediaType?: 'image' | 'video'
  mobileImage?: {
    asset: ImageAsset
    alt: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
  mobileVideo?: {
    asset: FileAsset
    caption?: string
  }
}

type ImageMedia = MediaBase & {
  mediaType: 'image'
  image: {
    asset: ImageAsset
    alt: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
}

type VideoMedia = MediaBase & {
  mediaType: 'video'
  video: {
    asset: FileAsset
    caption?: string
  }
}

export type Media = ImageMedia | VideoMedia

//Object Types ------------

export interface SearchResult {
  _id: string
  _type: string
  title: string
  description?: string
  slug: {
    current: string
  }
  metaTitle: string
  metaDescription?: string
  // Add more fields as needed
}

export interface ATMLocation {
  name: string
  address: string
  longitude: number
  latitude: number
}

export interface CtaInContentType {
  theme: {
    value: string
    label: ThemeLabel
  }
  ctaCard: {
    contentPosition: 'left' | 'right'
    subtitle?: {
      type?: 'text' | 'svg'
      text?: string
      svg?: ImageAsset
    }
    title: string
    description?: PortableTextBlock
    cta: {
      contentPosition: 'left' | 'right'
      title: string
      url: string
    }
  }
  backgroundImage: Media
}

export type ThemeLabel = 'Lavender' | 'Orange' | 'Green' | 'Yellow' | 'White'

export interface QuickExitType {
  exitUrl: string
}

export interface CtaTopicRowType {
  title: string
  subtitle?: string
  theme: {
    value: string
    label: ThemeLabel
  }
  imagePosition: 'left' | 'right'
  description: PortableTextBlock
  links?: Array<{
    title: string
    path: string
  }>
  image: ImageAsset
}

interface Logo {
  logo: ImageAsset
  link?: string
}

interface LogoGroup {
  logoGroupTitle?: string
  logos: Logo[]
  columns: 2 | 3 | 4
}

export interface LogoGridType {
  title: string
  subtitle?: string
  description?: PortableTextBlock[]
  logoGroups: LogoGroup[]
  backgroundColor: 'lightGray' | 'white'
}

export interface CtaCardGridHomeType {
  subTitle: string
  title: string
  description?: string
  cards: Array<{
    image: ImageAsset
    title: string
    description: string
    cardLink?: CardLinkType
  }>
  linkListTitle: string
  linkList: Array<{
    title: string
    path: PageLinkType
  }>
}

export interface CtaCardGridType {
  subTitl?: string
  title?: string
  cards: Array<{
    image: ImageAsset
    title: string
    description: string
    cardLink: CardLinkType
  }>
}

export interface PageLinkType {
  title: string
  link?: {
    _id: string
    _type: string
    title: string
    slug: {
      current: string
    }
  }
  externalLink?: {
    _id: string
    _type: string
    title: string
    externalLink: string
    openInNewTab: boolean
    showPdfPageLeaveAlert?: boolean
  }
  externalLinkOneOff?: {
    link: string
    openInNewTab: boolean
    showPdfPageLeaveAlert?: boolean
  }
}

export interface CardLinkType {
  link?: {
    _id: string
    _type: string
    title: string
    slug: {
      current: string
    }
  }
  externalLink?: {
    _id: string
    _type: string
    externalLink: string
    showPdfPageLeaveAlert?: boolean
  }
}
export interface CtaTextType {
  theme: {
    value: string
    label: string
  }

  title: string
  subtitle?: string
  description?: PortableTextBlock
  ctas: PageLinkType[]
}

export interface GetInspiredType {
  title: string
  description: string
  cta: {
    title: string
    path: string
  }
  featuredArticle?: PostPageType
  articleGrid?: PostPageType[]
  useTopic: boolean
  topic?: TopicWithRelatedPosts
}

export interface CtaFullMediaType {
  theme: {
    value: string
    label: string
  }
  backgroundMedia: Media
  needsOverlay: boolean
  topContent: {
    title: {
      type: 'text' | 'svg'
      text?: string
      svg?: ImageAsset
    }
    subtitle?: string
  }
  lowerContent?: {
    title: string
    description?: PortableTextBlock
  }
  cta: {
    title: string
    path: string
  }
}

export interface GroupMember {
  image: ImageAsset
  name: string
  title: string
  phoneNumber?: string
  email?: string
  moreInfoLink?: PageLinkType
}

interface TeamRow {
  groupTitle: string
  groupMembers: GroupMember[]
}

export interface TeamGridType {
  subtitle?: string
  title: string
  description?: string
  teamRows: TeamRow[]
}

export interface RateTableType {
  title: string
  columns: Array<{
    columnTitle: string
    columnValues: PortableTextBlock[]
  }>
  _updatedAt: string
  tableNotes?: PortableTextBlock[]
}
export interface SubPageHeroType {
  title: string
  subtitle: string
  needsBackgroundMedia: boolean
  backgroundMedia?: Media
  needsGradient?: boolean
}

export interface TextCardGridCard {
  title: string
  description: string
  pageLink: PageLinkType
}

export interface TextCardGridType {
  title: string
  titleSize?: string
  titleColor?: string
  subtitle: string
  description: string
  cards: TextCardGridCard[]
}

export interface RelatedStoriesType {
  title: string
  subTitle?: string
  description?: string
  pageLink: PageLinkType
  posts?: PostPageType[]
  headingVariant: 'normal' | 'large'
  backgroundColor: 'lightGrey' | 'white'
  useTopic: boolean
  topic?: TopicWithRelatedPosts
}

export interface AccordionItem {
  title: PortableTextBlock
  content: PortableTextBlock[]
}

export interface AccordionType {
  title: string
  subTitle?: string
  description?: PortableTextBlock[]
  accordionItems: AccordionItem[]
}

interface TabItem {
  title: PortableTextBlock
  icon?: ImageAsset
  content: PortableTextBlock[]
}

export interface TabsType {
  title: string
  titleSize?: string
  titleColor?: string
  subtitle?: string
  description?: PortableTextBlock
  tabs: TabItem[]
}

interface Column {
  content: PortableTextBlock[]
}

export interface ColumnSplitType {
  title: string
  titleColor?: string
  titleSize?: string
  subtitle?: string
  description?: PortableTextBlock
  columns: Column[]
}

export interface GlobalAlertType {
  tabName: string
  content: PortableTextBlock
}

export interface EmbedType {
  scriptsForBody?: string[]
}

export interface WysiwygType {
  content: PortableTextBlock[]
}

//Singleton Types --------------------------------------------------------------------------
export interface GlobalSettingsType {
  globalEmbeds: EmbedType[]
  globalAlerts: GlobalAlertType[]
  navigation: {
    headerBarLinks: Array<{
      title: string
      url: string
    }>
    topLevelNavigation: Array<{
      icon: ImageAsset
      titleLink: PageLinkType
      links: Array<PageLinkType>
    }>
    bottomLevelNavigation: Array<{
      icon: ImageAsset
      title: string
      links: Array<PageLinkType>
    }>
    navigationCta: {
      theme: {
        value: string
        label: ThemeLabel
      }
      title: string
      description: string
      cta: {
        title: string
        url: string
      }
    }
  }
  footer: {
    socials: Array<{
      icon: ImageAsset
      url: string
    }>
    companyLinks: Array<PageLinkType>
    resourceLinks: Array<PageLinkType>
    routingNumber: string
    lowerFooterIcons: Array<{
      icon: ImageAsset
    }>
    lowerFooterMessage: string
  }
  quickExit: {
    showFastExit?: boolean
    exitUrl?: string
  }
}

export type Modules = Array<
  | CtaInContentType
  | CtaFullMediaType
  | CtaTextType
  | CtaCardGridHomeType
  | CtaCardGridType
  | CtaTopicRowType
  | GetInspiredType
  | WysiwygType
>
export interface HomepageType {
  hero: {
    title: string
    description: string
    image: string
    cta: {
      title: string
      url: string
    }
    testimonial: {
      content: PortableTextBlock
      author: string
      title: string
    }
    backgroundMedia: Media
  }
  emotionalNavigation: {
    icon: ImageAsset
    subtitle: string
    title: string
    navigationCards: Array<{
      theme: {
        value: string
        label: ThemeLabel
      }
      subtitle: string
      title: string
      description: string
      links: Array<PageLinkType>
    }>
  }
  homepageModules: Modules
  ctaInContent: CtaInContentType
  getInspired: {
    title: string
    description: string
    cta: {
      title: string
      url: string
    }
    inspirationCards: Array<{
      icon: string
      subtitle: string
      title: string
      description: string
      links: Array<{
        title: string
        url: string
      }>
    }>
  }
  ctaFullMedia: CtaFullMediaType
  cardGrid: {
    title: string
    description: string
    cta: {
      title: string
      url: string
    }
    cards: Array<{
      media: string
      title: string
      description: string
      links: Array<{
        title: string
        url: string
      }>
    }>
  }
  jsonLd?: any
  ctaText: CtaTextType
}

export interface LocationHomepageType {
  pageHero: {
    title: string
    subtitle: string
    needsBackgroundMedia?: boolean
    backgroundMedia?: Media
    needsGradient?: boolean
  }
  modules: Modules
}

export interface BlogHomepageType {
  title: string
  description: string
  modules: Modules
}

// Document types ------------------------------------------------

export interface PostPageType {
  _type: 'post'
  title: string
  type: string
  slug: {
    current: string
  }
  author: AuthorType
  content: PortableTextBlock
  excerpt: string
  thumbnailImage: ImageAsset
  topics: TopicPageType[]
  shareLinks?: {
    icon: ImageAsset
    link: string
  }[]
  date: string
  modules: Modules[]
}

export interface SubPageType {
  _type: 'subPage'
  title: string
  slug: {
    current: string
  }
  pageHero: SubPageHeroType
  parent?: SubPageType
  modules: Modules
  metaTitle?: string
  jsonLd?: any
  metaDescription?: string
  ogImage?: {
    asset: ImageAsset
    alt: string
  }
}

export interface TestModulesType {
  modules: Modules
}

export interface RatePageType {
  hero: SubPageHeroType
  modules: Modules
  metaTitle?: string
  metaDescription?: string
  ogImage?: {
    asset: ImageAsset
    alt: string
  }
}

export interface LocationPage {
  title: string
  slug: {
    current: string
  }
  coordinates: {
    latitude: number
    longitude: number
  }
  hours: {
    day: string
    openTime: string
    closeTime: string
    isClosed: boolean
  }[]
  thumbnailImage: ImageAsset
  address: PortableTextBlock[]
  phoneNumber: string
  faxNumber?: string
  mailingAddress?: string
  services: string[]
  appointmentLink: PageLinkType
  metaTitle?: string
  metaDescription?: string
  ogImage?: {
    asset: ImageAsset
    alt: string
  }
  modules: Modules
}

export interface TopicPageType {
  name: string
  slug: {
    current: string
  }
  title: string
  description: string
  metaTitle?: string
  metaDescription?: string
  ogImage?: {
    asset: ImageAsset
    alt: string
  }
  modules: Modules
}

export interface TopicWithRelatedPosts extends TopicPageType {
  relatedPosts: PostPageType[]
}

export interface FourOhFour {
  backgroundMedia: Media
  backgroundNeedsGradient?: boolean
  title: string
  description: string
  links: PageLinkType[]
}
