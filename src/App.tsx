import { useMemo, useState } from 'react'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { IntlProvider } from 'react-intl'

import Container from './Components/UI/Container.tsx'
import NavBar from './Components/NavBar'

import { browserLang, defineTheme, Theme, translations } from './utils.ts'

import './App.module.scss'

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
      <IntlProvider locale={lang} messages={translations[lang]}>
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
