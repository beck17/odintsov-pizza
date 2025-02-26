'use client'

import React from 'react'
import { pizzaSize, pizzaType } from '@/constants/pizza'
import { Variant } from '@/components/shared/group-variants'
import { useSet } from 'react-use'
import { getAvailablePizzaSizes } from '@/lib/get-available-pizza-size'
import { ProductItem } from '@prisma/client'

interface ReturnProps {
	size: pizzaSize
	type: pizzaType
	currentItemId?: number
	availableSizes: Variant[]
	selectedIngredients: Set<number>
	addIngredients: (id: number) => void
	setSize: (size: pizzaSize) => void
	setType: (type: pizzaType) => void
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
	const [size, setSize] = React.useState<pizzaSize>(25)
	const [type, setType] = React.useState<pizzaType>(1)

	const currentItemId = items.find(
		(item) => item.size === size && item.pizzaType === type,
	)?.id

	const [selectedIngredients, { toggle: addIngredients }] = useSet(
		new Set<number>([]),
	)
	const availableSizes = getAvailablePizzaSizes(type, items)

	React.useEffect(() => {
		const isAvailableSize = availableSizes?.find(
			(item) => Number(item.value) === size && !item.disabled,
		)
		const availableSize = availableSizes?.find((item) => !item.disabled)

		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as pizzaSize)
		}
	}, [type])

	return {
		size,
		type,
		setType,
		setSize,
		selectedIngredients,
		addIngredients,
		availableSizes,
		currentItemId,
	}
}
