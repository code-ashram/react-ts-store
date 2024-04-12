import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../api'

type Props = {
  productId: number
}

const CartProduct: FC<Props> = ({ productId }) => {
  const { data } = useQuery({ queryKey: ['product'], queryFn: () => getProduct(+productId) })

  return (
    <li>
      {data?.title}
    </li>
  )
}

export default CartProduct
