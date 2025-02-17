import { mapPizzaType, pizzaType, pizzaSize } from '@/constants/pizza'
import { Ingredient } from '@prisma/client'

export const textDetailsPizza = (
	ingredients: Ingredient[],
	size: pizzaSize,
	type: pizzaType,
	selectedIngredients: Set<number>,
) => {

	const ingredientsNames = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id)).map((ingredient) => ingredient.name.toLowerCase())

	return `${size} см, ${mapPizzaType[type].toLowerCase()} тесто${ingredientsNames.length > 0 ? `, ${ingredientsNames.join(', ')}` : ''}`
}