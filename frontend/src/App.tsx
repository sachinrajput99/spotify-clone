import { Route, Routes } from "react-router-dom";

import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import HomePage from "./pages/home/HomePage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./Layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import NotFoundPage from "./pages/404/NotFoundPage";
import AlbumPage from "./pages/home/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import { Toaster } from "react-hot-toast";
// import NavigateToHomePage from "./pages/navigatetoauthpage/NavigateToHomePage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />

        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

{
  /* <> */
}
{
  /* <header>
        <SignedOut>
          <SignInButton>
            <Button>sign in</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header> */
}
// </>
