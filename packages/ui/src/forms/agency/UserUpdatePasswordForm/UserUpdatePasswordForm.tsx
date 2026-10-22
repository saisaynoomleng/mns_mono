'use client';

import { SectionTitle } from '#components/shared/SectionTitle/SectionTitle';
import { Card, CardContent } from '#components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UserUpdatePasswordFormSchema,
  type UserUpdatePasswordFormInput,
} from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { FormTextField } from '../../FormTextField';
import { PasswordChecker } from '../../PasswordChecker';
import { Field } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';

type UserUpdatePasswordFormProps = {
  className?: string;
  action: (data: UserUpdatePasswordFormInput) => Promise<void>;
};

export const UserUpdatePasswordForm = ({
  className,
  action,
}: UserUpdatePasswordFormProps): React.JSX.Element => {
  const form = useForm<UserUpdatePasswordFormInput>({
    resolver: zodResolver(UserUpdatePasswordFormSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const { isSubmitting } = form.formState;

  const password = useWatch({ name: 'newPassword', control: form.control });

  const onSubmit: SubmitHandler<UserUpdatePasswordFormInput> = async (data) => {
    await action(data);
    form.reset();
  };

  return (
    <div className={twMerge(clsx('space-y-4 md:space-y-6', className))}>
      <div className="space-y-2">
        <SectionTitle as="h3" size="sm">
          Update Password
        </SectionTitle>
        <p className="text-fs-300">
          If you signed up using Google or another social provider, you may not
          have a password yet. To create one, use{' '}
          <span className="font-semibold text-primary">Forgot password </span>
          on the sign-in page and follow the instructions sent to your email.
        </p>
      </div>

      <Card>
        <CardContent>
          <form
            noValidate
            className={clsx('generic-form')}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormTextField
              name="oldPassword"
              type="password"
              label="Current Password"
              control={form.control}
            />

            <FormTextField
              name="newPassword"
              type="password"
              label="New Password"
              control={form.control}
            />

            <FormTextField
              name="confirmNewPassword"
              type="password"
              label="Confirm New Password"
              control={form.control}
            />

            <PasswordChecker password={password} className="md:text-fs-400" />

            <Field orientation="horizontal">
              <SubmitButton disabled={isSubmitting}>
                {isSubmitting ? <LoadingSpinner /> : 'Update'}
              </SubmitButton>
            </Field>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
