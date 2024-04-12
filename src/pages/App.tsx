import { useEffect, useMemo, useReducer, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { Divider } from '@nextui-org/react'
import { Outlet } from 'react-router-dom'
import cn from 'classnames'

import Container from '../components/UI/Container.tsx'
import NavBar from '../components/NavBar'
import CategoryList from '../components/CategoryList.tsx'

import UserContext from '../store/UserContext.ts'
import CartContext from '../store/CartContext.ts'
import CartReducer from '../store/CartReducer.ts'
import UserReducer from '../store/UserReducer.ts'

import { browserLang, defineTheme, Theme, translations } from '../utils.ts'

import style from '../App.module.scss'

const App = () => {
  const [theme, setTheme] = useState<Theme>(defineTheme)
  const lang = useMemo(() => browserLang, [])
  const [user, dispatchUser] = useReducer(UserReducer, null)
  const [cart, dispatchCart] = useReducer(CartReducer, null)

  useEffect(() => {
    document.body.className = `${theme} text-foreground bg-background`
  }, [theme])

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
      <IntlProvider locale={lang} messages={translations[lang]}>
        <UserContext.Provider value={{ user, dispatch: dispatchUser }}>
          <CartContext.Provider value={{ cart, dispatch: dispatchCart }}>
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
          </CartContext.Provider>
        </UserContext.Provider>
      </IntlProvider>
    </>
  )
}

export default App
