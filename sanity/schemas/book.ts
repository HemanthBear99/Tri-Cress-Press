import { defineField, defineType } from 'sanity'

export const book = defineType({
    name: 'book',
    title: 'Book',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'authors',
            title: 'Authors',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'author' } }],
            validation: (rule) => rule.required().min(1),
            description: 'Select one or more authors for this book',
        }),
        defineField({
            name: 'price',
            title: 'Price (₹)',
            type: 'number',
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'isbn',
            title: 'ISBN',
            type: 'string',
            description: 'Optional ISBN for print editions',
        }),
        defineField({
            name: 'pages',
            title: 'Page count',
            type: 'number',
            validation: (rule) => rule.min(0),
        }),
        defineField({
            name: 'isPremium',
            title: 'Premium Selection',
            type: 'boolean',
            initialValue: false,
            description: 'Toggle this to feature the book on the homepage or premium sections.'
        }),
        defineField({
            name: 'coverImage',
            title: 'Front Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt / Blurb',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Short rich-text excerpt used in listings and previews',
        }),
        defineField({
            name: 'ebookFiles',
            title: 'Ebook & File Formats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'format',
                            title: 'Format',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'PDF', value: 'pdf' },
                                    { title: 'EPUB', value: 'epub' },
                                    { title: 'MOBI', value: 'mobi' },
                                    { title: 'Paperback (print)', value: 'paperback' },
                                ],
                            },
                        },
                        {
                            name: 'file',
                            title: 'File',
                            type: 'file',
                            options: { accept: 'application/pdf,application/epub+zip,application/x-mobipocket-ebook' },
                        },
                        {
                            name: 'price',
                            title: 'Format Price (₹)',
                            type: 'number',
                        },
                    ],
                },
            ],
            description: 'Upload ebook files and price overrides per format. Keep file types small for fast delivery.',
        }),
        defineField({
            name: 'backCoverImage',
            title: 'Back Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'pdfFile',
            title: 'Single PDF (optional)',
            type: 'file',
            options: { accept: 'application/pdf' },
            description: 'Upload a single PDF file for preview or direct delivery',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'publishStatus',
            title: 'Publish Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Draft', value: 'draft' },
                    { title: 'Published', value: 'published' },
                ],
                layout: 'radio',
            },
            initialValue: 'draft',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author0: 'authors.0.name',
            author1: 'authors.1.name',
            media: 'coverImage',
            price: 'price',
            status: 'publishStatus',
        },
        prepare(selection) {
            const { title, author0, author1, media, price, status } = selection
            const authors = [author0, author1].filter(Boolean)
            const subtitle = authors.length > 0
                ? `by ${authors.join(', ')}${authors.length < 2 ? '' : '...'}`
                : undefined
            const subtitleParts = []
            if (subtitle) subtitleParts.push(subtitle)
            if (typeof price === 'number') subtitleParts.push(`₹${price}`)
            if (status) subtitleParts.push(`(${status})`)
            return { title, subtitle: subtitleParts.join(' — '), media }
        },
    },
})
