import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../api'
import { Image } from '@nextui-org/react'

type Props = {
  productId: number
}

const CartProduct: FC<Props> = ({ productId }) => {
  const { data } = useQuery({ queryKey: ['product', productId], queryFn: () => getProduct(+productId) })

  return (
    <li className="flex items-center">
      <Image src={data?.image} alt={data?.title} width={100} />
      {data?.title}
    </li>
  )
}

export default CartProduct
