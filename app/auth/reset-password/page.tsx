import { SplitContainer } from "@/components/design-system/split-container"
import { WrapperAuth } from "@/components/design-system/wrapper-auth"
import { FormResetPassword } from "./form-resetPassword"

export default function ResetPassword() {
  return (
    <SplitContainer>
        <WrapperAuth
            title="Updated password"
            subTitle="Send spend and save smarter"
            link="/auth/sign-in"
            labelLink="Sign in"
            question="Already have an account?"
        >
            <FormResetPassword />
        </WrapperAuth>
    </SplitContainer>
  )
}
