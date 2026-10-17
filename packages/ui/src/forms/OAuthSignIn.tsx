'use client';

import type { OAuthProviders } from '@mns/utils';
import type React from 'react';
import { Button } from '../components';
import { SiFacebook, SiGoogle, SiTiktok } from 'react-icons/si';
import { CiLinkedin } from 'react-icons/ci';
import { twMerge } from 'cn';
import clsx from 'clsx';

type OAuthSignInProps = {
  className?: string;
  OAuthAction: (provider: OAuthProviders) => Promise<void>;
};

export const OAuthSignIn = ({
  className,
  OAuthAction,
}: OAuthSignInProps): React.JSX.Element => {
  return (
    <div className={twMerge(clsx('flex flex-col gap-y-2', className))}>
      <Button
        variant="outline"
        type="button"
        onClick={() => OAuthAction('google')}
      >
        <SiGoogle aria-label="sign in with google" />
        <span>Continue in with Google</span>
      </Button>

      <Button
        variant="outline"
        type="button"
        onClick={() => OAuthAction('facebook')}
      >
        <SiFacebook aria-label="sign in with facebook" />
        <span>Continue in with Facebook</span>
      </Button>

      <Button
        variant="outline"
        type="button"
        onClick={() => OAuthAction('linkedin')}
      >
        <CiLinkedin aria-label="sign in with linkedin" />
        <span>Continue in with LinkedIn</span>
      </Button>

      <Button
        variant="outline"
        type="button"
        onClick={() => OAuthAction('tiktok')}
      >
        <SiTiktok aria-label="sign in with tiktok" />
        <span>Continue in with TikTok</span>
      </Button>
    </div>
  );
};
