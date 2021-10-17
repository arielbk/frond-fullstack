import { signOut, useSession } from 'next-auth/client'
import { Router, useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { API_URL, fromImageToUrl } from '../utils/urls'

const useOrders = (session: any) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!session) return
    const fetchOrders = async () => {
      const orderRes = await fetch(`${API_URL}/orders`, {
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
    <div className="bg-gray-50 py-12">
      <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
        Your account
      </h2>
      <div className="container flex bg-white shadow overflow-hidden sm:rounded-lg w-8/12 p-8 gap-16">
        <div>
          {' '}
          {session?.user?.image && (
            <img
              src={session?.user?.image}
              alt=""
              className="h-36 rounded-full border-white border-2 shadow-lg"
            />
          )}
          <div className="text-xl font-light mt-6 text-center">
            {session?.user?.name}
          </div>
        </div>
        <div className="flex-1">
          <div>
            <h3 className="text-xl">Orders</h3>
            {orders.map((order: any) => (
              <div key={order.id} className="mt-6 border flex-1 rounded-lg p-6">
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
                  <div className="text-gray-200 bg-gray-600 px-4 rounded-full text-xs flex items-center">
                    {order.status}
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 mr-2 uppercase">
                      Total:
                    </span>{' '}
                    €{order.total}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => signOut()}
            className="mt-8 transition-colors rounded-md px-8 py-2 text-sm bg-white text-green-500 border border-gray-200 width-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
