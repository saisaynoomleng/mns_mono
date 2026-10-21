'use client';

import { useTRPC } from '@/components/QueryProvider';
import { useUserSessionContext } from '@/components/UserSessionProvider';
import { authClient } from '@/lib/auth-client';
import { Bounded, toast, UserAddressForm, UserInfoForm } from '@mns/ui';
import { UserInfoFormInput } from '@mns/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const UsersPage = () => {
  const { session } = useUserSessionContext();
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { user } = session;

  const { data, isLoading, isError } = useQuery(
    trpc.address.getById.queryOptions(),
  );

  const addressQueryKey = trpc.address.getById.queryKey();

  const invalidateAddressQueryKey = () => {
    queryClient.invalidateQueries({
      queryKey: addressQueryKey,
    });
  };

  const addressAction = useMutation(
    trpc.address.upsertAddress.mutationOptions({
      onSuccess: (result) => {
        toast.success(result.message);
      },
      onError: (result) => {
        toast.error(result.message);
      },
    }),
  );

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

  if (!data) {
    return null;
  }

  if (isLoading) {
    return <div>loading user address</div>;
  }

  if (isError) {
    return <div> cannot get address</div>;
  }

  const userAddress = data.data
    ? data.data
    : { address1: '', address2: '', city: '', state: '', country: '', zip: '' };

  return (
    <Bounded spacing="md">
      <UserInfoForm user={user} action={updateBasicInfoAction} />

      <UserAddressForm
        address={userAddress}
        action={async (input) => {
          const result = await addressAction.mutateAsync(input);

          invalidateAddressQueryKey();

          return result;
        }}
        isPending={addressAction.isPending}
      />
    </Bounded>
  );
};

export default UsersPage;
