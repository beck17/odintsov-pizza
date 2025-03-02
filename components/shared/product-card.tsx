import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Title } from './title'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Ingredient } from '@prisma/client'
import { cn } from '@/lib/utils'

export interface ProductCardProps {
	id: number
	name: string
	price: number
	imageUrl: string
	ingredients: Ingredient[]
	className?: string
}

export const ProductCard: React.FC<ProductCardProps> = (product) => {
	const ingredientsNames = product.ingredients.map(ingredient => ingredient.name).join(', ')
	return (
		<div className={cn('flex flex-col justify-between', product.className)}>
			<Link href={`/product/${product.id}`}>
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
					<Image width={215} height={215} src={product.imageUrl} alt={product.name} />
				</div>

				<Title text={product.name} size='sm' className='mb-1 mt-3 font-bold' />
			</Link>
			<p className='text-sm text-gray-400'>{ingredientsNames}</p>
			<div className='flex justify-between items-center mt-4'>
					<span className='text-[20px]'>
						от <b>{product.price}</b> ₽
					</span>
				<Button variant='secondary' className='text-base text-bold'>
					<Plus size={20} className='mr-1' />
					Добавить
				</Button>
			</div>
		</div>
	)
}