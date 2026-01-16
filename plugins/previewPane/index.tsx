// This plugin is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference

import { DRAFT_MODE_ROUTE } from '@/lib/sanity.api'
import { DefaultDocumentNodeResolver } from 'sanity/structure'
import { Iframe, IframeOptions } from 'sanity-plugin-iframe-pane'

export const iframeOptions = {
  url: {
    origin: 'same-origin',
    preview: (document) => {
      if (!document) {
        return new Error('Missing document')
      }
      switch (document._type) {
        case 'dynamicPage':
          return (document as any)?.slug?.current
            ? `/dynamic/${(document as any).slug.current}`
            : new Error('Missing slug')
        case 'post':
          return (document as any)?.slug?.current
            ? `/${(document as any).slug.current}`
            : new Error('Missing slug')
        case 'subPage':
          return (document as any)?.slug?.current
            ? `/${(document as any).slug.current}`
            : new Error('Missing slug')
        case 'location':
          return (document as any)?.slug?.current
            ? `/${(document as any).slug.current}`
            : new Error('Missing slug')
        case 'topic':
          return (document as any)?.slug?.current
            ? `/${(document as any).slug.current}/1`
            : new Error('Missing slug')
        case 'blogHomePage':
          return '/posts/page/1'
        case 'homepage':
          return '/'
        case 'globalSettings':
          return '/'
        case 'testModules':
          return '/test-modules'
        case 'locationHomePage':
          return '/locations'
        case '404':
          return '/404'
        case 'rates':
          return (document as any)?.slug?.current
            ? `/${(document as any).slug.current}`
            : new Error('Missing slug')
        default:
          return new Error(`Unknown document type: ${document?._type}`)
      }
    },
    draftMode: DRAFT_MODE_ROUTE,
  },
  reload: { button: true },
} satisfies IframeOptions

export const previewDocumentNode = (): DefaultDocumentNodeResolver => {
  return (S, { schemaType }) => {
    switch (schemaType) {
      case 'dynamicPage':
        return S.document().views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      case '404':
        return S.document().views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      case 'rates':
        return S.document().views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      case 'homepage':
        return S.document().views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      case 'globalSettings':
        return S.document().views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      case 'post':
        return S.document().views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])

      case 'subPage':
        return S.document().views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      case 'location':
        return S.document().views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      case 'blogHomePage':
        return S.document().views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      case 'testModules':
        return S.document().views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      case 'topic':
        return S.document().views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      default:
        return null
    }
  }
}
