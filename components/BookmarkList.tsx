'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'


export default function BookmarkList({
  initialBookmarks,
  userId,
}: {
  initialBookmarks: any[]
  userId: string
}) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks)

  useEffect(() => {
    const channel = supabase
      .channel('realtime-bookmarks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [payload.new, ...prev])
          }

          if (payload.eventType === 'DELETE') {
            setBookmarks((prev) =>
              prev.filter((b) => b.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleDelete = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
  }

  return (
  <div className="space-y-4 mt-6">
    {bookmarks.length === 0 && (
      <div className="text-center py-12 border rounded-xl bg-gray-50">
        <p className="text-gray-500 text-sm">No bookmarks yet.</p>
        <p className="text-gray-400 text-xs mt-1">
          Add your first bookmark above 🚀
        </p>
      </div>
    )}

    {bookmarks.map((bookmark) => (
      <div
        key={bookmark.id}
        className="group flex justify-between items-center p-5 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
      >
        <div className="flex flex-col">
          <p className="font-semibold text-gray-800 text-base">
            {bookmark.title}
          </p>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline truncate max-w-xs"
          >
            {bookmark.url}
          </a>
        </div>

        <button
          onClick={() => handleDelete(bookmark.id)}
          className=" group-hover:opacity-100 text-sm px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
)
}
