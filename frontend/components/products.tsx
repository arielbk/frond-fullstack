import Image from 'next/image'
import Link from 'next/link'
import { fromImageToUrl } from '../utils/urls'

const Products: React.FC<{ products: any[] }> = ({ products }) => {
  return (
    <main className="bg-gray-100 py-16">
      <div className="container grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {products?.map(product => (
          <Link key={product.id} href={`/products/${product.slug}`} passHref>
            <a>
              <div className="flex flex-col bg-white rounded-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="h-80 relative">
                  <Image
                    src={fromImageToUrl(product.image)}
                    alt={product.name}
                    layout="fill"
                  />
                </div>
                <div className="flex-1">
                  <div className="p-8">
                    <div className="flex justify-between">
                      <h3 className="mb-4 text-lg font-light">
                        {product.name}
                      </h3>
                      <div className="text-gray-500">€{product.price}</div>
                    </div>
                    <p className="text-gray-500 text-sm mb-8">
                      {product.content}
                    </p>{' '}
                    <button className="text-green-500 bg-white transition-colors rounded-md px-8 py-2 text-sm hover:bg-green-100 hover:text-green-500 border border-green-500 w-full">
                      More info
                    </button>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default Products
