'use client';

import { Card, CardContent } from '#components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TestimonialFormSchema,
  type ActionResponse,
  type TestimonialFormInput,
} from '@mns/utils';
import type React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FormTextField } from '../../FormTextField';
import { FormTextareaField } from '../../FormTextareaField';
import { Field } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { twMerge } from 'cn';
import clsx from 'clsx';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';

type UserTestimonialFormProps = {
  className?: string;
  action: (data: TestimonialFormInput) => Promise<ActionResponse>;
  isPending: boolean;
};

export const UserTestimonialForm = ({
  className,
  action,
  isPending,
}: UserTestimonialFormProps): React.JSX.Element => {
  const form = useForm<TestimonialFormInput>({
    resolver: zodResolver(TestimonialFormSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  });

  const onSubmit: SubmitHandler<TestimonialFormInput> = async (data) => {
    await action(data);

    form.reset();
  };

  return (
    <Card className={twMerge(clsx('space-y-4 md:space-y-6', className))}>
      <CardContent>
        <form
          noValidate
          className="generic-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormTextField
            name="title"
            type="text"
            label="Title"
            control={form.control}
          />

          <FormTextareaField
            name="body"
            label="Comments"
            minLength={10}
            maxLength={50000}
            control={form.control}
          />

          <Field orientation="horizontal">
            <SubmitButton disabled={isPending}>
              {isPending ? <LoadingSpinner /> : 'Submit'}
            </SubmitButton>
          </Field>
        </form>
      </CardContent>
    </Card>
  );
};
