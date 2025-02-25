import { mapPizzaType, pizzaSize, pizzaType } from '@/constants/pizza'
import { CartStateItem } from '@/lib/get-cart-details'

export const getCartItemsDetails = (
	ingredients: CartStateItem['ingredients'],
	pizzaType: pizzaType,
	pizzaSize: pizzaSize,
): string => {
	const details = []

	if (pizzaType && pizzaSize) {
		const typeName = mapPizzaType[pizzaType]
		details.push(`${typeName} тесто ${pizzaSize} см`)
	}

	if (ingredients) {
		details.push(ingredients.map((ingredient) => ingredient.name))
	}

	return details.join(', ')
}
