import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'
import { FC, Key, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api'
import { Category } from '../models'
import { createOptions } from '../utils.ts'

type Props = {
  value: Category
  onChange: (value: Category) => void
}

type Option = {
  key: string,
  title: string
}

const CategoryPicker: FC<Props> = ({ value, onChange }) => {
  const { data } = useQuery({ queryKey: ['categories'], queryFn: getCategories })
  const categories: Option[] = useMemo(() => createOptions(data), [data])

  const handleChange = (key: Key): void => onChange((key as Category) === value ? Category.All : (key as Category))

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
        selectionMode="single"
        items={categories}
        defaultSelectedKeys={[Category.All]}
        selectedKeys={[value]}
        onAction={handleChange}
        disallowEmptySelection
      >
        {(item) => (
          <DropdownItem key={item.key}>
            {item.title}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default CategoryPicker
