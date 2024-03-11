import { useState } from 'react'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { IntlProvider } from 'react-intl'

import Container from './Components/UI/Container.tsx'
import NavBar from './Components/NavBar'

import ru from './translations/ru.json'
import en from './translations/en.json'

import './App.module.scss'

enum Theme {
  Light = 'light',
  Dark = 'dark'
}

const languages = {
  en: en,
  ru: ru
}

const App = () => {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem('theme') as Theme | null ?? Theme.Light)

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

  // const handleSwitchLanguage = () => {
  //
  // }

  return (
    <>
      <IntlProvider locale={'ru'} messages={languages.ru}>
        <main className={`${theme} text-foreground bg-background`}>
          <NavBar onSwitch={handleSwitchColorTheme} isActive={theme === Theme.Dark} />
          <Container>
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>Tony Reichert</TableCell>
                  <TableCell>CEO</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>Zoey Lang</TableCell>
                  <TableCell>Technical Lead</TableCell>
                  <TableCell>Paused</TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell>Jane Fisher</TableCell>
                  <TableCell>Senior Developer</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key="4">
                  <TableCell>William Howard</TableCell>
                  <TableCell>Community Manager</TableCell>
                  <TableCell>Vacation</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Container>
        </main>
      </IntlProvider>
    </>
  )
}

export default App
