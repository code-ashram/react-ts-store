import { FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import { FormattedMessage } from 'react-intl/lib'
import { BreadcrumbItem, Breadcrumbs, Button, Divider, Link } from '@nextui-org/react'
import cn from 'classnames'

import { Product } from '../models'

import style from '../App.module.scss'

const ProductDetails: FC = () => {
  const { product } = useLoaderData() as Record<'product', Product>

  return (
    <>
      <Breadcrumbs className={cn(style.breadcrumbs)} size="lg">
        <BreadcrumbItem>
          <FormattedMessage id={'breadcrumbs.home'} />
        </BreadcrumbItem>

        {product &&
          <>
            <BreadcrumbItem>
              <FormattedMessage id={`category.${product.category}`} />
            </BreadcrumbItem>

            <BreadcrumbItem>
              {product.title}
            </BreadcrumbItem>
          </>
        }

      </Breadcrumbs>

      <div className={cn(style.productInfo)}>
        <h2 className={cn(style.productTitle)}>{product?.title}</h2>

        <p>
          <FormattedMessage id={'product.rating'} /> {product?.rating.rate} / 5
        </p>

        <Link href="#" size="md">
          {product?.rating.count} <FormattedMessage id={'product.reviews'} />
        </Link>
      </div>

      <div className={cn(style.productWrapper)}>
        <div className={cn(style.productImg)}>
          <img src={product?.image} alt="product picture" />
        </div>


        <div className={cn(style.productDetails)}>
          <p className={cn(style.productPrice)}>${product?.price}</p>

          <Button color="primary">
            <FormattedMessage id={'product.button.add'} />
          </Button>

          <Divider />

          <p className={cn(style.productText)}>{product?.description}</p>
        </div>
      </div>
    </>
  )
}

export default ProductDetails
