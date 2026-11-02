'use client';

import { Card, CardContent, CardHeader, CardTitle } from '#components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateServiceFormSchema,
  type ActionResponse,
  type CreateServiceFormInput,
} from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FormTextField } from '../../FormTextField';
import { Field } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';

type CreateServiceFormProps = {
  className?: string;
  action: (data: CreateServiceFormInput) => Promise<ActionResponse>;
  isPending: boolean;
};

export const CreateServiceForm = ({
  className,
  action,
  isPending,
}: CreateServiceFormProps): React.JSX.Element => {
  const form = useForm<CreateServiceFormInput>({
    resolver: zodResolver(CreateServiceFormSchema),
    defaultValues: {
      name: '',
      sanityId: '',
      status: 'active',
    },
  });

  const onSubmit: SubmitHandler<CreateServiceFormInput> = async (data) => {
    await action(data);

    form.reset();
  };

  return (
    <Card className={twMerge(clsx(className))}>
      <CardHeader>
        <CardTitle>Create Service</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="generic-form"
        >
          <FormTextField
            name="name"
            control={form.control}
            label="Service Name"
            type="text"
          />

          <FormTextField
            name="sanityId"
            control={form.control}
            label="Sanity ID"
            type="text"
          />

          <Field orientation="horizontal">
            <SubmitButton disabled={isPending}>
              {isPending ? <LoadingSpinner /> : 'Create'}
            </SubmitButton>
          </Field>
        </form>
      </CardContent>
    </Card>
  );
};
