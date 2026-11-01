import * as z from 'zod';
import { passwordRules } from './helper.js';

//============================//
//======Schema Helper========//
//==========================//

export const TRPCResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type TRPCMutationType = z.infer<typeof TRPCResponseSchema>;

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

export const otpSchema = z
  .string()
  .min(1, { error: 'OTP is required' })
  .max(6, { error: 'OTP cannot exceeds 6 characters' });

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
export type SendProductUpdateEmailInput = z.input<
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

export const SignUpFormSchema = z
  .object({
    name: z.string().min(1, { error: 'Full name is required' }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { error: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Password must match',
    path: ['confirmPassword'],
  });
export type SignUpFormInput = z.input<typeof SignUpFormSchema>;

export const SignInFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { error: 'Password is required' }),
  rememberMe: z.boolean().default(false),
});
export type SignInFormInput = z.input<typeof SignInFormSchema>;

export const RequestPasswordResetFormSchema = z.object({
  email: emailSchema,
});
export type RequestPasswordResetFormInput = z.input<
  typeof RequestPasswordResetFormSchema
>;

export const CheckVerificationOTPFormSchema =
  RequestPasswordResetFormSchema.extend({
    type: z.literal('forget-password').default('forget-password'),
    otp: otpSchema,
  });
export type CheckVerificationOTPFormInput = z.input<
  typeof CheckVerificationOTPFormSchema
>;

export const ResetPasswordFormSchema = CheckVerificationOTPFormSchema.omit({
  type: true,
})
  .extend({
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { error: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords must match',
    path: ['confirmPassword'],
  });
export type ResetPasswordFormInput = z.input<typeof ResetPasswordFormSchema>;

export const RequestEmailChangeFormSchema = z
  .object({
    currentEmail: emailSchema,
    newEmail: emailSchema,
  })
  .refine((data) => data.currentEmail !== data.newEmail, {
    error: 'Cannot use old email as new email',
    path: ['newEmail'],
  });
export type RequestEmailChangeFormInput = z.input<
  typeof RequestEmailChangeFormSchema
>;

export const ChangeEmailFormSchema = z.object({
  newEmail: emailSchema,
  otp: otpSchema,
});
export type ChangeEmailFormInput = z.input<typeof ChangeEmailFormSchema>;

export const UpdatePasswordFormSchema = z
  .object({
    currentPassowrd: z.string(),
    newPassword: passwordSchema,
    confirmNewPassword: z
      .string()
      .min(1, { error: 'Confirm new password is required' }),
  })
  .superRefine((val, ctx) => {
    if (val.currentPassowrd === val.newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'New password cannot be the same as old password',
        path: ['newPassword'],
      });
    }

    if (val.newPassword !== val.confirmNewPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'New passwords must match',
        path: ['confirmNewPassword'],
      });
    }
  });
export type UpdatePasswordFormInput = z.input<typeof UpdatePasswordFormSchema>;

export const CreateApplicationFormSchema = z.object({
  name: z.string().min(1, 'App name is required'),
  sanityId: z.string().min(1, { error: 'Sanity ID is required' }),
  status: z.enum(['active', 'inactive']).default('inactive'),
});
export type CreateApplicationFormInput = z.input<
  typeof CreateApplicationFormSchema
>;
export type CreateApplicationFormOutput = z.output<
  typeof CreateApplicationFormSchema
>;

export const TestimonialFormSchema = z.object({
  title: z.string().min(1, { error: 'Title is required' }),
  body: z
    .string()
    .min(10, { error: 'Your thoughts need at least 10 characters' })
    .max(50000, { error: 'Your thoughts cannot exceeds 50,000 characters' }),
});
export type TestimonialFormInput = z.input<typeof TestimonialFormSchema>;

//============================//
//====== User Forms =========//
//==========================//

export const UserInfoFormSchema = z.object({
  name: z.string().min(1, { error: 'Name is required' }),
  companyName: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
});
export type UserInfoFormInput = z.input<typeof UserInfoFormSchema>;

export const UserAddressFormSchema = z.object({
  address1: z.string().min(1, { error: 'Address 1 is required' }),
  address2: z.string().nullable(),
  city: z.string().min(1, { error: 'City is required' }),
  state: z.string().min(1, { error: 'State is required' }),
  zip: z.string().min(1, { error: 'Zip/Postal code is required' }),
  country: z.string().min(1, { error: 'Country is required' }),
});
export type UserAddressFormInput = z.input<typeof UserAddressFormSchema>;

export const UserRequestChangeEmailFormSchema = z
  .object({
    oldEmail: emailSchema,
    newEmail: emailSchema,
  })
  .refine((data) => data.oldEmail !== data.newEmail, {
    error: 'New email cannot be the same as old email',
    path: ['newEmail'],
  });
export type UserRequestChangeEmailInput = z.input<
  typeof UserRequestChangeEmailFormSchema
>;

export const UserChangeEmailFormSchema = z.object({
  newEmail: emailSchema,
  otp: otpSchema,
});
export type UserChangeEmailInput = z.input<typeof UserChangeEmailFormSchema>;

export const UserUpdatePasswordFormSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: z
      .string()
      .min(1, { error: 'New Password is required' })
      .max(128, { error: 'New password cannot exceeds 128 characters' }),
    confirmNewPassword: z
      .string()
      .min(1, { error: 'Confirm New Password is required' })
      .max(128, {
        error: 'Confirm New password cannot exceeds 128 characters',
      }),
  })
  .superRefine((val, ctx) => {
    if (val.oldPassword === val.newPassword) {
      ctx.addIssue({
        message: 'Old password cannot be the same as new password',
        path: ['newPassword'],
        code: 'custom',
      });
    }

    if (val.newPassword !== val.confirmNewPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password must match',
        path: ['confirmNewPassword'],
      });
    }
  });
export type UserUpdatePasswordFormInput = z.input<
  typeof UserUpdatePasswordFormSchema
>;

export const UserReportAppIssueFormSchema = z.object({
  appId: z.uuid(),
  body: z
    .string()
    .min(10, { error: 'Error detail should have at least 10 characters' })
    .max(20000, { error: 'Error detail cannot exceeds 20,000 characters' }),
  imageUrl: z.string().nullable(),
});
export type UserReportAppIssueFromInput = z.input<
  typeof UserReportAppIssueFormSchema
>;

export const UserFeatureRequestFormSchema = UserReportAppIssueFormSchema.omit({
  imageUrl: true,
});
export type UserFeatureRequestFormInput = z.input<
  typeof UserFeatureRequestFormSchema
>;

//============================//
//====== Admin Forms ========//
//==========================//
export const CreateServiceFormSchema = z.object({
  name: z.string().min(1, { error: 'Service name is required' }),
  sanityId: z.string().min(1, { error: 'Sanity ID is required' }),
  status: z.enum(['active', 'no_longer_available']).default('active'),
});
export type CreateServiceFormInput = z.input<typeof CreateServiceFormSchema>;
