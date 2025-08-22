import { useState } from 'react'
import api from '../api'
import useAuth from '../store'

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [publisher, setPublisher] = useState('')
  const [producer, setProducer] = useState('')
  const [genre, setGenre] = useState('')
  const [ageRating, setAgeRating] = useState('PG')
  const [msg, setMsg] = useState<string | null>(null)

  const { user } = useAuth()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg(null)
    if (!file) { setMsg('Pick a video file'); return }
    const fd = new FormData()
    fd.append('video', file)
    fd.append('title', title)
    fd.append('publisher', publisher)
    fd.append('producer', producer)
    fd.append('genre', genre)
    fd.append('ageRating', ageRating)
    const r = await api.post('/videos', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    if (r.data.success) setMsg('Uploaded! Check the feed.')
  }

  if (user?.role !== 'creator') return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Upload</h1>
      <p className="text-white/70">Only creators can upload. Ask an admin to promote your account.</p>
    </div>
  )

  return (
    <div className="max-w-lg mx-auto p-6 space-y-3">
      <h1 className="text-2xl font-bold">Upload a video</h1>
      <form onSubmit={submit} className="space-y-3">
        <input type="file" accept="video/*" onChange={e=>setFile(e.target.files?.[0] || null)} className="block w-full" />
        <input className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <div className="grid grid-cols-2 gap-3">
          <input className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" placeholder="Publisher" value={publisher} onChange={e=>setPublisher(e.target.value)} />
          <input className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" placeholder="Producer" value={producer} onChange={e=>setProducer(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" placeholder="Genre" value={genre} onChange={e=>setGenre(e.target.value)} />
          <input className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" placeholder="Age rating (e.g., PG, 18)" value={ageRating} onChange={e=>setAgeRating(e.target.value)} />
        </div>
        <button className="w-full py-2 rounded-lg brand-grad text-black font-semibold shadow-soft">Upload</button>
        {msg && <p className="text-white/80">{msg}</p>}
      </form>
    </div>
  )
}
