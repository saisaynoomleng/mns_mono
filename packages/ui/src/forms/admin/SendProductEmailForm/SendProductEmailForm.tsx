'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SendProductUpdateEmailFormSchema,
  type ActionResponse,
  type SendProductUpdateEmailInput,
} from '@mns/utils';
import clsx from 'clsx';
import type React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FormTextField } from '../../FormTextField';
import { FormTextareaField } from '../../FormTextareaField';
import { Field } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';
import { twMerge } from 'cn';

type SendProductEmailFormProps = {
  action: (
    data: SendProductUpdateEmailInput,
  ) => Promise<ActionResponse<SendProductUpdateEmailInput>>;
  className?: string;
  isPending: boolean;
};

export const SendProductEmailForm = ({
  action,
  className,
  isPending,
}: SendProductEmailFormProps): React.JSX.Element => {
  const form = useForm<SendProductUpdateEmailInput>({
    resolver: zodResolver(SendProductUpdateEmailFormSchema),
    defaultValues: {
      subject: '',
      message: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<SendProductUpdateEmailInput> = async (data) => {
    await action(data);
    form.reset();
  };

  return (
    <Card className={twMerge(clsx('', className))}>
      <CardHeader>
        <CardTitle>Send email to subscribers</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          className={clsx('generic-form')}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormTextField
            name="subject"
            control={form.control}
            type="text"
            placeholder="New product launch..."
            label="Subject"
          />

          <FormTextareaField
            name="message"
            control={form.control}
            maxLength={10000}
            minLength={10}
            label="Message"
          />

          <Field orientation="horizontal">
            <SubmitButton disabled={isPending || isSubmitting}>
              {isPending || isSubmitting ? <LoadingSpinner /> : 'Send'}
            </SubmitButton>
          </Field>
        </form>
      </CardContent>
    </Card>
  );
};
