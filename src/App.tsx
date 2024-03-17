import { useEffect, useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'

import Container from './components/UI/Container.tsx'
import NavBar from './components/NavBar'
import CategoryPicker from './components/CategoryPicker.tsx'

import { Category } from './models'
import { browserLang, defineTheme, Theme, translations } from './utils.ts'

import './App.module.scss'
import ProductsList from './components/ProductsList.tsx'

const App = () => {
  const [theme, setTheme] = useState<Theme>(defineTheme)
  const [category, setCategory] = useState<Category>(Category.All)
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

  const handleChangeCategory = (value: Category) => {
    setCategory(value)
  }

  useEffect(() => {}, [category])

  return (
    <>
      <IntlProvider locale={lang} messages={translations[lang]}>
        <main className={`${theme} text-foreground bg-background`}>
          <NavBar onSwitch={handleSwitchColorTheme} isActive={theme === Theme.Dark} />

          <Container>
            <CategoryPicker onChange={handleChangeCategory} value={category} />

            <ProductsList category={category}/>
          </Container>
        </main>
      </IntlProvider>
    </>
  )
}

export default App
