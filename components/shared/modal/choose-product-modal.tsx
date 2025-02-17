'use client'

import React from 'react'
import { Product } from '@prisma/client'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { ChoosePizzaForm, ChooseProductForm } from '@/components/shared'
import { IProduct } from '@/@types/product'

interface Props {
	product: IProduct;
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter()

	const isPizzaProduct = Boolean(product.items[0].pizzaType)
	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent className={cn('p-0 w-[1100px] max-w-[1100px] min-h-[550px] bg-white overflow-hidden', className)}>
				{isPizzaProduct ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						items={product.items}
					/>
				) : (
					<ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
				)}
			</DialogContent>
		</Dialog>
	)
}