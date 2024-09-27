import { SplitContainer } from "@/components/design-system/split-container"
import { WrapperAuth } from "@/components/design-system/wrapper-auth"
import { FormSignIn } from "@/app/auth/sign-in/form-signIn"

export default function SignIn() {
  return (
    <SplitContainer>
        <WrapperAuth
            title="Sign in for an authenticated"
            subTitle="Send spend and save smarter"
            oAuth
            link="/auth/sign-up"
            labelLink="Sign up"
            question="Don't have an account?"
        >
            <FormSignIn />
        </WrapperAuth>
    </SplitContainer>
  )
}
