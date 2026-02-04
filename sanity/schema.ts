import { type SchemaTypeDefinition } from 'sanity'

import { book } from './schemas/book'
import { author } from './schemas/author'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [book, author],
}
