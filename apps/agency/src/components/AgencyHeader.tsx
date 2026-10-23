'use client';

import { authClient } from '@/lib/auth-client';
import { HEADER_QUERY_RESULT } from '@/sanity/types';
import { Button, DashedTitle, Logo, Separator } from '@mns/ui';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaGripLines } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

type AgencyHeaderProps = {
  header: NonNullable<HEADER_QUERY_RESULT>;
};

const AgencyHeader = ({ header }: AgencyHeaderProps): React.JSX.Element => {
  const { data } = authClient.useSession();
  const [navOpen, setNavOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflowY = navOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflowY = '';
    };
  }, [navOpen]);

  const userProfile = data?.user.image
    ? data?.user.image
    : `https://placehold.co/50?text=${data?.user.name.charAt(0)}`;

  const isPlacehold = userProfile.includes('placehold.co');

  const { navLinks, services } = header;

  const closeMenu = () => {
    setNavOpen(false);
  };

  return (
    <header className="max-w-7xl mx-auto py-2 px-2 md:px-4 shadow flex justify-between items-center mt-4">
      <div className="flex gap-x-1">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div className="flex gap-x-4 items-center">
        {data?.user ? (
          <div>
            <Link href="/user">
              <Image
                src={userProfile}
                alt="user profile"
                width={40}
                height={40}
                className="rounded-full"
                unoptimized={isPlacehold}
              />
            </Link>
          </div>
        ) : (
          <div>
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        )}

        <Separator orientation="vertical" />

        <Button
          aria-label="toggle main menu"
          onClick={() => setNavOpen((open) => !open)}
          className="relative z-30"
        >
          {navOpen ? (
            <span>
              <IoClose />
            </span>
          ) : (
            <span>
              <FaGripLines />
            </span>
          )}
        </Button>

        <nav
          role="navigation"
          aria-label="main menu"
          className={clsx(
            'fixed inset-0 bg-brand-black-800 text-background z-20 duration-200 transition-transform ease-in-out grid md:grid-cols-2 px-[20vw] pt-[10vh] overflow-y-scroll gap-y-4 max-md:pb-10',
            navOpen ? 'translate-y-0' : 'translate-y-[-200%]',
          )}
        >
          <ul className="flex flex-col gap-y-4">
            <DashedTitle className="text-primary" label="Company" />
            {navLinks?.map((link, i) => (
              <li key={link._key}>
                <Link
                  href={link.href as string}
                  className="hover:text-primary"
                  onClick={closeMenu}
                >
                  <span className="text-fs-300">
                    {String(i + 1).padStart(2, '0')}.{' '}
                  </span>
                  <span className="text-fs-500 md:text-fs-600">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col gap-y-4">
            <DashedTitle
              label={services?.title as string}
              className="text-primary"
            />

            {services?.links?.map((link, i) => (
              <li key={link._key}>
                <Link
                  href={link.href as string}
                  className="hover:text-primary"
                  onClick={closeMenu}
                >
                  <span className="text-fs-300">
                    {String(i + 1).padStart(2, '0')}.{' '}
                  </span>
                  <span className="text-fs-500 md:text-fs-600">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AgencyHeader;
