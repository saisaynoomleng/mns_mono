'use client';

import { authClient } from '@/lib/auth-client';
import { UserUpdatePasswordForm } from '@mns/ui';
import { UserUpdatePasswordFormInput } from '@mns/utils';
import React from 'react';

const UserUpdatePassword = (): React.JSX.Element => {
  const handleUpdatePassword = async (data: UserUpdatePasswordFormInput) => {
    await authClient.changePassword({
      currentPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  return <UserUpdatePasswordForm action={handleUpdatePassword} />;
};

export default UserUpdatePassword;
