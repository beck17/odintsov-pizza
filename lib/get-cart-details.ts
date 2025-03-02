import { CartDTO } from '@/services/dto/cart.dto'
import { calcCartItemTotalAmount } from '@/lib/calc-cart-item-total-amount'

export type CartStateItem = {
	id: number
	quantity: number
	price: number
	name: string
	imageUrl: string
	disabled?: boolean
	pizzaSize?: number | null
	pizzaType?: number | null
	ingredients: Array<{ name: string; price: number }>
}

interface ReturnProps {
	items: CartStateItem[]
	totalAmount: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
	const items = data.cartItem.map((item) => ({
		id: item.id,
		disabled: false,
		quantity: item.quantity,
		price: calcCartItemTotalAmount(item),
		name: item.productItem.product.name,
		imageUrl: item.productItem.product.imageUrl,
		pizzaSize: item.productItem.size,
		pizzaType: item.productItem.pizzaType,
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	})) as CartStateItem[]

	return { totalAmount: data.totalAmount, items }
}
