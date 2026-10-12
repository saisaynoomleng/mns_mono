import * as z from 'zod';
import { passwordRules } from './helper.js';

//============================//
//======Schema Helper========//
//==========================//

export const emailSchema = z
  .email({ error: 'Must be a valid email addres' })
  .min(1, { error: 'Email is required!' });

export const passwordSchema = z
  .string()
  .min(1, { error: 'Password is required' })
  .refine((password) => passwordRules.every((rule) => rule.test(password)), {
    error: 'Password requirement does not meet',
    path: ['password'],
  });

//============================//
//====== Forms ==============//
//==========================//

export const NewsletterFormSchema = z.object({
  email: emailSchema,
});
export type NewsletterFormInput = z.input<typeof NewsletterFormSchema>;
