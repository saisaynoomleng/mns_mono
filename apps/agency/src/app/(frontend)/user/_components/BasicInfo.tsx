'use client';

import { useUserSessionContext } from '@/components/UserSessionProvider';
import { authClient } from '@/lib/auth-client';
import { toast, UserInfoForm } from '@mns/ui';
import { UserInfoFormInput } from '@mns/utils';
import { useRouter } from 'next/navigation';
import React from 'react';

const UserBasicInfo = (): React.JSX.Element => {
  const { session } = useUserSessionContext();
  const router = useRouter();

  const { user } = session;

  const handleChangeInfo = async (data: UserInfoFormInput) => {
    await authClient.updateUser(
      {
        name: data.name,
        companyName: data.companyName,
        position: data.position,
        phone: data.phone,
      },
      {
        onSuccess: async () => {
          toast.success('Basic info updated successfully!');
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return <UserInfoForm user={user} action={handleChangeInfo} />;
};

export default UserBasicInfo;
