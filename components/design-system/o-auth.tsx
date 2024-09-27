"use server"

import { FaGithub } from "react-icons/fa"; 
import { FcGoogle } from "react-icons/fc"; 

import { OAuthBtn } from "./oauth-btn"

export const OAuth = () => {
  return (
    <div className="flex gap-x-4">
        <OAuthBtn icon={FcGoogle} provider="google">Sign Up with Google</OAuthBtn>
        <OAuthBtn icon={FaGithub} provider="github">Sign Up with Google</OAuthBtn>
    </div>
  )
}
