import { prisma } from '@/prisma/prisma-client'

export interface GetSearchParams {
	query?: string;
	sortBy?: string;
	sizes?: string;
	pizzaType?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
}

const DEFAULT_MIN_PRICE = 219
const DEFAULT_MAX_PRICE = 899

export const findPizzas = async (params: GetSearchParams) => {
	const sizes = params.sizes?.split(',').map(Number)
	const pizzaTypes = params.pizzaType?.split(',').map(Number)
	const ingredients = params.ingredients?.split(',').map(Number)

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

	return await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: 'desc',
				},
				where: {
					ingredients: ingredients ? {
						some: {
							id: {
								in: ingredients,
							},
						},
					} : undefined,
					items: {
						some: {
							size: {
								in: sizes
							},
							pizzaType: {
								in: pizzaTypes
							},
							price: {
								gte: minPrice,
								lte: maxPrice,
							}
						}
					},
				},
				include: {
					ingredients: true,
					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							}
						},
						orderBy: {
							price: 'asc'
						}
					},
				},
			},
		},
	})
}