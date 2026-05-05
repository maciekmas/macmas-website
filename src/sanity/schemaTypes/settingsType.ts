import { defineField, defineType } from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Ustawienia Globalne',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Adres E-mail',
      type: 'string',
    }),
    defineField({
      name: 'linkedin',
      title: 'Link LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'contactDescription',
      title: 'Opis sekcji kontakt',
      type: 'text',
    }),
    defineField({
      name: 'footerText',
      title: 'Tekst w stopce',
      type: 'string',
    }),
  ],
})
