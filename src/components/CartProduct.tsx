import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardBody, Image, Input } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'

import { getProduct } from '../api'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import style from '../App.module.scss'

type Props = {
  productId: number
}

const CartProduct: FC<Props> = ({ productId }) => {
  const { data } = useQuery({ queryKey: ['product', productId], queryFn: () => getProduct(+productId) })

  return (
    <li>
      <Card>
        <CardBody className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <div className={style.cartProductImg}>
              <Image src={data?.image} alt={data?.title} width={100} />
            </div>

            <div className={style.cartProductName}>
              <p>
                {data?.title}
              </p>
            </div>
          </div>

          <div className={cn(style.cartProductControl, "flex flex-row items-center justify-between")}>
            <p className={cn(style.cartProductPrice)}>${data?.price}</p>

            <Input
              className={cn(style.cartProductInput)}
              type="number"
              placeholder="1"
              min={1}
              max={99}
              labelPlacement="outside"
            />

            <FontAwesomeIcon icon={faTrash} size="2xl" style={{ color: '#B197FC' }} />
          </div>
        </CardBody>
      </Card>
    </li>
  )
}

export default CartProduct
