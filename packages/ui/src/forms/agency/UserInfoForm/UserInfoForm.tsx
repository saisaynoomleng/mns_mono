'use client';

import { Card, CardContent, CardHeader, CardTitle } from '#components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { type UserInfoFormInput, UserInfoFormSchema } from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FormTextField } from '../../FormTextField';
import { Field } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';

type UserInfoFormProps = {
  user: UserInfoFormInput;
  action: (data: UserInfoFormInput) => Promise<void>;
  className?: string;
};

export const UserInfoForm = ({
  className,
  user,
  action,
}: UserInfoFormProps): React.JSX.Element => {
  const form = useForm<UserInfoFormInput>({
    resolver: zodResolver(UserInfoFormSchema),
    defaultValues: {
      name: user.name ?? '',
      companyName: user.companyName ?? '',
      position: user.position ?? '',
      phone: user.phone ?? '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<UserInfoFormInput> = async (data) => {
    await action(data);
    form.reset();
  };

  return (
    <Card className={twMerge(clsx('', className))}>
      <CardHeader>
        <CardTitle>Update Basic Info</CardTitle>
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
            label="Full Name"
            type="text"
            autoComplete="name"
          />

          <FormTextField
            name="companyName"
            control={form.control}
            label="Company Name"
            description="Company name is optional"
            type="text"
          />

          <FormTextField
            name="position"
            control={form.control}
            label="Position"
            description="Position is optional"
            type="text"
          />

          <FormTextField
            name="phone"
            control={form.control}
            label="Phone"
            description="Phone number is optional"
            type="text"
          />

          <Field orientation="horizontal">
            <SubmitButton disabled={isSubmitting}>
              {isSubmitting ? <LoadingSpinner /> : 'Update'}
            </SubmitButton>
          </Field>
        </form>
      </CardContent>
    </Card>
  );
};
