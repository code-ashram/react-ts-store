import { LoaderFunctionArgs } from 'react-router-dom'

import { Category, Product } from '../models'
import { getCategory, getProduct } from './client.ts'

export const loadProducts = async ({ params }: LoaderFunctionArgs): Promise<Record<'products', Product[]>> => {
  const products = await getCategory(params.category as Category)
  return { products }
}

export const loadProduct = async ({ params }: LoaderFunctionArgs): Promise<Record<'product', Product>> => {
  const product = await getProduct(Number(params.productId))
  return { product }
}
