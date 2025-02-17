import React from 'react'
import { cn } from '@/lib/utils'

export interface ProductImageProps {
	imageUrl: string
	alt: string
	size: 25 | 30 | 35
	className?: string
}

export const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, className, alt, size }) => {
	return (
		<div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
			<img src={imageUrl} alt={alt} className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
				'w-[350px] h-[350px]': size === 25,
				'w-[400px] h-[400px]': size === 30,
				'w-[500px] h-[500px]': size === 35,
			})}
			/>

			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-200 w-[370px] h-[370px]" />
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-300 w-[450px] h-[450px]" />
		</div>
	)
}