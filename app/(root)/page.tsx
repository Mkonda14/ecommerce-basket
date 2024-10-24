import { CheckboxReactHookFormMultiple } from "@/components/design-system/checkbox";
import { Footer } from "@/components/public/footer";
import { Navbar } from "@/components/public/navbar";
import { Subscribe } from "@/components/public/subscribe";
import { SignOutBtn } from "@/components/signOut-btn";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <CheckboxReactHookFormMultiple />
      <SignOutBtn />
      <Subscribe />
      <Footer />
    </div>
  );
}
