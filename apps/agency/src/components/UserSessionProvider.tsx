'use client';

import { authClient } from '@/lib/auth-client';
import React, { createContext, useContext } from 'react';

type Session = typeof authClient.$Infer.Session;

type SessionContextValue = {
  session: NonNullable<Session>;
};

const UserContext = createContext<SessionContextValue | null>(null);

export const UserSessionProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element | null => {
  const { data: session } = authClient.useSession();

  if (!session) return null;

  return (
    <UserContext.Provider value={{ session }}>{children}</UserContext.Provider>
  );
};

export const useUserSessionContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      'useUserSessionContext can only be used within the UserSessionProvider',
    );
  }

  return context;
};
