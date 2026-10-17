'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#components/ui/card';
import {
  SignUpFormSchema,
  type CallToActionProps,
  type OAuthProviders,
  type SignUpFormInput,
} from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';
import { LoadingSpinner, Logo, SubmitButton } from '../../components';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormTextField } from '../FormTextField';
import { PasswordChecker } from '../PasswordChecker';
import { Field, FieldSeparator } from '#components/ui/field';
import { OAuthSignIn } from '../OAuthSignIn';

type SignUpFormProps = {
  className?: string;
  action: (data: SignUpFormInput) => Promise<void>;
  OAuthAction: (provider: OAuthProviders) => Promise<void>;
  signInCTA: CallToActionProps;
  renderSignIn: (props: CallToActionProps) => React.ReactElement;
};

export const SignUpForm = ({
  className,
  action,
  OAuthAction,
  signInCTA,
  renderSignIn,
}: SignUpFormProps): React.JSX.Element => {
  const form = useForm<SignUpFormInput>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { isSubmitting } = form.formState;
  const password = useWatch({ control: form.control, name: 'password' });

  const onSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
    await action(data);

    form.reset();
  };

  return (
    <Card className={twMerge(clsx('max-w-100 md:w-100', className))}>
      <CardHeader>
        <Logo />
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Welcome to mns.</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          className="generic-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormTextField
            name="name"
            control={form.control}
            type="text"
            placeholder="john doe"
            label="Full Name"
            autoComplete="name"
          />

          <FormTextField
            name="email"
            control={form.control}
            type="email"
            label="Email"
            placeholder="johndoe@example.com"
            autoComplete="email"
          />

          <FormTextField
            name="password"
            control={form.control}
            type="password"
            label="Password"
            autoComplete="new-password"
          />

          <FormTextField
            name="confirmPassword"
            control={form.control}
            type="password"
            label="Confirm Password"
          />

          <PasswordChecker password={password} />

          <Field orientation="horizontal">
            <SubmitButton disabled={isSubmitting}>
              {isSubmitting ? <LoadingSpinner /> : 'Sign Up'}
            </SubmitButton>
          </Field>

          <FieldSeparator>Or</FieldSeparator>

          <OAuthSignIn OAuthAction={OAuthAction} />
        </form>
      </CardContent>

      <CardFooter>
        <p className="text-right w-full">
          Already a member?{' '}
          {renderSignIn({ label: signInCTA.label, href: signInCTA.href })}
        </p>
      </CardFooter>
    </Card>
  );
};
