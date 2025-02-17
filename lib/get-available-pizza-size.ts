import { pizzaSizes, pizzaType } from '@/constants/pizza'
import { ProductItem } from '@prisma/client'
import { Variant } from '@/components/shared/group-variants'

export const getAvailablePizzaSizes = (type: pizzaType, items: ProductItem[]): Variant[] => {
	const filteredPizzas = items
		.filter((item) => item.pizzaType === type)

	return pizzaSizes.map((item) => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzas.some((pizza) => Number(pizza.size) === Number(item.value)),
	}))
}