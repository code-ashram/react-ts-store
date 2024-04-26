import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import CartProduct from '../components/CartProduct/CartProduct'

import { Divider } from '@nextui-org/react'
import cartContext from '../store/CartContext'

import { ActionType as CartAction } from '../store/CartReducer'
import { Cart } from '../models'

import style from '../App.module.scss'

type Price = {
  productId: number
  price: number
}

const Checkout: FC = () => {
  const navigate = useNavigate()
  const { cart, dispatchCart } = useContext(cartContext)
  const [productPrices, setProductPrices] = useState<Price[]>([])

  useEffect(() => {
    if (!cart) navigate('/home')
    console.log(productPrices)
  }, [cart, navigate, productPrices])

  const total = useMemo(() =>
    cart?.products.reduce((acc, product) =>
      acc + product.quantity * (productPrices.find(({ productId }) =>
        productId === product.productId)?.price ?? 0), 0), [cart?.products, productPrices])

  const handleAddPrice = useCallback((id: number, price: number): void => {
    setProductPrices((prevPrices) =>
      prevPrices.some((item) => item.productId === id)
        ? prevPrices.map((item) =>
          item.productId === id
            ? { ...item, price }
            : item
        )
        : [...prevPrices, { productId: id, price }]
    )
  }, [])

  const handleChangeCart = (id: number, count: number): void => {
    if (!cart) return

    const payload: Cart = {
      ...cart, products: count
        ? cart.products.map((product) =>
          product.productId === id
            ? { ...product, quantity: count }
            : product)
        : cart.products.filter((product) => product.productId !== id)
    }

    dispatchCart({
      type: CartAction.SetCart,
      payload
    })
  }

  return (
    <>
      <h2 className={cn(style.infoTitle)}>Checkout</h2>

      {
        cart?.products.length
          ? <ul className={cn(style.checkoutList)}>
            {cart?.products.map((product) =>
              <CartProduct
                key={product.productId}
                productId={product.productId}
                count={Number(product.quantity)}
                onTotal={handleAddPrice}
                onChange={handleChangeCart}
              />
            )}
          </ul>

          : <div className={cn(style.cartEmpty)}>
            <p className="text-xl">Your cart is empty</p>
          </div>
      }

      <Divider />
      <h2 className={cn(style.infoTitle, style.checkoutSum)}>Total: ${total?.toFixed(2)}</h2>
    </>
  )
}

export default Checkout
