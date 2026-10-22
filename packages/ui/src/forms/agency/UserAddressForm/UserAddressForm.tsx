'use client';

import { SectionTitle } from '#components/shared/SectionTitle/SectionTitle';
import { Card, CardContent } from '#components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type ActionResponse,
  type UserAddressFormInput,
  UserAddressFormSchema,
} from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { FormTextField } from '../../FormTextField';
import { Field } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';
import { useEffect } from 'react';

type Address = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type UserAddressFormProps = {
  className?: string;
  address?: Address;
  isPending: boolean;
  action: (data: UserAddressFormInput) => Promise<ActionResponse>;
};

export const UserAddressForm = ({
  className,
  address,
  isPending,
  action,
}: UserAddressFormProps): React.JSX.Element => {
  const form = useForm<UserAddressFormInput>({
    resolver: zodResolver(UserAddressFormSchema),
    defaultValues: {
      address1: address?.address1 ?? '',
      address2: address?.address2 ?? '',
      city: address?.city ?? '',
      state: address?.state ?? '',
      zip: address?.zip ?? '',
      country: address?.country ?? '',
    },
  });

  useEffect(() => {
    form.reset({
      address1: address?.address1 ?? '',
      address2: address?.address2 ?? '',
      city: address?.city ?? '',
      state: address?.state ?? '',
      zip: address?.zip ?? '',
      country: address?.country ?? '',
    });
  }, [address, form.reset]);

  const onSubmit: SubmitHandler<UserAddressFormInput> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      toast.error(result.message);
      return form.setError('root', {
        message: result.message,
      });
    }

    toast.success(result.message);
    form.reset();
  };

  return (
    <div className={twMerge(clsx('space-y-4 md:space-y-6', className))}>
      <SectionTitle as="h3" size="sm">
        Address
      </SectionTitle>

      <Card>
        <CardContent>
          <form
            noValidate
            className="generic-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormTextField
              name="address1"
              type="text"
              label="Address Line 1"
              control={form.control}
              autoComplete="address-line1"
            />

            <FormTextField
              name="address2"
              type="text"
              label="Address Line 2"
              control={form.control}
              autoComplete="address-line2"
            />

            <FormTextField
              name="city"
              type="text"
              label="City"
              control={form.control}
              autoComplete="address-level2"
            />

            <FormTextField
              name="state"
              type="text"
              label="State"
              control={form.control}
              autoComplete="address-level1"
            />

            <FormTextField
              name="zip"
              type="text"
              label="Zip/Postal Code"
              control={form.control}
              autoComplete="postal-code"
            />

            <FormTextField
              name="country"
              type="text"
              label="Country"
              control={form.control}
              autoComplete="country-name"
            />

            <Field orientation="horizontal">
              <SubmitButton disabled={isPending}>
                {isPending ? <LoadingSpinner /> : 'Update'}
              </SubmitButton>
            </Field>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
