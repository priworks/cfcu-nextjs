import { defineField, defineType, validation } from 'sanity'
import { GlobeHemisphereWest } from '@phosphor-icons/react'
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'
import { modules } from '@/schemas/schemaTypes/modules'

export default defineType({
  name: 'location',
  title: 'Location',
  icon: GlobeHemisphereWest as any,
  type: 'document',
  groups: [
    { name: 'locationSettings', title: 'Location Settings' },
    { name: 'modules', title: 'Modules' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the location',
      group: 'locationSettings',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The slug must follow the format "locations/[location-name]"',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
        slugify: (input, type) => {
          // Custom slugify function to ensure uniqueness
          return `locations/${input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
            .slice(0, 200)}`
        },
      },
      validation: (Rule) =>
        Rule.required().custom((slug, context) => {
          if (typeof slug === 'undefined') {
            return true // Allow undefined values
          }
          if (slug.current && !slug.current.startsWith('locations/')) {
            return 'Slug must start with "locations/"'
          }
          return true
        }),
    }),
    orderRankField({ type: 'location' }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      group: 'locationSettings',
      description:
        'The coordinates of the location for the interactive map. You can use https://www.gps-coordinates.net/ to find the coordinates.',
      fields: [
        defineField({
          name: 'latitude',
          title: 'Latitude',
          type: 'number',

          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'longitude',
          title: 'Longitude',
          type: 'number',
          validation: (Rule: any) => Rule.required(),
        }),
      ],
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      description:
        'The image that will be used for the location page hero and cards on the location home page.',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description:
            "Describe what's in the image for screen readers and search engines.",
          validation: (Rule: any) => Rule.required(),
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!value || !value.asset) {
            return 'Image is required'
          }
          return true
        }),
      group: 'locationSettings',
    }),

    defineField({
      name: 'address',
      title: 'Address',
      type: 'blockContentMin',
      group: 'locationSettings',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      group: 'locationSettings',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'faxNumber',
      title: 'Fax Number',
      type: 'string',
      group: 'locationSettings',
    }),
    defineField({
      name: 'mailingAddress',
      title: 'Mailing Address',
      type: 'blockContentMin',
      group: 'locationSettings',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'locationSettings',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'appointmentLink',
      title: 'Appointment Link',
      type: 'pageLink',
      group: 'locationSettings',
    }),

    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'array',
      validation: (Rule: any) => Rule.required(),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
              },
            },
            {
              name: 'openTime',
              title: 'Opening Time',
              type: 'string',
              description: 'Format: 9:00am',
            },
            {
              name: 'closeTime',
              title: 'Closing Time',
              type: 'string',
              description: 'Format: 5:00pm',
            },
            {
              name: 'isClosed',
              title: 'Closed',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),

    modules,
    defineField({
      name: 'searchData',
      title: 'Search Data',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description:
        'Title for search engines. This also powers the search results page.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      description:
        'Description for search engines. This also powers the search results page.',
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
})
