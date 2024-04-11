import { FC } from 'react'
import { useLoaderData } from 'react-router-dom'

import { Cart } from '../models'

const UserCart: FC = () => {

  const { cart } = useLoaderData() as Record<'cart', Cart>

  console.log(cart)

  return (
    <>
      <h2>Cart</h2>


    </>
  )
}

export default UserCart
