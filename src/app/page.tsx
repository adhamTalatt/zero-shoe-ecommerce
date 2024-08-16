import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div>
      {!user ? (
        <>
          <Button>
            <LoginLink>Sign in</LoginLink>
          </Button>
          <Button>
            <RegisterLink>Sign up</RegisterLink>
          </Button>
        </>
      ) : (
        <p>{user.email}</p>
      )}
    </div>
  );
}
