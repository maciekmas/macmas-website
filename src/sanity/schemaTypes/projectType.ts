import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Projekt (Portfolio)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł projektu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (końcówka adresu URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Zdjęcie główne (Miniaturka na listę)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria (Długie zrzuty ekranu)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Dodaj tu pełne zrzuty ekranu. Długie pionowe grafiki będą płynnie przewijane na stronie projektu.',
    }),
    defineField({
      name: 'description',
      title: 'Opis projektu',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'url',
      title: 'Adres URL (Link do strony)',
      type: 'url',
    }),
    defineField({
      name: 'framework',
      title: 'Framework / Technologia',
      type: 'string',
      options: {
        list: [
          { title: 'WordPress (Gutenberg / Bloki)', value: 'wp-blocks' },
          { title: 'WordPress (Elementor)', value: 'elementor' },
          { title: 'WordPress (Divi)', value: 'divi' },
          { title: 'PrestaShop', value: 'prestashop' },
          { title: 'Shopify', value: 'shopify' },
          { title: 'Webflow', value: 'webflow' },
          { title: 'Next.js / React', value: 'nextjs' },
          { title: 'Custom HTML/CSS/JS', value: 'custom' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Kolejność wyświetlania na stronie głównej',
      type: 'number',
    }),
  ],
})
