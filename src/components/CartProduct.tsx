import { ChangeEvent, FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardBody, Image, Input } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'

import { getProduct } from '../api'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import style from '../App.module.scss'

type Props = {
  productId: number
  count: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onDelete: () => void
}

const CartProduct: FC<Props> = ({ productId, count, onChange, onDelete}) => {
  const { data } = useQuery({ queryKey: ['product', productId], queryFn: () => getProduct(+productId) })

  return (
    <li>
      <Card>
        <CardBody className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <div className={cn(style.cartProductImg, 'rounded-md')}>
              <Image className='rounded-none' src={data?.image} alt={data?.title} width={100} isZoomed />
            </div>

            <div className={style.cartProductName}>
              <p>
                {data?.title}
              </p>
            </div>
          </div>

          <div className={cn(style.cartProductControl, "flex flex-row items-center justify-between")}>
            <p className={cn(style.cartProductPrice)}>
              ${(data?.price ? count * data?.price : count).toFixed(2)}
            </p>

            <Input
              className={cn(style.cartProductInput)}
              onChange={onChange}
              type="number"
              value={String(count)}
              min={1}
              max={99}
              labelPlacement="outside"
            />

            <FontAwesomeIcon className={style.checkoutTrash} icon={faTrash} size="2xl" style={{ color: '#B197FC' }} onClick={onDelete}/>
          </div>
        </CardBody>
      </Card>
    </li>
  )
}

export default CartProduct
