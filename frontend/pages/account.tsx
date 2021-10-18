import { signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { API_URL, fromImageToUrl } from '../utils/urls'

const useOrders = (session: any) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!session) return
    const fetchOrders = async () => {
      const orderRes = await fetch(`${API_URL}/orders?_sort=created_at:DESC`, {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      })
      const data = await orderRes.json()
      setOrders(data)
    }

    fetchOrders()
  }, [session])

  return orders
}

export default function Account() {
  const [session, loading] = useSession()
  const router = useRouter()
  const orders = useOrders(session)
  if (!loading && !session) router.push('/')
  return (
    <div className="bg-gray-50 py-8">
      <h2 className="container my-6 font-extrabold text-gray-900 text-4xl tracking-tight">
        Your account
      </h2>
      <div className="container mb-12">
        <div className="flex flex-col md:flex-row bg-white shadow overflow-hidden sm:rounded-lg">
          {/* user section */}
          <div className="text-center bg-gray-200 p-8 w-full md:w-3/12">
            {' '}
            {session?.user?.image && (
              <img
                src={session?.user?.image}
                alt=""
                className="mx-auto h-36 rounded-full border-white border-2 shadow-lg"
              />
            )}
            <div className="text-2xl font-light mt-6 text-center">
              {session?.user?.name}
            </div>
            <div className="text-l font-light mt-2 text-center text-gray-400">
              {session?.user?.email}
            </div>
            <button
              onClick={() => signOut()}
              className="mt-8 transition-colors rounded-md px-8 py-2 bg-white text-green-500 border border-gray-200"
            >
              Logout
            </button>
          </div>
          {/* orders section */}
          <div className="flex-1 py-8 px-12">
            <div>
              <h3 className="text-xl">Orders</h3>
              {orders.map((order: any) => (
                <div
                  key={order.id}
                  className="mt-6 border flex-1 rounded-lg p-6"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <img
                        src={fromImageToUrl(
                          order.product.image.formats.thumbnail
                        )}
                        alt={order.product.name}
                        className="h-12 w-12 rounded-full mr-3"
                      />
                      <div>
                        <div>{order.product.name}</div>
                        <div className="text-gray-400 text-sm">
                          €{order.product.price}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(order.created_at).toLocaleDateString('de')}
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <div
                      className={`bg-white px-4 rounded-full text-xs flex items-center border ${
                        order.status === 'UNPAID'
                          ? 'border-red-100 text-red-500'
                          : 'border-green-100 text-green-500'
                      }`}
                    >
                      {order.status}
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 mr-2 uppercase">
                        Total:
                      </span>{' '}
                      €{order.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
