'use client';

import { Checkbox } from '#components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '#components/ui/field';
import { useId } from 'react';
import {
  type Path,
  type FieldValues,
  type Control,
  Controller,
} from 'react-hook-form';

type FormCheckboxFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
};

export const FormCheckboxField = <T extends FieldValues>({
  name,
  control,
  label,
}: FormCheckboxFieldProps<T>) => {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          orientation="horizontal"
          aria-invalid={fieldState.invalid}
          className="w-fit"
        >
          <Checkbox {...field} id={id} aria-invalid={fieldState.invalid} />
          <FieldLabel htmlFor={id} aria-invalid={fieldState.invalid}>
            {label}
          </FieldLabel>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
