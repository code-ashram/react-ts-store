import { ChangeEvent, FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, CardBody, Image, Input } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'

import { getProduct } from '../../api'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import style from '../../App.module.scss'

type Props = {
  productId: number
  count: number
  onChange: (productId: number, count: number) => void
}

const CartProduct: FC<Props> = ({ productId, count, onChange }) => {
  const { data } = useQuery({ queryKey: ['product', productId], queryFn: () => getProduct(+productId) })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(productId, Number(e.target.value))
  }

  const handleDelete = () => {
    onChange(productId, 0)
  }

  return (
    <li>
      <Card>
        <CardBody className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <div className={cn(style.cartProductImg, 'rounded-md')}>
              <Image className="rounded-none" src={data?.image} alt={data?.title} width={100} isZoomed />
            </div>

            <div className={style.cartProductName}>
              <p>
                {data?.title}
              </p>
            </div>
          </div>

          <div className={cn(style.cartProductControl, 'flex flex-row items-center justify-between')}>
            <p className={cn(style.cartProductPrice)}>
              ${(data?.price ? count * data?.price : count).toFixed(2)}
            </p>

            <Input
              className={cn(style.cartProductInput)}
              onChange={handleChange}
              type="number"
              value={String(count)}
              min={0}
              max={99}
              labelPlacement="outside"
            />

            <Button type="button" className={cn(style.checkoutTrash)} onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} size="2xl" style={{ color: '#B197FC' }} />
            </Button>
          </div>
        </CardBody>
      </Card>
    </li>
  )
}

export default CartProduct
