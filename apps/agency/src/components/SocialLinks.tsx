import { sanityFetch } from '@/sanity/live';
import { SOCIAL_LINKS_QUERY } from '@/sanity/queries';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { CiLinkedin } from 'react-icons/ci';
import { SiFacebook, SiTiktok, SiYoutube } from 'react-icons/si';
import { twMerge } from 'tailwind-merge';

const ICON_MAP: Record<string, React.ReactElement> = {
  facebook: <SiFacebook size={25} />,
  linkedin: <CiLinkedin size={25} />,
  youtube: <SiYoutube size={25} />,
  titkok: <SiTiktok size={25} />,
} as const;

const SocialLinks = async ({
  className,
}: {
  className?: string;
}): Promise<React.JSX.Element | null> => {
  const { data: links } = await sanityFetch({
    query: SOCIAL_LINKS_QUERY,
    stega: false,
    perspective: 'published',
  });

  if (!links) {
    return null;
  }

  return (
    <div className={twMerge(clsx('flex gap-x-2 items-center', className))}>
      {links.socialLinks?.map((link) => (
        <Link
          href={link.url as string}
          key={link._key}
          target="_blank"
          rel="noreferrer nofollow"
          className="hover:text-primary"
        >
          {ICON_MAP[link.platform?.toLowerCase() as string]}
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
