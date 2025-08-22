import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'
import useAuth from '../store'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()
  const { setAuth } = useAuth()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const r = await api.post('/auth/login', { email, password })
      setAuth(r.data.token, r.data.user)
      nav('/')
    } catch (e:any) {
      setError(e?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-red-400">{error}</p>}
        <button className="w-full py-2 rounded-lg brand-grad text-black font-semibold shadow-soft">Sign in</button>
      </form>
      <p className="mt-3 text-sm text-white/70">No account? <Link className="underline" to="/signup">Sign up</Link></p>
    </div>
  )
}
