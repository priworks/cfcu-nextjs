import { defineField } from 'sanity'

export default defineField({
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // Primary (desktop/default) image
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description:
            "Describe what's in the image for screen readers and search engines.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // Primary (desktop/default) video
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: { accept: 'video/*' },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),

    // ---- Mobile override (format-agnostic) ----
    defineField({
      name: 'mobileOverrideEnabled',
      title: 'Override for Mobile?',
      type: 'boolean',
      description:
        'Enable to upload a mobile-specific asset (image or video). If disabled, mobile uses the primary media.',
      initialValue: false,
    }),

    defineField({
      name: 'mobileMediaType',
      title: 'Mobile Media Type',
      type: 'string',
      description:
        'Choose what to show on mobile (independent of the primary media type).',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }) => !parent?.mobileOverrideEnabled,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.mobileOverrideEnabled && !value)
            return 'Select a mobile media type.'
          return true
        }),
    }),

    defineField({
      name: 'mobileImage',
      title: 'Mobile Image',
      type: 'image',
      description: 'Image to display on mobile devices.',
      options: { hotspot: true },
      hidden: ({ parent }) =>
        !parent?.mobileOverrideEnabled || parent?.mobileMediaType !== 'image',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any

          if (
            parent?.mobileOverrideEnabled &&
            parent?.mobileMediaType === 'image' &&
            !Boolean((value as any)?.asset?._ref)
          ) {
            return 'Mobile image is required when mobile override is enabled with image type.'
          }
          return true
        }),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description:
            "Describe what's in the image for screen readers and search engines.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'mobileVideo',
      title: 'Mobile Video',
      type: 'file',
      description: 'Video to display on mobile devices.',
      options: { accept: 'video/*' },
      hidden: ({ parent }) =>
        !parent?.mobileOverrideEnabled || parent?.mobileMediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (
            parent?.mobileOverrideEnabled &&
            parent?.mobileMediaType === 'video' &&
            !value
          ) {
            return 'Mobile video is required when mobile override is enabled with video type.'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      imageUrl: 'image.asset.url',
      videoUrl: 'video.asset.url',
      alt: 'image.alt',
    },
    prepare(selection) {
      const { mediaType, imageUrl, videoUrl, alt } = selection
      return {
        title: mediaType === 'image' ? 'Image' : 'Video',
        subtitle: mediaType === 'image' ? alt : '',
        media: mediaType === 'image' ? imageUrl : videoUrl,
      }
    },
  },
})
