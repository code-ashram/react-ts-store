import { useQuery } from '@tanstack/react-query'
import { getCategory } from '../api'
import { FC } from 'react'
import { Category } from '../models'

type Props = {
  category: Category
}

const ProductsList: FC<Props> = ({category}) => {
  const { data } = useQuery({ queryKey: ['products', category], queryFn: () => getCategory(category) })

  {console.log(category, data)}
  return (
    <ul>

    </ul>
  )
}

export default ProductsList
