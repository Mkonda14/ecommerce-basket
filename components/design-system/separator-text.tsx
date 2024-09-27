
interface SeparatorProps{
    children: React.ReactNode;
}

export const SeparatorText = ({children}: SeparatorProps) => {
  return (
    <div className="w-full flex justify-center items-center">
        <span className='h-[1px] border w-[38%]'></span>
            <span className='flex-1 text-center text-gray-500'>{children}</span>
        <span className='border h-[1px] w-[38%]'></span>
    </div>
  )
}
