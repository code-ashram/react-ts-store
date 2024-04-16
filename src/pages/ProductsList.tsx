import { FC, useContext } from 'react'
import { useLoaderData } from 'react-router-dom'

import ProductCard from '../components/ProductCard.tsx'
import { Cart, Product } from '../models'

import style from '../App.module.scss'
import cartContext from '../store/CartContext.ts'
import { ActionType as CartAction } from '../store/CartReducer.ts'

const ProductsList: FC = () => {
  const { products } = useLoaderData() as Record<'products', Product[]>

  const { cart, dispatchCart } = useContext(cartContext)

  const handleAddToCart = (id: number) => {
    if (!cart) return

    const payload: Cart = {
      ...cart, products: cart.products.some((product) => product.productId === id)
        ? cart.products.map((product) =>
          product.productId === id
            ? { ...product, quantity: product.quantity + 1 }
            : product)
        : [...cart.products, { productId: id, quantity: 1 }]
    }

    dispatchCart({
      type: CartAction.SetCart,
      payload
    })
  }

  return (
    <ul className={style.productList}>
      {products?.map((product) =>
        <li key={product.id}>
          <ProductCard product={product} onAdd={handleAddToCart} />
        </li>)}
    </ul>
  )
}

export default ProductsList
