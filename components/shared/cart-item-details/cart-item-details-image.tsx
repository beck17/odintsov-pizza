import React from 'react'

import { cn } from '@/lib/utils'

interface Props {
	name: string
	src: string
	className?: string
}

export const CartItemDetailsImage: React.FC<Props> = ({
	name,
	src,
	className,
}) => {
	return (
		<img className={cn('w-[95px] h-[95px]', className)} src={src} alt={name} />
	)
}
