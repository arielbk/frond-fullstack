import Head from 'next/head'
import { signOut, useSession } from 'next-auth/client'
import { Router, useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { API_URL, fromImageToUrl } from '../../utils/urls'

const useOrder = (sessionId: string) => {
  const [order, setOrder] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`${API_URL}/orders/confirm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ checkout_session: sessionId }),
        })
        const data = await res.json()
        setOrder(data)
      } catch (error) {}
      setIsLoading(false)
    }
    fetchOrder()
  }, [sessionId])

  return { order, isLoading }
}

export default function Account() {
  const router = useRouter()
  const { session_id } = router.query
  const { order, isLoading } = useOrder(session_id as string)
  return (
    <div className="bg-gray-50 py-12">
      <Head>
        <title>Success!</title>
      </Head>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Your order was successfully placed!
      </h2>
      <div className="py-12 text-center">
        {isLoading && <div>Loading...</div>}
        {order && (
          <p className="text-center text-gray-400">
            Use the following order number to track your order:
            <div className="py-12 text-6xl font-extralight text-gray-700">
              {String(order.id).padStart(6, '0')}
            </div>
          </p>
        )}
      </div>
    </div>
  )
}
