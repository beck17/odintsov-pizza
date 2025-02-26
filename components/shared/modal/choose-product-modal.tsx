'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { ChoosePizzaForm, ChooseProductForm } from '@/components/shared'
import { IProduct } from '@/@types/product'
import { useCartStore } from '@/store/cart'

interface Props {
	product: IProduct
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter()
	const firstItem = product.items[0]
	const isPizzaProduct = Boolean(firstItem.pizzaType)

	const addCartItem = useCartStore((state) => state.addCartItem)

	const onAddProduct = async () => {
		await addCartItem({
			productItemId: firstItem.id,
		})
	}
	const onAddPizza = async (productItemId: number, ingredients: number[]) => {
		await addCartItem({
			productItemId,
			ingredients,
		})
	}
	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1100px] max-w-[1100px] min-h-[550px] bg-white overflow-hidden',
					className,
				)}
			>
				{isPizzaProduct ? (
					<ChoosePizzaForm
						onClickAddCart={onAddPizza}
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						items={product.items}
					/>
				) : (
					<ChooseProductForm
						onClickAdd={onAddProduct}
						imageUrl={product.imageUrl}
						name={product.name}
						price={firstItem.price}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}
