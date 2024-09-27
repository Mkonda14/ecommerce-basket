import { SplitContainer } from "@/components/design-system/split-container"
import { WrapperAuth } from "@/components/design-system/wrapper-auth"
import { FormForgotPassword } from "./form-forgotPassword"

export default function ForgotPassword() {
  return (
    <SplitContainer>
        <WrapperAuth
            title="Send link for an reset password"
            subTitle="Send spend and save smarter"
            link="/auth/sign-in"
            labelLink="Sign in"
            question="Already have an account?"
        >
            <FormForgotPassword />
        </WrapperAuth>
    </SplitContainer>
  )
}
