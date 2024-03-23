import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../api'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl/lib'
import { Category } from '../../models'

const CategoryList: FC = () => {
  const { data } = useQuery({ queryKey: ['categories'], queryFn: getCategories })

  return (
    <ul>
      <li key={Category.All}>
        <Link to={`/${Category.All}`}>
          {/* <FormattedMessage id={`category.all`} /> */}
          {Category.All}
        </Link>
      </li>

      {data?.map((category) =>
        <li key={category}>
          <Link to={`/${category}`}>
            {category}
            {/* <FormattedMessage id={`category.${category}`} /> */}
          </Link>
        </li>)}
    </ul>
  )
}

export default CategoryList
