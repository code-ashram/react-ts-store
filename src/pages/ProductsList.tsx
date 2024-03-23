import { FC } from 'react'
import { useLoaderData } from 'react-router-dom'

import ProductCard from '../components/ProductCard.tsx'
import { Product } from '../models'

import style from '../App.module.scss'

const ProductsList: FC = () => {
  const { products } = useLoaderData() as Record<'products', Product[]>

  return (
    <ul className={style.productList}>
      {products?.map((product) =>
        <li key={product.id}>
          <ProductCard product={product} />
        </li>)}
    </ul>
  )
}


export default ProductsList
