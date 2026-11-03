'use client';

import { Card, CardContent, CardHeader, CardTitle } from '#components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateSubscriptionFormSchema,
  type ActionResponse,
  type CreateSubscriptionFormInput,
} from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { FormTextField } from '../../FormTextField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#components/ui/select';
import { Field, FieldLabel } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';

type CreateSubscriptionFormProps = {
  className?: string;
  services: Service[];
  action: (data: CreateSubscriptionFormInput) => Promise<ActionResponse>;
  isPending: boolean;
};

type Service = {
  name: string;
  id: string;
};

export const CreateSubscriptionForm = ({
  className,
  services,
  action,
  isPending,
}: CreateSubscriptionFormProps): React.JSX.Element => {
  const form = useForm<CreateSubscriptionFormInput>({
    resolver: zodResolver(CreateSubscriptionFormSchema),
    defaultValues: {
      name: '',
      sanityId: '',
      serviceId: '',
      pricePerMonthInCents: 0,
      status: 'active',
    },
  });

  const onSubmit: SubmitHandler<CreateSubscriptionFormInput> = async (data) => {
    await action(data);

    form.reset();
  };

  return (
    <Card className={twMerge(clsx(className))}>
      <CardHeader>
        <CardTitle>Create Subscription Plans</CardTitle>
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
            label="Plan Name"
          />

          <FormTextField
            name="sanityId"
            control={form.control}
            type="text"
            label="Sanity ID"
            description="Sanity ID can be retrieved from Studio"
          />

          <Controller
            name="serviceId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="serviceId">Service</FieldLabel>

                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                    id="serviceId"
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>

                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <FormTextField
            name="pricePerMonthInCents"
            control={form.control}
            type="number"
            min={0}
            label="Price Per Month In Cents"
            description="Price Per Month should be in cents(e.g. $79.99 will be 7999)"
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
