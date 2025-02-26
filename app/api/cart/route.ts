import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'
import { findOrCreateCart } from '@/lib/find-or-create-cart'
import { CreateCartItemValues } from '@/services/dto/cart.dto'
import { updateCartTotalAmount } from '@/lib/update-cart-total-amount'

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] })
		}

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
							include: { product: true },
						},
						ingredients: true,
					},
				},
			},
		})

		return NextResponse.json(userCart)
	} catch (e) {
		console.log('[CART_GET] Server error', e)
		return NextResponse.json(
			{ message: 'Не удалось получить корзину' },
			{ status: 500 },
		)
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value
		if (!token) {
			token = crypto.randomUUID()
		}

		const userCart = await findOrCreateCart(token)

		const cartItemValues = (await req.json()) as CreateCartItemValues

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: cartItemValues.productItemId,
				ingredients: { every: { id: { in: cartItemValues.ingredients } } },
			},
		})

		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			})
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productItemId: cartItemValues.productItemId,
					quantity: 1,
					ingredients: {
						connect: cartItemValues.ingredients?.map((id) => ({ id })),
					},
				},
			})
		}

		const updatedUserCart = await updateCartTotalAmount(token)

		const response = NextResponse.json(updatedUserCart)
		response.cookies.set('cartToken', token)
		return response
	} catch (e) {
		console.log('[CART_POST] Server error', e)
		return NextResponse.json(
			{ message: 'Не удалось создать корзину' },
			{ status: 500 },
		)
	}
}
