import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User } from 'lucide-react'

import { cn } from '@/lib/utils'
import { CartButton } from '@/components/shared/cart/cart-button'
import { SearchInput } from './search-input'
import { Container } from './container'
import { Button } from '../ui'

interface Props {
	className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn(className, 'border border-b')}>
			<Container className={'flex items-center justify-between py-8'}>
				<Link href="/">
					<div className={'flex items-center gap-4'}>
						<Image src={'/logo.png'} alt={'logo'} width={35} height={35} />
						<div>
							<h1 className={'text-2xl uppercase font-black'}>
								Odintsov Pizza
							</h1>
							<p className={'text-sm text-gray-400 leading-3'}>
								Лучшая пицца в городе
							</p>
						</div>
					</div>
				</Link>

				<div className="mx-10 flex-1">
					<SearchInput />
				</div>

				<div className={'flex items-center gap-3'}>
					<Button variant={'outline'} className={'flex items-center gap-1'}>
						<User size={16} />
						Войти
					</Button>

					<div>
						<CartButton />
					</div>
				</div>
			</Container>
		</header>
	)
}
