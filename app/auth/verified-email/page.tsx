import { SplitContainer } from "@/components/design-system/split-container"
import { WrapperAuth } from "@/components/design-system/wrapper-auth"
import { FormVerifiedEmail } from "./form-verifiedEmail"

export default function VerifiedEmail() {
  return (
    <SplitContainer>
        <WrapperAuth
            title="Verified email for an account"
            subTitle="Send spend and save smarter"
            link="/auth/sign-in"
            labelLink="Sign in"
            question="Already have an account?"
        >
            <FormVerifiedEmail />
        </WrapperAuth>
    </SplitContainer>
  )
}
