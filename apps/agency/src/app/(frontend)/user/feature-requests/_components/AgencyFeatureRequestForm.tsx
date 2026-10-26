'use client';

import { useTRPC } from '@/components/QueryProvider';
import { ALL_APPS_QUERY_RESULT } from '@/sanity/types';
import { toast, UserFeatureRequestForm } from '@mns/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

type AgencyFeatureRequestFormProps = {
  className?: string;
  apps: NonNullable<ALL_APPS_QUERY_RESULT>;
};

export const AgencyFeatureRequestForm = ({
  className,
  apps,
}: AgencyFeatureRequestFormProps): React.JSX.Element => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const queryKey = trpc.featureRequests.listByUser.queryKey();

  const invaidateQuery = async () => {
    await queryClient.invalidateQueries({
      queryKey,
    });
  };

  const action = useMutation(
    trpc.featureRequests.request.mutationOptions({
      onSuccess: async (result) => {
        await invaidateQuery();
        toast.success(result.message);
      },

      onError: async (result) => {
        toast.success(result.message);
      },
    }),
  );

  return (
    <UserFeatureRequestForm
      action={async (input) => await action.mutateAsync(input)}
      isPending={action.isPending}
      apps={apps}
      className={className}
    />
  );
};
