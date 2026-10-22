'use client';

import { useTRPC } from '@/components/QueryProvider';
import { toast, UserAddressForm } from '@mns/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

const UserAddress = (): React.JSX.Element => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const queryKey = trpc.address.get.queryKey();
  const router = useRouter();

  const invalidateQueryKey = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };

  const {
    data: address,
    isPending: pendingAddress,
    isError: errorAddress,
  } = useQuery(trpc.address.get.queryOptions());

  const updateAddress = useMutation(
    trpc.address.update.mutationOptions({
      onSuccess: async (result) => {
        await invalidateQueryKey();
        toast.success(result.message);
        router.refresh();
      },

      onError: (result) => {
        toast.error(result.message);
      },
    }),
  );

  if (pendingAddress) {
    return <div>Pending getting address</div>;
  }

  if (errorAddress) {
    return <div>error getting address</div>;
  }

  return (
    <UserAddressForm
      address={address}
      action={async (input) => {
        return await updateAddress.mutateAsync(input);
      }}
      isPending={updateAddress.isPending}
    />
  );
};

export default UserAddress;
