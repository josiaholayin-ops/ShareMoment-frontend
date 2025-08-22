import { create } from 'zustand'

type State = {
  token: string | null
  user: { id:number; email:string; display_name:string; role:string } | null
  apiBase: string
  setAuth: (token:string, user:any) => void
  logout: () => void
}

const useAuth = create<State>((set) => ({
  token: null,
  user: null,
  apiBase: (import.meta as any).env.VITE_API_BASE?.replace(/\/?api$/, '') || 'http://localhost:5000',
  setAuth: (token, user) => set({ token, user }),
  logout: () => set({ token: null, user: null })
}))

export default useAuth
