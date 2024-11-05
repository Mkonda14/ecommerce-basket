

import { Typographie } from '@/components/typographie'
import { BreadcrumbWithCustom } from '../breadcrumb'

export const HeroShop = () => {
  return (
    <section className="bg-gradiant-gray">
      <section className='container py-10'>
        <Typographie component='h3' variant='h3' size='lg' className='mb-4'>Shop</Typographie>
        <BreadcrumbWithCustom />
      </section>
    </section>
  )
}
