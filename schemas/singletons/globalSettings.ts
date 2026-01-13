import { defineField, defineType, validation } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

export default defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  icon: EarthGlobeIcon as any,
  type: 'document',
  groups: [
    {
      name: 'navigation',
      title: 'Navigation',
    },
    { name: 'footer', title: 'Footer' },
    { name: 'quickExit', title: 'Quick Exit' },
  ],
  fields: [
    defineField({
      name: 'globalAlerts',
      title: 'Global Alerts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'globalAlert' }],
        },
      ],
      validation: (Rule) =>
        Rule.max(1).error('You can only add 1 global alert'),
    }),
    defineField({
      name: 'globalEmbeds',
      title: 'Global Embeds',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'embed' }],
        },
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      description: 'This powers the site wide navigation and menu.',
      type: 'object',
      group: 'navigation',
      fields: [
        defineField({
          name: 'headerBarLinks',
          title: 'Header Bar Links',
          description: 'Links that appear in the sticky header bar.',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: (Rule: any) => Rule.required(),
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'topLevelNavigation',
          title: 'Top Level Navigation',
          type: 'array',
          description: 'Top level navigation link sets.',
          of: [
            defineField({
              name: 'linkCollection',
              title: 'Link Collection',
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'image',
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative text',
                      description:
                        "Describe what's in the image for screen readers and search engines.",
                    },
                  ],
                  validation: (Rule) =>
                    Rule.custom((value, context) => {
                      if (!value || !value.asset) {
                        return 'Image is required'
                      }
                      return true
                    }),
                }),
                defineField({
                  name: 'titleLink',
                  title: 'Title Link',
                  description:
                    'Link and title for the parent page of this link set.',
                  type: 'pageLink',
                  validation: (Rule: any) => Rule.required(),
                }),
                defineField({
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [
                    defineField({
                      name: 'link',
                      title: 'Link',
                      type: 'pageLink',
                      validation: (Rule: any) => Rule.required(),
                    }),
                  ],
                  validation: (Rule: any) =>
                    Rule.max(6).error('You can only add up to 6 items'),
                }),
              ],
              preview: {
                select: {
                  title: 'titleLink',
                  media: 'icon',
                },
                prepare(selection) {
                  return {
                    title: selection.title.title,
                    media: selection.media,
                  }
                },
              },
            }),
          ],
          validation: (Rule) => Rule.max(4).error('You can only add 4 items'),
        }),
        defineField({
          name: 'bottomLevelNavigation',
          title: 'Bottom Level Navigation',
          type: 'array',
          description: 'Bottom level navigation link sets.',
          of: [
            defineField({
              name: 'linkCollection',
              title: 'Link Collection',
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'image',
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative text',
                      description:
                        "Describe what's in the image for screen readers and search engines.",
                    },
                  ],
                  validation: (Rule) =>
                    Rule.custom((value, context) => {
                      if (!value || !value.asset) {
                        return 'Image is required'
                      }
                      return true
                    }),
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                }),
                defineField({
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [
                    defineField({
                      name: 'link',
                      title: 'Link',
                      type: 'pageLink',
                      validation: (Rule: any) => Rule.required(),
                    }),
                  ],
                  validation: (Rule: any) =>
                    Rule.max(6).error('You can only add up to 6 items'),
                }),
              ],
            }),
          ],
          validation: (Rule) => Rule.max(2).error('You can only add 2 items'),
        }),
        defineField({
          name: 'navigationCta',
          title: 'Navigation Call to Action',
          description: 'Call to action in the navigation menu.',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'theme',
              title: 'Theme',
              type: 'simplerColor',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'cta',
              title: 'Call to Action',
              type: 'pageLink',
              validation: (Rule: any) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      description: 'This powers the site wide footer.',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({
          name: 'socials',
          title: 'Socials',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'image',
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative text',
                      description:
                        "Describe what's in the image for screen readers and search engines.",
                    },
                  ],
                  validation: (Rule) =>
                    Rule.custom((value: any, context) => {
                      if (!value || !value?.asset) {
                        return 'Image is required'
                      }
                      return true
                    }),
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: (Rule: any) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  icon: 'icon',
                },
                prepare(selection) {
                  return {
                    title: selection.icon.alt,
                    media: selection.icon,
                  }
                },
              },
            },
          ],
        }),
        defineField({
          name: 'companyLinks',
          title: 'Company Links',
          type: 'array',
          of: [
            {
              type: 'pageLink',
            },
          ],
        }),
        defineField({
          name: 'resourceLinks',
          title: 'Resource Links',
          type: 'array',
          of: [
            {
              type: 'pageLink',
            },
          ],
        }),
        defineField({
          name: 'routingNumber',
          title: 'Routing Number',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'lowerFooterIcons',
          title: 'Lower Footer Icons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'image',
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative text',
                      description:
                        "Describe what's in the image for screen readers and search engines.",
                    },
                  ],
                  validation: (Rule) =>
                    Rule.custom((value: any, context) => {
                      if (!value || !value?.asset) {
                        return 'Image is required'
                      }
                      return true
                    }),
                },
                {
                  name: 'link',
                  type: 'pageLink',
                  title: 'Link',
                },
              ],
              preview: {
                select: {
                  icon: 'icon',
                },
                prepare(selection) {
                  return {
                    title: selection.icon.alt,
                    media: selection.icon,
                  }
                },
              },
            },
          ],
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'lowerFooterMessage',
          title: 'Lower Footer Message',
          type: 'text',
          rows: 2,
          // validation: (Rule: any) => Rule.required(),
          hidden: ({ parent }) => !!parent?.lowerFooterContent,
          deprecated: {
            reason: 'Use "Lower Footer Content" field instead',
          },
        }),
        defineField({
          name: 'lowerFooterContent',
          title: 'Lower Footer Content',
          type: 'blockContentMin',
          validation: (Rule: any) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'quickExit',
      title: 'Quick Exit',
      type: 'object',
      fields: [
        defineField({
          name: 'showFastExit',
          title: 'Show Fast Exit',
          type: 'boolean',
          initialValue: false,
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'exitUrl',
          title: 'Exit URL',
          type: 'url',
          description:
            'The URL to redirect to when the user clicks the exit button',
        }),
      ],
    }),
  ],
})
