'use client';

import { useTRPC } from '@/components/QueryProvider';
import { Bounded, SectionTitle, toast, UserTestimonialForm } from '@mns/ui';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaHeart } from 'react-icons/fa';

const UserTestimonialPage = (): React.JSX.Element => {
  const router = useRouter();
  const trpc = useTRPC();

  const action = useMutation(
    trpc.testimonials.insert.mutationOptions({
      onSuccess: (result) => {
        toast.success(result.message);
        router.refresh();
      },

      onError: (result) => {
        toast.error(result.message);
      },
    }),
  );

  return (
    <Bounded size="md" isCentered>
      <SectionTitle as="h1" size="sm" className="capitalize flex gap-x-2">
        Your feedback matters
        <span className="text-primary">
          <FaHeart />
        </span>
      </SectionTitle>

      <UserTestimonialForm
        action={async (input) => await action.mutateAsync(input)}
        isPending={action.isPending}
      />
    </Bounded>
  );
};

export default UserTestimonialPage;
