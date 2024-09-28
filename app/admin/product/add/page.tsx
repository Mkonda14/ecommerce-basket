import { Typographie } from '@/components/typographie'
import { FormProduct } from '../form-product'

export default function ProductAdd() {
  return (
    <main className='p-4'>
      <Typographie component={"h1"} variant='h1' size="xl" className='mb-4'>New product</Typographie>
      <main className='w-full flex gap-x-4'>
        <section className='w-3/4'>
            <FormProduct />
        </section>
        <section className='w-1/4'></section>
      </main>
    </main>
  )
}