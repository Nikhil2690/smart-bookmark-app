import { createSupabaseServerClient } from '@/lib/supabaseServer'
import BookmarkForm from '@/components/BookmarkForm'
import BookmarkList from '@/components/BookmarkList'
import LogoutButton from '@/components/LogoutButton'

export default async function Dashboard() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>Please login</div>
  }

  const { data: bookmarks = [] } = await supabase
    .from('bookmarks')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">My Bookmarks</h1>
        <LogoutButton />
      </div>

      <BookmarkForm userId={user.id} />
      <BookmarkList initialBookmarks={bookmarks || []} userId={user.id} />
    </div>
  )
}
