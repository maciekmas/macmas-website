import { defineField, defineType } from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Ustawienia Globalne',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Nagłówek Hero (Biały tekst)',
      type: 'string',
    }),
    defineField({
      name: 'heroTitleGradient',
      title: 'Nagłówek Hero (Tekst z gradientem)',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Podtytuł Hero',
      type: 'text',
    }),
    defineField({
      name: 'headingFont',
      title: 'Font Nagłówków',
      type: 'string',
      options: {
        list: [
          { title: 'Syne (Modern/Art)', value: 'Syne' },
          { title: 'Outfit (Clean/Tech)', value: 'Outfit' },
          { title: 'Montserrat (Classic/Strong)', value: 'Montserrat' },
          { title: 'Playfair Display (Elegant/Serif)', value: 'Playfair_Display' },
          { title: 'Inter (Standard/Professional)', value: 'Inter' },
        ],
      },
      initialValue: 'Syne',
    }),
    defineField({
      name: 'bodyFont',
      title: 'Font Tekstu Głównego',
      type: 'string',
      options: {
        list: [
          { title: 'Inter (Clean)', value: 'Inter' },
          { title: 'Outfit (Modern)', value: 'Outfit' },
          { title: 'Roboto (Neutral)', value: 'Roboto' },
          { title: 'Open Sans', value: 'Open_Sans' },
        ],
      },
      initialValue: 'Inter',
    }),
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
