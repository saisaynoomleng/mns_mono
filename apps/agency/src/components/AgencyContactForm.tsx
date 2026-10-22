'use client';

import { ContactForm, toast } from '@mns/ui';
import React from 'react';
import { useTRPC } from './QueryProvider';
import { useMutation } from '@tanstack/react-query';

const AgencyContactForm = ({
  className,
}: {
  className?: string;
}): React.JSX.Element => {
  const trpc = useTRPC();

  const submitAction = useMutation(
    trpc.contacts.sendContactForm.mutationOptions({
      onSuccess: (result) => {
        toast.success(result.message);
      },

      onError: (result) => {
        toast.error(result.message);
      },
    }),
  );

  return (
    <ContactForm
      action={async (input) => {
        return await submitAction.mutateAsync(input);
      }}
      isPending={submitAction.isPending}
      className={className}
    />
  );
};

export default AgencyContactForm;
