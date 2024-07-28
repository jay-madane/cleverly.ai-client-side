import { Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

import { ModalProvider } from "@/components/modal-provider";
import { ToasterProvider } from "@/components/toaster-provider";
import { CrispProvider } from '@/components/crisp-provider';
import { RefreshProvider } from '@/context/refresh-context';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      signInForceRedirectUrl="/dashboard"
    >
      <CrispProvider />
      <main>
        <ModalProvider />
        <ToasterProvider />
        <RefreshProvider>
          <Outlet />
        </RefreshProvider>
      </main>
    </ClerkProvider>
  );
}