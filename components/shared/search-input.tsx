'use client'

import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'
import React from 'react'
import { useClickAway, useDebounce } from 'react-use'
import Link from 'next/link'
import Image from 'next/image'
import { Api } from '@/services/api-client'
import { Product } from '@prisma/client'

interface Props {
	className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {

	const [focused, setFocused] = React.useState(false)
	const [searchQuery, setSearchQuery] = React.useState('')
	const [products, setProducts] = React.useState<Product[]>([])

	const ref = React.useRef<HTMLInputElement>(null)

	const onClickItem = () => {
		setFocused(false)
		setSearchQuery('')
	}

	useClickAway(ref, () => {
		setFocused(false)
	})

	useDebounce(() => {
		Api.products.search(searchQuery).then(items => setProducts(items))
	}, 150, [searchQuery])

	return (
		<>
			{focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />}

			<div
				ref={ref}
				className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
				<Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
				<input
					className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
					type='text'
					placeholder='Найти продукт...'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<X onClick={() => setSearchQuery('')}
					 className='absolute top-1/2 translate-y-[-50%] right-3 h-5 text-gray-400 cursor-pointer hover:text-gray-600'
				/>

				<div
					className={cn(
						'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
						focused && 'visible opacity-100 top-12',
					)}>
					{products.length > 0 && products.slice(0, 10).map((product) => (
						<Link key={product.id} href={`/product/${product.id}`}
									onClick={onClickItem}
									className='flex items-center gap-3 px-3 py-2 hover:bg-primary/10'>
							<Image src={product.imageUrl}
										 alt={product.name} className='w-8 h-8 rounded-sm' width={32} height={32} />
							<span>{product.name}</span>
						</Link>
					))}
					{products.length === 0 && (<span className='flex items-center px-3 py-2'>Продукт не найден</span>)}

				</div>
			</div>
		</>
	)
}