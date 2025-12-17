export interface Cart {
  id: string
  userId: string | null
  items: CartItem[]
  expireAt: Date
  createdAt: Date
  updatedAt: Date
  totalQuantity?: number
  totalPrice?: number
}

export interface CartItem {
  id: string
  productId: string
  cartId: string
  quantity: number
  product: Product
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  stripePriceId: string | null
  availability: boolean
  category: string
  images: string[]
  handle: string
  createdAt: Date
  updatedAt: Date
}

export interface CartWithItems extends Cart {
  items: CartItemWithProduct[]
}

export interface CartItemWithProduct extends CartItem {
  product: Product
}

export interface CartResponse {
  cart: CartWithItems
  totalItems: number
  totalPrice: number
}
