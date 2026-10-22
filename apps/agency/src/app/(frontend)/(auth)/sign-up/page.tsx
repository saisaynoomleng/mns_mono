'use client';

import React from 'react';
import { Bounded, SignUpForm, toast } from '@mns/ui';
import { authClient } from '@/lib/auth-client';
import { OAuthProviders, SignUpFormInput } from '@mns/utils';
import { useRouter } from 'next/navigation';
import RenderAction from '@/components/RenderAction';
import { env } from '@/lib/env/client';

const SignUpPage = (): React.JSX.Element => {
  const router = useRouter();

  const handleSignUp = async (data: SignUpFormInput) => {
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: `${env.NEXT_PUBLIC_APP_URL}/users`,
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
      <SignUpForm
        action={handleSignUp}
        OAuthAction={handleOAuthSignIn}
        signInCTA={{ href: '/sign-in', label: 'sign in' }}
        renderSignIn={(props) => RenderAction(props)}
      />
    </Bounded>
  );
};

export default SignUpPage;
