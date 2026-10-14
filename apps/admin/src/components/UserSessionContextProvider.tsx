'use client';

import { authClient } from '@/lib/auth-client';
import React, { createContext, useContext } from 'react';

type Session = ReturnType<typeof authClient.useSession>['data'];

type SessionContextValue = {
  session: NonNullable<Session>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export const UserSessionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = authClient.useSession();

  if (!session) return null;

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useUserSessionContext = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error(
      'useUserSessionContext must be used within UserSessionContextProvider',
    );
  }

  return context;
};
