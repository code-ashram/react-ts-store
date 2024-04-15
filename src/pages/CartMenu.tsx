import { FC, useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent, Button, Badge } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Checkout from './Checkout.tsx'

type Props = {
  toCheckout: string
  count: number | null
}

const CartMenu: FC<Props> = ({ toCheckout, count }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Popover placement="bottom-end" showArrow={true} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <Badge content={count} size="md" color="primary">
        <PopoverTrigger>
          <FontAwesomeIcon icon={faCartShopping} size="2xl" />
        </PopoverTrigger>
      </Badge>

      <PopoverContent>
        <div className="mt-2">
          <Checkout/>

          <Button type="button" className="mb-2" color="primary" onClick={() => setIsOpen(false)}>
            <Link to={toCheckout}>
              Checkout
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default CartMenu
