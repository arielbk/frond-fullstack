import { useSession, signIn } from 'next-auth/client'
import Link from 'next/link'
import { ImLeaf } from 'react-icons/im'
import { HiMenu } from 'react-icons/hi'
import { useRouter } from 'next/dist/client/router'

const Header: React.FC = () => {
  const [session] = useSession()
  const router = useRouter()
  return (
    <header className="bg-white">
      <div className="container flex items-center py-4 sm:py-12 justify-between">
        <h1 className="flex items-center text-2xl">
          <ImLeaf className="mr-3 text-md text-green-500" />
          <a href="/" className="hover:text-green-700 transition-colors">
            Frond
          </a>
        </h1>
        <nav>
          <ul className="hidden sm:flex flex-1 justify-end items-center gap-12 text-custom-blue uppercase text-xs">
            <li className="cursor-pointer hover:text-green-500 transition-colors">
              About
            </li>
            <li className="cursor-pointer hover:text-green-500 transition-colors">
              Pricing
            </li>
            <li className="cursor-pointer hover:text-green-500 transition-colors">
              Contact
            </li>
            <button
              onClick={session ? () => router.push('/account') : () => signIn()}
              className="text-green-500 bg-white transition-colors rounded-md px-8 py-2  text-sm hover:bg-green-100 hover:text-green-500 border border-green-500"
            >
              {session ? 'Account' : 'Login'}
            </button>
          </ul>
          <div className="flex sm:hidden flex-1 justify-end text-gray-600 hover:text-green-700 transition-colors">
            <HiMenu className="text-2xl cursor-pointer" />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
