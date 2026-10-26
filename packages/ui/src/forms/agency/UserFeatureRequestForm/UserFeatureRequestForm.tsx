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
  type UserFeatureRequestFormInput,
  UserFeatureRequestFormSchema,
  type ActionResponse,
  toTitleCase,
} from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { FormTextareaField } from '../../FormTextareaField';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';

type UserFeatureRequestFormProps = {
  className?: string;
  action: (data: UserFeatureRequestFormInput) => Promise<ActionResponse>;
  isPending: boolean;
  apps: App[];
};

type App = {
  _id: string | null;
  name: string | null;
};

export const UserFeatureRequestForm = ({
  className,
  action,
  isPending,
  apps,
}: UserFeatureRequestFormProps): React.JSX.Element => {
  const form = useForm<UserFeatureRequestFormInput>({
    resolver: zodResolver(UserFeatureRequestFormSchema),
    defaultValues: {
      appId: '',
      body: '',
    },
  });

  const onSubmit: SubmitHandler<UserFeatureRequestFormInput> = async (data) => {
    await action(data);
    form.reset();
  };

  return (
    <Card className={twMerge(clsx(className))}>
      <CardHeader>
        <CardTitle>Dream big. Send it in.</CardTitle>
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
                <FieldLabel htmlFor="appId">Select An App</FieldLabel>
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <FormTextareaField
            name="body"
            label="Message"
            minLength={10}
            maxLength={20000}
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
