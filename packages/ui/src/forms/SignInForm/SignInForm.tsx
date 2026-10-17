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
  SignInFormSchema,
  type CallToActionProps,
  type OAuthProviders,
  type SignInFormInput,
} from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingSpinner, Logo, SubmitButton } from '../../components';
import { OAuthSignIn } from '../OAuthSignIn';
import { Field, FieldSeparator } from '#components/ui/field';
import { FormTextField } from '../FormTextField';
import { FormCheckboxField } from '../FormCheckboxField';
import type React from 'react';

type SignInFormProps = {
  className?: string;
  action: (data: SignInFormInput) => Promise<void>;
  OAuthAction: (provier: OAuthProviders) => Promise<void>;
  forgetCTA: CallToActionProps;
  renderForget: (props: CallToActionProps) => React.ReactElement;
  signUpCTA: CallToActionProps;
  renderSignUp: (props: CallToActionProps) => React.ReactElement;
};

export const SignInForm = ({
  className,
  action,
  OAuthAction,
  forgetCTA,
  renderForget,
  signUpCTA,
  renderSignUp,
}: SignInFormProps) => {
  const form = useForm<SignInFormInput>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<SignInFormInput> = async (data) => {
    await action(data);
    form.reset();
  };

  return (
    <Card className={twMerge(clsx('md:min-w-100', className))}>
      <CardHeader className="text-center">
        <Logo className="mx-auto" />
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome back</CardDescription>
      </CardHeader>

      <CardContent className="mt-4">
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="generic-form"
        >
          <FormTextField
            name="email"
            type="email"
            autoComplete="email"
            control={form.control}
            label="email"
            placeholder="johndoe@example.com"
          />

          <FormTextField
            name="password"
            type="password"
            autoComplete="current-password"
            label="password"
            control={form.control}
          />

          <div className="flex justify-between items-center">
            <FormCheckboxField
              name="rememberMe"
              label="Remember Me"
              control={form.control}
            />

            <div>
              {renderForget({ label: forgetCTA.label, href: forgetCTA.href })}
            </div>
          </div>

          <Field orientation="horizontal">
            <SubmitButton disabled={isSubmitting}>
              {isSubmitting ? (
                <span>
                  <LoadingSpinner />
                </span>
              ) : (
                <span>Sign In</span>
              )}
            </SubmitButton>
          </Field>

          <FieldSeparator>Or</FieldSeparator>

          <OAuthSignIn OAuthAction={OAuthAction} />
        </form>
      </CardContent>

      <CardFooter className="">
        {renderSignUp({ label: signUpCTA.label, href: signUpCTA.href })}
      </CardFooter>
    </Card>
  );
};
