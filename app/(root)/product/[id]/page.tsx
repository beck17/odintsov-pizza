import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import { Container, GroupVariants, ProductImage, Title } from '@/components/shared'

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } })

  if (!product) {
    return notFound()
  }

  return (
    <Container className='flex flex-col my-10'>
      <div className='flex flex-1'>
        <ProductImage imageUrl={product.imageUrl} alt={product.name} size={30} />

        <div className='w-[490px] bg-[#FCFCFC] p-7'>
          <Title text={product.name} size={'md'} className='font-extrabold mb-1' />

          <p className='text-gray-400'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aliquam amet deserunt eveniet impedit nobis nostrum repellendus suscipit totam vel!
            Aliquam cupiditate fugit laudantium magnam quam quo rerum vel veniam voluptatum.
          </p>

          <GroupVariants items={[
            {value: '1', name: 'Маленькая', disabled: true},
            {value: '2', name: 'Средняя', },
            {value: '3', name: 'Большая'},
          ]} />

        </div>
      </div>
    </Container>
  )
}
