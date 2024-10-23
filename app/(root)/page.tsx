import { CheckboxReactHookFormMultiple } from "@/components/design-system/checkbox";
import { Navbar } from "@/components/public/navbar";
import { SignOutBtn } from "@/components/signOut-btn";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <CheckboxReactHookFormMultiple />
      <SignOutBtn />
    </div>
  );
}
