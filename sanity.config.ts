/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { dataset, projectId } from '@/lib/sanity.api'

import { previewDocumentNode } from '@/plugins/previewPane'
import { settingsPlugin, settingsStructure } from '@/plugins/settings'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import settingsType from '@/schemas/settings'
import { schema } from '@/schemas'
import { media } from 'sanity-plugin-media'
import Logo from './components/Sanity/Logo'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
import { inlineSvgInput } from '@focus-reactive/sanity-plugin-inline-svg-input'

const title = 'CFCU'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema,
  plugins: [
    structureTool({
      structure: settingsStructure(settingsType),
      defaultDocumentNode: previewDocumentNode(),
    }),
    media(),
    settingsPlugin({ type: settingsType.name }),
    simplerColorInput({
      // Note: These are all optional
      defaultColorFormat: 'hex',
      defaultColorList: [
        { label: 'Orange', value: '#F56600' },
        { label: 'Green', value: '#008566' },
        { label: 'Yellow', value: '#FFC600' },
        { label: 'Lavender', value: '#3C1053' },
        { label: 'White', value: '#FFFFFF' },
      ],
      enableSearch: true,
    }),
    inlineSvgInput(),
    unsplashImageAsset(),
    visionTool(),
  ],
  icon: Logo,
})
