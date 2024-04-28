import { FC, useContext } from 'react'
import { FormattedMessage } from 'react-intl/lib'
import { Link, useParams } from 'react-router-dom'
import { Card, CardHeader, CardBody, Image, CardFooter, Button, Divider } from '@nextui-org/react'
import cn from 'classnames'

import { Category, Product } from '../../models'

import style from '../../App.module.scss'
import userContext from '../../store/UserContext.ts'
import LoginForm from '../LoginForm/LoginForm.tsx'
import { useIntl } from 'react-intl'

type Props = {
  product: Product
  onAdd: (id: number) => void
}

const ProductCard: FC<Props> = ({ product, onAdd }) => {
  const { user } = useContext(userContext)
  const params = useParams()
  const { formatMessage } = useIntl()

  return (
    <Card className={cn(style.card, 'py-4')}>
      <Link to={`/${params.category === Category.All ? product.category : params.category}/${product.id}`}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <Image
            alt="Card background"
            className={cn(style.cardImg, 'object-cover', 'rounded-xl')}
            src={product.image}
            height={300}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <p className="text-default-500">${product.price}</p>
          <h3 className={cn(style.cardTitle, 'font-bold', 'text-base')}>{product.title}</h3>
          <h4 className={cn(style.cardRating)}>Rating: {product.rating.rate} / 5</h4>
        </CardBody>
      </Link>

      <Divider />
      <CardFooter className="pb-0">
        {
          user
            ? <Button color="primary" onClick={() => onAdd(product.id)}>
              <FormattedMessage id={'product.button.add'} />
            </Button>

            : <LoginForm btnText={formatMessage({ id: 'product.button.add' })} />
        }
      </CardFooter>
    </Card>
  )
}

export default ProductCard
