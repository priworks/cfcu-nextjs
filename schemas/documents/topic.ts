import { defineField, defineType, validation } from 'sanity'
import { TagSimple } from '@phosphor-icons/react'
import { isValidSanitySlug } from '@/lib/utils'

//TODO: change description on this compoonent when it comes time.
export default defineType({
  name: 'topic',
  title: 'Topic',
  icon: TagSimple as any,
  type: 'document',
  groups: [{ name: 'seo', title: 'SEO' }],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
        slugify: (input, type) => {
          // Custom slugify function to ensure uniqueness
          return `posts/topic/${input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
            .slice(0, 200)}`
        },
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (typeof slug === 'undefined') {
            return true // Allow undefined values
          }

          const slugValue = slug.current

          if (slugValue && !slugValue.startsWith('posts/topic/')) {
            return 'Slug must start with "posts/topic/"'
          }

          return isValidSanitySlug(slugValue)
        }),
      description:
        'The slug stucture for this topic will be /posts/topic/[slug]',
    }),

    // defineField({
    //   name: 'title',
    //   title: 'Page Title',
    //   type: 'string',
    //   validation: (Rule) => Rule.required(),
    // }),
    // defineField({
    //   name: 'description',
    //   title: 'Description',
    //   type: 'text',
    //   rows: 3,
    //   validation: (Rule) => Rule.required(),
    // }),

    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description:
        'Title for search engines. If left blank, the title for this page will be set to the default title.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      description:
        'Description for search engines. If left blank, the description for this page will be set to the default description.',
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
    select: {
      name: 'name',
    },
    prepare({ name }) {
      return {
        title: name,
      }
    },
  },
})
