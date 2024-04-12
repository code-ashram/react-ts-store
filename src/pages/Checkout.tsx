import { FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import cn from 'classnames'

import { Cart } from '../models'
import CartProduct from '../components/CartProduct.tsx'

import style from '../App.module.scss'


const Checkout: FC = () => {
  const { cart } = useLoaderData() as Record<'cart', Cart>

  console.log(cart)

  return (
    <>
      <h2 className={cn(style.infoTitle)}>Checkout</h2>

      <ul>
        {cart.products.map((product) =>
          <CartProduct key={product.productId} productId={product.productId}/>
        )}
      </ul>
    </>
  )
}

export default Checkout
