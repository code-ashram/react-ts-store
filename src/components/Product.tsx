import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BreadcrumbItem, Breadcrumbs, Button, Divider, Link } from '@nextui-org/react'
import { FormattedMessage } from 'react-intl/lib'
import cn from 'classnames'

import { getProduct } from '../api'

import style from '../App.module.scss'

const Product: FC = () => {
  const { data } = useQuery({ queryKey: ['product'], queryFn: () => getProduct(2) })

  return (
    <>
      <Breadcrumbs className={cn(style.breadcrump)} size="lg">
        <BreadcrumbItem>
          <FormattedMessage id={'breadcrumbs.home'}/>
        </BreadcrumbItem>

        {data &&
          <>
            <BreadcrumbItem >
              <FormattedMessage id={`category.${data.category}`} />
            </BreadcrumbItem>

            <BreadcrumbItem>
              {data.title}
            </BreadcrumbItem>
          </>
        }

      </Breadcrumbs>

      <div className={cn(style.productInfo)}>
        <h2 className={cn(style.productTitle)}>{data?.title}</h2>
        <p>
          <FormattedMessage id={'product.rating'} /> {data?.rating.rate} / 5
        </p>
        <Link href="#" size="md">
          {data?.rating.count} <FormattedMessage id={'product.reviews'} /></Link>
      </div>

      <div className={cn(style.productWrapper)}>
        <img className={cn(style.productImg)} src={data?.image} alt="product picture" />

        <div className={cn(style.productDetails)}>
          <p className={cn(style.productPrice)}>${data?.price}</p>

          <Button color="primary">
            <FormattedMessage id={'product.button.add'} />
          </Button>

          <Divider />

          <p className={cn(style.productText)}>{data?.description}</p>
        </div>
      </div>
    </>
  )
}

export default Product
