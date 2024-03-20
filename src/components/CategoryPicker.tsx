import { FC, Key, useMemo } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'
import cn from 'classnames'
import { useQuery } from '@tanstack/react-query'

import { getCategories } from '../api'
import { Category } from '../models'
import { createOptions } from '../utils.ts'

import style from '../App.module.scss'
import { FormattedMessage } from 'react-intl/lib'

type Props = {
  value: Category
  onChange: (value: Category) => void
}

type Option = {
  key: string,
  title: string
}

const CategoryPicker: FC<Props> = ({ value = Category.All, onChange }) => {
  const { data } = useQuery({ queryKey: ['categories'], queryFn: getCategories })
  const categories: Option[] = useMemo(() => createOptions(data), [data])

  const handleChange = (key: Key): void => onChange((key as Category) === value ? Category.All : (key as Category))

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className={cn(style.storeDropdown, 'capitalize')}
        >
          <FormattedMessage id={`category.${value}`} defaultMessage="category.all"/>
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
            <FormattedMessage id={`category.${item.title}`} />
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default CategoryPicker
