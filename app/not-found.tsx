import { Typographie } from "@/components/typographie";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center gap-y-4">
        <Typographie component="h2" variant="h2" size="lg" className="capitalize">Page not found :( </Typographie>
        <Typographie component="p" variant="p" size="md" className="text-muted-foreground">Oops! 😖 The requested URL was not found on this server.</Typographie>
        <a href={"/"} className={buttonVariants()}>Back to home</a>
        
        <div className="">
          <Image 
            src="/assets/pngs/404.png"
            alt="illustration page 404 not found"
            height={400}
            width={350}
            className="max-w-full h-auto"
          />
        </div>
    </main>
  )
}
