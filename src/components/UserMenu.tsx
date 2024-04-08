import { FC } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User as UserUI } from '@nextui-org/react'
import { FormattedMessage } from 'react-intl/lib'

import { Link, useLocation, useNavigate } from 'react-router-dom'

type Props = {
  onLogout: () => void
}

const UserMenu: FC<Props> = ({ onLogout }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleLogout = () => {
    onLogout()
    if (pathname === '/user-profile') navigate('/home')
  }

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <UserUI
            as="button"
            avatarProps={{
              isBordered: true,
              src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
              color: 'primary'
            }}
            className="transition-transform"
            description={null}
            name={null}
          />
        </DropdownTrigger>

        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">
              <Link to={`/user-profile`}>
                Profile
              </Link>
            </p>
          </DropdownItem>

          <DropdownItem key="logout" color="danger" onClick={handleLogout}>
            <FormattedMessage id={'user.dropdown.logout'} />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default UserMenu
