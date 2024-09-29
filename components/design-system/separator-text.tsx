
interface SeparatorProps{
    children: React.ReactNode;
}

export const SeparatorText = ({children}: SeparatorProps) => {
  return (
    <div className="w-full flex justify-center items-center">
        <span className='h-[1px] border flex-grow'></span>
            <span className='text-nowrap text-center text-gray-500 px-4'>{children}</span>
        <span className='border h-[1px] flex-grow'></span>
    </div>
  )
}
