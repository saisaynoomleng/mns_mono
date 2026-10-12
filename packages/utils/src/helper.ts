export const ALLOWED_IMAGE_TYPE = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/avif',
  'image/webp',
];

type PasswordRule = {
  id: string;
  label: string;
  test: (value: string) => boolean;
};

export const passwordRules: PasswordRule[] = [
  {
    id: 'uppercase',
    label: 'Password must contain at least one upper case',
    test: (v) => /[A-Z]/.test(v),
  },
  {
    id: 'lowercase',
    label: 'Password must contain at least one lower case',
    test: (v) => /[a-z]/.test(v),
  },
  {
    id: 'minlength',
    label: 'Password must have at least 8 characters',
    test: (v) => v.length >= 8,
  },
  {
    id: 'maxLength',
    label: 'Password cannot exceeds 128 characters',
    test: (v) => v.length <= 128,
  },
  {
    id: 'special',
    label: 'Password must contain at least one special character',
    test: (v) => /[^\w\d]/.test(v),
  },
  {
    id: 'number',
    label: 'Password must contain at least one number',
    test: (v) => /[0-9]/.test(v),
  },
];
