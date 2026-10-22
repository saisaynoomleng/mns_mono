'use client';

import { NewsletterForm, toast } from '@mns/ui';
import React from 'react';
import { useTRPC } from './QueryProvider';
import { useMutation } from '@tanstack/react-query';

type AgencyNewsletterFormProps = {
  className?: string;
};

const AgencyNewsletterForm = ({
  className,
}: AgencyNewsletterFormProps): React.JSX.Element => {
  const trpc = useTRPC();

  const subscribeAction = useMutation(
    trpc.newsletters.subscribe.mutationOptions({
      onSuccess: (result) => {
        toast.success(result.message);
      },

      onError: (result) => {
        toast.error(result.message);
      },
    }),
  );

  return (
    <NewsletterForm
      className={className}
      action={async (input) => {
        return await subscribeAction.mutateAsync(input);
      }}
      isPending={subscribeAction.isPending}
    />
  );
};

export default AgencyNewsletterForm;
