'use client';

import { authClient } from '@/lib/auth-client';
import { Button, useSidebar } from '@mns/ui';
import { useRouter } from 'next/navigation';
import { LiaSignOutAltSolid } from 'react-icons/lia';

export const SignOutButton = () => {
  const { open } = useSidebar();
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
      {open ? (
        <>
          <span>
            <LiaSignOutAltSolid />
          </span>
          <span>Sign Out</span>
        </>
      ) : (
        <>
          <span>
            <LiaSignOutAltSolid />
          </span>
          <span className="sr-only">Sign Out</span>
        </>
      )}
    </Button>
  );
};
