import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'O mnie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł strony',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Treść strony',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
