type CartProduct = {
  productId: number
  quantity: number
}

type Cart = {
  id: number,
  userId: number,
  date: string,
  products: CartProduct[]
  __v: number
}

export default  Cart
