import { FC } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User as UserUI } from '@nextui-org/react'
import { FormattedMessage } from 'react-intl/lib'

import User from '../models/user.ts'
import { userFullName } from '../utils.ts'
import { Link, useParams } from 'react-router-dom'

type Props = {
  user: User
  onLogout: () => void
}

const UserDropdown: FC<Props> = ({ user, onLogout }) => {
  const params = useParams()

  console.log(params)

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
            description={`@${user.name.firstname}${user.name.lastname}`}
            name={userFullName(user)}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">
              <FormattedMessage id={'user.dropdown.signed'} />
            </p>
            <p className="font-bold">
              <Link to={`/user-profile`}>
                {`@${user.name.firstname}${user.name.lastname}`}
              </Link>
            </p>
          </DropdownItem>


          <DropdownItem key="logout" color="danger" onClick={onLogout}>
            <FormattedMessage id={'user.dropdown.logout'} />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default UserDropdown
