import { SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const TopBar = () => {
  const { isAdmin } = useAuthStore();
  console.log({ isAdmin });

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center">
        <img src="/spotify.png" alt="spotify logo" className="size-8" />
        spotify
      </div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}
        {/* logout button */}
        {/*
        <SignedIn>
          <SignOutButton />
        </SignedIn> */}
        {/* sign in button */}
        <SignedOut>
          <SignInOAuthButtons /> {/* google login button */}
          <SignInButton />
        </SignedOut>
        <UserButton />
        {/* //only shows up when we are sign in */}
      </div>
    </div>
  );
};

export default TopBar;