import { useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'

import Container from './Components/UI/Container.tsx'
import NavBar from './Components/NavBar'
import CategoryPicker2 from './Components/CategoryPicker2.tsx'

import { Category } from './models'
import { browserLang, defineTheme, Theme, translations } from './utils.ts'

import './App.module.scss'

const App = () => {
  const [theme, setTheme] = useState<Theme>(defineTheme)
  const [value, setValue] = useState<Category>(Category.All)
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

const handleChangeValue = (e) => {
  setValue(e.target.value)
}

  return (
    <>
      <IntlProvider locale={lang} messages={translations[lang]}>
        <main className={`${theme} text-foreground bg-background`}>
          <NavBar onSwitch={handleSwitchColorTheme} isActive={theme === Theme.Dark} />
          <Container>
            <CategoryPicker2 onChange={handleChangeValue} value={value}/>
          </Container>
        </main>
      </IntlProvider>
    </>
  )
}

export default App
