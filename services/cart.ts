import { axiosInstance } from '@/services/instance'
import { ApiRoutes } from '@/services/constants'
import { CartDTO } from '@/services/dto/cart.dto'

export const fetchCart = async (): Promise<CartDTO> => {
	const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.FETCH_CART)

	return data
}
