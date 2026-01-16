import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageLink',
  title: 'Page Link',
  type: 'object',
  fields: [
    // defineField({
    //   name: 'linkType',
    //   title: 'Link Type',
    //   type: 'string',
    //   options: {
    //     list: [
    //       { title: 'Internal', value: 'internal' },
    //       { title: 'External', value: 'external' },
    //     ],
    //     layout: 'radio',
    //   },
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: 'title',
      title: 'Link Title',
      type: 'string',
      description: 'The text to display for the link',
      validation: (Rule) => Rule.required(),
      // hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'link',
      title: 'Internal Link',
      type: 'reference',
      to: [
        { type: 'post' },
        { type: 'topic' },
        { type: 'homepage' },
        { type: 'location' },
        { type: 'subPage' },
        { type: 'blogHomePage' },
        { type: 'locationHomePage' },
        // Add any other document types that can be linked
      ],
      description: 'Select the page to link to',
      // hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'reference',
      to: [{ type: 'externalLink' }],

      // hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'externalLinkOneOff',
      title: 'External Link (One off)',
      type: 'object',
      fields: [
        {
          name: 'link',
          title: 'Link',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
        },
        {
          name: 'openInNewTab',
          title: 'Open in new tab',
          type: 'boolean',
          description: 'Open the link in a new tab',
        },
        {
          name: 'showPdfPageLeaveAlert',
          title: 'Show PDF/Page Leave Alert',
          type: 'boolean',
          description:
            'Please select this if you want the page leave alert to show if you are linking to a PDF. No alert will show for PDFs unless you check this',
          initialValue: false,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      linkType: 'linkType',
      internalLinkTitle: 'internalLink.title',
      externalLink: 'externalLink',
    },
    prepare({ title, linkType, internalLinkTitle, externalLink }) {
      return {
        title: title,
      }
    },
  },
})
