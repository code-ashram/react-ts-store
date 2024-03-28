import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as NextUILink, Button } from '@nextui-org/react'
import { FormattedMessage } from 'react-intl/lib'

import AcmeLogo from './assets/images/AcmeLogo.tsx'
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
        <AcmeLogo />
        <p className="font-bold text-inherit">Code Asharam</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink className={({isActive}) => isActive ? "active" : ""} to={`/about`}>
            <FormattedMessage id={"navBar.link.about"}/>
          </NavLink>
        </NavbarItem>
        <NavbarItem >
          <NavLink className={({isActive}) => isActive ? "active" : ""} to={`/delivery-and-payment`}>
            <FormattedMessage id={'navBar.link.delivery'} />
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink className={({isActive}) => isActive ? "active" : ""} to={`/contacts`}>
            <FormattedMessage id={"navBar.link.contacts"}/>
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className={styles.navBar__userPanel}>
          <ThemeSwitcher onSwitch={onSwitch} isActive={isActive} />

          <Button as={NextUILink} color="primary" variant="solid">
            <FormattedMessage id={"navBar.link.signOut"}/>
          </Button>
          <Button as={NextUILink} color="primary" href="#" variant="flat">
            <FormattedMessage id={"navBar.link.signIn"}/>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavBar
