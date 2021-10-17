import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { loadStripe } from '@stripe/stripe-js'
import { API_URL, STRIPE_PUBLISHABLE_KEY } from '../utils/urls'

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

const BuyButton: React.FC<{ product: { id: string } }> = ({ product }) => {
  const [session] = useSession()

  const handleRent = async () => {
    const stripe = await stripePromise
    if (!session || !stripe) return
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify({ product }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.jwt}`,
      },
    })
    const checkoutSession = await res.json()
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    })
  }

  return (
    <button
      onClick={session ? () => handleRent() : () => signIn()}
      className="text-green-500 bg-white transition-colors rounded-md px-8 py-2 my-16 text-sm hover:bg-green-100 hover:text-green-500 border border-green-500"
    >
      {session ? 'Rent now' : 'Login to rent'}
    </button>
  )
}

export default BuyButton
