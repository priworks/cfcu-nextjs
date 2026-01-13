import { defineField } from 'sanity'
export default defineField({
  name: 'homepageHero',
  title: 'Home Page Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title displayed in the hero section',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'The short description displayed below the title',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'pageLink',
      description: 'The call to action button',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        defineField({
          name: 'content',
          title: 'Content',
          description: 'The content of the testimonial',
          type: 'blockContent',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'author',
          title: 'Author',
          type: 'string',
          description: 'The author of the testimonial',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'The title of the person giving the testimonial.',
          validation: (Rule: any) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'needsGradient',
      title: 'Needs Gradient',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => !parent?.backgroundMedia,
      description: 'Toggle to enable or disable gradient for this hero',
    }),
    defineField({
      name: 'backgroundMedia',
      title: 'Background Media',
      type: 'media',
      description: 'The background media for the hero section',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      cta: 'cta',
      testimonial: 'testimonial',
      needsGradient: 'needsGradient',
      backgroundMedia: 'backgroundMedia',
    },
    prepare(selection) {
      return {
        title: 'Homepage Hero',
      }
    },
  },
})
