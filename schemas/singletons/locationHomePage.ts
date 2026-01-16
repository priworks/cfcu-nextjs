import { defineField, defineType, validation } from 'sanity'
import { Browser } from '@phosphor-icons/react'
import { modules } from '@/schemas/schemaTypes/modules'

export default defineType({
  name: 'locationHomePage',
  title: 'Location Home Page',
  icon: Browser as any,
  type: 'document',
  groups: [
    { name: 'modules', title: 'Modules' },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'pageHero',
      title: 'Page Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description:
            'The title in the hero section of the location home page.',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Sub Title',
          type: 'string',
          description:
            'The subtitle in the hero section of the location home page.',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'needsBackgroundMedia',
          title: 'Needs Background Media',
          type: 'boolean',
          description:
            'Toggle to enable or disable background media for this hero',
        }),
        defineField({
          name: 'needsGradient',
          title: 'Needs Gradient',
          type: 'boolean',
          description: 'Toggle to enable or disable gradient for this hero',
          hidden: ({ parent }) => !parent?.needsBackgroundMedia,
        }),
        defineField({
          name: 'backgroundMedia',
          title: 'Background Media',
          type: 'media',
          hidden: ({ parent }) => !parent?.needsBackgroundMedia,
          description:
            'Upload an image or video to use as the background for the hero section',
        }),
      ],
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'atmCSV',
      title: 'ATM CSV',
      type: 'file',
      description:
        'The CSV file containing the locations of the ATMs in the location.',
      // validation: (Rule: any) => Rule.required(),
    }),
    modules,
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description:
        'Title for search engines. This also powers search results page.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      description:
        'Description for search engines. This also powers search results page.',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG image',
      type: 'image',
      group: 'seo',
      description:
        'Image for social sharing. If left blank, the default OG image will be used.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description:
            "Describe what's in the image for screen readers and search engines.",
          validation: (Rule: any) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Location Home Page',
      }
    },
  },
})
