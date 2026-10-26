'use client';

import { useTRPC } from '@/components/QueryProvider';
import { ALL_APPS_QUERY_RESULT } from '@/sanity/types';
import { toast, UserReportIssueForm } from '@mns/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

type AgencyUserReportIssueFormProps = {
  className?: string;
  apps: NonNullable<ALL_APPS_QUERY_RESULT>;
};

const AgencyUserReportIssueForm = ({
  className,
  apps,
}: AgencyUserReportIssueFormProps): React.JSX.Element => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const queryKey = trpc.reportIssues.listByUser.queryKey();

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKey,
    });
  };

  const action = useMutation(
    trpc.reportIssues.report.mutationOptions({
      onSuccess: async (result) => {
        await invalidateQuery();
        toast.success(result.message);
      },
      onError: (result) => {
        toast.error(result.message);
      },
    }),
  );

  return (
    <UserReportIssueForm
      className={className}
      action={async (input) => await action.mutateAsync(input)}
      isPending={action.isPending}
      apps={apps}
    />
  );
};

export default AgencyUserReportIssueForm;
