'use client';

import { Card, CardContent, CardHeader, CardTitle } from '#components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ReplyToContactFormSchema,
  type ActionResponse,
  type ReplytoContactFormInput,
} from '@mns/utils';
import type React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FormTextField } from '../../FormTextField';
import { FormTextareaField } from '../../FormTextareaField';
import { Field } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';
import { twMerge } from 'cn';
import clsx from 'clsx';

type ReplyToContactFormProps = {
  className?: string;
  id: string;
  isPending: boolean;
  action: (data: ReplytoContactFormInput) => Promise<ActionResponse>;
};

export const ReplyToContactForm = ({
  className,
  id,
  isPending,
  action,
}: ReplyToContactFormProps): React.JSX.Element => {
  const form = useForm<ReplytoContactFormInput>({
    resolver: zodResolver(ReplyToContactFormSchema),
    defaultValues: {
      subject: '',
      message: '',
      id,
    },
  });

  const onSubmit: SubmitHandler<ReplytoContactFormInput> = async (data) => {
    await action(data);
    form.reset();
  };

  return (
    <Card className={twMerge(clsx('', className))}>
      <CardHeader>
        <CardTitle>Reply to Contact</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="generic-form"
        >
          <FormTextField
            name="subject"
            type="text"
            placeholder="Re:..."
            control={form.control}
            label="Subject"
          />

          <FormTextareaField
            name="message"
            minLength={10}
            maxLength={3000}
            label="Message"
            control={form.control}
          />

          <Field orientation="horizontal">
            <SubmitButton disabled={isPending}>
              {isPending ? <LoadingSpinner /> : 'Send'}
            </SubmitButton>
          </Field>
        </form>
      </CardContent>
    </Card>
  );
};
