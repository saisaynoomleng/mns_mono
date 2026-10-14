'use client';

import { RenderAction } from '@/components/RenderAction';
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
        rememberMe: data.rememberMe,
      },
      {
        onSuccess: () => {
          router.push('/');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleOAuth = async (provider: OAuthProviders) => {
    await authClient.signIn.social(
      {
        provider,
      },
      {
        onSuccess: () => {
          router.push('/');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Bounded
      size="sm"
      isCentered
      className="flex justify-center items-center h-dvh"
    >
      <SignInForm
        action={handleSignIn}
        OAuthAction={handleOAuth}
        forgetCTA={{ label: 'Forget Password', href: '/forget-password' }}
        renderForget={(props) => RenderAction(props)}
        signUpCTA={{ label: 'Not a member yet? Sign Up', href: '/sign-up' }}
        renderSignUp={(props) => RenderAction(props)}
      />
    </Bounded>
  );
};

export default SignInPage;
