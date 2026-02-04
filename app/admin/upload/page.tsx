"use client"

import { useState } from 'react'

export default function AdminUploadPage() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('0')
  const [fileUrl, setFileUrl] = useState('')
  const [authors, setAuthors] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('Uploading...')
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          price: Number(price),
          fileUrl: fileUrl || undefined,
          authors: authors ? authors.split(',').map(a => a.trim()) : [],
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Upload failed')
      setStatus(`Uploaded: ${data.id}`)
    } catch (err: any) {
      setStatus(`Error: ${err?.message || String(err)}`)
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin: Upload Book</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 640 }}>
        <label>
          Title
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </label>

        <label>
          Price (₹)
          <input value={price} onChange={e => setPrice(e.target.value)} type="number" />
        </label>

        <label>
          Authors (comma-separated author IDs)
          <input value={authors} onChange={e => setAuthors(e.target.value)} placeholder="authorId1, authorId2" />
        </label>

        <label>
          File URL (publicly accessible)
          <input value={fileUrl} onChange={e => setFileUrl(e.target.value)} placeholder="https://.../book.pdf" />
        </label>

        <button type="submit">Upload</button>
      </form>

      {status && <p style={{ marginTop: 16 }}>{status}</p>}
      <p style={{ marginTop: 12, color: '#666' }}>
        Note: This endpoint requires a server-side SANITY_WRITE_TOKEN. Use this page only on trusted machines or protect it with authentication.
      </p>
    </div>
  )
}
