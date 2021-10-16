import { ImLeaf } from 'react-icons/im'
import { AiOutlineGithub, AiOutlineTwitter } from 'react-icons/ai'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between">
        <div className="text-xs font-light text-gray-500">
          © {new Date().getFullYear()} Frond
        </div>
        <div className="fixed left-2/4 -translate-x-2/4">
          <ImLeaf className="text-3xl text-green-500" />
        </div>
        <div className="flex gap-10 mt-12 md:mt-0 text-2xl text-gray-500">
          <AiOutlineTwitter />
          <AiOutlineGithub />
        </div>
      </div>
    </footer>
  )
}

export default Footer
