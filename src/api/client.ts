import axios from 'axios'

import { Category, Product } from '../models'

const BASE_URL = 'https://fakestoreapi.com'

const client = axios.create({
  baseURL: BASE_URL
})

export const getCategories = async (): Promise<Category[]> =>
  client.get<Category[]>(`/products/categories`)
    .then((response) => response.data)

export const getCategory = async (category: Category): Promise<Product[]> =>
  client.get<Product[]>(`/products${category === Category.All ? '' : `/category/${category}`}`)
    .then((response) => response.data)

export const getProduct = async (id: number): Promise<Product> =>
  client.get<Product>(`/products/${id}`)
    .then((response) => response.data)
