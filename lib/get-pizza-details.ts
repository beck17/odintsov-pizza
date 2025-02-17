import { calcPizzaDetails } from '@/lib/calc-pizza-details'
import { textDetailsPizza } from '@/lib/text-details-pizza'
import { pizzaSize, pizzaType } from '@/constants/pizza'
import { Ingredient, ProductItem } from '@prisma/client'

export const getPizzaDetails = (
	items: ProductItem[],
	ingredients: Ingredient[],
	size: pizzaSize,
	type: pizzaType,
	selectedIngredients: Set<number>,
) => {

	const totalPrice = calcPizzaDetails(items, ingredients, size, type, selectedIngredients)
	const textDetails = textDetailsPizza(ingredients, size, type, selectedIngredients)

	return {totalPrice, textDetails}
}