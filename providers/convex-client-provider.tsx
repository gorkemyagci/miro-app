"use client";
import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import { Loading } from "@/components/auth/loading";
import CustomSignInButton from "@/components/ui/CustomSignInButton";
import Logo from "@/components/ui/logo";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <SignedOut>
          <div className="w-full h-screen flex flex-col items-center justify-center">
            <div
              style={{
                paddingBottom: "2rem",
              }}
            >
              <Logo width={250} height={250} />
            </div>
            <SignInButton mode="redirect">
              <div>
                <CustomSignInButton />
              </div>
            </SignInButton>
          </div>
        </SignedOut>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
