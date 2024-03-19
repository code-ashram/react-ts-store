import { FC } from 'react'
import { Card, CardHeader, CardBody, Image, CardFooter, Button, Divider } from '@nextui-org/react'
import cn from 'classnames'

import { Product } from '../models'

import style from '../App.module.scss'

type Props = {
  product: Product
}

const ProductCard: FC<Props> = ({ product }) => {

  return (
    <Card className={cn(style.card, 'py-4')}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          alt="Card background"
          className={cn(style.cardImg, 'object-cover', 'rounded-xl')}
          src={product.image}
          height={300}
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <p className="text-default-500">{product.price} $</p>
        <h3 className="font-bold text-base">{product.title}</h3>
      </CardBody>
      <Divider />
      <CardFooter className="pb-0">
        <Button color="primary">
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
