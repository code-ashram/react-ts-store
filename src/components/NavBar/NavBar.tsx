import { FC, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

import { FormattedMessage } from 'react-intl/lib'
import cn from 'classnames'

import ThemeSwitcher from './parts/ThemeSwitcher/ThemeSwitcher'
import UserMenu from '../UserMenu/UserMenu'
import CartMenu from '../../pages/CartMenu'

import cartContext from '../../store/CartContext.ts'
import userContext from '../../store/UserContext.ts'

import AcmeLogo from './assets/images/AcmeLogo'
import LoginForm from '../LoginForm/LoginForm'

import styles from '../../App.module.scss'
import { useIntl } from 'react-intl'

type Props = {
  onSwitch: () => void
  isActive: boolean
}

const NavBar: FC<Props> = ({ onSwitch, isActive }) => {
  const { user } = useContext(userContext)
  const { cart } = useContext(cartContext)
  const { formatMessage } = useIntl()

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
              <CartMenu toCheckout={`/checkout`} count={cart ? cart.products.length : 0} />
              <UserMenu />
            </div>

            : <LoginForm btnText={formatMessage({ id: 'navBar.link.signIn' })} />
          }
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavBar
