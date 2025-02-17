import { Ingredient, Product, ProductItem } from '@prisma/client'

export type IProduct = Product & { ingredients: Ingredient[], items: ProductItem[] };
