import { signOut, useSession } from 'next-auth/client'
import { Router, useRouter } from 'next/dist/client/router'

export default function Account() {
  const [session, loading] = useSession()
  const router = useRouter()
  if (!loading && !session) router.push('/')
  return (
    <div className="bg-gray-50 py-12">
      <div className="container flex bg-white shadow overflow-hidden sm:rounded-lg w-8/12 p-8 gap-12">
        {session?.user?.image && (
          <img
            src={session?.user?.image}
            alt=""
            className="h-36 rounded-full"
          />
        )}
        <div>
          <div className="text-xl font-light">{session?.user?.name}</div>
          <button
            onClick={() => signOut()}
            className="btn mt-8 transition-colors rounded-md px-8 py-2 text-sm bg-white text-green-500 border border-gray-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
