# Sanity Studio — Tricrest Press

This folder contains the Sanity schema and Studio integration used by the Tricrest Press site.

## Required environment variables
Copy `.env.local.example` to `.env.local` and fill values before running locally.

- `NEXT_PUBLIC_SANITY_API_VERSION` (optional)
- `NEXT_PUBLIC_SANITY_DATASET` (default: `production`)
- `NEXT_PUBLIC_SANITY_PROJECT_ID` (required)
- `SANITY_WRITE_TOKEN` (required for server-side write/upload APIs)

## Uploading books
Two ways to upload book assets and create `book` documents:

1. Sanity Studio (recommended for manual edits)
   - Run the site locally: `npm run dev` and open `/studio`.
   - Use the `Library` → `Books` desk to create or edit book documents.
   - Use the new `ebookFiles` and `pdfFile` fields to attach files.

2. Server upload API (for bulk automation)
   - POST JSON to `/api/admin/upload` with keys: `title`, `price`, `fileUrl`, `authors` (array of author IDs), `slug` (optional).
   - The API requires `SANITY_WRITE_TOKEN` to be set in server environment variables.
   - The endpoint fetches the provided `fileUrl` and uploads it as a Sanity asset, then creates a `book` document referencing that asset.

## Studio visualization improvements
- The `book` schema includes `excerpt`, `ebookFiles`, and `pdfFile` fields to make uploaded formats visible in the Studio preview.
- Consider adding custom document views or desk items to show which formats are available at a glance; this can be done in `sanity/deskStructure.ts`.

## Security
- KEEP `SANITY_WRITE_TOKEN` secret. Do not commit `.env.local` or tokens to Git.
- Use auth (Clerk or other) to protect any admin/upload pages in production.

## Troubleshooting
- If assets fail to upload via the server API, ensure the `fileUrl` is publicly accessible and not blocked by CORS.
- For large file uploads consider using Sanity's direct upload methods from the Studio.

## Contact
If you want, I can add authenticated admin pages, multipart upload support, or bulk CSV import tooling—ask and I will implement.
