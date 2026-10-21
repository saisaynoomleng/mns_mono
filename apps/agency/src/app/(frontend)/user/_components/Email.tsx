'use client';

import { useUserSessionContext } from '@/components/UserSessionProvider';
import { authClient } from '@/lib/auth-client';
import { toast, UserChangeEmailForm } from '@mns/ui';
import { UserChangeEmailInput, UserRequestChangeEmailInput } from '@mns/utils';
import React from 'react';

const UserChangeEmail = (): React.JSX.Element => {
  const { session } = useUserSessionContext();

  const { user } = session;

  const handleRequestAction = async (data: UserRequestChangeEmailInput) => {
    await authClient.emailOtp.requestEmailChange(
      {
        newEmail: data.newEmail,
      },
      {
        onSuccess: () => {
          toast.success(
            'OTP request successfully, please check your new email for OTP',
          );
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleChangeAction = async (data: UserChangeEmailInput) => {
    await authClient.emailOtp.changeEmail(
      {
        newEmail: data.newEmail,
        otp: data.otp,
      },
      {
        onSuccess: () => {
          toast.success('Email updated successfully!');
          window.location.reload();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <UserChangeEmailForm
      oldEmail={user.email}
      requestAction={handleRequestAction}
      changeAction={handleChangeAction}
    />
  );
};

export default UserChangeEmail;
