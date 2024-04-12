import { FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import cn from 'classnames'

import { Cart } from '../models'
import CartProduct from '../components/CartProduct.tsx'


const Checkout: FC = () => {
  const { cart } = useLoaderData() as Record<'cart', Cart>

  console.log(cart)

  return (
    <>
      <h2 className={cn()}>Checkout</h2>

      <ul>
        {cart.products.map((product) =>
          <CartProduct key={product.productId} productId={product.productId}/>
        )}
      </ul>
    </>
  )
}

export default Checkout
