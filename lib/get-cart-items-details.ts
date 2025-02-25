import { mapPizzaType, pizzaSize, pizzaType } from '@/constants/pizza'
import { Ingredient } from '@prisma/client'

export const getCartItemsDetails = (
	pizzaType?: pizzaType,
	pizzaSize?: pizzaSize,
	ingredients?: Ingredient[],
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
