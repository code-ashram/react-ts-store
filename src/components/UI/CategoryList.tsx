import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl/lib'
import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'

import { getCategories } from '../../api'
import { Category } from '../../models'

const CategoryList: FC = () => {
  const { data } = useQuery({ queryKey: ['categories'], queryFn: getCategories })

  return (
    <ul className={cn('categoryList')}>
      <li key={Category.All}>
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to={`/${Category.All}`}>
          <FormattedMessage id={`category.all`} />
        </NavLink>
      </li>

      {data?.map((category) =>
        <li key={category}>
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} to={`/${category}`}>
            <FormattedMessage id={`category.${category}`} />
          </NavLink>
        </li>)}
    </ul>
  )
}

export default CategoryList
