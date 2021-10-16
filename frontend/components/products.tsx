import Image from 'next/image'
import Link from 'next/link'
import products from '../products.json'
import { fromImageToUrl } from '../utils/urls'

const Products: React.FC = () => {
  return (
    <main className="bg-gray-100 py-16">
      <div className="container grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
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
                    <p className="text-gray-500 text-sm">{product.content}</p>
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
