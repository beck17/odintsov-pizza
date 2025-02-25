import { create } from 'zustand'
import { Api } from '@/services/api-client'
import { CartStateItem, getCartDetails } from '@/lib/get-cart-details'

export interface CartState {
	loading: boolean
	error: boolean
	totalAmount: number
	items: CartStateItem[]
	fetchCartItems: () => Promise<void>
	updateItemQuantity: (id: number, quantity: number) => Promise<void>
	// addCartItem: (values: CrateCartItemValues) => Promise<void>
	addCartItem: (values: any) => Promise<void>
	removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	loading: true,
	error: false,
	totalAmount: 0,

	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.fetchCart()
			set(getCartDetails(data))
		} catch {
			set({ loading: false, error: true })
		} finally {
			set({ loading: false, error: false })
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {},
	addCartItem: async (values: any) => {},
	removeCartItem: async (id: number) => {},
}))
