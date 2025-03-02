'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { ProductForm } from '@/components/shared'
import { IProduct } from '@/@types/product'

interface Props {
	product: IProduct
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter()
	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1100px] max-w-[1100px] min-h-[550px] bg-white overflow-hidden',
					className,
				)}
			>
				<ProductForm product={product} onSubmit={() => {
					router.back()
				}} />
			</DialogContent>
		</Dialog>
	)
}
