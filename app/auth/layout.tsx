
interface Props{
    children: Readonly<React.ReactNode>
}

export default function LayoutAuth ({children}: Props) {
  return (
    <section className="w-screen overflow-x-hidden py-10 min-h-screen flex items-center justify-center bg-gradiaent-gray">
        {children}
    </section>
  )
}
