'use client';

import { SidebarTrigger } from '@mns/ui';
import React from 'react';
import { useUserSessionContext } from './UserSessionContextProvider';
import Image from 'next/image';
import Link from 'next/link';
import { env } from '@/lib/env/client';

export const AdminHeader = (): React.JSX.Element | null => {
  const { session } = useUserSessionContext();

  if (!session) return null;

  const { user } = session;

  const userImage = user.image
    ? user.image
    : `https://placehold.co/30?text=${user.name.charAt(0).toUpperCase()}`;

  const isPlacehold = userImage.includes('placehold.co');

  return (
    <header className="p-2 shadow flex justify-between items-center rounded">
      <div>
        <SidebarTrigger />
      </div>

      <div>
        <Link href={`${env.NEXT_PUBLIC_AGENCY_URL}/user`} target="_blank">
          <Image
            src={userImage}
            width={40}
            height={40}
            alt="user profile photo"
            className="rounded-full"
            unoptimized={isPlacehold}
          />
        </Link>
      </div>
    </header>
  );
};
