'use client';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from '#components/ui/input-group';
import { twMerge } from 'cn';
import { useId, type ComponentPropsWithoutRef } from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type FormTextareaFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  minLength?: number;
  maxLength?: number;
  label: string;
  description?: string;
  className?: string;
} & Omit<
  ComponentPropsWithoutRef<'textarea'>,
  | 'name'
  | 'id'
  | 'defaultValue'
  | 'value'
  | 'minLength'
  | 'maxLength'
  | 'onChange'
  | 'onBlur'
  | 'ref'
  | 'arai-invalid'
>;

export const FormTextareaField = <T extends FieldValues>({
  name,
  minLength = 10,
  maxLength = 3000,
  control,
  label,
  description,
  className,
  ...props
}: FormTextareaFieldProps<T>) => {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid} className={twMerge(className)}>
          <FieldLabel htmlFor={id} aria-invalid={fieldState.invalid}>
            {label}
          </FieldLabel>
          {description && <FieldDescription>{description}</FieldDescription>}

          <InputGroup>
            <InputGroupTextarea
              {...props}
              {...field}
              id={id}
              minLength={minLength}
              maxLength={maxLength}
              aria-invalid={fieldState.invalid}
            />

            <InputGroupAddon align="block-end">
              <p className="tabular-nums">
                {field.value.length}/{maxLength}
              </p>
            </InputGroupAddon>
          </InputGroup>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
