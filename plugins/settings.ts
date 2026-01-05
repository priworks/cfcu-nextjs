/**
 * This plugin contains all the logic for setting up the `Settings` singleton
 */

import { definePlugin, type DocumentDefinition } from 'sanity'
import { type StructureResolver } from 'sanity/desk'
import { iframeOptions } from './previewPane'
import { Iframe } from 'sanity-plugin-iframe-pane'
import globalSettings from 'schemas/singletons/globalSettings'
import homepage from 'schemas/singletons/homepage'
import testModules from 'schemas/singletons/testModules'
import { Browser, Folder } from '@phosphor-icons/react/dist/ssr'
import fourOhFour from 'schemas/singletons/404'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { PageHierarchyView } from '@/components/Sanity/PageHierarchyView'
import { TreeView } from '@phosphor-icons/react'
import redirects from '@/schemas/singletons/redirects'
import { CustomDocumentView } from '@/plugins/subpageOrder'
import RedirectSearchView from '@/components/Sanity/RedirectSearchView'
export const settingsPlugin = definePlugin<{ type: string }>(({ type }) => {
  return {
    name: 'settings',
    document: {
      // Hide 'Settings' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => templateItem.templateId !== type)
        }

        return prev
      },
      // Removes the "duplicate" action on the "settings" singleton
      actions: (prev, { schemaType }) => {
        if (schemaType === type) {
          return prev.filter(({ action }) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
})

// The StructureResolver is how we're changing the DeskTool structure to linking to a single "Settings" document, instead of rendering "settings" in a list
// like how "Post" and "Author" is handled.
export const settingsStructure = (
  typeDef: DocumentDefinition,
): StructureResolver => {
  return (S, context) => {
    const hiddenTypes = [
      'media.tag',
      'globalSettings',
      'homepage',
      'post',
      'subPage',
      'testModules',
      'blogHomePage',
      'locationHomePage',
      'location',
      'modules',
      'ctaInContent',
      'ctaFullMedia',
      'ctaText',
      'ctaCardGridHome',
      'ctaCardGrid',
      'ctaTopicRow',
      'getInspired',
      'textCardGrid',
      'subPageHero',
      'relatedStories',
      'accordion',
      'siteAlert',
      'tabs',
      'columnSplit',
      'imageGrid',
      'quickExit',
      'post',
      'rateTable',
      'wysiwyg',
      'author',
      'topic',
      'teamGrid',
      'embed',
      '404',
      'redirects',
      'externalLink',
      'globalAlert',
    ]

    const globalSettingsListItem = S.listItem()
      .title(globalSettings.title)
      .icon(globalSettings.icon)
      .child(
        S.editor()
          .title(globalSettings.title)
          .id(globalSettings.name)
          .schemaType(globalSettings.name)
          .documentId(globalSettings.name)
          .views([
            S.view.form(),
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ]),
      )

    const homepageListItem = S.listItem()
      .title(homepage.title)
      .icon(homepage.icon)
      .child(
        S.editor()
          .title(homepage.title)
          .id(homepage.name)
          .schemaType(homepage.name)
          .documentId(homepage.name)
          .views([
            S.view.form(),
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ]),
      )

    const fourOhFourListItem = S.listItem()
      .title(fourOhFour.title)
      .icon(fourOhFour.icon)
      .child(
        S.editor()
          .title(fourOhFour.title)
          .id(fourOhFour.name)
          .schemaType(fourOhFour.name)
          .documentId(fourOhFour.name)
          .views([
            S.view.form(),
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ]),
      )
    const testModulesListItem = S.listItem()
      .title(testModules.title)
      .icon(testModules.icon)
      .child(
        S.editor()
          .title(testModules.title)
          .id(testModules.name)
          .schemaType(testModules.name)
          .documentId(testModules.name)
          .views([
            S.view.form(),
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ]),
      )

    const postsListItem = S.listItem()
      .title('Blog')
      .child(
        S.list()
          .title('Blog')
          .items([
            S.listItem()
              .title('Blog home page')
              .icon(Browser)
              .child(
                S.document()
                  .schemaType('blogHomePage')
                  .documentId('blogHomePage')
                  .views([
                    S.view.form(),
                    S.view
                      .component(Iframe)
                      .options(iframeOptions)
                      .title('Preview'),
                  ]),
              ),
            S.listItem()
              .title('Topics')
              .schemaType('topic')
              .child(S.documentTypeList('topic').title('Topics')),
            S.listItem()
              .title('Blog Posts')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Blog Posts')),
          ]),
      )

    const locationsListItem = S.listItem()
      .title('Locations')
      .child(
        S.list()
          .title('Locations')
          .items([
            S.listItem()
              .title('Location home page')
              .icon(Browser)
              .child(
                S.document()
                  .schemaType('locationHomePage')
                  .documentId('locationHomePage')
                  .views([
                    S.view.form(),
                    S.view
                      .component(Iframe)
                      .options(iframeOptions)
                      .title('Preview'),
                  ]),
              ),
            S.listItem()
              .title('Locations')
              .schemaType('location')
              .child(S.documentTypeList('location').title('Locations')),
            orderableDocumentListDeskItem({
              type: 'location',
              title: 'Orderable Locations',
              S: S as any,
              context,
            }) as any,
          ]),
      )
    const subpagesListItem = S.listItem()
      .title('Subpages')
      .icon(Folder)
      .schemaType('subPage')
      .child(
        S.list()
          .title('Subpages')
          .items([
            S.listItem()
              .title('Subpages')
              .child(
                S.documentTypeList('subPage')
                  .title('Sub Pages')
                  .child((documentId) =>
                    S.document()
                      .documentId(documentId)
                      .schemaType('subPage')
                      .views([
                        S.view.form(),
                        S.view
                          .component(Iframe)
                          .options(iframeOptions)
                          .title('Preview'),
                        S.view
                          .component(CustomDocumentView)
                          .title('Children Navigation'),
                      ]),
                  ),
              ),
            S.listItem()
              .title('Page Hierarchy')
              .icon(TreeView)
              .child(S.component(PageHierarchyView).title('Page Hierarchy')),
          ]),
      )

    const redirectsListItem = S.listItem()
      .title(redirects.title)
      .icon(redirects.icon)
      .child(
        S.editor()
          .title(redirects.title)
          .id(redirects.name)
          .schemaType(redirects.name)
          .documentId(redirects.name)
          .views([
            S.view.form(),
            S.view
              .component(RedirectSearchView)
              .title('Search')
              .id('redirectSearch'),
          ]),
      )

    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) => !hiddenTypes.includes(listItem.getId()),
    )

    return S.list()
      .title('Content')
      .items([
        globalSettingsListItem,
        S.divider(),
        homepageListItem,
        S.divider(),
        subpagesListItem,
        S.divider(),
        postsListItem,
        S.divider(),
        locationsListItem,
        S.divider(),
        fourOhFourListItem,
        S.divider(),
        redirectsListItem,
        S.divider(),
        ...defaultListItems,
      ])
  }
}
