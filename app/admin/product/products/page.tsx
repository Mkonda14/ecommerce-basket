
import { columns } from "@/app/admin/product/products/columns";
import { data } from "@/app/admin/product/products/data"

import { Typographie } from "@/components/typographie";
import { DataTable } from "./data-table";
import { Footer } from "@/components/admin/table/footer";

export default function Products() {
    return (
        <main className='min-h-screen flex flex-col justify-between gap-y-4'>
            <Typographie component={"h1"} variant='h1' size="lg" className='p-4 pb-0'>Sneakers</Typographie>
            <main className='w-full flex-grow px-4'>
                    <DataTable data={data} columns={columns} />
            </main>
            <Footer nbrSelect={0} />
        </main>
    )
}

