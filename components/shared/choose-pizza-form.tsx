import React from 'react'
import { cn } from '@/lib/utils'
import { Title, ProductImage, GroupVariants } from '@/components/shared/'
import { Button } from '@/components/ui'
import { pizzaSize, pizzaType, pizzaTypes } from '@/constants/pizza'
import { Ingredient, ProductItem } from '@prisma/client'
import { IngredientCard } from '@/components/shared/ingredient-card'
import { usePizzaOptions } from '@/hooks/usePizzaOptions'
import { getPizzaDetails } from '@/lib/get-pizza-details'

interface Props {
	imageUrl: string,
	name: string,
	ingredients: Ingredient[],
	items: ProductItem[],
	className?: string,
	onClickAddCart?: VoidFunction,
}

export const ChoosePizzaForm: React.FC<Props> = ({ imageUrl, name, onClickAddCart, items, ingredients, className }) => {

	const { size, type, setType, setSize, selectedIngredients, addIngredients, availableSizes } = usePizzaOptions(items)

	const { textDetails, totalPrice } = getPizzaDetails(items, ingredients, size, type, selectedIngredients)

	const handleClickAdd = () => {
		onClickAddCart?.()
	}

	return (
		<div className={cn('flex flex-1', className)}>
			<ProductImage imageUrl={imageUrl} alt={name} size={size} />
			<div className='w-[490px] bg-[#FCFCFC] p-7'>

				<Title className='font-bold' size='md' text={name} />

				<p className='text-gray-400 min-h-[50px]'>{textDetails}</p>

				<div className='flex flex-col gap-4 mt-5'>
					<GroupVariants items={pizzaTypes} value={String(type)}
												 onClick={(value) => setType(Number(value) as pizzaType)} />
					<GroupVariants items={availableSizes} value={String(size)}
												 onClick={(value) => setSize(Number(value) as pizzaSize)} />
				</div>

				<div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
					<div className='grid grid-cols-3 gap-3 mt-3'>
						{ingredients.length > 0 && ingredients.map((ingredient) => (
							<IngredientCard
								key={ingredient.id}
								name={ingredient.name}
								imageUrl={ingredient.imageUrl}
								price={ingredient.price}
								onClick={() => addIngredients(ingredient.id)}
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>


				<Button onClick={handleClickAdd} className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
					Добавить в корзину за {totalPrice}₽
				</Button>
			</div>
		</div>
	)
}