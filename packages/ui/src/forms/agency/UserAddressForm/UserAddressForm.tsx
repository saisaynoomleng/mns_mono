'use client';

import { Card, CardContent } from '#components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UserAddressFormSchema,
  type TRPCMutationType,
  type UserAddressFormInput,
} from '@mns/utils';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { FormTextField } from '../../FormTextField';
import { Field } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner/LoadingSpinner';
import { twMerge } from 'cn';
import clsx from 'clsx';
import { SectionTitle } from '#components/shared/SectionTitle/SectionTitle';

type UserAddressFormProps = {
  className?: string;
  action: (data: UserAddressFormInput) => Promise<TRPCMutationType>;
  address?: UserAddressFormInput;
  isPending: boolean;
};

export const UserAddressForm = ({
  className,
  action,
  address,
  isPending,
}: UserAddressFormProps) => {
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

  const onSubmit: SubmitHandler<UserAddressFormInput> = async (data) => {
    console.log('1. Form submitted:', data);

    const result = await action(data);

    console.log('3. Action returned:', result);

    if (!result.success) {
      toast.error(result.message);
      return form.setError('root', {
        message: result.message,
      });
    }

    toast.success(result.message);
    form.reset();
  };

  const rootErrors = form.getErrors('root');

  return (
    <div className="space-y-2">
      <SectionTitle as="h3" size="sm">
        Address
      </SectionTitle>

      <Card className={twMerge(clsx('', className))}>
        <CardContent>
          {rootErrors ? <p>{rootErrors.message}</p> : null}

          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="generic-form"
          >
            <FormTextField
              name="address1"
              control={form.control}
              type="text"
              label="Address 1"
              autoComplete="address-line1"
            />

            <FormTextField
              name="address2"
              control={form.control}
              type="text"
              label="Address 2"
              autoComplete="address-line2"
            />

            <FormTextField
              name="city"
              control={form.control}
              type="text"
              label="City"
              autoComplete="address-level2"
            />

            <FormTextField
              name="state"
              control={form.control}
              type="text"
              label="State"
              autoComplete="address-level1"
            />

            <FormTextField
              name="zip"
              control={form.control}
              type="text"
              label="Zip/Postal Code"
              autoComplete="postal-code"
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
