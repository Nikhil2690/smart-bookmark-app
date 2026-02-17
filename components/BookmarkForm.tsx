'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function BookmarkForm({ userId }: { userId: string }) {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase
      .from('bookmarks')
      .insert([{ title, url, user_id: userId }])
      .select()

    if (!error) {
      setTitle('')
      setUrl('')
      router.refresh()   // 🔥 THIS FIXES SAME-TAB UPDATE
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2 rounded"
        required
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add Bookmark
      </button>
    </form>
  )
}
