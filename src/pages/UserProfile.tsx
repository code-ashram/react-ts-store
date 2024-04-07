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

import userContext from '../store/UserContext.ts'

import { replaceForDash, transformToUppercase, userFullName } from '../utils.ts'

import style from '../App.module.scss'

const UserProfile: FC = () => {
  const { user } = useContext(userContext)

  return (
    <>
      <div className={cn(style.profileHeader, 'flex flex-row items-center')}>
        <Avatar src={user
          ? 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
          : 'https://images.unsplash.com/broken'}
                size="lg"
                radius="sm"
        />
        <h2 className="ml-2">@{user ? `${user.name.firstname}${user.name.lastname}` : 'uknownuser'}</h2>
      </div>

      <Table className={cn(style.profileTable)} aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>№</TableColumn>
          <TableColumn>INFO</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Full name</TableCell>
            <TableCell><h2>{user ? userFullName(user) : '-'}</h2></TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>City</TableCell>
            <TableCell>{user ? transformToUppercase(user?.address.city) : '-'}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>ZIP-code:</TableCell>
            <TableCell>{replaceForDash(user, user?.address.zipcode)}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Street:</TableCell>
            <TableCell>{replaceForDash(user, user?.address.street)}</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Home:</TableCell>
            <TableCell>{replaceForDash(user, String(user?.address.number))}</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>Email:</TableCell>
            <TableCell>{replaceForDash(user, user?.email)}</TableCell>
          </TableRow>
          <TableRow key="7">
            <TableCell>Phone number: </TableCell>
            <TableCell>{replaceForDash(user, user?.phone)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default UserProfile
