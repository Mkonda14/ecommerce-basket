import { IconType } from "react-icons/lib";
import { Button } from "../ui/button";
import { oauth } from "@/actions/oAuth";

interface OAuthBtnProps {
    icon: IconType;
    children: React.ReactNode ;
    provider: "github" | "google";
}

export const OAuthBtn = ({ icon: Icon, children, provider }: OAuthBtnProps) => {
    return (
        <form className="w-1/2" action={async () => {
            "use server"
            await oauth(provider);
        }}>
            <Button variant={"outline"} className="flex justify-center items-center gap-x-3 w-full px-4 py-5" type="submit">
                <Icon className="h-5 w-5" />
                <span>{children}</span>
            </Button>
        </form>
    );
};

