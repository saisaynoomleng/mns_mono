'use client';

import { authClient } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';
import type { BetterAuthAccountsProps } from '@mns/api/types';
import { UserLinkAccountForm } from '@mns/ui';

export const LinkAccounts = (): React.JSX.Element => {
  const [accounts, setAccounts] = useState<BetterAuthAccountsProps | null>(
    null,
  );

  useEffect(() => {
    const fetchAccounts = async () => {
      const { data, error } = await authClient.listAccounts();
      if (!error) {
        setAccounts(data);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <UserLinkAccountForm />
    </div>
  );
};
