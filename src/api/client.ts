import axios from 'axios'

import { Category } from '../models'

const BASE_URL = 'https://fakestoreapi.com'

const client = axios.create({
  baseURL: BASE_URL
})

export const getCategories = async (): Promise<Category[]> =>
  client.get<Category[]>(`/products/categories`)
    .then((response) => response.data)
