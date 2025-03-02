'use client'

import React from 'react'

import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { CartDrawerItem, Title } from '@/components/shared'
import { useCartStore } from '@/store/cart'
import { getCartItemsDetails } from '@/lib/get-cart-items-details'
import { pizzaSize, pizzaType } from '@/constants/pizza'
import Image from 'next/image'


export const CartDrawer: React.FC<React.PropsWithChildren> = ({
																																children,
																															}) => {
	const {
		fetchCartItems,
		totalAmount,
		items,
		updateItemQuantity,
		removeCartItem,
	} = useCartStore((state) => state)

	React.useEffect(() => {
		fetchCartItems()
	}, [])

	const handleCLickCountButton = async (
		id: number,
		quantity: number,
		type: 'plus' | 'minus',
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		await updateItemQuantity(id, newQuantity)
	}

	const handleClickRemoveCartItem = async (id: number) => {
		await removeCartItem(id)
	}

	if (!totalAmount) {
		return (
			<Sheet>
				<SheetTrigger asChild>{children}</SheetTrigger>

				<SheetContent className='flex flex-col justify-center pb-0 bg-[#F4F1EE]'>
					<div className='flex flex-col items-center justify-center w-72 mx-auto'>
						<Image src='/assets/images/empty-box.png' alt='Пустая корзина' width={120} height={120} />
						<Title size='sm' text='Корзина пустая' className='text-center font-bold my-2' />
						<p className='text-center mb-5 text-neutral-500'>Добавьте товар, чтоб совершить заказ</p>
					</div>
				</SheetContent>
			</Sheet>
		)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
				<SheetHeader>
					<SheetTitle>
						В корзине <span className='font-bold'>{items.length} товара</span>
					</SheetTitle>
				</SheetHeader>

				<div className='-mx-6 mt-5 overflow-auto scrollbar flex-1'>
					{items.length > 0 &&
						items.map((item) => (
							<CartDrawerItem
								className='rounded-lg shadow-lg mb-2'
								key={item.id}
								id={item.id}
								imageUrl={item.imageUrl}
								details={
									item.pizzaSize && item.pizzaType
										? getCartItemsDetails(
											item.ingredients,
											item.pizzaType as pizzaType,
											item.pizzaSize as pizzaSize,
										)
										: ''
								}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								disabled={item.disabled}
								onCLickCountButton={(type) =>
									handleCLickCountButton(item.id, item.quantity, type)
								}
								onClickRemoveCartItem={() => handleClickRemoveCartItem(item.id)}
							/>
						))}
				</div>

				<SheetFooter className='-mx-6 bg-white p-8 rounded-lg shadow-lg'>
					<div className='w-full'>
						<div className='flex mb-4'>
							<span className='flex flex-1 text-lg text-neutral-500'>
								Итого
								<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
							</span>

							<span className='font-bold text-lg'>{totalAmount} ₽</span>
						</div>

						<Link href='/checkout'>
							<Button type='submit' className='w-full h-12 text-base'>
								Оформить заказ
								<ArrowRight className='w-5 ml-2' />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
