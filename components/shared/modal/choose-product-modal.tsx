'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { ChoosePizzaForm, ChooseProductForm } from '@/components/shared'
import { IProduct } from '@/@types/product'
import { useCartStore } from '@/store/cart'
import toast from 'react-hot-toast'

interface Props {
	product: IProduct
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter()
	const firstItem = product.items[0]
	const isPizzaProduct = Boolean(firstItem.pizzaType)
	const { loading } = useCartStore(state => state)

	const addCartItem = useCartStore((state) => state.addCartItem)

	const onAddProductToCart = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id

			await addCartItem({
				productItemId: itemId,
				ingredients,
			})

			toast.success(product.name + ' добавлен в корзину!')
			router.back()
		} catch (e) {
			toast.error(`Не удалось добавить ${product.name.toLowerCase()} в корзину`)
			console.log(e)
		}
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
						onClickAddCart={onAddProductToCart}
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						items={product.items}
						loading={loading}
					/>
				) : (
					<ChooseProductForm
						onClickAdd={onAddProductToCart}
						imageUrl={product.imageUrl}
						name={product.name}
						price={firstItem.price}
						loading={loading}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}
