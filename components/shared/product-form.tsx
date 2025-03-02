'use client'

import React from 'react'
import { IProduct } from '@/@types/product'
import { useCartStore } from '@/store/cart'
import toast from 'react-hot-toast'
import { ChoosePizzaForm } from '@/components/shared/choose-pizza-form'
import { ChooseProductForm } from '@/components/shared/choose-product-form'

interface Props {
	product: IProduct;
	onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit }) => {
	const firstItem = product.items[0]
	const isPizzaProduct = Boolean(firstItem.pizzaType)
	const { loading, addCartItem } = useCartStore(state => state)


	const onAddProductToCart = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id

			await addCartItem({
				productItemId: itemId,
				ingredients,
			})

			toast.success(product.name + ' добавлен в корзину!')
			onSubmit?.()
		} catch (e) {
			toast.error(`Не удалось добавить ${product.name.toLowerCase()} в корзину`)
			console.log(e)
		}
	}

	if (isPizzaProduct) {
		return (
			<ChoosePizzaForm
				onClickAddCart={onAddProductToCart}
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				items={product.items}
				loading={loading}
			/>
		)
	}
	return (
		<ChooseProductForm
			onClickAdd={onAddProductToCart}
			imageUrl={product.imageUrl}
			name={product.name}
			price={firstItem.price}
			loading={loading}
		/>
	)
}

