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
        },
        prepare(selection) {
            const { title, author0, author1, media } = selection
            const authors = [author0, author1].filter(Boolean)
            const subtitle = authors.length > 0
                ? `by ${authors.join(', ')}${authors.length < 2 ? '' : '...'}`
                : undefined
            return { title, subtitle, media }
        },
    },
})
