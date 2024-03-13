import en from './translations/en.json'
import ru from './translations/ru.json'

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

export const defineTheme = (): Theme => {
  const darkTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light
  return localStorage.getItem('theme') as Theme | null ?? darkTheme
}

enum Language {
  en = 'en',
  ru = 'ru',
}

export const translations: Record<Language, Record<string, string>> = {
  en,
  ru,
}

export const browserLang: Language = navigator.language !== Language.ru ? Language.en : Language.ru
