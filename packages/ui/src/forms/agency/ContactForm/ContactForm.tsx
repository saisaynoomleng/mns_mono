'use client';

import { SectionTitle } from '#components/shared/SectionTitle/SectionTitle';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type ActionResponse,
  type ContactUsFormInput,
  ContactUsFormSchema,
} from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FormTextField } from '../../FormTextField';
import { FormTextareaField } from '../../FormTextareaField';
import { Field } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';

type ContactFormProps = {
  className?: string;
  action: (data: ContactUsFormInput) => Promise<ActionResponse>;
  isPending: boolean;
};

export const ContactForm = ({
  className,
  action,
  isPending,
}: ContactFormProps): React.JSX.Element => {
  const form = useForm<ContactUsFormInput>({
    resolver: zodResolver(ContactUsFormSchema),
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      position: '',
      minBudget: '',
      maxBudget: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactUsFormInput> = async (data) => {
    await action(data);

    form.reset();
  };

  return (
    <div className={twMerge(clsx('space-y-4 md:space-y-6', className))}>
      <div className="space-y-2">
        <SectionTitle as="h3" size="sm">
          Let&apos;s talk
        </SectionTitle>
        <p>
          Tell us what you&apos;re building and we&apos;ll get back to you
          within one business day.
        </p>
      </div>

      <form
        className="grid gap-y-4 md:gap-y-6 md:grid-cols-2 md:gap-x-6"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormTextField
          name="name"
          type="text"
          label="Full Name"
          control={form.control}
          autoComplete="name"
        />

        <FormTextField
          name="email"
          type="email"
          label="Email"
          control={form.control}
          autoComplete="email"
        />

        <FormTextField
          name="companyName"
          label="Company Name"
          type="text"
          control={form.control}
          description="Company name is optional"
        />

        <FormTextField
          name="position"
          label="Position"
          type="text"
          control={form.control}
          description="Position is optional"
        />

        <FormTextField
          name="minBudget"
          type="number"
          label="Minimum Budget"
          control={form.control}
        />

        <FormTextField
          name="maxBudget"
          type="number"
          label="Maximum Budget"
          control={form.control}
        />

        <FormTextareaField
          minLength={10}
          maxLength={3000}
          name="message"
          control={form.control}
          label="Message"
          className="col-span-full"
        />

        <Field orientation="horizontal">
          <SubmitButton disabled={isPending}>
            {isPending ? <LoadingSpinner /> : 'Submit'}
          </SubmitButton>
        </Field>
      </form>
    </div>
  );
};
