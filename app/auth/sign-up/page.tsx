import { SplitContainer } from "@/components/design-system/split-container"
import { WrapperAuth } from "@/components/design-system/wrapper-auth"
import { FormSignUp } from "./form-signUp"

export default function SignUp() {
  return (
    <SplitContainer>
        <WrapperAuth
            title="Sign up for an account"
            subTitle="Send spend and save smarter"
            oAuth
            link="/auth/sign-in"
            labelLink="Sign in"
            question="Already have an account?"
        >
            <FormSignUp />
        </WrapperAuth>
    </SplitContainer>
  )
}
