import type { StructureResolver } from 'sanity/structure'
import { BookIcon, UsersIcon } from 'lucide-react'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Tricrest Press')
        .items([
            // Library Group
            S.listItem()
                .title('Library')
                .icon(BookIcon)
                .child(
                    S.documentList()
                        .title('Books')
                        .filter('_type == "book"')
                ),

            // Talent Group
            S.listItem()
                .title('Talent')
                .icon(UsersIcon)
                .child(
                    S.documentList()
                        .title('Authors')
                        .filter('_type == "author"')
                ),

            S.divider(),

            // Filter out the grouped items from the main list so they don't appear twice
            ...S.documentTypeListItems().filter(
                (listItem) => !['book', 'author'].includes(listItem.getId() as string)
            ),
        ])
