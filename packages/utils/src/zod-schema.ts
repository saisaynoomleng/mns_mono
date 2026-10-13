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
    .min(10, { error: 'Message must have at least 10 characters' })
    .max(10000, { error: 'Message cannot exceed 10,000 characters' }),
});
export type sendProductUpdateEmailInput = z.input<
  typeof SendProductUpdateEmailFormSchema
>;

export const ContactUsFormSchema = z
  .object({
    name: z.string().min(1, { error: 'Name is required' }),
    email: emailSchema,
    companyName: z.string().optional(),
    position: z.string().optional(),
    minBudget: z.coerce.number().nonnegative(),
    maxBudget: z.coerce.number().nonnegative(),
    message: z
      .string()
      .min(10, { error: 'Message must have at least 10 characters' })
      .max(3000, { error: 'Message cannot exceed 3,000 characters' }),
  })
  .refine((data) => data.maxBudget > data.minBudget, {
    error: 'Maximum budget cannot be lower than minimum budget',
    path: ['maxBudget'],
  });
export type ContactUsFormInput = z.input<typeof ContactUsFormSchema>;
export type ContactUsFormOutput = z.output<typeof ContactUsFormSchema>;

export const ReplyToContactFormSchema = z.object({
  id: z.uuid(),
  subject: z.string().min(1, 'Subject is required'),
  message: z
    .string()
    .min(10, { error: 'Message must have at least 10 characters' })
    .max(3000, { error: 'Message cannot exceed 3,000 characters' }),
});
export type ReplytoContactFormInput = z.input<typeof ReplyToContactFormSchema>;
export type ReplytoContactFormOutput = z.output<
  typeof ReplyToContactFormSchema
>;
