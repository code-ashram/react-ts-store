import { Select, SelectItem } from '@nextui-org/react'
import { FC, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getCategories } from '../api'
import { Category } from '../models'

const CategoryPicker: FC = () => {
  const { data } = useQuery({ queryKey: ['categories'], queryFn: getCategories })
  const categories = useMemo(() =>
    Array.isArray(data) ? [Category.All, ...data] : [Category.All], [data])

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label="Product category"
        placeholder="Select product category"
        className="max-w-xs"
        defaultSelectedKeys={[Category.All]}
      >
        {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
      </Select>
    </div>
  )
}

export default CategoryPicker
