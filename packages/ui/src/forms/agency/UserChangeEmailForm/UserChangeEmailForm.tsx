'use client';

import { SectionTitle } from '#components/shared/SectionTitle/SectionTitle';
import { Card, CardContent } from '#components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UserChangeEmailFormSchema,
  UserRequestChangeEmailFormSchema,
  type UserChangeEmailInput,
  type UserRequestChangeEmailInput,
} from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { FormTextField } from '../../FormTextField';
import { Field, FieldError, FieldLabel } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';
import { useEffect, useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '#components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

type UserChangeEmailFormProps = {
  oldEmail: string;
  requestAction: (data: UserRequestChangeEmailInput) => Promise<void>;
  changeAction: (data: UserChangeEmailInput) => Promise<void>;
  className?: string;
};

export const UserChangeEmailForm = ({
  oldEmail,
  requestAction,
  changeAction,
  className,
}: UserChangeEmailFormProps): React.JSX.Element => {
  const [requested, setRequested] = useState<boolean>(false);

  const requestForm = useForm<UserRequestChangeEmailInput>({
    resolver: zodResolver(UserRequestChangeEmailFormSchema),
    defaultValues: {
      oldEmail: oldEmail ?? '',
      newEmail: '',
    },
  });

  const changeForm = useForm<UserChangeEmailInput>({
    resolver: zodResolver(UserChangeEmailFormSchema),
    defaultValues: {
      newEmail: '',
      otp: '',
    },
  });

  useEffect(() => {
    requestForm.reset({
      oldEmail: oldEmail ?? '',
      newEmail: '',
    });
  }, [oldEmail, requestForm.reset, changeForm.reset]);

  const { isSubmitting: requestSubmitting } = requestForm.formState;

  const onRequest: SubmitHandler<UserRequestChangeEmailInput> = async (
    data,
  ) => {
    changeForm.setValue('newEmail', data.newEmail);
    setRequested(true);
    await requestAction(data);
  };

  const onChange: SubmitHandler<UserChangeEmailInput> = async (data) => {
    await changeAction(data);
    setRequested(false);
    requestForm.reset();
    changeForm.reset();
  };

  return (
    <div className={twMerge(clsx('space-y-4 md:space-y-6', className))}>
      <SectionTitle as="h3" size="sm">
        Change Email
      </SectionTitle>

      <Card>
        <CardContent>
          {requested ? (
            <form
              noValidate
              className={clsx('generic-form')}
              onSubmit={changeForm.handleSubmit(onChange)}
            >
              <FormTextField
                name="newEmail"
                type="email"
                label="New Email"
                control={requestForm.control}
              />

              <Controller
                name="otp"
                control={changeForm.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="otp" aria-invalid={fieldState.invalid}>
                      Input OTP
                    </FieldLabel>
                    <InputOTP
                      id="otp"
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputOTPSlot
                          index={1}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputOTPSlot
                          index={2}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputOTPSlot
                          index={3}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputOTPSlot
                          index={4}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputOTPSlot
                          index={5}
                          aria-invalid={fieldState.invalid}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field orientation="horizontal">
                <SubmitButton disabled={requestSubmitting}>
                  {requestSubmitting ? <LoadingSpinner /> : 'Confirm update'}
                </SubmitButton>
              </Field>
            </form>
          ) : (
            <form
              noValidate
              className={clsx('generic-form')}
              onSubmit={requestForm.handleSubmit(onRequest)}
            >
              <FormTextField
                name="oldEmail"
                type="email"
                label="Current Email"
                control={requestForm.control}
              />

              <FormTextField
                name="newEmail"
                type="email"
                label="New Email"
                control={requestForm.control}
              />

              <Field orientation="horizontal">
                <SubmitButton disabled={requestSubmitting}>
                  {requestSubmitting ? <LoadingSpinner /> : 'Request OTP'}
                </SubmitButton>
              </Field>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
