import { Outlet, Link, useNavigate } from 'react-router-dom'
import useAuth from './store'

export default function App() {
  const { user, logout } = useAuth()
  const nav = useNavigate()

  const handleLogout = () => {
    logout()
    nav('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-20 bg-surface/90 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            to="/"
            className="font-extrabold text-xl bg-gradient-to-r from-[#FFC6A5] to-[#2ECC71] bg-clip-text text-transparent"
          >
            ShareMoment
          </Link>

          <nav className="ml-auto flex items-center gap-3">
            <Link to="/" className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">Feed</Link>
            {user?.role === 'creator' && <Link to="/upload" className="px-3 py-1 rounded-lg brand-grad text-black font-semibold shadow-soft">Upload</Link>}
            {!user && <Link to="/login" className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">Login</Link>}
            {!user && <Link to="/signup" className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">Sign up</Link>}
            {user && <span className="text-white/70 text-sm">Hi, {user.display_name}</span>}
            {user && <button onClick={handleLogout} className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">Logout</button>}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="text-center text-white/40 text-xs py-6">© {new Date().getFullYear()} ShareMoment</footer>
    </div>
  )
}
