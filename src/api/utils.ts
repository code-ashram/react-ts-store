import { LoaderFunctionArgs } from 'react-router-dom'

import { Cart, Category, Product } from '../models'
import { getCategory, getProduct, getUserCart } from './client.ts'

export const loadProducts = async ({ params }: LoaderFunctionArgs): Promise<Record<'products', Product[]>> => {
  const products = await getCategory(params.category as Category)
  return { products }
}

export const loadProduct = async ({ params }: LoaderFunctionArgs): Promise<Record<'product', Product>> => {
  const product = await getProduct(Number(params.productId))
  return { product }
}

export const loadCart = async ({ params }: LoaderFunctionArgs): Promise<Record<'cart', Cart>> => {
  const cart = await getUserCart(Number(params.userId))
  return { cart }
}
