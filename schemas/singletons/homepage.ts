import { defineField, defineType, validation } from 'sanity'
import { HouseLine } from '@phosphor-icons/react'
import { homepageModules } from '@/schemas/schemaTypes/homepageModules'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  icon: HouseLine as any,
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'emotionalNavigation', title: 'Emotional Navigation' },
    { name: 'modules', title: 'Modules' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'homepageHero',
      group: 'hero',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'emotionalNavigation',
      title: 'Emotional Navigation',
      type: 'emotionalNavigation',
      group: 'emotionalNavigation',
      validation: (Rule: any) => Rule.required(),
    }),
    homepageModules,
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      validation: (Rule: any) => Rule.required(),
      description:
        'Title for search engines. This is also used to power search results.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      validation: (Rule: any) => Rule.required(),
      description:
        'Description for search engines. This is also used to power search results.',
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
    {
      name: 'jsonLd',
      title: 'JSON-LD Data',
      type: 'text',
      group: 'seo',
      description: 'Paste your JSON-LD structured data here',
      validation: (Rule) =>
        Rule.custom((jsonString) => {
          // Allow empty or undefined values
          if (jsonString === undefined || jsonString === '') return true

          // Validate JSON if there's content
          try {
            JSON.parse(jsonString as string)
            return true
          } catch (e) {
            return 'Please enter valid JSON'
          }
        }),
    },
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      cta: 'cta',
      testimonial: 'testimonial',
      backgroundMedia: 'backgroundMedia',
    },
    prepare(selection) {
      return {
        title: 'Home',
      }
    },
  },
})
