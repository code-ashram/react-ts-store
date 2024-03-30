import { FC } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl/lib'
import { BreadcrumbItem, Breadcrumbs, Button, Divider, Link as NextUILink } from '@nextui-org/react'
import cn from 'classnames'

import { Product } from '../models'

import style from '../App.module.scss'

const ProductDetails: FC = () => {
  const { product } = useLoaderData() as Record<'product', Product>

  return (
    <>
      <Breadcrumbs className={cn(style.breadcrumbs)} size="lg">
        <BreadcrumbItem>
          <Link to={`/home`}>
            <FormattedMessage id={'breadcrumbs.home'} />
          </Link>
        </BreadcrumbItem>


        <BreadcrumbItem>
          <Link to={`/${product.category}`}>
            <FormattedMessage id={`category.${product.category}`} />
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          {product.title}
        </BreadcrumbItem>


      </Breadcrumbs>

      <div className={cn(style.productInfo)}>
        <h2 className={cn(style.productTitle)}>{product?.title}</h2>

        <p>
          <FormattedMessage id={'product.rating'} /> {product?.rating.rate} / 5
        </p>

        <NextUILink href="#" size="md">
          {product?.rating.count} <FormattedMessage id={'product.reviews'} />
        </NextUILink>
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
