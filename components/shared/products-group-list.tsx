'use client'

import React from 'react'
import { useIntersection } from 'react-use'
import { Title } from './title'
import { ProductCard } from './product-card'
import { useCategoryStore } from '@/store/category'


interface Props {
	categoryId: number
	title: string
	items: any[] // ВРеменный вариант
	className?: string
	listClassName?: string
}

export const ProductGroupList: React.FC<Props> = ({
																										categoryId,
																										title,
																										items,
																										className,
																										// listClassName,
																									}) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
	const intersectionRef = React.useRef(null)
	const intersection = useIntersection(intersectionRef, { threshold: 0.4 })

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId)
		}
	}, [categoryId, intersection?.isIntersecting, title])

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size='lg' className='font-extrabold mb-5' />

			<div className='grid grid-cols-3 gap-[50px]'>
				{items.map((item, i) => (
					<ProductCard
						id={item.id}
						key={item.id}
						name={item.name}
						imageUrl={item.imageUrl}
						price={item.items[0].price}
						count={i % 2}
					/>
				))}
			</div>
		</div>
	)
}