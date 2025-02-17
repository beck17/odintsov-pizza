import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useSet } from 'react-use'
import { Api } from '@/services/api-client'

interface ReturnProps {
	ingredients: Ingredient[];
	loading: boolean;
	selectedIngredients: Set<string>;
	onAddId: (id: string) => void;
	// setSelectedIngredients: (id: string) => void;
}

export const useFilterIngredients = (values: string[] = []): ReturnProps => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([])
	const [loading, setLoading] = useState(true)

	const [selectedIngredients, { toggle }] = useSet(new Set<string>(values))

	useEffect(() => {
		async function fetchIngredients(): Promise<void> {
			try {
				setLoading(true)
				const ingredients = await Api.ingredients.getAll()

				setIngredients(ingredients)
			} catch (e) {
				console.log(e)
			} finally {
				setLoading(false)
			}
		}

		fetchIngredients()
	}, [])


		return { ingredients, loading, selectedIngredients, onAddId: toggle }
	}
