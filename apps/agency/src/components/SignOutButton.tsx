'use client';

import { authClient } from '@/lib/auth-client';
import { Button } from '@mns/ui';
import { useRouter } from 'next/navigation';
import { LiaSignOutAltSolid } from 'react-icons/lia';

export const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
        },
      },
    });
  };

  return (
    <Button variant="destructive" onClick={handleSignOut}>
      <span>
        <LiaSignOutAltSolid />
      </span>
      <span>Sign Out</span>
    </Button>
  );
};
