import { useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { Divider } from '@nextui-org/react'
import cn from 'classnames'

import Container from '../components/UI/Container.tsx'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

import { browserLang, defineTheme, Theme, translations } from '../utils.ts'

import style from '../App.module.scss'
import CategoryList from '../components/UI/CategoryList.tsx'

const App = () => {
  const [theme, setTheme] = useState<Theme>(defineTheme)
  const lang = useMemo(() => browserLang, [])

  const handleSwitchColorTheme = () => {
    setTheme((prevTheme) => {
        const nextTheme: Theme = prevTheme === Theme.Light
          ? Theme.Dark
          : Theme.Light

        localStorage.setItem('theme', nextTheme)
        return nextTheme
      }
    )
  }

  return (
    <>

        <main className={cn(theme, 'text-foreground', 'bg-background')}>
          <NavBar onSwitch={handleSwitchColorTheme} isActive={theme === Theme.Dark} />

          <Container>
            <ul className={style.storeFilter}>
              <CategoryList />
              <Divider orientation="vertical" />
            </ul>

            <section className={style.storeSection}>
              <Outlet />
            </section>
          </Container>
        </main>

    </>
  )
}

export default App
