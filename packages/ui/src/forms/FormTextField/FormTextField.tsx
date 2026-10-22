'use client';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#components/ui/field';
import { Input } from '#components/ui/input';
import clsx from 'clsx';
import { twMerge } from 'cn';
import { useId, type ComponentPropsWithoutRef } from 'react';
import type React from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type FormTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  type: React.HTMLInputTypeAttribute;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  description?: string;
  label: string;
} & Omit<
  ComponentPropsWithoutRef<'input'>,
  | 'defaultValue'
  | 'value'
  | 'onChange'
  | 'onBlur'
  | 'aria-invalid'
  | 'ref'
  | 'id'
  | 'name'
  | 'type'
  | 'autoComplete'
>;

export const FormTextField = <T extends FieldValues>({
  name,
  control,
  type,
  label,
  description,
  autoComplete,
  className,
  ...props
}: FormTextFieldProps<T>) => {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={twMerge(className)}>
          <FieldLabel htmlFor={id} className="capitalize">
            {label}
          </FieldLabel>
          {description && <FieldDescription>{description}</FieldDescription>}

          <Input
            {...props}
            {...field}
            id={id}
            type={type}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
