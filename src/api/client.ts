import axios from 'axios'

import { Category, Product } from '../models'
import User from '../models/user.ts'

const BASE_URL = 'https://fakestoreapi.com'

const client = axios.create({
  baseURL: BASE_URL
})

export const setToken = (token: string) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const getCategories = async (): Promise<Category[]> =>
  client.get<Category[]>(`/products/categories`)
    .then((response) => response.data)

export const getCategory = async (category: Category): Promise<Product[]> =>
  client.get<Product[]>(`/products${category === Category.All ? '' : `/category/${category}`}`)
    .then((response) => response.data)

export const getProduct = async (id: number): Promise<Product> =>
  client.get<Product>(`/products/${id}`)
    .then((response) => response.data)

export const postAuth = async (username: string, password: string): Promise<Record<'token', string>> =>
  client.post(`/auth/login`, { username, password })
    .then((response) => response.data)

export const getUser = async (id: number): Promise<User> =>
  client.get<User>(`/users/${id}`)
    .then((response) => response.data)
