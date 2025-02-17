import { Ingredient, ProductItem } from '@prisma/client'
import { pizzaType, pizzaSize } from '@/constants/pizza'


export const calcPizzaDetails = (
	items: ProductItem[],
	ingredients: Ingredient[],
	size: pizzaSize,
	type: pizzaType,
	selectedIngredients: Set<number>,
) => {

	const pizzaPrice = items
		.find((item) => item.size === size && item.pizzaType === type)?.price || 0

	const ingredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0)

	return pizzaPrice + ingredientsPrice
}