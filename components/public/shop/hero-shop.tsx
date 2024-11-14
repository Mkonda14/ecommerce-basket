

import { Typographie } from '@/components/typographie'
import { BreadcrumbWithCustom } from '../breadcrumb'

interface HeroShopProps{
  title?: string;
  label?: string;
}

export const HeroShop = ({title, label}: HeroShopProps) => {
  return (
    <section className="bg-gradiant-gray">
      <section className='container py-10'>
        <Typographie component='h3' variant='h3' size='lg' className='mb-4'>{title || "Shop"}</Typographie>
        <BreadcrumbWithCustom label={label} />
      </section>
    </section>
  )
}
