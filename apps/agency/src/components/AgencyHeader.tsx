'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Logo } from '@mns/ui';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AgencyHeader = (): React.JSX.Element => {
  const { data } = authClient.useSession();

  const userProfile = data?.user.image
    ? data?.user.image
    : `https://placehold.co/50?text=${data?.user.name.charAt(0)}`;

  const isPlacehold = userProfile.includes('placehold.co');

  return (
    <header className="max-w-7xl mx-auto py-2 px-2 md:px-4 shadow flex justify-between items-center">
      <div>
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div>
        {data?.user ? (
          <div>
            <Link href="/user">
              <Image
                src={userProfile}
                alt="user profile"
                width={40}
                height={40}
                className="rounded-full"
                unoptimized={isPlacehold}
              />
            </Link>
          </div>
        ) : (
          <div>
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AgencyHeader;
