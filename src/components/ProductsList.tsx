import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'

import ProductCard from './ProductCard.tsx'

import { getCategory } from '../api'
import { Category } from '../models'

import style from '../App.module.scss'

type Props = {
  category: Category
}

const ProductsList: FC<Props> = ({ category }) => {
  const { data } = useQuery({ queryKey: ['products', category], queryFn: () => getCategory(category) })

  return (
    <ul className={style.productList}>
      {data?.map((product) =>
        <li key={product.id}>
          <ProductCard product={product} />
        </li>)}
    </ul>
  )
}

export default ProductsList
