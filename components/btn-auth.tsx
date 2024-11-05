"use client"

import { signOut } from '@/actions/signOut'
import { Button } from './ui/button'
import Link from 'next/link';
import { GoSignIn } from 'react-icons/go';
import { GoSignOut } from "react-icons/go"; 
import { useState, useEffect } from 'react';
import { currentUser } from '@/actions/auth';

export const BtnAuth =  () => {
    const [user, setUser] =  useState<boolean>(false);
    useEffect(() =>{
      (async ()=> {
        const customer = await currentUser();
        if(customer)
        {
          setUser(true);
        }       
      })();
    }, []);
    return (
        <>
          { user ? (
            <form action={async ()=>{
              await signOut();
              setUser(false);
            }}>
              <Button type="submit" size={"icon"}> 
                <GoSignOut className="w-5 h-5" />
              </Button>
            </form>
          ): (
            <Button variant={"outline"} type='button' size={'icon'} asChild>
                <Link href="/auth/sign-in"><GoSignIn className="w-5 h-5" /></Link>
            </Button>
          )}
        </>
    )
}
