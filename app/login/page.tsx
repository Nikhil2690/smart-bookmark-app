'use client'
import { supabase } from '@/lib/supabaseClient'


export default function LoginPage() {
  

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
        options: {
    redirectTo: `${window.location.origin}/auth/callback`,
  },
    })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-white text-black rounded cursor-pointer"
      >
        Sign in with Google
      </button>
    </div>
  )
}
