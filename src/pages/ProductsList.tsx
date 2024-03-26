import { FC } from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'

import ProductCard from '../components/ProductCard.tsx'
import { Category, Product } from '../models'

import style from '../App.module.scss'

const ProductsList: FC = () => {
  const { products } = useLoaderData() as Record<'products', Product[]>
  const params = useParams()

  return (
    <ul className={style.productList}>
      {products?.map((product) =>
        <li key={product.id}>
          <Link to={`/${params.category === Category.All ? product.category : params.category}/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        </li>)}
    </ul>
  )
}

export default ProductsList
