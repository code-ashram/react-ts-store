import { FC } from 'react'
import { Card, CardHeader, CardBody, Image, CardFooter, Button, Divider } from '@nextui-org/react'
import cn from 'classnames'

import { Product } from '../models'

import style from '../App.module.scss'
import { FormattedMessage } from 'react-intl/lib'

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
        <h3 className={cn(style.cardTitle, 'font-bold', 'text-base')}>{product.title}</h3>
        <h4 className={cn(style.cardRating)}>Rating: {product.rating.rate} / 5</h4>
      </CardBody>
      <Divider />
      <CardFooter className="pb-0">
        <Button color="primary">
          <FormattedMessage id={'product.button.add'} />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
