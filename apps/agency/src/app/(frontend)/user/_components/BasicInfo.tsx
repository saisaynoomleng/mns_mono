'use client';

import { useUserSessionContext } from '@/components/UserSessionProvider';
import { authClient } from '@/lib/auth-client';
import { toast, UserInfoForm } from '@mns/ui';
import { UserInfoFormInput } from '@mns/utils';
import React from 'react';

const UserBasicInfo = (): React.JSX.Element => {
  const { session } = useUserSessionContext();

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
          window.location.reload();
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
