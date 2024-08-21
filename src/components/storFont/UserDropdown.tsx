import { DOMIAN } from "@/utils/links";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
interface iAppPorps {
  name: string;
  email: string;
  userImage: string;
}
const UserDropdown = ({ userImage, name, email }: iAppPorps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className=" relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userImage} alt="User Image" />
            <AvatarFallback>{name.slice(0, 3).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-[10px] text-muted-foreground leading-none">
            {email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {email === "adhamtalattzakaria.one@gmail.com" && (
          <DropdownMenuItem>
            <Link href={`${DOMIAN}/dashboard`}>Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <LogoutLink>Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
