import { Typographie } from "@/components/typographie";
import { DataTableDemo } from "./data-table";
import { Footer } from "@/components/admin/table/footer";

export default function Products() {
    return (
        <main className='min-h-screen flex flex-col justify-between gap-y-4'>
            <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>New product</Typographie>
            <main className='w-full flex-grow px-4'>
                    <DataTableDemo />
            </main>
            <Footer nbrSelect={0} />
        </main>
    )
}

