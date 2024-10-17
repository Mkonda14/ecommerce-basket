import { Typographie } from '@/components/typographie'
import { FormCategory } from '@/app/admin/category/form-category'

export default function CategoryAdd() {
  return (
    <main className=''>
      <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>New category</Typographie>
      <main className='w-full'>
            <FormCategory />
      </main>
    </main>
  )
}