import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react'
import { FC } from 'react'

import AcmeLogo from './assets/images/AcmeLogo.tsx'
import ThemeSwitcher from './parts/ThemeSwitcher/ThemeSwitcher.tsx'

import styles from '../../App.module.scss'

type Props = {
  onSwitch: () => void
  isActive: boolean
}

const NavBar: FC<Props> = ({onSwitch, isActive}) => {

  return (
    <Navbar isBordered maxWidth="2xl">
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">Code Asharam</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Delivery And Payment
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Contacts
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem className={styles.navBar__userPanel}>
          <ThemeSwitcher onSwitch={onSwitch} isActive={isActive}/>

          <Button as={Link} color="primary" variant="solid">
            Sign In
          </Button>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavBar
