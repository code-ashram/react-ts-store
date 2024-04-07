import en from './translations/en.json'
import ru from './translations/ru.json'
import { Category } from './models'
import User from './models/user.ts'

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

export const defineTheme = (): Theme => {
  const darkTheme: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light
  return localStorage.getItem('theme') as Theme | null ?? darkTheme
}

enum Language {
  en = 'en',
  ru = 'ru',
}

export const translations: Record<Language, Record<string, string>> = {
  en,
  ru
}

export const browserLang: Language = navigator.language !== Language.ru ? Language.en : Language.ru

type Option = {
  key: string,
  title: string
}

export const createOptions = (data: Category[] | undefined): Option[] => (Array.isArray(data)
  ? [{ key: Category.All, title: Category.All }, ...data.map((category) => ({ key: category, title: category }))]
  : [{ key: Category.All, title: Category.All }])

export const transformToUppercase = (word: string | undefined) =>
  word ? word.charAt(0).toUpperCase() + word.slice(1) : null

export const userFullName = (user: User | null) =>
  user ? `${transformToUppercase(user.name.firstname)} ${transformToUppercase(user.name.lastname)}` : null

export const replaceForDash = (user: User | null, userInfo: string | undefined) => user ? userInfo : '-'
