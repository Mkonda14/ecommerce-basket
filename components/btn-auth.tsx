
import { signOut } from '@/actions/signOut'
import { Button } from './ui/button'
import { FaSignOutAlt } from "react-icons/fa"; 
import Link from 'next/link';
import { GoSignIn } from 'react-icons/go';
import useCurrentUser from '@/hooks/use-currentUser';

export const BtnAuth =  () => {
    const user =  useCurrentUser()
    return (
        <>
          { user ? (
            <form action={async ()=>{
              await signOut();
            }}>
              <Button type="submit" className='space-x-2'> 
                <FaSignOutAlt />
              </Button>
            </form>
          ): (
            <Button variant={"outline"} size={'icon'} asChild>
                <Link href="/auth/sign-in"><GoSignIn className="w-5 h-5" /></Link>
            </Button>
          )}
        </>
    )
}
