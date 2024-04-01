import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { FormattedMessage } from 'react-intl/lib'

import AcmeLogo from './assets/images/AcmeLogo.tsx'
import LoginForm from '../LoginForm/LoginForm.tsx'
import ThemeSwitcher from './parts/ThemeSwitcher/ThemeSwitcher.tsx'

import styles from '../../App.module.scss'

type Props = {
  onSwitch: () => void
  isActive: boolean
}

const NavBar: FC<Props> = ({ onSwitch, isActive }) => {

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
        <NavbarItem className={styles.navBar__userPanel}>
          <ThemeSwitcher onSwitch={onSwitch} isActive={isActive} />

          <LoginForm/>

          {/* <Button as={NextUILink} color="primary" href="#" variant="solid"> */}
          {/*   <FormattedMessage id={'navBar.link.signIn'} /> */}
          {/* </Button> */}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavBar
