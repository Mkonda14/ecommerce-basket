import { signOut } from '@/actions/signOut'
import { Button } from './ui/button'
import { FaSignOutAlt } from "react-icons/fa"; 

export const SignOutBtn = () => {
    return (
        <form action={async ()=>{
          "use server"
          await signOut();
        }}>
          <Button type="submit" className='space-x-2'>
            <span>Sign Out</span> 
            <FaSignOutAlt />
          </Button>
        </form>
    )
}
