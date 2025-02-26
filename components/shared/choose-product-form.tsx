import React from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { Title } from '@/components/shared/title'
import { Button } from '@/components/ui'

interface Props {
	imageUrl: string
	name: string
	price: number
	loading?: boolean
	className?: string
	onClickAdd?: VoidFunction
}

export const ChooseProductForm: React.FC<Props> = ({
	imageUrl,
	name,
	price,
	onClickAdd,
	loading,
	className,
}) => {
	return (
		<div className={cn('flex flex-1', className)}>
			<div
				className={cn(
					'flex items-center justify-center flex-1 relative w-full',
					className,
				)}
			>
				<Image
					src={imageUrl}
					alt={name}
					width={400}
					height={400}
					className={
						'relative left-2 top-2 transition-all z-10 duration-300 w-[450px] h-[450px]'
					}
				/>
			</div>
			<div className="w-[490px] bg-[#FCFCFC] p-7 flex flex-col justify-between">
				<Title className="font-bold" size="md" text={name} />

				<Button
					loading={loading}
					onClick={() => onClickAdd?.()}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
				>
					Добавить в корзину за {price}₽
				</Button>
			</div>
		</div>
	)
}
