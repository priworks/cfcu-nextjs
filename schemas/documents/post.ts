import { defineField, defineType, validation } from 'sanity'
import { Article } from '@phosphor-icons/react'
import { modules } from 'schemas/schemaTypes/modules'
import { isValidSanitySlug } from '@/lib/utils'

export default defineType({
  name: 'post',
  title: 'Post',
  icon: Article as any,
  type: 'document',
  groups: [
    { name: 'modules', title: 'Modules' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title of the post',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The slug stucture for this post will be /posts/[slug]',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
        slugify: (input, type) => {
          // Custom slugify function to ensure uniqueness
          return `posts/${input
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

          if (slugValue && !slugValue.startsWith('posts/')) {
            return 'Slug must start with "posts/"'
          }

          return isValidSanitySlug(slugValue)
        }),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'The type of post. Guide, news, story, etc.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      description: 'The author of the post',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      description: 'The date the post was published',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'A brief summary of the post that is used on the post card.',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description:
            "Describe what's in the image for screen readers and search engines.",
          validation: (Rule) => Rule.required(),
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
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'shareLinks',
      title: 'Share Links',
      type: 'array',
      description: 'Links to share the post on social media.',
      of: [
        {
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
                  validation: (Rule) => Rule.required(),
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
              name: 'link',
              title: 'Link',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              icon: 'icon',
            },
            prepare(selection) {
              return {
                title: 'Share Link',
                media: selection.icon,
              }
            },
          },
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
})
