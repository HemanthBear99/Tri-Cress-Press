import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from '../../../../sanity/env'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { title, authors = [], price, fileUrl, slug: providedSlug } = body

        if (!title) return new Response('Missing title', { status: 400 })

        const token = process.env.SANITY_WRITE_TOKEN
        if (!token) return new Response('Missing SANITY_WRITE_TOKEN in environment', { status: 500 })

        const client = createClient({
            apiVersion,
            dataset,
            projectId,
            useCdn: false,
            token,
        })

        let pdfAsset: any = null
        if (fileUrl) {
            const fetched = await fetch(fileUrl)
            if (!fetched.ok) return new Response('Failed to fetch fileUrl', { status: 400 })
            const arrayBuffer = await fetched.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            const parts = (fileUrl || '').split('/')
            const rawName = parts[parts.length - 1] || `${title.replace(/\s+/g, '-')}.pdf`
            const filename = rawName.split('?')[0]
            pdfAsset = await client.assets.upload('file', buffer, { filename })
        }

        const slug = providedSlug
            ? providedSlug
            : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 96)

        const doc: any = {
            _type: 'book',
            title,
            slug: { _type: 'slug', current: slug },
            authors: (authors || []).map((a: string) => ({ _type: 'reference', _ref: a })),
            price: typeof price === 'number' ? price : Number(price || 0),
            publishStatus: 'published',
        }

        if (pdfAsset) {
            doc.pdfFile = { asset: { _type: 'reference', _ref: pdfAsset._id } }
        }

        const created = await client.create(doc)
        return new Response(JSON.stringify({ ok: true, id: created._id }), { status: 201 })
    } catch (err: any) {
        console.error('upload route error', err)
        return new Response(String(err?.message || err), { status: 500 })
    }
}
