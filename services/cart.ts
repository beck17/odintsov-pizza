import { axiosInstance } from '@/services/instance'
import { ApiRoutes } from '@/services/constants'
import { CartDTO } from '@/services/dto/cart.dto'

export const getCart = async (): Promise<CartDTO> => {
	const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART)

	return data
}

export const updateItemQuantity = async (
	id: number,
	quantity: number,
): Promise<CartDTO> => {
	const { data } = await axiosInstance.patch<CartDTO>(
		ApiRoutes.CART + '/' + id,
		{ quantity },
	)

	return data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
	const { data } = await axiosInstance.delete<CartDTO>(
		ApiRoutes.CART + '/' + id,
	)

	return data
}
