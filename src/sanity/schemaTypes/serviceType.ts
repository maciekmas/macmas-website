import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Usługa',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł usługi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Krótki opis',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Ikona',
      description: 'Wpisz nazwę ikony z Lucide (np. Settings, Shield, Wrench, Globe, Smartphone, PenTool) lub Emoji.',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Kolejność wyświetlania',
      type: 'number',
    }),
  ],
})
