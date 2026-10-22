'use client';

import { authClient } from '@/lib/auth-client';
import { toast, UserDeleteForm } from '@mns/ui';

export const UserDeleteAccount = () => {
  const handleDelete = async () => {
    await authClient.deleteUser(
      {
        callbackURL: '/goodbye',
      },
      {
        onSuccess: () => {
          toast.success('Account deletion verification is sent to your email');
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return <UserDeleteForm action={handleDelete} />;
};
