'use client';

import RenderAction from '@/components/RenderAction';
import { authClient } from '@/lib/auth-client';
import { Bounded, SignInForm, toast } from '@mns/ui';
import { OAuthProviders, SignInFormInput } from '@mns/utils';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignInPage = (): React.JSX.Element => {
  const router = useRouter();

  const handleSignIn = async (data: SignInFormInput) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push('/user');
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleOAuthSignIn = async (provider: OAuthProviders) => {
    await authClient.signIn.social(
      {
        provider,
      },
      {
        onSuccess: () => {
          router.push('/user');
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Bounded className="flex justify-center items-center">
      <SignInForm
        action={handleSignIn}
        OAuthAction={handleOAuthSignIn}
        forgetCTA={{ href: '/reset-password', label: 'Forget Password' }}
        renderForget={(props) => RenderAction({ type: 'text', ...props })}
        signUpCTA={{ href: '/sign-up', label: 'Sign Up' }}
        renderSignUp={(props) => RenderAction(props)}
      />
    </Bounded>
  );
};

export default SignInPage;
