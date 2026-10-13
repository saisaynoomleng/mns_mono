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

export const SendProductUpdateEmailFormSchema = z.object({
  subject: z.string().min(1, { error: 'Subject is required' }),
  message: z
    .string()
    .min(1, { error: 'Message must have at least 10 characters' })
    .max(10000, { error: 'Message cannot exceeds 10,000 characters' }),
});
export type sendProductUpdateEmailInput = z.input<
  typeof SendProductUpdateEmailFormSchema
>;
