import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import CartProduct from '../components/CartProduct.tsx'

import { Divider } from '@nextui-org/react'
import cartContext from '../store/CartContext.ts'

import style from '../App.module.scss'

const Checkout: FC = () => {
  const { cart } = useContext(cartContext)
  const navigate = useNavigate()
  const [count, setCount] = useState<string>('1')

  const handleSetCount = (e: ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value)
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
            count={Number(count)}
            onChange={handleSetCount}
            onDelete={() => console.log('delete!')}/>
        )}
      </ul>

      <Divider />
      <h2 className={cn(style.infoTitle, style.checkoutSum)}>Total: $1488</h2>
    </>
  )
}

export default Checkout
