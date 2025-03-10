import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'
import { updateCartTotalAmount } from '@/lib/update-cart-total-amount'

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const id = Number(params.id)
		const data = (await req.json()) as { quantity: number }
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'token not found' })
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id,
			},
		})

		if (!cartItem) {
			return NextResponse.json({ error: 'cartItem not found' })
		}

		await prisma.cartItem.update({
			where: {
				id,
			},
			data: {
				quantity: data.quantity,
			},
		})

		const updatedUserCart = await updateCartTotalAmount(token)

		return NextResponse.json(updatedUserCart)
	} catch (e) {
		console.log('[CART_GET] Server error', e)
		return NextResponse.json(
			{ message: 'Не удалось обновить корзину' },
			{ status: 500 },
		)
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const id = Number(params.id)
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'token not found' })
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id,
			},
		})

		if (!cartItem) {
			return NextResponse.json({ error: 'cartItem not found' })
		}

		await prisma.cartItem.delete({
			where: {
				id,
			},
		})

		const updatedUserCart = await updateCartTotalAmount(token)

		return NextResponse.json(updatedUserCart)
	} catch (e) {
		console.log('[CART_REMOVE] Server error', e)

		return NextResponse.json(
			{ message: 'Не удалось удалить товар' },
			{ status: 500 },
		)
	}
}
