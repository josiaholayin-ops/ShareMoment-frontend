import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import useAuth from '../store'

export default function VideoPage() {
  const { id } = useParams()
  const [video, setVideo] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [text, setText] = useState('')
  const [stars, setStars] = useState(5)
  const { token, apiBase } = useAuth()

  const load = async () => {
    const r = await api.get(`/videos/${id}`)
    setVideo(r.data.video)
    setComments(r.data.comments)
  }

  useEffect(() => { load() }, [id])

  const postComment = async () => {
    if (!token) return alert('Login to comment')
    const r = await api.post(`/videos/${id}/comment`, { text })
    setComments([r.data.comment, ...comments])
    setText('')
  }

  const rate = async () => {
    if (!token) return alert('Login to rate')
    const r = await api.post(`/videos/${id}/rate`, { stars })
    setVideo({ ...video, avg_rating: r.data.avgRating })
  }

  if (!video) return <div className="max-w-3xl mx-auto p-6">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <video src={`${apiBase}${video.filepath}`} controls playsInline className="w-full rounded-xl border border-white/10" />
      <div>
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <p className="text-white/70">by {video.creator_name} · ⭐ {video.avg_rating} · ❤️ {video.like_count}</p>
      </div>

      <div className="flex items-center gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10" placeholder="Write a comment..." />
        <button onClick={postComment} className="px-3 py-2 rounded-lg brand-grad text-black font-semibold shadow-soft">Post</button>
      </div>

      <div className="flex items-center gap-2">
        <label>Rate:</label>
        <select value={stars} onChange={e=>setStars(parseInt(e.target.value))} className="px-2 py-1 rounded bg-white/5 border border-white/10">
          {[1,2,3,4,5].map(s=> <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={rate} className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">Save</button>
      </div>

      <div className="space-y-3">
        {comments.map(c => (
          <div key={c.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-sm text-white/70">{new Date(c.created_at + 'Z').toLocaleString()}</div>
            <div>{c.text}</div>
          </div>
        ))}
        {comments.length === 0 && <p className="text-white/60">No comments yet.</p>}
      </div>
    </div>
  )
}
