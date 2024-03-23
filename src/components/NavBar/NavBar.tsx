import { FC } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react'
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
          <Link color="foreground" href="#">
            {/* <FormattedMessage id={"navBar.link.about"}/> */}
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            {/* <FormattedMessage id={'navBar.link.delivery'} /> */}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            {/* <FormattedMessage id={"navBar.link.contacts"}/> */}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">

          </Link>
        </NavbarItem>
        <NavbarItem className={styles.navBar__userPanel}>
          <ThemeSwitcher onSwitch={onSwitch} isActive={isActive} />

          <Button as={Link} color="primary" variant="solid">
            {/* <FormattedMessage id={"navBar.link.signOut"}/> */}
          </Button>
          <Button as={Link} color="primary" href="#" variant="flat">
            {/* <FormattedMessage id={"navBar.link.signIn"}/> */}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavBar
