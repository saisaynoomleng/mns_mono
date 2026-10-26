'use client';

import { Card, CardContent, CardHeader, CardTitle } from '#components/ui/card';
import { Field, FieldError, FieldLabel } from '#components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UserReportAppIssueFormSchema,
  type ActionResponse,
  type UserReportAppIssueFromInput,
} from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { FormTextareaField } from '../../FormTextareaField';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';

type UserReportIssueFormProps = {
  className?: string;
  action: (data: UserReportAppIssueFromInput) => Promise<ActionResponse>;
  isPending: boolean;
  apps: App[];
};

type App = {
  _id: string | null;
  name: string | null;
};

export const UserReportIssueForm = ({
  className,
  action,
  apps,
  isPending,
}: UserReportIssueFormProps) => {
  const form = useForm<UserReportAppIssueFromInput>({
    resolver: zodResolver(UserReportAppIssueFormSchema),
    defaultValues: {
      appId: '',
      body: '',
      imageUrl: '',
    },
  });

  const onSubmit: SubmitHandler<UserReportAppIssueFromInput> = async (data) => {
    await action(data);
    form.reset();
  };

  return (
    <Card className={twMerge(clsx('space-y-4 md:space-y-6', className))}>
      <CardHeader>
        <CardTitle>What&apos;s troubling you?</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          className="generic-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            name="appId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="app">Select an app</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="app" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Select an app" />
                  </SelectTrigger>
                  <SelectContent>
                    {apps.map((app) => (
                      <SelectItem key={app._id} value={app._id as string}>
                        {app.name as string}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <FormTextareaField
            name="body"
            control={form.control}
            label="Error Detail"
            minLength={10}
            maxLength={20000}
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
