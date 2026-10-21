'use client';

import { SectionTitle } from '#components/shared/SectionTitle/SectionTitle';
import { Button } from '#components/ui/button';
import { Card, CardContent } from '#components/ui/card';
import { toTitleCase, type OAuthProviders } from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';
import { CiLinkedin } from 'react-icons/ci';
import { SiFacebook, SiGoogle, SiTiktok } from 'react-icons/si';

type UserLinkAccountFormProps = {
  className?: string;
};

type Provider = {
  provier: OAuthProviders;
  icon: React.ReactElement;
  isLinked: boolean;
};

const Providers: Provider[] = [
  {
    provier: 'google',
    icon: <SiGoogle size={25} />,
    isLinked: true,
  },
  {
    provier: 'facebook',
    icon: <SiFacebook size={25} />,
    isLinked: true,
  },
  {
    provier: 'linkedin',
    icon: <CiLinkedin size={25} />,
    isLinked: false,
  },
  {
    provier: 'tiktok',
    icon: <SiTiktok size={25} />,
    isLinked: false,
  },
];

export const UserLinkAccountForm = ({
  className,
}: UserLinkAccountFormProps) => {
  return (
    <div className={twMerge(clsx('space-y-4 md:space-y-6', className))}>
      <SectionTitle as="h3" size="sm">
        Linked Accounts
      </SectionTitle>

      <Card>
        <CardContent className="flex flex-col gap-y-2 md:gap-y-4">
          {Providers.map((p) => (
            <div className="flex justify-between items-center" key={p.provier}>
              <p className="flex gap-x-2 items-center">
                <span className="border p-1 border-primary/20 text-primary">
                  {p.icon}
                </span>
                <span className="font-semibold">{toTitleCase(p.provier)}</span>
              </p>

              <Button aria-label={`Link your account with ${p.provier}`}>
                {p.isLinked ? 'Unlink' : 'Link'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
