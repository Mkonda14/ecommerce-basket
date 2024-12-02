import { LoaderSpin } from "@/components/loader-spin";

export default function Loading() {
  return (
    <main className="w-full h-[87vh] flex justify-center items-center">
        <LoaderSpin size="xl" />
    </main>
  )
}
