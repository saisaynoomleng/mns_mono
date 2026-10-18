'use client';

import { useUserSessionContext } from '@/components/UserSessionProvider';
import { authClient } from '@/lib/auth-client';
import { Bounded, toast, UserInfoForm } from '@mns/ui';
import { UserInfoFormInput } from '@mns/utils';
import { useRouter } from 'next/navigation';

const UsersPage = () => {
  const { session } = useUserSessionContext();
  const router = useRouter();

  const { user } = session;

  const updateBasicInfoAction = async (data: UserInfoFormInput) => {
    await authClient.updateUser({
      name: data.name,
      companyName: data.companyName,
      position: data.position,
      phone: data.phone,
      fetchOptions: {
        onSuccess: () => {
          toast.success('User info updated successfully!');
          router.refresh();
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <Bounded>
      <UserInfoForm user={user} action={updateBasicInfoAction} />
    </Bounded>
  );
};

export default UsersPage;
