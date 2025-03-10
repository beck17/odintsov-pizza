import { prisma } from '@/prisma/prisma-client'
import { calcCartItemTotalAmount } from '@/lib/calc-cart-item-total-amount'

export const updateCartTotalAmount = async (token: string) => {
	const userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
		include: {
			cartItem: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	})

	if (!userCart) return

	const totalAmount = userCart.cartItem.reduce(
		(acc, item) => acc + calcCartItemTotalAmount(item),
		0,
	)

	return await prisma.cart.update({
		where: {
			id: userCart.id,
		},
		data: {
			totalAmount,
		},
		include: {
			cartItem: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	})
}
