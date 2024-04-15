import { FC, useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { useQueryClient } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { FormattedMessage } from 'react-intl/lib'
import cn from 'classnames'

import ThemeSwitcher from './parts/ThemeSwitcher/ThemeSwitcher.tsx'
import UserMenu from '../UserMenu.tsx'
import CartMenu from '../../pages/CartMenu.tsx'

import { ActionType } from '../../store/UserReducer.ts'
import { ActionType as CartAction } from '../../store/CartReducer.ts'
import cartContext from '../../store/CartContext.ts'
import UserContext from '../../store/UserContext.ts'
import { User } from '../../models'
import { getUser, getUserCart, postAuth } from '../../api'

import AcmeLogo from './assets/images/AcmeLogo.tsx'
import LoginForm from '../LoginForm/LoginForm.tsx'

import styles from '../../App.module.scss'

type Props = {
  onSwitch: () => void
  isActive: boolean
}

const NavBar: FC<Props> = ({ onSwitch, isActive }) => {
  const [auth, setAuth] =
    useState<Pick<User, 'username' | 'password'>>({ username: '', password: '' })
  const { user, dispatch: dispatchUser } = useContext(UserContext)
  const { cart, dispatch: dispatchCart } = useContext(cartContext)
  const [validation, setValidation] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const handleChangeAuth = (payload: Partial<User>) => {
    setAuth(prevUserData => ({ ...prevUserData, ...payload }))
  }

  const handleSubmitAuth = async () => {
    try {
      const { token } = await queryClient.fetchQuery({
        queryKey: ['auth'],
        queryFn: () => postAuth(auth.username, auth.password)
      })

      const { sub } = jwtDecode<Record<'sub', number>>(token)

      const user = await queryClient.fetchQuery({ queryKey: ['user', `${sub}`], queryFn: () => getUser(sub) })

      dispatchUser({
        type: ActionType.SetUser,
        payload: user
      })

      const [userCart] = await queryClient.fetchQuery({ queryKey: ['cart'], queryFn: () => getUserCart(sub) })

      dispatchCart({
        type: CartAction.SetCart,
        payload: userCart
      })


    } catch (error) {
      console.error(error)
      setValidation(true)
    }
  }

  return (
    <Navbar isBordered maxWidth="2xl">
      <NavbarBrand>
        <Link className={styles.navLogo} to={'/home'}>
          <AcmeLogo />
          <p className="font-bold text-inherit">Code Asharam</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} to={`/about`}>
            <FormattedMessage id={'navBar.link.about'} />
          </NavLink>
        </NavbarItem>

        <NavbarItem>
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} to={`/delivery-and-payment`}>
            <FormattedMessage id={'navBar.link.delivery'} />
          </NavLink>
        </NavbarItem>

        <NavbarItem>
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} to={`/contacts`}>
            <FormattedMessage id={'navBar.link.contacts'} />
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className={cn(styles.navBar__userPanel, 'flex')}>
          <ThemeSwitcher onSwitch={onSwitch} isActive={isActive} />

          {user
            ? <div className={styles.navBar__userProfile}>
              <CartMenu toCheckout={`/checkout`} count={cart ? cart.products.length : 0}/>

              <UserMenu />
            </div>

            : <LoginForm
              auth={auth}
              onChange={handleChangeAuth}
              onSubmit={handleSubmitAuth}
              onFocus={() => setValidation(false)}
              isInvalid={validation} />
          }
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavBar
