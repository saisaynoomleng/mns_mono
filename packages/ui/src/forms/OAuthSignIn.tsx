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
    <div
      className={twMerge(
        clsx('flex gap-x-2 items-center justify-center', className),
      )}
    >
      <Button type="button" onClick={() => OAuthAction('google')}>
        <SiGoogle aria-label="sign in with google" />
        <span className="sr-only">sign in with google</span>
      </Button>

      <Button type="button" onClick={() => OAuthAction('facebook')}>
        <SiFacebook aria-label="sign in with facebook" />
        <span className="sr-only">sign in with facebook</span>
      </Button>

      <Button type="button" onClick={() => OAuthAction('linkedin')}>
        <CiLinkedin aria-label="sign in with linkedin" />
        <span className="sr-only">sign in with linkedIn</span>
      </Button>

      <Button type="button" onClick={() => OAuthAction('tiktok')}>
        <SiTiktok aria-label="sign in with tiktok" />
        <span className="sr-only">sign in with tiktok</span>
      </Button>
    </div>
  );
};
