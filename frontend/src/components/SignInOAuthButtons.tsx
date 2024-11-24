import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();
  console.log(signIn);
  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google", //authentication type
      redirectUrl: "/sso-callback", //google generates token,id etc by redirecting it to different route
      redirectUrlComplete: "/auth-callback", //after login in redirect to this page ,so we can handle out custom logic
    });
  };

  return (
    // <SignInButton>
    <Button
      onClick={signInWithGoogle}
      variant={"secondary"}
      className="w-full text-white border-zinc-200 h-11"
    >
      {/* <img src="/google.png" alt="Google" className="size-5" /> */}
      Continue with Google
    </Button>
    // </SignInButton>
  );
};
export default SignInOAuthButtons;
