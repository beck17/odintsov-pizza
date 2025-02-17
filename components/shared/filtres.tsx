'use client'

import React from 'react'
import { Title } from './title'
import { Input, RangeSlider } from '../ui'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { useQueryFilters } from '@/hooks/useQueryFilters'
import { useFilters } from '@/hooks/useFilters'
import { useIngredients } from '@/hooks/useIngredients'

interface Props {
	className?: string;
}

interface PriceMinMax {
	minPrice: number;
	maxPrice: number;
}

const priceMinMax: PriceMinMax = {
	minPrice: 499,
	maxPrice: 1699,
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { ingredients, loading } = useIngredients()
	const filters = useFilters()

	useQueryFilters(filters)

	const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }))

	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0])
		filters.setPrices('priceTo', prices[1])
	}

	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

			<CheckboxFiltersGroup
				className='mb-5'
				title='Тип теста'
				items={[
					{ text: 'Традиционное', value: '1' },
					{ text: 'Тонкое', value: '2' },
				]}
				onClickCheckbox={filters.setPizzaTypes}
				selected={filters.pizzaTypes}
				name='pizzaTypes'
			/>

			<CheckboxFiltersGroup
				className='mb-5'
				title='Размеры пиццы'
				items={[
					{ text: '25 см', value: '25' },
					{ text: '30 см', value: '30' },
					{ text: '35 см', value: '35' },
				]}
				onClickCheckbox={filters.setSizes}
				selected={filters.sizes}
				name='sizes'
			/>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder={String(priceMinMax.minPrice)}
						min={priceMinMax.minPrice}
						max={priceMinMax.maxPrice}
						value={String(filters.prices.priceFrom)}
						onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
					/>
					<Input
						type='number'
						min={priceMinMax.minPrice}
						max={priceMinMax.maxPrice}
						placeholder={String(priceMinMax.maxPrice)}
						value={String(filters.prices.priceTo)}
						onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					min={priceMinMax.minPrice}
					max={priceMinMax.maxPrice}
					step={10}
					value={[filters.prices.priceFrom || priceMinMax.minPrice, filters.prices.priceTo || priceMinMax.maxPrice]}
					onValueChange={updatePrices}
				/>
			</div>

			<CheckboxFiltersGroup
				className='mt-5'
				title='Формат'
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCheckbox={filters.setSelectedIngredients}
				selected={filters.selectedIngredients}
				name='ingredients'
			/>
		</div>
	)
}