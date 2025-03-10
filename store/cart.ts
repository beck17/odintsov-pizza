import { create } from 'zustand'
import { Api } from '@/services/api-client'
import { CartStateItem, getCartDetails } from '@/lib/get-cart-details'
import { CreateCartItemValues } from '@/services/dto/cart.dto'

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
			const data = await Api.cart.getCart()
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ loading: false, error: true })
		} finally {
			set({ loading: false, error: false })
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.updateItemQuantity(id, quantity)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ loading: false, error: true })
		} finally {
			set({ loading: false, error: false })
		}
	},

	addCartItem: async (values: CreateCartItemValues) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.addCartItem(values)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ loading: false, error: true })
		} finally {
			set({ loading: false, error: false })
		}
	},

	removeCartItem: async (id: number) => {
		try {
			set(state => ({
				loading: true,
				error: false,
				items: state.items.map((item) => item.id === id ? { ...item, disabled: true } : item),
			}))
			const data = await Api.cart.removeCartItem(id)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ loading: false, error: true })
		} finally {
			set(state => ({
				loading: false,
				error: false,
				items: state.items.map((item) => item.id === id ? { ...item, disabled: false } : item),
			}))
		}
	},
}))
