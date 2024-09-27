import { currentUser } from "@/actions/auth";
import { redirect } from "next/navigation";


const CheckIn = async () => {

    const user = await currentUser();
    if(!user || !user?.email) redirect("/auth/sign-in");

    if(user.role == "ADMIN"){

    }
 
    return (
      <div>
        Vous n etêz pas autorisée à acceder à cette page
      </div>
    )
}

export default CheckIn;
