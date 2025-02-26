import React from 'react'
import { cn } from '@/lib/utils'
import { CartItemProps } from '@/components/shared/cart-item-details/cart-item-details.types'
import {
	CartItemDetailsCountButton,
	CartItemDetailsImage,
	CartItemDetailsPrice,
	CartItemInfo,
} from '@/components/shared'
import { Trash2Icon } from 'lucide-react'

interface Props extends CartItemProps {
	onCLickCountButton: (type: 'plus' | 'minus') => void
	onClickRemoveCartItem: () => void
	className?: string
}

export const CartDrawerItem: React.FC<Props> = ({
	className,
	imageUrl,
	name,
	details,
	quantity,
	price,
	onCLickCountButton,
	onClickRemoveCartItem,
}) => {
	return (
		<div className={cn('flex bg-white p-5 gap-6', className)}>
			<CartItemDetailsImage name={name} src={imageUrl} />

			<div className="flex-1">
				<CartItemInfo name={name} details={details} />

				<hr className="my-3" />

				<div className="flex items-center justify-between">
					<CartItemDetailsCountButton
						onClick={onCLickCountButton}
						value={quantity}
					/>

					<div className="flex items-center gap-3">
						<CartItemDetailsPrice value={price} />

						<Trash2Icon
							className="text-gray-400 cursor-pointer hover:text-gray-600"
							onClick={onClickRemoveCartItem}
							size={16}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
