import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Selection } from '@nextui-org/react'
import { FC, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api'
import { Category } from '../models'

type Props = {
  value: Category
  onChange: (category: Category) => void
}

const CategoryPicker2: FC<Props> = ({ value, onChange }) => {
  const { data } = useQuery({ queryKey: ['categories'], queryFn: getCategories })
  const categories = useMemo(() => Array.isArray(data) ? [Category.All, ...data] : [Category.All], [data])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChangeValue = (keys: Selection): any => {
    if (keys === Category.All) {
      onChange(Category.All)
    } else {
      const [category] = Array.from((keys) as Set<Category>)
      onChange(category)
    }

    return keys
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="capitalize"
        >
          {value}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={value}
        onSelectionChange={handleChangeValue}
      >
        {categories?.map((category) => (
          <DropdownItem key={category} value={category}>
            {category}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default CategoryPicker2
