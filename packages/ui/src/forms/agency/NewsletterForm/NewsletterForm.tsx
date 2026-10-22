'use client';

import { SectionTitle } from '#components/shared/SectionTitle/SectionTitle';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';
import { FormTextField } from '../../FormTextField';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  type NewsletterFormInput,
  NewsletterFormSchema,
  type ActionResponse,
} from '@mns/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';

type NewsletterFormProps = {
  className?: string;
  action: (data: NewsletterFormInput) => Promise<ActionResponse>;
  isPending: boolean;
};

export const NewsletterForm = ({
  className,
  action,
  isPending,
}: NewsletterFormProps): React.JSX.Element => {
  const form = useForm<NewsletterFormInput>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<NewsletterFormInput> = async (data) => {
    await action(data);

    form.reset();
  };

  return (
    <div
      className={twMerge(
        clsx('space-y-4 md:space-y-6 flex flex-col ', className),
      )}
    >
      <div className="space-y-2">
        <SectionTitle as="h3" size="sm">
          Stay in the{' '}
          <span className="font-cursive text-primary underline decoration-wavy">
            loop
          </span>
        </SectionTitle>
        <p className="text-brand-black-400">
          Occasional updates on new features, apps, and what we're building
          next.
        </p>
      </div>

      <form
        className="generic-form max-w-120 mx-auto"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormTextField
          name="email"
          control={form.control}
          type="email"
          placeholder="email"
          label="Email"
          className="w-full md:w-100"
        />

        <Field orientation="horizontal">
          <SubmitButton disabled={isPending} className="mx-auto">
            {isPending ? <LoadingSpinner /> : 'Subscribe'}
          </SubmitButton>
        </Field>
      </form>
    </div>
  );
};
