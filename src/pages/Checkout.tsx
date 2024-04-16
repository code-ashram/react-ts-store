import { FC, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import CartProduct from '../components/CartProduct.tsx'

import { Divider } from '@nextui-org/react'
import cartContext from '../store/CartContext.ts'

import { ActionType as CartAction } from '../store/CartReducer.ts'
import { Cart } from '../models'

import style from '../App.module.scss'

const Checkout: FC = () => {
  const navigate = useNavigate()
  const { cart, dispatchCart } = useContext(cartContext)

  const handleChangeCart = (id: number, count: number): void => {
    if (!cart) return

    const payload: Cart = {
      ...cart, products: cart.products.map((product) =>
        product.productId === id
          ? { ...product, quantity: count }
          : product)
    }

    dispatchCart({
      type: CartAction.SetCart,
      payload
    })
  }

  useEffect(() => {
    if (!cart) navigate('/home')
  }, [cart, navigate])

  return (
    <>
      <h2 className={cn(style.infoTitle)}>Checkout</h2>

      <ul className={cn(style.checkoutList)}>
        {cart?.products.map((product) =>
          <CartProduct
            key={product.productId}
            productId={product.productId}
            count={Number(product.quantity)}
            onChange={handleChangeCart}
          />
        )}
      </ul>

      <Divider />
      <h2 className={cn(style.infoTitle, style.checkoutSum)}>Total: $1488</h2>
    </>
  )
}

export default Checkout
