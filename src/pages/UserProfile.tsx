import { FC, useContext } from 'react'
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader, TableRow
} from '@nextui-org/react'
import cn from 'classnames'
import { FormattedMessage } from 'react-intl/lib'

import userContext from '../store/UserContext.ts'

import { transformToUppercase, userFullName } from '../utils.ts'

import style from '../App.module.scss'

const UserProfile: FC = () => {
  const { user } = useContext(userContext)

  return (
    <>
      <div className={cn(style.profileHeader, 'flex flex-row items-center')}>
        <Avatar src={'https://images.unsplash.com/broken'} size="lg" radius="sm" showFallback/>
        <h2 className="ml-2">@{`${user?.name.firstname}${user?.name.lastname}`}</h2>
      </div>

      <Table className={cn(style.profileTable)} aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>№</TableColumn>
          <TableColumn>
            <FormattedMessage id={'user.profile.th'} />
          </TableColumn>
        </TableHeader>

        <TableBody>
          <TableRow key="1">
            <TableCell>
              <FormattedMessage id={'user.profile.name'} />
            </TableCell>

            <TableCell><h2>{userFullName(user)}</h2></TableCell>
          </TableRow>

          <TableRow key="2">
            <TableCell>
              <FormattedMessage id={'user.profile.city'} />
            </TableCell>

            <TableCell>{transformToUppercase(user?.address.city)}</TableCell>
          </TableRow>

          <TableRow key="3">
            <TableCell>
              <FormattedMessage id={'user.profile.zipcode'} />
            </TableCell>

            <TableCell>{user?.address.zipcode}</TableCell>
          </TableRow>

          <TableRow key="4">
            <TableCell>
              <FormattedMessage id={'user.profile.street'} />
            </TableCell>
            <TableCell>{user?.address.street}</TableCell>
          </TableRow>

          <TableRow key="5">
            <TableCell>
              <FormattedMessage id={'user.profile.home'} />
            </TableCell>
            <TableCell>{user?.address.number}</TableCell>
          </TableRow>

          <TableRow key="6">
            <TableCell>
              <FormattedMessage id={'user.profile.email'} />
            </TableCell>
            <TableCell>{user?.email}</TableCell>
          </TableRow>

          <TableRow key="7">
            <TableCell>
              <FormattedMessage id={'user.profile.phone'} />
            </TableCell>
            <TableCell>{user?.phone}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default UserProfile
