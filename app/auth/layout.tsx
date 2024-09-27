
interface Props{
    children: Readonly<React.ReactNode>
}

export default function LayoutAuth ({children}: Props) {
  return (
    <section className="w-screen h-screen flex items-center justify-center bg-gradiaent-gray">
        {children}
    </section>
  )
}
