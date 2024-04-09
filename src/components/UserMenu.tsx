import { FC, useContext } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User as UserUI } from '@nextui-org/react'
import { FormattedMessage } from 'react-intl/lib'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ActionType } from '../store/UserReducer.ts'
import UserContext from '../store/UserContext.ts'

const UserMenu: FC = () => {
  const { dispatch } = useContext(UserContext)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleLogout = () => {
    dispatch({
      type: ActionType.SetUser,
      payload: null
    })

    if (pathname === '/user-profile') navigate('/home')
  }

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <UserUI
            as="button"
            avatarProps={{
              showFallback: true,
              isBordered: true,
              src: 'https://images.unsplash.com/broken',
              color: 'primary'
            }}
            className="transition-transform"
            description={null}
            name={null}
          />
        </DropdownTrigger>

        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile">
              <Link to={`/user-profile`}>
                <FormattedMessage id={'user.dropdown.profile'} />
              </Link>
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
