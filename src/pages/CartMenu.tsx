import { FC, useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent, Button, Badge } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

type Props = {
  toCheckout: string
}

const CartMenu: FC<Props> = ({ toCheckout }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Popover placement="bottom" showArrow={true} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <Badge content="5" size="md" color="primary">
        <PopoverTrigger>
          <FontAwesomeIcon icon={faCartShopping} size="2xl" />
        </PopoverTrigger>
      </Badge>

      <PopoverContent>
        <div>
          <div className="text-small font-bold">Popover Content</div>
          <div className="text-tiny mb-2">This is the popover content</div>

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
