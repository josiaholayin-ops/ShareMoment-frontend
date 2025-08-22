import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'
import useAuth from '../store'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [asCreator, setAsCreator] = useState(false)
  const [creatorCode, setCreatorCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()
  const { setAuth } = useAuth()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const payload: any = { email, password, displayName }
      if (asCreator) { payload.asCreator = true; payload.creatorCode = creatorCode }
      const r = await api.post('/auth/register', payload)
      setAuth(r.data.token, r.data.user)
      nav('/')
    } catch (e:any) {
      setError(e?.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10"
               placeholder="Display name" value={displayName} onChange={e=>setDisplayName(e.target.value)} />
        <input className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10"
               placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10"
               placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />

        <label className="flex items-center gap-2 text-sm mt-2">
          <input type="checkbox" checked={asCreator} onChange={e=>setAsCreator(e.target.checked)} />
          Register as a <span className="font-semibold">creator</span>
        </label>

        {asCreator && (
          <input className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                 placeholder="Creator signup code" value={creatorCode} onChange={e=>setCreatorCode(e.target.value)} />
        )}

        {error && <p className="text-red-400">{error}</p>}

        <button className="w-full py-2 rounded-lg brand-grad text-black font-semibold shadow-soft">
          Sign up
        </button>
      </form>
      <p className="mt-3 text-sm text-white/70">
        Already have an account? <Link className="underline" to="/login">Login</Link>
      </p>
    </div>
  )
}
